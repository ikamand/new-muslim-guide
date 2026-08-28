/**
 * The firsts — a ledger of a life, not a count of lessons.
 *
 * ## Why this exists instead of a counter
 *
 * "6 of 36" measures somebody against a syllabus they never agreed to, and it
 * only ever reaches 36. A convert's life does not stop at the end of a reading
 * list: the first janāzah they attend may be years away, the first Ramadan is
 * a year at most, and both matter more than any lesson. A ledger of firsts is
 * the only shape of progress this app can honestly keep that still means
 * something in 2029.
 *
 * ## Three rules, and they are absolute
 *
 * 1. **It never shows what is left.** There is no total, no fraction, no
 *    "3 of 12". The unmarked ones are things that have not happened yet, which
 *    is not a failing and must never be drawn as one.
 * 2. **It never shows a date.** Each first carries a timestamp and it is used
 *    for ORDER alone — your ledger reads in the order your life happened.
 *    Nothing may compute a duration from it. "Two years since your first fast"
 *    is exactly the noticing `index.tsx` promises this app does not do.
 * 3. **Nothing can be lost.** There is no un-marking by neglect, no expiry, no
 *    streak. A first is a fact, and facts do not lapse.
 *
 * ## On reinstall it is gone, and the app says nothing
 *
 * There is no account and no server, so a reinstall loses the ledger. The
 * honest answer is that it is gone — not a restore prompt, not an apology, and
 * certainly not "we noticed you lost your progress". The app simply starts
 * again and never mentions it. Anything else would turn a technical fact into
 * a loss the reader has to feel.
 */

/** How a first comes to be marked. */
export type FirstTrigger =
  /**
   * The app saw it. Marked from `observations.ts` with no prompt — nobody
   * should have to tell an app something it watched them do.
   */
  | 'observed'
  /**
   * The app can tell WHEN to ask, but not whether it happened. Offered once,
   * at a moment when the answer is fresh: "It is Friday tomorrow. Was that
   * your first?"
   */
  | 'offered'
  /**
   * Only the reader knows, and there is no moment the app can guess. It waits
   * in the ledger to be tapped, and never asks.
   */
  | 'quiet';

export type First = {
  id: string;
  trigger: FirstTrigger;
  /**
   * The observation that marks it, for `observed` firsts.
   *
   * A key into `observations.finished`, or the special `sitting` / `surah`
   * families. Deliberately narrow: a first that self-marks must correspond to
   * one thing the app actually watched, never to a guess assembled from
   * several.
   */
  from?: string;
  /**
   * The weekday an `offered` first is asked about, 0–6, Sunday first.
   *
   * Only a WEEKDAY, never a Hijri date. `seasons.ts` settles why: the date
   * comes from the Umm al-Qura calculation, months begin by local moon
   * sighting, and the two differ often enough that asking "was that your first
   * Eid?" on the wrong day is worse than not asking. Ramadan and Eid are
   * therefore `quiet`, not `offered`, however tempting the prompt.
   */
  askOnWeekday?: number;
};

/** Thursday, so the question about Jumuʿah arrives the evening before. */
const THURSDAY = 4;

/**
 * Twelve, in the order somebody is likely to meet them.
 *
 * Order is a rough life, not a requirement — the ledger sorts what has
 * happened by when it happened, and this list only decides how the unmarked
 * ones sit while they wait.
 */
export const FIRSTS: readonly First[] = [
  /* The app watched somebody finish a prayer guide. No prompt, ever. */
  { id: 'prayer-alone', trigger: 'observed', from: 'guide:fajr' },
  { id: 'wudu-alone', trigger: 'observed', from: 'guide:wudu' },
  /* It knows a sitting was completed, and which. */
  { id: 'adhkar', trigger: 'observed', from: 'sitting:morning' },
  /* It knows a surah was covered and recited. */
  { id: 'surah-memorised', trigger: 'observed', from: 'surah:any' },
  /* The day is knowable; whether they went is not. */
  { id: 'jumuah', trigger: 'offered', askOnWeekday: THURSDAY },
  { id: 'mosque', trigger: 'quiet' },
  { id: 'full-day', trigger: 'quiet' },
  { id: 'fast', trigger: 'quiet' },
  { id: 'ramadan', trigger: 'quiet' },
  { id: 'eid', trigger: 'quiet' },
  { id: 'prayed-in-public', trigger: 'quiet' },
  { id: 'explained-islam', trigger: 'quiet' },
  { id: 'janazah', trigger: 'quiet' },
  { id: 'zakat', trigger: 'quiet' },
];

export function firstById(id: string): First | undefined {
  return FIRSTS.find((entry) => entry.id === id);
}
