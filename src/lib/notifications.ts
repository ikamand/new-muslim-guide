import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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
 *
 * The adhan on Android is not here. It plays from `modules/adhan-alarm`,
 * which sets its own alarms, because a notification cannot play three minutes
 * of audio.
 */

const ANDROID_CHANNEL = 'prayer-reminders';

/**
 * The same reminders without a sound, for a prayer set to Silent. Android
 * fixes a channel's sound when the channel is created, so silence is a second
 * channel rather than a setting on the first.
 */
const ANDROID_SILENT_CHANNEL = 'prayer-reminders-silent';

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
 */
export async function ensureAndroidChannels(name: string, silentName: string): Promise<void> {
  if (Platform.OS !== 'android') return;

  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL, {
    name,
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 200, 150, 200],
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  });
  await Notifications.setNotificationChannelAsync(ANDROID_SILENT_CHANNEL, {
    name: silentName,
    importance: Notifications.AndroidImportance.HIGH,
    sound: null,
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

/**
 * One notification, already worded. The planners in `reminders.ts` say when;
 * the caller says what; this module only delivers. Growing past prayers —
 * suhoor, the adhkār window, Thursday's Jumuʿah note — meant the wording
 * could no longer be a function of a prayer id, so each item carries its own.
 */
export type ScheduledItem = {
  fireAt: Date;
  title: string;
  body: string;
  /**
   * Left out: the phone's own notification sound. `null`: no sound. A file
   * name: a sound bundled into the iOS app, which is how an iPhone hears the
   * opening of the adhan (`openingSoundFile` in `content/adhan-voices.ts`).
   */
  sound?: string | null;
  /** iPhone: deliver through a Focus. Needs the Time Sensitive entitlement in app.json. */
  timeSensitive?: boolean;
};

/**
 * Replaces every pending notification with the given set.
 *
 * The caller is responsible for keeping the set under the iOS cap of 64
 * pending — `use-reminders` sorts everything by fire time and keeps the
 * nearest 60, so what is dropped is always the furthest away, which the next
 * foreground top-up restores.
 */
export async function rescheduleItems(
  items: readonly ScheduledItem[],
  channelName: string,
  silentChannelName: string,
): Promise<number> {
  if (NO_SCHEDULER) return 0;
  await Notifications.cancelAllScheduledNotificationsAsync();
  if (items.length === 0) return 0;

  await ensureAndroidChannels(channelName, silentChannelName);

  for (const item of items) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: item.title,
        body: item.body,
        sound: item.sound === null ? false : (item.sound ?? true),
        ...(item.timeSensitive ? { interruptionLevel: 'timeSensitive' as const } : null),
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: item.fireAt,
        channelId: item.sound === null ? ANDROID_SILENT_CHANNEL : ANDROID_CHANNEL,
      },
    });
  }

  return items.length;
}

export async function cancelAll(): Promise<void> {
  if (NO_SCHEDULER) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function pendingCount(): Promise<number> {
  if (NO_SCHEDULER) return 0;
  return (await Notifications.getAllScheduledNotificationsAsync()).length;
}
