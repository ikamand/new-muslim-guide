import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';

import { adhanAlarmAvailable, cancelAdhanAlarms, replaceAdhanAlarms } from '../../modules/adhan-alarm';
import { getVoice } from '@/content/adhan-voices';
import { adhanChannels, fitToPlatform, prayerAlertSchedule } from '@/lib/alert-schedule';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { useSettings, type Settings } from '@/hooks/use-settings';
import type { UIKey } from '@/i18n/ui';
import { hijriDate } from '@/lib/hijri';
import { cancelAll, hasPermission, requestPermission, rescheduleItems } from '@/lib/notifications';
import { useAwqatProfile } from '@/hooks/use-awqat-profile';
import { PRAYER_IDS, type PrayerId } from '@/lib/prayer-times';
import {
  alertIsOn,
  applyAlertToAll,
  planAdhkarNotes,
  planJumuahNotes,
  planReminders,
  planNightWake,
  planSuhoor,
  DAYS_AHEAD,
  wakeRingsOn,
  type PrayerAlert,
  type WakeFlag,
  type WakeTime,
} from '@/lib/reminders';

/**
 * The notification pipeline, in two hooks with one owner.
 *
 * `useReminderSync` is mounted ONCE, in the root layout, and is the only
 * thing that schedules. It used to live inside `useReminders` on the Settings
 * screen, which meant the twelve-day rolling window only topped up when
 * Settings had been visited that session — and would have meant a toggle
 * flipped from Today scheduled nothing. One owner also keeps the
 * cancel-everything-and-rebuild strategy safe: two mounted copies racing
 * that sequence can double-schedule.
 *
 * `useReminders` is what screens use: the settings, the toggles, permission
 * state. Flipping a toggle writes settings; the sync hook notices and
 * rebuilds.
 *
 * Everything schedulable — prayer reminders, the suhoor and night wake-ups,
 * the adhkār window note, Thursday's Jumuʿah note — flows through one plan,
 * sorted by fire time. On an iPhone it is capped under the 64 iOS allows
 * pending, and what gets cut is always the furthest away, with a note asking
 * to open the app in its place; the next foreground top-up restores it.
 * Android is not capped (`fitToPlatform` in `lib/alert-schedule.ts`).
 *
 * An adhan on Android is the one exception (14 Sep 2026). It goes to the
 * native module in `modules/adhan-alarm`, which sets its own alarms, because a
 * notification cannot play three minutes of audio. Android has no 64 cap, so
 * those are not counted against it.
 */

/**
 * The reminders in one line, for a door: "Off", "3 of 5 · 10 minutes before",
 * "All five · adhan at the time". A count, never the names — five names
 * wrapped on the day page, and each prayer's page is one tap away.
 */
export function describeReminders(
  reminders: Settings['reminders'],
  t: (key: UIKey) => string,
): string {
  const count = countReminders(reminders, t);
  const lead = describeLead(reminders, t);
  return lead ? `${count} · ${lead}` : count;
}

/** "Off", "3 of 5", "All five": the count alone, for a legend with no room. */
export function countReminders(
  reminders: Settings['reminders'],
  t: (key: UIKey) => string,
): string {
  const onCount = PRAYER_IDS.filter((id) => alertIsOn(reminders.alerts[id])).length;
  if (onCount === 0) return t('awqat.day.reminders.off');
  return onCount === PRAYER_IDS.length
    ? t('awqat.day.reminders.all')
    : t('awqat.day.reminders.some').replace('{n}', String(onCount));
}

/**
 * "reminder 10 minutes before", "adhan at the time" or "at the time", while
 * every prayer that is on agrees. Nothing while none is on, or while they
 * differ: a summary of five different settings is a sentence nobody reads.
 */
export function describeLead(
  reminders: Settings['reminders'],
  t: (key: UIKey) => string,
): string | null {
  const on = PRAYER_IDS.map((id) => reminders.alerts[id]).filter(alertIsOn);
  if (on.length === 0) return null;
  const reminderMinutes = new Set(on.map((alert) => alert.preReminderMinutes));
  if (reminderMinutes.size !== 1) return null;
  const [minutes] = [...reminderMinutes];
  if (minutes > 0) return t('awqat.day.lead.pre').replace('{n}', String(minutes));
  return on.every((alert) => alert.mode === 'adhan') ? t('awqat.day.lead.adhan') : t('awqat.day.lead.atTime');
}

