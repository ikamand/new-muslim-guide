import { PRAYERS } from './prayers';
import { SHAHADA_GUIDE } from './shahada';
import type { Guide } from './types';
import { WUDU } from './wudu';

/**
 * Every guide in the app, in the order someone meets them.
 *
 * Kept out of `index.ts` so it can be read without pulling in the audio map,
 * whose `require` calls only Metro can resolve. The manifest scripts import
 * this; a guide listed anywhere else would be missed by the translation sheet,
 * which is exactly what happened the first time one was added.
 *
 * Becoming Muslim comes first because it comes first. It is not on the home
 * screen — someone already praying does not need it daily — but it is a guide,
 * so `getGuide` has to find it.
 */
export const GUIDES: Guide[] = [SHAHADA_GUIDE, WUDU, ...PRAYERS];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((guide) => guide.id === id);
}
