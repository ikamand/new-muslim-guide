package expo.modules.prayerwidget

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Bundle

/** The three widgets (docs/widgets.md). Each is registered in this module's manifest. */
internal enum class PrayerWidgetKind(val provider: Class<out AppWidgetProvider>) {
  NICHE(NichePrayerWidget::class.java),
  ROW(RowPrayerWidget::class.java),
  QUIET(QuietPrayerWidget::class.java);

  companion object {
    fun fromName(name: String): PrayerWidgetKind =
      when (name) {
        "row" -> ROW
        "quiet" -> QUIET
        else -> NICHE
      }
  }
}

/** Draws from the stored schedule whenever the launcher asks, and keeps the next redraw set. */
abstract class PrayerWidgetProvider internal constructor(private val kind: PrayerWidgetKind) : AppWidgetProvider() {
  override fun onUpdate(context: Context, appWidgetManager: AppWidgetManager, appWidgetIds: IntArray) {
    PrayerWidgetUpdater.update(context, kind, appWidgetIds)
    PrayerWidgetUpdater.scheduleNext(context)
  }

  override fun onAppWidgetOptionsChanged(context: Context, appWidgetManager: AppWidgetManager, appWidgetId: Int, newOptions: Bundle?) {
    PrayerWidgetUpdater.update(context, kind, intArrayOf(appWidgetId))
  }

  /** The last of this kind removed: the next redraw is only kept if another kind is still placed. */
  override fun onDisabled(context: Context) {
    PrayerWidgetUpdater.scheduleNext(context)
  }
}

class NichePrayerWidget : PrayerWidgetProvider(PrayerWidgetKind.NICHE)

class RowPrayerWidget : PrayerWidgetProvider(PrayerWidgetKind.ROW)

class QuietPrayerWidget : PrayerWidgetProvider(PrayerWidgetKind.QUIET)

/** The next change in the schedule, a reboot, the clock or timezone moving, or the language changing: redraw every widget. */
class PrayerWidgetRefresh : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    PrayerWidgetUpdater.updateAll(context)
  }
}
