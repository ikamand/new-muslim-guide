import { useEffect, useMemo, useState } from 'react';
import { AppState } from 'react-native';

import { useLocation } from '@/hooks/use-location';
import {
  computeDay,
  findNextPrayer,
  inferProfile,
  timezoneLooksWrong,
  type DayTimes,
  type MethodProfile,
  type NextPrayer,
} from '@/lib/prayer-times';

/**
 * Today's times and what's next, kept current.
 *
 * Everything is derived fresh from `now`. Nothing formatted is stored, so a
 * daylight-saving transition, a flight across timezones, or midnight rolling
 * over all resolve on the next tick without any special handling — the same
 * absolute instants simply format differently once the device's offset changes.
 */

/** Fine enough for a minute-resolution countdown, coarse enough to be free. */
const TICK_MS = 30_000;

export type PrayerTimesState = {
  today: DayTimes | null;
  next: NextPrayer | null;
  profile: MethodProfile | null;
  /** The device clock disagrees badly with where the device says it is. */
  timezoneSuspect: boolean;
};

export function usePrayerTimes(): PrayerTimesState {
  const { coords } = useLocation();
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), TICK_MS);

    // A phone asleep in a pocket doesn't run timers reliably, so the clock can
    // be minutes stale on resume — and after a flight it can be a day and a
    // timezone stale. Re-read on foreground rather than waiting for a tick.
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') setNow(new Date());
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  return useMemo(() => {
    if (!coords) {
      return { today: null, next: null, profile: null, timezoneSuspect: false };
    }

    const profile = inferProfile(coords);

    return {
      today: computeDay(coords, now, profile),
      next: findNextPrayer(coords, now, profile),
      profile,
      timezoneSuspect: timezoneLooksWrong(coords, now),
    };
  }, [coords, now]);
}
