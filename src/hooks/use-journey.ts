import { useMemo } from 'react';

import { resolveRef, type CatalogEntry } from '@/content';
import {
  orderedStages,
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
  /**
   * The lesson that follows `key` in the journey, for the end of a page.
   *
   * ## Why it is not `next`
   *
   * `next` is the first UNFINISHED step, so on the page somebody is about to
   * finish it is usually that page — and offering "next: the thing you are
   * looking at" is the carry-on card's old bug in a new place. This walks the
   * journey in order from the step AFTER this one and takes the first that is
   * not done, so the answer is right both before the mark lands and after.
   *
   * Undefined for the 24 reference articles that are not journey steps at all,
   * and for the last unfinished lesson. A page with no next says so by showing
   * nothing rather than by inventing a destination.
   */
  after: (key: string) => ResolvedStep | undefined;
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
 * The first unfinished step in the reader's OWN stage order — see
 * `orderedStages`, which is where onboarding's answer becomes a sequence.
 * There is no entry pointer and no skipping: the stages simply come in the
 * order this reader should meet them, so "next" is one rule with no special
 * case, and the arch strip's star always sits on the first unfinished arch.
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

    const stages = orderedStages(confidence).map(resolve);

    // Counted over distinct lessons: Al-Fatihah and Fajr each appear in two
    // stages, and counting them twice would make the total unreachable.
    // Built over the READER'S order, so `after` walks their path, not the
    // universal one.
    const seen = new Map<string, ResolvedStep>();
    for (const stage of stages) {
      for (const step of stage.steps) if (!seen.has(step.key)) seen.set(step.key, step);
    }
    const distinct = [...seen.values()];

    const nextStageIndex = stages.findIndex((stage) => stage.next);

    /*
      Ordered over the whole journey, with the duplicates collapsed to their
      first appearance — the same list `distinct` is built from, so "the lesson
      after this one" and "how many lessons there are" cannot disagree.
    */
    const after = (key: string): ResolvedStep | undefined => {
      const at = distinct.findIndex((step) => step.key === key);
      if (at === -1) return undefined;
      return distinct.slice(at + 1).find((step) => !step.done);
    };

    return {
      stages,
      done: distinct.filter((step) => step.done).length,
      total: distinct.length,
      next: nextStageIndex === -1 ? undefined : stages[nextStageIndex].next,
      nextStageIndex,
      fresh: distinct.every((step) => !step.done),
      after,
    };
  }, [completedLessons, confidence, locale]);
}
