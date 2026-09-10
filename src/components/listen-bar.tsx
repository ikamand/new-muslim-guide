import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * The controls of listening, pinned above the surah while it plays.
 *
 * ## Why a bar, and why only while playing
 *
 * The surah screen scrolls itself to keep the sounding ayah in view, which
 * is right, and which put Repeat and Slower twenty ayahs above the reader by
 * the middle of An-Naba. Slower exists for "the ayah somebody is stuck on",
 * and that ayah is never at the top of the page. Reciting already had a bar
 * pinned for exactly this reason (Iyad, 30 Aug 2026); listening now has the
 * same one, in the same place, in the same clothes.
 *
 * It is mounted only while something plays. Before that the modifiers were
 * two buttons describing a mode nobody was in yet, and with them gone the
 * top of the surah is the cartouche, one pair of verbs and the reciter, so
 * the first ayah begins where the eye lands rather than halfway down.
 *
 * The stalled message lives here too, for the same reason: it is about the
 * ayah that is not arriving, and that ayah is wherever the page has scrolled
 * to, not under the reciter row at the top.
 *
 * Presentation only. Every decision (what repeat means, what rate slower is,
 * when a track counts as stalled) stays on the surah screen; this draws them.
 */
export function ListenBar({
  ayah,
  total,
  loop,
  slow,
  stalled,
  onStop,
  onToggleLoop,
  onToggleSlow,
}: {
  /** 1-based number of the ayah sounding now. */
  ayah: number;
  total: number;
  loop: boolean;
  slow: boolean;
  /** True when the current track has accepted a play and produced nothing. */
  stalled: boolean;
  onStop: () => void;
  onToggleLoop: () => void;
  onToggleSlow: () => void;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View style={[styles.bar, { backgroundColor: theme.backgroundElement, borderColor: theme.goldSoft }]}>
      <View style={styles.head}>
        <Ionicons name="volume-medium-outline" size={18} color={theme.textSecondary} />
        <ThemedText type="smallBold" style={styles.title}>
          {t('quran.listen.playing').replace('{a}', String(ayah)).replace('{total}', String(total))}
        </ThemedText>
        <Pressable
          onPress={onStop}
          accessibilityRole="button"
          accessibilityLabel={t('quran.stop')}
          hitSlop={8}>
          <ThemedText type="smallBold" themeColor="accent">
            {t('quran.stop')}
          </ThemedText>
        </Pressable>
      </View>

      {/*
        Two switches, not buttons: each is a mode you are in. Repeat holds on
        the ayah you started from or replays the surah; Slower is the rate
        the practice screen uses, so one surah does not sound like two apps.
      */}
      <View style={styles.modes}>
        <Pressable
          onPress={onToggleLoop}
          accessibilityRole="switch"
          accessibilityState={{ checked: loop }}
          style={[
            styles.mode,
            {
              backgroundColor: loop ? theme.accentMuted : 'transparent',
              borderColor: loop ? theme.accent : theme.border,
            },
          ]}>
          <Ionicons name="repeat" size={16} color={loop ? theme.accent : theme.textSecondary} />
          <ThemedText type="smallBold" themeColor={loop ? 'accent' : 'textSecondary'}>
            {t('practice.repeat')}
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={onToggleSlow}
          accessibilityRole="switch"
          accessibilityState={{ checked: slow }}
          style={[
            styles.mode,
            {
              backgroundColor: slow ? theme.accentMuted : 'transparent',
              borderColor: slow ? theme.accent : theme.border,
            },
          ]}>
          <Ionicons
            name="play-back-outline"
            size={16}
            color={slow ? theme.accent : theme.textSecondary}
          />
          <ThemedText type="smallBold" themeColor={slow ? 'accent' : 'textSecondary'}>
            {t('practice.slower')}
          </ThemedText>
        </Pressable>
      </View>

      {stalled ? (
        <ThemedText type="small" themeColor="textSecondary">
          {t('quran.audioUnavailable')}
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  /* The recite bar's own measurements, so the two are one bar to the eye. */
  bar: {
    borderBottomWidth: 1,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    gap: Spacing.two,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  title: { flex: 1 },
  modes: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  mode: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
