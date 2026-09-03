import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The four sacred months cited Bukhari 3197, which has the wording but not the
 * occasion; the sentence says "in his farewell sermon", and that is Bukhari
 * 4406 — the same narration, in the chapter on the Farewell Pilgrimage.
 *
 * ## The page did not name a single month
 *
 * It was called "The Muslim year", said the year has twelve months, and then
 * never listed them. What it did instead was spend two of its four sections on
 * Ramadan and Eid — which the Ramadan lesson already covers at six times the
 * depth — so a reader who came here to find out what Rajab is left knowing
 * only that Ramadan moves. The `months` section is the page doing the one job
 * its title promises, and `landmarks` is gone rather than rewritten: it was
 * the duplicate.
 *
 * Transliteration only, no Arabic script. A bullet is a Latin `default` rung
 * and Amiri is never set by eye — putting twelve month names in Arabic here
 * would need a component that does not exist, and the names a beginner needs
 * are the ones they will hear said aloud.
 *
 * ## The list and its evidence are two sections, and that is not tidiness
 *
 * A section renders its citations ABOVE its bullets. With the four narrations
 * attached to the list, the page opened "What are the twelve months?" with a
 * screen and a half of Arabic and put Muharram below the fold — visible in a
 * screenshot and in nothing else, since it typechecks, renders and passes
 * every check. So the bullets carry names and dates only, and `worth` carries
 * the four claims that need a narration, in a paragraph, where citations
 * printing first is the right way round.
 *
 * Each was read in the corpus before it was written: Bukhari 1892 for `Ashura'
 * being the tenth of Muharram and voluntary since Ramadan, Bukhari 1969 for
 * Sha`ban, Muslim 1164 for the six of Shawwal, Bukhari 969 for the first ten
 * days of Dhul-Hijjah, and Bukhari 5707 in the note for Safar carrying no bad
 * omen. The months with nothing beside them have nothing beside them because
 * there is nothing an authenticated narration puts there.
 */
