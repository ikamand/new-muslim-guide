import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import type { PlannedReminder } from './reminders';

/**
 * Everything that actually touches the notification system.
 *
 * Kept apart from `reminders.ts`, which works out *when* to fire and is pure.
 * This module knows only how to put those instants into the OS.
 *
 * The app owns every notification it schedules and never has more than one set
 * pending, so rescheduling clears everything and starts again. That is
 * simpler than reconciling, and reconciling would buy nothing — the times
 * shift daily anyway.
 */

const ANDROID_CHANNEL = 'prayer-reminders';

/**
 * expo-notifications does not schedule on web — calling it throws, and
 * `use-reminders` runs on every screen via Settings, so the whole web preview
 * crashed on a module phones never miss. Phones are the product; the web
 * build exists so changes can be looked at, and it must stay bootable.
 * Reminders simply do not exist there: no permission, nothing scheduled.
 */
const NO_SCHEDULER = Platform.OS === 'web';

/**
 * Android 8 and later attach sound and importance to a channel rather than to
 * the notification, and a channel's settings are fixed once it is created.
 * A custom adhan will need a new channel id, not an edit to this one — and the
 * sound file itself has to be bundled in a build, which no update can do.
 */
export async function ensureAndroidChannel(name: string): Promise<void> {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL, {
    name,
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 200, 150, 200],
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  });
}

/**
 * Asks for permission, but only at the moment someone turns a reminder on.
 *
 * Never on launch. A permission prompt before anyone has asked for anything is
 * how an app gets refused once and permanently.
 */
export async function requestPermission(): Promise<boolean> {
  if (NO_SCHEDULER) return false;
  const existing = await Notifications.getPermissionsAsync();
  if (existing.granted) return true;
  if (!existing.canAskAgain) return false;

  const asked = await Notifications.requestPermissionsAsync({
    ios: { allowAlert: true, allowSound: true, allowBadge: false },
  });
  return asked.granted;
}

export async function hasPermission(): Promise<boolean> {
  if (NO_SCHEDULER) return false;
  return (await Notifications.getPermissionsAsync()).granted;
}

export type ReminderCopy = {
  /** "Fajr" — whatever the prayer is called in the reader's language. */
  title: (prayerId: PlannedReminder['prayerId']) => string;
  /** "In 10 minutes" or "It is time to pray". */
  body: (minutesBefore: number) => string;
  /** Name of the Android channel, shown in the system settings app. */
  channelName: string;
};

/** Replaces every pending reminder with the given set. */
export async function reschedule(
  planned: PlannedReminder[],
  copy: ReminderCopy,
  leadMinutes: number,
): Promise<number> {
  if (NO_SCHEDULER) return 0;
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (planned.length === 0) return 0;

  await ensureAndroidChannel(copy.channelName);

  for (const reminder of planned) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: copy.title(reminder.prayerId),
        body: copy.body(leadMinutes),
        sound: true,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminder.fireAt,
        channelId: ANDROID_CHANNEL,
      },
    });
  }

  return planned.length;
}

export async function cancelAll(): Promise<void> {
  if (NO_SCHEDULER) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function pendingCount(): Promise<number> {
  if (NO_SCHEDULER) return 0;
  return (await Notifications.getAllScheduledNotificationsAsync()).length;
}
