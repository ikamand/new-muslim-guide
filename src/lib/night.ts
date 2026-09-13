import type { DayTimes, PrayerId } from './prayer-times';

/**
 * Which of the night's voluntary prayers the clock is in.
 *
 * Iyad, 13 Sep 2026: witr after ʿIshāʾ, then qiyam al-layl, then tahajjud in
 * the last third, every night. The night is split at the boundaries the Awqat
 * day page already prints, so what Today offers and what that page says agree
 * to the minute:
 *
 *   Maghrib · nothing · ʿIshāʾ · witr · middle · qiyam · last third · tahajjud · Fajr
 *
 * The night begins at Maghrib, because the Islamic day ends there. The first
 * version of the Today card measured it from ʿIshāʾ and opened the last third
 * about half an hour late.
 *
 * Witr holds until the middle of the night rather than for a moment after
 * ʿIshāʾ, because its own page tells people to pray it before they go to bed,
 * and bed is mostly before the middle.
 *
 * Qiyam AFTER witr is sound as long as witr is not prayed again: in Abu Dawud
 * 1439 Talq ibn ʿAli prays witr, then leads a prayer at his mosque and hands
 * that witr to someone else, citing "no two witrs in one night". The qiyam page
 * carries that sentence, because this order is exactly what would otherwise
 * send somebody to pray witr twice. The app does not know whether anyone prayed
 * witr, and must not guess, so the page says it rather than the card being
 * clever.
 *
 * Pure, so `npm run night:check` can walk it minute by minute.
 */
export type NightPrayer = 'witr' | 'qiyam' | 'tahajjud';

function timeOf(day: DayTimes, id: PrayerId): Date | undefined {
  return day.prayers.find((prayer) => prayer.id === id)?.time;
}

/**
 * `evening` is the day whose Maghrib opened the night, `morning` the day whose
 * Fajr closes it — `computeNight` in `prayer-times.ts` picks the pair. Null
 * outside the night, and between Maghrib and ʿIshāʾ.
 */
export function nightPrayerAt(evening: DayTimes, morning: DayTimes, now: Date): NightPrayer | null {
  const maghrib = timeOf(evening, 'maghrib');
  const isha = timeOf(evening, 'isha');
  const fajr = timeOf(morning, 'fajr');
  if (!maghrib || !isha || !fajr || now < maghrib || now >= fajr) return null;

  // Asked first, so it holds every night however late ʿIshāʾ runs.
  if (now >= evening.lastThirdOfNight) return 'tahajjud';
  if (now < isha) return null;

  /*
    Where ʿIshāʾ itself falls after the middle of the night, which happens far
    enough from the equator in summer, qiyam gets no span of its own and witr
    keeps the time until the last third. Witr vanishing on the nights it is
    hardest to fit in would be the wrong way round.
  */
  if (now >= evening.middleOfNight && isha < evening.middleOfNight) return 'qiyam';
  return 'witr';
}
