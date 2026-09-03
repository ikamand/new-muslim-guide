import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * The page that makes the app's own apparatus legible. `model.ts` has carried
 * `differs` notes with attributed positions since the metadata layer landed —
 * 50 of them now — and every one silently assumed the reader knew why a
 * religion would have four answers to a question. Without this page, a
 * year-two convert meeting a contradiction concludes somebody is lying.
 *
 * It is also the page `learn/being-corrected.ts` points at. That one tells
 * somebody what to DO when two people tell them opposite things; this one
 * tells them why it happens.
 *
 * ⚠️ It does not rank the schools, does not name which this app follows on any
 * given question, and does not tell anybody which to follow. It explains the
 * shape and stops.
 */
export const WHY_PEOPLE_DIFFER: Reference = {
  id: 'why-people-differ',
  surface: 'learn',
  title: 'Why people differ',
  subtitle: 'Four schools, one religion, and why that is not a contradiction',
  meta: {
    category: 'belief',
    difficulty: 'deeper',
    estimatedMinutes: 5,
    beginnerPriority: 4,
    relatedContent: [
      ref('reference', 'being-corrected'),
      ref('reference', 'rulings'),
      ref('reference', 'sunnah'),
    ],
  },
  quickFacts: [
    { label: 'Schools', value: 'Four, and all four are Sunni', emphasis: true },
    { label: 'Not', value: 'Sects, denominations, or rival religions' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is a madhhab?',
      body:
        'A school of legal reasoning. Four are followed today, Hanafi, Maliki, Shafiʿi and Hanbali, each named after a scholar of the first centuries, and every one of them is Sunni. They are not denominations and not sects. They are four careful attempts at the same question: given the Qur’an and the Sunnah, what exactly follows?\n\nMost Muslims you meet follow one, usually the one their country follows, and most have never thought about it, in the way most people have never thought about the grammar of the language they speak.',
    },
    {
      id: 'why',
      heading: 'Why would there be four answers?',
      body:
        'Because the texts do not spell out every case, and reading them takes judgement. Two scholars can hold the same narration, agree that it is authentic, and still reach different conclusions about what it requires. One reads a command as binding, the other as strongly encouraged. One has a narration the other never received.\n\nThat is not a flaw discovered later. It was expected. The Prophet ﷺ said that a judge who strives to reach the right answer is rewarded even when he gets it wrong, and rewarded twice when he gets it right. A religion that rewards a wrong answer reached honestly is a religion that expects careful people to disagree.',
      sources: [hadith('bukhari', '7352')],
    },
    {
      id: 'scale',
      heading: 'How much do they actually disagree about?',
      body:
        'Far less than the noise suggests. No one differs about the five prayers, the fast of Ramadan, or what is forbidden. The differences are in the detail of practice, such as where the hands rest, whether the intention is said aloud and how many times something is wiped, and in the harder edges of law.\n\nIf you learned to pray from this app and prayed behind an imam from any of the four, you would be praying correctly. That is worth knowing before somebody tells you otherwise.',
      notes: [
        note(
          'agreed',
          'That the four schools are all within Sunni Islam, and that following any of them is following Islam, is not itself a matter of dispute.',
        ),
      ],
    },
    {
      id: 'this-app',
      heading: 'Which one does this app teach?',
      body:
        'One clear way, on purpose, because somebody learning to pray needs a path rather than a comparison table. Where a difference is one you will actually meet, at a mosque, from a friend or in a book, the app marks it and says what the other positions are, rather than pretending there is only one.\n\nSo when you see a note saying that scholars differ, that is not the app hedging. It is the app telling you in advance about a conversation you are going to have.',
      sources: [
        general(
          'A statement of this app’s own approach, not a ruling. What the schools hold is cited above; how this app presents it is an editorial decision.',
        ),
      ],
    },
    {
      id: 'which',
      heading: 'Do I have to pick one?',
      body:
        'Not on day one, and probably not for a long time. In practice most converts end up following whichever school their mosque follows, which is a perfectly ordinary way to arrive at it and requires no decision at all.\n\nWhat is worth avoiding is assembling your own from whichever answer is easiest in each case. Not because anybody is policing it, but because that stops being a considered position and becomes a preference wearing a scholar’s name.',
      notes: [
        note(
          'practical',
          'If somebody asks which madhhab you follow and you have no answer, "I pray with my local mosque" is a complete one.',
        ),
      ],
    },
  ],
};
