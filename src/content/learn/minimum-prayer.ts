import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * `docs/build-order.md` calls this the most valuable page the app could add,
 * and the reason is a gap the rest of the app creates. It teaches Fajr as 23
 * steps, which is right, and nowhere says what the least is. Somebody with
 * four minutes and no confidence reads 23 steps as a threshold they cannot
 * meet tonight, and the honest answer — that a short, plain prayer is a
 * prayer — is the difference between praying badly and not praying.
 *
 * Every element named here is from Bukhari 757, the narration of the man who
 * prayed badly, in which the Prophet ﷺ is asked to teach the prayer and lists
 * exactly these. Nothing is added to that list and nothing is left out of it.
 */
export const MINIMUM_PRAYER: Reference = {
  id: 'minimum-prayer',
  surface: 'learn',
  title: 'The least you can do',
  subtitle: 'A short, plain prayer is a prayer',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 1,
    relatedContent: [
      ref('reference', 'before-prayer'),
      ref('reference', 'al-fatihah'),
      ref('guide', 'fajr'),
    ],
  },
  quickFacts: [
    { label: 'How long', value: 'A couple of minutes', emphasis: true },
    { label: 'Required', value: 'Six things, and you know most of them already' },
  ],
  sections: [
    {
      id: 'counts',
      heading: 'Is a short prayer still a prayer?',
      body:
        'Yes. The guides in this app walk you through a prayer at its fullest: every position, every word, in order. That is what to aim at, but it is not the bar. A prayer done briefly and plainly, with the essentials in place, is a prayer. It is not half a prayer, and it does not need making up later.\n\nReading "23 steps" on a night when you have four minutes and no confidence can make praying feel out of reach. It is not.',
      notes: [
        note(
          'practical',
          'On a hard day, the least is the right amount.',
        ),
      ],
    },
    {
      id: 'essentials',
      heading: 'What actually has to be there?',
      body:
        'A man once prayed in the mosque and the Prophet ﷺ told him three times to go back and pray, because he had not prayed. The man asked to be taught, and what he was taught is the shortest description of a prayer there is.',
      bullets: [
        'Say **Allāhu akbar** to begin.',
        'Recite what you know of the Qur’an.',
        'Bow, and settle there. Not a dip on the way past.',
        'Stand back up straight.',
        'Prostrate, and settle there.',
        'Sit up calmly between the prostrations, and do the same through the rest of it.',
      ],
      sources: [hadith('bukhari', '757')],
      notes: [
        note(
          'practical',
          'The word doing the work is "settle". Rushing is the one thing that narration corrects, and it corrects it three times.',
        ),
      ],
    },
    {
      id: 'if-you-only-know',
      heading: 'What if I only know Al-Fatihah?',
      body:
        'Then you have what you need. Al-Fatihah is the part the prayer cannot do without, and anything after it is extra rather than necessary. If you are still learning the words, read them from the screen. No one has to know them by heart before they are allowed to start.',
    },
    {
      id: 'on-time',
      heading: 'Is it better to rush it or pray it late?',
      promote: 'hero',
      body:
        'The prayer has fixed times, and the time is part of it. Given the choice between a short prayer inside its window and a careful one after the window has closed, pray the short one. The full shape will come later. The time will not come back.',
      sources: [quran(4, 103, { surahName: 'An-Nisa' })],
    },
  ],
};
