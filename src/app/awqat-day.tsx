import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, type Href } from 'expo-router';
import { useEffect, type ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg';

import { CompassRose, Glyph, JadwalMark } from '@/components/illustrations';
import { DoubleRule, Shelf } from '@/components/jadwal';
import { LocationAsk } from '@/components/location-ask';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
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
  pausesOf,
  windowEnd,
  METHODS,
  PRAYER_IDS,
  type DayTimes,
  type Pause,
  type PrayerId,
} from '@/lib/prayer-times';

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
 * hatched bands in the line with their spans printed like the prayers'.
 * "Forbidden" is Iyad's word (11 Sep); "voluntary" stays because the five
 * and a missed one never are. The ruling, its evidence and its numbers live
 * in `lib/prayer-times.ts` (`pausesOf`) and in `learn/held-off-times.ts`;
 * this screen only draws them. The two spans that begin at the reader's own
 * Fajr and ʿAsr are stated as such — the app cannot know when somebody
 * prayed and does not ask — and a band lights only for its sun-bound part.
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
}: {
  mark: ReactNode;
  edge: Edge;
  children: ReactNode;
  tinted?: boolean;
  muted?: boolean;
  /** A moment or a band rather than a span. */
  thin?: boolean;
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

/**
 * The hatch behind a band: diagonal hairlines in the rule's own colour, so
 * the band reads as "not a window" without a fill or a word in red.
 */
function Hatch({ id }: { id: string }) {
  const theme = useTheme();
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" pointerEvents="none">
      <Defs>
        <Pattern
          id={`hatch-${id}`}
          patternUnits="userSpaceOnUse"
          width={7}
          height={7}
          patternTransform="rotate(45)">
          <Line x1={0} y1={0} x2={0} y2={7} stroke={theme.goldSoft} strokeWidth={1} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill={`url(#hatch-${id})`} />
    </Svg>
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
  const onCount = PRAYER_IDS.filter((id) => reminders.prayers[id]).length;
  const lead =
    reminders.leadMinutes === 0
      ? t('awqat.day.lead.atTime')
      : t('awqat.day.lead.before').replace('{n}', String(reminders.leadMinutes));
  const remindersMeta =
    onCount === 0
      ? t('awqat.day.reminders.off')
      : onCount === PRAYER_IDS.length
        ? t('awqat.day.reminders.all').replace('{lead}', lead)
        : t('awqat.day.reminders.some').replace('{n}', String(onCount)).replace('{lead}', lead);

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
    const ends = windowEnd(day, id);
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
          <View style={styles.hoursSpan}>
            <ThemedText
              type={lit ? 'smallBold' : 'small'}
              themeColor={lit ? 'gold' : 'text'}
              style={styles.tabular}
              numberOfLines={1}>
              {formatTime(prayer.time)} – {formatTime(ends)}
            </ThemedText>
            {open ? (
              <ThemedText type="caption" themeColor="gold">
                {t('awqat.day.left').replace(
                  '{left}',
                  formatDuration(ends.getTime() - now.getTime()),
                )}
              </ThemedText>
            ) : lit ? (
              <ThemedText type="caption" themeColor="gold">
                {t('awqat.day.nextIn').replace(
                  '{countdown}',
                  formatCountdown(prayer.time.getTime() - now.getTime()),
                )}
              </ThemedText>
            ) : null}
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
        <ThemedText type="small" themeColor="textSecondary" style={styles.tabular}>
          {formatTime(time)}
        </ThemedText>
      </Row>
    ),
  });

  /* A band: hatched, "Voluntary prayer is forbidden", and its span beneath. */
  const pauseEntry = (pause: Pause, spanText: string): Entry => ({
    key: `pause-${pause.id}`,
    at: pause.from,
    render: (edge) => {
      const live = pauseLive(pause);
      return (
        <Row key={`pause-${pause.id}`} edge={edge} mark={null} thin>
          <Hatch id={pause.id} />
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
    momentEntry('sunrise', t('awqat.day.sunrise'), day.sunrise),
    pauseEntry(
      sunrisePause,
      t('awqat.pause.sunrise').replace('{time}', formatTime(sunrisePause.to)),
    ),
    pauseEntry(
      noonPause,
      t('awqat.pause.noon')
        .replace('{from}', formatTime(noonPause.from))
        .replace('{to}', formatTime(noonPause.to)),
    ),
    prayerEntry('dhuhr'),
    prayerEntry('asr'),
    pauseEntry(
      sunsetPause,
      t('awqat.pause.sunset').replace('{time}', formatTime(at('maghrib').time)),
    ),
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
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
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
  },
  name: {
    flex: 1,
  },
  hoursSpan: {
    alignItems: 'flex-end',
    gap: Spacing.half,
    paddingTop: Spacing.one,
  },
  muted: {
    opacity: 0.55,
  },
  tabular: {
    fontVariant: ['tabular-nums'],
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
