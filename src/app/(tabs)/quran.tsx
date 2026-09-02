import Ionicons from '@expo/vector-icons/Ionicons';
import { Fragment } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GirihStar } from '@/components/illustrations';
import { Frame, MushafRosette, Rubric } from '@/components/jadwal';
import { PressableLink } from '@/components/pressable-link';
import { ARABIC_NAME_TRIM, ThemedText } from '@/components/themed-text';
import { LEARNING_ORDER } from '@/content/quran/surahs';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useMemorised } from '@/hooks/use-memorised';
import { useObservations } from '@/hooks/use-observations';
import { reviewFor } from '@/lib/review';
import { useTheme } from '@/hooks/use-theme';

/**
 * Al-Fatiha and juz 30, in the order people learn them — as a fihrist.
 *
 * ## Why this is a tab and not a Learn topic
 *
 * Today answers "what do I do in the next ten minutes" and Learn answers "what
 * don't I understand yet". Memorising is neither — it is a practice built over
 * months, and filing it under Learn would make it look like reading, which is
 * the one thing it is not.
 *
 * ## The fihrist (2 Sep)
 *
 * The contents page at the front of a mushaf — surah names, numbers in
 * rosettes, ruled into a frame — is this screen's printed ancestor, the way
 * the mosque wall timetable is the Awqat table's. So the list lives inside
 * the drawn frame and gilds itself: a known surah takes the selected-ground
 * wash and a filled rosette, the way an illuminator marks what is finished.
 * The word "known" retired from the row; screen readers still hear it.
 *
 * ## The order
 *
 * Al-Fatiha first, then backwards through the mushaf, 114 → 113 → 112 → …,
 * which is how it is actually taught. Backwards is contiguous, so there is
 * never a question about what comes next, and it front-loads the three
 * *quls*. The one red line in the frame — "then juz 30, backwards" — answers
 * the question the jump from 1 to 114 always raised.
 *
 * ## Progress that never asks anything
 *
 * The band above the list is 38 eight-point stars, one per surah in learning
 * order, each filled the day its surah is marked known: the girih band that
 * used to decorate the count IS the count now, and a gap in the band is a
 * fact, not a nag. No streak, no daily target, no notice when somebody
 * stops. Someone three weeks into Islam does not need an app that is
 * disappointed in them.
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
          One zero-gap group from the band down: the band's rule, the review
          row and the frame touch — the flush-join rule.
        */}
        <View>
          <View style={[styles.progress, { borderBottomColor: theme.goldSoft }]}>
            <View style={styles.bandRow}>
              {LEARNING_ORDER.map((surah) => (
                <GirihStar
                  key={surah.number}
                  size={15}
                  filled={isMemorised(surah.number)}
                  color={theme.gold}
                  trackColor={theme.goldSoft}
                />
              ))}
            </View>
            <View style={styles.progressBody}>
              <ThemedText type="smallBold" style={styles.centred}>
                {t('quran.progress')
                  .replace('{done}', String(count))
                  .replace('{total}', String(LEARNING_ORDER.length))}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.centred}>
                {t('quran.progress.help')}
              </ThemedText>
            </View>
          </View>

          {/*
            One surah worth reciting again — and never a queue.

            `lib/review.ts` explains the whole design: the schedule is
            invisible, the slot is always filled and never late, and the
            sentence is about the surah rather than about the reader. This
            screen must never grow a count of what is "due"; that is a
            backlog, and a backlog is a streak wearing different clothes.
          */}
          {review ? (
            <PressableLink
              href={{ pathname: '/surah/[number]', params: { number: String(review.surah) } }}
              accessibilityLabel={`${t('quran.review.kicker')}: ${reviewSurah?.name ?? ''}`}
              style={[styles.review, { borderBottomColor: theme.goldSoft }]}
              pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
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

          <View style={styles.frameGap}>
            <Frame flush>
              {LEARNING_ORDER.map((surah, index) => {
                const done = isMemorised(surah.number);
                const last = index === LEARNING_ORDER.length - 1;

                return (
                  <Fragment key={surah.number}>
                    {/*
                      The one red line the whole order needs, where the jump
                      happens: between Al-Fatihah and An-Nas.
                    */}
                    {index === 1 && (
                      <View style={[styles.orderRubric, { borderBottomColor: theme.goldSoft }]}>
                        <Rubric label={t('quran.order')} />
                      </View>
                    )}
                    <PressableLink
                      href={{ pathname: '/surah/[number]', params: { number: String(surah.number) } }}
                      accessibilityLabel={`${surah.name}, ${surah.meaning}, ${surah.ayahs.length} ${t(
                        'count.ayahs',
                      )}${done ? `. ${t('quran.known')}` : ''}`}
                      style={[
                        styles.row,
                        { borderBottomColor: theme.goldSoft },
                        last && styles.rowLast,
                        /* Gilded: how an illuminator marks what is finished. */
                        done && { backgroundColor: theme.backgroundSelected },
                      ]}
                      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
                      {/*
                        The surah's own number, not its position in the list —
                        it is what it is called in every mushaf — in the same
                        rosette its ayahs wear on the surah screen.
                      */}
                      <MushafRosette label={String(surah.number)} filled={done} size={32} />
                      <View style={styles.rowText}>
                        <View style={styles.nameRow}>
                          <ThemedText type="cardTitle">{surah.name}</ThemedText>
                          {/*
                            The Arabic name beside the transliteration, not
                            instead of it: recognising the shape of الإخلاص is
                            the first Arabic reading most people do without
                            noticing.
                          */}
                          <ThemedText type="arabicName" style={styles.nameArabic}>
                            {surah.nameArabic}
                          </ThemedText>
                        </View>
                        <ThemedText type="small" themeColor="textSecondary">
                          {surah.meaning} · {surah.ayahs.length} {t('count.ayahs')}
                        </ThemedText>
                      </View>
                    </PressableLink>
                  </Fragment>
                );
              })}
            </Frame>
          </View>
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
    paddingVertical: Spacing.four,
    /* Slimmer sides than the app's usual 24: the frame spends its own. */
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.four,
    /* The header owns the air above the band; a gap paints nothing. */
    paddingBottom: Spacing.two,
  },
  centred: {
    textAlign: 'center',
  },
  progress: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  /*
    The 38 stars wrap rather than count per row, so a narrow screen makes
    three quiet rows instead of clipping — the band is data, not a layout.
  */
  bandRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: Spacing.one,
    paddingTop: Spacing.three,
  },
  progressBody: {
    gap: 2,
    padding: Spacing.three,
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
  /* The frame's air above, as padding on a wrapper the press never lights. */
  frameGap: {
    paddingTop: Spacing.three,
  },
  orderRubric: {
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 64,
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowLast: {
    borderBottomWidth: 0,
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
    /* size and face: the `arabicName` rung; the trim's story lives with it */
    ...ARABIC_NAME_TRIM,
  },
});
