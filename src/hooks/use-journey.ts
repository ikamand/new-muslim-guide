import { useMemo } from 'react';

import { resolveRef, type CatalogEntry } from '@/content';
import { JOURNEY, stepKey, type JourneyStep, type Stage, type StageId } from '@/content/journey';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { localiseCatalogEntry } from '@/i18n/localise';

export type ResolvedStep = JourneyStep & {
  entry: CatalogEntry;
  key: string;
  done: boolean;
};

export type ResolvedStage = {
  id: StageId;
  steps: readonly ResolvedStep[];
  done: number;
  total: number;
  /** The first unfinished step — what the stage card offers to open. */
  next: ResolvedStep | undefined;
};

/**
 * The journey with progress applied.
 *
 * Steps whose content does not resolve are dropped rather than shown as broken,
 * so the totals a reader sees always match the lessons they can actually open.
 * `content:audit` is where an unresolved step surfaces.
 */
export function useJourney(): {
  stages: readonly ResolvedStage[];
  done: number;
  total: number;
  /** The next thing to do anywhere in the journey, earliest stage first. */
  next: ResolvedStep | undefined;
} {
  const { completedLessons } = useSettings();
  const { locale } = useLocale();

  return useMemo(() => {
    const done = new Set(completedLessons);

    const resolve = (stage: Stage): ResolvedStage => {
      const steps = stage.steps
        .map((step) => {
          const found = resolveRef(step.ref);
          if (!found) return undefined;
          const entry = localiseCatalogEntry(found, locale);
          const key = stepKey(step.ref);
          return { ...step, entry, key, done: done.has(key) } satisfies ResolvedStep;
        })
        .filter((step): step is ResolvedStep => step !== undefined);

      return {
        id: stage.id,
        steps,
        done: steps.filter((step) => step.done).length,
        total: steps.length,
        next: steps.find((step) => !step.done),
      };
    };

    const stages = JOURNEY.map(resolve);

    // Counted over distinct lessons: Al-Fatihah and Fajr each appear in two
    // stages, and counting them twice would make the total unreachable.
    const seen = new Map<string, ResolvedStep>();
    for (const stage of stages) {
      for (const step of stage.steps) if (!seen.has(step.key)) seen.set(step.key, step);
    }
    const distinct = [...seen.values()];

    return {
      stages,
      done: distinct.filter((step) => step.done).length,
      total: distinct.length,
      next: stages.flatMap((stage) => stage.steps).find((step) => !step.done),
    };
  }, [completedLessons, locale]);
}
