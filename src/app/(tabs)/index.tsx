import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ProgressRing } from '@/components/illustrations';
import { PrayerTimesCard } from '@/components/prayer-times-card';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { hasPracticeBeyondSurahs, PRAYERS, WUDU, type Guide } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useHelpTopics } from '@/hooks/use-help';
import { useHijriToday } from '@/hooks/use-hijri';
import { useJourney } from '@/hooks/use-journey';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useTheme } from '@/hooks/use-theme';
import { useToday, type TodayItem } from '@/hooks/use-today';
import { localiseGuide } from '@/i18n/localise';
import type { UIKey } from '@/i18n/ui';
import { routeFor } from '@/lib/content-routes';

/**
 * Today.
 *
 * The screen answers one question — what should I do right now — and answers it
 * in the order the day actually asks it. Prayer first, because a prayer time is
 * the only thing on the phone with a deadline. Then the lesson someone was
 * part-way through. Then two or three things worth today. Then a row of plain
 * words for a question they cannot name yet.
 *
 * ## What this replaced
 *
 * The screen used to end with two sections that were both "I have a question"
 * wearing a prayer costume: a pair of cards for ghusl and tayammum, and five
 * chips for losing count, missing a prayer, travelling, praying seated and
 * periods. Both are now inside "I need help with…" — ghusl and tayammum under
 * washing, the other five under when something goes wrong — which is where
 * someone looks for them, and which costs the home screen two sections rather
 * than adding four.
 *
 * Nothing here counts days, keeps a streak, or notices an absence. Someone
 * three weeks into Islam does not need an app that is disappointed in them.
 */

/**
 * The one thing this screen exists for.
 *
 * Someone standing on a mat wants to start praying, not to browse. It lives
 * inside the times card, under the mihrab, so the prayer you are about to pray
 * and the button that starts it are the same object.
 */
function PrayAction({ prayer, wudu }: { prayer: Guide; wudu: Guide }) {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <View style={styles.action}>
      <PressableLink
        href={{ pathname: '/guide/[id]', params: { id: prayer.id } }}
        accessibilityLabel={`${t('home.prayNow')} ${prayer.title}`}
        style={[styles.primary, { backgroundColor: theme.accent }]}
        pressedStyle={{ opacity: 0.85 }}>
        <ThemedText type="smallBold" themeColor="textOnAccent" style={styles.primaryLabel}>
          {t('home.prayNow')} {prayer.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textOnAccent" style={styles.primaryCount}>
          {prayer.steps.length} {t('count.steps')}
        </ThemedText>
        <Ionicons name="arrow-forward" size={18} color={theme.textOnAccent} />
      </PressableLink>

      {/*
        Wudu is a precondition, not a sibling. It used to sit in a section of
        three cards above the prayers, so a first-timer scanned ghusl and
        tayammum to find the one they needed before every single prayer.
      */}
      <PressableLink
        href={{ pathname: '/guide/[id]', params: { id: wudu.id } }}
        accessibilityLabel={`${t('home.notInWudu')} ${t('home.washFirst')}`}
        style={styles.wuduLine}
        pressedStyle={{ opacity: 0.6 }}>
        <ThemedText type="small" themeColor="textSecondary">
          {t('home.notInWudu')}
        </ThemedText>
        <ThemedText type="smallBold" themeColor="accent">
          {t('home.washFirst')} · {wudu.steps.length} {t('count.steps')}
        </ThemedText>
      </PressableLink>
    </View>
  );
}

