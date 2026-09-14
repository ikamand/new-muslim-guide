import { NIGHT_WAKE_LEAD_MINUTES } from './night';
import { computeDay, PRAYER_IDS, type LatLon, type MethodProfile, type PrayerId } from './prayer-times';

/**
 * Working out when to fire a prayer reminder.
 *
 * Pure arithmetic, deliberately: it takes coordinates and settings and returns
 * a list of instants, and knows nothing about the notification system. That is
 * what makes it checkable without a phone.
 *
 * Two constraints shape the design.
 *
 * 1. **iOS caps how many notifications an app may have pending.** The cap is 64,
 *    so five prayers across twelve days sits just under it, and the wake-ups
 *    and notes on top of them are cut from the far end (`PENDING_CAP` in
 *    `use-reminders.ts`). This is why the app schedules a rolling window and
 *    tops it up on launch rather than scheduling a year of prayers once.
 *
 * 2. **Prayer times are not a fixed clock time.** Every day differs, and the
 *    difference is largest exactly where reminders matter most — Fajr in a
 *    northern spring moves by minutes a day. So each day is computed on its own
 *    rather than repeating a daily alarm.
 */

/** Twelve days × five prayers = 60, just under the 64 iOS allows to be pending. Anything on top is cut from the far end. */
export const DAYS_AHEAD = 12;

export type ReminderSettings = {
  /** Which prayers to be reminded of. */
  prayers: Record<PrayerId, boolean>;
  /** How long before the prayer to fire. 0 fires at the time itself. */
  leadMinutes: number;
};

export const DEFAULT_REMINDERS: ReminderSettings = {
  prayers: { fajr: false, dhuhr: false, asr: false, maghrib: false, isha: false },
  leadMinutes: 10,
};

export const LEAD_CHOICES = [0, 5, 10, 15, 30] as const;

export type PlannedReminder = {
  /** Stable per prayer per day, so a reschedule replaces rather than duplicates. */
  key: string;
  prayerId: PrayerId;
  /** When the notification fires — already offset by the lead time. */
  fireAt: Date;
  /** When the prayer itself begins. */
  prayerAt: Date;
};

/**
 * Every reminder to schedule from `from` onwards.
 *
 * Days are stepped by building a fresh local date rather than adding 24 hours,
 * because adding 86,400,000 ms across a daylight-saving change lands on the
 * wrong day — the same trap `prayer-times.ts` avoids when picking a date.
 */
export function planReminders(
  coords: LatLon,
  profile: MethodProfile,
  settings: ReminderSettings,
  from: Date,
  daysAhead: number = DAYS_AHEAD,
): PlannedReminder[] {
  const enabled = PRAYER_IDS.filter((id) => settings.prayers[id]);
  if (enabled.length === 0) return [];

  const planned: PlannedReminder[] = [];

  for (let offset = 0; offset < daysAhead; offset += 1) {
    const day = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
    const times = computeDay(coords, day, profile);

    for (const prayer of times.prayers) {
      if (!settings.prayers[prayer.id]) continue;

      const fireAt = new Date(prayer.time.getTime() - settings.leadMinutes * 60_000);
      // A reminder for a moment that has already passed would fire instantly.
      if (fireAt.getTime() <= from.getTime()) continue;

      planned.push({
        key: `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}-${prayer.id}`,
        prayerId: prayer.id,
        fireAt,
        prayerAt: prayer.time,
      });
    }
  }

  return planned;
}

/* ------------------------------------------------------------------ */
/* The windows — docs/ramadan-mode.md R3 and the two notes from        */
/* docs/build-order.md. Same shape as planReminders: pure arithmetic   */
/* over the same day loop, returning instants for use-reminders to     */
/* word and schedule. Each planner exists only while its toggle is on. */
/* ------------------------------------------------------------------ */

/** A planned moment plus the prayer time it is anchored to, for the wording. */
export type PlannedMoment = {
  fireAt: Date;
  anchor: Date;
};

/** Minutes before Fajr the suhoor wake-up fires. One sensible value, stated
    plainly on the switch, rather than a configurator nobody asked for. */
export const SUHOOR_LEAD_MINUTES = 45;

