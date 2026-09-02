import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

import { PressableLink } from '@/components/pressable-link';
import {
  AdhkarSessionCard,
  sessionLabelKey,
} from '@/components/adhkar-session-card';
import { DuaCard } from '@/components/dua-card';
import { HeadpieceMark, HisnMark, KhatimMark } from '@/components/illustrations';
import { Shelf, Unwan } from '@/components/jadwal';
import { ARABIC_NAME_TRIM, ThemedText } from '@/components/themed-text';
import { COLLECTIONS } from '@/content/collections';
import { HISN } from '@/content/duas/hisn';
import {
  ADHKAR_SESSIONS,
  HISN_ARABIC_TITLE,
  sessionForWindow,
  type AdhkarSession,
} from '@/content/duas/sessions';
import { BottomTabInset, MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';
import { windowAt } from '@/lib/adhkar-window';
import type { UIKey } from '@/i18n/ui';

/**
 * The duʿa tab — the misbaha and the fortress.
 *
 * ## The two natures (2 Sep, from the "Misbaha and the Fortress" artifact)
 *
 * The tab holds two different things and now gives each its object. The four
 * sittings said at fixed points in the day are BEADS ON ONE STRAND — the
 * instrument this practice is counted on, and the tab's own icon — with the
 * open sitting's bead gold and full, and its card beneath. The library —
 * Hisn al-Muslim and the Qur'an duʿas — is the fortress: two rows wearing
 * the marks the counting screen already draws.
 *
 * ## What the strand replaced
 *
 * The three closed-session rows, and their "25 to say · 7 min" metas — each
 * still says it on its own screen, and on the card the moment its window
 * opens. Tapping a bead opens its sitting exactly as its row did. Six list
 * items became two, under one shelf line.
 *
 * ## One hero, everything else is a row — still the law
 *
 * Exactly one thing is ever opened up: the live session, or — for the seven
 * to thirteen hours a day that belong to no sitting — one pinned duʿa. In
 * the dead zone no bead is gold and the strand just sits quiet; no location
 * is the same state, not an error.
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
    A star on every occasion says pinning is something you can do to anything
    in the book.
  */
  const pinned = pinnedDuas
    .map((key) => HISN.find((occasion) => String(occasion.id) === key))
    .filter((occasion): occasion is NonNullable<typeof occasion> => occasion !== undefined);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        {/*
          The ʿunwān, now with its illumination: the medallion-and-tendrils
          headpiece a manuscript would put here. Warmth from geometry and
          gold, never a raster — a baked-light image is wrong in dark mode,
          and this app is used before dawn. The first tab to take one;
          docs/ui-redesign-plan.md holds the decision.
        */}
        <View style={styles.header}>
          <Unwan
            title={t('tab.duas')}
            subtitle={t('duas.intro')}
            headpiece={<HeadpieceMark color={theme.gold} trackColor={theme.goldSoft} />}
          />
        </View>

        <Strand liveId={live?.id} />

        {live ? <AdhkarSessionCard session={live} state={state} /> : null}
        {live ? null : <DuaCard />}

        {/*
          One zero-gap group for everything ruled: the pinned shelf and its
          rows, then the fortress, flush — a rule and the next row's box
          touch (the flush-join rule).
        */}
        <View>
          {pinned.length > 0 ? (
            <>
              <Shelf label={t('adhkar.pinned')} count={pinned.length} />
              {pinned.map((occasion) => (
                <Row
                  key={occasion.id}
                  label={occasion.english || occasion.arabic}
                  arabic={occasion.arabic}
                  href={{ pathname: '/dua-book/[id]', params: { id: String(occasion.id) } }}
                  chevron
                />
              ))}
            </>
          ) : null}

          {/*
            The fortress: the two ways into everything else, wearing the
            marks the counting screen's crowns already draw — the gate for
            the book named after one, the seal for the Qur'an duʿas.
          */}
          <Shelf label={t('duas.group.else')} />
          <View>
            <Row
              label="Hisn al-Muslim"
              arabic={HISN_ARABIC_TITLE}
              href="/dua-book"
              meta={t('adhkar.occasions').replace('{n}', String(HISN.length))}
              mark={<HisnMark color={theme.textSecondary} size={30} />}
              muted
            />
            {COLLECTIONS.filter((collection) => collection.meta?.category === 'quran').map(
              (collection) => (
                <Row
                  key={collection.id}
                  label={collection.title}
                  href={{ pathname: '/collection/[id]', params: { id: collection.id } }}
                  meta={t('count.items.long').replace('{n}', String(collection.entries.length))}
                  mark={<KhatimMark color={theme.textSecondary} size={30} />}
                  muted
                />
              ),
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/*
  The strand's beads, in day order — not the content file's order. "After
  prayer" recurs five times a day and holds a position here only because it
  must hold one; between Morning and Evening is where most of its sayings
  fall. On the record in the artifact's notes, Iyad's call to revisit.
*/
const STRAND_ORDER: readonly string[] = ['morning', 'after-prayer', 'evening', 'sleep'];
const STRAND_T: readonly number[] = [0.13, 0.38, 0.62, 0.87];
const STRAND_HEIGHT = 112;
const BEAD_WIDTH = 64;

/**
 * A point on the strand's curve — the same quadratic bézier the thread is
 * drawn with, so a bead can never sit off the thread. The Awqat arch taught
 * this: hand-placed marks drift off a curve the first time anything moves.
 */
function strandPoint(width: number, t: number): { x: number; y: number } {
  const u = 1 - t;
  return {
    x: u * u * 6 + 2 * u * t * (width / 2) + t * t * (width - 6),
    y: u * u * 20 + 2 * u * t * 74 + t * t * 20,
  };
}

/**
 * The day's sittings as beads on one hung thread, the live one gold and
 * blooming. Tapping a bead opens its sitting, exactly as its old row did.
 * In the dead zone no bead is gold and the strand sits quiet.
 */
function Strand({ liveId }: { liveId?: string }) {
  const theme = useTheme();
  const { t } = useLocale();
  const [width, setWidth] = useState(0);

  const sessions = STRAND_ORDER.map((id) =>
    ADHKAR_SESSIONS.find((session) => session.id === id),
  ).filter((session): session is AdhkarSession => session !== undefined);

  return (
    <View
      style={styles.strand}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      {width > 0 && (
        <>
          <Svg width={width} height={STRAND_HEIGHT} style={StyleSheet.absoluteFill}>
            <Path
              d={`M6 20 Q${width / 2} 74 ${width - 6} 20`}
              stroke={theme.goldSoft}
              strokeWidth={1.2}
              fill="none"
            />
            {/* The tassel at the strand's head, marking its low point. */}
            <Path
              d={`M${width / 2} 47 v10 m-4 -2 l4 6 l4 -6`}
              stroke={theme.goldSoft}
              strokeWidth={1}
              fill="none"
            />
          </Svg>
          {sessions.map((session, index) => {
            const point = strandPoint(width, STRAND_T[index]);
            const isLive = session.id === liveId;
            return (
              <PressableLink
                key={session.id}
                href={{ pathname: '/adhkar/[id]', params: { id: session.id } }}
                accessibilityLabel={t(sessionLabelKey(session))}
                style={[
                  styles.bead,
                  { left: point.x - BEAD_WIDTH / 2, top: point.y - 15 },
                ]}
                pressedStyle={{ opacity: 0.6 }}>
                {/* A paper disc, so the thread passes behind, never through. */}
                <View style={[styles.beadDisc, { backgroundColor: theme.background }]}>
                  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
                    {isLive ? (
                      <>
                        <Circle cx={15} cy={15} r={13} stroke={theme.gold} strokeWidth={1} />
                        <Circle cx={15} cy={15} r={8.5} fill={theme.gold} />
                      </>
                    ) : (
                      <Circle cx={15} cy={15} r={8.5} stroke={theme.text} strokeWidth={1.2} />
                    )}
                  </Svg>
                </View>
                <ThemedText
                  type="caption"
                  themeColor={isLive ? 'gold' : 'textSecondary'}
                  style={styles.beadLabel}>
                  {t(`adhkar.bead.${session.id}` as UIKey)}
                </ThemedText>
              </PressableLink>
            );
          })}
        </>
      )}
    </View>
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
  mark,
}: {
  label: string;
  arabic?: string;
  href: Parameters<typeof PressableLink>[0]['href'];
  /** What this opens, with its unit — never a bare numeral. */
  meta?: string;
  muted?: boolean;
  chevron?: boolean;
  /** A drawn mark naming the door — the fortress gate, the seal. */
  mark?: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <PressableLink
      href={href}
      accessibilityLabel={meta ? `${label}. ${meta}` : label}
      style={[styles.row, { borderBottomColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      {mark ? <View style={styles.rowMark}>{mark}</View> : null}
      <View style={styles.rowBody}>
        <View style={styles.rowHead}>
          {/* The rung every other tab's rows wear — at `default` these read a
              weight lighter than the fihrist and Learn (Iyad's review). */}
          <ThemedText type="cardTitle" themeColor={muted ? 'textSecondary' : 'text'}>
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
          Gold, at the size a name deserves. These come out of Hisn al-Muslim
          verbatim, and on the tab whose own title is a word most readers do
          not have yet they are the thing worth setting properly.
        */}
        {arabic ? (
          <ThemedText
            type="arabicName"
            themeColor={muted ? 'textSecondary' : 'gold'}
            style={styles.arabic}>
            {arabic}
          </ThemedText>
        ) : null}
      </View>
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
      does.
    */
    paddingBottom: BottomTabInset + Spacing.four,
    /* Card joins only — the ruled rows live in the flush group below. */
    gap: Spacing.two,
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
  header: { gap: Spacing.two, paddingTop: Spacing.four, paddingBottom: Spacing.two },
  strand: {
    height: STRAND_HEIGHT,
  },
  bead: {
    position: 'absolute',
    width: BEAD_WIDTH,
    alignItems: 'center',
    gap: Spacing.one,
  },
  beadDisc: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beadLabel: {
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    minHeight: 48,
    paddingVertical: Spacing.two,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowMark: {
    width: 34,
    alignItems: 'center',
  },
  rowBody: {
    flex: 1,
    gap: Spacing.one,
    minWidth: 0,
  },
  rowHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  arabic: { textAlign: 'right', writingDirection: 'rtl', ...ARABIC_NAME_TRIM },
});
