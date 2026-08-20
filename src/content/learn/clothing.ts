import { note, ref } from '../model';
import { hadith, quran, scholarly } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Written to inform rather than to instruct. A convert reading this may be
 * living with family who have not been told, or in a country where covering
 * carries a cost — so it says what the texts say, notes where scholars differ,
 * and does not tell anyone what to do this week.
 *
 * The face-covering note names four schools rather than weighing a majority
 * against a minority, because reference works do not agree on which side the
 * majority is: Dorar calls covering the face the majority view, and summaries
 * written from inside the Hanafi and Maliki schools call the opposite common.
 * Both are cited on the note. An app is not the place that settles that.
 */
export const CLOTHING: Reference = {
  id: 'clothing',
  surface: 'learn',
  title: 'Clothing',
  subtitle: 'What is asked, and what is a choice',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 3,
    tags: ['etiquette', 'women'],
    relatedContent: [ref('reference', 'halal-and-haram'), ref('reference', 'mosque')],
  },
  sections: [
    {
      id: 'principle',
      heading: 'The idea behind it',
      body:
        'The Qur’an speaks about clothing as something given for covering and for adornment — both, not one at the expense of the other. Islam is not against looking good. The instructions that follow are about modesty in public, not about drabness.',
      sources: [quran(7, 26, { surahName: 'Al-A`raf' })],
    },
    {
      id: 'everyone',
      heading: 'It starts with everyone',
      body:
        'The instruction to lower the gaze and guard modesty is given to men first and then to women, in consecutive verses. That order is worth noticing: modesty in Islam is not a set of rules aimed only at women, and men have their own covering to observe.',
      sources: [
        quran(24, 30, { surahName: 'An-Nur' }),
        quran(24, 31, { surahName: 'An-Nur' }),
      ],
    },
    {
      id: 'men',
      heading: 'For men',
      body:
        'Cover at least from the navel to the knee, keep clothing loose enough not to be revealing, and avoid pure silk and gold jewellery, which the Prophet ﷺ restricted for men. In ordinary Western dress this changes very little in practice.',
      /**
       * Was Bukhari 5828, which is `Umar's letter about how much silk
       * embroidery is allowed — it never mentions gold, and it is about the
       * exception rather than the rule. Abu Dawud 4057 is `Ali's narration of
       * the Prophet ﷺ holding silk in one hand and gold in the other and
       * naming both as forbidden to the men of his community, which is the
       * sentence this section actually makes.
       */
      sources: [
        hadith('abu-dawud', '4057', {
          book: 34,
          bookName: 'Clothing (Kitab Al-Libas)',
          inBookReference: 'Book 34, Hadith 38',
          grading: 'sahih',
          gradedBy: 'Al-Albani',
        }),
      ],
    },
    {
      id: 'women',
      heading: 'For women',
      body:
        'The Qur’an instructs believing women to guard their modesty, to draw their head-coverings over the chest, and to draw their outer garments about them. The commonly taught result is loose clothing covering the body, with the head covered, in front of men outside the immediate family.',
      sources: [
        quran(24, 31, { surahName: 'An-Nur' }),
        quran(33, 59, { surahName: 'Al-Ahzab' }),
      ],
      notes: [
        note(
          'differs',
          'Whether the face and hands must also be covered is a long-standing point of scholarly difference, not a settled question.',
          {
            sources: [
              quran(24, 31, { surahName: 'An-Nur' }),
              scholarly({
                work: 'Encyclopedia of Fiqh — Parts of the Body We Are Obliged to Cover',
                author: 'Dorar al-Saniyyah',
                url: 'https://dorar.net/en/feqhia/499',
              }),
              scholarly({
                work: 'The Lawful Nature of Niqab (Face Veiling)',
                author: 'SeekersGuidance',
                url: 'https://seekersguidance.org/answers/general-counsel/the-lawful-nature-of-niqab-face-veiling/',
              }),
              scholarly({
                work: 'Is It Necessary for Women to Wear the Niqab in the Hanafi School?',
                author: 'SeekersGuidance',
                school: 'Hanafi',
                url: 'https://seekersguidance.org/answers/hanafi-fiqh/is-it-necessary-for-women-to-wear-the-niqab-in-the-hanafi-school/',
              }),
            ],
            additionalExplanation:
              'This note used to weigh a majority against a minority, and that count does not hold in either direction — Dorar’s Encyclopedia of Fiqh calls covering the face the view of the majority of scholars, while summaries written from inside the Hanafi and Maliki schools present the opposite as the common position. So the schools are named below rather than counted. You will meet Muslims on both sides who are each following scholarship they trust, and the detail of any one school is worth hearing from someone qualified rather than reading in a summary.',
            positions: [
              {
                school: 'Maliki',
                position:
                  'The face and hands are what ordinarily shows, so covering them is not required in itself — though the school still calls for covering where there is a real fear of harassment.',
              },
              {
                school: 'Hanafi',
                position:
                  'The face is not itself among the parts that must be covered, but the position recorded in the school from early on is that it is covered in front of men a woman could marry, because of the harm of not doing so.',
              },
              {
                school: 'Shafi`i',
                position:
                  'The school carries two positions, and the more predominant of them is that the face is covered in front of men a woman could marry.',
              },
              {
                school: 'Hanbali',
                position:
                  'The position the school takes as most correct is that the face and hands are covered in front of men a woman could marry.',
              },
            ],
          },
        ),
        note(
          'practical',
          'Nobody has the right to pressure you, and starting is often gradual. If covering would put you in danger or out you before you are ready, that is a real circumstance to discuss with someone knowledgeable rather than a rule you are breaking.',
        ),
      ],
    },
  ],
};
