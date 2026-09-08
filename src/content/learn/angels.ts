import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance. Creed: a qualified reader before release.
 *
 * The first lesson of "What you believe more deeply", the Book 3 chapter
 * Iyad's curriculum update adds (`docs/curriculum-update-plan.md`). It opens
 * from the two-minute article record in `iman.ts` and goes one step
 * further: what angels are made of, which ones a reader will hear named,
 * and what they do around a person. It stops well before the theology.
 *
 * Sources, each opened in the corpus: Muslim 2996 (angels created from
 * light), Qur'an 66:6 (they do not disobey what they are commanded), 2:97
 * and 2:98 (Jibril brought the Qur'an down; Mikail named beside him),
 * 32:11 (the angel of death), 82:10–12 (the noble recorders), Bukhari 555
 * (the angels who gather at Fajr and ʿAsr and are asked about you), Bukhari
 * 445 (they ask forgiveness for the one who stays in his place of prayer),
 * 3:80 (no prophet would order you to take angels as lords). Qur'an 35:1,
 * the wings, was read and left out: it is true and it invites picturing,
 * which the article record already tells the reader not to attempt.
 */
export const ANGELS: Reference = {
  id: 'angels',
  surface: 'learn',
  title: 'The angels',
  subtitle: 'What they are, which ones you will hear named, and what they do near you',
  meta: {
    category: 'belief',
    difficulty: 'deeper',
    estimatedMinutes: 5,
    beginnerPriority: 4,
    relatedContent: [
      ref('article', 'angels'),
      ref('reference', 'who-is-allah'),
      ref('reference', 'what-is-the-quran'),
    ],
  },
  quickFacts: [
    { label: 'Made of', value: 'Light. Created, and never disobedient', emphasis: true },
    { label: 'Named', value: 'Jibril, Mikail, the angel of death, the two who record' },
    { label: 'Prayed to', value: 'Never. They are servants, not go-betweens' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What are angels?',
      promote: 'hero',
      body:
        'Created beings, made from light, who do exactly what Allah tells them and nothing else. The Qur’an says of them that they do not disobey Allah in what He commands them, but do what they are ordered. They are not gods, not the souls of the dead, and not a decoration in the story. They are workers, and they are everywhere the work is.',
      sources: [
        quran(66, 6, { surahName: 'At-Tahrim' }),
        hadith('muslim', '2996', {
          book: 55,
          bookName: 'The Book of Zuhd and Softening of Hearts',
          inBookReference: 'Book 55, Hadith 78',
        }),
      ],
    },
    {
      id: 'named',
      heading: 'Which ones will I hear named?',
      body: 'Four come up constantly, and the Qur’an names or describes each.',
      bullets: [
        '**Jibril**: the angel of revelation. The Qur’an says it was he who brought it down upon the Prophet’s ﷺ heart.',
        '**Mikail**: named beside Jibril in the Qur’an. You will hear him mentioned; you are not asked to know more.',
        '**The angel of death**: entrusted with taking each soul when its time comes, and returning it to its Lord.',
        '**The two recorders**: one on each side, noble, writing. The Qur’an says they know whatever you do.',
      ],
      sources: [
        quran(2, [97, 98], { surahName: 'Al-Baqarah' }),
        quran(32, 11, { surahName: 'As-Sajdah' }),
        quran(82, [10, 12], { surahName: 'Al-Infitar' }),
      ],
    },
    {
      id: 'near',
      heading: 'What do they do around me?',
      body:
        'More than you would guess, and the narrations describe it in ordinary detail. Angels come to you in shifts, by night and by day, and the shifts meet at Fajr and at ʿAsr. The ones who spent the night with you go up and are asked about you, and answer that they left you praying and found you praying. While you sit in the place you prayed, before you move, they ask forgiveness for you.\n\nNone of that is a threat. It is the reason an empty room at dawn is not empty, and the reason nothing you do for Allah goes unrecorded, including the things nobody else ever saw.',
      sources: [
        hadith('bukhari', '555', {
          book: 9,
          bookName: 'Times of the Prayers',
          inBookReference: 'Book 9, Hadith 32',
        }),
        hadith('bukhari', '445'),
      ],
    },
    {
      id: 'prayed-to',
      heading: 'Do Muslims pray to angels?',
      body:
        'No, and the Qur’an rules it out in the same breath as praying to prophets: no messenger sent by Allah would order people to take angels or prophets as lords. They carry nothing to Allah on your behalf. You ask Him, directly, in your own words, and the angels write it down.',
      sources: [quran(3, 80, { surahName: 'Al-Imran' })],
    },
    {
      id: 'picture',
      heading: 'Do I need to picture them?',
      body:
        'No. The Qur’an describes them in a few lines and leaves the rest unsaid, and so should you. What belief in them asks is smaller and more useful than a picture: that you take the recorders seriously, that you know who brought the book you recite from, and that you stop thinking of yourself as unwatched.',
      sources: [
        general(
          'Ordinary explanation of what the article asks for. The six articles page says the same in two lines; this page says why it is enough.',
        ),
      ],
      notes: [
        note(
          'practical',
          'When a mosque feels empty at Fajr, remember the shift change. You are being counted.',
        ),
      ],
    },
  ],
};
