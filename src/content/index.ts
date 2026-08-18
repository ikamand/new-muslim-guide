import { PRAYERS } from './prayers';
import type { Guide } from './types';
import { WUDU } from './wudu';

export const GUIDES: Guide[] = [WUDU, ...PRAYERS];

export function getGuide(id: string): Guide | undefined {
  return GUIDES.find((guide) => guide.id === id);
}

export { PRAYERS, WUDU };
export * from './types';
