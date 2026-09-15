import { ExtensionStorage } from '@bacons/apple-targets';

/**
 * The app group the app and the widget target share. It must match
 * `ios.entitlements` in app.json and `targets/widget/expo-target.config.js`,
 * and the Swift reader's suite name (`targets/widget/Schedule.swift`).
 */
export const WIDGET_APP_GROUP = 'group.com.newmuslimguide.app';

/** The key the Swift side reads. */
export const WIDGET_SCHEDULE_KEY = 'schedule';

const storage = new ExtensionStorage(WIDGET_APP_GROUP);

export function writeIosSchedule(json: string | null): void {
  if (json === null) storage.remove(WIDGET_SCHEDULE_KEY);
  else storage.set(WIDGET_SCHEDULE_KEY, json);
  ExtensionStorage.reloadWidget();
}
