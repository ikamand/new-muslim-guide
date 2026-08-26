import { note, type ContentMeta } from './model';
import { Recitations } from './recitations';
import { hadith, scholarly } from './sources';
import type { Recitation } from './types';

/**
 * The short supplications said through an ordinary day.
 *
 * The app teaches five minutes of the day, five times over, and said nothing
 * about the other twenty-three hours. These are the next thing to learn: short,
 * constant, and usable from the day you convert.
 *
 * ⚠️ PARTIAL REVIEW. The Arabic was taken verbatim from Sahih al-Bukhari,
 * Sahih Muslim and Sunan Abi Dawud — each text carries its reference in
 * `sources` — rather than written from memory, which is why these differ from
 * the older recitations in the app. The transliterations and English
 * translations are still model-written and need checking, and a reviewer
 * should confirm each text is the one its `when` claims.
 *
 * "Before eating" reuses the bismillah already in the app rather than storing
 * the same two words twice. The occasion lives here; the words live in one
 * place, as they do for everything else — and its citation lives here too,
 * because the recitation is titled "Before wudu" and carries the narration for
 * that occasion. A source belongs to the claim, not to the words.
 */
/**
 * Where in an ordinary day a duʿa belongs.
 *
 * The duʿa screen is a day rather than a list, and this is what orders it. A
 * list only serves a reader who already knows what they are looking for —
 * which is the problem exactly: **a new Muslim does not know a duʿa for
 * putting on clothes exists**, so they will never scroll to it, alphabetically
 * or otherwise. An index is a born Muslim's tool.
 *
 * What a convert has instead is a moment: at the door, about to eat, awake at
 * two in the morning. So the screen runs from waking to sleeping and puts each
 * duʿa where it happens, which answers "when would I ever say this".
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

export type Dua = {
  id: string;
  /** The occasion, not the words: "Leaving the house". */
  when: string;
  says: Recitation;
  note?: string;
  meta?: ContentMeta;
  /** Where it sits in the day. Absent means it does not belong to a moment. */
  moment?: DayMoment;
};

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
const MOMENT_BY_HOUR: readonly DayMoment[] = [
  'night', 'night', 'night', 'night', //  00–03
  'waking', 'waking', 'waking', 'waking', //  04–07
  'waking', 'leaving', 'leaving', 'leaving', //  08–11
  'eating', 'eating', 'eating', 'travel', //  12–15
  'travel', 'travel', 'eating', 'eating', //  16–19
  'night', 'night', 'night', 'night', //  20–23
];

/**
 * One duʿa for right now — the card Today shows.
 *
 * ## Not random, and the reason is the whole point of the day screen
 *
 * A random pick shows a sleeping duʿa at nine in the morning, which teaches
 * the opposite of the thing this content exists to teach: that there are words
 * for the moment you are actually in. So the moment comes from the clock.
 *
 * ## Stable for the calendar day
 *
 * Seeded on the date, so it does not reshuffle every time the tab is opened.
 * "Today's duʿa" that changes when you come back to it is not today's
 * anything. It does change as the day moves between moments, which is correct
 * — the card is answering "what do I say now", not "what is today's quote".
 *
 * ## Why it can return undefined
 *
 * Nine duʿas do not cover six moments. Rather than widen the pick to any duʿa
 * at all — which would put "before eating" on screen at midnight and undo the
 * paragraph above — the card is simply absent for a moment the app has nothing
 * for. An honest gap beats a wrong answer, and the gap closes as the book is
 * reviewed and its occasions graduate onto the day.
 */
export function duaOfTheDay(now: Date = new Date()): Dua | undefined {
  const candidates = duasAt(MOMENT_BY_HOUR[now.getHours()]);
  if (candidates.length === 0) return undefined;
  const dayNumber = Math.floor(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000,
  );
  return candidates[dayNumber % candidates.length];
}

/** The duʿas of one moment, in the order they are said. */
export function duasAt(moment: DayMoment): readonly Dua[] {
  return DUAS.filter((dua) => dua.moment === moment);
}

