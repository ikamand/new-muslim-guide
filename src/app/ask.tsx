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
import type { UIKey } from '@/i18n/ui';
import { buildIndex, search } from '@/lib/search';

/**
 * The sheet behind the ask bar.
 *
 * ## What this is, and what it is not, yet
 *
 * A shell. It searches the app's catalogue — all 78 entries — by title and
 * description, offline, with no model involved. The ingredient glossary and
 * the scanner land behind this same field later; neither exists today, and the
 * empty state says so rather than implying an answer is being withheld.
 *
 * ## The limit worth knowing
 *
 * This matches the app's OWN vocabulary and nothing else. "Istikhara" lands
 * because a guide is called that. "How do I decide" does not. "I farted" does
 * not, though `wudu.ts` answers it outright with Bukhari 135 behind it, filed
 * under the word "nullifiers" — which nobody types.
 *
 * That is the real gap, and widening this filter cannot close it. It closes
 * with an alias layer: the phrasings a person actually uses, generated at
 * build time, committed as data, matched offline. Search keys are not
 * religious content, so they need a proofread rather than a scholar.
 *
 * ## Why the chip row on Today is still there
 *
 * It should retire into this sheet as starter suggestions, and it will. Not
 * while the sheet cannot answer anything, because that trades a row that works
 * for one that does not. Both read from `useHelpTopics`, so there is one
 * source and not two; the row comes out the day this can answer.
 */

type Suggestion = {
  key: string;
  title: string;
  /** The second line. Empty falls back to `topic` rather than leaving a gap. */
  description: string;
  /** "Guide", "Duʿa" — what kind of thing this is. */
  topic: string;
  href: Parameters<typeof PressableLink>[0]['href'];
};

export default function AskScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { locale, t } = useLocale();
  const [query, setQuery] = useState('');
  const topics = useHelpTopics();

  /*
    Two different sets, because an empty field and a typed one are different
    questions.

    With nothing typed, the help topics — curated, ordered by what this reader
    said they came for, and every one of them known to land somewhere real.
    A flat dump of all 78 entries would be a worse first screen than the chip
    row it replaces.

    A topic is a grouping for the chip row; in here somebody is looking for a
    thing, not a category, so the category becomes the subtitle rather than a
    level to navigate through.
  */
  const starters = useMemo<readonly Suggestion[]>(
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

  /*
    Typed, it searches the whole catalogue.

    It used to search the starters, which is the ten help topics and nothing
    else — so "istikhara" returned nothing while `prayers.ts` carried a full
    istikhara guide, and the sheet looked broken to anyone who typed a word the
    app definitely knows. The help topics are a curated way in, not an index.

    This still only matches the app's OWN vocabulary: "istikhara" lands,
    "how do i decide" does not, and neither does "i farted" while the answer
    sits in wudu.ts under "nullifiers". That gap closes with an alias layer,
    not by widening this any further.
  */
  /*
    Typed, it searches everything: the 78 catalogue entries, the 132 duʿa
    occasions, and — the point of this — the 286 prayer and wudu steps and 101
    reference sections underneath them.

    The answers live at that lower level. "Wind" wants the sentence inside
    wudu.ts, not the guide that contains it, and a search over page names can
    only ever hand somebody "Wudu — 10 steps" and let them hunt. Ranking is in
    `lib/search.ts` with the reasoning; here it is only rendered.
  */
  const index = useMemo(
    () => buildIndex(locale, (kind) => t(`kind.${kind}` as UIKey)),
    [locale, t],
  );

  const trimmed = query.trim();
  const results = useMemo<readonly Suggestion[]>(() => {
    if (!trimmed) return starters;
    return search(index, trimmed).map((hit) => ({
      key: hit.key,
      title: hit.title,
      description: hit.snippet,
      topic: hit.context,
      href: hit.href,
    }));
  }, [starters, index, trimmed]);

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
                  {/*
                    Three lines, in the order somebody reads a result: what
                    kind of thing this is and where it lives, what it is
                    called, and — where there is one — the sentence that
                    answers. A step's snippet is the instruction itself, which
                    is often the whole answer without opening anything.
                  */}
                  <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
                    {item.topic}
                  </ThemedText>
                  <ThemedText type="default">{item.title}</ThemedText>
                  {item.description ? (
                    <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
                      {item.description}
                    </ThemedText>
                  ) : null}
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
  kicker: {
    textTransform: 'uppercase',
    letterSpacing: 1,
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
