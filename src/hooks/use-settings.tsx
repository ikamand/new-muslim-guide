import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  isInitialInterest,
  isUserStage,
  type InitialInterest,
  type UserStage,
} from '@/lib/onboarding';
import { DEFAULT_REMINDERS, LEAD_CHOICES, type ReminderSettings } from '@/lib/reminders';
import { PRAYER_IDS } from '@/lib/prayer-times';
import { DEFAULT_RECITER, isReciterId, type ReciterId } from '@/content/quran/recitation';
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
  /**
   * The gate the root layout reads: false sends someone to `/welcome`.
   *
   * Set by both finishing and skipping, and kept under its original name so an
   * install from before onboarding was rebuilt is not asked again. The two
   * flags below record *how* it became true, which is what personalisation
   * needs to know and what a single boolean could never say.
   */
  onboarded: boolean;
  /** They answered the questions. */
  onboardingCompleted: boolean;
  /** They chose to skip. Not a lesser state — the app works the same either way. */
  onboardingSkipped: boolean;
  /** Where they said they are. Null when skipped, or from an older install. */
  userStage: UserStage | null;
  /** What they said they wanted help with first. */
  initialInterest: InitialInterest | null;
  /**
   * Lessons marked done, as `kind:id`.
   *
   * A record of where someone has been, not a gate on where they can go — the
   * journey never locks a step. Kept as a plain list rather than a count so a
   * lesson added later cannot retroactively change what someone has finished.
   */
  completedLessons: readonly string[];
  /** Which prayers to be reminded of, and how long before. All off by default. */
  reminders: ReminderSettings;
  /**
   * Whose recitation plays in the Qur'an tab.
   *
   * One setting rather than one per screen, because a reader who has found a
   * voice they can follow wants it for the whole surah and for the single ayah
   * they are drilling — those are the same preference, not two.
   *
   * It defaults to the teaching recording and is changed from the surah screen
   * itself, where the audio is, rather than only from Settings. A preference
   * nobody can find is a preference nobody has.
   */
  reciter: ReciterId;
  /**
   * Duʿas the reader has pinned to the top of the Duʿa tab, by id.
   *
   * A shortcut, not a record of progress and not a favourites list. What it
   * buys is that the two or three duʿas someone is working on sit above a book
   * of 132 instead of inside it. Nothing reads it as "learned" — the app
   * cannot know that, and asking would be handing someone a decision they did
   * not come for.
   *
   * Ordered as pinned, capped at `MAX_PINNED`. Ten is Iyad's number: enough
   * that nobody has to unpin to pin, few enough that the list stays a
   * shortcut.
   */
  pinnedDuas: readonly string[];
};

/** See `pinnedDuas`. */
export const MAX_PINNED = 10;

const DEFAULTS: Settings = {
  transliteration: true,
  translation: true,
  keepAwake: true,
  audience: null,
  onboarded: false,
  onboardingCompleted: false,
  onboardingSkipped: false,
  userStage: null,
  initialInterest: null,
  completedLessons: [],
  reminders: DEFAULT_REMINDERS,
  reciter: DEFAULT_RECITER,
  pinnedDuas: [],
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
      onboardingCompleted:
        typeof stored.onboardingCompleted === 'boolean'
          ? stored.onboardingCompleted
          : DEFAULTS.onboardingCompleted,
      onboardingSkipped:
        typeof stored.onboardingSkipped === 'boolean'
          ? stored.onboardingSkipped
          : DEFAULTS.onboardingSkipped,
      // A stage written by a future build, or corrupted, reads as unanswered
      // rather than throwing — an unrecognised value should cost someone their
      // recommendations, not their app.
      userStage: isUserStage(stored.userStage) ? stored.userStage : null,
      initialInterest: isInitialInterest(stored.initialInterest)
        ? stored.initialInterest
        : null,
      // Filtered rather than trusted: a malformed entry would otherwise mark a
      // lesson complete that does not exist, and the total would never add up.
      completedLessons: Array.isArray(stored.completedLessons)
        ? stored.completedLessons.filter(
            (entry): entry is string => typeof entry === 'string' && entry.includes(':'),
          )
        : [],
      reminders: parseReminders(stored.reminders),
      // A voice dropped from a later build reads as the default rather than
      // throwing, and rather than leaving a folder name that no longer resolves.
      reciter: isReciterId(stored.reciter) ? stored.reciter : DEFAULTS.reciter,
      // Filtered and re-capped on read, not just on write: a list written by a
      // build with a higher cap, or hand-edited storage, would otherwise walk
      // straight past MAX_PINNED and make the tab something nobody designed.
      pinnedDuas: Array.isArray(stored.pinnedDuas)
        ? stored.pinnedDuas
            .filter((entry): entry is string => typeof entry === 'string')
            .slice(0, MAX_PINNED)
        : [],
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
  /** Several settings at once, in one write. */
  setMany: (values: Partial<Settings>) => void;
  /** Marks a lesson done, or undoes it. Reversible on purpose. */
  toggleLesson: (key: string) => void;
  /** Pins a duʿa to the top of the Duʿa tab, or unpins it. */
  togglePinned: (id: string) => void;
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

  /**
   * Onboarding finishes with four values that have to land together. Four
   * `set` calls would each be computed from state captured before the others
   * applied, and the app would gate on whichever wrote last.
   */
  /**
   * Completion is reversible. Someone who taps it by mistake, or who wants to
   * go back through a lesson properly, should not be stuck with a tick they
   * cannot remove — and nothing in the app treats a lesson as done-forever.
   */
  const toggleLesson = useCallback((key: string) => {
    setSettings((current) => {
      const done = new Set(current.completedLessons);
      if (done.has(key)) done.delete(key);
      else done.add(key);
      const next = { ...current, completedLessons: [...done] };
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  /**
   * Pinning is append-at-the-end and silently ignores the eleventh.
   *
   * Dropping the oldest instead would remove something the reader chose,
   * without saying so, from a screen they are not looking at. Refusing is
   * ruder and more honest; the screen disables the control at the cap and says
   * why, rather than letting this decide.
   */
  const togglePinned = useCallback((id: string) => {
    setSettings((current) => {
      const pinned = current.pinnedDuas;
      const next = {
        ...current,
        pinnedDuas: pinned.includes(id)
          ? pinned.filter((entry) => entry !== id)
          : pinned.length >= MAX_PINNED
            ? pinned
            : [...pinned, id],
      };
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setMany = useCallback((values: Partial<Settings>) => {
    setSettings((current) => {
      const next = { ...current, ...values };
      void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ ...settings, toggle, set, setMany, toggleLesson, togglePinned, loaded }),
    [settings, toggle, set, setMany, toggleLesson, togglePinned, loaded],
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
