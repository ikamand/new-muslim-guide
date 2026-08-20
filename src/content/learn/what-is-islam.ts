import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Every Qur'an and hadith reference below was verified by opening the page and
 * matching the text; the prose around them still needs a qualified reader.
 *
 * Deliberately short and deliberately shallow. Someone opening this is not
 * looking for a definition of religion — they are looking for the shape of the
 * thing they have joined, or are thinking about joining.
 */
export const WHAT_IS_ISLAM: Reference = {
  id: 'what-is-islam',
  surface: 'learn',
  title: 'What is Islam?',
  subtitle: 'The shape of it, in a few minutes',
  meta: {
    category: 'becoming-muslim',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 1,
    tags: ['first-day'],
    relatedContent: [ref('guide', 'shahada'), ref('pillar', 'salah'), ref('article', 'allah')],
  },
  sections: [
    {
      id: 'the-word',
      heading: 'What the word means',
      body:
        'Islam is an Arabic word meaning submission — giving yourself over to God. A Muslim is someone who does that. It comes from the same root as salam, peace, and the two ideas sit together: peace through no longer being pulled in every direction at once.',
      sources: [quran(3, 19, { surahName: 'Al-Imran' }), quran(51, 56, { surahName: 'Adh-Dhariyat' })],
    },
    {
      id: 'one-god',
      heading: 'One God, worshipped alone',
      body:
        'Everything else rests on this. Islam teaches that there is one God — Allah, the Arabic word for God, used by Arabic-speaking Christians and Jews too — and that worship belongs to Him alone, with nothing and no one sharing it. Saying and meaning that is what makes a person Muslim.',
      notes: [
        note(
          'agreed',
          'Nobody can be forced into this. The Qur’an says plainly that there is no compulsion in religion.',
          { sources: [quran(2, 256, { surahName: 'Al-Baqarah' })] },
        ),
      ],
    },
    {
      id: 'five',
      heading: 'It stands on five things',
      body:
        'The testimony of faith, the five daily prayers, zakat — a yearly share of savings given to those entitled to it — fasting in Ramadan, and the pilgrimage to Mecca once in a lifetime for anyone able to make it. The Prophet ﷺ described Islam as built on these five.',
      sources: [
        hadith('bukhari', '8', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 1',
        }),
      ],
    },
    {
      id: 'believing-and-doing',
      heading: 'Believing and doing are two halves',
      body:
        'When the angel Jibril asked the Prophet ﷺ about this in front of his companions, the answer came in two parts: what you believe, and what you do. Neither stands alone. That is why this app teaches the prayer and the belief side by side rather than one first and one later.',
      sources: [
        hadith('bukhari', '50', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 43',
        }),
        hadith('muslim', '8a', {
          book: 1,
          bookName: 'The Book of Faith',
          inBookReference: 'Book 1, Hadith 1',
        }),
      ],
    },
    {
      id: 'manageable',
      heading: 'It is meant to be manageable',
      body:
        'You are not behind. The Prophet ﷺ said the religion is easy, and that whoever overburdens themselves in it will not keep it up — so take the next thing, not all of it. The Qur’an says God does not ask of anyone more than they can bear.',
      sources: [
        hadith('bukhari', '39', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 32',
        }),
        quran(2, 286, { surahName: 'Al-Baqarah' }),
      ],
    },
  ],
};
