import { ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const PATIENCE_AND_GRATITUDE: Reference = {
  id: 'patience-and-gratitude',
  surface: 'learn',
  title: 'Patience and gratitude',
  subtitle: 'The two halves of getting through a life',
  meta: {
    category: 'character',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'repentance'), ref('reference', 'manners')],
  },
  sections: [
    {
      id: 'both',
      heading: 'Two responses, one attitude',
      body:
        'The Prophet ﷺ said the believer’s situation is remarkable, because everything that happens to them is good: when something pleasant comes they are grateful and that is good for them, and when something painful comes they are patient and that is good for them. Nobody else, he said, is in that position.',
      sources: [
        hadith('muslim', '2999', {
          book: 55,
          bookName: 'The Book of Zuhd and Softening of Hearts',
          inBookReference: 'Book 55, Hadith 82',
        }),
      ],
    },
    {
      id: 'patience',
      heading: 'Patience is not passivity',
      body:
        'Sabr means holding steady — carrying on doing the right thing while something is hard, rather than accepting whatever happens. The Qur’an pairs it with prayer as the two things to seek help through, which is a practical instruction more than a moral one: when it is bad, pray.',
      sources: [quran(2, 153, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'gratitude',
      heading: 'Gratitude is noticing',
      body:
        'The Qur’an says that if you are grateful, He will increase you. Much of gratitude in practice is simply naming things — which is why al-ḥamdu li-llāh is said constantly, over small things, out loud. It is a habit of attention rather than a feeling you wait for.',
      sources: [quran(14, 7, { surahName: 'Ibrahim' })],
    },
    {
      id: 'converts',
      heading: 'For someone new',
      body:
        'The first year often costs something real — family who do not understand, friends who drift, a life that has to be rearranged. That difficulty is not a sign you chose wrongly, and it is exactly the situation the word sabr is for.',
    },
  ],
};
