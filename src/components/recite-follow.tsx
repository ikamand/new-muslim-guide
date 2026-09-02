import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { useKeepAwake } from 'expo-keep-awake';
import { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import type { ReciteClassroomController } from '@/hooks/use-recite-classroom';
import type { ReciteFollowController } from '@/hooks/use-recite-follow';
import { useTheme } from '@/hooks/use-theme';
import { RECITE_DOWNLOAD_MB } from '@/lib/recite-session';

/**
 * The controls of "Recite with me" — and only the controls.
 *
 * Iyad's redesign, 30 Aug 2026: the highlight lives in the surah screen's
 * own ayah cards (the reader reads the text they already read, and it
 * lights under their voice), so the little one-ayah verse display this
 * component used to carry is deleted. What remains is two faces of one
 * controller: `ReciteOpenRow`, the quiet in-flow row that opens the
 * feature, and `ReciteControls`, the bar the screen PINS above its scroll
 * — his amendment: the controls must not disappear while the page follows
 * the recitation downward.
 *
 * Since 2 Sep 2026 the bar fronts TWO modes of one machinery: follow (the
 * five rules bind — nothing here can express a score or a "wrong") and the
 * classroom (Phase 6 — opt-in, and inside it a score and a conceded word
 * are allowed; the amendment and its measured scope live in
 * docs/recite-with-me.md).
 */

export function ReciteOpenRow({ follow }: { follow: ReciteFollowController }) {
  const theme = useTheme();
  const { t } = useLocale();
  if (!follow.available || follow.open) return null;
  return (
    <Pressable
      onPress={follow.openControls}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: theme.backgroundElement,
          borderColor: theme.goldSoft,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Ionicons name="ear-outline" size={18} color={theme.textSecondary} />
      <ThemedText type="smallBold" style={styles.rowTitle}>
        {t('recite.title')}
      </ThemedText>
      <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
    </Pressable>
  );
}

export function ReciteControls({
  follow,
  classroom,
}: {
  follow: ReciteFollowController;
  classroom: ReciteClassroomController;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  if (!follow.open) return null;

  const busy =
    follow.state === 'downloading' || follow.state === 'starting' || classroom.state === 'starting';
  const classroomLive = classroom.active || classroom.state === 'finished';

  /* The classroom face of the bar: turn line, escape hatch, evaporating
     score. It replaces the follow controls while its loop runs. */
  if (classroomLive) {
    const heard = classroom.score === null
      ? 0
      : Math.round((classroom.score / 100) * classroom.wordCount);
    return (
      <View
        style={[styles.bar, { backgroundColor: theme.backgroundElement, borderColor: theme.goldSoft }]}
      >
        {classroom.active ? <KeepAwakeWhileListening /> : null}

        <View style={styles.barHead}>
          <Ionicons name="ear-outline" size={18} color={theme.textSecondary} />
          <ThemedText type="smallBold" style={styles.rowTitle}>
            {classroom.state === 'finished'
              ? t('recite.classroom.done')
              : classroom.turn === 'you'
                ? t('recite.classroom.yourTurn')
                : t('recite.classroom.listen')
                    .replace('{a}', String(classroom.currentVerse))
                    .replace('{total}', String(classroom.totalVerses))}
          </ThemedText>
          <Pressable
            onPress={() => {
              void classroom.stop();
              follow.close();
            }}
            accessibilityRole="button"
            accessibilityLabel={t('ask.close')}
            hitSlop={8}
          >
            {classroom.state === 'finished' ? (
              <Ionicons name="close" size={18} color={theme.textSecondary} />
            ) : (
              <ThemedText type="smallBold" themeColor="accent">
                {t('recite.stop')}
              </ThemedText>
            )}
          </Pressable>
        </View>

        {classroom.turn === 'scored' && classroom.score !== null ? (
          <ThemedText type="small" themeColor={classroom.score >= 80 ? 'malachite' : 'textSecondary'}>
            {t('recite.classroom.score')
              .replace('{n}', String(heard))
              .replace('{total}', String(classroom.wordCount))
              .replace('{pct}', String(classroom.score))}
          </ThemedText>
        ) : null}

        {classroom.turn === 'scored' ? (
          <View style={styles.pairRow}>
            <Pressable
              onPress={classroom.again}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.button,
                styles.pairButton,
                { backgroundColor: pressed ? theme.backgroundSelected : theme.accentMuted },
              ]}
            >
              <ThemedText type="smallBold" themeColor="accent">
                {t('recite.classroom.again')}
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={classroom.next}
              accessibilityRole="button"
              style={({ pressed }) => [
                styles.button,
                styles.pairButton,
                { backgroundColor: pressed ? theme.backgroundSelected : theme.accent },
              ]}
            >
              <ThemedText type="smallBold" style={{ color: theme.textOnAccent }}>
                {t('recite.classroom.next')}
              </ThemedText>
            </Pressable>
          </View>
        ) : null}

        {classroom.turn === 'you' ? (
          <Pressable
            onPress={classroom.skipWord}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: pressed ? theme.backgroundSelected : theme.accentMuted },
            ]}
          >
            <ThemedText type="smallBold" themeColor="accent">
              {t('recite.classroom.skip')}
            </ThemedText>
          </Pressable>
        ) : null}

        {classroom.state === 'starting' ? (
          <ThemedText type="small" themeColor="textSecondary">
            {t('recite.starting')}
          </ThemedText>
        ) : null}
      </View>
    );
  }

  return (
    <View
      style={[styles.bar, { backgroundColor: theme.backgroundElement, borderColor: theme.goldSoft }]}
    >
      {follow.state === 'listening' ? <KeepAwakeWhileListening /> : null}

      <View style={styles.barHead}>
        <Ionicons name="ear-outline" size={18} color={theme.textSecondary} />
        <ThemedText type="smallBold" style={styles.rowTitle}>
          {follow.state === 'listening'
            ? t('recite.ayahOf')
                .replace('{a}', String(follow.currentVerse))
                .replace('{total}', String(follow.totalVerses))
            : t('recite.title')}
        </ThemedText>

        {follow.state === 'listening' ? (
          <Pressable onPress={() => void follow.stop()} accessibilityRole="button" hitSlop={8}>
            <ThemedText type="smallBold" themeColor="accent">
              {t('recite.stop')}
            </ThemedText>
          </Pressable>
        ) : (
          <Pressable
            onPress={follow.close}
            accessibilityRole="button"
            accessibilityLabel={t('ask.close')}
            hitSlop={8}
          >
            <Ionicons name="close" size={18} color={theme.textSecondary} />
          </Pressable>
        )}
      </View>

      {follow.state === 'listening' ? (
        <ThemedText type="caption" themeColor="textSecondary">
          {follow.displayed === 0 ? t('recite.listeningHint') : t('recite.listening')}
        </ThemedText>
      ) : null}

      {follow.complete && follow.state !== 'listening' ? (
        <ThemedText type="small" themeColor="accent">
          {t('recite.complete')}
        </ThemedText>
      ) : null}

      {(follow.state === 'download' || follow.state === 'downloading') && (
        <Pressable
          onPress={() => void follow.download()}
          disabled={busy}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: busy || pressed ? theme.backgroundSelected : theme.accent },
          ]}
        >
          <ThemedText
            type="smallBold"
            style={{ color: busy ? theme.textSecondary : theme.textOnAccent }}
          >
            {t('recite.download').replace('{mb}', String(RECITE_DOWNLOAD_MB))}
          </ThemedText>
        </Pressable>
      )}

      {(follow.state === 'ready' || follow.state === 'starting') && (
        <>
          <Pressable
            onPress={() => void classroom.start()}
            disabled={busy}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: busy || pressed ? theme.backgroundSelected : theme.accent },
            ]}
          >
            <ThemedText
              type="smallBold"
              style={{ color: busy ? theme.textSecondary : theme.textOnAccent }}
            >
              {t('recite.classroom.start')}
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={() => void follow.start()}
            disabled={busy}
            accessibilityRole="button"
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: busy || pressed ? theme.backgroundSelected : theme.accentMuted },
            ]}
          >
            <ThemedText type="smallBold" themeColor={busy ? 'textSecondary' : 'accent'}>
              {t(follow.state === 'starting' ? 'recite.starting' : 'recite.start')}
            </ThemedText>
          </Pressable>
        </>
      )}

      {follow.state === 'denied' || classroom.state === 'denied' ? (
        <ThemedText type="small" themeColor="textSecondary">
          {t('recite.permission')}
        </ThemedText>
      ) : null}

      {follow.status.length > 0 ? (
        <ThemedText type="small" themeColor="textSecondary">
          {follow.status}
        </ThemedText>
      ) : null}
    </View>
  );
}

