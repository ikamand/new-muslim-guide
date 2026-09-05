import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BookArch, GirihBand } from '@/components/illustrations';
import { Frame, JadwalRow, Rosette, Shelf, Unwan } from '@/components/jadwal';
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
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * The Learn tab: a book, open at the chapter you are in.
 *
 * Inside the jadwal frame, top to bottom: the current chapter as a contents
 * page — part and chapter named, the lessons numbered in rosettes, read ones
 * checked, the next one in lapis with its length — then the whole book as an
 * arcade, one row per part, then two doors that are about the reader rather
 * than the book: what they already know, and their firsts. Outside the frame,
 * the reference shelf, as marginalia.
 *
 * ## What this replaced, and why (4 Sep 2026)
 *
 * The page being written (2 Sep) — inked lines, a qalam resting where the
 * ink stopped, sketched titles on ragged rules — was beautiful and did not
 * survive its owner's own use. Iyad's review: "I don't know where I'm at,
 * which section I'm reading, why I'm reading one section without finishing
 * the previous one." Three causes, none of them the drawing: the pen was
 * standing in for a bookmark it was not; the scan that placed it started at
 * a tier prayer confidence chose and never said so; and the chapter block
 * never named the tier it sat in. Five directions were drawn (artifact
 * "Five Ways to Say Next"); he chose the contents page, the one with nothing
 * to decode, and named its words — part, chapter, lesson.
 *
 * Gone with it: the opening line (it opened lesson 1 of chapter 1, which is
 * the first row), the bare "Your firsts" row (now a door at the foot), the
 * `QalamLine`/`InkedLine`/`SketchedLine` trio and the reading-bookmark
 * special case they carried, and the words "Being written now", which a new
 * reader could take to mean the app itself was unfinished.
 *
 * Everything here is a VIEW of `completedLessons` — the one ledger — so the
 * page can never disagree with the unit screens or Today about what is done.
 * `lesson-scroll.tsx` says what it now takes to land a mark.
 */

const PRACTICE_CLIP_COUNT = getPracticeClipCount();
const SHOW_PRACTICE = hasPracticeBeyondSurahs();
const SHAHADA_STEP_COUNT = SHAHADA_GUIDE.steps.length;

/** A lesson's display name — the shared rule, so a line and a row agree. */
function lessonLabel(lesson: ResolvedLesson, t: (key: UIKey) => string): string {
  return lesson.labelKey ? t(lesson.labelKey as UIKey) : lesson.entry.title;
}

/** "Part 1" — the tier's number, in the reader's word for it. */
function partLabel(tierIndex: number, t: (key: UIKey) => string): string {
  return t('learn.part').replace('{n}', String(tierIndex + 1));
}

/**
 * Becoming Muslim, still a hero while it is not done — for somebody who has
 * not said the shahada it is the one thing on the tab that matters. Once
 * said, the chapter's first row carries it, checked.
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

type LineState = 'done' | 'next' | 'later';

/**
 * One line of the contents page. Three states, and each is said one way:
 * a read lesson is checked at its end (the same malachite check the shahada
 * carried, and the tier screen still does); the next one is lapis with its
 * length and an arrow, because lapis is the pressable colour; the rest are
 * set in the quiet colour and faded — named, so the person whose friend dies
 * on Tuesday can see "When someone dies" waiting, and pressable, because
 * nothing here is locked.
 */
