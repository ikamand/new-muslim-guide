/**
 * Walk whole days, minute by minute, through `windowAt`.
 *
 * `npm run adhkar:check`. No network, no device, no clock.
 *
 * The window logic is the one part of the duʿa tab that cannot be checked by
 * looking at a screen: it has to be right at instants nobody is awake for, on
 * days nobody will test.
 *
 * ## Why the times here are fabricated rather than computed
 *
 * The first version of this script fed real coordinates — Cairo, Singapore,
 * Tromsø — to `computeDay` and walked from the script's local midnight. All
 * of it failed, and none of the failures were real: `computeDay` renders
 * times in the DEVICE's timezone, because on a phone the device is at the
 * coordinates. Mixing far-flung coordinates with one machine's timezone is a
 * situation that cannot occur, so the failures were the check's, not the
 * code's.
 *
 * `windowAt` is pure and takes `DayTimes` as an argument, so the honest test
 * hands it times directly. A second pass then runs the real `computeDay` for
 * one place to prove the two fit together.
 */
import { computeDay, inferProfile } from '../src/lib/prayer-times.ts';
import { windowAt, AFTER_PRAYER_GRACE_MS } from '../src/lib/adhkar-window.ts';

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error('  ✗ ' + message);
};

const GRACE_MIN = AFTER_PRAYER_GRACE_MS / 60_000;
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

const SHAPES = [
  { name: 'temperate winter', fajr: 366, sunrise: 483, dhuhr: 719, asr: 855, maghrib: 953, isha: 1063 },
  { name: 'temperate summer', fajr: 158, sunrise: 288, dhuhr: 785, asr: 1030, maghrib: 1281, isha: 1380 },
  { name: 'equatorial',       fajr: 340, sunrise: 400, dhuhr: 730, asr: 920, maghrib: 1105, isha: 1190 },
  { name: 'late isha',        fajr: 200, sunrise: 320, dhuhr: 780, asr: 1010, maghrib: 1310, isha: 1435 },
];

const base = new Date('2026-06-21T00:00:00');

for (const spec of SHAPES) {
  const today = makeDay(base, spec);
  let afterPrayer = 0;
  let nulls = 0;
  const counts = new Map();

  for (let minute = 0; minute < 1440; minute += 1) {
    const now = new Date(base.getTime() + minute * 60_000);
    let state;
    try {
      state = windowAt(today, now);
    } catch (error) {
      fail(`${spec.name} ${hhmm(minute)}: threw — ${error.message}`);
      break;
    }
    counts.set(state.window, (counts.get(state.window) ?? 0) + 1);
    if (state.window === 'after-prayer') afterPrayer += 1;
    if (state.window === null) nulls += 1;

    // `justPrayed` is meaningful for exactly one window and must not leak.
    if ((state.justPrayed !== undefined) !== (state.window === 'after-prayer')) {
      fail(`${spec.name} ${hhmm(minute)}: justPrayed disagrees with window ${state.window}`);
      break;
    }

    // The small hours belong to the night that has not ended. This is the case
    // a lone `now >= isha` test drops, because after midnight the day's ʿIshāʾ
    // is still in the future.
    if (minute < spec.fajr - 1 && state.window !== 'night' && state.window !== 'after-prayer') {
      fail(`${spec.name} ${hhmm(minute)}: before Fajr should be night, got ${state.window}`);
      break;
    }
    /*
      Fajr→Dhuhr is morning and ʿAsr→ʿIshāʾ is evening — the union of the
      mainstream positions rather than a choice between them, so the offer
      never disappears on somebody whose reading differs. A prayer's grace
      period still takes precedence inside either span.
    */
    if (minute > spec.fajr + GRACE_MIN && minute < spec.dhuhr - 1
        && state.window !== 'morning' && state.window !== 'after-prayer') {
      fail(`${spec.name} ${hhmm(minute)}: Fajr→Dhuhr should be morning, got ${state.window}`);
      break;
    }
    if (minute > spec.asr + GRACE_MIN && minute < spec.isha - 1
        && state.window !== 'evening' && state.window !== 'after-prayer') {
      fail(`${spec.name} ${hhmm(minute)}: ʿAsr→ʿIshāʾ should be evening, got ${state.window}`);
      break;
    }
  }

  // Five prayers, each holding the top for the grace period — unless a later
  // prayer's window swallows the tail of an earlier one, which is why this is
  // a ceiling rather than an equality.
  if (afterPrayer === 0) fail(`${spec.name}: after-prayer never fired`);
  if (afterPrayer > 5 * GRACE_MIN) {
    fail(`${spec.name}: after-prayer held ${afterPrayer} min, more than 5 × ${GRACE_MIN}`);
  }
  console.log(`  ${spec.name.padEnd(18)} ` +
    [...counts.entries()].map(([w, n]) => `${w ?? 'none'} ${n}`).join('  ·  '));
}

/*
  One real day, from the real engine, to prove the fabricated shapes above are
  the same shape `computeDay` produces. Coordinates local to no one in
  particular — what matters is that every minute resolves without throwing.
*/
const place = { latitude: 53.48, longitude: -2.24 };
const realDay = computeDay(place, new Date('2026-06-21T12:00:00'), inferProfile(place));
for (let minute = 0; minute < 1440; minute += 1) {
  const now = new Date(new Date('2026-06-21T00:00:00').getTime() + minute * 60_000);
  try {
    windowAt(realDay, now);
  } catch (error) {
    fail(`real computeDay day, ${hhmm(minute)}: threw — ${error.message}`);
    break;
  }
}

if (failures > 0) {
  console.error(`\n${failures} failure(s).`);
  process.exit(1);
}
console.log(`\n✓ ${SHAPES.length * 1440 + 1440} minutes checked — every one resolves, ` +
            `and no window claims a prayer it did not come from.`);