/**
 * The reciter's turn, as sound. Mounted by the surah screen ONLY while the
 * classroom's turn is his — never during static web render, where
 * `useAudioPlayer` throws (the lesson practice.tsx carries) — and unmounted
 * before the mic opens, so playback and listening never overlap.
 */
export function ReciterTurnPlayer({
  source,
  onFinished,
}: {
  source: Parameters<typeof useAudioPlayer>[0];
  onFinished: () => void;
}) {
  const player = useAudioPlayer(source);
  const status = useAudioPlayerStatus(player);
  const fired = useRef(false);
  /* Read by the watchdog through a ref — an effect with [] deps would
     otherwise close over the mount's status and always see zero. */
  const progress = useRef(0);

  useEffect(() => {
    progress.current = status.currentTime;
  }, [status.currentTime]);

  useEffect(() => {
    player.play();
  }, [player]);

  useEffect(() => {
    if (status.didJustFinish && !fired.current) {
      fired.current = true;
      onFinished();
    }
  }, [status.didJustFinish, onFinished]);

  /* A clip that never starts must not wedge the loop — no signal, a bad
     stream. After twelve silent seconds (the surah screen's own stall
     window) the reader's turn begins anyway; the text is on screen and the
     loop stays usable without the voice. */
  useEffect(() => {
    const watchdog = setTimeout(() => {
      if (!fired.current && progress.current < 0.25) {
        fired.current = true;
        onFinished();
      }
    }, 12000);
    return () => clearTimeout(watchdog);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

/** Hook rules forbid a conditional hook; a conditional component is fine. */
function KeepAwakeWhileListening() {
  useKeepAwake();
  return null;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderWidth: 1,
    borderRadius: Radius.medium,
  },
  rowTitle: { flex: 1 },
  bar: {
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  barHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
  pairRow: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  pairButton: {
    flex: 1,
  },
});
