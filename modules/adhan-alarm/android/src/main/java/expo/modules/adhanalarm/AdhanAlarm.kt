package expo.modules.adhanalarm

import android.content.Context
import org.json.JSONArray
import org.json.JSONObject

/**
 * One adhan at one prayer's time.
 *
 * It carries everything the receiver needs when the app is not running: the
 * words are already in the reader's language and the choices already made,
 * because when the alarm fires there is no JavaScript awake to ask.
 */
data class AdhanAlarm(
  val id: String,
  val fireAt: Long,
  /** The recording's name in `res/raw`, without an extension. */
  val sound: String,
  val title: String,
  val playingText: String,
  val quietText: String,
  val stopLabel: String,
  val playOnSilent: Boolean,
  val playInDnd: Boolean,
  /** A share of the media volume range; below zero leaves the phone's volume alone. */
  val volume: Double = -1.0,
) {
  /** A ring somebody asked for from the prayer's page, to hear what this phone does. */
  val isTest: Boolean
    get() = id.startsWith(TEST_PREFIX)

  fun toJson(): JSONObject =
    JSONObject()
      .put("id", id)
      .put("fireAt", fireAt)
      .put("sound", sound)
      .put("title", title)
      .put("playingText", playingText)
      .put("quietText", quietText)
      .put("stopLabel", stopLabel)
      .put("playOnSilent", playOnSilent)
      .put("playInDnd", playInDnd)
      .put("volume", volume)

  companion object {
    const val TEST_PREFIX = "test:"

    fun fromJson(json: JSONObject) =
      AdhanAlarm(
        id = json.getString("id"),
        fireAt = json.getLong("fireAt"),
        sound = json.getString("sound"),
        title = json.getString("title"),
        playingText = json.getString("playingText"),
        quietText = json.getString("quietText"),
        stopLabel = json.getString("stopLabel"),
        playOnSilent = json.getBoolean("playOnSilent"),
        playInDnd = json.getBoolean("playInDnd"),
        // Alarms stored by the first build have no volume, and keep the phone's.
        volume = json.optDouble("volume", -1.0),
      )
  }
}

/**
 * The schedule, and what happened the last time an adhan was due.
 *
 * In SharedPreferences because a reboot clears every alarm Android holds, and
 * this is what survives it. Written with `commit` rather than `apply`: the
 * receiver's process can be killed the moment `onReceive` returns.
 */
object AdhanStore {
  private const val PREFS = "expo.modules.adhanalarm"
  private const val KEY_ALARMS = "alarms"
  private const val KEY_OUTCOME = "lastOutcome"

  private fun prefs(context: Context) = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE)

  @Synchronized
  fun load(context: Context): List<AdhanAlarm> {
    val raw = prefs(context).getString(KEY_ALARMS, null) ?: return emptyList()
    return try {
      val array = JSONArray(raw)
      (0 until array.length()).map { AdhanAlarm.fromJson(array.getJSONObject(it)) }
    } catch (error: Exception) {
      emptyList()
    }
  }

  @Synchronized
  fun save(context: Context, alarms: List<AdhanAlarm>) {
    val array = JSONArray()
    alarms.forEach { array.put(it.toJson()) }
    prefs(context).edit().putString(KEY_ALARMS, array.toString()).commit()
  }

  /** Removes one alarm and returns it. An alarm that has fired is no longer on the schedule. */
  @Synchronized
  fun take(context: Context, id: String): AdhanAlarm? {
    val all = load(context)
    val found = all.firstOrNull { it.id == id } ?: return null
    save(context, all.filter { it.id != id })
    return found
  }

  /**
   * `reason` is one word the prayer's page turns into a sentence: finished,
   * stop, volume, headphones, call, other-audio, silent, dnd, late, refused,
   * focus, no-sound, error, timeout, busy.
   */
  fun recordOutcome(context: Context, alarm: AdhanAlarm, played: Boolean, reason: String, seconds: Int = 0) {
    val outcome =
      JSONObject()
        .put("title", alarm.title)
        .put("at", System.currentTimeMillis())
        .put("played", played)
        .put("reason", reason)
        .put("test", alarm.isTest)
        .put("seconds", seconds)
    prefs(context).edit().putString(KEY_OUTCOME, outcome.toString()).commit()
  }

  fun lastOutcome(context: Context): String? = prefs(context).getString(KEY_OUTCOME, null)
}
