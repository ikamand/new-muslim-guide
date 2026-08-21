import Ionicons from '@expo/vector-icons/Ionicons';
import { type Href } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GirihBand, Glyph, StagePath, type GlyphName } from '@/components/illustrations';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import {
  DUAS,
  getPracticeClipCount,
  IMAN_PILLARS,
  PHRASES,
  PILLARS,
  SHAHADA_GUIDE,
  TOPIC_GROUPS,
} from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useJourney } from '@/hooks/use-journey';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { localiseReference } from '@/i18n/localise';

const PRACTICE_CLIP_COUNT = getPracticeClipCount();
const SHAHADA_STEP_COUNT = SHAHADA_GUIDE.steps.length;

/**
 * A mark per topic, so twenty near-identical rows stop being twenty
 * near-identical rows.
 *
 * This used to hold one entry. Every other Learn card rendered as bare text,
 * which is most of why the tab read as a wall: a reader scanning it had
 * nothing but a title to tell one row from the next.
 *
 * The keys are reference ids. A topic with no entry still renders — it simply
 * has no tile, which is better than reaching for a glyph that means nothing.
 */
const TOPIC_GLYPH: Record<string, GlyphName> = {
  mosque: 'mosque',
  wudu: 'wudu',
  'before-prayer': 'before-prayer',
  'al-fatihah': 'al-fatihah',
  'what-breaks-prayer': 'what-breaks-prayer',
  'dua-and-dhikr': 'dua-and-dhikr',
  'what-is-islam': 'what-is-islam',
  'who-is-allah': 'who-is-allah',
  'who-is-muhammad': 'who-is-muhammad',
  'what-is-the-quran': 'what-is-the-quran',
  sunnah: 'sunnah',
  food: 'food',
  clothing: 'clothing',
  'halal-and-haram': 'halal-and-haram',
  family: 'family',
  work: 'work',
  manners: 'manners',
  repentance: 'repentance',
  'patience-and-gratitude': 'patience-and-gratitude',
  ramadan: 'ramadan',
  'islamic-calendar': 'islamic-calendar',
};

