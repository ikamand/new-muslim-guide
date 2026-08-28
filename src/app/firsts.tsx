import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { FIRSTS } from '@/content/firsts';
import { MaxContentWidth, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useObservations } from '@/hooks/use-observations';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';

/**
 * The ledger. What has happened, in the order it happened.
 *
 * ## There is no total on this screen and there must never be one
 *
 * No "4 of 14", no bar, no percentage. The rules are in `content/firsts.ts`
 * and this screen is where they are kept or broken: the marked ones are a
 * record, and the unmarked ones are things that have not happened yet — which
 * is not a failing and must never be drawn as one. That is why the two groups
 * are separated by a heading rather than by a tick and an empty box down one
 * list, and why the unmarked group is set in the quiet colour.
 *
 * ## No dates, though every first has one
 *
 * The timestamp orders this list and is never printed. "Two years since your
 * first fast" is precisely the noticing `index.tsx` promises the app does not
 * do, and a visible date would also invite the comparison — against a friend,
 * against a plan — that a ledger of a life should not carry.
 *
 * ## Marking is a plain tap, and it can be undone
 *
 * A mis-tap must be recoverable, so a marked first can be tapped again to
 * remove it. That is the ONLY way one is ever removed: nothing expires and
 * nothing lapses.
 */
export default function FirstsScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { firsts, markFirst, forget } = useObservations();

  const done = FIRSTS.filter((first) => firsts[first.id]).sort(
    (a, b) => firsts[a.id] - firsts[b.id],
  );
  const waiting = FIRSTS.filter((first) => !firsts[first.id]);

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('firsts.title') }} />

      <ThemedText type="default" themeColor="textSecondary">
        {t('firsts.intro')}
      </ThemedText>

      {done.length === 0 ? (
        <ThemedText type="small" themeColor="textSecondary">
          {t('firsts.none')}
        </ThemedText>
      ) : (
        <View style={styles.list}>
          {done.map((first) => (
            <Pressable
              key={first.id}
              onPress={() => forget(first.id)}
              accessibilityRole="button"
              accessibilityLabel={t(`first.${first.id}` as UIKey)}
              style={({ pressed }) => [
                styles.row,
                {
                  backgroundColor: pressed ? theme.backgroundSelected : theme.accentMuted,
                  borderColor: theme.accent,
                },
              ]}>
              <ThemedText type="default">{t(`first.${first.id}` as UIKey)}</ThemedText>
            </Pressable>
          ))}
        </View>
      )}

      {waiting.length > 0 ? (
        <View style={styles.list}>
          <ThemedText type="caption" themeColor="textSecondary" style={styles.kicker}>
            {t('firsts.notYet')}
          </ThemedText>
          {waiting.map((first) => (
            <Pressable
              key={first.id}
              onPress={() => markFirst(first.id)}
              accessibilityRole="button"
              accessibilityLabel={`${t(`first.${first.id}` as UIKey)}. ${t('firsts.mark')}`}
              style={({ pressed }) => [
                styles.row,
                {
                  backgroundColor: pressed ? theme.backgroundSelected : 'transparent',
                  borderColor: theme.border,
                },
              ]}>
              <ThemedText type="default" themeColor="textSecondary">
                {t(`first.${first.id}` as UIKey)}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.four,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  list: { gap: Spacing.two },
  kicker: { textTransform: 'uppercase', letterSpacing: 1 },
  row: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
