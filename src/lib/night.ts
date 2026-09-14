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
 * ʿIshāʾ, because its own page tells anyone who might not wake to pray it
 * before bed, and bed is mostly before the middle.
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

/**
 * How long before Fajr the night wake-up rings. Never earlier than the last
 * third: on the shortest nights the last third can begin less than an hour
 * before Fajr, and a wake-up before it would wake somebody for the wrong part
 * of the night.
 */
export const NIGHT_WAKE_LEAD_MINUTES = 60;

/**
 * Tonight, measured for the thread Today draws under the prayer card.
 *
 * Every fraction runs along ʿIshāʾ → Fajr, clamped to 0..1, because that is
 * the line on screen: the part of the night in which witr and the night prayer
 * can be prayed at all.
 */
export type NightThread = {
  isha: Date;
  fajr: Date;
  lastThirdAt: Date;
  /** The wake-up: an hour before Fajr, never before the last third begins. */
  wakeAt: Date;
  now: number;
  lastThird: number;
  wake: number;
  /** `third` from the start of the last third, measured from Maghrib. */
  part: 'before' | 'third';
};

/**
 * Where the moon is tonight, or null outside ʿIshāʾ → Fajr.
 *
 * Pure, like `nightPrayerAt`, and walked by `npm run night:check`. The two
 * agree by construction: from ʿIshāʾ on, this is non-null exactly when that
 * is, and `part` is `third` exactly when that says `tahajjud`.
 *
 * Where ʿIshāʾ itself falls inside the last third, far enough from the
 * equator in summer, `lastThird` is 0 and the whole line is gold.
 */
export function nightThread(evening: DayTimes, morning: DayTimes, now: Date): NightThread | null {
  const isha = timeOf(evening, 'isha');
  const fajr = timeOf(morning, 'fajr');
  if (!isha || !fajr || now < isha || now >= fajr) return null;

  const span = fajr.getTime() - isha.getTime();
  if (span <= 0) return null;
  const along = (date: Date) => Math.min(1, Math.max(0, (date.getTime() - isha.getTime()) / span));

  const lastThirdAt = evening.lastThirdOfNight;
  const wakeAt = new Date(
    Math.max(fajr.getTime() - NIGHT_WAKE_LEAD_MINUTES * 60_000, lastThirdAt.getTime()),
  );

  return {
    isha,
    fajr,
    lastThirdAt,
    wakeAt,
    now: along(now),
    lastThird: along(lastThirdAt),
    wake: along(wakeAt),
    part: now >= lastThirdAt ? 'third' : 'before',
  };
}
