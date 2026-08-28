import { useMemo } from 'react';

import { resolveRef, type CatalogEntry } from '@/content';
import {
  entryStageIndex,
  JOURNEY,
  stepKey,
  type JourneyStep,
  type Stage,
  type StageId,
} from '@/content/journey';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { usePrayerConfidence } from '@/hooks/use-competence';
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

export type JourneyState = {
  stages: readonly ResolvedStage[];
  done: number;
  total: number;
  /** The next thing to do. See the note on ordering below. */
  next: ResolvedStep | undefined;
  /** Which stage `next` sits in, 0-based. -1 once everything is done. */
  nextStageIndex: number;
  /** Nothing has been marked done yet — the journey has not been started. */
  fresh: boolean;
};

/**
 * The journey with progress applied.
 *
 * Steps whose content does not resolve are dropped rather than shown as broken,
 * so the totals a reader sees always match the lessons they can actually open.
 * `content:audit` is where an unresolved step surfaces.
 *
 * ## What "next" means
 *
 * The first unfinished step at or after the reader's entry stage, and only then
 * the first unfinished step anywhere. Onboarding decides the entry stage — see
 * `entryStageIndex` — so someone who said they wanted help with prayer is
 * offered the stage that gets them praying tonight rather than being marched
 * back to "What is Islam?" every time they open the app.
 *
 * The earlier stages are not skipped, hidden or marked done. Once the reader
 * finishes everything from their entry stage on, `next` falls back to whatever
 * they passed over, and the count has always been over the whole journey.
 *
 * Home and the journey screen both read this, so the two cannot offer different
 * "continue" lessons — which they would the moment either kept its own rule.
 */
export function useJourney(): JourneyState {
  const { completedLessons } = useSettings();
  const confidence = usePrayerConfidence();
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

    const entry = entryStageIndex(confidence);
    const fromEntry = stages.findIndex((stage, index) => index >= entry && stage.next);
    const anywhere = stages.findIndex((stage) => stage.next);
    const nextStageIndex = fromEntry === -1 ? anywhere : fromEntry;

    return {
      stages,
      done: distinct.filter((step) => step.done).length,
      total: distinct.length,
      next: nextStageIndex === -1 ? undefined : stages[nextStageIndex].next,
      nextStageIndex,
      fresh: distinct.every((step) => !step.done),
    };
  }, [completedLessons, confidence, locale]);
}
