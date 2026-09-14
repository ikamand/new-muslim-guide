/**
 * Makes every adhan file the app ships, from the recordings as downloaded.
 *
 * `npm run adhan:audio`. macOS only: it converts with `afconvert`, which
 * ships with macOS, rather than adding an audio toolchain to the project.
 * EAS never runs this. The outputs are committed and the build uses those.
 *
 * For each voice in `src/content/adhan-voices.ts` it writes:
 *
 * - **The whole recording for Android**, mono AAC, into the native module's
 *   `res/raw`, where the playback service finds it by resource name.
 * - **The opening for iOS**, cut at `openingEnd` with a short fade, as IMA4 in
 *   a CAF. That is one of the four encodings Apple lists for a notification
 *   sound, and a notification sound must be under thirty seconds.
 * - **The same opening as AAC**, for the preview button on iOS, and copied
 *   into `res/raw` as the short adhan Android can choose. Android cannot play
 *   IMA4 in a CAF, so neither can reuse the iOS file.
 *
 * And `assets/adhan/derived.json`, which records the hash of each original and
 * the cut it was made with, so `npm run adhan:check` can tell a stale file
 * from a fresh one without converting anything.
 *
 * Mono because an adhan is one voice, and stereo doubled the size of files
 * that play through one phone speaker. The bit rate follows the source: the
 * three 16 kbps recordings gain nothing from 64.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  ADHAN_VOICES,
  openingPreviewFile,
  openingSoundFile,
  rawName,
  shortRawName,
} from '../src/content/adhan-voices.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
export const ORIGINAL_DIR = join(root, 'assets/adhan/original');
export const OPENING_DIR = join(root, 'assets/adhan/opening');
export const RAW_DIR = join(root, 'modules/adhan-alarm/android/src/main/res/raw');
export const DERIVED = join(root, 'assets/adhan/derived.json');

const FADE_SECONDS = 0.25;

/** Reads a PCM WAV: afconvert writes a FLLR padding chunk, so walk the chunks. */
function readWav(path) {
  const buffer = readFileSync(path);
  let offset = 12;
  let channels = 0;
  let rate = 0;
  let bits = 0;
  let data = null;
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    if (id === 'fmt ') {
      channels = buffer.readUInt16LE(offset + 10);
      rate = buffer.readUInt32LE(offset + 12);
      bits = buffer.readUInt16LE(offset + 22);
    }
    if (id === 'data') {
      data = buffer.subarray(offset + 8, offset + 8 + size);
      break;
    }
    offset += 8 + size + (size % 2);
  }
  if (!data || bits !== 16) throw new Error(`${path}: expected 16-bit PCM, found ${bits} bits`);
  return { channels, rate, data };
}

/** One channel, averaged, as a Float32Array in -1..1. */
function toMono({ channels, data }) {
  const frames = Math.floor(data.length / (2 * channels));
  const mono = new Float32Array(frames);
  for (let frame = 0; frame < frames; frame += 1) {
    let sum = 0;
    for (let channel = 0; channel < channels; channel += 1) {
      sum += data.readInt16LE((frame * channels + channel) * 2);
    }
    mono[frame] = sum / channels / 32768;
  }
  return mono;
}

function writeWav(path, samples, rate) {
  const data = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i += 1) {
    const value = Math.max(-1, Math.min(1, samples[i]));
    data.writeInt16LE(Math.round(value * 32767), i * 2);
  }
  const header = Buffer.alloc(44);
  header.write('RIFF', 0, 'ascii');
  header.writeUInt32LE(36 + data.length, 4);
  header.write('WAVE', 8, 'ascii');
  header.write('fmt ', 12, 'ascii');
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(1, 22);
  header.writeUInt32LE(rate, 24);
  header.writeUInt32LE(rate * 2, 28);
  header.writeUInt16LE(2, 32);
  header.writeUInt16LE(16, 34);
  header.write('data', 36, 'ascii');
  header.writeUInt32LE(data.length, 40);
  writeFileSync(path, Buffer.concat([header, data]));
}

