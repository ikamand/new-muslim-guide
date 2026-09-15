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
 * Handed made-up settings, because the promises are about settings: every
 * alert fires at the prayer's time, and a Pre-Adhan reminder fires its
 * minutes before; off schedules nothing; both older stored shapes read back
 * as what they were, without handing an adhan a reminder it never had; a Fajr
 * recording stored against another prayer reads as that prayer's default;
 * a volume or length out of range reads as the default.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ADHAN_VOICES,
  openingPreviewFile,
  openingSoundFile,
  rawName,
  shortRawName,
  voiceAllowedFor,
} from '../src/content/adhan-voices.ts';
import { AUDIO_SOURCE_BY_ID, SOURCES } from '../src/content/audio-sources.ts';
import { fitToPlatform, prayerAlertSchedule } from '../src/lib/alert-schedule.ts';
import { computeDay, inferProfile, PRAYER_LABEL } from '../src/lib/prayer-times.ts';
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

  const preview = join(OPENING_DIR, openingPreviewFile(voice.id));
  const short = join(RAW_DIR, `${shortRawName(voice.id)}.m4a`);
  for (const file of [join(RAW_DIR, `${rawName(voice.id)}.m4a`), join(OPENING_DIR, openingSoundFile(voice.id)), preview, short]) {
    if (!existsSync(file)) fail(`${voice.id}: ${file.slice(root.length + 1)} is missing. Run npm run adhan:audio`);
  }
  // Android's short adhan is the preview's own bytes; a re-cut that updated one and not the other would play two openings.
  if (existsSync(preview) && existsSync(short) && sha256(preview) !== sha256(short)) {
    fail(`${voice.id}: the Android short adhan differs from the opening. Run npm run adhan:audio -- ${voice.id}`);
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
    dhuhr: { ...defaultAlert('dhuhr'), mode: 'adhan', preReminderMinutes: 30 },
    asr: { ...defaultAlert('asr'), mode: 'sound', preReminderMinutes: 10 },
    maghrib: { ...defaultAlert('maghrib'), mode: 'silent' },
  },
};
const planned = planReminders(london, profile, settings, from, 1);
const find = (id, kind) => planned.find((entry) => entry.prayerId === id && entry.kind === kind);

if (find('dhuhr', 'alert')?.fireAt.getTime() !== timeOf('dhuhr')) fail('an adhan did not fire at the prayer time');
if (find('dhuhr', 'pre')?.fireAt.getTime() !== timeOf('dhuhr') - 30 * 60_000) fail('a 30-minute Pre-Adhan reminder did not fire 30 minutes before');
if (find('asr', 'alert')?.fireAt.getTime() !== timeOf('asr')) fail('a notification with sound did not fire at the prayer time');
if (find('asr', 'pre')?.fireAt.getTime() !== timeOf('asr') - 10 * 60_000) fail('a 10-minute reminder did not fire 10 minutes before');
if (find('maghrib', 'alert')?.fireAt.getTime() !== timeOf('maghrib')) fail('a silent notification did not fire at the time');
if (find('maghrib', 'pre')) fail('a prayer with no Pre-Adhan reminder got one');
if (planned.some((entry) => entry.prayerId === 'fajr' || entry.prayerId === 'isha')) fail('a prayer set to off was scheduled');
if (planReminders(london, profile, DEFAULT_REMINDERS, from, 12).length !== 0) fail('the defaults scheduled something');

const oneSwitch = parseReminderSettings({
  prayers: { fajr: true, dhuhr: false, asr: true, maghrib: false, isha: false },
  leadMinutes: 15,
});
if (oneSwitch.alerts.fajr.mode !== 'sound' || oneSwitch.alerts.fajr.preReminderMinutes !== 15) {
  fail('the one-switch shape did not read back as a notification with its lead as the reminder');
}
if (oneSwitch.alerts.dhuhr.mode !== 'off' || oneSwitch.alerts.dhuhr.preReminderMinutes !== 0) {
  fail('an old switch that was off did not stay off');
}

const firstAlerts = parseReminderSettings({
  alerts: {
    asr: { mode: 'sound', voice: 'najar', leadMinutes: 10 },
    dhuhr: { mode: 'adhan', voice: 'najar', leadMinutes: 10 },
    isha: { mode: 'off', voice: 'majale', leadMinutes: 10 },
  },
});
if (firstAlerts.alerts.asr.preReminderMinutes !== 10) fail("a notification's lead from the first alert build did not become its reminder");
if (firstAlerts.alerts.dhuhr.preReminderMinutes !== 0) fail('an adhan gained a reminder from a lead time it never used');
if (firstAlerts.alerts.isha.preReminderMinutes !== 0) fail('a prayer that was off gained a reminder');
if (firstAlerts.alerts.dhuhr.length !== 'full' || firstAlerts.alerts.dhuhr.volume !== defaultAlert('dhuhr').volume) {
  fail('an alert from before length and volume did not take the defaults');
}

