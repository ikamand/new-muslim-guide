import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, useRouter, type Href } from 'expo-router';
import { useEffect, useState, type ReactNode } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { CompassRose, Glyph, JadwalMark } from '@/components/illustrations';
import { DoubleRule, Shelf } from '@/components/jadwal';
import { LocationAsk } from '@/components/location-ask';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { WidgetSheet } from '@/components/widget-sheet';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { describeReminders } from '@/hooks/use-reminders';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { buildMonth, hijriSpan, type MonthDay } from '@/lib/awqat-month';
import { hijriDate } from '@/lib/hijri';
import { placeShort } from '@/lib/places';
import {
  computeDay,
  formatCountdown,
  formatDuration,
  formatTime,
  pauseShownAt,
  pausesOf,
  preferredEnd,
  windowEnd,
  METHODS,
  type DayTimes,
  type Pause,
  type PrayerId,
} from '@/lib/prayer-times';
import type { AlertMode, PrayerAlert } from '@/lib/reminders';

/**
 * One day of prayer times, in full — the arch unrolled.
 *
 * ## Why a page, and why one
 *
 * Until 10 Sep 2026 the Today card had two taps to two unrelated places: the
 * niche opened a modal of the five windows, and the times row opened Every
 * prayer, a lesson about rakʿahs that already lives on Learn. Iyad's audit
 * asked for one tap that gives everything the times can give. This is it,
 * and both taps land here.
 *
 * ## What is on the line
 *
 * Every prayer as a span, because a convert does not know prayers HAVE
 * windows — that Fajr expires at sunrise, that Dhuhr lasts until ʿAsr
 * enters. Boards and apps print start times only; the ends are what born
 * Muslims absorb and nobody writes down. Sunrise and the middle of the night
 * as moments, since they close a window each. Tomorrow's Fajr at the foot,
 * because that is the number people check at night.
 *
 * Since 12 Sep 2026 a prayer prints its START only, as large as its name, and
 * the open prayer alone adds "until …" and the time left. Iyad put this page
 * beside a start-times-only app: ours knew more, theirs read faster. No end
 * was lost. Dhuhr's is ʿAsr's start, ʿAsr's is Maghrib's, Maghrib's is
 * ʿIsha's, and Fajr's and ʿIsha's are the two moment rows. The second number
 * on every row repeated one already on the page, was set smaller than the
 * name, and was pinned right so the starts never lined up. The windows are
 * still taught: by the sentence above the line, by the two "ends" rows, and
 * by the open prayer's own end, the only one anyone is deciding about.
 *
 * The line wears the arch's own grammar (Iyad, 11 Sep 2026): a passed mark
 * sinks to the hairline gold, the lit one wears the ring that breathes on
 * the arch, the ones to come stay gold; and the spine is the thread the app
 * uses everywhere, gold as far as the day has come and hairline after. What
 * went that day: the caption under each prayer ("until sunrise", said again
 * by the span and by the row beneath), and the two adhkar brackets in the
 * margin, which could not be tapped and read as a distraction.
 *
 * ## The three bands
 *
 * ⚠️ REVIEW REQUIRED. The times when voluntary prayer is forbidden, as
 * filled bands in the line with their spans printed like the prayers'.
 * "Forbidden" is Iyad's word (11 Sep); "voluntary" stays because the five
 * and a missed one never are. The ruling, its evidence and its numbers live
 * in `lib/prayer-times.ts` (`pausesOf`) and in `learn/held-off-times.ts`;
 * this screen only draws them. The two spans that begin at the reader's own
 * Fajr and ʿAsr are stated as such, "from when you pray Fajr" — the app
 * cannot know when somebody prayed and does not ask — and a band lights
 * only for its sun-bound part. The sunrise band sits under Fajr rather than
 * under Sunrise since 12 Sep, because the list is an order, not a scale,
 * and its row has to begin where its sentence does.
 *
 * One band at a time since 12 Sep 2026, and only today: `pauseShownAt` shows
 * each for the stretch of the day it closes. What that costs: the ʿAsr band
 * cannot be seen from the morning, and another date shows none. The footnote
 * under the line opens the lesson, which lists all three.
 *
 * ## Any date
 *
 * `?date=YYYY-MM-DD` opens another day, which is how every row of the
 * monthly jadwal became a door. A day that is not today has no lit row, no
 * countdowns and no gold on the thread: those are facts about now, and
 * there is no now to speak of.
 */

