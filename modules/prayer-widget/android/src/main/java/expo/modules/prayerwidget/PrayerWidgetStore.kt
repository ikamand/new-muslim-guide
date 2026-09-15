package expo.modules.prayerwidget

import android.content.Context

/** The schedule as JavaScript last handed it over, kept so a widget redraws with the app closed. */
internal object PrayerWidgetStore {
  private const val PREFS = "expo.modules.prayerwidget"
  private const val KEY = "schedule"

  /** Parsed once per schedule: a redraw at each prayer should not re-read a hundred entries of JSON. */
  @Volatile private var cache: Pair<String, Payload?>? = null

  fun save(context: Context, json: String) {
    context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).edit().putString(KEY, json).apply()
  }

  fun load(context: Context): Payload? {
    val json = context.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString(KEY, null)
    if (json.isNullOrEmpty()) return null
    cache?.let { (text, parsed) -> if (text == json) return parsed }
    val parsed = Payload.parse(json)
    cache = json to parsed
    return parsed
  }
}
