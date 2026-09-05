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
import { WORD_TRANSLITERATIONS } from './transliterations';
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
/**
 * The names as this app writes them.
 *
 * `juz30.ts` is generated and carries api.quran.com's labels, which mix three
 * transliteration conventions in one list — a straight apostrophe for ʿayn in
 * "Al-'Asr" where every other screen writes ʿAsr, a doubled vowel in
 * "Ad-Duhaa", and title case that stops halfway through "The Small
 * kindnesses". A name is not a quotation, so it is corrected here, by hand,
 * with the generated file left exactly as it came over the wire. Only
 * spelling and capitalisation change; no name or meaning is re-translated.
 */
const HOUSE_NAMES: Readonly<Record<number, Partial<Pick<Surah, 'name' | 'meaning'>>>> = {
  79: { name: 'An-Naziʿat', meaning: 'Those Who Drag Forth' },
  80: { name: 'ʿAbasa' },
  86: { meaning: 'The Nightcomer' },
  87: { name: 'Al-Aʿla' },
  93: { name: 'Ad-Duha' },
  96: { name: 'Al-ʿAlaq' },
  100: { name: 'Al-ʿAdiyat' },
  101: { name: 'Al-Qariʿah' },
  102: { meaning: 'The Rivalry in World Increase' },
  103: { name: 'Al-ʿAsr' },
  107: { name: 'Al-Maʿun', meaning: 'The Small Kindnesses' },
};

function housed(surah: Surah): Surah {
  const fix = HOUSE_NAMES[surah.number];
  return fix ? { ...surah, ...fix } : surah;
}

export const LEARNING_ORDER: readonly Surah[] = [AL_FATIHA, ...[...JUZ_30].reverse()].map(housed);

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
 * How an ayah sounds, in Latin letters — now for every surah here.
 *
 * ## The history of this rule, kept because it reversed twice
 *
 * ui-redesign-plan §5.3 settled "no transliteration under juz 30" — a Latin
 * line gets read *instead of* the Arabic. Al-Fatiha became the one exception
 * (somebody three weeks in must say it tonight, five times). Then on
 * 30 Aug 2026 **Iyad reversed the rule itself**, for the recite feature:
 * *"transliteration should be more than alfatihah … we do need them because
 * most new muslims cant read arabic."* Someone reciting along with the
 * follower needs a line they can read, and per-word data lets the highlight
 * light the Latin word in step with the Arabic one — which turns the crutch
 * argument on its head: the lit pairing is how the shapes get learned.
 *
 * The data is generated, per word, from the same source as the ayah text
 * (`scripts/generate-transliterations.mjs`), in the app's own scheme.
 * Al-Fatiha prefers the hand-checked line in `recitations.ts`, unchanged —
 * one scheme, and the prayer screens cannot drift from this one.
 */
export function ayahTransliteration(surah: number, ayah: number): string | undefined {
  if (surah === 1) return Recitations.fatiha.verses[ayah - 1]?.transliteration;
  return WORD_TRANSLITERATIONS[surah]?.[ayah]?.join(' ');
}

/**
 * The same line as separate words, index-aligned with the ayah's Arabic
 * split on spaces — the generator guarantees the alignment or omits the
 * ayah. `undefined` means "no per-word line": the caller falls back to the
 * plain line or nothing, never to a misaligned highlight.
 */
export function ayahWordTransliterations(
  surah: number,
  ayah: number,
): readonly string[] | undefined {
  return WORD_TRANSLITERATIONS[surah]?.[ayah];
}
