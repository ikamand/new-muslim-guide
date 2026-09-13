import { StyleSheet, View } from 'react-native';
import Svg, { Circle, G, Rect } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import type { TimelineMark } from '@/content/types';
import { useTheme } from '@/hooks/use-theme';
import { Teaching } from '@/constants/teaching';

import { TeachingBulletText } from './index';

/** The spine's width. Marks centre on the first line of `default` text, whose lineHeight is 26. */
const SPINE = 36;
const MARK_Y = 13;

/**
 * Bullets drawn as the night they describe.
 *
 * The marks are the rakʿahs: stacked pairs for night prayer, two then one in
 * gold for shafʿ and witr, and the same two-then-one in outline, below a
 * hairline and off the thread, for praying them before sleep. The thread is
 * the Awqat day page's: a hairline in goldSoft that meets each mark flush,
 * with the mark on a disc of the page's own ground.
 *
 * Iyad, 13 Sep 2026 (docs/night-prayers-accuracy.md Part 2). A drawing that
 * teaches a count is content, and is on the review pile.
 */
export function TeachingTimeline({
  items,
  marks,
  last,
}: {
  items: readonly string[];
  marks: readonly TimelineMark[];
  last?: boolean;
}) {
  const theme = useTheme();
  const lastOnThread = marks.map((mark) => mark !== 'earlier').lastIndexOf(true);

  return (
    <View>
      {items.map((text, index) => {
        const mark = marks[index];
        const onThread = mark !== 'earlier';
        const isLast = index === items.length - 1;
        return (
          <View
            key={text}
            style={[
              styles.row,
              isLast && last ? styles.endsSection : null,
              !onThread ? [styles.detached, { borderTopColor: theme.goldSoft }] : null,
            ]}>
            <View
              style={styles.spine}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants">
              {onThread && index > 0 && (
                <View style={[styles.thread, styles.threadTop, { backgroundColor: theme.goldSoft }]} />
              )}
              {onThread && index < lastOnThread && (
                <View style={[styles.thread, styles.threadBottom, { backgroundColor: theme.goldSoft }]} />
              )}
              <View style={styles.mark}>
                <Mark kind={mark} accent={theme.accent} gold={theme.gold} ground={theme.background} />
              </View>
            </View>
            <ThemedText type="default" style={styles.text}>
              <TeachingBulletText text={text} />
            </ThemedText>
          </View>
        );
      })}
    </View>
  );
}

function Mark({
  kind,
  accent,
  gold,
  ground,
}: {
  kind: TimelineMark;
  accent: string;
  gold: string;
  ground: string;
}) {
  if (kind === 'start') {
    return (
      <Svg width={20} height={20} viewBox="0 0 20 20">
        <Circle cx={10} cy={10} r={8} fill={ground} />
        <Circle cx={10} cy={10} r={5.25} fill="none" stroke={accent} strokeWidth={1.5} />
      </Svg>
    );
  }
  if (kind === 'pairs') {
    return (
      <Svg width={20} height={34} viewBox="0 0 20 34">
        <Rect x={3} y={4} width={14} height={28} rx={7} fill={ground} />
        {[0, 1, 2].map((row) => (
          <G key={row} opacity={1 - row * 0.3}>
            <Circle cx={7} cy={10 + row * 8} r={2} fill={accent} />
            <Circle cx={13} cy={10 + row * 8} r={2} fill={accent} />
          </G>
        ))}
      </Svg>
    );
  }
  const outline = kind === 'earlier';
  return (
    <Svg width={26} height={20} viewBox="0 0 26 20">
      <Rect x={0} y={3} width={26} height={14} rx={7} fill={ground} />
      {[4.5, 10.5, 20.5].map((cx) => (
        <Circle
          key={cx}
          cx={cx}
          cy={10}
          r={2.25}
          fill={outline ? ground : gold}
          stroke={gold}
          strokeWidth={outline ? 1.25 : 0}
        />
      ))}
    </Svg>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingBottom: Teaching.bullet.marginBottom,
  },
  endsSection: {
    paddingBottom: Teaching.page.sectionGap,
  },
  detached: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: Teaching.bullet.marginBottom,
  },
  spine: {
    width: SPINE,
    position: 'relative',
  },
  thread: {
    position: 'absolute',
    left: SPINE / 2,
    width: StyleSheet.hairlineWidth,
  },
  threadTop: {
    top: 0,
    height: MARK_Y,
  },
  threadBottom: {
    top: MARK_Y,
    bottom: 0,
  },
  mark: {
    position: 'absolute',
    top: MARK_Y - 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  text: {
    flex: 1,
  },
});
