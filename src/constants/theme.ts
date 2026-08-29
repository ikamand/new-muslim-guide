/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#141A18',
    textSecondary: '#5C6763',
    textOnAccent: '#FFFFFF',
    background: '#FBF9F4',
    backgroundElement: '#F2EFE7',
    backgroundSelected: '#E7E2D6',
    accent: '#1F6F5C',
    accentMuted: '#DCEAE4',
    border: '#E4DFD3',
  },
  dark: {
    text: '#F3F1EC',
    textSecondary: '#9AA5A0',
    textOnAccent: '#0C110F',
    background: '#0C110F',
    backgroundElement: '#161D1A',
    backgroundSelected: '#1F2926',
    accent: '#6FCFB2',
    accentMuted: '#17302A',
    border: '#232D29',
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
  small: 10,
  medium: 16,
  large: 24,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
