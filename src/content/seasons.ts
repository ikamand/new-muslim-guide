/**
 * The times of year the app has something to say about.
 *
 * Windows over the Islamic calendar, each pointing at content that already
 * exists. Not a calendar feature and not a list of holidays — the app knows
 * nothing here that `reference:ramadan`, `reference:islamic-calendar` and
 * `pillar:hajj` do not already say. This is only *when* to put one of them in
 * front of someone.
 *
 * ## Months, never days
 *
 * Every window is at least nine days long, and none of them names a single
 * date. That is deliberate. The date comes from the Umm al-Qura calculation
 * (see `src/lib/hijri.ts`), months actually begin by local moon sighting, and
 * the two differ by a day often enough that a beginner would be told "Eid is
 * today" on the wrong day. So there is no Eid entry, no Laylat al-Qadr entry
 * and no Ashura entry — the app has no content for any of them beyond what the
 * Ramadan lesson already holds, and a one-day claim is the one thing this
 * calculation cannot support.
 *
 * Nothing here is a religious claim. It is which lesson is worth reading this
 * month, with the claims left where they are, under their own citations.
 */

import type { ContentRef } from './model';
import { ref } from './model';

export const SEASON_IDS = [
  'last-ten-nights',
  'ramadan',
  'before-ramadan',
  'dhul-hijjah',
  'muharram',
] as const;

export type SeasonId = (typeof SEASON_IDS)[number];

export type Season = {
  id: SeasonId;
  /** Islamic month, 1–12. */
  month: number;
  /** Inclusive day range inside that month. Absent bounds mean the whole month. */
  fromDay?: number;
  toDay?: number;
  /** The content this window is worth reading. */
  ref: ContentRef;
};

/**
 * Most specific first — `seasonFor` returns the first match, so the last ten
 * nights of Ramadan win over Ramadan itself.
 */
export const SEASONS: readonly Season[] = [
  { id: 'last-ten-nights', month: 9, fromDay: 21, ref: ref('reference', 'ramadan') },
  { id: 'ramadan', month: 9, ref: ref('reference', 'ramadan') },
  // The month before, so a first Ramadan is not a surprise that arrives on the
  // day. Fifteenth onward: near enough to be useful, far enough to prepare.
  { id: 'before-ramadan', month: 8, fromDay: 15, ref: ref('reference', 'ramadan') },
  // Days one to nine only. The tenth is Eid al-Adha, and this calculation is
  // not something to announce a single day from.
  { id: 'dhul-hijjah', month: 12, toDay: 9, ref: ref('pillar', 'hajj') },
  { id: 'muharram', month: 1, toDay: 10, ref: ref('reference', 'islamic-calendar') },
];

/** The window today falls in, if any. */
export function seasonFor(date: { month: number; day: number }): Season | undefined {
  return SEASONS.find(
    (season) =>
      season.month === date.month &&
      date.day >= (season.fromDay ?? 1) &&
      date.day <= (season.toDay ?? 30),
  );
}
