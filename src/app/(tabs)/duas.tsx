import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { duaOfTheDay } from '@/content';
import { HISN } from '@/content/duas/hisn';
import {
  ADHKAR_SESSIONS,
  occasionFor,
  sessionForWindow,
  type AdhkarSession,
} from '@/content/duas/sessions';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { windowAt } from '@/lib/adhkar-window';
import { formatTime } from '@/lib/prayer-times';
import type { UIKey } from '@/i18n/ui';

/**
 * The duʿa tab — one answer, not a menu.
 *
 * ## What this replaced, and why
 *
 * This screen used to be a day: six moments on a vertical rail, each holding
 * the duʿas said at that time. The argument for it was good and is worth
 * keeping in mind — a new Muslim does not know a duʿa for putting on clothes
 * exists, so an index is useless to them and a day is not.
 *
 * What the day could not do is *answer*. It laid the whole day out and left
 * the reader to find their place in it, using an hour table that was only ever
 * right near the equator at an equinox. The app knows the actual prayer times,
 * offline, so it can lead with the sitting that is open right now and name the
 * boundary it came from: `Fajr was 05:12 · Morning adhkār`.
 *
 * ## One hero, everything else is a row
 *
 * The rule this screen is built on, arrived at by getting it wrong twice in a
 * mockup. Exactly one thing is ever opened up: the live session, or — for the
 * seven to thirteen hours a day that belong to no sitting — one pinned duʿa.
 * Everything else, pinned duʿas included, is a row of the same shape. A pinned
 * duʿa showing its Arabic inline looked richer and was worse: a different
 * shape from its neighbours for no reason, useless at ten pins, and nobody
 * learns a duʿa by scrolling past it.
 *
 * ## No location is a normal state, not an error
 *
 * `usePrayerTimes` gives null times until location is granted, and some people
 * will never grant it. That path is not special-cased; it simply has no open
 * window, which is the same state as mid-morning. The tab still works.
 */
export default function DuasScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { today } = usePrayerTimes();
  const { pinnedDuas } = useSettings();

  /*
    Recomputed per render rather than on a timer. The screen is cheap, and
    `usePrayerTimes` already re-renders every thirty seconds and on foreground,
    so a window boundary is never more than half a minute stale.
  */
  const state = useMemo(() => windowAt(today, new Date()), [today]);
  const live = sessionForWindow(state.window);

  /*
    Pinned entries are occasions in the book, not the nine the app owns.
    Pinning was reachable from one screen holding those nine, which made it
    look like a property of them rather than something you can do to anything
    in the book. A star on every occasion says otherwise.
  */
  const pinned = pinnedDuas
    .map((key) => HISN.find((occasion) => String(occasion.id) === key))
    .filter((occasion): occasion is NonNullable<typeof occasion> => occasion !== undefined);

  /*
    The dead zone opens up one duʿa, so the rows below it are the rest. With a
    live session nothing is promoted and all of them are rows.

    With nothing pinned it suggests one instead of leaving a screen of five
    bare rows — which is what most people would see for most of the day in
    their first week, and is a menu rather than an answer. Seeded on the date
    so it is the same duʿa all day: "somewhere to start" that changes every
    time you look at it is not somewhere to start.
  */
  /*
    The top card, when no sitting is open.

    It was a day-seeded pick over all nine, which is how it came to offer the
    duʿa for going into the bathroom as somewhere to begin. `duaOfTheDay`
    already answers this properly: it reads the hour and returns a duʿa for the
    part of the day you are actually in, stable for the calendar day, and
    returns nothing rather than offering a sleeping duʿa at nine in the
    morning. An honest gap beats a wrong answer.

    It draws on the nine rather than the book because those are the only duʿas
    in the app with checked citations, hand-written notes and French and
    Spanish — and this is the one card everybody sees.
  */
  const suggestion = live ? undefined : duaOfTheDay();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="subtitle">{t('tab.duas')}</ThemedText>

        {live ? <SessionHero session={live} state={state} /> : null}

        {suggestion ? (
          <View
            style={[
              styles.heroCard,
              { backgroundColor: theme.backgroundElement, borderColor: theme.border },
            ]}>
            <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
              {t('adhkar.forNow')}
            </ThemedText>
            <ThemedText type="cardTitle">{suggestion.when}</ThemedText>
            <ThemedText type="arabicLead" style={styles.arabic}>
              {suggestion.says.arabic}
            </ThemedText>
            <ThemedText type="small" themeColor="textSecondary">
              {suggestion.says.translation}
            </ThemedText>
          </View>
        ) : null}

        {pinned.length > 0 ? (
          <View style={styles.group}>
            <ThemedText type="caption" themeColor="textSecondary" style={styles.label}>
              {`${t('adhkar.pinned')}  ·  ${pinned.length}`}
            </ThemedText>
            <View style={[styles.rows, { borderTopColor: theme.border }]}>
              {pinned.map((occasion) => (
                <Row
                  key={occasion.id}
                  label={occasion.english || occasion.arabic}
                  href={{ pathname: '/dua-book/[id]', params: { id: String(occasion.id) } }}
                  chevron
                />
              ))}
            </View>
          </View>
        ) : null}

        {/*
          Every session except the one already promoted, then the two ways into
          everything else. All the same row, because they are all "opens a list
          of things" and looking different would imply they are not.
        */}
        <View style={[styles.rows, { borderTopColor: theme.border }]}>
          {ADHKAR_SESSIONS.filter((session) => session.id !== live?.id).map((session) => (
            <Row
              key={session.id}
              label={t(sessionLabelKey(session))}
              href={{ pathname: '/adhkar/[id]', params: { id: session.id } }}
              count={occasionFor(session)?.lines.length}
            />
          ))}
          <Row label="Hisn al-Muslim" href="/dua-book" count={HISN.length} muted />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * The open sitting, named by the boundary that opened it.
 *
 * "Fajr was 05:12" rather than "morning": a reader who wonders why this is on
 * screen gets the reason on the same card, and a reader who does not can
 * ignore a small grey line.
 */
