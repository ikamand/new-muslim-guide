import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { HisnMark, IlluminatedRosette, KhatimMark } from '@/components/illustrations';
import { MarkedText } from '@/components/marked-text';
import { ThemedText } from '@/components/themed-text';
import { occasionFor, sessionById, stepsFor } from '@/content/duas/sessions';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useObservations } from '@/hooks/use-observations';
import type { UIKey } from '@/i18n/ui';
import { useTheme } from '@/hooks/use-theme';

/**
 * One sitting of adhkār, one line at a time.
 *
 * ## Why the whole card counts, and not a button
 *
 * The app this was modelled against puts a small circle at the foot of the
 * screen, far from the words, and then asks for a second press on an arrow
 * once the count is finished. That is two decisions where there should be
 * none, aimed at a thumb belonging to someone who is mid-dhikr with their eyes
 * on the Arabic. Here the card is the target and reaching the count advances
 * on its own.
 *
 * ## What the tick strip is for
 *
 * Twenty-nine lines is a long way to go on faith. The strip shows the shape of
 * the sitting — how many, how far in, which ones are long — in the space a
 * "3/29" label would have taken, and it says something that label cannot.
 *
 * ## ⚠️ Every line is shown, because nothing has been reviewed
 *
 * `annotations.ts` is empty, so the app does not yet know which of these lines
 * are words a person says and which are the book's instructions — the sleep
 * sitting opens with "join his palms and blow into them", and the after-prayer
 * one contains the bare sentence "After every prayer." Until a reviewer marks
 * them, this screen shows the occasion exactly as `/dua-book` does and simply
 * presents it better. It puts a counter only on lines where the BOOK states a
 * count, which is read off its own prose and cross-checked against IslamHouse's
 * English. No line is asserted to be a duʿa by this screen.
 */
/** Each sitting is named for itself. */
const SESSION_TITLE: Record<string, UIKey> = {
  morning: 'adhkar.window.morning',
  evening: 'adhkar.window.evening',
  sleep: 'adhkar.window.night',
  'after-prayer': 'adhkar.window.afterPrayer',
};

