import { Recitations } from './recitations';
import { ref } from './model';
import { hadith } from './sources';
import type { Guide } from './types';

/**
 * Becoming Muslim.
 *
 * A guide rather than a reference page because it is a thing you do, and the
 * most consequential thing anyone will do in this app. It is also the one
 * screen some people open before they are Muslim at all, so it explains before
 * it instructs — nobody should say these words without knowing what they mean.
 *
 * ⚠️ PARTIAL REVIEW. Two of the three claims that most needed checking now
 * carry a source. That becoming Muslim wipes what came before is `Amr ibn
 * al-`As's narration in Sahih Muslim 121 — "Islam demolishes what was before
 * it" — and the wash afterwards is the instruction to Qays ibn `Asim in Sunan
 * Abi Dawud 355, which the ghusl guide now holds with the school difference
 * beside it.
 *
 * ⚠️ REVIEW REQUIRED — that witnesses are not a condition of validity. It is
 * the settled position and it matters pastorally, but it is a negative: no
 * text makes witnesses a condition, and an app cannot cite the absence of one.
 * A qualified reader should confirm the sentence rather than the citation.
 *
 * Deliberately short. Someone reading this is not looking for theology; they
 * are looking for what to do in the next ten minutes.
 */
export const SHAHADA_GUIDE: Guide = {
  id: 'shahada',
  title: 'Becoming Muslim',
  subtitle: 'What to say, and what it means',
  meta: {
    category: 'becoming-muslim',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 1,
    tags: ['first-day', 'arabic'],
    relatedContent: [ref('reference', 'what-is-islam'), ref('guide', 'wudu')],
  },
  steps: [
    {
      id: 'understand',
      title: 'Know what you are saying',
      instruction:
        'Becoming Muslim is one sentence, said and meant. Before you say it, be clear on both halves: that worship belongs to Allah alone and nothing shares that with Him, and that Muhammad ﷺ was sent by Him to convey how.',
      note: 'It has to be meant. Saying the words to please someone else, or to marry, does not make a person Muslim.',
      // The first of the five, and the two halves stated as two halves.
      sources: [
        hadith('bukhari', '8', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 1',
        }),
      ],
    },
    {
      id: 'say',
      title: 'Say it',
      instruction:
        'Say it aloud, in Arabic if you can manage it. If the Arabic is beyond you today, say it in your own language and meaning it — then learn the Arabic, because you will say it in every prayer for the rest of your life.',
      says: Recitations.shahada,
      note: 'No witnesses are needed for this to count, and no imam has to be present. Many people do say it in front of others, and a mosque can give you a certificate if you ever need to prove it — for a pilgrimage visa, or a Muslim marriage.',
    },
    {
      id: 'after',
      title: 'You are Muslim',
      instruction:
        'That is it. Nothing else is required of you in this moment, and nothing you did before it is held against you — becoming Muslim wipes what came before.',
      note: 'You do not need to change your name. You do not need to tell anyone today. Take a full wash when you can, which is recommended for someone who has just become Muslim, and then learn wudu and the prayer — in that order, without rushing.',
      /**
       * Muslim 121 for the sentence people most need to hear on this screen;
       * Abu Dawud 355 for the wash. The ghusl guide carries the school
       * difference on the second — it belongs there rather than here, because
       * nobody reading this screen needs it in the next ten minutes.
       */
      sources: [
        hadith('muslim', '121', {
          book: 1,
          bookName: 'The Book of Faith',
          inBookReference: 'Book 1, Hadith 228',
        }),
        hadith('abu-dawud', '355', {
          book: 1,
          bookName: 'Purification (Kitab Al-Taharah)',
          inBookReference: 'Book 1, Hadith 355',
          grading: 'sahih',
          gradedBy: 'Al-Albani',
          role: 'practice',
        }),
      ],
    },
  ],
};
