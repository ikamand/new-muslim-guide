import AsyncStorage from '@react-native-async-storage/async-storage';

import { FIRSTS } from '@/content/firsts';
import { migrateProgressKey } from '@/content/progress-keys';

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

export type Finish = {
  /** The first time. Never moves — see `recordFinished`. */
  first: number;
  last: number;
  /** How many times, monotonic. Never decreases, and no date is kept. */
  times: number;
};

export type Observations = {
  /** When the app was first opened. The only clock this file keeps. */
  installedAt: number;
  /**
   * `kind:id` → when it was first finished, when it was last finished, and how
   * many times.
   *
   * ## Why three numbers and not one
   *
   * Phase 5 stored only the last time, which cannot answer the question Phase 7
   * asks: has this person been praying for a month? `first` and `times` answer
   * it between them, and they are the SAFEST pair that can.
   *
   * ⚠️ The obvious alternative — a list of the days somebody prayed — was
   * rejected outright. That is a streak in everything but name, and it records
   * the days they did NOT, which is the one thing `index.tsx` promises this app
   * never does. Two numbers that only ever go up cannot express a gap, cannot
   * be drawn as a calendar, and cannot tell anybody they have lapsed.
   */
  finished: Record<string, Finish>;
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
  /**
   * Firsts that have happened → when. See `content/firsts.ts` for the rules.
   *
   * Here rather than in a key of its own because a first IS an observation:
   * same lifecycle, same promise, same "nothing leaves the device". Two of
   * them mark themselves directly from the records above, and splitting the
   * two apart would mean a write to one key deriving from a read of another.
   *
   * ⚠️ The timestamp is for ORDER and nothing else. Nothing may compute a
   * duration from it — "two years since your first fast" is the noticing
   * `index.tsx` promises this app does not do.
   */
  firsts: Record<string, number>;
  /**
   * `kind:id` → how far somebody got through a lesson they left, and when.
   *
   * The signal behind "You were reading" on the carry-on surfaces: opened,
   * read part of it, went away. Recorded when the page unmounts, never per
   * scroll event, and a finish deletes the entry — being midway through a
   * lesson you have completed is re-reading, not unfinished business.
   *
   * `furthest` only rises, like everything in this file. It is a fraction of
   * the page's scroll, which is the honest name for what it measures: where
   * the screen got to, not what the reader took in.
   */
  reading: Record<string, Reading>;
  /**
   * One private line per first, written by the reader — how it actually was.
   *
   * Shown only on the ledger, never surfaced anywhere else, never read by
   * any inference. It exists so the ledger is THEIRS rather than the app's:
   * the app is a witness here, not an observer. Forgetting a first keeps its
   * line, so a mis-tap cannot destroy a sentence someone wrote.
   */
  notes: Record<string, string>;
};

export type Reading = {
  /** 0..1 of the page's scrollable height, the deepest they have been. */
  furthest: number;
  /** When they last left the page. */
  at: number;
};

export const EMPTY: Observations = {
  installedAt: 0,
  finished: {},
  sittings: {},
  surahs: {},
  misses: [],
  firsts: {},
  reading: {},
  notes: {},
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

/**
 * Finishes, narrowed — and migrated twice over: from the bare number Phase 5
 * wrote, and through the rename table in `progress-keys.ts`.
 *
 * A record written hours before this shape existed holds `1787953082432` where
 * this expects an object. Dropping those would erase somebody's history to
 * satisfy a type, so a number reads as one finish at that moment, which is
 * exactly what it meant. Two old keys migrating to one new one merge on the
 * only honest arithmetic: earliest first, latest last, times summed.
 */
function finishes(value: unknown): Record<string, Finish> {
  if (!isRecord(value)) return {};
  const out: Record<string, Finish> = {};
  const keep = (key: string, entry: Finish) => {
    const named = migrateProgressKey(key);
    const before = out[named];
    out[named] = before
      ? {
          first: Math.min(before.first, entry.first),
          last: Math.max(before.last, entry.last),
          times: before.times + entry.times,
        }
      : entry;
  };
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry === 'number' && Number.isFinite(entry)) {
      keep(key, { first: entry, last: entry, times: 1 });
      continue;
    }
    if (!isRecord(entry)) continue;
    const { first, last, times: count } = entry;
    if (
      typeof first === 'number' &&
      Number.isFinite(first) &&
      typeof last === 'number' &&
      Number.isFinite(last) &&
      typeof count === 'number' &&
      Number.isFinite(count)
    ) {
      keep(key, { first, last, times: count });
    }
  }
  return out;
}

/** A fraction and a date, both finite, or the entry never existed. */
function readings(value: unknown): Record<string, Reading> {
  if (!isRecord(value)) return {};
  const out: Record<string, Reading> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (!isRecord(entry)) continue;
    const { furthest, at } = entry;
    if (
      typeof furthest === 'number' &&
      Number.isFinite(furthest) &&
      furthest > 0 &&
      furthest <= 1 &&
      typeof at === 'number' &&
      Number.isFinite(at)
    ) {
      // Renames merge on the deepest bookmark and the latest departure.
      const named = migrateProgressKey(key);
      const before = out[named];
      out[named] = before
        ? { furthest: Math.max(before.furthest, furthest), at: Math.max(before.at, at) }
        : { furthest, at };
    }
  }
  return out;
}

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
    finished: finishes(stored.finished),
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
    firsts: times(stored.firsts),
    reading: readings(stored.reading),
    notes: isRecord(stored.notes)
      ? Object.fromEntries(
          Object.entries(stored.notes)
            .filter((entry): entry is [string, string] => typeof entry[1] === 'string')
            .map(([id, text]) => [id, text.slice(0, NOTE_LIMIT)]),
        )
      : {},
  };
}

