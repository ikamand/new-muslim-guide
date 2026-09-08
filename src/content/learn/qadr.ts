import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance. Creed: a qualified reader before release, and
 * the article the six-articles record itself calls the hardest.
 *
 * The last lesson of "What you believe more deeply"
 * (`docs/curriculum-update-plan.md`). It takes the article slowly: what
 * decree means, that choice is real, what the belief is for, and how to
 * live by it. It does not teach the four levels by name, does not enter the
 * historical argument, and does not try to resolve the tension. It says
 * the tension is expected and shows the reader where to stand in it.
 *
 * ## Sources, each opened in the corpus
 *
 * Qur'an 57:22–23 (nothing strikes except that it is in a register; so that
 * you neither despair nor exult), 54:49 (all things created with
 * predestination), 18:29 (whoever wills, let him believe), 91:7–10 (the
 * soul inspired with both, and succeeds who purifies it), 6:148 (the
 * excuse "if Allah had willed" put in the mouths of those who associate).
 * Muslim 2664 (strive, seek help, do not say "if only"). Tirmidhi 2516,
 * Ibn ʿAbbas: what missed you could not have hit you, graded sahih by
 * al-Albani. Tirmidhi 2517, tie it and rely, graded hasan by al-Albani;
 * the corpus grades were read before either was cited.
 */
export const QADR: Reference = {
  id: 'qadr',
  surface: 'learn',
  title: 'Qadr',
  subtitle: 'Divine decree, your choices, and how both are true',
  meta: {
    category: 'belief',
    difficulty: 'deeper',
    estimatedMinutes: 6,
    beginnerPriority: 4,
    relatedContent: [
      ref('article', 'qadar'),
      ref('reference', 'patience-and-gratitude'),
      ref('reference', 'who-is-allah'),
    ],
  },
  quickFacts: [
    { label: 'The claim', value: 'Nothing happens outside Allah’s knowledge and will', emphasis: true },
    { label: 'Your part', value: 'Real. You choose, and you answer for it' },
    { label: 'The use', value: 'Do your best, then stop fearing what you cannot control' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What does divine decree mean?',
      promote: 'hero',
      body:
        'That nothing takes Allah by surprise. Before anything happens, He knew it, it was written, He willed that it come to be, and He created it. The Qur’an says that no disaster strikes on earth or in yourselves except that it is in a register before it is brought into being, and that everything was created with measure. That is the belief in full. It is a statement about Allah, not a theory about you.',
      sources: [
        quran(57, 22, { surahName: 'Al-Hadid' }),
        quran(54, 49, { surahName: 'Al-Qamar' }),
      ],
    },
    {
      id: 'choice',
      heading: 'So are my choices real?',
      body:
        'Yes, and the Qur’an would make no sense otherwise. It says: whoever wills, let him believe, and whoever wills, let him disbelieve. It says the soul was given both its wickedness and its righteousness, and that the one who purifies it succeeds and the one who corrupts it fails. A book that commands, forbids, praises and blames is talking to people who can choose.\n\nWhat the Qur’an rejects is using decree as an excuse. It puts the words “if Allah had willed, we would not have done it” in the mouths of those who associated others with Him, and answers that people before them said the same. You cannot sin and blame the register.',
      sources: [
        quran(18, 29, { surahName: 'Al-Kahf' }),
        quran(91, [7, 10], { surahName: 'Ash-Shams' }),
        quran(6, 148, { surahName: 'Al-Anʿam' }),
      ],
    },
    {
      id: 'why',
      heading: 'Then what is the belief for?',
      body:
        'Steadiness. The verse that says every disaster was written first goes on to say why you are told: so that you do not despair over what has passed you by, and do not gloat over what you were given. The Prophet ﷺ taught a boy riding behind him the same thing in a sentence: if the whole of creation gathered to benefit you, they could only do what Allah had already written for you, and if they gathered to harm you, the same.\n\nHeld rightly, that is not a cage. It is the reason you can lose a job, or a person, or a year, and not conclude that you did everything wrong. Some of the outcome was never yours.',
      sources: [
        quran(57, 23, { surahName: 'Al-Hadid' }),
        hadith('tirmidhi', '2516', {
          book: 37,
          bookName: 'Chapters on the description of the Day of Judgement, Ar-Riqaq, and Al-Waraʿ',
          inBookReference: 'Book 37, Hadith 102',
          grading: 'sahih',
          gradedBy: 'Al-Albani',
        }),
      ],
    },
    {
      id: 'daily',
      heading: 'What do I do with it day to day?',
      body:
        'Try hard, and then let go of the result. The Prophet ﷺ said a strong believer is better and more loved by Allah than a weak one, and told people to go after what benefits them, ask Allah’s help, and not lose heart. Then he said what to do when it goes wrong anyway: do not say “if only I had done otherwise”, because that door opens onto regret with no floor. Say instead that Allah decreed it, and what He willed He did.\n\nA man asked whether he should tie his camel and trust Allah, or leave it loose and trust Allah. Tie it, he was told, and trust. That is the whole practice in four words.',
      sources: [
        hadith('muslim', '2664', {
          book: 46,
          bookName: 'The Book of Destiny',
          inBookReference: 'Book 46, Hadith 52',
        }),
        hadith('tirmidhi', '2517', {
          book: 37,
          bookName: 'Chapters on the description of the Day of Judgement, Ar-Riqaq, and Al-Waraʿ',
          inBookReference: 'Book 37, Hadith 103',
          grading: 'hasan',
          gradedBy: 'Al-Albani',
        }),
      ],
      notes: [
        note(
          'practical',
          'Applied for a job: prepare properly, then whatever comes was written. Someone you love is ill: get them the best care you can, then whatever comes was written. Both halves, every time.',
        ),
      ],
    },
    {
      id: 'still-hard',
      heading: 'It still sits badly with me. Is that a problem?',
      body:
        'No. The six articles page says the same and it bears repeating: this is the article the scholars wrote the most about, precisely because it is hard, and finding it hard is not a sign your faith is faulty. You are not asked to solve how knowledge and choice fit together. You are asked to hold both ends, act as if your choices matter, because they do, and rest on the fact that the outcome was known, because it was. People have argued the middle for fourteen centuries. Nobody has ever needed to win that argument in order to pray.',
      sources: [
        general(
          'Ordinary explanation. That the tension is real, and that a Muslim is asked to hold both sides rather than resolve them, is the standard Sunni account and is stated here without entering the historical debate.',
        ),
      ],
    },
  ],
};
