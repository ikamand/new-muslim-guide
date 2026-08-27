import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { MarkedText } from '@/components/marked-text';
import { ThemedText } from '@/components/themed-text';
import { occasionFor, sessionById } from '@/content/duas/sessions';
import type { HisnLine } from '@/content/duas/hisn';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
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
export default function AdhkarSessionScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { id } = useLocalSearchParams<{ id: string }>();

  const session = sessionById(id);
  const occasion = session ? occasionFor(session) : undefined;
  const lines = useMemo(() => occasion?.lines ?? [], [occasion]);

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

  const line = lines[Math.min(index, lines.length - 1)];
  const target = line.repeat ?? 1;

  /*
    One press does one thing. Below the target it counts; at the target it
    moves on and resets. The last line stops rather than wrapping — a sitting
    that silently starts again is indistinguishable from one that has not
    finished.
  */
  const advance = () => {
    const next = count + 1;
    if (next < target) {
      setCount(next);
      return;
    }
    if (index < lines.length - 1) {
      setIndex(index + 1);
      setCount(0);
    } else {
      setCount(target);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}>
      <Stack.Screen options={{ title: occasion.english || t('duaBook.title') }} />

      <View style={styles.frame}>
        <View style={styles.ticks}>
          {lines.map((entry, position) => (
            <View
              key={entry.id}
              style={[
                styles.tick,
                {
                  backgroundColor: position <= index ? theme.accent : theme.border,
                  opacity: position < index ? 0.5 : 1,
                  height: position === index ? 6 : entry.repeat && entry.repeat > 3 ? 5 : 3,
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

        <Pressable
          onPress={advance}
          accessibilityRole="button"
          accessibilityLabel={t('adhkar.tapToCount')}
          style={({ pressed }) => [
            styles.card,
            {
              backgroundColor: line.kind === 'quran' ? theme.accentMuted : theme.backgroundElement,
              borderColor: count > 0 ? theme.accent : theme.border,
              opacity: pressed ? 0.9 : 1,
            },
          ]}>
          {target > 1 ? (
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

          <ScrollView contentContainerStyle={styles.cardBody}>
            <ThemedText
              type={line.kind === 'quoted' ? 'arabicLead' : 'arabicQuote'}
              style={styles.arabic}>
              <MarkedText text={line.arabic} spans={line.emphasis} colour={theme.accent} />
            </ThemedText>
            {line.english ? (
              <ThemedText type="default" themeColor="textSecondary">
                <MarkedText
                  text={line.english}
                  spans={line.emphasis}
                  colour={theme.accent}
                  bold
                />
              </ThemedText>
            ) : null}
          </ScrollView>
        </Pressable>

        <ThemedText type="caption" themeColor="textSecondary" style={styles.hint}>
          {target > 1 ? t('adhkar.tapToCount') : t('adhkar.swipeOn')}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  frame: {
    flex: 1,
    padding: Spacing.four,
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
    padding: Spacing.four,
  },
  cardBody: { gap: Spacing.three, paddingTop: Spacing.three },
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
  hint: { textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1 },
});
