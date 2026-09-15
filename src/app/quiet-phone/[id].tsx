import { Stack, useLocalSearchParams } from 'expo-router';
import { Platform, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useReminders } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { PRAYER_IDS, PRAYER_LABEL } from '@/lib/prayer-times';
import type { PrayerAlert } from '@/lib/reminders';

/**
 * When the phone is quiet: whether a prayer's adhan plays through silent and
 * Do Not Disturb on Android, or through a Focus on an iPhone.
 *
 * A sheet of its own since direction A (14 Sep 2026). These are set once, or
 * never, and on the prayer's page they had taken a third of the screen with
 * a paragraph under them; the page keeps one row that names what they are
 * set to. Per prayer, as before: Fajr may play on silent while Dhuhr, at
 * work, stays quiet.
 */

const LAYOUT: 'ios' | 'android' = Platform.OS === 'ios' ? 'ios' : 'android';

type QuietField = 'playOnSilent' | 'playInDnd' | 'soundInFocus';

export default function QuietPhoneScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const params = useLocalSearchParams<{ id: string }>();
  const { reminders, setAlert } = useReminders();

  const id = PRAYER_IDS.find((prayer) => prayer === params.id);
  if (!id) return null;
  const alert = reminders.alerts[id];

  const row = (key: UIKey, field: QuietField, last: boolean) => (
    <View
      style={[
        styles.row,
        !last && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: theme.border },
      ]}>
      <ThemedText type="default" style={styles.label}>
        {t(key)}
      </ThemedText>
      <Switch
        value={alert[field]}
        onValueChange={(next) => void setAlert(id, { [field]: next } as Partial<PrayerAlert>)}
        trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
        thumbColor={theme.background}
      />
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('alert.quiet') }} />

      <ThemedText type="small" themeColor="textSecondary">
        {t('alert.quiet.for').replace('{prayer}', PRAYER_LABEL[id])}
      </ThemedText>

      <View style={[styles.group, { borderColor: theme.goldSoft }]}>
        {LAYOUT === 'android' ? (
          <>
            {row('alert.playOnSilent', 'playOnSilent', false)}
            {row('alert.playInDnd', 'playInDnd', true)}
          </>
        ) : (
          row('alert.soundInFocus', 'soundInFocus', true)
        )}
      </View>

      <ThemedText type="small" themeColor="textSecondary">
        {t(LAYOUT === 'android' ? 'alert.quiet.help' : 'alert.ios.help')}
      </ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.three,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  group: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.three,
    paddingVertical: Spacing.three,
  },
  label: {
    flex: 1,
  },
});
