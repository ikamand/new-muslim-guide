import { note, ref } from '../model';
import { hadith, quran, scholarly } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const BEFORE_PRAYER: Reference = {
  id: 'before-prayer',
  surface: 'learn',
  title: 'What you need before you pray',
  subtitle: 'The five things to have in place',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 1,
    tags: ['first-day'],
    relatedContent: [ref('guide', 'wudu'), ref('reference', 'clothing'), ref('guide', 'fajr')],
  },
  /*
    Five conditions, so the block says five rather than listing them — the
    page below is the list, and repeating it at the top would be the padding
    this format refuses.
  */
  quickFacts: [
    { label: 'Five things', value: 'Time · wudu · covered · qibla · intention' },
    { label: 'Do I have to?', value: 'Yes, these come before the prayer itself', emphasis: true },
  ],
  sections: [
    {
      id: 'time',
      heading: 'Is it the right time?',
      promote: 'hero',
      body:
        'Each prayer has a window, and you pray inside it rather than whenever you like, and the Qur’an calls prayer a decree of specified times. The Pray tab works the times out from where you are, on the phone, so you do not have to calculate anything.',
      sources: [quran(4, 103, { surahName: 'An-Nisa' })],
      notes: [
        note(
          'practical',
          'If your local mosque prints a timetable and it differs from the app by a few minutes, follow the mosque.',
          {
            additionalExplanation:
              'The app works the times out from the position of the sun, which is arithmetic. A mosque timetable is a decision: which twilight angle to use for Fajr and Isha, whether to round to the nearest five minutes, whether to hold Isha back in summer so people can get there. Both are honest answers to the same question and they land a few minutes apart. Praying with the congregation you actually pray with matters more than the arithmetic, and the differences are almost always small enough that either time falls inside the window anyway. The one place it is worth checking is high summer in a northern country, where Fajr and Isha can crowd together and mosques handle it in noticeably different ways.',
          },
        ),
      ],
    },
    {
      id: 'wudu',
      heading: 'Am I in wudu?',
      body:
        'Wudu is the short wash before prayer. The Prophet ﷺ said the prayer of someone who has broken it is not accepted until they wash again. One wudu covers several prayers. It lasts until something breaks it, and the wudu guide sets out what does and what only feels as though it does.',
      // Deliberately no list here. This page used to name three things that
      // break wudu, and the wudu guide named the same three; keeping one list
      // in two files is how two files end up disagreeing. The guide holds it,
      // including the two the schools handle differently.
      sources: [
        hadith('bukhari', '135', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 1',
        }),
        hadith('bukhari', '214', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 80',
        }),
      ],
    },
    {
      id: 'covered',
      heading: 'Am I covered, and is the place clean?',
      body:
        'The Qur’an tells people to take their adornment at every place of prayer, so dress as you would to meet someone you respect. Your clothes and the ground you pray on should be clean. A carpet, a towel or a mat is fine; a prayer mat is convenient, not required.',
      sources: [quran(7, 31, { surahName: 'Al-A`raf' })],
      notes: [
        note(
          'practical',
          'How much has to be covered differs a little between men and women and is set out in the clothing guide. Ordinary loose clothes cover it for most people.',
        ),
      ],
    },
    {
      id: 'qibla',
      heading: 'Which way do I face?',
      body:
        'Muslims face the Kaʿbah in Mecca, and the Qur’an gives that instruction directly. The Qibla screen in this app points the way from where you are. If you cannot work it out, on a plane or in an unfamiliar place, face your best guess and pray; that is accepted.',
      sources: [quran(2, 144, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'intention',
      heading: 'Do I have to say the intention?',
      body:
        'The intention is a thought, not a sentence: knowing which prayer you are about to pray. You do not say it out loud, and you do not need a formula. If you are standing on a mat about to pray Maghrib, you have already intended it.',
      notes: [
        note(
          'differs',
          'Some people are taught to say the intention aloud. Scholars differ on whether that is recommended, and nobody holds that the prayer fails without it.',
          {
            sources: [
              scholarly({
                work: 'Al-Fatawa al-Kubra, 1/214-215',
                author: 'Ibn Taymiyyah, via Islam Question & Answer, fatwa 13337',
                url: 'https://islamqa.info/en/answers/13337/ruling-on-uttering-the-intention-niyyah-in-acts-of-worship',
              }),
            ],
            additionalExplanation:
              'Most of this is agreed and only one part of it is open. The imams agree that the place of the intention is the heart and that the prayer never asks you to speak it, so that is not one side of an argument. What they differ on is whether voicing it is recommended. Ibn Taymiyyah, who records both views, reports that scholars among the followers of Abu Hanifah, ash-Shafi`i and Ahmad held it recommended as a way of making the intention firmer, and that scholars among the followers of Malik and Ahmad held it is not, because neither the Prophet ﷺ nor his Companions did it; he takes the second view. This note used to give the first row as the majority and the second as a minority, which counted scholars nobody has counted and put an agreed point on one side of a disagreement. If you were taught to say it, saying it harms nothing.',
            positions: [
              {
                school: 'Hanafi',
                position:
                  'Scholars of the school held that voicing the intention is recommended, as a way of making it firmer. The same view is found among Shafi`i and Hanbali scholars.',
              },
              {
                school: 'Maliki',
                position:
                  'Scholars of the school held that voicing it is not recommended, since neither the Prophet ﷺ nor his Companions did it. The same view is found among Hanbali scholars.',
              },
            ],
          },
        ),
      ],
    },
  ],
};
