import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';

import { BookArch, GirihBand, QalamMark } from '@/components/illustrations';
import { Frame, JadwalRow, Shelf, Unwan } from '@/components/jadwal';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { TopicRow, type TopicSpec } from '@/components/topic-row';
import { routeFor } from '@/lib/content-routes';
import {
  DAILY_PRAYERS,
  getPracticeClipCount,
  hasPracticeBeyondSurahs,
  IMAN_PILLARS,
  PHRASES,
  PILLARS,
  SHAHADA_GUIDE,
} from '@/content';
import { isLessonDone, SHAHADA_KEY } from '@/content/curriculum';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import {
  useCurriculum,
  type ResolvedLesson,
  type ResolvedTier,
  type ResolvedUnit,
} from '@/hooks/use-curriculum';
import { useLocale } from '@/hooks/use-locale';
import { useReadingInProgress } from '@/hooks/use-reading';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * The Learn tab: the page your life is writing.
 *
 * The path stopped being a list on 2 Sep. It is now a manuscript page inside
 * a drawn jadwal frame: a finished lesson is a line of ink closed with an
 * end-mark, an unread one is a blank ruled line — paper waiting, not
 * homework owed — and the next lesson is half-written, with the qalam
 * resting where the ink stops. The tiers are the whole book, drawn as an
 * arcade whose arches fill with ink; the reference shelf lives OUTSIDE the
 * frame, where a manuscript keeps its commentary.
 *
 * What this replaced, deliberately: the where-you-are card, the carry-on
 * button (the qalam line IS carry-on), the you-were-reading row (the pen
 * rests at your furthest ink; Today still offers off-path reads back), the
 * left-in-this-chapter list (the blank lines carry it), the chip strip and
 * the tier-door rows (the arcade carries both). Six affordances became a
 * page. Design record: docs/ui-redesign-plan.md, 2 Sep 2026.
 *
 * Everything here is a VIEW of `completedLessons` — the one ledger — so the
 * page can never disagree with the unit screens or Today about what is done.
 */

const PRACTICE_CLIP_COUNT = getPracticeClipCount();
const SHOW_PRACTICE = hasPracticeBeyondSurahs();
const SHAHADA_STEP_COUNT = SHAHADA_GUIDE.steps.length;

/** A lesson's display name — the shared rule, so a line and a row agree. */
function lessonLabel(lesson: ResolvedLesson, t: (key: UIKey) => string): string {
  return lesson.labelKey ? t(lesson.labelKey as UIKey) : lesson.entry.title;
}

/**
 * Becoming Muslim, still a hero while it is not done — for somebody who has
 * not said the shahada it is the one thing on the tab that matters. Once
 * said, it becomes the book's opening line inside the frame instead.
 */
function ShahadaHero() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <PressableLink
      href={{ pathname: '/guide/[id]', params: { id: 'shahada' } }}
      accessibilityLabel={`${t('learn.shahada.title')}. ${t('learn.shahada.subtitle')}`}
      style={[styles.featured, { borderColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={[styles.band, { backgroundColor: theme.accentMuted }]}>
        <GirihBand color={theme.accent} height={76} filled={false} />
      </View>
      <View style={styles.featuredBody}>
        <View style={styles.cardText}>
          <ThemedText type="cardTitle">{t('learn.shahada.title')}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('learn.shahada.subtitle')}
          </ThemedText>
        </View>
        <View style={[styles.featuredAction, { backgroundColor: theme.action }]}>
          <ThemedText type="smallBold" themeColor="onAction">
            {`${SHAHADA_STEP_COUNT} ${t('count.steps')}`}
          </ThemedText>
          <Ionicons name="arrow-forward" size={14} color={theme.textOnAccent} />
        </View>
      </View>
    </PressableLink>
  );
}

/** The first sentence of this book: the shahada, written, with its mark. */
function OpeningLine() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <PressableLink
      href={{ pathname: '/guide/[id]', params: { id: 'shahada' } }}
      accessibilityLabel={t('learn.shahada.line')}
      style={styles.openLine}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <Ionicons name="checkmark-circle" size={18} color={theme.malachite} />
      <View style={styles.cardText}>
        <ThemedText type="caption" themeColor="gold" style={styles.kicker}>
          {t('learn.openingLine')}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('learn.shahada.line')}
        </ThemedText>
      </View>
      <Ionicons name="arrow-forward" size={14} color={theme.accent} />
    </PressableLink>
  );
}

/** The mark a mushaf sets after an ayah, closing a written line. */
function EndMark() {
  const theme = useTheme();
  return (
    <Svg width={9} height={9} viewBox="0 0 10 10">
      <Circle cx={5} cy={5} r={2.4} fill={theme.gold} />
      <Circle cx={5} cy={5} r={4.2} stroke={theme.goldSoft} strokeWidth={0.8} fill="none" />
    </Svg>
  );
}

