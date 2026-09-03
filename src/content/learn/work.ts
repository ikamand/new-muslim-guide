import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const WORK: Reference = {
  id: 'work',
  surface: 'learn',
  title: 'Work and money',
  subtitle: 'Earning, and the two things to watch for',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 3,
    tags: ['money'],
    relatedContent: [ref('reference', 'halal-and-haram'), ref('pillar', 'zakat')],
  },
  quickFacts: [
    { label: 'Working', value: 'Honoured, not merely tolerated' },
    { label: 'Interest', value: 'Riba is forbidden, both paying it and taking it' },
  ],
  sections: [
    {
      id: 'working',
      heading: 'How does Islam see work?',
      promote: 'hero',
      body:
        'There is no ideal of poverty here. The Prophet ﷺ said nobody has eaten better food than what he earned by his own hands, and noted that the Prophet Dawud ate from his own labour. The Qur’an tells people to disperse and seek God’s bounty as soon as the Friday prayer ends.',
      sources: [
        hadith('bukhari', '2072', {
          book: 34,
          bookName: 'Sales and Trade',
          inBookReference: 'Book 34, Hadith 25',
        }),
        quran(62, 10, { surahName: 'Al-Jumuʿah' }),
      ],
    },
    {
      id: 'interest',
      heading: 'What about interest?',
      body:
        'Riba, usually translated as interest or usury, is prohibited in the Qur’an in strong terms, and the Prophet ﷺ listed consuming it among the gravest sins. In practice this is what makes conventional mortgages, interest-bearing savings and most credit cards a live question for Muslims.',
      sources: [
        quran(2, 275, { surahName: 'Al-Baqarah' }),
        hadith('bukhari', '2766', {
          book: 55,
          bookName: 'Wills and Testaments (Wasaayaa)',
          inBookReference: 'Book 55, Hadith 29',
        }),
      ],
      notes: [
        note(
          'practical',
          'If you already have a mortgage or a loan, you have not ruined anything, and you do not have to solve it this month. Islamic finance options exist in many countries and vary a great deal. Get advice on your actual situation.',
        ),
      ],
    },
    {
      id: 'job',
      heading: 'What if my job touches something forbidden?',
      body:
        'Directly producing or selling what is prohibited is the clear case. The Prophet ﷺ said the curse on wine falls on ten, its seller and the one who lives off its price among them. What is less clear is indirect involvement: a supermarket cashier who occasionally scans wine, a delivery driver, an accountant at a bank. That distance is exactly what scholars weigh.',
      sources: [
        hadith('tirmidhi', '1295', {
          book: 14,
          bookName: 'The Book on Business',
          inBookReference: 'Book 14, Hadith 97',
          grading: 'hasan',
          gradedBy: 'Darussalam',
        }),
      ],
      notes: [
        note(
          'differs',
          'Scholars differ on how much distance from a prohibited thing is enough, so answers vary by how central it is to the job.',
          {
            additionalExplanation:
              'The usual reasoning looks at whether the forbidden thing is the point of the work or incidental to it, at how much of your income depends on it, and at what leaving would cost you. Someone whose whole income comes from selling alcohol is in a different position from someone who occasionally rings it through a till, and someone who cannot simply leave is in a different position again. The clear case is agreed. Where scholars actually differ is on where the line falls, and the line moves with the facts. That is why the answer here is to describe your actual job to someone qualified rather than to read a general rule off a page.',
          },
        ),
        note(
          'practical',
          'Do not quit your job the week you become Muslim. Find out what your options are first.',
        ),
      ],
    },
  ],
};
