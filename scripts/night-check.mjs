/**
 * Walk whole nights, minute by minute, through `nightPrayerAt`.
 *
 * `npm run night:check`. No network, no device, no clock.
 *
 * Iyad, 13 Sep 2026: Today offers witr from ʿIshāʾ, qiyam al-layl from the
 * middle of the night, and tahajjud from the last third, every night. Nobody
 * checks that by looking at a screen at 02:01, and the first version of the
 * card was wrong in a way no screen showed: it measured the night from ʿIshāʾ
 * rather than Maghrib, so the last third opened half an hour late.
 *
 * What this does NOT reach is the screen. Today draws the night from
 * `nightThread`, `nightPrayerAt` and the Ramadan arc through the `useTonight`
 * hook, which only chooses which of its three states the card shows.
 *
 * Fabricated times first, for the reason `adhkar-window-check.mjs` gives: a
 * pure function is honestly tested by handing it times. Then real nights from
 * `computeNight`, both daylight-saving changes among them, to prove the
 * evening and morning are paired right across midnight and that the last third
 * is measured from Maghrib.
 */
import { computeDay, computeNight, findCurrentPrayer, inferProfile, windowEnd } from '../src/lib/prayer-times.ts';
import { NIGHT_WAKE_LEAD_MINUTES, nightPrayerAt, nightThread } from '../src/lib/night.ts';
import { planNightWake } from '../src/lib/reminders.ts';
import { arcFor, arcForNight } from '../src/content/ramadan-arc.ts';
import { hijriDate, hijriOfNight } from '../src/lib/hijri.ts';
import { PRAYERS } from '../src/content/prayers.ts';

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error('  ✗ ' + message);
};

const MINUTE = 60_000;
const ORDER = { witr: 1, qiyam: 2, tahajjud: 3 };
const hhmm = (m) => {
  const wrapped = ((Math.floor(m) % 1440) + 1440) % 1440;
  return `${String(Math.floor(wrapped / 60)).padStart(2, '0')}:${String(wrapped % 60).padStart(2, '0')}`;
};
const timeOf = (day, id) => day.prayers.find((prayer) => prayer.id === id).time;

/*
  Minutes past the EVENING's local midnight, so the morning's Fajr is past
  1440. The middle and the last third are written out here from Maghrib to the
  next Fajr, the way `SunnahTimes` defines them, rather than taken from the
  engine, so a change to the engine cannot quietly agree with itself.
*/
const SHAPES = [
  { name: 'temperate winter', fajr: 366, sunrise: 483, dhuhr: 719, asr: 855, maghrib: 953, isha: 1063 },
  { name: 'temperate summer', fajr: 158, sunrise: 288, dhuhr: 785, asr: 1030, maghrib: 1281, isha: 1380 },
  { name: 'equatorial',       fajr: 340, sunrise: 400, dhuhr: 730, asr: 920, maghrib: 1105, isha: 1190 },
  { name: 'late isha',        fajr: 200, sunrise: 320, dhuhr: 780, asr: 1010, maghrib: 1310, isha: 1435 },
  // ʿIshāʾ after the middle of the night: witr must keep the span, not vanish.
  { name: 'far north summer', fajr: 120, sunrise: 230, dhuhr: 790, asr: 1050, maghrib: 1350, isha: 1470, noQiyam: true },
];

const base = new Date('2026-06-21T00:00:00');
const at = (minutes) => new Date(base.getTime() + minutes * MINUTE);

