import { useMemo } from 'react';

import { resolveRef, type CatalogEntry } from '@/content';
import type { ContentKind, ContentRef } from '@/content/model';
import { useLocale } from '@/hooks/use-locale';
import { useObservations } from '@/hooks/use-observations';
import { useSettings } from '@/hooks/use-settings';
import { localiseCatalogEntry } from '@/i18n/localise';

/**
 * The lesson somebody walked away from in the middle.
 *
 * The reading log in `lib/observations.ts` records where the scroll got to
 * when a lesson page unmounted unfinished; this narrows it to the one entry
 * worth offering back — the most recently abandoned, still unfinished,
 * still resolvable, and recent enough that "you were reading" is true rather
 * than an accusation. Today's carry-on slot is the one surface that offers
 * it back (Learn stopped on 4 Sep: its page shows the book's order, and a
 * second mark for "where you were" confused the one reader it was built
 * for); the unit screen's per-row bookmark reads the raw log instead.
 */

export type ReadingInProgress = {
  /** `kind:id`, the same key the journey and the mark use. */
  key: string;
  contentRef: ContentRef;
  entry: CatalogEntry;
  /** 0..1 of the page's scroll — where the screen got to, not comprehension. */
  furthest: number;
  at: number;
};

/**
 * After this long, a half-read page stops being "what I was doing" and goes
 * back to being a card on its shelf. Without a horizon, one abandoned
 * article would hold the carry-on slot forever and the journey could never
 * speak again.
 */
const RECENT_DAYS = 14;

const KINDS: readonly ContentKind[] = [
  'guide',
  'reference',
  'pillar',
  'article',
  'hisn',
  'phrase',
  'collection',
];

/** `reference:wudu` → a ContentRef, or nothing for a key from a future build. */
function parseKey(key: string): ContentRef | undefined {
  const split = key.indexOf(':');
  if (split === -1) return undefined;
  const kind = key.slice(0, split);
  const id = key.slice(split + 1);
  if (!id || !(KINDS as readonly string[]).includes(kind)) return undefined;
  return { kind: kind as ContentKind, id };
}

export function useReadingInProgress(): ReadingInProgress | undefined {
  const { reading } = useObservations();
  const { completedLessons } = useSettings();
  const { locale } = useLocale();

  return useMemo(() => {
    const horizon = Date.now() - RECENT_DAYS * 24 * 60 * 60 * 1000;
    const done = new Set(completedLessons);

    const candidates = Object.entries(reading)
      .filter(([key, entry]) => entry.at >= horizon && !done.has(key))
      .sort(([, a], [, b]) => b.at - a.at);

    for (const [key, record] of candidates) {
      const contentRef = parseKey(key);
      if (!contentRef) continue;
      const found = resolveRef(contentRef);
      if (!found) continue;
      return {
        key,
        contentRef,
        entry: localiseCatalogEntry(found, locale),
        furthest: record.furthest,
        at: record.at,
      };
    }
    return undefined;
  }, [reading, completedLessons, locale]);
}
