import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo } from 'react';

import { PressableLink } from '@/components/pressable-link';
import {
  AdhkarSessionCard,
  sessionLabelKey,
  sessionMeta,
} from '@/components/adhkar-session-card';
import { DuaCard } from '@/components/dua-card';
import { Shelf, Unwan } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { COLLECTIONS } from '@/content/collections';
import { HISN } from '@/content/duas/hisn';
import {
  ADHKAR_SESSIONS,
  arabicNameFor,
  HISN_ARABIC_TITLE,
  sessionForWindow,
} from '@/content/duas/sessions';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { windowAt } from '@/lib/adhkar-window';

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
          <Unwan title={t('tab.duas')} subtitle={t('duas.intro')} />
        </View>

        {live ? <AdhkarSessionCard session={live} state={state} /> : null}

        {live ? null : <DuaCard />}

        {pinned.length > 0 ? (
          <View style={styles.group}>
            <Shelf label={t('adhkar.pinned')} count={pinned.length} />
            <View style={styles.rows}>
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
        <View style={styles.rows}>
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
          {/*
            Any collection of supplications, in the same row as everything else
            here — and driven off `COLLECTIONS` rather than named one by one,
            so a second one lands on this tab without anybody editing it. That
            is the claim the `collection` kind was added to make.

            Filtered by CATEGORY rather than by id: a collection of the names
            of Allah is not a duʿa book and does not belong on this tab, and
            branching on which collection it is would be the thing
            `content/types.ts` forbids.
          */}
          {COLLECTIONS.filter((collection) => collection.meta?.category === 'quran').map(
            (collection) => (
              <Row
                key={collection.id}
                label={collection.title}
                href={{ pathname: '/collection/[id]', params: { id: collection.id } }}
                meta={t('count.items.long').replace('{n}', String(collection.entries.length))}
                muted
              />
            ),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
      style={[styles.row, { borderBottomColor: theme.goldSoft }]}
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
          <ThemedText type="default" themeColor="gold">
            ›
          </ThemedText>
        ) : meta ? (
          <ThemedText type="caption" themeColor="textSecondary">
            {meta}
          </ThemedText>
        ) : null}
      </View>
      {/*
        Gold, at the size a name deserves.

        These come out of Hisn al-Muslim verbatim, and on the tab whose own
        title is a word most readers do not have yet they are the thing worth
        setting properly. Gold because a heading in this book is illuminated —
        and `arabicName` because Amiri stacks marks high and the rung already
        carries the line-height that stops rows colliding.
      */}
      {arabic ? (
        <ThemedText
          type="arabicName"
          themeColor={muted ? 'textSecondary' : 'gold'}
          style={styles.arabic}>
          {arabic}
        </ThemedText>
      ) : null}
    </PressableLink>
  );
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
  /*
    No top rule. `Shelf` above already draws one with the group's name set
    into it, and two lines a gap apart read as a mistake.
  */
  rows: {},
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
