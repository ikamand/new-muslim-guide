import { StyleSheet } from 'react-native';

import type { WakeTimePickerProps } from '@/components/wake-time-sheet';
import { useLocale } from '@/hooks/use-locale';
import { useTheme } from '@/hooks/use-theme';
import { formatTime } from '@/lib/prayer-times';

type Compose = typeof import('@expo/ui/jetpack-compose');

/**
 * The wake-up time picker on Android: the system clock dial, the one the
 * Clock app's alarms use, as its own dialog (Expo UI's Compose
 * `TimePickerDialog`). No sheet around it; the dialog is the whole detour.
 *
 * ⚠️ Not seen on a device when it was written (13 Sep 2026): the web preview
 * renders `wake-time-picker.tsx` instead.
 */
export function WakeTimePicker({ visible, initial, onConfirm, onClose }: WakeTimePickerProps) {
  const theme = useTheme();
  const { t } = useLocale();
  if (!visible) return null;

  /*
    Required here rather than imported at the top, for the reason in
    `wake-time-picker.ios.tsx`: Expo UI registers its native views when its
    module loads, and a picker not yet opened on a phone must not be able to
    take Today down.
  */
  const { Host, TimePickerDialog } = require('@expo/ui/jetpack-compose') as Compose;

  // The dial follows how this phone writes a time: AM and PM where it uses them.
  const is24Hour = !/[ap]\.?\s?m/i.test(formatTime(initial));

  return (
    // Out of the row's layout: a dialog has no size to give it, and in flow it would add the row's gap.
    <Host style={styles.dialogHost}>
      <TimePickerDialog
        initialDate={initial.toISOString()}
        is24Hour={is24Hour}
        confirmButtonLabel={t('wake.picker.done')}
        dismissButtonLabel={t('wake.picker.cancel')}
        color={theme.accent}
        onDateSelected={(date) => onConfirm({ hour: date.getHours(), minute: date.getMinutes() })}
        onDismissRequest={onClose}
      />
    </Host>
  );
}

const styles = StyleSheet.create({
  dialogHost: {
    position: 'absolute',
  },
});
