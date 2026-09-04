import { ADHAN } from './adhan';
import { ANIMALS_AND_LAND } from './animals-and-land';
import { ASR_PAGE, DHUHR_PAGE, FAJR_PAGE, ISHA_PAGE, MAGHRIB_PAGE } from './daily-prayers';
import { FASTING_ALONE } from './fasting-alone';
import { A_PARTNER_ALREADY } from './a-partner-already';
import { AL_FATIHAH } from './al-fatihah';
import { BEHIND_AN_IMAM } from './behind-an-imam';
import { BEING_CORRECTED } from './being-corrected';
import { BEFORE_PRAYER } from './before-prayer';
import { CLOTHING } from './clothing';
import { DUA_AND_DHIKR } from './dua-and-dhikr';
import { EID } from './eid';
import { FAMILY } from './family';
import { FOOD } from './food';
import { HALAL_AND_HARAM } from './halal-and-haram';
import { HOW_PRAYER_WORKS } from './how-prayer-works';
import { HOW_IT_BEGAN } from './how-it-began';
import { LIFE_BEFORE } from './life-before';
import { MARRIAGE_SHAPE } from './marriage-shape';
import { MINIMUM_PRAYER } from './minimum-prayer';
import { IF_YOU_STOPPED } from './if-you-stopped';
import { ISNT_ISLAM_VIOLENT } from './isnt-islam-violent';
import { ISLAMIC_CALENDAR } from './islamic-calendar';
import { JANAZAH } from './janazah';
import { JUMUAH } from './jumuah';
import { MANNERS } from './manners';
import { PATIENCE_AND_GRATITUDE } from './patience-and-gratitude';
import { RAMADAN } from './ramadan';
import { REPENTANCE } from './repentance';
import { RULINGS } from './rulings';
import { ANGER } from './anger';
import { ARROGANCE } from './arrogance';
import { ENVY } from './envy';
import { SHOWING_OFF } from './showing-off';
import { SMALL_SUNNAHS } from './small-sunnahs';
import { WHICH_DHIKR } from './which-dhikr';
import { SUNNAH } from './sunnah';
import { TEACHING_SOMEONE } from './teaching-someone';
import { WHAT_BREAKS_PRAYER } from './what-breaks-prayer';
import { WHAT_ABOUT_JESUS } from './what-about-jesus';
import { WHAT_IS_ISLAM } from './what-is-islam';
import { WHAT_IS_THE_QURAN } from './what-is-the-quran';
import { WHO_IS_ALLAH } from './who-is-allah';
import { WHO_IS_MUHAMMAD } from './who-is-muhammad';
import { WHY_PEOPLE_DIFFER } from './why-people-differ';
import { ISTIKHARA, QIYAM_AL_LAYL, TAHAJJUD, TAWBA_PRAYER, WITR } from './voluntary-prayers';
import { VOLUNTARY_FASTING } from './voluntary-fasting';
import { WORK } from './work';
import { YOUR_NAME } from './your-name';
import { YOUR_MOTHER } from './your-mother';
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
  /* Phase 9, 28 Aug 2026 — the five tier-one gaps. */
  LIFE_BEFORE,
  YOUR_NAME,
  MINIMUM_PRAYER,
  ADHAN,
  RULINGS,
  /* Phase 11, 28 Aug 2026 — the largest single gap in the app. */
  JUMUAH,
  /* The pilot of two: an event with a room, and one with nobody in it. */
  JANAZAH,
  IF_YOU_STOPPED,
  BEHIND_AN_IMAM,
  EID,
  VOLUNTARY_FASTING,
  /* Ramadan mode, 30 Aug 2026 — the one page docs/ramadan-mode.md adds. */
  FASTING_ALONE,
  BEING_CORRECTED,
  MARRIAGE_SHAPE,
  A_PARTNER_ALREADY,
  /* Phase 13, 28 Aug 2026 — the three tier-three items that are pages. */
  WHY_PEOPLE_DIFFER,
  ANGER,
  ARROGANCE,
  ENVY,
  SHOWING_OFF,
  SMALL_SUNNAHS,
  /* 3 Sep 2026 — the question a convert with ten minutes asks. */
  WHICH_DHIKR,
  TEACHING_SOMEONE,
  ISNT_ISLAM_VIOLENT,
  WHAT_ABOUT_JESUS,
  WHO_IS_ALLAH,
  WHO_IS_MUHAMMAD,
  HOW_IT_BEGAN,
  YOUR_MOTHER,
  ANIMALS_AND_LAND,
  WHAT_IS_THE_QURAN,
  SUNNAH,
  BEFORE_PRAYER,
  /* 31 Aug 2026 — the one page the Learn re-thread commissions. */
  HOW_PRAYER_WORKS,
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
  /* 3 Sep 2026 — the five daily prayers' own pages. surface: 'pray', so
     they answer to the Every-prayer rows, never to the Learn shelves. */
  FAJR_PAGE,
  DHUHR_PAGE,
  ASR_PAGE,
  MAGHRIB_PAGE,
  ISHA_PAGE,
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
export type TopicGroupId = 'praying' | 'believe' | 'world' | 'hard' | 'year';

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
      ref('reference', 'how-prayer-works'),
      // The prayers are reached through the chooser rather than as five cards
      // or as Fajr standing in for all of them — see `src/app/pray.tsx`. The
      // Learn tab renders that entry itself; it is not a `ContentRef` because
      // it is a screen rather than a piece of content.
      ref('reference', 'minimum-prayer'),
      ref('reference', 'al-fatihah'),
      ref('reference', 'adhan'),
      ref('reference', 'behind-an-imam'),
      ref('reference', 'what-breaks-prayer'),
      ref('reference', 'dua-and-dhikr'),
      ref('reference', 'which-dhikr'),
      ref('collection', 'quranic-duas'),
    ],
  },
  {
    id: 'believe',
    topics: [
      ref('reference', 'what-is-islam'),
      ref('reference', 'life-before'),
      ref('reference', 'your-name'),
      ref('reference', 'rulings'),
      ref('reference', 'who-is-allah'),
      ref('reference', 'who-is-muhammad'),
      /* The origin story in one sitting, beside the man it is about. */
      ref('reference', 'how-it-began'),
      ref('reference', 'what-is-the-quran'),
      ref('reference', 'sunnah'),
      /* Why four schools. The page that makes the 50 `differs` notes legible. */
      ref('reference', 'why-people-differ'),
      /*
        Last in the group, and deliberately.

        `docs/learning-model.md:268` files the ninety-nine names under tier
        three — year two and after — and argues the shape "suits a card on
        Today better than a page in Learn". The card is where the daily
        practice lives; this row exists because without it the page was
        reachable only from that card and from Ask, which is not findable at
        all. It sits after the five foundational topics rather than among them
        because a person in week one needs "Who is Allah?" and does not need
        ninety-nine names, and `beginnerPriority: 5` says the same thing to
        anything that sorts.
      */
      ref('collection', 'quranic-names'),
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
      ref('reference', 'marriage-shape'),
      ref('reference', 'a-partner-already'),
      ref('reference', 'work'),
      ref('reference', 'jumuah'),
      ref('reference', 'janazah'),
      ref('reference', 'manners'),
      ref('reference', 'small-sunnahs'),
      ref('reference', 'teaching-someone'),
      /* What is owed to a person, and to what cannot ask. */
      ref('reference', 'your-mother'),
      ref('reference', 'animals-and-land'),
      /* The questions a convert's family asks, filed with the other pages
         about being a Muslim among people who are not. */
      ref('reference', 'isnt-islam-violent'),
      ref('reference', 'what-about-jesus'),
    ],
  },
  {
    id: 'hard',
    topics: [
      ref('reference', 'repentance'),
      /* The month somebody quietly stopped. `repentance` covers the theology;
         this is the shape of a convert relapse, which is a different page. */
      ref('reference', 'if-you-stopped'),
      ref('reference', 'being-corrected'),
      ref('reference', 'patience-and-gratitude'),
      /* The four interior vices. Each page carries its own cure rather than
         pairing off into four more pages: nobody treats envy by reading a
         separate article about contentment. */
      ref('reference', 'anger'),
      ref('reference', 'showing-off'),
      ref('reference', 'arrogance'),
      ref('reference', 'envy'),
    ],
  },
  {
    id: 'year',
    topics: [
      ref('reference', 'ramadan'),
      /* Beside the month it belongs to: the month, kept where nobody else is. */
      ref('reference', 'fasting-alone'),
      ref('reference', 'voluntary-fasting'),
      ref('reference', 'eid'),
      ref('reference', 'islamic-calendar'),
    ],
  },
];

/*
  GROUP_ORDER is gone. It sorted these shelves by prayer confidence when they
  WERE the Learn tab; the library they moved to is a lookup surface with no
  "now", so it renders the groups in authored order and nothing re-sorts.
*/

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
    // The voluntary prayers, both halves of them. Since 26 Aug the chooser at
    // `/pray` opens the reference rather than the guide, and it lists all five
    // under its own "Prayers you choose" heading — so the Learn tab carried a
    // `chosen` group that was the same five rows opening the same five pages.
    // The group is gone and the chooser is the one place they live: it can put
    // them beside the five obligatory prayers, which is the comparison that
    // teaches what "voluntary" means, and a Learn group never could.
    'guide:tahajjud',
    'guide:istikhara',
    'guide:tawba',
    'guide:qiyam',
    'guide:witr',
    'reference:tahajjud',
    'reference:istikhara',
    'reference:tawba-prayer',
    'reference:qiyam-al-layl',
    'reference:witr',
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
