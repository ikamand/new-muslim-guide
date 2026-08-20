/**
 * "I need help with…" — the app approached in ordinary words.
 *
 * A new Muslim does not know that what they want is called `tahara`, or that
 * the answer to "can I eat this" is filed under a topic named after a legal
 * category. They know they have a question. These are the ten shapes those
 * questions actually take, each one a list of pointers into content that
 * already exists.
 *
 * ## Pointers only
 *
 * Every entry is either a `ContentRef` into the catalogue or a screen the app
 * already has. Nothing here holds text, and nothing here can invent a topic:
 * a ref that resolves to nothing is dropped when the topic is rendered, and a
 * topic left with nothing is not shown at all. That is what stops this becoming
 * a menu of promises.
 *
 * ## No labels either
 *
 * The names live in `src/i18n/ui.ts` under `help.*`, because "Food and drink"
 * is interface wording rather than religious content — the same reason the tab
 * bar is not in this directory. Screens carry a `labelKey` for the same reason
 * a journey step does.
 */

import type { ContentRef } from './model';
import { ref } from './model';

/** A screen the app already has, named so `src/lib/content-routes.ts` can route it. */
export const HELP_SCREENS = ['duas', 'phrases', 'practice'] as const;
export type HelpScreen = (typeof HELP_SCREENS)[number];

export type HelpEntry =
  | { kind: 'content'; ref: ContentRef }
  | { kind: 'screen'; screen: HelpScreen };

export const HELP_TOPIC_IDS = [
  'prayer',
  'washing',
  'mistakes',
  'quran',
  'words',
  'food',
  'clothing',
  'people',
  'ramadan',
  'new',
] as const;

export type HelpTopicId = (typeof HELP_TOPIC_IDS)[number];

export type HelpTopic = {
  id: HelpTopicId;
  entries: readonly HelpEntry[];
};

const content = (kind: ContentRef['kind'], id: string): HelpEntry => ({
  kind: 'content',
  ref: ref(kind, id),
});

const screen = (name: HelpScreen): HelpEntry => ({ kind: 'screen', screen: name });

/**
 * The ten questions.
 *
 * Ordered as a beginner meets them rather than alphabetically. Two of them earn
 * their place by being the questions nobody asks out loud: "when something goes
 * wrong" gathers everything that used to be findable only by scrolling past it
 * mid-prayer, and "I've just become Muslim" exists because someone in their
 * first week should not have to guess which of ten topics is for them.
 */
export const HELP_TOPICS: readonly HelpTopic[] = [
  {
    id: 'prayer',
    entries: [
      content('reference', 'before-prayer'),
      content('guide', 'fajr'),
      content('reference', 'al-fatihah'),
      content('reference', 'what-breaks-prayer'),
      content('reference', 'mosque'),
    ],
  },
  {
    id: 'washing',
    entries: [
      content('guide', 'wudu'),
      content('guide', 'ghusl'),
      content('guide', 'tayammum'),
    ],
  },
  {
    id: 'mistakes',
    entries: [
      content('reference', 'missed'),
      content('reference', 'lost-count'),
      content('reference', 'seated'),
      content('reference', 'travelling'),
      content('reference', 'periods'),
      content('reference', 'repentance'),
    ],
  },
  {
    id: 'quran',
    entries: [
      content('reference', 'what-is-the-quran'),
      content('reference', 'al-fatihah'),
      screen('practice'),
    ],
  },
  {
    id: 'words',
    entries: [content('reference', 'dua-and-dhikr'), screen('duas'), screen('phrases')],
  },
  {
    id: 'food',
    entries: [content('reference', 'food'), content('reference', 'halal-and-haram')],
  },
  {
    id: 'clothing',
    entries: [content('reference', 'clothing')],
  },
  {
    id: 'people',
    entries: [
      content('reference', 'family'),
      content('reference', 'work'),
      content('reference', 'manners'),
    ],
  },
  {
    id: 'ramadan',
    entries: [
      content('reference', 'ramadan'),
      content('pillar', 'sawm'),
      content('reference', 'islamic-calendar'),
    ],
  },
  {
    id: 'new',
    entries: [
      content('guide', 'shahada'),
      content('reference', 'what-is-islam'),
      content('reference', 'who-is-allah'),
      content('reference', 'who-is-muhammad'),
      content('pillar', 'salah'),
      content('article', 'allah'),
    ],
  },
];

export function getHelpTopic(id: string): HelpTopic | undefined {
  return HELP_TOPICS.find((topic) => topic.id === id);
}

/** Every content pointer any topic makes. Drives the audit. */
export function helpRefs(): readonly ContentRef[] {
  return HELP_TOPICS.flatMap((topic) =>
    topic.entries.filter((entry) => entry.kind === 'content').map((entry) => entry.ref),
  );
}
