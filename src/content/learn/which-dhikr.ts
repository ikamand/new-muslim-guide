import { note, ref } from '../model';
import { hadith, quran, scholarly } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 3 Sep 2026 — model-written English over checked citations.
 *
 * Iyad's brief: the question a convert with ten spare minutes actually
 * asks, answered the way the scholars answer it — the Qur'an is the best
 * dhikr, unless a dhikr belongs to that moment — with examples, and doors
 * to what the app already holds rather than a second copy of any text.
 *
 * Read for it, in Arabic: IslamQA 195274, IslamWeb 198891 and 182167. Every
 * narration below was opened in the corpus by the collection's own number.
 * Tirmidhi 2926 ("whoever is too busy with the Qur'an to ask Me…"), which
 * two of those pages lean on, is graded weak by Al-Albani, Ahmad Shakir and
 * Zubair Ali Zai, and is deliberately not here.
 *
 * ⚠️ The ranking itself is scholarly reasoning, not a narration, and it is
 * cited as such in an agreed note. The page owes its scholarly read like
 * every other.
 */
export const WHICH_DHIKR: Reference = {
  id: 'which-dhikr',
  surface: 'learn',
  title: 'Which dhikr is best?',
  subtitle: 'The Qur’an, unless a dhikr belongs to that moment',
  meta: {
    category: 'belief',
    difficulty: 'deeper',
    estimatedMinutes: 4,
    beginnerPriority: 4,
    tags: ['arabic'],
    relatedContent: [
      ref('reference', 'dua-and-dhikr'),
      ref('reference', 'what-is-the-quran'),
      /* The two occasions in the book this page points at, so the texts
         live once, in the book's own wording. */
      ref('hisn', '1269149'),
      ref('hisn', '1269745'),
    ],
  },
  quickFacts: [
    { label: 'The best', value: 'The Qur’an, read with attention', emphasis: true },
    { label: 'Unless', value: 'A dhikr belongs to that moment. Then that one comes first' },
    { label: 'Read', value: 'Open the Qur’an', href: '/(tabs)/quran' },
  ],
  sections: [
    {
      id: 'best',
      heading: 'Which dhikr is best?',
      promote: 'hero',
      body:
        'The Qur’an, read with attention to what it says. The Qur’an calls itself the best of speech, and it calls itself the Reminder. The scholars draw the plain conclusion from that: an-Nawawi wrote that reciting the Qur’an is the finest dhikr, and Ibn Taymiyyah, Ibn Baz and Ibn ʿUthaymin say the same. It is Allah’s own speech.\n\nThere is one exception, and the exception covers a lot of an ordinary day.',
      sources: [
        quran(39, 23, { surahName: 'Az-Zumar' }),
        quran(15, 9, { surahName: 'Al-Hijr' }),
      ],
      notes: [
        note(
          'agreed',
          'That reciting the Qur’an is the best dhikr in general is agreed. The same scholars who say so also say that a dhikr with a time of its own comes first when that time arrives.',
          {
            sources: [
              scholarly({
                work: 'ما هو أفضل الذكر على الإطلاق (What is the best dhikr, absolutely?)',
                author: 'Islam Question & Answer, fatwa 195274',
                url: 'https://islamqa.info/ar/answers/195274',
              }),
              scholarly({
                work: 'المفاضلة بين الذكر والصلاة على النبي وقراءة القرآن (Dhikr, salawat, or reading the Qur’an?)',
                author: 'IslamWeb, fatwa 198891',
                url: 'https://www.islamweb.net/ar/fatwa/198891',
              }),
            ],
          },
        ),
      ],
    },
    {
      id: 'moment',
      heading: 'When does something else come first?',
      body:
        'When a dhikr belongs to that moment. Some remembrances have a time or a place of their own, and in that time they come before the Qur’an. The reason is simple: the Qur’an can be read at any hour, and a timed dhikr cannot. Miss its moment and it is gone. The Prophet ﷺ sought forgiveness three times the instant he finished a prayer, and told people to send more prayers on him on a Friday than on other days. Those are the moments. The app already holds most of them.',
      bullets: [
        '**After the prayer.** The short adhkar the Prophet ﷺ said as soon as he had given salam. The After the prayer sitting on the Duʿa tab holds them.',
        '**When the adhan is called.** Repeating the caller, then the duʿa after it. The call to prayer page explains it.',
        '**Bowing and prostrating.** The tasbih you already say in every prayer is dhikr in its own place.',
        '**Morning, evening and before sleep.** The three sittings on the Duʿa tab, at the hours the book gives them.',
        '**Friday.** More prayers on the Prophet ﷺ than on any other day. The Friday card on Today picks one for you.',
      ],
      sources: [
        hadith('muslim', '591', { grading: 'sahih', role: 'practice' }),
        hadith('abu-dawud', '1047', { grading: 'sahih', gradedBy: 'Al-Albani', role: 'virtue' }),
      ],
      notes: [
        note(
          'practical',
          'This is why the adhkar in this app sit at fixed times: the times are theirs. The Qur’an tab has no clock on it, because the Qur’an has none.',
        ),
      ],
    },
    {
      id: 'minute',
      heading: 'What if I only have a minute?',
      body:
        'Say the words Allah loves most. Asked which words were best, the Prophet ﷺ answered: the ones Allah chose for His angels and His servants, subḥāna-llāhi wa bi-ḥamdih. He also named four phrases as the dearest to Allah, subḥāna-llāh, al-ḥamdu li-llāh, lā ilāha illa-llāh and Allāhu akbar, and said it does not matter which you begin with. A minute is enough for all four.',
      sources: [
        hadith('muslim', '2731', { grading: 'sahih', role: 'virtue' }),
        hadith('muslim', '2137', { grading: 'sahih', role: 'virtue' }),
      ],
      notes: [
        note(
          'practical',
          'The duʿa book has an occasion on the merit of these four phrases, in the book’s own wording. It is one of the doors below.',
        ),
      ],
    },
    {
      id: 'choose',
      heading: 'Do I have to choose?',
      body:
        'No. The Qur’an being best does not mean dropping everything else for it, and the scholars say so directly. Read the Qur’an when the time is yours, and every letter is rewarded ten times over. Say the dhikr of the moment when its moment comes. Keep the four phrases for the gaps in the day. Someone who does all three has not chosen between them. They have a day with a shape.',
      sources: [
        hadith('tirmidhi', '2910', { grading: 'sahih', gradedBy: 'Al-Albani', role: 'virtue' }),
        scholarly({
          work: 'الإكثار من قراءة القرآن أفضل أم الصلاة على النبي (Is more Qur’an better than salawat on the Prophet ﷺ?)',
          author: 'IslamWeb, fatwa 182167',
          url: 'https://www.islamweb.net/ar/fatwa/182167',
        }),
      ],
      notes: [
        note(
          'practical',
          'Ten spare minutes, then: first the adhkar of whatever moment you are in, if there is one. Then the Qur’an, from wherever you left off. The four phrases go with you through the rest of the day.',
        ),
      ],
    },
  ],
};
