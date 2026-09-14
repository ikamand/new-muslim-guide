import { StyleSheet } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { dailyEntry } from '@/content/collections';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * The day's name, in the header beside the date it belongs to.
 *
 * ## Why it moved
 *
 * It was a coda on Today's body, between the adhkār of sleep and the night
 * prayer, and at night it split the two things somebody does before bed. Iyad,
 * 13 Sep 2026: "the names of Allah seems to not fit on the page anymore". The
 * old coda's own reasoning already pointed here — it was "closer to the Hijri
 * date under the greeting than to anything that asks to be acted on" — so the
 * ʿunwān now carries the greeting, the date and the name of the day.
 *
 * ## What it kept from the coda
 *
 * Permanent rather than competing for Today's one slot, because its cadence is
 * `daily` (`cadence.ts`), and never counted as progress. Not paginated: the
 * whole set is one tap away, and swiping ninety-nine names turns a once-a-day
 * grace note into a browsing surface. It does not know which collection it is
 * showing — `dailyEntry()` decides in the content layer.
 *
 * ## Why the Arabic is not gold
 *
 * The design mock set it in gold. The whole line is a link, and gold is
 * illumination, never a control (`jadwal.tsx`), so the name takes the text
 * colour and the gold stays with the rules around it.
 */
export function DayName() {
  const theme = useTheme();
  const today = dailyEntry();
  if (!today) return null;

  const { collection, entry } = today;

  return (
    <PressableLink
      href={{ pathname: '/collection/[id]', params: { id: collection.id } }}
      accessibilityLabel={`${collection.title}: ${entry.title}, ${entry.translation}`}
      style={styles.line}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      {entry.arabic ? (
        <ThemedText type="arabicName" style={styles.centred}>
          {entry.arabic}
        </ThemedText>
      ) : null}
      <ThemedText type="small" themeColor="textSecondary" numberOfLines={2} style={styles.centred}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          {entry.title}
        </ThemedText>
        {`  ·  ${entry.translation}`}
      </ThemedText>
    </PressableLink>
  );
}

const styles = StyleSheet.create({
  line: {
    alignItems: 'center',
    paddingTop: Spacing.one,
    paddingBottom: Spacing.three,
    paddingHorizontal: Spacing.two,
  },
  centred: {
    textAlign: 'center',
  },
});
