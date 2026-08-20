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
export type Dua = {
  id: string;
  /** The occasion, not the words: "Leaving the house". */
  when: string;
  says: Recitation;
  note?: string;
  meta?: ContentMeta;
};

export const DUAS: Dua[] = [
  {
    id: 'wake',
    when: 'When you wake up',
    says: Recitations.duaWake,
  },
  {
    id: 'leave-home',
    when: 'Leaving the house',
    says: Recitations.duaLeaveHome,
  },
  {
    id: 'enter-toilet',
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
    when: 'Coming out of the bathroom',
    says: Recitations.duaLeaveToilet,
    note: 'One word. It is the shortest thing in this app and the easiest place to start.',
  },
  {
    id: 'before-eating',
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
    when: 'After eating',
    says: Recitations.duaAfterEatingProvision,
    note: 'Two wordings are commonly said after a meal. This one carries the stronger grading; the other is below. Either is said, and many people know only one of them.',
  },
  {
    id: 'after-eating',
    when: 'After eating',
    says: Recitations.duaAfterEating,
  },
  {
    id: 'travel',
    when: 'Setting off on a journey',
    says: Recitations.duaTravel,
    note: 'Long, and nobody expects you to know it yet. The first line alone is worth learning.',
  },
  {
    id: 'sleep',
    when: 'Going to sleep',
    says: Recitations.duaSleep,
  },
];
