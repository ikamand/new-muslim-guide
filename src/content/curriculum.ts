/**
 * The curriculum: tier → unit → lesson. One path, one direction.
 *
 * This replaced the six-stage journey as the app's spine (the plan is
 * `docs/learn-redesign-plan.md`; the journey's tables, hook and screens were
 * deleted once every consumer read from here). Like the journey, it is not a
 * second content system: every lesson is a `ContentRef` into the same
 * catalogue every other surface reads, so a correction lands everywhere at
 * once.
 *
 * ## Nothing is locked
 *
 * Unchanged from the journey, and load-bearing: there is no gate anywhere.
 * A tier describes a time of life, never a rank — someone who became Muslim
 * yesterday and needs janāzah today opens it today. Later tiers render
 * collapsed but alive; de-emphasised, never withheld.
 *
 * ## One universal order
 *
 * Decided by Iyad, 30 Aug 2026: the sequence is the same for everyone, and it
 * is creed-first — shahada, then the pillars and articles, then who you
 * follow, then prayer. The old counter-argument ("someone who converted last
 * night must pray tonight") is served by Today's prayer card, which opens the
 * right prayer directly; the curriculum can afford to teach in order because
 * the urgent path does not run through it. Confidence no longer reorders
 * anything — it decides which tier sits open (`openTierIndex`) and where
 * "Continue" starts.
 *
 * ## A unit can name a page before it exists
 *
 * `resolveRef` drops unresolved lessons at runtime, so a commissioned page
 * ("How prayer works") can hold its place in the sequence while it is being
 * written and reviewed. The audit fails on an unresolved lesson UNLESS it is
 * declared in `COMMISSIONED` below — naming what should exist is how a gap
 * stays countable; an unresolved ref nobody declared is a typo.
 */

import type { PrayerConfidence } from '@/lib/onboarding';

import { ref, type ContentRef } from './model';

/**
 * What kind of thing a lesson is. Presentation only — it never gates.
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
   * curriculum can call it what a beginner would call it.
   */
  labelKey?: string;
};

/** A stable key for progress, unique across kinds. */
export const stepKey = (entry: ContentRef): string => `${entry.kind}:${entry.id}`;

export type TierId = 'first-weeks' | 'life-follows' | 'deeper';

export type Unit = {
  id: string;
  lessons: readonly JourneyStep[];
  /**
   * Where the unit opens out rather than finishes — a practice or a screen,
   * not a step. The ninety-nine names are a three-month habit, not a lesson
   * with an end, and counting them as progress would make the unit
   * unfinishable.
   */
  doors?: readonly ContentRef[];
};

export type Tier = {
  id: TierId;
  units: readonly Unit[];
};

const step = (
  reference: ContentRef,
  requirement: Requirement,
  labelKey?: string,
): JourneyStep => ({ ref: reference, requirement, ...(labelKey ? { labelKey } : {}) });

