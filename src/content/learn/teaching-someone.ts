import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * Onboarding used to offer "I'm helping someone learn" and do nothing with it;
 * that question was retired in Phase 7. The need it pointed at is real and
 * arrives later than onboarding could ever have caught it: at year three the
 * convert IS the person newer converts ask, because they are the one in the
 * room who remembers not knowing.
 *
 * ⚠️ The substance of this page is mostly about NOT answering. A convert two
 * years in has enough knowledge to be asked and not enough to be safe, and the
 * single most useful thing it can teach is how to say "I don't know" without
 * feeling like a fraud.
 */
export const TEACHING_SOMEONE: Reference = {
  id: 'teaching-someone',
  surface: 'learn',
  title: 'When someone asks you',
  subtitle: 'Being the person who remembers not knowing',
  meta: {
    category: 'community',
    difficulty: 'deeper',
    estimatedMinutes: 4,
    beginnerPriority: 5,
    relatedContent: [
      ref('reference', 'being-corrected'),
      ref('reference', 'why-people-differ'),
    ],
  },
  quickFacts: [
    { label: 'Best answer', value: '“I don’t know. Let’s ask”', emphasis: true },
    { label: 'You qualify', value: 'To pass on what you actually know' },
  ],
  sections: [
    {
      id: 'you',
      heading: 'Why would anyone ask me?',
      body:
        'Because you remember not knowing, and almost nobody else in the room does. Somebody raised Muslim cannot tell you what is confusing about wudu, because it was never confusing to them. You can. That is a real thing to have, and it arrives at about year two whether you feel ready or not.',
      sources: [
        general(
          'An observation about the position converts find themselves in, not a ruling. What may be passed on is cited below.',
        ),
      ],
    },
    {
      id: 'allowed',
      heading: 'Am I qualified to say anything?',
      body:
        'To pass on what you actually know, yes. The Prophet ﷺ said to convey from him even a single verse. That is a deliberately low bar, and it is about accuracy rather than credentials. What you are not qualified to do is answer questions you have not been taught the answer to. The difference between those two things is what this page is about.',
      sources: [hadith('bukhari', '3461')],
    },
    {
      id: 'dont-know',
      heading: 'What do I say when I do not know?',
      body:
        '"I don’t know." Then, if you can, "let’s find out." That is a complete answer, it is honest, and scholars say it constantly. The ones worth listening to say it more often than anyone.\n\nThe temptation is to fill the gap, because being asked feels like being trusted, and saying nothing feels like letting somebody down. It is not. Guessing at a ruling for somebody who will act on it is far worse than a pause.',
      notes: [
        note(
          'practical',
          'Watch for the question that is really about somebody’s own situation: a marriage, money, family. Those need a person who can ask questions back, and that is rarely you.',
        ),
      ],
    },
    {
      id: 'differ',
      heading: 'What if I know the answer differs?',
      body:
        'Say so. "There is more than one view on that, and mine is what my mosque follows" is more useful to a beginner than one confident answer, because it prepares them for the day somebody tells them otherwise.\n\nBeing given one confident answer is the thing most likely to have been done to you, and the easiest thing not to pass on.',
      sources: [
        general(
          'Advice on how to present a difference, not a ruling on the differences themselves. The page on why people differ covers those.',
        ),
      ],
    },
    {
      id: 'teach',
      heading: 'What is actually worth passing on?',
      body:
        'The things nobody told you. What happens in the first ten minutes at a mosque. That a short prayer counts. That your name stays. That the guilt about the years before is not evidence of anything.\n\nThose are not advanced knowledge and they do not need a scholar. They are the things that were invisible to everybody who could have told you, and you are the only person likely to think of them.',
      sources: [hadith('bukhari', '5027')],
    },
  ],
};