for (const spec of SHAPES) {
  const fajrNext = 1440 + spec.fajr;
  const length = fajrNext - spec.maghrib;
  const middle = spec.maghrib + length / 2;
  const lastThird = spec.maghrib + (length * 2) / 3;

  const evening = {
    prayers: ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((id) => ({ id, label: id, time: at(spec[id]) })),
    sunrise: at(spec.sunrise),
    middleOfNight: at(middle),
    lastThirdOfNight: at(lastThird),
  };
  // Only the morning's Fajr is read: it is where the night ends.
  const morning = { prayers: [{ id: 'fajr', label: 'fajr', time: at(fajrNext) }] };

  let previous = 0;
  let firstWitr;
  let firstQiyam;
  const counts = { none: 0, witr: 0, qiyam: 0, tahajjud: 0 };

  for (let minute = 0; minute < fajrNext + 60; minute += 1) {
    let prayer;
    try {
      prayer = nightPrayerAt(evening, morning, at(minute));
    } catch (error) {
      fail(`${spec.name} ${hhmm(minute)}: threw — ${error.message}`);
      break;
    }
    counts[prayer ?? 'none'] += 1;

    // Every night: the whole of the last third, and nothing else, is tahajjud.
    if ((minute >= lastThird && minute < fajrNext) !== (prayer === 'tahajjud')) {
      fail(`${spec.name} ${hhmm(minute)}: got ${prayer}, the last third runs ${hhmm(lastThird)}–${hhmm(fajrNext)}`);
      break;
    }
    // Outside the night, and between Maghrib and ʿIshāʾ, nothing is offered.
    if ((minute < spec.isha || minute >= fajrNext) && minute < lastThird && prayer !== null) {
      fail(`${spec.name} ${hhmm(minute)}: offered ${prayer} before ʿIshāʾ`);
      break;
    }
    // Witr, then qiyam, then tahajjud, and never back.
    if (prayer) {
      if (ORDER[prayer] < previous) {
        fail(`${spec.name} ${hhmm(minute)}: ${prayer} came after a later part of the night`);
        break;
      }
      previous = ORDER[prayer];
      if (prayer === 'witr' && firstWitr === undefined) firstWitr = minute;
      if (prayer === 'qiyam' && firstQiyam === undefined) firstQiyam = minute;
    }
  }

  if (firstWitr !== Math.ceil(spec.isha)) {
    fail(`${spec.name}: witr began at ${firstWitr === undefined ? 'never' : hhmm(firstWitr)}, ʿIshāʾ is ${hhmm(spec.isha)}`);
  }
  if (spec.noQiyam) {
    if (counts.qiyam !== 0) fail(`${spec.name}: qiyam took ${counts.qiyam} min though ʿIshāʾ is past the middle`);
  } else if (firstQiyam !== Math.ceil(middle)) {
    fail(`${spec.name}: qiyam began at ${firstQiyam === undefined ? 'never' : hhmm(firstQiyam)}, the middle is ${hhmm(middle)}`);
  }

  console.log(
    `  ${spec.name.padEnd(18)} witr ${counts.witr}  ·  qiyam ${counts.qiyam}  ·  ` +
      `tahajjud ${counts.tahajjud}  ·  none ${counts.none}`,
  );
}

/*
  Real nights from the real engine. San Francisco because this Mac keeps its
  time; the assertions are between instants, so another zone changes the
  printed times and not the result.

  7 Mar and 31 Oct 2026 are the evenings before the clocks change, so those
  nights are 23 and 25 hours from midnight to midnight, the case adding a day
  of milliseconds gets wrong.
*/
const place = { latitude: 37.7749, longitude: -122.4194 };
const profile = inferProfile(place);
const clock = (date) => date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

