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
 * the urgent path does not run through it. Since 4 Sep confidence touches
 * the curriculum not at all: it used to pick the tier "Continue" started in,
 * and that quietly hid a whole tier of unread lessons from a reader the app
 * had promoted (the reasoning rides in `use-curriculum.ts`).
 *
 * ## A unit can name a page before it exists
 *
 * `resolveRef` drops unresolved lessons at runtime, so a commissioned page
 * ("How prayer works") can hold its place in the sequence while it is being
 * written and reviewed. The audit fails on an unresolved lesson UNLESS it is
 * declared in `COMMISSIONED` below — naming what should exist is how a gap
 * stays countable; an unresolved ref nobody declared is a typo.
 */

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
  /**
   * The same override for the line under the name. Without it the chapter
   * screen prints the target's own summary — for a pillar that is ONE pillar's
   * summary, for a phrasebook it is the first phrase, and for the Hisn
   * sitting it was the text of the waking duʿa (Iyad's outline, 7 Sep 2026).
   */
  descriptionKey?: string;
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
  descriptionKey?: string,
): JourneyStep => ({
  ref: reference,
  requirement,
  ...(labelKey ? { labelKey } : {}),
  ...(descriptionKey ? { descriptionKey } : {}),
});

export const CURRICULUM: readonly Tier[] = [
  {
    id: 'first-weeks',
    units: [
      {
        id: 'becoming-muslim',
        lessons: [
          step(ref('guide', 'shahada'), 'foundation'),
          step(ref('reference', 'what-is-islam'), 'foundation'),
          step(ref('pillar', 'salah'), 'foundation', 'journey.lesson.five-pillars', 'journey.lesson.five-pillars.about'),
          step(ref('article', 'allah'), 'foundation', 'journey.lesson.six-articles', 'journey.lesson.six-articles.about'),
          step(ref('reference', 'your-name'), 'foundation'),
          step(ref('reference', 'life-before'), 'foundation'),
        ],
      },
      {
        id: 'who-you-follow',
        lessons: [
          step(ref('reference', 'who-is-allah'), 'foundation'),
          step(ref('reference', 'who-is-muhammad'), 'foundation'),
          /* The origin story in one sitting. The long sīrah, in episodes, is
             a Going-deeper collection when it is written; this is the four
             minutes a convert needs in week one. */
          step(ref('reference', 'how-it-began'), 'foundation'),
          step(ref('reference', 'what-is-the-quran'), 'foundation'),
          step(ref('reference', 'sunnah'), 'foundation'),
          /* 8 Sep 2026: the route a ruling travels, before the five kinds it
             comes in. */
          step(ref('reference', 'where-rulings-come-from'), 'foundation'),
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
          /* 8 Sep 2026: the words themselves, gathered. Every text is rendered
             from `recitations.ts`; the page adds only where each falls. */
          step(ref('reference', 'what-to-say'), 'practice'),
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
          step(ref('phrase', 'salam'), 'practice', 'journey.lesson.phrases', 'journey.lesson.phrases.about'),
          step(ref('reference', 'dua-and-dhikr'), 'practice'),
          step(ref('hisn', '1268971'), 'practice', 'journey.lesson.everyday-duas', 'journey.lesson.everyday-duas.about'),
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
        /*
          3 Sep 2026. The questions a convert's parent or colleague asks at
          the table, each page one answer to say aloud and the texts under
          it. Sits after People because teaching-someone teaches "I don't
          know"; this unit is the handful of questions for which that is not
          enough. Two written as the pilot; four commissioned, so the audit
          reports them as work rather than typos.
        */
        id: 'being-asked',
        lessons: [
          step(ref('reference', 'isnt-islam-violent'), 'learning'),
          step(ref('reference', 'what-about-jesus'), 'learning'),
          step(ref('reference', 'why-do-women-cover'), 'learning'),
          step(ref('reference', 'was-it-spread-by-the-sword'), 'learning'),
          step(ref('reference', 'is-allah-a-different-god'), 'learning'),
          step(ref('reference', 'why-cant-you-eat-that'), 'learning'),
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
          /* 8 Sep 2026: one page for both pilgrimages, the follow-up to the
             Hajj pillar. Nothing is expected of a beginner now, and it says so. */
          step(ref('reference', 'hajj-and-umrah'), 'learning'),
          step(ref('reference', 'voluntary-fasting'), 'learning'),
          step(ref('pillar', 'zakat'), 'seasonal', 'journey.lesson.zakat'),
        ],
      },
      {
        id: 'when-its-hard',
        lessons: [
          step(ref('reference', 'repentance'), 'learning'),
          /* 8 Sep 2026: prevention before cure. The person who needs this is
             in week three; Book 3 would have reached them a year late. */
          step(ref('reference', 'building-consistency'), 'learning'),
          step(ref('reference', 'if-you-stopped'), 'learning'),
          step(ref('reference', 'patience-and-gratitude'), 'learning'),
          /* 8 Sep 2026: after the family knows, and did not take it well. The
             family page stops at telling them; this one starts there. */
          step(ref('reference', 'family-doesnt-accept'), 'learning'),
          /* 5 Sep 2026: a person for a question, a person for a hard night. */
          step(ref('reference', 'who-can-i-talk-to'), 'learning'),
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
          /* 8 Sep 2026: the thing to aim at, before the four to avoid. */
          step(ref('reference', 'sincerity'), 'learning'),
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
        /*
          4 Sep 2026. Rights, not virtues: each lesson is one party in the
          reader's life and what is owed them, with the text under it. Sits
          in this tier because it is the material a convert and a person
          raised Muslim meet on identical terms, which is what the tier is
          for. Two written as the pilot and deliberately the least alike of
          the six; four commissioned.
        */
        id: 'what-you-owe',
        lessons: [
          /* Ordered outward: the person you came from, the one you chose,
             the ones who depend on you, the ones you pay, the ones next
             door, and what cannot ask at all. */
          step(ref('reference', 'your-mother'), 'learning'),
          step(ref('reference', 'your-partner'), 'learning'),
          step(ref('reference', 'your-children'), 'learning'),
          step(ref('reference', 'whoever-works-for-you'), 'learning'),
          step(ref('reference', 'your-neighbour'), 'learning'),
          step(ref('reference', 'animals-and-land'), 'learning'),
        ],
      },
      {
        id: 'practices',
        lessons: [
          step(ref('reference', 'small-sunnahs'), 'practice'),
          step(ref('reference', 'which-dhikr'), 'learning'),
        ],
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
export const COMMISSIONED: readonly string[] = [
  /* Empty again since 7 Sep 2026: the four being-asked pages the 3 Sep pilot
     held places for are written. */
];

/**
 * Units allowed outside the 2–7 lesson band, with the reason on record.
 *
 * The band was 2–6 until 8 Sep 2026. The curriculum update takes four units
 * to seven, and allowlisting four exceptions would have turned the check
 * into a list of reasons to ignore it, so the band widened instead
 * (`docs/curriculum-update-plan.md`, decisions).
 */
export const SMALL_UNITS: readonly string[] = [
  /* 'practices' left this list on 3 Sep 2026 with its second lesson. */
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
/**
 * The curriculum's own step for a lesson key, or nothing if the key is not a
 * lesson. For the four list-lessons this is where the beginner's name and line
 * live (`labelKey`, `descriptionKey`); a screen that prints a lesson from its
 * key alone — Today's "you were reading" card — has to look here or it prints
 * the target's title, which for the Six Articles is "Belief in Allah".
 */
export function lessonFor(key: string): JourneyStep | undefined {
  for (const tier of CURRICULUM) {
    for (const unit of tier.units) {
      const found = unit.lessons.find((lesson) => stepKey(lesson.ref) === key);
      if (found) return found;
    }
  }
  return undefined;
}

export function isLessonDone(key: string, completedLessons: readonly string[]): boolean {
  return completedLessons.includes(key);
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
