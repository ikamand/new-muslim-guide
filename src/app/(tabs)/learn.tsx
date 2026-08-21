import Ionicons from '@expo/vector-icons/Ionicons';
import { type Href } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GirihBand, Glyph, type GlyphName } from '@/components/illustrations';
import { JourneyProgress } from '@/components/journey-progress';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import {
  DUAS,
  getPracticeClipCount,
  IMAN_PILLARS,
  PHRASES,
  PILLARS,
  REFERENCES,
  SHAHADA_GUIDE,
} from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useJourney } from '@/hooks/use-journey';
import { useRecommendations } from '@/hooks/use-recommendations';
import { useTheme } from '@/hooks/use-theme';
import { routeFor } from '@/lib/content-routes';
import type { UIKey } from '@/i18n/ui';
import { localiseReference } from '@/i18n/localise';

const PRACTICE_CLIP_COUNT = getPracticeClipCount();
const SHAHADA_STEP_COUNT = SHAHADA_GUIDE.steps.length;

/**
 * A mark per topic, so six near-identical rows stop being six near-identical
 * rows. A reference without one simply has no tile — better than reaching for
 * a glyph that means nothing.
 */
const TOPIC_GLYPH: Record<string, GlyphName> = { mosque: 'mosque' };

function LearnCard({
  href,
  title,
  subtitle,
  count,
  unit,
  glyph,
}: {
  href: Href;
  title: string;
  subtitle: string;
  count: number;
  unit: UIKey;
  glyph?: GlyphName;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <PressableLink
      href={href}
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      {glyph && (
        <View style={[styles.tile, { backgroundColor: theme.accentMuted }]}>
          <Glyph name={glyph} color={theme.accent} />
        </View>
      )}
      <View style={styles.cardText}>
        <ThemedText type="cardTitle">
          {title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {subtitle}
        </ThemedText>
      </View>
      {/*
        The count used to be a bare accent number. "14" on its own tells you
        nothing; a beginner cannot tell whether it means minutes, pages or
        items they are expected to memorise.
      */}
      <View style={styles.count}>
        <ThemedText type="smallBold" themeColor="accent">
          {count}
        </ThemedText>
        <ThemedText type="caption" themeColor="textSecondary">
          {t(unit)}
        </ThemedText>
      </View>
    </PressableLink>
  );
}

/**
 * Becoming Muslim, given its own weight.
 *
 * Some people open this app before they are Muslim at all, and the one card
 * that matters to them was previously indistinguishable from the six below it.
 */
function ShahadaCard() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <PressableLink
      href={{ pathname: '/guide/[id]', params: { id: 'shahada' } }}
      style={[
        styles.featured,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={[styles.band, { backgroundColor: theme.accentMuted }]}>
        <GirihBand color={theme.accent} height={76} />
      </View>
      <View style={styles.featuredBody}>
        <View style={styles.cardText}>
          <ThemedText type="cardTitle">
            {t('learn.shahada.title')}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t('learn.shahada.subtitle')}
          </ThemedText>
        </View>
        <View style={[styles.featuredAction, { backgroundColor: theme.accent }]}>
          <ThemedText type="smallBold" themeColor="textOnAccent">
            {SHAHADA_STEP_COUNT} {t('count.steps')}
          </ThemedText>
          <Ionicons name="arrow-forward" size={14} color={theme.textOnAccent} />
        </View>
      </View>
    </PressableLink>
  );
}

/**
 * The way into the beginner path.
 *
 * Above the recommendations rather than beside them: the recommendations answer
 * "what should I read next", and this answers "is there an order to any of
 * this" — which is the question someone has in their first week. It carries its
 * progress so returning to the tab shows where they left off without opening
 * anything.
 */
function JourneyCard() {
  const theme = useTheme();
  const { t } = useLocale();
  const { done, total } = useJourney();

  return (
    <PressableLink
      href="/journey"
      accessibilityLabel={`${t('journey.title')}. ${t('journey.progress')
        .replace('{done}', String(done))
        .replace('{total}', String(total))}`}
      style={[styles.journey, { backgroundColor: theme.accentMuted, borderColor: theme.accent }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.journeyText}>
        <ThemedText type="cardTitle">
          {t('journey.title')}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('journey.intro')}
        </ThemedText>
        <View style={styles.journeyProgress}>
          <JourneyProgress done={done} total={total} />
        </View>
      </View>
      <Ionicons name="arrow-forward" size={20} color={theme.accent} />
    </PressableLink>
  );
}

