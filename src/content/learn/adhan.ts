import { note, ref } from '../model';
import { hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over a checked citation.
 *
 * The app had nothing on the adhān at all; the word appeared only as the name
 * of a book in a Bukhari citation. Somebody hears it out of a phone or a
 * street and does not know it is a call rather than an alarm, that it happens
 * five times a day, or that there is something to say back.
 *
 * ⚠️ The WORDS of the adhān are deliberately not printed here. Hisn al-Muslim's
 * "Adhkār of the Adhān" is already in this app, fetched from its publisher and
 * carrying the book's own text, and printing a second copy of the same words
 * from a different source is how two versions of one text end up in one app.
 * This page explains and points there.
 */
export const ADHAN: Reference = {
  id: 'adhan',
  surface: 'learn',
  title: 'The call to prayer',
  subtitle: 'What the adhān is, and what to do when you hear it',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 2,
    relatedContent: [ref('reference', 'mosque'), ref('reference', 'before-prayer')],
  },
  quickFacts: [
    { label: 'How often', value: 'Five times a day, at the prayer times', emphasis: true },
    { label: 'What it is', value: 'An announcement, not an alarm' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What am I hearing?',
      body:
        'The adhān is the announcement that a prayer’s time has come in. It is called out — from a mosque, from a phone, sometimes by one person in a room — and it happens five times a day at the times in this app.\n\nIt is not a summons you are late for and it is not a countdown. It marks the opening of a window, and the window is usually hours long.',
    },
    {
      id: 'say-back',
      heading: 'Am I supposed to say something back?',
      promote: 'hero',
      body:
        'Quietly repeating what the caller says, line by line, is the ordinary thing to do while it is happening — and there is a short duʿa said afterwards. Neither is obligatory, and neither is complicated.',
      sources: [hadith('bukhari', '611')],
      notes: [
        note(
          'practical',
          'If you do not know the words yet, listening is enough. Nobody is watching, and nobody starts out knowing them.',
        ),
      ],
    },
    {
      id: 'second-call',
      heading: 'Why did it happen twice?',
      body:
        'The adhān announces the time. A second, shorter call — the iqāmah — is given immediately before a congregation actually starts praying. If you are in a mosque and hear a second one a few minutes after the first, that is people standing up to pray, not a mistake.',
    },
    {
      id: 'not-a-deadline',
      heading: 'Does this mean I am late?',
      body:
        'Hearing the adhān for a prayer you have not prayed does not mean you are late. It means that prayer has just become available. The times card on the Today screen shows when each window closes, which is the part worth knowing.',
      notes: [
        note(
          'practical',
          'Mosques call at slightly different minutes from a calculated timetable. If your mosque differs from this app, follow the mosque.',
        ),
      ],
    },
  ],
};