for (const date of ['2026-09-13', '2026-06-21', '2026-12-21', '2026-03-07', '2026-10-31']) {
  const day = computeDay(place, new Date(`${date}T12:00:00`), profile);
  const maghrib = timeOf(day, 'maghrib');

  if (computeNight(place, new Date(`${date}T12:00:00`), profile) !== null) {
    fail(`${date} 12:00: midday counted as night`);
  }
  if (computeNight(place, new Date(maghrib.getTime() - MINUTE), profile) !== null) {
    fail(`${date}: the night began before Maghrib`);
  }

  const first = computeNight(place, maghrib, profile);
  if (!first) {
    fail(`${date}: no night at Maghrib`);
    continue;
  }
  const fajr = timeOf(first.morning, 'fajr');

  // From Maghrib, not ʿIshāʾ. SunnahTimes rounds to the minute.
  const fromMaghrib = maghrib.getTime() + ((fajr.getTime() - maghrib.getTime()) * 2) / 3;
  if (Math.abs(first.evening.lastThirdOfNight.getTime() - fromMaghrib) > MINUTE) {
    fail(`${date}: last third at ${clock(first.evening.lastThirdOfNight)}, from Maghrib it is ${clock(new Date(fromMaghrib))}`);
  }

  let previous = 0;
  const counts = { none: 0, witr: 0, qiyam: 0, tahajjud: 0 };
  for (let t = maghrib.getTime(); t < fajr.getTime() + 30 * MINUTE; t += MINUTE) {
    const now = new Date(t);
    const night = computeNight(place, now, profile);

    if (t >= fajr.getTime()) {
      if (night !== null) {
        fail(`${date} ${clock(now)}: still night after Fajr`);
        break;
      }
      continue;
    }
    // Across midnight, and across the clock change, it is still the same night.
    if (!night || timeOf(night.evening, 'maghrib').getTime() !== maghrib.getTime()) {
      fail(`${date} ${clock(now)}: lost the night that began at ${clock(maghrib)}`);
      break;
    }

    const prayer = nightPrayerAt(night.evening, night.morning, now);
    counts[prayer ?? 'none'] += 1;
    if ((t >= night.evening.lastThirdOfNight.getTime()) !== (prayer === 'tahajjud')) {
      fail(`${date} ${clock(now)}: got ${prayer} with the last third at ${clock(night.evening.lastThirdOfNight)}`);
      break;
    }
    if (prayer) {
      if (ORDER[prayer] < previous) {
        fail(`${date} ${clock(now)}: ${prayer} came after a later part of the night`);
        break;
      }
      previous = ORDER[prayer];
    }
  }
  if (!counts.witr || !counts.qiyam || !counts.tahajjud) {
    fail(`${date}: a part of the night never came — ${JSON.stringify(counts)}`);
  }

  console.log(
    `  ${date}  Maghrib ${clock(maghrib)}  ʿIshāʾ ${clock(timeOf(first.evening, 'isha'))}  ` +
      `middle ${clock(first.evening.middleOfNight)}  last third ${clock(first.evening.lastThirdOfNight)}  ` +
      `Fajr ${clock(fajr)}`,
  );
}

/*
  ʿIshāʾ stays open until Fajr and names the middle of the night as its
  preferred end (13 Sep 2026, docs/night-prayers-accuracy.md §1). The pray
  button used to hide at the middle of the night, telling somebody awake at
  1am that it was too late.
*/
for (const date of ['2026-09-13', '2026-06-21', '2026-03-07']) {
  const day = computeDay(place, new Date(`${date}T12:00:00`), profile);
  const isha = timeOf(day, 'isha');
  const morning = computeDay(place, new Date(day.nextFajr.getTime() + 60 * MINUTE), profile);
  if (day.nextFajr.getTime() !== timeOf(morning, 'fajr').getTime()) {
    fail(`${date}: nextFajr ${clock(day.nextFajr)} is not the next morning's Fajr ${clock(timeOf(morning, 'fajr'))}`);
  }
  if (windowEnd(day, 'isha').getTime() !== day.nextFajr.getTime()) {
    fail(`${date}: ʿIshāʾ's window ends at ${clock(windowEnd(day, 'isha'))}, not at Fajr`);
  }
  const moments = [
    ['just after ʿIshāʾ', new Date(isha.getTime() + 5 * MINUTE), false],
    ['past the middle of the night', new Date(day.middleOfNight.getTime() + 5 * MINUTE), true],
    ['a minute before Fajr', new Date(day.nextFajr.getTime() - MINUTE), true],
  ];
  for (const [label, at, preferredPassed] of moments) {
    const current = findCurrentPrayer(place, at, profile);
    if (current?.id !== 'isha') {
      fail(`${date} ${label} (${clock(at)}): the open prayer is ${current?.id ?? 'none'}, not ʿIshāʾ`);
      continue;
    }
    if (current.windowEnds.getTime() !== day.nextFajr.getTime()) {
      fail(`${date} ${label}: the window ends at ${clock(current.windowEnds)}, not at Fajr`);
    }
    if (current.preferredEnds?.getTime() !== day.middleOfNight.getTime()) {
      fail(`${date} ${label}: the preferred end is not the middle of the night`);
    }
    if ((at.getTime() >= current.preferredEnds.getTime()) !== preferredPassed) {
      fail(`${date} ${label}: preferred time passed should be ${preferredPassed}`);
    }
  }
  const atFajr = findCurrentPrayer(place, day.nextFajr, profile);
  if (atFajr?.id !== 'fajr') fail(`${date}: at Fajr the open prayer is ${atFajr?.id ?? 'none'}, not Fajr`);
  console.log(`  ʿIshāʾ ${date}: open ${clock(isha)} to Fajr ${clock(day.nextFajr)}, preferred until ${clock(day.middleOfNight)}`);
}

