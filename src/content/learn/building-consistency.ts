import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance.
 *
 * One page where Iyad's curriculum update first proposed two ("Building a
 * daily routine" and "Becoming consistent"), because they were the same
 * lesson twice (`docs/curriculum-update-plan.md`). It sits in "When it's
 * hard" immediately before `if-you-stopped.ts`, not in Book 3 where the
 * proposal put it: the person who needs it is in week three, dropping habits
 * taken on too fast, and prevention should come before cure.
 *
 * It links `small-sunnahs.ts` for what to take on and `if-you-stopped.ts`
 * for what to do after a lapse, and repeats neither. What no other page had
 * is the narration this one is built on.
 *
 * Sources, each read in the corpus: Bukhari 6464, the most beloved deed is
 * the most regular and constant even if little (ʿĀʾishah's shorter wordings
 * are 6461 and 6462); Bukhari 1970, do what you can keep up, for Allah does
 * not tire until you do; Bukhari 39, the religion is easy and whoever
 * overburdens himself in it will not keep it up, already cited on the
 * What-is-Islam page.
 */
export const BUILDING_CONSISTENCY: Reference = {
  id: 'building-consistency',
  surface: 'learn',
  title: 'Building consistency',
  subtitle: 'Small and steady, and why bursts do not last',
  meta: {
    category: 'character',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    relatedContent: [
      ref('reference', 'small-sunnahs'),
      ref('reference', 'if-you-stopped'),
      ref('reference', 'minimum-prayer'),
    ],
  },
  quickFacts: [
    { label: 'Best deed', value: 'The regular one, even if it is small', emphasis: true },
    { label: 'Add', value: 'One thing at a time, after the last one has stuck' },
    { label: 'Bad week', value: 'Make it smaller, not absent' },
  ],
  sections: [
    {
      id: 'small',
      heading: 'Is a small habit really worth more than a big effort?',
      promote: 'hero',
      body:
        'Yes, and that is not a consolation prize. ʿĀʾishah was asked which deed the Prophet ﷺ loved most and said the one kept up regularly. In his own words, the most beloved deed to Allah is the most regular and constant, even if it is little. Nobody is asked to become a different person in a month. What is asked is to keep the thing you took on.',
      sources: [
        hadith('bukhari', '6464', {
          book: 81,
          bookName: 'To make the Heart Tender (Ar-Riqaq)',
          inBookReference: 'Book 81, Hadith 53',
        }),
      ],
    },
    {
      id: 'burnout',
      heading: 'Why do people burn out in the first month?',
      body:
        'Because the first month is when everything arrives at once. Five prayers, a new way of washing, new words, new food, a mosque, and forty duʿas you have just found out exist. Taking all of it on in week one, keeping it for three weeks, and dropping most of it in week four is the most common shape of a convert’s first year, and it ends with a person deciding they are bad at being Muslim. They are not. They tried to carry the whole religion up the stairs in one trip.',
      sources: [
        general(
          'Orientation, not a ruling. The shape described is what convert-support sources report; the remedy below is the narration above, applied.',
        ),
      ],
    },
    {
      id: 'start',
      heading: 'What do I actually start with?',
      body:
        'The five prayers. They are the spine, they are obligatory, and everything else hangs off them. Get those to the point where a day without them feels wrong before you add anything. Then one thing: a duʿa on waking, a short surah after Al-Fatihah, the siwak before prayer. Keep it until you no longer have to remember it. Then one more.\n\nThe Prophet ﷺ told people to take on what they could keep up, because Allah does not tire of rewarding until you tire of doing.',
      sources: [hadith('bukhari', '1970')],
      notes: [
        note(
          'practical',
          'The page on the small sunnahs lists the little habits and which to take first.',
        ),
      ],
    },
    {
      id: 'bad-week',
      heading: 'What do I do on a bad week?',
      body:
        'Shrink it. Do not skip it. A prayer with only Al-Fatihah is a prayer. One line of dhikr instead of the morning list is still the habit, kept. What ends a practice is not the small version. It is the zero, because the zero teaches you that you are someone who does not do this any more. The Prophet ﷺ said the religion is easy, and that whoever makes it hard on himself will not keep it up.',
      sources: [
        hadith('bukhari', '39', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 32',
        }),
      ],
      notes: [
        note(
          'practical',
          'On the worst days the least is the right amount, and the page on praying before you know everything says what the least is.',
        ),
      ],
    },
    {
      id: 'dropped',
      heading: 'What if I already dropped it?',
      body:
        'Then pick it up today, smaller than before. A month missed does not undo the months before it, and coming back is not starting from nothing. The page on stopping for a while says the rest, and it is written for exactly this.',
    },
  ],
};
