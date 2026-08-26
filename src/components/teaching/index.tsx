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
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { PressableLink } from '@/components/pressable-link';

import { ThemedText } from '@/components/themed-text';
import { ArabicFont, Radius } from '@/constants/theme';
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
export function TeachingAside({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  return (
    <View style={[styles.aside, { borderLeftColor: theme.border }]}>
      <ThemedText type={Teaching.aside.type} themeColor="textSecondary">
        {children}
      </ThemedText>
    </View>
  );
}

/**
 * A narration or a verse, printed rather than filed.
 *
 * `hero` breaks the page's margins and is the page's answer. `supporting`
 * gets a rule and an indent. **One hero per page** — the treatment stops
 * meaning anything the moment a page has three of them, which is exactly what
 * happened on the first page that cited three verses.
 */
export function TeachingSource({
  arabic,
  translation,
  reference,
  variant = 'supporting',
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
  variant?: 'hero' | 'supporting';
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const hero = variant === 'hero';
  const spec = hero ? Teaching.source.hero : Teaching.source.supporting;

  return (
    <View
      style={[
        hero
          ? [
              styles.hero,
              {
                marginHorizontal: -Teaching.source.hero.bleed,
                paddingHorizontal: Teaching.source.hero.bleed,
                paddingVertical: Teaching.source.hero.paddingV,
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]
          : [
              styles.supporting,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ],
        style,
      ]}>
      <ThemedText
        style={[
          styles.arabic,
          { fontSize: spec.arabicSize, lineHeight: spec.arabicLineHeight },
        ]}>
        {arabic}
      </ThemedText>
      {translation ? (
        <ThemedText
          type={spec.translationType}
          themeColor={hero ? 'text' : 'textSecondary'}>
          {`“${translation}”`}
        </ThemedText>
      ) : null}
      {/*
        Identical in both weights, deliberately.

        The first version varied three things at once between hero and quote —
        the shape, the reference colour, and whether a rule was drawn. Three
        differences do not read as "more important" and "less important"; they
        read as two unrelated components, and Iyad said so immediately.

        A hierarchy varies ONE dimension. Here it is prominence: the hero
        breaks the margins and sets its Arabic larger. Everything else — this
        line included — is the same in both, so the two weights read as one
        component at two sizes.
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
export function TeachingFacts({ facts }: { facts: readonly QuickFact[] }) {
  const theme = useTheme();
  if (facts.length === 0) return null;

  return (
    <View style={{ marginBottom: Teaching.page.sectionGap }}>
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

const styles = StyleSheet.create({
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
    paddingVertical: 4,
    marginBottom: Teaching.page.sectionGap,
  },
  hero: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    gap: 12,
    marginBottom: Teaching.page.sectionGap,
  },
  /*
    The same block as the hero, inset instead of full-bleed. Same ground, same
    hairline, same reference line — one component at two sizes rather than two
    components that happen to both hold Arabic.
  */
  supporting: {
    paddingHorizontal: Teaching.source.supporting.paddingLeft,
    paddingVertical: Teaching.source.hero.paddingV - 6,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 10,
    marginBottom: Teaching.page.sectionGap,
  },
  arabic: {
    fontFamily: ArabicFont,
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
