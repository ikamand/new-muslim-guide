import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useJourney } from '@/hooks/use-journey';
import { useLocale } from '@/hooks/use-locale';
import { useObservations } from '@/hooks/use-observations';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';

/**
 * The end of a lesson: a tap that says you finished it, and where to go next.
 *
 * ## Why a tap and not a scroll
 *
 * This replaces a scroll handler that inferred "read" from reaching the bottom
 * of the page, and the inference was wrong on the platform most of these
 * readers are on. `scrollEventThrottle` gates `ScrollEventType.SCROLL` on
 * Android and nothing else emits a SCROLL at rest — see
 * `ReactScrollViewHelper.kt`, `emitScrollEvent` — so the last event the app
 * saw could be a quarter-second of travel short of the end, and no later one
 * ever corrected it. iOS fires a final event only after DECELERATION, so a
 * careful drag that stops without a fling misses there too; only web was
 * reliable, because react-native-web keeps a 100ms scroll-end timer of its
 * own. Three platforms, three behaviours, three workarounds.
 *
 * A control at the END of the article carries the same evidence with none of
 * the inference: you cannot press it without having got there. It also cannot
 * mistake somebody skimming to the bottom to see how long the page is for
 * somebody who read it.
 *
 * ⚠️ **This under-counts on purpose.** A reader who finishes and taps Back
 * gets no mark. That is the honest direction to be wrong in — the app never
 * claims you read something you did not — and it is why `observations` still
 * records every page that was OPENED, which is a fact rather than a guess.
 *
 * ## Why it is also the way onward
 *
 * The bottom of a reference article used to be a dead end: no next step, no
 * onward move, nothing but the back button. Making the primary action both
 * mark this lesson and open the next one means the tap that records progress
 * is the tap the reader wanted anyway. A button that only does bookkeeping is
 * a chore and gets skipped; this one is the path of least resistance.
 */
export function LessonEnd({ lessonKey }: { lessonKey: string }) {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLocale();
  const { completedLessons, completeLesson, toggleLesson } = useSettings();
  const { finish } = useObservations();
  const { after } = useJourney();

  const done = completedLessons.includes(lessonKey);
  const next = after(lessonKey);
  const nextLabel = next
    ? next.labelKey
      ? t(next.labelKey as UIKey)
      : next.entry.title
    : undefined;

  /*
    `completeLesson` says THAT it is done; `finish` says WHEN, and keeps saying
    it on a second reading. Competence is a question about dates — see
    `lib/competence.ts` — and a set of keys cannot answer it.
  */
  const mark = () => {
    completeLesson(lessonKey);
    finish(lessonKey);
  };

  const markAndGo = () => {
    mark();
    if (next) router.push(routeFor(next.entry));
  };

  if (done) {
    return (
      <View style={styles.block}>
        <View style={styles.readRow}>
          <Pressable
            onPress={() => toggleLesson(lessonKey)}
            accessibilityRole="button"
            accessibilityLabel={t('lesson.unread')}
            style={({ pressed }) => [
              styles.readChip,
              {
                backgroundColor: pressed ? theme.backgroundSelected : theme.accentMuted,
              },
            ]}>
            <Ionicons name="checkmark" size={16} color={theme.accent} />
            <ThemedText type="smallBold" themeColor="accent">
              {t('lesson.read')}
            </ThemedText>
          </Pressable>
        </View>

        {next && nextLabel && (
          <Pressable
            onPress={() => router.push(routeFor(next.entry))}
            accessibilityRole="button"
            accessibilityLabel={`${t('lesson.next')}: ${nextLabel}`}
            style={({ pressed }) => [
              styles.button,
              styles.secondary,
              {
                borderColor: theme.border,
                backgroundColor: pressed ? theme.backgroundSelected : 'transparent',
              },
            ]}>
            <View style={styles.label}>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
                {t('lesson.next')}
              </ThemedText>
              <ThemedText type="cardTitle">{nextLabel}</ThemedText>
            </View>
            <Ionicons name="arrow-forward" size={20} color={theme.textSecondary} />
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={styles.block}>
      <Pressable
        onPress={markAndGo}
        accessibilityRole="button"
        accessibilityLabel={
          nextLabel ? `${t('lesson.doneNext')}: ${nextLabel}` : t('lesson.markRead')
        }
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
        ]}>
        <View style={styles.label}>
          {nextLabel ? (
            <>
              <ThemedText type="caption" themeColor="textOnAccent" style={styles.kicker}>
                {t('lesson.doneNext')}
              </ThemedText>
              <ThemedText type="cardTitle" themeColor="textOnAccent">
                {nextLabel}
              </ThemedText>
            </>
          ) : (
            <ThemedText type="cardTitle" themeColor="textOnAccent">
              {t('lesson.markRead')}
            </ThemedText>
          )}
        </View>
        <Ionicons
          name={nextLabel ? 'arrow-forward' : 'checkmark'}
          size={20}
          color={theme.textOnAccent}
        />
      </Pressable>

      {/*
        Only where the primary also navigates. Without a next lesson the
        primary IS "mark it read", and a second control saying the same thing
        in quieter type is a choice between one option.
      */}
      {nextLabel && (
        <Pressable
          onPress={mark}
          accessibilityRole="button"
          accessibilityLabel={t('lesson.markRead')}
          style={({ pressed }) => [styles.quiet, { opacity: pressed ? 0.6 : 1 }]}>
          <ThemedText type="small" themeColor="textSecondary">
            {t('lesson.markRead')}
          </ThemedText>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginTop: Spacing.five,
    gap: Spacing.three,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    minHeight: 56,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.three,
    borderRadius: Radius.medium,
  },
  secondary: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  label: {
    flex: 1,
    gap: Spacing.half,
  },
  kicker: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  quiet: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
  },
  readRow: {
    flexDirection: 'row',
  },
  readChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.small,
  },
});
