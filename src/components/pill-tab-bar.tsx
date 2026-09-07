import type { BottomTabBarProps } from 'expo-router/tabs';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

/**
 * The tab bar as a pill — Iyad's reference, implemented 6 Sep 2026.
 *
 * A bordered pill on the page ground, the four doors inside it: mark, serif
 * label, and a short gold rule under the one you are in. The active door is
 * GOLD. That is the one exception to the palette's rule that gold is never
 * a control, and it is his call, made with the rule in front of him: the tab
 * bar is not a control on the page, it is the page's edge, and the mark of
 * where you are is illumination in the manuscript sense. Everything else
 * pressable in the app stays lapis.
 *
 * Inactive doors take the quiet ink of their theme — the light accent by
 * lamplight (the reference's colour), `textSecondary` by day, where the
 * pale lapis has no contrast on parchment.
 *
 * Replaces React Navigation's own bar via `tabBar`, so the navigator still
 * lays screens out above it and nothing scrolls under it. Press handling is
 * the navigator's own: emit `tabPress` first so a screen can prevent it,
 * then navigate.
 */
export function PillTabBar({ state, descriptors, navigation, insets }: BottomTabBarProps) {
  const theme = useTheme();
  const scheme = useColorScheme();
  const quiet = scheme === 'dark' ? theme.accent : theme.textSecondary;

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: theme.background,
          /* The home indicator's room, or the pill's own margin where there is none. */
          paddingBottom: Math.max(insets.bottom, Spacing.two),
        },
      ]}>
      <View style={[styles.pill, { borderColor: theme.border, backgroundColor: theme.backgroundElement }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const focused = state.index === index;
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
          const color = focused ? theme.gold : quiet;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
              accessibilityLabel={options.tabBarAccessibilityLabel ?? label}
              onPress={onPress}
              onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
              style={({ pressed }) => [styles.door, pressed && !focused && styles.doorPressed]}>
              {options.tabBarIcon?.({ focused, color, size: ICON })}
              <ThemedText type="tabLabel" style={{ color }}>
                {label}
              </ThemedText>
              <View style={[styles.rule, focused && { backgroundColor: theme.gold }]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/** 28, not the navigator's 24: the pill gives the marks room, and the reference draws them large. */
const ICON = 28;

const styles = StyleSheet.create({
  bar: {
    paddingTop: Spacing.two,
    paddingHorizontal: Spacing.three,
  },
  pill: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: Radius.large,
  },
  door: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.one,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  doorPressed: {
    opacity: 0.6,
  },
  /* Drawn for every door so nothing moves when the gold arrives; transparent until it does. */
  rule: {
    width: 28,
    height: 3,
    borderRadius: 2,
    marginTop: Spacing.half,
    backgroundColor: 'transparent',
  },
});
