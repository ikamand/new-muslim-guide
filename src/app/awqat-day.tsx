import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Defs, Line, Pattern, Rect } from 'react-native-svg';

import { CompassRose, Glyph, JadwalMark } from '@/components/illustrations';
import { DoubleRule, JadwalRow, Shelf } from '@/components/jadwal';
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
import { compassPoint } from '@/lib/compass';
import { hijriDate } from '@/lib/hijri';
import { placeShort } from '@/lib/places';
import {
  computeDay,
  formatCountdown,
  formatDuration,
  formatTime,
  pausesOf,
  qiblaBearing,
  windowEnd,
  METHODS,
  PRAYER_IDS,
  PRAYER_LABEL,
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
 * as moments, since they close a window each. The open window lit, with its
 * time left. The two adhkar sittings as brackets in the margin, on the same
 * spans `lib/adhkar-window.ts` offers them. Tomorrow's Fajr at the foot,
 * because that is the number people check at night.
 *
 * ## The three pauses
 *
 * ⚠️ REVIEW REQUIRED. Three hatched bands, one sentence, and never a red
 * word: the times when extra prayer is held off. The ruling, its evidence
 * and its numbers live in `lib/prayer-times.ts` (`pausesOf`) and in the
 * lesson `learn/held-off-times.ts`; this screen only draws them. The bands
 * say "about 15 min" and never print a clock time for an edge, so the
 * reviewer's number moves nothing else. The two spans tied to the reader's
 * own prayer are deliberately not drawn: the app cannot know when somebody
 * prayed and does not ask.
 *
 * ## Any date
 *
 * `?date=YYYY-MM-DD` opens another day, which is how every row of the
 * monthly jadwal became a door. A day that is not today has no lit row and
 * no countdowns: those are facts about now, and there is no now to speak of.
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
  Three columns: the margin lane (where a sitting's bracket hangs), the
  spine (a hairline with the day's marks on paper discs), and the hours.
*/
const LANE = 22;
const SPINE = 34;
const DISC = 26;
const DISC_LIT = 30;
/** The rotated label's length along the lane. */
const BRACKET_LABEL = 176;

/** One row of the line: something in the spine, something in the hours. */
function Row({
  mark,
  children,
  tinted,
  muted,
  thin,
  last,
}: {
  mark: ReactNode;
  children: ReactNode;
  tinted?: boolean;
  muted?: boolean;
  /** A moment rather than a span: sunrise, the middle of the night. */
  thin?: boolean;
  /** The foot: the spine stops at its mark. */
  last?: boolean;
}) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      <View style={styles.lane} />
      <View style={styles.spine}>
        <View
          style={[
            styles.spineLine,
            { backgroundColor: theme.goldSoft },
            last && styles.spineLineLast,
          ]}
        />
        {mark}
      </View>
      <View
        style={[
          styles.hours,
          thin ? styles.hoursThin : null,
          { borderBottomColor: theme.goldSoft },
          tinted && { backgroundColor: theme.backgroundSelected },
          muted && styles.muted,
        ]}>
        {children}
      </View>
    </View>
  );
}

/** A prayer's mark on the spine: its day-glyph on a paper disc, ringed when lit. */
function Disc({ id, lit, muted }: { id: PrayerId; lit: boolean; muted: boolean }) {
  const theme = useTheme();
  const size = lit ? DISC_LIT : DISC;
  return (
    <View
      style={[
        styles.disc,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          left: (SPINE - size) / 2,
          top: lit ? 14 : 16,
          backgroundColor: theme.background,
          borderColor: theme.gold,
          borderWidth: lit ? 1.2 : 0,
        },
        muted && styles.muted,
      ]}>
      <Glyph name={id} size={18} color={lit ? theme.gold : theme.textSecondary} />
    </View>
  );
}

/** A moment's mark: a small ring on the spine, or a filled dot at the foot. */
function Tick({ filled }: { filled?: boolean }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.tick,
        {
          left: (SPINE - 7) / 2,
          backgroundColor: filled ? theme.goldSoft : theme.background,
          borderColor: theme.gold,
          borderWidth: filled ? 0 : 1,
        },
      ]}
    />
  );
}

/**
 * A sitting's bracket, hung in the margin beside the rows it spans.
 *
 * Absolute inside the group it belongs to, so it grows and shrinks with the
 * rows; the label is rotated to read up the page, on a paper patch so the
 * bracket's line passes behind it.
 */
