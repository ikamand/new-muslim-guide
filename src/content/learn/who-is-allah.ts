import { ref } from '../model';
import { quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Kept at the level Surah al-Ikhlas states and stopped there. The theology of
 * the divine names and attributes is where Sunni scholars have written most and
 * where a beginner guide has no business going; this says what the Qur'an says
 * about itself and leaves the rest to people qualified to teach it.
 */
export const WHO_IS_ALLAH: Reference = {
  id: 'who-is-allah',
  surface: 'learn',
  title: 'Who is Allah?',
  subtitle: 'What Muslims believe about God',
  meta: {
    category: 'belief',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    tags: ['first-day'],
    relatedContent: [ref('article', 'allah'), ref('reference', 'what-is-islam')],
  },
  /*
    No "do I have to?" row: nothing on a belief page is an instruction. The
    block flexes to what the page actually is rather than padding to four.
  */
  quickFacts: [
    { label: 'The name', value: 'Arabic for God, the same word Arab Christians use' },
    { label: 'The answer', value: 'Four lines of the Qur’an, below', emphasis: true },
  ],
  sections: [
    {
      id: 'the-name',
      heading: 'Is Allah a different God?',
      body:
        'No. Allah is simply the Arabic word for God, and Arabic-speaking Christians and Jews use it when they pray.',
      note: 'It has no plural and no gender, which is part of why Muslims keep the word rather than translating it.',
    },
    {
      id: 'al-ikhlas',
      heading: 'What was said when the Prophet ﷺ was asked to describe God?',
      body:
        'A short chapter of the Qur’an, and Muslims have taken it as the definition ever since.',
      /*
        The page's answer, so it breaks the margins. The paragraph that used to
        paraphrase these four lines is gone: the verse says it better, and
        saying both would be the burial this format exists to undo.
      */
      promote: 'hero',
      bullets: [
        '**He is One.**',
        '**Everything turns to Him** and needs Him.',
        '**He was not born** and had no children.',
        '**There is nothing comparable to Him.**',
      ],
      sources: [quran(112, [1, 4], { surahName: 'Al-Ikhlas' })],
    },
    {
      id: 'nothing-like-him',
      heading: 'What if I try to picture Him?',
      body:
        'Any picture you form is wrong by definition, and you are not expected to form one.',
      promote: 'supporting',
      note: 'This is why Muslims do not depict God, and why you will not find images of Him anywhere in Islam.',
      sources: [quran(42, 11, { surahName: 'Ash-Shura' })],
    },
    {
      id: 'names',
      heading: 'How do I get to know Him?',
      body:
        'Through His names, rather than in the abstract, and you will meet them constantly.',
      promote: 'supporting',
      bullets: [
        '**Ar-Rahman**, the Most Merciful. Every chapter but one opens with it.',
        '**Al-Ghafur**, the Forgiving.',
        '**As-Samiʽ**, the Hearing.',
        '**Ar-Razzaq**, the One who provides.',
      ],
      note: 'Learning a few is a gentler way in than trying to think about God in the abstract.',
      sources: [quran(7, 180, { surahName: 'Al-A`raf' })],
    },
  ],
};
