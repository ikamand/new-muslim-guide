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
              {/*
                The label spans the whole door and centres itself, rather than
                shrink-wrapping: a Literata box measured a glyph short cut
                "Today" to "Toda" on Iyad's phone (7 Sep). One line, and the
                system's font scaling capped, so four doors still fit a
                320-wide screen at the largest accessibility sizes.
              */}
              <ThemedText
                type="tabLabel"
                numberOfLines={1}
                maxFontSizeMultiplier={1.2}
                style={[styles.label, { color }]}>
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

/** The navigator's own 24: at 28 the bar stood too tall on the phone (Iyad, 7 Sep). */
const ICON = 24;

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
  /* 8 + 24 + 2 + 18 + 2 + 2 + 8: a 64-point pill, down from 83. */
  door: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.half,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.two,
    paddingHorizontal: Spacing.half,
  },
  label: {
    alignSelf: 'stretch',
    textAlign: 'center',
  },
  doorPressed: {
    opacity: 0.6,
  },
  /* Drawn for every door so nothing moves when the gold arrives; transparent until it does. */
  rule: {
    width: 24,
    height: 2,
    borderRadius: 1,
    marginTop: Spacing.half,
    backgroundColor: 'transparent',
  },
});