export const ISLAMIC_CALENDAR: Reference = {
  id: 'islamic-calendar',
  surface: 'learn',
  title: 'The Muslim year',
  subtitle: 'Why the dates move, and what falls where',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 3,
    tags: ['ramadan'],
    relatedContent: [ref('reference', 'ramadan'), ref('pillar', 'hajj')],
  },
  quickFacts: [
    { label: 'The year', value: 'Twelve lunar months, about 11 days shorter than a solar year' },
    { label: 'It opens', value: 'Muharram. Ramadan is the ninth month, Dhul-Hijjah the twelfth' },
    { label: 'Why it moves', value: 'Ramadan and Hajj drift through the seasons over a lifetime' },
  ],
  sections: [
    {
      id: 'lunar',
      heading: 'Why does the date move every year?',
      promote: 'hero',
      body:
        'Because the year is made of twelve lunar months, each beginning with a new moon, and that makes it about eleven days shorter than the solar year. So Ramadan and the two Eids arrive about eleven days earlier each year rather than falling on fixed dates. Over a lifetime they pass through every season.',
      sources: [quran(9, 36, { surahName: 'At-Tawbah' })],
    },
    {
      id: 'months',
      heading: 'What are the twelve months?',
      body:
        'In order, from the start of the year. Four are sacred, two carry an Eid and one carries the fast. The other five have nothing particular in them. Several are named for a season they no longer fall in, because the months kept moving and the names did not: Rabiʿ means spring, and Jumada is the dry part of the year.',
      /*
        Names and dates only. Every claim that needed a narration moved down to
        `worth`, and the reason is the render order rather than the writing: a
        section prints its citations ABOVE its bullets, so with four narrations
        attached this list opened with a screen and a half of Arabic and the
        first month name arrived below the fold. The list is the answer to the
        heading and has to be the first thing under it.
      */
      bullets: [
        '**1. Muharram**: sacred. The year opens here, and its tenth day is ʿAshuraʾ.',
        '**2. Safar**: nothing falls in it.',
        '**3. Rabiʿ al-Awwal**: nothing falls in it.',
        '**4. Rabiʿ al-Akhir**: nothing falls in it. You will also hear it called Rabiʿ ath-Thani.',
        '**5. Jumada al-Ula**: nothing falls in it.',
        '**6. Jumada al-Akhirah**: nothing falls in it. Also called Jumada ath-Thaniyah.',
        '**7. Rajab**: sacred, and the odd one of the four. The other three run consecutively, and this one stands on its own.',
        '**8. Shaʿban**: the month before Ramadan.',
        '**9. Ramadan**: the month of the fast, and the month in which the Qur’an began to be revealed.',
        '**10. Shawwal**: opens with Eid al-Fitr, on its first day.',
        '**11. Dhul-Qaʿdah**: sacred.',
        '**12. Dhul-Hijjah**: sacred, and the month of Hajj. Its tenth day is Eid al-Adha.',
      ],
      notes: [
        note(
          'agreed',
          'You may hear that Safar is an unlucky month, or that it is a bad time to marry or travel. That is a pre-Islamic superstition, and the Prophet ﷺ named it and rejected it. No month carries bad luck.',
          {
            sources: [
              hadith('bukhari', '5707', {
                book: 76,
                bookName: 'Medicine',
                inBookReference: 'Book 76, Hadith 27',
              }),
            ],
          },
        ),
      ],
    },
    {
      id: 'worth',
      heading: 'Which months ask anything of me?',
      /*
        The four narrations live here rather than on the list above, and the
        body is one paragraph rather than bullets on purpose: this section
        prints its citations first, which is right when the citations ARE the
        section and wrong when a list is.
      */
      body:
        'Only one thing in the year is obligatory, and that is Ramadan, which has a page of its own. Four other things are worth knowing about, because you will hear all four mentioned, and none of them is required. The fast of ʿAshuraʾ, on the tenth of Muharram, which the Prophet ﷺ kept and which became voluntary once Ramadan was prescribed. Fasting in Shaʿban, which he did more than in any month except Ramadan. Six fasts spread through Shawwal, after Ramadan. And the first ten days of Dhul-Hijjah, which he described as the best days of the year for doing good.',
      sources: [
        // The tenth of Muharram, named as such, ordered and then left
        // voluntary once Ramadan came — both halves of that sentence.
        hadith('bukhari', '1892', {
          book: 30,
          bookName: 'Fasting',
          inBookReference: 'Book 30, Hadith 2',
        }),
        // `Aisha: never a whole month but Ramadan, and never more in any month
        // than in Sha`ban.
        hadith('bukhari', '1969', {
          book: 30,
          bookName: 'Fasting',
          inBookReference: 'Book 30, Hadith 76',
        }),
        // Muslim prints this as 1164; the corpus files it as 1164.01, which is
        // the variant numbering and not a different narration. The rendered
        // text was read before this was cited, not just the number resolved —
        // Muslim's two numbering systems have silently swapped narrations here
        // before.
        hadith('muslim', '1164', {
          book: 13,
          bookName: 'The Book of Fasting',
          inBookReference: 'Book 13, Hadith 264',
          grading: 'sahih',
        }),
        hadith('bukhari', '969', {
          book: 13,
          bookName: 'The Two Festivals (Eids)',
          inBookReference: 'Book 13, Hadith 18',
        }),
      ],
    },
    {
      id: 'sacred',
      heading: 'What are the sacred months?',
      body:
        'The Qur’an says four of the twelve are sacred, and the Prophet ﷺ named them in his farewell sermon: three consecutive ones, Dhul-Qaʿdah, Dhul-Hijjah and Muharram, and Rajab. Fighting is prohibited in them, and wrongdoing in them is treated as more serious.',
      sources: [
        // Was Bukhari 3197, which carries the same words but is filed under
        // the Beginning of Creation and says nothing about when they were
        // said. 4406 is the same narration in the chapter on the Farewell
        // Pilgrimage, which is what the sentence claims.
        hadith('bukhari', '4406', {
          book: 64,
          bookName: 'Military Expeditions led by the Prophet (pbuh) (Al-Maghaazi)',
          inBookReference: 'Book 64, Hadith 428',
        }),
      ],
    },
    {
      id: 'practical',
      heading: 'How does this affect my week?',
      body:
        'For most of the year, not at all. You will pick the date up from the people around you and never need to work it out. It only matters at the two ends of Ramadan, and there it is announced locally rather than calculated in advance, so mosques in the same city can start the month, or the Eid, a day apart. That is normal and not worth worrying about.',
      notes: [
        note(
          'differs',
          'Whether a month begins by sighting the moon locally or by astronomical calculation is a live question, and communities in the same country sometimes start Ramadan on different days.',
          {
            additionalExplanation:
              'Both approaches are argued from evidence, and neither community is being careless. As a beginner, the practical answer is to follow the mosque or community you pray with.',
            positions: [
              { school: 'the majority', position: 'Follow the sighting of the moon, as reported locally or regionally.' },
              { school: 'contemporary scholarship', position: 'Some bodies accept astronomical calculation to fix the date in advance.' },
            ],
          },
        ),
      ],
    },
  ],
};
