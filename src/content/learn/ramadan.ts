import { note, ref } from '../model';
import { hadith, quran, scholarly } from '../sources';
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
 *
 * ⚠️ THE EXEMPTIONS ARE NOW SHAPED THE WAY THE EVIDENCE IS. The section swept
 * everything into "the Qur'an exempts anyone ill or travelling, who makes the
 * days up later. In practice this also covers pregnancy, breastfeeding…" —
 * which takes one school's answer on pregnancy and breastfeeding and states it
 * as the ruling, and never mentions the other route the Qur'an itself gives.
 * Three changes:
 *
 *   - Qur'an 2:184 is cited beside 2:185. It is where feeding a poor person
 *     for each day comes from, and it is the whole answer for a chronic or
 *     permanent condition — for which "make the days up later" is not an
 *     answer at all. The lesson had no word for fidyah anywhere in it.
 *   - Pregnancy and breastfeeding move into a `differs` note with all four
 *     schools stated separately, because the four give three different answers
 *     and the Maliki one splits pregnancy from breastfeeding.
 *   - The permissive framing is deliberately kept. It is the right bias for a
 *     first Ramadan and it is now permissive with the differences shown rather
 *     than permissive by flattening them.
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
  quickFacts: [
    { label: 'When', value: 'The ninth month, moving about 11 days earlier each year' },
    { label: 'The fast', value: 'No food, drink or intimacy from dawn until sunset' },
    { label: 'Do I have to?', value: 'Yes, if you are able. Several people are excused', emphasis: true },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is Ramadan?',
      body:
        'The ninth month of the Islamic lunar calendar, and the month in which the Qur’an began to be revealed. Because the calendar is lunar, it moves about eleven days earlier each year, so it passes through every season over a lifetime.',
      sources: [quran(2, 185, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'fasting',
      heading: 'What does the fast involve?',
      promote: 'hero',
      body:
        'From first light until sunset, no food, no drink, not even water, and no sexual intimacy. The Qur’an marks the start of the fast as the moment dawn becomes distinguishable, and the end at sunset. Outside those hours you eat and drink normally.',
      sources: [
        quran(2, 183, { surahName: 'Al-Baqarah' }),
        quran(2, 187, { surahName: 'Al-Baqarah' }),
      ],
    },
    {
      id: 'why',
      heading: 'Why fast at all?',
      body:
        'The Qur’an gives the reason directly: so that you may become mindful of God. It is not endurance for its own sake, and it is not a diet. Being hungry at four in the afternoon is a reminder of who provides, and of people for whom that hunger is not a choice.',
      sources: [quran(2, 183, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'exempt',
      heading: 'Who does not have to fast?',
      body:
        'The Qur’an names two: anyone ill, and anyone travelling. Both make the days up afterwards, at their own pace, before the next Ramadan. It also gives a second route for someone who could only fast with real hardship: feeding a poor person for each day instead of fasting it. That second route is the answer for a long-term or permanent condition, where making the days up later is not something that is ever going to happen. During a period a woman does not fast either, and those days are made up.',
      note: 'If you are on medication or managing an illness, ask a doctor and someone knowledgeable before your first Ramadan rather than during it. A first Ramadan is far more often damaged by someone fasting who should not have than by someone taking an exemption they were given.',
      // 2:185 for illness and travel and the make-up; 2:184 for the feeding
      // route, which the lesson never mentioned and which is the whole answer
      // for a chronic condition.
      sources: [
        quran(2, 185, { surahName: 'Al-Baqarah' }),
        quran(2, 184, { surahName: 'Al-Baqarah' }),
      ],
      notes: [
        note(
          'agreed',
          'Not fasting when you are exempt is not a failure and not something to feel guilty about. The exemption is part of the instruction, not a loophole in it.',
        ),
        note(
          'differs',
          'Pregnancy and breastfeeding are the case scholars genuinely divide over. That you may stop fasting where there is real risk to you or the baby is agreed; what you owe afterwards is not, and the answer can turn on whether the worry was for you or for the child.',
          {
            sources: [
              quran(2, 184, { surahName: 'Al-Baqarah' }),
              scholarly({
                work: 'Fidyah for Missed Fasts Due to Pregnancy and Breastfeeding',
                author: 'Islam Question & Answer, fatwa 49794',
                url: 'https://islamqa.info/en/answers/49794',
              }),
            ],
            positions: [
              {
                school: 'Hanafi',
                position: 'Make the days up, and nothing else is owed.',
              },
              {
                school: 'Maliki',
                position:
                  'A pregnant woman makes the days up. A breastfeeding woman makes them up and also feeds a poor person for each day.',
              },
              {
                school: 'Shafi`i',
                position:
                  'If she stopped fasting out of fear for herself, she makes the days up. If out of fear for the child alone, she makes them up and feeds a poor person for each day.',
              },
              {
                school: 'Hanbali',
                position: 'The same distinction as the Shafi`i school.',
              },
            ],
            additionalExplanation:
              'This lesson used to say the exemptions were covered by "makes the days up later", which is one of these four answers stated as though it were the ruling. There is a fifth position that is older than all of them: Ibn `Abbas and Ibn `Umar held that a pregnant or breastfeeding woman feeds a poor person for each day and does not make the days up at all, which is the gentlest of the answers and is still taught. Among contemporary scholars, Ibn Baz, Ibn `Uthaymin and the Permanent Committee held that the days are made up. Nothing here needs deciding in the abstract: work out with someone knowledgeable what applies to your own situation, and do it before Ramadan rather than in the middle of it.',
          },
        ),
        note(
          'practical',
          'Feeding a poor person for each missed day is what "fidyah" means when you hear the word. Most mosques and Muslim charities collect it and will tell you the amount they use locally.',
        ),
      ],
    },
    {
      id: 'day',
      heading: 'What are suhoor and iftar?',
      body:
        'Suhoor is the meal before dawn. The Prophet ﷺ said to take it, because there is blessing in it, and skipping it makes a long day much harder. Iftar is breaking the fast at sunset, traditionally with dates and water, and he taught not to delay it once the sun is down.',
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
      heading: 'What happens the rest of the month?',
      body:
        'Mosques fill up for taraweeh, a long optional night prayer, and many people read far more Qur’an than usual. Jibril would go through the Qur’an with the Prophet ﷺ each night of Ramadan. There is also more giving: he was described as at his most generous this month.',
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
      heading: 'What is Laylat al-Qadr?',
      body:
        'One night in Ramadan is called Laylat al-Qadr, the Night of Decree, the night the Qur’an began to be revealed, which the Qur’an says is better than a thousand months. Nobody is told which night it is. The Prophet ﷺ said to look for it in the odd nights of the last ten, which is why mosques fill up at the end of the month.',
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
      heading: 'What happens at the end?',
      body:
        'The month ends with Eid: a morning prayer, new or good clothes, and visiting people. Before that prayer, every Muslim gives a small fixed amount of food so that nobody is left out of the day. It is called zakat al-fitr and it is due for every member of a household, old and young, and paid on behalf of anyone in your care.',
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
              // Named schools rather than "the majority" counting itself: this
              // article states the three and the Hanafi position side by side.
              scholarly({
                work: 'Rulings of Zakat al-Fitr, part I',
                author: 'IslamWeb',
                url: 'https://www.islamweb.net/en/ramadan/article/135768/rulings-of-zakat-al-fitr-i',
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
                  'Malik, ash-Shafi`i and Ahmad hold that it is the staple food the narration names, given as food rather than as its value.',
              },
            ],
            additionalExplanation:
              'Nothing about your Eid depends on getting this right in your first year. Give it through whoever your local mosque collects for, in the form they ask for, before the Eid prayer. That satisfies the position they follow, and the timing is the part the narration is strictest about.',
          },
        ),
      ],
    },
  ],
};
