/**
 * Every surah the app can open, in the order it offers them.
 *
 * Hand-written, unlike the two files it draws from — this is an editorial
 * decision about teaching order, and it does not belong in something a script
 * overwrites.
 *
 * ## Why Al-Fatiha is pinned to the top rather than folded into the run
 *
 * The rest is juz 30 walked backwards, 114 → 78, which is how it is taught:
 * contiguous, so there is never a question about what comes next, and it
 * front-loads the three *quls*. Al-Fatiha is surah 1 and belongs nowhere in
 * that sequence — dropping it in by number would put it last, behind
 * thirty-seven surahs, which is precisely backwards.
 *
 * It goes first because it is the one surah you cannot pray without. Every
 * rak'ah of every prayer, five times a day, for life. Somebody who learns only
 * one thing on this screen should learn this, and a memorisation tab that made
 * them scroll past An-Naba to find it would have its priorities upside down.
 *
 * That it is not part of juz 30 is a fact about the mushaf, not about what a
 * beginner needs first.
 */

import { AL_FATIHA } from './fatiha';
import { JUZ_30, type Surah } from './juz30';

export type { Ayah, Surah } from './juz30';
export { JUZ30_SOURCE } from './juz30';

/**
 * The order people actually learn them.
 *
 * Al-Fatiha, then backwards through juz 30. Not shortest-first, which the data
 * contradicts — 110 and 103 are both shorter than 114.
 */
export const LEARNING_ORDER: readonly Surah[] = [AL_FATIHA, ...[...JUZ_30].reverse()];

export function getSurah(number: number): Surah | undefined {
  return LEARNING_ORDER.find((surah) => surah.number === number);
}
