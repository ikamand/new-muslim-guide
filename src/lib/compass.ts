/**
 * Settling a compass heading.
 *
 * A phone magnetometer reports many readings a second, each a few degrees
 * either side of the truth. Drawn raw, a needle shows that noise — it
 * twitches while the phone is still, which is what the qibla screen did.
 *
 * This is a first-order low-pass filter — an exponential moving average —
 * with three things a plain average gets wrong:
 *
 *   - **It works on the circle.** 359° and 1° are two degrees apart, not
 *     358. The step is always taken the short way round, so a heading
 *     crossing north does not send the needle spinning the long way.
 *   - **It is paced by the clock, not by the reading count.** The time
 *     constant is in milliseconds: after one the needle has closed 63% of
 *     the gap, after three it has closed 95%. A phone that reports 60
 *     readings a second and one that reports 10 settle in the same time.
 *   - **It is slow when the phone is still and fast when it turns.** One
 *     time constant cannot do both: slow enough to flatten ±6° of noise is
 *     too slow to follow a hand turning towards the qibla, and vice versa.
 *     So the constant slides with the size of the disagreement between the
 *     needle and the reading — a few degrees is treated as noise and eased
 *     over a second; twenty or more is a real turn and followed in a
 *     quarter of one. `npm run compass:check` prints the numbers.
 *
 * Pure, so the check can feed it a jittery synthetic compass and fail if
 * the needle does not settle.
 */

/** The signed short-way difference from `from` to `to`, in (-180, 180]. */
export function shortestTurn(from: number, to: number): number {
  return ((to - from + 540) % 360) - 180;
}

/** Time constant when the reading is far from the needle — a real turn. */
export const SETTLE_FAST_MS = 250;
/** Time constant when the reading is close to the needle — noise. */
export const SETTLE_SLOW_MS = 1200;
/** The disagreement, in degrees, at and beyond which the fast constant applies. */
export const SETTLE_KNEE_DEG = 15;

/**
 * One step of the filter: where the needle should be now, given where it
 * was, what the compass just said, and how long since the last reading.
 *
 * `previous` is `null` before the first reading, and the first reading is
 * taken as-is — there is nothing to settle from.
 */
export function settleHeading(
  previous: number | null,
  reading: number,
  elapsedMs: number,
): number {
  if (previous === null) return normalise(reading);
  const turn = shortestTurn(previous, reading);
  const far = Math.min(1, Math.abs(turn) / SETTLE_KNEE_DEG);
  const tau = SETTLE_SLOW_MS - (SETTLE_SLOW_MS - SETTLE_FAST_MS) * far;
  // Between 0 (no time passed, stay put) and 1 (a long gap, jump).
  const alpha = elapsedMs <= 0 ? 0 : 1 - Math.exp(-elapsedMs / tau);
  return normalise(previous + alpha * turn);
}

function normalise(degrees: number): number {
  return ((degrees % 360) + 360) % 360;
}
