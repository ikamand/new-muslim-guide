import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * One citation is a looser fit than it looks. The last section lists four
 * examples — greeting first, eating with the right hand, words before sleeping,
 * smiling — and cites Bukhari 6018, which is the neighbour, the guest and
 * saying something good or staying quiet. It carries the section's thesis, that
 * much of the Sunnah is ordinary decency, and none of the four examples. Two of
 * them are sourced elsewhere in the app (Bukhari 5376 and Bukhari 6324); the
 * other two were left uncited rather than given a narration this audit had not
 * opened. Kept as it is, and named here, rather than quietly padded.
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
  sections: [
    {
      id: 'what',
      heading: 'What the word means',
      body:
        'Sunnah means a way or a path — specifically the way the Prophet ﷺ lived: what he said, what he did, and what he approved of in others. It reaches us through hadith, which are reports of those things recorded with the chain of people who passed each one down.',
    },
    {
      id: 'why',
      heading: 'Why it sits beside the Qur’an',
      body:
        'The Qur’an gives the command and the Sunnah usually gives the method. "Establish the prayer" appears again and again; how many units, when, and what to say in them comes from watching him. The Qur’an itself instructs Muslims to take what the Messenger gives them.',
      sources: [quran(59, 7, { surahName: 'Al-Hashr' }), quran(4, 80, { surahName: 'An-Nisa' })],
    },
    {
      id: 'authentic',
      heading: 'Not every report is equal',
      body:
        'Because hadith were transmitted by people, scholars spent centuries grading them — examining every chain and every narrator. Some are sound, some are weak, and some are forgeries. This is why the app names its sources: so you can check, rather than take its word.',
      notes: [
        note(
          'agreed',
          'Sahih al-Bukhari and Sahih Muslim are the two collections Sunni scholars regard as the most rigorously authenticated. Other collections contain both strong and weak reports, which is why a grading matters there and not in these two.',
        ),
      ],
    },
    {
      id: 'everyday',
      heading: 'What it looks like day to day',
      body:
        'Much of it is small and human: greeting people first, eating with the right hand, saying a few words before sleeping, smiling. Following the Sunnah is not an extra layer of difficulty on top of the religion — a lot of it is simply how a decent person moves through a day.',
      sources: [
        hadith('bukhari', '6018', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 49',
        }),
      ],
    },
  ],
};