/** Who is reading, and what day it is in the calendar the religion runs on. */
function Header() {
  const { locale, t } = useLocale();
  const hijri = useHijriToday();

  /*
    The weekday, in the reader's language, from the device rather than a table
    of our own. Friday is the one that matters — someone new does not yet feel
    the week the way a born Muslim does, and the app knowing what day it is is
    the smallest possible way of saying so.
  */
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(new Date());

  return (
    <View style={styles.header}>
      {/*
        A greeting rather than "Welcome". It is the first Arabic most converts
        learn, it is what they will be greeted with, and reading it daily in
        the app is how it stops being foreign.
      */}
      <ThemedText type="subtitle">{t('home.greeting')}</ThemedText>
      {/*
        Absent entirely where the platform has no Umm al-Qura data, rather than
        falling back to arithmetic of our own. Shown rather than used silently,
        so a reader whose mosque is a day ahead can see what the app thinks.
      */}
      <ThemedText type="small" themeColor="textSecondary">
        {hijri
          ? `${hijri.day} ${t(`hijri.month.${hijri.month}` as UIKey)} ${hijri.year} · ${weekday}`
          : weekday}
      </ThemedText>
    </View>
  );
}

/**
 * Where they were, or where to begin.
 *
 * One card with three states and no fourth. It never invents progress after the
 * end: once every lesson is done it stops asking to be continued and offers the
 * two things that are worth repeating for years instead.
 */
