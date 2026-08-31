/**
 * Renamed progress keys, old → new.
 *
 * Progress lives on devices as `kind:id` strings — `completedLessons` in
 * settings, `finished` and `reading` in observations. Rename a content id and
 * every one of those keys orphans silently: the lesson reverts to unread on
 * every phone, over the air, with nothing to notice it. This table is the
 * migration path: both parsers map keys through it on load, so a rename ships
 * as one entry here instead of as everyone's lost ticks.
 *
 * `content:audit` enforces the discipline: it keeps a committed snapshot of
 * every key progress can attach to (`docs/progress-keys.txt` — the whole
 * catalogue, not just the curriculum, because bookmarks and finish history
 * attach to any page) and FAILS when a key disappears without an entry here.
 * Empty is the normal state — an entry is added the day a rename happens and
 * never removed, because a device that skipped ten updates still holds the
 * oldest keys.
 */
export const PROGRESS_KEY_MIGRATIONS: Record<string, string> = {};

/** The current name for a stored progress key. */
export function migrateProgressKey(key: string): string {
  return PROGRESS_KEY_MIGRATIONS[key] ?? key;
}
