import Ionicons from '@expo/vector-icons/Ionicons';
import { type Href } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GirihBand, StagePath } from '@/components/illustrations';
import { JadwalRow, QuietRow, Rosette, Shelf, Unwan } from '@/components/jadwal';
import { CURRENCIES } from '@/content/nisab';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { routeFor } from '@/lib/content-routes';
import {
  DAILY_PRAYERS,
  resolveRef,
  getPracticeClipCount,
  GROUP_ORDER,
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
import { useObservations } from '@/hooks/use-observations';
import { usePrayerConfidence } from '@/hooks/use-competence';
import { useReadingInProgress } from '@/hooks/use-reading';
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

function LearnCard({
  href,
  title,
  subtitle,
  count,
  unit,
  index,
  progress,
}: {
  href: Href;
  title: string;
  subtitle: string;
  count: number;
  unit: UIKey;
  /** Its place within its shelf, drawn as a rosette in the margin. */
  index: number;
  /** How far through this the reader got before leaving, 0..1. */
  progress?: number;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  /*
    One shape, full width, always.

    This used to be two — a half-width tile and a wide row — with a measured
    pairing pass deciding which, plus a per-topic glyph tile to tell twenty
    near-identical rows apart. All of that existed to fight the same problem:
    a flat list of equals reads as a wall.

    The shelf rules and the marginal numbers solve it instead, and they solve
    it with information rather than with decoration — a numeral says how deep
    a shelf runs, and a glyph never did. Both the pairing pass and the
    forty-seven-entry glyph table are gone with the tile.

    ⚠️ This is the change on this tab most worth looking at on a device. If
    ruled rows rebuild the wall the tiles were added to break, the tile is one
    revert away.
  */
  return (
    <JadwalRow
      href={href}
      accessibilityLabel={`${title}. ${subtitle}. ${count} ${t(unit)}`}
      marginal={<Rosette label={String(index)} />}
      title={title}
      meta={`${subtitle} · ${count} ${t(unit)}`}
      progress={progress}
      trailing={<Ionicons name="chevron-forward" size={14} color={theme.gold} />}
    />
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
 * ## Why it does not disappear, and why it stops being a hero
 *
 * People come back to the shahada. To re-read the words, to get the Arabic
 * right, to show somebody. Removing the card would take that away to fix a
 * label.
 *
 * But "return to this a few times in your life" and "second-largest object on
 * the tab forever" are not the same claim, and cadence `keepsake` is the first
 * of those. So once it is done this stops being a card at all and becomes one
 * line in the header — reachable forever, weighted honestly.
 *
 * ⚠️ It stays a HERO while it is not done, which is a deliberate departure
 * from `docs/build-order.md`. That plan says the shahada drops to a header
 * line, full stop. For somebody who has not said it, this is the one card on
 * the tab that matters, and this file's own opening records why: they were
 * previously indistinguishable from the six topics below. Flattening both
 * states would fix the wrong one. Keepsake is what it BECOMES, not what it
 * always was.
 *
 * ## What counts as done
 *
 * Either signal. Ticking the lesson, or having answered "yes" to the shahada
 * question — somebody who told the app they have said it should not have to
 * tick a box to prove it. `'exploring'` and `'not-yet'` deliberately do not
 * count, and neither does `null`: an unanswered question is not a yes.
 *
 * The question this reads changed in Phase 7 from "which describes you" to
 * "have you said the shahada", which is the thing this card actually needed to
 * know and was previously inferring from a category.
 */
function ShahadaCard() {
  const theme = useTheme();
  const { t } = useLocale();
  const { completedLessons, shahadaState } = useSettings();

  const done =
    shahadaState === 'recently' ||
    shahadaState === 'a-while' ||
    completedLessons.includes(SHAHADA_KEY);

  /*
    Done: one line under the tab's own intro, not a card. No band, no action
    button, no border — the same shape the name-of-the-day coda takes on
    Today, and for the same reason: it is not a task and should not be dressed
    as one.
  */
  if (done) {
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
      style={[
        styles.featured,
        { borderColor: theme.goldSoft },
      ]}
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
 * Where you are — the chapter, and what is left in it.
 *
 * ## Why the fraction went
 *
 * It said "6 of 36" beside the arches. Thirty-six of what, and how far is six?
 * A beginner cannot answer either, and a fraction is a report card handed to
 * somebody three weeks into a religion — it measures them against a syllabus
 * they never agreed to and reads as 30 things undone.
 *
 * What replaces it is the same information said as a place rather than a
 * score: the chapter you are in, and the two or three things still in it. That
 * is a shape somebody can act on this afternoon, and it is finite in a way
 * "36" is not.
 *
 * The arches stay. They were already the right answer to "how far" — filled
 * behind, star on the one you are at, no arithmetic — and they are the same
 * mihrab the prayer times card draws, so the shape means the same thing in
 * both places.
 *
 * ## Three, not all of them
 *
 * A chapter can hold eight steps, and listing eight is the wall this card
 * exists to replace. Three is enough to show what KIND of thing is left
 * without becoming a second list below the first.
 */
const SHOW_LEFT = 3;

function WhereYouAre() {
  const theme = useTheme();
  const { t } = useLocale();
  const { stages, nextStageIndex } = useJourney();

  const path = stages.map((stage) => ({
    id: stage.id,
    label: t(`journey.short.${stage.id}` as UIKey),
    done: stage.steps.every((step) => step.done),
  }));

  const stage = nextStageIndex === -1 ? undefined : stages[nextStageIndex];
  const left = stage?.steps.filter((step) => !step.done).slice(0, SHOW_LEFT) ?? [];

  return (
    <PressableLink
      href="/journey"
      accessibilityLabel={`${t('learn.where.kicker')}. ${
        stage ? t(`journey.stage.${stage.id}` as UIKey) : t('learn.where.done')
      }`}
      style={[styles.journey, { borderColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.cardText}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {t('learn.where.kicker')}
        </ThemedText>
        <ThemedText type="sectionTitle">
          {stage ? t(`journey.stage.${stage.id}` as UIKey) : t('learn.where.done')}
        </ThemedText>
      </View>

      <StagePath
        stages={path}
        currentIndex={nextStageIndex}
        color={theme.accent}
        trackColor={theme.textSecondary}
        mutedColor={theme.textOnAccent}
      />

      {left.length > 0 ? (
        /*
          Its own spacing, not `cardText`. That style is a title-and-subtitle
          pair at a 2pt gap, and three separate steps set 2pt apart read as one
          sentence that has wrapped — which is the opposite of the point.
        */
        <View style={styles.left}>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
            {t('learn.where.left')}
          </ThemedText>
          {left.map((step) => (
            <ThemedText key={step.key} type="small" themeColor="textSecondary">
              {step.labelKey ? t(step.labelKey as UIKey) : step.entry.title}
            </ThemedText>
          ))}
        </View>
      ) : null}

      {/*
        `action`, not `accent`. In dark they are two different blues, so a tab
        carrying both showed two primary buttons in two colours — the shahada
        panel's and this one's. `action` is the one a control takes.
      */}
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
 * One card's worth of facts, before it is laid out.
 *
 * The layout pass below decides `wide` twice: first from the title (a long
 * title in a half tile truncates the words that make it findable), then from
 * the neighbourhood — see `pairTiles`.
 */
type CardSpec = {
  key: string;
  href: Href;
  title: string;
  subtitle: string;
  count: number;
  unit: UIKey;
  progress?: number;
};

/**
 * No tile stands alone.
 *
 * Tiles are laid out at 48% with `flexGrow: 1`, so a tile with no partner in
 * its wrap row grew to full width while keeping a tile's vertical anatomy —
 * glyph at the top, title at the bottom, dead air between. Every group with
 * an odd run of tiles had one of these balloons, and they read as broken
 * cards rather than as a layout rule.
 *
 * So the run is measured: within each stretch of consecutive tiles, pairs
 * stay tiles, and a leftover odd one is promoted to a wide row — the anatomy
 * built for full width. Measured rather than hand-flagged, so regrouping a
 * topic never leaves a balloon behind.
 */


/**
 * The shelf of things you return to rather than read once.
 *
 * A function of `t` rather than a constant, because the titles are localised
 * and the tab re-renders on a language change. Built as a list so the
 * marginal numerals stay consecutive when `SHOW_PRACTICE` is false — written
 * out as four rows, the practice row's absence left a gap in the numbering,
 * which is the one thing a contents page must never do.
 *
 * No duʿa row here. `/duas` IS the Duʿa tab, so it was a link from one tab to
 * another already sitting in the bar underneath it, and it took the place
 * where something unreachable could have gone.
 *
 * Practice is hidden while Al-Fatiha is the only thing recorded, because the
 * Qur'an tab does those seven ayahs better in every respect. It returns on
 * its own the day a clip lands that is not a surah.
 */
function REFERENCE_SHELF(t: (key: UIKey) => string): CardSpec[] {
  /*
    Built by pushing rather than by spreading a conditional array: a spread's
    inner literal is not contextually typed, so every `href` widened to
    `string` and lost the typed-routes check that is the point of turning
    them on.
  */
  const rows: CardSpec[] = [
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
  const { locale, t } = useLocale();
  const confidence = usePrayerConfidence();
  const { reading } = useObservations();
  const readingNow = useReadingInProgress();

  /*
    The shelves, in this reader's order — see GROUP_ORDER's note on why this
    re-sorts on confidence and never on a tap. The groups themselves and the
    cards inside them do not move; only which shelf comes first does.
  */
  const groups = GROUP_ORDER[confidence]
    .map((id) => TOPIC_GROUPS.find((group) => group.id === id))
    .filter((group): group is (typeof TOPIC_GROUPS)[number] => group !== undefined);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Unwan title={t('learn.title')} subtitle={t('learn.intro')} />
        </View>

        <ShahadaCard />

        <WhereYouAre />

        {/*
          What they were in the middle of, offered back. A row rather than a
          moved card: the lesson stays findable on its shelf below, and this
          line is the one place on the tab allowed to change day to day.
        */}
        {/*
          Promoted from a quiet grey line to the full kicker row — the same
          shape Today gives the same content, one treatment for one thing in
          two places. It earned the promotion by being missed: a one-line
          "You were reading: …" in textSecondary was invisible between the
          chapter card and the shelves (Iyad, 31 Aug). The bookmark along its
          foot comes with the row.
        */}
        {readingNow && (
          <JadwalRow
            href={routeFor(readingNow.entry)}
            kicker={t('today.reading')}
            title={readingNow.entry.title}
            progress={readingNow.furthest}
          />
        )}

        {/*
          Grouped by when the question arrives, not by subject.

          This was nineteen consecutive rows under one heading, with a
          "Where to start" section above it resolving from the same tables — so
          "Becoming Muslim" and "What is Islam?" each appeared twice on one
          screen. A flat list of nineteen equals only serves a reader who
          already knows what they want, which is nobody this app is for.
        */}
        {groups.map((group) => {
          /*
            The screens that live in a group without being catalogue content —
            the prayer chooser and the zakat working-out — join the same list
            as everything beside them, so the layout pass sees the whole group.
          */
          const specials: CardSpec[] = [];
          if (group.id === 'praying') {
            specials.push({
              key: 'screen:pray',
              href: '/pray',
              title: t('learn.toPray.title'),
              subtitle: t('learn.toPray.subtitle'),
              count: DAILY_PRAYERS.length,
              unit: 'count.prayers',
            });
          }
          if (group.id === 'year') {
            specials.push({
              key: 'screen:zakat',
              href: '/zakat',
              title: t('zakat.title'),
              subtitle: t('zakat.open'),
              /* Currencies, because that is what the screen asks you to pick. */
              count: CURRENCIES.length,
              unit: 'zakat.currencies',
            });
          }

          const topics: CardSpec[] = group.topics
            // A ref to content that does not exist yet resolves to nothing
            // and is dropped, so a group can name something before it is
            // written without a placeholder card appearing.
            .map(resolveRef)
            .filter((entry) => entry !== undefined)
            .map((entry) => localiseCatalogEntry(entry, locale))
            .map((topic) => ({
              key: `${topic.kind}:${topic.id}`,
              href: routeFor(topic),
              title: topic.title,
              subtitle: topic.shortDescription,
              count: topic.pieces,
              /*
                Minutes read as a phrase rather than a bare noun. "4 min
                read" says what the number is; "4 min" beside a title
                could be a countdown to something.
              */
              unit:
                topic.pieceUnit === 'minutes'
                  ? ('count.minutes.long' as UIKey)
                  : (`count.${topic.pieceUnit}` as UIKey),
              progress: reading[`${topic.kind}:${topic.id}`]?.furthest,
            }));

          return (
            <View key={group.id} style={styles.section}>
              <Shelf
                label={t(`learn.group.${group.id}` as UIKey)}
                count={group.topics.length}
              />
              <View style={styles.list}>
                {[...specials, ...topics].map(({ key, ...card }, i) => (
                  <LearnCard key={key} {...card} index={i + 1} />
                ))}
              </View>
            </View>
          );
        })}

        {/* The things you return to rather than read once. */}
        <View style={styles.section}>
          <Shelf label={t('learn.group.reference')} />
          <View style={styles.list}>
            {/*
              An array rather than four hand-written rows, so the marginal
              numerals stay consecutive when `SHOW_PRACTICE` is false. Written
              out, the practice row's absence left a gap in the numbering —
              which is the sort of thing a contents page must never do.

              No duʿa card here. `/duas` IS the Duʿa tab, so that row was a
              link from one tab to another already sitting in the bar
              underneath it, and it took the place where something
              unreachable could have gone.

              Practice is hidden while Al-Fatiha is the only thing recorded,
              because the Qur'an tab does those seven ayahs better in every
              respect. It returns on its own the day a clip lands that is not
              a surah.
            */}
            {REFERENCE_SHELF(t).map(({ key, ...card }, i) => (
              <LearnCard key={key} {...card} index={i + 1} />
            ))}
          </View>
        </View>
      
        {/*
          The colophon — the note at the end of a manuscript where the book
          talks about itself. That is exactly what these two are: the ledger
          of firsts (a keepsake register at the back of the book, the way a
          family Qur'an's flyleaf records births), and Settings, which left
          the tab bar because it was the one tab that was neither worship nor
          content. `content/firsts.ts` explains why the ledger shows no count.
        */}
        <View style={styles.colophon}>
          <QuietRow
            href="/firsts"
            label={t('firsts.open')}
            accessibilityLabel={t('firsts.title')}
          />
          <QuietRow href="/settings" label={t('settings.title')} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  /* Breathing room above the end matter — the rows carry their own rules. */
  colophon: {
    marginTop: Spacing.five,
  },
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
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  /** Was Spacing.three here and Spacing.two on the Pray tab. Now both are two. */
  /*
    A column. This was the tile grid — `row` + `wrap` — and it survived the
    tiles going: ruled rows inside a row-direction container size to their
    content instead of stretching, so every long meta line ran off the right
    edge and took its chevron with it. `minWidth` was not the problem; the
    axis was.
  */
  list: {},
  /*
    A panel, not a card. The girih band across its head is what marks this as
    the one thing on the tab a reader who has not said the shahada should not
    have to pick out of a list — a fill and a border around it as well was the
    same claim made twice, and it left two rounded rectangles sitting above
    fifty ruled rows.
  */
  /** Where the reader got to, along the card's foot. Quiet on purpose. */
  /**
   * Two to a row, glyph above the title.
   *
   * The list was nineteen full-width rows of title-over-sentence, which is the
   * shape that reads as a wall however well it is grouped. A tile is scanned
   * rather than read: the mark catches the eye first, the title second, and
   * six of them fit in the space four rows took.
   */
  /** Full width, for the reference strip where the sentence earns its room. */
  cardText: {
    flex: 1,
    gap: 2,
  },
  journey: {
    gap: Spacing.three,
    paddingVertical: Spacing.four,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  journeyHead: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  /* Uppercase and tracked, the same label treatment every card kicker uses. */
  kicker: { textTransform: 'uppercase', letterSpacing: 1 },
  left: { gap: Spacing.one },
  /*
    The same line treatment as `keepsake`, without its negative top margin —
    that one is tuned to sit tight under the tab's own intro, and reusing it
    here pulled the row up into the card above.
  */
  /* A rule and a line. Not a card — see `ShahadaCard`. */
  /*
    Padding is symmetric and the added bottom half is cancelled by margin, so
    the footprint is unchanged. Asymmetric padding was invisible until the
    row was pressed — the highlight paints the padded box, and top-only
    padding put the text at its bottom edge (Iyad's screenshot, 31 Aug).
  */
  keepsake: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.three,
    marginTop: -Spacing.four,
    marginBottom: -Spacing.three,
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
  journeyText: {
    flex: 1,
    gap: Spacing.one,
  },
  journeyProgress: {
    paddingTop: Spacing.one,
  },
  /*
    A panel, not a card. The girih band across its head is what marks this as
    the one thing on the tab a reader who has not said the shahada should not
    have to pick out of a list — a fill and a rounded border as well was the
    same claim made twice, and it left the only rectangle on a tab of fifty
    ruled rows.
  */
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
