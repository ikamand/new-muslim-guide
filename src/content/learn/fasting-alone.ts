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
        'Ramadan is built as a shared month — shared pre-dawn meals, shared sunsets, whole cities changing rhythm. Keeping it alone, in a place running on its ordinary rhythm, is genuinely harder than keeping it surrounded by people who are also hungry. If your first Ramadan feels like swimming against a current, that is the situation, not a fault in your fasting.\n\nThe fast itself is exactly as valid alone as in Makkah. Nothing about other people’s participation is a condition of yours.',
      sources: [quran(2, 183, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'work',
      heading: 'What do I say at work or school?',
      body:
        'You owe nobody an announcement, and you are hiding nothing shameful — both are true at once, and you get to pick your point on that line. Many people simply decline lunch with “I’m good, thanks.” Saying “I’m fasting — it’s Ramadan” is also a complete answer, and most colleagues respond with curiosity, not hostility.\n\nThe questions that follow are nearly always the same three: not even water? (no, not even water), the whole month? (daylight hours, every day), isn’t that dangerous? (hundreds of millions of people do it every year, and the sick, pregnant and travelling are exempt).',
      notes: [
        note(
          'practical',
          'If you are not out as a Muslim where you work or live, you do not have to be out to fast. A quiet “I’m not eating right now” has covered many first Ramadans, and the page on telling your family applies here too.',
        ),
      ],
    },
    {
      id: 'provoked',
      heading: 'What if someone gives me a hard time?',
      promote: 'hero',
      body:
        'The instruction for exactly this moment is short: the fast is a shield, and if someone picks a fight or insults you while you are keeping it, you say “I am fasting” and leave it there. Out loud or under your breath — the point is that the fast changes how you answer provocation, not just what you eat.',
      sources: [hadith('bukhari', '1894')],
    },
    {
      id: 'iftar-alone',
      heading: 'Breaking fast alone — is that even Ramadan?',
      body:
        'An iftar for one — a date, a glass of water, a plate you made yourself in a quiet kitchen — is a full iftar, witnessed by the One you kept the fast for. The duʿa at breaking the fast is in this app’s Duʿa tab, and the moment belongs to you either way.\n\nIt is still worth saying: this is the loneliest recurring moment of a solo Ramadan, and it does not have to stay solo.',
    },
    {
      id: 'mosque',
      heading: 'Where are all the other Muslims, then?',
      body:
        'At the mosque, every single evening. Ramadan is the one month a year when a mosque runs a free communal meal at sunset, open to whoever walks in — and when showing up alone is completely unremarkable, because half the room came alone. Nobody will ask why you are there. If anyone asks anything, it will be whether you have eaten.\n\nIf there is a month to make a mosque yours, it is this one. The night prayers afterwards are covered in the page on standing at night, and you can leave whenever you need to.',
      notes: [
        note(
          'practical',
          'Iftar time at the mosque follows the local sighting and the local minute, not this app’s calculation. When they differ, eat when the mosque eats.',
        ),
      ],
    },
  ],
};
