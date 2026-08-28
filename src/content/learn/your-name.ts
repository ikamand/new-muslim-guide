import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * One of the three questions converts ask most, and the app was silent on it.
 * The silence is itself an answer somebody will fill in wrongly: a person who
 * assumes the answer is yes may take a new name they did not want, or delay
 * becoming Muslim over it.
 *
 * The narration at the centre of this is Bukhari 6193, and it is used because
 * of how it ENDS: the Prophet ﷺ suggested a different name and the man
 * declined, and the app is not going to soften that into a rule.
 */
export const YOUR_NAME: Reference = {
  id: 'your-name',
  surface: 'learn',
  title: 'Do I have to change my name?',
  subtitle: 'No — and where the idea comes from',
  meta: {
    category: 'becoming-muslim',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 2,
    relatedContent: [ref('guide', 'shahada'), ref('reference', 'family')],
  },
  quickFacts: [
    { label: 'Short answer', value: 'No', emphasis: true },
    { label: 'Family name', value: 'Stays. That one is not a preference' },
  ],
  sections: [
    {
      id: 'no',
      heading: 'Do I have to take a new name?',
      body:
        'Becoming Muslim does not require a new name. Most names are simply names, and a name that means something ordinary in another language is not a problem to be solved. Plenty of Muslims you will meet have the name they were born with.\n\nSome people do choose one, and that is theirs to choose. It is a preference, not a step.',
    },
    {
      id: 'where-it-comes-from',
      heading: 'So why do people think you must?',
      promote: 'hero',
      body:
        'The Prophet ﷺ did change some people’s names — where a name carried a meaning worth leaving behind. What is worth noticing is how one of those went: he suggested a man called Ḥazn, which means something like grief, be called Sahl instead, meaning ease. The man said he would not change the name his father gave him, and he kept it.',
      sources: [hadith('bukhari', '6193')],
      notes: [
        note(
          'practical',
          'That narration is in Bukhari and it is not presented as disobedience. It is the reason to be careful with anybody who tells you this is required.',
        ),
      ],
    },
    {
      id: 'family-name',
      heading: 'What about my family name?',
      body:
        'This part is not a preference. The Qur’an instructs that people be called by their fathers’ names, and converts keep their family name for the same reason — your lineage is not something Islam asks you to drop, and cutting yourself off from it is the opposite of what is asked.',
      sources: [quran(33, 5, { surahName: 'Al-Ahzab' })],
    },
    {
      id: 'if-you-want-to',
      heading: 'What if I want one anyway?',
      body:
        'Then take one, and there is no ceremony involved. You do not need permission, a witness, or a legal change, and nothing about your becoming Muslim depends on it. Many people use one among Muslim friends and their own everywhere else, which is not a contradiction.',
      notes: [
        note(
          'practical',
          'If somebody at a mosque starts calling you by a name you did not choose, you are allowed to say you prefer your own.',
        ),
      ],
    },
  ],
};
