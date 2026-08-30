import { Directory, File, Paths } from 'expo-file-system';
/*
  The legacy API, for one reason: the new `File.downloadFileAsync` reports
  nothing until it is done, and a 148 MB fetch with no progress reads as a
  hang — Iyad's first phone test said exactly that. `createDownloadResumable`
  is the documented path to a progress callback in SDK 57.
*/
import { createDownloadResumable } from 'expo-file-system/legacy';
import { Platform } from 'react-native';

/**
 * The listening machinery behind "Recite with me" — phases 4 and 5 of
 * docs/recite-with-me.md.
 *
 * Owns the model file and the live session, so the product card and the
 * /recite-spike instrument share one implementation. The five rules the plan
 * sets live at this layer where they can be enforced rather than remembered:
 *
 * - Nothing heard is written anywhere: audio lives in a rolling in-memory
 *   window and nothing in this module can write it out.
 * - Nothing about a session is recorded in observations.
 * - The transcript leaves this module only as a callback argument, for the
 *   aligner. Product screens never render it.
 *
 * ## The models
 *
 * Downloaded once into `Paths.document/recite-models/` — the Phase 8 pattern:
 * the system cannot evict documents, and the storage screen can delete them.
 * Each download is verified against a pinned byte size; a truncated file or
 * an HTML error page saved as a model would otherwise fail at load time with
 * a message nobody can act on. Size, not a hash: hashing 148 MB in JS on the
 * phones this app targets costs more than the risk it retires, and the byte
 * count already catches every failure the download path has produced.
 */

const MODEL_DIR = 'recite-models';

type ModelFile = {
  name: string;
  url: string;
  /** Exact size in bytes — the download verification. */
  bytes: number;
};

/*
  Both models download from ikamand/recite-models — hosting the app controls,
  Iyad's in-house decision of 31 Aug 2026. The files are byte-identical to
  the upstream copies they were archived from (SHA256SUMS in that repo), so
  phones that downloaded before the switch keep passing the size check and
  never re-fetch. The release tag and filenames are frozen: shipped app
  versions hold these URLs forever, and that repo's README says so.
*/

/** Tarteel's whisper-base fine-tune (Apache-2.0), GGML f16. The ONLY model
    the follower needs since the in-house core below retired the VAD. */
const RECOGNITION: ModelFile = {
  name: 'ggml-base-ar-quran.bin',
  url: 'https://github.com/ikamand/recite-models/releases/download/models-v1/ggml-base-ar-quran-f16.bin',
  bytes: 147_951_465,
};

/** Rounded for buttons and help text. */
export const RECITE_DOWNLOAD_MB = Math.round(RECOGNITION.bytes / 1_000_000);

/** The mic pipeline is native; on web the feature simply does not exist. */
export const canRecite = Platform.OS !== 'web';

function modelDir(): Directory {
  return new Directory(Paths.document, MODEL_DIR);
}

function fileFor(model: ModelFile): File {
  return new File(modelDir(), model.name);
}

function present(model: ModelFile): boolean {
  try {
    const file = fileFor(model);
    return file.exists && file.size === model.bytes;
  } catch {
    return false;
  }
}

/** The model on disk and the right size. A leftover Silero VAD file from
    before 31 Aug 2026 is ignored (and deletable from the storage screen). */
export function reciteModelsReady(): boolean {
  return canRecite && present(RECOGNITION);
}

/** What the store holds, for the storage screen. 0 when nothing is saved. */
export function reciteModelBytes(): number {
  try {
    const dir = modelDir();
    if (!dir.exists) return 0;
    return dir
      .list()
      .filter((entry): entry is File => entry instanceof File)
      .reduce((total, file) => total + (file.size ?? 0), 0);
  } catch {
    return 0;
  }
}

/** Deletes the models. The feature returns to its download state. */
export function deleteReciteModels(): void {
  try {
    const dir = modelDir();
    if (dir.exists) dir.delete();
  } catch {
    /* a failed delete leaves files the storage screen still shows honestly */
  }
}

async function fetchModel(model: ModelFile, onPercent: (percent: number) => void): Promise<void> {
  const file = fileFor(model);
  if (present(model)) return;
  try {
    if (file.exists) file.delete();
  } catch {
    /* replaced below either way */
  }
  const download = createDownloadResumable(model.url, file.uri, {}, (progress) => {
    const expected = progress.totalBytesExpectedToWrite;
    /* The server may not say how big it is; the pinned size is the honest
       denominator either way. */
    const total = expected > 0 ? expected : model.bytes;
    onPercent(Math.min(99, Math.floor((progress.totalBytesWritten / total) * 100)));
  });
  await download.downloadAsync();
  if (!present(model)) {
    try {
      fileFor(model).delete();
    } catch {
      /* leaving a bad file would make `present` false anyway */
    }
    throw new Error(`${model.name} arrived the wrong size`);
  }
  onPercent(100);
}

/**
 * Fetches the model if it is missing. Resolves true when present and
 * verified. `onPercent` reports 0–100 as it lands.
 */
export async function downloadReciteModels(
  onPercent: (percent: number) => void,
): Promise<boolean> {
  if (!canRecite) return false;
  const dir = modelDir();
  if (!dir.exists) dir.create({ intermediates: true });
  if (!present(RECOGNITION)) {
    onPercent(0);
    await fetchModel(RECOGNITION, onPercent);
  }
  return reciteModelsReady();
}

export type FollowSession = {
  /** Stops listening and frees every native resource. Safe to call twice. */
  stop: () => Promise<void>;
};