/** "2026-09-24" → local midnight, or null for anything that is not a date. */
function parseDate(value: string | undefined): Date | null {
  if (!value) return null;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function isSameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Whole local days from `from` to `to`, both at midnight. */
function daysBetween(from: Date, to: Date): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

/*
  ── The line's anatomy ────────────────────────────────────────────────────
  Two columns: the spine (the thread, with the day's marks on paper discs)
  and the hours. The marks sit at MARK_Y from the row's top; the thread
  above a mark and below it can be gold or hairline independently, so the
  gold stops exactly at the last mark the day has reached.
*/
const SPINE = 34;
const MARK_Y = 28;
const DISC = 26;
const DISC_LIT = 30;

type Edge = {
  /** The thread from the row's top down to its mark has been travelled. */
  topGold: boolean;
  /** The thread from the mark down to the next row has been travelled. */
  bottomGold: boolean;
  /** The foot: nothing hangs below its mark. */
  last: boolean;
};

/** One row of the line: something on the spine, something in the hours. */
function Row({
  mark,
  edge,
  children,
  tinted,
  muted,
  thin,
  band,
}: {
  mark: ReactNode;
  edge: Edge;
  children: ReactNode;
  tinted?: boolean;
  muted?: boolean;
  /** A moment or a band rather than a span. */
  thin?: boolean;
  /**
   * A forbidden band: the hours box painted in the app's quiet surface.
   *
   * It was a hatch until 12 Sep 2026 — diagonal gold hairlines on an SVG
   * layer laid over the box. On Iyad's Android phone that layer covered only
   * the top part of a two-line band, leaving the caption on bare ground. On
   * web it measured full height, so the cause is reasoned rather than seen:
   * the layer sized itself from percentage props before the caption's second
   * line settled. The lines also ran through the words. A background is the
   * box's own paint, so it cannot come up short, and there is no layer.
   *
   * `backgroundElement`, the surface inputs, the tab bar and the listen bar
   * already sit on. Not `backgroundSelected`: that is the lit prayer on this
   * same list, and the noon band sits directly above Dhuhr, so the two
   * would merge into one block at midday. The spine column stays unpainted,
   * so the thread runs through on the page's own ground.
   */
  band?: boolean;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.row, tinted && { backgroundColor: theme.backgroundSelected }]}>
      <View style={styles.spine}>
        <View
          style={[
            styles.thread,
            styles.threadTop,
            { backgroundColor: edge.topGold ? theme.gold : theme.goldSoft },
          ]}
        />
        {edge.last ? null : (
          <View
            style={[
              styles.thread,
              styles.threadBottom,
              { backgroundColor: edge.bottomGold ? theme.gold : theme.goldSoft },
            ]}
          />
        )}
        {mark}
      </View>
      <View
        style={[
          styles.hours,
          thin ? styles.hoursThin : null,
          band && { backgroundColor: theme.backgroundElement },
          { borderBottomColor: theme.goldSoft },
          muted && styles.muted,
        ]}>
        {children}
      </View>
    </View>
  );
}

/**
 * A prayer's mark: its day-glyph on a paper disc, in the arch's three
 * states — sunk to the hairline once passed, ringed and breathing while
 * lit, gold while still to come.
 */
function Disc({
  id,
  state,
  breath,
}: {
  id: PrayerId;
  state: 'passed' | 'lit' | 'coming';
  /** The arch's breathing value; only the lit disc reads it. */
  breath: SharedValue<number>;
}) {
  const theme = useTheme();
  const ring = useAnimatedStyle(() => ({ opacity: breath.value }));
  const size = state === 'lit' ? DISC_LIT : DISC;
  const colour = state === 'passed' ? theme.goldSoft : theme.gold;
  return (
    <View
      style={[
        styles.disc,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: (SPINE - size) / 2,
          top: MARK_Y - size / 2,
          backgroundColor: theme.background,
        },
      ]}>
      {state === 'lit' ? (
        <Animated.View
          style={[styles.ring, { borderRadius: size / 2, borderColor: theme.gold }, ring]}
        />
      ) : null}
      <Glyph name={id} size={18} color={colour} />
    </View>
  );
}

