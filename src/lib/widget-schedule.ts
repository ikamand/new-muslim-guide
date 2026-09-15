import { DAY_MARK_PARTS } from '@/constants/day-marks';
import type { UIKey } from '@/i18n/ui';
import {
  computeDay,
  findCurrentPrayer,
  findNextPrayer,
  formatTime,
  PRAYER_IDS,
  windowEnd,
  type LatLon,
  type MethodProfile,
  type PrayerId,
} from '@/lib/prayer-times';
import { DAYS_AHEAD } from '@/lib/reminders';
import { markPartsToPath, serializeOps, toCubicOps } from '@/lib/svg-path';
import { markPoints, WIDGET_ARCH } from '@/lib/widget-geometry';

/**
 * What the home-screen and lock-screen widgets draw, for the next twelve days.
 *
 * `docs/widgets.md` is the contract; both phones read this payload and nothing
 * else. It is not a second implementation of the prayer-time rules. At every
 * instant where anything the Today card shows could change, it asks the card's
 * own functions what the card would show, and writes that down, because a
 * widget that disagrees with the card is the worst bug this feature could
 * have. `npm run widget:check` samples the days in between and fails if a
 * widget would say anything the card would not.
 */

export type WidgetPalette = {
  ground: string;
  text: string;
  textSecondary: string;
  gold: string;
  goldSoft: string;
  selected: string;
  accent: string;
};

export type WidgetEntry = {
  /** Epoch ms from which this entry is drawn, until the next one. */
  at: number;
  /** Index into `days`: the local day whose times the row shows. */
  day: number;
  state: 'now' | 'next';
  /** The prayer named: the open window, or the next start. */
  prayer: PrayerId;
  /** The prayer whose mark wears the ring and whose cell is lit, as on the card; null when the next prayer is tomorrow's. */
  lit: PrayerId | null;
  caption: string;
  name: string;
  time: string;
  note?: string;
  /** Marks that dim on the arch: their time has passed and they are not lit. */
  passed: PrayerId[];
  /** Cells that dim in the row: their window has closed. */
  closed: PrayerId[];
  link: string;
};

export type WidgetDay = {
  /** yyyy-mm-dd, local. */
  date: string;
  friday: boolean;
  cells: { id: PrayerId; name: string; time: string }[];
  /** Each mark's centre on the niche's arch, in its viewBox. */
  points: Record<PrayerId, [number, number]>;
};

export type WidgetPayload = {
  v: 1;
  generatedAt: number;
  /** From here on the widgets say to open the app instead of showing times. */
  staleAt: number;
  strings: { openApp: string };
  colors: { light: WidgetPalette; dark: WidgetPalette };
  /** Day-mark path data on the 24 grid, absolute M L C Z only. */
  marks: Record<PrayerId, string>;
  arch: {
    viewBox: [number, number, number, number];
    outer: string;
    inner: string;
    stroke: number;
    innerStroke: number;
    disc: number;
    ring: number;
    ringStroke: number;
    markSize: number;
    markStroke: number;
  };
  days: WidgetDay[];
  entries: WidgetEntry[];
};

export type WidgetScheduleInput = {
  coords: LatLon;
  profile: MethodProfile;
  now: Date;
  /** Praying on their own: a tap opens the day page, never the walkthrough. */
  fluent: boolean;
  t: (key: UIKey) => string;
  colors: { light: WidgetPalette; dark: WidgetPalette };
  days?: number;
};

export const WIDGET_LINK_DAY = 'newmuslimguide://awqat-day';
export const widgetLinkGuide = (prayer: PrayerId) => `newmuslimguide://guide/${prayer}`;

const pad = (value: number) => String(value).padStart(2, '0');
export const localDateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const localMidnight = (reference: Date, offsetDays: number) =>
  new Date(reference.getFullYear(), reference.getMonth(), reference.getDate() + offsetDays);

