import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The last section used to list four examples — greeting first, eating with
 * the right hand, words before sleeping, smiling — under Bukhari 6018, which
 * names none of them: it is the neighbour, the guest, and saying something
 * good or staying quiet. The sentence was rewritten to the examples the
 * narrations actually give, rather than the citations being padded to reach
 * the sentence. Greeting first and smiling came out; the neighbour, the guest
 * and the good word came in from 6018 itself, and the right hand and the words
 * before sleeping keep the citations the app already carries for them
 * elsewhere (Bukhari 5376 in `duas.ts`, Bukhari 6324 in `recitations.ts`).
 */
export const SUNNAH: Reference = {
  id: 'sunnah',
  surface: 'learn',
  title: 'What is the Sunnah?',
  subtitle: 'The Prophet’s ﷺ way, and how it reaches us',
  meta: {
    category: 'belief',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'who-is-muhammad'), ref('reference', 'what-is-the-quran')],
  },
  quickFacts: [
    { label: 'What it is', value: 'The Prophet’s ﷺ way: what he said, did, and approved of' },
    { label: 'How', value: 'Hadith, reports carrying the chain that passed them down' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What does Sunnah mean?',
      body:
        'Sunnah means a way or a path, and specifically the way the Prophet ﷺ lived: what he said, what he did, and what he approved of in others. It reaches us through hadith, which are reports of those things recorded with the chain of people who passed each one down.',
    },
    {
      id: 'why',
      heading: 'Why does it sit beside the Qur’an?',
      promote: 'hero',
      body:
        'The Qur’an gives the command and the Sunnah usually gives the method. "Establish the prayer" appears again and again; how many units, when, and what to say in them comes from watching him. The Qur’an itself instructs Muslims to take what the Messenger gives them.',
      sources: [quran(59, 7, { surahName: 'Al-Hashr' }), quran(4, 80, { surahName: 'An-Nisa' })],
    },
    {
      id: 'authentic',
      heading: 'Are all hadith reliable?',
      body:
        'No. Because hadith were passed on by people, scholars spent centuries grading them, examining every chain and every narrator. Some are sound, some are weak, and some are forgeries. That is why this app names its sources: so you can check, rather than take its word.',
      notes: [
        note(
          'agreed',
          'Sahih al-Bukhari and Sahih Muslim are the two collections Sunni scholars regard as the most rigorously authenticated. Other collections contain both strong and weak reports, which is why a grading matters there and not in these two.',
        ),
      ],
    },
    {
      id: 'everyday',
      heading: 'What does it look like day to day?',
      body:
        'Much of it is small and human: not harming a neighbour, making a guest welcome, saying something good or staying quiet, eating with the right hand, a few words before sleeping. Following the Sunnah is not an extra layer of difficulty on top of the religion. A lot of it is simply how a decent person moves through a day.',
      sources: [
        hadith('bukhari', '6018', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 49',
        }),
        hadith('bukhari', '5376', {
          book: 70,
          bookName: 'Food, Meals',
          inBookReference: 'Book 70, Hadith 4',
        }),
        hadith('bukhari', '6324', {
          book: 80,
          bookName: 'Invocations',
          inBookReference: 'Book 80, Hadith 21',
        }),
      ],
    },
  ],
};
