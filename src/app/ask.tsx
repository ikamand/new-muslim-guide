import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useHelpTopics } from '@/hooks/use-help';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * The sheet behind the ask bar.
 *
 * ## What this is, and what it is not, yet
 *
 * A shell. It searches what the app *already* has — the help topics, resolved
 * to things that actually open — and nothing else. The answer library, the
 * ingredient glossary and the scanner all land behind this same field later;
 * none of them exists today, and the empty state says so rather than implying
 * the app has an answer it is withholding.
 *
 * Searching the help links is not filler. It is the skeleton the real matcher
 * slots into, it works offline with no content written, and it means the
 * placement can be looked at on a real screen before anything is built behind
 * it — which is the only reason to ship a shell at all.
 *
 * ## Why the chip row on Today is still there
 *
 * It should retire into this sheet as starter suggestions, and it will. Not
 * while the sheet cannot answer anything, because that trades a row that works
 * for one that does not. Both read from `useHelpTopics`, so there is one
 * source and not two; the row comes out the day this can answer.
 */

/** Case and accent folded, so "wudu" finds "wuḍūʾ" and "Prayer" finds "prayer". */
function fold(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

type Suggestion = {
  key: string;
  title: string;
  description: string;
  topic: string;
  href: Parameters<typeof PressableLink>[0]['href'];
};

export default function AskScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { t } = useLocale();
  const [query, setQuery] = useState('');
  const topics = useHelpTopics();

  /*
    Flattened once. A topic is a grouping for the chip row; in here somebody is
    looking for a thing, not a category, so the categories become the subtitle
    rather than a level to navigate through.
  */
  const suggestions = useMemo<readonly Suggestion[]>(
    () =>
      topics.flatMap((topic) =>
        topic.links.map((link) => ({
          key: `${topic.id}:${link.key}`,
          title: link.title,
          description: link.description,
          topic: topic.label,
          href: link.href,
        })),
      ),
    [topics],
  );

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return suggestions;
    const needle = fold(trimmed);
    return suggestions.filter((item) =>
      fold(`${item.title} ${item.description} ${item.topic}`).includes(needle),
    );
  }, [suggestions, trimmed]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={styles.frame}>
        <View style={styles.searchRow}>
          <View
            style={[
              styles.field,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <Ionicons name="search-outline" size={18} color={theme.textSecondary} />
            <TextInput
              value={query}
              onChangeText={setQuery}
              autoFocus
              returnKeyType="search"
              placeholder={t('ask.placeholder')}
              placeholderTextColor={theme.textSecondary}
              style={[styles.input, { color: theme.text }]}
              accessibilityLabel={t('ask.placeholder')}
            />
          </View>
          <Pressable
            onPress={() => router.back()}
            accessibilityRole="button"
            accessibilityLabel={t('ask.close')}
            style={styles.close}>
            <ThemedText type="small" themeColor="accent">
              {t('ask.close')}
            </ThemedText>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag">
          {/*
            Present so the placement can be judged, deliberately not pressable
            so nobody gets a dead tap. The marker comes off with the scanner.
          */}
          <View
            style={[
              styles.scanRow,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <Ionicons name="scan-outline" size={22} color={theme.textSecondary} />
            <View style={styles.scanText}>
              <ThemedText type="smallBold">{t('ask.scan')}</ThemedText>
              <ThemedText type="caption" themeColor="textSecondary">
                {t('ask.scanDescription')}
              </ThemedText>
            </View>
            <View style={[styles.pill, { backgroundColor: theme.accentMuted }]}>
              <ThemedText type="caption" themeColor="accent">
                {t('ask.soon')}
              </ThemedText>
            </View>
          </View>

          <ThemedText
            type="smallBold"
            themeColor="textSecondary"
            style={styles.sectionTitle}>
            {trimmed ? t('ask.results') : t('ask.starters')}
          </ThemedText>

          {results.length === 0 ? (
            /*
              The honest end of a short list. Everything the app can answer is
              already above; saying "no results" and stopping would imply the
              answer exists somewhere else in here.
            */
            <View style={styles.empty}>
              <ThemedText type="default">{t('ask.emptyTitle')}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t('ask.emptyBody')}
              </ThemedText>
              <PressableLink
                href="/learn"
                accessibilityLabel={t('ask.browse')}
                style={[styles.browse, { borderColor: theme.accent }]}
                pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
                <ThemedText type="small" themeColor="accent">
                  {t('ask.browse')}
                </ThemedText>
              </PressableLink>
            </View>
          ) : (
            results.map((item) => (
              <PressableLink
                key={item.key}
                href={item.href}
                accessibilityLabel={`${item.title}. ${item.description}`}
                style={[styles.result, { borderColor: theme.border }]}
                pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
                <View style={styles.resultText}>
                  <ThemedText type="default">{item.title}</ThemedText>
                  <ThemedText type="small" themeColor="textSecondary">
                    {item.description}
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
              </PressableLink>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  frame: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  input: {
    flex: 1,
    /* The `default` rung's size, set here because TextInput is not ThemedText. */
    fontSize: 16,
    /* Android pads its inputs by default and the field is already 48 tall. */
    paddingVertical: 0,
  },
  close: {
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.one,
  },
  content: {
    padding: Spacing.four,
    paddingTop: Spacing.two,
    gap: Spacing.two,
  },
  scanRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: Spacing.three,
  },
  scanText: {
    flex: 1,
    gap: 2,
  },
  pill: {
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: 999,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.one,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  resultText: {
    flex: 1,
    gap: 2,
  },
  empty: {
    gap: Spacing.two,
    alignItems: 'flex-start',
    paddingVertical: Spacing.three,
  },
  browse: {
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: Spacing.one,
  },
});
