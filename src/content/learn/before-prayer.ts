import { note, ref } from '../model';
import { hadith, quran } from '../sources';
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
  sections: [
    {
      id: 'time',
      heading: 'The time has come in',
      body:
        'Each prayer has a window, and you pray inside it rather than whenever you like — the Qur’an calls prayer a decree of specified times. The Pray tab works the times out from where you are, on the phone, so you do not have to calculate anything.',
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
      heading: 'You are in wudu',
      body:
        'Wudu is the short wash before prayer. The Prophet ﷺ said the prayer of someone who has broken it is not accepted until they wash again. One wudu covers several prayers — it lasts until something breaks it, and the wudu guide sets out what does and what only feels as though it does.',
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
      heading: 'You are covered, and so is the place',
      body:
        'The Qur’an tells people to take their adornment at every place of prayer — dress as you would to meet someone you respect. Your clothes and the ground you pray on should be clean. A carpet, a towel or a mat is fine; a prayer mat is convenient, not required.',
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
      heading: 'You are facing the qibla',
      body:
        'Muslims face the Kaʿbah in Mecca, and the Qur’an gives that instruction directly. The Qibla screen in this app points the way from where you are. If you cannot work it out — on a plane, in an unfamiliar place — face your best guess and pray; that is accepted.',
      sources: [quran(2, 144, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'intention',
      heading: 'You intend it',
      body:
        'The intention is a thought, not a sentence: knowing which prayer you are about to pray. You do not say it out loud, and you do not need a formula. If you are standing on a mat about to pray Maghrib, you have already intended it.',
      notes: [
        note(
          'differs',
          'Some people are taught to say the intention aloud. Scholars differ on whether that is recommended, and nobody holds that the prayer fails without it.',
          {
            additionalExplanation:
              'The intention itself is agreed to be a condition of the prayer; what differs is only whether voicing it adds anything. If you were taught to say it, saying it harms nothing. Scholars have discussed this in more detail.',
            positions: [
              { school: 'the majority', position: 'Hold that the intention is in the heart and does not need to be spoken.' },
              { school: 'a minority', position: 'Consider saying it aloud a recommended way of settling the heart on it.' },
            ],
          },
        ),
      ],
    },
  ],
};
