import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { WakeTimePicker } from '@/components/wake-time-picker';
import { Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useLocation } from '@/hooks/use-location';
import { usePrayerTimes } from '@/hooks/use-prayer-times';
import { useReminders } from '@/hooks/use-reminders';
import { useTheme } from '@/hooks/use-theme';
import { formatTime } from '@/lib/prayer-times';
import { nextWake, type WakeFlag, type WakeTime } from '@/lib/reminders';

const clockOf = (time: WakeTime) => new Date(2000, 0, 1, time.hour, time.minute);

/**
 * One wake-up, set like an alarm clock: its time, what it follows, its switch.
 *
 * Iyad, 13 Sep 2026: "alarms times should be able to set the actual time like
 * an alarm clock, same for suhoor." Until a time is set it follows Fajr, which
 * moves by minutes a day and by an hour at a clock change, so nobody has to
 * configure anything for the alarm to be right all year. Tapping the time sets
 * one, and turns the wake-up on, as setting an alarm does; the line under it
 * goes back to following Fajr.
 *
 * The time shown is the next one it will ring at (`nextWake`), placed by the
 * same function the notifications are, so the row cannot promise a time the
 * phone will not keep. When a set time falls outside that night, which a
 * fixed suhoor alarm does as Fajr moves earlier through Ramadan, the row says
 * what rings instead.
 *
 * One component on Today's night card, the fast line and Reminders, so the
 * three places these alarms are switched cannot drift apart.
 *
 * ⚠️ Wording model-written, on the review pile.
 */
export function WakeRow({ flag, roomy = false }: { flag: WakeFlag; roomy?: boolean }) {
  const theme = useTheme();
  const { t } = useLocale();
  const { coords } = useLocation();
  const { profile } = usePrayerTimes();
  const { flags, toggleFlag, granted, wakeTimes, setWakeTime } = useReminders();
  const [picking, setPicking] = useState(false);

  const suhoor = flag === 'suhoorWakeUp';
  const set = wakeTimes[flag];
  const next = coords && profile ? nextWake(coords, profile, new Date(), suhoor ? 'suhoor' : 'night', set) : undefined;

  // The time somebody chose stays the title even on a morning it cannot ring at.
  const shown = set && (!next || next.fellBack) ? clockOf(set) : next?.fireAt;
  const timeText = shown ? formatTime(shown) : '…';
  const [before, after = ''] = t(suhoor ? 'wake.suhoor.title' : 'wake.night.title').split('{time}');
  const title = `${before}${timeText}${after}`;
  const help =
    set && next?.fellBack
      ? t('wake.moved').replace('{fajr}', formatTime(next.anchor)).replace('{time}', formatTime(next.fireAt))
      : t(suhoor ? (set ? 'wake.suhoor.set' : 'wake.suhoor.follows') : set ? 'wake.night.set' : 'wake.night.follows');
  const titleType = roomy ? 'default' : 'smallBold';

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Pressable
          onPress={() => setPicking(true)}
          accessibilityRole="button"
          accessibilityLabel={`${title}. ${help}`}
          accessibilityHint={t('wake.change')}
          style={({ pressed }) => [styles.text, { opacity: pressed ? 0.6 : 1 }]}>
          <ThemedText type={titleType}>
            {before}
            <ThemedText type={titleType} themeColor="accent">
              {timeText}
            </ThemedText>
            {`${after} `}
            <Ionicons name="chevron-down" size={roomy ? 14 : 12} color={theme.accent} />
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {help}
          </ThemedText>
        </Pressable>
        <Switch
          value={flags[flag]}
          onValueChange={() => void toggleFlag(flag)}
          accessibilityLabel={title}
          trackColor={{ false: theme.backgroundSelected, true: theme.accent }}
          thumbColor={theme.background}
        />
      </View>
      {set ? (
        <Pressable
          onPress={() => setWakeTime(flag, null)}
          accessibilityRole="button"
          hitSlop={8}
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}>
          <ThemedText type="small" themeColor="accent">
            {t(suhoor ? 'wake.suhoor.back' : 'wake.night.back')}
          </ThemedText>
        </Pressable>
      ) : null}
      {/* The switch cannot turn on without notifications; say so where it was tapped. */}
      {granted === false ? (
        <ThemedText type="small" themeColor="textSecondary">
          {t('settings.reminders.denied')}
        </ThemedText>
      ) : null}
      <WakeTimePicker
        visible={picking}
        title={t(suhoor ? 'wake.picker.suhoor' : 'wake.picker.night')}
        initial={shown ?? new Date()}
        onConfirm={(time) => {
          setPicking(false);
          setWakeTime(flag, time);
          if (!flags[flag]) void toggleFlag(flag);
        }}
        onClose={() => setPicking(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  text: {
    flex: 1,
  },
});