/*
  Tarāwīḥ (Iyad, 13 Sep 2026): every night of Ramadan, from ʿIshāʾ to the last
  third, in place of witr and qiyam al-layl; tahajjud keeps the last third. Its
  row is in the Ramadan arc and the night asks for it by part and by the
  night's own Islamic date. Before, it started at 17:00 by the clock on the
  first ten nights only, and the date turned at midnight, so the first night
  of tarāwīḥ, the evening before the first fast, showed the before-Ramadan
  card instead.
*/
for (let month = 1; month <= 12; month += 1) {
  for (let day = 1; day <= 30; day += 1) {
    const byDay = arcFor({ month, day });
    if (byDay?.during) fail(`arcFor ${month}/${day}: offered the night row "${byDay.id}" by day`);
    for (const part of ['witr', 'qiyam', 'tahajjud']) {
      const row = arcForNight({ month, day }, part);
      const expected = month === 9 && part !== 'tahajjud';
      if (Boolean(row) !== expected || (row && row.id !== 'tarawih')) {
        fail(`arcForNight ${month}/${day} ${part}: got ${row?.id ?? 'nothing'}`);
      }
    }
  }
}

let firstFast;
for (let d = new Date(2027, 0, 15, 12); d < new Date(2027, 2, 15, 12); d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1, 12)) {
  const date = hijriDate(d);
  if (date?.month === 9 && date.day === 1) {
    firstFast = d;
    break;
  }
}
if (!firstFast) {
  fail('no 1 Ramadan 1448 found: this Node has no Umm al-Qura calendar, so the night date cannot be checked');
} else {
  const civil = (offset) => new Date(firstFast.getFullYear(), firstFast.getMonth(), firstFast.getDate() + offset, 12);
  /* Whether tarāwīḥ holds the night at `now`, from the same arc row `useTonight` reads. */
  const tarawihAt = (now) => {
    const night = computeNight(place, now, profile);
    const part = night && nightPrayerAt(night.evening, night.morning, now);
    if (!part) return false;
    const date = hijriOfNight(timeOf(night.evening, 'maghrib'));
    return arcForNight(date, part)?.id === 'tarawih';
  };
  /*
    Night n begins on the evening of civil day n − 1 of Ramadan, so the first
    night is the evening before the first fast. The first draft of these cases
    counted from civil day n and tested the eleventh night as the tenth.
  */
  const nightEvening = (n) => civil(n - 2);
  let eid;
  for (let offset = 27; offset <= 31 && !eid; offset += 1) {
    const date = hijriDate(civil(offset));
    if (date?.month === 10 && date.day === 1) eid = civil(offset);
  }
  if (!eid) fail('no 1 Shawwal 1448 found within 31 days of the first fast');
  // The night of Eid: the first night after Ramadan's last.
  const eidNight = eid && new Date(eid.getFullYear(), eid.getMonth(), eid.getDate() - 1, 12);

  const plus = (date, minutes) => new Date(date.getTime() + minutes * MINUTE);
  const afterIsha = (day) => plus(timeOf(day, 'isha'), 5);
  const cases = [
    // [evening, an instant in that night, expected, why]
    [nightEvening(1), afterIsha, true, 'the first night, the evening before the first fast'],
    [nightEvening(1), (day) => plus(timeOf(day, 'isha'), -5), false, 'the first night, before ʿIshāʾ'],
    [nightEvening(0), afterIsha, false, 'the night before the first night'],
    [nightEvening(15), afterIsha, true, 'the fifteenth night, after ʿIshāʾ'],
    [nightEvening(15), (day) => plus(day.middleOfNight, 5), true, 'the fifteenth night past the middle, where qiyam would be'],
    [nightEvening(15), (day) => plus(day.lastThirdOfNight, 5), false, 'the fifteenth night in the last third, which stays tahajjud'],
    [nightEvening(29), afterIsha, true, 'the twenty-ninth night'],
    ...(eidNight ? [[eidNight, afterIsha, false, 'the night of Eid']] : []),
  ];
  for (const [evening, instant, expected, why] of cases) {
    const now = instant(computeDay(place, evening, profile));
    if (tarawihAt(now) !== expected) {
      fail(`tarāwīḥ ${expected ? 'missing' : 'shown'} on ${why} (${now.toDateString()} ${clock(now)})`);
    }
  }

  const eve = computeDay(place, nightEvening(1), profile);
  console.log(
    `  tarāwīḥ 1448: first night ${nightEvening(1).toDateString()}, ʿIshāʾ ${clock(timeOf(eve, 'isha'))} ` +
      `to the last third at ${clock(eve.lastThirdOfNight)}; night of Eid ${eidNight ? eidNight.toDateString() : 'not found'}`,
  );
}

