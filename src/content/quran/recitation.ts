/**
 * Where an ayah's recitation comes from, and in whose voice.
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
 *
 * ⚠️ LICENCE UNRESOLVED, and it got bigger when this list did.
 *
 * everyayah.com publishes no terms of use — not on its front page, not on its
 * recitations index. The `CC BY-NC` recorded against Al-Husary in
 * `audio-sources.ts` is an assertion this repo made, not one that host states.
 * Eight reciters multiply that unverified claim by eight, and two of them —
 * Abdul Basit and Alafasy — are commercially published recordings with a
 * rights-holder who could plausibly object. Settle this before a public
 * release. Nothing here is a runtime dependency, so removing a voice later
 * costs one line in `RECITERS`.
 */

import { creditLine, SOURCES, type AudioSource } from '../audio-sources';

const BASE = 'https://mirrors.quranicaudio.com/everyayah';

/**
 * A reciter the reader can choose.
 *
 * `blurb` is the whole reason this is data rather than a list of names. Someone
 * three weeks into Islam has no basis on which to pick between Al-Minshawi and
 * Al-Ghamdi, and a bare list of eight Arabic names is a decision handed to
 * somebody who cannot make it. One plain sentence each turns a name into a
 * choice — what the voice is *for*, not who it belongs to.
 */
export type Reciter = {
  id: ReciterId;
  /** The folder on the host. Every id maps to one, and nothing builds it. */
  folder: string;
  name: string;
  /** What this recording is for, in a sentence a beginner can act on. */
  blurb: string;
  source: AudioSource;
};

export type ReciterId =
  | 'husary-muallim'
  | 'husary'
  | 'abdul-basit'
  | 'alafasy'
  | 'minshawy'
  | 'sudais'
  | 'shatri'
  | 'ghamdi';

/**
 * The roster, in the order it is offered.
 *
 * Teaching first, because this tab is for learning and the mu'allim recording
 * exists for exactly that. The rest are ordered by how likely a new Muslim is
 * to have already heard the voice, which is the only ranking that means
 * anything to someone who does not yet know any of them.
 *
 * Every folder below was checked against the host for all 564 ayahs of juz 30
 * before being listed — a reciter missing one file would be a silent gap in
 * the middle of a surah, which is the kind of failure nobody reports.
 */
export const RECITERS: readonly Reciter[] = [
  {
    id: 'husary-muallim',
    folder: 'Husary_Muallim_128kbps',
    name: 'Mahmoud Khalil Al-Husary, teaching',
    blurb: 'Slow, one phrase at a time. Recorded for learners to repeat after, and the best place to start.',
    source: SOURCES.husary,
  },
  {
    id: 'husary',
    folder: 'Husary_128kbps',
    name: 'Mahmoud Khalil Al-Husary',
    blurb: 'The same voice at a normal pace. Move here once you can hold the surah.',
    source: SOURCES.husaryMurattal,
  },
  {
    id: 'abdul-basit',
    folder: 'Abdul_Basit_Murattal_192kbps',
    name: 'Abdul Basit Abdus Samad',
    blurb: 'The most recognised voice in the Muslim world. Measured, and easy to follow.',
    source: SOURCES.abdulBasit,
  },
  {
    id: 'alafasy',
    folder: 'Alafasy_128kbps',
    name: 'Mishary Rashid Alafasy',
    blurb: 'The voice most people have heard on a phone or in a car. Clear and unhurried.',
    source: SOURCES.alafasy,
  },
  {
    id: 'minshawy',
    folder: 'Minshawy_Murattal_128kbps',
    name: 'Mohamed Siddiq El-Minshawi',
    blurb: 'Gentle and very evenly paced, which makes the ends of ayahs easy to hear.',
    source: SOURCES.minshawy,
  },
  {
    id: 'sudais',
    folder: 'Abdurrahmaan_As-Sudais_192kbps',
    name: 'Abdurrahman As-Sudais',
    blurb: 'An imam of the Sacred Mosque in Mecca. The voice you will hear on a broadcast from there.',
    source: SOURCES.sudais,
  },
  {
    id: 'shatri',
    folder: 'Abu_Bakr_Ash-Shaatree_128kbps',
    name: 'Abu Bakr Ash-Shatri',
    blurb: 'Brisk and precise. Good once the words are familiar and you want the rhythm.',
    source: SOURCES.shatri,
  },
  {
    id: 'ghamdi',
    folder: 'Ghamadi_40kbps',
    name: 'Saad Al-Ghamdi',
    blurb: 'Soft and steady. Many people find this the easiest one to listen to for a long stretch.',
    source: SOURCES.ghamdi,
  },
];

export const DEFAULT_RECITER: ReciterId = 'husary-muallim';

/** Falls back rather than throwing: a stored id from a build that offered a
 *  voice this one does not should cost someone their preference, not the tab. */
export function getReciter(id: ReciterId | null | undefined): Reciter {
  return RECITERS.find((r) => r.id === id) ?? RECITERS[0];
}

export function isReciterId(value: unknown): value is ReciterId {
  return typeof value === 'string' && RECITERS.some((r) => r.id === value);
}

/** `.../Alafasy_128kbps/114001.mp3` — surah and ayah, each padded to three. */
export function ayahAudioUrl(reciter: Reciter, surah: number, ayah: number): string {
  return `${BASE}/${reciter.folder}/${String(surah).padStart(3, '0')}${String(ayah).padStart(3, '0')}.mp3`;
}

/**
 * The credit owed wherever this reciter plays.
 *
 * Derived from the record in `audio-sources.ts` rather than written out again,
 * so a voice can never end up credited two different ways in two places.
 */
export function reciterCredit(reciter: Reciter): string {
  return creditLine(reciter.source);
}
