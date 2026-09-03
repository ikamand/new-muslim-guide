/**
 * The pieces a teaching page is built from.
 *
 * These are the ONLY files permitted to read `constants/teaching.ts`. A screen
 * composes them and never writes a number; content stays typed data and never
 * knows how it looks. Changing the whole look of every teaching page in the
 * app is then one file, which is the point.
 *
 * ## Every component takes a style override, on purpose
 *
 * An abstraction too rigid becomes something pages fight. That already
 * happened once while this design was being drawn: the hero-versus-supporting
 * rule for sources did not exist until a third page was sketched, and a
 * stricter component set would have made that page harder rather than better.
 *
 * So the guard in `npm run style:check` warns rather than blocks, and every
 * component here accepts `style`. A rule that cannot be broken gets worked
 * around in uglier ways than the thing it forbade.
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { PressableLink } from '@/components/pressable-link';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { Teaching } from '@/constants/teaching';
import { useTheme } from '@/hooks/use-theme';
import type { QuickFact } from '@/content';

/** A section heading, and the only accent-coloured text on a page. */
export function TeachingHeading({ children }: { children: string }) {
  return (
    <ThemedText
      type={Teaching.heading.type}
      themeColor={Teaching.heading.color}
      style={{ marginBottom: Teaching.heading.gap }}>
      {children}
    </ThemedText>
  );
}

/** One idea. Where a paragraph has two, it should be two of these. */
export function TeachingBody({
  children,
  muted,
  last,
}: {
  children: React.ReactNode;
  muted?: boolean;
  /** Adds the gap that separates a section from the next heading. */
  last?: boolean;
}) {
  return (
    <ThemedText
      type={Teaching.body.type}
      themeColor={muted ? 'textSecondary' : Teaching.body.color}
      style={{ marginBottom: last ? Teaching.page.sectionGap : Teaching.body.gap }}>
      {children}
    </ThemedText>
  );
}

/**
 * One item of a genuine list.
 *
 * A bar rather than a disc: a round bullet centres against the first line and
 * leaves a wrapped item hanging, where a bar runs the item's full height. That
 * matters here because items are usually a sentence.
 */
export function TeachingBullet({
  children,
  last,
}: {
  children: React.ReactNode;
  last?: boolean;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.bullet,
        { marginBottom: last ? Teaching.page.sectionGap : Teaching.bullet.marginBottom },
      ]}>
      <View style={[styles.bar, { backgroundColor: theme.border }]} />
      <ThemedText type="default" style={styles.bulletText}>
        {children}
      </ThemedText>
    </View>
  );
}

/** Advice, which is neither an instruction nor a source and looks like neither. */
export function TeachingAside({
  children,
  last,
}: {
  children: React.ReactNode;
  /**
   * Adds the gap to the next heading, same as `TeachingBody`.
   *
   * It used to take that gap unconditionally, which was invisible while an
   * aside was always the last thing in its section and wrong the moment
   * something followed it. With "Where this comes from" underneath, the
   * disclosure ended up 30px from the aside above and 30px from the heading
   * below — floating between two sections rather than belonging to either.
   */
  last?: boolean;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.aside,
        { borderLeftColor: theme.border },
        { marginBottom: last ? Teaching.page.sectionGap : Teaching.body.gap },
      ]}>
      <ThemedText type={Teaching.aside.type} themeColor="textSecondary">
        {children}
      </ThemedText>
    </View>
  );
}

/**
 * A narration or a verse, printed rather than filed.
 *
 * One block, two sizes. `hero` is the page's answer and sets its Arabic at the
 * `arabicLead` rung; `quote` is everything supporting it, at `arabicQuote`.
 * **One hero per page** — the treatment stops meaning anything the moment a
 * page has three of them, which is exactly what happened on the first page
 * that cited three verses.
 *
 * The hero used to break the page's margins as well. It no longer does: that
 * read as two unrelated shapes rather than as a hierarchy, and it coupled a
 * negative margin here to `page.paddingH` there. See `constants/teaching.ts`.
 */
