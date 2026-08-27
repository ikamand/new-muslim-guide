/**
 * The adhkār sessions — sittings of dhikr the day is organised around.
 *
 * ## Hand-written, like `moments.ts`, and for the same reason
 *
 * Which of the book's 132 occasions is a *session* is an editorial judgement,
 * not something derivable from `hisn.ts`. A generator would overwrite it.
 *
 * ## ⚠️ Morning and evening are ONE session here, not two
 *
 * Every app that ships these splits them: a morning list and an evening list,
 * with the wording changed between them. Hisn al-Muslim does not. It prints a
 * single occasion — `أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ`, 29 lines — and marks the
 * handful that belong to one sitting only in its own prose: `إذا أصبحَ`,
 * `إذا أمسى`. For a few, the WORDING itself changes, and the book records that
 * in a footnote rather than as a second text: footnote 112 says the evening
 * form of `اللَّهُمَّ مَا أَصْبَحَ بِي` is `اللَّهُمَّ مَا أَمْسَى بِي`.
 *
 * Splitting them in code therefore means conjugating Arabic by hand, which is
 * the one thing this repo will not do. So the app shows the book's list in
 * both windows and names the window it is in. When a reviewer has marked each
 * line `morning`, `evening` or `both` in `annotations.ts` — and transcribed
 * the variant wordings from the book's own footnotes — this becomes two
 * sessions and nothing else has to change.
 */

import { HISN, type HisnOccasion } from './hisn';

/** When a session is the one to be doing, in terms of the prayer day. */
export type AdhkarWindow =
  /** Within a short grace period after any of the five. */
  | 'after-prayer'
  /** Fajr until sunrise. */
  | 'morning'
  /** ʿAsr until Maghrib. */
  | 'evening'
  /** After ʿIshāʾ. */
  | 'night';

export type AdhkarSession = {
  id: string;
  /** The occasion in `hisn.ts` this reads. */
  occasion: number;
  /**
   * Windows this session is the answer for.
   *
   * Two for the morning-and-evening list, because the book gives one list for
   * both sittings — see this file's header.
   */
  windows: readonly AdhkarWindow[];
  /**
   * Roughly how long it takes to read aloud, in minutes.
   *
   * Hand-set rather than computed from a character count: the repeated ones
   * dominate, and a hundred tasbīḥ is not a hundred lines of reading. Rounded
   * generously, because telling someone six minutes and taking ten is worse
   * than the reverse.
   */
  minutes: number;
};

export const ADHKAR_SESSIONS: readonly AdhkarSession[] = [
  { id: 'morning-evening', occasion: 1269190, windows: ['morning', 'evening'], minutes: 7 },
  { id: 'sleep', occasion: 1269267, windows: ['night'], minutes: 5 },
  { id: 'after-prayer', occasion: 1269149, windows: ['after-prayer'], minutes: 3 },
];

/** The session to lead with in a given window, if any. */
export function sessionForWindow(window: AdhkarWindow | null): AdhkarSession | undefined {
  if (!window) return undefined;
  return ADHKAR_SESSIONS.find((session) => session.windows.includes(window));
}

export function sessionById(id: string): AdhkarSession | undefined {
  return ADHKAR_SESSIONS.find((session) => session.id === id);
}

/** The book's occasion a session reads, or undefined if the book has moved. */
export function occasionFor(session: AdhkarSession): HisnOccasion | undefined {
  return HISN.find((entry) => entry.id === session.occasion);
}
