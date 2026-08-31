import { note, ref } from '../model';
import { hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 31 Aug 2026 — model-written English, unreviewed for substance.
 *
 * The one page `docs/learn-redesign-plan.md` commissions: the lesson that
 * says in prose what `buildPrayer` in `prayers.ts` already encodes — prayer
 * is one rakʿah learned once, a few joints, and every prayer is a count. It
 * replaced the per-prayer curriculum steps; the five guides remain the
 * instrument followed on the mat.
 *
 * Structural claims here (the rakʿah counts, aloud/silent) restate what the
 * app already ships on the Every-prayer screen and in the generated guides.
 * The one citation is Bukhari 757, REUSED from `minimum-prayer.ts` where it
 * was verified by opening the page — no new reference is introduced. The
 * prose still needs a qualified reader before public release.
 */
export const HOW_PRAYER_WORKS: Reference = {
  id: 'how-prayer-works',
  surface: 'learn',
  title: 'How prayer works',
  subtitle: 'One rakʿah, learned once — every prayer is built from it',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 1,
    relatedContent: [
      ref('reference', 'minimum-prayer'),
      ref('reference', 'al-fatihah'),
      ref('guide', 'fajr'),
    ],
  },
  quickFacts: [
    { label: 'The unit', value: 'One rakʿah — a round of standing, bowing and prostrating', emphasis: true },
    { label: 'The counts', value: '2 · 4 · 4 · 3 · 4, from Fajr to ʿIsha' },
  ],
  sections: [
    {
      id: 'one-pattern',
      heading: 'Why do the five prayers look identical?',
      body:
        'Because they are. Every prayer in Islam is the same movements and the same words, repeated a set number of times. Fajr is not one skill and Maghrib another — there is ONE skill, and it is smaller than the step-by-step guides make it look. Learn it once and you have learned every prayer you will ever pray, including the voluntary ones.\n\nWhat changes from prayer to prayer is two facts: how many times round, and whether the Qur’an is recited aloud or quietly. That is the whole difference.',
    },
    {
      id: 'the-rakah',
      heading: 'What is one rakʿah?',
      body:
        'A rakʿah is one round of the prayer’s movements. When the Prophet ﷺ was asked to teach the prayer, what he listed is short, and it is this round:',
      bullets: [
        'Stand and recite what you know of the Qur’an — Al-Fatihah first.',
        'Bow, and settle there.',
        'Stand back up straight.',
        'Prostrate, and settle there.',
        'Sit up between the two prostrations, then prostrate again.',
      ],
      sources: [hadith('bukhari', '757')],
      notes: [
        note(
          'practical',
          'That is the unit. A four-rakʿah prayer is this, four times — nothing new appears in round three that was not in round one.',
        ),
      ],
    },
    {
      id: 'the-joints',
      heading: 'What holds the rounds together?',
      body:
        'Three joints, and the guides walk you through each: the prayer opens by saying Allāhu akbar; partway through — after the second rakʿah, in prayers longer than two — you sit briefly for the tashahhud; and at the very end you sit again, say the tashahhud, and close by turning your head to each side with the salam. Everything else is the rounds themselves.',
    },
    {
      id: 'the-counts',
      heading: 'So what changes between the five?',
      body: 'Only the count, and whether you hear the recitation:',
      bullets: [
        '**Fajr** — 2 rakʿahs, Qur’an aloud.',
        '**Dhuhr** — 4, quietly.',
        '**ʿAsr** — 4, quietly.',
        '**Maghrib** — 3, first two aloud.',
        '**ʿIsha** — 4, first two aloud.',
      ],
      notes: [
        note(
          'practical',
          'The Every prayer screen keeps this table one tap away, with the sunnah prayers that ride before and after each — you never need to hold it in memory.',
        ),
      ],
    },
    {
      id: 'learning-it',
      heading: 'How do I actually learn it?',
      body:
        'By praying, with the guide open. Pick the next prayer of the day, follow it step by step on the mat, and let the pattern teach itself — after a week the guide is confirming what your body already knows. Nobody learns the prayer from a page and then performs it; everybody learns it by doing it imperfectly first.\n\nAnd on a night when even that feels like too much, the least you can do is enough — that is its own page, and it is short.',
    },
  ],
};
