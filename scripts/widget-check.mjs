/**
 * The widgets say what the Today card says, as a check that fails.
 *
 * `npm run widget:check`. No network, no device.
 *
 * ## Against the card
 *
 * The schedule (`src/lib/widget-schedule.ts`) writes down, at the instants
 * where anything could change, what the card would show. Two things could
 * still go wrong: an instant left out, so a widget holds a state past its
 * end, and the entry itself disagreeing with the card. So this samples every
 * entry's edges, every hour, and hundreds of random instants across the twelve
 * days, and compares what a widget would be drawing then with the card's own
 * logic, written out here from `components/prayer-times-card.tsx` and
 * `components/awqat-arch.tsx` rather than imported from the schedule.
 *
 * In several places, each in its own timezone, because the dangerous days are
 * the unusual ones: London across the October clock change, Oslo at midsummer
 * (the twilight angles barely resolve), Reykjavik at midwinter, Mecca, and
 * San Francisco where this Mac is.
 *
 * ## The drawing
 *
 * Every path a phone is handed holds only M, L, C and Z. The arcs in the day
 * marks became cubics, so each converted arc is sampled and every point must
 * sit on a circle of the original radius.
 */
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { DAY_MARK_PARTS } from '../src/constants/day-marks.ts';
import { EN } from '../src/i18n/ui.ts';
import {
  computeDay,
  findCurrentPrayer,
  findNextPrayer,
  formatTime,
  inferProfile,
  PRAYER_IDS,
  windowEnd,
} from '../src/lib/prayer-times.ts';
import { arcToCubics, circleToCubics } from '../src/lib/svg-path.ts';
import { buildWidgetPayload, localDateKey } from '../src/lib/widget-schedule.ts';

const CASES = [
  { name: 'San Francisco', tz: 'America/Los_Angeles', coords: { latitude: 37.7749, longitude: -122.4194 }, start: [2026, 8, 15, 10, 30] },
  { name: 'London, across the clock change', tz: 'Europe/London', coords: { latitude: 51.5074, longitude: -0.1278 }, start: [2026, 9, 20, 22, 10] },
  { name: 'Oslo, midsummer', tz: 'Europe/Oslo', coords: { latitude: 59.9139, longitude: 10.7522 }, start: [2026, 5, 18, 0, 20] },
  { name: 'Reykjavik, midwinter', tz: 'Atlantic/Reykjavik', coords: { latitude: 64.1466, longitude: -21.9426 }, start: [2026, 11, 18, 12, 0] },
  { name: 'Mecca', tz: 'Asia/Riyadh', coords: { latitude: 21.4225, longitude: 39.8262 }, start: [2026, 8, 15, 4, 0] },
];

const self = fileURLToPath(import.meta.url);
const caseArg = process.argv.indexOf('--case');

if (caseArg === -1) {
  let failed = 0;
  for (let i = 0; i < CASES.length; i += 1) {
    const result = spawnSync(process.execPath, [...process.execArgv, self, '--case', String(i)], {
      env: { ...process.env, TZ: CASES[i].tz },
      stdio: 'inherit',
    });
    if (result.status !== 0) failed += 1;
  }
  failed += checkDrawing();
  failed += checkNativeCopies();
  if (failed > 0) {
    console.error(`\nwidget:check — ${failed} problem group(s).`);
    process.exit(1);
  }
  console.log('\nwidget:check — the widgets say what the card says, in every place checked, and every path is M L C Z.');
  process.exit(0);
}

runCase(CASES[Number(process.argv[caseArg + 1])]);

