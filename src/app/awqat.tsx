import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { DoubleRule, JadwalRow, QuietRow } from '@/components/jadwal';
import { LocationAsk } from '@/components/location-ask';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { buildMonth, formatClock, hijriSpan, type MonthDay } from '@/lib/awqat-month';
import { placeLabel } from '@/lib/places';
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
 * The white days, 13 to 15, carry their Hijri number in gold, with a legend
 * under the table that links to the fasting lesson. The named moon-boundary days — 1 Ramadan, the Eids, ʿĀshūrāʾ,
 * ʿArafah — are deliberately absent: `learn/voluntary-fasting.ts` promises in
 * shipped, reviewed words that this app will not date them, and a monthly
 * table that quietly did would break that promise. See `awqat-month.ts`.
 */

/** The Hijri month's name from the dictionary, `hijri.month.1`–`12`. */
function monthName(t: (key: UIKey) => string, month: number): string {
  return t(`hijri.month.${month}` as UIKey);
}

/** "2026-09-24", the day page's parameter, from local calendar parts. */
function isoDay(date: Date): string {
  const two = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${two(date.getMonth() + 1)}-${two(date.getDate())}`;
}

/** Whole local days from `from` to `to`. */
function daysBetween(from: Date, to: Date): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

/**
 * Every row is a door to that day's page (10 Sep 2026): the jadwal you
 * read became a calendar you can enter, and the row is the target, as the
 * fihrist's rows are. Nothing is added to the row to say so.
 */
function DayRow({ day, locale, label }: { day: MonthDay; locale: string; label: string }) {
  const theme = useTheme();

  return (
    <PressableLink
      href={{ pathname: '/awqat-day', params: { date: isoDay(day.date) } }}
      accessibilityLabel={label}
      style={[
        styles.dayRow,
        { borderBottomColor: theme.goldSoft },
        day.isToday && { backgroundColor: theme.backgroundSelected },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
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
      {/*
        A white day's Hijri number in gold: the mark on the day itself. It
        replaced a rubric row above the first white day (Iyad, 11 Sep 2026),
        which read as a heading over every row beneath it, so 13 through the
        end of the month all looked like white days.
      */}
      <ThemedText
        type="caption"
        themeColor={day.isWhiteDay ? 'gold' : 'textSecondary'}
        style={[styles.hijriCell, day.isWhiteDay && styles.hijriWhite]}>
        {day.hijri ? String(day.hijri.day) : ''}
      </ThemedText>
    </PressableLink>
  );
}

export default function AwqatScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const { coords, source, place } = useLocation();
  /*
    The profile comes from the same hook the card uses — the one place a
    method choice is resolved — so this table can never print a different
    convention than the card above it.
  */
  const { profile, timezoneSuspect } = usePrayerTimes();

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
    /* Was "Working out today's times…" for ever, with nothing to press. */
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Stack.Screen options={{ title: t('awqat.title') }} />
        <LocationAsk />
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

  /*
    What is coming, before the table — only for the month that holds today,
    and only what arithmetic can honestly claim: the next Friday, and the
    projected white days with a day count. No moon-boundary dates; the
    fasting lesson's promise stands. (10 Sep 2026, from the audit's mock.)
  */
  const today = new Date();
  const showingNow = shown.year === today.getFullYear() && shown.month === today.getMonth();
  const inWords = (days: number) =>
    days === 0
      ? t('awqat.in.today')
      : days === 1
        ? t('awqat.in.tomorrow')
        : t('awqat.in.days').replace('{n}', String(days));
  const untilFriday = (5 - today.getDay() + 7) % 7;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const nextWhite =
    month.days.find((day) => day.isWhiteDay && day.date.getTime() >= start.getTime()) ??
    buildMonth(coords, shown.year, shown.month + 1, profile, today).days.find(
      (day) => day.isWhiteDay,
    );
  const whiteDates = (first: Date) => {
    const three = [0, 1, 2].map(
      (offset) => new Date(first.getFullYear(), first.getMonth(), first.getDate() + offset),
    );
    const monthLong = new Intl.DateTimeFormat(locale, { month: 'long' });
    const sameMonth = three.every((day) => day.getMonth() === first.getMonth());
    const parts = sameMonth
      ? three.map((day) => String(day.getDate()))
      : three.map((day) => `${day.getDate()} ${monthLong.format(day)}`);
    const joined = `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
    return sameMonth ? `${joined} ${monthLong.format(first)}` : joined;
  };
  const dayLabel = (day: MonthDay) =>
    t('awqat.day.openFor').replace(
      '{date}',
      new Intl.DateTimeFormat(locale, { weekday: 'long', day: 'numeric', month: 'long' }).format(
        day.date,
      ),
    );

  return (
    <>
      <Stack.Screen options={{ title: t('awqat.title') }} />
      {/*
        The column header is child 3 (4 under the upcoming strip) and STICKS: the month stepper scrolls
        away and the labels stop at the top, so day 27 still says which
        column is ʿAsr. A printed jadwal never loses its header row either —
        the reader's thumb just couldn't hold it. Iyad's ask, 31 Aug. The
        row carries the page background for this: while stuck, day rows
        scroll beneath it.
      */}
      {/* The column header's index moves by one when the upcoming strip is drawn. */}
      <ScrollView contentContainerStyle={styles.content} stickyHeaderIndices={[showingNow ? 4 : 3]}>
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
          {/*
            A table of times with no place on it cannot be checked by the
            person reading it. Named only when the place was chosen from the
            list: a live fix has no name the app could print without sending
            the coordinates somewhere to ask.
          */}
          {source === 'place' && place && (
            <ThemedText type="caption" themeColor="gold" style={styles.centred}>
              {t('place.timesFor')} {placeLabel(place)}
            </ThemedText>
          )}
          {/* The same warning Today's card shows; a month of wrong times is worse than one. */}
          {timezoneSuspect && (
            <View style={[styles.warning, { borderLeftColor: theme.vermilion }]}>
              <ThemedText type="small" themeColor="textSecondary">
                {t('times.clockSuspect')}
              </ThemedText>
            </View>
          )}
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

      {/* Upcoming: a row each, kicker as the day count, the page that explains it as the door. */}
      {showingNow ? (
        <View>
          <JadwalRow
            href={{ pathname: '/reference/[id]', params: { id: 'jumuah' } }}
            kicker={inWords(untilFriday)}
            title={t('awqat.friday')}
            meta={t('awqat.friday.meta')}
            trailing={<Ionicons name="chevron-forward" size={14} color={theme.gold} />}
          />
          {nextWhite ? (
            <JadwalRow
              href={{ pathname: '/reference/[id]', params: { id: 'voluntary-fasting' } }}
              kicker={inWords(daysBetween(today, nextWhite.date))}
              title={t('awqat.whiteDays')}
              meta={t('awqat.whiteDays.meta').replace('{dates}', whiteDates(nextWhite.date))}
              trailing={<Ionicons name="chevron-forward" size={14} color={theme.gold} />}
            />
          ) : null}
        </View>
      ) : null}

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

      {month.days.map((day) => (
        <DayRow key={day.date.getTime()} day={day} locale={locale} label={dayLabel(day)} />
      ))}

      {/* What the gold Hijri numbers mean, and the lesson that teaches the fast. */}
      <QuietRow
        href={{ pathname: '/reference/[id]', params: { id: 'voluntary-fasting' } }}
        label={t('awqat.whiteDays.legend')}
      />

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
  warning: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    marginTop: Spacing.two,
    alignSelf: 'stretch',
  },
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
  hijriWhite: {
    fontWeight: '700',
  },
  hijriCell: {
    width: 30,
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  foot: {
    paddingTop: Spacing.four,
  },
});
