import { Pressable, StyleSheet, View } from 'react-native';

import { QuietRow } from '@/components/jadwal';
import { ThemedText } from '@/components/themed-text';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { useTheme } from '@/hooks/use-theme';

/**
 * The one way the app asks where somebody is.
 *
 * Five screens need a location and, until 5 Sep 2026, three of them — the
 * month of times, its settings and Match your mosque — showed "Working out
 * today's times…" for ever when there was none, with nothing to press. Today
 * and Qibla each had an ask of their own design. This is the ask, once, so a
 * reader who refused location on Tuesday meets the same two doors on every
 * screen that needs it: grant it, or choose a city from the list on the
 * phone.
 *
 * Asking for location is the first thing this app ever asks of anyone, so
 * the reason and the limit are on the same screen as the button. "Never
 * leaves this device" is the whole positioning of the app, and this is the
 * one moment a reader is actually wondering about it.
 *
 * `title` and `why` let a screen say what IT needs the location for; the
 * default is the prayer times' wording.
 */
export function LocationAsk({ title, why }: { title?: string; why?: string }) {
  const theme = useTheme();
  const { t } = useLocale();
  const { status, request } = useLocation();

  const waiting = status === 'locating';
  const off = status === 'unavailable';

  return (
    <View style={styles.block}>
      <ThemedText type="cardTitle">{title ?? t('times.needLocation')}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {waiting ? t('qibla.locating') : off ? t('times.locationOff') : (why ?? t('times.needLocation.why'))}
      </ThemedText>
      {!waiting && !off && (
        <Pressable
          onPress={() => void request()}
          accessibilityRole="button"
          accessibilityLabel={t('times.useLocation')}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.accent, opacity: pressed ? 0.85 : 1 },
          ]}>
          <ThemedText type="smallBold" themeColor="textOnAccent">
            {t('times.useLocation')}
          </ThemedText>
        </Pressable>
      )}
      {/*
        The second door. A quiet row rather than a second button, because
        granting location is the better answer for almost everyone and two
        equal buttons would say the app has no opinion.
      */}
      <QuietRow href="/choose-place" label={t('place.choose')} strong />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: Spacing.three,
    alignSelf: 'stretch',
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: Spacing.two + Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Radius.small,
  },
});
