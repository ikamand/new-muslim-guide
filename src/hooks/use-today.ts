import type { Href } from 'expo-router';
import { useMemo } from 'react';

import { resolveRef, type ContentKind } from '@/content';
import { seasonFor, type SeasonId } from '@/content/seasons';
import { useHijriToday } from '@/hooks/use-hijri';
import { useJourney, type ResolvedStep } from '@/hooks/use-journey';
import { useLocale } from '@/hooks/use-locale';
import { useRecommendations } from '@/hooks/use-recommendations';
import { useSettings } from '@/hooks/use-settings';
import { localiseCatalogEntry } from '@/i18n/localise';
import { routeFor } from '@/lib/content-routes';

/**
 * The two or three things worth doing today, and why each one is there.
 *
 * Short on purpose, and at most one row per reason. This is the section that
 * turns into a dashboard if it is allowed to, and a list of ten useful things
 * is the same as no list at all to someone who opened the app because they did
 * not know what to do.
 *
 * Every item comes from somewhere the app already reasons about — the journey,
 * the recommendation tables, the calendar — and every item is deduplicated
 * against the Continue card above it. Nothing is picked at random, and nothing
 * appears twice on one screen.
 */

export type TodayReason = 'season' | 'prayer' | 'suggested';

export type TodayItem = {
  key: string;
  /** Why this is here. The screen turns it into a one-word label. */
  reason: TodayReason;
  /** Set only on a seasonal item — the window it belongs to. */
  season?: SeasonId;
  title: string;
  description: string;
  /** An honest reading time, where the content records one. */
  minutes?: number;
  href: Href;
};

/** What the app is teaching when it teaches someone to pray. */
const PRAYER_CATEGORIES = ['salah', 'purification'];

/** Kinds whose `routeFor` opens that thing, rather than a list containing it. */
const OWN_PAGE: readonly ContentKind[] = ['guide', 'reference'];

export function useToday(): readonly TodayItem[] {
  const { locale } = useLocale();
  const { completedLessons } = useSettings();
  const hijri = useHijriToday();
  const { stages, next } = useJourney();
  // Deeper than the Learn tab asks for, because only one of these is shown and
  // most of the head of the list is already spoken for — done, on the Continue
  // card, or a kind that opens a list.
  const recommended = useRecommendations(10);

  return useMemo(() => {
    const items: TodayItem[] = [];
    // The Continue card already offers this one. Showing it again under a
    // different heading is the repetition that makes a home screen feel like
    // filler.
    const used = new Set<string>(next ? [next.key] : []);
    const finished = new Set(completedLessons);

    const push = (item: TodayItem) => {
      if (used.has(item.key)) return;
      used.add(item.key);
      items.push(item);
    };

    const season = hijri ? seasonFor(hijri) : undefined;
    if (season) {
      const found = resolveRef(season.ref);
      if (found) {
        const entry = localiseCatalogEntry(found, locale);
        push({
          key: `${entry.kind}:${entry.id}`,
          reason: 'season',
          season: season.id,
          title: entry.title,
          description: entry.shortDescription,
          minutes: entry.meta?.estimatedMinutes,
          href: routeFor(found),
        });
      }
    }

    // The next unfinished thing about praying, wherever it sits in the journey.
    // Derived from the journey rather than from a list of its own, so the order
    // someone learns wudu, then what to have ready, then the prayer itself,
    // lives in exactly one place.
    //
    // `OWN_PAGE` matters here as much as it does on the suggestion below, and
    // was missing: the first unfinished step in `salah` is the five-pillars
    // lesson, which is a `pillar` and routes to `/pillars`. So a row headed
    // "Prayer", summarised "Five prayers a day, at set times, facing the
    // Kaʿbah in Mecca", opened a list of five cards instead of a prayer.
    const prayerStep: ResolvedStep | undefined = stages
      .flatMap((stage) => stage.steps)
      .find(
        (step) =>
          !step.done &&
          step.entry.meta !== undefined &&
          PRAYER_CATEGORIES.includes(step.entry.meta.category) &&
          OWN_PAGE.includes(step.entry.kind),
      );

    if (prayerStep) {
      push({
        key: prayerStep.key,
        reason: 'prayer',
        title: prayerStep.entry.title,
        description: prayerStep.entry.shortDescription,
        minutes: prayerStep.entry.meta?.estimatedMinutes,
        href: routeFor(prayerStep.entry),
      });
    }

    // Whatever onboarding pointed this reader at, minus anything already shown
    // and anything they have marked done — the recommendation tables answer
    // "what suits this person", not "what have they finished", so without that
    // second filter the row offers a beginner the wudu lesson they ticked off
    // last week. Empty for someone who skipped, and the section gets shorter.
    //
    // One, not three. Two rows both labelled "Suggested" is the repetition that
    // makes a home screen read as filler — and the second-best guess at what
    // someone wants has never been worth the space it takes.
    //
    // Deliberately not applied to the seasonal row above: Ramadan is happening
    // whether or not the lesson about it has been read.
    //
    // Only kinds that open a page of their own. A pillar or an article opens
    // the list it lives in, so a row promising "Prayer" would land the reader
    // on five cards and leave them to find it — fine in a browsable list, not
    // in the one suggestion this screen gets to make.
    const suggestion = recommended.find((entry) => {
      const key = `${entry.kind}:${entry.id}`;
      return (
        OWN_PAGE.includes(entry.kind) && !used.has(key) && !finished.has(key)
      );
    });
    if (suggestion) {
      push({
        key: `${suggestion.kind}:${suggestion.id}`,
        reason: 'suggested',
        title: suggestion.title,
        description: suggestion.shortDescription,
        minutes: suggestion.meta?.estimatedMinutes,
        href: routeFor(suggestion),
      });
    }

    return items;
  }, [hijri, stages, next, recommended, completedLessons, locale]);
}
