import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Tone is the substance here. A convert who slips in month two is at real risk
 * of concluding they were never sincere and stopping altogether, so this leads
 * with the verse about not despairing rather than with the conditions.
 */
export const REPENTANCE: Reference = {
  id: 'repentance',
  surface: 'learn',
  title: 'When you get it wrong',
  subtitle: 'Repentance, and why it is not a big ceremony',
  meta: {
    category: 'character',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    relatedContent: [
      /* First, because it is the door this page exists to open: there is a
         prayer for this exact moment, and remorse is where it is found. */
      ref('reference', 'tawba-prayer'),
      ref('reference', 'dua-and-dhikr'),
      ref('reference', 'missed'),
    ],
  },
  quickFacts: [
    { label: 'The door', value: 'Does not close. Not for anyone, not for anything', emphasis: true },
    { label: 'What it takes', value: 'Stop, regret it, resolve not to return' },
  ],
  sections: [
    {
      id: 'door',
      heading: 'Is it too late for me?',
      promote: 'hero',
      body:
        'The Qur’an addresses people who have wronged themselves and tells them not to despair of God’s mercy, because He forgives all sins. That verse is worth knowing early, because the thing most likely to end someone’s practice is not a sin. It is deciding afterwards that they are past helping.',
      sources: [quran(39, 53, { surahName: 'Az-Zumar' })],
    },
    {
      id: 'how',
      heading: 'What does repentance actually take?',
      body:
        'Stopping, meaning it, and asking. There is no ritual, no witness, and nobody to confess to. You turn to God directly. The Qur’an calls it turning to Him with sincere repentance, and that is all it takes.',
      sources: [quran(66, 8, { surahName: 'At-Tahrim' })],
    },
    {
      id: 'joy',
      heading: 'How is it received?',
      body:
        'The Prophet ﷺ described God as more pleased with a person’s repentance than someone would be who lost their camel in the desert and then found it. The image is not of a grudging pardon. It is relief and delight.',
      sources: [
        hadith('bukhari', '6309', {
          book: 80,
          bookName: 'Invocations',
          inBookReference: 'Book 80, Hadith 6',
        }),
      ],
    },
    {
      id: 'again',
      heading: 'What if I do it again?',
      body:
        'You repent again. People expect to fail once and be finished. That is not how it works, and a habit that takes a year to break took a year for everybody else too. Keep praying while you work on it. Stopping the prayer because you feel unworthy of it is the one thing that makes it worse.',
      notes: [
        note(
          'practical',
          'No one is owed an account of your sins. You do not have to tell an imam, a friend, or anyone at the mosque.',
        ),
      ],
    },
  ],
};
