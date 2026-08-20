import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The four sacred months cited Bukhari 3197, which has the wording but not the
 * occasion; the sentence says "in his farewell sermon", and that is Bukhari
 * 4406 — the same narration, in the chapter on the Farewell Pilgrimage.
 */
export const ISLAMIC_CALENDAR: Reference = {
  id: 'islamic-calendar',
  surface: 'learn',
  title: 'The Muslim year',
  subtitle: 'Why the dates move, and what falls where',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    tags: ['ramadan'],
    relatedContent: [ref('reference', 'ramadan'), ref('pillar', 'hajj')],
  },
  sections: [
    {
      id: 'lunar',
      heading: 'It follows the moon',
      body:
        'Twelve months, each beginning with a new moon, making a year about eleven days shorter than the solar one. That is why Ramadan and the two Eids move earlier every year rather than falling on fixed dates — over a lifetime they pass through every season.',
      sources: [quran(9, 36, { surahName: 'At-Tawbah' })],
    },
    {
      id: 'sacred',
      heading: 'Four sacred months',
      body:
        'The Qur’an says four of the twelve are sacred, and the Prophet ﷺ named them in his farewell sermon: three consecutive — Dhul-Qaʿdah, Dhul-Hijjah and Muharram — and Rajab. Fighting is prohibited in them, and wrongdoing in them is treated as more serious.',
      sources: [
        quran(9, 36, { surahName: 'At-Tawbah' }),
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
      id: 'landmarks',
      heading: 'What to have in your head',
      body:
        'Ramadan is the month of fasting and ends with Eid al-Fitr. Dhul-Hijjah is the month of Hajj, and its tenth day is Eid al-Adha, the second of the two Eids — marked by those not on pilgrimage as well. Muharram opens the year.',
    },
    {
      id: 'practical',
      heading: 'In practice',
      body:
        'You will find out when Ramadan starts from the people around you rather than from a calculation, because the start of a month is announced locally and mosques in the same city can differ by a day. That is normal and not worth worrying about.',
      notes: [
        note(
          'differs',
          'Whether a month begins by sighting the moon locally or by astronomical calculation is a live question, and communities in the same country sometimes start Ramadan on different days.',
          {
            additionalExplanation:
              'Both approaches are argued from evidence and neither community is being careless. As a beginner the practical answer is to follow the mosque or community you pray with. Scholars have discussed this in more detail.',
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
