/**
 * Where in an ordinary day a duʿa belongs.
 *
 * ## What used to be here
 *
 * Nine duʿas the app owned outright, with hand-checked citations, beginner
 * notes and their own screen. They are gone, deleted on Iyad's instruction:
 * every one of those occasions is in Hisn al-Muslim, the Arabic matched to the
 * punctuation, and two copies of the same duʿas is how a codebase grows a
 * second one that drifts. Search already indexed the book's 132 occasions
 * alongside them, so nothing became unfindable.
 *
 * What went with them, recorded because it is not recoverable by reading the
 * diff: the beginner notes (what to say when you forget the bismillah halfway
 * through a meal), seven wired `audioId`s that were the reciter's work list,
 * and four French and four Spanish strings. The book carries none of those.
 *
 * ## What is left, and why
 *
 * The vocabulary of the day. `moments.ts` maps the book's occasions onto these
 * six, the book screen filters by them, and the tab's card reads the hour
 * table to decide what to put in front of someone. That is placement, not
 * content — no duʿa lives here any more.
 */

export const DAY_MOMENTS = [
  'waking',
  'washing',
  'leaving',
  'eating',
  'travel',
  'night',
] as const;

export type DayMoment = (typeof DAY_MOMENTS)[number];

/**
 * Which moment of the day an hour falls in.
 *
 * A table of twenty-four rather than a chain of comparisons, because the
 * boundaries are the content here and a reader should be able to see all of
 * them at once instead of deriving them from arithmetic.
 *
 * `washing` is not on it, and that is not an oversight: going to the bathroom
 * has no hour. Its duʿas are reached from the day screen, where the whole day
 * is visible, rather than from a card that claims this is the moment for them.
 */
export const MOMENT_BY_HOUR: readonly DayMoment[] = [
  'night', 'night', 'night', 'night', //  00–03
  'waking', 'waking', 'waking', 'waking', //  04–07
  'waking', 'leaving', 'leaving', 'leaving', //  08–11
  'eating', 'eating', 'eating', 'travel', //  12–15
  'travel', 'travel', 'eating', 'eating', //  16–19
  'night', 'night', 'night', 'night', //  20–23
];
