import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { useSettings } from '@/hooks/use-settings';
import { cancelAll, hasPermission, requestPermission, reschedule } from '@/lib/notifications';
import { inferProfile, PRAYER_LABEL, type PrayerId } from '@/lib/prayer-times';
import { planReminders } from '@/lib/reminders';

/**
 * Keeps the pending reminders in step with the settings.
 *
 * Reschedules whenever anything they depend on moves: the settings, the
 * coordinates, the language the notification will be written in, and every
 * return to the foreground. That last one is what makes a twelve-day rolling
 * window work — opening the app is what tops it up, so someone who opens it at
 * least once a fortnight never runs out.
 *
 * Someone who never opens the app for two weeks stops being reminded. That is
 * a real limitation of scheduling locally, and the alternative is a server
 * sending push notifications, which this app does not have and does not want.
 */
export function useReminders() {
  const { coords } = useLocation();
  const { reminders, loaded, set } = useSettings();
  const { locale, t } = useLocale();
  const [granted, setGranted] = useState<boolean | null>(null);
  const [scheduled, setScheduled] = useState(0);

  // Re-running the effect must not depend on a new object identity each render.
  const signature = JSON.stringify(reminders);
  const lastRun = useRef<string>('');

  const anyOn = Object.values(reminders.prayers).some(Boolean);

  useEffect(() => {
    if (!loaded) return;
    let active = true;

    const run = async () => {
      if (!anyOn || !coords) {
        await cancelAll();
        if (active) setScheduled(0);
        return;
      }

      if (!(await hasPermission())) {
        if (active) setGranted(false);
        return;
      }

      const planned = planReminders(coords, inferProfile(coords), reminders, new Date());
      const count = await reschedule(
        planned,
        {
          title: (id: PrayerId) => PRAYER_LABEL[id],
          body: (minutes: number) =>
            minutes === 0 ? t('reminder.now') : t('reminder.soon').replace('{n}', String(minutes)),
          channelName: t('settings.reminders'),
        },
        reminders.leadMinutes,
      );
      if (active) {
        setScheduled(count);
        setGranted(true);
      }
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
  }, [loaded, anyOn, coords, signature, locale, reminders, t]);

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

  const setLead = useCallback(
    (leadMinutes: number) => set('reminders', { ...reminders, leadMinutes }),
    [reminders, set],
  );

  return { reminders, toggle, setLead, granted, scheduled, anyOn };
}
