import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { LessonScroll } from '@/components/lesson-scroll';
import { MarkedText } from '@/components/marked-text';
import { PinStar } from '@/components/pin-star';
import { ThemedText } from '@/components/themed-text';
import { HISN } from '@/content/duas/hisn';
import { stepsForOccasion } from '@/content/duas/sessions';
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
 *
 * ## It reads the book's rows through `annotations.ts`, like the reader does
 *
 * This screen used to render `occasion.lines` straight, which meant the two
 * screens showing the same occasion disagreed — and this was the one that was
 * wrong. Hisn prints the three Quls and then a bare row `(ثلاثَ مرَّاتٍ)`;
 * `annotations.ts` carries that count onto the three above it, so the reader
 * showed `×3` while this screen showed a card whose entire content was the
 * sentence "Three times." A count attached to nothing, and no count where the
 * count belonged.
 *
 * `stepsForOccasion` is now the only thing that knows what the book's rows
 * mean. It also folds the page-break continuations back together and splits
 * the rows holding several dhikr — the same three transformations, on both
 * screens, from one place.
 *
 * ⚠️ This does not make the screen show LESS of the book. Every row is still
 * here; the ones that moved are counts and labels that were never text to
 * recite, and each move is a named entry in `annotations.ts` with its reason
 * beside it.
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

  const steps = stepsForOccasion(occasion);

  return (
    /*
      Reading an occasion to the end marks `hisn:<id>` — for most occasions an
      inert key, but for the everyday-duʿas curriculum step (hisn:1268971) it
      is what lets reading complete the step, which only a checkbox could do
      before. No LessonEnd here: the book is browsed, not walked in order.
    */
    <LessonScroll lessonKey={`hisn:${occasion.id}`} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: occasion.english || t('duaBook.title') }} />

      <View style={styles.header}>
        <View style={styles.headerRow}>
          <ThemedText type="sectionTitle" style={styles.headerTitle}>
            {occasion.english}
          </ThemedText>
          <PinStar id={occasion.id} />
        </View>
        <ThemedText type="arabicQuote" style={[styles.headerArabic, { color: theme.textSecondary }]}>
          {occasion.arabic}
        </ThemedText>
      </View>

      {steps.map((step) => (
        <View
          key={step.key}
          style={[
            styles.card,
            { borderBottomColor: theme.goldSoft },
            /*
              A Qur'an line is set apart by a gold rule in its margin, not a
              tinted fill — illumination marking a quotation, which is
              literally what gold did on this book's pages.
            */
            step.line.kind === 'quran' && {
              borderLeftWidth: 2,
              borderLeftColor: theme.gold,
              paddingLeft: Spacing.three,
            },
          ]}>
          {/*
            The count, from wherever the book stated it — beside the words, or
            on a row of its own below them, which `annotations.ts` has already
            carried onto the rows it belongs to. A numeral rather than a word,
            so it needs no translation and reads the same in a list of Arabic.

            Shown on instructions too, unlike the reader. `/adhkar/[id]` forces
            an instruction's target to 1 so nobody has to tap three times to
            get past "join the palms and blow into them" — that is about the
            counter mechanic, not about whether the count exists. Here the
            badge only states a fact, and for line 1269284 the fact is real:
            the book says to wipe over the body three times. Suppressing it
            would drop a count the page prints.
          */}
          {step.repeat > 1 ? (
            <View style={[styles.repeat, { borderColor: theme.border }]}>
              <ThemedText type="smallBold" themeColor="accent">{`×${step.repeat}`}</ThemedText>
            </View>
          ) : null}

          <ThemedText
            type={step.line.kind === 'quoted' ? 'arabicLead' : 'arabicQuote'}
            style={styles.arabic}>
            <MarkedText text={step.arabic} spans={step.emphasis} colour={theme.gold} />
          </ThemedText>
          {step.english ? (
            <ThemedText type="default" themeColor="textSecondary">
              <MarkedText text={step.english} spans={step.emphasis} colour={theme.gold} bold />
            </ThemedText>
          ) : null}
        </View>
      ))}
    </LessonScroll>
  );
}

const styles = StyleSheet.create({
  content: {
    /*
      Spacing.three, not four. A card sitting at the gutter charges the reader
      twice — the screen's padding and then its own — and the eye sees only the
      sum. At 24 + 24 the Arabic had 297pt of a 393pt phone; at 16 + 16 it has
      329. The gutter is the half to give up, because the card's padding is
      what holds the text off its own border.
    */
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
  header: {
    gap: Spacing.one,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  /* The title wraps; the star must not be pushed off the edge by a long one. */
  headerTitle: { flex: 1 },
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
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  arabic: {
    /* size and face: the `arabicLead` rung */
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
