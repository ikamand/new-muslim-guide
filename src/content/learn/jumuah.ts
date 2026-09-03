import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * `docs/build-order.md` calls this the largest single gap in the app, and it
 * was: Jumuʿah was mentioned once, at `references.ts:522`, in a note advising a
 * first visit on a different day. Nothing said that it REPLACES Dhuhr rather
 * than adding to it, that it is two rakʿahs and not four, that the khutbah is
 * listened to in silence, when to arrive, or what to do if you arrive during
 * it. It is obligatory, weekly, and the most intimidating room a convert walks
 * into.
 *
 * ⚠️ The one place this states an exemption is that Jumuʿah is not required of
 * women, which is agreed. It does not enumerate the others — travel, illness —
 * because those have conditions on them and the app has no page for them yet.
 */
export const JUMUAH: Reference = {
  id: 'jumuah',
  surface: 'learn',
  title: 'Friday prayer',
  subtitle: 'What Jumuʿah is, and what happens in the room',
  meta: {
    category: 'community',
    difficulty: 'foundational',
    estimatedMinutes: 5,
    beginnerPriority: 2,
    tags: ['mosque'],
    relatedContent: [ref('reference', 'mosque'), ref('guide', 'dhuhr')],
  },
  quickFacts: [
    { label: 'Replaces', value: 'Dhuhr. It is not an extra prayer', emphasis: true },
    { label: 'Length', value: 'A talk, then two rakʿahs' },
    { label: 'Arrive', value: 'Before the talk starts' },
  ],
  sections: [
    {
      id: 'replaces',
      heading: 'Is this an extra prayer?',
      promote: 'hero',
      body:
        'No. On Friday, the midday prayer is done differently: instead of praying Dhuhr on your own, you go to a mosque, listen to a talk, and pray two rakʿahs behind the imam. That is the whole of it, and it takes the place of Dhuhr rather than being added to it.\n\nIf you pray Jumuʿah you do not then pray Dhuhr. People new to this often do both, which is not required of them.',
      sources: [quran(62, 9, { surahName: 'Al-Jumuah' })],
    },
    {
      id: 'who',
      heading: 'Do I have to go?',
      body:
        'For men who can get there, yes — it is obligatory, not recommended, and that is the one thing about Friday worth being clear on. Women may attend and are welcome; it is not required of them, and a woman who prays Dhuhr at home on a Friday has done what is asked.',
      notes: [
        note(
          'agreed',
          'That Jumuʿah is not obligatory on women is agreed across the schools. Attending is not discouraged — plenty of mosques have a full women’s section on a Friday.',
        ),
      ],
    },
    {
      id: 'shape',
      heading: 'What actually happens?',
      body:
        'You arrive, take your shoes off, and pray two short rakʿahs on your own before sitting down. Then the imam gives a talk from the front — usually twenty minutes, in two parts with a short sit in between. When it ends, everyone stands and prays two rakʿahs together. Then it is over and people leave.',
      bullets: [
        'Two short rakʿahs when you come in, before you sit.',
        'The **khutbah** — the talk. Two parts, with a brief sit between them.',
        'Two rakʿah in congregation, led aloud by the imam.',
      ],
      sources: [hadith('bukhari', '930')],
    },
    {
      id: 'silence',
      heading: 'Can I talk during the talk?',
      body:
        'No, and this is the part visitors most often get wrong. The khutbah is listened to in silence — not whispered over, not scrolled through. The Prophet ﷺ said that even telling the person beside you to be quiet, while the imam is speaking, is itself idle talk. If somebody asks you something, a shake of the head is the answer.',
      sources: [hadith('bukhari', '934')],
      notes: [
        note(
          'practical',
          'Phones on silent before you sit down, not after it starts. Everyone will hear you fumbling for it.',
        ),
      ],
    },
    {
      id: 'when',
      heading: 'When should I get there?',
      body:
        'Before the talk begins, which usually means ten or fifteen minutes before the advertised time. Coming early is encouraged in its own right, and it also spares you walking in front of a seated room. Washing and putting on clean clothes before you go is part of the day.',
      sources: [hadith('bukhari', '881'), hadith('bukhari', '929')],
    },
    {
      id: 'late',
      heading: 'What if I arrive while it is happening?',
      body:
        'Come in quietly and sit down where there is room. If you arrive during the talk, do not walk through the rows to find a better spot — and you still pray the two short rakʿahs first, briefly, because the Prophet ﷺ told a man who came in during the khutbah to stand and pray them.\n\nIf you arrive after the congregation has already started praying, join the line where you are and follow the imam from wherever he has got to. When he finishes and gives salam, do not leave: stand back up and pray the rakʿahs you missed on your own. That last part is what completes your prayer.',
      sources: [hadith('bukhari', '636')],
      notes: [
        note(
          'practical',
          'Nobody minds a latecomer. Walking across the front of a room mid-talk is the only thing that draws a look.',
        ),
      ],
    },
    {
      id: 'first-time',
      heading: 'What if it is my first time?',
      body:
        'Then stand at the back, watch, and copy. Nobody is examining you, and every person in that room was new to it once. You do not have to speak to anyone, you do not have to introduce yourself, and you can leave straight afterwards.',
      sources: [
        general(
          'Ordinary orientation for a first visit, claiming no textual authority. The etiquette above is what the narrations state; this is what a room is like.',
        ),
      ],
      notes: [
        note(
          'practical',
          'If you would rather see the room before a Friday, go on a quieter day first. The mosque page covers that.',
        ),
      ],
    },
  ],
};
