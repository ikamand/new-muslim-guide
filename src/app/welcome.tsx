import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';

import { ChoiceCard } from '@/components/onboarding/choice-card';
import { StepFrame } from '@/components/onboarding/step-frame';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { CONTENT_DICTS } from '@/i18n/content';
import { LOCALE_NAMES, LOCALES, SOURCE_LOCALE } from '@/i18n/locales';
import { useSettings } from '@/hooks/use-settings';
import {
  INITIAL_INTERESTS,
  USER_STAGES,
  type InitialInterest,
  type UserStage,
} from '@/lib/onboarding';
import type { UIKey } from '@/i18n/ui';

/**
 * The first thing anyone sees, once.
 *
 * Four screens: a welcome, two questions, and a reassurance. It is redirected
 * to while the splash is still up, so nobody sees a frame of the app first.
 *
 * The register matters more than anything else here. Someone opening this may
 * have said the shahada three weeks ago and be frightened of getting something
 * wrong, so nothing may read as a form, a test, or a list of things they are
 * already behind on. Both questions are skippable, at every step, and skipping
 * costs nothing — the app gives the same universal beginner path either way.
 *
 * ## What this no longer asks
 *
 * It used to ask whether the reader is a man or a woman, which decides whether
 * the app shows what changes during a period. That question has moved to
 * Settings, where it already lived and could always be changed. Unanswered
 * shows everything, which is what `use-settings` has always documented as the
 * honest fallback — so nothing is hidden from anyone by dropping it, and the
 * first thirty seconds of the app no longer ask a stranger their gender.
 */

const TOTAL_STEPS = 5;

/**
 * Whether a language is finished enough to say nothing about.
 *
 * Read from the dictionary rather than written down, so it stops being true on
 * its own the moment a locale is completed — a hardcoded list of "partial"
 * languages is a lie waiting to happen. English is the content itself and can
 * never be partial.
 */
function isPartial(locale: (typeof LOCALES)[number]): boolean {
  return locale !== SOURCE_LOCALE && Object.keys(CONTENT_DICTS[locale]).length > 0;
}

