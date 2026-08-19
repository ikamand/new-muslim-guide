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
 *    so five prayers across twelve days sits just under it. This is why the app
 *    schedules a rolling window and tops it up on launch rather than scheduling
 *    a year of prayers once.
 *
 * 2. **Prayer times are not a fixed clock time.** Every day differs, and the
 *    difference is largest exactly where reminders matter most — Fajr in a
 *    northern spring moves by minutes a day. So each day is computed on its own
 *    rather than repeating a daily alarm.
 */

/** Twelve days × five prayers = 60, just under the 64 iOS allows to be pending. */
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

/** True where the planned set would exceed what iOS will hold. */
export function exceedsPlatformLimit(planned: PlannedReminder[]): boolean {
  return planned.length > 64;
}
