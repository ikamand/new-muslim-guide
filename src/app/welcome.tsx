import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useSettings, type Audience } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * The first thing anyone sees, once.
 *
 * A route, redirected to while the splash screen is still up, so nobody sees a
 * frame of the app first. Two questions, then it never appears again; both
 * answers are changeable in Settings.
 *
 * Asking someone's gender in the first thirty seconds of an app is a real cost
 * and some people will refuse. That is why the skip is a plain option rather
 * than a small link — refusing shows everything, which is the honest fallback,
 * not a punishment.
 */

function Choice({
  label,
  help,
  onPress,
}: {
  label: string;
  help?: string;
  onPress: () => void;
}) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.choice,
        {
          backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
          borderColor: theme.border,
        },
      ]}>
      <ThemedText type="smallBold" style={styles.choiceLabel}>
        {label}
      </ThemedText>
      {help && (
        <ThemedText type="small" themeColor="textSecondary">
          {help}
        </ThemedText>
      )}
    </Pressable>
  );
}

export default function WelcomeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLocale();
  const { set } = useSettings();
  const [becoming, setBecoming] = useState<boolean | null>(null);

  const finish = (audience: Audience) => {
    set('audience', audience);
    set('onboarded', true);
    // `replace`, not `push` — nobody should swipe back into the first-run
    // questions. Someone who came to become Muslim then lands on the shahada
    // rather than on a prayer they are not yet obliged to make.
    router.replace('/(tabs)');
    if (becoming) router.push({ pathname: '/guide/[id]', params: { id: 'shahada' } });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{t('welcome.title')}</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            {t('welcome.intro')}
          </ThemedText>
        </View>

        {becoming === null ? (
          <View style={styles.step}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.question}>
              {t('welcome.where')}
            </ThemedText>
            <Choice
              label={t('welcome.becoming')}
              help={t('welcome.becoming.help')}
              onPress={() => setBecoming(true)}
            />
            <Choice
              label={t('welcome.already')}
              help={t('welcome.already.help')}
              onPress={() => setBecoming(false)}
            />
          </View>
        ) : (
          <View style={styles.step}>
            <ThemedText type="smallBold" themeColor="textSecondary" style={styles.question}>
              {t('welcome.audience')}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('welcome.audience.why')}
            </ThemedText>
            <Choice label={t('welcome.man')} onPress={() => finish('man')} />
            <Choice label={t('welcome.woman')} onPress={() => finish('woman')} />
            <Choice label={t('welcome.skip')} onPress={() => finish(null)} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    gap: Spacing.two,
  },
  step: {
    gap: Spacing.three,
  },
  question: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  choice: {
    gap: 2,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  choiceLabel: {
    fontSize: 17,
    lineHeight: 24,
  },
});
