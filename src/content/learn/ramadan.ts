import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The exemptions section is the one that most needs a qualified eye. It is
 * written to be permissive on purpose: a new Muslim's first Ramadan is far more
 * often damaged by someone fasting when they should not than by someone
 * skipping when they should have fasted.
 */
export const RAMADAN: Reference = {
  id: 'ramadan',
  surface: 'learn',
  title: 'Ramadan',
  subtitle: 'What happens, and what is asked of you',
  meta: {
    category: 'fasting',
    difficulty: 'building',
    estimatedMinutes: 6,
    beginnerPriority: 3,
    tags: ['ramadan', 'health'],
    relatedContent: [ref('pillar', 'sawm'), ref('reference', 'mosque')],
  },
  sections: [
    {
      id: 'what',
      heading: 'What it is',
      body:
        'The ninth month of the Islamic lunar calendar, and the month in which the Qur’an began to be revealed. Because the calendar is lunar, it moves about eleven days earlier each year — so it passes through every season over a lifetime.',
      sources: [quran(2, 185, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'fasting',
      heading: 'The fast itself',
      body:
        'From first light until sunset, no food, no drink — not even water — and no sexual intimacy. The Qur’an marks the start of the fast as the moment dawn becomes distinguishable, and the end at nightfall. Outside those hours you eat and drink normally.',
      sources: [
        quran(2, 183, { surahName: 'Al-Baqarah' }),
        quran(2, 187, { surahName: 'Al-Baqarah' }),
      ],
    },
    {
      id: 'why',
      heading: 'Why',
      body:
        'The Qur’an gives the reason directly: so that you may become mindful of God. It is not endurance for its own sake, and it is not a diet. Being hungry at four in the afternoon is a reminder of who provides, and of people for whom that hunger is not a choice.',
      sources: [quran(2, 183, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'exempt',
      heading: 'Who does not fast',
      body:
        'The Qur’an exempts anyone ill or travelling, who makes the days up later. In practice this also covers pregnancy, breastfeeding, menstruation, and conditions where fasting would cause harm. If you are on medication or managing an illness, ask a doctor and someone knowledgeable before your first Ramadan rather than during it.',
      sources: [quran(2, 185, { surahName: 'Al-Baqarah' })],
      notes: [
        note(
          'agreed',
          'Not fasting when you are exempt is not a failure and not something to feel guilty about. The exemption is part of the instruction, not a loophole in it.',
        ),
        note(
          'practical',
          'The details of who makes days up, who feeds someone instead, and what happens with a long-term illness are worked out case by case. Scholars have discussed this in more detail — ask someone locally about your own situation.',
        ),
      ],
    },
    {
      id: 'day',
      heading: 'Suhoor and iftar',
      body:
        'Suhoor is the meal before dawn — the Prophet ﷺ said to take it, because there is blessing in it, and skipping it makes a long day much harder. Iftar is breaking the fast at sunset, traditionally with dates and water, and he taught not to delay it once the sun is down.',
      sources: [
        hadith('bukhari', '1923', {
          book: 30,
          bookName: 'Fasting',
          inBookReference: 'Book 30, Hadith 32',
        }),
        hadith('bukhari', '1957', {
          book: 30,
          bookName: 'Fasting',
          inBookReference: 'Book 30, Hadith 64',
        }),
      ],
    },
    {
      id: 'worship',
      heading: 'The rest of the month',
      body:
        'Mosques fill up for taraweeh, a long optional night prayer, and many people read far more Qur’an than usual — Jibril would go through the Qur’an with the Prophet ﷺ each night of Ramadan. There is also more giving: he was described as at his most generous this month.',
      sources: [
        hadith('bukhari', '6', {
          book: 1,
          bookName: 'Revelation',
          inBookReference: 'Book 1, Hadith 6',
        }),
        hadith('bukhari', '1899', {
          book: 30,
          bookName: 'Fasting',
          inBookReference: 'Book 30, Hadith 9',
        }),
      ],
    },
    {
      id: 'eid',
      heading: 'Eid al-Fitr',
      body:
        'The month ends with Eid — a morning prayer, new or good clothes, and visiting people. Before that prayer, every Muslim gives a small fixed amount of food or its value so that nobody is left out of the day. It is called zakat al-fitr and it is due for every member of a household.',
      sources: [
        hadith('bukhari', '1503', {
          book: 24,
          bookName: 'Obligatory Charity Tax (Zakat)',
          inBookReference: 'Book 24, Hadith 103',
        }),
      ],
    },
  ],
};
