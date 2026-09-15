package expo.modules.adhanalarm

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.content.ContextCompat

/**
 * The three notifications an adhan can be.
 *
 * - **Playing**, while the adhan sounds. It pops up as the adhan starts.
 * - **Quiet**, when the adhan did not sound: the phone was on silent, in Do
 *   Not Disturb or on a call, or the alarm came late. It pops up and
 *   vibrates, because it is the prayer's alert.
 * - **After**, once an adhan that sounded has ended. The prayer stays in the
 *   shade and nothing pops up. It has its own low channel because, on the
 *   quiet channel, Iyad's Galaxy S24 popped the notice up the moment a
 *   volume press stopped the adhan, silent flag and all (logged 14 Sep 2026:
 *   `EdgeLightingManager: showForNotification … isHeadUp=true`), which read
 *   as a notification arriving mid-adhan. Android pops up only a notification
 *   of high importance. ⚠️ That Samsung's pop-up follows the same rule is
 *   read from its log, not yet seen on the phone.
 *
 * All three are silent: while the adhan plays the service is the sound, and
 * when it does not play a sound would be exactly what the reader chose not to
 * hear. The quiet channel keeps vibration, which a phone on vibrate gives and
 * a silent phone withholds by itself.
 */
object AdhanNotifications {
  const val CHANNEL_PLAYING = "adhan-playing"
  const val CHANNEL_QUIET = "adhan-quiet"
  const val CHANNEL_AFTER = "adhan-after"

  /** The after channel's name if an adhan ends before the app has named its channels since this build. */
  private const val AFTER_FALLBACK_NAME = "After the adhan"

  fun ensureChannels(context: Context, playingName: String, quietName: String, afterName: String) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
    val manager = context.getSystemService(NotificationManager::class.java) ?: return
    val playing =
      NotificationChannel(CHANNEL_PLAYING, playingName, NotificationManager.IMPORTANCE_HIGH).apply {
        setSound(null, null)
        enableVibration(false)
        lockscreenVisibility = Notification.VISIBILITY_PUBLIC
      }
    val quiet =
      NotificationChannel(CHANNEL_QUIET, quietName, NotificationManager.IMPORTANCE_HIGH).apply {
        setSound(null, null)
        enableVibration(true)
        lockscreenVisibility = Notification.VISIBILITY_PUBLIC
      }
    manager.createNotificationChannel(playing)
    manager.createNotificationChannel(quiet)
    manager.createNotificationChannel(afterChannel(afterName))
  }

  private fun afterChannel(name: String) =
    NotificationChannel(CHANNEL_AFTER, name, NotificationManager.IMPORTANCE_LOW).apply {
      setSound(null, null)
      enableVibration(false)
      lockscreenVisibility = Notification.VISIBILITY_PUBLIC
    }

  /** One id per alarm, so the quiet notice replaces the playing one rather than stacking under it. */
  fun notificationId(alarm: AdhanAlarm): Int = 7300 + (alarm.id.hashCode() and 0x3FF)

  fun builder(context: Context, channel: String, alarm: AdhanAlarm, text: String): NotificationCompat.Builder {
    val builder =
      NotificationCompat.Builder(context, channel)
        .setSmallIcon(smallIcon(context))
        .setContentTitle(alarm.title)
        .setContentText(text)
        .setCategory(NotificationCompat.CATEGORY_REMINDER)
        .setPriority(NotificationCompat.PRIORITY_HIGH)
        .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
    openApp(context)?.let { builder.setContentIntent(it) }
    val color = context.resources.getIdentifier("notification_icon_color", "color", context.packageName)
    if (color != 0) builder.color = ContextCompat.getColor(context, color)
    return builder
  }

  /**
   * The prayer's notification without the adhan.
   *
   * `alreadyAlerted` after an adhan that sounded: the notice stays in the
   * shade like any notification nobody dismissed, on the after channel, so it
   * neither buzzes nor pops up a second time.
   */
  fun postQuiet(context: Context, alarm: AdhanAlarm, alreadyAlerted: Boolean = false) {
    val manager = NotificationManagerCompat.from(context)
    if (!manager.areNotificationsEnabled()) return
    if (alreadyAlerted && Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      // An alarm can end before the app has opened since this build and named the channel; posting to a missing one shows nothing.
      context.getSystemService(NotificationManager::class.java)?.let { system ->
        if (system.getNotificationChannel(CHANNEL_AFTER) == null) {
          system.createNotificationChannel(afterChannel(AFTER_FALLBACK_NAME))
        }
      }
    }
    val notification =
      builder(context, if (alreadyAlerted) CHANNEL_AFTER else CHANNEL_QUIET, alarm, alarm.quietText)
        .setPriority(if (alreadyAlerted) NotificationCompat.PRIORITY_LOW else NotificationCompat.PRIORITY_HIGH)
        .setAutoCancel(true)
        .setSilent(alreadyAlerted)
        .build()
    try {
      manager.notify(notificationId(alarm), notification)
    } catch (error: SecurityException) {
      // Notifications were turned off between the check and the post.
    }
  }

  /** The app's own notification icon, which the expo-notifications plugin writes; the launcher icon if it is missing. */
  private fun smallIcon(context: Context): Int {
    val id = context.resources.getIdentifier("notification_icon", "drawable", context.packageName)
    return if (id != 0) id else context.applicationInfo.icon
  }

  private fun openApp(context: Context): PendingIntent? {
    val launch = context.packageManager.getLaunchIntentForPackage(context.packageName) ?: return null
    launch.flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED
    return PendingIntent.getActivity(
      context,
      0,
      launch,
      PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
    )
  }
}