/** One prayer in a line, for its row on Reminders: "Adhan · Al Majale", "Sound", "Off". */
export function describeAlert(alert: PrayerAlert, t: (key: UIKey) => string): string {
  if (alert.mode === 'off') return t('alert.state.off');
  if (alert.mode === 'adhan') return `${t('alert.state.adhan')} · ${getVoice(alert.voice).short}`;
  return t(alert.mode === 'sound' ? 'alert.state.sound' : 'alert.state.silent');
}

/** True while any switch that schedules anything is on. */
function anythingOn(settings: {
  reminders: Settings['reminders'];
  suhoorWakeUp: boolean;
  adhkarNote: boolean;
  jumuahNote: boolean;
  nightWakeUp: boolean;
}): boolean {
  return (
    PRAYER_IDS.some((id) => alertIsOn(settings.reminders.alerts[id])) ||
    settings.suhoorWakeUp ||
    settings.adhkarNote ||
    settings.jumuahNote ||
    settings.nightWakeUp
  );
}

const timeOf = (date: Date) =>
  date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

/** Mounted once in the root layout. Renders nothing; owns the schedule. */
export function useReminderSync(): void {
  const { coords } = useLocation();
  const {
    reminders,
    suhoorWakeUp,
    adhkarNote,
    jumuahNote,
    nightWakeUp,
    suhoorTime,
    nightWakeTime,
    awqatMethod,
    awqatHanafiAsr,
    awqatMosque,
    loaded,
  } = useSettings();
  const profileFor = useAwqatProfile();
  const { locale, t } = useLocale();

  /*
    `awqatMethod`/`awqatHanafiAsr` are in the signature so changing the
    convention reschedules every pending notification — otherwise a reminder
    would fire at the OLD method's time for up to twelve days.
  */
  const signature = JSON.stringify({
    reminders,
    suhoorWakeUp,
    adhkarNote,
    jumuahNote,
    nightWakeUp,
    suhoorTime,
    nightWakeTime,
    awqatMethod,
    awqatHanafiAsr,
    awqatMosque,
  });
  const lastRun = useRef<string>('');

  useEffect(() => {
    if (!loaded) return;
    let active = true;

    const run = async () => {
      const on = anythingOn({ reminders, suhoorWakeUp, adhkarNote, jumuahNote, nightWakeUp });
      /*
        Without permission nothing can be shown, and an adhan left scheduled
        from before would still play through a phone whose notifications were
        turned off. So no permission clears everything, as off does.
      */
      if (!on || !coords || !(await hasPermission())) {
        await cancelAll();
        await cancelAdhanAlarms();
        return;
      }

      // Through the precedence hook, never `inferProfile`: a reminder firing
      // at one profile's time while the card shows another is the worst bug
      // this feature could have.
      const profile = profileFor(coords);
      const now = new Date();
      const platform = Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'web';
      // What each phone is handed for the prayers: `lib/alert-schedule.ts`, checked by `npm run adhan:check`.
      const { items, adhans } = prayerAlertSchedule(
        planReminders(coords, profile, reminders, now),
        platform,
        adhanAlarmAvailable,
        t,
      );

      const inRamadan = (day: Date) => hijriDate(day)?.month === 9;

      if (suhoorWakeUp) {
        for (const planned of planSuhoor(coords, profile, now, inRamadan, DAYS_AHEAD, suhoorTime)) {
          items.push({
            fireAt: planned.fireAt,
            title: t('suhoor.notification.title'),
            body: t('suhoor.notification.body').replace('{time}', timeOf(planned.anchor)),
          });
        }
      }

      if (nightWakeUp) {
        // One alarm a night: on a Ramadan morning the suhoor wake-up, when it is on, is that alarm.
        const skip = (day: Date) => !wakeRingsOn('nightWakeUp', inRamadan(day), suhoorWakeUp);
        for (const planned of planNightWake(coords, profile, now, skip, DAYS_AHEAD, nightWakeTime)) {
          items.push({
            fireAt: planned.fireAt,
            // "The last third of the night" only when it is: a set time can ring before it.
            title: t(planned.beforeLastThird ? 'nightWake.notification.title.early' : 'nightWake.notification.title'),
            body: t('nightWake.notification.body').replace('{time}', timeOf(planned.anchor)),
          });
        }
      }

      if (adhkarNote) {
        for (const planned of planAdhkarNotes(coords, profile, now)) {
          items.push({
            fireAt: planned.fireAt,
            title: t('adhkar.notification.title'),
            body: t('adhkar.notification.body'),
          });
        }
      }

      if (jumuahNote) {
        for (const planned of planJumuahNotes(coords, profile, now)) {
          items.push({
            fireAt: planned.fireAt,
            title: t('jumuah.notification.title'),
            body: t('jumuah.notification.body'),
          });
        }
      }

      if (!active) return;
      await rescheduleItems(fitToPlatform(items, platform, t), t('settings.reminders'), t('reminders.channel.silent'));
      await replaceAdhanAlarms(adhans, adhanChannels(t));
    };

    const key = `${signature}|${coords?.latitude}|${coords?.longitude}|${locale}`;
    if (lastRun.current !== key) {
      lastRun.current = key;
      void run();
    }

    // Coming back to the foreground is what extends the rolling window.
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void run();
    });

    return () => {
      active = false;
      subscription.remove();
    };
  }, [
    loaded,
    coords,
    signature,
    locale,
    reminders,
    suhoorWakeUp,
    adhkarNote,
    jumuahNote,
    nightWakeUp,
    suhoorTime,
    nightWakeTime,
    profileFor,
    t,
  ]);
}

