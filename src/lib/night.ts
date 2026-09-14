import type { DayTimes, PrayerId } from './prayer-times';

/**
 * Which of the night's voluntary prayers the clock is in.
 *
 * The night is split at the boundaries the Awqat day page already prints, so
 * what Today draws and what that page says agree to the minute:
 *
 *   Maghrib · nothing · ʿIshāʾ · witr · middle · qiyam · last third · tahajjud · Fajr
 *
 * The night begins at Maghrib, because the Islamic day ends there. The first
 * version of the Today card measured it from ʿIshāʾ and opened the last third
 * about half an hour late.
 *
 * Iyad, 13 Sep 2026, first as three rows on Today, one for each part. Since
 * "The Night Thread" the same day, Today draws the night as one line
 * (`nightThread`) under one card (`tonightPlan`), and no longer asks this
 * function. It stays as the statement of the parts: the Ramadan arc names
 * them, and `npm run night:check` holds the thread to it minute by minute.
 *
 * Witr holds until the middle of the night rather than for a moment after
 * ʿIshāʾ, because its own page tells anyone who might not wake to pray it
 * before bed, and bed is mostly before the middle.
 *
 * Qiyam AFTER witr is sound as long as witr is not prayed again: in Abu Dawud
 * 1439 Talq ibn ʿAli prays witr, then leads a prayer at his mosque and hands
 * that witr to someone else, citing "no two witrs in one night". The qiyam page
 * carries that sentence. The app does not know whether anyone prayed witr, and
 * must not guess, so the card asks ("Not prayed witr yet?") rather than tells.
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

/** Which card the night shows: before sleep, a night of Ramadan, or the last third. */
export type TonightState = 'before' | 'ramadan' | 'third';

/**
 * Where witr's mark sits on tonight's line: `early`, with the imam at the end
 * of taraweeh; `next`, just ahead of now, before sleep; `end`, the end of the
 * night, for someone who will wake.
 */
export type WitrPlace = 'early' | 'next' | 'end';

export type TonightPlan = {
  state: TonightState;
  /** Absent in the last third when no wake-up is set: see `tonightPlan`. */
  witr?: WitrPlace;
  /** The switch the card shows: suhoor's on a night of Ramadan, the night wake-up otherwise. */
  wakeFlag: 'suhoorWakeUp' | 'nightWakeUp';
  /** The alarm that will really ring before this Fajr, drawn as the bell. */
  bell?: 'suhoor' | 'night';
};

/**
 * What tonight's card and line say, from the part of the night, whether it is
 * a night of Ramadan, and the reader's two wake-up switches. Nothing else: it
 * never reads, stores or guesses what anybody prayed.
 *
 * - **Witr** is placed only by what the reader told the app. On a night of
 *   Ramadan it is early all night, prayed with the imam at the end of
 *   taraweeh, which the Taraweeh page advises even for someone who will pray
 *   again later. Otherwise the wake-up switch decides: on, the end of the
 *   night, because the Sunnah puts witr last for someone who will wake
 *   (Muslim 755); off, just ahead of now, before sleep. Off in the last
 *   third, no mark at all. By then the app cannot know whether witr was
 *   prayed, so the card asks and the line stays silent. The first build drew
 *   it at the end of every last third, which contradicted the card beside it.
 * - **The bell** is the alarm that will ring, which is not always the card's
 *   switch. A night gets one alarm: on a night of Ramadan the suhoor wake-up
 *   replaces the night wake-up while both are on (`use-reminders.ts`), and
 *   the night wake-up still rings when suhoor's is off.
 *
 * Pure, and walked by `npm run night:check` against the planners that ring.
 *
 * ⚠️ Where witr sits is a ruling drawn on screen, and is on the review pile.
 */
export function tonightPlan({
  part,
  ramadanNight,
  suhoorWakeUp,
  nightWakeUp,
}: {
  part: NightThread['part'];
  ramadanNight: boolean;
  suhoorWakeUp: boolean;
  nightWakeUp: boolean;
}): TonightPlan {
  const state: TonightState = part === 'third' ? 'third' : ramadanNight ? 'ramadan' : 'before';
  const witr: WitrPlace | undefined = ramadanNight
    ? 'early'
    : nightWakeUp
      ? 'end'
      : part === 'third'
        ? undefined
        : 'next';
  return {
    state,
    witr,
    wakeFlag: ramadanNight ? 'suhoorWakeUp' : 'nightWakeUp',
    bell: ramadanNight && suhoorWakeUp ? 'suhoor' : nightWakeUp ? 'night' : undefined,
  };
}
