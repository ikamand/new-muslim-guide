import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { DoubleRule, QuietRow, Rubric } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { buildMonth, formatClock, hijriSpan, type MonthDay } from '@/lib/awqat-month';
import { PRAYER_IDS } from '@/lib/prayer-times';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * The monthly jadwal — the timetable every mosque pins to the wall, living in
 * the app, for any month, computed on the device.
 *
 * A ruled table rather than a calendar grid, because that is what the printed
 * object it descends from looks like: five time columns, the civil day in the
 * margin, the Hijri day on the right edge so the Islamic calendar is learned
 * by exposure, the way the greeting is. Fridays in gold; today is the lit
 * row, the same light the surah screen puts on the ayah being recited.
 *
 * ## What it marks, and what it refuses to
 *
 * The white days get a rubric row, linking to the fasting lesson that already
 * teaches them. The named moon-boundary days — 1 Ramadan, the Eids, ʿĀshūrāʾ,
 * ʿArafah — are deliberately absent: `learn/voluntary-fasting.ts` promises in
 * shipped, reviewed words that this app will not date them, and a monthly
 * table that quietly did would break that promise. See `awqat-month.ts`.
 */

/** The Hijri month's name from the dictionary, `hijri.month.1`–`12`. */
function monthName(t: (key: UIKey) => string, month: number): string {
  return t(`hijri.month.${month}` as UIKey);
}

function DayRow({ day, locale }: { day: MonthDay; locale: string }) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.dayRow,
        { borderBottomColor: theme.goldSoft },
        day.isToday && { backgroundColor: theme.backgroundSelected },
      ]}>
      <ThemedText
        type={day.isFriday ? 'smallBold' : 'small'}
        themeColor={day.isFriday ? 'gold' : 'text'}
        style={styles.dayNum}>
        {day.date.getDate()}
      </ThemedText>
      {day.times.prayers.map((prayer) => (
        <ThemedText key={prayer.id} type="small" themeColor="textSecondary" style={styles.cell}>
          {formatClock(prayer.time, locale)}
        </ThemedText>
      ))}
      <ThemedText type="caption" themeColor="textSecondary" style={styles.hijriCell}>
        {day.hijri ? String(day.hijri.day) : ''}
      </ThemedText>
    </View>
  );
}

export default function AwqatScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const { coords } = useLocation();
  /*
    The profile comes from the same hook the card uses — the one place a
    method choice is resolved — so this table can never print a different
    convention than the card above it.
  */
  const { profile } = usePrayerTimes();

  /*
    Which month is showing, as (year, 0-based month). Stepped by whole months
    from calendar parts — never by adding days — for the same DST reasons as
    everything in `prayer-times.ts`.
  */
  const [shown, setShown] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  if (!coords || !profile) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Stack.Screen options={{ title: t('awqat.title') }} />
        <ThemedText type="small" themeColor="textSecondary">
          {t('times.working')}
        </ThemedText>
      </ScrollView>
    );
  }

  const month = buildMonth(coords, shown.year, shown.month, profile, new Date());
  const span = hijriSpan(month.days);

  const civil = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(
    new Date(shown.year, shown.month, 1),
  );
  const hijriLine = span
    ? span.from.month === span.to.month
      ? `${monthName(t, span.from.month)} ${span.from.year}`
      : `${monthName(t, span.from.month)} – ${monthName(t, span.to.month)} ${span.to.year}`
    : '';

  const step = (delta: number) =>
    setShown(({ year, month: current }) => {
      const moved = new Date(year, current + delta, 1);
      return { year: moved.getFullYear(), month: moved.getMonth() };
    });

  /* The white days as one row above their first day, not three labels. */
  const firstWhiteIndex = month.days.findIndex((day) => day.isWhiteDay);

  return (
    <>
      <Stack.Screen options={{ title: t('awqat.title') }} />
      {/*
        The column header is child 3 and STICKS: the month stepper scrolls
        away and the labels stop at the top, so day 27 still says which
        column is ʿAsr. A printed jadwal never loses its header row either —
        the reader's thumb just couldn't hold it. Iyad's ask, 31 Aug. The
        row carries the page background for this: while stuck, day rows
        scroll beneath it.
      */}
      <ScrollView contentContainerStyle={styles.content} stickyHeaderIndices={[3]}>
      {/*
        The month steppers flank the name — ‹ September 2026 › — inside the
        ʿunwān itself, the way a bound calendar turns pages. A separate nav
        line under the headpiece cost a row and read as furniture (Iyad).
      */}
      <DoubleRule />
      <View style={styles.head}>
        <Pressable
          onPress={() => step(-1)}
          accessibilityRole="button"
          accessibilityLabel={t('awqat.previous')}
          hitSlop={14}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
          <Ionicons name="chevron-back" size={22} color={theme.gold} />
        </Pressable>
        <View style={styles.headText}>
          <ThemedText type="subtitle" style={styles.centred}>
            {civil}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centred}>
            {hijriLine}
          </ThemedText>
        </View>
        <Pressable
          onPress={() => step(1)}
          accessibilityRole="button"
          accessibilityLabel={t('awqat.next')}
          hitSlop={14}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}>
          <Ionicons name="chevron-forward" size={22} color={theme.gold} />
        </Pressable>
      </View>
      <DoubleRule />

      {/*
        Two Views, not one, and the split is load-bearing: this outer View is
        the sticky child, and on native RN wraps a sticky child in its own
        header component — which on Android interfered with the child's OWN
        layout style, stacking the five column names vertically (Iyad's
        device, 1 Sep). The outer carries only the background; the row
        layout lives on the inner View the wrapper never touches.
      */}
      <View style={{ backgroundColor: theme.background }}>
        <View style={[styles.headRow, { borderBottomColor: theme.gold }]}>
          <View style={styles.dayNum} />
          {PRAYER_IDS.map((id) => (
            <ThemedText key={id} type="caption" themeColor="gold" style={styles.cell}>
              {t(`awqat.col.${id}` as UIKey)}
            </ThemedText>
          ))}
          <ThemedText type="caption" themeColor="gold" style={styles.hijriCell}>
            {t('awqat.col.hijri')}
          </ThemedText>
        </View>
      </View>

      {month.days.map((day, index) => (
        <View key={day.date.getTime()}>
          {index === firstWhiteIndex && (
            <View style={[styles.eventRow, { borderBottomColor: theme.goldSoft }]}>
              <Rubric label={t('awqat.whiteDays')} align="left" />
              <QuietRow
                href={{ pathname: '/reference/[id]', params: { id: 'voluntary-fasting' } }}
                label={t('awqat.whiteDays.detail')}
              />
            </View>
          )}
          <DayRow day={day} locale={locale} />
        </View>
      ))}

      {/*
        The one sentence of honesty the whole table needs: the Hijri column is
        a projection. Sacred dates are settled by sighting, which is why they
        are not printed here — the app's own fasting lesson promises as much.
      */}
      <ThemedText type="small" themeColor="textSecondary" style={styles.foot}>
        {t('awqat.projected')}
      </ThemedText>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  /*
    Slimmer sides than the app's usual 24: this is a table, the columns need
    the width, and a printed jadwal runs close to its edges too.
  */
  content: {
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },
  headText: {
    flex: 1,
    gap: 2,
  },
  centred: {
    textAlign: 'center',
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.one,
    /* Even air above and below the labels — top was missing (Iyad). */
    paddingVertical: Spacing.two,
    borderBottomWidth: 1,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.one,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dayNum: {
    width: 26,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  hijriCell: {
    width: 30,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  eventRow: {
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  foot: {
    paddingTop: Spacing.four,
  },
});