export type ReminderFlag = 'suhoorWakeUp' | 'adhkarNote' | 'jumuahNote' | 'nightWakeUp';

/** What screens use: the switches, asking for permission at the right moment. */
export function useReminders() {
  const { reminders, suhoorWakeUp, adhkarNote, jumuahNote, nightWakeUp, suhoorTime, nightWakeTime, set } =
    useSettings();
  const [granted, setGranted] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    void hasPermission().then((ok) => {
      if (active && ok) setGranted(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const anyOn = anythingOn({ reminders, suhoorWakeUp, adhkarNote, jumuahNote, nightWakeUp });

  /**
   * Changes one prayer's alert, asking for permission when it goes from off
   * to anything else. False when permission was refused and nothing changed.
   */
  const setAlert = useCallback(
    async (id: PrayerId, patch: Partial<PrayerAlert>): Promise<boolean> => {
      const current = reminders.alerts[id];
      const next = { ...current, ...patch };
      if (!alertIsOn(current) && alertIsOn(next) && !(await requestPermission())) {
        setGranted(false);
        return false;
      }
      set('reminders', { alerts: { ...reminders.alerts, [id]: next } });
      if (alertIsOn(next)) setGranted(true);
      return true;
    },
    [reminders, set],
  );

  /** One prayer's choices for all five; see `applyAlertToAll` for where the voice goes. */
  const applyToAll = useCallback(
    (id: PrayerId) => set('reminders', applyAlertToAll(reminders, id)),
    [reminders, set],
  );

  /** The two wake-ups and the two window notes, same permission manners. */
  const flags: Record<ReminderFlag, boolean> = { suhoorWakeUp, adhkarNote, jumuahNote, nightWakeUp };
  const toggleFlag = useCallback(
    async (flag: ReminderFlag) => {
      const current = { suhoorWakeUp, adhkarNote, jumuahNote, nightWakeUp }[flag];
      const turningOn = !current;
      if (turningOn && !(await requestPermission())) {
        setGranted(false);
        return;
      }
      set(flag, turningOn);
      setGranted(true);
    },
    [suhoorWakeUp, adhkarNote, jumuahNote, nightWakeUp, set],
  );

  /** The times the two wake-ups are set to; null follows Fajr. */
  const wakeTimes: Record<WakeFlag, WakeTime | null> = { suhoorWakeUp: suhoorTime, nightWakeUp: nightWakeTime };
  const setWakeTime = useCallback(
    (flag: WakeFlag, time: WakeTime | null) =>
      set(flag === 'suhoorWakeUp' ? 'suhoorTime' : 'nightWakeTime', time),
    [set],
  );

  return { reminders, setAlert, applyToAll, toggleFlag, flags, granted, anyOn, wakeTimes, setWakeTime };
}
