import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance.
 *
 * One page for both pilgrimages, commissioned by Iyad's curriculum update
 * (`docs/curriculum-update-plan.md`) as the follow-up to the Hajj pillar
 * record, which stays the two-minute introduction and now `teaches` this
 * page the way the fasting pillar teaches the Ramadan lesson. It says what
 * each is, why it matters, when Hajj becomes yours to do, and the difference
 * between them. It teaches no rites: nobody learns Hajj from a page.
 *
 * ## Sources, each opened in the corpus
 *
 * - Qur'an 3:97, "for whoever is able to find a way", already cited on the
 *   pillar. Cited once, on the section about when it becomes owed, because
 *   that is the claim the verse states.
 * - Qur'an 2:196, "complete the Hajj and ʿUmrah for Allah": the one verse
 *   naming both.
 * - Bukhari 1521: whoever performs Hajj for Allah, without intimacy and
 *   without sin, returns as on the day his mother bore him.
 * - Muslim 1349: one ʿUmrah to the next is an expiation, and an accepted
 *   Hajj has no reward but Paradise. The corpus files it as 1349.01 under
 *   its sequential 3289; the number printed is the collection's own, which
 *   is what the evidence script resolves by.
 *
 * ## What was left out, on purpose
 *
 * Whether Hajj must be made the first year one is able, or may be delayed,
 * is a known difference between the schools and is not stated here in either
 * direction. Whether a woman travels with a maḥram is the same. Both go to a
 * person, and the practical note says so.
 */
export const HAJJ_AND_UMRAH: Reference = {
  id: 'hajj-and-umrah',
  surface: 'learn',
  title: 'Hajj and Umrah',
  subtitle: 'The journey to the House, and the smaller one',
  meta: {
    category: 'pilgrimage',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 4,
    relatedContent: [
      ref('pillar', 'hajj'),
      ref('reference', 'islamic-calendar'),
      ref('reference', 'eid'),
    ],
  },
  quickFacts: [
    { label: 'Hajj', value: 'Once in a lifetime, on fixed days, if you are able', emphasis: true },
    { label: 'Umrah', value: 'Any time of year, a few hours, never required' },
    { label: 'For you now', value: 'Nothing. Most Muslims go years after they begin' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is Hajj?',
      promote: 'hero',
      body:
        'The pilgrimage to the Kaʿbah in Mecca, in the days of Dhul-Hijjah, the last month of the year. Millions of people arrive in the same week, dress in the plainest clothes, walk the same route, stand together on the plain of ʿArafah through one afternoon, and go home. It is the fifth pillar. The Qur’an calls the Kaʿbah the House, and calls the journey to it a duty owed to Allah.',
    },
    {
      id: 'why',
      heading: 'Why does it matter so much?',
      body:
        'Because of what it does to the person who goes. The Prophet ﷺ said that whoever performs Hajj for Allah’s sake, without intimacy and without sin during it, comes back as he was on the day his mother bore him. People who have been describe the same thing in plainer words: a week in which everything you usually are, your work, your clothes, your country, is set down, and you are one of two million people in white asking to be forgiven.',
      sources: [hadith('bukhari', '1521')],
    },
    {
      id: 'when',
      heading: 'When does it become mine to do?',
      body:
        'When you are able. The verse says it is owed by whoever can find a way there, and the scholars read that as being physically able to travel, having the money for the journey without leaving debts or dependants unprovided for, and the road being safe. Until those are true, nothing is owed. Most converts go later in life, and that is not neglect. It is the condition not yet being met.',
      sources: [
        quran(3, 97, { surahName: 'Al-Imran' }),
        general(
          'What counts as being able is the scholars’ reading of the verse, and the details differ between the schools and depend on the person. Nothing here decides them.',
        ),
      ],
      notes: [
        note(
          'practical',
          'The details of what counts as able, and who you travel with, are questions to ask before you book, not to settle from a page.',
        ),
      ],
    },
    {
      id: 'umrah',
      heading: 'What is Umrah?',
      body:
        'The smaller pilgrimage: the same journey to the same House, without the fixed days and the standing at ʿArafah that make Hajj what it is. It takes a few hours, it can be made in any month, and it is never required. Many people make it in Ramadan, or on the way to or from Hajj itself. The Qur’an names both together, and the Prophet ﷺ said that one Umrah to the next wipes out what lies between them, and that an accepted Hajj has no reward but Paradise.',
      sources: [
        quran(2, 196, { surahName: 'Al-Baqarah' }),
        hadith('muslim', '1349', {
          book: 15,
          bookName: 'The Book of Pilgrimage',
          inBookReference: 'Book 15, Hadith 493',
        }),
      ],
    },
    {
      id: 'difference',
      heading: 'What is the difference, in one line?',
      body:
        'Hajj is the pilgrimage with the fixed days and the standing at ʿArafah, owed once in a lifetime to anyone who can make it. Umrah is the short form, in any month, for anyone who wants to. You will meet people who have made Umrah several times and Hajj never, and that is ordinary.',
      notes: [
        note(
          'practical',
          'Nothing about either is expected of you now. When it becomes possible, go with a group that knows the rites. Nobody learns Hajj from a page, and this app does not try to teach it.',
        ),
      ],
    },
  ],
};
