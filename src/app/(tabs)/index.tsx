import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AskBar } from '@/components/ask-bar';
import { DailyCollectionCard } from '@/components/daily-collection-card';
import { AdhkarSessionCard, useLiveSession } from '@/components/adhkar-session-card';
import { DuaCard } from '@/components/dua-card';
import { PrayerTimesCard } from '@/components/prayer-times-card';
import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { PRAYERS, WUDU, type Guide } from '@/content';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useHelpTopics } from '@/hooks/use-help';
import { useHijriToday } from '@/hooks/use-hijri';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useTheme } from '@/hooks/use-theme';
import { useToday, type TodayItem } from '@/hooks/use-today';
import { localiseGuide } from '@/i18n/localise';
import type { UIKey } from '@/i18n/ui';

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
 * ## The permanent journey card is gone
 *
 * It sat above the prayer times every day of the year, whether or not there
 * was anything to continue, and it failed the one test this screen is built
 * on: it had no deadline. The lesson is still reachable from here — it is the
 * LAST candidate in `use-today.ts`, shown when nothing with a deadline is
 * competing — and "6 of 36" as a permanent fixture is gone with it. The
 * chapter someone is in belongs on Learn, which is where it now lives.
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
      {/*
        Chrome rather than a card, and inside the header rather than below it,
        so the prayer times stay the first piece of content on the screen. The
        app's spine is salah; a search field above it would say otherwise.
      */}
      <View style={styles.ask}>
        <AskBar />
      </View>
    </View>
  );
}

/** One row of Today, with the reason it is there said in a word. */
function TodayRow({ item }: { item: TodayItem }) {
  const theme = useTheme();
  const { t } = useLocale();

  const reason = t(item.reason);

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

/**
 * The words for right now: the open adhkār sitting, or a duʿa.
 *
 * One slot rather than two cards stacked. Both are "words to say" and showing
 * both at once made Today read as a list of everything rather than an answer
 * to what to do next — and the sitting is the one with a deadline, so when
 * there is one it wins.
 */
function WordsSlot() {
  const live = useLiveSession();
  if (live) return <AdhkarSessionCard session={live.session} state={live.state} />;
  return <DuaCard />;
}

export default function TodayScreen() {
  const theme = useTheme();
  const { next } = usePrayerTimes();
  const { locale } = useLocale();
  const item = useToday();

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

        {/*
          One words slot, not two cards.

          The adhkār sitting when the clock is inside one, the duʿa card
          otherwise. `lib/adhkar-window.ts` has computed the live sitting from
          real prayer times all along and rendered it only on the Duʿa tab —
          so the morning adhkār, seven minutes somebody says every day of their
          life, was the one daily thing Today never mentioned.
        */}
        <WordsSlot />

        <DailyCollectionCard />

        {/*
          One thing worth today, chosen by a single ranked function, and
          nothing at all when there is nothing. The permanent journey card that
          used to sit above the prayer times is gone: it had no deadline, which
          is the whole test this screen is built on, and it is now the last
          candidate here rather than a fixture.
        */}
        {item ? <TodayRow item={item} /> : null}

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
  ask: {
    paddingTop: Spacing.three,
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
