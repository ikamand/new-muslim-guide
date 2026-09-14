import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { Linking, Platform, Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { PressableLink } from '@/components/pressable-link';
import { ThemedText } from '@/components/themed-text';
import { WakeRow } from '@/components/wake-row';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { describeAlert, useReminders, type ReminderFlag } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { PRAYER_IDS, PRAYER_LABEL } from '@/lib/prayer-times';
import type { WakeFlag } from '@/lib/reminders';

/**
 * Reminders: everything the phone can wake you for, in the order the week
 * does.
 *
 * ## Why a page of its own
 *
 * These switches lived on Settings as one long group and made it the longest
 * screen in the app for the second time; the calculation method left for the
 * same reason on 31 Aug. Iyad's call, 11 Sep 2026: a page, reached from the
 * day page's Reminders door and from one row on Settings. Nothing leaves the
 * device, and the permission is asked at the first thing turned on.
 *
 * ## The order
 *
 * Prayer times first, because it is what most people come for. Each prayer
 * is a row that says what its time does and opens that prayer's own page,
 * the same page the bell beside its time opens (14 Sep 2026). The lead time
 * that sat under the five switches moved into those pages, because the adhan
 * has none and each prayer may differ. Then the night prayer's wake-up,
 * because it is daily too, then Friday, Ramadan and the adhkar: each is an
 * offer at a moment opening, and none of them can notice an absence.
 */
export default function RemindersScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { reminders, toggleFlag, flags, granted } = useReminders();

  const heading = (key: UIKey) => (
    <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
      {t(key)}
    </ThemedText>
  );

  /* One switch on a ruled row; the last row in a group has nothing to separate from. */
  const flagRow = (flag: ReminderFlag, label: UIKey) => (
    <View style={[styles.group, styles.row, { borderColor: theme.goldSoft }]}>
      <ThemedText type="default" style={styles.flagLabel}>
        {t(label)}
      </ThemedText>
      <Switch
        value={flags[flag]}
        onValueChange={() => void toggleFlag(flag)}
        trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
        thumbColor={theme.background}
      />
    </View>
  );

  /* The two wake-ups, set like an alarm clock (`wake-row.tsx`), on the same ruled row. */
  const wakeRow = (flag: WakeFlag) => (
    <View style={[styles.group, styles.wakeRow, { borderColor: theme.goldSoft }]}>
      <WakeRow flag={flag} roomy />
    </View>
  );

  return (
    <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: t('reminders.title') }} />

      <View style={styles.section}>
        <ThemedText type="small" themeColor="textSecondary">
          {t('settings.reminders.help')}
        </ThemedText>
        {granted === false && (
          <View style={[styles.notice, { borderLeftColor: theme.accent }]}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('settings.reminders.denied')}
            </ThemedText>
          </View>
        )}
        {/*
          The one thing a permission cannot fix. The app now asks Android for
          exact alarms (app.json, 11 Sep 2026), so a reminder is no longer
          deferred by the system; a phone that puts the app to sleep can
          still hold it, and only the reader can change that.
        */}
        {Platform.OS === 'android' && (
          <Pressable
            onPress={() => void Linking.openSettings()}
            accessibilityRole="button"
            accessibilityLabel={t('reminders.battery.open')}
            style={({ pressed }) => [
              styles.notice,
              { borderLeftColor: theme.goldSoft, opacity: pressed ? 0.6 : 1 },
            ]}>
            <ThemedText type="small" themeColor="textSecondary">
              {t('reminders.battery')}
            </ThemedText>
            <ThemedText type="smallBold" themeColor="accent">
              {t('reminders.battery.open')}
            </ThemedText>
          </Pressable>
        )}
      </View>

      <View style={styles.section}>
        {heading('reminders.prayers')}
        <View style={[styles.group, { borderColor: theme.goldSoft }]}>
          {PRAYER_IDS.map((id, index) => {
            const state = describeAlert(reminders.alerts[id], t);
            return (
              <PressableLink
                key={id}
                href={{ pathname: '/prayer-alert/[id]', params: { id } }}
                accessibilityLabel={`${PRAYER_LABEL[id]}. ${state}`}
                style={[
                  styles.row,
                  index < PRAYER_IDS.length - 1 && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: theme.border,
                  },
                ]}
                pressedStyle={{ backgroundColor: theme.backgroundSelected }}>
                <ThemedText type="default">{PRAYER_LABEL[id]}</ThemedText>
                <View style={styles.state}>
                  <ThemedText type="small" themeColor="textSecondary" numberOfLines={1} style={styles.stateText}>
                    {state}
                  </ThemedText>
                  <Ionicons name="chevron-forward" size={18} color={theme.gold} />
                </View>
              </PressableLink>
            );
          })}
        </View>
      </View>

      <View style={styles.section}>
        {heading('reminders.night')}
        {wakeRow('nightWakeUp')}
      </View>

      <View style={styles.section}>
        {heading('reminders.friday')}
        {flagRow('jumuahNote', 'reminders.jumuahNote')}
      </View>

      {/* Dormant outside the month but always in this same place, so a changed
          mind can always find it (docs/ramadan-mode.md R3). */}
      <View style={styles.section}>
        {heading('reminders.ramadan')}
        {wakeRow('suhoorWakeUp')}
      </View>

      <View style={styles.section}>
        {heading('reminders.adhkar')}
        {flagRow('adhkarNote', 'reminders.adhkarNote')}
      </View>
    </ScrollView>
  );
}

/* The ruled-table grammar Settings uses, so the room matches the door. */
const styles = StyleSheet.create({
  content: {
    padding: Spacing.four,
    paddingBottom: Spacing.six,
    gap: Spacing.five,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },
  section: {
    gap: Spacing.two,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  notice: {
    borderLeftWidth: 3,
    paddingLeft: Spacing.three,
    paddingVertical: Spacing.one,
    gap: Spacing.one,
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
  state: {
    flexShrink: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  stateText: {
    flexShrink: 1,
  },
  flagLabel: { flex: 1, paddingRight: Spacing.two },
  wakeRow: { paddingVertical: Spacing.three },
});
