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
  sections: [
    {
      id: 'the-name',
      heading: 'The name',
      body:
        'Allah is simply the Arabic word for God. It is not a different god with a different name — Arabic-speaking Christians and Jews use the same word when they pray. It has no plural and no gender, which is part of why Muslims keep it rather than translating it.',
    },
    {
      id: 'al-ikhlas',
      heading: 'Four lines that answer the question',
      body:
        'When the Prophet ﷺ was asked to describe God, the answer given was a short chapter of the Qur’an: that He is One; that He is the One everything turns to and needs; that He was not born and had no children; and that there is nothing at all comparable to Him. Four lines, and Muslims have taken them as the definition ever since.',
      sources: [quran(112, [1, 4], { surahName: 'Al-Ikhlas' })],
    },
    {
      id: 'nothing-like-him',
      heading: 'Nothing like Him',
      body:
        'This is the sentence to hold on to when your mind starts trying to picture God. The Qur’an says there is nothing like Him — so any picture you form is wrong by definition, and you are not expected to form one. Muslims do not depict God, and that is why you will not find images of Him anywhere in Islam.',
      sources: [quran(42, 11, { surahName: 'Ash-Shura' })],
    },
    {
      id: 'names',
      heading: 'Known by what He does',
      body:
        'The Qur’an teaches about God through names — the Merciful, the Forgiving, the Hearing, the One who provides. You will meet them constantly: every chapter but one opens by naming Him as the Most Merciful, and the prayer is full of them. Learning a few is a gentler way in than trying to think about God in the abstract.',
      sources: [quran(7, 180, { surahName: 'Al-A`raf' })],
    },
  ],
};
