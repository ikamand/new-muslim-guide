import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The Arabic, transliteration, translation and audio are NOT repeated here.
 * They live once, in `recitations.ts`, split ayah by ayah with a recording
 * against each — this lesson explains what the surah is and sends the reader to
 * the Practice screen where those already are. Copying seven verses into a
 * second file is exactly how two versions of a Qur'anic text end up in one app.
 */
export const AL_FATIHAH: Reference = {
  id: 'al-fatihah',
  surface: 'learn',
  title: 'Al-Fatihah',
  subtitle: 'The one thing the prayer cannot do without',
  meta: {
    category: 'quran',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 1,
    tags: ['first-day', 'arabic', 'memorisation', 'audio'],
    relatedContent: [ref('reference', 'what-is-the-quran'), ref('guide', 'fajr')],
  },
  quickFacts: [
    { label: 'How long', value: 'Seven short verses' },
    { label: 'How often', value: 'Every rakʿah of every prayer, for life' },
    { label: 'Do I have to?', value: 'Yes, there is no prayer without it', emphasis: true },
    { label: 'How', value: 'Learn it a verse at a time', href: '/surah/1' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is Al-Fatihah?',
      body:
        'The opening chapter of the Qur’an, seven short verses. Its name means "The Opening". It is the most repeated passage in the world: every Muslim says it in every unit of every prayer, which for most people is seventeen times a day.',
      },
    {
      id: 'why',
      heading: 'Why does every prayer need it?',
      promote: 'hero',
      body:
        'Because without it there is no prayer. The Prophet ﷺ said that whoever does not recite Al-Fatihah in their prayer, their prayer is invalid. Of everything a new Muslim could memorise, this is the one that changes what they are able to do today.',
      sources: [
        hadith('bukhari', '756', {
          book: 10,
          bookName: 'Call to Prayers (Adhaan)',
          inBookReference: 'Book 10, Hadith 150',
        }),
      ],
    },
    {
      id: 'meaning',
      heading: 'What am I actually saying?',
      body:
        'It opens by praising God as the Lord of everything and the source of mercy, then turns and speaks to Him directly: You alone we worship, and You alone we ask for help. The rest is a request: guide us along the straight path. It is a prayer for guidance, said before anything else is asked for.',
      sources: [quran(1, [1, 7], { surahName: 'Al-Fatihah' })],
    },
    {
      id: 'learning',
      heading: 'How do I learn it?',
      body:
        'Take one verse at a time, listening and repeating rather than reading. The Practice screen has all seven with a recording against each, and a repeat button. Play a line, say it with the reciter, and move on when it holds. Most people need days, not minutes.',
      notes: [
        note(
          'practical',
          'Until you have it, say what you know and keep going. Nobody expects a first-week Muslim to have memorised it, and the prayer you pray while learning is still your prayer.',
        ),
      ],
    },
  ],
};
