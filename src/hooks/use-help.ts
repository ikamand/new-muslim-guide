import type { Href } from 'expo-router';
import { useMemo } from 'react';

import { getReference, hasPracticeBeyondSurahs, resolveRef } from '@/content';
import {
  getHelpTopic,
  HELP_TOPICS,
  type HelpEntry,
  type HelpScreen,
  type HelpTopicId,
} from '@/content/help';
import { useLocale } from '@/hooks/use-locale';
import { useSettings, type Audience } from '@/hooks/use-settings';
import { usePrayerConfidence } from '@/hooks/use-competence';
import { localiseCatalogEntry } from '@/i18n/localise';
import type { Locale } from '@/i18n/locales';
import { ui, type UIKey } from '@/i18n/ui';
import { routeForHelpScreen, routeForHelpTopic, routeFor } from '@/lib/content-routes';
import type { PrayerConfidence } from '@/lib/onboarding';

/**
 * "I need help with…", resolved to things that actually open.
 *
 * The topics in `src/content/help.ts` are pointers. This is where they become
 * links, and where anything that points at nothing disappears — a ref with no
 * content behind it, and a topic left with no entries at all. A chip a beginner
 * taps must always land somewhere real; a shorter row is the price, and it is
 * the right one.
 */

export type HelpLink = {
  key: string;
  title: string;
  description: string;
  href: Href;
};

export type ResolvedHelpTopic = {
  id: HelpTopicId;
  label: string;
  links: readonly HelpLink[];
  /**
   * Where the chip for this topic goes. A topic holding one thing opens that
   * thing directly rather than a page listing it on its own.
   */
  href: Href;
};

/** The screens a topic can point at, and how they describe themselves. */
const SCREEN_TEXT: Record<HelpScreen, { title: UIKey; description: UIKey }> = {
  duas: { title: 'learn.duas.title', description: 'learn.duas.subtitle' },
  phrases: { title: 'learn.phrases.title', description: 'learn.phrases.subtitle' },
  practice: { title: 'learn.practice.title', description: 'learn.practice.subtitle' },
};

/**
 * A topic marked for one audience is hidden from the other; someone who
 * declined the question sees everything. Same rule the prayer topics have
 * always used — the alternative is withholding something on a guess.
 */
function allowed(entry: HelpEntry, audience: Audience): boolean {
  if (entry.kind !== 'content' || entry.ref.kind !== 'reference') return true;
  const reference = getReference(entry.ref.id);
  return !reference?.audience || !audience || reference.audience === audience;
}

/**
 * A screen worth sending somebody to right now.
 *
 * Practice is the only one that can fail this, and only while Al-Fatiha is its
 * sole recorded clip — the Qur'an tab does those seven ayahs better in every
 * respect, and the "Qur'an" help topic offering the worse of the two doors is
 * the exact thing hiding it from Learn and Today was meant to stop. Same rule
 * this file already applies to a ref with nothing behind it: a chip a beginner
 * taps has to land somewhere worth landing.
 */
function screenAvailable(screen: HelpScreen): boolean {
  return screen === 'practice' ? hasPracticeBeyondSurahs() : true;
}

function toLink(entry: HelpEntry, locale: Locale): HelpLink | undefined {
  if (entry.kind === 'screen') {
    if (!screenAvailable(entry.screen)) return undefined;
    const text = SCREEN_TEXT[entry.screen];
    return {
      key: `screen:${entry.screen}`,
      title: ui(locale, text.title),
      description: ui(locale, text.description),
      href: routeForHelpScreen(entry.screen),
    };
  }

  const found = resolveRef(entry.ref);
  if (!found) return undefined;

  const localised = localiseCatalogEntry(found, locale);
  return {
    key: `${found.kind}:${found.id}`,
    title: localised.title,
    description: localised.shortDescription,
    href: routeFor(found),
  };
}

/**
 * Which questions to put first.
 *
 * Reordering, never filtering. Somebody learning to pray meets the prayer
 * questions first and still sees every other one below them, because the
 * question they have today is not the only question they will ever have.
 *
 * ## Keyed on praying, not on "what do you want help with"
 *
 * That question was retired in Phase 7 — it asked somebody to pick a category
 * of themselves in their first minute and could never be checked. Confidence
 * is a better key for this list anyway: what somebody needs help with is
 * mostly a function of where they are with the prayer, and unlike the old
 * answer it moves on its own as the app watches them. See `lib/competence.ts`.
 */
const LEADING: Record<PrayerConfidence, readonly HelpTopicId[]> = {
  /* Nothing else matters yet. Wash, pray, and what to do when it goes wrong. */
  'teach-me': ['prayer', 'washing', 'new'],
  'need-words': ['prayer', 'mistakes', 'quran'],
  /* Past the mechanics: the questions are about living among people now. */
  'on-my-own': ['people', 'food', 'clothing'],
};

function resolveTopic(
  id: HelpTopicId,
  locale: Locale,
  audience: Audience,
): ResolvedHelpTopic | undefined {
  const topic = getHelpTopic(id);
  if (!topic) return undefined;

  const links = topic.entries
    .filter((entry) => allowed(entry, audience))
    .map((entry) => toLink(entry, locale))
    .filter((link): link is HelpLink => link !== undefined);

  if (links.length === 0) return undefined;

  return {
    id,
    label: ui(locale, `help.topic.${id}` as UIKey),
    links,
    href: links.length === 1 ? links[0].href : routeForHelpTopic(id),
  };
}

/** Every topic that resolves to something, most relevant to this reader first. */
export function useHelpTopics(): readonly ResolvedHelpTopic[] {
  const { locale } = useLocale();
  const { audience } = useSettings();
  const confidence = usePrayerConfidence();

  return useMemo(() => {
    const leading = LEADING[confidence];
    const order = [
      ...leading,
      ...HELP_TOPICS.map((topic) => topic.id).filter((id) => !leading.includes(id)),
    ];

    return order
      .map((id) => resolveTopic(id, locale, audience))
      .filter((topic): topic is ResolvedHelpTopic => topic !== undefined);
  }, [locale, audience, confidence]);
}

/** One topic, for its own screen. Undefined for an id that resolves to nothing. */
export function useHelpTopic(id: string): ResolvedHelpTopic | undefined {
  const { locale } = useLocale();
  const { audience } = useSettings();

  return useMemo(
    () => resolveTopic(id as HelpTopicId, locale, audience),
    [id, locale, audience],
  );
}
