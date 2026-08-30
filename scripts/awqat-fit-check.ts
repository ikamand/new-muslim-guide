/**
 * A check that fails: generate a board from a known (method, school, offsets)
 * and assert `fitMosque` recovers it. Run with `npx tsx scripts/awqat-fit-check.ts`.
 */
import { Madhab } from 'adhan';

import { fitMosque } from '../src/lib/mosque-fit';
import { computeDay, inferProfile, METHODS, PRAYER_IDS, type PrayerId } from '../src/lib/prayer-times';

const coords = { latitude: 43.65, longitude: -79.38 }; // Toronto
const today = new Date(2026, 7, 30);

function board(methodId: string, hanafi: boolean, offsets: Partial<Record<PrayerId, number>>) {
  const base = METHODS[methodId];
  const profile = {
    ...base,
    build: () => {
      const params = base.build();
      params.madhab = hanafi ? Madhab.Hanafi : Madhab.Shafi;
      return params;
    },
  };
  const day = computeDay(coords, today, profile);
  const entries = {} as Record<PrayerId, string>;
  for (const id of PRAYER_IDS) {
    const time = day.prayers.find((p) => p.id === id)!.time;
    const minutes = time.getHours() * 60 + time.getMinutes() + (offsets[id] ?? 0);
    const h12 = ((Math.floor(minutes / 60) + 11) % 12) + 1;
    entries[id] = `${h12}:${String(minutes % 60).padStart(2, '0')}`;
  }
  return entries;
}

let failures = 0;
function check(name: string, ok: boolean, detail = '') {
  if (!ok) {
    failures += 1;
    console.error(`✗ ${name} ${detail}`);
  } else {
    console.log(`✓ ${name}`);
  }
}

const suggested = inferProfile(coords);

// 1. Exact ISNA board, no offsets.
{
  const result = fitMosque(coords, board('north-america', false, {}), suggested, today);
  check('recovers ISNA exactly', result?.fit.methodId === 'north-america' && result.worst === 0,
    JSON.stringify(result?.fit));
}

// 2. ISNA + Hanafi ʿAsr + Dhuhr +3.
{
  const result = fitMosque(coords, board('north-america', true, { dhuhr: 3 }), suggested, today);
  check('recovers Hanafi ʿAsr', result?.fit.hanafiAsr === true, JSON.stringify(result?.fit));
  check('recovers the Dhuhr offset', result?.fit.adjustments.dhuhr === 3, JSON.stringify(result?.fit.adjustments));
}

// 3. Iqamah times (all +25) must NOT match.
{
  const result = fitMosque(coords, board('north-america', false, { fajr: 25, dhuhr: 25, asr: 25, maghrib: 25, isha: 25 }), suggested, today);
  check('rejects an iqamah column', result === null, JSON.stringify(result?.fit));
}

// 4. Meridiem input parses, and a meridiem is authoritative.
{
  const entries = board('north-america', false, {});
  const withMeridiem = { ...entries, fajr: entries.fajr + ' AM', isha: entries.isha + 'pm' };
  const result = fitMosque(coords, withMeridiem, suggested, today);
  check('accepts AM/PM input', result?.fit.methodId === 'north-america' && result.worst === 0,
    JSON.stringify(result?.fit));
}
{
  // Fajr typed as PM is a typo, not a time — it must fail, not be "fixed".
  const entries = board('north-america', false, {});
  const wrong = { ...entries, fajr: entries.fajr + ' PM' };
  const result = fitMosque(coords, wrong, suggested, today);
  check('a wrong meridiem is a non-match, not a guess', result === null, JSON.stringify(result?.fit));
}

// 5. Garbage input must not match.
{
  const result = fitMosque(coords, { fajr: 'x', dhuhr: '1:20', asr: '5:00', maghrib: '7:56', isha: '9:20' }, suggested, today);
  check('rejects unparseable input', result === null);
}

if (failures > 0) process.exit(1);
console.log('fit check passed');
