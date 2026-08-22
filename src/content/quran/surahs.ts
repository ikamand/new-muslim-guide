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

import { Recitations } from '../recitations';
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


/**
 * Where a recitation the prayer teaches also exists as a surah to open.
 *
 * The prayer steps that recite Al-Fatiha used to send people to the practice
 * screen, which was the best Al-Fatiha screen the app had. It isn't any more —
 * the surah screen plays the whole thing gaplessly, plays any ayah on its own,
 * covers a line to test it, and remembers whether you know it. Somebody
 * standing on a mat at the recite step should land on the better screen.
 *
 * A map rather than a check for the string 'fatiha', because this is a list
 * that grows: the moment a second surah is recorded for the prayer it is one
 * line here and not an `if` somewhere in a component.
 */
const SURAH_FOR_RECITATION: Readonly<Record<string, number>> = { fatiha: 1 };

export function surahForRecitation(practiceKey: string): number | undefined {
  return SURAH_FOR_RECITATION[practiceKey];
}

/**
 * How an ayah sounds, in Latin letters — for Al-Fatiha and nothing else.
 *
 * ## This is an exception to a settled decision, not a reversal of it
 *
 * Juz 30 carries no transliteration on purpose, and that stands. A Latin line
 * under an ayah gets read *instead of* the Arabic: people memorise English
 * letters, and still cannot open a mushaf. For a surah somebody is choosing to
 * learn, the line is a crutch that postpones the thing they came for.
 *
 * Al-Fatiha is not that. It is recited in every rak'ah of every prayer, and
 * somebody three weeks into Islam has to say it tonight, five times, before
 * they can read a word of Arabic. Withholding the line there does not protect
 * their reading — it stops them praying. That is a different situation from
 * the one the rule was written for, which is why this is narrow and why it is
 * written down.
 *
 * It resolves itself structurally rather than by a flag: the 564 generated
 * ayahs have no transliteration to return, because it was never fetched. So
 * only Al-Fatiha can show one, and the rule for everything else cannot be
 * broken by forgetting.
 *
 * The text is the one already in `recitations.ts` — copied across rather than
 * written again, because a transliteration is content and this app does not
 * invent content. One scheme, one place, and the two screens cannot drift.
 */
export function ayahTransliteration(surah: number, ayah: number): string | undefined {
  if (surah !== 1) return undefined;
  return Recitations.fatiha.verses[ayah - 1]?.transliteration;
}
