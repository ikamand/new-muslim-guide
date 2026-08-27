import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { CATALOG } from '@/content';
import { HISN } from '@/content/duas/hisn';
import { useHelpTopics } from '@/hooks/use-help';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { localiseCatalogEntry } from '@/i18n/localise';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';

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
  /** The second line. Empty falls back to `topic` rather than leaving a gap. */
  description: string;
  /** "Guide", "Duʿa" — what kind of thing this is. */
  topic: string;
  /**
   * What the filter matches against, which is deliberately not what is drawn.
   *
   * A duʿa's Arabic belongs in here so it can be searched, and must not reach
   * the description — that line is a Latin rung, and Amiri is the only face
   * this app sets Arabic in.
   */
  haystack: string;
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
          haystack: `${link.title} ${link.description} ${topic.label}`,
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
  const searchable = useMemo<readonly Suggestion[]>(() => {
    const catalogue = CATALOG.map((raw) => {
      const entry = localiseCatalogEntry(raw, locale);
      return {
        key: `${entry.kind}:${entry.id}`,
        title: entry.title,
        description: entry.shortDescription,
        topic: t(`kind.${entry.kind}` as UIKey),
        haystack: `${entry.title} ${entry.shortDescription}`,
        href: routeFor(entry),
      };
    });

    /*
      And the duʿa book, which the catalogue does not contain.

      `CATALOG` holds 9 duʿas — the ones woven into the guides. Hisn al-Muslim
      is 132 more, and they were reachable only by browsing to the right moment
      of the day. "Dhikr upon entering the house" was in the app the whole time
      and could not be asked for, which is the single largest findability gap
      here: the duʿa book is the part of this app people most often arrive
      wanting one specific thing from.

      The occasion titles are English and stay English for a French or Spanish
      reader, because the book itself is Arabic and English — the same as what
      the duʿa book screen already shows them.
    */
    const book = HISN.map((occasion) => ({
      key: `hisn:${occasion.id}`,
      title: occasion.english,
      description: '',
      topic: t('kind.dua'),
      haystack: `${occasion.english} ${occasion.arabic}`,
      href: { pathname: '/dua-book/[id]' as const, params: { id: String(occasion.id) } },
    }));

    return [...catalogue, ...book];
  }, [locale, t]);

  const trimmed = query.trim();
  const results = useMemo(() => {
    if (!trimmed) return starters;
    const needle = fold(trimmed);
    return searchable.filter((item) => fold(item.haystack).includes(needle));
  }, [starters, searchable, trimmed]);

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
                    {item.description || item.topic}
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
