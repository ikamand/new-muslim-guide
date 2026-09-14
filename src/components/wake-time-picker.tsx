import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { WakeTimeSheet, type WakeTimePickerProps } from '@/components/wake-time-sheet';
import { Radius, Spacing } from '@/constants/theme';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import type { UIKey } from '@/i18n/ui';
import { formatTime } from '@/lib/prayer-times';
import type { WakeTime } from '@/lib/reminders';

/**
 * The wake-up time picker where there is no native one: the web preview.
 *
 * iOS uses the system wheel (`wake-time-picker.ios.tsx`) and Android the
 * system clock dial (`wake-time-picker.android.tsx`); Metro picks the file by
 * platform. This one steps the hour and the minutes, five at a time.
 */
export function WakeTimePicker({ visible, title, initial, onConfirm, onClose }: WakeTimePickerProps) {
  const theme = useTheme();
  const { t } = useLocale();
  const [time, setTime] = useState<WakeTime>({ hour: initial.getHours(), minute: initial.getMinutes() });

  // Reopening starts from wherever the alarm is now.
  const opensAt = initial.getTime();
  useEffect(() => {
    if (!visible) return;
    const at = new Date(opensAt);
    setTime({ hour: at.getHours(), minute: at.getMinutes() });
  }, [visible, opensAt]);

  const shift = (minutes: number) =>
    setTime(({ hour, minute }) => {
      const total = (((hour * 60 + minute + minutes) % 1440) + 1440) % 1440;
      return { hour: Math.floor(total / 60), minute: total % 60 };
    });

  const stepper = (label: UIKey, earlier: UIKey, later: UIKey, minutes: number) => (
    <View style={styles.stepper}>
      <ThemedText type="default" style={styles.stepperLabel}>
        {t(label)}
      </ThemedText>
      {(
        [
          ['remove', earlier, -minutes],
          ['add', later, minutes],
        ] as const
      ).map(([icon, a11y, by]) => (
        <Pressable
          key={icon}
          onPress={() => shift(by)}
          accessibilityRole="button"
          accessibilityLabel={t(a11y)}
          style={({ pressed }) => [styles.step, { borderColor: theme.accent, opacity: pressed ? 0.6 : 1 }]}>
          <Ionicons name={icon} size={20} color={theme.accent} />
        </Pressable>
      ))}
    </View>
  );

  return (
    <WakeTimeSheet
      visible={visible}
      title={title}
      onClose={onClose}
      onDone={() => onConfirm(time)}>
      <ThemedText type="subtitle" style={styles.time}>
        {formatTime(new Date(2000, 0, 1, time.hour, time.minute))}
      </ThemedText>
      {stepper('wake.picker.hour', 'wake.picker.hourEarlier', 'wake.picker.hourLater', 60)}
      {stepper('wake.picker.minutes', 'wake.picker.minutesEarlier', 'wake.picker.minutesLater', 5)}
    </WakeTimeSheet>
  );
}

const styles = StyleSheet.create({
  time: {
    fontVariant: ['tabular-nums'],
    paddingVertical: Spacing.two,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    alignSelf: 'stretch',
    paddingVertical: Spacing.one,
  },
  stepperLabel: {
    flex: 1,
  },
  step: {
    width: 48,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Radius.rule,
  },
});
