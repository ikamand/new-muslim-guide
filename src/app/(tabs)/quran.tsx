import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GirihBand } from '@/components/illustrations';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { LEARNING_ORDER } from '@/content/quran/surahs';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useMemorised } from '@/hooks/use-memorised';
import { useObservations } from '@/hooks/use-observations';
import { reviewFor } from '@/lib/review';
import { useTheme } from '@/hooks/use-theme';

/**
 * Al-Fatiha and juz 30, in the order people learn them.
 *
 * ## Why this is a tab and not a Learn topic
 *
 * Today answers "what do I do in the next ten minutes" and Learn answers "what
 * don't I understand yet". Memorising is neither — it is a practice built over
 * months, and filing it under Learn would make it look like reading, which is
 * the one thing it is not.
 *
 * ## The order
 *
 * Al-Fatiha first, then backwards through the mushaf, 114 → 113 → 112 → …,
 * which is how it is actually taught. Not shortest-first: the data contradicts
 * that, since 110 and 103 are shorter than 114. Backwards is contiguous, so
 * there is never a question about what comes next, and it front-loads the
 * three *quls* — the highest-utility surahs in the book.
 *
 * Al-Fatiha sits outside that run because it sits outside juz 30, and it goes
 * first because it is the one surah you cannot pray without. This tab shipped
 * without it, which meant a memorisation screen that omitted the surah recited
 * in every rak'ah of every prayer. See `content/quran/surahs.ts`.
 *
 * ## Progress that never asks anything
 *
 * A count, and nothing else. No streak, no daily target, no notice when
 * somebody stops. Someone three weeks into Islam does not need an app that is
 * disappointed in them, and the fastest way to make memorising feel like
 * homework is to score it.
 */
export default function QuranScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { isMemorised, memorised, count } = useMemorised();
  const observations = useObservations();
  const review = reviewFor(memorised, observations);
  const reviewSurah = review ? LEARNING_ORDER.find((s) => s.number === review.surah) : undefined;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{t('quran.title')}</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            {t('quran.intro')}
          </ThemedText>
        </View>

        {/*
          The band is a row of eight-point stars — the same girih the shahada
          card carries. A count behind it rather than a percentage: "6 of 38"
          is a fact, "16%" is a verdict.
        */}
        <View style={[styles.progress, { borderColor: theme.goldSoft }]}>
          <View style={styles.band}>
            <GirihBand color={theme.accent} height={54} />
          </View>
          <View style={styles.progressBody}>
            <ThemedText type="cardTitle">
              {t('quran.progress')
                .replace('{done}', String(count))
                .replace('{total}', String(LEARNING_ORDER.length))}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {t('quran.progress.help')}
            </ThemedText>
          </View>
        </View>

        {/*
          One surah worth reciting again — and never a queue.

          `lib/review.ts` explains the whole design: the schedule is invisible,
          the slot is always filled and never late, and the sentence is about
          the surah rather than about the reader. This screen must never grow a
          count of what is "due"; that is a backlog, and a backlog is a streak
          wearing different clothes.
        */}
        {review ? (
          <PressableLink
            href={{ pathname: '/surah/[number]', params: { number: String(review.surah) } }}
            accessibilityLabel={`${t('quran.review.kicker')}: ${reviewSurah?.name ?? ''}`}
            style={[styles.review, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            {/*
              The kicker is why this row is here, and saying so is rubric's
              job — the accent border it used to carry was a card marking
              itself special, which is what the vermilion word now does
              without a box.
            */}
            <View style={styles.reviewText}>
              <ThemedText type="caption" themeColor="vermilion" style={styles.kicker}>
                {t('quran.review.kicker')}
              </ThemedText>
              <ThemedText type="cardTitle">{reviewSurah?.name}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {t(review.neverRecited ? 'quran.review.never' : 'quran.review.stale')}
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.textSecondary} />
          </PressableLink>
        ) : null}

        <View style={styles.list}>
          {LEARNING_ORDER.map((surah) => {
            const done = isMemorised(surah.number);

            return (
              <PressableLink
                key={surah.number}
                href={{ pathname: '/surah/[number]', params: { number: String(surah.number) } }}
                accessibilityLabel={`${surah.name}, ${surah.meaning}, ${surah.ayahs.length} ${t('count.ayahs')}`}
                style={[styles.row, { borderBottomColor: theme.goldSoft }]}
                pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
                {/*
                  The surah's own number, not its position in the list. It is
                  what it is called in every mushaf and every conversation, and
                  a reader will meet it long after this screen.
                */}
                <ThemedText
                  type="caption"
                  themeColor={done ? 'malachite' : 'textSecondary'}
                  style={styles.number}>
                  {surah.number}
                </ThemedText>
                <View style={styles.rowText}>
                  <View style={styles.nameRow}>
                    <ThemedText type="cardTitle">{surah.name}</ThemedText>
                    {/*
                      The Arabic name beside the transliteration, not instead
                      of it. A convert meets these on a mosque wall and in a
                      mushaf's contents long before they can read an ayah, and
                      recognising the shape of الإخلاص is the first Arabic
                      reading most people do without noticing.
                    */}
                    <ThemedText type="arabicName" style={styles.nameArabic}>{surah.nameArabic}</ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textSecondary">
                    {surah.meaning} · {surah.ayahs.length} {t('count.ayahs')}
                  </ThemedText>
                </View>
                {done && (
                  <ThemedText type="caption" themeColor="malachite">
                    {t('quran.known')}
                  </ThemedText>
                )}
              </PressableLink>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.four,
  },
  review: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  reviewText: { flex: 1, gap: Spacing.one },
  kicker: { textTransform: 'uppercase', letterSpacing: 1 },
  /* A panel under the girih band, like the shahada panel on Learn. */
  progress: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  band: {
    height: 54,
    overflow: 'hidden',
  },
  progressBody: {
    gap: 2,
    padding: Spacing.three,
  },
  list: {
    gap: Spacing.two,
  },
  /*
    A ruled entry. "Known" used to be an accent border around the whole card;
    it is now malachite on the number and the trailing word — green appears
    only when something is right, and a coloured frame said it louder than a
    fact deserves.
  */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 64,
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  number: {
    width: 26,
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  nameArabic: {
    /* size and face: the `arabicName` rung */
  },
});
