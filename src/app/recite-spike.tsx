import { useKeepAwake } from 'expo-keep-awake';
import { Directory, File, Paths } from 'expo-file-system';
import { Stack } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { Recitations } from '@/content/recitations';
import { useTheme } from '@/hooks/use-theme';
import { align, buildReference } from '@/lib/recite-align';

/**
 * Phase 2 of docs/recite-with-me.md — the phone spike, an INSTRUMENT.
 *
 * This screen exists to put numbers on real hardware: model load time, slice
 * process time, and whether the follower tracks a live voice through this
 * phone's microphone. It is linked from nowhere, reachable only by URL
 * (/recite-spike), and is deleted or rebuilt as the real thing when the
 * Phase 1 gate decides. Because it is an instrument, it deliberately shows
 * what the product screen never may: the raw transcript and the timings.
 * The five rules in the plan bind Phase 4's screen, not this one — with one
 * exception that binds everywhere: nothing recorded here is written to disk
 * or sent anywhere; audio exists only in the recognition pipeline.
 *
 * Strings are deliberately English literals, outside i18n: a dev instrument's
 * labels would be churn in the manifest for a screen users never see.
 *
 * The audio path: whisper.rn's RealtimeTranscriber with VAD auto-slicing,
 * which cuts at silences — the Phase 0 spike measured whole-passage decoding
 * suppressing the Fatiha's genuine repetitions, so short slices are a
 * requirement, not a preference. `promptPreviousSlices` stays false for the
 * same reason: feeding earlier text back in would reintroduce exactly that
 * suppression across slice boundaries.
 */

const MODEL_DIR = 'recite-models';
/** Tarteel's whisper-base fine-tune (Apache-2.0), third-party GGML conversion
    verified by the Phase 0 fluent baseline. Phase 5 converts from Tarteel's
    own weights instead. */
const WHISPER_URL = 'https://huggingface.co/B1uqa/whisper-base-ar-quran-ggml/resolve/main/ggml-model.bin';
const WHISPER_FILE = 'ggml-base-ar-quran.bin';
/** Silero VAD, the model whisper.rn's transcriber slices with. */
const VAD_URL = 'https://huggingface.co/ggml-org/whisper-vad/resolve/main/ggml-silero-v6.2.0.bin';
const VAD_FILE = 'ggml-silero-v6.2.0.bin';

/** The slices of what whisper.rn hands back that this screen reads. */
type TranscribeEvent = {
  sliceIndex?: number;
  processTime?: number;
  data?: { result?: string };
};
type Stoppable = { stop: () => Promise<unknown>; release: () => Promise<unknown> };
type Releasable = { release: () => Promise<unknown> };

function modelDir(): Directory {
  return new Directory(Paths.document, MODEL_DIR);
}

function modelFile(name: string): File {
  return new File(modelDir(), name);
}

function haveModels(): boolean {
  try {
    return modelFile(WHISPER_FILE).exists && modelFile(VAD_FILE).exists;
  } catch {
    return false;
  }
}

