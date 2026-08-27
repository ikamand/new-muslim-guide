import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { MAX_PINNED, useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * The star that pins an occasion to the top of the Duʿa tab.
 *
 * Pinning used to be a labelled button on one screen holding nine duʿas, which
 * made it look like a property of those nine rather than something you can do
 * to anything in the book. A star on every occasion says what it is without a
 * word of explanation, and works the same in a row and on a page.
 *
 * ## Refusing the eleventh rather than dropping the first
 *
 * At the cap the star greys out. Silently discarding the oldest pin would
 * remove something the reader chose, without telling them, from a screen they
 * are not looking at — and they would only find out by missing it.
 *
 * The tap target is padded well past the glyph: this sits in a header and next
 * to row text, and a 44pt target is the difference between a control and a
 * frustration.
 */
export function PinStar({ id, size = 22 }: { id: number; size?: number }) {
  const theme = useTheme();
  const { t } = useLocale();
  const { pinnedDuas, togglePinned } = useSettings();

  const key = String(id);
  const pinned = pinnedDuas.includes(key);
  const blocked = !pinned && pinnedDuas.length >= MAX_PINNED;

  return (
    <Pressable
      onPress={() => togglePinned(key)}
      disabled={blocked}
      hitSlop={Spacing.two}
      accessibilityRole="button"
      accessibilityState={{ selected: pinned, disabled: blocked }}
      accessibilityLabel={pinned ? t('adhkar.unpin') : blocked ? t('adhkar.pinFull') : t('adhkar.pin')}
      style={({ pressed }) => [styles.hit, { opacity: blocked ? 0.3 : pressed ? 0.6 : 1 }]}>
      <Ionicons
        name={pinned ? 'star' : 'star-outline'}
        size={size}
        color={pinned ? theme.accent : theme.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  hit: {
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
