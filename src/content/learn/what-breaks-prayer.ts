import { note, ref } from '../model';
import { hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The specific thing to look at: the first section lists four things that
 * break the prayer and cites none of them there. Two are evidenced further
 * down — speaking by Muslim 537a, and the doubt case by Bukhari 137 — but
 * "eating or drinking" and "turning away from the qibla" are stated flat, and
 * this is a list a beginner will act on directly. It is also the shortest
 * possible version of a subject with real detail behind it; whether that
 * shortness is a kindness or a half-teaching is a judgement for a reviewer.
 */
export const WHAT_BREAKS_PRAYER: Reference = {
  id: 'what-breaks-prayer',
  surface: 'learn',
  title: 'What breaks the prayer',
  subtitle: 'And what only feels like it does',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    tags: ['mistakes'],
    relatedContent: [ref('reference', 'lost-count'), ref('guide', 'wudu')],
  },
  sections: [
    {
      id: 'breaks',
      heading: 'What does break it',
      body:
        'Losing your wudu. Speaking on purpose. Eating or drinking. Turning away from the qibla, or leaving the prayer entirely. If one of these happens, stop, put it right, and start the prayer again — that is the whole remedy.',
    },
    {
      id: 'speaking',
      heading: 'Speaking',
      body:
        'A companion spoke during the prayer without knowing he could not, and the Prophet ﷺ corrected him afterwards without anger — telling him this prayer is not the place for ordinary speech. Doing it by mistake, before you knew, is not a sin. You simply repeat the prayer.',
      sources: [
        hadith('muslim', '537a', {
          book: 5,
          bookName: 'The Book of Mosques and Places of Prayer',
          inBookReference: 'Book 5, Hadith 39',
        }),
      ],
    },
    {
      id: 'doubt',
      heading: 'What does not break it',
      body:
        'Doubt does not. Someone asked the Prophet ﷺ about feeling as though they had passed wind mid-prayer, and he said not to leave the prayer unless they heard a sound or smelled something. Uncertainty is not enough. Carry on.',
      sources: [
        hadith('bukhari', '137', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 3',
        }),
      ],
      notes: [
        note(
          'agreed',
          'This is the hadith to remember if you find yourself checking constantly. The rule is deliberately strict about certainty, because doubt would otherwise end every prayer.',
          {
            sources: [
              hadith('bukhari', '137', {
                book: 4,
                bookName: "Ablutions (Wudu')",
                inBookReference: 'Book 4, Hadith 3',
              }),
            ],
          },
        ),
      ],
    },
    {
      id: 'mistakes',
      heading: 'Ordinary mistakes',
      body:
        'Losing count, forgetting a sitting, adding a movement, saying something in the wrong place — none of these break the prayer. They are fixed with two extra prostrations at the end, which the app covers separately. A beginner will do all of these, and none of them is a disaster.',
      notes: [
        note(
          'practical',
          'The most common beginner mistake is starting the prayer over. Almost nothing requires that, and restarting turns a small slip into a long one.',
        ),
      ],
    },
  ],
};
