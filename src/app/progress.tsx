import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ChoiceCard } from '@/components/onboarding/choice-card';
import { PressableLink } from '@/components/pressable-link';
import { Shelf } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { SHAHADA_KEY } from '@/content/curriculum';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { usePrayerConfidence } from '@/hooks/use-competence';
import { useCurriculum, type ResolvedUnit } from '@/hooks/use-curriculum';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import {
  PRAYER_CONFIDENCES,
  SHAHADA_STATES,
  saidShahada,
  type PrayerConfidence,
  type ShahadaState,
} from '@/lib/onboarding';

/**
 * The progress screen: where somebody corrects the app's picture of them.
 *
 * Everything the app believes about a reader was, until this screen, written
 * once and frozen: the onboarding answers in their first thirty seconds, and
 * whatever the ledger picked up from reading. Somebody who learned to pray at
 * the mosque, or arrived knowing half of tier one, had no room in which to
 * say so — the app would teach them forever. This is that room.
 *
 * ## The questions are the onboarding questions
 *
 * Same strings, same three-and-four answers, same stored fields — asked
 * again, live. One difference, and it is the point: an answer given HERE is
 * a declaration, not a seed. `prayerConfidenceAt` records it, and
 * `lib/competence.ts` lets a declaration win in both directions where a seed
 * could only be raised. The shahada answer writes the shahada lesson's tick
 * directly, exactly as onboarding now does — one ledger, no shadow truth.
 *
 * ## The units are doors, with one shortcut
 *
 * Each row opens its unit screen, where the per-lesson circles have always
 * lived. The circle on the row here marks the WHOLE unit — the shortcut
 * somebody with real prior knowledge needs, six taps instead of forty —
 * and un-marks it the same way, because every mark in this app is
 * reversible. Marking lessons and declaring prayer fluency sit on one
 * screen because they are different facts: ticking the how-to-pray unit
 * does not tell the app you can pray, and seeing both side by side is what
 * makes that legible.
 */

function ShahadaQuestion() {
  const { t } = useLocale();
  const { shahadaState, completedLessons, setMany } = useSettings();

  const answer = (value: ShahadaState) => {
    /*
      The answer writes the ledger, as onboarding does — done-ness has one
      source, and a "not yet" un-ticks what a "yes" ticked.
    */
    const done = new Set(completedLessons);
    if (saidShahada(value)) done.add(SHAHADA_KEY);
    else done.delete(SHAHADA_KEY);
    setMany({ shahadaState: value, completedLessons: [...done] });
  };

  return (
    <View style={styles.section}>
      <ThemedText type="sectionTitle">{t('onboarding.said.title')}</ThemedText>
      <View style={styles.options} accessibilityRole="radiogroup">
        {SHAHADA_STATES.map((value, index) => (
          <ChoiceCard
            key={value}
            label={t(`onboarding.said.${value}` as UIKey)}
            help={t(`onboarding.said.${value}.help` as UIKey)}
            selected={shahadaState === value}
            onPress={() => answer(value)}
            index={index + 1}
            total={SHAHADA_STATES.length}
          />
        ))}
      </View>
    </View>
  );
}

function PrayerQuestion() {
  const { t } = useLocale();
  const { setMany } = useSettings();
  /*
    Selected is the EFFECTIVE confidence — what the app currently acts on,
    promotion included — not the raw stored answer. Showing somebody
    "teach me" selected while Today already treats them as fluent would
    misreport the very picture this screen exists to correct.
  */
  const confidence = usePrayerConfidence();

  const answer = (value: PrayerConfidence) => {
    setMany({ prayerConfidence: value, prayerConfidenceAt: Date.now() });
  };

  return (
    <View style={styles.section}>
      <ThemedText type="sectionTitle">{t('onboarding.prays.title')}</ThemedText>
      <View style={styles.options} accessibilityRole="radiogroup">
        {PRAYER_CONFIDENCES.map((value, index) => (
          <ChoiceCard
            key={value}
            label={t(`onboarding.prays.${value}` as UIKey)}
            help={t(`onboarding.prays.${value}.help` as UIKey)}
            selected={confidence === value}
            onPress={() => answer(value)}
            index={index + 1}
            total={PRAYER_CONFIDENCES.length}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * One unit: a door to its lesson list, and the whole-unit mark.
 *
 * The same two-target anatomy as the unit screen's lesson rows, for the same
 * reason — opening and marking are different intentions, and a circle nested
 * inside a link is a button inside a button.
 */
function UnitRow({ unit }: { unit: ResolvedUnit }) {
  const theme = useTheme();
  const { t } = useLocale();
  const { markLessons } = useSettings();

  const all = unit.total > 0 && unit.done === unit.total;

  return (
    <View style={[styles.row, { borderBottomColor: theme.goldSoft }]}>
      <PressableLink
        href={{ pathname: '/unit/[id]', params: { id: unit.id } }}
        accessibilityLabel={`${t(`curriculum.unit.${unit.id}` as UIKey)}. ${t('journey.progress')
          .replace('{done}', String(unit.done))
          .replace('{total}', String(unit.total))}`}
        style={styles.rowMain}
        pressedStyle={{ opacity: 0.6 }}>
        <View style={styles.rowText}>
          <ThemedText type="smallBold">{t(`curriculum.unit.${unit.id}` as UIKey)}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('journey.progress')
              .replace('{done}', String(unit.done))
              .replace('{total}', String(unit.total))}
          </ThemedText>
        </View>
      </PressableLink>

      <Pressable
        onPress={() =>
          markLessons(
            unit.lessons.map((lesson) => lesson.key),
            !all,
          )
        }
        accessibilityRole="checkbox"
        accessibilityState={{ checked: all }}
        aria-checked={all}
        accessibilityLabel={all ? t('progress.unmarkUnit') : t('progress.markUnit')}
        style={({ pressed }) => [styles.toggle, { opacity: pressed ? 0.6 : 1 }]}>
        <View
          style={[
            styles.mark,
            {
              borderColor: all ? theme.accent : theme.border,
              backgroundColor: all ? theme.accent : 'transparent',
            },
          ]}>
          {all && <Ionicons name="checkmark" size={16} color={theme.textOnAccent} />}
        </View>
      </Pressable>
    </View>
  );
}

export default function ProgressScreen() {
  const { t } = useLocale();
  const { tiers } = useCurriculum();

  return (
    <>
      <Stack.Screen options={{ title: t('learn.progress') }} />
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('progress.intro')}
        </ThemedText>

        <ShahadaQuestion />
        <PrayerQuestion />

        <View style={styles.section}>
          <Shelf label={t('progress.units')} />
          <ThemedText type="small" themeColor="textSecondary">
            {t('progress.units.help')}
          </ThemedText>
          {tiers.map((tier) => (
            <View key={tier.id}>
              <ThemedText type="caption" themeColor="gold" style={styles.tierLabel}>
                {t(`curriculum.tier.${tier.id}` as UIKey)}
              </ThemedText>
              {tier.units.map((unit) => (
                <UnitRow key={unit.id} unit={unit} />
              ))}
            </View>
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
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  section: {
    gap: Spacing.three,
  },
  options: {
    gap: Spacing.two,
  },
  tierLabel: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.one,
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
});
