/**
 * The five day marks, as data.
 *
 * One home for the drawing of each prayer's time of day. `Glyph` and the
 * Awqat arch's marks draw from it (`components/illustrations.tsx`), and so do
 * the widgets on the home screen and lock screen, which are handed these
 * paths rather than keeping copies of their own (`docs/widgets.md`). A copy in
 * Kotlin or Swift would drift the first time a mark is redrawn here.
 *
 * On the 24 grid. Whoever draws applies the stroke; nothing here is filled.
 */

export type DayMark = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

/** A stroked path, or a stroked circle. */
export type MarkPart = { readonly d: string } | { readonly cx: number; readonly cy: number; readonly r: number };

export const DAY_MARK_PARTS: Readonly<Record<DayMark, readonly MarkPart[]>> = {
  /* Sunrise: the half sun on the horizon, rays up. */
  fajr: [
    { d: 'M3.5 16.5 H20.5' },
    { d: 'M7.8 16.5 A4.2 4.2 0 0 1 16.2 16.5' },
    { d: 'M12 7.9 v2 M6.6 9.7 l1.4 1.4 M17.4 9.7 l-1.4 1.4' },
  ],
  /* Noon: the whole sun, high, no horizon. */
  dhuhr: [
    { cx: 12, cy: 12, r: 3.9 },
    {
      d: 'M12 4.4 v2.2 M12 17.4 v2.2 M4.4 12 h2.2 M17.4 12 h2.2 M6.6 6.6 l1.6 1.6 M15.8 15.8 l1.6 1.6 M17.4 6.6 l-1.6 1.6 M8.2 15.8 l-1.6 1.6',
    },
  ],
  /* Late afternoon: the whole sun, low over the horizon. */
  asr: [
    { cx: 12, cy: 12.5, r: 3.6 },
    { d: 'M12 5.9 v1.8 M6.9 7.9 l1.3 1.3 M17.1 7.9 l-1.3 1.3' },
    { d: 'M3.5 19 H20.5' },
  ],
  /* Sunset: the half sun going, dusk rules beneath, no rays left. */
  maghrib: [
    { d: 'M3.5 14 H20.5' },
    { d: 'M7.8 14 A4.2 4.2 0 0 1 16.2 14' },
    { d: 'M6.5 17.2 H17.5 M9 20.2 H15' },
  ],
  /* Night: the hilal. */
  isha: [{ d: 'M13.6 4.4 A7.6 7.6 0 1 0 19.4 14.8 A6.2 6.2 0 0 1 13.6 4.4 Z' }],
};
