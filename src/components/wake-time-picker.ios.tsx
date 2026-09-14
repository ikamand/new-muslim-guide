import { useEffect, useState } from 'react';

import { WakeTimeSheet, type WakeTimePickerProps } from '@/components/wake-time-sheet';
import { useColorScheme } from '@/hooks/use-color-scheme';

type SwiftUI = typeof import('@expo/ui/swift-ui');
type SwiftUIModifiers = typeof import('@expo/ui/swift-ui/modifiers');

/**
 * The wake-up time picker on iOS: the system wheel, the one the Clock app's
 * alarms use, in the app's own sheet (Expo UI's SwiftUI `DatePicker`).
 *
 * ⚠️ Not seen on a device when it was written (13 Sep 2026): the web preview
 * renders `wake-time-picker.tsx` instead.
 */
export function WakeTimePicker({ visible, title, initial, onConfirm, onClose }: WakeTimePickerProps) {
  const scheme = useColorScheme();
  const [date, setDate] = useState(initial);

  // Reopening starts from wherever the alarm is now.
  const opensAt = initial.getTime();
  useEffect(() => {
    if (visible) setDate(new Date(opensAt));
  }, [visible, opensAt]);

  if (!visible) return null;

  /*
    Required here rather than imported at the top: Expo UI registers its
    native views when its module loads, and this row sits on Today. It is in
    the installed build (autolinked, and package.json unchanged since), but a
    picker nobody has opened on a phone yet should not be able to take Today
    down with it if that ever turns out wrong.
  */
  const { DatePicker, Host } = require('@expo/ui/swift-ui') as SwiftUI;
  const { datePickerStyle, labelsHidden } = require('@expo/ui/swift-ui/modifiers') as SwiftUIModifiers;

  return (
    <WakeTimeSheet
      visible={visible}
      title={title}
      onClose={onClose}
      onDone={() => onConfirm({ hour: date.getHours(), minute: date.getMinutes() })}>
      <Host matchContents colorScheme={scheme === 'dark' ? 'dark' : 'light'}>
        <DatePicker
          selection={date}
          displayedComponents={['hourAndMinute']}
          modifiers={[datePickerStyle('wheel'), labelsHidden()]}
          onDateChange={setDate}
        />
      </Host>
    </WakeTimeSheet>
  );
}
