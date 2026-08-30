import { Stack } from 'expo-router';
import { useKeepAwake } from 'expo-keep-awake';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { Recitations } from '@/content/recitations';
import { useTheme } from '@/hooks/use-theme';
import { align, buildReference } from '@/lib/recite-align';
import {
  canRecite,
  downloadReciteModels,
  RECITE_DOWNLOAD_MB,
  reciteModelsReady,
  startFollowSession,
  type FollowSession,
} from '@/lib/recite-session';

/**
 * Phase 2 of docs/recite-with-me.md — the phone spike, an INSTRUMENT.
 *
 * Numbers on real hardware: model load time, slice process time, and whether
 * the follower tracks a live voice through this phone's microphone. Linked
 * from nowhere, reachable only at /recite-spike, and it earns one licence the
 * product component (`recite-follow.tsx`) never has: it shows the raw
 * transcript and the timings, because measurement is its whole job. The
 * machinery is `lib/recite-session.ts`, shared with the product card — this
 * screen measures the same pipeline users get, not a copy of it.
 *
 * Strings are deliberately English literals, outside i18n: a dev instrument's
 * labels would be churn in the manifest for a screen users never see.
 */

const reference = buildReference(Recitations.fatiha.verses);

/* Per-verse word groups with their offsets, computed once at module level so
   the render mutates nothing. */
const VERSE_ROWS = Recitations.fatiha.verses.map((verse, v) => ({
  arabic: verse.arabic,
  words: reference.filter((word) => word.verse === v + 1),
  start: reference.findIndex((word) => word.verse === v + 1),
}));

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
        { backgroundColor: disabled || pressed ? theme.backgroundSelected : theme.accent },
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

export default function ReciteSpikeScreen() {
  useKeepAwake();
  const theme = useTheme();

  const [phase, setPhase] = useState<'idle' | 'downloading' | 'ready' | 'starting' | 'listening'>(
    reciteModelsReady() ? 'ready' : 'idle',
  );
  const [status, setStatus] = useState(
    canRecite ? '' : 'Native only — open this on the phone build.',
  );
  const [transcript, setTranscript] = useState('');
  const [loadMs, setLoadMs] = useState<number>();
  const [processMs, setProcessMs] = useState<number>();
  const session = useRef<FollowSession | undefined>(undefined);

  const alignment = align(reference, transcript);

  const stop = useCallback(async () => {
    const current = session.current;
    session.current = undefined;
    await current?.stop();
    setPhase(reciteModelsReady() ? 'ready' : 'idle');
  }, []);

  useEffect(() => () => void session.current?.stop(), []);

  const download = useCallback(async () => {
    setPhase('downloading');
    try {
      const ok = await downloadReciteModels((percent) =>
        setStatus(`Fetching the recognition model (about 148 MB, wifi recommended)… ${percent}%`),
      );
      setStatus(ok ? '' : 'The download did not land. Try again.');
      setPhase(ok ? 'ready' : 'idle');
    } catch (error) {
      setStatus(`Download failed: ${String(error)}`);
      setPhase('idle');
    }
  }, []);

  const start = useCallback(async () => {
    if (!canRecite) return;
    setPhase('starting');
    setStatus('Loading models into memory…');
    setTranscript('');
    try {
      const started = await startFollowSession({
        onTranscript: setTranscript,
        onProcessTime: setProcessMs,
        onError: (message) => setStatus(`Recognition error: ${message}`),
      });
      session.current = started;
      setLoadMs(started.loadMs);
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
        Phase 2 instrument — timings and the raw transcript are shown on purpose. Nothing heard
        here is saved or sent anywhere.
      </ThemedText>

      {phase === 'idle' || phase === 'downloading' ? (
        <SpikeButton
          label={
            phase === 'downloading' ? 'Downloading…' : `Get the models (~${RECITE_DOWNLOAD_MB} MB)`
          }
          onPress={download}
          disabled={phase === 'downloading' || !canRecite}
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
          <SpikeButton label="Stop" onPress={() => void stop()} disabled={phase !== 'listening'} />
        </View>
      )}

      {status.length > 0 ? (
        <ThemedText type="small" style={{ color: theme.textSecondary }}>
          {status}
        </ThemedText>
      ) : null}

      <View
        style={[
          styles.card,
          { borderColor: theme.goldSoft },
        ]}
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
          style={[
            styles.card,
            { borderColor: theme.goldSoft },
          ]}
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
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.four,
    gap: Spacing.three,
  },
  verse: { textAlign: 'right' },
  stats: { gap: Spacing.half },
});
