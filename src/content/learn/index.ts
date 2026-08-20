import { CLOTHING } from './clothing';
import { FAMILY } from './family';
import { FOOD } from './food';
import { HALAL_AND_HARAM } from './halal-and-haram';
import { MANNERS } from './manners';
import { RAMADAN } from './ramadan';
import { SUNNAH } from './sunnah';
import { WHAT_IS_ISLAM } from './what-is-islam';
import { WHAT_IS_THE_QURAN } from './what-is-the-quran';
import { WHO_IS_ALLAH } from './who-is-allah';
import { WHO_IS_MUHAMMAD } from './who-is-muhammad';
import { WORK } from './work';
import type { Reference } from '../types';

/**
 * The beginner topics, in the order someone meets them.
 *
 * A directory of their own because `references.ts` holds the things you look up
 * mid-prayer, and these are the things you read in a quiet minute — a different
 * moment and a different kind of writing. Both end up in `REFERENCES`.
 *
 * ⚠️ Every file here is model-written English over citations that were each
 * verified by opening the page. The prose still needs a qualified reader; the
 * numbers have been checked.
 */
export const LEARN_TOPICS: Reference[] = [
  WHAT_IS_ISLAM,
  WHO_IS_ALLAH,
  WHO_IS_MUHAMMAD,
  WHAT_IS_THE_QURAN,
  SUNNAH,
  HALAL_AND_HARAM,
  FOOD,
  CLOTHING,
  FAMILY,
  WORK,
  MANNERS,
  RAMADAN,
];

export {
  CLOTHING, FAMILY, FOOD, HALAL_AND_HARAM, MANNERS, RAMADAN, SUNNAH,
  WHAT_IS_ISLAM, WHAT_IS_THE_QURAN, WHO_IS_ALLAH, WHO_IS_MUHAMMAD, WORK,
};
