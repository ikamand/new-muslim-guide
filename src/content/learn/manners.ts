import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const MANNERS: Reference = {
  id: 'manners',
  surface: 'learn',
  title: 'Everyday manners',
  subtitle: 'The part of Islam people actually see',
  meta: {
    category: 'character',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    tags: ['etiquette', 'family'],
    relatedContent: [ref('reference', 'family'), ref('reference', 'sunnah')],
  },
  sections: [
    {
      id: 'central',
      heading: 'Not a side subject',
      body:
        'Character sits at the centre rather than the edge. The Prophet ﷺ, described in the Qur’an as being of great character, taught that the best of people are those with the best manners — and the people who lived with him said he never used foul or crude language.',
      sources: [
        quran(68, 4, { surahName: 'Al-Qalam' }),
        hadith('bukhari', '3559', {
          book: 61,
          bookName: 'Virtues and Merits of the Prophet and his Companions',
          inBookReference: 'Book 61, Hadith 68',
        }),
      ],
    },
    {
      id: 'three',
      heading: 'Three things in one sentence',
      body:
        'The Prophet ﷺ tied belief directly to behaviour: whoever believes in God and the Last Day should not harm their neighbour, should be generous to their guest, and should say something good or stay quiet. Neighbours, guests, and how you speak — that is a large share of daily life.',
      sources: [
        hadith('bukhari', '6018', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 49',
        }),
      ],
    },
    {
      id: 'speech',
      heading: 'How you talk about people',
      body:
        'The Qur’an forbids mocking others, assuming the worst, spying, and talking about people behind their backs — in two consecutive verses. Backbiting is treated as a serious wrong, not a small one, and it is the habit most people find hardest to drop.',
      sources: [
        quran(49, 11, { surahName: 'Al-Hujurat' }),
        quran(49, 12, { surahName: 'Al-Hujurat' }),
      ],
    },
    {
      id: 'anger',
      heading: 'Anger',
      body:
        'The Prophet ﷺ said the strong person is not the one who overpowers others, but the one who controls himself when angry. It is a redefinition rather than a rule, and it comes up more often than most of the rules do.',
      sources: [
        hadith('bukhari', '6114', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 141',
        }),
      ],
    },
    {
      id: 'others',
      heading: 'Wanting for others what you want for yourself',
      body:
        'One of the shortest things the Prophet ﷺ said and one of the hardest: none of you truly believes until he wants for his brother what he wants for himself. It is the test to apply when a situation is not covered by anything you have learned yet.',
      sources: [
        hadith('bukhari', '13', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 6',
        }),
      ],
      notes: [
        note(
          'practical',
          'You will get things wrong, in front of people, for a while. Everyone did. Being embarrassed about it is not a sign you are doing badly.',
        ),
      ],
    },
  ],
};
