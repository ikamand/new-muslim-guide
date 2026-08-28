/**
 * Every collection the app carries.
 *
 * ## One, so far
 *
 * The kind landed empty on 28 Aug 2026 and `quranic-names` followed the same
 * day as Phase 3 of `docs/build-order.md` — the first instance, kept separate
 * from the machinery so it could be looked at on a screen before four more
 * were built to the same pattern.
 *
 * It is NOT the ninety-nine names the plan asked for. `scripts/generate-names.mjs`
 * carries the working: the only enumerated lists are a narration graded weak
 * by three graders and a second that disagrees with it, so the collection is
 * the passage where the Qur'an lists the names itself.
 *
 * ## Adding one
 *
 * 1. A data file in this directory exporting a `Collection`.
 * 2. Its `provider` must be a row in `../providers.ts`.
 * 3. A cadence row in `../cadence.ts`, keyed `collection:<id>`.
 * 4. Add it to `COLLECTIONS` below.
 *
 * No code changes. That is the claim this phase makes, and `plan:check`
 * enforces the part of it that a person would otherwise have to remember:
 * no component may branch on which collection it is rendering.
 */

import { QURANIC_DUAS } from './quranic-duas';
import { QURANIC_NAMES } from './quranic-names';

import { cadenceFor } from '../cadence';
import { ref } from '../model';
import type { Collection, CollectionEntry } from '../types';

export const COLLECTIONS: readonly Collection[] = [QURANIC_NAMES, QURANIC_DUAS];

export function getCollection(id: string): Collection | undefined {
  return COLLECTIONS.find((entry) => entry.id === id);
}

/**
 * Today's entry, from whichever collections are `daily`.
 *
 * Here rather than on the Today screen, and that is the point. Today asks the
 * content layer what today's entry is and renders whatever comes back; it
 * never names a collection, so a second `daily` collection joins the rotation
 * without the screen changing. A screen that reached for `getCollection(
 * 'quranic-names')` would be the branch `types.ts` forbids, wearing a
 * different hat.
 *
 * The day number is built from the LOCAL date rather than from epoch
 * milliseconds, so the entry turns over at midnight where the reader is
 * standing rather than in London.
 */
export function dailyEntry(
  today: Date = new Date(),
): { collection: Collection; entry: CollectionEntry } | undefined {
  const daily = COLLECTIONS.filter(
    (collection) =>
      cadenceFor(ref('collection', collection.id)) === 'daily' && collection.entries.length > 0,
  );
  if (daily.length === 0) return undefined;

  const day = Math.floor(
    Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 86_400_000,
  );
  const collection = daily[day % daily.length];
  return { collection, entry: collection.entries[day % collection.entries.length] };
}