/** A moment's mark: a small ring on the spine, or a filled dot at the foot. */
function Tick({ passed, filled }: { passed: boolean; filled?: boolean }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.tick,
        {
          left: (SPINE - 7) / 2,
          top: MARK_Y - 3.5,
          backgroundColor: filled ? theme.goldSoft : theme.background,
          borderColor: passed ? theme.goldSoft : theme.gold,
          borderWidth: filled ? 0 : 1,
        },
      ]}
    />
  );
}

const BELL: Record<AlertMode, 'notifications' | 'notifications-outline' | 'notifications-off-outline'> = {
  adhan: 'notifications',
  sound: 'notifications-outline',
  silent: 'notifications-outline',
  off: 'notifications-off-outline',
};

const BELL_STATE: Record<AlertMode, UIKey> = {
  adhan: 'alert.state.adhan',
  sound: 'alert.state.sound',
  silent: 'alert.state.silent',
  off: 'alert.state.off',
};

/**
 * The prayer's alert, beside its time, opening that prayer's page (Iyad, 14
 * Sep 2026). Filled for the adhan, open for a notification, struck through
 * when off, so the five bells read the day's alerts at a glance.
 *
 * Here and not on Today's card: the card's times row is one link to this
 * page, and a bell inside it would be a button inside a button, in columns
 * already full at 360 points. Lapis, because it is pressable; gold never is.
 */
function AlertBell({ id, alert, label }: { id: PrayerId; alert: PrayerAlert; label: string }) {
  const theme = useTheme();
  const { t } = useLocale();
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.push({ pathname: '/prayer-alert/[id]', params: { id } })}
      accessibilityRole="button"
      accessibilityLabel={t('alert.bell').replace('{prayer}', label).replace('{state}', t(BELL_STATE[alert.mode]))}
      hitSlop={12}
      style={({ pressed }) => [styles.bell, { opacity: pressed ? 0.5 : 1 }]}>
      <Ionicons
        name={BELL[alert.mode]}
        size={20}
        color={alert.mode === 'off' ? theme.textSecondary : theme.accent}
      />
    </Pressable>
  );
}

