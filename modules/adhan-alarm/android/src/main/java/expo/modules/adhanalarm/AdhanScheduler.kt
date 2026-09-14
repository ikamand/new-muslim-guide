package expo.modules.adhanalarm

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build

/**
 * Puts adhans into AlarmManager.
 *
 * Exact and allowed while idle, because an adhan is only right at the time
 * and a phone at 5am is always idle. The app declares USE_EXACT_ALARM; if a
 * phone refuses it anyway, the alarm is set inexact rather than not at all,
 * and the receiver turns a late one into a quiet notification.
 */
object AdhanScheduler {
  const val ACTION_FIRE = "expo.modules.adhanalarm.FIRE"
  const val EXTRA_ID = "id"

  /**
   * Replaces the prayer schedule.
   *
   * A test ring still to come is kept. The app re-syncs every time it returns
   * to the foreground, and would otherwise cancel the ring somebody is
   * waiting for with the phone in their hand.
   */
  fun replaceAll(context: Context, alarms: List<AdhanAlarm>) {
    val now = System.currentTimeMillis()
    val existing = AdhanStore.load(context)
    existing.forEach { cancel(context, it.id) }
    val tests = existing.filter { it.isTest && it.fireAt > now }
    val next = tests + alarms.filter { !it.isTest && it.fireAt > now }
    AdhanStore.save(context, next)
    next.forEach { arm(context, it) }
  }

  fun add(context: Context, alarm: AdhanAlarm) {
    val others = AdhanStore.load(context).filter { it.id != alarm.id }
    AdhanStore.save(context, others + alarm)
    arm(context, alarm)
  }

  fun cancelAll(context: Context) {
    AdhanStore.load(context).forEach { cancel(context, it.id) }
    AdhanStore.save(context, emptyList())
  }

  /** After a reboot or an app update, when Android has forgotten every alarm the app set. */
  fun rearm(context: Context) {
    val now = System.currentTimeMillis()
    val future = AdhanStore.load(context).filter { it.fireAt > now }
    AdhanStore.save(context, future)
    future.forEach { arm(context, it) }
  }

  fun canScheduleExact(context: Context): Boolean {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return true
    return context.getSystemService(AlarmManager::class.java)?.canScheduleExactAlarms() == true
  }

  private fun arm(context: Context, alarm: AdhanAlarm) {
    val manager = context.getSystemService(AlarmManager::class.java) ?: return
    val intent = pendingIntent(context, alarm.id, PendingIntent.FLAG_UPDATE_CURRENT) ?: return
    try {
      if (canScheduleExact(context)) {
        manager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, alarm.fireAt, intent)
      } else {
        manager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, alarm.fireAt, intent)
      }
    } catch (error: SecurityException) {
      manager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, alarm.fireAt, intent)
    }
  }

  private fun cancel(context: Context, id: String) {
    val intent = pendingIntent(context, id, PendingIntent.FLAG_NO_CREATE) ?: return
    context.getSystemService(AlarmManager::class.java)?.cancel(intent)
    intent.cancel()
  }

  /** The id rides in the data URI, which is what makes two alarms two PendingIntents; extras do not. */
  private fun pendingIntent(context: Context, id: String, flag: Int): PendingIntent? {
    val intent =
      Intent(context, AdhanAlarmReceiver::class.java)
        .setAction(ACTION_FIRE)
        .setData(Uri.parse("adhan-alarm://alarm/" + Uri.encode(id)))
        .putExtra(EXTRA_ID, id)
    return PendingIntent.getBroadcast(context, 0, intent, flag or PendingIntent.FLAG_IMMUTABLE)
  }
}
