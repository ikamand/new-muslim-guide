import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Written to inform rather than to instruct. A convert reading this may be
 * living with family who have not been told, or in a country where covering
 * carries a cost — so it says what the texts say, notes where scholars differ,
 * and does not tell anyone what to do this week.
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
            sources: [quran(24, 31, { surahName: 'An-Nur' })],
            additionalExplanation:
              'You will meet Muslims on both sides who are each following scholarship they trust. Scholars have discussed this in more detail than a beginner guide can carry, and the specific attributions are worth hearing from someone qualified rather than reading in a summary.',
            positions: [
              {
                school: 'the majority',
                position: 'Hold that the face and hands need not be covered.',
              },
              {
                school: 'a minority',
                position: 'Hold that covering the face is required as well.',
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
