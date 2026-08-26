/**
 * Where each recorded clip came from, and on what terms.
 *
 * Attribution is a licence obligation, not a nicety, so it lives as data next
 * to the clips rather than as a sentence typed into a screen. The practice
 * screen renders whichever sources are actually playing on it, which means a
 * credit cannot be forgotten when a clip is added or left stranded when one is
 * removed.
 *
 * An id absent from `AUDIO_SOURCE_BY_ID` has not been recorded yet.
 */

export type AudioSource = {
  reciter: string;
  /** Which recitation of theirs — teaching, murattal, and so on. */
  detail?: string;
  origin: string;
  /**
   * The terms the rights-holder actually published, where they published any.
   *
   * Optional, and absent is the honest value rather than a gap to fill in.
   * everyayah.com states no terms anywhere — not on its front page, not on its
   * recitations index — so naming a licence for anything sourced there would be
   * printing a claim nobody made. `creditLine` drops the clause when this is
   * absent, which leaves the attribution standing and asserts nothing.
   */
  licence?: string;
  /** What the licence obliges us to keep doing. Shown to nobody; read by us. */
  obligation?: string;
};

export const SOURCES = {
  husary: {
    reciter: 'Mahmoud Khalil Al-Husary',
    detail: 'muʿallim (teaching) recitation',
    origin: 'everyayah.com',
    obligation:
      'Believed CC BY-NC, but everyayah.com publishes no terms and that belief could not be sourced. Credit the reciter and everyayah.com wherever the audio plays, and never sell the app or carry advertising in it.',
  },
  /*
    The eight streamed reciters behind the Qur'an tab's picker.

    ⚠️ None carries a `licence`, because everyayah.com publishes no terms
    anywhere that could be found — see the header of
    `src/content/quran/recitation.ts`, which carries the full note. Recorded
    per reciter rather than once, because if one of these has to be dropped
    over rights it will be one and not all eight.
  */
  husaryMurattal: {
    reciter: 'Mahmoud Khalil Al-Husary',
    detail: 'murattal recitation',
    origin: 'everyayah.com',
    obligation:
      'Credit the reciter and everyayah.com wherever the audio plays, and never sell the app or carry advertising in it.',
  },
  abdulBasit: {
    reciter: 'Abdul Basit Abdus Samad',
    detail: 'murattal recitation',
    origin: 'everyayah.com',
    obligation:
      'Credit the reciter and everyayah.com wherever the audio plays. Commercially published; clear the rights before a public release.',
  },
  alafasy: {
    reciter: 'Mishary Rashid Alafasy',
    origin: 'everyayah.com',
    obligation:
      'Credit the reciter and everyayah.com wherever the audio plays. Commercially published; clear the rights before a public release.',
  },
  minshawy: {
    reciter: 'Mohamed Siddiq El-Minshawi',
    detail: 'murattal recitation',
    origin: 'everyayah.com',
    obligation: 'Credit the reciter and everyayah.com wherever the audio plays.',
  },
  sudais: {
    reciter: 'Abdurrahman As-Sudais',
    origin: 'everyayah.com',
    obligation: 'Credit the reciter and everyayah.com wherever the audio plays.',
  },
  shatri: {
    reciter: 'Abu Bakr Ash-Shatri',
    origin: 'everyayah.com',
    obligation: 'Credit the reciter and everyayah.com wherever the audio plays.',
  },
  ghamdi: {
    reciter: 'Saad Al-Ghamdi',
    origin: 'everyayah.com',
    obligation: 'Credit the reciter and everyayah.com wherever the audio plays.',
  },
  commissioned: {
    reciter: 'To be commissioned',
    origin: 'Recorded for this app',
    licence: 'Owned, with written permission',
  },
} as const satisfies Record<string, AudioSource>;

export type SourceKey = keyof typeof SOURCES;

/** Recorded clips only. Add an id here in the same change that adds its file. */
export const AUDIO_SOURCE_BY_ID: Record<string, SourceKey> = {
  'fatiha-1': 'husary',
  'fatiha-2': 'husary',
  'fatiha-3': 'husary',
  'fatiha-4': 'husary',
  'fatiha-5': 'husary',
  'fatiha-6': 'husary',
  'fatiha-7': 'husary',

  // The three quls, added 25 Aug 2026 — same reciter, same host, same terms.
  'ikhlas-1': 'husary',
  'ikhlas-2': 'husary',
  'ikhlas-3': 'husary',
  'ikhlas-4': 'husary',

  'falaq-1': 'husary',
  'falaq-2': 'husary',
  'falaq-3': 'husary',
  'falaq-4': 'husary',
  'falaq-5': 'husary',

  'nas-1': 'husary',
  'nas-2': 'husary',
  'nas-3': 'husary',
  'nas-4': 'husary',
  'nas-5': 'husary',
  'nas-6': 'husary',
};

export function getAudioSource(audioId: string): AudioSource | undefined {
  const key = AUDIO_SOURCE_BY_ID[audioId];
  return key ? SOURCES[key] : undefined;
}

/** One credit line per distinct source, for rendering under a list of clips. */
export function creditLine(source: AudioSource): string {
  const who = source.detail ? `${source.reciter} (${source.detail})` : source.reciter;
  const where = `Recitation by ${who}, from ${source.origin}`;
  return source.licence ? `${where}, used under ${source.licence}.` : `${where}.`;
}
