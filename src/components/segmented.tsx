import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

export type SegmentedOption<T extends string> = { value: T; label: string };

/**
 * A few choices side by side, one lit: the compact form of a radio list.
 *
 * Built for a prayer's alert, where four stacked rows (Adhan, Sound, Silent,
 * Off) took most of a screen to set one thing (Iyad, 14 Sep 2026). The lit
 * segment wears the practice screen's "on" grammar, lapis on its muted ground,
 * because it is pressable; gold never is.
 */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: {
  options: readonly SegmentedOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  accessibilityLabel?: string;
}) {
  const theme = useTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[styles.track, { borderColor: theme.border }]}>
      {options.map((option, index) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected, checked: selected }}
            style={({ pressed }) => [
              styles.segment,
              index > 0 && { borderLeftWidth: StyleSheet.hairlineWidth, borderLeftColor: theme.border },
              selected && { backgroundColor: theme.accentMuted },
              pressed && !selected && { backgroundColor: theme.backgroundSelected },
            ]}>
            <ThemedText type="smallBold" themeColor={selected ? 'accent' : 'textSecondary'} numberOfLines={1}>
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.rule,
    overflow: 'hidden',
  },
  segment: {
    flex: 1,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.two,
  },
});
