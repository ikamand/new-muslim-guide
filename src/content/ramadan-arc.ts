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
 */

export type ArcRow = {
  id: string;
  /** Islamic month, 1–12. */
  month: number;
  /** Inclusive day range inside that month. Absent bounds mean the whole month. */
  fromDay?: number;
  toDay?: number;
  /** Only from this local hour onward — for offers that belong to the evening. */
  hourFrom?: number;
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
  /* Evenings of the first nights: what tarāwīḥ is, before walking into one. */
  {
    id: 'tarawih',
    month: 9,
    toDay: 10,
    hourFrom: 17,
    ref: ref('reference', 'qiyam-al-layl'),
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

/** The arc row this moment falls in, if any. */
export function arcFor(
  date: { month: number; day: number },
  hour: number,
): ArcRow | undefined {
  return RAMADAN_ARC.find(
    (row) =>
      row.month === date.month &&
      date.day >= (row.fromDay ?? 1) &&
      date.day <= (row.toDay ?? 30) &&
      hour >= (row.hourFrom ?? 0),
  );
}
