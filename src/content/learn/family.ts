import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Scoped to the thing a convert actually faces: parents who are not Muslim, and
 * a household that may not know yet. Marriage rulings are deliberately not here
 * — they are consequential, situation-dependent, and belong with a person, not
 * a page.
 */
export const FAMILY: Reference = {
  id: 'family',
  surface: 'learn',
  title: 'Family',
  subtitle: 'Parents, home, and telling people',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 2,
    tags: ['family'],
    relatedContent: [ref('reference', 'manners'), ref('reference', 'food')],
  },
  quickFacts: [
    { label: 'Parents', value: 'Honoured immediately after God, whatever they believe' },
    { label: 'Telling them', value: 'Yours to time. Nothing requires you to announce it', emphasis: true },
  ],
  sections: [
    {
      id: 'parents',
      heading: 'Where do parents sit?',
      promote: 'hero',
      body:
        'The Qur’an places kindness to parents immediately after worshipping God alone, in the same sentence. When a man asked the Prophet ﷺ who most deserved his good company, the answer was "your mother", three times, before "your father".',
      sources: [
        quran(17, 23, { surahName: 'Al-Isra' }),
        hadith('bukhari', '5971', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 2',
        }),
      ],
    },
    {
      id: 'non-muslim-parents',
      heading: 'What if my parents are not Muslim?',
      body:
        'This changes nothing about how you treat them. The Qur’an addresses exactly this: even where parents press their child to abandon belief in God alone, the instruction is not to obey them in that, and in the same breath to keep their company in this world with kindness. Both halves are the instruction.',
      sources: [quran(31, 15, { surahName: 'Luqman' })],
      notes: [
        note(
          'agreed',
          'Becoming Muslim does not cancel a family. Converts are sometimes told to distance themselves from non-Muslim relatives; that is not what the text says.',
          { sources: [quran(31, 15, { surahName: 'Luqman' })] },
        ),
      ],
    },
    {
      id: 'telling-them',
      heading: 'Do I have to tell them?',
      body:
        'There is no requirement to announce it, and no deadline. Some people tell everyone the same week; others wait months, or years, because the cost at home would be serious. Nothing in your prayer or your standing with God depends on who knows.',
      notes: [
        note(
          'practical',
          'If it is not safe to tell your family, that is a real situation many converts are in and not a failure of courage. Find one person who knows before you tell anyone who might react badly.',
        ),
      ],
    },
    {
      id: 'marriage',
      heading: 'What about marriage?',
      body:
        'The Qur’an describes marriage as a place of tranquillity, affection and mercy. That is the standard being aimed at. The Prophet ﷺ said the best of you is the best to his family, and he said it about himself first.',
      sources: [
        quran(30, 21, { surahName: 'Ar-Rum' }),
        hadith('tirmidhi', '3895', {
          book: 49,
          bookName: 'Chapters on Virtues',
          inBookReference: 'Book 49, Hadith 295',
          grading: 'sahih',
          gradedBy: 'Darussalam',
        }),
      ],
      notes: [
        note(
          'practical',
          'Who you may marry, and what a valid marriage requires, has real detail to it and depends on your circumstances. It is a question to take to someone locally rather than settle from a page.',
        ),
      ],
    },
  ],
};
