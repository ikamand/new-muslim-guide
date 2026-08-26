/**
 * Which postures have a real drawing — the names, in a file a script can read.
 *
 * ## Why this is not simply a key of `PRAYER_IMAGES`
 *
 * Because it was, and it broke `npm run content:audit` completely. That module
 * is a wall of `require('…png')`; Metro resolves those at build time and node
 * cannot, and importing the module runs its body whatever you destructure from
 * it. So the audit — one of the tools CLAUDE.md tells you to run before
 * shipping — died on `require is not defined in ES module scope` and had been
 * failing silently for days.
 *
 * `content/quran/ayah-audio.ts` documents the same trap and solves it the same
 * way: the script-readable data lives where the requires cannot reach it. A
 * posture name is data. A module number is an asset.
 *
 * ⚠️ Keep this in step with `PRAYER_IMAGES`. `npm run content:audit` fails if
 * they disagree, which is the only thing keeping them honest.
 */

import type { Posture } from './types';

export const DRAWN_POSTURES: readonly Posture[] = [
  'standing',
  'takbir',
  'bowing',
  'rising',
  'prostrating',
  'sitting',
  'tashahhud',
];
