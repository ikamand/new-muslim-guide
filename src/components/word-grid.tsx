import { StyleSheet, View } from 'react-native';

import { MushafRosette } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import type { AyahWord } from '@/content/quran/words';

/**
 * An ayah, or a run of them, as a row of words — each with its gloss and its
 * transliteration under it.
 *
 * ## What this is for
 *
 * Someone three weeks in reads a dua as a line of Arabic they cannot parse
 * and an English sentence that does not say which word is which. This is the
 * bridge between the two: the same words, one at a time, with what each one
 * means. It is a reading aid and not a recitation — nothing here plays, lights
 * up, or keeps score — which is why it is a plain View and lives beside
 * `RecitationCard` rather than inside it.
 *
 * ## Why the words come from the data and not from splitting the line
 *
 * `AyahWord` carries its own Arabic. The card above prints QuranEnc's Uthmani
 * and this prints Quran Foundation's; they agree on every letter and differ in
 * a glyph or two of vowel placement, and splitting the card's string on spaces
 * to pair it with the glosses would be a bet that the two publishers count
 * words the same way. The transliteration generator makes that bet and checks
 * it; this does not need to.
 *
 * ## Layout
 *
 * `row-reverse` with wrap, so the first word sits at the right and the line
 * breaks the way Arabic reads. Each cell is a column: Arabic on top at the
 * quote rung, then the transliteration, then the gloss. Where more than one
 * ayah is shown the ayah number closes its row, as a marker does in a mushaf.
 */
export function WordGrid({
  ayahs,
  script = 'uthmani',
  numbered = false,
}: {
  ayahs: readonly { number: number; words: readonly AyahWord[] }[];
  /** Which form of each word to set: the line above decides, so the two agree. */
  script?: 'uthmani' | 'imlaei';
  /** Close every row with its ayah number, even a lone one. */
  numbered?: boolean;
}) {
  const several = numbered || ayahs.length > 1;
  return (
    <View style={styles.grid}>
      {ayahs.map((ayah) => (
        <View key={ayah.number} style={styles.row}>
          {ayah.words.map((word, index) => (
            <View key={index} style={styles.cell}>
              <ThemedText type="arabicQuote" style={styles.arabic}>
                {script === 'imlaei' ? word.im : word.ar}
              </ThemedText>
              <ThemedText type="caption" themeColor="textSecondary" style={styles.transliteration}>
                {word.tr}
              </ThemedText>
              <ThemedText type="small" style={styles.gloss}>
                {word.en}
              </ThemedText>
            </View>
          ))}
          {several ? (
            /* The mushaf's own marker, as the surah screen sets it inline. */
            <View style={[styles.cell, styles.marker]}>
              <MushafRosette label={String(ayah.number)} size={28} />
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: Spacing.three,
  },
  row: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    rowGap: Spacing.two,
  },
  /* Air inside the cell, none between cells: the Arabic word's own width is
     the column, and a gap on top of padding reads as a table. */
  cell: {
    alignItems: 'center',
    paddingHorizontal: Spacing.two,
    maxWidth: 160,
  },
  arabic: {
    /* size and face: the `arabicQuote` rung */
    writingDirection: 'rtl',
    textAlign: 'center',
  },
  transliteration: {
    fontStyle: 'italic',
    fontWeight: '400',
    textAlign: 'center',
  },
  gloss: {
    textAlign: 'center',
  },
  /* The ayah number sits on the Arabic baseline of its row, not at the top. */
  marker: {
    alignSelf: 'center',
  },
});
