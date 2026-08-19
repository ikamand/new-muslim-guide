import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * The frame every onboarding step sits in.
 *
 * One component so the four screens cannot drift: the same progress row in the
 * same place, the same footer, the same rules about what is reachable. Someone
 * being asked a second question should not have to re-learn where the controls
 * are.
 *
 * The footer is pinned rather than scrolled. A long option list in French can
 * push a scrolled Continue below the fold, and a button you have to go looking
 * for is a button some people will not find.
 */
export function StepFrame({
  step,
  total,
  title,
  children,
  onBack,
  onSkip,
  onContinue,
  continueLabel,
  continueDisabled = false,
  contentStyle,
}: {
  step: number;
  total: number;
  title: string;
  children: React.ReactNode;
  /** Absent on the first step — there is nowhere behind it. */
  onBack?: () => void;
  /** Absent on the last step, where the only thing left is to begin. */
  onSkip?: () => void;
  onContinue: () => void;
  continueLabel: string;
  continueDisabled?: boolean;
  contentStyle?: ViewStyle;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  const stepLabel = t('onboarding.step')
    .replace('{n}', String(step))
    .replace('{total}', String(total));

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={styles.frame}>
        <View style={styles.top}>
          {/*
            The bar and the sentence say the same thing. The sentence is what a
            screen reader announces; the bar is what everyone else reads without
            noticing they read it.
          */}
          <View
            style={styles.progress}
            accessibilityRole="progressbar"
            accessibilityLabel={stepLabel}
            accessibilityValue={{ min: 1, max: total, now: step }}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-valuenow={step}>
            {Array.from({ length: total }, (_, index) => (
              <View
                key={index}
                style={[
                  styles.segment,
                  { backgroundColor: index < step ? theme.accent : theme.border },
                ]}
              />
            ))}
          </View>

          <View style={styles.topRow}>
            <ThemedText type="small" themeColor="textSecondary" accessibilityElementsHidden>
              {stepLabel}
            </ThemedText>
            {onSkip && (
              <Pressable
                onPress={onSkip}
                accessibilityRole="button"
                accessibilityLabel={t('onboarding.skip')}
                style={({ pressed }) => [styles.skip, { opacity: pressed ? 0.6 : 1 }]}>
                <ThemedText type="smallBold" themeColor="textSecondary">
                  {t('onboarding.skip')}
                </ThemedText>
              </Pressable>
            )}
          </View>
        </View>

        <ScrollView
          contentContainerStyle={[styles.content, contentStyle]}
          keyboardShouldPersistTaps="handled">
          <ThemedText type="subtitle" accessibilityRole="header" style={styles.title}>
            {title}
          </ThemedText>
          {children}
        </ScrollView>

        <View style={[styles.footer, { borderTopColor: theme.border }]}>
          {onBack && (
            <Pressable
              onPress={onBack}
              accessibilityRole="button"
              accessibilityLabel={t('onboarding.back')}
              style={({ pressed }) => [
                styles.back,
                { borderColor: theme.border, opacity: pressed ? 0.6 : 1 },
              ]}>
              <Ionicons name="arrow-back" size={18} color={theme.text} />
              <ThemedText type="smallBold">{t('onboarding.back')}</ThemedText>
            </Pressable>
          )}

          <Pressable
            onPress={onContinue}
            disabled={continueDisabled}
            accessibilityRole="button"
            accessibilityLabel={continueLabel}
            accessibilityState={{ disabled: continueDisabled }}
            aria-disabled={continueDisabled}
            style={({ pressed }) => [
              styles.continue,
              {
                backgroundColor: continueDisabled ? theme.backgroundSelected : theme.accent,
                opacity: pressed && !continueDisabled ? 0.85 : 1,
              },
            ]}>
            <ThemedText
              type="smallBold"
              themeColor={continueDisabled ? 'textSecondary' : 'textOnAccent'}
              style={styles.continueLabel}>
              {continueLabel}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  top: {
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
  progress: {
    flexDirection: 'row',
    gap: Spacing.one,
  },
  segment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
  },
  skip: {
    justifyContent: 'center',
    minHeight: 44,
    paddingLeft: Spacing.three,
  },
  content: {
    padding: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.five,
    gap: Spacing.four,
  },
  title: {
    fontSize: 28,
    lineHeight: 36,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.four,
    paddingTop: Spacing.three,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    minHeight: 52,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  continue: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: Spacing.four,
    borderRadius: Radius.small,
  },
  continueLabel: {
    fontSize: 17,
    lineHeight: 24,
  },
});
