import { useKeepAwake } from 'expo-keep-awake';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { RecitationCard } from '@/components/recitation-card';
import { ThemedText } from '@/components/themed-text';
import { getGuide, type Posture } from '@/content';
import { localiseGuide } from '@/i18n/localise';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

const POSTURE_LABEL: Record<Posture, string> = {
  standing: 'Standing',
  bowing: 'Bowing',
  rising: 'Standing',
  prostrating: 'Prostrating',
  sitting: 'Sitting',
  washing: 'At the tap',
};

/**
 * Holds the screen on while it is mounted.
 *
 * A component rather than a call, because the hook cannot be conditional and
 * the setting can. Rendering or not rendering this is how the switch works.
 */
function ScreenAwake() {
  useKeepAwake();
  return null;
}

export default function GuideScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  const { locale } = useLocale();
  const { keepAwake } = useSettings();
  const source = getGuide(id);
  const guide = source ? localiseGuide(source, locale) : undefined;

  if (!guide) {
    return (
      <View style={[styles.missing, { backgroundColor: theme.background }]}>
        <ThemedText type="default">That guide doesn’t exist.</ThemedText>
      </View>
    );
  }

  const step = guide.steps[index];
  const isFirst = index === 0;
  const isLast = index === guide.steps.length - 1;
  const progress = (index + 1) / guide.steps.length;

  const go = (next: number) => {
    setIndex(next);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: guide.title }} />
      {keepAwake && <ScreenAwake />}

      <View style={[styles.progressTrack, { backgroundColor: theme.backgroundElement }]}>
        <View
          style={[styles.progressFill, { width: `${progress * 100}%`, backgroundColor: theme.accent }]}
        />
      </View>

      <ScrollView ref={scrollRef} contentContainerStyle={styles.content}>
        <View style={styles.meta}>
          <View style={[styles.pill, { backgroundColor: theme.accentMuted }]}>
            <ThemedText type="small" themeColor="accent">
              {POSTURE_LABEL[step.posture]}
            </ThemedText>
          </View>
          <ThemedText type="small" themeColor="textSecondary">
            Step {index + 1} of {guide.steps.length}
          </ThemedText>
        </View>

        <ThemedText type="subtitle" style={styles.title}>
          {step.title}
        </ThemedText>

        <ThemedText type="default" style={styles.instruction}>
          {step.instruction}
        </ThemedText>

        {step.says && <RecitationCard recitation={step.says} />}

        {step.note && (
          <View style={[styles.note, { borderLeftColor: theme.accent }]}>
            <ThemedText type="small" themeColor="textSecondary">
              {step.note}
            </ThemedText>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.border }]}>
        <Pressable
          disabled={isFirst}
          onPress={() => go(index - 1)}
          style={({ pressed }) => [
            styles.button,
            styles.secondaryButton,
            {
              borderColor: theme.border,
              backgroundColor: pressed ? theme.backgroundSelected : 'transparent',
              opacity: isFirst ? 0.35 : 1,
            },
          ]}>
          <ThemedText type="smallBold">Back</ThemedText>
        </Pressable>

        <Pressable
          onPress={() => (isLast ? router.back() : go(index + 1))}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
          ]}>
          <ThemedText type="smallBold" themeColor="textOnAccent">
            {isLast ? 'Finish' : 'Next'}
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    height: 3,
    width: '100%',
  },
  progressFill: {
    height: '100%',
  },
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.five,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  pill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.small,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  instruction: {
    lineHeight: 26,
  },
  note: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
  },
  footer: {
    flexDirection: 'row',
    gap: Spacing.two,
    padding: Spacing.three,
    paddingBottom: Spacing.four,
    borderTopWidth: StyleSheet.hairlineWidth,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
  secondaryButton: {
    borderWidth: StyleSheet.hairlineWidth,
  },
});
