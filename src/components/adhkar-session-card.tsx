import { StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import {
  arabicNameFor,
  sessionForWindow,
  stepsFor,
  type AdhkarSession,
} from '@/content/duas/sessions';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { windowAt, type WindowState } from '@/lib/adhkar-window';
import { formatTime } from '@/lib/prayer-times';

/**
 * What to call a session. Each names its own sitting.
 *
 * Here rather than in `content/duas/sessions.ts` because it returns a `UIKey`,
 * and content must not import the i18n layer — the dependency would run in a
 * circle. Exported because the Duʿa tab's rows need the same answer this card
 * does, and two tables would be two chances to disagree.
 */
export function sessionLabelKey(session: AdhkarSession): UIKey {
  if (session.id === 'morning') return 'adhkar.window.morning';
  if (session.id === 'evening') return 'adhkar.window.evening';
  if (session.id === 'sleep') return 'adhkar.window.night';
  return 'adhkar.window.afterPrayer';
}

/**
 * How long a sitting is and what it holds, in one line.
 *
 * Shared so the card and the rows cannot disagree about what the numeral
 * counts — which they did, silently: the hero said "25 · about 7 minutes"
 * while the row below it said "26" and meant the same kind of thing.
 */
export function sessionMeta(
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

/**
 * The adhkār sitting the clock is in — on the Duʿa tab, and now on Today.
 *
 * One component in two places rather than two that look alike, on exactly the
 * reasoning `DuaCard` already states: the pair that look alike are the pair
 * that drift. It began as `SessionHero` inside the Duʿa tab and moved here the
 * day Today needed it too.
 *
 * ## It says how long is LEFT, not what already happened
 *
 * It used to read `ASR WAS 4:52 PM`. That answers "why is this on screen",
 * which the title mostly answers by itself, and leaves out the half a reader
 * can act on — whether they have two hours or ten minutes.
 *
 * The prayer's name comes from `state.until`, the day's own `PrayerTime`,
 * never from a table of this file's own. An earlier version hardcoded
 * window→'Fajr'/'Asr'/'Isha' beside a `windowAt` whose header says the evening
 * boundary may move, so the day it moved to Maghrib this line would have gone
 * on saying ʿAsr.
 *
 * After a prayer it names the prayer instead: that window is an event with a
 * grace period rather than a span between two, so there is no closing boundary
 * to name.
 */
export function AdhkarSessionCard({
  session,
  state,
}: {
  session: AdhkarSession;
  state: WindowState;
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
      style={[styles.card, { borderColor: theme.goldSoft }]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <View style={[styles.rail, { backgroundColor: theme.gold }]} />
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
        On its own line rather than beside the title. Inline is what the Qur'an
        tab does and it works there because a surah name is one word;
        `الأَذْكَارُ بَعْدَ السَّلاَمِ مِنَ الصَّلاَةِ` is seven, and title and
        Arabic both wrapped to two lines and interleaved. That card is not an
        edge case — it is the one on screen for twenty minutes after each of
        the five prayers.
      */}
      {arabicName ? (
        <ThemedText type="arabicName" style={styles.arabic}>
          {arabicName}
        </ThemedText>
      ) : null}
      <ThemedText type="small" themeColor="textSecondary">
        {sessionMeta(session, t, { long: true })}
      </ThemedText>
      <View
        style={[styles.start, { backgroundColor: theme.action, borderColor: theme.actionRule }]}>
        <ThemedText type="smallBold" themeColor="onAction">
          {t('adhkar.start')}
        </ThemedText>
      </View>
    </PressableLink>
  );
}

/**
 * The sitting for right now, or nothing.
 *
 * Both callers ask the same question and neither should assemble it from
 * `usePrayerTimes` and `windowAt` itself — that is two chances to read a
 * different clock. `undefined` is a real answer: mid-morning through to ʿAsr
 * belongs to no sitting, and roughly half the waking day is like that.
 */
export function useLiveSession(): { session: AdhkarSession; state: WindowState } | undefined {
  const { today } = usePrayerTimes();
  const state = windowAt(today, new Date());
  const session = sessionForWindow(state.window);
  return session ? { session, state } : undefined;
}

const styles = StyleSheet.create({
  /*
    A panel between rules, like everything else on Today. It was the last
    filled rectangle on the screen once the others went, and one card among
    ruled blocks reads as a mistake rather than as emphasis.
  */
  card: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: Spacing.four,
    paddingLeft: Spacing.three,
    gap: Spacing.two,
    overflow: 'hidden',
  },
  /*
    The rail still marks the live sitting among the others on the Duʿa tab,
    but in gold and in the margin: a mark beside the text rather than a
    coloured edge on a card. Illumination is exactly this job.
  */
  rail: {
    position: 'absolute',
    left: 0,
    top: Spacing.four,
    bottom: Spacing.four,
    width: 2,
  },
  arabic: { textAlign: 'right', writingDirection: 'rtl' },
  start: {
    marginTop: Spacing.two,
    minHeight: 44,
    borderRadius: Radius.rule,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
