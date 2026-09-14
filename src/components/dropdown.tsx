import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import { Modal, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

export type DropdownOption<T> = {
  value: T;
  label: string;
  /** What the closed box shows, where the full label would push its row's name onto three lines. */
  short?: string;
};

const OPTION_HEIGHT = 44;
const MIN_MENU_WIDTH = 240;

/**
 * The current choice in a small box; tap it and the choices open over the
 * page, anchored to it, and close again on a choice or a tap elsewhere.
 *
 * Asked for by name for the Pre-Adhan reminder (Iyad, 14 Sep 2026): five
 * lead times had been five ruled rows under the prayer. The menu opens below
 * the box, or above it when there is no room below, and never past the
 * screen's edge.
 */
export function Dropdown<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  /** What the choice is, for a screen reader. */
  label: string;
  options: readonly DropdownOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const anchor = useRef<View>(null);
  const [frame, setFrame] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  const chosen = options.find((option) => option.value === value);
  const current = chosen?.label ?? '';
  const shown = chosen?.short ?? current;
  const close = () => setFrame(null);
  const open = () => anchor.current?.measureInWindow((x, y, width, height) => setFrame({ x, y, width, height }));

  const menuHeight = options.length * OPTION_HEIGHT + Spacing.one * 2;
  const menuWidth = Math.max(frame?.width ?? 0, MIN_MENU_WIDTH);
  const roomBelow = frame ? frame.y + frame.height + Spacing.one + menuHeight < windowHeight - Spacing.four : true;
  const menuLeft = frame
    ? Math.max(Spacing.three, Math.min(frame.x + frame.width - menuWidth, windowWidth - menuWidth - Spacing.three))
    : 0;
  const menuTop = frame
    ? roomBelow
      ? frame.y + frame.height + Spacing.one
      : frame.y - menuHeight - Spacing.one
    : 0;

  return (
    <>
      <View ref={anchor} collapsable={false}>
        <Pressable
          onPress={open}
          accessibilityRole="button"
          accessibilityLabel={`${label}: ${current}`}
          accessibilityState={{ expanded: frame !== null }}
          style={({ pressed }) => [
            styles.trigger,
            { borderColor: theme.border },
            pressed && { backgroundColor: theme.backgroundSelected },
          ]}>
          <ThemedText type="default" numberOfLines={1} style={styles.triggerText}>
            {shown}
          </ThemedText>
          <Ionicons name="chevron-down" size={16} color={theme.accent} />
        </Pressable>
      </View>

      <Modal visible={frame !== null} transparent animationType="fade" statusBarTranslucent onRequestClose={close}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel={t('dropdown.close')}
        />
        {frame && (
          <View
            style={[
              styles.menu,
              {
                top: menuTop,
                left: menuLeft,
                width: menuWidth,
                backgroundColor: theme.backgroundElement,
                borderColor: theme.border,
              },
            ]}>
            {options.map((option, index) => {
              const selected = option.value === value;
              return (
                <Pressable
                  key={String(option.value)}
                  onPress={() => {
                    onChange(option.value);
                    close();
                  }}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected }}
                  style={({ pressed }) => [
                    styles.option,
                    index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.border },
                    pressed && { backgroundColor: theme.backgroundSelected },
                  ]}>
                  <ThemedText
                    type="default"
                    themeColor={selected ? 'accent' : 'text'}
                    numberOfLines={1}
                    style={styles.optionText}>
                    {option.label}
                  </ThemedText>
                  {selected ? <Ionicons name="checkmark" size={18} color={theme.accent} /> : null}
                </Pressable>
              );
            })}
          </View>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  /* Tight at the sides: "Pre-Adhan reminder" beside "10 min" needs every point of a 360-wide row. */
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    minHeight: 40,
    paddingHorizontal: Spacing.two,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.rule,
  },
  triggerText: {
    flexShrink: 1,
  },
  menu: {
    position: 'absolute',
    paddingVertical: Spacing.one,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.rule,
    elevation: 6,
  },
  optionText: {
    flexShrink: 1,
  },
  option: {
    height: OPTION_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
  },
});
