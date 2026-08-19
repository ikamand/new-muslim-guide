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
  licence: string;
  /** What the licence obliges us to keep doing. Shown to nobody; read by us. */
  obligation?: string;
};

export const SOURCES = {
  husary: {
    reciter: 'Mahmoud Khalil Al-Husary',
    detail: 'muʿallim (teaching) recitation',
    origin: 'everyayah.com',
    licence: 'CC BY-NC',
    obligation:
      'Credit the reciter and everyayah.com wherever the audio plays, and never sell the app or carry advertising in it.',
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
};

export function getAudioSource(audioId: string): AudioSource | undefined {
  const key = AUDIO_SOURCE_BY_ID[audioId];
  return key ? SOURCES[key] : undefined;
}

/** One credit line per distinct source, for rendering under a list of clips. */
export function creditLine(source: AudioSource): string {
  const who = source.detail ? `${source.reciter} (${source.detail})` : source.reciter;
  return `Recitation by ${who}, from ${source.origin}, used under ${source.licence}.`;
}
