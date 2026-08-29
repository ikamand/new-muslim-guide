import { note, ref } from '../model';
import { general, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * The research named this a leading cause of people leaving: being publicly
 * corrected in a mosque, told opposite things by two confident people, or
 * handed a culture as though it were the religion.
 *
 * `learn/manners.ts` is about the reader's manners. Nothing was about other
 * people's, and this is not that page rewritten — it is the missing half.
 *
 * ⚠️ The app has the raw material for the middle section: 47 `differs` notes
 * already carry attributed positions, and this is the page that makes that
 * apparatus legible. Without it, a convert meeting a contradiction concludes
 * somebody is lying.
 */
export const BEING_CORRECTED: Reference = {
  id: 'being-corrected',
  surface: 'learn',
  title: 'When someone corrects you',
  subtitle: 'Two confident people, opposite answers, and what to do about it',
  meta: {
    category: 'community',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 3,
    tags: ['mosque', 'etiquette'],
    relatedContent: [ref('reference', 'manners'), ref('reference', 'if-you-stopped')],
  },
  quickFacts: [
    { label: 'Two answers', value: 'Usually means two schools, not one liar', emphasis: true },
    { label: 'You may say', value: '“Thank you, I will look into it”' },
  ],
  sections: [
    {
      id: 'happens',
      heading: 'Why did someone correct me in front of everyone?',
      body:
        'Because it will happen, and it is worth being ready rather than winded. Somebody will tell you your feet are wrong, your hands are in the wrong place, or that what you just did is not how it is done — usually in the middle of a room, usually meaning well, and usually with no idea that you have been Muslim for six weeks.\n\nIt is not a judgement on whether you belong there. It is a mosque doing the thing mosques do, and it happens to people who have prayed for forty years.',
      sources: [
        general(
          'Ordinary orientation, claiming no textual authority. Named because every convert-support source surveyed reports public correction as a leading reason people stop attending.',
        ),
      ],
    },
    {
      id: 'two-answers',
      heading: 'Why do two people tell me opposite things?',
      body:
        'Almost always because they are following different schools of thought, and both are describing their own correctly. Where to put your hands, whether to say the intention aloud, how many times to wipe — these are places where the scholarship genuinely differs, and has for a thousand years.\n\nNeither of them is lying to you and neither is making it up. You have walked into an old disagreement that nobody bothered to explain first.',
      notes: [
        note(
          'agreed',
          'That the schools differ on details of practice, within Sunni Islam, is not itself controversial. This app teaches one clear way because a first-timer needs a path — and it marks the places where a difference is one you will actually meet.',
        ),
      ],
    },
    {
      id: 'culture',
      heading: 'Is this Islam or is it their culture?',
      body:
        'Sometimes it is culture, and it is entirely fair to ask which. A useful question, asked plainly and without edge: **is that required, or is that how it is done where you are from?** Most people answer it honestly, and the ones who cannot were not going to be a good source anyway.\n\nThe five categories are worth having in your head for exactly this — much of what arrives as a rule is a recommendation, and some of it is a habit.',
      notes: [
        note(
          'practical',
          'Being told the app or a book is wrong is also normal. Ask what it should say instead and where that comes from — that is not rude, it is the ordinary way this is discussed.',
        ),
      ],
    },
    {
      id: 'what-to-say',
      heading: 'What should I actually say?',
      body:
        '"Thank you, I will look into it." That is a complete answer, it is true, and it ends the exchange without agreeing or arguing. You do not owe a defence of what you were doing, you do not have to explain that you are new, and you certainly do not have to debate it in a prayer hall.\n\nThen look into it, once, when you are calm — and if two answers stay standing, follow the one your mosque follows.',
      sources: [quran(16, 125, { surahName: 'An-Nahl' })],
    },
    {
      id: 'harsh',
      heading: 'What if they were unkind about it?',
      body:
        'Then they were wrong about the manner, whatever they were right about in substance. Being correct does not license being harsh, and a religion whose Prophet ﷺ was described as gentle does not hand anybody a right to humiliate a stranger at prayer.\n\nYou are allowed to be hurt by it. What is worth not doing is concluding that the room, or the religion, is what that person was.',
      notes: [
        note(
          'practical',
          'If a particular mosque is consistently like this, try another one. They differ enormously, and moving is not a failure of patience.',
        ),
      ],
    },
  ],
};
