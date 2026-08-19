import { IMAN_PILLARS } from './iman';
import { PILLARS } from './pillars';
import { PRAYERS } from './prayers';
import type { Guide } from './types';
import { WUDU } from './wudu';

export const GUIDES: Guide[] = [WUDU, ...PRAYERS];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((guide) => guide.id === id);
}

export { AUDIO, getAudio, hasAnyAudio } from './audio';
export { getImanPillar } from './iman';
export { getPillar, SHAHADA } from './pillars';
export { AUDIO_SOURCE_BY_ID, creditLine, getAudioSource, SOURCES } from './audio-sources';
export type { AudioSource } from './audio-sources';
export { getPracticeClipCount, getPracticeCredits, getPracticeItems } from './practice';
export type { PracticeClip, PracticeItem } from './practice';
export { Recitations } from './recitations';
export { IMAN_PILLARS, PILLARS, PRAYERS, WUDU };
export * from './types';
