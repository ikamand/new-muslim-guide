import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * One way in for every question the app can answer.
 *
 * ## Why a field and not a row of icons
 *
 * The three things queued behind this — the answer library, the ingredient
 * glossary, the scanner — are not three tools. They are one interaction:
 * *I have a question, answer it*. They differ only in whether the input is
 * words, a barcode or a photograph. A field says that. A row of glyphs hides
 * it behind however many guesses there are icons, and asks a reader three
 * weeks into Islam to already know this app's information architecture.
 *
 * It also does not grow. A fourth capability becomes a fourth kind of answer,
 * not a fourth icon — which is how "tools that did not fit in the tab bar"
 * stops being a category defined by exclusion.
 *
 * ## Why it sits in the header
 *
 * Chrome, above the first card and below the greeting, so `PrayerTimesCard`
 * stays the first piece of *content* and salah keeps the spine of the screen.
 * The reach is deliberate: this is a destination somebody chooses, not a
 * control they hit mid-motion, and the sheet it opens puts the keyboard and
 * the results back down at thumb height where the answering happens.
 *
 * The camera glyph is not a second tap target. The whole bar opens the sheet
 * and the glyph is there to say the capability exists at all, because a text
 * field on its own never tells anyone the app can read a label. That is the
 * real cost of choosing a field over an icon row, and this is the mitigation.
 */
export function AskBar() {
  const theme = useTheme();
  const { t } = useLocale();

  return (
    <PressableLink
      href="/ask"
      accessibilityLabel={t('ask.open')}
      style={[
        styles.bar,
        { backgroundColor: theme.backgroundElement, borderColor: theme.border },
      ]}
      pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
      <Ionicons name="search-outline" size={18} color={theme.textSecondary} />
      <ThemedText type="small" themeColor="textSecondary" style={styles.placeholder}>
        {t('ask.placeholder')}
      </ThemedText>
      <View style={[styles.divider, { backgroundColor: theme.border }]} />
      <Ionicons name="scan-outline" size={18} color={theme.textSecondary} />
    </PressableLink>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    /* 48 rather than the 44 minimum: this is the widest target on the screen
       and the one someone reaches furthest for. */
    minHeight: 48,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
    borderWidth: StyleSheet.hairlineWidth,
  },
  placeholder: {
    flex: 1,
  },
  divider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    marginVertical: Spacing.two,
  },
});
