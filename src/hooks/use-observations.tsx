import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

import {
  EMPTY,
  read,
  recordFinished,
  recordMiss,
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
};

const ObservationsContext = createContext<ObservationsValue | null>(null);

export function ObservationsProvider({ children }: { children: ReactNode }) {
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
      const next = stored.installedAt ? stored : { ...stored, installedAt: Date.now() };
      setValue(next);
      setLoaded(true);
      if (!stored.installedAt) void write(next);
    });
    return () => {
      alive = false;
    };
  }, []);

  const update = useCallback((change: (current: Observations) => Observations) => {
    setValue((current) => {
      const next = change(current);
      if (next === current) return current;
      void write(next);
      return next;
    });
  }, []);

  const finish = useCallback(
    (key: string) => update((current) => recordFinished(current, key, Date.now())),
    [update],
  );
  const sittingDone = useCallback(
    (id: string) => update((current) => recordSitting(current, id, Date.now())),
    [update],
  );
  const surahDone = useCallback(
    (number: number) => update((current) => recordSurah(current, number, Date.now())),
    [update],
  );
  const searchMissed = useCallback(
    (query: string) => update((current) => recordMiss(current, query, Date.now())),
    [update],
  );

  const api = useMemo<ObservationsValue>(
    () => ({ ...value, loaded, finish, sittingDone, surahDone, searchMissed }),
    [value, loaded, finish, sittingDone, surahDone, searchMissed],
  );

  return <ObservationsContext value={api}>{children}</ObservationsContext>;
}

export function useObservations(): ObservationsValue {
  const value = use(ObservationsContext);
  if (!value) throw new Error('useObservations used outside ObservationsProvider');
  return value;
}
