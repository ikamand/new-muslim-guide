/**
 * The adhan feature's promises, as a check that fails.
 *
 * `npm run adhan:check`. No network, no device, no conversion.
 *
 * ## The files
 *
 * Every voice in `content/adhan-voices.ts` has its three files, made from the
 * recording as it is now and the cut as it is now. A cut nudged by ear, or a
 * recording swapped for a better copy, without `npm run adhan:audio` would
 * otherwise ship the old sound under the new name. Every opening is under
 * Apple's thirty seconds, past which an iPhone plays its own tone instead.
 * Every iOS opening is listed in app.json, and every preview is required in
 * `audio.ts`. Every Android name is one `res/raw` accepts.
 *
 * ## The credits
 *
 * Every voice has an entry in `audio-sources.ts`. `-- --release` also fails
 * while any has no `origin`, which is where the credit is still missing.
 *
 * ## The schedule
 *
 * Handed made-up settings, because the promises are about settings: an adhan
 * fires at the prayer's time whatever lead time is stored; a notification
 * fires at its lead; off schedules nothing; the old one-switch-per-prayer
 * shape reads back as what it was; a Fajr recording stored against another
 * prayer reads as that prayer's default.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ADHAN_VOICES,
  openingPreviewFile,
  openingSoundFile,
  rawName,
  voiceAllowedFor,
} from '../src/content/adhan-voices.ts';
import { AUDIO_SOURCE_BY_ID, SOURCES } from '../src/content/audio-sources.ts';
import { computeDay, inferProfile } from '../src/lib/prayer-times.ts';
import {
  applyAlertToAll,
  DEFAULT_REMINDERS,
  defaultAlert,
  parseReminderSettings,
  planReminders,
} from '../src/lib/reminders.ts';
import { DERIVED, OPENING_DIR, ORIGINAL_DIR, RAW_DIR, sha256 } from './adhan-audio.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const PRAYER_OTHERS = ['dhuhr', 'asr', 'maghrib', 'isha'];
const release = process.argv.includes('--release');

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.error('  ✗ ' + message);
};

/* ── Files ─────────────────────────────────────────────────── */

const derived = existsSync(DERIVED) ? JSON.parse(readFileSync(DERIVED, 'utf8')) : {};
const appJson = readFileSync(join(root, 'app.json'), 'utf8');
const audioTs = readFileSync(join(root, 'src/content/audio.ts'), 'utf8');

for (const voice of ADHAN_VOICES) {
  const original = join(ORIGINAL_DIR, voice.original);
  if (!existsSync(original)) {
    fail(`${voice.id}: no recording at assets/adhan/original/${voice.original}`);
    continue;
  }
  if (!/^[a-z0-9_]+$/.test(rawName(voice.id))) fail(`${voice.id}: "${rawName(voice.id)}" is not a name res/raw accepts`);

  for (const file of [
    join(RAW_DIR, `${rawName(voice.id)}.m4a`),
    join(OPENING_DIR, openingSoundFile(voice.id)),
    join(OPENING_DIR, openingPreviewFile(voice.id)),
  ]) {
    if (!existsSync(file)) fail(`${voice.id}: ${file.slice(root.length + 1)} is missing. Run npm run adhan:audio`);
  }

  const made = derived[voice.id];
  if (!made) {
    fail(`${voice.id}: never converted. Run npm run adhan:audio`);
  } else {
    if (made.source !== sha256(original)) fail(`${voice.id}: the recording changed since its files were made. Run npm run adhan:audio`);
    if (made.openingEnd !== voice.openingEnd) fail(`${voice.id}: the cut moved to ${voice.openingEnd}s but the files were made at ${made.openingEnd}s. Run npm run adhan:audio`);
    if (!(made.openingSeconds < 30)) fail(`${voice.id}: the opening is ${made.openingSeconds}s; iOS plays its own tone past 30`);
  }

  if (!appJson.includes(`"./assets/adhan/opening/${openingSoundFile(voice.id)}"`)) {
    fail(`${voice.id}: ${openingSoundFile(voice.id)} is not in app.json's expo-notifications sounds, so iOS will not have it`);
  }
  if (!audioTs.includes(`require('@/assets/adhan/opening/${openingPreviewFile(voice.id)}')`)) {
    fail(`${voice.id}: no preview in src/content/audio.ts`);
  }

  const key = AUDIO_SOURCE_BY_ID[`adhan-${voice.id}`];
  if (!key || !SOURCES[key]) fail(`${voice.id}: no credit in audio-sources.ts`);
  else if (release && !SOURCES[key].origin) fail(`${voice.id}: the credit has no origin. Where did the recording come from?`);
}

/* A sound in app.json that no voice names is nine hundred kilobytes nobody can choose. */
for (const match of appJson.matchAll(/"\.\/assets\/adhan\/opening\/([^"]+)"/g)) {
  if (!ADHAN_VOICES.some((voice) => openingSoundFile(voice.id) === match[1])) {
    fail(`app.json lists ${match[1]}, which no voice in adhan-voices.ts makes`);
  }
}

