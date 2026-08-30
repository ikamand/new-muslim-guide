import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { getCollection } from '@/content/collections';
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
 * the 99 names, the duʿas the Qur'an puts in the mouths of the prophets, the
 * sīrah in episodes, the vices and their opposites, the small sunnahs — cost
 * one screen between them rather than five. The moment this file branches on
 * which set it has, that saving is gone and the fifth collection looks
 * different from the first for no reason anybody can name.
 *
 * So the rendering is driven entirely by which fields an entry has. A name of
 * Allah carries Arabic, a transliteration and a meaning and gets three lines;
 * a sīrah episode carries a title and a paragraph and gets two. Neither the
 * screen nor a reader has to know which is which.
 *
 * `plan:check` fails if a component starts branching on a collection id.
 *
 * ## The Arabic is set as a quote, not as a recitation
 *
 * Same reasoning as `dua-book/[id].tsx`. `RecitationCard` carries an audio
 * control and the visual weight of "learn this by heart", and a collection is
 * something you read. Dressing an unreviewed line as a recitation makes a
 * claim the app cannot support.
 */
export default function CollectionScreen() {
  const theme = useTheme();
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

      {collection.entries.map((entry, index) => (
        <View
          key={entry.id}
          style={[styles.card, { borderBottomColor: theme.goldSoft }]}>
          {/*
            The ordinal, because a collection is ORDERED and the order is part
            of what it is — the sīrah in sequence, the names as the list has
            them. A reader who stops halfway needs to know where halfway was.
          */}
          <View style={styles.titleRow}>
            <ThemedText type="caption" themeColor="textSecondary" style={styles.ordinal}>
              {index + 1}
            </ThemedText>
            <ThemedText type="cardTitle" style={styles.title}>
              {entry.title}
            </ThemedText>
          </View>

          {/*
            The Arabic and its transliteration are one block, and the divider
            below separates the words from what they mean.

            Both are corrections from looking at this rendered. The Arabic sat
            in the card's own `gap`, which put the same space between it and
            its transliteration as between two unrelated lines — and since the
            Arabic is right-aligned and everything around it is left-aligned,
            an entry read as two disconnected halves rather than one thing.
            `RecitationCard` had already solved this: bind the two, then rule
            a line before the meaning.
          */}
          {entry.arabic ? (
            <View style={styles.words}>
              <ThemedText type="arabicLead" style={styles.arabic}>
                {entry.arabic}
              </ThemedText>
              {entry.transliteration ? (
                <ThemedText type="small" themeColor="textSecondary" style={styles.transliteration}>
                  {entry.transliteration}
                </ThemedText>
              ) : null}
            </View>
          ) : null}

          {entry.arabic ? (
            <View style={[styles.divider, { backgroundColor: theme.border }]} />
          ) : null}

          <ThemedText type="default">{entry.translation}</ThemedText>

          {entry.note ? (
            <ThemedText type="small" themeColor="textSecondary">
              {entry.note}
            </ThemedText>
          ) : null}
        </View>
      ))}
    </ScrollView>
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
  /* Arabic and its transliteration read as one block, not two rows. */
  words: {
    gap: Spacing.one,
  },
  transliteration: {
    fontStyle: 'italic',
    textAlign: 'right',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  card: {
    gap: Spacing.two,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.two,
  },
  /* Fixed width so every title starts on the same vertical line, however many
     digits the ordinal has. A ragged left edge down a list of 99 is the kind
     of thing that reads as carelessness. */
  ordinal: {
    minWidth: 22,
  },
  title: { flex: 1 },
  arabic: {
    /* size and face: the `arabicLead` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
