/**
 * Does the qibla needle settle?
 *
 * Feeds `settleHeading` a synthetic compass — a true heading plus the kind of
 * noise a phone magnetometer produces — and fails if the filtered needle
 * still jitters, lags a turn, or spins the long way round across north.
 *
 * The thresholds are what the eye can see on the app's dial: the needle is
 * 150px long, so one degree at the tip is about 2.6px. Raw ±6° is ±16px, a
 * visible twitch; under 2.5° at rest is a needle that looks still.
 *
 * Run with `npm run compass:check`. Exits non-zero on any failure.
 */
import { settleHeading, shortestTurn } from '../src/lib/compass';

const failures: string[] = [];
const notes: string[] = [];
function expect(condition: boolean, message: string) {
  if (!condition) failures.push(message);
}

/** Deterministic noise so a failure reproduces. */
function noise(seed: number, amplitude: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 2 * amplitude - amplitude;
}

/** Simulate `seconds` of readings at `hz`, returning [time, needle] pairs. */
function run(
  truth: (t: number) => number,
  { hz, seconds, jitter }: { hz: number; seconds: number; jitter: number },
): [number, number][] {
  const dt = 1000 / hz;
  let needle: number | null = null;
  const out: [number, number][] = [];
  for (let i = 0; i < hz * seconds; i++) {
    const t = i * dt;
    const reading = ((truth(t) + noise(i, jitter)) % 360 + 360) % 360;
    needle = settleHeading(needle, reading, dt);
    out.push([t, needle]);
  }
  return out;
}

function worst(values: number[], around: number): number {
  return Math.max(...values.map((v) => Math.abs(shortestTurn(around, v))));
}
function rms(values: number[], around: number): number {
  return Math.sqrt(values.reduce((s, v) => s + shortestTurn(around, v) ** 2, 0) / values.length);
}

// 1. Still phone, noisy sensor: ±6° at 20Hz and at 60Hz must look still.
for (const [hz, maxAllowed] of [[20, 2.5], [60, 1.5]] as const) {
  const needle = run(() => 200, { hz, seconds: 6, jitter: 6 }).slice(hz * 3).map(([, n]) => n);
  const w = worst(needle, 200);
  const r = rms(needle, 200);
  notes.push(`still at ${hz}Hz, ±6° noise: worst ${w.toFixed(2)}°, rms ${r.toFixed(2)}°`);
  expect(w < maxAllowed, `still phone at ${hz}Hz: needle wanders ${w.toFixed(2)}° (want < ${maxAllowed}°)`);
}

// 2. A quarter turn at 20Hz: within 10° inside a second, within 2° inside 2.5s.
{
  const turnAt = 1000;
  const needle = run((t) => (t < turnAt ? 90 : 180), { hz: 20, seconds: 5, jitter: 3 });
  const within = (deg: number) => {
    const hit = needle.find(([t, n]) => t > turnAt && Math.abs(shortestTurn(n, 180)) < deg);
    return hit ? hit[0] - turnAt : Infinity;
  };
  const coarse = within(10);
  const fine = within(2);
  notes.push(`quarter turn: within 10° in ${coarse}ms, within 2° in ${fine}ms`);
  expect(coarse <= 1000, `quarter turn: ${coarse}ms to get within 10° (want ≤ 1000)`);
  expect(fine <= 2500, `quarter turn: ${fine}ms to get within 2° (want ≤ 2500)`);
}

// 3. Crossing north: 358° → 2° is a four-degree step, never a 356° spin.
//    A four-degree disagreement is treated as noise and eased slowly, by
//    design, so give it four seconds before asking whether it arrived.
{
  const needle = run((t) => (t < 1000 ? 358 : 2), { hz: 20, seconds: 5, jitter: 0 }).map(([, n]) => n);
  let longest = 0;
  for (let i = 1; i < needle.length; i++) {
    longest = Math.max(longest, Math.abs(shortestTurn(needle[i - 1], needle[i])));
  }
  expect(longest < 5, `crossing north: a single step of ${longest.toFixed(1)}° (want < 5°)`);
  const w = worst(needle.slice(-20), 2);
  expect(w < 0.5, `crossing north: still ${w.toFixed(2)}° from 2° after four seconds`);
}

// 4. The first reading is taken as-is, not eased in from zero.
expect(settleHeading(null, 270, 50) === 270, 'first reading was eased instead of taken');

// 5. No elapsed time means no movement.
expect(settleHeading(100, 140, 0) === 100, 'a zero-length gap moved the needle');

for (const n of notes) console.log('  ' + n);
if (failures.length) {
  for (const f of failures) console.error('✗ ' + f);
  process.exit(1);
}
console.log('✓ compass settles: still, fast sensor, quarter turn, across north');
