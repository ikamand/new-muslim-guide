import { StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { dailyEntry } from '@/content/collections';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Today's entry from whichever collection is `daily`.
 *
 * ## It does not know which collection it is showing
 *
 * `dailyEntry()` decides, in the content layer, and this renders whatever it
 * returns — the kicker is the collection's own title, so a second daily
 * collection joins the rotation with no change here. That is the claim the
 * `collection` kind was added to make, and a component reaching for one by id
 * would be the branch `types.ts` forbids.
 *
 * ## Why one a day rather than a list
 *
 * Fifteen names is a fortnight, and then it comes round again. Somebody three
 * weeks into Islam cannot hold fifteen names of God at once and does not need
 * to; one a day, met on the way to something else, is how they are actually
 * learned. The whole set is one tap away for anyone who wants it.
 *
 * The explanation is deliberately clamped. These are a publisher's footnotes
 * and one of them runs to a paragraph — Today is not where a paragraph goes,
 * and the collection screen shows it whole.
 */
const CLAMP_LINES = 3;

export function DailyCollectionCard() {
  const theme = useTheme();
  const today = dailyEntry();
  if (!today) return null;

  const { collection, entry } = today;

  return (
    <PressableLink
      href={{ pathname: '/collection/[id]', params: { id: collection.id } }}
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.head}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {collection.title}
        </ThemedText>
      </View>

      <ThemedText type="cardTitle">{entry.title}</ThemedText>

      {entry.arabic ? (
        <ThemedText type="arabicLead" style={styles.arabic}>
          {entry.arabic}
        </ThemedText>
      ) : null}

      <ThemedText type="small" themeColor="textSecondary" numberOfLines={CLAMP_LINES}>
        {entry.translation}
      </ThemedText>
    </PressableLink>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.four,
    gap: Spacing.two,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  kicker: { textTransform: 'uppercase', letterSpacing: 1 },
  arabic: { textAlign: 'right', writingDirection: 'rtl' },
});