export const DUAS: Dua[] = [
  {
    id: 'wake',
    moment: 'waking',
    when: 'When you wake up',
    says: Recitations.duaWake,
  },
  {
    id: 'leave-home',
    moment: 'leaving',
    when: 'Leaving the house',
    says: Recitations.duaLeaveHome,
  },
  {
    id: 'enter-toilet',
    moment: 'washing',
    when: 'Going into the bathroom',
    says: Recitations.duaEnterToilet,
    note: 'Said before you step in.',
    /**
     * The left foot used to be part of the note above, phrased as though a
     * narration said so. None does. It is a recommendation scholars draw from
     * the general habit `Aisha describes — the right first for everything
     * good — so it is stated here as what it is, with the two sources it
     * actually has.
     */
    meta: {
      category: 'daily-life',
      difficulty: 'foundational',
      estimatedMinutes: 1,
      beginnerPriority: 2,
      tags: ['etiquette'],
      notes: [
        note('practical', 'Scholars recommend stepping in with the left foot, and stepping out with the right.', {
          sources: [
            hadith('bukhari', '168', {
              book: 4,
              bookName: "Ablutions (Wudu')",
              inBookReference: 'Book 4, Hadith 34',
              role: 'practice',
            }),
            scholarly({
              work: 'The Sunnah concerning entering and leaving the house, fatwa 289249',
              author: 'IslamWeb',
              url: 'https://www.islamweb.net/en/fatwa/289249/the-sunnah-concerning-entering-and-leaving-the-house',
            }),
          ],
          additionalExplanation:
            'There is no narration about the bathroom itself. What there is instead is `Aisha’s report that the Prophet ﷺ liked to start on the right in everything — his sandals, his hair, his wudu — and scholars read the bathroom as the one place that runs the other way. Khalil ibn Ishaq states it for the Maliki school, and IslamWeb, quoting him, says plainly that there is no specific evidence for it and that it rests on `Aisha’s general statement. Worth doing; not worth worrying about if you forget.',
        }),
      ],
    },
  },
  {
    id: 'leave-toilet',
    moment: 'washing',
    when: 'Coming out of the bathroom',
    says: Recitations.duaLeaveToilet,
    note: 'One word. It is the shortest thing in this app and the easiest place to start.',
  },
  {
    id: 'before-eating',
    moment: 'eating',
    when: 'Before eating',
    says: Recitations.bismillah,
    /**
     * The note used to say only "say it when you remember", which is close but
     * loses the thing that is actually taught: remembering mid-meal changes
     * the wording rather than just the timing.
     */
    note: 'If you forget and remember partway through, the taught wording changes: bismi-llāhi fī awwalihi wa ākhirih — in the name of Allah, at its beginning and its end.',
    meta: {
      category: 'daily-life',
      difficulty: 'foundational',
      estimatedMinutes: 1,
      beginnerPriority: 2,
      tags: ['etiquette', 'arabic'],
      sources: [
        hadith('bukhari', '5376', {
          book: 70,
          bookName: 'Food, Meals',
          inBookReference: 'Book 70, Hadith 4',
        }),
        hadith('tirmidhi', '1858', {
          book: 25,
          bookName: 'The Book on Food',
          inBookReference: 'Book 25, Hadith 75',
          grading: 'sahih',
          gradedBy: 'Darussalam',
          role: 'practice',
        }),
      ],
    },
  },
  {
    id: 'after-eating-provision',
    moment: 'eating',
    when: 'After eating',
    says: Recitations.duaAfterEatingProvision,
    note: 'Two wordings are commonly said after a meal. This one carries the stronger grading; the other is below. Either is said, and many people know only one of them.',
  },
  {
    id: 'after-eating',
    moment: 'eating',
    when: 'After eating',
    says: Recitations.duaAfterEating,
  },
  {
    id: 'travel',
    moment: 'travel',
    when: 'Setting off on a journey',
    says: Recitations.duaTravel,
    note: 'Long, and nobody expects you to know it yet. The first line alone is worth learning.',
  },
  {
    id: 'sleep',
    moment: 'night',
    when: 'Going to sleep',
    says: Recitations.duaSleep,
  },
];
