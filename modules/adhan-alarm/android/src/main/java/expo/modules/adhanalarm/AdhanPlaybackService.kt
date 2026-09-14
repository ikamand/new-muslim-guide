package expo.modules.adhanalarm

import android.app.PendingIntent
import android.app.Service
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.ServiceInfo
import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.media.MediaPlayer
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.IBinder
import android.os.Looper
import android.os.PowerManager
import android.os.SystemClock
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
import androidx.core.content.ContextCompat
import org.json.JSONObject

/**
 * Plays one adhan, and gets out of the way the moment anything says to.
 *
 * What ends it, each agreed with Iyad on 14 Sep 2026:
 *
 * - **Stop** on the notification, or swiping it away.
 * - **A call**, or another app taking the audio: audio focus is lost.
 * - **Headphones pulled out**: Android's "becoming noisy", so the adhan never
 *   jumps from somebody's ears to the room.
 * - **Volume down.** Volume up only makes it louder (14 Sep 2026: the first
 *   build stopped on any volume press, which read as "it only played the
 *   start" to somebody turning it up). ⚠️ This listens for
 *   `VOLUME_CHANGED_ACTION`, which Android sends but does not document, and
 *   ignores the change the adhan's own volume makes as it starts.
 *
 * It plays at the volume set on the prayer's page (`VolumeHold`), and gives
 * the phone its own media volume back when it ends.
 *
 * Music and podcasts pause rather than play underneath it: the focus request
 * is transient, which asks the other app to pause and resume afterwards.
 */
class AdhanPlaybackService : Service() {
  private val handler = Handler(Looper.getMainLooper())
  private val audio: AudioManager by lazy { getSystemService(Context.AUDIO_SERVICE) as AudioManager }
  private var alarm: AdhanAlarm? = null
  private var player: MediaPlayer? = null
  private var focusRequest: AudioFocusRequest? = null
  private var listening = false
  private var volumeHold: VolumeHold? = null
  private var startedAt = 0L

  /** Volume changes before this instant are the adhan setting its own volume, not a press. */
  private var ignoreVolumeUntil = 0L

  private val attributes: AudioAttributes =
    AudioAttributes.Builder()
      .setUsage(AudioAttributes.USAGE_MEDIA)
      .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
      .build()

  private val focusListener =
    AudioManager.OnAudioFocusChangeListener { change ->
      when (change) {
        AudioManager.AUDIOFOCUS_LOSS, AudioManager.AUDIOFOCUS_LOSS_TRANSIENT ->
          finish(if (AdhanConditions.inCall(audio)) "call" else "other-audio")
        AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK -> player?.setVolume(0.3f, 0.3f)
        AudioManager.AUDIOFOCUS_GAIN -> player?.setVolume(1f, 1f)
      }
    }

  private val receiver =
    object : BroadcastReceiver() {
      override fun onReceive(context: Context, intent: Intent) {
        when (intent.action) {
          AudioManager.ACTION_AUDIO_BECOMING_NOISY -> finish("headphones")
          VOLUME_CHANGED -> {
            val stream = intent.getIntExtra(EXTRA_STREAM, -1)
            val value = intent.getIntExtra(EXTRA_VALUE, -1)
            val previous = intent.getIntExtra(EXTRA_PREVIOUS, -1)
            val pressedDown =
              stream == AudioManager.STREAM_MUSIC && value in 0 until previous &&
                SystemClock.elapsedRealtime() > ignoreVolumeUntil
            if (pressedDown) finish("volume")
          }
        }
      }
    }

  override fun onBind(intent: Intent?): IBinder? = null

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    if (intent?.action == ACTION_STOP) {
      finish("stop")
      return START_NOT_STICKY
    }

    val next =
      intent?.getStringExtra(EXTRA_ALARM)?.let {
        try {
          AdhanAlarm.fromJson(JSONObject(it))
        } catch (error: Exception) {
          null
        }
      }
    val current = alarm

    if (next == null) {
      // Started for the foreground and handed nothing to play. Android kills a
      // service that does not call startForeground, so there is nothing
      // better to do than stop at once.
      if (current == null) stopSelf(startId)
      return START_NOT_STICKY
    }

    if (current != null) {
      // One adhan at a time. Android still requires this start to reach the
      // foreground, so the playing notification is posted again, unchanged.
      startForegroundFor(current)
      AdhanNotifications.postQuiet(this, next)
      AdhanStore.recordOutcome(this, next, played = false, reason = "busy")
      return START_NOT_STICKY
    }

