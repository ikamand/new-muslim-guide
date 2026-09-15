import { requireOptionalNativeModule } from 'expo-modules-core';
import { Platform } from 'react-native';

import { writeIosSchedule } from './ios-storage';

/**
 * The app's side of the widgets: hands them their schedule, and asks the
 * phone to place one (`docs/widgets.md`).
 *
 * Android: the Kotlin module beside this file stores the schedule and redraws
 * every placed widget. iPhone: the widget target in `targets/widget` reads it
 * from the app group, written by `ExtensionStorage` (`ios-storage.ios.ts`).
 * Web: nothing. A build from before this module has no native side, so every
 * call is a no-op there and an update over the air cannot crash it.
 */

export type WidgetKind = 'niche' | 'row' | 'quiet';

type Native = {
  setSchedule(json: string): void;
  pinSupported(): boolean;
  requestPin(kind: WidgetKind): boolean;
};

const native = Platform.OS === 'android' ? requireOptionalNativeModule<Native>('PrayerWidget') : null;

/** The payload as JSON, or null to say there is nothing to show yet. */
export function setWidgetSchedule(json: string | null): void {
  if (native) native.setSchedule(json ?? '');
  else if (Platform.OS === 'ios') writeIosSchedule(json);
}

/** Whether the app can ask this phone to place a widget: Android, on a launcher that allows it. iPhone gives apps no way to. */
export function widgetPinSupported(): boolean {
  return native?.pinSupported() ?? false;
}

/** Shows the phone's own prompt to place the widget. False when it could not be asked. */
export function requestWidgetPin(kind: WidgetKind): boolean {
  return native?.requestPin(kind) ?? false;
}