function JourneyCard() {
  const theme = useTheme();
  const { t } = useLocale();
  const { next, nextStageIndex, stages, done, total, fresh } = useJourney();

  if (!next) return <JourneyDoneCard />;

  const label = next.labelKey ? t(next.labelKey as UIKey) : next.entry.title;
  const stage = stages[nextStageIndex];
  const minutes = next.entry.meta?.estimatedMinutes;
  const kicker = fresh ? t('home.start') : t('home.continue');
  const progress = t('journey.progress')
    .replace('{done}', String(done))
    .replace('{total}', String(total));

  return (
    <PressableLink
      href={routeFor(next.entry)}
      accessibilityLabel={fresh ? `${kicker}: ${label}` : `${kicker}: ${label}. ${progress}`}
      style={[styles.journey, { backgroundColor: theme.background, borderColor: theme.border }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      {/*
        The ring replaces a bar under the text. It carries the count inside it,
        which answers "six of what" in the same glance — and it is hidden on a
        first run, because "0 of 36" is a true statement and a discouraging one
        with nothing yet to be reminded of.
      */}
      {!fresh && (
        <ProgressRing done={done} total={total} color={theme.accent} trackColor={theme.border}>
          <ThemedText type="caption" themeColor="accent">
            {done}
          </ThemedText>
        </ProgressRing>
      )}

      <View style={styles.journeyText}>
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {kicker} · {t('journey.stageOf')
            .replace('{n}', String(nextStageIndex + 1))
            .replace('{total}', String(stages.length))}
        </ThemedText>
        <ThemedText type="cardTitle">
          {label}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t(`journey.stage.${stage.id}` as UIKey)}
          {minutes ? ` · ${minutes} ${t('count.minutes')}` : ''}
        </ThemedText>
      </View>
      <Ionicons name="arrow-forward" size={20} color={theme.accent} />
    </PressableLink>
  );
}

/** What a finished journey becomes: two things that never finish. */
function JourneyDoneCard() {
  const theme = useTheme();
  const { t } = useLocale();

  /*
    Practice drops out while Al-Fatiha is its only recorded content — the
    Qur'an tab does those seven ayahs better in every respect, and offering
    both here sends somebody to the worse of two doors. It comes back on its
    own. See `hasPracticeBeyondSurahs`.
  */
  const onwards: { href: '/practice' | '/duas'; label: UIKey }[] = [
    ...(hasPracticeBeyondSurahs()
      ? [{ href: '/practice' as const, label: 'learn.practice.title' as UIKey }]
      : []),
    { href: '/duas', label: 'learn.duas.title' },
  ];

  return (
    <View
      style={[styles.journey, { backgroundColor: theme.accentMuted, borderColor: theme.accent }]}>
      <View style={styles.journeyText}>
        <ThemedText type="small" themeColor="accent" style={styles.kicker}>
          {t('journey.finished')}
        </ThemedText>
        <ThemedText type="cardTitle">
          {t('home.journeyDone')}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {t('home.journeyDone.help')}
        </ThemedText>
        <View style={styles.onwards}>
          {onwards.map((entry) => (
            <PressableLink
              key={entry.href}
              href={entry.href}
              accessibilityLabel={t(entry.label)}
              style={[styles.onwardsLink, { borderColor: theme.accent }]}
              pressedStyle={{ opacity: 0.6 }}>
              <ThemedText type="smallBold" themeColor="accent">
                {t(entry.label)}
              </ThemedText>
            </PressableLink>
          ))}
        </View>
      </View>
    </View>
  );
}

/** One row of Today, with the reason it is there said in a word. */
function TodayRow({ item }: { item: TodayItem }) {
  const theme = useTheme();
  const { t } = useLocale();

  const reason = t(`season.${item.season}` as UIKey);

  return (
    <PressableLink
      href={item.href}
      accessibilityLabel={`${reason}. ${item.title}. ${item.description}`}
      style={[
        styles.todayRow,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.todayText}>
        <ThemedText type="small" themeColor="accent" style={styles.kicker}>
          {reason}
        </ThemedText>
        <ThemedText type="cardTitle">
          {item.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {item.description}
          {item.minutes ? ` · ${item.minutes} ${t('count.minutes')}` : ''}
        </ThemedText>
      </View>
      <Ionicons name="arrow-forward" size={18} color={theme.accent} />
    </PressableLink>
  );
}

/**
 * The app in ordinary words.
 *
 * Every chip resolves to real content — a topic with nothing behind it is never
 * built — and a topic holding one thing opens that thing rather than a page
 * listing it alone. The order shifts with what onboarding heard; nothing is
 * ever hidden, because the question someone has today is not the only question
 * they will ever have.
 */
function HelpSection() {
  const theme = useTheme();
  const { t } = useLocale();
  const topics = useHelpTopics();

  if (topics.length === 0) return null;

  return (
    <View style={styles.section}>
      <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
        {t('home.help')}
      </ThemedText>
      <View style={styles.chips}>
        {topics.map((topic) => (
          <PressableLink
            key={topic.id}
            href={topic.href}
            accessibilityLabel={topic.label}
            style={[
              styles.chip,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}
            pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
            <ThemedText type="small">{topic.label}</ThemedText>
          </PressableLink>
        ))}
        {/*
          The honest end of a finite list. Learn is the whole shelf, so nobody
          leaves this row without somewhere to go.
        */}
        <PressableLink
          href="/learn"
          accessibilityLabel={t('home.helpElse')}
          style={[styles.chip, { borderColor: theme.accent }]}
          pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
          <ThemedText type="small" themeColor="accent">
            {t('home.helpElse')}
          </ThemedText>
        </PressableLink>
      </View>
    </View>
  );
}

export default function TodayScreen() {
  const theme = useTheme();
  const { next } = usePrayerTimes();
  const { locale } = useLocale();
  const items = useToday();

  const nextPrayer = next ? PRAYERS.find((prayer) => prayer.id === next.id) : undefined;
  const wudu = localiseGuide(WUDU, locale);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Header />

        <PrayerTimesCard
          action={
            nextPrayer ? (
              <PrayAction prayer={localiseGuide(nextPrayer, locale)} wudu={wudu} />
            ) : null
          }
        />

        <JourneyCard />

        {/*
          Nothing most of the year. A season is the only thing left here — it
          is the one row that answers Today's question rather than Learn's, and
          it earns no heading of its own because it is one card.
        */}
        {items.map((item) => (
          <TodayRow key={item.key} item={item} />
        ))}

        <HelpSection />
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
    paddingTop: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.four,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  header: {
    gap: Spacing.one,
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.one,
  },
  list: {
    gap: Spacing.two,
  },
  kicker: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  action: {
    gap: Spacing.two,
  },
  primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
    minHeight: 52,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
  },
  primaryLabel: {
  },
  primaryCount: {
    opacity: 0.72,
  },
  wuduLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingVertical: Spacing.three,
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
  onwards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
    paddingTop: Spacing.two,
  },
  onwardsLink: {
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  todayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  todayText: {
    flex: 1,
    gap: 2,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.two,
  },
  chip: {
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: Spacing.three,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
