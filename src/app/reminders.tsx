import { Stack } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useReminders } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { PRAYER_IDS, PRAYER_LABEL } from '@/lib/prayer-times';
import { LEAD_CHOICES } from '@/lib/reminders';

/**
 * Reminders: everything the phone can wake you for, in the order the week
 * does.
 *
 * ## Why a page of its own
 *
 * These switches lived on Settings as one long group and made it the longest
 * screen in the app for the second time; the calculation method left for the
 * same reason on 31 Aug. Iyad's call, 11 Sep 2026: a page, reached from the
 * day page's Reminders door and from one row on Settings. Nothing here is
 * new machinery — the hook, the permission prompt and the scheduling are the
 * ones Settings used — so nothing changes about what leaves the device
 * (nothing) or when the permission is asked (at the first switch).
 *
 * ## The order
 *
 * Prayer times first, with the lead time under them, because it is what most
 * people come for. Then Friday, Ramadan and the adhkar: each is an offer at
 * a moment opening, and none of them can notice an absence.
 */
export default function RemindersScreen() {
  const theme = useTheme();
  const { t } = useLocale();
  const { reminders, toggle, toggleFlag, flags, setLead, granted, anyOn } = useReminders();

  const leadLabel = (minutes: number) =>
    minutes === 0
      ? t('settings.reminders.atTime')
      : t('settings.reminders.minutesBefore').replace('{n}', String(minutes));

  const heading = (key: UIKey) => (
    <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionTitle}>
      {t(key)}
    </ThemedText>
  );

  /* One switch on a ruled row; the last row in a group has nothing to separate from. */
  const flagRow = (flag: 'suhoorWakeUp' | 'adhkarNote' | 'jumuahNote', label: UIKey) => (
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
      </View>

      <View style={styles.section}>
        {heading('reminders.prayers')}
        <View style={[styles.group, { borderColor: theme.goldSoft }]}>
          {PRAYER_IDS.map((id, index) => (
            <View
              key={id}
              style={[
                styles.row,
                index < PRAYER_IDS.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: theme.border,
                },
              ]}>
              <ThemedText type="default">{PRAYER_LABEL[id]}</ThemedText>
              <Switch
                value={reminders.prayers[id]}
                onValueChange={() => void toggle(id)}
                trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
                thumbColor={theme.background}
              />
            </View>
          ))}
        </View>

        {/* The lead time only appears once at least one prayer is on: a setting
            about a thing that is not happening yet otherwise. */}
        {anyOn && (
          <>
            {heading('settings.reminders.lead')}
            <View style={[styles.group, { borderColor: theme.goldSoft }]}>
              {LEAD_CHOICES.map((minutes, index) => (
                <Pressable
                  key={minutes}
                  onPress={() => setLead(minutes)}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: reminders.leadMinutes === minutes }}
                  style={[
                    styles.row,
                    index < LEAD_CHOICES.length - 1 && {
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: theme.border,
                    },
                  ]}>
                  <ThemedText type="default">{leadLabel(minutes)}</ThemedText>
                  {reminders.leadMinutes === minutes && (
                    <ThemedText type="smallBold" themeColor="accent">
                      ✓
                    </ThemedText>
                  )}
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>

      <View style={styles.section}>
        {heading('reminders.friday')}
        {flagRow('jumuahNote', 'reminders.jumuahNote')}
      </View>

      {/* Dormant outside the month but always in this same place, so a changed
          mind can always find it (docs/ramadan-mode.md R3). */}
      <View style={styles.section}>
        {heading('reminders.ramadan')}
        {flagRow('suhoorWakeUp', 'reminders.suhoor')}
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
  flagLabel: { flex: 1, paddingRight: Spacing.two },
});
