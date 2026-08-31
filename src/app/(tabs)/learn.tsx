import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GirihBand, StagePath } from '@/components/illustrations';
import { JadwalRow, QuietRow, Rosette, Shelf, Unwan } from '@/components/jadwal';
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
import { useCurriculum, type ResolvedTier } from '@/hooks/use-curriculum';
import { useLocale } from '@/hooks/use-locale';
import { useReadingInProgress } from '@/hooks/use-reading';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * The Learn tab: the path, and one door to the library.
 *
 * This tab used to carry two orderings of the same content at once — the
 * journey's six stages in a card, and five by-moment shelves below it, fifty
 * rows deep. Two directions is no direction (docs/learn-redesign-plan.md).
 * Now it carries ONE: three tiers of units, the open one expanded, the other
 * two collapsed but alive. The shelves live on at `/library`, one quiet row
 * away, for the day life produces the question.
 */

const PRACTICE_CLIP_COUNT = getPracticeClipCount();
const SHOW_PRACTICE = hasPracticeBeyondSurahs();
const SHAHADA_STEP_COUNT = SHAHADA_GUIDE.steps.length;

/**
 * Becoming Muslim, given its own weight — and then stepping out of the way.
 *
 * A hero while it is not done, because for somebody who has not said the
 * shahada it is the one thing on the tab that matters; one line in the
 * header once it is, because "return to this a few times in your life" and
 * "second-largest object on the tab forever" are not the same claim.
 *
 * Done-ness comes from `isLessonDone` — the ONE predicate, shared with the
 * curriculum — so this card and the path can never again disagree about the
 * same fact, which they did when this read `shahadaState` and the journey
 * read only the tick.
 */
