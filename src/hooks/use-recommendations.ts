import { useMemo } from 'react';

import { recommendationsFor, type CatalogEntry } from '@/content';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { localiseCatalogEntry } from '@/i18n/localise';

/**
 * What to put in front of this reader, resolved to content that exists.
 *
 * Empty for anyone who skipped onboarding or arrived from an install that
 * predates it, because both leave `userStage` and `initialInterest` null and
 * the caller should show its normal screen rather than a personalised one that
 * is not personalised to anything.
 *
 * Anyone who answered — including "I'm not sure", which selects the universal
 * beginner path — gets a list.
 */
export function useRecommendations(limit = 5): readonly CatalogEntry[] {
  const { onboardingCompleted, userStage, initialInterest } = useSettings();
  const { locale } = useLocale();

  return useMemo(
    () =>
      onboardingCompleted
        ? recommendationsFor(userStage, initialInterest, limit).map((entry) =>
            localiseCatalogEntry(entry, locale),
          )
        : [],
    [onboardingCompleted, userStage, initialInterest, limit, locale],
  );
}
