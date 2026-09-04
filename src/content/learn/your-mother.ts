import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * First page of the "What you owe" unit (4 Sep 2026). The unit is built on
 * rights rather than on virtues: each lesson is one party in the reader's
 * life and what is owed to them, with the text under it. A list of good
 * qualities reads as a poster; a list of people is something a person can
 * act on this afternoon.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. Sahih Muslim is cited by the
 * standard numbering taken from the record's own `arabicnumber` (2548.01),
 * not by the corpus's sequential position. Nothing was cited from memory.
 *
 * ## What this page deliberately does not do
 *
 * It does not repeat the convert's questions about parents. Whether to tell
 * them, and what changes when they are not Muslim, are answered on the
 * family page and are linked rather than said twice. This page is the older
 * and more general question, and it is the one a person raised Muslim
 * usually knows as a slogan without ever having read the text under it.
 *
 * The narrations on serving a parent who has died, and on a parent's supplication,
 * were left out: they are a page of their own and this one is already full.
 */
export const YOUR_MOTHER: Reference = {
  id: 'your-mother',
  surface: 'learn',
  title: 'Your mother, three times',
  subtitle: 'The answer he ﷺ gave, and then gave again',
  meta: {
    category: 'character',
    difficulty: 'deeper',
    estimatedMinutes: 4,
    beginnerPriority: 4,
    relatedContent: [ref('reference', 'family'), ref('reference', 'animals-and-land')],
  },
  quickFacts: [
    { label: 'Who first', value: 'Your mother, three times over', emphasis: true },
    { label: 'Then', value: 'Your father, after the three' },
    { label: 'The limit', value: 'Obedience stops where disobeying God begins' },
  ],
  sections: [
    {
      id: 'asked',
      heading: 'Who deserves the most from me?',
      promote: 'hero',
      body:
        'A man asked the Prophet ﷺ exactly that. He was told his mother. He asked who came next, and was told his mother. He asked again, and was told his mother a third time. Only on the fourth asking was he told his father. The repetition is the teaching. It was not a slip, and the man kept asking because he did not expect the same answer twice.',
      sources: [
        hadith('bukhari', '5971'),
        hadith('muslim', '2548a'),
      ],
    },
    {
      id: 'why',
      heading: 'Why the mother three times?',
      body:
        'The Qur’an answers it in the places where it commands kindness to parents. It says his mother carried him in weakness upon weakness. It says she carried him with hardship and gave birth to him with hardship. The father is commanded in the same breath, and the mother is described. What she is owed is not a sentiment. It is a debt for something already done that cannot be repaid.',
      sources: [
        quran(31, 14, { surahName: 'Luqman' }),
        quran(46, 15, { surahName: 'Al-Ahqaf' }),
      ],
    },
    {
      id: 'looks-like',
      heading: 'What does it actually look like?',
      body:
        'The Qur’an sets the bar at a syllable. It says that if one or both of them reach old age with you, do not say to them so much as "uff", the sound of being irritated, and do not push them away, but speak to them a noble word. Then it goes further and asks for the wing of humility to be lowered to them out of mercy. Nothing about that is about grand gestures. It is about tone of voice on a bad day.',
      sources: [quran(17, [23, 24], { surahName: 'Al-Isra' })],
      notes: [
        note(
          'practical',
          'The command sits directly after the command to worship God alone, in the same sentence. That placement is the point being made.',
        ),
      ],
    },
    {
      id: 'limit',
      heading: 'What if they ask me to do something wrong?',
      body:
        'There is a limit, and the Qur’an states it while keeping everything else in place. If they press you to associate anything with God, do not obey them in that. The verse that says so still calls for goodness to them, and elsewhere the same instruction adds that you keep company with them in this world in a good way. So the refusal is narrow. It covers the thing being asked, not the relationship.',
      sources: [
        quran(29, 8, { surahName: 'Al-Ankabut' }),
        general(
          'How wide the refusal is, and what still stands after it, is the reading of the verses quoted here. Anything specific belongs with a scholar who can be asked questions back.',
        ),
      ],
      notes: [
        note(
          'practical',
          'If your parents are not Muslim, or do not know yet, the family page answers those questions rather than this one.',
          { sources: [] },
        ),
      ],
    },
  ],
};
