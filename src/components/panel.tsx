import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

/**
 * A framed panel: the double rule, with the section's name set into the top
 * rule beside its mark, and its current state after the name. The legend
 * sits on a patch of page colour so the rule passes behind it.
 *
 * Settings' grammar (Iyad, 11 Sep 2026), shared since 14 Sep 2026 so a
 * prayer's alert page is the same room as the door that leads to it.
 */
export function Panel({
  mark,
  title,
  state,
  children,
}: {
  mark: ReactNode;
  title: string;
  state?: string;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <View style={styles.panelWrap}>
      <View style={[styles.panel, { borderColor: theme.gold }]}>
        <View style={[styles.panelIn, { borderColor: theme.goldSoft }]}>{children}</View>
      </View>
      <View style={[styles.legend, { backgroundColor: theme.background }]}>
        {mark}
        <ThemedText type="caption" themeColor="gold" style={styles.legendTitle}>
          {title}
        </ThemedText>
        {state ? (
          <ThemedText type="caption" themeColor="textSecondary" numberOfLines={1}>
            · {state}
          </ThemedText>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  /* The frame: the fihrist's double rule, with room above for the legend. */
  panelWrap: {
    position: 'relative',
  },
  panel: {
    borderWidth: 1,
    padding: Spacing.one,
  },
  panelIn: {
    borderWidth: StyleSheet.hairlineWidth,
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: Spacing.one,
  },
  /* Set into the top rule: half the caption's height above it, half below. */
  legend: {
    position: 'absolute',
    top: -8,
    left: Spacing.three,
    maxWidth: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.two,
  },
  legendTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1.6,
  },
});
