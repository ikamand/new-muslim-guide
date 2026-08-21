import { AL_FATIHAH } from './al-fatihah';
import { BEFORE_PRAYER } from './before-prayer';
import { CLOTHING } from './clothing';
import { DUA_AND_DHIKR } from './dua-and-dhikr';
import { FAMILY } from './family';
import { FOOD } from './food';
import { HALAL_AND_HARAM } from './halal-and-haram';
import { ISLAMIC_CALENDAR } from './islamic-calendar';
import { MANNERS } from './manners';
import { PATIENCE_AND_GRATITUDE } from './patience-and-gratitude';
import { RAMADAN } from './ramadan';
import { REPENTANCE } from './repentance';
import { SUNNAH } from './sunnah';
import { WHAT_BREAKS_PRAYER } from './what-breaks-prayer';
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
 *
 * Checked again in the content audit, this time against the text of every page
 * rather than only its existence — 45 Qur'an references and 61 narrations, and
 * for each one whether it says what the sentence beside it claims. Three did
 * not, and were corrected in place: Bukhari 1899 for the Prophet's ﷺ
 * generosity in Ramadan, Bukhari 3197 for the farewell sermon, and Bukhari
 * 5828 for gold and silk. See the file comments where those sit.
 *
 * What a reviewer still owns, per claim rather than per file, is listed in
 * `docs/scholarly-review.md`. The flag on each file below stays because the
 * English is still model-written, which is a different question from whether
 * the citation under it is right.
 */
export const LEARN_TOPICS: Reference[] = [
  WHAT_IS_ISLAM,
  WHO_IS_ALLAH,
  WHO_IS_MUHAMMAD,
  WHAT_IS_THE_QURAN,
  SUNNAH,
  BEFORE_PRAYER,
  AL_FATIHAH,
  WHAT_BREAKS_PRAYER,
  HALAL_AND_HARAM,
  FOOD,
  CLOTHING,
  FAMILY,
  WORK,
  MANNERS,
  DUA_AND_DHIKR,
  REPENTANCE,
  PATIENCE_AND_GRATITUDE,
  ISLAMIC_CALENDAR,
  RAMADAN,
];

export {
  AL_FATIHAH, BEFORE_PRAYER, CLOTHING, DUA_AND_DHIKR, FAMILY, FOOD,
  HALAL_AND_HARAM, ISLAMIC_CALENDAR, MANNERS, PATIENCE_AND_GRATITUDE, RAMADAN,
  REPENTANCE, SUNNAH, WHAT_BREAKS_PRAYER, WHAT_IS_ISLAM, WHAT_IS_THE_QURAN,
  WHO_IS_ALLAH, WHO_IS_MUHAMMAD, WORK,
};

/**
 * The topics, grouped by when the question arrives.
 *
 * The Learn tab rendered these as nineteen consecutive rows under one heading,
 * which is a shape that only works for someone who already knows what they are
 * looking for. A beginner does not arrive wanting "Clothing"; they arrive
 * having been asked something at work, or having opened a fridge.
 *
 * So the grouping is by moment rather than by subject. "Out in the world" holds
 * food, clothes, family, work and manners because those are all the same
 * situation — being a Muslim among people who are not — even though a library
 * would file them five different ways.
 *
 * Here rather than in the screen because it is a statement about the content,
 * and because `npm run content:audit` can then check that every topic is in
 * exactly one group. A topic missing from this table would silently vanish
 * from the tab.
 */
export type TopicGroupId = 'praying' | 'believe' | 'world' | 'hard' | 'year';

export const TOPIC_GROUPS: readonly { id: TopicGroupId; topics: readonly Reference[] }[] = [
  { id: 'praying', topics: [BEFORE_PRAYER, AL_FATIHAH, WHAT_BREAKS_PRAYER, DUA_AND_DHIKR] },
  { id: 'believe', topics: [WHAT_IS_ISLAM, WHO_IS_ALLAH, WHO_IS_MUHAMMAD, WHAT_IS_THE_QURAN, SUNNAH] },
  { id: 'world', topics: [FOOD, CLOTHING, HALAL_AND_HARAM, FAMILY, WORK, MANNERS] },
  { id: 'hard', topics: [REPENTANCE, PATIENCE_AND_GRATITUDE] },
  { id: 'year', topics: [RAMADAN, ISLAMIC_CALENDAR] },
];

/** Every topic that no group claims. Drives the audit; should always be empty. */
export function ungroupedTopics(): readonly Reference[] {
  const grouped = new Set(TOPIC_GROUPS.flatMap((group) => group.topics.map((t) => t.id)));
  return LEARN_TOPICS.filter((topic) => !grouped.has(topic.id));
}
