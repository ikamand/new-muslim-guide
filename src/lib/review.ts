import type { Observations } from '@/lib/observations';

/**
 * Which surah is worth reciting again.
 *
 * ## Spaced review without a backlog
 *
 * The plan asks for "spaced review, no streak", and those two pull against
 * each other harder than they look. Spaced repetition works by SCHEDULING: it
 * books the next review, and the technique gets its force from what happens
 * when you miss one. Open any such app after a fortnight away and it says
 * "487 cards due" — a sentence whose only content is that you failed to show
 * up. That is noticing an absence, which `index.tsx` promises this app does
 * not do.
 *
 * So the schedule is invisible and there is no queue:
 *
 * 1. **Never a count. One item.** The tab offers ONE surah to revisit. You
 *    cannot be behind on one thing, and there is nothing to clear.
 * 2. **Time orders, it never accrues.** How long since a surah was recited
 *    decides which one comes up. It never produces a debt, because the slot is
 *    always filled and never late.
 * 3. **It is said about the surah, not the person.** "You have not recited
 *    this in a while" is a fact about a surah. "Overdue" is a verdict on a
 *    reader.
 *
 * The reader gets the benefit — you meet what you are forgetting first — and
 * the screen has no way to express a backlog, because none is computed.
 *
 * ## Where the timestamps live, and where they must not
 *
 * `use-memorised.tsx` deliberately stores NO dates: "so nothing can later
 * compute 'you have not practised in nine days' and say it out loud". That
 * guarantee is structural — it cannot be broken by accident because the data
 * is not there — and it stays.
 *
 * The times come from `observations.surahs` instead, which already records
 * when a surah was recited and already carries the promise that nothing in it
 * records what did NOT happen.
 */

export type Review = {
  /** The surah to offer. */
  surah: number;
  /** True when the app has never seen this one recited. */
  neverRecited: boolean;
};

/**
 * The one worth revisiting, from the surahs somebody says they hold.
 *
 * Never recited beats long ago, because a surah marked memorised that the app
 * has never seen recited is the one most likely to have quietly gone.
 *
 * `undefined` when nothing is held yet — the tab shows nothing rather than
 * inventing a task for somebody who has not started.
 */
export function reviewFor(
  memorised: readonly number[],
  value: Observations,
): Review | undefined {
  if (memorised.length === 0) return undefined;

  const never = memorised.filter((surah) => !value.surahs[String(surah)]);
  if (never.length > 0) {
    /* Lowest number first: the short ones at the end of the muṣḥaf are learned
       first, so this is the earliest thing they took on. */
    return { surah: Math.min(...never), neverRecited: true };
  }

  const oldest = [...memorised].sort(
    (a, b) => (value.surahs[String(a)] ?? 0) - (value.surahs[String(b)] ?? 0),
  )[0];
  return { surah: oldest, neverRecited: false };
}
