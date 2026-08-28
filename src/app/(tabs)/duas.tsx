import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';

import { PressableLink } from '@/components/pressable-link';
import { DuaCard } from '@/components/dua-card';
import { ThemedText } from '@/components/themed-text';
import { HISN } from '@/content/duas/hisn';
import {
  ADHKAR_SESSIONS,
  arabicNameFor,
  HISN_ARABIC_TITLE,
  stepsFor,
  sessionForWindow,
  type AdhkarSession,
} from '@/content/duas/sessions';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
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
  // The card answers "what now" whenever no sitting is open. See DuaCard.

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/*
          The same header block Learn and Qur'an use — `paddingTop` and a line
          saying what the tab is for. This is the one tab whose own title is a
          word most readers do not have yet, and "adhkār" below it is a second,
          so the sentence is not decoration.
        */}
        <View style={styles.header}>
          <ThemedText type="subtitle">{t('tab.duas')}</ThemedText>
          <ThemedText type="default" themeColor="textSecondary">
            {t('duas.intro')}
          </ThemedText>
        </View>

        {live ? <SessionHero session={live} state={state} /> : null}

        {live ? null : <DuaCard />}

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
                  arabic={occasion.arabic}
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
              arabic={arabicNameFor(session)}
              href={{ pathname: '/adhkar/[id]', params: { id: session.id } }}
              meta={sessionMeta(session, t)}
            />
          ))}
          {/*
            The book, not a sitting — and its count is a different unit, which
            is why both now say what they are counting. Bare numerals put "26"
            and "132" in one column meaning lines and occasions.
          */}
          <Row
            label="Hisn al-Muslim"
            arabic={HISN_ARABIC_TITLE}
            href="/dua-book"
            meta={t('adhkar.occasions').replace('{n}', String(HISN.length))}
            muted
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * The open sitting, and how long is left of it.
 *
 * ## Why this stopped citing the boundary that opened the window
 *
 * It used to say `ASR WAS 4:52 PM`. That answers "why is this on screen",
 * which the card title mostly answers by itself, and leaves out the thing a
 * reader can act on — whether they have two hours or ten minutes. `windowAt`
 * always knew both ends of the span and returned only the one already behind
 * them.
 *
 * The wording is Today's, verbatim: that card already says "ends at sunrise,
 * 10:05 PM" about the Fajr window, and two screens describing the same kind of
 * fact should not invent two ways of saying it.
 *
 * After a prayer it still names the prayer instead. That window is an event
 * with a grace period rather than a span between two prayers, so there is no
 * closing boundary to name — see `until` in `adhkar-window.ts`.
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
  /*
    Steps, not rows. Morning and evening read the same occasion and drop the
    few the book marks for the other sitting, and a row holding two dhikr
    counts as the two things it actually asks for.
  */
  const steps = stepsFor(session);
  if (steps.length === 0) return null;

  const arabicName = arabicNameFor(session);

  /*
    The prayer's name comes from `state`, not from a table of this screen's
    own. The old one hardcoded window→'Fajr'/'Asr'/'Isha' beside a `windowAt`
    whose header says the evening boundary is unsourced and may move — so the
    day it moved to Maghrib, this line would have gone on saying ʿAsr.
  */
  const standing = state.justPrayed
    ? `${t('adhkar.justPrayed')} ${state.justPrayed}`
    : state.until
      ? t('adhkar.endsAt')
          .replace('{prayer}', state.until.label)
          .replace('{time}', formatTime(state.until.time))
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
      {/*
        Sentence case, not the uppercase kicker the cards elsewhere use. Those
        label a CATEGORY — "FOR ABOUT NOW", "NEXT" — and a deadline is not one.
      */}
      {standing ? (
        <ThemedText type="small" themeColor="textSecondary">
          {standing}
        </ThemedText>
      ) : null}
      <ThemedText type="cardTitle">{t(sessionLabelKey(session))}</ThemedText>
      {/*
        On its own line rather than beside the title, for the same reason the
        rows do it — see `Row`. Tried inline first, the way the Qur'an tab sets
        a surah name, and `الأَذْكَارُ بَعْدَ السَّلاَمِ مِنَ الصَّلاَةِ` broke it:
        title and Arabic both wrapped to two lines and interleaved. That hero
        is not an edge case — it is the one on screen for twenty minutes after
        each of the five prayers.
      */}
      {arabicName ? (
        <ThemedText type="arabicName" style={styles.arabic}>
          {arabicName}
        </ThemedText>
      ) : null}
      <ThemedText type="small" themeColor="textSecondary">
        {sessionMeta(session, t, { long: true })}
      </ThemedText>
      <View style={[styles.start, { backgroundColor: theme.accent }]}>
        <ThemedText type="smallBold" themeColor="textOnAccent">
          {t('adhkar.start')}
        </ThemedText>
      </View>
    </PressableLink>
  );
}