    alarm = next
    startForegroundFor(next)
    if (!requestFocus()) {
      finish("focus", played = false)
      return START_NOT_STICKY
    }
    volumeHold = VolumeHold.take(audio, next.volume)
    ignoreVolumeUntil = SystemClock.elapsedRealtime() + 1500
    startedAt = SystemClock.elapsedRealtime()
    play(next)
    return START_NOT_STICKY
  }

  override fun onDestroy() {
    if (alarm != null) finish("stopped-by-system")
    super.onDestroy()
  }

  private fun startForegroundFor(alarm: AdhanAlarm) {
    val stop =
      PendingIntent.getService(
        this,
        1,
        Intent(this, AdhanPlaybackService::class.java).setAction(ACTION_STOP),
        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
      )
    val notification =
      AdhanNotifications.builder(this, AdhanNotifications.CHANNEL_PLAYING, alarm, alarm.playingText)
        .setOngoing(true)
        .setDeleteIntent(stop)
        .addAction(0, alarm.stopLabel, stop)
        .setForegroundServiceBehavior(NotificationCompat.FOREGROUND_SERVICE_IMMEDIATE)
        .build()
    val type =
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK else 0
    ServiceCompat.startForeground(this, AdhanNotifications.notificationId(alarm), notification, type)
  }

  private fun requestFocus(): Boolean =
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val request =
        AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
          .setAudioAttributes(attributes)
          .setOnAudioFocusChangeListener(focusListener, handler)
          .build()
      focusRequest = request
      audio.requestAudioFocus(request) == AudioManager.AUDIOFOCUS_REQUEST_GRANTED
    } else {
      @Suppress("DEPRECATION")
      audio.requestAudioFocus(focusListener, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN_TRANSIENT) ==
        AudioManager.AUDIOFOCUS_REQUEST_GRANTED
    }

  private fun abandonFocus() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      focusRequest?.let { audio.abandonAudioFocusRequest(it) }
    } else {
      @Suppress("DEPRECATION")
      audio.abandonAudioFocus(focusListener)
    }
    focusRequest = null
  }

  private fun play(alarm: AdhanAlarm) {
    val resource = resources.getIdentifier(alarm.sound, "raw", packageName)
    if (resource == 0) {
      finish("no-sound", played = false)
      return
    }
    val media = MediaPlayer()
    player = media
    try {
      media.setAudioAttributes(attributes)
      media.setWakeMode(applicationContext, PowerManager.PARTIAL_WAKE_LOCK)
      media.setDataSource(applicationContext, Uri.parse("android.resource://$packageName/$resource"))
      media.setOnPreparedListener { it.start() }
      media.setOnCompletionListener { finish("finished") }
      media.setOnErrorListener { _, _, _ ->
        finish("error")
        true
      }
      media.prepareAsync()
    } catch (error: Exception) {
      finish("error", played = false)
      return
    }
    listen()
    handler.postDelayed({ finish("timeout") }, MAX_PLAY_MS)
  }

  private fun listen() {
    val filter =
      IntentFilter().apply {
        addAction(AudioManager.ACTION_AUDIO_BECOMING_NOISY)
        addAction(VOLUME_CHANGED)
      }
    ContextCompat.registerReceiver(this, receiver, filter, ContextCompat.RECEIVER_NOT_EXPORTED)
    listening = true
  }

  private fun finish(reason: String, played: Boolean = true) {
    val current = alarm
    if (current == null) {
      stopSelf()
      return
    }
    alarm = null
    handler.removeCallbacksAndMessages(null)
    if (listening) {
      try {
        unregisterReceiver(receiver)
      } catch (error: IllegalArgumentException) {
        // Already gone.
      }
      listening = false
    }
    player?.let { media ->
      try {
        media.stop()
      } catch (error: IllegalStateException) {
        // Not started yet, or already stopped.
      }
      media.release()
    }
    player = null
    volumeHold?.restore()
    volumeHold = null
    abandonFocus()
    val seconds = if (startedAt > 0) ((SystemClock.elapsedRealtime() - startedAt) / 1000).toInt() else 0
    startedAt = 0L
    AdhanStore.recordOutcome(this, current, played, reason, seconds)
    ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE)
    // Anything but Stop leaves the prayer in the shade, as any notification nobody dismissed would stay.
    if (reason != "stop") AdhanNotifications.postQuiet(this, current, alreadyAlerted = played)
    stopSelf()
  }

  companion object {
    const val ACTION_STOP = "expo.modules.adhanalarm.STOP"
    private const val EXTRA_ALARM = "alarm"

    /** Longer than the longest recording (Abdul Basit's Fajr, just under five minutes), so a stuck player cannot hold the phone. */
    private const val MAX_PLAY_MS = 8 * 60 * 1000L

    private const val VOLUME_CHANGED = "android.media.VOLUME_CHANGED_ACTION"
    private const val EXTRA_STREAM = "android.media.EXTRA_VOLUME_STREAM_TYPE"
    private const val EXTRA_VALUE = "android.media.EXTRA_VOLUME_STREAM_VALUE"
    private const val EXTRA_PREVIOUS = "android.media.EXTRA_PREV_VOLUME_STREAM_VALUE"

    fun startIntent(context: Context, alarm: AdhanAlarm): Intent =
      Intent(context, AdhanPlaybackService::class.java).putExtra(EXTRA_ALARM, alarm.toJson().toString())
  }
}
