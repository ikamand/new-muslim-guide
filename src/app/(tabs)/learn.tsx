import Ionicons from '@expo/vector-icons/Ionicons';
import { type Href } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GirihBand, Glyph, StagePath, type GlyphName } from '@/components/illustrations';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { routeFor } from '@/lib/content-routes';
import {
  DAILY_PRAYERS,
  resolveRef,
  getPracticeClipCount,
  hasPracticeBeyondSurahs,
  IMAN_PILLARS,
  PHRASES,
  PILLARS,
  SHAHADA_GUIDE,
  TOPIC_GROUPS,
} from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useJourney } from '@/hooks/use-journey';
import { useSettings } from '@/hooks/use-settings';
import { stepKey } from '@/content/journey';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { localiseCatalogEntry } from '@/i18n/localise';

const PRACTICE_CLIP_COUNT = getPracticeClipCount();
/**
 * Whether to offer the practice screen at all.
 *
 * Computed once at module load like the count beside it, because it cannot
 * change while the app is running — it is a fact about which clips are in the
 * bundle. See `hasPracticeBeyondSurahs`.
 */
const SHOW_PRACTICE = hasPracticeBeyondSurahs();
const SHAHADA_STEP_COUNT = SHAHADA_GUIDE.steps.length;
/**
 * Built the same way the journey builds it, not typed as `'guide:shahada'`.
 * A literal here would keep pointing at nothing the day the guide is renamed,
 * and the card would silently go back to calling itself unfinished forever.
 */
const SHAHADA_KEY = stepKey({ kind: 'guide', id: 'shahada' });

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
  // The prayer guides share one mark; Fajr is the one the tab shows.
  fajr: 'prayer',
  dhuhr: 'prayer',
  asr: 'prayer',
  maghrib: 'prayer',
  isha: 'prayer',
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
  'quranic-names': 'names',
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
 * Becoming Muslim, given its own weight — and then stepping out of the way.
 *
 * Some people open this app before they are Muslim at all, and the one card
 * that matters to them was previously indistinguishable from the six below it.
 *
 * ## Why it changes once it is done
 *
 * It used to say "3 steps →" forever. For most of this app's actual users that
 * was wrong on the first screen they ever saw: someone who told onboarding they
 * are a new Muslim said the shahada before they installed anything, and the
 * biggest card in Learn pointed at it as an unfinished task. The app already
 * knew, twice — `userStage`, and the guide's own place in the journey — and
 * this card read neither.
 *
 * ## Why it does not disappear
 *
 * People come back to the shahada. To re-read the words, to get the Arabic
 * right, to show somebody. Removing the card would take that away to fix a
 * label. So it keeps its size and its place and changes what it offers: a task
 * becomes a keepsake, which is what it already was.
 *
 * ## What counts as done
 *
 * Either signal. Ticking the lesson, or having said in onboarding that you are
 * already Muslim — somebody who told the app they are Muslim should not have to
 * tick a box to prove it. `'exploring'` deliberately does not count, and
 * neither does `null`: an unanswered question is not a yes.
 */
function ShahadaCard() {
  const theme = useTheme();
  const { t } = useLocale();
  const { completedLessons, userStage } = useSettings();

  const done =
    userStage === 'new-muslim' ||
    userStage === 'returning' ||
    completedLessons.includes(SHAHADA_KEY);

  return (
    <PressableLink
      href={{ pathname: '/guide/[id]', params: { id: 'shahada' } }}
      accessibilityLabel={`${t(done ? 'learn.shahada.done.title' : 'learn.shahada.title')}. ${t(
        done ? 'learn.shahada.done.subtitle' : 'learn.shahada.subtitle',
      )}`}
      style={[
        styles.featured,
        { backgroundColor: theme.backgroundElement, borderColor: done ? theme.accent : theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={[styles.band, { backgroundColor: theme.accentMuted }]}>
        <GirihBand color={theme.accent} height={76} filled={done} />
      </View>
      <View style={styles.featuredBody}>
        <View style={styles.cardText}>
          <ThemedText type="cardTitle">
            {t(done ? 'learn.shahada.done.title' : 'learn.shahada.title')}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {t(done ? 'learn.shahada.done.subtitle' : 'learn.shahada.subtitle')}
          </ThemedText>
        </View>
        {/*
          Outlined once it is done, not filled. A solid accent button is the
          app asking for a tap, and there is nothing left to ask for here — the
          card is a way back to the words, not a call to action.
        */}
        <View
          style={[
            styles.featuredAction,
            done
              ? { backgroundColor: 'transparent', borderWidth: StyleSheet.hairlineWidth, borderColor: theme.accent }
              : { backgroundColor: theme.accent },
          ]}>
          <ThemedText type="smallBold" themeColor={done ? 'accent' : 'textOnAccent'}>
            {done ? t('learn.shahada.readAgain') : `${SHAHADA_STEP_COUNT} ${t('count.steps')}`}
          </ThemedText>
          <Ionicons
            name="arrow-forward"
            size={14}
            color={done ? theme.accent : theme.textOnAccent}
          />
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
              {/*
                The way into the prayers themselves. A screen rather than a
                piece of content, so it is rendered here instead of resolving
                through the catalogue like everything beside it.
              */}
              {group.id === 'praying' && (
                <LearnCard
                  wide
                  href="/pray"
                  title={t('learn.toPray.title')}
                  subtitle={t('learn.toPray.subtitle')}
                  count={DAILY_PRAYERS.length}
                  unit="count.prayers"
                  glyph="prayer"
                />
              )}
              {group.topics
                // A ref to content that does not exist yet resolves to nothing
                // and is dropped, so a group can name something before it is
                // written without a placeholder card appearing.
                .map(resolveRef)
                .filter((entry) => entry !== undefined)
                .map((entry) => localiseCatalogEntry(entry, locale))
                .map((topic) => (
                  <LearnCard
                    key={`${topic.kind}:${topic.id}`}
                    href={routeFor(topic)}
                    title={topic.title}
                    subtitle={topic.shortDescription}
                    count={topic.pieces}
                    /*
                      Minutes read as a phrase rather than a bare noun. "4 min
                      read" says what the number is; "4 min" beside a title
                      could be a countdown to something.
                    */
                    unit={
                      topic.pieceUnit === 'minutes'
                        ? 'count.minutes.long'
                        : (`count.${topic.pieceUnit}` as UIKey)
                    }
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
            {/*
              No duʿa card here. `/duas` IS the Duʿa tab, so this row was a
              full-width link from one tab to another one already sitting in
              the bar underneath it — and it took the place where something
              unreachable could have gone.
            */}
            {/*
              Hidden while Al-Fatiha is the only thing recorded, because the
              Qur'an tab now does those seven ayahs better in every respect.
              Returns on its own the day a clip lands that is not a surah.
            */}
            {SHOW_PRACTICE && (
              <LearnCard
                wide
                href="/practice"
                title={t('learn.practice.title')}
                subtitle={t('learn.practice.subtitle')}
                count={PRACTICE_CLIP_COUNT}
                unit="count.clips"
                glyph="practice"
              />
            )}
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
