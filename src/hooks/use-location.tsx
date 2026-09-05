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

import type { Place } from '@/lib/places';
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
 *
 * ## A chosen city
 *
 * Someone who will not grant location — and some of this app's readers have
 * good reasons not to — can choose a city from the bundled list instead
 * (`lib/places.ts`). The choice is stored on the device like everything else,
 * and it is the fallback, not the override: a live fix from the phone always
 * wins, because the person who chose Leeds and then flew to Cairo needs
 * Cairo's times. It outranks a stored fix, because a city somebody picked on
 * purpose is a better answer than wherever the phone last happened to be.
 * Iyad's decision, 5 Sep 2026.
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

/** Where the coordinates on screen came from. */
export type LocationSource =
  /** A live read from the phone, this launch. */
  | 'device'
  /** The last live read, from a previous launch, while a fresh one is awaited or refused. */
  | 'stored'
  /** A city the reader chose from the list. */
  | 'place';

type StoredFix = LatLon & { at: number };

const STORAGE_KEY = 'last-known-fix';
const PLACE_KEY = 'chosen-place';

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

function parsePlace(raw: string | null): Place | null {
  if (!raw) return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    const place = parsed as Partial<Record<keyof Place, unknown>>;
    if (
      typeof place.name !== 'string' ||
      typeof place.country !== 'string' ||
      typeof place.latitude !== 'number' ||
      typeof place.longitude !== 'number'
    ) {
      return null;
    }
    return {
      name: place.name,
      country: place.country,
      region: typeof place.region === 'string' ? place.region : '',
      latitude: place.latitude,
      longitude: place.longitude,
    };
  } catch {
    return null;
  }
}

type LocationContextValue = {
  coords: LatLon | null;
  status: LocationStatus;
  /** Where `coords` came from; null when there are none. */
  source: LocationSource | null;
  /** The city the reader chose, whether or not it is what `coords` shows right now. */
  place: Place | null;
  /** True while a stored fix is on screen and a fresh one is still coming. */
  isStale: boolean;
  /** When the fix on screen was taken, for a stored one. Null for a live read. */
  fixedAt: number | null;
  request: () => Promise<void>;
  choosePlace: (place: Place | null) => void;
};

/**
 * The coordinates are stored and no fresh read is coming.
 *
 * Not the same as `isStale`, and the difference is the whole point. A stored
 * fix is on screen for a moment on every cold launch while the live read runs,
 * and warning about that would cry wolf on every launch. This is the case where
 * the stored fix is all there will BE — permission refused, or the device
 * cannot produce one — so the number on screen is about wherever the reader was
 * the last time the app could tell.
 *
 * A chosen city is never unverified: the reader named it, and it is where
 * they said they are until they say otherwise.
 *
 * ⚠️ It matters here more than on the prayer times, which simply refuse to draw
 * without a live fix. A qibla drawn from a fix in another city is a confident
 * arrow pointing the wrong way, and somebody prays facing it.
 */
export function isUnverified(value: {
  isStale: boolean;
  status: LocationStatus;
  source: LocationSource | null;
}): boolean {
  if (value.source === 'place') return false;
  return value.isStale && (value.status === 'denied' || value.status === 'unavailable');
}

const Context = createContext<LocationContextValue | null>(null);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [deviceCoords, setDeviceCoords] = useState<LatLon | null>(null);
  const [status, setStatus] = useState<LocationStatus>('locating');
  const [deviceStale, setDeviceStale] = useState(false);
  const [deviceFixedAt, setDeviceFixedAt] = useState<number | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
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

      setDeviceCoords((current) => {
        // Ignore jitter: recomputing for a 30-metre change would churn the
        // screen without changing a single displayed minute.
        if (current && distanceKm(current, next) < 1) return current;
        return next;
      });
      setStatus('ready');
      setDeviceStale(false);
      setDeviceFixedAt(null);
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

  const choosePlace = useCallback((next: Place | null) => {
    setPlace(next);
    if (next) void AsyncStorage.setItem(PLACE_KEY, JSON.stringify(next));
    else void AsyncStorage.removeItem(PLACE_KEY);
  }, []);

  // Show the last known fix immediately so a cold launch isn't a spinner, then
  // let the live read replace it. The chosen city loads beside it.
  useEffect(() => {
    let active = true;

    Promise.all([AsyncStorage.getItem(STORAGE_KEY), AsyncStorage.getItem(PLACE_KEY)])
      .then(([rawFix, rawPlace]) => {
        if (!active) return;
        const chosen = parsePlace(rawPlace);
        if (chosen) setPlace(chosen);
        const stored = parseStored(rawFix);
        if (!stored) return;
        setDeviceCoords({ latitude: stored.latitude, longitude: stored.longitude });
        setDeviceStale(true);
        setDeviceFixedAt(stored.at);
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

  const value = useMemo<LocationContextValue>(() => {
    /*
      Precedence, in words: the phone now; then the city the reader chose;
      then wherever the phone last was. A live fix beats a chosen city so a
      traveller sees where they landed; a chosen city beats a stored fix
      because it was said on purpose.
    */
    const live = status === 'ready' && deviceCoords && !deviceStale;
    if (live) {
      return {
        coords: deviceCoords,
        status,
        source: 'device',
        place,
        isStale: false,
        fixedAt: null,
        request,
        choosePlace,
      };
    }
    if (place) {
      return {
        coords: { latitude: place.latitude, longitude: place.longitude },
        status,
        source: 'place',
        place,
        isStale: false,
        fixedAt: null,
        request,
        choosePlace,
      };
    }
    return {
      coords: deviceCoords,
      status,
      source: deviceCoords ? 'stored' : null,
      place,
      isStale: deviceStale,
      fixedAt: deviceFixedAt,
      request,
      choosePlace,
    };
  }, [deviceCoords, status, deviceStale, deviceFixedAt, place, request, choosePlace]);

  return <Context value={value}>{children}</Context>;
}

export function useLocation(): LocationContextValue {
  const value = use(Context);
  if (!value) throw new Error('useLocation must be used inside a LocationProvider');
  return value;
}
