import type { ContentMeta } from './model';
import { Recitations } from './recitations';
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
 * place, as they do for everything else.
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
    note: 'Said before you step in, and step in with your left foot.',
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
    note: 'If you forget and have already started, say it when you remember.',
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
