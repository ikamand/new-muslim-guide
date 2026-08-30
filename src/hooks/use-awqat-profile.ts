import { mosqueProfile } from '@/lib/mosque-fit';
import { resolveProfile, type LatLon, type MethodProfile } from '@/lib/prayer-times';
import { useSettings } from '@/hooks/use-settings';

/**
 * The one place the app decides whose times these are.
 *
 * Precedence: the mosque match, then the chosen method, then the inferred
 * one. Both `usePrayerTimes` and the reminder scheduler resolve through this
 * hook, because a reminder firing at one profile's time while the card shows
 * another is the worst bug the feature could have — and precedence written
 * twice is how that bug gets written.
 *
 * A stale mosque fit whose method id no longer exists degrades to the next
 * rung rather than crashing; `mosqueProfile` returns null for exactly that.
 */
export function useAwqatProfile(): (coords: LatLon) => MethodProfile {
  const { awqatMosque, awqatMethod, awqatHanafiAsr } = useSettings();

  return (coords: LatLon) => {
    if (awqatMosque) {
      const matched = mosqueProfile(awqatMosque);
      if (matched) return matched;
    }
    return resolveProfile(coords, { methodId: awqatMethod, hanafiAsr: awqatHanafiAsr });
  };
}
