import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * One option in a single-choice question.
 *
 * Selection is shown three ways at once — a filled mark where an empty ring
 * was, a heavier accent border, and a tinted background — because colour alone
 * is not a state anyone can rely on. The ring is the one that does the real
 * work: it changes shape, so it survives greyscale, low contrast and colour
 * blindness.
 *
 * `radio` rather than `button` for the role: a screen reader should say "2 of
 * 4, selected", which is the whole question in three words, and it cannot say
 * that about a button.
 */
export function ChoiceCard({
  label,
  help,
  selected,
  onPress,
  index,
  total,
}: {
  label: string;
  help?: string;
  selected: boolean;
  onPress: () => void;
  index: number;
  total: number;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      // Both spellings on purpose. `accessibilityState` is what iOS and
      // Android read; react-native-web 0.21 does not map it to ARIA on a
      // Pressable, so without `aria-checked` a screen reader on the web
      // announces four radios and never says which one is chosen. Caught by
      // reading the rendered attributes rather than by looking at it.
      accessibilityState={{ selected, checked: selected }}
      aria-checked={selected}
      accessibilityLabel={label}
      accessibilityHint={help}
      accessibilityValue={{ text: `${index} / ${total}` }}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: selected
            ? theme.accentMuted
            : pressed
              ? theme.backgroundSelected
              : theme.backgroundElement,
          borderColor: selected ? theme.accent : theme.border,
          borderWidth: selected ? 2 : StyleSheet.hairlineWidth,
          // Keep the text still when the border thickens.
          padding: selected ? Spacing.four - 2 : Spacing.four,
        },
      ]}>
      <View style={styles.text}>
        <ThemedText type="smallBold" style={styles.label}>
          {label}
        </ThemedText>
        {help && (
          <ThemedText type="small" themeColor="textSecondary">
            {help}
          </ThemedText>
        )}
        {/*
          Said aloud by a screen reader and never seen: the ring and the border
          carry it visually, and a "Selected" caption under every chosen answer
          would be noise on a screen that is trying to feel calm.
        */}
        {selected && (
          <ThemedText
            type="small"
            themeColor="accent"
            accessibilityElementsHidden
            style={styles.hiddenLabel}>
            {t('onboarding.selected')}
          </ThemedText>
        )}
      </View>

      <View
        style={[
          styles.mark,
          {
            borderColor: selected ? theme.accent : theme.border,
            backgroundColor: selected ? theme.accent : 'transparent',
          },
        ]}>
        {selected && <Ionicons name="checkmark" size={16} color={theme.textOnAccent} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 64,
    borderRadius: Radius.medium,
  },
  text: {
    flex: 1,
    gap: 2,
  },
  label: {
    fontSize: 17,
    lineHeight: 24,
  },
  hiddenLabel: {
    height: 0,
    opacity: 0,
  },
  mark: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