export type FollowCallbacks = {
  /**
   * What the recogniser currently hears — the trailing window, not an
   * accumulated log. Feed it to `align` and render nothing else from it.
   * The aligner's acquire-anywhere rule and the screen's high-water display
   * are what make a forgetful transcript safe.
   */
  onTranscript: (windowText: string) => void;
  /** Milliseconds the last recognition pass took. For the instrument. */
  onProcessTime?: (ms: number) => void;
  onError: (message: string) => void;
};

/*
  ## The in-house realtime core — ledger entry 31 Aug 2026

  whisper.rn's RealtimeTranscriber/RingBufferVad/SliceManager stack produced
  three distinct field bugs in three days, and the third was terminal: its
  cleanup deletes a slice its own queue still points at ("Slice not found for
  index 0"), after which no transcription ever fires again — caught verbatim
  in a Metro trace while Iyad recited five unheard ayahs into a live mic.
  Per docs/recite-library.md ("own the logic, rent the plumbing"), that whole
  layer is replaced here with the smallest loop our design needs:

  - the mic streams PCM chunks (the one native piece kept, via
    @fugood/react-native-audio-pcm-stream);
  - a rolling window keeps the last WINDOW_SEC seconds of audio;
  - a timer re-transcribes the whole window, one pass in flight at a time.

  No slices, no VAD contexts, no queues — nothing to wedge. What makes this
  sufficient is the aligner's own contract: it acquires anywhere, the screen
  never moves backwards, so audio sliding out of the window loses nothing.
  Window and tick are latency knobs, tuned on Iyad's phone: recognition time
  scales with window length, so 12 s trades a little context for a faster
  pass, and a 600 ms tick means the next pass starts almost as soon as the
  previous one finishes — the in-flight guard makes real cadence equal to
  pass time. The window stays under the 26 s at which Phase 0 measured whole-passage
  decoding suppressing the Fatiha's genuine repetitions, and silence in the
  window just hallucinates a stray word the aligner ignores — also measured.
  The Silero VAD model is no longer used or downloaded.
*/
const SAMPLE_RATE = 16_000;
const BYTES_PER_SECOND = SAMPLE_RATE * 2;
const WINDOW_SECONDS = 12;
const WINDOW_BYTES = WINDOW_SECONDS * BYTES_PER_SECOND;
const TICK_MS = 600;
/** Don't burn a pass when almost nothing new was heard. */
const MIN_NEW_BYTES = BYTES_PER_SECOND * 0.35;

/**
 * Starts listening. Loads the model into memory (seconds — `loadMs` reports
 * it), opens the mic, and re-recognises the trailing window on a steady tick.
 */
export async function startFollowSession(
  callbacks: FollowCallbacks,
): Promise<FollowSession & { loadMs: number }> {
  if (!canRecite) throw new Error('native only');

  /* Loaded here, not at module top: the web bundle must never execute the
     native entry points. */
  const whisper = await import('whisper.rn/index');
  const { default: LiveAudioStream } = await import('@fugood/react-native-audio-pcm-stream');
  const { Buffer } = await import('buffer');

  const t0 = Date.now();
  const whisperContext = await whisper.initWhisper({ filePath: fileFor(RECOGNITION).uri });
  const loadMs = Date.now() - t0;

  const chunks: Uint8Array[] = [];
  let windowBytes = 0;
  let newBytes = 0;
  let inFlight = false;
  let stopped = false;

  LiveAudioStream.init({
    sampleRate: SAMPLE_RATE,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    bufferSize: 16 * 1024,
    wavFile: '',
  });

  LiveAudioStream.on('data', (base64Chunk: string) => {
    if (stopped) return;
    const chunk = new Uint8Array(Buffer.from(base64Chunk, 'base64'));
    chunks.push(chunk);
    windowBytes += chunk.length;
    newBytes += chunk.length;
    /* Slide: drop whole chunks off the front once past the window. */
    while (windowBytes > WINDOW_BYTES && chunks.length > 1) {
      windowBytes -= chunks[0].length;
      chunks.shift();
    }
  });

  const tick = async () => {
    if (stopped || inFlight || newBytes < MIN_NEW_BYTES) return;
    inFlight = true;
    newBytes = 0;
    const passStart = Date.now();
    try {
      const window = new Uint8Array(windowBytes);
      let offset = 0;
      for (const chunk of chunks) {
        window.set(chunk, offset);
        offset += chunk.length;
      }
      const { promise } = whisperContext.transcribeData(window.buffer as ArrayBuffer, {
        language: 'ar',
      });
      const result = await promise;
      if (!stopped && typeof result?.result === 'string') {
        if (__DEV__) console.log('[follow]', `${Date.now() - passStart}ms`, result.result);
        callbacks.onTranscript(result.result);
        callbacks.onProcessTime?.(Date.now() - passStart);
      }
    } catch (error) {
      /* One failed pass is not a dead session — the next tick tries again.
         A dead context would fail every tick, which the log makes visible. */
      if (__DEV__) console.log('[follow] pass failed:', String(error));
      callbacks.onError(String(error));
    } finally {
      inFlight = false;
    }
  };
  const timer = setInterval(() => void tick(), TICK_MS);

  const stop = async () => {
    if (stopped) return;
    stopped = true;
    clearInterval(timer);
    try {
      await LiveAudioStream.stop();
    } catch {
      /* stopping an already-stopped mic is not an event */
    }
    try {
      await whisperContext.release();
    } catch {
      /* released is released */
    }
  };

  try {
    LiveAudioStream.start();
  } catch (error) {
    await stop();
    throw error;
  }

  return { stop, loadMs };
}
