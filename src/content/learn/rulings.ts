import { note, ref } from '../model';
import { general, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English.
 *
 * The five categories are standard usūl al-fiqh and are not in dispute; what
 * needed care is not overstating which acts sit in which. So this page teaches
 * the CATEGORIES and almost no examples, and the examples it does use are ones
 * the app already states elsewhere with citations of their own.
 *
 * `docs/build-order.md` argues this changes how every other lesson is read,
 * and that is the point: `learn/halal-and-haram.ts` already does the harder
 * half — that things are permitted by default — but without the five words a
 * beginner reads every "should" in this app as a "must" and burns out inside a
 * month.
 */
export const RULINGS: Reference = {
  id: 'rulings',
  surface: 'learn',
  title: 'Must, should, may',
  subtitle: 'The five categories, and why not everything is a rule',
  meta: {
    category: 'belief',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    relatedContent: [
      ref('reference', 'halal-and-haram'),
      ref('reference', 'minimum-prayer'),
    ],
  },
  quickFacts: [
    { label: 'Categories', value: 'Five, not two', emphasis: true },
    { label: 'Most of life', value: 'Sits in the middle one' },
  ],
  sections: [
    {
      id: 'why',
      heading: 'Is everything I read a rule?',
      body:
        'Read about Islam for a week and you will meet dozens of sentences that sound like instructions. They are not all the same kind of instruction, and if you read them all as commands you will end the month exhausted and convinced you are failing at everything.\n\nThere are five categories. Learning them once is the difference between a religion with a shape and a religion that is one long list.',
    },
    {
      id: 'five',
      heading: 'What are the five?',
      body: 'From the strongest to the strongest against, with everything ordinary in the middle.',
      bullets: [
        '**Farḍ**: obligatory. The five prayers, fasting in Ramadan. Leaving one is a sin.',
        '**Mustaḥabb**: recommended. Good to do, and no sin at all in not doing it. Most of what you will read about falls here.',
        '**Mubāḥ**: simply allowed. Neither rewarded nor blamed. This is the vast majority of ordinary life: what you eat for breakfast, what work you do, who your friends are.',
        '**Makrūh**: disliked. Better avoided, but not a sin.',
        '**Ḥarām**: forbidden. A short list, and this app says plainly what is on it.',
      ],
      sources: [
        general(
          'The five categories are the standard classification in Islamic legal theory and are agreed across the Sunni schools. This page teaches the terms rather than assigning acts to them, which is the part that differs.',
        ),
      ],
    },
    {
      id: 'default',
      heading: 'What if nobody has told me either way?',
      promote: 'hero',
      body:
        'The starting position is that a thing is permitted unless there is a reason it is not. That is why the forbidden list is short and nameable, and why nobody can hand you a new prohibition without showing you where it comes from.',
      sources: [quran(2, 29, { surahName: 'Al-Baqarah' })],
      notes: [
        note(
          'practical',
          'A useful question when somebody tells you something is haram: which of the five, and on what basis? It is a fair question and it is not rude.',
        ),
      ],
    },
    {
      id: 'should',
      heading: 'What does it mean when this app says “should”?',
      body:
        'It usually means mustaḥabb: worth doing, not required. Where something is genuinely obligatory, the app says so plainly, and where the schools of thought differ it says that too. You are not expected to take all of it on at once, and nothing here is keeping score.',
      notes: [
        note(
          'practical',
          'Take the obligatory things first and let the rest arrive slowly. That is the order everybody learns them in.',
        ),
      ],
    },
  ],
};