function SessionHero({
  session,
  state,
}: {
  session: AdhkarSession;
  state: ReturnType<typeof windowAt>;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const occasion = occasionFor(session);
  if (!occasion) return null;

  const kicker = state.justPrayed
    ? `${t('adhkar.justPrayed')} ${state.justPrayed}`
    : state.since
      ? `${sinceLabel(state.window)} ${t('adhkar.since')} ${formatTime(state.since)}`
      : '';

  return (
    <PressableLink
      href={{ pathname: '/adhkar/[id]', params: { id: session.id } }}
      style={[
        styles.heroCard,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={[styles.heroRail, { backgroundColor: theme.accent }]} />
      {kicker ? (
        <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
          {kicker}
        </ThemedText>
      ) : null}
      <ThemedText type="cardTitle">{t(sessionLabelKey(session, state.window))}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {`${occasion.lines.length}  ·  ${t('adhkar.minutes').replace('{n}', String(session.minutes))}`}
      </ThemedText>
      <View style={[styles.start, { backgroundColor: theme.accent }]}>
        <ThemedText type="smallBold" themeColor="textOnAccent">
          {t('adhkar.start')}
        </ThemedText>
      </View>
    </PressableLink>
  );
}

function Row({
  label,
  href,
  count,
  muted,
  chevron,
}: {
  label: string;
  href: Parameters<typeof PressableLink>[0]['href'];
  count?: number;
  muted?: boolean;
  chevron?: boolean;
}) {
  const theme = useTheme();
  return (
    <PressableLink
      href={href}
      style={[styles.row, { borderBottomColor: theme.border }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <ThemedText type="default" themeColor={muted ? 'textSecondary' : 'text'}>
        {label}
      </ThemedText>
      {/*
        A count means "a set of this many"; a chevron means "one duʿa". Two
        different things, so they do not get the same mark.
      */}
      {chevron ? (
        <ThemedText type="default" themeColor="accent">
          ›
        </ThemedText>
      ) : count !== undefined ? (
        <ThemedText type="caption" themeColor="textSecondary">
          {count}
        </ThemedText>
      ) : null}
    </PressableLink>
  );
}

/**
 * What to call a session.
 *
 * The morning-and-evening list is one occasion in the book and takes its name
 * from the window it is being read in — the same 29 lines, correctly called
 * the evening adhkār at five in the afternoon. Away from a window it keeps the
 * morning name, because that is the sitting most people mean.
 */
function sessionLabelKey(session: AdhkarSession, window?: string | null): UIKey {
  if (session.id === 'morning-evening') {
    return window === 'evening' ? 'adhkar.window.evening' : 'adhkar.window.morning';
  }
  if (session.id === 'sleep') return 'adhkar.window.night';
  return 'adhkar.window.afterPrayer';
}

function sinceLabel(window: string | null): string {
  if (window === 'morning') return 'Fajr';
  if (window === 'evening') return 'Asr';
  return 'Isha';
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  heroCard: {
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
    padding: Spacing.four,
    gap: Spacing.two,
    overflow: 'hidden',
  },
  heroRail: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
  },
  kicker: { textTransform: 'uppercase', letterSpacing: 1 },
  start: {
    marginTop: Spacing.two,
    minHeight: 44,
    borderRadius: Radius.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
  group: { gap: Spacing.two },
  label: { textTransform: 'uppercase', letterSpacing: 1 },
  rows: { borderTopWidth: StyleSheet.hairlineWidth },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    minHeight: 48,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  arabic: { textAlign: 'right', writingDirection: 'rtl' },
});
