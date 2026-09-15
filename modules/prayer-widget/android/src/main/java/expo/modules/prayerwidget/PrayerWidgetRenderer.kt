package expo.modules.prayerwidget

import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.res.Configuration
import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.drawable.Icon
import android.net.Uri
import android.os.Build
import android.util.TypedValue
import android.view.View
import android.widget.RemoteViews

/**
 * Each widget's RemoteViews, from the schedule in force now.
 *
 * On Android 12 and later every colour and bitmap is handed over twice, light
 * and dark, and the launcher picks as the phone's theme changes, with no redraw
 * (`RemoteViews.setColorInt` and `setIcon` with a night value, read from the SDK
 * 36 jar). Before 12 the current theme is drawn, and a theme change waits for
 * the next redraw. Every newer call sits behind its own version check, which is
 * what the release build's lint reads.
 */
internal object PrayerWidgetRenderer {
  private const val ARCH_PX = 420
  private const val MARK_PX = 48
  private const val DIM = 0.55f
  private const val CORNER_DP = 22f
  private const val CELL_CORNER_DP = 10f

  private class CellIds(val cell: Int, val mark: Int, val label: Int, val time: Int)

  private val cellIds: Map<String, CellIds> by lazy {
    mapOf(
      "fajr" to CellIds(R.id.prayer_widget_cell_fajr, R.id.prayer_widget_mark_fajr, R.id.prayer_widget_label_fajr, R.id.prayer_widget_time_fajr),
      "dhuhr" to CellIds(R.id.prayer_widget_cell_dhuhr, R.id.prayer_widget_mark_dhuhr, R.id.prayer_widget_label_dhuhr, R.id.prayer_widget_time_dhuhr),
      "asr" to CellIds(R.id.prayer_widget_cell_asr, R.id.prayer_widget_mark_asr, R.id.prayer_widget_label_asr, R.id.prayer_widget_time_asr),
      "maghrib" to CellIds(R.id.prayer_widget_cell_maghrib, R.id.prayer_widget_mark_maghrib, R.id.prayer_widget_label_maghrib, R.id.prayer_widget_time_maghrib),
      "isha" to CellIds(R.id.prayer_widget_cell_isha, R.id.prayer_widget_mark_isha, R.id.prayer_widget_label_isha, R.id.prayer_widget_time_isha),
    )
  }

