import { StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { dailyEntry } from '@/content/collections';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Today's entry from whichever collection is `daily`.
 *
 * ## A coda, not a card
 *
 * It shipped as a card and was wrong. Directly under the duʿa card, dressed
 * identically — kicker, title, right-aligned Arabic, supporting line — the two
 * read as one thing repeated, and Today grew a fourth box on a screen whose
 * whole problem is that it has too many.
 *
 * So this is deliberately not a card. A hairline, two lines, no fill and no
 * border: closer to the Hijri date under the greeting than to anything that
 * asks to be acted on. It is the only thing on Today that is not a task, a
 * deadline or a decision, and it should not be dressed like one.
 *
 * ## Why it is permanent rather than competing for the slot
 *
 * Because its cadence is `daily`, and `cadence.ts` defines that as permanent
 * on Today and never counted as progress. Seasons and celebrations are
 * `yearly`, and the ranked "worth today" slot is what `yearly` is for. Letting
 * an event displace this would mean the name vanishing for a fortnight at a
 * time, which is not a daily practice. At two lines it costs little enough to
 * keep.
 *
 * Not paginated, deliberately: swiping a set of ninety-nine turns a once-a-day
 * grace note into a browsing surface, and the whole set is one tap away.
 *
 * ## It does not know which collection it is showing
 *
 * `dailyEntry()` decides, in the content layer, and this renders whatever it
 * returns. A second daily collection joins the rotation with no change here,
 * which is the claim the `collection` kind was added to make.
 */
export function DailyCollectionCard() {
  const theme = useTheme();
  const today = dailyEntry();
  if (!today) return null;

  const { collection, entry } = today;

  return (
    <PressableLink
      href={{ pathname: '/collection/[id]', params: { id: collection.id } }}
      style={styles.row}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      {/*
        One line, Latin left and Arabic right, rather than the Arabic stacked
        above on its own.

        Stacked, a two-word name sat alone across the full width with the
        Amiri line box under it, and the coda came out four lines tall and read
        as two unrelated fragments. Side by side it is two lines at most and
        reads as one thought. Centred rather than baseline-aligned on purpose:
        the two scripts have different line boxes, and matching baselines
        across them by hand is the sort of eyeballing the Arabic rungs exist to
        prevent.
      */}
      <View style={styles.line}>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2} style={styles.latin}>
          <ThemedText type="smallBold">{entry.title}</ThemedText>
          {`  ·  ${entry.translation}`}
        </ThemedText>

        {entry.arabic ? (
          <ThemedText type="arabicNote" style={styles.arabic}>
            {entry.arabic}
          </ThemedText>
        ) : null}
      </View>
    </PressableLink>
  );
}

const styles = StyleSheet.create({
  /*
    A rule above and nothing else. No fill, no border, no radius — those are
    what make a card look like a card, and this is not one. The negative top
    margin pulls it up against the card above so it reads as that card's
    footer rather than as a fifth thing in the stack.
  */
  row: {
    /*
      No rule of its own — the panel above closes with one — and no negative
      margins any more: they existed to fight a 32px screen gap that no
      longer exists, and they tilted the pressed highlight. Symmetric
      padding, plain footprint.
    */
    paddingVertical: Spacing.two,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  /* The Latin takes the room; the Arabic takes what it needs. */
  latin: { flex: 1 },
  arabic: {
    /*
      size and face: the `arabicNote` rung.

      Tried one rung up. At 22 the Arabic takes enough width to wrap the
      meaning onto a second line, and the coda grows back toward the card it
      stopped being. Small here is right because the full-size name is one tap
      away — which is the whole job of a coda.
    */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
