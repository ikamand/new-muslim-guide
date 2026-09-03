import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 30 Aug 2026 — model-written English over checked citations.
 * Unreviewed on substance; the pile is `docs/scholarly-review.md`.
 *
 * The one page docs/ramadan-mode.md adds. `learn/ramadan.ts` teaches the
 * month; this teaches the month in a house, office or school where nobody
 * else is keeping it — which is most converts' first Ramadan, and what the
 * loneliness research behind the Ramadan mode kept landing on. It rules on
 * almost nothing: the rulings live in the Ramadan page's own sections, and
 * this page answers the social situations around them.
 *
 * Citations, each opened in the corpus before it was printed:
 * - Bukhari 1894 — fasting is a shield; if someone fights or insults you,
 *   say "I am fasting". Read from `.cache/hadith/ara-bukhari.json` 1894.
 * - Qur'an 2:183 — fasting prescribed for you as for those before you.
 */
export const FASTING_ALONE: Reference = {
  id: 'fasting-alone',
  surface: 'learn',
  title: 'Fasting where nobody else is',
  subtitle: 'Ramadan in a house, office or school that isn’t keeping it',
  meta: {
    category: 'daily-life',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'ramadan'), ref('reference', 'work')],
  },
  quickFacts: [
    { label: 'Telling people', value: 'Allowed, not required. Your call', emphasis: true },
    { label: 'Lunch invitations', value: '“I’m fasting today” is a complete answer' },
  ],
  sections: [
    {
      id: 'normal',
      heading: 'Is it supposed to feel this strange?',
      body:
        'Ramadan is built as a shared month: shared pre-dawn meals, shared sunsets, whole cities changing rhythm. Keeping it alone, in a place running at its ordinary pace, is genuinely harder than keeping it among people who are also hungry. If your first Ramadan feels like swimming against a current, that is the situation, not a fault in your fasting.\n\nThe fast itself is exactly as valid alone as it would be in Mecca. Other people taking part is not a condition of yours.',
      sources: [quran(2, 183, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'work',
      heading: 'What do I say at work or school?',
      body:
        'You owe no one an announcement, and you are hiding nothing shameful. Both are true at once, and you choose where you stand between them. Many people simply decline lunch with “I’m good, thanks.” Saying “I’m fasting, it’s Ramadan” is also a complete answer, and most colleagues respond with curiosity rather than hostility.\n\nThe questions that follow are nearly always the same three. Not even water? No, not even water. The whole month? Daylight hours, every day. Isn’t that dangerous? Hundreds of millions of people do it every year, and the sick, the pregnant and the travelling are exempt.',
      notes: [
        note(
          'practical',
          'If people at work or at home do not know you are Muslim, you do not have to tell them in order to fast. A quiet “I’m not eating right now” has covered many first Ramadans. The Family page has more on telling people.',
        ),
      ],
    },
    {
      id: 'provoked',
      heading: 'What if someone gives me a hard time?',
      promote: 'hero',
      body:
        'The Prophet ﷺ gave an instruction for exactly this moment, and it is short. The fast is a shield, and if someone picks a fight or insults you while you are keeping it, you say “I am fasting” and leave it there. Out loud or under your breath, either way. The point is that the fast changes how you answer provocation, not only what you eat.',
      sources: [hadith('bukhari', '1894')],
    },
    {
      id: 'iftar-alone',
      heading: 'Is breaking the fast alone still Ramadan?',
      body:
        'An iftar for one, a date, a glass of water and a plate you made yourself in a quiet kitchen, is a full iftar, seen by the One you kept the fast for. The duʿa for breaking the fast is in the Duʿa tab, and the moment is yours either way.\n\nIt is still worth saying that this is the loneliest recurring moment of a Ramadan kept alone, and it does not have to stay that way.',
    },
    {
      id: 'mosque',
      heading: 'Where are all the other Muslims, then?',
      body:
        'At the mosque, every single evening. Ramadan is the one month of the year when a mosque runs a free communal meal at sunset, open to whoever walks in. Turning up alone is completely unremarkable, because half the room came alone. No one will ask why you are there. If anyone asks anything, it will be whether you have eaten.\n\nIf there is a month to make a mosque yours, it is this one. The night prayers afterwards are covered on the page about standing at night, and you can leave whenever you need to.',
      notes: [
        note(
          'practical',
          'Iftar time at the mosque follows the local sighting and the local minute, not this app’s calculation. When they differ, eat when the mosque eats.',
        ),
      ],
    },
  ],
};
