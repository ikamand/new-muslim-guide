import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { HISN, HISN_SOURCE } from '@/content/duas/hisn';
import { ArabicFont, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * One occasion from Hisn al-Muslim, as the book has it.
 *
 * ## Why the Arabic is not styled like a recitation card
 *
 * `RecitationCard` is for words the app is teaching somebody to say — it has
 * an audio control, a transliteration line and the visual weight that goes
 * with "learn this". Nothing here has been through a reviewer, and some lines
 * are narrations rather than words to recite. Dressing them as recitations
 * would make a claim the app cannot support yet.
 *
 * So this reads as a book: Arabic, its translation, and the footnote the
 * publisher printed underneath. When a reviewer has cleared an occasion it can
 * graduate onto the day screen, where the app does teach.
 *
 * ⚠️ No transliteration, deliberately. IslamHouse publishes none, and writing
 * one would be the model producing Arabic-adjacent text — the same rule that
 * keeps `juz30.ts` transliteration-free.
 */
export default function DuaBookOccasionScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { id } = useLocalSearchParams<{ id: string }>();
  const occasion = HISN.find((entry) => String(entry.id) === id);

  if (!occasion) {
    return (
      <View style={styles.missing}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('duaBook.missing')}
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: occasion.english || t('duaBook.title') }} />

      <View style={styles.header}>
        <ThemedText type="sectionTitle">{occasion.english}</ThemedText>
        <ThemedText style={[styles.headerArabic, { color: theme.textSecondary }]}>
          {occasion.arabic}
        </ThemedText>
      </View>

      {occasion.lines.map((line) => (
        <View
          key={line.id}
          style={[
            styles.card,
            { backgroundColor: theme.backgroundElement, borderColor: theme.border },
          ]}>
          <ThemedText style={styles.arabic}>{line.arabic}</ThemedText>
          {line.english ? (
            <ThemedText type="default" themeColor="textSecondary">
              {line.english}
            </ThemedText>
          ) : null}
          {line.footnote ? (
            <View style={[styles.footnote, { borderLeftColor: theme.border }]}>
              <ThemedText style={[styles.footnoteText, { color: theme.textSecondary }]}>
                {line.footnote}
              </ThemedText>
            </View>
          ) : null}
        </View>
      ))}

      {/*
        A licence obligation and a provenance claim in one line. IslamHouse
        published both the Arabic and the English; the app is reproducing their
        book, and saying so is the difference between a quotation and a lift.
      */}
      <ThemedText type="caption" themeColor="textSecondary">
        {t('duaBook.credit')} — {HISN_SOURCE.publisher}
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  missing: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.four,
  },
  header: {
    gap: Spacing.one,
  },
  headerArabic: {
    fontFamily: ArabicFont,
    fontSize: 22,
    lineHeight: 38,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  card: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  arabic: {
    fontFamily: ArabicFont,
    fontSize: 26,
    lineHeight: 52,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  footnote: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
  },
  footnoteText: {
    fontFamily: ArabicFont,
    fontSize: 16,
    lineHeight: 30,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
