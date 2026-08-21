import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { JourneyProgress } from '@/components/journey-progress';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useJourney, type ResolvedStep } from '@/hooks/use-journey';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';

/**
 * The six stages, and where you are in them.
 *
 * Every stage is open from the first launch. There is no lock, no "complete
 * the previous stage", and no ordering enforced — someone who became Muslim
 * last night and has to pray in an hour goes straight to Your first days, and
 * the app must not stand in front of that with a syllabus.
 */

/** The next lesson anywhere, offered once at the top rather than in every card. */
function ContinueCard({ step }: { step: ResolvedStep }) {
  const theme = useTheme();
  const { t } = useLocale();
  const label = step.labelKey ? t(step.labelKey as UIKey) : step.entry.title;

  return (
    <PressableLink
      href={routeFor(step.entry)}
      accessibilityLabel={`${t('journey.continue')}: ${label}`}
      style={[styles.continue, { backgroundColor: theme.accent }]}
      pressedStyle={{ opacity: 0.9 }}>
      <View style={styles.continueText}>
        <ThemedText type="small" themeColor="textOnAccent" style={styles.continueKicker}>
          {t('journey.continue')}
        </ThemedText>
        <ThemedText type="smallBold" themeColor="textOnAccent" style={styles.continueTitle}>
          {label}
        </ThemedText>
      </View>
      <Ionicons name="arrow-forward" size={20} color={theme.textOnAccent} />
    </PressableLink>
  );
}

export default function JourneyScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { stages, done, total, next } = useJourney();

  return (
    <>
      <Stack.Screen options={{ title: t('journey.title') }} />
      <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('journey.intro')}
        </ThemedText>
        <JourneyProgress done={done} total={total} />
      </View>

      {next && <ContinueCard step={next} />}

      <View style={styles.stages}>
        {stages.map((stage) => (
          <PressableLink
            key={stage.id}
            href={{ pathname: '/journey/[stage]', params: { stage: stage.id } }}
            accessibilityLabel={`${t(`journey.stage.${stage.id}` as UIKey)}. ${t('journey.progress')
              .replace('{done}', String(stage.done))
              .replace('{total}', String(stage.total))}`}
            style={[
              styles.stage,
              {
                backgroundColor: theme.backgroundElement,
                borderColor: stage.done === stage.total ? theme.accent : theme.border,
              },
            ]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.stageText}>
              <View style={styles.stageTitleRow}>
                <ThemedText type="cardTitle">
                  {t(`journey.stage.${stage.id}` as UIKey)}
                </ThemedText>
                {/*
                  A tick as well as the accent border, so a finished stage is
                  not distinguished by colour alone.
                */}
                {stage.done === stage.total && (
                  <Ionicons name="checkmark-circle" size={18} color={theme.accent} />
                )}
              </View>
              <ThemedText type="small" themeColor="textSecondary">
                {t(`journey.stage.${stage.id}.help` as UIKey)}
              </ThemedText>
              <View style={styles.stageProgress}>
                <JourneyProgress done={stage.done} total={stage.total} />
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </PressableLink>
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
  continue: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 64,
    padding: Spacing.three,
    borderRadius: Radius.medium,
  },
  continueText: {
    flex: 1,
    gap: 2,
  },
  continueKicker: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    opacity: 0.8,
  },
  continueTitle: {
  },
  stages: {
    gap: Spacing.two,
  },
  stage: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  stageText: {
    flex: 1,
    gap: Spacing.one,
  },
  stageTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  stageProgress: {
    paddingTop: Spacing.one,
  },
});
