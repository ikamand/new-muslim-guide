/**
 * Where an ayah's recitation comes from.
 *
 * ## The app's first network request, and what it does not break
 *
 * Everything else here works with the radio off, and that stays true: salah,
 * wudu, prayer times, qibla and every bundled recitation are untouched by this.
 * The promise was always about the *worship path* — somebody praying in a
 * basement or on a plane — and the Qur'an tab is a learning surface, not that.
 *
 * What it does cost: a request to `mirrors.quranicaudio.com` reveals a user's
 * IP to a third party, and it changes the App Store privacy answers whenever
 * the app is submitted. Decided, and recorded here rather than argued again.
 *
 * ## Why a derived URL is allowed where a derived `require` is not
 *
 * `src/content/audio.ts` has to write every path literally, because Metro
 * resolves `require` at build time and a missing file fails the whole bundle.
 * None of that applies to a URL: it is resolved at play time, a wrong one
 * fails one button rather than the app, and 564 literal strings would be a
 * generated file nobody could read.
 */

import { creditLine, SOURCES } from '../audio-sources';

/**
 * Mahmoud Khalil Al-Husary's *muʿallim* recitation — recorded for learners to
 * copy, which is exactly what this tab is for.
 *
 * The same recording the app already bundles for Al-Fatiha, so the credit and
 * the licence are the ones `audio-sources.ts` already carries: CC BY-NC, which
 * requires the attribution and forbids ever selling the app or carrying
 * advertising in it.
 */
const BASE = 'https://mirrors.quranicaudio.com/everyayah/Husary_Muallim_128kbps';

/** `114001` — surah and ayah, each padded to three digits. */
export function ayahAudioUrl(surah: number, ayah: number): string {
  return `${BASE}/${String(surah).padStart(3, '0')}${String(ayah).padStart(3, '0')}.mp3`;
}

/**
 * The credit owed wherever this plays.
 *
 * Derived from the same record the bundled clips use rather than written out
 * again, so the two can never drift into crediting the same reciter two ways.
 */
export const RECITATION_CREDIT = creditLine(SOURCES.husary);