/** What every widget draws at `at`: the Today card's state at that instant (`components/prayer-times-card.tsx`). */
export function widgetStateAt(
  coords: LatLon,
  profile: MethodProfile,
  at: Date,
  fluent: boolean,
  t: (key: UIKey) => string,
): Omit<WidgetEntry, 'at' | 'day'> & { date: string } {
  const today = computeDay(coords, at, profile);
  const next = findNextPrayer(coords, at, profile);
  const current = findCurrentPrayer(coords, at, profile);
  const lit = current ? current.id : next.isTomorrow ? null : next.id;

  let caption: string;
  let name: string;
  let time: string;
  let note: string | undefined;
  if (current) {
    // ʿIshāʾ's preferred end while it is still ahead; otherwise the window's own.
    const pastPreferred = !!current.preferredEnds && at >= current.preferredEnds;
    const shownEnd = current.preferredEnds && !pastPreferred ? current.preferredEnds : current.windowEnds;
    caption = t('times.now');
    name = current.label;
    time = t('times.until').replace('{time}', formatTime(shownEnd));
    note = pastPreferred ? t('times.preferredPassed') : undefined;
  } else {
    caption = next.isTomorrow ? t('times.nextTomorrow') : t('times.next');
    name = next.label;
    time = formatTime(next.time);
  }

  return {
    date: localDateKey(at),
    state: current ? 'now' : 'next',
    prayer: current ? current.id : next.id,
    lit,
    caption,
    name,
    time,
    ...(note ? { note } : {}),
    passed: today.prayers.filter((prayer) => at >= prayer.time && prayer.id !== lit).map((prayer) => prayer.id),
    closed: PRAYER_IDS.filter((id) => windowEnd(today, id).getTime() <= at.getTime()),
    link: current && !fluent ? widgetLinkGuide(current.id) : WIDGET_LINK_DAY,
  };
}

function dayFor(coords: LatLon, profile: MethodProfile, date: Date): WidgetDay {
  const day = computeDay(coords, date, profile);
  return {
    date: localDateKey(date),
    friday: date.getDay() === 5,
    cells: day.prayers.map((prayer) => ({ id: prayer.id, name: prayer.label, time: formatTime(prayer.time) })),
    points: markPoints(day),
  };
}

export function buildWidgetPayload(input: WidgetScheduleInput): WidgetPayload {
  const { coords, profile, now, fluent, t } = input;
  const span = input.days ?? DAYS_AHEAD;
  const start = localMidnight(now, 0);
  const stale = localMidnight(now, span);

  /*
    Every instant where the card could show something different: local
    midnight (a new day's times), each prayer's start, sunrise (Fajr's window
    closes), the middle of the night (ʿIshāʾ's preferred time ends) and the next
    morning's Fajr. Yesterday is included, because at ten past midnight the
    middle of last night can still be ahead.
  */
  const instants = new Set<number>([now.getTime()]);
  for (let offset = -1; offset < span; offset += 1) {
    const midnight = localMidnight(start, offset);
    const day = computeDay(coords, midnight, profile);
    for (const moment of [midnight, day.sunrise, day.middleOfNight, day.nextFajr, ...day.prayers.map((p) => p.time)]) {
      const ms = moment.getTime();
      if (ms > now.getTime() && ms < stale.getTime()) instants.add(ms);
    }
  }

  const days: WidgetDay[] = [];
  const dayIndex = new Map<string, number>();
  const entries: WidgetEntry[] = [];
  let previous = '';

  for (const ms of [...instants].sort((a, b) => a - b)) {
    const { date, ...state } = widgetStateAt(coords, profile, new Date(ms), fluent, t);
    if (!dayIndex.has(date)) {
      dayIndex.set(date, days.length);
      days.push(dayFor(coords, profile, new Date(ms)));
    }
    const drawn = JSON.stringify({ date, ...state });
    if (drawn === previous) continue;
    previous = drawn;
    entries.push({ at: ms, day: dayIndex.get(date)!, ...state });
  }

  return {
    v: 1,
    generatedAt: now.getTime(),
    staleAt: stale.getTime(),
    strings: { openApp: t('widget.openApp') },
    colors: input.colors,
    marks: Object.fromEntries(PRAYER_IDS.map((id) => [id, markPartsToPath(DAY_MARK_PARTS[id])])) as Record<
      PrayerId,
      string
    >,
    arch: {
      viewBox: WIDGET_ARCH.viewBox,
      outer: serializeOps(toCubicOps(WIDGET_ARCH.outer)),
      inner: serializeOps(toCubicOps(WIDGET_ARCH.inner)),
      stroke: WIDGET_ARCH.stroke,
      innerStroke: WIDGET_ARCH.innerStroke,
      disc: WIDGET_ARCH.disc,
      ring: WIDGET_ARCH.ring,
      ringStroke: WIDGET_ARCH.ringStroke,
      markSize: WIDGET_ARCH.markSize,
      markStroke: WIDGET_ARCH.markStroke,
    },
    days,
    entries,
  };
}