function LessonLine({
  lesson,
  index,
  state,
}: {
  lesson: ResolvedLesson;
  index: number;
  state: LineState;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const label = lessonLabel(lesson, t);
  const minutes = lesson.entry.meta?.estimatedMinutes;
  const next = state === 'next';
  const nextMeta = minutes
    ? `${t('lesson.next')} · ${minutes} ${t('count.minutes')}`
    : t('lesson.next');

  return (
    <PressableLink
      href={routeFor(lesson.entry)}
      accessibilityLabel={
        next ? `${nextMeta}. ${label}` : state === 'done' ? `${label}. ${t('journey.done')}` : label
      }
      style={styles.lessonLine}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <Rosette label={String(index + 1)} tone={next ? 'accent' : 'gold'} />
      <ThemedText
        type="default"
        themeColor={next ? 'accent' : state === 'later' ? 'textSecondary' : 'text'}
        style={[
          styles.lessonTitle,
          next && styles.lessonTitleNext,
          state === 'later' && styles.lessonTitleLater,
        ]}>
        {label}
      </ThemedText>
      {state === 'done' && (
        <Ionicons name="checkmark-circle-outline" size={18} color={theme.malachite} />
      )}
      {next && (
        <View style={styles.lessonNext}>
          <ThemedText type="caption" themeColor="accent">
            {nextMeta}
          </ThemedText>
          <Ionicons name="arrow-forward" size={16} color={theme.accent} />
        </View>
      )}
    </PressableLink>
  );
}

/**
 * The chapter you are in, as its contents page.
 *
 * The head names the address in full — part, chapter, lesson n of m — which
 * is the whole of "where am I". Out-of-order reading draws itself: a lesson
 * finished early is a checked line below the lapis one. The lapis line is
 * always `next`, the book's first unfinished lesson.
 */
function ContentsBlock({
  unit,
  tierIndex,
  tierId,
  next,
}: {
  unit: ResolvedUnit;
  tierIndex: number;
  tierId: ResolvedTier['id'];
  next: ResolvedLesson;
}) {
  const { t } = useLocale();
  const at = unit.lessons.findIndex((lesson) => lesson.key === next.key);

  return (
    <View>
      <View style={styles.chapterHead}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {`${partLabel(tierIndex, t)} · ${t(`curriculum.tier.${tierId}` as UIKey)}`}
        </ThemedText>
        <View style={styles.chapterTitleRow}>
          <ThemedText type="sectionTitle" style={styles.chapterTitle}>
            {t(`curriculum.unit.${unit.id}` as UIKey)}
          </ThemedText>
          <ThemedText type="caption" themeColor="textSecondary">
            {t('learn.lesson.of')
              .replace('{n}', String(at + 1))
              .replace('{total}', String(unit.total))}
          </ThemedText>
        </View>
      </View>
      {unit.lessons.map((lesson, index) => (
        <LessonLine
          key={lesson.key}
          lesson={lesson}
          index={index}
          state={lesson.done ? 'done' : lesson.key === next.key ? 'next' : 'later'}
        />
      ))}
    </View>
  );
}

/**
 * The whole book: the three parts as an arcade elevation, one row each.
 *
 * Two lines a row, since 4 Sep: the part and its count above with the
 * chevron, the name beside its arches below. One line held all three and
 * the label wrapped at 360 beside six arches; this way the kicker has the
 * width and the name only shares its line with the chapters it names.
 * Every row is a door to its part's own screen.
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
        const current = tierIndex === penTierIndex;
        const name = t(`curriculum.tier.${tier.id}` as UIKey);
        /*
          A part nobody has started says how long it is, not "0 of 17 read":
          three rows of zeroes on a first open is homework, not a book.
        */
        const count =
          tier.done > 0
            ? t('learn.part.read')
                .replace('{done}', String(tier.done))
                .replace('{total}', String(tier.total))
            : `${tier.total} ${t('count.lessons')}`;
        const kicker = `${partLabel(tierIndex, t)} · ${count}`;
        return (
          <PressableLink
            key={tier.id}
            href={{ pathname: '/tier/[id]', params: { id: tier.id } }}
            accessibilityLabel={`${kicker}. ${name}`}
            style={[styles.bookRow, { borderBottomColor: theme.goldSoft }]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.bookLine}>
              <ThemedText
                type="caption"
                themeColor="textSecondary"
                numberOfLines={1}
                style={[styles.kicker, styles.bookLabel]}>
                {kicker}
              </ThemedText>
              <Ionicons name="chevron-forward" size={14} color={theme.textSecondary} />
            </View>
            <View style={styles.bookLine}>
              <ThemedText type={current ? 'smallBold' : 'small'} style={styles.bookLabel}>
                {name}
              </ThemedText>
              <View style={styles.bookArches}>
                {tier.units.map((unit, unitIndex) => (
                  <BookArch
                    key={unit.id}
                    clipId={`arch-${tier.id}-${unit.id}`}
                    done={unit.done}
                    total={unit.total}
                    current={current && unitIndex === penUnitIndex}
                    color={theme.accent}
                    trackColor={theme.textSecondary}
                    dotColor={theme.gold}
                  />
                ))}
              </View>
            </View>
          </PressableLink>
        );
      })}
    </View>
  );
}

/**
 * Two doors at the book's foot, the same shape, both ABOUT the reader rather
 * than in the book: the ledger where they correct what the app assumes, and
 * their firsts — a record of a life, which `content/firsts.ts` says in its
 * first line is not a count of lessons and so was never a row for the top.
 */
function Doors() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View>
      <PressableLink
        href="/progress"
        accessibilityLabel={`${t('learn.progress')}. ${t('learn.progress.meta')}`}
        style={[styles.door, styles.doorRule, { borderBottomColor: theme.goldSoft }]}
        pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
        <View style={styles.cardText}>
          <ThemedText type="caption" themeColor="gold" style={styles.kicker}>
            {t('learn.progress')}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('learn.progress.meta')}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
      </PressableLink>
      <PressableLink
        href="/firsts"
        accessibilityLabel={`${t('firsts.title')}. ${t('firsts.meta')}`}
        style={styles.door}
        pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
        <View style={styles.cardText}>
          <ThemedText type="caption" themeColor="gold" style={styles.kicker}>
            {t('firsts.title')}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('firsts.meta')}
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
  const { completedLessons } = useSettings();

  const shahadaDone = isLessonDone(SHAHADA_KEY, completedLessons);
  const unit = next && nextTierIndex !== -1 ? tiers[nextTierIndex].units[nextUnitIndex] : undefined;

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

        {/* The frame: the book inside, commentary outside. */}
        <Frame>
          {unit && next ? (
            <ContentsBlock
              unit={unit}
              tierIndex={nextTierIndex}
              tierId={tiers[nextTierIndex].id}
              next={next}
            />
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
          <Doors />
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
    /* The air between the ʿunwān's closing rule and the frame's opening one
       is the header's, as padding — never a container gap. Nothing above the
       opening rule: the scroll's own paddingTop is the whole of it. */
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

  /* The head opens the frame, so the frame's own inset is its air above. */
  chapterHead: {
    gap: 2,
    paddingBottom: Spacing.one,
  },
  chapterTitleRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  chapterTitle: {
    flexShrink: 1,
  },
  lessonLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three - Spacing.one,
    minHeight: 44,
    paddingVertical: Spacing.half,
  },
  lessonTitle: {
    flex: 1,
  },
  lessonTitleNext: {
    fontWeight: '600',
  },
  /* Named, faded: the sketched title of 3 Sep, kept for the same reason. */
  lessonTitleLater: {
    opacity: 0.7,
  },
  lessonNext: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  doneLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
  },

  bookRow: {
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  bookLine: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  bookLabel: {
    flex: 1,
  },
  bookArches: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  door: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    paddingVertical: Spacing.two,
  },
  doorRule: {
    borderBottomWidth: StyleSheet.hairlineWidth,
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
