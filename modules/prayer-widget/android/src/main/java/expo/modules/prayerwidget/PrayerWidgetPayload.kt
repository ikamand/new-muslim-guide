package expo.modules.prayerwidget

import android.graphics.Color
import android.util.Log
import org.json.JSONArray
import org.json.JSONObject

/*
  The schedule as `src/lib/widget-schedule.ts` writes it, version 1
  (docs/widgets.md). Nothing here decides anything about prayer times: the
  words, the colours, the marks and which prayer is lit all arrive decided.
*/

internal val PRAYERS = listOf("fajr", "dhuhr", "asr", "maghrib", "isha")

internal class Palette(json: JSONObject) {
  val ground: Int = Color.parseColor(json.getString("ground"))
  val text: Int = Color.parseColor(json.getString("text"))
  val textSecondary: Int = Color.parseColor(json.getString("textSecondary"))
  val gold: Int = Color.parseColor(json.getString("gold"))
  val goldSoft: Int = Color.parseColor(json.getString("goldSoft"))
  val selected: Int = Color.parseColor(json.getString("selected"))
  val accent: Int = Color.parseColor(json.getString("accent"))
}

internal class Cell(val id: String, val name: String, val time: String)

internal class Day(val friday: Boolean, val cells: List<Cell>, val points: Map<String, FloatArray>)

internal class Entry(
  val at: Long,
  val day: Int,
  val prayer: String,
  val lit: String?,
  val caption: String,
  val name: String,
  val time: String,
  val passed: Set<String>,
  val closed: Set<String>,
  val link: String,
)

internal class Arch(json: JSONObject) {
  val viewBox: FloatArray = json.getJSONArray("viewBox").let { box -> FloatArray(4) { box.getDouble(it).toFloat() } }
  val outer: String = json.getString("outer")
  val inner: String = json.getString("inner")
  val stroke: Float = json.getDouble("stroke").toFloat()
  val innerStroke: Float = json.getDouble("innerStroke").toFloat()
  val disc: Float = json.getDouble("disc").toFloat()
  val ring: Float = json.getDouble("ring").toFloat()
  val ringStroke: Float = json.getDouble("ringStroke").toFloat()
  val markSize: Float = json.getDouble("markSize").toFloat()
  val markStroke: Float = json.getDouble("markStroke").toFloat()
}

internal class Payload(
  val staleAt: Long,
  val openApp: String,
  val light: Palette,
  val dark: Palette,
  val marks: Map<String, String>,
  val arch: Arch,
  val days: List<Day>,
  val entries: List<Entry>,
) {
  /** The entry in force at `now`: null once the schedule has run out, so the widget asks for the app instead. */
  fun entryAt(now: Long): Entry? {
    if (now >= staleAt || entries.isEmpty()) return null
    // A clock set back behind the first entry still draws the first rather than nothing.
    return entries.lastOrNull { it.at <= now } ?: entries.first()
  }

  /** When the drawing next changes: the next entry, or the moment the schedule runs out. */
  fun nextChangeAfter(now: Long): Long? = entries.firstOrNull { it.at > now }?.at ?: staleAt.takeIf { it > now }

  companion object {
    fun parse(text: String): Payload? =
      try {
        val json = JSONObject(text)
        if (json.optInt("v") != 1) {
          null
        } else {
          val colors = json.getJSONObject("colors")
          val marks = json.getJSONObject("marks")
          Payload(
            staleAt = json.getLong("staleAt"),
            openApp = json.getJSONObject("strings").getString("openApp"),
            light = Palette(colors.getJSONObject("light")),
            dark = Palette(colors.getJSONObject("dark")),
            // Strictly, as the points below are read: a renamed prayer should reject the schedule, not quietly erase five glyphs.
            marks = PRAYERS.associateWith { marks.getString(it) },
            arch = Arch(json.getJSONObject("arch")),
            days = json.getJSONArray("days").objects().map(::day),
            entries = json.getJSONArray("entries").objects().map(::entry),
          )
        }
      } catch (error: Exception) {
        // The only trace a phone leaves. Without it a schedule the app has changed the shape of
        // reads on the screen as "no location yet", and logcat says nothing at all.
        Log.w("PrayerWidget", "The schedule could not be read", error)
        null
      }

    private fun day(json: JSONObject): Day {
      val points = json.getJSONObject("points")
      return Day(
        friday = json.getBoolean("friday"),
        cells = json.getJSONArray("cells").objects().map { Cell(it.getString("id"), it.getString("name"), it.getString("time")) },
        points =
          PRAYERS.associateWith {
            val point = points.getJSONArray(it)
            floatArrayOf(point.getDouble(0).toFloat(), point.getDouble(1).toFloat())
          },
      )
    }

    private fun entry(json: JSONObject) =
      Entry(
        at = json.getLong("at"),
        day = json.getInt("day"),
        prayer = json.getString("prayer"),
        lit = if (json.isNull("lit")) null else json.getString("lit"),
        caption = json.getString("caption"),
        name = json.getString("name"),
        time = json.getString("time"),
        passed = json.getJSONArray("passed").strings(),
        closed = json.getJSONArray("closed").strings(),
        link = json.getString("link"),
      )
  }
}

private fun JSONArray.objects(): List<JSONObject> = (0 until length()).map { getJSONObject(it) }

private fun JSONArray.strings(): Set<String> = (0 until length()).map { getString(it) }.toSet()
