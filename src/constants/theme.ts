/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

/**
 * The palette, named for pigments, with one job each.
 *
 * ## Why the names are pigments and not roles
 *
 * The previous palette had `accent` and `accentMuted`, and a token named
 * `accent` gets used for everything — buttons, kickers, progress, links,
 * badges. Green was on all of them, which is why the app looked like every
 * other Islamic app: a colour that means everything means nothing.
 *
 * These are the colours a scribe actually ground, and each keeps the job it
 * had on the page:
 *
 *   - **lapis** (`accent`, `action`) — structure, and the one thing on a
 *     screen that is pressable.
 *   - **gold** — illumination ONLY: rules, rosettes, ʿunwān panels, the head
 *     of a section. Never a control. If gold is tappable, this is wrong.
 *   - **goldSoft** — the hairline weight of the same, for a rule that
 *     separates rather than announces.
 *   - **vermilion** — rubric. Why a card chose what it chose, a stop mark, a
 *     caution. Rare enough that seeing it means look.
 *   - **malachite** — correct, heard, done. It appears only when something is
 *     right, which is what `recite-follow` already meant by green.
 *   - **parchment / gall ink** — the ground and the type. Warm, never `#000`
 *     and never `#FFF`: those are the colours of a screen, not of writing.
 *
 * ## Light is the canonical theme
 *
 * The grammar is a page — ruled frames, gold, ink on a light ground. Dark is
 * that page by lamplight, and is derived from it rather than the other way
 * round. Both ship; see `docs/ui-redesign-plan.md`.
 *
 * ⚠️ Gold on parchment is the weakest pairing here by contrast, and every rule
 * and Arabic name sits on it. `#8E6A21` is already darkened from the leaf
 * colour for that reason. Measure before lightening it.
 */
export const Colors = {
  light: {
    text: '#221B14',
    textSecondary: '#6B5A46',
    textOnAccent: '#F3ECDC',
    background: '#F3ECDC',
    backgroundElement: '#FAF5E8',
    backgroundSelected: '#EDE3CC',
    accent: '#1B3A6B',
    accentMuted: '#DEE4F0',
    border: '#DCCFB0',

    gold: '#8E6A21',
    goldSoft: '#D9C9A2',
    vermilion: '#A8322A',
    malachite: '#2E6B52',

    action: '#1B3A6B',
    /* The modal backdrop. Ink-toned, same in both themes on purpose. */
    scrim: 'rgba(12, 17, 24, 0.45)',
    onAction: '#F3ECDC',
    /* Invisible in light — the bar has enough contrast against parchment. */
    actionRule: '#1B3A6B',
  },
  dark: {
    text: '#F2E9D5',
    textSecondary: '#A7BAD8',
    textOnAccent: '#0B1A33',
    background: '#0B1A33',
    backgroundElement: '#12264A',
    backgroundSelected: '#1A3358',
    accent: '#93B4E8',
    accentMuted: '#16305A',
    border: '#22406E',

    gold: '#C9A253',
    goldSoft: '#5B4E33',
    vermilion: '#E0796F',
    malachite: '#6FCFB2',

    action: '#2A5391',
    scrim: 'rgba(12, 17, 24, 0.45)',
    onAction: '#F2E9D5',
    /* A gold hairline, because a lapis bar on a lapis ground has no edge. */
    actionRule: '#C9A253',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * The Arabic face, loaded in `src/app/_layout.tsx`.
 *
 * One name, in one place, because it is applied from four separate components
 * and a face that disagrees with itself between them is worse than no face at
 * all. The string has to match the key given to `useFonts`.
 *
 * Never applied to transliteration or translation — those are Latin text and
 * Amiri's Latin is a different design with different metrics.
 */
export const ArabicFont = 'Amiri';

/**
 * The Latin display face, loaded beside Amiri in `src/app/_layout.tsx`.
 *
 * Literata — a bookish serif built for long-form reading, which is the right
 * register for an app that is mostly quiet instruction. It carries the three
 * heading rungs only (`sectionTitle`, `subtitle`, `title` in
 * `themed-text.tsx`): headings are the app's voice, body copy is its
 * legibility, and buttons and cards stay in the system face because chrome
 * should not be literary.
 *
 * The name includes the weight because that is how a static-instance TTF
 * registers: there is no bold axis to ask for, this file IS the 600.
 */
export const HeadingFont = 'Literata_600SemiBold';


export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const Radius = {
  /**
   * The manuscript grammar's corner. A ruled page has square corners and a
   * bound one has barely-rounded ones; 10 and above read as a component
   * library, which is the thing the redesign is getting away from.
   */
  rule: 4,
  small: 10,
  medium: 16,
  large: 24,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
