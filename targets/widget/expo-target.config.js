/**
 * The iPhone widgets' target (docs/widgets.md), added to the Xcode project by
 * @bacons/apple-targets at prebuild.
 *
 * The app group comes from app.json, so the app and the widget can never name
 * two different ones: the app writes the schedule there through
 * ExtensionStorage (modules/prayer-widget/ios-storage.ios.ts) and
 * Schedule.swift reads it. iOS 17, for containerBackground and the lock
 * screen's rendering; an iPhone on iOS 16 runs the app without the widgets.
 *
 * @type {import('@bacons/apple-targets/app.plugin').ConfigFunction}
 */
module.exports = (config) => ({
  type: 'widget',
  name: 'PrayerWidgets',
  displayName: 'Prayer times',
  bundleIdentifier: '.widget',
  deploymentTarget: '17.0',
  icon: '../../assets/images/icon.png',
  colors: {
    // theme.ts background and accent, light and dark. npm run widget:check fails if they drift.
    $widgetBackground: { light: '#F3ECDC', dark: '#0B1A33' },
    $accent: { light: '#1B3A6B', dark: '#93B4E8' },
  },
  entitlements: {
    'com.apple.security.application-groups': config.ios.entitlements['com.apple.security.application-groups'],
  },
});
