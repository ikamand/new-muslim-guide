import type { ContentRef } from './model';
import { ref } from './model';

/**
 * Ramadan as phases, not a pinned page — docs/ramadan-mode.md, piece R2.
 *
 * `seasons.ts` points the whole of month 9 at the same 244-line Ramadan page,
 * which was the right shape for a season and the wrong one for the most
 * day-shaped month in the religion. This table breaks the season into
 * moments, each pointing at content that already exists: the arc adds no
 * pages, it gives reviewed pages a time to arrive.
 *
 * `use-today.ts` asks this table BEFORE it asks `seasonFor`, so during months
 * 8 and 9 these rows win and the season rows for Ramadan simply never fire.
 * The season table keeps Dhul Hijjah and Muharram, which have no arc.
 *
 * ## The inherited zakat row
 *
 * `use-today.ts` used to carry a standing zakat candidate for all of month 9.
 * Its reasoning was sound and moves here with it: zakat al-māl is NOT due in
 * Ramadan — it falls due when a lunar year passes on the reader's own wealth
 * (Tirmidhi 631) — but Ramadan is when most people choose to pay, so the
 * calculator earns attention then. As an arc row it takes the middle of the
 * month, leaving the first days to the fast and the last ten to the nights
 * that matter more than arithmetic.
 *
 * ## The same humility as `seasons.ts`
 *
 * Windows of days, never a single date. The calculation misses the sighted
 * month by a day often enough that "Eid is today" is the one claim these rows
 * must never make — which is why the Eid rows span the month boundary and the
 * Eid page itself says to ask locally.
 *
 * ## A row for the night
 *
 * Tarāwīḥ is prayed after ʿIshāʾ, every night of the month, so its row names
 * parts of the night rather than an hour (Iyad, 13 Sep 2026). It used to start
 * at 17:00 by the clock, which in summer is hours before ʿIshāʾ, and only on
 * the first ten nights. `arcFor` never returns such a row; the night asks
 * `arcForNight`, with the night's own Islamic date from `hijriOfNight`, because
 * a night carries the next day's date. A calculated first or last night can
 * still be a night off the sighted one, which is the day either way these
 * windows already accept.
 */

export type ArcRow = {
  id: string;
  /** Islamic month, 1–12. */
  month: number;
  /** Inclusive day range inside that month. Absent bounds mean the whole month. */
  fromDay?: number;
  toDay?: number;
  /**
   * The parts of the night this row takes over, in place of what `lib/night.ts`
   * would offer there. A row with any is for the night only.
   */
  during?: readonly ('witr' | 'qiyam' | 'tahajjud')[];
  /** The content this moment is worth. Absent means the row is the zakat screen. */
  ref?: ContentRef;
  /** The kicker line on Today, via `t()`. */
  reason:
    | 'arc.before'
    | 'arc.early'
    | 'arc.tarawih'
    | 'today.zakat'
    | 'season.last-ten-nights'
    | 'arc.eid';
};

/** Most specific first — the first match wins, like `SEASONS`. */
export const RAMADAN_ARC: readonly ArcRow[] = [
  /*
    Every night of Ramadan, after ʿIshāʾ: tarāwīḥ. It replaces qiyam al-layl,
    because in Ramadan it is the night prayer, and takes witr's stretch before
    it, because it is prayed straight after ʿIshāʾ and witr is commonly prayed
    with the imam at its end. So from ʿIshāʾ to the last third; tahajjud keeps
    the last third as on every night (Iyad, 13 Sep 2026).
  */
  {
    id: 'tarawih',
    month: 9,
    during: ['witr', 'qiyam'],
    // The Taraweeh page since 13 Sep 2026; it opened Qiyam al-Layl before there was one.
    ref: ref('reference', 'taraweeh'),
    reason: 'arc.tarawih',
  },
  /* The first days: the fast itself. */
  { id: 'early', month: 9, toDay: 10, ref: ref('reference', 'ramadan'), reason: 'arc.early' },
  /* Mid-month: the calculator, for the reasons in the header. */
  { id: 'zakat', month: 9, fromDay: 11, toDay: 20, reason: 'today.zakat' },
  /* The last ten nights. */
  {
    id: 'last-ten',
    month: 9,
    fromDay: 21,
    toDay: 27,
    ref: ref('reference', 'ramadan'),
    reason: 'season.last-ten-nights',
  },
  /* Eid is close — zakat al-fitr is due before the prayer, and the page says
     so. Spans the month boundary because the boundary is exactly what the
     calculation cannot pin. */
  { id: 'eid-close', month: 9, fromDay: 28, ref: ref('reference', 'eid'), reason: 'arc.eid' },
  { id: 'eid', month: 10, toDay: 3, ref: ref('reference', 'eid'), reason: 'arc.eid' },
  /* The month before, from the fifteenth: near enough to be useful, far
     enough to prepare. Same window `seasons.ts` chose. */
  {
    id: 'before',
    month: 8,
    fromDay: 15,
    ref: ref('reference', 'ramadan'),
    reason: 'arc.before',
  },
];

function covers(row: ArcRow, date: { month: number; day: number }): boolean {
  return (
    row.month === date.month &&
    date.day >= (row.fromDay ?? 1) &&
    date.day <= (row.toDay ?? 30)
  );
}

/** The arc row this day falls in, if any. Never a row for the night. */
export function arcFor(date: { month: number; day: number }): ArcRow | undefined {
  return RAMADAN_ARC.find((row) => !row.during && covers(row, date));
}

/**
 * The arc row that takes over this part of the night, if any. `date` is the
 * night's own Islamic date, from `hijriOfNight`, not the civil day's.
 */
export function arcForNight(
  date: { month: number; day: number },
  part: 'witr' | 'qiyam' | 'tahajjud',
): ArcRow | undefined {
  return RAMADAN_ARC.find((row) => !!row.during?.includes(part) && covers(row, date));
}