export default function AdhkarSessionScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { sittingDone } = useObservations();

  const session = sessionById(id);
  const occasion = session ? occasionFor(session) : undefined;

  const steps = useMemo(() => (session ? stepsFor(session) : []), [session]);

  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  if (!session || !occasion) {
    return (
      <View style={styles.missing}>
        <ThemedText type="default" themeColor="textSecondary">
          {t('duaBook.missing')}
        </ThemedText>
      </View>
    );
  }

  const step = steps[Math.min(index, steps.length - 1)];
  /*
    An instruction is not counted. "Join his palms and blow into them" is
    something to do, and a counter on it would be the app inventing a
    repetition the book never states.
  */
  const { instruction, eveningForms, arabic, english, emphasis } = step;
  const target = instruction ? 1 : step.repeat;
  const last = index === steps.length - 1;

  /*
    Reaching the end of the sitting is the sitting being done.

    The same reasoning as a guide's finish button and a reference scrolled to
    its end: completing the thing IS the completion, and nothing should ask
    somebody to confirm what they have just visibly finished. Recorded as an
    observation only — it is not a lesson and must never appear as progress,
    because `cadence.ts` makes the adhkār `daily` and you do not finish the
    morning adhkār.
  */
  const finishSitting = () => {
    if (session) sittingDone(session.id);
    /*
      Guarded, for the reason `guide/[id].tsx` already records: `router.back()`
      alone does nothing when there is nothing to go back to, and a sitting is
      exactly what a reminder or a link opens as the first screen of a session.
      Somebody finished the morning adhkār, pressed Done, and stayed where they
      were with a button that had visibly done nothing.
    */
    if (router.canGoBack()) router.back();
    else router.replace('/(tabs)');
  };


  /*
    One press does one thing. Below the target it counts; at the target it
    moves on and resets. The last line stops rather than wrapping — a sitting
    that silently starts again is indistinguishable from one that has not
    finished.
  */
  const goTo = (position: number) => {
    setIndex(Math.max(0, Math.min(position, steps.length - 1)));
    setCount(0);
  };

  /*
    Tapping the card COUNTS. The arrows MOVE. Separating them fixes two
    reports at once.

    Counting used to be the only way forward, so a line marked ×100 could not
    be left without a hundred taps — which reads exactly as "I tap and it does
    not go to the next duʿa", because it does not. And there was no way back at
    all, so a mistap cost you the line you were on with no way to return to it.
  */
  const advance = () => {
    const next = count + 1;
    if (next < target) {
      setCount(next);
      return;
    }
    if (index < steps.length - 1) goTo(index + 1);
    else setCount(target);
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      {/*
        The sitting's name, not the occasion's. Morning and evening read the
        same occasion, so its own title — "Morning and evening Adhkār" — would
        put both words at the top of each and undo the naming entirely.
      */}
      <Stack.Screen options={{ title: t(SESSION_TITLE[session.id] ?? 'duaBook.title') }} />

      <View style={styles.frame}>
        {/*
          The bookmark rule — the tick strip's honest successor (Iyad: the
          strip "looked like information and told nobody anything"). The same
          idiom the reading rows use everywhere else: a hairline that fills
          gold as the sitting advances, the plain fact at its end.
        */}
        <View style={styles.factRow}>
          <View style={[styles.factTrack, { backgroundColor: theme.goldSoft }]}>
            <View
              style={[
                styles.factFill,
                {
                  backgroundColor: theme.gold,
                  width: `${Math.round(((index + 1) / steps.length) * 100)}%`,
                },
              ]}
            />
          </View>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.factLabel}>
            {t('journey.progress')
              .replace('{done}', String(index + 1))
              .replace('{total}', String(steps.length))}
          </ThemedText>
        </View>

        {session.id === 'morning-evening' ? (
          <ThemedText type="caption" themeColor="textSecondary">
            {t('adhkar.combined')}
          </ThemedText>
        ) : null}

        {/*
          ⚠️ The ScrollView is the card and the Pressable sits INSIDE it, not
          the other way round. A ScrollView nested in a Pressable claims the
          touch on native and swallows taps landing on the text — which is most
          of the card. React Native Web does not reproduce it, so a browser is
          no help in catching this one.
        */}
        {/*
          The crown chip straddles the card's top border and SAYS what the
          text is: the khatim for a Qur'an verse — on the tinted card, which
          is Qur'an-only — and the fortress for a line from Hisn al-Muslim,
          the Fortress of the Muslim. A sibling of the ScrollView, pinned, so
          a long text scrolls beneath it; the scroll content carries the
          headroom that keeps the first line clear of it — which is also what
          keeps the old count-pill-on-the-words collision from ever coming
          back in another costume.
        */}
        <View style={styles.cardWrap}>
        <ScrollView
          style={[
            styles.card,
            {
              backgroundColor:
                step.line.kind === 'quran' ? theme.accentMuted : theme.backgroundElement,
              borderColor: count > 0 ? theme.accent : theme.border,
            },
          ]}
          contentContainerStyle={styles.cardScroll}>
          <Pressable
            onPress={advance}
            accessibilityRole="button"
            accessibilityLabel={t('adhkar.tapToCount')}
            style={({ pressed }) => [styles.cardBody, { opacity: pressed ? 0.9 : 1 }]}>
            <ThemedText
              type={step.line.kind === 'quoted' ? 'arabicLead' : 'arabicQuote'}
              style={styles.arabic}>
              <MarkedText text={arabic} spans={emphasis} colour={theme.accent} />
            </ThemedText>
            {/*
              The book's own evening substitution, shown beside the morning
              wording rather than spliced into it — the footnote ends "and the
              rest as above", so a complete evening text exists nowhere to
              copy.
            */}
            {eveningForms.length > 0 ? (
              <View style={[styles.swap, { borderLeftColor: theme.accent }]}>
                <ThemedText type="caption" themeColor="textSecondary">
                  {t('adhkar.inTheEvening')}
                </ThemedText>
                {eveningForms.map((form) => (
                  <ThemedText key={form} type="arabicQuote" style={styles.arabic}>
                    {form}
                  </ThemedText>
                ))}
              </View>
            ) : null}
            {english ? (
              <>
                {/* The illuminated rosette divides the words from their meaning. */}
                <View style={styles.dividerRow}>
                  <View style={[styles.dividerRule, { backgroundColor: theme.goldSoft }]} />
                  <IlluminatedRosette
                    petal={theme.goldSoft}
                    outline={theme.gold}
                    heart={theme.gold}
                  />
                  <View style={[styles.dividerRule, { backgroundColor: theme.goldSoft }]} />
                </View>
                <ThemedText type="default" themeColor="textSecondary">
                  <MarkedText text={english} spans={emphasis} colour={theme.accent} bold />
                </ThemedText>
              </>
            ) : null}

            {/* Why the line is said — rendered only when a reviewed narration
                exists in the annotations; see HisnAnnotation.virtue. */}
            {step.virtue ? (
              <View
                style={[
                  styles.virtue,
                  { borderColor: theme.border, backgroundColor: theme.background },
                ]}>
                <ThemedText type="caption" themeColor="gold" style={styles.virtueHead}>
                  {t('adhkar.whySaid')}
                </ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {step.virtue.english}
                </ThemedText>
                <ThemedText type="caption" themeColor="textSecondary">
                  {step.virtue.source}
                </ThemedText>
              </View>
            ) : null}

          </Pressable>
        </ScrollView>
        <View
          style={[
            styles.crown,
            { backgroundColor: theme.background, borderColor: theme.border },
          ]}>
          {step.line.kind === 'quran' ? (
            <KhatimMark color={theme.gold} />
          ) : (
            <HisnMark color={theme.gold} />
          )}
        </View>
        </View>

        {/*
          The instrument: the circle carries the count and a gold ring that
          fills as the dhikr is said — one glance says how far, whether it is
          3 or 100, and it never scrolls away the way the old pill did. It
          sits where a one-handed thumb rests, counts on press, resets on a
          long press; the card above still counts too, so nothing is taken
          from a thumb used to tapping the words. `‹ ›` move, as before —
          never a side effect of counting.
        */}
        <View style={styles.nav}>
          <Pressable
            onPress={() => goTo(index - 1)}
            disabled={index === 0}
            hitSlop={Spacing.three}
            accessibilityRole="button"
            accessibilityLabel={t('adhkar.previous')}
            style={({ pressed }) => [
              styles.navButton,
              { opacity: index === 0 ? 0.25 : pressed ? 0.6 : 1 },
            ]}>
            <ThemedText type="subtitle" themeColor="accent">
              ‹
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={advance}
            onLongPress={() => setCount(0)}
            accessibilityRole="button"
            accessibilityLabel={
              instruction
                ? t('adhkar.instruction')
                : `${t('adhkar.tapToCount')}. ${count} / ${target}. ${t('adhkar.resetCount')}`
            }
            style={({ pressed }) => [styles.circleWrap, { opacity: pressed ? 0.85 : 1 }]}>
            <Svg
              width={RING_SIZE}
              height={RING_SIZE}
              viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
              fill="none"
              style={styles.ring}>
              <Circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_R}
                stroke={theme.goldSoft}
                strokeWidth={3}
              />
              {!instruction && count > 0 ? (
                <Circle
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_R}
                  stroke={theme.gold}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeDasharray={`${RING_C * (count / target)} ${RING_C}`}
                />
              ) : null}
            </Svg>
            <View style={[styles.circle, { backgroundColor: theme.action }]}>
              {instruction ? (
                <ThemedText type="subtitle" themeColor="onAction">
                  ›
                </ThemedText>
              ) : (
                <>
                  <ThemedText type="cardTitle" themeColor="onAction" style={styles.circleCount}>
                    {count}
                  </ThemedText>
                  <ThemedText type="caption" themeColor="onAction" style={styles.circleOf}>
                    {`of ${target}`}
                  </ThemedText>
                </>
              )}
            </View>
          </Pressable>

          <Pressable
            onPress={() => (last ? finishSitting() : goTo(index + 1))}
            hitSlop={Spacing.three}
            accessibilityRole="button"
            accessibilityLabel={last ? t('adhkar.finish') : t('adhkar.next')}
            style={({ pressed }) => [styles.navButton, { opacity: pressed ? 0.6 : 1 }]}>
            <ThemedText type={last ? 'smallBold' : 'subtitle'} themeColor="accent">
              {last ? t('adhkar.finish') : '›'}
            </ThemedText>
          </Pressable>
        </View>

        {instruction ? (
          <ThemedText type="caption" themeColor="textSecondary" style={styles.hint}>
            {t('adhkar.instruction')}
          </ThemedText>
        ) : null}
      </View>
    </View>
  );
}

