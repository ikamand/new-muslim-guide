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
 * Owns the two model files and the live session, so the product card and the
 * /recite-spike instrument share one implementation. The five rules the plan
 * sets live at this layer where they can be enforced rather than remembered:
 *
 * - Nothing heard is written anywhere. The transcriber gets no `fs` and no
 *   `audioOutputPath`, so it cannot write audio even by accident.
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
 *
 * ⚠️ Before a public release the recognition model must be converted from
 * `tarteel-ai/whisper-base-ar-quran` directly and hosted somewhere the app
 * controls — the pinned size below is of a third-party conversion that was
 * verified end-to-end by the Phase 0 baseline, which is enough for testing
 * and not enough to depend on strangers keeping a repo alive.
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

/** Tarteel's whisper-base fine-tune (Apache-2.0), GGML f16. */
const RECOGNITION: ModelFile = {
  name: 'ggml-base-ar-quran.bin',
  url: 'https://github.com/ikamand/recite-models/releases/download/models-v1/ggml-base-ar-quran-f16.bin',
  bytes: 147_951_465,
};

/** Silero VAD — what cuts the audio into slices at silences. */
const VAD: ModelFile = {
  name: 'ggml-silero-v6.2.0.bin',
  url: 'https://github.com/ikamand/recite-models/releases/download/models-v1/ggml-silero-v6.2.0.bin',
  bytes: 885_098,
};

/** Rounded for buttons and help text. */
export const RECITE_DOWNLOAD_MB = Math.round((RECOGNITION.bytes + VAD.bytes) / 1_000_000);

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

/** Both models on disk and the right size. */
export function reciteModelsReady(): boolean {
  return canRecite && present(RECOGNITION) && present(VAD);
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
 * Fetches whichever models are missing. Resolves true when both are present
 * and verified. `onStatus` gets the stage and how far through it is, 0–100.
 */
export async function downloadReciteModels(
  onStatus: (status: 'vad' | 'recognition', percent: number) => void,
): Promise<boolean> {
  if (!canRecite) return false;
  const dir = modelDir();
  if (!dir.exists) dir.create({ intermediates: true });
  if (!present(VAD)) {
    onStatus('vad', 0);
    await fetchModel(VAD, (percent) => onStatus('vad', percent));
  }
  if (!present(RECOGNITION)) {
    onStatus('recognition', 0);
    await fetchModel(RECOGNITION, (percent) => onStatus('recognition', percent));
  }
  return reciteModelsReady();
}

export type FollowSession = {
  /** Stops listening and frees every native resource. Safe to call twice. */
  stop: () => Promise<void>;
};

export type FollowCallbacks = {
  /**
   * The full transcript so far, every time the recogniser emits. Feed it to
   * `align` and render nothing else from it.
   */
  onTranscript: (fullText: string) => void;
  /** Milliseconds the last slice took to recognise. For the instrument. */
  onProcessTime?: (ms: number) => void;
  onError: (message: string) => void;
};

/** What whisper.rn hands back that this module reads. */
type TranscribeEvent = {
  sliceIndex?: number;
  processTime?: number;
  data?: { result?: string };
};

/**
 * Starts listening. Loads both models into memory (seconds, reported via the
 * returned `loadMs`), opens the mic, and streams VAD-cut slices through the
 * recogniser. `promptPreviousSlices` stays false — feeding earlier text back
 * in reintroduces the repetition suppression Phase 0 measured, and the
 * Fatiha repeats itself.
 */
export async function startFollowSession(
  callbacks: FollowCallbacks,
): Promise<FollowSession & { loadMs: number }> {
  if (!canRecite) throw new Error('native only');

  /* Loaded here, not at module top: the web bundle must never execute the
     native entry points. */
  const whisper = await import('whisper.rn/index');
  const realtime = await import('whisper.rn/realtime-transcription/index');
  const adapters = await import('whisper.rn/realtime-transcription/adapters/AudioPcmStreamAdapter');

  const t0 = Date.now();
  const whisperContext = await whisper.initWhisper({ filePath: fileFor(RECOGNITION).uri });
  const vadContext = await whisper.initWhisperVad({ filePath: fileFor(VAD).uri });
  const loadMs = Date.now() - t0;

  /* In dev the engine narrates itself to the Metro terminal. The freeze
     reported on 31 Aug (stuck after ayah 1, old and new builds alike) is
     invisible to static reading — these traces are how the next report
     carries its own diagnosis. Production stays silent. */
  const trace = __DEV__ ? (tag: string) => (m: string) => console.log(tag, m) : undefined;

  const audioStream = new adapters.AudioPcmStreamAdapter();
  /* The transcriber's contract is the ring-buffer wrapper, not the raw VAD
     context — the README's shorthand elides it; the types do not. */
  const vad = new realtime.RingBufferVad(vadContext, { logger: trace?.('[vad]') });

  const slices = new Map<number, string>();

  const transcriber = new realtime.RealtimeTranscriber(
    { whisperContext, vadContext: vad, audioStream },
    {
      audioSliceSec: 15,
      promptPreviousSlices: false,
      transcribeOptions: { language: 'ar' },
      logger: trace?.('[rt]'),
    },
    {
      onTranscribe: (event: TranscribeEvent) => {
        const text = event.data?.result;
        if (typeof text === 'string') {
          slices.set(event.sliceIndex ?? 0, text);
          const joined = [...slices.entries()]
            .sort(([a], [b]) => a - b)
            .map(([, slice]) => slice)
            .join(' ');
          callbacks.onTranscript(joined);
        }
        if (typeof event.processTime === 'number') {
          callbacks.onProcessTime?.(event.processTime);
        }
      },
      onError: (error: unknown) => callbacks.onError(String(error)),
    },
  );

  let stopped = false;
  const stop = async () => {
    if (stopped) return;
    stopped = true;
    try {
      await transcriber.stop();
      await transcriber.release();
    } catch {
      /* stopping an already-stopped transcriber is not an event */
    }
    for (const context of [whisperContext, vadContext]) {
      try {
        await context.release();
      } catch {
        /* released is released */
      }
    }
  };

  try {
    await transcriber.start();
  } catch (error) {
    await stop();
    throw error;
  }

  return { stop, loadMs };
}
