import type { Href } from 'expo-router';
import { useMemo } from 'react';

import { resolveRef } from '@/content';
import { seasonFor, type SeasonId } from '@/content/seasons';
import { useHijriToday } from '@/hooks/use-hijri';
import { useJourney } from '@/hooks/use-journey';
import { useLocale } from '@/hooks/use-locale';
import { localiseCatalogEntry } from '@/i18n/localise';
import { routeFor } from '@/lib/content-routes';

/**
 * The one thing today is, that tomorrow is not.
 *
 * This used to return up to three rows: a seasonal one, the next unfinished
 * prayer lesson, and a recommendation. Two of those three were Learn's job
 * wearing a different heading — they resolved from the same tables the Learn
 * tab renders, so the app said everything twice and Today grew into a
 * dashboard.
 *
 * The test that survived is the one that separates the two tabs: **does it
 * have a deadline?** A prayer time does. Ramadan does — it is happening now
 * and will not be next month. "You might like this lesson" does not, and never
 * did.
 *
 * So a season is all that is left, and most of the year this returns nothing
 * at all. That is the correct amount for a screen whose job is answering what
 * to do in the next ten minutes.
 */

export type TodayItem = {
  key: string;
  /** The window this belongs to — the screen turns it into a heading. */
  season: SeasonId;
  title: string;
  description: string;
  minutes?: number;
  href: Href;
};

export function useToday(): readonly TodayItem[] {
  const { locale } = useLocale();
  const hijri = useHijriToday();
  const { next } = useJourney();

  return useMemo(() => {
    const season = hijri ? seasonFor(hijri) : undefined;
    if (!season) return [];

    const found = resolveRef(season.ref);
    if (!found) return [];

    const entry = localiseCatalogEntry(found, locale);
    const key = `${entry.kind}:${entry.id}`;

    // The Continue card above already offers this one. Showing it again under
    // a different heading is the repetition that makes a home screen filler.
    if (next?.key === key) return [];

    return [
      {
        key,
        season: season.id,
        title: entry.title,
        description: entry.shortDescription,
        minutes: entry.meta?.estimatedMinutes,
        href: routeFor(found),
      },
    ];
  }, [hijri, next, locale]);
}