/* ── The schedule ──────────────────────────────────────────── */

const london = { latitude: 51.5074, longitude: -0.1278 };
const profile = inferProfile(london);
const from = new Date(2026, 8, 14, 0, 0);
const day = computeDay(london, from, profile);
const timeOf = (id) => day.prayers.find((prayer) => prayer.id === id).time.getTime();

const settings = {
  alerts: {
    ...DEFAULT_REMINDERS.alerts,
    dhuhr: { ...defaultAlert('dhuhr'), mode: 'adhan', leadMinutes: 30 },
    asr: { ...defaultAlert('asr'), mode: 'sound', leadMinutes: 10 },
    maghrib: { ...defaultAlert('maghrib'), mode: 'silent', leadMinutes: 0 },
  },
};
const planned = planReminders(london, profile, settings, from, 1);
const at = (id) => planned.find((entry) => entry.prayerId === id);

if (at('dhuhr')?.fireAt.getTime() !== timeOf('dhuhr')) fail('an adhan with a 30-minute lead stored did not fire at the prayer time');
if (at('asr')?.fireAt.getTime() !== timeOf('asr') - 10 * 60_000) fail('a notification with sound did not fire 10 minutes before');
if (at('maghrib')?.fireAt.getTime() !== timeOf('maghrib')) fail('a silent notification at 0 minutes did not fire at the time');
if (at('fajr') || at('isha')) fail('a prayer set to off was scheduled');
if (planReminders(london, profile, DEFAULT_REMINDERS, from, 12).length !== 0) fail('the defaults scheduled something');

const migrated = parseReminderSettings({
  prayers: { fajr: true, dhuhr: false, asr: true, maghrib: false, isha: false },
  leadMinutes: 15,
});
if (migrated.alerts.fajr.mode !== 'sound' || migrated.alerts.fajr.leadMinutes !== 15) {
  fail('the old shape did not read back as a notification with sound at its lead');
}
if (migrated.alerts.dhuhr.mode !== 'off') fail('an old switch that was off did not stay off');

const misfiled = parseReminderSettings({
  alerts: { dhuhr: { mode: 'adhan', voice: 'alafasy-fajr', leadMinutes: 7 } },
});
if (misfiled.alerts.dhuhr.voice === 'alafasy-fajr') fail('a Fajr recording stored against Dhuhr was accepted');
if (misfiled.alerts.dhuhr.leadMinutes !== 10) fail('a lead time outside the choices was accepted');
if (parseReminderSettings('not an object') !== DEFAULT_REMINDERS) fail('garbage did not read as the defaults');

/* "Use these for all prayers": the mode and overrides go everywhere, a voice only to its own kind. */
const mixed = {
  alerts: {
    ...DEFAULT_REMINDERS.alerts,
    fajr: { ...defaultAlert('fajr'), mode: 'adhan', voice: 'kuwait-fajr' },
    asr: { ...defaultAlert('asr'), mode: 'adhan', voice: 'najar', playOnSilent: true },
  },
};
const fromAsr = applyAlertToAll(mixed, 'asr');
if (fromAsr.alerts.fajr.voice !== 'kuwait-fajr') fail("applying ʿAsr's choices took Fajr's own recording away");
if (fromAsr.alerts.dhuhr.voice !== 'najar' || !fromAsr.alerts.isha.playOnSilent) fail("applying ʿAsr's choices did not reach Dhuhr and ʿIsha");
if (fromAsr.alerts.fajr.mode !== 'adhan' || !fromAsr.alerts.fajr.playOnSilent) fail("applying ʿAsr's choices did not reach Fajr's mode and overrides");
const fromFajr = applyAlertToAll(mixed, 'fajr');
if (PRAYER_OTHERS.some((id) => fromFajr.alerts[id].voice === 'kuwait-fajr')) fail("applying Fajr's choices put a Fajr recording on another prayer");
const plainFajr = { alerts: { ...mixed.alerts, fajr: { ...mixed.alerts.fajr, voice: 'damradash' } } };
if (applyAlertToAll(plainFajr, 'fajr').alerts.maghrib.voice !== 'damradash') {
  fail("Fajr's choice of an adhan without the Fajr line did not reach the other prayers");
}

for (const voice of ADHAN_VOICES) {
  if (voice.kind === 'fajr' && voiceAllowedFor('dhuhr', voice.id)) fail(`${voice.id} is offered for Dhuhr`);
  if (!voiceAllowedFor('fajr', voice.id)) fail(`${voice.id} is not offered for Fajr`);
}

if (failures > 0) {
  console.error(`\nadhan:check — ${failures} failure${failures === 1 ? '' : 's'}`);
  process.exit(1);
}
console.log(`adhan:check — ${ADHAN_VOICES.length} voices, their files and the schedule hold${release ? ', credits included' : ''}.`);
