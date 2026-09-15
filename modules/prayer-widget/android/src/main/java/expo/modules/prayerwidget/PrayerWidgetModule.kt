package expo.modules.prayerwidget

import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.os.Build
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

/** What JavaScript calls: `modules/prayer-widget/index.ts`. */
class PrayerWidgetModule : Module() {
  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  override fun definition() =
    ModuleDefinition {
      Name("PrayerWidget")

      // Off the JavaScript thread: storing is quick, drawing three widgets' bitmaps is not free.
      AsyncFunction("setSchedule") { json: String ->
        PrayerWidgetStore.save(context, json)
        PrayerWidgetUpdater.updateAll(context)
      }

      Function<Boolean>("pinSupported") {
        pinSupported(context)
      }

      Function("requestPin") { kind: String ->
        requestPin(context, PrayerWidgetKind.fromName(kind))
      }
    }

  private fun pinSupported(context: Context): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return false
    return AppWidgetManager.getInstance(context).isRequestPinAppWidgetSupported
  }

  /** The phone's own prompt to place the widget (Android 8 and later, on a launcher that allows it). */
  private fun requestPin(context: Context, kind: PrayerWidgetKind): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return false
    val manager = AppWidgetManager.getInstance(context)
    if (!manager.isRequestPinAppWidgetSupported) return false
    return manager.requestPinAppWidget(ComponentName(context, kind.provider), null, null)
  }
}
