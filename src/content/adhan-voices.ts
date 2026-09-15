/**
 * The adhan recordings the app can sound when a prayer's time comes in.
 *
 * ## What plays where
 *
 * Android plays the whole recording at the prayer's time, from a native
 * module (`modules/adhan-alarm`), because only a running service can play
 * three minutes of audio from a closed app. iOS cannot: a notification sound
 * must be under thirty seconds or the system plays its own tone instead, and
 * iOS gives an app no other way to make sound on time. So an iPhone hears the
 * opening only, cut inside the first pause (Iyad, 14 Sep 2026: "for iOS we
 * just want the first allahu akbar").
 *
 * Android plays the opening too, for a prayer set to the short adhan (Iyad,
 * 14 Sep 2026: short and full on Android, short only on iOS).
 *
 * ## Fajr has its own recordings
 *
 * The Fajr adhan adds "aṣ-ṣalātu khayrun min an-nawm", twice, after the
 * second "ḥayya ʿalā l-falāḥ" (Abu Dawud 500, read in the corpus). A Fajr
 * recording is therefore never offered for any other prayer. Fajr may also
 * use an adhan of the other prayers: Iyad, 13 Sep 2026, "that is optional".
 * ⚠️ That the line may be left out is his statement, not a sourced ruling; it
 * belongs on the scholarly review pile with the rest.
 *
 * ## The files
 *
 * Nothing here is a path. `npm run adhan:audio` reads `original` from
 * `assets/adhan/original/`, exactly as the file was downloaded, and writes
 * the three files each voice needs; `npm run adhan:check` fails if any is
 * missing or older than the recording and the cut that made it.
 *
 * The cut points below were measured from the loudness of each recording, then
 * heard by Iyad on 14 Sep 2026: seven were right, and Abdul Basit's ended about
 * a second early and was moved (see below). ⚠️ The moved cut has not been
 * heard yet.
 *
 * ⚠️ Where each recording came from is not yet written down, so no voice here
 * can carry a credit beyond its name. See `adhan*` in `audio-sources.ts`.
 */

export type AdhanKind = 'fajr' | 'other';

export type AdhanVoice = {
  id: string;
  /** The muezzin, or the place a recording is named for when it names no muezzin. */
  name: string;
  /**
   * The name a summary line uses, as a muezzin is usually called: "Adhan ·
   * Al Maghriby" fits a row at 360 points where the full name was cut off.
   */
  short: string;
  kind: AdhanKind;
  /** The file in `assets/adhan/original/`, exactly as downloaded. */
  original: string;
  /** Seconds. Where the opening clip ends: half a second into the first pause. */
  openingEnd: number;
  /**
   * Seconds. Where the recording starts, when it opens on the muezzin drawing
   * breath before the first word. Left out when it opens on the word itself.
   * `openingEnd` is still a time in the recording as downloaded.
   */
  startAt?: number;
};

