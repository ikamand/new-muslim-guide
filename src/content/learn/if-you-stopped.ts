import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * The other half of Phase 11's pilot, and picked to be as unlike a janāzah as
 * the list allows: nobody is present for this one. It is three weeks of missed
 * Fajr, the shame that follows, and a person who has quietly decided they were
 * never really Muslim.
 *
 * ⚠️ `learn/repentance.ts` already covers the theology and covers it well. This
 * is not that page. This is the specific shape of a CONVERT relapse, and the
 * question underneath it — whether coming back means starting over — which
 * `repentance.ts` never had reason to ask.
 *
 * The tone is the substance. Every convert-support source the research
 * surveyed named this moment as where people leave, and they leave from the
 * shame rather than from the missed prayers.
 */
export const IF_YOU_STOPPED: Reference = {
  id: 'if-you-stopped',
  surface: 'learn',
  title: 'If you stopped for a while',
  subtitle: 'Coming back, and why it is not starting again',
  meta: {
    category: 'character',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [
      ref('reference', 'repentance'),
      ref('reference', 'missed'),
      ref('reference', 'minimum-prayer'),
    ],
  },
  quickFacts: [
    { label: 'Your shahada', value: 'Still stands. You do not say it again', emphasis: true },
    { label: 'To come back', value: 'Pray the next prayer' },
  ],
  sections: [
    {
      id: 'stands',
      heading: 'Am I still Muslim?',
      promote: 'hero',
      body:
        'Yes. Missing prayers — for a week, for a month, for longer — does not undo your shahada, and you do not say it again to come back. There is no re-entry, no ceremony, and nobody to tell.\n\nThat is worth reading twice, because the belief that you have to start again is the single most common reason people do not.',
      sources: [quran(39, 53, { surahName: 'Az-Zumar' })],
    },
    {
      id: 'how',
      heading: 'How do I actually come back?',
      body:
        'You pray the next prayer. That is the whole procedure. Not a plan, not a fresh start on Monday, not catching up on everything first — the next one, whenever it is, even if it is in twenty minutes and you do it badly.',
      notes: [
        note(
          'practical',
          'If the full prayer feels like too much tonight, this app has a page on the least you can do. Use it. A short prayer tonight beats a perfect one you keep postponing.',
        ),
      ],
    },
    {
      id: 'shame',
      heading: 'Why does it feel so much worse than it is?',
      body:
        'Because a gap makes people feel like frauds, and feeling like a fraud is much heavier than missing a prayer. Converts get this especially hard: there is often nobody who knew you before, so the gap feels like evidence that the whole thing was a phase.\n\nIt is not evidence of anything. The Prophet ﷺ said that he himself sought forgiveness and turned back to God more than seventy times in a day. Turning back is not the exception in this religion. It is the normal condition of being a person in it.',
      sources: [hadith('bukhari', '6307')],
    },
    {
      id: 'missed',
      heading: 'What about all the prayers I missed?',
      body:
        'They are a separate question from whether you are back, and they are not a debt you have to clear before you are allowed to start. Deal with the next prayer first. The app has a page on missed prayers for when you want to think about the rest, and it will keep.',
      notes: [
        note(
          'practical',
          'Anybody who tells you to count up months of missed prayers before praying tonight has the order backwards.',
        ),
      ],
    },
    {
      id: 'nobody-knows',
      heading: 'Do I have to tell anyone?',
      body:
        'No. Not a friend, not an imam, not a group chat. There is no confession in Islam and nothing here needs a witness. If you want to tell somebody because carrying it alone is heavy, that is a good reason — but it is your reason, not a requirement.',
    },
    {
      id: 'again',
      heading: 'What if it happens again?',
      body:
        'Then you come back again, the same way, and it counts the same. Nothing about this gets used up, and the door does not close a second time any more than it did the first.',
      notes: [
        note(
          'practical',
          'People often relapse in a pattern — the same month, the same trigger. Noticing yours is more useful than promising it will not happen.',
        ),
      ],
    },
  ],
};
