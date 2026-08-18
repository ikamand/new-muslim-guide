import { PILLARS } from './pillars';
import { PRAYERS } from './prayers';
import type { Guide } from './types';
import { WUDU } from './wudu';

export const GUIDES: Guide[] = [WUDU, ...PRAYERS];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((guide) => guide.id === id);
}

export { getPillar, SHAHADA } from './pillars';
export { PILLARS, PRAYERS, WUDU };
export * from './types';