export const CURRICULUM: readonly Tier[] = [
  {
    id: 'first-weeks',
    units: [
      {
        id: 'becoming-muslim',
        lessons: [
          step(ref('guide', 'shahada'), 'foundation'),
          step(ref('reference', 'what-is-islam'), 'foundation'),
          step(ref('pillar', 'salah'), 'foundation', 'journey.lesson.five-pillars'),
          step(ref('article', 'allah'), 'foundation', 'journey.lesson.six-articles'),
          step(ref('reference', 'your-name'), 'foundation'),
          step(ref('reference', 'life-before'), 'foundation'),
        ],
      },
      {
        id: 'who-you-follow',
        lessons: [
          step(ref('reference', 'who-is-allah'), 'foundation'),
          step(ref('reference', 'who-is-muhammad'), 'foundation'),
          step(ref('reference', 'what-is-the-quran'), 'foundation'),
          step(ref('reference', 'sunnah'), 'foundation'),
          /* The five categories sit here, not in year two, because they change
             how every later "should" in the app is read. */
          step(ref('reference', 'rulings'), 'foundation'),
        ],
        doors: [ref('collection', 'quranic-names')],
      },
      {
        id: 'how-to-pray',
        lessons: [
          step(ref('guide', 'wudu'), 'practice'),
          step(ref('guide', 'ghusl'), 'practice'),
          step(ref('reference', 'before-prayer'), 'practice'),
          /*
            ⚠️ COMMISSIONED, not written. The one lesson that says what
            `buildPrayer` encodes: one rakʿah learned once, three joints, and
            every prayer is a count — 2 · 4 · 4 · 3 · 4, aloud or silent. It
            replaces the per-prayer journey steps; the five guides stay as the
            instrument followed on the mat. Until it clears review the unit
            leans on `minimum-prayer` beside it.
          */
          step(ref('reference', 'how-prayer-works'), 'practice'),
          step(ref('reference', 'minimum-prayer'), 'practice'),
          step(ref('reference', 'al-fatihah'), 'practice'),
        ],
      },
      {
        id: 'when-it-goes-wrong',
        lessons: [
          step(ref('reference', 'what-breaks-prayer'), 'practice'),
          step(ref('reference', 'lost-count'), 'practice'),
          step(ref('reference', 'missed'), 'practice'),
        ],
      },
      {
        id: 'praying-with-others',
        lessons: [
          step(ref('reference', 'adhan'), 'learning'),
          step(ref('reference', 'behind-an-imam'), 'practice'),
          step(ref('reference', 'mosque'), 'learning'),
          step(ref('reference', 'jumuah'), 'practice'),
        ],
      },
      {
        id: 'everyday-words',
        lessons: [
          step(ref('phrase', 'salam'), 'practice', 'journey.lesson.phrases'),
          step(ref('reference', 'dua-and-dhikr'), 'practice'),
          step(ref('hisn', '1268971'), 'practice', 'journey.lesson.everyday-duas'),
        ],
      },
    ],
  },
  {
    id: 'life-follows',
    units: [
      {
        id: 'eating-wearing-earning',
        lessons: [
          step(ref('reference', 'halal-and-haram'), 'foundation'),
          step(ref('reference', 'food'), 'practice'),
          step(ref('reference', 'clothing'), 'practice'),
          step(ref('reference', 'work'), 'learning'),
        ],
      },
      {
        id: 'people',
        lessons: [
          step(ref('reference', 'family'), 'learning'),
          step(ref('reference', 'manners'), 'practice'),
          step(ref('reference', 'marriage-shape'), 'learning'),
          step(ref('reference', 'a-partner-already'), 'learning'),
          step(ref('reference', 'teaching-someone'), 'learning'),
          step(ref('reference', 'janazah'), 'learning'),
        ],
      },
      {
        /* Two lessons, deliberately thin — the unit new material joins first. */
        id: 'meeting-muslims',
        lessons: [
          step(ref('reference', 'why-people-differ'), 'learning'),
          step(ref('reference', 'being-corrected'), 'learning'),
        ],
      },
      {
        id: 'the-year',
        lessons: [
          step(ref('reference', 'islamic-calendar'), 'seasonal'),
          step(ref('reference', 'ramadan'), 'seasonal'),
          step(ref('reference', 'fasting-alone'), 'seasonal'),
          step(ref('reference', 'eid'), 'seasonal'),
          step(ref('reference', 'voluntary-fasting'), 'learning'),
          step(ref('pillar', 'zakat'), 'seasonal', 'journey.lesson.zakat'),
        ],
      },
      {
        id: 'when-its-hard',
        lessons: [
          step(ref('reference', 'repentance'), 'learning'),
          step(ref('reference', 'if-you-stopped'), 'learning'),
          step(ref('reference', 'patience-and-gratitude'), 'learning'),
        ],
      },
    ],
  },
  {
    id: 'deeper',
    units: [
      {
        /*
          Partially reverses the 26 Aug chooser-only decision, deliberately
          and on the record (plan §3): the chooser at /pray remains the
          side-by-side comparison; this unit is the path through the same five
          pages. Different jobs, both real.
        */
        id: 'prayers-you-choose',
        lessons: [
          step(ref('reference', 'witr'), 'practice'),
          step(ref('reference', 'tahajjud'), 'learning'),
          step(ref('reference', 'qiyam-al-layl'), 'learning'),
          step(ref('reference', 'istikhara'), 'learning'),
          step(ref('reference', 'tawba-prayer'), 'learning'),
        ],
      },
      {
        id: 'interior-life',
        lessons: [
          step(ref('reference', 'anger'), 'learning'),
          step(ref('reference', 'showing-off'), 'learning'),
          step(ref('reference', 'arrogance'), 'learning'),
          step(ref('reference', 'envy'), 'learning'),
        ],
      },
      {
        /* One lesson plus doors — allowlisted below the 2-lesson floor. This
           is where "the meaning of what you already say" and the sīrah land
           when they are written. */
        id: 'practices',
        lessons: [step(ref('reference', 'small-sunnahs'), 'practice')],
        doors: [ref('collection', 'quranic-names')],
      },
    ],
  },
];

