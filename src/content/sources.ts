/**
 * Where a claim comes from.
 *
 * The app is scaffolding around religious instruction, and the one thing a
 * reader cannot check by looking at the screen is whether what it says is
 * true. Provenance is therefore data, not prose: a structured reference that
 * a reviewer can look up, and that a script can report on.
 *
 * Four kinds, because there are four honest answers to "how do you know":
 * the Qur'an says so, an authenticated narration says so, a named scholarly
 * work says so, or nobody is claiming revelation — it is ordinary explanation.
 * That last one is a real category, not a cop-out: "the mosque will be busier
 * on Friday" needs no isnad.
 *
 * ⚠️ Never invent a reference. An unsourced claim is honest; a fabricated
 * citation is worse than nothing, because it survives review by looking right.
 * If the wording came from somewhere you cannot name, leave `sources` off and
 * let `npm run content:audit` report it.
 */

/**
 * The canonical Sunni collections, spelled one way.
 *
 * A free-text field gets "Bukhari", "Sahih Bukhari" and "Sahih al-Bukhari" in
 * the same codebase within a month, and then nothing can group or check them.
 */
export const HADITH_COLLECTIONS = {
  bukhari: { name: 'Sahih al-Bukhari', authenticThroughout: true },
  muslim: { name: 'Sahih Muslim', authenticThroughout: true },
  'abu-dawud': { name: 'Sunan Abi Dawud', authenticThroughout: false },
  tirmidhi: { name: 'Jami` at-Tirmidhi', authenticThroughout: false },
  nasai: { name: 'Sunan an-Nasa`i', authenticThroughout: false },
  'ibn-majah': { name: 'Sunan Ibn Majah', authenticThroughout: false },
  malik: { name: 'Muwatta Malik', authenticThroughout: false },
  ahmad: { name: 'Musnad Ahmad', authenticThroughout: false },
} as const satisfies Record<string, { name: string; authenticThroughout: boolean }>;

export type HadithCollection = keyof typeof HADITH_COLLECTIONS;

/**
 * How a narration is graded.
 *
 * CLAUDE.md settles that the app argues from authenticated hadith, so this
 * exists to be checked rather than to offer a choice: `content:audit` fails on
 * anything graded `daif`, and reports narrations from a mixed collection that
 * carry no grading at all. Bukhari and Muslim need no grading — that is what
 * `authenticThroughout` records.
 */
export type HadithGrading = 'sahih' | 'hasan' | 'daif';

export type QuranSource = {
  kind: 'quran';
  /** 1–114. */
  surah: number;
  /** A single ayah, or an inclusive range. */
  ayah: number | readonly [number, number];
  /** Optional, for display. The reference alone is unambiguous without it. */
  surahName?: string;
};

export type HadithSource = {
  kind: 'hadith';
  collection: HadithCollection;
  /** The number as that collection prints it — "6087", "2:14". */
  reference: string;
  /** Leave off for Bukhari and Muslim; required in practice elsewhere. */
  grading?: HadithGrading;
};

/** A named work — a fiqh manual, a fatwa body, a scholar's ruling. */
export type ScholarlySource = {
  kind: 'scholarly';
  /** The work or body: "Al-Mughni", "Islamic Fiqh Academy". */
  work: string;
  author?: string;
  /** Volume, page, fatwa number — whatever locates it. */
  locator?: string;
  url?: string;
};

/**
 * Ordinary explanation, claiming no textual authority.
 *
 * For everything the app says that is not a ruling: what a mosque looks like
 * inside, that nobody minds if you get the movements wrong, that Arabic takes
 * a while. `basis` says why it can be asserted.
 */
export type GeneralSource = {
  kind: 'general';
  basis: string;
};

export type Source = QuranSource | HadithSource | ScholarlySource | GeneralSource;

/** Shorthand builders, so a content file reads as content rather than as JSON. */
export const quran = (
  surah: number,
  ayah: number | readonly [number, number],
  surahName?: string,
): QuranSource => ({ kind: 'quran', surah, ayah, ...(surahName ? { surahName } : {}) });

export const hadith = (
  collection: HadithCollection,
  reference: string,
  grading?: HadithGrading,
): HadithSource => ({ kind: 'hadith', collection, reference, ...(grading ? { grading } : {}) });

export const scholarly = (source: Omit<ScholarlySource, 'kind'>): ScholarlySource => ({
  kind: 'scholarly',
  ...source,
});

export const general = (basis: string): GeneralSource => ({ kind: 'general', basis });

/**
 * A source as a human reads it — "Qur'an 2:255", "Sahih al-Bukhari 6087".
 *
 * Not translated. A citation is a locator, and "Sahih al-Bukhari 6087" is the
 * same locator in every language; translating the collection name would make
 * it harder to look up, not easier.
 */
export function formatSource(source: Source): string {
  switch (source.kind) {
    case 'quran': {
      const ayah = Array.isArray(source.ayah)
        ? `${source.ayah[0]}-${source.ayah[1]}`
        : String(source.ayah);
      return `Qur'an ${source.surah}:${ayah}`;
    }
    case 'hadith': {
      const { name } = HADITH_COLLECTIONS[source.collection];
      return `${name} ${source.reference}`;
    }
    case 'scholarly':
      return [source.work, source.author, source.locator].filter(Boolean).join(', ');
    case 'general':
      return source.basis;
  }
}

/** Whether a source meets the app's stated evidence bar. Drives `content:audit`. */
export function isAuthenticated(source: Source): boolean {
  if (source.kind !== 'hadith') return true;
  if (source.grading === 'daif') return false;
  if (HADITH_COLLECTIONS[source.collection].authenticThroughout) return true;
  return source.grading === 'sahih' || source.grading === 'hasan';
}
