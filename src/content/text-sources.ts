/**
 * Who published the words the app carries, and on what terms.
 *
 * The same shape as `audio-sources.ts` and for the same reason: attribution is
 * a licence obligation, so it lives as data rather than as a sentence typed
 * into a screen, where it gets forgotten the moment a text moves.
 *
 * ## Why this stopped being printed under every narration
 *
 * It used to be. `EvidenceBlock` closed with a line reading
 * "HadeethEnc.com · Darussalam (via fawazahmed0/hadith-api)", under the
 * citation, under the translation, under the Arabic.
 *
 * That is build plumbing on a teaching screen. "Sahih al-Bukhari 6018" is
 * where a narration comes from and belongs on the page; who mirrored it into a
 * JSON file is not, and to someone three weeks into Islam it reads as though
 * the app is citing a website as its authority for a hadith — which
 * undermines confidence rather than building it. Iyad called it: *"remove
 * mention of all outside sources, it's all unnecessary."*
 *
 * So the obligation moves to one page that names every publisher in one place.
 * That is not a weaker discharge of it than a line in a collapsed drawer under
 * the third duʿa on a page — nobody has ever found a licence credit there.
 *
 * ## Nothing here is a list of what the app happens to contain
 *
 * `creditedTextSources()` derives the publishers from the texts themselves, at
 * render time, so a new one entering `evidence.ts` appears on the page without
 * anybody remembering to add it, and one that leaves stops being claimed. The
 * table below only adds the detail that cannot be derived. A publisher in the
 * data with no entry here still renders, by name, rather than vanishing.
 */

import { HADITH_TEXT, QURAN_TEXT } from './evidence';

export type TextSource = {
  /** Where it is published. Shown as text — the app has no outbound links. */
  where: string;
  /**
   * The terms they actually published, where they published any.
   *
   * Absent is the honest value rather than a gap to fill in, exactly as in
   * `audio-sources.ts`: naming a licence nobody stated would be printing a
   * claim that was never made.
   */
  licence?: string;
  /** What those terms oblige us to keep doing. Read by us, shown to nobody. */
  obligation?: string;
};

/**
 * Keyed by the exact string `evidence.ts` writes into `arabicFrom` and
 * `translationFrom`, so the two cannot drift apart silently.
 */
export const TEXT_SOURCES: Readonly<Record<string, TextSource>> = {
  'QuranEnc.com': {
    where: 'quranenc.com',
    obligation:
      'No terms published that could be found. Named here on the same footing as the rest rather than on a licence that was never stated.',
  },
  'HadeethEnc.com': {
    where: 'hadeethenc.com',
    licence: 'No modification, addition or deletion, and the publisher named.',
    obligation:
      'Their Arabic and English ship verbatim, and this page is where the naming happens now that it is off the narration itself.',
  },
  'fawazahmed0/hadith-api': {
    where: 'github.com/fawazahmed0/hadith-api',
    licence: 'Unlicense (public-domain dedication).',
    obligation:
      'The dedication covers the compilation. It does not reach the English translation inside it — see the Darussalam entry.',
  },
  'Darussalam (via fawazahmed0/hadith-api)': {
    where: 'published by Darussalam, reached through the hadith-api mirror',
    obligation:
      'Carried as quotation, not republication: a hundred narrations out of some thirty thousand, each under the instruction it supports, in an app that is free and never sold. Iyad’s decision, on the record.',
  },
  'hadithunlocked.com': {
    where: 'hadithunlocked.com',
    obligation: 'No terms published that could be found. One narration.',
  },
} as const;

/** What a publisher supplied, counted from the texts rather than asserted. */
export type TextCredit = {
  /** The publisher, as `evidence.ts` names them. */
  name: string;
  source?: TextSource;
  /** How many texts they supplied the Arabic for. */
  arabic: number;
  /** How many they supplied the English for. */
  translation: number;
};

/**
 * Every publisher whose work is in the app right now, most-used first.
 *
 * Derived at render time from the texts in the bundle. A generated file would
 * have done the same job with one extra way to go stale; there is no build
 * step between the data and this, so there is nothing to forget to re-run.
 */
export function creditedTextSources(): TextCredit[] {
  const tally = new Map<string, TextCredit>();

  const count = (name: string | undefined, field: 'arabic' | 'translation') => {
    if (!name) return;
    const entry =
      tally.get(name) ??
      { name, source: TEXT_SOURCES[name], arabic: 0, translation: 0 };
    entry[field] += 1;
    tally.set(name, entry);
  };

  for (const text of [...Object.values(QURAN_TEXT), ...Object.values(HADITH_TEXT)]) {
    count(text.arabicFrom, 'arabic');
    count(text.translationFrom, 'translation');
  }

  return [...tally.values()].sort(
    (a, b) => b.arabic + b.translation - (a.arabic + a.translation),
  );
}
