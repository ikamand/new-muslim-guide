/**
 * Where a claim comes from.
 *
 * The code is scaffolding around religious instruction, and the one thing a
 * reader cannot check by looking at the screen is whether what it says is
 * true. Provenance is therefore data, not prose: a structured reference a
 * reviewer can look up, and that a script can report on.
 *
 * Four kinds, because there are four honest answers to "how do you know":
 * the Qur'an says so, an authenticated narration says so, a named scholarly
 * work says so, or nobody is claiming revelation — it is ordinary explanation.
 * That last one is a real category, not a cop-out: "the mosque will be busier
 * on Friday" needs no isnad.
 *
 * ⚠️ Never invent a reference, a number, a grading or a URL. An unsourced
 * claim is honest; a fabricated citation is worse than nothing, because it
 * survives review by looking right. Everything here was verified by opening
 * the page — the first pass at this file cited Sahih al-Bukhari 6087 for the
 * duʿa before sleeping, and 6087 is about smiling and the expiation for
 * breaking a fast. It looked entirely plausible.
 *
 * If the wording came from somewhere you cannot name, leave `sources` off and
 * let `npm run content:audit` report it.
 */

/**
 * The canonical Sunni collections, spelled one way.
 *
 * A free-text field gets "Bukhari", "Sahih Bukhari" and "Sahih al-Bukhari" in
 * the same codebase within a month, and then nothing can group or check them.
 *
 * `sunnahSlug` is the path segment sunnah.com serves the collection under, so
 * a citation can resolve to a page a reviewer can open. Every slug below was
 * confirmed by requesting it and reading back a matching title. Muwatta Malik
 * has none: it is not addressable as `malik:<n>` — it uses a book:hadith pair
 * — and a link that 404s is worse than no link.
 */
export const HADITH_COLLECTIONS = {
  bukhari: { name: 'Sahih al-Bukhari', authenticThroughout: true, sunnahSlug: 'bukhari' },
  muslim: { name: 'Sahih Muslim', authenticThroughout: true, sunnahSlug: 'muslim' },
  'abu-dawud': { name: 'Sunan Abi Dawud', authenticThroughout: false, sunnahSlug: 'abudawud' },
  tirmidhi: { name: 'Jami` at-Tirmidhi', authenticThroughout: false, sunnahSlug: 'tirmidhi' },
  nasai: { name: 'Sunan an-Nasa`i', authenticThroughout: false, sunnahSlug: 'nasai' },
  'ibn-majah': { name: 'Sunan Ibn Majah', authenticThroughout: false, sunnahSlug: 'ibnmajah' },
  ahmad: { name: 'Musnad Ahmad', authenticThroughout: false, sunnahSlug: 'ahmad' },
  malik: { name: 'Muwatta Malik', authenticThroughout: false, sunnahSlug: undefined },
} as const satisfies Record<
  string,
  { name: string; authenticThroughout: boolean; sunnahSlug: string | undefined }
>;

export type HadithCollection = keyof typeof HADITH_COLLECTIONS;

/**
 * How a narration is graded.
 *
 * CLAUDE.md settles that the app argues from authenticated hadith, so this
 * exists to be checked rather than to offer a choice: `content:audit` fails on
 * anything graded `daif`, and reports narrations from a mixed collection that
 * carry no grading at all. Bukhari and Muslim need no grading — that is what
 * `authenticThroughout` records.
 *
 * Never assign one from memory. A grading is a scholarly judgement; take it
 * from the collection page or leave it off.
 */
export type HadithGrading = 'sahih' | 'hasan' | 'daif';

/** The four Sunni schools, plus the honest ways of naming a body of opinion. */
export const MADHHABS = ['Hanafi', 'Maliki', 'Shafi`i', 'Hanbali'] as const;
export type Madhhab = (typeof MADHHABS)[number];
export type Attribution = Madhhab | 'the majority' | 'a minority' | 'contemporary scholarship';

export type QuranSource = {
  kind: 'quran';
  /** 1–114. */
  surah: number;
  /** A single ayah, or an inclusive range. */
  ayah: number | readonly [number, number];
  /** Optional, for display. The reference alone is unambiguous without it. */
  surahName?: string;
  /** Overrides the derived quran.com link. Set it if you read it elsewhere. */
  url?: string;
};

