import { StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { practiceKeyFor, type Recitation } from '@/content';
import { ArabicFont, Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useSettings } from '@/hooks/use-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * The words you say, rendered the same way everywhere they appear.
 *
 * Arabic always shows. The two lines under it are the user's choice, and the
 * divider only earns its place when there is something below it to divide.
 */
export function RecitationCard({
  recitation,
  practice = true,
}: {
  recitation: Recitation;
  /** Off where the card IS the practice screen, which would link to itself. */
  practice?: boolean;
}) {
  const theme = useTheme();
  const { t } = useLocale();
  const { transliteration, translation } = useSettings();
  const practiceKey = practice ? practiceKeyFor(recitation) : undefined;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}>
      <ThemedText style={styles.arabic}>{recitation.arabic}</ThemedText>

      {transliteration && (
        <ThemedText type="small" themeColor="textSecondary" style={styles.transliteration}>
          {recitation.transliteration}
        </ThemedText>
      )}

      {translation && (
        <>
          <View style={[styles.divider, { backgroundColor: theme.border }]} />
          <ThemedText type="small">{recitation.translation}</ThemedText>
        </>
      )}

      {recitation.times && (
        <ThemedText type="small" themeColor="accent">
          {recitation.times}
        </ThemedText>
      )}

      {/*
        Only where there is audio to practise with — `practiceKeyFor` returns
        nothing for a recitation with no recording, so this appears and
        disappears with the files rather than with a hand-kept list.
      */}
      {practiceKey && (
        <PressableLink
          href={{ pathname: '/practice', params: { focus: practiceKey } }}
          style={[styles.practice, { backgroundColor: theme.accentMuted }]}
          pressedStyle={{ opacity: 0.7 }}>
          <ThemedText type="smallBold" themeColor="accent">
            {t('practice.thisOne')}
          </ThemedText>
        </PressableLink>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Radius.medium,
    borderWidth: StyleSheet.hairlineWidth,
  },
  /**
   * Amiri, larger and more open than the platform fallback this replaced.
   *
   * 26/48 was chosen for a face that is not this one. Amiri sets a smaller
   * apparent size at the same point size and stacks vowel marks above the
   * line, so it needs both: 30 to read at arm's length on a mat, and 58 so a
   * shadda on one line never touches a kasra on the next.
   */
  arabic: {
    fontFamily: ArabicFont,
    fontSize: 30,
    lineHeight: 58,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  transliteration: {
    fontStyle: 'italic',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: Spacing.one,
  },
  practice: {
    alignSelf: 'flex-start',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    marginTop: Spacing.one,
  },
});
