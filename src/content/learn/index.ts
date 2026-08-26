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
import { ISTIKHARA, QIYAM_AL_LAYL, TAHAJJUD, TAWBA_PRAYER, WITR } from './voluntary-prayers';
import { WORK } from './work';
import { ref, type ContentRef } from '../model';
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
  TAHAJJUD,
  QIYAM_AL_LAYL,
  WITR,
  ISTIKHARA,
  TAWBA_PRAYER,
];

export {
  ISTIKHARA, QIYAM_AL_LAYL, TAHAJJUD, TAWBA_PRAYER, WITR,
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
export type TopicGroupId = 'praying' | 'chosen' | 'believe' | 'world' | 'hard' | 'year';

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
 * ## Refs, not references
 *
 * These were `Reference[]` and had to stop being that. Wudu and the prayers are
 * `Guide`s, so a group of references could not hold them — and the Learn tab
 * lost every guide the moment the recommendation section that used to carry
 * them was deleted. Someone opening Learn to find out how to wash could not.
 *
 * `ContentRef` is what the rest of the app already uses to point at content
 * without caring which kind it is, and `resolveRef` drops anything that does
 * not exist, so a group can name something before it is written.
 */
export const TOPIC_GROUPS: readonly { id: TopicGroupId; topics: readonly ContentRef[] }[] = [
  {
    id: 'praying',
    topics: [
      // Wudu first, because wudu comes first.
      ref('guide', 'wudu'),
      ref('reference', 'before-prayer'),
      // The prayers are reached through the chooser rather than as five cards
      // or as Fajr standing in for all of them — see `src/app/pray.tsx`. The
      // Learn tab renders that entry itself; it is not a `ContentRef` because
      // it is a screen rather than a piece of content.
      ref('reference', 'al-fatihah'),
      ref('reference', 'what-breaks-prayer'),
      ref('reference', 'dua-and-dhikr'),
    ],
  },
  {
    id: 'believe',
    topics: [
      ref('reference', 'what-is-islam'),
      ref('reference', 'who-is-allah'),
      ref('reference', 'who-is-muhammad'),
      ref('reference', 'what-is-the-quran'),
      ref('reference', 'sunnah'),
    ],
  },
  {
    id: 'world',
    topics: [
      ref('reference', 'food'),
      ref('reference', 'clothing'),
      ref('reference', 'halal-and-haram'),
      ref('reference', 'mosque'),
      ref('reference', 'family'),
      ref('reference', 'work'),
      ref('reference', 'manners'),
    ],
  },
  {
    // The prayers you choose. Grouped apart from the five so a reader can see
    // at a glance which are owed and which are offered.
    id: 'chosen',
    topics: [
      ref('reference', 'tahajjud'),
      ref('reference', 'istikhara'),
      ref('reference', 'tawba-prayer'),
    ],
  },
  { id: 'hard', topics: [ref('reference', 'repentance'), ref('reference', 'patience-and-gratitude')] },
  { id: 'year', topics: [ref('reference', 'ramadan'), ref('reference', 'islamic-calendar')] },
];

/**
 * Anything that should be on the Learn tab and is in no group.
 *
 * Widened after a real miss: this used to compare against `LEARN_TOPICS` only,
 * so `mosque` — a `surface: 'learn'` reference that lives in `references.ts`
 * rather than in this directory — vanished from the tab and the audit reported
 * nothing wrong. It now asks the question the screen actually asks: of every
 * reference marked for this surface, and every guide, which is unreachable?
 */
export function ungrouped(
  allReferences: readonly { id: string; surface?: string; title: string }[],
  allGuides: readonly { id: string; title: string }[],
): readonly { kind: string; id: string; title: string }[] {
  const claimed = new Set(TOPIC_GROUPS.flatMap((g) => g.topics.map((t) => `${t.kind}:${t.id}`)));

  /*
    Reachable somewhere better than a Learn card, and deliberately absent here.

    Written down rather than left for the check to keep reporting: an audit
    that always prints six things is an audit nobody reads, and the next
    person to see the list deserves the reason rather than a decision to
    re-make.
  */
  for (const elsewhere of [
    // Its own card at the top of the tab.
    'guide:shahada',
    // Situational, not lessons. Both sit under "Do I need to wash first?" in
    // the help topics, which is where somebody actually looks for them —
    // nobody browses to tayammum, they need it because there is no water.
    'guide:ghusl',
    'guide:tayammum',
    // The prayers are reached two ways, neither of them a card here: from
    // Today's times card, which always offers the one that is next, and from
    // the chooser, which shows all five with their rakʿah counts side by side.
    // That comparison is the thing worth teaching and five separate cards
    // could never make it.
    'guide:fajr',
    'guide:dhuhr',
    'guide:asr',
    'guide:maghrib',
    'guide:isha',
    // The three voluntary prayers are reached from the chooser too, and their
    // reference pages — which is what a reader actually needs — are grouped
    // under `chosen`.
    'guide:tahajjud',
    'guide:istikhara',
    'guide:tawba',
  ]) {
    claimed.add(elsewhere);
  }

  return [
    ...allReferences
      .filter((r) => r.surface === 'learn' && !claimed.has(`reference:${r.id}`))
      .map((r) => ({ kind: 'reference', id: r.id, title: r.title })),
    ...allGuides
      .filter((g) => !claimed.has(`guide:${g.id}`))
      .map((g) => ({ kind: 'guide', id: g.id, title: g.title })),
  ];
}
