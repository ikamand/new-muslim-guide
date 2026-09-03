import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * ⚠️ A PAGE, not a collection — a deliberate departure from
 * `docs/build-order.md`, which says every tier-three item is a `collection`
 * instance. The words for most of these are already in this app: Hisn
 * al-Muslim carries the duʿa on waking, on leaving the house, on eating, each
 * fetched from its publisher with the book's own text. Building a collection
 * would put a second copy of those words in a second place, which is exactly
 * what `learn/adhan.ts` refused to do for the same reason. One text, one
 * place; this page gathers and points.
 *
 * What was genuinely missing is not the words. It is the idea that these are a
 * PRACTICE somebody takes on — the research's own phrasing — rather than 132
 * unrelated occasions in a reference book.
 */
export const SMALL_SUNNAHS: Reference = {
  id: 'small-sunnahs',
  surface: 'learn',
  title: 'The small sunnahs',
  subtitle: 'The little habits, and how few you need at once',
  meta: {
    category: 'daily-life',
    difficulty: 'deeper',
    estimatedMinutes: 4,
    beginnerPriority: 4,
    tags: ['etiquette'],
    relatedContent: [ref('reference', 'dua-and-dhikr'), ref('reference', 'manners')],
  },
  quickFacts: [
    { label: 'Required', value: 'None of them', emphasis: true },
    { label: 'Start with', value: 'One' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What are they?',
      body:
        'Small habits the Prophet ﷺ kept, which Muslims take on gradually over years. Starting with the right side. Cleaning your teeth. A short duʿa on waking, on leaving the house, before eating. None of them is required, none is difficult, and together they turn ordinary parts of a day into something deliberate.\n\nThey are the part of the religion that is least discussed with converts and most visible in people who have been Muslim a long time.',
    },
    {
      id: 'right',
      heading: 'Why do people start with the right?',
      body:
        'Because he did. ʿĀʾishah described the Prophet ﷺ as liking to begin with the right side: putting on shoes, combing his hair, washing. It applies to entering a room, eating, giving and taking. The left is used for the opposite: leaving a bathroom, removing shoes.\n\nIt is a small thing that becomes automatic within about a week, and it is the easiest of these to start with.',
      sources: [hadith('bukhari', '168')],
    },
    {
      id: 'siwak',
      heading: 'What is the siwak?',
      body:
        'A twig from the arāk tree, used to clean the teeth. You will see them sold outside mosques for very little. The Prophet ﷺ said that if it were not hard on people, he would have ordered it before every prayer. That tells you how much he valued it, and also that he did not make it a requirement.\n\nA toothbrush does the cleaning. Many people use the siwak as well, before prayer and on Fridays.',
      sources: [hadith('bukhari', '887')],
    },
    {
      id: 'duas',
      heading: 'What about the little duʿas?',
      body:
        'They are already in this app, in the duʿa book, in the book’s own wording: waking, leaving the house, entering and leaving the bathroom, before and after eating, entering a mosque. They are not repeated here. In the book they can be searched, pinned, and read in Arabic and English together.',
      notes: [
        note(
          'practical',
          'The duʿa tab has them grouped by moment. Take one, use it for a fortnight until you stop having to look, and only then take another.',
        ),
      ],
    },
    {
      id: 'how-many',
      heading: 'How many should I take on?',
      body:
        'One. Then, once it has stopped being something you remember to do, one more.\n\nThe way this goes wrong is a person adopting twelve at once in their first month, keeping none of them past week three, and concluding they are bad at being Muslim. Nothing here is a checklist and nothing is measured. A habit you have held for two years is worth more than eleven you dropped.',
      sources: [
        general(
          'Practical advice on pace, not a ruling. Which habits these are is cited above; how many to take on at once is a matter of judgement.',
        ),
      ],
    },
  ],
};
