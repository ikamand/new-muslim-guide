import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

import { hijriDate, type HijriDate } from '@/lib/hijri';

/**
 * Today's Islamic date, kept current, or null where the platform cannot say.
 *
 * Re-read hourly and whenever the app comes back to the foreground. A phone
 * asleep in a pocket does not run timers reliably, so a date that only changed
 * on an interval would still read yesterday at breakfast — the same reason
 * `use-prayer-times` listens for the same event.
 *
 * The stored value is kept when nothing has actually changed, so the twenty-three
 * ticks a day that fall inside the same date cost nothing downstream.
 */
export function useHijriToday(): HijriDate | null {
  const [date, setDate] = useState<HijriDate | null>(() => hijriDate(new Date()));

  useEffect(() => {
    const tick = () =>
      setDate((current) => {
        const next = hijriDate(new Date());
        const same =
          current?.year === next?.year &&
          current?.month === next?.month &&
          current?.day === next?.day;
        return same ? current : next;
      });

    const interval = setInterval(tick, 60 * 60 * 1000);
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') tick();
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, []);

  return date;
}
