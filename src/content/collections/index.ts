/**
 * Every collection the app carries.
 *
 * ## Empty, and that is the honest state
 *
 * The machinery landed on 28 Aug 2026 and the first real collection — the 99
 * names — is Phase 3 of `docs/build-order.md`, deliberately separate so it can
 * be looked at on a screen before four more are built to the same pattern.
 * Inventing a set here to stop the list looking bare would be exactly the
 * placeholder content this app must not carry.
 *
 * The kind is still worth shipping empty: everything downstream of it —
 * the route, the search index, the catalogue, the audit — is in place and
 * proved, so Phase 3 is a data file and a registry row rather than a
 * structural change made under time pressure with content waiting on it.
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

import type { Collection } from '../types';

export const COLLECTIONS: readonly Collection[] = [];

export function getCollection(id: string): Collection | undefined {
  return COLLECTIONS.find((entry) => entry.id === id);
}
