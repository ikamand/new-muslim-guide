import { Stack, router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MarkedText } from '@/components/marked-text';
import { ThemedText } from '@/components/themed-text';
import { occasionFor, sessionById, stepsFor } from '@/content/duas/sessions';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
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
        <View style={styles.ticks}>
          {steps.map((entry, position) => (
            <View
              key={entry.key}
              style={[
                styles.tick,
                {
                  backgroundColor: position <= index ? theme.accent : theme.border,
                  opacity: position < index ? 0.5 : 1,
                  height:
                    position === index
                      ? 6
                      : entry.repeat > 3
                        ? 5
                        : 3,
                },
              ]}
            />
          ))}
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
          {target > 1 && !instruction ? (
            <View
              style={[
                styles.badge,
                { borderColor: theme.border, backgroundColor: theme.background },
              ]}>
              <ThemedText type="smallBold" themeColor="accent">
                {`${count} / ${target}`}
              </ThemedText>
            </View>
          ) : null}

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
              <ThemedText type="default" themeColor="textSecondary">
                <MarkedText text={english} spans={emphasis} colour={theme.accent} bold />
              </ThemedText>
            ) : null}

          </Pressable>
        </ScrollView>

        {/*
          Moving between duʿas is its own control, not a side effect of
          counting. `›` always advances, whatever the count says, so a line
          marked ×100 is never a hundred taps deep — and `‹` exists at all,
          which it did not before.
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

          <ThemedText type="caption" themeColor="textSecondary" style={styles.hint}>
            {instruction
              ? t('adhkar.instruction')
              : target > 1
                ? t('adhkar.tapToCount')
                : t('adhkar.swipeOn')}
          </ThemedText>

          <Pressable
            onPress={() => (last ? router.back() : goTo(index + 1))}
            hitSlop={Spacing.three}
            accessibilityRole="button"
            accessibilityLabel={last ? t('adhkar.finish') : t('adhkar.next')}
            style={({ pressed }) => [styles.navButton, { opacity: pressed ? 0.6 : 1 }]}>
            <ThemedText type={last ? 'smallBold' : 'subtitle'} themeColor="accent">
              {last ? t('adhkar.finish') : '›'}
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

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
  ticks: { flexDirection: 'row', gap: 2, alignItems: 'flex-end', height: 6 },
  tick: { flex: 1, borderRadius: 2 },
  card: {
    flex: 1,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    padding: Spacing.three,
  },
  /* The scroll container fills the card so a short duʿa is still all target. */
  cardScroll: { flexGrow: 1 },
  cardBody: { flexGrow: 1, gap: Spacing.three, paddingTop: Spacing.three },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
  },
  navButton: { minWidth: 44, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    top: Spacing.three,
    left: Spacing.three,
    zIndex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.large,
    paddingHorizontal: Spacing.three,
    paddingVertical: 2,
  },
  arabic: { textAlign: 'right', writingDirection: 'rtl' },
  swap: { borderLeftWidth: 2, paddingLeft: Spacing.three, gap: Spacing.one },
  hint: { flex: 1, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
});
