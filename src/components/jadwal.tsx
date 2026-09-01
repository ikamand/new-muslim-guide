import { type ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

import type { Href } from 'expo-router';

/**
 * Jadwal — the manuscript grammar, as components.
 *
 * `jadwal` is the ruled frame a scribe drew around a text block. The name is
 * borrowed for the whole set because the frame is the idea: the page is the
 * container, so a screen separates its parts with rules and space rather than
 * by putting each one in a box.
 *
 * ## What this replaces
 *
 * `{ backgroundColor: theme.backgroundElement, borderColor: theme.border }`,
 * typed inline in 33 files. A uniform rounded rectangle with a hairline
 * border, repeated, is the visual signature of a component library rather
 * than a design — and 33 copies of it meant no single place could change it.
 *
 * ## The rules these keep
 *
 * - **Gold is illumination, never a control.** `Rule`, `Unwan`, `Shelf` and
 *   `Rosette` are gold. `Action` is lapis. If something gold is tappable,
 *   that is a bug in the usage, not a style choice.
 * - **Numerals are Latin, not Arabic-Indic.** A mushaf would set `١`, and the
 *   first draft of this did. The reader here cannot read Arabic yet — that is
 *   the whole premise of the app — so a numeral they cannot parse is ornament
 *   wearing the costume of information.
 * - **Nothing here sets a font size.** Every rung comes from
 *   `themed-text.tsx`, including the Arabic ones, because Amiri stacks marks
 *   above the line and a line-height set by eye collides on a device.
 */

/* ─────────────────────────────────────────────────────────────
   Rules
   ───────────────────────────────────────────────────────────── */

/**
 * The hairline that separates one thing from the next.
 *
 * `goldSoft` rather than `border`: a rule on a page is a drawn line, and it
 * should read as the faintest member of the gold family rather than as a grey
 * borrowed from a form.
 */
export function Rule({ style }: { style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();
  return <View style={[styles.hair, { backgroundColor: theme.goldSoft }, style]} />;
}

/**
 * The double rule — thick over hair — that opens and closes a panel.
 *
 * Two weights rather than one, because a single line is a divider and a pair
 * is a frame. This is the mark that says "a page starts here".
 */
export function DoubleRule() {
  const theme = useTheme();
  return (
    <View style={styles.doubleRule}>
      <View style={[styles.doubleTop, { backgroundColor: theme.gold }]} />
      <View style={[styles.hair, { backgroundColor: theme.goldSoft }]} />
    </View>
  );
}

/* ─────────────────────────────────────────────────────────────
   Headings
   ───────────────────────────────────────────────────────────── */

/**
 * An ʿunwān — the illuminated headpiece that opens a chapter.
 *
 * It replaces a screen's title-plus-caption block. The difference is not
 * decoration: a heading floating above a gap reads as the first item in a
 * list, and a panel between two rules reads as the thing the page is called.
 */
export function Unwan({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View>
      <DoubleRule />
      <View style={styles.unwanBody}>
        <ThemedText type="subtitle" style={styles.centred}>
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText type="small" themeColor="textSecondary" style={styles.centred}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      <DoubleRule />
    </View>
  );
}

/**
 * The frame itself — the jadwal drawn at last.
 *
 * Every component in this file borrows the name of the ruled frame a scribe
 * draws around a text block, and until the written-page Learn tab nothing
 * ever drew one. This is it: a gold rule outside, a hair rule inside, the
 * text block within. What sits inside the frame is the path; what sits
 * outside is commentary — that edge is the whole information architecture.
 */
export function Frame({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <View style={[styles.frame, { borderColor: theme.gold }]}>
      <View style={[styles.frameIn, { borderColor: theme.goldSoft }]}>{children}</View>
    </View>
  );
}

/**
 * A shelf heading — a rule with the name set into it.
 *
 * The Learn tab's groups were `sectionTitle` floating above a gap, which is
 * why fifty topics on six shelves scanned as one list. A name inside the rule
 * divides the page whether or not anybody reads it.
 */
export function Shelf({ label, count }: { label: string; count?: number }) {
  const theme = useTheme();
  return (
    <View style={styles.shelf}>
      <View style={[styles.hair, styles.shelfRule, { backgroundColor: theme.goldSoft }]} />
      <ThemedText type="caption" themeColor="gold" style={styles.shelfLabel}>
        {label}
      </ThemedText>
      <View style={[styles.hair, styles.shelfRule, { backgroundColor: theme.goldSoft }]} />
      {count !== undefined ? (
        <ThemedText type="caption" themeColor="textSecondary">
          {count}
        </ThemedText>
      ) : null}
    </View>
  );
}

/* ─────────────────────────────────────────────────────────────
   Marginalia
   ───────────────────────────────────────────────────────────── */

/**
 * A gold rosette carrying a number, for the margin.
 *
 * In a mushaf this marks where an ayah ends. Here it carries whatever number
 * the row is — the entry within its shelf, the step within its guide — and it
 * exists so that numbers leave the text block, which is the single change
 * that does most to stop a list looking like a list of cards.
 *
 * The numeral is drawn as real text over the SVG rather than as `<Text>`
 * inside it: font resolution inside `react-native-svg` is unreliable across
 * platforms, and this way the numeral takes the app's own type scale.
 */
export function Rosette({ label, size = 26 }: { label: string; size?: number }) {
  const theme = useTheme();

  return (
    <View style={[styles.rosette, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 30 30" fill="none" style={StyleSheet.absoluteFill}>
        <Circle cx="15" cy="15" r="11" stroke={theme.gold} strokeWidth={0.9} />
        <Circle cx="15" cy="15" r="8.1" stroke={theme.goldSoft} strokeWidth={0.6} />
        <Path d="M15 1.4 L16.8 5.6 L13.2 5.6 Z" fill={theme.gold} />
        <Path d="M15 28.6 L16.8 24.4 L13.2 24.4 Z" fill={theme.gold} />
        <Path d="M1.4 15 L5.6 16.8 L5.6 13.2 Z" fill={theme.gold} />
        <Path d="M28.6 15 L24.4 16.8 L24.4 13.2 Z" fill={theme.gold} />
      </Svg>
      <ThemedText type="caption" themeColor="gold">
        {label}
      </ThemedText>
    </View>
  );
}

/* ─────────────────────────────────────────────────────────────
   Rows
   ───────────────────────────────────────────────────────────── */

/**
 * One ruled entry.
 *
 * A row rather than a card: `marginal` sits outside the text, the title and
 * meta stack, and `trailing` is whatever the row ends in — a chevron, an
 * Arabic name, a duration. The rule underneath is the only edge it has.
 */
export function JadwalRow({
  href,
  marginal,
  kicker,
  title,
  meta,
  trailing,
  progress,
  accessibilityLabel,
}: {
  href: Href;
  /** Usually a `Rosette`, or nothing where the row is not one of a series. */
  marginal?: ReactNode;
  /**
   * Why the row is here, in a word.
   *
   * Gold, not vermilion. The first build made this a `Rubric` and Today then
   * carried two reds — the duʿa's reason and this — which is exactly the
   * dilution the rubric rule exists to prevent. Red stays for the card that
   * chose something and for a caution; a row saying which shelf it came from
   * is illumination.
   */
  kicker?: string;
  title: string;
  meta?: string;
  trailing?: ReactNode;
  /**
   * How far through this the reader got before leaving, 0..1.
   *
   * Drawn as a gold rule along the row's foot, sitting on the separator that
   * is already there. A bookmark, not a score: it says where you stopped, and
   * says nothing at all when you have not started.
   */
  progress?: number;
  accessibilityLabel?: string;
}) {
  const theme = useTheme();

  return (
    <PressableLink
      href={href}
      accessibilityLabel={accessibilityLabel ?? `${title}${meta ? `. ${meta}` : ''}`}
      style={[
        styles.row,
        /*
          Kicker rows halve their top padding: the uppercase caption carries
          its own headroom, and where a bookmark anchors the bottom edge a
          full pad above the kicker pressed as a blank band (Iyad's held
          screenshots, 31 Aug).
        */
        kicker ? styles.rowWithKicker : null,
        { borderBottomColor: theme.goldSoft },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      {marginal ? <View style={styles.rowMarginal}>{marginal}</View> : null}
      <View style={styles.rowText}>
        {kicker ? (
          <ThemedText type="caption" themeColor="gold" style={styles.kicker}>
            {kicker}
          </ThemedText>
        ) : null}
        <ThemedText type="cardTitle">{title}</ThemedText>
        {meta ? (
          <ThemedText type="small" themeColor="textSecondary">
            {meta}
          </ThemedText>
        ) : null}
      </View>
      {trailing ? <View style={styles.rowTrailing}>{trailing}</View> : null}
      {progress !== undefined && progress > 0 ? (
        <View
          style={[
            styles.bookmark,
            { width: `${Math.round(progress * 100)}%`, backgroundColor: theme.gold },
          ]}
        />
      ) : null}
    </PressableLink>
  );
}

/**
 * A quiet ruled line — a link with no title weight and no marginal.
 *
 * For the things a tab offers without recommending: "Your firsts", "You were
 * reading". They were `small` text rows with an arrow; here they are the same
 * rule as everything else, which is what stops a screen having two kinds of
 * separator doing the same job.
 */
export function QuietRow({
  href,
  label,
  value,
  strong = false,
  accessibilityLabel,
}: {
  href: Href;
  label: string;
  value?: string;
  /**
   * Body-size type instead of small. For the quiet row that is a whole
   * destination rather than a side door — Settings on Today earns it: it is
   * the only way to a screen, and small read as an afterthought (Iyad).
   * Still textSecondary; louder would stop being quiet.
   */
  strong?: boolean;
  accessibilityLabel?: string;
}) {
  const theme = useTheme();

  return (
    <PressableLink
      href={href}
      accessibilityLabel={accessibilityLabel ?? `${label}${value ? `: ${value}` : ''}`}
      style={[styles.quiet, { borderBottomColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <ThemedText type={strong ? 'default' : 'small'} themeColor="textSecondary">
        {label}
      </ThemedText>
      {value ? (
        <ThemedText type="small" numberOfLines={1} style={styles.quietValue}>
          {value}
        </ThemedText>
      ) : null}
    </PressableLink>
  );
}

/* ─────────────────────────────────────────────────────────────
   Marks
   ───────────────────────────────────────────────────────────── */

/**
 * A rubric — the red note about the text, never the text.
 *
 * Red ink in a manuscript marks a stop, a section, an instruction: the
 * apparatus around the words rather than the words. Here it carries why a
 * card chose what it chose ("Always worth saying"), and which window is open
 * ("Open now"). It is the rarest colour in the app on purpose.
 */
export function Rubric({ label, align = 'center' }: { label: string; align?: 'left' | 'center' }) {
  return (
    <ThemedText
      type="caption"
      themeColor="vermilion"
      style={[styles.rubric, align === 'center' ? styles.centred : null]}>
      {label}
    </ThemedText>
  );
}

/**
 * The one pressable thing on a screen.
 *
 * Lapis, because gold is illumination and never a control. On the dark ground
 * it also takes a gold hairline: a lapis bar on a lapis page has no edge of
 * its own, and `actionRule` is the same colour as the bar in light so the
 * border costs nothing there.
 */
export function Action({
  href,
  label,
  meta,
  accessibilityLabel,
}: {
  href: Href;
  label: string;
  /** A count or a duration, subordinate to the label. */
  meta?: string;
  accessibilityLabel?: string;
}) {
  const theme = useTheme();

  return (
    <PressableLink
      href={href}
      accessibilityLabel={accessibilityLabel ?? `${label}${meta ? `. ${meta}` : ''}`}
      style={[styles.action, { backgroundColor: theme.action, borderColor: theme.actionRule }]}
      pressedStyle={{ opacity: 0.85 }}>
      <ThemedText type="smallBold" themeColor="onAction">
        {label}
      </ThemedText>
      {meta ? (
        <ThemedText type="small" themeColor="onAction" style={styles.actionMeta}>
          {meta}
        </ThemedText>
      ) : null}
    </PressableLink>
  );
}

const styles = StyleSheet.create({
  hair: {
    height: StyleSheet.hairlineWidth,
  },
  doubleRule: {
    gap: Spacing.half,
  },
  doubleTop: {
    height: 1,
  },
  unwanBody: {
    paddingVertical: Spacing.three,
    gap: Spacing.one,
  },
  centred: {
    textAlign: 'center',
  },
  frame: {
    borderWidth: 1,
    padding: Spacing.one,
  },
  frameIn: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
  },
  shelf: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  shelfRule: {
    flex: 1,
  },
  shelfLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  rosette: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowWithKicker: {
    paddingTop: Spacing.two,
  },
  rowMarginal: {
    alignItems: 'center',
  },
  rowText: {
    flex: 1,
    minWidth: 0,
    gap: Spacing.half,
  },
  rowTrailing: {
    alignItems: 'flex-end',
  },
  bookmark: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 1.5,
  },
  quiet: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    minHeight: 44,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  quietValue: {
    flexShrink: 1,
  },
  kicker: {
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  rubric: {
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.half,
    minHeight: 52,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.rule,
    borderWidth: StyleSheet.hairlineWidth,
  },
  actionMeta: {
    opacity: 0.72,
  },
});