/**
 * Lessons named before they are written. An unresolved curriculum ref that is
 * NOT in this list fails the audit as a typo; one that is here is reported as
 * commissioned work. Empty since 31 Aug — how-prayer-works was written, and
 * the audit's stale-commission check forced this line to say so.
 */
export const COMMISSIONED: readonly string[] = [];

/** Units allowed outside the 2–6 lesson band, with the reason on record. */
export const SMALL_UNITS: readonly string[] = [
  /* One lesson plus doors, growing — see the unit's own comment. */
  'practices',
];

export const SHAHADA_KEY = stepKey(ref('guide', 'shahada'));

/**
 * Whether a lesson counts as done — the ONE predicate, shared.
 *
 * Exists because the Learn tab and the journey disagreed about the same fact:
 * the shahada card read `shahadaState` and collapsed, while the journey read
 * only `completedLessons` and went on offering "Becoming Muslim" as the next
 * lesson to somebody who had told the app they had already said it.
 *
 * It used to read `shahadaState` as a second source for the shahada lesson,
 * and that shadow truth broke the manual controls: the circle on the unit row
 * edits only `completedLessons`, so for anyone whose done-ness came from the
 * answer, un-marking silently added a key, changed nothing on screen, and
 * could never succeed. Now the ANSWER writes the LEDGER — saying "yes" to the
 * shahada question adds `SHAHADA_KEY` to `completedLessons` at that moment
 * (onboarding, the progress screen, and a one-time seed in `use-settings` for
 * installs from before this change) — and this predicate is a plain lookup.
 * One writable truth; nothing can disagree with it.
 */
export function isLessonDone(key: string, completedLessons: readonly string[]): boolean {
  return completedLessons.includes(key);
}

/**
 * Which tier sits open on the Learn tab, 0-based into `CURRICULUM`.
 *
 * Both learner rungs open the first tier, because both are still inside its
 * material; `on-my-own` is past the mechanics and opens the second. This is
 * the whole of what confidence now decides — a starting point, never an
 * order and never a gate. Promotion stays as `lib/competence.ts` has it:
 * observed, one-way, silent.
 */
export function openTierIndex(confidence: PrayerConfidence): number {
  return confidence === 'on-my-own' ? 1 : 0;
}

/**
 * Anything that should be in the curriculum and is in no unit.
 *
 * The same question `ungrouped` in `learn/index.ts` asks for the shelves,
 * asked for the path: of every reference marked `surface: 'learn'` and every
 * guide, which is neither a lesson, a door, nor deliberately elsewhere?
 * `content:audit` fails while this returns anything, which is what keeps the
 * curriculum from going stale the way the journey did — 22 pages landed in
 * phases 9–13 and no stage ever learned their names.
 */
export function uncurriculed(
  allReferences: readonly { id: string; surface?: string; title: string }[],
  allGuides: readonly { id: string; title: string }[],
): readonly { kind: string; id: string; title: string }[] {
  const claimed = new Set<string>();
  for (const tier of CURRICULUM) {
    for (const unit of tier.units) {
      for (const lesson of unit.lessons) claimed.add(stepKey(lesson.ref));
      for (const door of unit.doors ?? []) claimed.add(stepKey(door));
    }
  }

  /* Reachable somewhere better than a lesson, and deliberately not one. */
  for (const elsewhere of [
    // Situational, not lessons: reached from help ("Do I need to wash
    // first?"), Ask, and the library. Nobody browses to tayammum — they need
    // it because there is no water.
    'guide:tayammum',
    // The ten prayer walkthroughs are instruments, not lessons: followed on
    // the mat, opened from Today's times card and the chooser. The lesson
    // that TEACHES prayer is the how-to-pray unit.
    'guide:fajr',
    'guide:dhuhr',
    'guide:asr',
    'guide:maghrib',
    'guide:isha',
    'guide:tahajjud',
    'guide:istikhara',
    'guide:tawba',
    'guide:qiyam',
    'guide:witr',
    // The Qur'anic duʿas live on the Duʿa tab and in the library.
    'collection:quranic-duas',
  ]) {
    claimed.add(elsewhere);
  }

  return [
    ...allReferences
      .filter((r) => r.surface === 'learn' && !claimed.has(`reference:${r.id}`))
      .map((r) => ({ kind: 'reference', id: r.id, title: r.title })),
    ...allGuides
      .filter((g) => !claimed.has(`guide:${g.id}`))
      .map((g) => ({ kind: 'guide', id: g.id, title: g.title })),
  ];
}
