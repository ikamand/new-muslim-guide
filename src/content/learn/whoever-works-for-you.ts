import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Fifth page of the "What you owe" unit (4 Sep 2026).
 *
 * ## How every citation here was sourced
 *
 * Each narration was read in the hadith corpus (`.cache/hadith`) by its own
 * number, English and Arabic both. Ibn Majah 2443 is outside the two Sahihs
 * and all three graders the corpus records on it say sahih; the page prints
 * the grading with a grader named.
 *
 * ## The wording question this page had to settle
 *
 * Sahih al-Bukhari 30 is about a man who owned another man. Translating that
 * situation into "whoever works for you" is a real step and it is taken
 * deliberately, because the instruction in it is about the gap in power
 * rather than about the institution: feed him from what you eat, clothe him
 * from what you wear, do not ask more than he can do, and help him if you do.
 * Every one of those transfers. The page does not pretend the narration was
 * about an employee, and it does not use the narration to say anything about
 * slavery itself, which is a subject of its own and needs a scholar rather
 * than a paragraph here.
 */
export const WHOEVER_WORKS_FOR_YOU: Reference = {
  id: 'whoever-works-for-you',
  surface: 'learn',
  title: 'Whoever works for you',
  subtitle: 'Wages, and the word he ﷺ used for them',
  meta: {
    category: 'character',
    difficulty: 'deeper',
    estimatedMinutes: 4,
    beginnerPriority: 4,
    relatedContent: [ref('reference', 'work'), ref('reference', 'your-neighbour')],
  },
  quickFacts: [
    { label: 'The word', value: 'Brothers. Not staff, and not hands', emphasis: true },
    { label: 'Wages', value: 'Before his sweat dries' },
    { label: 'Workload', value: 'Never past what they can do' },
  ],
  sections: [
    {
      id: 'brothers',
      heading: 'What did he ﷺ call them?',
      promote: 'hero',
      body:
        'Abu Dharr was seen wearing a cloak, with the man who served him wearing the same one. He explained why. He had insulted a man by his mother, and the Prophet ﷺ told him he still had something of the old ignorance in him, that these are your brothers whom God has placed under your hand, and that whoever has a brother under his hand should feed him from what he eats and clothe him from what he wears. Then the limit on the work itself. Do not ask of them more than they can do, and if you do, help them with it.',
      sources: [hadith('bukhari', '30')],
      notes: [
        note(
          'practical',
          'The narration is about a man who owned another. What carries across is the instruction about the gap in power, which is what it addresses.',
        ),
      ],
    },
    {
      id: 'wages',
      heading: 'When do they get paid?',
      body:
        'Give the worker his wages before his sweat dries. That is the whole narration, and the timing in it is deliberate rather than poetic. Payment is due when the work is done, not when it suits the person who owes it. Most of what makes a late payment comfortable for the payer is that the cost of waiting lands entirely on somebody else.',
      sources: [
        hadith('ibn-majah', '2443', { grading: 'sahih', gradedBy: 'Al-Albani' }),
        general(
          'That the delay costs the worker rather than the employer is ordinary explanation of why the timing is stated, not a ruling.',
        ),
      ],
    },
    {
      id: 'unpaid',
      heading: 'And if I do not pay?',
      body:
        'The Prophet ﷺ named three people God will stand against on the Day of Resurrection. One who gives a promise in God’s name and breaks it, one who sells a free man and consumes the price, and one who hires a worker, takes the work in full, and does not give him his wage. Withholding pay is not filed with ordinary debts here. It is put beside breaking an oath sworn in God’s name.',
      sources: [hadith('bukhari', '2227')],
    },
  ],
};