/*
  Order is the order of the list, and the first of each kind is the default.
  Al Majale leads the other prayers because it is the cleanest recording of
  the four (256 kbps); Al Maghriby comes last for the opposite reason, 16 kbps
  mono. Alafasy leads Fajr as the best-known voice; Abdul Basit's is longer
  than five minutes, which is a lot to wake to.

  Measured first pauses, start–end in seconds, that each cut sits in:
  Al Majale 9.4–16.8 · Al Najar 4.0–5.4 · Al Damradash 7.5–9.3 ·
  Al Maghriby 12.8–16.6 · Alafasy 3.7–5.5 · Kuwait 9.0–12.3 ·
  Umm al-Quwain 14.5–17.2.

  Abdul Basit's recording never drops to silence, only to its own room noise,
  and his first cut, at 14.0, followed a dip at 13.7 that was not the end of
  the phrase: the last syllable swells again and settles only by about 14.5.
  Iyad heard it cut about a second short (14 Sep 2026), so it ends at 15.0,
  with the fade inside the room noise.

  Al Najar opens on the muezzin's breath, which Iyad heard (15 Sep 2026). His
  voice enters at 1.211, and what comes before it is an inhale about six
  decibels above the room tone the recording keeps in its own pauses. So the
  file starts at 1.15, on a zero crossing, leaving sixty milliseconds of tone
  before the first syllable. The room tone itself stays, because it is in the
  recording and a cut at the front cannot reach it.

  Measured starts of the voice, for the ones that do not begin on it: Al Najar
  1.21 · Umm al-Quwain 1.75 · Abdul Basit 0.96 · Kuwait 0.93. Only Al Najar is
  trimmed; the other three are recorded here so the question is asked once.
*/
export const ADHAN_VOICES = [
  {
    id: 'majale',
    name: 'Hamza Al Majale',
    short: 'Al Majale',
    kind: 'other',
    original: 'Hamza Al Majale - Adhan.mp3',
    openingEnd: 9.9,
  },
  {
    id: 'najar',
    name: 'Mahmud Mustafa Al Najar',
    short: 'Al Najar',
    kind: 'other',
    original: ' Mahmud Mustafa Al Najar - Adhan.mp3',
    openingEnd: 4.5,
    startAt: 1.15,
  },
  {
    id: 'damradash',
    name: 'Muhammad Al Damradash',
    short: 'Al Damradash',
    kind: 'other',
    original: 'Muhammad Al Damradash - Adhan.mp3',
    openingEnd: 8.0,
  },
  {
    id: 'maghriby',
    name: 'Nurdin Hamza Al Maghriby',
    short: 'Al Maghriby',
    kind: 'other',
    original: 'NurDin Hamza Al Maghriby - Adhan.mp3',
    openingEnd: 13.3,
  },
  {
    id: 'alafasy-fajr',
    name: 'Mishary Rashid Alafasy',
    short: 'Alafasy',
    kind: 'fajr',
    original: ' Mishary Rashid Alafasy - Al Fajr.mp3',
    openingEnd: 4.2,
  },
  {
    // Spelled as the Qur'an tab spells him: one spelling per name.
    id: 'abdulbasit-fajr',
    name: 'Abdul Basit Abdus Samad',
    short: 'Abdul Basit',
    kind: 'fajr',
    original: 'Abdulbasit Abdusamad - Al Fajr.mp3',
    openingEnd: 15.0,
  },
  {
    id: 'kuwait-fajr',
    name: 'Kuwait',
    short: 'Kuwait',
    kind: 'fajr',
    original: 'Al Kuwait Al Fajr.mp3',
    openingEnd: 9.5,
  },
  {
    id: 'ummalquwain-fajr',
    name: 'Umm al-Quwain',
    short: 'Umm al-Quwain',
    kind: 'fajr',
    original: 'Umm Al Quwain Al Fajr, .mp3',
    openingEnd: 15.0,
  },
] as const satisfies readonly AdhanVoice[];

export type AdhanVoiceId = (typeof ADHAN_VOICES)[number]['id'];

export const DEFAULT_VOICE: Record<AdhanKind, AdhanVoiceId> = {
  fajr: 'alafasy-fajr',
  other: 'majale',
};

export function isAdhanVoiceId(value: unknown): value is AdhanVoiceId {
  return ADHAN_VOICES.some((voice) => voice.id === value);
}

export function getVoice(id: AdhanVoiceId): AdhanVoice {
  return ADHAN_VOICES.find((voice) => voice.id === id) ?? ADHAN_VOICES[0];
}

/** Fajr may take either kind; every other prayer only the adhan without the Fajr line. */
export function voiceAllowedFor(prayerId: string, id: AdhanVoiceId): boolean {
  return prayerId === 'fajr' || getVoice(id).kind === 'other';
}

/** The voice a prayer starts on. */
export function defaultVoiceFor(prayerId: string): AdhanVoiceId {
  return prayerId === 'fajr' ? DEFAULT_VOICE.fajr : DEFAULT_VOICE.other;
}

/**
 * The Android resource name: lowercase letters, digits and underscores only,
 * which is all `res/raw` accepts.
 */
export function rawName(id: AdhanVoiceId | string): string {
  return `adhan_${id.replace(/-/g, '_')}`;
}

/**
 * The opening as an Android resource, for a prayer set to the short adhan.
 * Android cannot play the iOS CAF, and it cannot share its name: the
 * expo-notifications plugin copies the CAF into the app's `res/raw` as
 * `…_opening`, and an app resource silently wins over a library's.
 */
export function shortRawName(id: AdhanVoiceId | string): string {
  return `${rawName(id)}_short`;
}

/** The iOS notification sound, by the bare file name iOS looks it up by. */
export function openingSoundFile(id: AdhanVoiceId | string): string {
  return `${rawName(id)}_opening.caf`;
}

/** The same opening as a clip the app itself can play, for the preview. */
export function openingPreviewFile(id: AdhanVoiceId | string): string {
  return `${rawName(id)}_opening.m4a`;
}
