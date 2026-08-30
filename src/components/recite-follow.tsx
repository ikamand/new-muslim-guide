import Ionicons from '@expo/vector-icons/Ionicons';
import { requestRecordingPermissionsAsync } from 'expo-audio';
import { useKeepAwake } from 'expo-keep-awake';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
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
 * "Recite with me" — the product face of docs/recite-with-me.md, phase 4.
 *
 * The reader recites; the words light up as they are heard, the way a patient
 * teacher's finger moves along a line. The five rules from the plan are this
 * component's shape, not its intentions:
 *
 * 1. It follows, never grades — there is no score, no count, no "wrong"
 *    anywhere in what it can render.
 * 2. The failure mode is stillness. When the listening loses the thread the
 *    words dim, and nothing is said.
 * 3. Nothing is recorded or sent; `recite-session` cannot write audio at all.
 * 4. Nothing about the attempt reaches `observations`.
 * 5. The transcript is never rendered — model-written Arabic never reaches a
 *    screen. The only Arabic here is the app's own reviewed text.
 *
 * One verse at a time, because the person doing this is holding the surah in
 * their memory, not their eyes — the screen shows the ayah being recited and
 * advances when they do.
 */
export function ReciteFollow({ verses }: { verses: readonly { arabic: string }[] }) {
  const theme = useTheme();
  const { t } = useLocale();

  const reference = useMemo(() => buildReference(verses), [verses]);

  const [open, setOpen] = useState(false);
  const [state, setState] = useState<
    'closed' | 'download' | 'downloading' | 'ready' | 'starting' | 'listening' | 'denied'
  >('closed');
  const [status, setStatus] = useState('');
  const [transcript, setTranscript] = useState('');
  /*
    The highlight never moves backwards. Streaming recognition REVISES its
    partial text, and re-aligning a revised transcript can compute a smaller
    position — on the first phone test the highlight visibly jumped back and
    forth, which reads as the app changing its mind about the reader. A
    teacher's finger only rests or moves on, so what is SHOWN is the
    session's high-water mark, kept in the transcript handler; `held` and
    `complete` still come from the live alignment.
  */
  const [shownPosition, setShownPosition] = useState(0);
  const session = useRef<FollowSession | undefined>(undefined);

  const alignment = align(reference, transcript);

  const stop = useCallback(async () => {
    const current = session.current;
    session.current = undefined;
    await current?.stop();
    setState(reciteModelsReady() ? 'ready' : 'download');
  }, []);

  useEffect(() => () => void session.current?.stop(), []);

  /* The session outlives nothing: complete means done, quietly. */
  useEffect(() => {
    if (alignment.complete && session.current) void stop();
  }, [alignment.complete, stop]);

  const toggleOpen = useCallback(() => {
    setOpen((was) => {
      const now = !was;
      if (now) setState(reciteModelsReady() ? 'ready' : 'download');
      else void stop();
      return now;
    });
  }, [stop]);

  const download = useCallback(async () => {
    setState('downloading');
    try {
      const ok = await downloadReciteModels((percent) =>
        setStatus(`${t('recite.downloading.recognition')} ${percent}%`),
      );
      setStatus('');
      setState(ok ? 'ready' : 'download');
    } catch (error) {
      console.warn('recite download', error);
      setStatus(__DEV__ ? String(error) : '');
      setState('download');
    }
  }, [t]);

  const start = useCallback(async () => {
    const permission = await requestRecordingPermissionsAsync();
    if (!permission.granted) {
      setState('denied');
      return;
    }
    setState('starting');
    setTranscript('');
    setShownPosition(0);
    try {
      session.current = await startFollowSession({
        onTranscript: (text) => {
          setTranscript(text);
          const live = align(reference, text);
          setShownPosition((prev) => Math.max(prev, live.position));
        },
        onError: (message) => {
          /* Rule 2: the words dim; the reader is not interrupted. The log
             line is for the Metro terminal, not the screen. */
          console.warn('recite session', message);
        },
      });
      setState('listening');
    } catch (error) {
      /* The calm copy is for users; the cause is for whoever is debugging —
         visible in dev, in the Metro logs always. */
      console.warn('recite start', error);
      setStatus(__DEV__ ? `${t('recite.error')} — ${String(error)}` : t('recite.error'));
      await stop();
    }
  }, [reference, stop, t]);

  if (!canRecite || reference.length === 0) return null;

  /* The verse being recited: the one holding the next expected word. */
  const currentVerse =
    shownPosition < reference.length
      ? reference[shownPosition].verse
      : reference[reference.length - 1].verse;
  const verseWords = reference.filter((word) => word.verse === currentVerse);
  const verseStart = reference.findIndex((word) => word.verse === currentVerse);
  const totalVerses = reference[reference.length - 1].verse;

  return (
    <View style={[styles.card, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      <Pressable
        onPress={toggleOpen}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={({ pressed }) => [styles.header, { opacity: pressed ? 0.7 : 1 }]}
      >
        <Ionicons name="ear-outline" size={18} color={theme.textSecondary} />
        <ThemedText type="smallBold" style={styles.headerTitle}>
          {t('recite.title')}
        </ThemedText>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={18} color={theme.textSecondary} />
      </Pressable>

      {open && (
        <View style={styles.body}>
          {state !== 'listening' && !alignment.complete && (
            <ThemedText type="small" themeColor="textSecondary">
              {t('recite.explain')}
            </ThemedText>
          )}

          {(state === 'download' || state === 'downloading') && (
            <>
              <Pressable
                onPress={download}
                disabled={state === 'downloading'}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.button,
                  {
                    backgroundColor:
                      state === 'downloading' || pressed ? theme.backgroundSelected : theme.accent,
                  },
                ]}
              >
                <ThemedText
                  type="smallBold"
                  style={{
                    color: state === 'downloading' ? theme.textSecondary : theme.textOnAccent,
                  }}
                >
                  {t('recite.download').replace('{mb}', String(RECITE_DOWNLOAD_MB))}
                </ThemedText>
              </Pressable>
              {status.length > 0 && (
                <ThemedText type="small" themeColor="textSecondary">
                  {status}
                </ThemedText>
              )}
            </>
          )}

          {state === 'denied' && (
            <ThemedText type="small" themeColor="textSecondary">
              {t('recite.permission')}
            </ThemedText>
          )}

          {(state === 'ready' || state === 'starting') && (
            <Pressable
              onPress={start}
              disabled={state === 'starting'}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.button,
                {
                  backgroundColor:
                    state === 'starting' || pressed ? theme.backgroundSelected : theme.accent,
                },
              ]}
            >
              <ThemedText
                type="smallBold"
                style={{ color: state === 'starting' ? theme.textSecondary : theme.textOnAccent }}
              >
                {t(state === 'starting' ? 'recite.starting' : 'recite.start')}
              </ThemedText>
            </Pressable>
          )}

          {state === 'listening' && (
            <ListeningBody
              verseWords={verseWords}
              verseStart={verseStart}
              currentVerse={currentVerse}
              totalVerses={totalVerses}
              position={shownPosition}
              held={alignment.held}
              onStop={() => void stop()}
            />
          )}

          {alignment.complete && state !== 'listening' && (
            <ThemedText type="small" themeColor="accent">
              {t('recite.complete')}
            </ThemedText>
          )}

          {status.length > 0 && state === 'ready' && (
            <ThemedText type="small" themeColor="textSecondary">
              {status}
            </ThemedText>
          )}
        </View>
      )}
    </View>
  );
}