/** A finished lesson: its title in ink, closed with the end-mark. */
function InkedLine({ lesson }: { lesson: ResolvedLesson }) {
  const theme = useTheme();
  const { t } = useLocale();
  const label = lessonLabel(lesson, t);

  return (
    <PressableLink
      href={routeFor(lesson.entry)}
      accessibilityLabel={label}
      style={styles.inkLine}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <ThemedText type="default" numberOfLines={1} style={styles.inkTitle}>
        {label}
      </ThemedText>
      <EndMark />
    </PressableLink>
  );
}

/**
 * The half-written line: the next lesson, with the qalam resting where the
 * ink stops. This IS carry-on — the button it replaced said the same thing
 * in a sentence. `fraction` is how far the reading bookmark got INTO this
 * lesson, so the ink literally grows as far as the reader did; the pen sits
 * at the boundary, capped short of the arrow so the two never collide.
 */
function QalamLine({ lesson, fraction }: { lesson: ResolvedLesson; fraction: number }) {
  const theme = useTheme();
  const { t } = useLocale();
  const label = lessonLabel(lesson, t);
  const at = Math.round(Math.min(fraction, 0.8) * 100);

  return (
    <PressableLink
      href={routeFor(lesson.entry)}
      accessibilityLabel={`${t('journey.carryOn')}. ${label}`}
      style={styles.qalamLine}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <ThemedText
        type="default"
        themeColor="accent"
        numberOfLines={1}
        style={styles.qalamTitle}>
        {label}
      </ThemedText>
      <View style={styles.rest}>
        <View style={[styles.restRule, { backgroundColor: theme.goldSoft }]} />
        {at > 0 && (
          <View style={[styles.restInk, { backgroundColor: theme.gold, width: `${at}%` }]} />
        )}
        <View style={[styles.penAt, { left: `${at}%` }]}>
          <QalamMark color={theme.text} size={26} />
        </View>
      </View>
      <Ionicons name="arrow-forward" size={16} color={theme.accent} />
    </PressableLink>
  );
}

/*
  Blank rules run ragged like real text, not justified like a form. Three
  lengths, cycled — deterministic so the page does not shimmer on re-render.
*/
const RAGGED = ['88%', '96%', '74%'] as const;

/**
 * An unread lesson: its title sketched in faint ink on a ruled line — a
 * scribe's underdrawing, waiting to be gilded.
 *
 * These began as bare blank rules ("paper waiting, not homework owed"),
 * and Iyad's device review found the cost: the chapter was a riddle at
 * first sight (3 Sep — the retreat recorded the day the page shipped).
 * With the titles whispering, the three states read at a glance — inked,
 * at the pen, sketched — and the surface preview returns: the person
 * whose friend dies on Tuesday can SEE "When someone dies" waiting.
 *
 * Pressable, unlike the bare rules: nothing here is locked, and a line
 * that shows a name will be tapped — a named line that answers nothing
 * reads as broken, where an unnamed one read as paper.
 */
function SketchedLine({ lesson, index }: { lesson: ResolvedLesson; index: number }) {
  const theme = useTheme();
  const { t } = useLocale();
  const label = lessonLabel(lesson, t);
  return (
    <PressableLink
      href={routeFor(lesson.entry)}
      accessibilityLabel={label}
      style={styles.blankLine}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <ThemedText
        type="default"
        themeColor="textSecondary"
        numberOfLines={1}
        style={styles.sketchTitle}>
        {label}
      </ThemedText>
      <View
        style={[
          styles.blankRule,
          { backgroundColor: theme.goldSoft, width: RAGGED[index % RAGGED.length] },
        ]}
      />
    </PressableLink>
  );
}

/**
 * The chapter being written: the open unit as manuscript lines.
 *
 * Out-of-order reading draws itself — a lesson finished early is simply an
 * inked line below a blank one, the gap a copyist left to fill later. The
 * pen always rests at the FIRST unwritten line, which is `next`.
 */
function ChapterBlock({
  unit,
  next,
  fraction,
}: {
  unit: ResolvedUnit;
  next: ResolvedLesson;
  fraction: number;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View>
      <PressableLink
        href={{ pathname: '/unit/[id]', params: { id: unit.id } }}
        accessibilityLabel={`${t('learn.writingNow')}. ${t(`curriculum.unit.${unit.id}` as UIKey)}`}
        style={styles.chapterHead}
        pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {t('learn.writingNow')}
        </ThemedText>
        <ThemedText type="sectionTitle">{t(`curriculum.unit.${unit.id}` as UIKey)}</ThemedText>
      </PressableLink>
      {unit.lessons.map((lesson, index) =>
        lesson.done ? (
          <InkedLine key={lesson.key} lesson={lesson} />
        ) : lesson.key === next.key ? (
          <QalamLine key={lesson.key} lesson={lesson} fraction={fraction} />
        ) : (
          <SketchedLine key={lesson.key} lesson={lesson} index={index} />
        ),
      )}
    </View>
  );
}

