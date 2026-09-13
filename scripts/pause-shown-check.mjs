/**
 * One forbidden band at a time, and never a hidden one that is in force.
 *
 * `npm run pauses:check`. No network, no device, no clock.
 *
 * Since 12 Sep 2026 the day page shows at most one of the three bands, chosen
 * by `pauseShownAt`. What can go wrong with that choice happens at minutes
 * nobody is looking at a screen:
 *
 *   1. A band that is IN FORCE is hidden. The page dropping the Fajr band at
 *      6:50 while voluntary prayer is actually forbidden until 7:04 is the one
 *      failure here that misleads somebody.
 *   2. A band shows in a stretch it does not close: between Dhuhr and ʿAsr,
 *      or between Maghrib and Fajr.
 *   3. A band shows after its span has already ended.
 *
 * At most one band is a property of the return type and needs no test.
 *
 * The days are fabricated, for the reason `adhkar-window-check.mjs` gives:
 * `computeDay` renders in the machine's timezone, so far-flung coordinates
 * walked from local midnight fail in ways no phone can. One real day follows
 * to prove the shapes are the engine's.
 */
import { computeDay, inferProfile, pausesOf, pauseShownAt } from '../src/lib/prayer-times.ts';

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error('  ✗ ' + message);
};
const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;

/** A day described in minutes past local midnight, as a phone would see it. */
function makeDay(base, spec) {
  const at = (minutes) => new Date(base.getTime() + minutes * 60_000);
  return {
    prayers: [
      { id: 'fajr', label: 'Fajr', time: at(spec.fajr) },
      { id: 'dhuhr', label: 'Dhuhr', time: at(spec.dhuhr) },
      { id: 'asr', label: 'Asr', time: at(spec.asr) },
      { id: 'maghrib', label: 'Maghrib', time: at(spec.maghrib) },
      { id: 'isha', label: 'Isha', time: at(spec.isha) },
    ],
    sunrise: at(spec.sunrise),
  };
}

/* The shapes `adhkar-window-check.mjs` walks, and San Francisco on 12 Sep 2026. */
const SHAPES = [
  { name: 'temperate winter', fajr: 366, sunrise: 483, dhuhr: 719, asr: 855, maghrib: 953, isha: 1063 },
  { name: 'temperate summer', fajr: 158, sunrise: 288, dhuhr: 785, asr: 1030, maghrib: 1281, isha: 1380 },
  { name: 'equatorial',       fajr: 340, sunrise: 400, dhuhr: 730, asr: 920, maghrib: 1105, isha: 1190 },
  { name: 'late isha',        fajr: 200, sunrise: 320, dhuhr: 780, asr: 1010, maghrib: 1310, isha: 1435 },
  { name: 'san francisco',    fajr: 336, sunrise: 409, dhuhr: 787, asr: 998, maghrib: 1162, isha: 1235 },
];

function walk(name, day, base, spec) {
  const pauses = pausesOf(day);
  const seen = new Map();
  for (let minute = 0; minute < 1440; minute += 1) {
    const now = new Date(base.getTime() + minute * 60_000);
    let shown;
    try {
      shown = pauseShownAt(day, now);
    } catch (error) {
      fail(`${name} ${hhmm(minute)}: threw — ${error.message}`);
      return;
    }
    if (shown) seen.set(shown.id, (seen.get(shown.id) ?? 0) + 1);

    for (const pause of pauses) {
      if (now >= pause.from && now < pause.to && shown?.id !== pause.id) {
        fail(`${name} ${hhmm(minute)}: the ${pause.id} band is in force but ${shown ? `the ${shown.id} band` : 'no band'} is shown`);
        return;
      }
    }
    if (shown && shown.to.getTime() <= now.getTime()) {
      fail(`${name} ${hhmm(minute)}: the ${shown.id} band has ended and is still shown`);
      return;
    }
    if (spec) {
      const quiet = (minute >= spec.dhuhr && minute < spec.asr) || minute >= spec.maghrib || minute < spec.fajr;
      if (quiet && shown) {
        fail(`${name} ${hhmm(minute)}: the ${shown.id} band shows in a stretch it does not close`);
        return;
      }
    }
  }
  if (spec) for (const pause of pauses) if (!seen.has(pause.id)) fail(`${name}: the ${pause.id} band never showed`);
  console.log(`  ${name.padEnd(18)} ` + pauses.map((p) => `${p.id} ${seen.get(p.id) ?? 0} min`).join('  ·  '));
}

const base = new Date('2026-06-21T00:00:00');
for (const spec of SHAPES) walk(spec.name, makeDay(base, spec), base, spec);

/*
  One real day from the real engine. Its quiet stretches are not asserted,
  because on a machine far from these coordinates its times fall outside the
  local day; what must hold everywhere is that no band in force is hidden.
*/
const place = { latitude: 37.77, longitude: -122.42 };
const realBase = new Date('2026-09-12T00:00:00');
walk('real computeDay', computeDay(place, new Date('2026-09-12T12:00:00'), inferProfile(place)), realBase, null);

if (failures > 0) {
  console.error(`\n${failures} failure(s).`);
  process.exit(1);
}
console.log(`\n✓ ${(SHAPES.length + 1) * 1440} minutes checked — no band in force is hidden, and none shows outside the stretch it closes.`);
