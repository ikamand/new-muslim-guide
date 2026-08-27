import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { HISN } from '@/content/duas/hisn';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
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
 * So this reads as a book: the Arabic and its translation, and nothing else.
 * When a reviewer has cleared an occasion it can graduate onto the day screen,
 * where the app does teach.
 *
 * ## The footnotes are not shown, on Iyad's instruction (27 Aug 2026)
 *
 * IslamHouse prints a footnote under most lines. It is Arabic citation prose —
 * `أخرجه البخاري، 1/ 45، برقم 142` — and a person who has just become Muslim
 * cannot read it, cannot use it, and is reading past a paragraph of apparatus
 * to reach the next duʿa. So the screen leaves it out.
 *
 * ⚠️ It is left OUT OF THE SCREEN, not out of the data. `footnote` is still on
 * every line in `hisn.ts`, because it is the provenance a reviewer works from
 * and the only citation the book gives. Nothing about this change makes a
 * narration harder to check; it makes it harder to read on a phone, which is
 * the point.
 *
 * ⚠️ No transliteration, deliberately. IslamHouse publishes none, and writing
 * one would be the model producing Arabic-adjacent text — the same rule that
 * keeps `juz30.ts` transliteration-free.
 *
 * ## Why the three kinds are set differently
 *
 * The book's ((…)) and ﴿…﴾ no longer reach this screen — `hisn-clean.mjs`
 * removes them. On the page those marks were the ONLY thing separating a
 * verse from a narration, and this screen used to render all three kinds at
 * the same weight, so stripping them without changing anything here would
 * have quietly flattened a real distinction.
 *
 * So the design carries what the punctuation used to: Qur'an sits in an
 * accent-tinted block, quoted speech takes the lead weight because it is the
 * words themselves, and prose — instructions, and narrations about the virtue
 * of dhikr — takes the quote weight.
 *
 * ⚠️ `prose` is NOT set as a footnote, on purpose. A few prose rows are
 * continuations of a verse the publisher split across a page break, and
 * demoting those to supporting weight would misrepresent them. Telling them
 * apart is `annotations.ts`'s job and no one has done it yet.
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
        <ThemedText type="arabicQuote" style={[styles.headerArabic, { color: theme.textSecondary }]}>
          {occasion.arabic}
        </ThemedText>
      </View>

      {occasion.lines.map((line) => (
        <View
          key={line.id}
          style={[
            styles.card,
            { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            line.kind === 'quran' && {
              backgroundColor: theme.accentMuted,
              borderColor: theme.accentMuted,
            },
          ]}>
          {/*
            The count the book itself states, where both languages agreed on
            it. A numeral rather than a word, so it needs no translation and
            reads the same in a list of Arabic.
          */}
          {line.repeat ? (
            <View style={[styles.repeat, { borderColor: theme.border }]}>
              <ThemedText type="smallBold" themeColor="accent">{`×${line.repeat}`}</ThemedText>
            </View>
          ) : null}

          <ThemedText
            type={line.kind === 'quoted' ? 'arabicLead' : 'arabicQuote'}
            style={styles.arabic}>
            <Marked text={line.arabic} spans={line.emphasis} colour={theme.accent} />
          </ThemedText>
          {line.english ? (
            <ThemedText type="default" themeColor="textSecondary">
              <Marked text={line.english} spans={line.emphasis} colour={theme.accent} bold />
            </ThemedText>
          ) : null}
        </View>
      ))}
    </ScrollView>
  );
}

/**
 * The words the book had in square brackets, shown as marked rather than as
 * brackets.
 *
 * The brackets are gone from the text on Iyad's instruction, and they were
 * carrying something real: a wording that some narrations of a hadith have and
 * the base one does not — `[بِسْمِ اللَّهِ]` at the head of the bathroom duʿa,
 * `[ثلاثاً]` after a dhikr. Deleting the marks and doing nothing else would
 * fold an optional addition silently into the duʿa, so the accent colour takes
 * over the job the brackets were doing.
 *
 * ⚠️ The Arabic is coloured but NOT bolded, and that is not an oversight.
 * `_layout.tsx` loads Amiri-Regular only, so `fontWeight` would give a
 * synthesised faux-bold — which on naskh, where every stroke is a modulated
 * curve and vowel marks stack above and below, smears rather than strengthens.
 * Real bold needs Amiri-Bold.ttf added as an asset (~430KB, ships OTA). The
 * English is a Latin face and bolds properly, so it does.
 */
function Marked({
  text,
  spans,
  colour,
  bold,
}: {
  text: string;
  spans?: readonly string[];
  colour: string;
  bold?: boolean;
}) {
  if (!spans || spans.length === 0) return <>{text}</>;

  /*
    Longest span first, so one span sitting inside another is matched whole
    rather than being cut in half by the shorter one.
  */
  const ordered = [...spans].sort((a, b) => b.length - a.length);
  let parts: { text: string; marked: boolean }[] = [{ text, marked: false }];

  for (const span of ordered) {
    const next: typeof parts = [];
    for (const part of parts) {
      if (part.marked || !part.text.includes(span)) {
        next.push(part);
        continue;
      }
      const pieces = part.text.split(span);
      pieces.forEach((piece, index) => {
        if (piece) next.push({ text: piece, marked: false });
        if (index < pieces.length - 1) next.push({ text: span, marked: true });
      });
    }
    parts = next;
  }

  return (
    <>
      {parts.map((part, index) =>
        part.marked ? (
          /*
            A bare `Text`, not a `ThemedText`. React Native nests text styles,
            but `ThemedText` always applies a `type` — defaulting to `default`,
            which is a Latin rung — so nesting one inside an `arabicLead` line
            reset the marked words to 17px Latin metrics and rendered them a
            third of the size of the duʿa around them. Only colour and weight
            belong here; everything else has to be inherited.
          */
          <Text key={index} style={[{ color: colour }, bold ? styles.markedBold : null]}>
            {part.text}
          </Text>
        ) : (
          part.text
        ),
      )}
    </>
  );
}

const styles = StyleSheet.create({
  markedBold: {
    fontWeight: '700',
  },
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
    /* size and face: the `arabicQuote` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  repeat: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  card: {
    gap: Spacing.three,
    padding: Spacing.four,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  arabic: {
    /* size and face: the `arabicLead` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