const misfiled = parseReminderSettings({
  alerts: { dhuhr: { mode: 'adhan', voice: 'alafasy-fajr', preReminderMinutes: 7, volume: 9, length: 'medium' } },
});
if (misfiled.alerts.dhuhr.voice === 'alafasy-fajr') fail('a Fajr recording stored against Dhuhr was accepted');
if (misfiled.alerts.dhuhr.preReminderMinutes !== 0) fail('a reminder outside the choices was accepted');
if (misfiled.alerts.dhuhr.volume !== 1) fail('a volume above the range was not held to it');
if (misfiled.alerts.dhuhr.length !== 'full') fail('an unknown length was accepted');
if (parseReminderSettings('not an object') !== DEFAULT_REMINDERS) fail('garbage did not read as the defaults');

const kept = parseReminderSettings({
  alerts: { dhuhr: { mode: 'adhan', voice: 'najar' }, asr: { mode: 'sound', voice: 'najar' } },
});
if (kept.alerts.dhuhr.voiceChosen !== true) fail('an adhan saved before voiceChosen did not count as chosen, so Adhan would reopen its sheet');
if (kept.alerts.asr.voiceChosen !== false) fail('a Tone alert counted a voice as chosen');

/* ── What each phone is handed ─────────────────────────────── */

const say = (key) => key;
const handed = (plan, id, kind) => {
  const entry = find(id, kind);
  return entry && plan.items.find((item) => item.fireAt.getTime() === entry.fireAt.getTime() && item.title === PRAYER_LABEL[id]);
};

const iphone = prayerAlertSchedule(planned, 'ios', false, say);
if (iphone.adhans.length !== 0) fail('an iPhone was handed a native adhan');
if (handed(iphone, 'dhuhr', 'alert')?.sound !== openingSoundFile('majale')) fail("an iPhone's adhan does not sound the opening of its voice");
if (handed(iphone, 'dhuhr', 'pre')?.sound !== undefined) fail("an iPhone's Pre-Adhan reminder is not the phone's own sound");
if (handed(iphone, 'asr', 'alert')?.sound !== undefined) fail('a Tone alert does not use the phone sound');
if (handed(iphone, 'maghrib', 'alert')?.sound !== null) fail('a Silent alert makes a sound');
if (iphone.items.some((item) => typeof item.sound === 'string' && !item.sound.endsWith('_opening.caf'))) {
  fail('an iPhone was handed a sound other than an opening, which it cannot play past thirty seconds');
}
if (iphone.items.some((item) => item.timeSensitive)) fail('an alert went through Focus without Sound during Focus');
const inFocus = prayerAlertSchedule(
  planReminders(london, profile, { alerts: { ...settings.alerts, dhuhr: { ...settings.alerts.dhuhr, soundInFocus: true } } }, from, 1),
  'ios',
  false,
  say,
);
if (!inFocus.items.some((item) => item.timeSensitive && item.fireAt.getTime() === timeOf('dhuhr'))) {
  fail('Sound during Focus did not reach the adhan notification');
}

const android = prayerAlertSchedule(planned, 'android', true, say);
if (android.adhans.length !== 1 || android.adhans[0].sound !== rawName('majale')) fail('Android was not handed the full adhan for Dhuhr');
if (android.adhans[0]?.fireAt !== timeOf('dhuhr')) fail("Android's adhan is not at Dhuhr's time");
if (android.items.some((item) => item.fireAt.getTime() === timeOf('dhuhr'))) fail('Android got a notification as well as the adhan at Dhuhr');
if (!android.items.some((item) => item.fireAt.getTime() === timeOf('dhuhr') - 30 * 60_000)) fail("Android lost Dhuhr's Pre-Adhan reminder");
const shortDhuhr = planReminders(london, profile, { alerts: { ...settings.alerts, dhuhr: { ...settings.alerts.dhuhr, length: 'short' } } }, from, 1);
if (prayerAlertSchedule(shortDhuhr, 'android', true, say).adhans[0]?.sound !== shortRawName('majale')) {
  fail('a prayer set to the short adhan was not handed the short recording');
}
const withoutModule = prayerAlertSchedule(planned, 'android', false, say);
if (withoutModule.adhans.length !== 0 || handed(withoutModule, 'dhuhr', 'alert')?.sound !== undefined) {
  fail('an Android build without the module lost the Dhuhr alert instead of sounding the phone');
}

const allOn = {
  alerts: Object.fromEntries(
    ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'].map((id) => [id, { ...defaultAlert(id), mode: 'adhan', preReminderMinutes: 10 }]),
  ),
};
const fortnight = prayerAlertSchedule(planReminders(london, profile, allOn, from), 'ios', false, say).items;
const held = fitToPlatform(fortnight, 'ios', say);
if (fortnight.length <= 60) fail('the window test never reached the iPhone cap');
if (held.length > 60) fail(`an iPhone was handed ${held.length} notifications, past what it holds`);
if (held[held.length - 1]?.title !== 'reminders.window.title') fail('a cut iPhone schedule does not end by asking to open the app');
if (held.some((item, index) => index > 0 && item.fireAt < held[index - 1].fireAt)) fail('a held schedule is not nearest first');
if (fitToPlatform(fortnight, 'android', say).length !== fortnight.length) fail('Android was cut to the iPhone cap');

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