/** The instrument's geometry: ring radius and circumference, module-level. */
const RING_SIZE = 84;
const RING_R = 38;
const RING_C = 2 * Math.PI * RING_R;

const styles = StyleSheet.create({
  screen: { flex: 1 },
  frame: {
    flex: 1,
    /* 16, not 24: see the gutter note in `dua-book/[id].tsx`. */
    padding: Spacing.three,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  missing: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.four },
  factRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  factTrack: { flex: 1, height: 2, borderRadius: 1 },
  factFill: { position: 'absolute', left: 0, top: 0, bottom: 0, borderRadius: 1 },
  factLabel: { fontVariant: ['tabular-nums'] },
  /* Headroom for the crown chip straddling the card's top border. */
  cardWrap: { flex: 1, marginTop: Spacing.four },
  card: {
    flex: 1,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    padding: Spacing.three,
  },
  /* The scroll container fills the card so a short duʿa is still all target;
     top padding keeps the first line clear of the crown chip. */
  cardScroll: { flexGrow: 1, paddingTop: Spacing.four },
  /* Centred while shorter than the card; a long text top-aligns and scrolls. */
  cardBody: { flexGrow: 1, gap: Spacing.three, justifyContent: 'center' },
  crown: {
    position: 'absolute',
    top: -Spacing.five + Spacing.two,
    alignSelf: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  dividerRule: { flex: 1, height: 1 },
  virtue: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.small,
    padding: Spacing.three,
    gap: Spacing.one,
  },
  virtueHead: { textTransform: 'uppercase', letterSpacing: 1 },
  circleWrap: {
    width: RING_SIZE,
    height: RING_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: { position: 'absolute', transform: [{ rotate: '-90deg' }] },
  circle: {
    width: RING_SIZE - 14,
    height: RING_SIZE - 14,
    borderRadius: (RING_SIZE - 14) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCount: { fontVariant: ['tabular-nums'] },
  circleOf: { opacity: 0.8 },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  navButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  arabic: { textAlign: 'right', writingDirection: 'rtl' },
  swap: { borderLeftWidth: 2, paddingLeft: Spacing.three, gap: Spacing.one },
  hint: { textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
});