export default function WelcomeScreen() {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();
  const { setMany, onboarded, userStage, initialInterest } = useSettings();

  const [step, setStep] = useState(0);
  // Prefilled, so someone who reopens this from Settings sees what they chose
  // last time rather than a blank form implying they never answered.
  const [stage, setStage] = useState<UserStage | null>(userStage);
  const [interest, setInterest] = useState<InitialInterest | null>(initialInterest);

  /** True when this is a revisit rather than a first run. */
  const revisiting = onboarded;

  const leave = useCallback(() => router.replace('/(tabs)'), [router]);

  const finish = useCallback(() => {
    // One write. Four separate `set` calls would each be computed from state
    // captured before the others applied, and the gate would follow whichever
    // landed last.
    setMany({
      onboarded: true,
      onboardingCompleted: true,
      onboardingSkipped: false,
      userStage: stage,
      initialInterest: interest,
    });
    leave();
  }, [setMany, stage, interest, leave]);

  const skip = useCallback(() => {
    // A revisit that ends in Skip means "leave things as they are", not "throw
    // away the answers I gave last time".
    if (!revisiting) {
      setMany({
        onboarded: true,
        onboardingCompleted: false,
        onboardingSkipped: true,
        userStage: null,
        initialInterest: null,
      });
    }
    leave();
  }, [revisiting, setMany, leave]);

  const back = useCallback(() => setStep((current) => Math.max(0, current - 1)), []);
  const next = useCallback(() => setStep((current) => current + 1), []);

  // Android's hardware back should step backwards through the questions, not
  // drop someone out of the app from the middle of them.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (step === 0) return false;
      back();
      return true;
    });
    return () => subscription.remove();
  }, [step, back]);

  const stageOptions = USER_STAGES.map((value) => ({
    value,
    label: t(`onboarding.stage.${value}` as UIKey),
    help: t(`onboarding.stage.${value}.help` as UIKey),
  }));

  const interestOptions = INITIAL_INTERESTS.map((value) => ({
    value,
    label: t(`onboarding.interest.${value}` as UIKey),
  }));

  /*
    Language leads, because every screen after it is written in the answer —
    including the welcome. The device's language is already selected, so for
    most people this is one tap on Continue rather than a decision, which is the
    difference between asking and handing someone a picker.
  */
  if (step === 0) {
    return (
      <StepFrame
        step={1}
        total={TOTAL_STEPS}
        title={t('onboarding.language.title')}
        onSkip={skip}
        onContinue={next}
        continueLabel={t('onboarding.continue')}>
        <View style={styles.options} accessibilityRole="radiogroup">
          {LOCALES.map((value, index) => (
            <ChoiceCard
              key={value}
              label={LOCALE_NAMES[value]}
              help={isPartial(value) ? t('translation.partial') : undefined}
              selected={locale === value}
              onPress={() => setLocale(value)}
              index={index + 1}
              total={LOCALES.length}
            />
          ))}
        </View>
        <ThemedText type="small" themeColor="textSecondary" style={styles.aside}>
          {t('onboarding.language.help')}
        </ThemedText>
      </StepFrame>
    );
  }

  if (step === 1) {
    return (
      <StepFrame
        step={2}
        total={TOTAL_STEPS}
        title={t('onboarding.welcome.title')}
        onSkip={skip}
        onContinue={next}
        continueLabel={t('onboarding.welcome.cta')}
        contentStyle={styles.centred}>
        <View style={styles.prose}>
          <ThemedText type="default" style={styles.lead}>
            {t('onboarding.welcome.body1')}
          </ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            {t('onboarding.welcome.body2')}
          </ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            {t('onboarding.welcome.body3')}
          </ThemedText>
        </View>
      </StepFrame>
    );
  }

  if (step === 2) {
    return (
      <StepFrame
        step={3}
        total={TOTAL_STEPS}
        title={t('onboarding.stage.title')}
        onBack={back}
        onSkip={skip}
        onContinue={next}
        continueLabel={t('onboarding.continue')}
        continueDisabled={stage === null}>
        <View style={styles.options} accessibilityRole="radiogroup">
          {stageOptions.map((option, index) => (
            <ChoiceCard
              key={option.value}
              label={option.label}
              help={option.help}
              selected={stage === option.value}
              onPress={() => setStage(option.value)}
              index={index + 1}
              total={stageOptions.length}
            />
          ))}
        </View>
      </StepFrame>
    );
  }

  if (step === 3) {
    return (
      <StepFrame
        step={4}
        total={TOTAL_STEPS}
        title={t('onboarding.interest.title')}
        onBack={back}
        onSkip={skip}
        onContinue={next}
        continueLabel={t('onboarding.continue')}
        continueDisabled={interest === null}>
        <View style={styles.options} accessibilityRole="radiogroup">
          {interestOptions.map((option, index) => (
            <ChoiceCard
              key={option.value}
              label={option.label}
              selected={interest === option.value}
              onPress={() => setInterest(option.value)}
              index={index + 1}
              total={interestOptions.length}
            />
          ))}
        </View>
      </StepFrame>
    );
  }

  return (
    <StepFrame
      step={5}
      total={TOTAL_STEPS}
      title={t('onboarding.reassure.title')}
      onBack={back}
      onContinue={finish}
      continueLabel={t('onboarding.reassure.cta')}
      contentStyle={styles.centred}>
      <View style={styles.prose}>
        <ThemedText type="default" style={styles.lead}>
          {t('onboarding.reassure.body1')}
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {t('onboarding.reassure.body2')}
        </ThemedText>
        <ThemedText type="default" themeColor="textSecondary">
          {t('onboarding.reassure.body3')}
        </ThemedText>
      </View>
    </StepFrame>
  );
}

const styles = StyleSheet.create({
  /** The two prose screens sit in the middle of the space they have. */
  centred: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  prose: {
    gap: Spacing.three,
  },
  lead: {
    fontSize: 18,
    lineHeight: 28,
  },
  options: {
    gap: Spacing.two,
  },
  aside: {
    paddingTop: Spacing.three,
  },
});