export async function read(): Promise<Observations> {
  return parse(await AsyncStorage.getItem(KEY));
}

export async function write(value: Observations): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(value));
}

/* ----------------------------- the recorders ----------------------------- */

/**
 * Something was finished.
 *
 * `first` never moves and `times` only rises. Re-reading a page is not a new
 * lesson, but it IS another time — and the difference between "read it once"
 * and "has done this twenty times" is the whole of what Phase 7 infers from.
 */
export function recordFinished(value: Observations, key: string, at: number): Observations {
  const before = value.finished[key];
  const entry: Finish = before
    ? { first: before.first, last: at, times: before.times + 1 }
    : { first: at, last: at, times: 1 };
  // A finish ends the "in the middle of reading" state — see `reading`.
  const reading = { ...value.reading };
  delete reading[key];
  return { ...value, finished: { ...value.finished, [key]: entry }, reading };
}

/**
 * Somebody left a lesson partway through.
 *
 * `furthest` only rises: scrolling back up before leaving does not un-read
 * the page. Lessons currently marked done never record — a partial re-read
 * of something done is not unfinished business, and letting it in would put
 * "You were reading" on pages the reader has already been congratulated for.
 *
 * The guard is `doneNow` — the ledger, passed in — and NOT `value.finished`,
 * which it used to be. `finished` is history and history never un-happens,
 * so guarding on it meant somebody who un-marked a lesson to redo it
 * properly could never get a bookmark on the re-read: the app remembered
 * they had finished once and refused to see them reading now.
 */
export function recordReading(
  value: Observations,
  key: string,
  furthest: number,
  at: number,
  doneNow: readonly string[],
): Observations {
  if (doneNow.includes(key)) return value;
  const before = value.reading[key];
  const deepest = Math.min(1, Math.max(before?.furthest ?? 0, furthest));
  if (deepest <= 0) return value;
  return { ...value, reading: { ...value.reading, [key]: { furthest: deepest, at } } };
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

/**
 * A first happened.
 *
 * Guarded rather than overwriting: a first is the FIRST, so marking it twice
 * must not move its date and reorder somebody's ledger. This is the one
 * recorder here that refuses to update an existing entry, and that difference
 * is the whole meaning of the word.
 */
/** Long enough for a paragraph, short enough that this stays a line. */
export const NOTE_LIMIT = 280;

/** The reader's own line on a first. An empty text removes it. */
export function recordFirstNote(value: Observations, id: string, text: string): Observations {
  const trimmed = text.trim().slice(0, NOTE_LIMIT);
  const notes = { ...value.notes };
  if (trimmed.length === 0) delete notes[id];
  else notes[id] = trimmed;
  return { ...value, notes };
}

export function recordFirst(value: Observations, id: string, at: number): Observations {
  if (value.firsts[id]) return value;
  return { ...value, firsts: { ...value.firsts, [id]: at } };
}

/**
 * A first un-happened, because somebody said it had not.
 *
 * The only way to remove one, and it exists for a mis-tap rather than as a
 * mechanic — nothing in the app ever calls this on somebody's behalf, and
 * nothing expires.
 */
export function forgetFirst(value: Observations, id: string): Observations {
  if (!value.firsts[id]) return value;
  const firsts = { ...value.firsts };
  delete firsts[id];
  return { ...value, firsts };
}

/**
 * Award every `observed` first the records now justify.
 *
 * Derived at WRITE time, not in an effect. The React lint rule against calling
 * setState from an effect is right here for a real reason and not only a
 * stylistic one: deriving this on every render would recompute a fact that
 * cannot change back, and `recordFirst` refuses to move an existing date, so
 * the work would be pure waste on every frame.
 *
 * `alsoFinished` carries `completedLessons` from settings. Without it, anybody
 * who already used this app gets no firsts at all: `observations.finished` was
 * created by Phase 5 and is empty for them, while their history lives in the
 * settings key that has recorded finished lessons all along. The app did watch
 * them pray; it simply wrote it down somewhere else.
 */
export function awardObserved(
  value: Observations,
  alsoFinished: readonly string[],
  at: number,
): Observations {
  const finished = new Set([...Object.keys(value.finished), ...alsoFinished]);

  return FIRSTS.reduce((carry, first) => {
    if (first.trigger !== 'observed' || !first.from || carry.firsts[first.id]) return carry;

    const earned =
      first.from === 'surah:any'
        ? Object.keys(carry.surahs).length > 0
        : first.from.startsWith('sitting:')
          ? Boolean(carry.sittings[first.from.slice('sitting:'.length)])
          : finished.has(first.from);

    return earned ? recordFirst(carry, first.id, at) : carry;
  }, value);
}

/** Whole days since the app was first opened, or undefined if unknown. */
export function daysSinceInstall(value: Observations, now: number): number | undefined {
  if (!value.installedAt) return undefined;
  return Math.floor((now - value.installedAt) / (24 * 60 * 60 * 1000));
}
