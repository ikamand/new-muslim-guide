import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, use, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';

/**
 * What the user has chosen to change about how the app behaves.
 *
 * There is no `arabic` flag on purpose. The Arabic is the thing you actually
 * say — hiding it would leave the app teaching someone to pray in English,
 * which is the one thing it must not do. Transliteration and translation are
 * scaffolding, and scaffolding comes down as you learn.
 *
 * `keepAwake` defaults on: the person it matters most to — mid-prayer, both
 * hands busy, screen going dark — is the least likely to have gone looking for
 * a setting. It is here to be turned off by someone who leaves the app open on
 * a table, not to be found by someone who needs it.
 */
export type Settings = {
  transliteration: boolean;
  translation: boolean;
  keepAwake: boolean;
};

const DEFAULTS: Settings = {
  transliteration: true,
  translation: true,
  keepAwake: true,
};

/** Unchanged from when this held only display settings, so nobody's choices reset. */
const STORAGE_KEY = 'display-settings';

/**
 * Narrow field by field rather than trusting the parse, so a value written by
 * an older shape of this type can't put a non-boolean into state.
 */
function parseStored(raw: string | null): Settings {
  if (!raw) return DEFAULTS;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return DEFAULTS;
    const stored = parsed as Partial<Record<keyof Settings, unknown>>;
    return {
      transliteration:
        typeof stored.transliteration === 'boolean'
          ? stored.transliteration
          : DEFAULTS.transliteration,
      translation:
        typeof stored.translation === 'boolean' ? stored.translation : DEFAULTS.translation,
      keepAwake:
        typeof stored.keepAwake === 'boolean' ? stored.keepAwake : DEFAULTS.keepAwake,
    };
  } catch {
    return DEFAULTS;
  }
}

type SettingsContext = Settings & {
  toggle: (key: keyof Settings) => void;
  /** False until the stored value has been read — the splash waits on this. */
  loaded: boolean;
};

const Context = createContext<SettingsContext | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (active) setSettings(parseStored(raw));
      })
      .catch(() => {
        // A read failure just means the defaults stand.
      })
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const toggle = useCallback((key: keyof Settings) => {
    setSettings((current) => {
      const next = { ...current, [key]: !current[key] };
      // Fire and forget: the UI already reflects `next`, and a failed write
      // costs the user one preference, not correctness.
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(() => ({ ...settings, toggle, loaded }), [settings, toggle, loaded]);

  return <Context value={value}>{children}</Context>;
}

export function useSettings(): SettingsContext {
  const value = use(Context);
  if (!value) {
    throw new Error('useSettings must be used inside a SettingsProvider');
  }
  return value;
}
