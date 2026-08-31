import { useMemo } from 'react';

import { resolveRef, type CatalogEntry } from '@/content';
import {
  CURRICULUM,
  isLessonDone,
  openTierIndex,
  stepKey,
  type JourneyStep,
  type TierId,
  type Unit,
} from '@/content/curriculum';
import { localiseCatalogEntry } from '@/i18n/localise';
import { usePrayerConfidence } from '@/hooks/use-competence';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';

export type ResolvedLesson = JourneyStep & {
  entry: CatalogEntry;
  key: string;
  done: boolean;
};

export type ResolvedUnit = {
  id: string;
  lessons: readonly ResolvedLesson[];
  /** Where the unit opens out rather than finishes. Never counted as progress. */
  doors: readonly CatalogEntry[];
  done: number;
  total: number;
  next: ResolvedLesson | undefined;
};

export type ResolvedTier = {
  id: TierId;
  units: readonly ResolvedUnit[];
  done: number;
  total: number;
};

export type CurriculumState = {
  tiers: readonly ResolvedTier[];
  /**
   * Where confidence says to start — 0-based into `tiers`. All confidence
   * decides now: a starting point, never an order and never a gate.
   */
  openTierIndex: number;
  /**
   * The next thing to do: the first unfinished lesson scanning from the open
   * tier forward, wrapping to the earlier tiers only once everything from
   * there on is done. Undefined when every lesson everywhere is done.
   */
  next: ResolvedLesson | undefined;
  /** Which tier and unit `next` sits in. -1 when there is no next. */
  nextTierIndex: number;
  nextUnitIndex: number;
  done: number;
  total: number;
  /**
   * The lesson after `key` in the universal order, for the end of a page.
   * Walks forward from the lesson AFTER this one and takes the first not
   * done, so the answer is right both before its mark lands and after.
   * Undefined for pages that are not lessons, and past the last one.
   */
  after: (key: string) => ResolvedLesson | undefined;
};

/**
 * The curriculum with progress applied — the one source every surface reads.
 *
 * Today's carry-on, the Learn tab and the unit screens all take `next` from
 * here, so two surfaces can never offer different "continue" lessons — the
 * exact disagreement the journey allowed when the shahada card and the
 * journey read different fields for the same fact. Done-ness comes from the
 * shared predicate in `curriculum.ts`, shahada answer included.
 *
 * Lessons whose content does not resolve are dropped rather than shown
 * broken — that is what lets a commissioned page hold its place in a unit —
 * and `content:audit` is where an unresolved lesson surfaces.
 */
export function useCurriculum(): CurriculumState {
  const { completedLessons } = useSettings();
  const confidence = usePrayerConfidence();
  const { locale } = useLocale();

  return useMemo(() => {
    const resolveUnit = (unit: Unit): ResolvedUnit => {
      const lessons = unit.lessons
        .map((lesson) => {
          const found = resolveRef(lesson.ref);
          if (!found) return undefined;
          const entry = localiseCatalogEntry(found, locale);
          const key = stepKey(lesson.ref);
          return {
            ...lesson,
            entry,
            key,
            done: isLessonDone(key, completedLessons),
          } satisfies ResolvedLesson;
        })
        .filter((lesson): lesson is ResolvedLesson => lesson !== undefined);

      const doors = (unit.doors ?? [])
        .map((door) => {
          const found = resolveRef(door);
          return found ? localiseCatalogEntry(found, locale) : undefined;
        })
        .filter((door): door is CatalogEntry => door !== undefined);

      return {
        id: unit.id,
        lessons,
        doors,
        done: lessons.filter((lesson) => lesson.done).length,
        total: lessons.length,
        next: lessons.find((lesson) => !lesson.done),
      };
    };

    const tiers = CURRICULUM.map((tier) => {
      const units = tier.units.map(resolveUnit);
      return {
        id: tier.id,
        units,
        done: units.reduce((n, unit) => n + unit.done, 0),
        total: units.reduce((n, unit) => n + unit.total, 0),
      } satisfies ResolvedTier;
    });

    const open = openTierIndex(confidence);

    /*
      Scan from the open tier forward, then wrap to the start. The wrap is
      what keeps an on-my-own reader's unread tier-one lessons reachable
      without being pushed: they come back as "next" only once everything
      from tier two onward is done.
    */
    let next: ResolvedLesson | undefined;
    let nextTierIndex = -1;
    let nextUnitIndex = -1;
    const order = [...tiers.keys()].map((i) => (i + open) % tiers.length);
    for (const tierIndex of order) {
      const unitIndex = tiers[tierIndex].units.findIndex((unit) => unit.next);
      if (unitIndex !== -1) {
        next = tiers[tierIndex].units[unitIndex].next;
        nextTierIndex = tierIndex;
        nextUnitIndex = unitIndex;
        break;
      }
    }

    // The universal order, flat — the audit guarantees no lesson is claimed
    // twice, so no dedup is needed.
    const flat = tiers.flatMap((tier) => tier.units.flatMap((unit) => unit.lessons));

    const after = (key: string): ResolvedLesson | undefined => {
      const at = flat.findIndex((lesson) => lesson.key === key);
      if (at === -1) return undefined;
      return flat.slice(at + 1).find((lesson) => !lesson.done);
    };

    return {
      tiers,
      openTierIndex: open,
      next,
      nextTierIndex,
      nextUnitIndex,
      done: flat.filter((lesson) => lesson.done).length,
      total: flat.length,
      after,
    };
  }, [completedLessons, confidence, locale]);
}
