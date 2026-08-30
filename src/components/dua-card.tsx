import { StyleSheet, View } from 'react-native';

import { MarkedText } from '@/components/marked-text';
import { PressableLink } from '@/components/pressable-link';
import { Rubric } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { pickForNow, resolvePick, type CardReason } from '@/content/duas/card';
import { Spacing } from '@/constants/theme';
import { useHijriToday } from '@/hooks/use-hijri';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * One duʿa, chosen for right now, on both Today and the Duʿa tab.
 *
 * One component in two places rather than two that look alike, because the
 * pair that look alike are the pair that drift.
 *
 * ## It says why it is showing
 *
 * "It is Friday", "Breaking your fast soon", "Always worth saying". A card
 * that silently swaps its contents reads as random; the same card with a
 * reason on it reads as the app paying attention — and if the reason is wrong,
 * it is visibly wrong instead of quietly wrong.
 *
 * ## Long duʿas are cut, not squeezed
 *
 * Some of these run to a paragraph. Rather than shrink the type or let a card
 * grow to half a screen, a long one clamps and offers the whole thing on its
 * own page. Arabic is never scaled down to fit: Amiri stacks vowel marks above
 * and below the line, and small Arabic is the fastest way to make a text
 * unreadable to the person who needs it most.
 */
const REASON_KEY: Record<CardReason, UIKey> = {
  iftar: 'card.iftar',
  fasting: 'card.fasting',
  friday: 'card.friday',
  hajj: 'card.hajj',
  moment: 'card.moment',
  always: 'card.always',
};

/** Past this, the card shows an opening and a way to the rest. */
const CLAMP_AT = 190;

export function DuaCard() {
  const theme = useTheme();
  const { t } = useLocale();
  const hijri = useHijriToday();
  const { today } = usePrayerTimes();

  const maghrib = today?.prayers.find((prayer) => prayer.id === 'maghrib')?.time;
  const pick = pickForNow({ now: new Date(), hijri, maghrib });
  const resolved = pick ? resolvePick(pick) : undefined;
  if (!pick || !resolved) return null;

  const { occasion, line } = resolved;
  const long = line.arabic.length > CLAMP_AT || (line.english?.length ?? 0) > CLAMP_AT;

  return (
    <PressableLink
      href={{ pathname: '/dua-book/[id]', params: { id: String(occasion.id) } }}
      style={[styles.card, { borderColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.head}>
        {/*
          The reason is rubric, not a grey kicker.

          "Always worth saying", "It is Friday" — this is the card explaining
          why it chose what it chose, which is exactly the job red ink did in
          a manuscript: the note about the text, never the text. It is also
          the only red on the screen, so it reads as a mark rather than as a
          colour scheme.
        */}
        <Rubric label={t(REASON_KEY[pick.reason])} align="left" />
        {line.repeat ? (
          <ThemedText type="smallBold" themeColor="accent">
            {t('card.times').replace('{n}', String(line.repeat))}
          </ThemedText>
        ) : null}
      </View>

      <ThemedText type="cardTitle">{occasion.english || occasion.arabic}</ThemedText>

      <ThemedText type="arabicLead" style={styles.arabic} numberOfLines={long ? 3 : undefined}>
        <MarkedText text={line.arabic} spans={line.emphasis} colour={theme.accent} />
      </ThemedText>

      {line.english ? (
        <ThemedText
          type="small"
          themeColor="textSecondary"
          numberOfLines={long ? 3 : undefined}>
          <MarkedText text={line.english} spans={line.emphasis} colour={theme.accent} bold />
        </ThemedText>
      ) : null}

      {long ? (
        <ThemedText type="smallBold" themeColor="accent">
          {t('card.seeWhole')}
        </ThemedText>
      ) : null}
    </PressableLink>
  );
}

const styles = StyleSheet.create({
  /*
    A panel between two rules rather than a card.

    Same content, no box: the fill, the border and the radius are what made
    this one of four near-identical rectangles stacked down Today. Rules top
    and bottom separate it from what is above and below without claiming it
    is a different kind of object.
  */
  card: {
    /*
      A bottom rule only.

      Every block on Today drawing both meant every join between two blocks
      showed two hairlines a gap apart, which reads as a mistake. One rule
      per join: a block closes itself and the next one opens against it.
    */
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.four,
    gap: Spacing.two,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  arabic: { textAlign: 'right', writingDirection: 'rtl' },
});
