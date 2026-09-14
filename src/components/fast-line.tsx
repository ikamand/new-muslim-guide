import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { WakeRow } from '@/components/wake-row';
import { Spacing } from '@/constants/theme';
import { useHijriToday } from '@/hooks/use-hijri';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useTheme } from '@/hooks/use-theme';
import type { Tonight } from '@/hooks/use-tonight';
import { computeDay, inferProfile } from '@/lib/prayer-times';

/**
 * The fast, on Today — docs/ramadan-mode.md, pieces R1 and R3.
 *
 * Two facts a first-time faster checks obsessively, and both are prayer
 * times wearing fasting vocabulary: suhoor ends at Fajr, iftar is at
 * Maghrib. Computed from the times the app already holds offline; zero new
 * calculation, zero religious claims, works in a basement.
 *
 * Its own slim line beneath the prayer card, not a row on it — the card is
 * untouched by standing instruction (ui-redesign-plan Phase 2), and this
 * default is recorded in ramadan-mode.md as Iyad's to overturn.
 *
 * The wake-up switch rides the same line: during Shaʿban's second half the
 * line IS the offer ("Ramadan is close"), and during the month it is the
 * changed-mind path — the person who slept through suhoor is looking at
 * this line tomorrow, and the fix is one tap deep, exactly where their
 * regret is. The switch's permanent home is Settings; this is a door, not
 * the hinge.
 *
 * Never a day number. The calculation misses the sighted month by a day
 * often enough that "day 7 of Ramadan" would sometimes be a lie — and
 * nothing here counts anything about the reader.
 */
export function FastLine({ night }: { night?: Pick<Tonight, 'state' | 'ramadan'> } = {}) {
  const theme = useTheme();
  const { t } = useLocale();
  const hijri = useHijriToday();
  const { today } = usePrayerTimes();
  const { coords } = useLocation();

  const inRamadan = hijri?.month === 9;
  const ramadanClose = hijri?.month === 8 && hijri.day >= 15;
  if (!inRamadan && !ramadanClose) return null;
  /*
    Beside Today's night card (13 Sep 2026). At night the card carries the
    wake-up switch, so this line steps aside: before Ramadan the fortnight's
    offer waits for the day and stays on the Reminders screen; on a night of
    Ramadan the card carries the suhoor switch until the last third; and on
    the night of Eid there is no fast to wake for, though the civil date is
    still Ramadan until midnight. From the last third of a night of Ramadan
    the card is the night prayer, so this line comes back for suhoor.
  */
  if (night && !(night.ramadan && night.state === 'third')) return null;

  const fajr = today?.prayers.find((prayer) => prayer.id === 'fajr')?.time;
  const maghrib = today?.prayers.find((prayer) => prayer.id === 'maghrib')?.time;

  let line: string | undefined;
  if (inRamadan && fajr && maghrib) {
    const now = new Date();
    if (now < fajr) {
      line = t('fast.suhoor').replace('{time}', timeOf(fajr));
    } else if (now < maghrib) {
      line = t('fast.iftar').replace('{time}', timeOf(maghrib));
    } else if (coords) {
      /* After iftar the day's fast is over; the next fact is tomorrow's dawn. */
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      const nextFajr = computeDay(coords, tomorrow, inferProfile(coords)).prayers.find(
        (prayer) => prayer.id === 'fajr',
      )?.time;
      if (nextFajr) line = t('fast.suhoor').replace('{time}', timeOf(nextFajr));
    }
  }

  return (
    <View
      style={[styles.card, { borderColor: theme.goldSoft }]}
    >
      {line ? <ThemedText type="smallBold">{line}</ThemedText> : null}
      {ramadanClose ? (
        <ThemedText type="small" themeColor="textSecondary">
          {t('ramadan.wake.help')}
        </ThemedText>
      ) : null}
      <WakeRow flag="suhoorWakeUp" />
    </View>
  );
}

const timeOf = (date: Date) =>
  date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

const styles = StyleSheet.create({
  /*
    A panel between rules, like everything else on Today.

    This was missed in the first pass because it renders nothing outside
    Ramadan and the fortnight before — so Today looked card-free on screen
    while still carrying one for six weeks of the year. Out-of-season UI does
    not show up in a screenshot; it has to be found by reading the imports.
  */
  card: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.three,
    gap: Spacing.one,
  },
});