function eachDay(
  coords: LatLon,
  profile: MethodProfile,
  from: Date,
  daysAhead: number,
  pick: (day: Date, prayers: { id: PrayerId; time: Date }[]) => PlannedMoment | undefined,
): PlannedMoment[] {
  const planned: PlannedMoment[] = [];
  for (let offset = 0; offset < daysAhead; offset += 1) {
    const day = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
    const moment = pick(day, computeDay(coords, day, profile).prayers);
    if (moment && moment.fireAt.getTime() > from.getTime()) planned.push(moment);
  }
  return planned;
}

/** A clock time somebody picked for a wake-up, like an alarm clock. Local time. */
export type WakeTime = { hour: number; minute: number };

/** The two switches that are wake-ups, by their setting's name. */
export type WakeFlag = 'nightWakeUp' | 'suhoorWakeUp';

/**
 * Whether a wake-up rings on a morning, given whether that morning is in
 * Ramadan: suhoor's only in Ramadan, and the night wake-up every morning
 * except a Ramadan one while suhoor's is on, because a night gets one alarm.
 *
 * The notification sync and the rows that show these alarms both ask this, so
 * a row cannot name a ring the phone will not make.
 */
export function wakeRingsOn(flag: WakeFlag, ramadanMorning: boolean, suhoorWakeUp: boolean): boolean {
  return flag === 'suhoorWakeUp' ? ramadanMorning : !(suhoorWakeUp && ramadanMorning);
}

/** Enough of a shape check to trust a stored time. */
export function isWakeTime(value: unknown): value is WakeTime {
  if (typeof value !== 'object' || value === null) return false;
  const { hour, minute } = value as Record<string, unknown>;
  return (
    typeof hour === 'number' &&
    Number.isInteger(hour) &&
    hour >= 0 &&
    hour <= 23 &&
    typeof minute === 'number' &&
    Number.isInteger(minute) &&
    minute >= 0 &&
    minute <= 59
  );
}

/** The three instants of one night a wake-up is placed by. */
export type WakeNight = { isha: Date; fajr: Date; lastThird: Date };

export type PlannedWake = PlannedMoment & {
  /** A set time that did not fit inside this night, so the default rang instead. */
  fellBack: boolean;
  /** Rings before the last third begins, which only a set time can do. */
  beforeLastThird: boolean;
};

/**
 * When a wake-up rings before one Fajr.
 *
 * With no time set it follows Fajr: the night prayer's an hour before, and
 * never before the last third begins (`NIGHT_WAKE_LEAD_MINUTES`, `night.ts`);
 * suhoor's `SUHOOR_LEAD_MINUTES` before.
 *
 * With a time set (Iyad, 13 Sep 2026: "like an alarm clock") it rings at that
 * clock time wherever it falls between ʿIshāʾ and Fajr, before the last third
 * too, because qiyam al-layl is any time after ʿIshāʾ. A time outside the
 * night rings at the default instead. That is what a fixed alarm becomes as
 * Fajr moves earlier through the year, and a suhoor alarm after Fajr is worse
 * than none; the row that sets it says so on the morning it happens.
 */
export function resolveWake(
  kind: 'night' | 'suhoor',
  night: WakeNight,
  time: WakeTime | null,
): { fireAt: Date; fellBack: boolean } {
  const fallback =
    kind === 'suhoor'
      ? new Date(night.fajr.getTime() - SUHOOR_LEAD_MINUTES * 60_000)
      : new Date(
          Math.max(night.fajr.getTime() - NIGHT_WAKE_LEAD_MINUTES * 60_000, night.lastThird.getTime()),
        );
  if (!time) return { fireAt: fallback, fellBack: false };

  // On Fajr's own date, or on the evening before it for a time before midnight.
  for (const daysBack of [0, 1]) {
    const candidate = new Date(
      night.fajr.getFullYear(),
      night.fajr.getMonth(),
      night.fajr.getDate() - daysBack,
      time.hour,
      time.minute,
    );
    if (candidate >= night.isha && candidate < night.fajr) return { fireAt: candidate, fellBack: false };
  }
  return { fireAt: fallback, fellBack: true };
}