/**
 * The whole book: the three tiers as an arcade elevation, one row each.
 * Every row is a door to its tier's own screen; the ledger door sits at the
 * book's foot because it is ABOUT the book — the person who needs it is
 * looking at a page that has them wrong.
 */
function BookMap({
  tiers,
  penTierIndex,
  penUnitIndex,
}: {
  tiers: readonly ResolvedTier[];
  penTierIndex: number;
  penUnitIndex: number;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View>
      <Shelf label={t('learn.wholeBook')} />
      {tiers.map((tier, tierIndex) => {
        const meta =
          tier.total > 0 && tier.done === tier.total
            ? t('learn.book.written')
            : tier.done > 0
              ? t('journey.progress')
                  .replace('{done}', String(tier.done))
                  .replace('{total}', String(tier.total))
              : `${tier.total} ${t('count.lessons')}`;
        return (
          <PressableLink
            key={tier.id}
            href={{ pathname: '/tier/[id]', params: { id: tier.id } }}
            accessibilityLabel={`${t(`curriculum.tier.${tier.id}` as UIKey)}. ${meta}`}
            style={[styles.bookRow, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.bookLabel}>
              <ThemedText type={tierIndex === penTierIndex ? 'smallBold' : 'small'}>
                {t(`curriculum.tier.${tier.id}` as UIKey)}
              </ThemedText>
              <ThemedText type="caption" themeColor="textSecondary">
                {meta}
              </ThemedText>
            </View>
            <View style={styles.bookArches}>
              {tier.units.map((unit, unitIndex) => (
                <BookArch
                  key={unit.id}
                  clipId={`arch-${tier.id}-${unit.id}`}
                  done={unit.done}
                  total={unit.total}
                  current={tierIndex === penTierIndex && unitIndex === penUnitIndex}
                  color={theme.accent}
                  trackColor={theme.textSecondary}
                  dotColor={theme.gold}
                />
              ))}
            </View>
            <Ionicons name="chevron-forward" size={14} color={theme.textSecondary} />
          </PressableLink>
        );
      })}
      <PressableLink
        href="/progress"
        accessibilityLabel={`${t('learn.progress')}. ${t('learn.progress.meta')}`}
        style={styles.ledger}
        pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
        <View style={styles.bookLabel}>
          <ThemedText type="caption" themeColor="gold" style={styles.kicker}>
            {t('learn.progress')}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('learn.progress.meta')}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
      </PressableLink>
    </View>
  );
}

/** The shelf of things you return to rather than read once. */
function REFERENCE_SHELF(t: (key: UIKey) => string): TopicSpec[] {
  const rows: TopicSpec[] = [
    /*
      Every prayer first, because it is the row this shelf exists for: the
      farḍ/sunnah table used to sink with the Praying shelf the day somebody
      learned to pray — practice content filed as learning content. This
      shelf never sorts, so the counts stay one tap away forever.
    */
    {
      key: 'screen:pray',
      href: '/pray',
      title: t('learn.everyPrayer.title'),
      subtitle: t('learn.everyPrayer.subtitle'),
      count: DAILY_PRAYERS.length,
      unit: 'count.prayers',
    },
    {
      key: 'screen:phrases',
      href: '/phrases',
      title: t('learn.phrases.title'),
      subtitle: t('learn.phrases.subtitle'),
      count: PHRASES.length,
      unit: 'count.phrases',
    },
  ];

  if (SHOW_PRACTICE) {
    rows.push({
      key: 'screen:practice',
      href: '/practice',
      title: t('learn.practice.title'),
      subtitle: t('learn.practice.subtitle'),
      count: PRACTICE_CLIP_COUNT,
      unit: 'count.clips',
    });
  }

  rows.push(
    {
      key: 'screen:iman',
      href: '/iman',
      title: t('learn.iman.title'),
      subtitle: t('learn.iman.subtitle'),
      count: IMAN_PILLARS.length,
      unit: 'count.articles',
    },
    {
      key: 'screen:pillars',
      href: '/pillars',
      title: t('learn.pillars.title'),
      subtitle: t('learn.pillars.subtitle'),
      count: PILLARS.length,
      unit: 'count.pillars',
    },
  );

  return rows;
}

