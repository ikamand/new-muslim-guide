import type { Posture } from './types';

/**
 * Where a posture becomes a drawn illustration.
 *
 * The same shape as `src/content/audio.ts`, for the same reason: Metro
 * resolves `require` at build time, so a path cannot be built from a variable
 * and every one has to be written out literally. A `require` for a file that
 * is not in the repo fails the whole bundle rather than one screen — so the
 * lines below stay COMMENTED OUT until the file actually lands.
 *
 * ## Adding one
 *
 * 1. Put the PNG in `assets/images/prayer/`, named exactly for its posture:
 *    `standing.png`, `takbir.png`, `bowing.png`, `rising.png`,
 *    `prostrating.png`, `sitting.png`, `tashahhud.png`, `washing.png`.
 * 2. Uncomment its line here.
 * 3. That is all. `PostureFigure` prefers the image wherever one exists and
 *    falls back to the drawn figure everywhere else, so a half-finished set
 *    is shippable and no screen is ever empty.
 *
 * ## What the files need to be
 *
 * **Transparent background.** The app is dark-first — near-black at #0C110F —
 * and also has a light theme at #FBF9F4. A PNG drawn on white reads as a white
 * sticker stuck on a dark screen.
 *
 * **One size, at 3×.** React Native picks `@2x`/`@3x` variants automatically
 * if they exist, but these render into a 68px tile, so a single file at around
 * 210×210 is enough and is one file per posture instead of three.
 *
 * ⚠️ **A drawing teaches a ruling.** Which arm, how far the hands go, where
 * the gaze falls — these are content, not decoration, and they need the same
 * review as a sentence about how to pray. `docs/scholarly-review.md` is where
 * that is tracked.
 */
export type PostureImage = number;

export const PRAYER_IMAGES: Partial<Record<Posture, PostureImage>> = {
  standing: require('@/assets/images/prayer/standing.png'),
  takbir: require('@/assets/images/prayer/takbir.png'),
  bowing: require('@/assets/images/prayer/bowing.png'),
  rising: require('@/assets/images/prayer/rising.png'),
  prostrating: require('@/assets/images/prayer/prostrating.png'),
  sitting: require('@/assets/images/prayer/sitting.png'),
  tashahhud: require('@/assets/images/prayer/tashahhud.png'),
  'taslim-right': require('@/assets/images/prayer/taslim-right.png'),
  'taslim-left': require('@/assets/images/prayer/taslim-left.png'),
  // Still the drawn figure — a tap and water rather than a body.
  // washing: require('@/assets/images/prayer/washing.png'),
};

/**
 * Which way round each illustration is.
 *
 * The standing figures are portrait and the folded ones are landscape, which
 * is what the postures actually are — a person standing is tall and a person
 * prostrating is wide. A single square frame would letterbox half of them and
 * crop the other half, so the frame follows the picture instead.
 */
export const PORTRAIT_POSTURES: readonly Posture[] = [
  'standing',
  'takbir',
  'rising',
  'bowing',
  'taslim-right',
  'taslim-left',
];

/** The illustration for a posture, or undefined where none has been drawn. */
export function getPostureImage(posture: Posture): PostureImage | undefined {
  return PRAYER_IMAGES[posture];
}

/** How many of the ten exist. Reported by `npm run content:audit`. */
export function drawnPostureCount(): number {
  return Object.keys(PRAYER_IMAGES).length;
}
