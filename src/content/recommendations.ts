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

import { INITIAL_INTERESTS, USER_STAGES, type InitialInterest, type UserStage } from '@/lib/onboarding';

import { resolveRef } from './catalog';
import { ref, type ContentRef } from './model';

export { INITIAL_INTERESTS, USER_STAGES };
export type { InitialInterest, UserStage };

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
const FIVE_PILLARS = ref('pillar', 'salah');
const SIX_ARTICLES = ref('article', 'allah');

/**
 * Where someone says they are.
 *
 * "Helping someone learn" gets the same starting points as a new Muslim, in the
 * same order: the thing you hand to someone else is the thing they need first.
 * It differs in what it does NOT get — nothing that assumes the reader is the
 * one praying.
 */
const BY_STAGE: Record<UserStage, readonly ContentRef[]> = {
  'new-muslim': [
    ref('guide', 'shahada'),
    TOPICS.whatIsIslam,
    ref('guide', 'wudu'),
    TOPICS.beforePrayer,
    ref('guide', 'fajr'),
    TOPICS.alFatihah,
    FIVE_PILLARS,
  ],
  exploring: [
    TOPICS.whatIsIslam,
    TOPICS.whoIsAllah,
    TOPICS.whoIsMuhammad,
    TOPICS.whatIsTheQuran,
    FIVE_PILLARS,
    ref('guide', 'shahada'),
  ],
  returning: [
    ref('guide', 'fajr'),
    ref('guide', 'wudu'),
    TOPICS.whatIsTheQuran,
    TOPICS.sunnah,
    TOPICS.ramadan,
    ref('reference', 'mosque'),
  ],
  helping: [
    TOPICS.whatIsIslam,
    ref('guide', 'shahada'),
    FIVE_PILLARS,
    SIX_ARTICLES,
    ref('guide', 'wudu'),
  ],
};

/** What someone says they want help with. More specific than stage, so it leads. */
const BY_INTEREST: Record<InitialInterest, readonly ContentRef[]> = {
  prayer: [
    ref('guide', 'wudu'),
    TOPICS.beforePrayer,
    ref('guide', 'fajr'),
    TOPICS.alFatihah,
    TOPICS.whatBreaksPrayer,
    ref('reference', 'lost-count'),
    ref('reference', 'missed'),
    ref('reference', 'mosque'),
  ],
  basics: [
    TOPICS.whatIsIslam,
    ref('guide', 'shahada'),
    FIVE_PILLARS,
    SIX_ARTICLES,
    TOPICS.whatIsTheQuran,
    TOPICS.whoIsMuhammad,
  ],
  'daily-life': [
    TOPICS.halalAndHaram,
    TOPICS.food,
    TOPICS.clothing,
    ref('reference', 'mosque'),
    TOPICS.family,
    TOPICS.work,
    TOPICS.manners,
  ],
  understanding: [
    TOPICS.whatIsIslam,
    TOPICS.duaAndDhikr,
    TOPICS.whoIsAllah,
    TOPICS.whoIsMuhammad,
    TOPICS.whatIsTheQuran,
    TOPICS.sunnah,
    FIVE_PILLARS,
  ],
  /**
   * "I'm not sure" is the answer the app most has to respect. Someone
   * overwhelmed enough to pick it is told nothing about themselves and simply
   * gets the beginner path, which is what everyone gets anyway.
   */
  unsure: [],
};

/**
 * The universal beginner path.
 *
 * What anyone gets who answered nothing, skipped, or said they were not sure —
 * and what fills the tail of every other list. Wudu before prayer because wudu
 * comes before prayer.
 */
const UNIVERSAL: readonly ContentRef[] = [
  ref('guide', 'shahada'),
  ref('guide', 'wudu'),
  ref('guide', 'fajr'),
  FIVE_PILLARS,
  SIX_ARTICLES,
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
  const all = [
    ...Object.values(BY_STAGE).flat(),
    ...Object.values(BY_INTEREST).flat(),
    ...UNIVERSAL,
  ];
  return dedupe(all).filter((entry) => !resolveRef(entry));
}
