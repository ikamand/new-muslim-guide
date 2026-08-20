import { Recitations } from './recitations';
import { hadith, quran } from './sources';
import type { Pillar } from './types';

/**
 * The five pillars, as reference reading.
 *
 * ⚠️ REVIEW REQUIRED — the Arabic names below were written by a model and have
 * not been checked by a qualified person; the vocalisation marks in particular
 * need verifying against a printed source.
 *
 * The zakat record used to be the second thing flagged here: it stated a
 * threshold and a full lunar year and cited neither. Both now carry the
 * narration that gives them, and the wording itself was checked and kept —
 * naming no figure is the right answer for an app, because the threshold
 * differs by the kind of wealth and the modern equivalent of a silver or gold
 * measure moves with the market.
 *
 * (The shahada wording is no longer in that category: it is
 * `Recitations.shahada`, and the guide that teaches it now cites Bukhari 8.)
 *
 * Every record here makes one claim before it says anything else — that this
 * is one of the five — and that claim is Ibn `Umar's narration, Bukhari 8. It
 * is cited on each rather than once, because a pillar is read on its own page.
 * Where a record goes on to state a condition, the verse for that condition is
 * cited beside it.
 *
 * The English is deliberately plain and deliberately shallow. This page
 * orients someone who has just become Muslim; it is not a fiqh reference,
 * and where a pillar has conditions and exemptions it says so and stops
 * rather than half-teaching them.
 */

/**
 * The testimony of faith, said to become Muslim and said in every prayer.
 *
 * Re-exported rather than written here: it is now said in two places in the
 * app — this page and the guide to becoming Muslim — and a recitation that
 * appears twice has to be stored once.
 */
export const SHAHADA = Recitations.shahada;

export const PILLARS: Pillar[] = [
  {
    id: 'shahada',
    title: 'The testimony of faith',
    arabic: 'الشَّهَادَة',
    transliteration: 'Ash-shahādah',
    summary: 'Saying, and meaning, that there is no god but Allah and that Muhammad is His Messenger.',
    guideId: 'shahada',
    detail:
      'This is the pillar the other four rest on. Saying it sincerely is what makes a person Muslim, and it is repeated in every prayer for the rest of your life. It is two statements held together: that worship belongs to Allah alone, and that Muhammad ﷺ is the one who conveyed how.',
    meta: {
      category: 'becoming-muslim',
      difficulty: 'foundational',
      estimatedMinutes: 2,
      beginnerPriority: 1,
      tags: ['first-day'],
      sources: [
        hadith('bukhari', '8', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 1',
        }),
      ],
    },
  },
  {
    id: 'salah',
    title: 'Prayer',
    arabic: 'الصَّلَاة',
    transliteration: 'Aṣ-ṣalāh',
    summary: 'Five prayers a day, at set times, facing the Kaʿbah in Mecca.',
    detail:
      'Fajr before sunrise, Dhuhr after midday, ʿAsr in the afternoon, Maghrib just after sunset, and ʿIshaʾ at night. Each one takes a few minutes. You wash first — that is wudu — and the app walks you through both.',
    guideId: 'fajr',
    meta: {
      category: 'salah',
      difficulty: 'foundational',
      estimatedMinutes: 2,
      beginnerPriority: 1,
      tags: ['first-day'],
      // The pillar, and the "at set times" the summary claims.
      sources: [
        hadith('bukhari', '8', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 1',
        }),
        quran(4, 103, { surahName: 'An-Nisa' }),
      ],
    },
  },
  {
    id: 'zakat',
    title: 'Obligatory charity',
    arabic: 'الزَّكَاة',
    transliteration: 'Az-zakāh',
    summary: 'A yearly share of the wealth you have held onto, given to those entitled to it.',
    detail:
      'Zakat is not a donation you choose to make — it is a portion of your savings that stops being yours. It applies only above a threshold, and only to wealth you have held for a full lunar year, so many people newly earning owe none at all. Whether it applies to you is worth asking someone locally rather than working out alone.',
    meta: {
      category: 'charity',
      difficulty: 'building',
      estimatedMinutes: 2,
      beginnerPriority: 3,
      tags: ['money'],
      // The wording here was checked and left alone — it states a threshold
      // and a lunar year and sends the reader to someone local rather than to
      // a number, which is right, because the number depends on the kind of
      // wealth. What it lacked was evidence, and both halves now have it.
      //
      // Bukhari 1484 is the threshold: "there is no zakat on less than five
      // awsuq, or less than five camels, or less than five awaq of silver" —
      // three different kinds of wealth with three different thresholds, in
      // one sentence, which is exactly why this record does not print a
      // number. Abu Dawud 1573 carries both halves: two hundred dirhams and
      // twenty dinars as the thresholds for silver and gold, and "no zakat is
      // payable on property till a year passes on it" for the lunar year.
      //
      // Tirmidhi 631 is the better-known wording of the year rule and is NOT
      // used: Darussalam grades it daif, and a threshold is a ruling.
      sources: [
        hadith('bukhari', '8', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 1',
        }),
        hadith('bukhari', '1484', {
          book: 24,
          bookName: 'Obligatory Charity Tax (Zakat)',
          inBookReference: 'Book 24, Hadith 84',
        }),
        hadith('abu-dawud', '1573', {
          book: 9,
          bookName: 'Zakat (Kitab Al-Zakat)',
          inBookReference: 'Book 9, Hadith 18',
          grading: 'sahih',
          gradedBy: 'Al-Albani',
        }),
      ],
    },
  },
  {
    id: 'sawm',
    title: 'Fasting in Ramadan',
    arabic: 'الصَّوْم',
    transliteration: 'Aṣ-ṣawm',
    summary: 'No food, drink or intimacy from dawn until sunset, for the month of Ramadan.',
    detail:
      'Ramadan moves through the year, so its length and difficulty change with the season. There are real exemptions — illness, travel, pregnancy, nursing, menstruation, old age — and taking one is not a failure. Some days are made up later, some are not.',
    meta: {
      category: 'fasting',
      difficulty: 'building',
      estimatedMinutes: 2,
      beginnerPriority: 3,
      tags: ['ramadan'],
      // The pillar; the hours the summary gives; and the two exemptions the
      // Qur'an names by itself. The rest of the exemption list is held, with
      // its own note, in `reference:ramadan`.
      sources: [
        hadith('bukhari', '8', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 1',
        }),
        quran(2, 187, { surahName: 'Al-Baqarah' }),
        quran(2, 185, { surahName: 'Al-Baqarah' }),
      ],
    },
  },
  {
    id: 'hajj',
    title: 'Pilgrimage',
    arabic: 'الْحَجّ',
    transliteration: 'Al-ḥajj',
    summary: 'The pilgrimage to Mecca, once in a lifetime, for those able to make it.',
    detail:
      'Hajj happens on fixed days of the Islamic year and is required once, and only if you can afford it and are physically able. Most Muslims go later in life, if at all. Nothing about it is expected of you now.',
    meta: {
      category: 'pilgrimage',
      difficulty: 'building',
      estimatedMinutes: 2,
      beginnerPriority: 4,
      sources: [
        hadith('bukhari', '8', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 1',
        }),
        // "for whoever is able to find thereto a way" — the condition this
        // record states, in the verse that states it.
        quran(3, 97, { surahName: 'Al-Imran' }),
      ],
    },
  },
];

export function getPillar(id: string): Pillar | undefined {
  return PILLARS.find((pillar) => pillar.id === id);
}
