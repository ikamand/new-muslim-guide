/**
 * The beginner path, as a curriculum over content that already exists.
 *
 * Not a second content system. Every step here is a `ContentRef` into the same
 * catalogue that the Learn tab, the recommendations and any future search read
 * from — so a correction to a lesson lands everywhere at once, and a lesson
 * cannot drift between two copies of itself.
 *
 * ## Nothing is locked
 *
 * There is no `completedBefore` field and no gate, on purpose. Someone who
 * became Muslim yesterday and needs to pray in an hour must be able to go
 * straight to wudu without being told to read four articles first. `requirement`
 * describes what a step *is*, not what it demands: it changes how the step is
 * presented and how loudly progress is counted, never whether it opens.
 *
 * ## Steps that open a list
 *
 * "The Five Pillars" is one lesson to a beginner and five records to the app.
 * Those steps point at the first record and carry a `labelKey`, because the
 * screen they open is the list — sending someone to a page called "Prayer" when
 * they tapped "The Five Pillars" would be a small lie about where they are.
 */

import type { InitialInterest, UserStage } from '@/lib/onboarding';

import type { ContentRef } from './model';
import { ref } from './model';

/**
 * What kind of thing a step is.
 *
 * `foundation` — what Islam is. Read once, and everything else assumes it.
 * `practice`   — something you do, and will do again tomorrow.
 * `learning`   — worth knowing, in no hurry.
 * `seasonal`   — arrives with the year rather than with you.
 */
export type Requirement = 'foundation' | 'practice' | 'learning' | 'seasonal';

export type JourneyStep = {
  ref: ContentRef;
  requirement: Requirement;
  /**
   * Set only where the step opens a list rather than a single page, so the
   * journey can call it what a beginner would call it.
   */
  labelKey?: string;
};

export const STAGE_IDS = [
  'start-here',
  'first-days',
  'learning-to-pray',
  'living',
  'deepening',
  'through-the-year',
] as const;

export type StageId = (typeof STAGE_IDS)[number];

export type Stage = {
  id: StageId;
  steps: readonly JourneyStep[];
};

const step = (
  reference: ContentRef,
  requirement: Requirement,
  labelKey?: string,
): JourneyStep => ({ ref: reference, requirement, ...(labelKey ? { labelKey } : {}) });

/**
 * Six stages, in the order someone actually meets them.
 *
 * Stage two is the one that matters most and the one most apps get wrong: a
 * person who said the shahada last night wants to know how to pray tonight, not
 * a syllabus. It is almost entirely `practice`.
 */
export const JOURNEY: readonly Stage[] = [
  {
    id: 'start-here',
    steps: [
      step(ref('reference', 'what-is-islam'), 'foundation'),
      step(ref('reference', 'who-is-allah'), 'foundation'),
      step(ref('reference', 'who-is-muhammad'), 'foundation'),
      step(ref('reference', 'what-is-the-quran'), 'foundation'),
      step(ref('reference', 'sunnah'), 'foundation'),
      step(ref('pillar', 'salah'), 'foundation', 'journey.lesson.five-pillars'),
      step(ref('article', 'allah'), 'foundation', 'journey.lesson.six-articles'),
    ],
  },
  {
    id: 'first-days',
    steps: [
      step(ref('guide', 'shahada'), 'foundation'),
      step(ref('phrase', 'salam'), 'practice', 'journey.lesson.phrases'),
      step(ref('guide', 'wudu'), 'practice'),
      step(ref('guide', 'ghusl'), 'practice', 'journey.lesson.purification'),
      step(ref('reference', 'before-prayer'), 'practice'),
      step(ref('guide', 'fajr'), 'practice', 'journey.lesson.how-to-pray'),
      step(ref('reference', 'al-fatihah'), 'practice'),
    ],
  },
  {
    id: 'learning-to-pray',
    steps: [
      step(ref('reference', 'al-fatihah'), 'practice'),
      step(ref('guide', 'fajr'), 'practice', 'journey.lesson.pray-fajr'),
      step(ref('guide', 'maghrib'), 'practice', 'journey.lesson.pray-maghrib'),
      step(ref('reference', 'what-breaks-prayer'), 'practice'),
      step(ref('reference', 'lost-count'), 'practice'),
      step(ref('reference', 'missed'), 'practice'),
      step(ref('reference', 'seated'), 'learning'),
      step(ref('reference', 'mosque'), 'learning'),
    ],
  },
  {
    id: 'living',
    steps: [
      step(ref('reference', 'halal-and-haram'), 'foundation'),
      step(ref('reference', 'food'), 'practice'),
      step(ref('reference', 'clothing'), 'practice'),
      step(ref('reference', 'manners'), 'practice'),
      step(ref('reference', 'family'), 'learning'),
      step(ref('reference', 'work'), 'learning'),
    ],
  },
  {
    id: 'deepening',
    steps: [
      step(ref('reference', 'dua-and-dhikr'), 'practice'),
      step(ref('dua', 'wake'), 'practice', 'journey.lesson.everyday-duas'),
      step(ref('reference', 'repentance'), 'learning'),
      step(ref('reference', 'patience-and-gratitude'), 'learning'),
      step(ref('article', 'last-day'), 'learning', 'journey.lesson.hereafter'),
    ],
  },
  {
    id: 'through-the-year',
    steps: [
      step(ref('reference', 'islamic-calendar'), 'seasonal'),
      step(ref('reference', 'ramadan'), 'seasonal'),
      step(ref('pillar', 'sawm'), 'seasonal', 'journey.lesson.fasting'),
      step(ref('pillar', 'zakat'), 'seasonal', 'journey.lesson.zakat'),
      step(ref('pillar', 'hajj'), 'seasonal', 'journey.lesson.hajj'),
    ],
  },
];

/**
 * Where the journey opens for someone, given what onboarding heard.
 *
 * Not a gate and not a skip: every stage stays open, and nothing before the
 * entry point is marked done or hidden. It only decides which stage the app
 * *offers* first, because pointing someone who said "help me with prayer" at
 * "What is Islam?" is answering a question they did not ask.
 *
 * Interest leads over stage, on the same reasoning as the recommendation
 * tables: "prayer" is a narrower answer than "I just became Muslim".
 */
const ENTRY_BY_INTEREST: Record<InitialInterest, StageId> = {
  // "Enough to pray tonight" — the stage, not the syllabus about it.
  prayer: 'first-days',
  basics: 'start-here',
  'daily-life': 'living',
  understanding: 'start-here',
  unsure: 'start-here',
};

const ENTRY_BY_STAGE: Record<UserStage, StageId> = {
  'new-muslim': 'first-days',
  exploring: 'start-here',
  returning: 'learning-to-pray',
  helping: 'start-here',
};

/** Index into `JOURNEY`. Zero for anyone who skipped or answered nothing. */
export function entryStageIndex(
  stage: UserStage | null,
  interest: InitialInterest | null,
): number {
  const id = (interest && ENTRY_BY_INTEREST[interest]) ?? (stage && ENTRY_BY_STAGE[stage]);
  const found = id ? JOURNEY.findIndex((entry) => entry.id === id) : -1;
  return found === -1 ? 0 : found;
}

/** A stable key for progress, unique across kinds. */
export const stepKey = (entry: ContentRef): string => `${entry.kind}:${entry.id}`;

