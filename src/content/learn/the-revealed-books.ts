import { note, ref } from '../model';
import { general, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance. Creed: a qualified reader before release.
 *
 * The third lesson of "What you believe more deeply"
 * (`docs/curriculum-update-plan.md`). Scoped away from
 * `what-is-the-quran.ts`, which is linked and not repeated: nothing here
 * describes the Qur'an's shape, its chapters, or how to start reading it.
 * This page is about the others, and what believing in them commits a
 * convert to.
 *
 * Sources, each opened in the corpus: Qur'an 4:136 (believe in the Book
 * sent down and the Scripture sent before), 87:19 (the scriptures of
 * Ibrahim and Musa), 5:44 (the Tawrat, with guidance and light), 4:163
 * (the Zabur given to Dawud), 5:46 (the Injil given to ʿIsa, confirming the
 * Tawrat), 2:79 (woe to those who write scripture with their own hands and
 * say it is from Allah), 5:48 (the Qur'an confirming what preceded it and
 * a criterion over it), 15:9 (preserved, already cited on the Qur'an page).
 *
 * The third section is the one a reviewer should read first. It states the
 * standard Sunni position, that the earlier books were sent and that what
 * circulates today is not guaranteed to be them as sent, and it states it
 * gently, because the reader grew up with one of those books and may still
 * love it.
 */
export const THE_REVEALED_BOOKS: Reference = {
  id: 'the-revealed-books',
  surface: 'learn',
  title: 'The revealed books',
  subtitle: 'The scriptures before the Qur’an, and what believing in them means',
  meta: {
    category: 'belief',
    difficulty: 'deeper',
    estimatedMinutes: 5,
    beginnerPriority: 4,
    relatedContent: [
      ref('article', 'books'),
      ref('reference', 'what-is-the-quran'),
      ref('reference', 'what-about-jesus'),
    ],
  },
  quickFacts: [
    { label: 'Named', value: 'Ibrahim’s scrolls, the Tawrat, Zabur, Injil and Qur’an' },
    { label: 'Believing', value: 'That Allah sent them, as He sent the Qur’an', emphasis: true },
    { label: 'Not', value: 'That every page in print today is what was sent' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What does believing in the books mean?',
      promote: 'hero',
      body:
        'That the Qur’an is not the first time Allah spoke to people, and that the earlier times were real. The Qur’an tells believers to believe in the Book sent down to the Messenger and in the Scripture sent down before him, in one sentence, as one instruction. A Muslim does not think revelation began in the seventh century. It began with the first prophet, and the Qur’an is the last of a line.',
      sources: [quran(4, 136, { surahName: 'An-Nisa' })],
    },
    {
      id: 'named',
      heading: 'Which books does the Qur’an name?',
      body: 'Five, given to five prophets, in this order.',
      bullets: [
        '**The scrolls of Ibrahim**: mentioned, and nothing of them survives.',
        '**The Tawrat**: given to Musa. The Qur’an says it held guidance and light, and that the prophets after him judged by it.',
        '**The Zabur**: given to Dawud, David.',
        '**The Injil**: given to ʿIsa, confirming the Tawrat before it, with guidance and light of its own.',
        '**The Qur’an**: given to Muhammad ﷺ, and the last.',
      ],
      sources: [
        quran(87, 19, { surahName: 'Al-Aʿla' }),
        quran(5, 44, { surahName: 'Al-Maʾidah' }),
        quran(4, 163, { surahName: 'An-Nisa' }),
        quran(5, 46, { surahName: 'Al-Maʾidah' }),
      ],
    },
    {
      id: 'the-bible',
      heading: 'Is that the Bible I grew up with?',
      body:
        'Partly, and this is worth saying carefully. Muslims believe the Tawrat and the Injil were sent, exactly as the Qur’an says. What Muslims do not believe is that the books on a shelf today are those revelations word for word as they were given. The Qur’an says plainly that some people wrote scripture with their own hands and then said it was from Allah. So a Muslim honours the revelation to Musa and to ʿIsa without being bound to every line of a modern edition, and without needing to decide which line is which.\n\nIf you loved the book you grew up with, nothing here asks you to despise it. Where it agrees with the Qur’an, the Qur’an confirms it. Where the two differ, the Qur’an is the one you follow.',
      sources: [quran(2, 79, { surahName: 'Al-Baqarah' })],
      notes: [
        note(
          'agreed',
          'That the earlier scriptures were sent by Allah is an article of faith. That the texts in circulation are not guaranteed to be those scriptures as sent is the settled Sunni position, and this page states it without going further.',
        ),
      ],
    },
    {
      id: 'the-quran',
      heading: 'What is different about the Qur’an?',
      body:
        'Two things, both stated by the Qur’an about itself. It confirms what came before it and stands as a criterion over it, which is why a Muslim reads the earlier books through it and not the other way round. And it is preserved: Allah says He sent it down and He will guard it. That promise is not made about any other book, and it is why the Arabic you recite in prayer is the same Arabic recited fourteen centuries ago.',
      sources: [
        quran(5, 48, { surahName: 'Al-Maʾidah' }),
        quran(15, 9, { surahName: 'Al-Hijr' }),
      ],
      notes: [
        note(
          'practical',
          'What the Qur’an is, and how to begin reading it, has its own page and its own tab. This one only says where it sits among the others.',
        ),
      ],
    },
    {
      id: 'now',
      heading: 'What do I do with this?',
      body:
        'Read the Qur’an as the book that was sent to you, and treat the earlier ones with respect rather than as rivals. When a relative quotes the Bible at you, you are not obliged to attack it. You can say that Muslims believe Allah sent scripture to Musa and to ʿIsa, that the Qur’an confirms what is true in it, and that you follow the Qur’an where they differ. That is the whole position, and it is a calm one to hold at a table.',
      sources: [
        general(
          'Practical advice on how to hold the position above in conversation, not a ruling. The position itself is the verses cited on this page.',
        ),
      ],
    },
  ],
};