/*
  The witr guide is two units named for what they are: shafʿ, two rakʿahs
  with a salam, then witr, one rakʿah (Iyad, 13 Sep 2026;
  docs/night-prayers-accuracy.md Part 2). It used to call all three "witr".
*/
{
  const guide = PRAYERS.find((g) => g.id === 'witr');
  const step = (id) => guide.steps.find((s) => s.id === id);
  const expect = (ok, message) => { if (!ok) fail(`witr guide: ${message}`); };
  expect(guide.title === 'Shafʿ and Witr', `title is "${guide.title}"`);
  expect(guide.steps.length === 38, `${guide.steps.length} steps, expected 38`);
  expect(step('r1-intention')?.instruction.includes('praying shafʿ, the two rakʿahs before witr'), `the first intention is "${step('r1-intention')?.instruction}"`);
  expect(step('r3-intention')?.instruction.includes('one rakʿah of witr'), `the witr intention is "${step('r3-intention')?.instruction}"`);
  expect(step('r2-taslim-left')?.note === 'That is shafʿ. Now stand for witr.', `the shafʿ closing note is "${step('r2-taslim-left')?.note}"`);
  expect(step('r3-intention')?.title === 'Stand for witr', `the third rakʿah is titled "${step('r3-intention')?.title}"`);
  expect(step('r3-taslim-left')?.note === 'That is shafʿ and witr complete.', `the last note is "${step('r3-taslim-left')?.note}"`);
  console.log('  witr guide: shafʿ, then witr, 38 steps');
}

/*
  The night drawn as a timeline (Iyad, 13 Sep 2026): one mark per bullet,
  marks from the known set, and the night-prayer page's order section drawn
  start → pairs → closing → earlier. A mark list that drifts from its bullets
  would draw the wrong count beside a sentence, which is a ruling on screen.
*/
{
  const { REFERENCES } = await import('../src/content/references.ts');
  const MARKS = new Set(['start', 'pairs', 'closing', 'earlier']);
  const pages = REFERENCES;
  for (const page of pages) {
    for (const section of page.sections) {
      if (!section.timeline) continue;
      const bullets = section.bullets ?? [];
      if (section.timeline.length !== bullets.length) {
        fail(`${page.id}.${section.id}: ${section.timeline.length} timeline marks for ${bullets.length} bullets`);
      }
      for (const mark of section.timeline) {
        if (!MARKS.has(mark)) fail(`${page.id}.${section.id}: unknown timeline mark "${mark}"`);
      }
    }
  }
  const order = REFERENCES.find((page) => page.id === 'qiyam-al-layl')?.sections.find((section) => section.id === 'order');
  if (order?.timeline?.join(',') !== 'start,pairs,closing,earlier') {
    fail(`qiyam-al-layl.order: timeline is ${order?.timeline?.join(',') ?? 'missing'}`);
  }
  console.log('  night order: drawn as start, pairs, closing, earlier');
}