export type HadithSource = {
  kind: 'hadith';
  collection: HadithCollection;
  /** The number as that collection prints it — "6324". */
  reference: string;
  /** The book within the collection: 80 for Bukhari's Invocations. */
  book?: number;
  /** That book's name, as the collection gives it — "Invocations". */
  bookName?: string;
  /** The in-book position — "Book 80, Hadith 21". */
  inBookReference?: string;
  /** Leave off for Bukhari and Muslim; take it from the page elsewhere. */
  grading?: HadithGrading;
  /** Who graded it — "Al-Albani", "Darussalam". Meaningless without it. */
  gradedBy?: string;
  /** Overrides the derived sunnah.com link. */
  url?: string;
};

/** A named work — a fiqh manual, a fatwa body, a scholar's ruling. */
export type ScholarlySource = {
  kind: 'scholarly';
  /** The work or body: "Al-Mughni", "Islamic Fiqh Academy". */
  work: string;
  author?: string;
  volume?: string;
  page?: string;
  /** Whose position this is, where that is the point of citing it. */
  school?: Attribution;
  url?: string;
};

/**
 * Ordinary explanation, claiming no textual authority.
 *
 * For everything the app says that is not a ruling: what a mosque looks like
 * inside, that nobody minds if you get the movements wrong, that Arabic takes
 * a while. `basis` says why it can be asserted. This is a real answer — most
 * of what makes this app useful to a beginner is of exactly this kind.
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
  extra?: Omit<QuranSource, 'kind' | 'surah' | 'ayah'>,
): QuranSource => ({ kind: 'quran', surah, ayah, ...extra });

export const hadith = (
  collection: HadithCollection,
  reference: string,
  extra?: Omit<HadithSource, 'kind' | 'collection' | 'reference'>,
): HadithSource => ({ kind: 'hadith', collection, reference, ...extra });

export const scholarly = (source: Omit<ScholarlySource, 'kind'>): ScholarlySource => ({
  kind: 'scholarly',
  ...source,
});

export const general = (basis: string): GeneralSource => ({ kind: 'general', basis });

/**
 * A source as a human reads it — "Qur'an 2:255", "Sahih al-Bukhari 6324".
 *
 * Not translated. A citation is a locator, and "Sahih al-Bukhari 6324" is the
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
      const grading = source.grading
        ? ` (${source.grading}${source.gradedBy ? ` — ${source.gradedBy}` : ''})`
        : '';
      return `${name} ${source.reference}${grading}`;
    }
    case 'scholarly':
      return [
        source.work,
        source.author,
        [source.volume, source.page].filter(Boolean).join('/'),
        source.school,
      ]
        .filter(Boolean)
        .join(', ');
    case 'general':
      return source.basis;
  }
}

/**
 * A page a reviewer can open, or undefined.
 *
 * An explicit `url` always wins. Otherwise it is derived from patterns
 * confirmed against the live sites — `quran.com/1/1` and
 * `sunnah.com/bukhari:6324` both resolve — never guessed. A collection with no
 * verified slug, and every `general` basis, returns nothing rather than a link
 * that goes somewhere wrong.
 */
export function sourceUrl(source: Source): string | undefined {
  switch (source.kind) {
    case 'quran': {
      if (source.url) return source.url;
      const first = Array.isArray(source.ayah) ? source.ayah[0] : source.ayah;
      return `https://quran.com/${source.surah}/${first}`;
    }
    case 'hadith': {
      if (source.url) return source.url;
      const { sunnahSlug } = HADITH_COLLECTIONS[source.collection];
      return sunnahSlug ? `https://sunnah.com/${sunnahSlug}:${source.reference}` : undefined;
    }
    case 'scholarly':
      return source.url;
    case 'general':
      return undefined;
  }
}

/** Whether a source meets the app's stated evidence bar. Drives `content:audit`. */
export function isAuthenticated(source: Source): boolean {
  if (source.kind !== 'hadith') return true;
  if (source.grading === 'daif') return false;
  if (HADITH_COLLECTIONS[source.collection].authenticThroughout) return true;
  return source.grading === 'sahih' || source.grading === 'hasan';
}
