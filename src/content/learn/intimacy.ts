import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance. RULINGS: every claim in the fourth and fifth
 * sections is one, and a qualified reader clears them before release.
 *
 * Commissioned by Iyad's curriculum update (`docs/curriculum-update-plan.md`)
 * for the People chapter, after `a-partner-already.ts`: intimacy inside
 * marriage, the privacy around it, what is not permitted, and the wash
 * afterwards. Non-graphic throughout, by instruction.
 *
 * ## What is reused, not repeated
 *
 * The ghusl guide already holds when the wash is due, with Bukhari 291 and
 * Muslim 348a; this page cites 291 once and sends the reader there for the
 * method. The duʿa before intimacy is in Hisn al-Muslim (occasion 1269543)
 * and is linked, not copied. `marriage-shape.ts` and `your-partner.ts` are
 * linked for what marriage is and what spouses owe each other.
 *
 * ## Sources, each opened in the corpus
 *
 * Qur'an 30:21 (rest, affection and mercy, already cited on the family
 * page), 2:187 (a garment for each other), 23:5–6 (guard their private
 * parts except from their spouses), 24:30 (lower the gaze), 2:222 (keep
 * away during menstruation). Muslim 1006 (in intimacy there is charity),
 * Muslim 1437 (the worst of people divulges his wife's secret). Bukhari
 * 291 (intercourse makes the wash due), 288 (wudu before sleeping while
 * junub), 141 (the words said before). Abu Dawud 2162 (the one act cursed),
 * graded hasan by al-Albani, Abdul Hamid and Zubair Ali Zai; the grades
 * were read before it was cited.
 *
 * ## What is not here
 *
 * Contraception, what is permitted short of intercourse during
 * menstruation, when menstruation is judged to have ended, and anything
 * about a spouse who is not Muslim. All of it goes to a person, and the
 * page says so.
 */
export const INTIMACY: Reference = {
  id: 'intimacy',
  surface: 'learn',
  title: 'Intimacy, modesty and purification',
  subtitle: 'Inside marriage, in private, and the wash afterwards',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 3,
    tags: ['family'],
    relatedContent: [
      ref('guide', 'ghusl'),
      ref('reference', 'marriage-shape'),
      ref('reference', 'your-partner'),
      ref('hisn', '1269543'),
    ],
  },
  quickFacts: [
    { label: 'In marriage', value: 'Good, private, and rewarded', emphasis: true },
    { label: 'Outside it', value: 'Not permitted. The rule is that simple' },
    { label: 'Afterwards', value: 'The full wash before the next prayer' },
  ],
  sections: [
    {
      id: 'good',
      heading: 'Is intimacy something Islam is against?',
      promote: 'hero',
      body:
        'No. Inside marriage it is wanted, and it is counted for you. The Qur’an says Allah made spouses for each other so that they find rest in one another, and placed affection and mercy between them. Elsewhere it calls husband and wife a garment for each other, which is closeness, warmth and cover all at once. When the companions worried that the rich had taken all the reward by giving charity, the Prophet ﷺ listed what else is charity, and intimacy with one’s spouse was on the list. Nothing about the religion asks you to be ashamed of it.',
      /* 30:21 first, because the hero prints its first citation and 2:187 is
         a long verse mostly about the fasting night. */
      sources: [
        quran(30, 21, { surahName: 'Ar-Rum' }),
        quran(2, 187, { surahName: 'Al-Baqarah' }),
        hadith('muslim', '1006', {
          book: 12,
          bookName: 'The Book of Zakat',
          inBookReference: 'Book 12, Hadith 66',
        }),
      ],
    },
    {
      id: 'line',
      heading: 'Where is the line?',
      body:
        'Marriage. The Qur’an praises those who guard their private parts except from their spouses, and there is no third category. Everything the religion says about modesty is there to keep that line easy to hold: lowering the gaze, not being alone with someone you could marry, dressing so that you are not on display. Those are not prudishness. They are the fence around something valued.',
      sources: [
        quran(23, [5, 6], { surahName: 'Al-Muʾminun' }),
        quran(24, 30, { surahName: 'An-Nur' }),
      ],
    },
    {
      id: 'private',
      heading: 'What stays private?',
      body:
        'All of it. The Prophet ﷺ said that among the worst of people on the Day of Judgment is the man who goes to his wife, and she to him, and then he tells others what passed between them. That covers friends, family and the internet. If you came from a culture where this is talked about, the silence will feel strange at first. It is a form of respect, and it runs both ways.',
      sources: [
        hadith('muslim', '1437', {
          book: 16,
          bookName: 'The Book of Marriage',
          inBookReference: 'Book 16, Hadith 144',
        }),
      ],
    },
    {
      id: 'not',
      heading: 'Is anything not allowed inside marriage?',
      body:
        'Two things are ruled out plainly. During menstruation, the Qur’an says to keep away until she is pure. And anal intercourse is forbidden; the Prophet ﷺ described the one who does it as cursed. Beyond those, and the daylight hours of a fast, which the Ramadan page covers, the religion does not hand married people a rulebook.',
      sources: [
        quran(2, 222, { surahName: 'Al-Baqarah' }),
        hadith('abu-dawud', '2162', {
          grading: 'hasan',
          gradedBy: 'Al-Albani',
        }),
      ],
      notes: [
        note(
          'agreed',
          'Both prohibitions are held across the schools. What is permitted short of intercourse during menstruation, and when it is judged to have ended, have detail to them, and the page on periods and a person are where those go.',
        ),
      ],
    },
    {
      id: 'after',
      heading: 'What do I do afterwards?',
      body:
        'The full wash, ghusl, before you next pray. Intercourse makes it due whether or not anything was released, and wudu on its own does not lift the state. If you are going to sleep first, the Prophet ﷺ would wash and make wudu before lying down, and do the ghusl later. There are also words to say beforehand, asking Allah to keep Shayṭān from the two of you and from what He gives you; they are in the duʿa book.',
      sources: [
        hadith('bukhari', '291'),
        hadith('bukhari', '288', {
          book: 5,
          bookName: 'Bathing (Ghusl)',
          inBookReference: 'Book 5, Hadith 40',
        }),
        hadith('bukhari', '141', {
          book: 4,
          bookName: 'Ablutions (Wudu’)',
          inBookReference: 'Book 4, Hadith 7',
        }),
      ],
      notes: [
        note(
          'practical',
          'The ghusl guide walks the wash through step by step. It takes a few minutes, and you will do it often enough that it stops being an event.',
        ),
      ],
    },
    {
      id: 'ask',
      heading: 'What about the questions this page does not answer?',
      body:
        'Contraception, a spouse who is not Muslim, what changes during pregnancy, anything medical: these depend on you, and a page cannot hear the part that changes the answer. Ask a person. An imam is used to being asked, and there is nothing embarrassing about a question the scholars have written whole chapters on.',
      sources: [
        general(
          'Orientation, not a ruling. Which questions need a person is practical advice; the rulings on this page are the verses and narrations cited above.',
        ),
      ],
    },
  ],
};
