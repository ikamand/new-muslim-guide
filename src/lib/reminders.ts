import {
  defaultVoiceFor,
  getVoice,
  isAdhanVoiceId,
  voiceAllowedFor,
  type AdhanVoiceId,
} from '@/content/adhan-voices';

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
 *    so five prayers across twelve days sits just under it, and the Pre-Adhan
 *    reminders, wake-ups and notes on top of them are cut from the far end (`PENDING_CAP` in
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

/**
 * What a prayer's time does, chosen one prayer at a time (Iyad, 14 Sep 2026:
 * the bell beside each prayer opens that prayer's own page).
 *
 * - `adhan`: Android plays the recording, whole or its opening, and an
 *   iPhone the opening, as the notification's sound.
 * - `sound`: a notification with the phone's own sound.
 * - `silent`: the same notification without a sound.
 * - `off`: nothing.
 *
 * Every one of them comes at the prayer's time itself: the adhan says the
 * time has come in, and ten minutes early that is false. A heads-up before it
 * is the Pre-Adhan reminder, a separate notification (Iyad, 14 Sep 2026).
 */
export type AlertMode = 'adhan' | 'sound' | 'silent' | 'off';

/** Android: the whole recording, or its opening. An iPhone always plays the opening. */
export type AdhanLength = 'short' | 'full';

export const ALERT_MODES: readonly AlertMode[] = ['adhan', 'sound', 'silent', 'off'];

export type PrayerAlert = {
  mode: AlertMode;
  /** The recording, for `adhan`. Kept while another mode is chosen, so coming back finds it. */
  voice: AdhanVoiceId;
  length: AdhanLength;
  /**
   * Android: how loud the adhan plays, as a share of the phone's media volume
   * range, 0.1 to 1. The phone's own volume comes back when it ends.
   */
  volume: number;
  /** A notification this many minutes before the prayer. 0 is none. */
  preReminderMinutes: number;
  /** Android: play with the phone on silent or vibrate. */
  playOnSilent: boolean;
  /** Android: play during Do Not Disturb. */
  playInDnd: boolean;
  /** iPhone: let the opening sound through a Focus, as a time-sensitive notification. */
  soundInFocus: boolean;
};

export type ReminderSettings = {
  alerts: Record<PrayerId, PrayerAlert>;
};

export const PRE_REMINDER_CHOICES = [0, 5, 10, 15, 30] as const;

/** Loud enough to hear across a room, short of the top of the range. */
export const DEFAULT_ADHAN_VOLUME = 0.6;

export function defaultAlert(id: PrayerId): PrayerAlert {
  return {
    mode: 'off',
    voice: defaultVoiceFor(id),
    length: 'full',
    volume: DEFAULT_ADHAN_VOLUME,
    preReminderMinutes: 0,
    playOnSilent: false,
    playInDnd: false,
    soundInFocus: false,
  };
}

export const DEFAULT_REMINDERS: ReminderSettings = {
  alerts: {
    fajr: defaultAlert('fajr'),
    dhuhr: defaultAlert('dhuhr'),
    asr: defaultAlert('asr'),
    maghrib: defaultAlert('maghrib'),
    isha: defaultAlert('isha'),
  },
};

export const alertIsOn = (alert: PrayerAlert): boolean => alert.mode !== 'off';

const isLead = (value: unknown): value is number =>
  typeof value === 'number' && (PRE_REMINDER_CHOICES as readonly number[]).includes(value);

/** A stored volume held to the range and to hundredths; anything else reads as the default. */
const readVolume = (value: unknown): number =>
  typeof value === 'number' && Number.isFinite(value)
    ? Math.round(Math.min(1, Math.max(0.1, value)) * 100) / 100
    : DEFAULT_ADHAN_VOLUME;

/**
 * A stored value, narrowed field by field: a half-written object would
 * otherwise schedule notifications for prayers nobody asked about.
 *
 * It also reads the two shapes before this one. The oldest, a switch per
 * prayer and one lead time for all five: a prayer that was on becomes a
 * notification with that lead as its Pre-Adhan reminder. The first alert
 * build (14 Sep 2026), where a notification fired at its lead time: the lead
 * becomes the reminder for a notification, and never for an adhan, which
 * ignored it.
 */
export function parseReminderSettings(raw: unknown): ReminderSettings {
  if (typeof raw !== 'object' || raw === null) return DEFAULT_REMINDERS;
  const stored = raw as { alerts?: unknown; prayers?: unknown; leadMinutes?: unknown };
  const alerts = { ...DEFAULT_REMINDERS.alerts };

  if (typeof stored.alerts === 'object' && stored.alerts !== null) {
    const entries = stored.alerts as Record<string, unknown>;
    for (const id of PRAYER_IDS) {
      const entry = entries[id];
      if (typeof entry !== 'object' || entry === null) continue;
      const { mode, voice, length, volume, preReminderMinutes, leadMinutes, playOnSilent, playInDnd, soundInFocus } =
        entry as Record<string, unknown>;
      const base = defaultAlert(id);
      const readMode = ALERT_MODES.includes(mode as AlertMode) ? (mode as AlertMode) : base.mode;
      const wasNotification = readMode === 'sound' || readMode === 'silent';
      alerts[id] = {
        mode: readMode,
        // A voice dropped from a later build, or a Fajr recording stored against another prayer, reads as the default.
        voice: isAdhanVoiceId(voice) && voiceAllowedFor(id, voice) ? voice : base.voice,
        length: length === 'short' ? 'short' : 'full',
        volume: readVolume(volume),
        preReminderMinutes: isLead(preReminderMinutes)
          ? preReminderMinutes
          : preReminderMinutes === undefined && wasNotification && isLead(leadMinutes)
            ? leadMinutes
            : base.preReminderMinutes,
        playOnSilent: playOnSilent === true,
        playInDnd: playInDnd === true,
        soundInFocus: soundInFocus === true,
      };
    }
    return { alerts };
  }

  if (typeof stored.prayers === 'object' && stored.prayers !== null) {
    const flags = stored.prayers as Record<string, unknown>;
    const lead = isLead(stored.leadMinutes) ? stored.leadMinutes : 10;
    for (const id of PRAYER_IDS) {
      const on = flags[id] === true;
      alerts[id] = { ...defaultAlert(id), mode: on ? 'sound' : 'off', preReminderMinutes: on ? lead : 0 };
    }
  }
  return { alerts };
}

/**
 * One prayer's choices for all five: "Use these for all prayers".
 *
 * The voice goes only where it is the prayer's own kind. A Fajr recording
 * never reaches another prayer, and an adhan of the other prayers copied from
 * ʿAsr does not quietly take Fajr's line away from Fajr; each keeps the voice
 * it had. Fajr's own choice of an adhan without the line still reaches the
 * others, because for them it is their own kind.
 */
export function applyAlertToAll(settings: ReminderSettings, id: PrayerId): ReminderSettings {
  const source = settings.alerts[id];
  const kind = getVoice(source.voice).kind;
  const alerts = { ...settings.alerts };
  for (const other of PRAYER_IDS) {
    const ownKind = other === 'fajr' ? 'fajr' : 'other';
    const takesVoice = other === id || kind === ownKind;
    alerts[other] = { ...source, voice: takesVoice ? source.voice : settings.alerts[other].voice };
  }
  return { alerts };
}

export type PlannedReminder = {
  /** Stable per prayer per day, so a reschedule replaces rather than duplicates. */
  key: string;
  prayerId: PrayerId;
  /** `alert` is the prayer's own alert, at its time; `pre` is the Pre-Adhan reminder before it. */
  kind: 'alert' | 'pre';
  fireAt: Date;
  /** When the prayer itself begins. */
  prayerAt: Date;
  alert: PrayerAlert;
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
  const enabled = PRAYER_IDS.filter((id) => alertIsOn(settings.alerts[id]));
  if (enabled.length === 0) return [];

  const planned: PlannedReminder[] = [];

  for (let offset = 0; offset < daysAhead; offset += 1) {
    const day = new Date(from.getFullYear(), from.getMonth(), from.getDate() + offset);
    const times = computeDay(coords, day, profile);

    for (const prayer of times.prayers) {
      const alert = settings.alerts[prayer.id];
      if (!alertIsOn(alert)) continue;

      const key = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}-${prayer.id}`;
      // A moment that has already passed would fire instantly, so neither is planned for one.
      if (alert.preReminderMinutes > 0) {
        const pre = new Date(prayer.time.getTime() - alert.preReminderMinutes * 60_000);
        if (pre.getTime() > from.getTime()) {
          planned.push({ key: `${key}-pre`, prayerId: prayer.id, kind: 'pre', fireAt: pre, prayerAt: prayer.time, alert });
        }
      }
      if (prayer.time.getTime() > from.getTime()) {
        planned.push({ key, prayerId: prayer.id, kind: 'alert', fireAt: prayer.time, prayerAt: prayer.time, alert });
      }
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

