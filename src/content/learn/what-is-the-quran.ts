import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const WHAT_IS_THE_QURAN: Reference = {
  id: 'what-is-the-quran',
  surface: 'learn',
  title: 'What is the Qur’an?',
  subtitle: 'What it is, and how to start with it',
  meta: {
    category: 'quran',
    difficulty: 'foundational',
    estimatedMinutes: 5,
    beginnerPriority: 2,
    tags: ['arabic', 'memorisation'],
    relatedContent: [ref('reference', 'who-is-muhammad'), ref('guide', 'fajr')],
  },
  quickFacts: [
    { label: 'What it is', value: 'The speech of God, revealed over 23 years' },
    { label: 'How long', value: '114 chapters, longest first — not chronological' },
    { label: 'Where to start', value: 'The short chapters at the end', href: '/(tabs)/quran' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What do Muslims believe it is?',
      promote: 'hero',
      body:
        'Not a book about God, but the speech of God — revealed in Arabic to Muhammad ﷺ through the angel Jibril over about twenty-three years, and preserved unchanged since. That is the claim, and it is why the Arabic itself matters so much: a translation is understood as an explanation of the Qur’an rather than the Qur’an.',
      sources: [quran(2, 2, { surahName: 'Al-Baqarah' }), quran(15, 9, { surahName: 'Al-Hijr' })],
    },
    {
      id: 'shape',
      heading: 'Why does it not start at the beginning?',
      body:
        'It has 114 chapters, called surahs, made of verses called ayahs. They are not in the order they were revealed, and it is not a story told front to back — so reading it cover to cover like a novel is not how most people start, and struggling with that is not a failure of yours.',
    },
    {
      id: 'in-prayer',
      heading: 'Am I already reading it?',
      body:
        'The Qur’an is not only read, it is recited — in every prayer, out loud or quietly. Al-Fatihah, its opening chapter of seven short verses, is said in every unit of every prayer for the rest of your life. Learning it is the single most useful thing a new Muslim can memorise.',
      sources: [quran(1, [1, 7], { surahName: 'Al-Fatihah' })],
      notes: [
        note(
          'practical',
          'Until you know it, say what you can and keep learning. Nobody starts fluent, and the Practice screen exists to take it a line at a time.',
        ),
      ],
    },
    {
      id: 'how-to-start',
      heading: 'Where should I start?',
      body:
        'Start small and start with sound. Learn Al-Fatihah, then a few of the short chapters at the end, listening and repeating rather than reading silently. The Prophet ﷺ said the best of people are those who learn the Qur’an and teach it — learning it is the point, and it is slow for everyone.',
      sources: [
        hadith('bukhari', '5027', {
          book: 66,
          bookName: 'Virtues of the Qur’an',
          inBookReference: 'Book 66, Hadith 49',
        }),
      ],
    },
  ],
};