function ListeningBody({
  verseWords,
  verseStart,
  currentVerse,
  totalVerses,
  position,
  held,
  onStop,
}: {
  verseWords: readonly { word: string }[];
  verseStart: number;
  currentVerse: number;
  totalVerses: number;
  position: number;
  held: boolean;
  onStop: () => void;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  useKeepAwake();

  return (
    <View style={styles.listening}>
      <View style={styles.listeningRow}>
        <ThemedText type="caption" themeColor="textSecondary">
          {t('recite.ayahOf')
            .replace('{a}', String(currentVerse))
            .replace('{total}', String(totalVerses))}
        </ThemedText>
        <Pressable onPress={onStop} accessibilityRole="button" hitSlop={8}>
          <ThemedText type="smallBold" themeColor="accent">
            {t('recite.stop')}
          </ThemedText>
        </Pressable>
      </View>

      {position === 0 && !held ? (
        <ThemedText type="caption" themeColor="textSecondary">
          {t('recite.listeningHint')}
        </ThemedText>
      ) : null}
      <ThemedText type="arabicLead" style={styles.verse}>
        {verseWords.map((word, w) => (
          <Text
            key={`${currentVerse}-${w}`}
            style={{
              color:
                verseStart + w < position
                  ? theme.accent
                  : held
                    ? theme.textSecondary
                    : theme.text,
            }}
          >
            {word.word}
            {w < verseWords.length - 1 ? ' ' : ''}
          </Text>
        ))}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radius.medium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
  },
  headerTitle: { flex: 1 },
  body: {
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.three,
    gap: Spacing.three,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
  listening: { gap: Spacing.two },
  listeningRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verse: { textAlign: 'right' },
});
