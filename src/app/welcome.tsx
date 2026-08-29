import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { BackHandler, Platform, StyleSheet, View } from 'react-native';

import { MihrabArch } from '@/components/illustrations';
import { ChoiceCard } from '@/components/onboarding/choice-card';
import { StepFrame } from '@/components/onboarding/step-frame';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { CONTENT_DICTS } from '@/i18n/content';
import { LOCALE_NAMES, LOCALES, SOURCE_LOCALE } from '@/i18n/locales';
import { useSettings } from '@/hooks/use-settings';
import {
  PRAYER_CONFIDENCES,
  SHAHADA_STATES,
  type PrayerConfidence,
  type ShahadaState,
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

/**
 * Whether to ask about language at all.
 *
 * With one locale the question has one answer, and a radio group of one is a
 * control that cannot do anything — so the step disappears and onboarding is
 * four questions rather than five. Derived from `LOCALES` rather than written
 * down: adding a language back brings the step back with it, and nobody has to
 * remember that this is where it went.
 */
const ASK_LANGUAGE = LOCALES.length > 1;

const TOTAL_STEPS = ASK_LANGUAGE ? 5 : 4;

/** The step the flow opens on, and the floor for Back. */
const FIRST_STEP = ASK_LANGUAGE ? 0 : 1;

/** The number a step SHOWS, which is not its index once language is gone. */
const shown = (n: number) => (ASK_LANGUAGE ? n : n - 1);

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
  const theme = useTheme();
  const { locale, setLocale, t } = useLocale();
  const { setMany, onboarded, shahadaState, prayerConfidence } = useSettings();

  const [step, setStep] = useState(FIRST_STEP);
  // Prefilled, so someone who reopens this from Settings sees what they chose
  // last time rather than a blank form implying they never answered.
  const [said, setSaid] = useState<ShahadaState | null>(shahadaState);
  const [prays, setPrays] = useState<PrayerConfidence | null>(prayerConfidence);

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
      shahadaState: said,
      prayerConfidence: prays,
    });
    leave();
  }, [setMany, said, prays, leave]);

  const skip = useCallback(() => {
    // A revisit that ends in Skip means "leave things as they are", not "throw
    // away the answers I gave last time".
    if (!revisiting) {
      setMany({
        onboarded: true,
        onboardingCompleted: false,
        onboardingSkipped: true,
        shahadaState: null,
        prayerConfidence: null,
      });
    }
    leave();
  }, [revisiting, setMany, leave]);

  const back = useCallback(() => setStep((current) => Math.max(FIRST_STEP, current - 1)), []);
  const next = useCallback(() => setStep((current) => current + 1), []);

  // Android's hardware back should step backwards through the questions, not
  // drop someone out of the app from the middle of them.
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (step === FIRST_STEP) return false;
      back();
      return true;
    });
    return () => subscription.remove();
  }, [step, back]);

  const shahadaOptions = SHAHADA_STATES.map((value) => ({
    value,
    label: t(`onboarding.said.${value}` as UIKey),
    help: t(`onboarding.said.${value}.help` as UIKey),
  }));

  const prayerOptions = PRAYER_CONFIDENCES.map((value) => ({
    value,
    label: t(`onboarding.prays.${value}` as UIKey),
    help: t(`onboarding.prays.${value}.help` as UIKey),
  }));

  /*
    Language leads, because every screen after it is written in the answer —
    including the welcome. The device's language is already selected, so for
    most people this is one tap on Continue rather than a decision, which is the
    difference between asking and handing someone a picker.
  */
  if (step === 0 && ASK_LANGUAGE) {
    return (
      <StepFrame
        step={shown(1)}
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
        step={shown(2)}
        total={TOTAL_STEPS}
        title={t('onboarding.welcome.title')}
        onSkip={skip}
        onContinue={next}
        continueLabel={t('onboarding.welcome.cta')}
        contentStyle={styles.centred}>
        {/*
          The app's own architecture, on its front door. This screen was three
          short lines floating in an empty frame — the one screen every single
          person sees carried none of the identity the rest of the app has.
          The arch is the mihrab from the prayer card, drawn a little firmer
          than its usual whisper because here it is the picture, not the
          backdrop.
        */}
        <View style={styles.arch} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <MihrabArch color={theme.accent} width={216} opacity={0.4} />
        </View>
        <View style={styles.prose}>
          <ThemedText type="lead">
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
        step={shown(3)}
        total={TOTAL_STEPS}
        title={t('onboarding.said.title')}
        onBack={back}
        onSkip={skip}
        onContinue={next}
        continueLabel={t('onboarding.continue')}
        continueDisabled={said === null}>
        <View style={styles.options} accessibilityRole="radiogroup">
          {shahadaOptions.map((option, index) => (
            <ChoiceCard
              key={option.value}
              label={option.label}
              help={option.help}
              selected={said === option.value}
              onPress={() => setSaid(option.value)}
              index={index + 1}
              total={shahadaOptions.length}
            />
          ))}
        </View>
      </StepFrame>
    );
  }

  if (step === 3) {
    return (
      <StepFrame
        step={shown(4)}
        total={TOTAL_STEPS}
        title={t('onboarding.prays.title')}
        onBack={back}
        onSkip={skip}
        onContinue={next}
        continueLabel={t('onboarding.continue')}
        continueDisabled={prays === null}>
        <View style={styles.options} accessibilityRole="radiogroup">
          {prayerOptions.map((option, index) => (
            <ChoiceCard
              key={option.value}
              label={option.label}
              help={option.help}
              selected={prays === option.value}
              onPress={() => setPrays(option.value)}
              index={index + 1}
              total={prayerOptions.length}
            />
          ))}
        </View>
      </StepFrame>
    );
  }

  return (
    <StepFrame
      step={shown(5)}
      total={TOTAL_STEPS}
      title={t('onboarding.reassure.title')}
      onBack={back}
      onContinue={finish}
      continueLabel={t('onboarding.reassure.cta')}
      contentStyle={styles.centred}>
      <View style={styles.prose}>
        <ThemedText type="lead">
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
  /*
    The arch's own SVG ends where the wall would meet the floor, so the prose
    below it reads as standing inside the niche rather than under a picture.
  */
  arch: {
    alignItems: 'center',
  },
  options: {
    gap: Spacing.two,
  },
  aside: {
    paddingTop: Spacing.three,
  },
});
