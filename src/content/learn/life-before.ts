import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * `docs/build-order.md` calls this the 1am search the app was built for, and
 * the evidence for it was sitting in a CODE COMMENT: `shahada.ts` mentioned
 * Muslim 121 — "Islam demolishes what was before it" — and no screen said it.
 *
 * ⚠️ The hardest editorial line here is what this page does NOT do. It does not
 * rule on a previous marriage, on children, on money earned before, or on what
 * to tell whom. Those are real questions with conditions on them and they need
 * a person who knows the situation. What it does is answer the question
 * underneath all of them, which is whether the past disqualifies you — and
 * that one has an answer, and it is no.
 */
export const LIFE_BEFORE: Reference = {
  id: 'life-before',
  surface: 'learn',
  title: 'What happens to the life before',
  subtitle: 'The past you arrived with, and what Islam does with it',
  meta: {
    category: 'becoming-muslim',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 1,
    relatedContent: [
      ref('guide', 'shahada'),
      ref('reference', 'repentance'),
      ref('reference', 'family'),
    ],
  },
  quickFacts: [
    { label: 'What you owe', value: 'Nothing', emphasis: true },
    { label: 'What to tell', value: 'Nothing, to anyone' },
  ],
  sections: [
    {
      id: 'wiped',
      heading: 'Does my past come with me?',
      body:
        'A companion of the Prophet ﷺ, near the end of his own life, recalled that when Islam entered his heart he went to give his pledge, and was told that Islam demolishes what came before it. Not forgives it slowly. Demolishes it.\n\nYou did not arrive owing for those years. No debt carried over, no probation, nothing to work off.',
      sources: [hadith('muslim', '121')],
    },
    {
      id: 'replaced',
      heading: 'Is it only cancelled?',
      promote: 'hero',
      body:
        'No, the Qur’an goes further than cancelling it. For those who turn back, believe and do right, it says their wrongs are exchanged for good. Not merely wiped out, but swapped. Read that twice, because it is not what most people expect a religion to say about their worst years.',
      sources: [quran(25, 70, { surahName: 'Al-Furqan' })],
    },
    {
      id: 'confession',
      heading: 'Do I have to tell anyone what I did?',
      body:
        'There is no confession in Islam. No one at a mosque needs your history, no imam has to hear it, and nothing about becoming Muslim requires you to describe what you are leaving behind. Anyone who asks is asking for their own reasons, not for the religion, and you can decline.',
      notes: [
        note(
          'practical',
          'That includes online. You do not owe your story to a forum, a group chat, or anyone who says it will help others.',
        ),
      ],
    },
    {
      id: 'still-here',
      heading: 'What about the things that have not gone away?',
      body:
        'Some of the past is not past. A marriage, children, a job, money, family who do not know. Those are real, and they do not vanish. There are no rulings on them here, because each has conditions on it and needs somebody who knows your situation.\n\nWhat is already settled is the part underneath: none of it disqualifies you, and none of it has to be solved before you pray tonight.',
      notes: [
        note(
          'practical',
          'Take these one at a time and slowly. A convert given six life decisions in their first month usually makes them badly.',
        ),
      ],
    },
    {
      id: 'guilt',
      heading: 'Why do I still feel guilty?',
      body:
        'Guilt often lingers, and it is not a sign that something was left undone. The Qur’an tells people who have wronged themselves not to despair, and it is addressed to them specifically, not to people with nothing to regret. Feeling guilty is not evidence against you.',
      sources: [quran(39, 53, { surahName: 'Az-Zumar' })],
      notes: [note('practical', 'If it becomes heavy rather than passing, that is worth telling a person you trust.')],
    },
  ],
};
