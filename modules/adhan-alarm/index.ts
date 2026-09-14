import { requireOptionalNativeModule } from 'expo-modules-core';
import { Platform } from 'react-native';

/**
 * The full adhan at a prayer's time, on Android.
 *
 * Android only, and optional. An iPhone has no such module (it hears the
 * opening as the notification's own sound), the web preview has none, and a
 * build from before this module existed has none either. Every function is a
 * no-op without it, and `adhanAlarmAvailable` says so, so the caller falls
 * back to a notification sound rather than to silence.
 *
 * The native side decides at the moment an alarm fires whether to play,
 * from the phone as it is then: see `AdhanAlarmReceiver.kt`.
 */

export type AdhanAlarmInput = {
  /** Stable per prayer per day, so a reschedule replaces rather than duplicates. */
  id: string;
  /** Epoch milliseconds. */
  fireAt: number;
  /** The recording's name in `res/raw`: `rawName` in `content/adhan-voices.ts`. */
  sound: string;
  title: string;
  playingText: string;
  quietText: string;
  stopLabel: string;
  playOnSilent: boolean;
  playInDnd: boolean;
};

/** The names Android lists under the app's notification settings. */
export type AdhanChannelNames = { playing: string; quiet: string };

export type AdhanOutcome = {
  title: string;
  at: number;
  played: boolean;
  /** One word from `AdhanStore.recordOutcome`. */
  reason: string;
  test: boolean;
};

/** Ids that start with this are test rings, which a reschedule leaves alone. */
export const TEST_PREFIX = 'test:';

type Native = {
  replaceAll(alarms: AdhanAlarmInput[], channels: AdhanChannelNames): Promise<number>;
  ringSoon(alarm: AdhanAlarmInput, channels: AdhanChannelNames): Promise<void>;
  cancelAll(): Promise<void>;
  lastOutcome(): string | null;
  canScheduleExact(): boolean;
};

const native = Platform.OS === 'android' ? requireOptionalNativeModule<Native>('AdhanAlarm') : null;

export const adhanAlarmAvailable = native !== null;

export async function replaceAdhanAlarms(
  alarms: AdhanAlarmInput[],
  channels: AdhanChannelNames,
): Promise<number> {
  return native ? native.replaceAll(alarms, channels) : 0;
}

export async function ringAdhanSoon(alarm: AdhanAlarmInput, channels: AdhanChannelNames): Promise<boolean> {
  if (!native) return false;
  await native.ringSoon(alarm, channels);
  return true;
}

export async function cancelAdhanAlarms(): Promise<void> {
  if (native) await native.cancelAll();
}

export function lastAdhanOutcome(): AdhanOutcome | null {
  const raw = native?.lastOutcome();
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AdhanOutcome>;
    return typeof parsed.reason === 'string' && typeof parsed.at === 'number' && typeof parsed.title === 'string'
      ? (parsed as AdhanOutcome)
      : null;
  } catch {
    return null;
  }
}
