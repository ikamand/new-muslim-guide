import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { useSettings } from '@/hooks/use-settings';
import { hijriDate } from '@/lib/hijri';
import {
  cancelAll,
  hasPermission,
  requestPermission,
  rescheduleItems,
  type ScheduledItem,
} from '@/lib/notifications';
import { useAwqatProfile } from '@/hooks/use-awqat-profile';
import { PRAYER_LABEL, type PrayerId } from '@/lib/prayer-times';
import {
  planAdhkarNotes,
  planJumuahNotes,
  planReminders,
  planSuhoor,
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
 * Everything schedulable — prayer reminders, the suhoor wake-up, the adhkār
 * window note, Thursday's Jumuʿah note — flows through one plan, sorted by
 * fire time and capped at 60, under the 64 iOS allows pending. What gets cut
 * is always the furthest away, and the next foreground top-up restores it.
 */

const PENDING_CAP = 60;

/** True while any switch that schedules anything is on. */
function anythingOn(settings: {
  reminders: { prayers: Record<PrayerId, boolean> };
  suhoorWakeUp: boolean;
  adhkarNote: boolean;
  jumuahNote: boolean;
}): boolean {
  return (
    Object.values(settings.reminders.prayers).some(Boolean) ||
    settings.suhoorWakeUp ||
    settings.adhkarNote ||
    settings.jumuahNote
  );
}

const timeOf = (date: Date) =>
  date.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });

/** Mounted once in the root layout. Renders nothing; owns the schedule. */
export function useReminderSync(): void {
  const { coords } = useLocation();
  const { reminders, suhoorWakeUp, adhkarNote, jumuahNote, awqatMethod, awqatHanafiAsr, awqatMosque, loaded } =
    useSettings();
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
    awqatMethod,
    awqatHanafiAsr,
    awqatMosque,
  });
  const lastRun = useRef<string>('');

  useEffect(() => {
    if (!loaded) return;
    let active = true;

    const run = async () => {
      const on = anythingOn({ reminders, suhoorWakeUp, adhkarNote, jumuahNote });
      if (!on || !coords) {
        await cancelAll();
        return;
      }
      if (!(await hasPermission())) return;

      // Through the precedence hook, never `inferProfile`: a reminder firing
      // at one profile's time while the card shows another is the worst bug
      // this feature could have.
      const profile = profileFor(coords);
      const now = new Date();
      const items: ScheduledItem[] = [];

      for (const planned of planReminders(coords, profile, reminders, now)) {
        items.push({
          fireAt: planned.fireAt,
          title: PRAYER_LABEL[planned.prayerId],
          body:
            reminders.leadMinutes === 0
              ? t('reminder.now')
              : t('reminder.soon').replace('{n}', String(reminders.leadMinutes)),
        });
      }

      if (suhoorWakeUp) {
        const inRamadan = (day: Date) => hijriDate(day)?.month === 9;
        for (const planned of planSuhoor(coords, profile, now, inRamadan)) {
          items.push({
            fireAt: planned.fireAt,
            title: t('suhoor.notification.title'),
            body: t('suhoor.notification.body').replace('{time}', timeOf(planned.anchor)),
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

      items.sort((a, b) => a.fireAt.getTime() - b.fireAt.getTime());
      if (!active) return;
      await rescheduleItems(items.slice(0, PENDING_CAP), t('settings.reminders'));
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
  }, [loaded, coords, signature, locale, reminders, suhoorWakeUp, adhkarNote, jumuahNote, profileFor, t]);
}

export type ReminderFlag = 'suhoorWakeUp' | 'adhkarNote' | 'jumuahNote';

/** What screens use: the switches, asking for permission at the right moment. */
export function useReminders() {
  const { reminders, suhoorWakeUp, adhkarNote, jumuahNote, set } = useSettings();
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

  const anyOn = anythingOn({ reminders, suhoorWakeUp, adhkarNote, jumuahNote });

  /** Turns a prayer's reminder on or off, asking for permission the first time. */
  const toggle = useCallback(
    async (id: PrayerId) => {
      const turningOn = !reminders.prayers[id];
      if (turningOn && !(await requestPermission())) {
        setGranted(false);
        return;
      }
      set('reminders', {
        ...reminders,
        prayers: { ...reminders.prayers, [id]: turningOn },
      });
      setGranted(true);
    },
    [reminders, set],
  );

  /** The suhoor wake-up and the two window notes, same permission manners. */
  const flags = { suhoorWakeUp, adhkarNote, jumuahNote };
  const toggleFlag = useCallback(
    async (flag: ReminderFlag) => {
      const current =
        flag === 'suhoorWakeUp' ? suhoorWakeUp : flag === 'adhkarNote' ? adhkarNote : jumuahNote;
      const turningOn = !current;
      if (turningOn && !(await requestPermission())) {
        setGranted(false);
        return;
      }
      set(flag, turningOn);
      setGranted(true);
    },
    [suhoorWakeUp, adhkarNote, jumuahNote, set],
  );

  const setLead = useCallback(
    (leadMinutes: number) => set('reminders', { ...reminders, leadMinutes }),
    [reminders, set],
  );

  return { reminders, toggle, toggleFlag, flags, setLead, granted, anyOn };
}
