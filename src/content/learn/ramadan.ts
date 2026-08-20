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
 *
 * Two things this audit changed. The section on the rest of the month cited
 * Bukhari 1899 for the Prophet's ﷺ generosity in Ramadan; 1899 is the gates of
 * heaven opening and says nothing about generosity, while Bukhari 6 — already
 * cited beside it — carries both that and Jibril's nightly review. The wrong
 * citation is gone rather than replaced. And the fast was described as ending
 * "at nightfall", which for a beginner reads as later than it is: it ends at
 * sunset, which is what the rest of this lesson and the prayer times both say.
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
        'From first light until sunset, no food, no drink — not even water — and no sexual intimacy. The Qur’an marks the start of the fast as the moment dawn becomes distinguishable, and the end at sunset. Outside those hours you eat and drink normally.',
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
      // One narration, both halves of the sentence: Ibn `Abbas describes the
      // Prophet ﷺ as most generous in Ramadan, and Jibril meeting him every
      // night of it to go through the Qur'an.
      sources: [
        hadith('bukhari', '6', {
          book: 1,
          bookName: 'Revelation',
          inBookReference: 'Book 1, Hadith 6',
        }),
      ],
    },
    {
      id: 'laylat-al-qadr',
      heading: 'The night in the last ten',
      body:
        'One night in Ramadan is called Laylat al-Qadr, the Night of Decree — the night the Qur’an began to be revealed, which the Qur’an says is better than a thousand months. Nobody is told which night it is. The Prophet ﷺ said to look for it in the odd nights of the last ten, which is why mosques fill up at the end of the month.',
      sources: [
        quran(97, [1, 5], { surahName: 'Al-Qadr' }),
        hadith('bukhari', '2017', {
          book: 32,
          bookName: 'Virtues of the Night of Qadr',
          inBookReference: 'Book 32, Hadith 4',
        }),
      ],
    },
    {
      id: 'eid',
      heading: 'Eid al-Fitr',
      body:
        'The month ends with Eid — a morning prayer, new or good clothes, and visiting people. Before that prayer, every Muslim gives a small fixed amount of food so that nobody is left out of the day. It is called zakat al-fitr and it is due for every member of a household — old and young, and paid on behalf of anyone in your care.',
      sources: [
        hadith('bukhari', '1503', {
          book: 24,
          bookName: 'Obligatory Charity Tax (Zakat)',
          inBookReference: 'Book 24, Hadith 103',
        }),
      ],
      notes: [
        note(
          'differs',
          'Whether it may be given as money instead of food is a real difference, and it decides what you actually hand over. Most mosques and charities collect it either way and will tell you which they are doing.',
          {
            /**
             * The narration names a measure of dates or barley, which is why
             * the section now says food rather than "food or its value" — that
             * phrasing stated one school's position as though it were the
             * ruling. Both positions are held; neither is a concession.
             */
            sources: [
              hadith('bukhari', '1503', {
                book: 24,
                bookName: 'Obligatory Charity Tax (Zakat)',
                inBookReference: 'Book 24, Hadith 103',
              }),
            ],
            positions: [
              {
                school: 'Hanafi',
                position: 'Allow the value in money, and consider it easier for the recipient.',
              },
              {
                school: 'the majority',
                position:
                  'Hold that it is the staple food the narration names, given as food.',
              },
            ],
            additionalExplanation:
              'Nothing about your Eid depends on getting this right in your first year. Give it through whoever your local mosque collects for, in the form they ask for, before the Eid prayer — that satisfies the position they follow, and the timing is the part the narration is strictest about.',
          },
        ),
      ],
    },
  ],
};