/*
  The night thread (Today at night, 13 Sep 2026): where the moon is along
  ʿIshāʾ → Fajr, where the last third begins, and when the wake-up rings. It
  must agree with `nightPrayerAt` minute by minute, and the wake-up must sit
  inside the last third and before Fajr, an hour ahead wherever that fits.
*/
{
  const stamp = (date) => date.toTimeString().slice(0, 5);
  const LEAD = NIGHT_WAKE_LEAD_MINUTES * MINUTE;
  let nights = 0;

  const walk = (label, evening, morning) => {
    nights += 1;
    const isha = timeOf(evening, 'isha');
    const fajr = timeOf(morning, 'fajr');
    let previousNow = -1;
    for (let t = isha.getTime() - 30 * MINUTE; t < fajr.getTime() + 30 * MINUTE; t += MINUTE) {
      const now = new Date(t);
      const thread = nightThread(evening, morning, now);
      const inNight = t >= isha.getTime() && t < fajr.getTime();
      if (Boolean(thread) !== inNight) {
        fail(`${label} ${stamp(now)}: thread ${thread ? 'present' : 'missing'} ${inNight ? 'inside' : 'outside'} ʿIshāʾ → Fajr`);
        return;
      }
      if (!thread) continue;
      const prayer = nightPrayerAt(evening, morning, now);
      if (prayer === null) {
        fail(`${label} ${stamp(now)}: the thread shows but nightPrayerAt offers nothing`);
        return;
      }
      if ((thread.part === 'third') !== (prayer === 'tahajjud')) {
        fail(`${label} ${stamp(now)}: part ${thread.part} but nightPrayerAt says ${prayer}`);
        return;
      }
      for (const key of ['now', 'lastThird', 'wake']) {
        if (!(thread[key] >= 0 && thread[key] <= 1)) {
          fail(`${label} ${stamp(now)}: ${key} is ${thread[key]}, outside 0..1`);
          return;
        }
      }
      if (thread.lastThird >= 1 || thread.wake >= 1 || thread.wake < thread.lastThird) {
        fail(`${label} ${stamp(now)}: last third ${thread.lastThird}, wake ${thread.wake}`);
        return;
      }
      if (thread.now < previousNow) {
        fail(`${label} ${stamp(now)}: the moon went backwards`);
        return;
      }
      previousNow = thread.now;
      const wake = thread.wakeAt.getTime();
      const lastThird = evening.lastThirdOfNight.getTime();
      if (wake < lastThird || wake >= fajr.getTime()) {
        fail(`${label}: wake-up ${stamp(thread.wakeAt)} outside the last third ${stamp(evening.lastThirdOfNight)} → Fajr ${stamp(fajr)}`);
        return;
      }
      const expected = fajr.getTime() - LEAD >= lastThird ? fajr.getTime() - LEAD : lastThird;
      if (wake !== expected) {
        fail(`${label}: wake-up ${stamp(thread.wakeAt)}, expected ${stamp(new Date(expected))}`);
        return;
      }
    }
  };

  const shapes = [
    ...SHAPES,
    // The last third begins less than an hour before Fajr: the wake-up waits for it.
    { name: 'short night', fajr: 100, sunrise: 200, dhuhr: 780, asr: 1030, maghrib: 1400, isha: 1420 },
    // ʿIshāʾ falls inside the last third (far north in summer): the whole line is gold from the start.
    { name: 'isha inside the last third', fajr: 90, sunrise: 180, dhuhr: 790, asr: 1050, maghrib: 1350, isha: 1500, ishaInThird: true },
  ];
  for (const spec of shapes) {
    const fajrNext = 1440 + spec.fajr;
    const length = fajrNext - spec.maghrib;
    const evening = {
      prayers: ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((id) => ({ id, label: id, time: at(spec[id]) })),
      sunrise: at(spec.sunrise),
      middleOfNight: at(spec.maghrib + length / 2),
      lastThirdOfNight: at(spec.maghrib + (length * 2) / 3),
    };
    const morning = { prayers: [{ id: 'fajr', label: 'fajr', time: at(fajrNext) }] };
    walk(spec.name, evening, morning);
    if (spec.ishaInThird) {
      const atIsha = nightThread(evening, morning, at(spec.isha));
      if (!atIsha || atIsha.lastThird !== 0 || atIsha.part !== 'third') {
        fail(`${spec.name}: at ʿIshāʾ the last third is ${atIsha?.lastThird} and the part ${atIsha?.part}, expected 0 and third`);
      }
    }
  }

  for (const date of ['2026-09-13', '2026-06-21', '2026-12-21', '2026-03-07', '2026-10-31']) {
    const day = computeDay(place, new Date(`${date}T12:00:00`), profile);
    const night = computeNight(place, timeOf(day, 'maghrib'), profile);
    if (night) walk(date, night.evening, night.morning);
  }

  const sample = computeNight(place, new Date('2026-09-13T21:30:00'), profile);
  const shown = sample && nightThread(sample.evening, sample.morning, new Date('2026-09-13T21:30:00'));
  console.log(
    `  night thread: ${nights} nights walked; 13 Sep at 21:30 the moon is at ${shown ? shown.now.toFixed(3) : '?'}, ` +
      `the last third at ${shown ? stamp(shown.lastThirdAt) : '?'}, the wake-up at ${shown ? stamp(shown.wakeAt) : '?'}`,
  );
}

