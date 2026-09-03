import Ionicons from '@expo/vector-icons/Ionicons';
import { Fragment, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { HeadpieceMark } from '@/components/illustrations';
import { Frame, MushafRosette, Rubric, Unwan } from '@/components/jadwal';
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
        {/* The ʿunwān every other tab opens with — this one was the odd
            page out, left-aligned with no rules (Iyad's four-tab review). */}
        <View style={styles.header}>
          <Unwan
            title={t('quran.title')}
            subtitle={t('quran.intro')}
            headpiece={<HeadpieceMark color={theme.gold} trackColor={theme.goldSoft} />}
          />
        </View>

        {/*
          One zero-gap group from the band down: the band's rule, the review
          row and the frame touch — the flush-join rule.
        */}
        <View>
          <View style={[styles.progress, { borderBottomColor: theme.goldSoft }]}>
            <WoundStrand known={isMemorised} />
            {/* The count is the band's caption, nothing more — the
                reassurance sentence now closes the frame instead. */}
            <ThemedText type="caption" themeColor="textSecondary" style={styles.bandCount}>
              {t('quran.progress')
                .replace('{done}', String(count))
                .replace('{total}', String(LEARNING_ORDER.length))}
            </ThemedText>
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
                      <MushafRosette label={String(surah.number)} filled={done} size={34} />
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

          {/*
            The one sentence of honesty, at the table's foot — the position
            Awqat gives its Hijri note. As preamble it was one more strip
            between the reader and the fihrist; as a colophon it is the last
            word, which is what reassurance should be.
          */}
          <ThemedText type="small" themeColor="textSecondary" style={styles.footNote}>
            {t('quran.progress.help')}
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/*
  The strand's geometry. Three coils, and the row counts are DERIVED from
  the learning order's length so a 39th surah could never fall off the
  thread silently. y-positions and insets are the same constants the thread
  path is built from — the Awqat rule: a bead cannot sit off the thread,
  because both are computed from one set of numbers.
*/
const STRAND_YS = [18, 56, 94] as const;
const STRAND_HEIGHT = 126;
const STRAND_INSET = 26;

function strandRows(total: number): [number, number, number] {
  const first = Math.ceil(total / 3);
  const second = Math.ceil((total - first) / 2);
  return [first, second, total - first - second];
}

/**
 * The whole book as one misbaha, wound in three coils.
 *
 * 38 beads on one continuous thread: along the top, a turn at the edge,
 * back along the second row — so the LEARNING ORDER runs along the thread,
 * and row two reads right-to-left because the strand turned — then a turn,
 * the last coil, and the tassel after the final bead: An-Naba, the surah
 * the juz is named for. The strand ends because the juz does.
 *
 * A bead gilds the day its surah is marked known: the gold travels down
 * the strand over years, an illumination the reader lays themselves. The
 * beads are eight-point stars, not circles — the star is this tab's mark,
 * shared with the fihrist rosettes below; the thread carries the misbaha
 * feeling on its own. Duʿa holds the day's short strand, this tab the long
 * strand of the book (Iyad's ask, 2 Sep: "match the feeling").
 *
 * Display-only: at bead size these are not honest tap targets, and the
 * fihrist below is the navigation. Bead size shrinks with the screen so
 * the coils can never overflow a narrow phone.
 */
function WoundStrand({ known }: { known: (surah: number) => boolean }) {
  const theme = useTheme();
  const [width, setWidth] = useState(0);

  const rows = strandRows(LEARNING_ORDER.length);
  const step = width > 0 ? (width - 2 * STRAND_INSET) / (rows[0] - 1) : 0;
  const size = Math.min(20, Math.max(12, Math.floor(step - 3)));
  const arm = size * 0.31;

  const beads: { x: number; y: number; surah: number }[] = [];
  let index = 0;
  rows.forEach((count, row) => {
    for (let i = 0; i < count; i++) {
      const surah = LEARNING_ORDER[index];
      if (surah) {
        beads.push({
          /* Row two runs right-to-left: the thread turned, and the order
             follows the thread, never the reading direction. */
          x: row === 1 ? width - STRAND_INSET - step * i : STRAND_INSET + step * i,
          y: STRAND_YS[row],
          surah: surah.number,
        });
      }
      index++;
    }
  });

  const xl = STRAND_INSET;
  const xr = width - STRAND_INSET;
  const turn1 = (STRAND_YS[1] - STRAND_YS[0]) / 2;
  const turn2 = (STRAND_YS[2] - STRAND_YS[1]) / 2;
  const lastX = xl + step * (rows[2] - 1);
  const tailX = lastX + Math.min(22, step);
  const tailY = STRAND_YS[2] + 8;
  const thread =
    `M ${xl} ${STRAND_YS[0]} H ${xr} ` +
    `A ${turn1} ${turn1} 0 0 1 ${xr} ${STRAND_YS[1]} H ${xl} ` +
    `A ${turn2} ${turn2} 0 0 0 ${xl} ${STRAND_YS[2]} H ${lastX + 10} ` +
    `Q ${tailX - 4} ${STRAND_YS[2]} ${tailX} ${tailY}`;

  return (
    <View
      style={styles.strand}
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      {width > 0 && (
        <Svg width={width} height={STRAND_HEIGHT}>
          <Path d={thread} stroke={theme.goldSoft} strokeWidth={1.2} fill="none" />
          {/* The tassel, after the last bead. */}
          <Path
            d={`M ${tailX} ${tailY} v 7 m -4 -2 l 4 6 l 4 -6`}
            stroke={theme.goldSoft}
            strokeWidth={1}
            fill="none"
          />
          {beads.map((bead) => {
            const filled = known(bead.surah);
            return (
              <G key={bead.surah}>
                {/* A paper disc: the thread passes behind, never through. */}
                <Circle cx={bead.x} cy={bead.y} r={size / 2 + 2} fill={theme.background} />
                <Rect
                  x={bead.x - arm}
                  y={bead.y - arm}
                  width={2 * arm}
                  height={2 * arm}
                  fill={filled ? theme.gold : 'none'}
                  fillOpacity={filled ? 0.85 : 1}
                  stroke={filled ? undefined : theme.goldSoft}
                  strokeWidth={filled ? 0 : 1.4}
                />
                <Rect
                  x={bead.x - arm}
                  y={bead.y - arm}
                  width={2 * arm}
                  height={2 * arm}
                  fill={filled ? theme.gold : 'none'}
                  fillOpacity={filled ? 0.85 : 1}
                  stroke={filled ? undefined : theme.goldSoft}
                  strokeWidth={filled ? 0 : 1.4}
                  transform={`rotate(45 ${bead.x} ${bead.y})`}
                />
              </G>
            );
          })}
        </Svg>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    /* Spacing.three, the measure every tab opens on — see `(tabs)/index.tsx`. */
    paddingTop: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    /* The header owns the air above the band; a gap paints nothing. */
    paddingBottom: Spacing.two,
  },
  progress: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  strand: {
    height: STRAND_HEIGHT,
    marginTop: Spacing.two,
  },
  bandCount: {
    textAlign: 'center',
    paddingTop: Spacing.two,
    paddingBottom: Spacing.three,
  },
  footNote: {
    textAlign: 'center',
    paddingTop: Spacing.three,
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
