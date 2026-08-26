/**
 * The look of a teaching page, in one place.
 *
 * ## Why this file exists
 *
 * A teaching page's appearance used to live in three places at once:
 * `reference/[id].tsx`'s `StyleSheet`, inline props inside its JSX, and the
 * type scale. The full-bleed source block was the clearest symptom — it works
 * because a negative margin cancels the page's padding, which meant two
 * numbers in two files that had to agree with nothing enforcing it. Change the
 * page padding and the source silently stopped reaching the edge.
 *
 * So: one file, and the components in `components/teaching/` are the only
 * things allowed to read it.
 *
 * ## Named for the role, never for the look
 *
 * `source.hero`, not `bigGreenBlock`. A later redesign then changes appearance
 * without renaming anything, which is the difference between a token file that
 * survives and one that gets bypassed the first time the design moves.
 *
 * ## No font sizes here, deliberately
 *
 * `themed-text.tsx` owns type and keeps owning it. The first drafts of this
 * design invented a 17/28 body and a 21/28 heading; neither was needed, since
 * `lead` is 18/28 and `cardTitle` is 20/26. A second scale in a second file
 * would be worse than the local overrides the one-scale rule was written to
 * prevent. Roles below say WHICH rung to use, never what size it is.
 *
 * That held for Latin and leaked for Arabic: this file carried `arabicSize: 25`
 * and `arabicLineHeight: 52` until 26 Aug, which was a second scale in a second
 * file after all. Amiri now has its own rungs beside the Latin ones.
 */

import { Spacing } from './theme';
import type { ThemeColor } from './theme';
import type { TextType } from '@/components/themed-text';

export const Teaching = {
  /**
   * The single number the full-bleed source block is derived from.
   *
   * Lower than the app's usual `Spacing.four`, and that is the point: at 24px
   * a side, plus a card's own 24, the text column on a 390px phone was 294px —
   * about 37 characters a line against an optimal 45 to 75. Dropping the cards
   * and the padding together takes it to 350px and ~44 characters.
   */
  page: {
    paddingH: Spacing.three + Spacing.one, // 20
    paddingV: Spacing.four,
    /** Between a section's last line and the next heading. */
    sectionGap: Spacing.five - Spacing.half, // 30
  },

  title: { type: 'subtitle' as TextType, color: 'text' as ThemeColor },
  subtitle: { type: 'lead' as TextType, color: 'textSecondary' as ThemeColor },

  /**
   * Section headings carry the accent colour so the shape of a page is
   * legible before a word of it is read. They are the only accent-coloured
   * text on a page — the quick-facts answer that used to be accent is bold
   * instead, because two accents on one screen means neither leads.
   */
  heading: { type: 'cardTitle' as TextType, color: 'accent' as ThemeColor, gap: Spacing.two + 2 },

  body: { type: 'lead' as TextType, color: 'text' as ThemeColor, gap: Spacing.three - 2 },

  /** Answers before argument, at the top of a page. */
  factRow: {
    labelWidth: 96,
    minHeight: 46,
    labelType: 'caption' as TextType,
    valueType: 'default' as TextType,
    paddingV: Spacing.two + 3,
    gap: Spacing.three - 4,
  },

  /**
   * A bar rather than a disc.
   *
   * A round bullet centres itself against the first line and leaves the rest
   * of a wrapped item hanging; a bar runs the height of the item and holds the
   * whole thing together, which matters when items are a sentence long.
   */
  bullet: { barWidth: 4, barRadius: 2, gap: Spacing.three - 4, marginBottom: Spacing.two + 2 },

  /**
   * Two weights of evidence, and the reason there are two.
   *
   * The first pages drawn had one treatment, and it worked until a page cited
   * three verses — at which point the page was stripes and the treatment meant
   * nothing. So: the narration that IS the page's answer breaks the margins;
   * everything supporting gets a rule and an indent. One hero per page.
   */
  source: {
    hero: {
      /** Cancels `page.paddingH` to reach both edges. Never write this twice. */
      bleed: Spacing.three + Spacing.one, // 20
      paddingV: Spacing.four - 2,
      translationType: 'default' as TextType,
    },
    quote: {
      barWidth: 2,
      paddingLeft: Spacing.three,
      translationType: 'small' as TextType,
    },
  },

  /** Practical advice — neither an instruction nor a source, and looks like neither. */
  aside: { barWidth: 3, paddingLeft: Spacing.three, type: 'small' as TextType },
} as const;
