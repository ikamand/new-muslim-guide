package expo.modules.prayerwidget

import android.app.AlarmManager
import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.content.ComponentName
import android.content.Context
import android.content.Intent
import android.os.Build

/**
 * Redraws placed widgets, and sets the one alarm for their next change.
 *
 * A widget does not run. The schedule says when the drawing next changes, and
 * an exact alarm at that instant redraws every placed widget and sets the next
 * one; about seven a day. The permission is already held for the adhan. With
 * no widget placed, no alarm is set.
 */
internal object PrayerWidgetUpdater {
  private const val ACTION_REFRESH = "expo.modules.prayerwidget.REFRESH"

  /** Half a second past the instant, so the entry that starts then is the one in force when it redraws. */
  private const val PAST_THE_INSTANT_MS = 500L

  fun ids(context: Context, kind: PrayerWidgetKind): IntArray =
    AppWidgetManager.getInstance(context).getAppWidgetIds(ComponentName(context, kind.provider))

  fun updateAll(context: Context) {
    for (kind in PrayerWidgetKind.values()) {
      val ids = ids(context, kind)
      if (ids.isNotEmpty()) update(context, kind, ids)
    }
    scheduleNext(context)
  }

  fun update(context: Context, kind: PrayerWidgetKind, ids: IntArray) {
    if (ids.isEmpty()) return
    val views = PrayerWidgetRenderer.render(context, kind, PrayerWidgetStore.load(context), System.currentTimeMillis())
    AppWidgetManager.getInstance(context).updateAppWidget(ids, views)
  }

  fun scheduleNext(context: Context) {
    val manager = context.getSystemService(AlarmManager::class.java) ?: return
    val intent = refreshIntent(context)
    manager.cancel(intent)
    if (PrayerWidgetKind.values().none { ids(context, it).isNotEmpty() }) return
    val next = PrayerWidgetStore.load(context)?.nextChangeAfter(System.currentTimeMillis()) ?: return
    val at = next + PAST_THE_INSTANT_MS
    try {
      if (canScheduleExact(manager)) {
        manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, intent)
      } else {
        manager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, intent)
      }
    } catch (error: SecurityException) {
      manager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, intent)
    }
  }

  private fun canScheduleExact(manager: AlarmManager): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return true
    return manager.canScheduleExactAlarms()
  }

  private fun refreshIntent(context: Context): PendingIntent =
    PendingIntent.getBroadcast(
      context,
      0,
      Intent(context, PrayerWidgetRefresh::class.java).setAction(ACTION_REFRESH),
      PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE,
    )
}
