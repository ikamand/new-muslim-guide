import { requireOptionalNativeModule } from 'expo-modules-core';
import { Platform } from 'react-native';

/**
 * The adhan at a prayer's time, on Android.
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
  /** The recording's name in `res/raw`: `rawName` or `shortRawName` in `content/adhan-voices.ts`. */
  sound: string;
  title: string;
  playingText: string;
  quietText: string;
  stopLabel: string;
  playOnSilent: boolean;
  playInDnd: boolean;
  /** A share of the media volume range, 0.1 to 1, held while it plays. */
  volume: number;
};

/** The names Android lists under the app's notification settings. */
/** What Android lists in the app's notification settings: while it plays, when it could not, and after it played. */
export type AdhanChannelNames = { playing: string; quiet: string; after: string };

export type AdhanOutcome = {
  title: string;
  at: number;
  played: boolean;
  /** One word from `AdhanStore.recordOutcome`. */
  reason: string;
  test: boolean;
  /** How long it played, where it did; absent from outcomes the first build recorded. */
  seconds?: number;
};

/** Ids that start with this are test rings, which a reschedule leaves alone. */
export const TEST_PREFIX = 'test:';

type Subscription = { remove(): void };

type Native = {
  replaceAll(alarms: AdhanAlarmInput[], channels: AdhanChannelNames): Promise<number>;
  ringSoon(alarm: AdhanAlarmInput, channels: AdhanChannelNames): Promise<void>;
  cancelAll(): Promise<void>;
  lastOutcome(): string | null;
  canScheduleExact(): boolean;
  previewStart?(sound: string, volume: number): Promise<void>;
  previewStop?(): Promise<void>;
  previewVolume?(volume: number): Promise<void>;
  addListener?(event: 'onPreviewEnd', listener: (event: { sound: string }) => void): Subscription;
};

const native = Platform.OS === 'android' ? requireOptionalNativeModule<Native>('AdhanAlarm') : null;

export const adhanAlarmAvailable = native !== null;

/**
 * Whether this build can play a recording from a prayer's page. The first
 * build with the module could not, so the page asks rather than assumes.
 */
export const adhanPreviewAvailable = typeof native?.previewStart === 'function';

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

/** Plays a recording from `res/raw` at the adhan's volume. One at a time; a second stops the first. */
export async function startAdhanPreview(sound: string, volume: number): Promise<boolean> {
  if (!native?.previewStart) return false;
  await native.previewStart(sound, volume);
  return true;
}

export async function stopAdhanPreview(): Promise<void> {
  if (native?.previewStop) await native.previewStop();
}

/** Moves a playing preview to a new volume, as the bar is dragged. A build without it ignores the call. */
export async function setAdhanPreviewVolume(volume: number): Promise<void> {
  if (native?.previewVolume) await native.previewVolume(volume);
}

/** Called when a preview ends, by finishing, by Stop, or by another sound taking over. */
export function onAdhanPreviewEnd(listener: (sound: string) => void): () => void {
  if (!native?.addListener) return () => {};
  const subscription = native.addListener('onPreviewEnd', (event) => listener(event.sound));
  return () => subscription.remove();
}
