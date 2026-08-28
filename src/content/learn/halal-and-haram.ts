import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The framework rather than a list. A new Muslim who learns how the categories
 * work can reason about a hundred situations; one who memorises a list of
 * forbidden things is stuck the moment they meet something not on it.
 */
export const HALAL_AND_HARAM: Reference = {
  id: 'halal-and-haram',
  surface: 'learn',
  title: 'Halal and haram',
  subtitle: 'How the categories actually work',
  meta: {
    category: 'daily-life',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    tags: ['etiquette'],
    relatedContent: [ref('reference', 'food'), ref('reference', 'work')],
  },
  quickFacts: [
    { label: 'The words', value: 'Halal is permitted. Haram is forbidden' },
    { label: 'The default', value: 'Yes, permitted unless there is a clear reason not', emphasis: true },
  ],
  sections: [
    {
      id: 'words',
      heading: 'What do halal and haram mean?',
      body:
        'Halal means permitted. Haram means forbidden. They apply to everything, not just food: how you earn money, how you speak about people, what you wear. Most of life is halal and always was; the forbidden list is short.',
    },
    {
      id: 'default',
      heading: 'Do I need permission for ordinary things?',
      promote: 'hero',
      body:
        'This is the part people get backwards. Things are permitted unless there is a clear reason otherwise, and the Qur’an describes the Prophet’s ﷺ message as making good things lawful rather than piling on prohibitions. You do not need to find permission for ordinary life.',
      sources: [
        quran(7, 157, { surahName: 'Al-Aʿraf' }),
        quran(2, 168, { surahName: 'Al-Baqarah' }),
      ],
    },
    {
      id: 'middle',
      heading: 'What about things in between?',
      body:
        'The Prophet ﷺ said the lawful is clear and the unlawful is clear, and between them are matters that are unclear, which many people do not know about. Someone who stays away from what is doubtful protects their faith and their honour. That middle ground is where most real questions live.',
      sources: [
        hadith('bukhari', '52', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 45',
        }),
      ],
      notes: [
        note(
          'practical',
          'This is guidance for your own choices, not a licence to police anyone else’s. Being cautious about a doubtful thing for yourself is careful; declaring it forbidden for other people is a different act entirely.',
        ),
      ],
    },
    {
      id: 'asking',
      heading: 'What if I am not sure?',
      body:
        'Ask someone qualified, and ask about your actual situation rather than the general case, because circumstances change answers. You will also meet Muslims who are certain of opposite answers on the same question. That usually means it is a genuine point of scholarly difference rather than that one of them is lying to you.',
    },
  ],
};
