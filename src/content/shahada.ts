import { Recitations } from './recitations';
import { note, ref } from './model';
import { hadith, scholarly } from './sources';
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
 * ⚠️ THE WITNESS SENTENCE NOW CARRIES SOURCES, AND SPLITS TWO QUESTIONS.
 *
 * It said "no witnesses are needed for this to count, and no imam has to be
 * present", with nothing behind it, because it is a negative and an app cannot
 * cite the absence of a text. What it can cite is scholars answering the exact
 * question, and two independent ones now sit on the step — Islam Question &
 * Answer, and SeekersGuidance, which is a Hanafi-tradition answer rather than
 * the same school twice. Both say the same thing: the testimony is valid said
 * alone, and documentation is worth having without being a condition.
 *
 * The step now separates RELIGIOUS VALIDITY from ADMINISTRATIVE PROOF, because
 * they are different questions with different answers and running them into
 * one sentence is what made this the riskiest claim in the app. A reviewer is
 * still being asked to confirm both halves.
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
      note: 'You are Muslim from the moment you say it and mean it. Nobody has to be there, and no imam has to be present.',
      // Thumamah ibn Uthal said it standing in the mosque with people around;
      // that is not what makes it count, and the app does not cite him for
      // that. The scholarly answers are what carry the negative — no text
      // makes witnesses a condition, so the citation has to be to people whose
      // job is to say what the texts require and do not require.
      sources: [
        scholarly({
          work: 'Do You Need Witnesses to Take Shahadah?',
          author: 'Islam Question & Answer, fatwa 49715',
          url: 'https://islamqa.info/en/answers/49715',
        }),
        scholarly({
          work: 'Does Taking Shahada Require Witnesses?',
          author: 'Abdullah Anik Misra, SeekersGuidance',
          url: 'https://seekersguidance.org/answers/calling-to-islam/does-taking-shahada-require-witnesses/',
        }),
      ],
      notes: [
        note(
          'agreed',
          'Getting it written down is a separate question, and worth doing when you can. A mosque or Islamic centre can record it and give you a certificate — not because your Islam needs one, but because other people\'s paperwork sometimes does.',
          {
            sources: [
              scholarly({
                work: 'Do You Need Witnesses to Take Shahadah?',
                author: 'Islam Question & Answer, fatwa 49715',
                url: 'https://islamqa.info/en/answers/49715',
              }),
              scholarly({
                work: 'Does Taking Shahada Require Witnesses?',
                author: 'Abdullah Anik Misra, SeekersGuidance',
                url: 'https://seekersguidance.org/answers/calling-to-islam/does-taking-shahada-require-witnesses/',
              }),
            ],
            additionalExplanation:
              'These are two different things and the app keeps them apart on purpose. Whether you are Muslim is settled between you and Allah the moment you say it and mean it, and both answers cited here say so plainly — one of them in the words "Islam is a matter that is between a person and his Lord". Whether a registrar, a mosque, a Hajj visa office or a marriage contract will take your word for it later is a paperwork question with a paperwork answer. Historically witnesses were asked for in Muslim courts because inheritance and marriage law followed a person\'s religion, which is where the idea that they are required comes from. If you are not ready to walk into a mosque, that is fine — none of this expires, and the certificate is available whenever you want it.',
          },
        ),
      ],
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
