import type { AdhanAlarmInput, AdhanChannelNames } from '../../modules/adhan-alarm';
import { openingSoundFile, rawName, shortRawName } from '@/content/adhan-voices';
import type { UIKey } from '@/i18n/ui';

import type { ScheduledItem } from './notifications';
import { PRAYER_LABEL } from './prayer-times';
import type { PlannedReminder, PrayerAlert } from './reminders';

/**
 * What each phone is handed for a prayer's alerts.
 *
 * Pure, and apart from `use-reminders`, so the promise Iyad asked for on
 * 14 Sep 2026 ("make sure athan plays when it should play and notifications
 * are correctly set for pre adhan and for adhan itself") is a check that
 * fails, `npm run adhan:check`, rather than a hope about a hook.
 *
 * The rules, per platform:
 *
 * - **An iPhone** gets a notification for everything. The adhan's is the
 *   opening of the chosen voice as its sound, because iOS plays nothing
 *   longer than thirty seconds; the full recording is never handed to it.
 * - **Android with the native module** gets the adhan as a native alarm that
 *   plays the recording, short or full, and a notification for the rest.
 * - **Android without it** (a build from before the module) gets a
 *   notification with the phone's own sound in place of the adhan, never
 *   silence.
 * - **Every Pre-Adhan reminder** is a notification, silent only when the
 *   prayer's own alert is Silent.
 *
 * Both platforms deliver a scheduled notification or alarm when the app is
 * closed: the system does it, not the app. What an app cannot survive is
 * Android's Force stop, which holds every alarm until the app is opened
 * again, and the end of the window iOS will hold (below).
 */

type Translate = (key: UIKey) => string;

export type SchedulePlatform = 'ios' | 'android' | 'web';

/**
 * iOS keeps at most 64 notifications pending. One slot under 60 is kept for
 * the note that asks to open the app, and a few are spare.
 */
export const IOS_PENDING_CAP = 60;

/** The names Android lists for the adhan's two notifications in the app's settings. */
export function adhanChannels(t: Translate): AdhanChannelNames {
  return { playing: t('adhan.channel.playing'), quiet: t('adhan.channel.quiet'), after: t('adhan.channel.after') };
}

/** One adhan for the native module, worded now, because nothing will be awake to word it when it fires. */
export function adhanInput(id: string, fireAt: Date, title: string, alert: PrayerAlert, t: Translate): AdhanAlarmInput {
  return {
    id,
    fireAt: fireAt.getTime(),
    sound: alert.length === 'short' ? shortRawName(alert.voice) : rawName(alert.voice),
    title,
    playingText: t('reminder.now'),
    quietText: t('reminder.now'),
    stopLabel: t('adhan.stop'),
    playOnSilent: alert.playOnSilent,
    playInDnd: alert.playInDnd,
    volume: alert.volume,
  };
}

/** The notifications and native adhans a set of planned prayer alerts becomes, on one platform. */
export function prayerAlertSchedule(
  planned: readonly PlannedReminder[],
  platform: SchedulePlatform,
  nativeAdhan: boolean,
  t: Translate,
): { items: ScheduledItem[]; adhans: AdhanAlarmInput[] } {
  const items: ScheduledItem[] = [];
  const adhans: AdhanAlarmInput[] = [];

  for (const entry of planned) {
    const { alert } = entry;
    const title = PRAYER_LABEL[entry.prayerId];

    if (entry.kind === 'pre') {
      items.push({
        fireAt: entry.fireAt,
        title,
        body: t('reminder.soon').replace('{n}', String(alert.preReminderMinutes)),
        sound: alert.mode === 'silent' ? null : undefined,
      });
      continue;
    }

    if (alert.mode === 'adhan' && platform === 'android' && nativeAdhan) {
      adhans.push(adhanInput(entry.key, entry.fireAt, title, alert, t));
      continue;
    }

    items.push({
      fireAt: entry.fireAt,
      title,
      body: t('reminder.now'),
      sound:
        alert.mode === 'silent'
          ? null
          : alert.mode === 'adhan' && platform === 'ios'
            ? openingSoundFile(alert.voice)
            : undefined,
      timeSensitive: platform === 'ios' && alert.mode === 'adhan' && alert.soundInFocus,
    });
  }

  return { items, adhans };
}

/**
 * A schedule the platform will hold, nearest first.
 *
 * Android holds hundreds of alarms, so it keeps everything: the first alert
 * build cut Android to sixty as well, which with Pre-Adhan reminders on
 * was six days instead of twelve for no reason. An iPhone holds 64, so with
 * reminders on it keeps about six days, and every launch tops it up. When
 * anything had to be left out, the last slot becomes a silent note, a minute
 * after the last kept alert, asking to open the app: without it an iPhone
 * nobody opened for a week would simply stop calling to prayer.
 */
export function fitToPlatform(items: readonly ScheduledItem[], platform: SchedulePlatform, t: Translate): ScheduledItem[] {
  const sorted = [...items].sort((a, b) => a.fireAt.getTime() - b.fireAt.getTime());
  if (platform !== 'ios' || sorted.length <= IOS_PENDING_CAP) return sorted;
  const kept = sorted.slice(0, IOS_PENDING_CAP - 1);
  const last = kept[kept.length - 1];
  kept.push({
    fireAt: new Date(last.fireAt.getTime() + 60_000),
    title: t('reminders.window.title'),
    body: t('reminders.window.body'),
    sound: null,
  });
  return kept;
}
