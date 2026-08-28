import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { STAGE_IDS, type StageId } from '@/content/journey';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useJourney, type ResolvedStep } from '@/hooks/use-journey';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';

/**
 * One stage, as a list of lessons.
 *
 * The row opens the lesson; the circle at its end marks it done. Two targets
 * rather than one because they are two different intentions, and a beginner
 * who taps a lesson to read it should never find they have silently ticked it
 * off instead.
 */

function LessonRow({ step }: { step: ResolvedStep }) {
  const theme = useTheme();
  const { t } = useLocale();
  const { toggleLesson } = useSettings();

  const label = step.labelKey ? t(step.labelKey as UIKey) : step.entry.title;

  return (
    <View style={[styles.row, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}>
      {/*
        `rowMain` carries `flex: 1` and the row's padding. Both were being
        dropped on every platform because the style was a function — see
        `PressableLink`, which is where that is now handled once.
      */}
      <PressableLink
        href={routeFor(step.entry)}
        accessibilityLabel={`${label}. ${step.entry.shortDescription}`}
        style={styles.rowMain}
        pressedStyle={{ opacity: 0.6 }}>
        <View style={styles.rowText}>
          <ThemedText type="smallBold" style={styles.rowTitle}>
            {label}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {step.entry.shortDescription}
          </ThemedText>
          <View style={[styles.chip, { backgroundColor: theme.accentMuted }]}>
            <ThemedText type="smallBold" themeColor="accent" style={styles.chipText}>
              {t(`journey.requirement.${step.requirement}` as UIKey)}
            </ThemedText>
          </View>
        </View>
      </PressableLink>

      <Pressable
        onPress={() => toggleLesson(step.key)}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: step.done }}
        aria-checked={step.done}
        accessibilityLabel={step.done ? t('journey.markNotDone') : t('journey.markDone')}
        style={({ pressed }) => [styles.toggle, { opacity: pressed ? 0.6 : 1 }]}>
        <View
          style={[
            styles.mark,
            {
              borderColor: step.done ? theme.accent : theme.border,
              backgroundColor: step.done ? theme.accent : 'transparent',
            },
          ]}>
          {step.done && <Ionicons name="checkmark" size={16} color={theme.textOnAccent} />}
        </View>
      </Pressable>
    </View>
  );
}

export default function StageScreen() {
  const { stage: stageParam } = useLocalSearchParams<{ stage: string }>();
  const { t } = useLocale();
  const { stages } = useJourney();

  const id = (STAGE_IDS as readonly string[]).includes(stageParam ?? '')
    ? (stageParam as StageId)
    : undefined;
  const stage = id ? stages.find((entry) => entry.id === id) : undefined;

  // An unknown stage id — a stale deep link, a typo — shows the journey rather
  // than an error. There is nothing here a user could have done wrong.
  if (!stage) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('journey.intro')}
        </ThemedText>
      </ScrollView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: t(`journey.stage.${stage.id}` as UIKey) }} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="default" themeColor="textSecondary">
            {t(`journey.stage.${stage.id}.help` as UIKey)}
          </ThemedText>
        </View>

        <View style={styles.list}>
          {stage.steps.map((step) => (
            <LessonRow key={step.key} step={step} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.three,
  },
  list: {
    gap: Spacing.two,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  rowMain: {
    flex: 1,
    padding: Spacing.three,
  },
  rowText: {
    gap: Spacing.one,
    // No `alignItems: flex-start` here. It sizes the Text children to their
    // content instead of the row, so a long French subtitle stopped wrapping
    // and pushed the whole row past the screen edge, clipping the checkbox.
    // The chip gets `alignSelf` instead, which was the only reason it was here.
  },
  rowTitle: {
  },
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: Radius.small,
    marginTop: Spacing.one,
  },
  chipText: {
    fontSize: 12,
    lineHeight: 18,
  },
  toggle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    alignSelf: 'stretch',
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
