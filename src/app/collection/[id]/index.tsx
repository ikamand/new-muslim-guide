import { Stack, useLocalSearchParams } from 'expo-router';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CollectionEntryCard, hasWordView } from '@/components/collection-entry-card';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { getCollection } from '@/content/collections';
import type { Collection, CollectionPage } from '@/content/types';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * Every collection in the app, rendered by this one screen.
 *
 * ## It must never learn which collection it is showing
 *
 * There is no switch on `id` here and there must never be one. The whole point
 * of `collection` being a `ContentKind` is that five bodies of content —
 * the 99 names, the duas the Qur'an puts in the mouths of the prophets, the
 * sīrah in episodes, the vices and their opposites, the small sunnahs — cost
 * one screen between them rather than five. The moment this file branches on
 * which set it has, that saving is gone and the fifth collection looks
 * different from the first for no reason anybody can name.
 *
 * So the rendering is driven entirely by which fields the data has. A
 * collection with `pages` opens as an index of them, grouped by section; one
 * without opens as the numbered list it always was. An entry with Arabic gets
 * three lines; one with a title and a paragraph gets two. Neither the screen
 * nor a reader has to know which is which.
 *
 * `plan:check` fails if a component starts branching on a collection id.
 */
export default function CollectionScreen() {
  const { t } = useLocale();
  const { id } = useLocalSearchParams<{ id: string }>();
  const collection = getCollection(id);

  if (!collection) {
    return (
      <View style={styles.missing}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('collection.missing')}
        </ThemedText>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: collection.title }} />

      {/*
        The subtitle only. The name is on the navigation bar, which is what
        `reference/[id].tsx` does — printing it again here put the same words
        on screen twice, one under the other, which is how it looked the first
        time this was rendered.
      */}
      <ThemedText type="default" themeColor="textSecondary" style={styles.subtitle}>
        {collection.subtitle}
      </ThemedText>

      {collection.pages ? <PageIndex collection={collection} pages={collection.pages} /> : <FlatList collection={collection} />}
    </ScrollView>
  );
}

/**
 * The index: pages under their section headings, each a row that opens the
 * page. A page's row says how many entries it holds, with the unit, because a
 * bare numeral beside a title reads as a badge.
 */
function PageIndex({ collection, pages }: { collection: Collection; pages: readonly CollectionPage[] }) {
  const theme = useTheme();
  const { t } = useLocale();
  return (
    <View>
      {pages.map((page, index) => (
        <Fragment key={page.id}>
          {page.section !== pages[index - 1]?.section ? (
            <ThemedText type="sectionTitle" style={[styles.section, index > 0 && styles.sectionLater]}>
              {page.section}
            </ThemedText>
          ) : null}
          <PressableLink
            href={{ pathname: '/collection/[id]/[page]', params: { id: collection.id, page: page.id } }}
            accessibilityLabel={`${page.title}. ${page.description}`}
            style={[styles.row, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <ThemedText type="cardTitle">{page.title}</ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {page.description}
            </ThemedText>
            <ThemedText type="caption" themeColor="textSecondary">
              {t('count.items.long').replace('{n}', String(page.entries.length))}
            </ThemedText>
          </PressableLink>
        </Fragment>
      ))}
    </View>
  );
}

/** The numbered list, for a collection with no pages. */
function FlatList({ collection }: { collection: Collection }) {
  const { t } = useLocale();
  return (
    <View style={styles.list}>
      {/* One line, once, and only where something on the page will answer it. */}
      {collection.entries.some(hasWordView) ? (
        <ThemedText type="small" themeColor="textSecondary">
          {t('collection.tapWords')}
        </ThemedText>
      ) : null}
      {collection.entries.map((entry, index) => (
        <CollectionEntryCard key={entry.id} entry={entry} ordinal={index + 1} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    /* Spacing.three at the gutter, matching `dua-book/[id].tsx` — a card at
       the gutter charges the reader twice and the eye sees only the sum. */
    padding: Spacing.three,
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
  subtitle: {
    marginBottom: Spacing.one,
  },
  list: {
    gap: Spacing.three,
  },
  /* A heading sits on its rows: the first row touches it, and a later heading
     takes a breath above so the break reads as a break and not as one more
     row. Positive space only — the rule of the row above is the join. */
  section: {
    marginBottom: Spacing.two,
  },
  sectionLater: {
    marginTop: Spacing.five,
  },
  /* Rows touch: a rule between them, air inside them. */
  row: {
    gap: Spacing.one,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