  fun render(context: Context, kind: PrayerWidgetKind, payload: Payload?, now: Long): RemoteViews {
    val night = (context.resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES
    return when (kind) {
      PrayerWidgetKind.NICHE -> niche(context, payload, now, night)
      PrayerWidgetKind.ROW -> row(context, payload, now, night)
      PrayerWidgetKind.QUIET -> quiet(context, payload, now, night)
    }
  }

  private fun niche(context: Context, payload: Payload?, now: Long, night: Boolean): RemoteViews {
    val views = RemoteViews(context.packageName, R.layout.prayer_widget_niche)
    val entry = payload?.entryAt(now)
    if (payload != null) {
      background(views, android.R.id.background, payload.light.ground, payload.dark.ground, night, CORNER_DP)
      val day = entry?.let { payload.days.getOrNull(it.day) }
      image(
        views,
        R.id.prayer_widget_arch,
        PrayerWidgetDrawing.arch(payload, day, entry, payload.light, ARCH_PX),
        PrayerWidgetDrawing.arch(payload, day, entry, payload.dark, ARCH_PX),
        night,
      )
    }
    if (payload == null || entry == null) {
      openApp(context, views, payload, night, listOf(R.id.prayer_widget_caption, R.id.prayer_widget_name, R.id.prayer_widget_time))
      tap(context, views, PrayerWidgetKind.NICHE, null)
      return views
    }
    text(views, R.id.prayer_widget_caption, entry.caption, payload.light.textSecondary, payload.dark.textSecondary, night)
    text(views, R.id.prayer_widget_name, entry.name, payload.light.text, payload.dark.text, night)
    text(views, R.id.prayer_widget_time, entry.time, payload.light.gold, payload.dark.gold, night)
    views.setViewVisibility(R.id.prayer_widget_message, View.GONE)
    views.setContentDescription(android.R.id.background, "${entry.caption}, ${entry.name}, ${entry.time}")
    tap(context, views, PrayerWidgetKind.NICHE, entry.link)
    return views
  }

  private fun row(context: Context, payload: Payload?, now: Long, night: Boolean): RemoteViews {
    val views = RemoteViews(context.packageName, R.layout.prayer_widget_row)
    val entry = payload?.entryAt(now)
    val day = entry?.let { payload?.days?.getOrNull(it.day) }
    if (payload != null) {
      background(views, android.R.id.background, payload.light.ground, payload.dark.ground, night, CORNER_DP)
      background(views, R.id.prayer_widget_rule, payload.light.goldSoft, payload.dark.goldSoft, night, 0f)
    }
    if (payload == null || entry == null || day == null) {
      openApp(
        context,
        views,
        payload,
        night,
        listOf(R.id.prayer_widget_caption, R.id.prayer_widget_name, R.id.prayer_widget_time, R.id.prayer_widget_cells),
      )
      tap(context, views, PrayerWidgetKind.ROW, null)
      return views
    }

    text(views, R.id.prayer_widget_caption, entry.caption, payload.light.textSecondary, payload.dark.textSecondary, night)
    text(views, R.id.prayer_widget_name, entry.name, payload.light.text, payload.dark.text, night)
    text(views, R.id.prayer_widget_time, entry.time, payload.light.gold, payload.dark.gold, night)
    views.setViewVisibility(R.id.prayer_widget_message, View.GONE)
    views.setViewVisibility(R.id.prayer_widget_cells, View.VISIBLE)

    for (cell in day.cells) {
      val ids = cellIds[cell.id] ?: continue
      val lit = entry.lit == cell.id
      val light = payload.light
      val dark = payload.dark
      // The lit cell on the selected ground, gold words, as the card's times row.
      text(views, ids.label, cell.name, if (lit) light.gold else light.textSecondary, if (lit) dark.gold else dark.textSecondary, night)
      text(views, ids.time, cell.time, if (lit) light.gold else light.text, if (lit) dark.gold else dark.text, night)
      background(views, ids.cell, if (lit) light.selected else Color.TRANSPARENT, if (lit) dark.selected else Color.TRANSPARENT, night, CELL_CORNER_DP)
      image(
        views,
        ids.mark,
        PrayerWidgetDrawing.mark(payload.marks[cell.id], if (lit) light.gold else light.textSecondary, MARK_PX),
        PrayerWidgetDrawing.mark(payload.marks[cell.id], if (lit) dark.gold else dark.textSecondary, MARK_PX),
        night,
      )
      // A closed window steps back, glyph, name and time together; never ticked, which would claim it was prayed.
      views.setFloat(ids.cell, "setAlpha", if (cell.id in entry.closed && !lit) DIM else 1f)
    }

    if (day.friday) {
      views.setViewVisibility(R.id.prayer_widget_friday, View.VISIBLE)
      background(views, R.id.prayer_widget_friday, payload.light.accent, payload.dark.accent, night, 3f)
    } else {
      views.setViewVisibility(R.id.prayer_widget_friday, View.GONE)
    }

    val times = day.cells.joinToString(", ") { "${it.name} ${it.time}" }
    views.setContentDescription(android.R.id.background, "${entry.caption}, ${entry.name}, ${entry.time}. $times")
    tap(context, views, PrayerWidgetKind.ROW, entry.link)
    return views
  }

  private fun quiet(context: Context, payload: Payload?, now: Long, night: Boolean): RemoteViews {
    val views = RemoteViews(context.packageName, R.layout.prayer_widget_quiet)
    val entry = payload?.entryAt(now)
    if (payload != null) {
      background(views, android.R.id.background, payload.light.ground, payload.dark.ground, night, CORNER_DP)
    }
    if (payload == null || entry == null) {
      openApp(context, views, payload, night, listOf(R.id.prayer_widget_mark, R.id.prayer_widget_time))
      tap(context, views, PrayerWidgetKind.QUIET, null)
      return views
    }
    views.setViewVisibility(R.id.prayer_widget_message, View.GONE)
    views.setViewVisibility(R.id.prayer_widget_mark, View.VISIBLE)
    image(
      views,
      R.id.prayer_widget_mark,
      PrayerWidgetDrawing.mark(payload.marks[entry.prayer], payload.light.gold, MARK_PX),
      PrayerWidgetDrawing.mark(payload.marks[entry.prayer], payload.dark.gold, MARK_PX),
      night,
    )
    text(views, R.id.prayer_widget_time, entry.time, payload.light.text, payload.dark.text, night)
    // The time alone, even to a screen reader: this widget names nothing.
    views.setContentDescription(android.R.id.background, entry.time)
    tap(context, views, PrayerWidgetKind.QUIET, entry.link)
    return views
  }

  /** No schedule, or it has run out: the words to open the app, and nothing that could be a stale time. */
  private fun openApp(context: Context, views: RemoteViews, payload: Payload?, night: Boolean, hide: List<Int>) {
    hide.forEach { views.setViewVisibility(it, View.GONE) }
    val words = payload?.openApp ?: context.getString(R.string.prayer_widget_open_app)
    views.setViewVisibility(R.id.prayer_widget_message, View.VISIBLE)
    views.setTextViewText(R.id.prayer_widget_message, words)
    if (payload != null) textColor(views, R.id.prayer_widget_message, payload.light.textSecondary, payload.dark.textSecondary, night)
    views.setContentDescription(android.R.id.background, words)
  }

  private fun text(views: RemoteViews, id: Int, value: String, light: Int, dark: Int, night: Boolean) {
    views.setViewVisibility(id, View.VISIBLE)
    views.setTextViewText(id, value)
    textColor(views, id, light, dark, night)
  }

  private fun textColor(views: RemoteViews, id: Int, light: Int, dark: Int, night: Boolean) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      views.setColorInt(id, "setTextColor", light, dark)
    } else {
      views.setTextColor(id, if (night) dark else light)
    }
  }

  private fun background(views: RemoteViews, id: Int, light: Int, dark: Int, night: Boolean, cornerDp: Float) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      views.setColorInt(id, "setBackgroundColor", light, dark)
      if (cornerDp > 0f) views.setViewOutlinePreferredRadius(id, cornerDp, TypedValue.COMPLEX_UNIT_DIP)
    } else {
      views.setInt(id, "setBackgroundColor", if (night) dark else light)
    }
  }

  private fun image(views: RemoteViews, id: Int, light: Bitmap, dark: Bitmap, night: Boolean) {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      views.setIcon(id, "setImageIcon", Icon.createWithBitmap(light), Icon.createWithBitmap(dark))
    } else {
      views.setImageViewBitmap(id, if (night) dark else light)
    }
  }

  /** Where a tap goes is decided by the schedule (docs/widgets.md); with no link, the app itself. */
  private fun tap(context: Context, views: RemoteViews, kind: PrayerWidgetKind, link: String?) {
    val intent =
      if (link.isNullOrEmpty()) {
        context.packageManager.getLaunchIntentForPackage(context.packageName)
      } else {
        Intent(Intent.ACTION_VIEW, Uri.parse(link)).setPackage(context.packageName)
      } ?: return
    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
    val pending =
      PendingIntent.getActivity(context, kind.ordinal, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
    views.setOnClickPendingIntent(android.R.id.background, pending)
  }
}
