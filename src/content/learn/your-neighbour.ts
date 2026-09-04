import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Sixth and last page of the "What you owe" unit (4 Sep 2026).
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. Sahih Muslim 46 is the standard
 * number from the record's own `arabicnumber`, not a sequential position.
 *
 * ## One thing this page is careful about
 *
 * Nothing here makes the neighbour's religion a condition. 4:36 lists the
 * near neighbour and the far neighbour with no qualifier, the narration about
 * Jibril names none, and the narration about a neighbour being safe from you
 * names none either. Where the texts do not draw a line, the page does not
 * draw one for them.
 */
export const YOUR_NEIGHBOUR: Reference = {
  id: 'your-neighbour',
  surface: 'learn',
  title: 'Your neighbour',
  subtitle: 'The one Jibril would not stop mentioning',
  meta: {
    category: 'character',
    difficulty: 'deeper',
    estimatedMinutes: 3,
    beginnerPriority: 4,
    relatedContent: [ref('reference', 'manners'), ref('reference', 'whoever-works-for-you')],
  },
  quickFacts: [
    { label: 'How much', value: 'He thought they would be made heirs', emphasis: true },
    { label: 'The minimum', value: 'That they are safe from you' },
    { label: 'Which one', value: 'The nearer door first' },
  ],
  sections: [
    {
      id: 'jibril',
      heading: 'How much does a neighbour matter?',
      promote: 'hero',
      body:
        'The Prophet ﷺ said that Jibril kept on urging him about the neighbour until he thought the neighbour would be given a share of the inheritance. That is the measure being offered. Not a general encouragement to be pleasant, but a pressure so persistent that the man receiving it expected a legal right to come out of it.',
      sources: [hadith('bukhari', '6015')],
    },
    {
      id: 'floor',
      heading: 'What is the floor?',
      body:
        'That they are safe from you. The Prophet ﷺ said that a person whose neighbour is not secure from his harm will not enter Paradise. Before any question of gifts or visits, the first thing owed to the person on the other side of the wall is that living next to you costs them nothing.',
      sources: [hadith('muslim', '46')],
    },
    {
      id: 'which',
      heading: 'Which neighbour, and how far?',
      body:
        'ʿAisha asked which of two neighbours she should give to. She was told the one whose door is nearer. The Qur’an lists both, the near neighbour and the one further off, in a verse that runs through everyone with a claim on you, from parents down to the traveller and the companion at your side. So the circle is wide, and nearness decides the order rather than the obligation.',
      sources: [
        hadith('bukhari', '2259'),
        quran(4, 36, { surahName: 'An-Nisa' }),
      ],
      notes: [
        note(
          'practical',
          'Nothing in these texts asks what religion the neighbour is, and the page does not add the question.',
        ),
      ],
    },
  ],
};
