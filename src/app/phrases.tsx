import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { TranslationGap } from '@/components/translation-gap';
import { PHRASES } from '@/content';
import { ArabicFont, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { localisePhrase, measure } from '@/i18n/localise';
import { useTheme } from '@/hooks/use-theme';

/**
 * Transliteration leads here, Arabic sits beside it.
 *
 * The reverse of everywhere else in the app, and deliberately: these arrive as
 * sounds in a conversation, not as text on a page. Someone is trying to
 * recognise what they just heard, which the Arabic script does not help with
 * until much later.
 */
export default function PhrasesScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();
  const [phrases, coverage] = measure(() =>
    PHRASES.map((entry) => localisePhrase(entry, locale)),
  );

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('phrases.title') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {t('phrases.intro')}
      </ThemedText>

      <View style={styles.list}>
        {phrases.map((phrase) => (
          <View
            key={phrase.id}
            style={[
              styles.card,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <View style={styles.head}>
              <ThemedText type="smallBold" style={styles.said}>
                {phrase.said}
              </ThemedText>
              <ThemedText style={styles.arabic}>{phrase.arabic}</ThemedText>
            </View>

            <ThemedText type="small" themeColor="textSecondary">
              {phrase.meaning}
            </ThemedText>

            <View style={[styles.divider, { backgroundColor: theme.border }]} />

            <ThemedText type="small">{phrase.when}</ThemedText>

            {phrase.reply && (
              <View style={[styles.reply, { backgroundColor: theme.accentMuted }]}>
                <ThemedText type="small" themeColor="accent">
                  {t('phrases.youSay')} {phrase.reply}
                </ThemedText>
              </View>
            )}
          </View>
        ))}

        <TranslationGap coverage={coverage} />
      </View>
    </ScrollView>
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
  list: {
    gap: Spacing.three,
  },
  card: {
    gap: Spacing.two,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.three,
    flexWrap: 'wrap',
  },
  said: {
    fontSize: 17,
    lineHeight: 26,
    flexShrink: 1,
  },
  arabic: {
    fontFamily: ArabicFont,
    fontSize: 22,
    lineHeight: 40,
    writingDirection: 'rtl',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: Spacing.one,
  },
  reply: {
    borderRadius: Radius.small,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    marginTop: Spacing.one,
  },
});
