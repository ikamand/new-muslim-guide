import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { WordGrid } from '@/components/word-grid';
import { Spacing } from '@/constants/theme';
import { ayahWords, type AyahWord } from '@/content/quran/words';
import type { CollectionEntry } from '@/content/types';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * One entry of a collection, as a card: ordinal and title, the Arabic, a rule,
 * the meaning, the note.
 *
 * Shared by the two screens that list entries — a collection's flat list and
 * one of its pages — so a card cannot look different depending on which door
 * it was reached through. It renders whatever fields the entry has and never
 * asks which collection it belongs to.
 *
 * ## The Arabic is set as a quote, not as a recitation
 *
 * `RecitationCard` carries an audio control and the visual weight of "learn
 * this by heart", and a collection is something you read. Dressing an
 * unreviewed line as a recitation makes a claim the app cannot support.
 *
 * ## The word view
 *
 * Where the app has words for EVERY ayah the entry cites, the Arabic is a
 * button that swaps the line for a row of words and back. Half a dua as
 * words and half as a line would be a puzzle, so an entry is either openable
 * or it is not, and the data decides. The card itself is a plain View, so no
 * button ever sits inside another. Open state lives here and is forgotten
 * with the screen: opening a dua word by word is a moment of study, not a
 * setting.
 */
export function CollectionEntryCard({
  entry,
  ordinal,
}: {
  entry: CollectionEntry;
  /** Its number in the list it is being read in. */
  ordinal: number;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const rows = wordRows(entry);

  const words = entry.arabic ? (
    <View style={styles.words}>
      {rows && open ? (
        <WordGrid ayahs={rows} />
      ) : (
        <ThemedText type="arabicLead" style={styles.arabic}>
          {entry.arabic}
        </ThemedText>
      )}
      {entry.transliteration && !open ? (
        <ThemedText type="small" themeColor="textSecondary" style={styles.transliteration}>
          {entry.transliteration}
        </ThemedText>
      ) : null}
    </View>
  ) : null;

  return (
    <View style={[styles.card, { borderBottomColor: theme.goldSoft }]}>
      <View style={styles.titleRow}>
        {/* Fixed width so every title starts on the same vertical line,
            however many digits the ordinal has. */}
        <ThemedText type="caption" themeColor="textSecondary" style={styles.ordinal}>
          {ordinal}
        </ThemedText>
        <ThemedText type="cardTitle" style={styles.title}>
          {entry.title}
        </ThemedText>
      </View>

      {rows && words ? (
        <Pressable
          onPress={() => setOpen((current) => !current)}
          accessibilityRole="button"
          accessibilityLabel={t(open ? 'collection.wordsHide' : 'collection.wordsShow')}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
          {words}
        </Pressable>
      ) : (
        words
      )}

      {/* The Arabic and its transliteration are one block; the rule below
          separates the words from what they mean. */}
      {entry.arabic ? <View style={[styles.divider, { backgroundColor: theme.border }]} /> : null}

      <ThemedText type="default">{entry.translation}</ThemedText>

      {entry.note ? (
        <ThemedText type="small" themeColor="textSecondary">
          {entry.note}
        </ThemedText>
      ) : null}
    </View>
  );
}

/** True where the entry can be opened word by word — see the card. */
export function hasWordView(entry: CollectionEntry): boolean {
  return wordRows(entry) !== undefined;
}

function wordRows(entry: CollectionEntry) {
  const rows: { number: number; words: readonly AyahWord[] }[] = [];
  for (const source of entry.sources ?? []) {
    if (source.kind !== 'quran') return undefined;
    const [from, to] = typeof source.ayah === 'number' ? [source.ayah, source.ayah] : source.ayah;
    for (let n = from; n <= to; n += 1) {
      const words = ayahWords(source.surah, n);
      if (!words) return undefined;
      rows.push({ number: n, words });
    }
  }
  return rows.length > 0 ? rows : undefined;
}

const styles = StyleSheet.create({
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
  ordinal: {
    minWidth: 22,
  },
  title: { flex: 1 },
  words: {
    gap: Spacing.one,
  },
  arabic: {
    /* size and face: the `arabicLead` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  transliteration: {
    fontStyle: 'italic',
    textAlign: 'right',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});