export function TeachingSource({
  arabic,
  translation,
  reference,
  variant = 'quote',
  style,
}: {
  arabic: string;
  /**
   * Absent where no publisher's English may be carried for this narration —
   * see `EvidenceText`. The Arabic still prints; a missing translation is not
   * a reason to hide the text somebody came to read.
   */
  translation?: string;
  reference: string;
  variant?: 'hero' | 'quote';
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const spec = variant === 'hero' ? Teaching.source.hero : Teaching.source.quote;

  return (
    <View
      style={[
        styles.block,
        {
          paddingVertical: spec.paddingV,
          gap: spec.gap,
          borderColor: theme.goldSoft,
        },
        style,
      ]}>
      <ThemedText type={spec.arabicType} style={styles.arabic}>
        {arabic}
      </ThemedText>
      {translation ? (
        <ThemedText type={spec.translationType} themeColor={spec.translationColor}>
          {`“${translation}”`}
        </ThemedText>
      ) : null}
      {/*
        Identical in both weights, deliberately.

        The first version varied three things at once between hero and quote —
        the shape, the reference colour, and whether a rule was drawn. Three
        differences do not read as "more important" and "less important"; they
        read as two unrelated components, and Iyad said so immediately.

        A hierarchy varies ONE dimension. That principle was written here while
        the hero still broke the page's margins, which was a second dimension
        and the one Iyad later read as an inconsistency rather than as
        emphasis. Now it holds: the ONLY difference is size.
      */}
      <View style={styles.reference}>
        <View style={[styles.rule, { backgroundColor: theme.accent }]} />
        <ThemedText type="caption" themeColor="accent">
          {reference.toUpperCase()}
        </ThemedText>
      </View>
    </View>
  );
}

/**
 * Answers before argument, at the top of a page.
 *
 * Styled as answers rather than as a table — labels quiet, values in body
 * weight, hairlines between rows and no outer border or fill. A bordered box
 * of label/value pairs reads as reference material to be consulted; this
 * should read as somebody answering you.
 *
 * Rows are optional and pages differ: a food page has two, witr has four, a
 * belief page has neither "how many" nor "do I have to". A block that pads
 * itself to four rows everywhere would be structure for its own sake.
 */
export function TeachingFacts({
  facts,
  style,
}: {
  facts: readonly QuickFact[];
  /** Inside the matn frame the frame owns the trailing air; see reference. */
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  if (facts.length === 0) return null;

  return (
    <View style={[{ marginBottom: Teaching.page.sectionGap }, style]}>
      {facts.map((fact, index) => {
        const body = (
          <>
            <ThemedText
              type={Teaching.factRow.labelType}
              themeColor="textSecondary"
              style={styles.factLabel}
              numberOfLines={2}>
              {fact.label.toUpperCase()}
            </ThemedText>
            {/*
              Bold, not accent. Section headings took the accent colour so a
              page's shape is legible before it is read, and two accents on one
              screen means neither of them leads.
            */}
            <ThemedText
              type={Teaching.factRow.valueType}
              style={[styles.factValue, fact.emphasis && styles.factEmphasis]}>
              {fact.value}
            </ThemedText>
          </>
        );

        const rowStyle = [
          styles.factRow,
          { borderTopColor: theme.border },
          index === facts.length - 1 && {
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.border,
          },
        ];

        // The one row that is a door rather than a fact.
        return fact.href ? (
          <PressableLink
            key={fact.label}
            href={fact.href as never}
            style={rowStyle}
            pressedStyle={{ opacity: 0.6 }}>
            {body}
            <Ionicons name="chevron-forward" size={20} color={theme.accent} />
          </PressableLink>
        ) : (
          <View key={fact.label} style={rowStyle}>
            {body}
          </View>
        );
      })}
    </View>
  );
}

/**
 * A bullet whose lead-in is bold, written as `**Pork** — and anything from it`.
 *
 * Markdown rather than two fields, because the lead-in is part of the sentence
 * and splitting it in the data would make the content file read worse than the
 * screen does.
 */
export function TeachingBulletText({ text }: { text: string }) {
  const match = /^\*\*(.+?)\*\*(.*)$/s.exec(text);
  if (!match) return <>{text}</>;
  return (
    <>
      <ThemedText type="default" style={styles.lead}>
        {match[1]}
      </ThemedText>
      {match[2]}
    </>
  );
}

/**
 * A narration that is on the page but not opened yet.
 *
 * ## Why it does not preview the Arabic
 *
 * The first draft showed the opening words. Every hadith in the corpus opens
 * with its isnad — `حَدَّثَنَا آدَمُ بْنُ أَبِي إِيَاسٍ` is "Adam ibn Abi Iyas narrated
 * to us" — so the preview was a chain of transmitters and none of the saying,
 * which is the least informative part of the text. Truncating right-to-left
 * Arabic with a trailing ellipsis was confusing on top of that.
 *
 * So it shows the reference and says what it is. That is enough to know
 * something is there and to decide to open it, which is the whole job.
 *
 * ## Why it exists at all
 *
 * Ramadan cites twelve texts. At quote weight that page is a wall of Arabic
 * and nobody reads any of it. A long narration or the third citation in one
 * section folds; everything else is printed.
 *
 * This is NOT the old drawer. The drawer gave no hint that anything was inside
 * it, which is how 18 Sahih Muslim citations rendered the wrong narration for
 * months without anyone seeing. This names the collection and the number on
 * the page.
 */
export function TeachingFoldedSource({
  arabic,
  translation,
  reference,
  label,
}: {
  arabic: string;
  translation?: string;
  reference: string;
  label: string;
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  if (open) return <TeachingSource arabic={arabic} translation={translation} reference={reference} />;

  return (
    <Pressable
      onPress={() => setOpen(true)}
      accessibilityRole="button"
      accessibilityLabel={`${label}. ${reference}`}
      style={({ pressed }) => [
        styles.folded,
        { borderColor: theme.border, backgroundColor: pressed ? theme.backgroundSelected : 'transparent' },
      ]}>
      <View style={styles.foldedText}>
        <ThemedText type="caption" themeColor="accent">
          {reference.toUpperCase()}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {label}
        </ThemedText>
      </View>
      <Ionicons name="chevron-down" size={18} color={theme.accent} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  folded: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Teaching.factRow.gap,
    paddingVertical: Spacing.three - 4,
    paddingHorizontal: Teaching.source.paddingH,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
    /*
      The same gap the opened block takes, for two reasons. It is a collapsed
      `TeachingSource`, so anything else makes the page jump on tap — this was
      10 against the opened block's 30. And it ends a section often enough that
      the smaller number left it crowding the next heading.
    */
    marginBottom: Teaching.page.sectionGap,
  },
  foldedText: {
    flex: 1,
    gap: 2,
  },
  bullet: {
    flexDirection: 'row',
    gap: Teaching.bullet.gap,
  },
  bar: {
    width: Teaching.bullet.barWidth,
    borderRadius: Teaching.bullet.barRadius,
  },
  bulletText: {
    flex: 1,
  },
  aside: {
    borderLeftWidth: Teaching.aside.barWidth,
    paddingLeft: Teaching.aside.paddingLeft,
    paddingVertical: Spacing.one,
    /* marginBottom is the `last` prop's — see `TeachingAside`. */
  },
  /*
    One shape for both weights. Same ground, same hairline, same radius, same
    reference line — genuinely one component at two sizes, rather than two
    components that happen to both hold Arabic. Vertical padding and gap come
    from the spec; nothing else varies.
  */
  /*
    A quotation between two rules, not a tinted box.

    Rules top AND bottom here, unlike the stacked blocks on a tab: this sits
    inside running prose as a pull-quote, and a quotation needs framing on
    both sides to read as set apart from the sentences around it. The
    horizontal padding goes with the fill — with no ground to inset from, it
    only pushed the Arabic off the page's measure.
  */
  block: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: Teaching.page.sectionGap,
  },
  /* Direction only. The face and the size are a rung — see `themed-text.tsx`. */
  arabic: {
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  reference: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rule: {
    width: 18,
    height: 1,
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Teaching.factRow.gap,
    minHeight: Teaching.factRow.minHeight,
    paddingVertical: Teaching.factRow.paddingV,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  factLabel: {
    width: Teaching.factRow.labelWidth,
    letterSpacing: 0.4,
  },
  factValue: {
    flex: 1,
  },
  factEmphasis: {
    fontWeight: '700',
  },
  lead: {
    fontWeight: '700',
  },
});