function ShahadaCard() {
  const theme = useTheme();
  const { t } = useLocale();
  const { completedLessons } = useSettings();

  if (isLessonDone(SHAHADA_KEY, completedLessons)) {
    return (
      <PressableLink
        href={{ pathname: '/guide/[id]', params: { id: 'shahada' } }}
        accessibilityLabel={t('learn.shahada.done.title')}
        style={[styles.keepsake, { borderTopColor: theme.border }]}
        pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
        <ThemedText type="small" themeColor="textSecondary">
          {t('learn.shahada.line')}
        </ThemedText>
        <Ionicons name="arrow-forward" size={14} color={theme.accent} />
      </PressableLink>
    );
  }

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

/**
 * Where you are — the unit, and what is left in it.
 *
 * The arches are the units of the tier the next lesson sits in, the star on
 * the unit itself: the same mihrab strip that carried six stages now carries
 * a tier's units, so "how far" is still a picture and never arithmetic.
 * Three remaining lessons at most, because listing eight is the wall this
 * card exists to replace.
 */
const SHOW_LEFT = 3;

function WhereYouAre() {
  const theme = useTheme();
  const { t } = useLocale();
  const { tiers, next, nextTierIndex, nextUnitIndex } = useCurriculum();

  if (!next || nextTierIndex === -1) {
    return (
      <PressableLink
        href="/library"
        accessibilityLabel={t('learn.where.done')}
        style={[styles.journey, { borderColor: theme.goldSoft }]}
        pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
        <ThemedText type="sectionTitle">{t('learn.where.done')}</ThemedText>
      </PressableLink>
    );
  }

  const tier = tiers[nextTierIndex];
  const unit = tier.units[nextUnitIndex];

  const path = tier.units.map((entry) => ({
    id: entry.id,
    label: t(`curriculum.short.${entry.id}` as UIKey),
    done: entry.total > 0 && entry.done === entry.total,
  }));

  const left = unit.lessons.filter((lesson) => !lesson.done).slice(0, SHOW_LEFT);

  return (
    <PressableLink
      href={{ pathname: '/unit/[id]', params: { id: unit.id } }}
      accessibilityLabel={`${t('learn.where.kicker')}. ${t(
        `curriculum.unit.${unit.id}` as UIKey,
      )}`}
      style={[styles.journey, { borderColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.cardText}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {t('learn.where.kicker')}
        </ThemedText>
        <ThemedText type="sectionTitle">{t(`curriculum.unit.${unit.id}` as UIKey)}</ThemedText>
      </View>

      <StagePath
        stages={path}
        currentIndex={nextUnitIndex}
        color={theme.accent}
        trackColor={theme.textSecondary}
        mutedColor={theme.textOnAccent}
      />

      {left.length > 0 ? (
        <View style={styles.left}>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
            {t('learn.where.left')}
          </ThemedText>
          {left.map((lesson) => (
            <ThemedText key={lesson.key} type="small" themeColor="textSecondary">
              {lesson.labelKey ? t(lesson.labelKey as UIKey) : lesson.entry.title}
            </ThemedText>
          ))}
        </View>
      ) : null}

      <View style={[styles.journeyAction, { backgroundColor: theme.action }]}>
        <ThemedText type="smallBold" themeColor="onAction" style={styles.journeyActionLabel}>
          {t('journey.carryOn')}
        </ThemedText>
        <Ionicons name="arrow-forward" size={18} color={theme.onAction} />
      </View>
    </PressableLink>
  );
}

/**
 * One tier, expanded: its units as ruled rows.
 *
 * A finished unit trades its chevron for a malachite tick — complete is what
 * malachite means — and the hairline along a started unit's foot is the same
 * bookmark every reading row carries: a place, not a score.
 */
function TierOpen({ tier }: { tier: ResolvedTier }) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View>
      {tier.units.map((unit, i) => {
        const finished = unit.total > 0 && unit.done === unit.total;
        return (
          <JadwalRow
            key={unit.id}
            href={{ pathname: '/unit/[id]', params: { id: unit.id } }}
            accessibilityLabel={`${t(`curriculum.unit.${unit.id}` as UIKey)}. ${t(
              'journey.progress',
            )
              .replace('{done}', String(unit.done))
              .replace('{total}', String(unit.total))}`}
            marginal={<Rosette label={String(i + 1)} />}
            title={t(`curriculum.unit.${unit.id}` as UIKey)}
            meta={t('journey.progress')
              .replace('{done}', String(unit.done))
              .replace('{total}', String(unit.total))}
            progress={!finished && unit.done > 0 ? unit.done / unit.total : undefined}
            trailing={
              finished ? (
                <Ionicons name="checkmark-circle" size={16} color={theme.malachite} />
              ) : (
                <Ionicons name="chevron-forward" size={14} color={theme.gold} />
              )
            }
          />
        );
      })}
    </View>
  );
}

/**
 * A door to another tier: its name, its purpose, its size — and everything
 * behind one tap. A door, never a gray-out: gray is the visual language of a
 * lock, and nothing here is locked — the person whose friend dies on Tuesday
 * finds janāzah on Tuesday.
 *
 * It NAVIGATES. This was an in-place accordion, and expanding one tier
 * collapsed the tier above it, so the page shifted under the reader's finger
 * and the row they tapped landed somewhere else (Iyad's device, 31 Aug). It
 * was also the only control on the tab that mutated the page rather than
 * opening a screen. A screen cannot jump.
 */
function TierDoor({ tier }: { tier: ResolvedTier }) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <PressableLink
      href={{ pathname: '/tier/[id]', params: { id: tier.id } }}
      accessibilityLabel={`${t(`curriculum.tier.${tier.id}` as UIKey)}. ${t(
        `curriculum.tier.${tier.id}.purpose` as UIKey,
      )}. ${tier.total} ${t('count.lessons')}`}
      style={[styles.tierDoor, { borderBottomColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.cardText}>
        <ThemedText type="caption" themeColor="gold" style={styles.kicker}>
          {t(`curriculum.tier.${tier.id}` as UIKey)}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t(`curriculum.tier.${tier.id}.purpose` as UIKey)}
        </ThemedText>
      </View>
      {/* The count at the row's end, where every shelf puts it — inside the
          sentence it collided with the purpose line's full stop. */}
      <ThemedText type="caption" themeColor="textSecondary">
        {String(tier.total)}
      </ThemedText>
      <Ionicons name="chevron-forward" size={16} color={theme.textSecondary} />
    </PressableLink>
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
  const { tiers, nextTierIndex, openTierIndex } = useCurriculum();
  const readingNow = useReadingInProgress();

  /*
    One spine. The tier shown in full is always the tier the reader is IN —
    the one holding the next lesson, falling back to confidence's starting
    tier once everything is done. No expansion state: the other tiers are
    doors to their own screens, so nothing on this page ever moves under a
    finger. The where-you-are card and its tier's unit rows are ONE section,
    because showing the card for one tier above a different tier's rows was
    two spines with equal claim — most of what "blended" (Iyad, 31 Aug).
  */
  const hereIndex = nextTierIndex !== -1 ? nextTierIndex : openTierIndex;
  const here = tiers[hereIndex];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Unwan title={t('learn.title')} subtitle={t('learn.intro')} />
        </View>

        {/* The first first, and the record of the ones after it. */}
        <View style={styles.section}>
          <ShahadaCard />
          <QuietRow
            href="/firsts"
            label={t('firsts.open')}
            accessibilityLabel={t('firsts.title')}
          />
        </View>

        {/* The spine: where you are, the units around it, doors to the rest. */}
        <View style={styles.section}>
          <WhereYouAre />
          {readingNow && (
            <JadwalRow
              href={routeFor(readingNow.entry)}
              kicker={t('today.reading')}
              title={readingNow.entry.title}
              progress={readingNow.furthest}
              trailing={<Ionicons name="chevron-forward" size={14} color={theme.gold} />}
            />
          )}
          {here && (
            <>
              <Shelf label={t(`curriculum.tier.${here.id}` as UIKey)} />
              <TierOpen tier={here} />
            </>
          )}
          {tiers.map((tier) => (tier.id === here?.id ? null : <TierDoor key={tier.id} tier={tier} />))}
          {/*
            The door to the progress screen — where the onboarding questions
            are re-asked and whole units can be marked known. At the spine's
            foot because it is ABOUT the spine: the person who needs it is
            looking at a path that has them wrong.
          */}
          <QuietRow
            href="/progress"
            label={t('learn.progress')}
            accessibilityLabel={t('learn.progress')}
          />
        </View>

        {/* The things you return to rather than read once. Unnumbered: a
            rosette means a sequence, and this shelf is not one. */}
        <View style={styles.section}>
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
    NO gap, on the container or the sections — the cure Today's comment
    describes, finished. Every join on this page involves a rule or a
    pressable box, and a container gap is air nothing paints: the rule
    floats, and a pressed row's highlight starts a band below the line
    above it (Iyad's held-press screenshots, 31 Aug — measured at 32px
    between the firsts rule and the where-you-are panel). The rule now:
    a rule and the next box TOUCH; air lives inside painted boxes, as
    padding, where the press shows it belonging to the row.
  */
  content: {
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.four,
    /* The one rule-to-rule join on the page: the ʿunwān's closing double
       rule against the hero's band (or the keepsake's own top rule). The
       air between them is the header's, as padding — not a container gap. */
    paddingBottom: Spacing.three,
  },
  section: {},
  cardText: {
    flex: 1,
    gap: 2,
  },
  journey: {
    gap: Spacing.three,
    paddingVertical: Spacing.four,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  kicker: { textTransform: 'uppercase', letterSpacing: 1 },
  left: { gap: Spacing.one },
  /*
    No negative margins. The pair that lived here compensated for the
    container gaps above — the fossil of the double-counted-air disease
    this stylesheet was cured of; with the gaps gone the row simply owns
    its padding like everything else.
  */
  keepsake: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.three,
  },
  journeyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    /* Air above it, or the list's last line reads as the button's label. */
    marginTop: Spacing.one,
    gap: Spacing.three,
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
  },
  journeyActionLabel: {
    flex: 1,
  },
  tierDoor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
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
