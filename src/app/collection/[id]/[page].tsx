import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CollectionEntryCard, hasWordView } from '@/components/collection-entry-card';
import { ThemedText } from '@/components/themed-text';
import { getCollection } from '@/content/collections';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';

/**
 * One page of a collection: its entries, in the page's own order, numbered
 * from one.
 *
 * The same card as the flat list, reached through a different door. An entry
 * that sits on several pages is the same entry on each — one text in the
 * data, however many purposes it serves — which is what lets a reader arrive
 * with a need ("fear", "parents", "new Muslim") and still be reading the
 * verse the app has checked, not a copy of it.
 *
 * No branch on which collection this is: any collection with pages renders
 * here the same way.
 */
export default function CollectionPageScreen() {
  const { t } = useLocale();
  const { id, page: pageId } = useLocalSearchParams<{ id: string; page: string }>();
  const collection = getCollection(id);
  const page = collection?.pages?.find((candidate) => candidate.id === pageId);

  if (!collection || !page) {
    return (
      <View style={styles.missing}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('collection.missing')}
        </ThemedText>
      </View>
    );
  }

  const entries = page.entries
    .map((entryId) => collection.entries.find((entry) => entry.id === entryId))
    .filter((entry) => entry !== undefined);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: page.title }} />

      <ThemedText type="default" themeColor="textSecondary">
        {page.description}
      </ThemedText>

      {entries.some(hasWordView) ? (
        <ThemedText type="small" themeColor="textSecondary">
          {t('collection.tapWords')}
        </ThemedText>
      ) : null}

      {entries.map((entry, index) => (
        <CollectionEntryCard key={entry.id} entry={entry} ordinal={index + 1} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
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
});