export default function LearnScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { tiers, next, nextTierIndex, nextUnitIndex } = useCurriculum();
  const reading = useReadingInProgress();
  const { completedLessons } = useSettings();

  const shahadaDone = isLessonDone(SHAHADA_KEY, completedLessons);
  const unit = next && nextTierIndex !== -1 ? tiers[nextTierIndex].units[nextUnitIndex] : undefined;
  /*
    The reading bookmark folds into the qalam line: when the half-read page
    IS the next lesson, its furthest scroll becomes the ink's length. An
    off-path read is not lost — Today's carry-on slot still offers it back.
  */
  const fraction = next && reading && reading.key === next.key ? reading.furthest : 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Unwan title={t('learn.title')} subtitle={t('learn.intro')} />
        </View>

        {!shahadaDone && (
          <View style={styles.heroWrap}>
            <ShahadaHero />
          </View>
        )}

        {/* The frame: the path inside, commentary outside. */}
        <Frame>
          {shahadaDone && <OpeningLine />}
          <PressableLink
            href="/firsts"
            accessibilityLabel={t('firsts.title')}
            style={[
              styles.firstsLine,
              shahadaDone && [styles.firstsRule, { borderTopColor: theme.goldSoft }],
            ]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('firsts.open')}
            </ThemedText>
            <Ionicons name="chevron-forward" size={14} color={theme.gold} />
          </PressableLink>

          {unit && next ? (
            <ChapterBlock unit={unit} next={next} fraction={fraction} />
          ) : (
            <PressableLink
              href="/library"
              accessibilityLabel={t('learn.where.done')}
              style={styles.doneLine}
              pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
              <ThemedText type="default">{t('learn.where.done')}</ThemedText>
              <Ionicons name="arrow-forward" size={16} color={theme.accent} />
            </PressableLink>
          )}

          <BookMap tiers={tiers} penTierIndex={nextTierIndex} penUnitIndex={nextUnitIndex} />
        </Frame>

        {/* Outside the frame: the marginalia. Unnumbered — not a sequence. */}
        <View>
          <Shelf label={t('learn.group.reference')} />
          <View>
            <JadwalRow
              href="/library"
              accessibilityLabel={`${t('learn.browse')}. ${t('learn.browse.subtitle')}`}
              title={t('learn.browse')}
              meta={t('learn.browse.subtitle')}
              trailing={<Ionicons name="chevron-forward" size={14} color={theme.gold} />}
            />
            {REFERENCE_SHELF(t).map(({ key, ...row }) => (
              <TopicRow key={key} {...row} />
            ))}
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
  /*
    Slimmer sides than the app's usual 24, like the Awqat table: the frame
    spends ~18px of its own on borders and inner padding, and a framed page
    running close to its edges is what the printed object does too (Iyad
    asked for the narrow sides, 2 Sep).
  */
  content: {
    paddingVertical: Spacing.four,
    paddingHorizontal: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.four,
    /* The air between the ʿunwān's closing rule and the frame's opening one
       is the header's, as padding — never a container gap. */
    paddingBottom: Spacing.three,
  },
  heroWrap: {
    paddingBottom: Spacing.three,
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  kicker: { textTransform: 'uppercase', letterSpacing: 1 },

  openLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingBottom: Spacing.two,
  },
  firstsLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  firstsRule: {
    borderTopWidth: StyleSheet.hairlineWidth,
  },

  chapterHead: {
    gap: 2,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  inkLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 34,
    paddingVertical: Spacing.half,
  },
  inkTitle: {
    flexShrink: 1,
  },
  qalamLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 48,
    paddingVertical: Spacing.one,
  },
  qalamTitle: {
    flexShrink: 1,
    fontWeight: '600',
  },
  /*
    The blank rule after the title, with the pen on it. Absolute children,
    positioned from the row's foot so the rule meets the title's baseline;
    the pen's nib is drawn at its own bottom-left, so `left: at%` with a
    small translate puts the nib exactly at the ink's edge.
  */
  rest: {
    flex: 1,
    alignSelf: 'stretch',
    minWidth: 44,
  },
  restRule: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
    height: StyleSheet.hairlineWidth,
  },
  restInk: {
    position: 'absolute',
    left: 0,
    bottom: 14,
    height: 2,
  },
  penAt: {
    position: 'absolute',
    bottom: 13,
    transform: [{ translateX: -6 }],
  },
  blankLine: {
    minHeight: 34,
    justifyContent: 'flex-end',
    gap: Spacing.half,
    paddingBottom: Spacing.two,
  },
  /* The whisper: present enough to name the line, faint enough to stay
     unwritten. Checked by lamplight — too faint and dark mode loses it. */
  sketchTitle: {
    opacity: 0.55,
  },
  blankRule: {
    height: StyleSheet.hairlineWidth,
  },
  doneLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },

  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  bookLabel: {
    flex: 1,
    gap: 0,
  },
  bookArches: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.one,
  },
  ledger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingTop: Spacing.two,
  },

  featured: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  band: {
    height: 76,
    overflow: 'hidden',
  },
  featuredBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  featuredAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.rule,
  },
});
