package expo.modules.adhanalarm

import android.media.AudioAttributes
import android.media.AudioManager
import android.os.Handler
import android.os.Looper
import kotlin.math.roundToInt

/** How every adhan sounds on this phone, the alarm's and the preview's alike. */
object AdhanAudio {
  val attributes: AudioAttributes =
    AudioAttributes.Builder()
      .setUsage(AudioAttributes.USAGE_MEDIA)
      .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
      .build()
}

/**
 * The adhan's own volume, held on the media stream while it plays.
 *
 * The volume is a share of the stream's range, 0.1 to 1, set on the prayer's
 * page (Iyad, 14 Sep 2026: "how loud they want the athan to be"). The phone's
 * own media volume comes back afterwards, unless somebody changed it while the
 * adhan played, in which case theirs stands.
 */
class VolumeHold private constructor(
  private val audio: AudioManager,
  private val previous: Int,
  private var applied: Int,
) {
  private var announced = false

  /**
   * Whether a volume broadcast is the one this hold caused by setting the
   * level, in the whole steps the broadcast reports. Once only, so somebody
   * later moving the level the same way still counts.
   */
  fun isOwnChange(value: Int, previousValue: Int): Boolean {
    if (announced || applied == previous) return false
    if (value != applied || previousValue != previous) return false
    announced = true
    return true
  }

  /** Moves the held volume while it plays, still keeping the phone's own to give back. */
  fun retarget(volume: Double) {
    val max = audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
    val target = (volume.coerceIn(0.0, 1.0) * max).roundToInt().coerceIn(1, max)
    try {
      audio.setStreamVolume(AudioManager.STREAM_MUSIC, target, 0)
      applied = target
    } catch (error: SecurityException) {
      // Refused in Do Not Disturb on some phones; the level stays where it was.
    }
  }

  fun restore() {
    if (applied == previous) return
    try {
      if (audio.getStreamVolume(AudioManager.STREAM_MUSIC) == applied) {
        audio.setStreamVolume(AudioManager.STREAM_MUSIC, previous, 0)
      }
    } catch (error: SecurityException) {
      // Some phones refuse volume changes in Do Not Disturb; theirs stands.
    }
  }

  /**
   * Gives the volume back once the sound has certainly finished, then runs `then`.
   *
   * Straight after the player stops is too soon. Bluetooth plays behind the
   * phone: on Iyad's Buds3 Pro the volume went from 5 back to 10 a tenth of a
   * second after the stop, while the last of the adhan was still sounding, so
   * a volume press seemed to make it louder (`dumpsys audio`, 15 Sep 2026).
   * A second later every output is silent. Main thread only.
   */
  fun restoreLater(then: () -> Unit = {}) {
    settlePending()
    pending = this
    pendingThen = then
    handler.postDelayed(settle, RESTORE_DELAY_MS)
  }

  companion object {
    private const val RESTORE_DELAY_MS = 1000L
    private val handler = Handler(Looper.getMainLooper())
    private var pending: VolumeHold? = null
    private var pendingThen: (() -> Unit)? = null
    private val settle = Runnable { settlePending() }

    /** A restore still waiting happens now, so a new hold reads the phone's own volume and not the last adhan's. */
    private fun settlePending() {
      handler.removeCallbacks(settle)
      val hold = pending
      val then = pendingThen
      pending = null
      pendingThen = null
      hold?.restore()
      then?.invoke()
    }

    /** Null when there is nothing to hold: a volume below zero keeps the phone's, or the phone refused. */
    fun take(audio: AudioManager, volume: Double): VolumeHold? {
      settlePending()
      if (volume < 0.0) return null
      val max = audio.getStreamMaxVolume(AudioManager.STREAM_MUSIC)
      val target = (volume.coerceAtMost(1.0) * max).roundToInt().coerceIn(1, max)
      val previous = audio.getStreamVolume(AudioManager.STREAM_MUSIC)
      if (target != previous) {
        try {
          audio.setStreamVolume(AudioManager.STREAM_MUSIC, target, 0)
        } catch (error: SecurityException) {
          return null
        }
      }
      return VolumeHold(audio, previous, target)
    }
  }
}
