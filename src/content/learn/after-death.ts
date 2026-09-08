import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance. Creed, and the page in this chapter a qualified
 * reader should open first.
 *
 * One page for the whole arc, where Iyad's curriculum update first proposed
 * two ("The Day of Judgment" and "What happens after death"). Splitting it
 * would put the grave alone on a page, which is the frightening version by
 * construction; here it is one calm section among six. The first section
 * is the hero, because a hero renders at the top of the page wherever it
 * sits in the list, and the arc must read in order; the reckoning's verse
 * is printed inline as a quote instead. Iyad's call, 7 Sep 2026 (`docs/curriculum-update-plan.md`): the
 * questioning in the grave is taught, in one plain paragraph, because a
 * convert hears of it from someone within the year and the calm version
 * should arrive first.
 *
 * ## The register
 *
 * Not fear-based, by instruction. Every hard thing on this page is followed
 * by the text that balances it: the grave's question by the answer the
 * reader already gives five times a day, the reckoning by the narration
 * that nobody enters Paradise by deeds alone, the Fire by the line Allah
 * wrote about Himself. Nothing graphic is quoted; the corpus has plenty and
 * it was left there.
 *
 * ## Sources, each opened in the corpus
 *
 * Qur'an 3:185 (every soul tastes death), 23:99–100 (a barrier behind them
 * until the Day), 36:78–79 (who gives life to bones), 17:13–14 (read your
 * record), 99:7–8 (an atom's weight), 21:47 (the scales, no soul wronged),
 * 32:17 (no soul knows what is hidden for them). Bukhari 1338 (the two
 * angels' question and the believer's answer), 6463 (no one's deeds save
 * him unless Allah bestows His mercy), 3244 (what no eye has seen), 7404
 * (My mercy overcomes My anger), Muslim 1631 (three things that continue
 * after death). Bukhari 1338 is cited for the question it records; the
 * fuller three-question form is in Abu Dawud and is not cited, because
 * this page does not need it and did not open it.
 */
export const AFTER_DEATH: Reference = {
  id: 'after-death',
  surface: 'learn',
  title: 'What happens after death',
  subtitle: 'From this life to the next, in order, and calmly',
  meta: {
    category: 'belief',
    difficulty: 'deeper',
    estimatedMinutes: 7,
    beginnerPriority: 4,
    relatedContent: [
      ref('article', 'last-day'),
      ref('reference', 'janazah'),
      ref('reference', 'repentance'),
    ],
  },
  quickFacts: [
    { label: 'The order', value: 'Death, the grave, the wait, the rising, the reckoning, home' },
    { label: 'Held to', value: 'An atom’s weight, and nobody is wronged', emphasis: true },
    { label: 'Entered by', value: 'Allah’s mercy. Deeds alone save no one, he ﷺ said' },
  ],
  sections: [
    {
      id: 'dying',
      heading: 'What happens when I die?',
      /* The hero, because a hero renders at the top of the page whatever its
         position in this list, and the arc has to read in order: death first.
         The reckoning below is a printed quote instead. */
      promote: 'hero',
      body:
        'The same thing that happens to everyone. Every soul will taste death, the Qur’an says, and the full account is settled later, on the Day of Resurrection. Death is not the end of you. It is the end of the part where you can still choose, and the beginning of the part where what you chose is kept.\n\nIslam’s whole shape points here. The prayer, the fast, the kindness to a parent: all of it is done by a person who knows this is coming and is getting ready. That is not morbid. It is the opposite of pretending.',
      sources: [quran(3, 185, { surahName: 'Al-Imran' })],
    },
    {
      id: 'grave',
      heading: 'What happens in the grave?',
      body:
        'A question. The Prophet ﷺ described it plainly: when a person is laid in the grave and the people who buried them walk away, two angels come, sit them up, and ask what they said about this man, Muhammad. The believer answers that he is Allah’s servant and His Messenger, and is shown a place in the Fire and told that Allah has given a place in Paradise instead.\n\nRead the answer again. It is the second half of the tashahhud, the words you say sitting in every prayer. You are already rehearsing it, five times a day, and the rehearsal is the preparation.',
      sources: [hadith('bukhari', '1338')],
      notes: [
        note(
          'practical',
          'People will tell you frightening things about the grave, some of them from narrations and some not. What is above is what the Prophet ﷺ said the believer meets. Hold on to that version.',
        ),
      ],
    },
    {
      id: 'wait',
      heading: 'What is the wait like?',
      body:
        'The Qur’an calls it a barrier: behind the dead there is a barrier until the Day they are raised. How long that is, nobody knows, and it is not experienced as waiting in a room. What the narrations do say is that your account does not simply freeze. When a person dies their deeds end except three: a charity that keeps giving, knowledge that people still benefit from, and a righteous child who prays for them. So the things you set going in this life keep counting in the next.',
      sources: [
        quran(23, [99, 100], { surahName: 'Al-Muʾminun' }),
        hadith('muslim', '1631'),
      ],
    },
    {
      id: 'rising',
      heading: 'What is the resurrection?',
      body:
        'Everyone who ever lived, raised bodily, at once. The Qur’an answers the obvious objection in one line: someone asks who could give life to bones once they have crumbled, and the reply is that He who made them the first time will. The One who did it from nothing can do it again from dust. When the Day comes is known only to Allah, and working out dates for it is not part of believing in it.',
      sources: [quran(36, [78, 79], { surahName: 'Ya-Sin' })],
    },
    {
      id: 'reckoning',
      heading: 'What is the reckoning?',
      promote: 'quote',
      body:
        'Each person is handed their own record and told to read it. Nothing is missing from it: whoever did an atom’s weight of good will see it, and whoever did an atom’s weight of evil will see it. Then the scales are set, and the Qur’an promises that no soul will be wronged in the slightest.\n\nThat is the part people fear, and it is also the part that should steady you. The record is exact, so the quiet good you did that nobody noticed is in it. The judge is just, so nothing is held against you that you did not do. And the Prophet ﷺ said that nobody’s deeds alone will save them, not even his, unless Allah bestows His mercy. The scales are real. So is the hand on them.',
      sources: [
        quran(99, [7, 8], { surahName: 'Az-Zalzalah' }),
        quran(17, [13, 14], { surahName: 'Al-Isra' }),
        quran(21, 47, { surahName: 'Al-Anbiya' }),
        hadith('bukhari', '6463', {
          book: 81,
          bookName: 'To make the Heart Tender (Ar-Riqaq)',
          inBookReference: 'Book 81, Hadith 52',
        }),
      ],
    },
    {
      id: 'home',
      heading: 'Where does it end?',
      body:
        'In one of two places, and both are real. Of Paradise the Qur’an says that no soul knows what has been hidden for them, and the Prophet ﷺ said Allah has prepared for His servants what no eye has seen, no ear has heard, and no heart has imagined. The Fire is described too, and this page does not describe it, because you already know it is there.\n\nWhat you may not know is what Allah wrote about Himself when He created everything: that His mercy overcomes His anger. A Muslim holds both facts at once and leans on the second. If the thought of the Day frightens you, let the fear move your feet towards the next prayer and then hand it back. Fear that freezes you is not the point of any of this.',
      sources: [
        quran(32, 17, { surahName: 'As-Sajdah' }),
        hadith('bukhari', '3244'),
        hadith('bukhari', '7404'),
      ],
      notes: [
        note(
          'practical',
          'The page on repentance is the one to read next. It is short, and it is the reason none of this needs to be faced alone or without a way back.',
        ),
      ],
    },
  ],
};
