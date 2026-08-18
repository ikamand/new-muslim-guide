import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import type { Recitation } from '@/content';
import { Radius, Spacing } from '@/constants/theme';
import { useDisplaySettings } from '@/hooks/use-display-settings';
import { useTheme } from '@/hooks/use-theme';

/**
 * The words you say, rendered the same way everywhere they appear.
 *
 * Arabic always shows. The two lines under it are the user's choice, and the
 * divider only earns its place when there is something below it to divide.
 */
export function RecitationCard({ recitation }: { recitation: Recitation }) {
  const theme = useTheme();
  const { transliteration, translation } = useDisplaySettings();

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
  arabic: {
    fontSize: 26,
    lineHeight: 48,
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
});
