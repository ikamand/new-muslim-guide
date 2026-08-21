import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * Which surahs somebody has learned.
 *
 * Its own store rather than a field on `display-settings`, for one reason: it
 * is the only thing in the app a person *earns*, and losing it to a bad merge
 * with a toggle nobody thinks about would be a different order of loss from
 * losing a preference.
 *
 * ## What this deliberately does not do
 *
 * No streak. No daily target. No date stamps, so nothing can later compute
 * "you have not practised in nine days" and say it out loud. Somebody three
 * weeks into Islam does not need an app that is disappointed in them, and the
 * fastest way to make memorising feel like homework is to score it.
 *
 * It only ever goes up unless a person deliberately un-marks a surah, which
 * they can, because the honest reason to do that is "I have forgotten it" and
 * that should cost nothing to say.
 */

const STORAGE_KEY = 'memorised-surahs';

type MemorisedContext = {
  isMemorised: (surah: number) => boolean;
  toggle: (surah: number) => void;
  count: number;
  /** False until the stored set has been read. */
  loaded: boolean;
};

const Context = createContext<MemorisedContext | null>(null);

export function MemorisedProvider({ children }: { children: ReactNode }) {
  const [surahs, setSurahs] = useState<readonly number[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;

    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (!active || !stored) return;
        const parsed: unknown = JSON.parse(stored);
        // Validated rather than trusted: this is parsed from disk, and a
        // corrupt entry should cost an empty list rather than a crash on a
        // screen somebody opened to practise.
        if (Array.isArray(parsed)) {
          setSurahs(parsed.filter((n): n is number => typeof n === 'number'));
        }
      })
      .catch(() => {
        // An empty list beats a crash. Nothing here is unrecoverable.
      })
      .finally(() => {
        if (active) setLoaded(true);
      });

    return () => {
      active = false;
    };
  }, []);

  const toggle = useCallback((surah: number) => {
    setSurahs((current) => {
      const next = current.includes(surah)
        ? current.filter((n) => n !== surah)
        : [...current, surah];
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next)).catch(() => {
        // A mark that does not survive a restart still beats a crash.
      });
      return next;
    });
  }, []);

  const value = useMemo<MemorisedContext>(
    () => ({
      isMemorised: (surah: number) => surahs.includes(surah),
      toggle,
      count: surahs.length,
      loaded,
    }),
    [surahs, toggle, loaded],
  );

  return <Context value={value}>{children}</Context>;
}

export function useMemorised(): MemorisedContext {
  const context = use(Context);
  if (!context) throw new Error('useMemorised must be used inside a MemorisedProvider');
  return context;
}
