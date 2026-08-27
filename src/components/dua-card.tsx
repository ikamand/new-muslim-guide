import { StyleSheet, View } from 'react-native';

import { MarkedText } from '@/components/marked-text';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { pickForNow, resolvePick, type CardReason } from '@/content/duas/card';
import { Radius, Spacing } from '@/constants/theme';
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
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.head}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {t(REASON_KEY[pick.reason])}
        </ThemedText>
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
