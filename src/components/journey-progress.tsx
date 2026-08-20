import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';

/**
 * How far through something someone is.
 *
 * Deliberately quiet: a thin bar and a plain count, no percentage, no streak,
 * no celebration. Someone three weeks into Islam does not need a progress
 * meter telling them they are 12% of a religion, and the fastest way to make
 * learning feel like homework is to score it.
 *
 * The bar and the count say the same thing; the count is what a screen reader
 * gets, so the bar is hidden from it rather than announced twice.
 */
export function JourneyProgress({
  done,
  total,
  label,
}: {
  done: number;
  total: number;
  /** Overrides the announced label where the caller has a better one. */
  label?: string;
}) {
  const theme = useTheme();
  const { t } = useLocale();

  const text = t('journey.progress')
    .replace('{done}', String(done))
    .replace('{total}', String(total));
  const fraction = total === 0 ? 0 : done / total;

  return (
    <View style={styles.wrap}>
      <View
        style={[styles.track, { backgroundColor: theme.border }]}
        accessibilityRole="progressbar"
        accessibilityLabel={label ?? text}
        accessibilityValue={{ min: 0, max: total, now: done }}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}>
        <View
          style={[
            styles.fill,
            { backgroundColor: theme.accent, width: `${Math.round(fraction * 100)}%` },
          ]}
        />
      </View>
      <ThemedText type="small" themeColor="textSecondary" accessibilityElementsHidden>
        {done === total && total > 0 ? t('journey.finished') : text}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
  },
  track: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
  },
});