/**
 * What onboarding pointed this reader at, if they answered.
 *
 * Absent entirely for anyone who skipped, rather than falling back to a generic
 * list under a personal heading — a section called "Where to start" that is the
 * same for everybody is worse than no section at all.
 *
 * Rendered from whatever resolves, so it shortens and lengthens on its own as
 * content is written. Nothing here names a lesson that does not exist.
 */
function RecommendedSection() {
  const theme = useTheme();
  const { t } = useLocale();
  const recommended = useRecommendations();

  if (recommended.length === 0) return null;

  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {t('learn.recommended')}
      </ThemedText>
      <View style={styles.list}>
        {recommended.map((entry) => (
          <PressableLink
            key={`${entry.kind}:${entry.id}`}
            href={routeFor(entry)}
            accessibilityLabel={`${entry.title}. ${entry.shortDescription}`}
            style={[
              styles.card,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <View style={styles.cardText}>
              <ThemedText type="cardTitle">
                {entry.title}
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {entry.shortDescription}
              </ThemedText>
            </View>
            <Ionicons name="arrow-forward" size={18} color={theme.accent} />
          </PressableLink>
        ))}
      </View>
    </View>
  );
}

export default function LearnScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();

  // Topics meant for a quiet minute rather than for mid-prayer.
  const learnTopics = REFERENCES.filter((reference) => reference.surface === 'learn').map(
    (reference) => localiseReference(reference, locale),
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{t('learn.title')}</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">{t('learn.intro')}</ThemedText>
        </View>

        <JourneyCard />

        <RecommendedSection />

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('learn.section.startHere')}
          </ThemedText>
          <View style={styles.list}>
            {/*
              Becoming Muslim leads the tab. Some people open this app before
              they are Muslim at all, and it used to be reachable only as an
              entry inside a reference page about the five pillars.
            */}
            <ShahadaCard />
            {learnTopics.map((topic) => (
              <LearnCard
                key={topic.id}
                href={{ pathname: '/reference/[id]', params: { id: topic.id } }}
                title={topic.title}
                subtitle={topic.subtitle}
                count={topic.sections.length}
                unit="count.sections"
                glyph={TOPIC_GLYPH[topic.id]}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('learn.section.everyDay')}
          </ThemedText>
          <View style={styles.list}>
            <LearnCard
              href="/phrases"
              title={t('learn.phrases.title')}
              subtitle={t('learn.phrases.subtitle')}
              count={PHRASES.length}
              unit="count.phrases"
              glyph="phrases"
            />
            <LearnCard
              href="/duas"
              title={t('learn.duas.title')}
              subtitle={t('learn.duas.subtitle')}
              count={DUAS.length}
              unit="count.duas"
              glyph="duas"
            />
            <LearnCard
              href="/practice"
              title={t('learn.practice.title')}
              subtitle={t('learn.practice.subtitle')}
              count={PRACTICE_CLIP_COUNT}
              unit="count.clips"
              glyph="practice"
            />
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
            {t('learn.section.understanding')}
          </ThemedText>
          <View style={styles.list}>
            <LearnCard
              href="/iman"
              title={t('learn.iman.title')}
              subtitle={t('learn.iman.subtitle')}
              count={IMAN_PILLARS.length}
              unit="count.articles"
              glyph="iman"
            />
            <LearnCard
              href="/pillars"
              title={t('learn.pillars.title')}
              subtitle={t('learn.pillars.subtitle')}
              count={PILLARS.length}
              unit="count.pillars"
              glyph="pillars"
            />
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
    padding: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.two,
    paddingTop: Spacing.four,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  /** Was Spacing.three here and Spacing.two on the Pray tab. Now both are two. */
  list: {
    gap: Spacing.two,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  tile: {
    width: 40,
    height: 40,
    borderRadius: Radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    flex: 1,
    gap: 2,
  },
  count: {
    alignItems: 'flex-end',
    gap: 1,
  },
  journey: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: 1,
  },
  journeyText: {
    flex: 1,
    gap: Spacing.one,
  },
  journeyProgress: {
    paddingTop: Spacing.one,
  },
  featured: {
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
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
    padding: Spacing.three,
  },
  featuredAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
  },
});