const afconvert = (...args) => execFileSync('afconvert', args, { stdio: 'pipe' });

/** AAC at the bit rate the source deserves; retried at 44.1 kHz if the encoder refuses the rate. */
function encodeAac(wav, out, sourceRate) {
  const low = sourceRate <= 22050;
  try {
    afconvert('-f', 'm4af', '-d', 'aac', '-b', low ? '32000' : '64000', wav, out);
  } catch {
    afconvert('-f', 'm4af', '-d', 'aac@44100', '-b', '64000', wav, out);
  }
}

export const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

/* Only when run, so `adhan-check.mjs` can import the paths without converting. */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (process.platform !== 'darwin') {
    console.error('adhan:audio converts with afconvert, which only exists on macOS.');
    process.exit(1);
  }

  for (const dir of [OPENING_DIR, RAW_DIR]) mkdirSync(dir, { recursive: true });
  const work = join(tmpdir(), 'adhan-audio');
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });

  /*
    Voice ids on the command line convert only those
    (`npm run adhan:audio -- abdulbasit-fajr`), so moving one cut does not
    re-encode the other seven and put seven unchanged recordings in a commit.
  */
  const only = process.argv.slice(2);
  const unknown = only.filter((id) => !ADHAN_VOICES.some((voice) => voice.id === id));
  if (unknown.length > 0) {
    console.error(`✗ No voice with the id ${unknown.join(', ')} in src/content/adhan-voices.ts`);
    process.exit(1);
  }
  const derived = only.length > 0 && existsSync(DERIVED) ? JSON.parse(readFileSync(DERIVED, 'utf8')) : {};
  for (const voice of ADHAN_VOICES) {
    if (only.length > 0 && !only.includes(voice.id)) continue;
    const source = join(ORIGINAL_DIR, voice.original);
    if (!existsSync(source)) {
      console.error(`✗ ${voice.id}: no file at assets/adhan/original/${voice.original}`);
      process.exit(1);
    }

    // Decode at the source's own rate and channel count, then mix in here.
    const decoded = join(work, `${voice.id}-decoded.wav`);
    afconvert('-f', 'WAVE', '-d', 'LEI16', source, decoded);
    const wav = readWav(decoded);
    const mono = toMono(wav);
    const fullSeconds = mono.length / wav.rate;

    const fullWav = join(work, `${voice.id}-full.wav`);
    writeWav(fullWav, mono, wav.rate);
    encodeAac(fullWav, join(RAW_DIR, `${rawName(voice.id)}.m4a`), wav.rate);

    const cut = Math.min(mono.length, Math.round(voice.openingEnd * wav.rate));
    const opening = mono.slice(0, cut);
    const fade = Math.round(FADE_SECONDS * wav.rate);
    for (let i = 0; i < fade && i < opening.length; i += 1) {
      opening[opening.length - 1 - i] *= i / fade;
    }
    const openingWav = join(work, `${voice.id}-opening.wav`);
    writeWav(openingWav, opening, wav.rate);
    afconvert('-f', 'caff', '-d', 'ima4@22050', openingWav, join(OPENING_DIR, openingSoundFile(voice.id)));
    encodeAac(openingWav, join(OPENING_DIR, openingPreviewFile(voice.id)), wav.rate);
    // The same bytes again for Android, which plays the short adhan from res/raw.
    copyFileSync(join(OPENING_DIR, openingPreviewFile(voice.id)), join(RAW_DIR, `${shortRawName(voice.id)}.m4a`));

    derived[voice.id] = {
      source: sha256(source),
      openingEnd: voice.openingEnd,
      openingSeconds: Number((opening.length / wav.rate).toFixed(2)),
      fullSeconds: Number(fullSeconds.toFixed(1)),
    };
    console.log(
      `✓ ${voice.id.padEnd(18)} opening ${derived[voice.id].openingSeconds}s · full ${derived[voice.id].fullSeconds}s`,
    );
  }

  writeFileSync(DERIVED, JSON.stringify(derived, null, 2) + '\n');
  rmSync(work, { recursive: true, force: true });
}
