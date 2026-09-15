package expo.modules.adhanalarm

import android.media.AudioAttributes
import android.media.AudioManager
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

  companion object {
    /** Null when there is nothing to hold: a volume below zero keeps the phone's, or the phone refused. */
    fun take(audio: AudioManager, volume: Double): VolumeHold? {
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