function runCase(place) {
  const problems = [];
  const fail = (message) => problems.length < 12 && problems.push(message);
  const t = (key) => EN[key];
  const [y, m, d, h, min] = place.start;
  const now = new Date(y, m, d, h, min);
  const profile = inferProfile(place.coords);
  const palette = { ground: '#000000', text: '#000000', textSecondary: '#000000', gold: '#000000', goldSoft: '#000000', selected: '#000000', accent: '#000000' };

  for (const fluent of [false, true]) {
    const payload = buildWidgetPayload({ coords: place.coords, profile, now, fluent, t, colors: { light: palette, dark: palette } });
    const { entries, days } = payload;

    if (entries.length === 0) fail('no entries');
    if (entries[0]?.at !== now.getTime()) fail('the first entry does not start now');
    for (let i = 1; i < entries.length; i += 1) {
      if (entries[i].at <= entries[i - 1].at) fail(`entries out of order at ${i}`);
    }
    if (entries.at(-1).at >= payload.staleAt) fail('an entry starts after the schedule goes stale');
    if (!payload.strings.openApp) fail('the open-the-app string is empty');

    const inForce = (ms) => {
      let lo = 0;
      let hi = entries.length - 1;
      while (lo < hi) {
        const mid = Math.ceil((lo + hi) / 2);
        if (entries[mid].at <= ms) lo = mid;
        else hi = mid - 1;
      }
      return entries[lo];
    };

    const samples = new Set();
    for (const entry of entries) {
      samples.add(entry.at);
      samples.add(entry.at + 1000);
      if (entry.at - 1000 >= now.getTime()) samples.add(entry.at - 1000);
    }
    for (let ms = now.getTime(); ms < payload.staleAt; ms += 60 * 60 * 1000) samples.add(ms);
    let seed = 7;
    const random = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    for (let i = 0; i < 600; i += 1) samples.add(now.getTime() + Math.floor(random() * (payload.staleAt - now.getTime())));

    for (const ms of samples) {
      const at = new Date(ms);
      const expected = cardAt(place.coords, profile, at, fluent);
      const entry = inForce(ms);
      const day = days[entry.day];
      const actual = {
        caption: entry.caption,
        name: entry.name,
        time: entry.time,
        note: entry.note,
        lit: entry.lit,
        passed: entry.passed.join(','),
        closed: entry.closed.join(','),
        link: entry.link,
        date: day?.date,
        friday: day?.friday,
        cells: JSON.stringify(day?.cells),
      };
      for (const key of Object.keys(expected)) {
        if (expected[key] !== actual[key]) {
          fail(`${fluent ? 'fluent' : 'learning'}, ${at.toString()}: ${key} is ${JSON.stringify(actual[key])}, the card says ${JSON.stringify(expected[key])}`);
          break;
        }
      }
    }
  }

  if (problems.length > 0) {
    console.error(`✗ ${place.name}`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exit(1);
  }
  console.log(`✓ ${place.name}`);
}

/** The Today card at an instant, from `prayer-times-card.tsx` and `awqat-arch.tsx`, as those files state it. */
function cardAt(coords, profile, at, fluent) {
  const today = computeDay(coords, at, profile);
  const next = findNextPrayer(coords, at, profile);
  const current = findCurrentPrayer(coords, at, profile);
  const lit = current ? current.id : next.isTomorrow ? null : next.id;
  let caption;
  let name;
  let time;
  let note;
  if (current) {
    const pastPreferred = !!current.preferredEnds && at >= current.preferredEnds;
    const shownEnd = current.preferredEnds && !pastPreferred ? current.preferredEnds : (current.windowEnds ?? at);
    caption = EN['times.now'];
    name = current.label;
    time = EN['times.until'].replace('{time}', formatTime(shownEnd));
    note = pastPreferred ? EN['times.preferredPassed'] : undefined;
  } else {
    caption = next.isTomorrow ? EN['times.nextTomorrow'] : EN['times.next'];
    name = next.label;
    time = formatTime(next.time);
  }
  return {
    caption,
    name,
    time,
    note,
    lit,
    // The arch: a mark is filled once its time has passed, and the lit one keeps its gold.
    passed: today.prayers.filter((p) => at >= p.time && p.id !== lit).map((p) => p.id).join(','),
    // The row: a cell steps back when its window closes.
    closed: PRAYER_IDS.filter((id) => windowEnd(today, id).getTime() <= at.getTime()).join(','),
    // Today's Pray button opens the walkthrough while a window is open, until the reader prays on their own.
    link: current && !fluent ? `newmuslimguide://guide/${current.id}` : 'newmuslimguide://awqat-day',
    date: localDateKey(at),
    friday: at.getDay() === 5,
    cells: JSON.stringify(today.prayers.map((p) => ({ id: p.id, name: p.label, time: formatTime(p.time) }))),
  };
}

/**
 * The few things Android must know before the app has ever run: the widget
 * names and descriptions the picker shows, and the colours of the moment
 * before the first schedule. Each is a copy of something with a home in
 * JavaScript, so each is compared with that home.
 */
function checkNativeCopies() {
  let problems = 0;
  const root = join(dirname(self), '..');
  const res = join(root, 'modules/prayer-widget/android/src/main/res');
  const read = (path) => readFileSync(join(res, path), 'utf8');
  const valuesOf = (xml, tag) =>
    Object.fromEntries([...xml.matchAll(new RegExp(`<${tag} name="([^"]+)">([^<]*)</${tag}>`, 'g'))].map((m) => [m[1], m[2]]));

  const strings = valuesOf(read('values/strings.xml'), 'string');
  const expectedStrings = {
    prayer_widget_name_niche: EN['widget.name.niche'],
    prayer_widget_name_row: EN['widget.name.row'],
    prayer_widget_name_quiet: EN['widget.name.quiet'],
    prayer_widget_niche_description: EN['widget.sheet.niche'],
    prayer_widget_row_description: EN['widget.sheet.row'],
    prayer_widget_quiet_description: EN['widget.sheet.quiet'],
    prayer_widget_open_app: EN['widget.openApp'],
  };
  for (const [name, english] of Object.entries(expectedStrings)) {
    if (strings[name] !== english) {
      console.error(`✗ native copies: strings.xml ${name} is ${JSON.stringify(strings[name])}, ui.ts says ${JSON.stringify(english)}`);
      problems += 1;
    }
  }

  // theme.ts imports a stylesheet, so it is read as text rather than imported.
  const theme = readFileSync(join(root, 'src/constants/theme.ts'), 'utf8');
  const block = (scheme) => theme.slice(theme.indexOf(`${scheme}: {`), theme.indexOf('}', theme.indexOf(`${scheme}: {`)));
  const token = (scheme, key) => block(scheme).match(new RegExp(`\\b${key}: '(#[0-9A-Fa-f]{6})'`))?.[1]?.toUpperCase();
  const colourKeys = {
    prayer_widget_ground: 'background',
    prayer_widget_text: 'text',
    prayer_widget_text_secondary: 'textSecondary',
    prayer_widget_gold: 'gold',
    prayer_widget_gold_soft: 'goldSoft',
  };
  for (const [scheme, file] of [['light', 'values/colors.xml'], ['dark', 'values-night/colors.xml']]) {
    const colours = valuesOf(read(file), 'color');
    for (const [name, key] of Object.entries(colourKeys)) {
      const expected = token(scheme, key);
      if (!expected || colours[name]?.toUpperCase() !== expected) {
        console.error(`✗ native copies: ${file} ${name} is ${colours[name]}, theme.ts ${scheme}.${key} is ${expected}`);
        problems += 1;
      }
    }
  }
  // iPhone: the same words again, this time as Swift literals, and the one app group named in three files.
  const swift = readFileSync(join(root, 'targets/widget/PrayerWidgets.swift'), 'utf8');
  const expectedSwift = [
    EN['widget.name.niche'],
    EN['widget.sheet.niche'],
    EN['widget.name.row'],
    EN['widget.sheet.row'],
    EN['widget.name.quiet'],
    EN['widget.sheet.quiet'],
    EN['widget.lock.description'],
  ];
  for (const words of expectedSwift) {
    if (!swift.includes(`"${words}"`)) {
      console.error(`✗ native copies: PrayerWidgets.swift does not carry ui.ts's ${JSON.stringify(words)}`);
      problems += 1;
    }
  }
  const views = readFileSync(join(root, 'targets/widget/Views.swift'), 'utf8');
  if (!views.includes(`"${EN['widget.openApp']}"`)) {
    console.error(`✗ native copies: Views.swift's fallback is not ui.ts's ${JSON.stringify(EN['widget.openApp'])}`);
    problems += 1;
  }

  const group = JSON.parse(readFileSync(join(root, 'app.json'), 'utf8')).expo.ios.entitlements['com.apple.security.application-groups']?.[0];
  const namesGroup = [
    ['targets/widget/Schedule.swift', readFileSync(join(root, 'targets/widget/Schedule.swift'), 'utf8')],
    ['modules/prayer-widget/ios-storage.ios.ts', readFileSync(join(root, 'modules/prayer-widget/ios-storage.ios.ts'), 'utf8')],
  ];
  for (const [file, text] of namesGroup) {
    if (!group || !text.includes(`'${group}'`) && !text.includes(`"${group}"`)) {
      console.error(`✗ native copies: ${file} does not name app.json's app group ${JSON.stringify(group)}`);
      problems += 1;
    }
  }

  const target = readFileSync(join(root, 'targets/widget/expo-target.config.js'), 'utf8');
  for (const [scheme, key] of [['light', 'background'], ['dark', 'background'], ['light', 'accent'], ['dark', 'accent']]) {
    const expected = token(scheme, key);
    if (!expected || !target.toUpperCase().includes(expected)) {
      console.error(`✗ native copies: expo-target.config.js does not carry theme.ts ${scheme}.${key} (${expected})`);
      problems += 1;
    }
  }

  if (problems === 0) {
    console.log('✓ native copies: the pickers’ words match ui.ts on both phones, the colours match theme.ts, and one app group is named everywhere');
  }
  return problems;
}

function checkDrawing() {
  let problems = 0;
  const payload = buildWidgetPayload({
    coords: CASES[0].coords,
    profile: inferProfile(CASES[0].coords),
    now: new Date(),
    fluent: false,
    t: (key) => EN[key],
    colors: { light: {}, dark: {} },
  });
  const onlyMLCZ = /^[MLCZ](?:\s+-?\d+(?:\.\d+)?)*(?:\s+[MLCZ](?:\s+-?\d+(?:\.\d+)?)*)*$/;
  for (const [label, path] of [...Object.entries(payload.marks), ['arch outer', payload.arch.outer], ['arch inner', payload.arch.inner]]) {
    if (!onlyMLCZ.test(path)) {
      console.error(`✗ drawing: ${label} holds something other than M L C Z: ${path.slice(0, 80)}`);
      problems += 1;
    }
  }

  // Every arc and circle in the marks, converted and sampled, must stay on its radius.
  const cubicPoint = (x0, y0, [, c1x, c1y, c2x, c2y, x3, y3], t) => {
    const u = 1 - t;
    return [
      u * u * u * x0 + 3 * u * u * t * c1x + 3 * u * t * t * c2x + t * t * t * x3,
      u * u * u * y0 + 3 * u * u * t * c1y + 3 * u * t * t * c2y + t * t * t * y3,
    ];
  };
  const circumcentre = ([ax, ay], [bx, by], [cx, cy]) => {
    const d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by));
    const ux = ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
    const uy = ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
    return [ux, uy];
  };
  const onRadius = (label, x0, y0, ops, radius) => {
    const points = [];
    let x = x0;
    let y = y0;
    for (const op of ops) {
      if (op[0] !== 'C') continue;
      for (let i = 0; i <= 8; i += 1) points.push(cubicPoint(x, y, op, i / 8));
      [x, y] = [op[5], op[6]];
    }
    const centre = circumcentre(points[0], points[Math.floor(points.length / 2)], points.at(-1));
    const worst = Math.max(...points.map(([px, py]) => Math.abs(Math.hypot(px - centre[0], py - centre[1]) - radius)));
    if (!(worst < 0.01)) {
      console.error(`✗ drawing: ${label} strays ${worst.toFixed(4)} from its radius ${radius}`);
      problems += 1;
    }
  };

  for (const [mark, parts] of Object.entries(DAY_MARK_PARTS)) {
    for (const part of parts) {
      if (!('d' in part)) {
        const ops = circleToCubics(part.cx, part.cy, part.r);
        onRadius(`${mark} circle`, part.cx + part.r, part.cy, ops.slice(1, 1 + (ops.length - 2) / 2), part.r);
        continue;
      }
      const arc = /A\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([01])\s+([01])\s+([\d.]+)\s+([\d.]+)/g;
      let match;
      while ((match = arc.exec(part.d))) {
        // The arc's start is the last absolute point before it in the path.
        const before = part.d.slice(0, match.index).trim().split(/[\sA-Za-z]+/).filter(Boolean).map(Number);
        const [x0, y0] = before.slice(-2);
        const [rx, ry, rot, large, sweep, x1, y1] = match.slice(1).map(Number);
        onRadius(`${mark} arc`, x0, y0, arcToCubics(x0, y0, rx, ry, rot, large === 1, sweep === 1, x1, y1), rx);
      }
    }
  }
  if (problems === 0) console.log('✓ drawing: paths are M L C Z, and every converted arc stays on its radius');
  return problems;
}
