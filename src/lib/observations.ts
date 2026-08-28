import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * What the app has seen this person do.
 *
 * ## ⚠️ This is a new promise, and it is not the old one
 *
 * "The app remembers what you CHOSE" is what `display-settings` has always
 * meant: a reciter, a language, which prayers to be reminded of. Everything in
 * it was typed or tapped on purpose.
 *
 * This is different. "The app remembers what you DID" is a promise about
 * watching rather than about storing, and it is worth making deliberately
 * rather than sliding into. What makes it safe is not that the data is small;
 * it is that **nothing leaves the device and nothing ever will**. There is no
 * server to send it to, no account it could be attached to, and no analytics
 * in this app. It exists so the app can stop asking questions it could answer
 * by looking — `CLAUDE.md`'s own rule, prefer what the app can infer over what
 * the user must configure.
 *
 * It also never becomes a judgement. `index.tsx` promises this app does not
 * count days, keep a streak, or notice an absence, and that promise binds this
 * file hardest of all: everything here records that something HAPPENED, and
 * nothing anywhere records that something did not.
 *
 * ## Why its own AsyncStorage key
 *
 * `display-settings` writes by serialising the whole settings object on every
 * change — see `toggleLesson`. Observations accumulate, and joining that key
 * would mean rewriting somebody's reminders, reciter and pinned duʿas every
 * time they finish reading a page. Four reasons, and the first is decisive:
 *
 * 1. **Write frequency.** Settings change a few times a year. Observations
 *    change several times a session, and each write would carry the whole of
 *    settings with it.
 * 2. **It grows.** Settings are a dozen bounded fields; this is a log, and a
 *    log needs pruning that settings must never get.
 * 3. **Different blast radius.** A corrupt observation log should cost
 *    somebody their history, not their choices.
 * 4. **Different lifecycle.** "Forget what I did" and "reset my settings" are
 *    two things a person might reasonably want separately.
 *
 * ## What is deliberately NOT here
 *
 * Where somebody has been. `home-place.ts` keeps ONE place and a timestamp,
 * not a history, and this file must not become the history that file refused
 * to be. No route, no visit log, no coordinates.
 */

const KEY = 'observations';

/**
 * How many failed searches to keep.
 *
 * A cap rather than a sweep by age: what Phase 8 needs from this is the
 * PHRASINGS people use, and a phrase somebody tried six months ago is as
 * useful as one from this morning. Oldest out when full.
 */
export const MAX_MISSES = 200;

export type Observations = {
  /** When the app was first opened. The only clock this file keeps. */
  installedAt: number;
  /**
   * `kind:id` → when it was finished, most recent wins.
   *
   * A map rather than a list, because the same lesson can be read twice and
   * the second reading is not a second lesson.
   */
  finished: Record<string, number>;
  /** Adhkār sitting ids → when that sitting was last completed. */
  sittings: Record<string, number>;
  /** Surah numbers played to the end, and when. */
  surahs: Record<string, number>;
  /**
   * Searches that returned nothing, most recent last.
   *
   * The highest-value untapped signal in the app: every one is a content gap
   * with a name on it, in the reader's own words. Phase 8 builds the alias
   * layer from real misses rather than imagined ones.
   *
   * ⚠️ Stored as typed, because the point is the exact phrasing. That makes it
   * the most personal thing in this file — somebody's 1am question in their own
   * words — which is another reason nothing here leaves the device.
   */
  misses: readonly { query: string; at: number }[];
};

export const EMPTY: Observations = {
  installedAt: 0,
  finished: {},
  sittings: {},
  surahs: {},
  misses: [],
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/** Numbers only, so a malformed entry cannot become a date in 1970 or NaN. */
function times(value: unknown): Record<string, number> {
  if (!isRecord(value)) return {};
  const out: Record<string, number> = {};
  for (const [key, at] of Object.entries(value)) {
    if (typeof at === 'number' && Number.isFinite(at)) out[key] = at;
  }
  return out;
}

/**
 * Narrowed field by field rather than trusted, exactly as `use-settings.tsx`
 * does and for the same reason: a value written by a future build, or a
 * half-finished write, must degrade to "nothing observed" rather than throw.
 * Nothing here is important enough to break an app somebody opened to pray.
 */
export function parse(raw: string | null): Observations {
  if (!raw) return EMPTY;
  let stored: unknown;
  try {
    stored = JSON.parse(raw);
  } catch {
    return EMPTY;
  }
  if (!isRecord(stored)) return EMPTY;

  return {
    installedAt:
      typeof stored.installedAt === 'number' && Number.isFinite(stored.installedAt)
        ? stored.installedAt
        : 0,
    finished: times(stored.finished),
    sittings: times(stored.sittings),
    surahs: times(stored.surahs),
    misses: Array.isArray(stored.misses)
      ? stored.misses
          .filter(
            (entry): entry is { query: string; at: number } =>
              isRecord(entry) &&
              typeof entry.query === 'string' &&
              typeof entry.at === 'number' &&
              Number.isFinite(entry.at),
          )
          .slice(-MAX_MISSES)
      : [],
  };
}

export async function read(): Promise<Observations> {
  return parse(await AsyncStorage.getItem(KEY));
}

export async function write(value: Observations): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(value));
}

/* ----------------------------- the recorders ----------------------------- */

/** Something was finished. Re-finishing updates the time rather than adding. */
export function recordFinished(value: Observations, key: string, at: number): Observations {
  return { ...value, finished: { ...value.finished, [key]: at } };
}

export function recordSitting(value: Observations, id: string, at: number): Observations {
  return { ...value, sittings: { ...value.sittings, [id]: at } };
}

export function recordSurah(value: Observations, number: number, at: number): Observations {
  return { ...value, surahs: { ...value.surahs, [String(number)]: at } };
}

/**
 * A search that found nothing.
 *
 * The same query twice is one gap, not two — somebody retyping a phrase that
 * did not work is not new information, and letting it repeat would fill the
 * cap with one person's frustration.
 */
export function recordMiss(value: Observations, query: string, at: number): Observations {
  const trimmed = query.trim();
  if (!trimmed) return value;
  const without = value.misses.filter((entry) => entry.query !== trimmed);
  return { ...value, misses: [...without, { query: trimmed, at }].slice(-MAX_MISSES) };
}

/** Whole days since the app was first opened, or undefined if unknown. */
export function daysSinceInstall(value: Observations, now: number): number | undefined {
  if (!value.installedAt) return undefined;
  return Math.floor((now - value.installedAt) / (24 * 60 * 60 * 1000));
}
