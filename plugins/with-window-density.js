/**
 * React Native converts at the window's density, not the phone display's.
 *
 * Samsung's pop-up view and split screen shrink an app by lowering its
 * window's density: on Iyad's phone a full-screen window is 420dpi and a
 * pop-up or split window 321dpi (read over adb, 15 Sep 2026). React Native
 * 0.86's `DisplayMetricsHolder` takes its density from
 * `Display.getRealMetrics()`, which ignores the window and always returns the
 * display's 420, and `PixelUtil` converts every dp, sp and touch with it,
 * while react-native-screens already uses the window's 321. The two disagree
 * by 1.31: text clips ("Sta" for "Start") and taps miss the tabs. Restarting
 * the screen cannot heal it, because a fresh screen reads the same number,
 * which is why `with-resize-restart.js` alone did not fix the phone.
 *
 * So the window's own density is handed to React Native at the three moments
 * it re-reads the display: after the screen is created, after its content is
 * set (React Native builds its root view there, which an update check can
 * delay past onCreate), and after a configuration change. In full screen the
 * two numbers are equal and nothing moves.
 *
 * Upstream this is react-native #57183, still open. The workaround posted
 * there calls `initDisplayMetrics(this)` alone, which still reads
 * getRealMetrics and would leave this phone at 420.
 *
 * The anchors are asserted, so a template that moves them stops prebuild
 * instead of shipping a build without the fix.
 */
const { withMainActivity } = require('expo/config-plugins');

const SYNC = 'useWindowDensity';

const BLOCK = `
  override fun onContentChanged() {
    super.onContentChanged()
    ${SYNC}()
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ${SYNC}()
  }

  /** React Native converts at this window's density. See plugins/with-window-density.js. */
  @Suppress("DEPRECATION")
  private fun ${SYNC}() {
    DisplayMetricsHolder.initDisplayMetrics(this)
    val window = resources.displayMetrics
    DisplayMetricsHolder.getScreenDisplayMetrics().apply {
      density = window.density
      densityDpi = window.densityDpi
      scaledDensity = window.scaledDensity
    }
  }
`;

function once(src, anchor) {
  if (src.split(anchor).length !== 2) {
    throw new Error(`with-window-density: expected exactly one "${anchor}" in MainActivity.kt`);
  }
}

module.exports = function withWindowDensity(config) {
  return withMainActivity(config, (config) => {
    if (config.modResults.language !== 'kt') {
      throw new Error('with-window-density: MainActivity is not Kotlin');
    }
    let src = config.modResults.contents;
    if (src.includes(SYNC)) return config;

    once(src, 'import android.os.Bundle');
    once(src, 'super.onCreate(null)');
    for (const taken of ['fun onContentChanged', 'fun onConfigurationChanged']) {
      if (src.includes(taken)) {
        throw new Error(`with-window-density: MainActivity already has ${taken}; merge it by hand`);
      }
    }

    src = src.replace(
      'import android.os.Bundle',
      'import android.os.Bundle\nimport android.content.res.Configuration\nimport com.facebook.react.uimanager.DisplayMetricsHolder',
    );
    src = src.replace('super.onCreate(null)', `super.onCreate(null)\n    ${SYNC}()`);
    const end = src.lastIndexOf('}');
    config.modResults.contents = src.slice(0, end) + BLOCK + src.slice(end);
    return config;
  });
};