function Bracket({ label, live }: { label: string; live: boolean }) {
  const theme = useTheme();
  const colour = live ? theme.gold : theme.goldSoft;
  return (
    <View style={styles.bracket} pointerEvents="none">
      <View style={[styles.bracketLine, { borderColor: colour }]} />
      <View style={styles.bracketLabelSeat} pointerEvents="none">
        <ThemedText
          type="caption"
          style={[styles.bracketLabel, { color: colour, backgroundColor: theme.background }]}
          numberOfLines={1}>
          {label}
        </ThemedText>
      </View>
    </View>
  );
}

/**
 * The hatch behind a pause: diagonal hairlines in the rule's own colour, so
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

/** "Fajr, ʿAsr and ʿIsha" — the labels of what is on, joined as a sentence would. */
function joinLabels(labels: string[]): string {
  if (labels.length <= 1) return labels.join('');
  return `${labels.slice(0, -1).join(', ')} and ${labels[labels.length - 1]}`;
}

/** The first projected white day on or after `from`, this month or next. */
function nextWhiteDay(days: MonthDay[], from: Date): MonthDay | undefined {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return days.find((day) => day.isWhiteDay && day.date.getTime() >= start.getTime());
}

export default function AwqatDayScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const { coords, source, place } = useLocation();
  const { profile, next, timezoneSuspect } = usePrayerTimes();
  const { reminders, awqatMosque } = useSettings();
  const { date: param } = useLocalSearchParams<{ date?: string }>();

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
  const pauses = pausesOf(day);
  const at = (id: PrayerId) => day.prayers.find((prayer) => prayer.id === id)!;

  /* Live states exist only today; another day has no now. */
  const openId = isToday
    ? day.prayers.find(
        (prayer) => now >= prayer.time && now < windowEnd(day, prayer.id),
      )?.id ?? null
    : null;
  const litId = isToday ? (openId ?? (next.isTomorrow ? null : next.id)) : null;
  const closed = (id: PrayerId) => isToday && windowEnd(day, id).getTime() <= now.getTime();
  const pauseLive = (pause: Pause) => isToday && now >= pause.from && now < pause.to;

  /*
    The sittings, on the spans the Dua tab offers them: morning Fajr→Dhuhr,
    evening ʿAsr→ʿIsha. The same union `lib/adhkar-window.ts` explains; drawn
    here from the day's own times so the bracket can never span different
    rows than the tab's window.
  */
  const morningLive = isToday && now >= at('fajr').time && now < at('dhuhr').time;
  const eveningLive = isToday && now >= at('asr').time && now < at('isha').time;

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

  /* The month door's line: the Hijri span, and when the white days fall. */
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

  const onPrayers = PRAYER_IDS.filter((id) => reminders.prayers[id]).map((id) => PRAYER_LABEL[id]);
  const remindersMeta =
    onPrayers.length === 0
      ? t('awqat.day.reminders.off')
      : t('awqat.day.reminders.on')
          .replace('{prayers}', joinLabels(onPrayers))
          .replace(
            '{lead}',
            reminders.leadMinutes === 0
              ? t('settings.reminders.atTime')
              : t('settings.reminders.minutesBefore').replace('{n}', String(reminders.leadMinutes)),
          );

  const methodMeta = awqatMosque
    ? `${t('mosque.active')} · ${METHODS[awqatMosque.methodId]?.label ?? awqatMosque.methodId}`
    : `${profile.label} · ${t('times.onThisPhone')}`;

  const qiblaMeta = t('awqat.day.qibla.meta').replace(
    '{point}',
    t(`qibla.point.${compassPoint(qiblaBearing(coords))}` as UIKey),
  );

  /* One prayer's span on the line. */
  const prayerRow = (id: PrayerId) => {
    const prayer = at(id);
    const ends = windowEnd(day, id);
    const lit = litId === id;
    const open = openId === id;
    return (
      <Row
        key={id}
        mark={<Disc id={id} lit={lit} muted={closed(id) && !lit} />}
        tinted={lit}
        muted={closed(id) && !lit}>
        <View style={styles.hoursText}>
          <ThemedText type="cardTitle" themeColor={lit ? 'gold' : 'text'}>
            {prayer.label}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t(`windows.${id}` as UIKey)}
          </ThemedText>
        </View>
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
              {t('awqat.day.left').replace('{left}', formatDuration(ends.getTime() - now.getTime()))}
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
    );
  };

  /* A moment on the line: a label and a time, ruled like the rest. */
  const momentRow = (key: string, label: string, time: Date, last = false) => (
    <Row key={key} mark={<Tick filled={last} />} thin last={last}>
      <ThemedText type="small" themeColor="textSecondary" style={styles.momentLabel}>
        {label}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.tabular}>
        {formatTime(time)}
      </ThemedText>
    </Row>
  );

  /* A pause on the line: hatched, one plain sentence, "about n min". */
  const pauseRow = (pause: Pause) => {
    const live = pauseLive(pause);
    return (
      <Row key={`pause-${pause.id}`} mark={null} thin>
        <Hatch id={pause.id} />
        <ThemedText
          type="caption"
          themeColor={live ? 'gold' : 'textSecondary'}
          style={styles.pauseText}>
          {t(`awqat.pause.${pause.id}` as UIKey)}
        </ThemedText>
        <ThemedText type="caption" themeColor={live ? 'gold' : 'textSecondary'} style={styles.tabular}>
          {t('awqat.pause.about').replace('{n}', String(pause.minutes))}
        </ThemedText>
      </Row>
    );
  };

  const [sunrisePause, noonPause, sunsetPause] = pauses;

  return (
    <>
      <Stack.Screen options={{ title: t(isToday ? 'awqat.day.title' : 'awqat.title') }} />
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

        {/* The line. Groups exist only to hang a sitting's bracket beside its rows. */}
        <View style={styles.line}>
          <View>
            <Bracket label={t('awqat.day.morning')} live={morningLive} />
            {prayerRow('fajr')}
            {momentRow('sunrise', t('awqat.day.sunrise'), day.sunrise)}
            {pauseRow(sunrisePause)}
            {pauseRow(noonPause)}
            {prayerRow('dhuhr')}
          </View>
          <View>
            <Bracket label={t('awqat.day.evening')} live={eveningLive} />
            {prayerRow('asr')}
            {pauseRow(sunsetPause)}
            {prayerRow('maghrib')}
            {prayerRow('isha')}
          </View>
          {momentRow('midnight', t('awqat.day.midnight'), day.middleOfNight)}
          {momentRow(
            'tomorrow',
            t(isToday ? 'awqat.day.tomorrowFajr' : 'awqat.day.nextFajr'),
            following.prayers[0].time,
            true,
          )}
        </View>

        {/*
          The pauses explained once, under the line, and the way to the
          lesson that carries the ruling. ⚠️ Review-gated with the bands.
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
          href="/qibla"
          mark={<CompassRose color={theme.gold} />}
          title={t('awqat.day.qibla')}
          meta={qiblaMeta}
        />
        <Door
          href="/settings"
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
        {/* The lesson, still one tap away, no longer THE tap. */}
        <JadwalRow
          href="/pray"
          kicker={t('awqat.day.learn')}
          title={t('learn.everyPrayer.title')}
          meta={t('learn.everyPrayer.subtitle')}
          trailing={<Ionicons name="chevron-forward" size={14} color={theme.gold} />}
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
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  lane: {
    width: LANE,
  },
  spine: {
    width: SPINE,
    position: 'relative',
  },
  spineLine: {
    position: 'absolute',
    left: SPINE / 2,
    top: 0,
    bottom: 0,
    width: StyleSheet.hairlineWidth,
  },
  spineLineLast: {
    bottom: undefined,
    height: 22,
  },
  disc: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tick: {
    position: 'absolute',
    top: 17,
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
    paddingVertical: Spacing.three - 4,
    paddingLeft: Spacing.two,
    paddingRight: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.rule,
    position: 'relative',
    overflow: 'hidden',
  },
  hoursThin: {
    alignItems: 'center',
    paddingVertical: Spacing.two + 2,
  },
  hoursText: {
    flex: 1,
    gap: Spacing.half,
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
  },
  bracket: {
    position: 'absolute',
    left: 0,
    top: 14,
    bottom: 14,
    width: LANE,
    zIndex: 1,
  },
  bracketLine: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 9,
    width: 6,
    borderWidth: 1.5,
    borderRightWidth: 0,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  /*
    The label's seat: a wide, short box centred on the lane and turned on
    its side. The SEAT rotates, not the text — RN lays the text out inside
    the seat's own width first, and a text rotated inside a 22px column was
    measured at 22px and truncated to one letter (web, 10 Sep 2026).
  */
  bracketLabelSeat: {
    position: 'absolute',
    width: BRACKET_LABEL,
    height: 20,
    left: (LANE - BRACKET_LABEL) / 2,
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    /* Centred on its own height by a translate, not a margin: the spacing
       rule keeps negative margins out of joins, and this is a seat, not a join. */
    transform: [{ translateY: -10 }, { rotate: '-90deg' }],
  },
  bracketLabel: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    paddingHorizontal: Spacing.one,
  },
  pauseNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    paddingLeft: LANE + SPINE,
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
