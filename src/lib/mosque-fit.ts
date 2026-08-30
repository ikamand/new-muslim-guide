import { Madhab } from 'adhan';

import {
  computeDay,
  METHODS,
  PRAYER_IDS,
  type LatLon,
  type MethodProfile,
  type PrayerId,
} from '@/lib/prayer-times';

/**
 * Match my mosque — fit a (method, ʿAsr school, offsets) triple to the five
 * times on a mosque's board.
 *
 * Nobody should be asked to choose between "ISNA" and "Muslim World League";
 * a convert cannot, and being asked tells them the app doesn't know either.
 * What they CAN do is copy five numbers off the board — so the app searches
 * every method × madhab for the combination whose computed day reproduces
 * them, and whatever is left over becomes per-prayer minute offsets.
 *
 * Why one day is enough: Fajr and ʿIshāʾ identify the method (their angles
 * are the whole difference between methods — a 32-minute spread on a test
 * day), and ʿAsr identifies the school (58 minutes apart). Methods that
 * share angles can fit within a couple of minutes of each other, and that is
 * fine: if two methods fit equally, they print the same board.
 *
 * The honest limit: a fit that is right today can drift with the season if
 * the method is wrong. That is a UI concern — offer a re-check, don't
 * pretend certainty here.
 */

export type MosqueFit = {
  methodId: string;
  hanafiAsr: boolean;
  /** Whole minutes, per prayer — the residue the method could not explain. */
  adjustments: Record<PrayerId, number>;
  /** ISO date of the board the fit was made against. */
  matchedOn: string;
};

/**
 * Beyond this per-prayer residue the "fit" is a coincidence, not a match —
 * the usual cause is iqamah times entered instead of adhan times, which run
 * 10–30 minutes late, and the flow's copy warns about exactly that.
 */
const MAX_OFFSET_MINUTES = 20;

function minutesOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/**
 * A board time like "5:15" or "12:49", read without a meridiem.
 *
 * Boards print bare clock times, so each number has two readings twelve
 * hours apart. The right one is whichever lands nearer the computed time for
 * that prayer — a Fajr entry of "5:15" is 05:15 because no method puts Fajr
 * within hours of 17:15. Returns minutes-of-day, or null for unparseable
 * input.
 */
export function parseBoardTime(raw: string, computed: Date): number | null {
  const match = raw.trim().match(/^(\d{1,2})[:.٫]?(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;

  const reference = minutesOfDay(computed);
  const candidates = hours <= 12 ? [((hours % 12) * 60 + minutes), ((hours % 12) + 12) * 60 + minutes] : [hours * 60 + minutes];
  candidates.sort((a, b) => Math.abs(a - reference) - Math.abs(b - reference));
  return candidates[0];
}

export type FitResult = {
  fit: MosqueFit;
  profile: MethodProfile;
  /** The largest per-prayer residue, for the UI to show its confidence. */
  worst: number;
};

/**
 * The search. Every catalogue method × both schools, scored by the largest
 * per-prayer residue; ties break toward the suggested profile, then toward
 * the smaller total residue — the fit that explains more with the method and
 * less with offsets.
 */
export function fitMosque(
  coords: LatLon,
  board: Record<PrayerId, string>,
  suggested: MethodProfile,
  today: Date,
): FitResult | null {
  let best: FitResult | null = null;
  let bestTotal = Infinity;

  for (const method of Object.values(METHODS)) {
    for (const hanafiAsr of [false, true]) {
      const profile: MethodProfile = {
        ...method,
        build: () => {
          const params = method.build();
          params.madhab = hanafiAsr ? Madhab.Hanafi : Madhab.Shafi;
          return params;
        },
      };
      const day = computeDay(coords, today, profile);

      const adjustments = {} as Record<PrayerId, number>;
      let worst = 0;
      let total = 0;
      let valid = true;

      for (const id of PRAYER_IDS) {
        const computed = day.prayers.find((prayer) => prayer.id === id)!.time;
        const entered = parseBoardTime(board[id], computed);
        if (entered === null) {
          valid = false;
          break;
        }
        const diff = entered - minutesOfDay(computed);
        if (Math.abs(diff) > MAX_OFFSET_MINUTES) {
          valid = false;
          break;
        }
        adjustments[id] = diff;
        worst = Math.max(worst, Math.abs(diff));
        total += Math.abs(diff);
      }
      if (!valid) continue;

      const better =
        best === null ||
        worst < best.worst ||
        (worst === best.worst &&
          (total < bestTotal ||
            (total === bestTotal && method.id === suggested.id && best.fit.methodId !== suggested.id)));

      if (better) {
        best = {
          fit: {
            methodId: method.id,
            hanafiAsr,
            adjustments,
            matchedOn: today.toISOString().slice(0, 10),
          },
          profile: method,
          worst,
        };
        bestTotal = total;
      }
    }
  }

  return best;
}

/**
 * The stored fit as a working profile — the method, the school, and the
 * offsets applied through `params.adjustments`, which is the primitive
 * `adhan` provides for exactly this.
 *
 * An unknown method id (a stale store from an older build) returns null and
 * the caller falls back to inference — degraded, never crashed.
 */
export function mosqueProfile(fit: MosqueFit): MethodProfile | null {
  const base = METHODS[fit.methodId];
  if (!base) return null;
  return {
    ...base,
    build: () => {
      const params = base.build();
      params.madhab = fit.hanafiAsr ? Madhab.Hanafi : Madhab.Shafi;
      params.adjustments = { ...params.adjustments, ...fit.adjustments };
      return params;
    },
  };
}