function LearnCard({
  href,
  title,
  subtitle,
  count,
  unit,
  glyph,
  wide = false,
}: {
  href: Href;
  title: string;
  subtitle: string;
  count: number;
  unit: UIKey;
  glyph?: GlyphName;
  /** Full width, with the subtitle showing. For a card that carries a group. */
  wide?: boolean;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <PressableLink
      href={href}
      accessibilityLabel={`${title}. ${subtitle}. ${count} ${t(unit)}`}
      style={[
        styles.card,
        wide ? styles.cardWide : styles.cardTile,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      {glyph && (
        <View style={[styles.tile, { backgroundColor: theme.accentMuted }]}>
          <Glyph name={glyph} color={theme.accent} />
        </View>
      )}
      <View style={styles.cardText}>
        <ThemedText type="cardTitle" numberOfLines={3}>
          {title}
        </ThemedText>
        {/*
          A tile shows the count where a row shows the sentence. Two lines of
          subtitle in a half-width card is four lines of text, which is what
          turned the old full-width list into a wall — and the count is the
          part that tells you whether this is a minute or an afternoon.
        */}
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={wide ? 2 : 1}>
          {wide ? subtitle : `${count} ${t(unit)}`}
        </ThemedText>
      </View>
      {wide && (
        <View style={styles.count}>
          <ThemedText type="smallBold" themeColor="accent">
            {count}
          </ThemedText>
          <ThemedText type="caption" themeColor="textSecondary">
            {t(unit)}
          </ThemedText>
        </View>
      )}
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
  const { stages, done, total, nextStageIndex } = useJourney();

  /*
    The path as six arches rather than "6 of 36" over a bar.

    Thirty-six of what, and how far is six? A beginner cannot answer either,
    and a fraction is a poor thing to hand somebody three weeks into a
    religion. The arches answer it without arithmetic — filled behind, star on
    the one you are at — and they are the same mihrab the prayer times card
    draws, so the shape means the same thing in both places.
  */
  const path = stages.map((stage) => ({
    id: stage.id,
    label: t(`journey.short.${stage.id}` as UIKey),
    done: stage.steps.every((step) => step.done),
  }));

  return (
    <PressableLink
      href="/journey"
      accessibilityLabel={`${t('journey.title')}. ${t('journey.progress')
        .replace('{done}', String(done))
        .replace('{total}', String(total))}`}
      style={[styles.journey, { backgroundColor: theme.backgroundElement, borderColor: theme.border }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.journeyHead}>
        <ThemedText type="sectionTitle">{t('journey.title')}</ThemedText>
        <ThemedText type="smallBold" themeColor="accent">
          {t('journey.progress').replace('{done}', String(done)).replace('{total}', String(total))}
        </ThemedText>
      </View>

      <StagePath
        stages={path}
        currentIndex={nextStageIndex}
        color={theme.accent}
        trackColor={theme.textSecondary}
        mutedColor={theme.textOnAccent}
      />

      <View style={[styles.journeyAction, { backgroundColor: theme.accent }]}>
        <ThemedText type="smallBold" themeColor="textOnAccent" style={styles.journeyActionLabel}>
          {t('journey.carryOn')}
        </ThemedText>
        <Ionicons name="arrow-forward" size={18} color={theme.textOnAccent} />
      </View>
    </PressableLink>
  );
}

/** A group's name, with a rule running out to its count. */
function GroupHeading({ label, count }: { label: string; count?: number }) {
  const theme = useTheme();

  return (
    <View style={styles.groupHeading}>
      <ThemedText type="sectionTitle">{label}</ThemedText>
      <View style={[styles.rule, { backgroundColor: theme.border }]} />
      {count !== undefined && (
        <ThemedText type="caption" themeColor="textSecondary">
          {count}
        </ThemedText>
      )}
    </View>
  );
}

export default function LearnScreen() {
  const theme = useTheme();
  const { locale, t } = useLocale();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="subtitle">{t('learn.title')}</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">{t('learn.intro')}</ThemedText>
        </View>

        <JourneyCard />

        <ShahadaCard />

        {/*
          Grouped by when the question arrives, not by subject.

          This was nineteen consecutive rows under one heading, with a
          "Where to start" section above it resolving from the same tables — so
          "Becoming Muslim" and "What is Islam?" each appeared twice on one
          screen. A flat list of nineteen equals only serves a reader who
          already knows what they want, which is nobody this app is for.
        */}
        {TOPIC_GROUPS.map((group) => (
          <View key={group.id} style={styles.section}>
            <GroupHeading
              label={t(`learn.group.${group.id}` as UIKey)}
              count={group.topics.length}
            />
            <View style={styles.list}>
              {group.topics
                .map((topic) => localiseReference(topic, locale))
                .map((topic) => (
                  <LearnCard
                    key={topic.id}
                    href={{ pathname: '/reference/[id]', params: { id: topic.id } }}
                    title={topic.title}
                    subtitle={topic.subtitle}
                    count={topic.sections.length}
                    unit="count.sections"
                    glyph={TOPIC_GLYPH[topic.id]}
                    /*
                      A long title takes the whole row rather than being
                      truncated into one. "What you need before you pray" came
                      out as "What you need before …" in a half tile, which
                      hides the words that make it findable — and the ellipsis
                      is worse than the extra row it saves.

                      Measured rather than listed, so a retitled topic gets the
                      right shape without anybody remembering to update a table.
                    */
                    wide={topic.title.length > 22}
                  />
                ))}
            </View>
          </View>
        ))}

        {/* The things you return to rather than read once. */}
        <View style={styles.section}>
          <GroupHeading label={t('learn.group.reference')} />
          <View style={styles.list}>
            <LearnCard
              wide
              href="/phrases"
              title={t('learn.phrases.title')}
              subtitle={t('learn.phrases.subtitle')}
              count={PHRASES.length}
              unit="count.phrases"
              glyph="phrases"
            />
            <LearnCard
              wide
              href="/duas"
              title={t('learn.duas.title')}
              subtitle={t('learn.duas.subtitle')}
              count={DUAS.length}
              unit="count.duas"
              glyph="duas"
            />
            <LearnCard
              wide
              href="/practice"
              title={t('learn.practice.title')}
              subtitle={t('learn.practice.subtitle')}
              count={PRACTICE_CLIP_COUNT}
              unit="count.clips"
              glyph="practice"
            />
            <LearnCard
              wide
              href="/iman"
              title={t('learn.iman.title')}
              subtitle={t('learn.iman.subtitle')}
              count={IMAN_PILLARS.length}
              unit="count.articles"
              glyph="iman"
            />
            <LearnCard
              wide
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
    gap: Spacing.three,
  },
  /** The group's name, a rule running out from it, and the count at the end. */
  groupHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  rule: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  /** Was Spacing.three here and Spacing.two on the Pray tab. Now both are two. */
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  card: {
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  /**
   * Two to a row, glyph above the title.
   *
   * The list was nineteen full-width rows of title-over-sentence, which is the
   * shape that reads as a wall however well it is grouped. A tile is scanned
   * rather than read: the mark catches the eye first, the title second, and
   * six of them fit in the space four rows took.
   */
  cardTile: {
    flexBasis: '48%',
    flexGrow: 1,
    gap: Spacing.two,
    padding: Spacing.three,
    minHeight: 116,
  },
  /** Full width, for the reference strip where the sentence earns its room. */
  cardWide: {
    flexBasis: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    padding: Spacing.three,
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
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  journeyHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  journeyAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
  },
  journeyActionLabel: {
    flex: 1,
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
