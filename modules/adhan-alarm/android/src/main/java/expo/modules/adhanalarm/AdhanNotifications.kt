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
 * The two notifications an adhan can be.
 *
 * Both channels are silent: while the adhan plays the service is the sound,
 * and when it does not play (the phone is on silent, in Do Not Disturb, on a
 * call, or the alarm came late) a sound would be exactly what the reader chose
 * not to hear. The quiet channel keeps vibration, which a phone on vibrate
 * gives and a silent phone withholds by itself.
 */
object AdhanNotifications {
  const val CHANNEL_PLAYING = "adhan-playing"
  const val CHANNEL_QUIET = "adhan-quiet"

  fun ensureChannels(context: Context, playingName: String, quietName: String) {
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
   * `alreadyAlerted` after an adhan that played: the notice stays in the shade
   * like any notification nobody dismissed, without buzzing a second time.
   */
  fun postQuiet(context: Context, alarm: AdhanAlarm, alreadyAlerted: Boolean = false) {
    val manager = NotificationManagerCompat.from(context)
    if (!manager.areNotificationsEnabled()) return
    val notification =
      builder(context, CHANNEL_QUIET, alarm, alarm.quietText)
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
