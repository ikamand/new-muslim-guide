import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * ⚠️ This page names no DATE, and that is deliberate rather than an omission.
 * `content/seasons.ts` records why at length: the app's Hijri date comes from
 * the Umm al-Qura calculation, months actually begin by local moon sighting,
 * and the two differ often enough that telling somebody "Eid is today" on the
 * wrong day is the one thing this calculation cannot support. So the page
 * describes what happens and tells the reader to find out locally.
 */
export const EID: Reference = {
  id: 'eid',
  surface: 'learn',
  title: 'Eid',
  subtitle: 'The two days, and what happens on them',
  meta: {
    category: 'community',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    tags: ['mosque', 'family'],
    relatedContent: [ref('reference', 'ramadan'), ref('reference', 'islamic-calendar')],
  },
  quickFacts: [
    { label: 'How many', value: 'Two a year', emphasis: true },
    { label: 'The prayer', value: 'Morning, once, and it is short' },
    { label: 'The date', value: 'Ask locally — it is decided by sighting' },
  ],
  sections: [
    {
      id: 'two',
      heading: 'What is Eid?',
      body:
        'There are two, and only two. **Eid al-Fitr** is the morning after Ramadan ends. **Eid al-Adha** falls about ten weeks later, during the days of Hajj. Both begin with a prayer shortly after sunrise, and the rest of the day is food and family.\n\nThey are not solemn. People wear their best clothes, children get money, and the mosque is fuller than you have ever seen it.',
    },
    {
      id: 'when',
      heading: 'When exactly is it?',
      body:
        'Ask your local mosque, and ask a day or two before. The month begins by sighting the new moon, so the date is not settled until it is — and mosques in the same city sometimes differ by a day. This app deliberately does not tell you, because a calculated date is wrong often enough to matter here.',
      notes: [
        note(
          'practical',
          'If two mosques near you announce different days, that is an old and ordinary disagreement. Follow the one you pray with.',
        ),
      ],
    },
    {
      id: 'prayer',
      heading: 'What is the Eid prayer like?',
      body:
        'Short, and unlike the daily prayers in two ways: it is two rakʿah with several extra **Allāhu akbar** said before the recitation, and the talk comes AFTER the prayer rather than before it. There is no adhān and no iqāmah for it.\n\nIf you do not know when the extra takbīrs come, watch the row in front and raise your hands when they do.',
      sources: [hadith('bukhari', '956')],
    },
    {
      id: 'morning',
      heading: 'What do people do before it?',
      promote: 'hero',
      body:
        'Wash, put on the best clothes they own, and go. On Eid al-Fitr specifically the Prophet ﷺ would eat something — dates — before leaving, which is worth knowing because on every other festival morning you might assume you were meant to be fasting. You are not; fasting on the two Eids is not done.',
      sources: [hadith('bukhari', '953')],
    },
    {
      id: 'alone',
      heading: 'What if I have nobody to spend it with?',
      body:
        'This is the hardest day of the year for a lot of converts, and it is worth saying plainly rather than leaving you to discover it. A family day is a hard day to have no family in.\n\nGo to the prayer. Mosques are at their most welcoming that morning and somebody will almost certainly invite you to eat — if nobody does, it is fair to say to a person there that it is your first Eid. That sentence tends to end with you at a table.',
      sources: [
        general(
          'Ordinary pastoral orientation, claiming no textual authority. Named here because every convert-support source surveyed reports the two Eids as the loneliest days in a convert’s year.',
        ),
      ],
      notes: [
        note(
          'practical',
          'Plan it a few days ahead rather than on the morning. Eid arranged in advance is a different day from Eid improvised at 9am.',
        ),
      ],
    },
  ],
};
