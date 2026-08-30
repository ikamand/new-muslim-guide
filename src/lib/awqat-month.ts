import { hijriDate, type HijriDate } from '@/lib/hijri';
import { computeDay, type DayTimes, type LatLon, type MethodProfile } from '@/lib/prayer-times';

/**
 * One month of prayer times — the model behind the monthly jadwal.
 *
 * Pure arithmetic, like everything in `prayer-times.ts`: thirty-odd calls to
 * `computeDay`, each built from local calendar parts, plus the Hijri reading
 * for each day. Nothing here touches the network and nothing is cached across
 * days — a month is cheap enough to rebuild whenever it is asked for.
 *
 * ## What is deliberately NOT here
 *
 * Named moon-boundary events — 1 Ramadan, the Eids, ʿĀshūrāʾ, ʿArafah. The
 * app's own shipped content promises it will not date these
 * (`learn/voluntary-fasting.ts`: "This app will not tell you the date of
 * ʿĀshūrāʾ or ʿArafah… ask your mosque"), because a projected calendar is
 * wrong often enough that confidence would mislead. Until that stance is
 * revisited on purpose, the jadwal marks only what arithmetic can honestly
 * claim: which day is Friday, and which projected days are the white days —
 * where being a day off costs nothing, since the fast is voluntary on any
 * ordinary day.
 */

export type MonthDay = {
  /** Local midnight of this day. Format from it; never store the formatting. */
  date: Date;
  times: DayTimes;
  /** Null where the platform has no Umm al-Qura data — the column just stays empty. */
  hijri: HijriDate | null;
  isFriday: boolean;
  isToday: boolean;
  /**
   * A projected 13th, 14th or 15th of the Hijri month — the white days, whose
   * fasting `learn/voluntary-fasting.ts` teaches. Projected: a sighting can
   * shift them a day, and the screen says so once for the whole table.
   */
  isWhiteDay: boolean;
};

export type Month = {
  year: number;
  /** 0-based, as `Date` counts. */
  month: number;
  days: MonthDay[];
};

function isSameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function buildMonth(
  coords: LatLon,
  year: number,
  month: number,
  profile: MethodProfile,
  today: Date,
): Month {
  const count = new Date(year, month + 1, 0).getDate();
  const days: MonthDay[] = [];

  for (let dayOfMonth = 1; dayOfMonth <= count; dayOfMonth += 1) {
    const date = new Date(year, month, dayOfMonth, 0, 0, 0, 0);
    const hijri = hijriDate(date);
    days.push({
      date,
      times: computeDay(coords, date, profile),
      hijri,
      isFriday: date.getDay() === 5,
      isToday: isSameLocalDay(date, today),
      isWhiteDay: hijri !== null && hijri.day >= 13 && hijri.day <= 15,
    });
  }

  return { year, month, days };
}

/**
 * A bare clock reading — "8:10", no meridiem.
 *
 * The printed timetable convention: five columns of times fit a phone only
 * without AM/PM, and the column headers make the period unambiguous — Fajr
 * is before dawn, ʿIshāʾ is night. Built from parts so the separator and
 * digits still follow the reader's locale.
 */
export function formatClock(time: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', hour12: true })
    .formatToParts(time)
    .filter((part) => part.type === 'hour' || part.type === 'minute' || part.type === 'literal')
    .map((part) => part.value)
    .join('')
    .trim()
    .replace(/[\s\u202f]+$/, '');
}

/**
 * The Hijri span a civil month covers, e.g. "Rabīʿ I – Rabīʿ II 1448".
 *
 * Read from the first and last day rather than computed, so it can never
 * disagree with the column beside it. Names come from the same UI dictionary
 * the Today header uses.
 */
export function hijriSpan(days: MonthDay[]): { from: HijriDate; to: HijriDate } | null {
  const first = days.find((day) => day.hijri !== null)?.hijri ?? null;
  const last = [...days].reverse().find((day) => day.hijri !== null)?.hijri ?? null;
  if (!first || !last) return null;
  return { from: first, to: last };
}
