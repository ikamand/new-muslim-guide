import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const WHO_IS_MUHAMMAD: Reference = {
  id: 'who-is-muhammad',
  surface: 'learn',
  title: 'Who is Muhammad ﷺ?',
  subtitle: 'The man Muslims follow, and why',
  meta: {
    category: 'belief',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    relatedContent: [ref('reference', 'sunnah'), ref('reference', 'what-is-the-quran')],
  },
  sections: [
    {
      id: 'who',
      heading: 'A man, and a messenger',
      body:
        'Muhammad ﷺ was born in Mecca around 570 CE and received the Qur’an over roughly twenty-three years. Muslims believe he is the last of a long line of prophets that includes Ibrahim, Musa and ʿIsa — Abraham, Moses and Jesus. He is not divine and is not worshipped. He delivered the message; the message is from God.',
      sources: [quran(33, 40, { surahName: 'Al-Ahzab' })],
    },
    {
      id: 'the-symbol',
      heading: 'The symbol after his name',
      body:
        'You will see ﷺ written after his name throughout this app and everywhere else. It stands for an Arabic phrase asking God to bless him and grant him peace. Muslims say it aloud out of respect whenever he is mentioned. Nobody will mind if you forget at first.',
    },
    {
      id: 'character',
      heading: 'What he was like',
      body:
        'The Qur’an describes him as being of great character, and the people who lived with him described someone who never used foul or crude language and who taught that the best people are those with the best manners. Much of what Muslims try to imitate is not ritual at all — it is how he treated people.',
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
      id: 'why-follow',
      heading: 'Why Muslims follow him',
      body:
        'Because the Qur’an tells them to. It calls him an excellent example, and says that obeying him is obeying God. In practice this is very concrete: the Qur’an commands prayer without describing how, and the answer to "how" is that he said, "Pray as you have seen me praying."',
      sources: [
        quran(33, 21, { surahName: 'Al-Ahzab' }),
        quran(4, 80, { surahName: 'An-Nisa' }),
        hadith('bukhari', '631', {
          book: 10,
          bookName: 'Call to Prayers (Adhaan)',
          inBookReference: 'Book 10, Hadith 28',
        }),
      ],
      notes: [
        note(
          'practical',
          'Loving and following him is not the same as worshipping him. The distinction matters to Muslims and is worth being clear about early.',
        ),
      ],
    },
  ],
};
