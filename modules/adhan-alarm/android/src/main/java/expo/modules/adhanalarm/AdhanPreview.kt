package expo.modules.adhanalarm

import android.content.Context
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.media.MediaPlayer
import android.net.Uri
import android.os.Build
import android.os.Handler
import android.os.Looper

/**
 * Hearing a voice from a prayer's page: the recording the alarm will play,
 * short or whole, at the volume set for it (Iyad, 14 Sep 2026: "i want to see
 * the long version as well").
 *
 * In the app's own process and only while the page is open, so none of the
 * alarm's checks apply: somebody who pressed play wants to hear it. One at a
 * time; starting another stops this one. Everything runs on the main looper,
 * where MediaPlayer delivers its callbacks.
 */
object AdhanPreview {
  private val handler = Handler(Looper.getMainLooper())
  private var player: MediaPlayer? = null
  private var sound: String? = null
  private var hold: VolumeHold? = null
  private var focus: AudioFocusRequest? = null
  private var audio: AudioManager? = null
  private var onEnd: ((String) -> Unit)? = null

  private val focusListener =
    AudioManager.OnAudioFocusChangeListener { change ->
      if (change == AudioManager.AUDIOFOCUS_LOSS || change == AudioManager.AUDIOFOCUS_LOSS_TRANSIENT) stopNow()
    }

  fun start(context: Context, name: String, volume: Double, ended: (String) -> Unit) {
    val app = context.applicationContext
    handler.post {
      stopNow()
      val resource = app.resources.getIdentifier(name, "raw", app.packageName)
      if (resource == 0) {
        ended(name)
        return@post
      }
      val manager = app.getSystemService(Context.AUDIO_SERVICE) as AudioManager
      audio = manager
      sound = name
      onEnd = ended

      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val request =
          AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
            .setAudioAttributes(AdhanAudio.attributes)
            .setOnAudioFocusChangeListener(focusListener, handler)
            .build()
        focus = request
        manager.requestAudioFocus(request)
      } else {
        @Suppress("DEPRECATION")
        manager.requestAudioFocus(focusListener, AudioManager.STREAM_MUSIC, AudioManager.AUDIOFOCUS_GAIN_TRANSIENT)
      }
      hold = VolumeHold.take(manager, volume)

      val media = MediaPlayer()
      player = media
      try {
        media.setAudioAttributes(AdhanAudio.attributes)
        media.setDataSource(app, Uri.parse("android.resource://${app.packageName}/$resource"))
        media.setOnPreparedListener { it.start() }
        media.setOnCompletionListener { stopNow() }
        media.setOnErrorListener { _, _, _ ->
          stopNow()
          true
        }
        media.prepareAsync()
      } catch (error: Exception) {
        stopNow()
      }
    }
  }

  fun stop() {
    handler.post { stopNow() }
  }

  /** Follows the volume bar while a preview plays, so a level is judged by ear as it is set. */
  fun setVolume(volume: Double) {
    handler.post {
      if (player == null) return@post
      val current = hold
      if (current != null) {
        current.retarget(volume)
      } else {
        audio?.let { hold = VolumeHold.take(it, volume) }
      }
    }
  }

  private fun stopNow() {
    val ended = sound ?: return
    sound = null
    player?.let { media ->
      try {
        media.stop()
      } catch (error: IllegalStateException) {
        // Not started yet.
      }
      media.release()
    }
    player = null
    hold?.restore()
    hold = null
    audio?.let { manager ->
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        focus?.let { manager.abandonAudioFocusRequest(it) }
      } else {
        @Suppress("DEPRECATION")
        manager.abandonAudioFocus(focusListener)
      }
    }
    focus = null
    val callback = onEnd
    onEnd = null
    callback?.invoke(ended)
  }
}