/** A door under the shelf: a mark, a title, one line, a chevron. */
function Door({
  href,
  mark,
  title,
  meta,
}: {
  href: Href;
  mark: ReactNode;
  title: string;
  meta: string;
}) {
  const theme = useTheme();
  return (
    <PressableLink
      href={href}
      accessibilityLabel={`${title}. ${meta}`}
      style={[styles.door, { borderBottomColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.doorMark}>{mark}</View>
      <View style={styles.doorText}>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {meta}
        </ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.gold} />
    </PressableLink>
  );
}

/** A door that opens a sheet rather than a page: the same row, as a button. */
function DoorButton({
  onPress,
  mark,
  title,
  meta,
}: {
  onPress: () => void;
  mark: ReactNode;
  title: string;
  meta: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${meta}`}
      style={({ pressed }) => [
        styles.door,
        { borderBottomColor: theme.goldSoft },
        pressed && { backgroundColor: theme.backgroundSelected },
      ]}>
      <View style={styles.doorMark}>{mark}</View>
      <View style={styles.doorText}>
        <ThemedText type="smallBold">{title}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {meta}
        </ThemedText>
      </View>
      <Ionicons name="chevron-forward" size={18} color={theme.gold} />
    </Pressable>
  );
}

/**
 * The qibla, in the header beside the back arrow — the same compass rose
 * the Today card wears in its spandrel, so the two doors to one screen look
 * like one door (Iyad, 11 Sep 2026).
 */
function HeaderQibla() {
  const theme = useTheme();
  const { t } = useLocale();
  return (
    <PressableLink
      href="/qibla"
      accessibilityLabel={t('qibla.title')}
      style={styles.headerQibla}
      pressedStyle={{ opacity: 0.5 }}>
      <CompassRose color={theme.gold} />
    </PressableLink>
  );
}

/** The first projected white day on or after `from`, in a month's days. */
function nextWhiteDay(days: MonthDay[], from: Date): MonthDay | undefined {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return days.find((day) => day.isWhiteDay && day.date.getTime() >= start.getTime());
}

type Entry = { key: string; at: Date; render: (edge: Edge) => ReactNode };

export default function AwqatDayScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const { coords, source, place } = useLocation();
  const { profile, next, timezoneSuspect } = usePrayerTimes();
  const { reminders, awqatMosque } = useSettings();
  const { date: param } = useLocalSearchParams<{ date?: string }>();
  const [widgetsOpen, setWidgetsOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  /*
    The lit mark breathes, exactly as it does on the arch: one value, ~5s a
    cycle, cancelled on unmount and never started under reduce-motion.
  */
  const breath = useSharedValue(1);
  useEffect(() => {
    if (reducedMotion) return;
    breath.value = withRepeat(
      withSequence(
        withTiming(0.55, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
        withTiming(1, { duration: 2600, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
    );
    return () => cancelAnimation(breath);
  }, [breath, reducedMotion]);

  if (!coords || !profile || !next) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Stack.Screen options={{ title: t('awqat.day.title') }} />
        <LocationAsk />
      </ScrollView>
    );
  }

  /* The instant the hook computed against, so every state here agrees with the card. */
  const now = new Date(next.time.getTime() - next.msUntil);
  const requested = parseDate(param);
  const date = requested ?? now;
  const isToday = isSameLocalDay(date, now);

  const day: DayTimes = computeDay(coords, date, profile);
  const following = computeDay(
    coords,
    new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
    profile,
  );
  const [sunrisePause, noonPause, sunsetPause] = pausesOf(day);
  const at = (id: PrayerId) => day.prayers.find((prayer) => prayer.id === id)!;

  /* Live states exist only today; another day has no now. */
  const openId = isToday
    ? day.prayers.find(
        (prayer) => now >= prayer.time && now < windowEnd(day, prayer.id),
      )?.id ?? null
    : null;
  const litId = isToday ? (openId ?? (next.isTomorrow ? null : next.id)) : null;
  const closed = (id: PrayerId) => isToday && windowEnd(day, id).getTime() <= now.getTime();
  const reached = (time: Date) => isToday && time.getTime() <= now.getTime();
  const pauseLive = (pause: Pause) => isToday && now >= pause.from && now < pause.to;
  /* One band at a time, and none on another date: see `pauseShownAt`. */
  const shownPause = isToday ? pauseShownAt(day, now) : null;
  const shows = (pause: Pause) => shownPause?.id === pause.id;

  const hijri = hijriDate(date);
  const dayLine = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(date);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
  const headline = [
    weekday,
    hijri ? `${hijri.day} ${t(`hijri.month.${hijri.month}` as UIKey)} ${hijri.year}` : null,
    source === 'place' && place ? placeShort(place) : null,
  ]
    .filter(Boolean)
    .join(' · ');

  /* The calendar door's line: the Hijri span, and when the white days fall. */
  const thisMonth = buildMonth(coords, date.getFullYear(), date.getMonth(), profile, now);
  const span = hijriSpan(thisMonth.days);
  const monthName = (month: number) => t(`hijri.month.${month}` as UIKey);
  const spanLine = span
    ? span.from.month === span.to.month
      ? `${monthName(span.from.month)} ${span.from.year}`
      : `${monthName(span.from.month)} – ${monthName(span.to.month)} ${span.to.year}`
    : '';
  const white =
    nextWhiteDay(thisMonth.days, date) ??
    nextWhiteDay(
      buildMonth(coords, date.getFullYear(), date.getMonth() + 1, profile, now).days,
      date,
    );
  const whiteIn = white ? daysBetween(date, white.date) : null;
  const whiteLine =
    whiteIn === null
      ? null
      : whiteIn === 0
        ? t('awqat.whiteDays.when.today')
        : whiteIn === 1
          ? t('awqat.whiteDays.when.tomorrow')
          : t('awqat.whiteDays.when.days').replace('{n}', String(whiteIn));
  const monthMeta = [spanLine, whiteLine].filter(Boolean).join(' · ');

  /* A count, never the names: the switches are one tap away. */
  const remindersMeta = describeReminders(reminders, t);

  /* The selection alone; where it comes from is the calculation page's first line. */
  const methodMeta = awqatMosque
    ? `${t('mosque.active')} · ${METHODS[awqatMosque.methodId]?.label ?? awqatMosque.methodId}`
    : profile.label;

  /*
    The line, in time order. Each entry carries the instant its mark stands
    for, so the thread can be gold down to the last mark the day has reached
    and hairline from there on.
  */
  const prayerEntry = (id: PrayerId): Entry => {
    const prayer = at(id);
    /* ʿIshāʾ names its preferred end until that passes, then Fajr, as Today's card does. */
    const preferred = preferredEnd(day, id);
    const pastPreferred = !!preferred && now >= preferred;
    const ends = preferred && !pastPreferred ? preferred : windowEnd(day, id);
    const lit = litId === id;
    const open = openId === id;
    const state = lit ? 'lit' : closed(id) ? 'passed' : 'coming';
    return {
      key: id,
      at: prayer.time,
      render: (edge) => (
        <Row
          key={id}
          edge={edge}
          mark={<Disc id={id} state={state} breath={breath} />}
          tinted={lit}
          muted={state === 'passed'}>
          <ThemedText type="cardTitle" themeColor={lit ? 'gold' : 'text'} style={styles.name}>
            {prayer.label}
          </ThemedText>
          <View style={styles.timeAndBell}>
            <View style={styles.hoursSpan}>
              {/* The start, the size of the name. Every end is already on the page. */}
              <ThemedText
                type="cardTitle"
                themeColor={lit ? 'gold' : 'text'}
                style={styles.tabular}
                numberOfLines={1}>
                {formatTime(prayer.time)}
              </ThemedText>
              {open ? (
                <>
                  <ThemedText type="caption" themeColor="gold">
                    {t('times.until').replace('{time}', formatTime(ends))}
                  </ThemedText>
                  <ThemedText type="caption" themeColor="gold">
                    {pastPreferred
                      ? t('times.preferredPassed')
                      : t('awqat.day.left').replace(
                          '{left}',
                          formatDuration(ends.getTime() - now.getTime()),
                        )}
                  </ThemedText>
                </>
              ) : lit ? (
                <ThemedText type="caption" themeColor="gold">
                  {t('awqat.day.nextIn').replace(
                    '{countdown}',
                    formatCountdown(prayer.time.getTime() - now.getTime()),
                  )}
                </ThemedText>
              ) : null}
            </View>
            <AlertBell id={id} alert={reminders.alerts[id]} label={prayer.label} />
          </View>
        </Row>
      ),
    };
  };

  const momentEntry = (key: string, label: string, time: Date, foot = false): Entry => ({
    key,
    at: time,
    render: (edge) => (
      <Row key={key} edge={edge} mark={<Tick passed={reached(time)} filled={foot} />} thin>
        <ThemedText type="small" themeColor="textSecondary" style={styles.momentLabel}>
          {label}
        </ThemedText>
        {/* The bells' column, empty, so every time on the line keeps one right edge. */}
        <View style={[styles.timeAndBell, styles.timeAndBellThin]}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.tabular}>
            {formatTime(time)}
          </ThemedText>
          <View style={styles.bell} />
        </View>
      </Row>
    ),
  });

  /* A band: filled, "Voluntary prayer is forbidden", and its span beneath. */
  const pauseEntry = (pause: Pause, spanText: string): Entry => ({
    key: `pause-${pause.id}`,
    at: pause.from,
    render: (edge) => {
      const live = pauseLive(pause);
      return (
        <Row key={`pause-${pause.id}`} edge={edge} mark={null} thin band>
          <View style={styles.pauseText}>
            <ThemedText type="caption" themeColor={live ? 'gold' : 'text'}>
              {t('awqat.pause.title')}
            </ThemedText>
            <ThemedText
              type="caption"
              themeColor={live ? 'gold' : 'textSecondary'}
              style={styles.tabular}>
              {spanText}
            </ThemedText>
          </View>
        </Row>
      );
    },
  });

  const entries: Entry[] = [
    prayerEntry('fajr'),
    /*
      Under Fajr, above Sunrise. The list is drawn in this order, not to
      time scale, so a row's place is the only "when" it has — and this
      band's sentence begins at the reader's Fajr, not at sunrise. Sitting
      under the Sunrise row it said "from sunrise" with its position and
      "from Fajr" with its words, and the position won (Iyad, 12 Sep 2026).
      Its `at` is still sunrise, so the thread and the gold light only the
      sun-bound quarter hour the app can actually know.
    */
    ...(shows(sunrisePause)
      ? [
          pauseEntry(
            sunrisePause,
            t('awqat.pause.sunrise').replace('{time}', formatTime(sunrisePause.to)),
          ),
        ]
      : []),
    momentEntry('sunrise', t('awqat.day.sunrise'), day.sunrise),
    ...(shows(noonPause)
      ? [
          pauseEntry(
            noonPause,
            t('awqat.pause.noon')
              .replace('{from}', formatTime(noonPause.from))
              .replace('{to}', formatTime(noonPause.to)),
          ),
        ]
      : []),
    prayerEntry('dhuhr'),
    prayerEntry('asr'),
    /* No {time}: the Maghrib row below carries it, and naming it here cost
       a wrapped line at 360px. See the note in ui.ts. */
    ...(shows(sunsetPause) ? [pauseEntry(sunsetPause, t('awqat.pause.sunset'))] : []),
    prayerEntry('maghrib'),
    prayerEntry('isha'),
    momentEntry('midnight', t('awqat.day.midnight'), day.middleOfNight),
    momentEntry(
      'tomorrow',
      t(isToday ? 'awqat.day.tomorrowFajr' : 'awqat.day.nextFajr'),
      following.prayers[0].time,
      true,
    ),
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: t(isToday ? 'awqat.day.title' : 'awqat.title'),
          headerRight: () => <HeaderQibla />,
        }}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <DoubleRule />
        <View style={styles.head}>
          <ThemedText type="subtitle" style={styles.centred}>
            {dayLine}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centred}>
            {headline}
          </ThemedText>
        </View>
        <DoubleRule />

        {/* The one sentence a convert has never been told. */}
        <ThemedText type="small" themeColor="textSecondary" style={styles.intro}>
          {t('windows.intro')}
        </ThemedText>

        {timezoneSuspect && (
          <View style={[styles.warning, { borderLeftColor: theme.vermilion }]}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('times.clockSuspect')}
            </ThemedText>
          </View>
        )}

        <View style={styles.line}>
          {entries.map((entry, index) =>
            entry.render({
              topGold: reached(entry.at),
              bottomGold: index + 1 < entries.length && reached(entries[index + 1].at),
              last: index === entries.length - 1,
            }),
          )}
        </View>

        {/*
          The bands explained once, under the line, and the way to the lesson
          that carries the ruling. ⚠️ Review-gated with the bands.
        */}
        <PressableLink
          href={{ pathname: '/reference/[id]', params: { id: 'held-off-times' } }}
          accessibilityLabel={t('awqat.pause.note')}
          style={[styles.pauseNote, { borderBottomColor: theme.goldSoft }]}
          pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
          <ThemedText type="small" themeColor="textSecondary" style={styles.pauseNoteText}>
            {t('awqat.pause.note')}
          </ThemedText>
          <Ionicons name="chevron-forward" size={18} color={theme.gold} />
        </PressableLink>

        <Shelf label={t('awqat.day.fromHere')} />
        <Door
          href="/awqat"
          mark={<JadwalMark color={theme.gold} />}
          title={t('awqat.day.month')}
          meta={monthMeta}
        />
        <Door
          href="/reminders"
          mark={<Ionicons name="notifications-outline" size={22} color={theme.gold} />}
          title={t('awqat.day.reminders')}
          meta={remindersMeta}
        />
        {/* The widgets: a door rather than a settings page (docs/widgets.md). The web has no home screen. */}
        {Platform.OS !== 'web' && (
          <DoorButton
            onPress={() => setWidgetsOpen(true)}
            mark={<Ionicons name="phone-portrait-outline" size={22} color={theme.gold} />}
            title={t('widget.door')}
            meta={t('widget.door.meta')}
          />
        )}
        <Door
          href="/awqat-settings"
          mark={<Ionicons name="options-outline" size={22} color={theme.gold} />}
          title={t('awqat.day.method')}
          meta={methodMeta}
        />
        {/* The lesson, still one tap away, no longer THE tap. Five columns for five prayers. */}
        <Door
          href="/pray"
          mark={<Glyph name="pillars" size={22} color={theme.gold} />}
          title={t('learn.everyPrayer.title')}
          meta={t('learn.everyPrayer.subtitle')}
        />

        <ThemedText type="small" themeColor="textSecondary" style={styles.foot}>
          {t('windows.note')}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('times.followLocal')}
        </ThemedText>
        <WidgetSheet visible={widgetsOpen} onClose={() => setWidgetsOpen(false)} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.six,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  headerQibla: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  head: {
    paddingVertical: Spacing.three,
    gap: Spacing.one,
  },
  centred: {
    textAlign: 'center',
  },
  intro: {
    paddingTop: Spacing.three,
    textAlign: 'center',
  },
  warning: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    marginTop: Spacing.two,
  },
  line: {
    paddingTop: Spacing.two,
  },
  /* The tint covers the spine and the hours together, the full row. */
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: Radius.rule,
  },
  spine: {
    width: SPINE,
    position: 'relative',
  },
  thread: {
    position: 'absolute',
    left: SPINE / 2,
    width: StyleSheet.hairlineWidth,
  },
  threadTop: {
    top: 0,
    height: MARK_Y,
  },
  threadBottom: {
    top: MARK_Y,
    bottom: 0,
  },
  disc: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1.2,
  },
  tick: {
    position: 'absolute',
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  hours: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingLeft: Spacing.two,
    paddingRight: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
    position: 'relative',
    overflow: 'hidden',
  },
  hoursThin: {
    alignItems: 'center',
    paddingVertical: Spacing.two + 2,
    /*
      Half the prayer rows' gap. It only ever shows when a label reaches its
      time, and since the bells' column arrived "ʿIsha's preferred time ends"
      needs it to stay on one line at 360 points (measured 14 Sep 2026).
    */
    gap: Spacing.two,
  },
  name: {
    flex: 1,
  },
  /* No top offset: the time is the name's own rung now, so their lines align. */
  hoursSpan: {
    alignItems: 'flex-end',
    gap: Spacing.half,
  },
  muted: {
    opacity: 0.55,
  },
  tabular: {
    fontVariant: ['tabular-nums'],
  },
  /*
    A time and its bell, closer to each other than to the name: the row's
    own gap would have taken the width "ʿIsha's preferred time ends" needs to
    stay on one line at 360 points.
  */
  timeAndBell: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.two,
  },
  timeAndBellThin: {
    alignItems: 'center',
  },
  /*
    The height of the name's line, so the bell centres on it rather than on a
    two-line open row. The moment rows carry the same box empty.
  */
  bell: {
    width: 20,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  momentLabel: {
    flex: 1,
  },
  pauseText: {
    flex: 1,
    gap: Spacing.half,
  },
  pauseNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingLeft: SPINE,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  pauseNoteText: {
    flex: 1,
  },
  door: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  doorMark: {
    width: 22,
    alignItems: 'center',
  },
  doorText: {
    flex: 1,
    gap: Spacing.half,
  },
  foot: {
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
});
