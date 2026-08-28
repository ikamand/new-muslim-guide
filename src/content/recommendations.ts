/**
 * What to put in front of someone, based on the two things onboarding asked.
 *
 * Deliberately a lookup table rather than logic. Someone reading this file
 * should be able to see, in one screen, exactly what a person who just became
 * Muslim is shown first — and change it without tracing a scoring function.
 *
 * ## Pointers, not content
 *
 * Every entry is a `ContentRef` resolved through `CATALOG`. Refs to content
 * that does not exist yet resolve to nothing and are dropped, so this file can
 * name what the app *should* eventually show without a placeholder record
 * existing to satisfy it. `npm run content:audit` lists them under
 * "Recommendations awaiting content", which is the to-do list for whoever
 * writes it — not a failure, because a plan is not a lie.
 *
 * That is the whole reason recommendations live here rather than as strings in
 * a screen: the screen renders whatever resolves, and gets shorter or longer
 * as content lands, with no code change.
 */

import { resolveRef } from './catalog';
import { ref, type ContentRef } from './model';

/**
 * The beginner explanations, by name.
 *
 * These were forward references once — the tables named what the app should
 * eventually show, and `pendingRecommendations` listed the twelve that resolved
 * to nothing. All twelve now exist in `src/content/learn/`, so the name is kept
 * only because the tables below read better with it than with a wall of
 * `ref('reference', '…')`.
 *
 * `pendingRecommendations` still exists and still reports anything unresolved,
 * which is what keeps a future addition honest.
 */
export const TOPICS = {
  whatIsIslam: ref('reference', 'what-is-islam'),
  whoIsAllah: ref('reference', 'who-is-allah'),
  whoIsMuhammad: ref('reference', 'who-is-muhammad'),
  whatIsTheQuran: ref('reference', 'what-is-the-quran'),
  sunnah: ref('reference', 'sunnah'),
  ramadan: ref('reference', 'ramadan'),
  halalAndHaram: ref('reference', 'halal-and-haram'),
  food: ref('reference', 'food'),
  clothing: ref('reference', 'clothing'),
  family: ref('reference', 'family'),
  work: ref('reference', 'work'),
  manners: ref('reference', 'manners'),
  // Added with the journey.
  beforePrayer: ref('reference', 'before-prayer'),
  alFatihah: ref('reference', 'al-fatihah'),
  whatBreaksPrayer: ref('reference', 'what-breaks-prayer'),
  duaAndDhikr: ref('reference', 'dua-and-dhikr'),
  repentance: ref('reference', 'repentance'),
  patienceAndGratitude: ref('reference', 'patience-and-gratitude'),
  islamicCalendar: ref('reference', 'islamic-calendar'),
} as const satisfies Record<string, ContentRef>;

/** Kept so existing imports of the old name keep working. */
export const PLANNED = TOPICS;

/** The five pillars and six articles, as they are listed in the app. */
/**
 * What a beginner should meet, and in what order.
 *
 * ## One list, since Phase 7
 *
 * This was three tables — by `UserStage`, by `InitialInterest`, and a
 * universal tail — feeding a ranking function that Phase 1 deleted because no
 * screen ever called it. Phase 7 then retired both questions those tables were
 * keyed on: they asked which of four kinds of person somebody was, and what
 * they wanted help with, in their first minute, and neither could ever be
 * checked against anything.
 *
 * What survived is the part that was always true: the order a beginner meets
 * these in. Nothing branches on who they are, because the app now works that
 * out by watching — see `lib/competence.ts` — and a table of categories is the
 * opposite of that.
 *
 * It is still a POINTER list. A ref to content that does not exist resolves to
 * nothing, so this can name something before it is written;
 * `pendingRecommendations` reports those and the audit prints them. That is
 * the to-do list for whoever writes them, and a plan is not a lie.
 */
const BEGINNER_PATH: readonly ContentRef[] = [
  ref('guide', 'shahada'),
  ref('guide', 'wudu'),
  ref('guide', 'fajr'),
  ref('pillar', 'salah'),
  ref('article', 'allah'),
  TOPICS.whatIsIslam,
  TOPICS.whoIsAllah,
  TOPICS.whoIsMuhammad,
  TOPICS.whatIsTheQuran,
  TOPICS.sunnah,
  TOPICS.beforePrayer,
  TOPICS.alFatihah,
  TOPICS.whatBreaksPrayer,
  TOPICS.halalAndHaram,
  TOPICS.food,
  TOPICS.clothing,
  TOPICS.family,
  TOPICS.work,
  TOPICS.manners,
  TOPICS.duaAndDhikr,
  TOPICS.repentance,
  TOPICS.ramadan,
  ref('reference', 'mosque'),
];

const dedupe = (refs: readonly ContentRef[]): readonly ContentRef[] => {
  const seen = new Set<string>();
  return refs.filter((entry) => {
    const key = `${entry.kind}:${entry.id}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

/*
  Two exports were deleted here on 28 Aug 2026, and the names are deliberately
  not repeated in code so `plan:check` can guard against their return.

  They ranked and resolved this file's tables into a list for a screen, and no
  screen ever asked for one. Twenty possible onboarding answers fed a
  personalisation engine whose output nothing rendered.

  Deleting rather than wiring them up is the deliberate half. Phase 7 of
  `docs/build-order.md` replaces the two questions these tables are keyed on —
  "which describes you" becomes "have you said the shahada" and "can you pray
  on your own yet", because a fact can be checked against behaviour and a
  self-description cannot. A ranking built on the retired answers would have
  been rewritten before it was ever shown to anybody.

  What stays is the part that works: the tables are a readable statement of
  what a beginner should meet first, and `pendingRecommendations` reports
  anything they name that has not been written yet. The audit prints that, and
  it is a to-do list rather than a failure.
*/

/** Every ref any table points at that has no content yet. Drives the audit. */
export function pendingRecommendations(): readonly ContentRef[] {
  return dedupe(BEGINNER_PATH).filter((entry) => !resolveRef(entry));
}
