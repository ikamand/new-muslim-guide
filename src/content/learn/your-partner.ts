import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Third page of the "What you owe" unit (4 Sep 2026).
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. Tirmidhi 3895 is outside the
 * two Sahihs; the corpus records four graders on it, two saying sahih, one
 * hasan sahih and one hasan, and the page prints the grading with the grader
 * named rather than asserting one of its own.
 *
 * ## Where this stops
 *
 * Nothing here is a ruling on a marriage. Maintenance, obedience, divorce and
 * every dispute belong with somebody who can ask questions back, and the page
 * says so. What it teaches is the standard the narrations set, which is
 * character, and that is the part a reader can act on without a scholar.
 *
 * ⚠️ 2:228's clause on mutual rights sits inside a passage about the waiting
 * period after divorce. That is said on the page rather than quietly cropped,
 * because a reader who looks it up should not find a surprise.
 */
export const YOUR_PARTNER: Reference = {
  id: 'your-partner',
  surface: 'learn',
  title: 'The best of you',
  subtitle: 'What a husband and a wife owe each other',
  meta: {
    category: 'character',
    difficulty: 'deeper',
    estimatedMinutes: 4,
    beginnerPriority: 4,
    relatedContent: [ref('reference', 'marriage-shape'), ref('reference', 'your-children')],
  },
  quickFacts: [
    { label: 'The measure', value: 'How you treat the person who sees you unguarded', emphasis: true },
    { label: 'Both ways', value: 'What is owed to her is like what is owed from her' },
    { label: 'If it cools', value: 'Kindness is still commanded' },
  ],
  sections: [
    {
      id: 'measure',
      heading: 'What is the measure of a man here?',
      promote: 'hero',
      body:
        'His wife. The Prophet ﷺ said that the best of you is the best to his wives, and then said that he was the best of them to his own. That is a standard set at home, where nobody is watching and there is no credit to be had. A man can be admired everywhere else and fail it.',
      sources: [
        hadith('tirmidhi', '3895', { grading: 'sahih', gradedBy: 'Al-Albani', role: 'virtue' }),
      ],
    },
    {
      id: 'why',
      heading: 'Why is marriage framed this way?',
      body:
        'Because of what the Qur’an says it is for. It calls a spouse a sign of God, made so that you find rest in them, and says He placed affection and mercy between the two of you. Rest, affection and mercy are the stated purpose. A marriage that runs on none of the three is missing the thing it was described as being.',
      sources: [quran(30, 21, { surahName: 'Ar-Rum' })],
    },
    {
      id: 'cools',
      heading: 'What if the feeling fades?',
      body:
        'The command does not move. The Qur’an tells husbands to live with them in kindness, and then says something unusually direct about the months when that is hard. You may dislike a thing, and God places much good in it. Kindness is not presented as what you do while the feeling lasts. It is what is owed, and the feeling is expected to come and go under it.',
      sources: [quran(4, 19, { surahName: 'An-Nisa' })],
      notes: [
        note(
          'practical',
          'Nothing on this page settles a dispute in a marriage. Anything specific needs a person who can hear both sides and ask questions back.',
        ),
      ],
    },
    {
      id: 'both-ways',
      heading: 'Does it run both ways?',
      body:
        'Yes. The Qur’an says that what is due to them is like what is due from them, in what is reasonable. The clause sits inside a longer passage about the waiting period after a divorce, which is worth knowing before you look it up, and the principle in it is stated in general terms. A right that only ever runs one way is not what the verse describes.',
      sources: [
        quran(2, 228, { surahName: 'Al-Baqarah' }),
        general(
          'That the clause is stated generally, inside a passage about divorce, is what the verse shows on its face. How far it reaches in a particular case is for a scholar.',
        ),
      ],
    },
  ],
};
