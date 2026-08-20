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
  sections: [
    {
      id: 'working',
      heading: 'Working is honoured, not tolerated',
      body:
        'There is no ideal of poverty here. The Prophet ﷺ said nobody has eaten better food than what he earned by his own hands, and noted that the Prophet Dawud ate from his own labour. The Qur’an tells people to disperse and seek God’s bounty as soon as the Friday prayer ends.',
      sources: [
        hadith('bukhari', '2072', {
          book: 34,
          bookName: 'Sales and Trade',
          inBookReference: 'Book 34, Hadith 25',
        }),
        quran(62, 10, { surahName: 'Al-Jumu`ah' }),
      ],
    },
    {
      id: 'interest',
      heading: 'Interest',
      body:
        'Riba — usually translated as interest or usury — is prohibited in the Qur’an in strong terms, and the Prophet ﷺ listed consuming it among the gravest sins. In practice this is what makes conventional mortgages, interest-bearing savings and most credit cards a live question for Muslims.',
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
          'If you already have a mortgage or a loan, you have not ruined anything and you do not have to solve it this month. Islamic finance options exist in many countries and vary a great deal. Scholars have discussed this in more detail — get advice on your actual situation.',
        ),
      ],
    },
    {
      id: 'job',
      heading: 'If your job touches something forbidden',
      body:
        'Directly producing or selling what is prohibited is the clear case. What is less clear is indirect involvement — a supermarket cashier who occasionally scans wine, a delivery driver, an accountant at a bank. That distance is exactly what scholars weigh.',
      notes: [
        note(
          'differs',
          'Scholars differ on how much distance from a prohibited thing is enough, so answers vary by how central it is to the job.',
          {
            additionalExplanation:
              'The usual reasoning looks at whether the forbidden thing is the point of the work or incidental to it, and at what leaving would cost you. Someone whose whole income is from selling alcohol is in a different position from someone who occasionally rings it through a till. Scholars have discussed this in more detail; describe your actual job to someone qualified rather than deciding from a general rule.',
            positions: [
              {
                school: 'the majority',
                position:
                  'Treat direct production or sale of a prohibited thing as impermissible, and judge incidental involvement by how central it is.',
              },
              {
                school: 'contemporary scholarship',
                position:
                  'Weighs necessity and the availability of other work, particularly for someone who cannot simply leave.',
              },
            ],
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
