import { StyleSheet, Text, type TextProps } from 'react-native';

import { ArabicFont, ThemeColor } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * Every piece of text in the app, at one of eight sizes.
 *
 * ## Why the scale changed
 *
 * It used to be 14, 14, 16, 32, 48 — and nothing between 16 and 32. A card
 * title and a sentence of body copy were both about sixteen pixels, so
 * **nothing in a list could outrank anything else**, and a screen of thirty
 * cards arrived all at once with equal weight. That is not a taste problem; it
 * is a scale with no rung to promote anything to.
 *
 * The proof was in the codebase rather than the design: `fontSize: 17` appeared
 * as a local override in nine separate files, alongside ad-hoc 12, 18, 19, 22,
 * 26 and 28. Those are the missing rungs, reinvented every time somebody needed
 * one. They are named here now, so a card title is a decision made once.
 *
 * The steps are roughly ×1.2 apart, which is close enough to keep neighbouring
 * sizes distinguishable and far enough to make a heading read as a heading:
 *
 * ```
 * 12 → 14 → 16 → 18 → 20 → 24 → 30 → 36
 * ```
 *
 * ## What went, and why that is safe
 *
 * `link`, `linkPrimary`, `title` and `code` are gone. None of the four was used
 * anywhere in `src/`, and `linkPrimary` hardcoded `#3c87f7` — iOS blue, in a
 * green app, in a file CLAUDE.md forbids hex in. Dead code hiding a live bug.
 * `title` returns as 36, which is a size a phone can actually use; 48 was two
 * thirds the width of a screen.
 *
 * Line heights are generous on purpose. Nothing here is set at a default
 * because that was quicker.
 */

/**
 * The eight rungs, as a name.
 *
 * Exported so `constants/teaching.ts` can say WHICH rung a role uses without
 * repeating a size. That file deliberately holds no font sizes: type lives
 * here and keeps living here, or the app grows a second scale in a second
 * file, which is worse than the local overrides this scale was built to stop.
 */
export type TextType = NonNullable<ThemedTextProps['type']>;

export type ThemedTextProps = TextProps & {
  type?:
    | 'caption'
    | 'small'
    | 'smallBold'
    | 'default'
    | 'lead'
    | 'cardTitle'
    | 'sectionTitle'
    | 'subtitle'
    | 'title'
    | 'arabicName'
    | 'arabicNote'
    | 'arabicQuote'
    | 'arabicLead'
    | 'arabicVerse'
    | 'arabicDisplay';
  themeColor?: ThemeColor;
};

export function ThemedText({ style, type = 'default', themeColor, ...rest }: ThemedTextProps) {
  const theme = useTheme();

  return (
    <Text
      style={[
        { color: theme[themeColor ?? 'text'] },
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  /*
    ## The Arabic rungs, and why they had to exist
​
    Amiri was being sized by hand in thirteen separate files — 16, 20, 21, 22,
    24, 25, 26, 30 and 34 — because the rule about not inventing a font size
    was written about Latin, and Arabic quietly fell outside it. That is the
    same failure the eight Latin rungs were created to end, running again in
    another script.
​
    Line heights are generous by Latin standards and have to be: Amiri stacks
    vowel marks above the line and descenders below it, so 26px Arabic needs
    the leading of 34px Latin or the marks of one line touch the letters of the
    next. Never set an Arabic line-height by eye — take a rung.
​
    `writingDirection` and `textAlign` are NOT set here. A verse in a card is
    right-aligned; a word inside a sentence is not. Direction belongs to the
    layout, the face belongs to the type.
  */
  /*
    A NAME, not a sentence: a surah in a list, a label beside a transliteration.
    Tight leading on purpose — the rungs below are set for flowing text with
    vowel marks stacking between lines, and a single-line name given that much
    leading floats away from the row it belongs to.
  */
  arabicName: {
    fontFamily: ArabicFont,
    fontSize: 22,
    lineHeight: 32,
  },
  /** A footnote, a citation's Arabic, anything supporting. */
  arabicNote: {
    fontFamily: ArabicFont,
    fontSize: 17,
    lineHeight: 32,
  },
  /** A supporting narration or verse — the quote weight on a teaching page. */
  arabicQuote: {
    fontFamily: ArabicFont,
    fontSize: 22,
    lineHeight: 44,
  },
  /** The text a screen is about: a duʿa, a hero verse, a pillar. */
  arabicLead: {
    fontFamily: ArabicFont,
    fontSize: 26,
    lineHeight: 52,
  },
  /** Set to be recited from — the surah screen and the prayer's steps. */
  arabicVerse: {
    fontFamily: ArabicFont,
    fontSize: 30,
    lineHeight: 58,
  },
  /** A title at the head of a screen, read once rather than recited. */
  arabicDisplay: {
    fontFamily: ArabicFont,
    fontSize: 34,
    lineHeight: 52,
  },

  /** Kickers, units and counts — the smallest thing that is still readable. */
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  smallBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  /** Body copy. 26 rather than 24: this is read on a mat, one-handed. */
  default: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '500',
  },
  /** The opening paragraph of a prose screen, where one sentence carries. */
  lead: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
  },
  /**
   * The title of a card or a row.
   *
   * The single most important addition. At 20 against body copy's 16 a list
   * finally has a head and a tail; at the old 17 it had neither.
   */
  cardTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '600',
  },
  /** A heading inside a page — the group names on the Learn tab. */
  sectionTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '600',
  },
  /** The screen's own name, at the top. */
  subtitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '600',
  },
  /** Reserved for one thing on one screen. Rare by design. */
  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '600',
  },
});