/**
 * One way in, and the Arabic it is called by.
 *
 * The Arabic takes a line of its own rather than sitting beside the English.
 * Inline is what the Qur'an tab does and it works there because a surah name
 * is one word; `الأَذْكَارُ بَعْدَ السَّلاَمِ مِنَ الصَّلاَةِ` is seven, and a
 * row that fits three of the four is worse than one shape that fits all of
 * them. It also lets the Amiri be read rather than squeezed — vowel marks
 * stack above and below the line, so it is the last thing to crowd.
 */
function Row({
  label,
  arabic,
  href,
  meta,
  muted,
  chevron,
}: {
  label: string;
  arabic?: string;
  href: Parameters<typeof PressableLink>[0]['href'];
  /** What this opens, with its unit — never a bare numeral. */
  meta?: string;
  muted?: boolean;
  chevron?: boolean;
}) {
  const theme = useTheme();
  return (
    <PressableLink
      href={href}
      accessibilityLabel={meta ? `${label}. ${meta}` : label}
      style={[styles.row, { borderBottomColor: theme.border }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={styles.rowHead}>
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
        ) : meta ? (
          <ThemedText type="caption" themeColor="textSecondary">
            {meta}
          </ThemedText>
        ) : null}
      </View>
      {arabic ? (
        <ThemedText
          type="arabicName"
          themeColor={muted ? 'textSecondary' : 'text'}
          style={styles.arabic}>
          {arabic}
        </ThemedText>
      ) : null}
    </PressableLink>
  );
}

/** What to call a session. Each names its own sitting now. */
function sessionLabelKey(session: AdhkarSession): UIKey {
  if (session.id === 'morning') return 'adhkar.window.morning';
  if (session.id === 'evening') return 'adhkar.window.evening';
  if (session.id === 'sleep') return 'adhkar.window.night';
  return 'adhkar.window.afterPrayer';
}

/**
 * How long a sitting is and what it holds, in one line.
 *
 * Shared by the hero and the rows so they cannot disagree about what the
 * numeral counts — which they did, silently: the hero said "25 · about 7
 * minutes" while the row below it said "26" and meant the same kind of thing.
 */
function sessionMeta(
  session: AdhkarSession,
  t: (key: UIKey) => string,
  options?: { long?: boolean },
): string {
  const count = t('adhkar.toSay').replace('{n}', String(stepsFor(session).length));
  const time = options?.long
    ? t('adhkar.minutes').replace('{n}', String(session.minutes))
    : t('adhkar.minutesShort').replace('{n}', String(session.minutes));
  return `${count}  ·  ${time}`;
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  content: {
    padding: Spacing.four,
    /*
      Every other tab clears the tab bar this way. This one used a bare
      `Spacing.six`, which is 64 against the 74 iOS needs and the 104 Android
      does — invisible while the list was short, and the last row under the bar
      as soon as somebody pins a few duʿas.
    */
    paddingBottom: BottomTabInset + Spacing.four,
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
  header: { gap: Spacing.two, paddingTop: Spacing.four },
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
    gap: Spacing.one,
    minHeight: 48,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  arabic: { textAlign: 'right', writingDirection: 'rtl' },
});
