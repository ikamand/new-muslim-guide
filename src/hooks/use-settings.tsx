import AsyncStorage from '@react-native-async-storage/async-storage';

import { DEFAULT_REMINDERS, LEAD_CHOICES, type ReminderSettings } from '@/lib/reminders';
import { PRAYER_IDS } from '@/lib/prayer-times';
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
/**
 * Which set of rulings applies to the reader.
 *
 * Not a profile field and not demographics. Some instruction genuinely differs
 * — what must be covered in prayer, whether Friday prayer is obligatory, and
 * what changes during a period — and the app cannot infer it. `null` means
 * unanswered, and unanswered shows everything rather than guessing.
 */
export type Audience = 'man' | 'woman' | null;

export type Settings = {
  transliteration: boolean;
  translation: boolean;
  keepAwake: boolean;
  audience: Audience;
  /** False until the first-run questions have been seen. */
  onboarded: boolean;
  /** Which prayers to be reminded of, and how long before. All off by default. */
  reminders: ReminderSettings;
};

const DEFAULTS: Settings = {
  transliteration: true,
  translation: true,
  keepAwake: true,
  audience: null,
  onboarded: false,
  reminders: DEFAULT_REMINDERS,
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
      audience:
        stored.audience === 'man' || stored.audience === 'woman' ? stored.audience : null,
      onboarded:
        typeof stored.onboarded === 'boolean' ? stored.onboarded : DEFAULTS.onboarded,
      reminders: parseReminders(stored.reminders),
    };
  } catch {
    return DEFAULTS;
  }
}

/**
 * Narrowed field by field like everything else here, because this one is nested
 * and a half-written object would otherwise schedule notifications for prayers
 * nobody asked about.
 */
function parseReminders(raw: unknown): ReminderSettings {
  if (typeof raw !== 'object' || raw === null) return DEFAULT_REMINDERS;
  const stored = raw as { prayers?: unknown; leadMinutes?: unknown };

  const prayers = { ...DEFAULT_REMINDERS.prayers };
  if (typeof stored.prayers === 'object' && stored.prayers !== null) {
    const flags = stored.prayers as Record<string, unknown>;
    for (const id of PRAYER_IDS) {
      if (typeof flags[id] === 'boolean') prayers[id] = flags[id];
    }
  }

  const lead = stored.leadMinutes;
  const leadMinutes =
    typeof lead === 'number' && (LEAD_CHOICES as readonly number[]).includes(lead)
      ? lead
      : DEFAULT_REMINDERS.leadMinutes;

  return { prayers, leadMinutes };
}

type SettingsContext = Settings & {
  toggle: (key: 'transliteration' | 'translation' | 'keepAwake') => void;
  /** For the settings that are not switches. */
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
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

  const toggle = useCallback((key: 'transliteration' | 'translation' | 'keepAwake') => {
    setSettings((current) => {
      const next = { ...current, [key]: !current[key] };
      // Fire and forget: the UI already reflects `next`, and a failed write
      // costs the user one preference, not correctness.
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const set = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((current) => {
      const next = { ...current, [key]: value };
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ ...settings, toggle, set, loaded }),
    [settings, toggle, set, loaded],
  );

  return <Context value={value}>{children}</Context>;
}

export function useSettings(): SettingsContext {
  const value = use(Context);
  if (!value) {
    throw new Error('useSettings must be used inside a SettingsProvider');
  }
  return value;
}
