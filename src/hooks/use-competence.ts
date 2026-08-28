import { useMemo, useState } from 'react';

import { useObservations } from '@/hooks/use-observations';
import { useSettings } from '@/hooks/use-settings';
import { prayerConfidence } from '@/lib/competence';
import type { PrayerConfidence } from '@/lib/onboarding';

/**
 * What the app believes about somebody's praying — what they said, raised by
 * what it has seen.
 *
 * ## Why the clock is state and not `Date.now()`
 *
 * Reading the clock during render is impure: two renders of the same component
 * can disagree, and React's own lint rule refuses it. It matters here more
 * than it looks, because the value this returns decides the SHAPE of Today's
 * primary action — a component that flips between two shapes on a re-render
 * for no reason the reader can see is worse than one that is a few hours
 * stale.
 *
 * Captured once on mount, exactly as `usePrayerTimes` does. The thresholds in
 * `competence.ts` are twelve prayers and three weeks; nothing here needs to
 * notice the moment a day ticks over, and the app is remounted far more often
 * than three weeks.
 */
export function usePrayerConfidence(): PrayerConfidence {
  const { prayerConfidence: said } = useSettings();
  const observations = useObservations();
  const [now] = useState(() => Date.now());

  return useMemo(
    () => prayerConfidence(said, observations, now),
    [said, observations, now],
  );
}
