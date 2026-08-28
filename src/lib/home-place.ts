import type { LatLon } from '@/lib/prayer-times';

/**
 * Whether someone is a long way from where they usually are.
 *
 * ## What this is for, and the line it does not cross
 *
 * It offers the travelling PAGE. It never asserts a ruling.
 *
 * "You seem to be away from home — here is what changes when you travel" is
 * orientation, and the page it opens keeps saying exactly what it already
 * says. "You can shorten your prayers now" would be a ruling resting on a
 * guessed distance, and the threshold for qasr is a real distance the schools
 * genuinely differ on. The app does not know how far someone has come, only
 * that the number is large; that is enough to raise a question and nowhere
 * near enough to answer one.
 *
 * ## Why the threshold is deliberately generous
 *
 * `FAR_KM` is well above any figure a school uses, and that is the point. A
 * tighter number would look like a claim about qasr and would fire on a long
 * commute. This one fires when somebody has plainly gone somewhere, which is
 * the only thing being claimed.
 *
 * ## What it stores, and what that commits to
 *
 * A home location — not just coordinates held for a calculation, but a place
 * remembered. That is a new fact about the user, it lives in the same
 * AsyncStorage record as every other setting, and it never leaves the device.
 * Iyad was told and decided on 28 Aug 2026.
 *
 * Someone who moves house gets one wrong offer until home re-settles, which is
 * why `shouldAdopt` exists: home follows a long stay rather than the last fix.
 */

/** Well beyond any school's qasr distance, on purpose. See above. */
export const FAR_KM = 120;

/** How long somewhere new has to be the answer before it becomes home. */
export const SETTLE_DAYS = 14;

export type HomePlace = {
  latitude: number;
  longitude: number;
  /** When this became home, so a move can re-settle. Epoch milliseconds. */
  since: number;
};

const EARTH_KM = 6371;
const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * Great-circle distance in kilometres.
 *
 * Haversine rather than a flat approximation: the app already ships this
 * arithmetic for the qibla, and a flat earth is wrong by enough at 120km and
 * high latitude to flip the answer.
 */
export function distanceKm(a: LatLon, b: LatLon): number {
  const dLat = rad(b.latitude - a.latitude);
  const dLon = rad(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.latitude)) * Math.cos(rad(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** True when `coords` is far enough from home to be worth a question. */
export function isAwayFromHome(home: HomePlace | null, coords: LatLon | null): boolean {
  if (!home || !coords) return false;
  return distanceKm(home, coords) >= FAR_KM;
}

/**
 * What to record, given where someone is now and what was recorded before.
 *
 * `undefined` means change nothing, which is the answer almost every time.
 *
 * ## Away is a streak, not a distance
 *
 * The first version of this compared `now` against `home.since` and called a
 * fortnight away a move. That measures how long HOME has been home, not how
 * long the person has been gone — so anybody who had lived somewhere two weeks
 * would have their home quietly rewritten by their first holiday. What has to
 * be tracked is when being away STARTED, which is `awaySince`: set on the
 * first far fix, cleared the moment they are near home again, and only after
 * `SETTLE_DAYS` of it unbroken does the new place become home.
 *
 * ⚠️ Deliberately NOT a "most visited" calculation. That would mean keeping a
 * history of where somebody has been, which is a different promise from
 * remembering one place, and `index.tsx:43` promises this app does not watch
 * people that way. Two numbers and a timestamp is the whole record.
 */
export type PlaceState = {
  home: HomePlace | null;
  /** When the current run of being far from home began. Epoch ms. */
  awaySince: number | null;
};

export function nextPlaceState(
  state: PlaceState,
  coords: LatLon | null,
  now: number,
): PlaceState | undefined {
  if (!coords) return undefined;

  /* The first fix ever. The app has to start somewhere, and the alternative
     is never being able to offer the page at all. */
  if (!state.home) return { home: { ...coords, since: now }, awaySince: null };

  if (!isAwayFromHome(state.home, coords)) {
    /* Back near home. The streak ends, and a trip leaves no trace. */
    return state.awaySince === null ? undefined : { ...state, awaySince: null };
  }

  if (state.awaySince === null) return { ...state, awaySince: now };

  const settled = now - state.awaySince >= SETTLE_DAYS * 24 * 60 * 60 * 1000;
  if (!settled) return undefined;

  /* A fortnight unbroken somewhere far is a move, not a trip. */
  return { home: { ...coords, since: now }, awaySince: null };
}
