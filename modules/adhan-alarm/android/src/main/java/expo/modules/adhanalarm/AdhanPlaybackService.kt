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
import android.media.VolumeProvider
import android.media.session.MediaSession
import android.media.session.PlaybackState
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
 * - **Either volume button**, locked or not, even at full volume (Iyad,
 *   14 Sep 2026: with the phone in a pocket in a library, nobody should have
 *   to feel for volume down). The adhan holds a playing media session while
 *   it sounds, so Android hands it every press; see `holdVolumeKeys`. Pause
 *   on earbuds or a media control ends it through the same session.
 * - **The volume changed any other way**, such as the slider in the quick
 *   panel. ⚠️ This listens for `VOLUME_CHANGED_ACTION`, which Android sends
 *   but does not document, and ignores the change the adhan's own volume
 *   makes as it starts.
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
  private var session: MediaSession? = null
  private var startedAt = 0L

  /**
   * Whether any of the adhan came out. Until it has, an ending is a prayer
   * nobody was told about, so its notice alerts as a missed adhan's does.
   */
  private var sounded = false

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
            if (intent.getIntExtra(EXTRA_STREAM, -1) != AudioManager.STREAM_MUSIC) return
            val value = intent.getIntExtra(EXTRA_VALUE, -1)
            val previous = intent.getIntExtra(EXTRA_PREVIOUS, -1)
            // The adhan setting its own level as it starts, however late the broadcast arrives.
            if (SystemClock.elapsedRealtime() < ignoreVolumeUntil || volumeHold?.isOwnChange(value, previous) == true) {
              return
            }
            /*
              Android sends this only when the level moved, so any one is somebody
              moving it. Not only a whole step: on Iyad's Galaxy S24 a press moves
              the level by less than one, and the extras above read the same
              before and after, which is why "volume down" once needed three
              presses. A press normally arrives through the session instead;
              this is the backstop if Android ever routes it past the session.
            */
            finish("volume-changed")
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
    holdVolumeKeys()
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

  /**
   * Makes every volume press, and pause on earbuds, reach the adhan.
   *
   * Without a session Android spent each press on the media volume instead.
   * The Galaxy S24's own log (Android 17, 14 Sep 2026) showed every press,
   * locked and unlocked, arriving at the media session service with
   * "session=null" and nudging the level by less than one step. A playing
   * session with a remote volume is handed the press as a direction
   * instead (`MediaSessionService.dispatchAdjustVolumeLocked` in AOSP),
   * whatever the level, even at full. The volume keys stop moving the level
   * while it plays, which no longer matters: any press ends it.
   *
   * The callback is set before the volume provider, because the session
   * delivers a volume press through its callback's handler, and drops it
   * when there is none.
   */
  private fun holdVolumeKeys() {
    val media = MediaSession(this, "adhan")
    media.setCallback(
      object : MediaSession.Callback() {
        override fun onPause() = finish("pause")

        override fun onStop() = finish("pause")
      },
      handler,
    )
    media.setPlaybackToRemote(
      object : VolumeProvider(
        VolumeProvider.VOLUME_CONTROL_RELATIVE,
        audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC),
        audio.getStreamVolume(AudioManager.STREAM_MUSIC),
      ) {
        // 1 or -1 as the key goes down; 0 as it comes back up, which is the same press.
        override fun onAdjustVolume(direction: Int) {
          if (direction != 0) finish("volume")
        }
      },
    )
    media.setPlaybackState(
      PlaybackState.Builder()
        .setActions(PlaybackState.ACTION_PAUSE or PlaybackState.ACTION_PLAY_PAUSE or PlaybackState.ACTION_STOP)
        .setState(PlaybackState.STATE_PLAYING, PlaybackState.PLAYBACK_POSITION_UNKNOWN, 1f)
        .build(),
    )
    media.isActive = true
    session = media
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
      media.setOnPreparedListener {
        it.start()
        sounded = true
      }
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
    session?.let { media ->
      media.isActive = false
      media.release()
    }
    session = null
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
    // A player that failed before a sound came out played nothing, whatever the caller assumed.
    val alerted = played && sounded
    sounded = false
    AdhanStore.recordOutcome(this, current, alerted, reason, seconds)
    ServiceCompat.stopForeground(this, ServiceCompat.STOP_FOREGROUND_REMOVE)
    // Anything but Stop leaves the prayer in the shade, as any notification nobody dismissed would stay.
    if (reason != "stop") AdhanNotifications.postQuiet(this, current, alreadyAlerted = alerted)
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
