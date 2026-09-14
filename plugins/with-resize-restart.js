/**
 * Android restarts the app's screen when a multi-window resize changes its size.
 *
 * Samsung's pop-up view and split screen resize the activity without React
 * Native's surface re-measuring: text clips mid-glyph and taps land where the
 * tabs used to be, until the window is dragged back to fullscreen (Iyad's
 * phone, 2 Sep 2026). The width-keyed remount in `src/app/_layout.tsx` could
 * not reach it, because the stale surface never tells JavaScript it resized.
 *
 * Taking these three out of `android:configChanges` hands the resize back to
 * Android, which recreates the activity at its new size. The cost is a brief
 * reload that returns to Today. Iyad chose this over switching multi-window
 * off, which Play's large-screen guidance discourages (14 Sep 2026; "RELEASE
 * GATE" in docs/ui-redesign-plan.md).
 *
 * Safe to recreate: MainActivity passes `null` to `super.onCreate`, as
 * react-native-screens requires, and expo-splash-screen's keep-on-screen flag
 * lives in a singleton that `hide()` has already cleared.
 */
const { AndroidConfig, withAndroidManifest } = require('expo/config-plugins');

const RESIZE_CHANGES = ['screenSize', 'smallestScreenSize', 'screenLayout'];

module.exports = function withResizeRestart(config) {
  return withAndroidManifest(config, (config) => {
    const activity = AndroidConfig.Manifest.getMainActivityOrThrow(config.modResults);
    const current = activity.$['android:configChanges'];
    if (current) {
      activity.$['android:configChanges'] = current
        .split('|')
        .filter((change) => !RESIZE_CHANGES.includes(change))
        .join('|');
    }
    return config;
  });
};
