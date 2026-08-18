import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AppState } from 'react-native';

import type { LatLon } from '@/lib/prayer-times';

/**
 * Where the device is, for prayer times and qibla.
 *
 * The coordinates never leave the device — there is no geocoding call, no
 * timezone lookup service, no analytics. The only consumer is arithmetic in
 * `@/lib/prayer-times`.
 *
 * The position is re-read every time the app comes back to the foreground,
 * because someone who flies to another country has to see that country's
 * times, and a cached fix from last week would silently be wrong for them.
 */

export type LocationStatus =
  /** No answer yet on this launch — a stored fix may still be showing. */
  | 'locating'
  /** We have coordinates. */
  | 'ready'
  /** The user said no. Everything except times and qibla still works. */
  | 'denied'
  /** Location services are off device-wide, or the fix failed. */
  | 'unavailable';

type StoredFix = LatLon & { at: number };

const STORAGE_KEY = 'last-known-fix';

function distanceKm(a: LatLon, b: LatLon): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.latitude - a.latitude);
  const dLon = toRad(b.longitude - a.longitude);
  const lat1 = toRad(a.latitude);
  const lat2 = toRad(b.latitude);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

function parseStored(raw: string | null): StoredFix | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const fix = parsed as Partial<Record<keyof StoredFix, unknown>>;
    if (
      typeof fix.latitude !== 'number' ||
      typeof fix.longitude !== 'number' ||
      typeof fix.at !== 'number'
    ) {
      return null;
    }
    return { latitude: fix.latitude, longitude: fix.longitude, at: fix.at };
  } catch {
    return null;
  }
}

type LocationContextValue = {
  coords: LatLon | null;
  status: LocationStatus;
  /** True while a stored fix is on screen and a fresh one is still coming. */
  isStale: boolean;
  request: () => Promise<void>;
};

const Context = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [coords, setCoords] = useState<LatLon | null>(null);
  const [status, setStatus] = useState<LocationStatus>('locating');
  const [isStale, setIsStale] = useState(false);
  const inFlight = useRef(false);

  const refresh = useCallback(async () => {
    if (inFlight.current) return;
    inFlight.current = true;

    try {
      const { granted } = await Location.getForegroundPermissionsAsync();
      if (!granted) {
        setStatus('denied');
        return;
      }

      const fix =
        (await Location.getLastKnownPositionAsync({ maxAge: 60 * 60 * 1000 })) ??
        (await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low }));

      if (!fix) {
        setStatus('unavailable');
        return;
      }

      const next: LatLon = {
        latitude: fix.coords.latitude,
        longitude: fix.coords.longitude,
      };

      setCoords((current) => {
        // Ignore jitter: recomputing for a 30-metre change would churn the
        // screen without changing a single displayed minute.
        if (current && distanceKm(current, next) < 1) return current;
        return next;
      });
      setStatus('ready');
      setIsStale(false);
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...next, at: Date.now() }));
    } catch {
      setStatus((current) => (current === 'ready' ? current : 'unavailable'));
    } finally {
      inFlight.current = false;
    }
  }, []);

  const request = useCallback(async () => {
    setStatus('locating');
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setStatus('denied');
      return;
    }
    await refresh();
  }, [refresh]);

  // Show the last known fix immediately so a cold launch isn't a spinner, then
  // let the live read replace it.
  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        const stored = parseStored(raw);
        if (!active || !stored) return;
        setCoords({ latitude: stored.latitude, longitude: stored.longitude });
        setIsStale(true);
      })
      .catch(() => {
        // No stored fix just means we wait for the live one.
      })
      .finally(() => {
        if (active) void refresh();
      });

    return () => {
      active = false;
    };
  }, [refresh]);

  // Re-read on foreground. This is what makes travel work: the times you see
  // after landing are for where you landed, not where you took off.
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') void refresh();
    });
    return () => subscription.remove();
  }, [refresh]);

  const value = useMemo(
    () => ({ coords, status, isStale, request }),
    [coords, status, isStale, request],
  );

  return <Context value={value}>{children}</Context>;
}

export function useLocation(): LocationContextValue {
  const value = use(Context);
  if (!value) throw new Error('useLocation must be used inside a LocationProvider');
  return value;
}
