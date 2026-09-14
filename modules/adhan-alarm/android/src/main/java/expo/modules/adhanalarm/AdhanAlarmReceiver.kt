package expo.modules.adhanalarm

import android.app.NotificationManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.media.AudioManager
import androidx.core.content.ContextCompat

/**
 * Where an alarm becomes either an adhan or a quiet notification.
 *
 * The decision is made here, at the moment, from the phone as it is: a
 * setting read an hour earlier cannot know that a meeting started.
 */
class AdhanAlarmReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    when (intent.action) {
      Intent.ACTION_BOOT_COMPLETED, Intent.ACTION_MY_PACKAGE_REPLACED -> AdhanScheduler.rearm(context)
      AdhanScheduler.ACTION_FIRE -> intent.getStringExtra(AdhanScheduler.EXTRA_ID)?.let { fire(context, it) }
    }
  }

  private fun fire(context: Context, id: String) {
    val alarm = AdhanStore.take(context, id) ?: return
    val blocker =
      if (System.currentTimeMillis() - alarm.fireAt > LATE_LIMIT_MS) "late" else AdhanConditions.blocker(context, alarm)
    if (blocker != null) {
      AdhanNotifications.postQuiet(context, alarm)
      AdhanStore.recordOutcome(context, alarm, played = false, reason = blocker)
      return
    }
    try {
      ContextCompat.startForegroundService(context, AdhanPlaybackService.startIntent(context, alarm))
    } catch (error: Exception) {
      // ForegroundServiceStartNotAllowedException on a phone that refuses the exact-alarm exemption.
      AdhanNotifications.postQuiet(context, alarm)
      AdhanStore.recordOutcome(context, alarm, played = false, reason = "refused")
    }
  }

  companion object {
    /**
     * A phone that held the alarm (a battery saver, a reboot at the wrong
     * minute) can deliver it much later. The time did still come in, but an
     * adhan out of nowhere at a random moment is the interruption this
     * feature promised not to be, so a late one arrives as a notification.
     */
    private const val LATE_LIMIT_MS = 10 * 60 * 1000L
  }
}

/** What the phone is doing right now, asked without any permission. */
object AdhanConditions {
  fun blocker(context: Context, alarm: AdhanAlarm): String? {
    val audio = context.getSystemService(AudioManager::class.java) ?: return null
    // Never overridable: an adhan over somebody's call is never what they meant.
    if (inCall(audio)) return "call"
    if (!alarm.playOnSilent && audio.ringerMode != AudioManager.RINGER_MODE_NORMAL) return "silent"
    if (!alarm.playInDnd && doNotDisturb(context)) return "dnd"
    return null
  }

  /** In a call, in a voice or video app's call, or with the phone ringing. */
  fun inCall(audio: AudioManager): Boolean =
    when (audio.mode) {
      AudioManager.MODE_IN_CALL, AudioManager.MODE_IN_COMMUNICATION, AudioManager.MODE_RINGTONE -> true
      else -> false
    }

  private fun doNotDisturb(context: Context): Boolean {
    val manager = context.getSystemService(NotificationManager::class.java) ?: return false
    val filter = manager.currentInterruptionFilter
    return filter != NotificationManager.INTERRUPTION_FILTER_ALL &&
      filter != NotificationManager.INTERRUPTION_FILTER_UNKNOWN
  }
}
