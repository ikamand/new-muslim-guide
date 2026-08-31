import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { QuietRow } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useCurriculum, type ResolvedLesson } from '@/hooks/use-curriculum';
import { useLocale } from '@/hooks/use-locale';
import { useObservations } from '@/hooks/use-observations';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';

/**
 * One unit, as a list of lessons — the successor to `/journey/[stage]`.
 *
 * Same anatomy as the stage screen it replaces, for the same reasons: the
 * row opens the lesson, the circle at its end marks it done. Two targets
 * because they are two intentions — a beginner who taps a lesson to read it
 * should never find they have silently ticked it off instead. The checkbox
 * is also where un-marking lives, which is a claim about a lesson you are
 * looking AT rather than one you are inside.
 */

function LessonRow({ step }: { step: ResolvedLesson }) {
  const theme = useTheme();
  const { t } = useLocale();
  const { toggleLesson } = useSettings();
  const { reading } = useObservations();

  const label = step.labelKey ? t(step.labelKey as UIKey) : step.entry.title;

  /*
    The bookmark, permanent. The carry-on slot forgets a half-read page after
    a fortnight and holds only the most recent one — right for a "what now"
    surface, and exactly how a read went missing: the ONLY place that showed
    it stopped. This row is where the lesson lives, so this is where the
    bookmark lives, with no horizon and no cap. Same gold rule at the foot
    that every reading row draws; gone the moment the lesson is done.
  */
  const bookmark = !step.done ? reading[step.key]?.furthest : undefined;

  return (
    <View style={[styles.row, { borderBottomColor: theme.goldSoft }]}>
      <PressableLink
        href={routeFor(step.entry)}
        accessibilityLabel={`${label}. ${step.entry.shortDescription}`}
        style={styles.rowMain}
        pressedStyle={{ opacity: 0.6 }}>
        <View style={styles.rowText}>
          <ThemedText type="smallBold">{label}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {step.entry.shortDescription}
          </ThemedText>
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

      {bookmark ? (
        <View
          style={[
            styles.bookmark,
            { width: `${Math.round(bookmark * 100)}%`, backgroundColor: theme.gold },
          ]}
        />
      ) : null}
    </View>
  );
}

export default function UnitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLocale();
  const { tiers, next } = useCurriculum();

  const unit = tiers.flatMap((tier) => tier.units).find((entry) => entry.id === id);

  // An unknown unit id — a stale deep link, a typo — shows the tab's intro
  // rather than an error. There is nothing here a user could have done wrong.
  if (!unit) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('learn.intro')}
        </ThemedText>
      </ScrollView>
    );
  }

  const continueHere = unit.next && next?.key === unit.next.key ? unit.next : undefined;

  return (
    <>
      <Stack.Screen options={{ title: t(`curriculum.unit.${unit.id}` as UIKey) }} />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="default" themeColor="textSecondary">
          {t(`curriculum.unit.${unit.id}.purpose` as UIKey)}
        </ThemedText>

        {/* Offered only when the path's own next lesson is in THIS unit —
            a unit browsed out of order is browsing, not a detour to correct. */}
        {continueHere && (
          <PressableLink
            href={routeFor(continueHere.entry)}
            accessibilityLabel={`${t('journey.continue')}: ${
              continueHere.labelKey ? t(continueHere.labelKey as UIKey) : continueHere.entry.title
            }`}
            style={styles.continue}
            pressedStyle={{ opacity: 0.9 }}>
            <ContinueLabel step={continueHere} />
          </PressableLink>
        )}

        <View>
          {unit.lessons.map((step) => (
            <LessonRow key={step.key} step={step} />
          ))}
        </View>

        {/* Where the unit opens out rather than finishes — a practice, not a
            step, so it carries no checkbox and counts toward nothing. */}
        {unit.doors.map((door) => (
          <QuietRow
            key={`${door.kind}:${door.id}`}
            href={routeFor(door)}
            label={door.title}
            accessibilityLabel={door.title}
          />
        ))}
      </ScrollView>
    </>
  );
}

function ContinueLabel({ step }: { step: ResolvedLesson }) {
  const theme = useTheme();
  const { t } = useLocale();
  const label = step.labelKey ? t(step.labelKey as UIKey) : step.entry.title;
  return (
    <View style={[styles.continueInner, { backgroundColor: theme.action }]}>
      <View style={styles.continueText}>
        <ThemedText type="caption" themeColor="onAction" style={styles.continueKicker}>
          {t('journey.continue')}
        </ThemedText>
        <ThemedText type="smallBold" themeColor="onAction">
          {label}
        </ThemedText>
      </View>
      <Ionicons name="arrow-forward" size={20} color={theme.onAction} />
    </View>
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
  continue: {
    borderRadius: Radius.medium,
    overflow: 'hidden',
  },
  continueInner: {
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowMain: {
    flex: 1,
    paddingVertical: Spacing.three,
  },
  rowText: {
    gap: Spacing.one,
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
  /* The same rule `JadwalRow` draws — a bookmark sitting on the separator. */
  bookmark: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 1.5,
  },
});