function SpikeButton({
  label,
  onPress,
  disabled = false,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor:
            disabled || pressed ? theme.backgroundSelected : theme.accent,
        },
      ]}
    >
      <ThemedText
        type="smallBold"
        style={{ color: disabled ? theme.textSecondary : theme.textOnAccent }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const reference = buildReference(Recitations.fatiha.verses);

/* Per-verse word groups with their offsets into the reference, computed once
   at module level so the render mutates nothing. */
const VERSE_ROWS = Recitations.fatiha.verses.map((verse, v) => ({
  arabic: verse.arabic,
  words: reference.filter((word) => word.verse === v + 1),
  start: reference.findIndex((word) => word.verse === v + 1),
}));

export default function ReciteSpikeScreen() {
  useKeepAwake();
  const theme = useTheme();

  const [phase, setPhase] = useState<'idle' | 'downloading' | 'ready' | 'starting' | 'listening'>(
    haveModels() ? 'ready' : 'idle',
  );
  const [status, setStatus] = useState('');
  const [transcript, setTranscript] = useState('');
  const [loadMs, setLoadMs] = useState<number>();
  const [processMs, setProcessMs] = useState<number>();

  const slices = useRef(new Map<number, string>());
  const transcriber = useRef<Stoppable | undefined>(undefined);
  const contexts = useRef<Releasable[]>([]);

  const alignment = align(reference, transcript);

  const download = useCallback(async () => {
    setPhase('downloading');
    try {
      const dir = modelDir();
      if (!dir.exists) dir.create({ intermediates: true });
      if (!modelFile(VAD_FILE).exists) {
        setStatus('Fetching the voice-detection model (about 1 MB)…');
        await File.downloadFileAsync(VAD_URL, modelFile(VAD_FILE));
      }
      if (!modelFile(WHISPER_FILE).exists) {
        setStatus('Fetching the recognition model (about 148 MB, wifi recommended)…');
        await File.downloadFileAsync(WHISPER_URL, modelFile(WHISPER_FILE));
      }
      setStatus('');
      setPhase(haveModels() ? 'ready' : 'idle');
      if (!haveModels()) setStatus('The download did not land. Try again.');
    } catch (error) {
      setPhase('idle');
      setStatus(`Download failed: ${String(error)}`);
    }
  }, []);

  const stop = useCallback(async () => {
    try {
      await transcriber.current?.stop();
      await transcriber.current?.release();
    } catch {
      /* stopping an already-stopped transcriber is not an event */
    }
    transcriber.current = undefined;
    for (const context of contexts.current) {
      try {
        await context.release();
      } catch {
        /* released is released */
      }
    }
    contexts.current = [];
    setPhase(haveModels() ? 'ready' : 'idle');
  }, []);

  useEffect(() => () => void stop(), [stop]);

  const start = useCallback(async () => {
    if (Platform.OS === 'web') {
      setStatus('The microphone pipeline is native — open this on the phone build.');
      return;
    }
    setPhase('starting');
    setStatus('Loading models into memory…');
    slices.current.clear();
    setTranscript('');
    try {
      /* Native modules, loaded only here so the web export never executes
         them. The casts are to the narrow slices this screen uses. */
      const whisper = await import('whisper.rn/index');
      const realtime = await import('whisper.rn/realtime-transcription/index');
      const adapters = await import('whisper.rn/realtime-transcription/adapters/AudioPcmStreamAdapter');

      const t0 = Date.now();
      const whisperContext = await whisper.initWhisper({
        filePath: modelFile(WHISPER_FILE).uri,
      });
      const vadContext = await whisper.initWhisperVad({
        filePath: modelFile(VAD_FILE).uri,
      });
      contexts.current = [whisperContext, vadContext];
      setLoadMs(Date.now() - t0);

      const audioStream = new adapters.AudioPcmStreamAdapter();
      /* The transcriber's contract is the ring-buffer wrapper, not the raw
         VAD context — the README's shorthand elides it; the types do not. */
      const vad = new realtime.RingBufferVad(vadContext);
      const rt = new realtime.RealtimeTranscriber(
        { whisperContext, vadContext: vad, audioStream },
        {
          audioSliceSec: 15,
          promptPreviousSlices: false,
          transcribeOptions: { language: 'ar' },
        },
        {
          onTranscribe: (event: TranscribeEvent) => {
            const text = event.data?.result;
            if (typeof text === 'string') {
              slices.current.set(event.sliceIndex ?? 0, text);
              const joined = [...slices.current.entries()]
                .sort(([a], [b]) => a - b)
                .map(([, slice]) => slice)
                .join(' ');
              setTranscript(joined);
            }
            if (typeof event.processTime === 'number') setProcessMs(event.processTime);
          },
          onError: (error: unknown) => setStatus(`Recognition error: ${String(error)}`),
          onStatusChange: (active: boolean) => {
            setPhase(active ? 'listening' : haveModels() ? 'ready' : 'idle');
          },
        },
      );
      transcriber.current = rt as unknown as Stoppable;
      await rt.start();
      setStatus('');
      setPhase('listening');
    } catch (error) {
      setStatus(`Could not start: ${String(error)}`);
      await stop();
    }
  }, [stop]);

  return (
    <ScrollView
      style={{ backgroundColor: theme.background }}
      contentContainerStyle={styles.container}
    >
      <Stack.Screen options={{ title: 'Recite spike' }} />
      <ThemedText type="caption" style={{ color: theme.textSecondary }}>
        Phase 2 instrument — timings and the raw transcript are shown on
        purpose. Nothing heard here is saved or sent anywhere.
      </ThemedText>

      {phase === 'idle' || phase === 'downloading' ? (
        <SpikeButton
          label={phase === 'downloading' ? 'Downloading…' : 'Get the models (~149 MB)'}
          onPress={download}
          disabled={phase === 'downloading'}
        />
      ) : (
        <View style={styles.row}>
          <SpikeButton
            label={
              phase === 'listening' ? 'Listening…' : phase === 'starting' ? 'Starting…' : 'Start'
            }
            onPress={start}
            disabled={phase !== 'ready'}
          />
          <SpikeButton
            label="Stop"
            onPress={() => void stop()}
            disabled={phase !== 'listening'}
          />
        </View>
      )}

      {status.length > 0 ? (
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {status}
        </ThemedText>
      ) : null}

      <View
        style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
      >
        {VERSE_ROWS.map((row) => (
          <ThemedText key={row.arabic} type="arabicLead" style={styles.verse}>
            {row.words.map((word, w) => (
              <Text
                key={`${word.verse}-${word.index}`}
                style={{
                  color:
                    row.start + w < alignment.position
                      ? theme.accent
                      : alignment.held
                        ? theme.textSecondary
                        : theme.text,
                }}
              >
                {word.word}
                {w < row.words.length - 1 ? ' ' : ''}
              </Text>
            ))}
          </ThemedText>
        ))}
      </View>

      <View style={styles.stats}>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {`Word ${alignment.position} of ${reference.length}`}
          {alignment.held ? ' · held' : ''}
          {alignment.complete ? ' · complete' : ''}
        </ThemedText>
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {`Model load ${loadMs ?? '—'} ms · last slice ${processMs ?? '—'} ms`}
        </ThemedText>
      </View>

      {transcript.length > 0 ? (
        <View
          style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
        >
          <ThemedText type="caption" style={{ color: theme.textSecondary }}>
            Raw transcript (instrument only — the product screen never shows this)
          </ThemedText>
          <ThemedText type="small">{transcript}</ThemedText>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.four,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
    width: '100%',
    alignSelf: 'center',
  },
  row: { flexDirection: 'row', gap: Spacing.two },
  button: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.medium,
  },
  card: {
    borderWidth: 1,
    borderRadius: Radius.large,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  verse: { textAlign: 'right' },
  stats: { gap: Spacing.half },
});
