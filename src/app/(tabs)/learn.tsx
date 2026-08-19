import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GirihBand, Glyph, type GlyphName } from '@/components/illustrations';
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
import { useTheme } from '@/hooks/use-theme';
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
    <Link href={href} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}>
        {glyph && (
          <View style={[styles.tile, { backgroundColor: theme.accentMuted }]}>
            <Glyph name={glyph} color={theme.accent} />
          </View>
        )}
        <View style={styles.cardText}>
          <ThemedText type="smallBold" style={styles.cardTitle}>
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
          <ThemedText type="small" themeColor="textSecondary" style={styles.unit}>
            {t(unit)}
          </ThemedText>
        </View>
      </Pressable>
    </Link>
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
    <Link href={{ pathname: '/guide/[id]', params: { id: 'shahada' } }} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.featured,
          {
            backgroundColor: pressed ? theme.backgroundSelected : theme.backgroundElement,
            borderColor: theme.border,
          },
        ]}>
        <View style={[styles.band, { backgroundColor: theme.accentMuted }]}>
          <GirihBand color={theme.accent} height={76} />
        </View>
        <View style={styles.featuredBody}>
          <View style={styles.cardText}>
            <ThemedText type="smallBold" style={styles.cardTitle}>
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
      </Pressable>
    </Link>
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
  cardTitle: {
    fontSize: 17,
    lineHeight: 24,
  },
  count: {
    alignItems: 'flex-end',
    gap: 1,
  },
  unit: {
    fontSize: 12,
    lineHeight: 16,
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
