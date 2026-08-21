import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import type { Coverage } from '@/i18n/localise';
import { LOCALE_NAMES } from '@/i18n/locales';

/**
 * A quiet line saying this screen is not all in the reader's language yet.
 *
 * The app has always fallen back to English string by string, which is the
 * right behaviour and stays: someone halfway through wudu needs the instruction
 * far more than they need to know it is untranslated, and a French reader who
 * loses the text loses the ability to pray. What was wrong was doing it in
 * silence — a third-translated app looked finished to the reader, and the gaps
 * were invisible to us unless somebody opened the manifest.
 *
 * So this says the true thing in one sentence and gets out of the way. It is
 * deliberately not a warning: nothing is broken, and a beginner already
 * carrying a lot does not need an error styled at them. Secondary text, no
 * icon, no colour that reads as danger.
 *
 * Renders nothing for a reader in English, and nothing on a screen that is
 * fully translated — which is what makes it self-removing as the tables fill.
 */
export function TranslationGap({ coverage }: { coverage: Coverage }) {
  const theme = useTheme();
  const { locale, t } = useLocale();

  if (coverage.complete) return null;

  return (
    <View style={[styles.line, { borderLeftColor: theme.border }]}>
      <ThemedText type="small" themeColor="textSecondary">
        {t('translation.gap').replace('{language}', LOCALE_NAMES[locale])}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  /**
   * The same left rule the content notes use, in the border colour rather than
   * the accent — it belongs to the app talking about itself, not to the
   * religious content, and should not be mistaken for a point of guidance.
   */
  line: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
  },
});