/*
  The night wake-up (13 Sep 2026): one a morning, inside the last third of
  the night that ends at that Fajr and before it, skipped exactly on the days
  asked for, and never in the past.
*/
{
  const from = new Date('2026-09-13T00:00:00');
  const all = planNightWake(place, profile, from, () => false, 12);
  const evenSkipped = planNightWake(place, profile, from, (day) => day.getDate() % 2 === 0, 12);
  if (all.length !== 12) fail(`night wake-up: ${all.length} mornings planned in 12, expected 12`);
  if (evenSkipped.some((planned) => planned.anchor.getDate() % 2 === 0)) fail('night wake-up: a skipped day still rang');
  if (evenSkipped.length !== all.filter((planned) => planned.anchor.getDate() % 2 !== 0).length) {
    fail(`night wake-up: skipping even dates left ${evenSkipped.length} of ${all.length}`);
  }
  for (const planned of all) {
    const night = computeNight(place, new Date(planned.anchor.getTime() - MINUTE), profile);
    if (!night) { fail(`night wake-up: no night before Fajr ${planned.anchor.toDateString()}`); continue; }
    const lastThird = night.evening.lastThirdOfNight.getTime();
    const expected = Math.max(planned.anchor.getTime() - NIGHT_WAKE_LEAD_MINUTES * MINUTE, lastThird);
    if (planned.fireAt.getTime() !== expected) fail(`night wake-up ${planned.anchor.toDateString()}: rings ${clock(planned.fireAt)}, expected ${clock(new Date(expected))}`);
    if (planned.fireAt.getTime() < lastThird || planned.fireAt >= planned.anchor) fail(`night wake-up ${planned.anchor.toDateString()}: outside the last third`);
    if (planned.fireAt <= from) fail('night wake-up: planned in the past');
  }
  console.log(`  night wake-up: ${all.length} mornings planned; the night of 13 Sep rings ${all[1] ? clock(all[1].fireAt) : '?'} before Fajr ${all[1] ? clock(all[1].anchor) : '?'}`);
}

if (failures > 0) {
  console.error(`\n${failures} failure(s).`);
  process.exit(1);
}
console.log('\n✓ Every minute of every night: witr from ʿIshāʾ, qiyam from the middle, tahajjud for the whole last third, measured from Maghrib; tarāwīḥ from ʿIshāʾ to the last third, every night of Ramadan.');
