import { Recitations } from './recitations';
import type { Pillar } from './types';

/**
 * The five pillars, as reference reading.
 *
 * ⚠️ REVIEW REQUIRED — the Arabic names and the shahada wording below were
 * written by a model and have not been checked by a qualified person. The
 * vocalisation marks in particular need verifying against a printed source.
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
    transliteration: 'Ash-shahāda',
    summary: 'Saying, and meaning, that there is no god but Allah and that Muhammad is His Messenger.',
    guideId: 'shahada',
    detail:
      'This is the pillar the other four rest on. Saying it sincerely is what makes a person Muslim, and it is repeated in every prayer for the rest of your life. It is two statements held together: that worship belongs to Allah alone, and that Muhammad ﷺ is the one who conveyed how.',
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
  },
  {
    id: 'zakat',
    title: 'Obligatory charity',
    arabic: 'الزَّكَاة',
    transliteration: 'Az-zakāh',
    summary: 'A yearly share of the wealth you have held onto, given to those entitled to it.',
    detail:
      'Zakat is not a donation you choose to make — it is a portion of your savings that stops being yours. It applies only above a threshold, and only to wealth you have held for a full lunar year, so many people newly earning owe none at all. Whether it applies to you is worth asking someone locally rather than working out alone.',
  },
  {
    id: 'sawm',
    title: 'Fasting in Ramadan',
    arabic: 'الصَّوْم',
    transliteration: 'Aṣ-ṣawm',
    summary: 'No food, drink or intimacy from dawn until sunset, for the month of Ramadan.',
    detail:
      'Ramadan moves through the year, so its length and difficulty change with the season. There are real exemptions — illness, travel, pregnancy, nursing, menstruation, old age — and taking one is not a failure. Some days are made up later, some are not.',
  },
  {
    id: 'hajj',
    title: 'Pilgrimage',
    arabic: 'الحَجّ',
    transliteration: 'Al-ḥajj',
    summary: 'The pilgrimage to Mecca, once in a lifetime, for those able to make it.',
    detail:
      'Hajj happens on fixed days of the Islamic year and is required once, and only if you can afford it and are physically able. Most Muslims go later in life, if at all. Nothing about it is expected of you now.',
  },
];

export function getPillar(id: string): Pillar | undefined {
  return PILLARS.find((pillar) => pillar.id === id);
}
