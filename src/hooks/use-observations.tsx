import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import { useSettings } from '@/hooks/use-settings';

import {
  awardObserved,
  EMPTY,
  forgetFirst,
  read,
  recordFinished,
  recordFirst,
  recordMiss,
  recordReading,
  recordSitting,
  recordSurah,
  write,
  type Observations,
} from '@/lib/observations';

/**
 * What the app has seen, for the screens that see it.
 *
 * A provider rather than a hook reading storage per screen, for the same
 * reason `use-settings.tsx` is one: several screens record at once, and two
 * copies of a log both writing to one key is how entries disappear.
 *
 * ## Recording never blocks anything
 *
 * Every recorder updates state and fires the write without awaiting it.
 * Somebody who finishes a lesson and immediately backgrounds the app has their
 * observation land or not land, and neither outcome may ever delay the screen
 * they are on. `observations.ts` treats a missing or half-written record as
 * "nothing observed", so a lost write costs a line in a log and nothing else.
 */
type ObservationsValue = Observations & {
  /** True once storage has been read. Screens should not record before it. */
  loaded: boolean;
  finish: (key: string) => void;
  sittingDone: (id: string) => void;
  surahDone: (number: number) => void;
  searchMissed: (query: string) => void;
  /** Mark a first, or unmark one somebody tapped by mistake. */
  markFirst: (id: string) => void;
  forget: (id: string) => void;
  /** Somebody left a lesson partway through — see `recordReading`. */
  leftReading: (key: string, furthest: number) => void;
};

const ObservationsContext = createContext<ObservationsValue | null>(null);

export function ObservationsProvider({ children }: { children: ReactNode }) {
  const { completedLessons } = useSettings();
  const [value, setValue] = useState<Observations>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    void read().then((stored) => {
      if (!alive) return;
      /*
        The install date is set on the first read that finds none, not by an
        onboarding step. Someone who skips onboarding has still installed the
        app, and a "days since install" that only counts people who answered
        questions would be wrong for exactly the readers most likely to skip.
      */
      const now = Date.now();
      const dated = stored.installedAt ? stored : { ...stored, installedAt: now };
      /*
        Awarded once here as well as on every write, so somebody who used this
        app before Phase 5 existed does not have to finish another lesson
        before their ledger admits what they have already done.
      */
      const next = awardObserved(dated, completedLessons, now);
      setValue(next);
      setLoaded(true);
      if (next !== stored) void write(next);
    });
    return () => {
      alive = false;
    };
  }, [completedLessons]);

  const update = useCallback((change: (current: Observations) => Observations) => {
    setValue((current) => {
      const next = change(current);
      if (next === current) return current;
      void write(next);
      return next;
    });
  }, []);

  /*
    Every recorder awards as it writes.

    A first that marks itself has to be decided the moment the thing happens,
    not derived on render — see `awardObserved`. Composing it here rather than
    inside each recorder keeps `observations.ts` pure and means a new recorder
    cannot forget to do it: the wrapper is the only way to write.
  */
  const record = useCallback(
    (change: (current: Observations, at: number) => Observations) => {
      const at = Date.now();
      update((current) => awardObserved(change(current, at), completedLessons, at));
    },
    [update, completedLessons],
  );

  const finish = useCallback(
    (key: string) => record((current, at) => recordFinished(current, key, at)),
    [record],
  );
  const sittingDone = useCallback(
    (id: string) => record((current, at) => recordSitting(current, id, at)),
    [record],
  );
  const surahDone = useCallback(
    (number: number) => record((current, at) => recordSurah(current, number, at)),
    [record],
  );
  const searchMissed = useCallback(
    (query: string) => update((current) => recordMiss(current, query, Date.now())),
    [update],
  );

  const markFirst = useCallback(
    (id: string) => update((current) => recordFirst(current, id, Date.now())),
    [update],
  );
  const forget = useCallback((id: string) => update((current) => forgetFirst(current, id)), [update]);
  const leftReading = useCallback(
    (key: string, furthest: number) =>
      update((current) => recordReading(current, key, furthest, Date.now())),
    [update],
  );

  const api = useMemo<ObservationsValue>(
    () => ({ ...value, loaded, finish, sittingDone, surahDone, searchMissed, markFirst, forget, leftReading }),
    [value, loaded, finish, sittingDone, surahDone, searchMissed, markFirst, forget, leftReading],
  );

  return <ObservationsContext value={api}>{children}</ObservationsContext>;
}

export function useObservations(): ObservationsValue {
  const value = use(ObservationsContext);
  if (!value) throw new Error('useObservations used outside ObservationsProvider');
  return value;
}