/** The night that ends at `day`'s Fajr, which began the evening before. */
function nightEndingOn(coords: LatLon, profile: MethodProfile, day: Date): WakeNight | undefined {
  const fajr = computeDay(coords, day, profile).prayers.find((prayer) => prayer.id === 'fajr')?.time;
  const evening = computeDay(coords, new Date(day.getFullYear(), day.getMonth(), day.getDate() - 1), profile);
  const isha = evening.prayers.find((prayer) => prayer.id === 'isha')?.time;
  if (!fajr || !isha) return undefined;
  return { isha, fajr, lastThird: evening.lastThirdOfNight };
}

function planWakes(
  coords: LatLon,
  profile: MethodProfile,
  from: Date,
  daysAhead: number,
  kind: 'night' | 'suhoor',
  time: WakeTime | null,
  skip: (day: Date) => boolean,
): PlannedWake[] {
  const planned: PlannedWake[] = [];
  for (let offset = 0; offset < daysAhead; offset += 1) {
    const day = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
    if (skip(day)) continue;
    const night = nightEndingOn(coords, profile, day);
    if (!night) continue;
    const wake = resolveWake(kind, night, time);
    // A wake-up for a moment that has already passed would fire instantly.
    if (wake.fireAt.getTime() <= from.getTime()) continue;
    planned.push({
      ...wake,
      anchor: night.fajr,
      beforeLastThird: wake.fireAt.getTime() < night.lastThird.getTime(),
    });
  }
  return planned;
}

/**
 * Wake-ups before Fajr, only on days that fall in Ramadan.
 *
 * `isRamadan` is injected rather than imported so this file stays pure
 * arithmetic — the Hijri conversion lives with the caller, and a check can
 * hand in a fake calendar.
 */
export function planSuhoor(
  coords: LatLon,
  profile: MethodProfile,
  from: Date,
  isRamadan: (day: Date) => boolean,
  daysAhead: number = DAYS_AHEAD,
  time: WakeTime | null = null,
): PlannedWake[] {
  return planWakes(coords, profile, from, daysAhead, 'suhoor', time, (day) => !isRamadan(day));
}

/**
 * The night wake-up before each Fajr, placed by `resolveWake`.
 *
 * `skip` is injected like `planSuhoor`'s calendar, so this stays arithmetic.
 * The caller skips Ramadan mornings while the suhoor wake-up is on, because a
 * night gets one alarm.
 */
export function planNightWake(
  coords: LatLon,
  profile: MethodProfile,
  from: Date,
  skip: (day: Date) => boolean,
  daysAhead: number = DAYS_AHEAD,
  time: WakeTime | null = null,
): PlannedWake[] {
  return planWakes(coords, profile, from, daysAhead, 'night', time, skip);
}

/**
 * The next time a wake-up would ring, whatever the calendar says, for the row
 * that shows and sets it: a suhoor row in Shaʿbān still shows a real time.
 */
export function nextWake(
  coords: LatLon,
  profile: MethodProfile,
  from: Date,
  kind: 'night' | 'suhoor',
  time: WakeTime | null,
): PlannedWake | undefined {
  return planWakes(coords, profile, from, 3, kind, time, () => false)[0];
}

/** A note shortly after Fajr that the morning adhkār window is open. */
export function planAdhkarNotes(
  coords: LatLon,
  profile: MethodProfile,
  from: Date,
  daysAhead: number = DAYS_AHEAD,
): PlannedMoment[] {
  return eachDay(coords, profile, from, daysAhead, (day, prayers) => {
    const fajr = prayers.find((prayer) => prayer.id === 'fajr')?.time;
    if (!fajr) return undefined;
    return { fireAt: new Date(fajr.getTime() + 10 * 60_000), anchor: fajr };
  });
}

/** Thursday after Maghrib: tomorrow is Jumuʿah. The night before, because the
    decision that needs lead time — leaving work for the midday prayer — is
    made the evening before, not at 11am. */
export function planJumuahNotes(
  coords: LatLon,
  profile: MethodProfile,
  from: Date,
  daysAhead: number = DAYS_AHEAD,
): PlannedMoment[] {
  return eachDay(coords, profile, from, daysAhead, (day, prayers) => {
    if (day.getDay() !== 4) return undefined;
    const maghrib = prayers.find((prayer) => prayer.id === 'maghrib')?.time;
    if (!maghrib) return undefined;
    return { fireAt: new Date(maghrib.getTime() + 45 * 60_000), anchor: maghrib };
  });
}

