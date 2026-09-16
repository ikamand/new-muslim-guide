package expo.modules.prayerwidget

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.Path

/**
 * The arch and the day marks, drawn from the schedule's path data.
 *
 * The paths arrive reduced to absolute M, L, C and Z (`src/lib/svg-path.ts`),
 * so reading them is one call per command. The geometry, the stroke widths and
 * where each mark sits all come from the schedule too, so this file never
 * changes when the drawing does.
 */
internal object PrayerWidgetDrawing {
  /** Anything past M, L, C and Z ends the path where it is, rather than guessing. */
  fun path(data: String): Path {
    val path = Path()
    val tokens = data.trim().split(Regex("\\s+"))
    var index = 0
    fun number(): Float = tokens[index++].toFloat()
    try {
      while (index < tokens.size) {
        when (tokens[index++]) {
          "M" -> path.moveTo(number(), number())
          "L" -> path.lineTo(number(), number())
          "C" -> path.cubicTo(number(), number(), number(), number(), number(), number())
          "Z" -> path.close()
          else -> return path
        }
      }
    } catch (error: RuntimeException) {
      // A malformed path draws what it had.
    }
    return path
  }

  private fun stroke(color: Int, width: Float, alpha: Int = 255) =
    Paint(Paint.ANTI_ALIAS_FLAG).apply {
      style = Paint.Style.STROKE
      strokeCap = Paint.Cap.ROUND
      strokeJoin = Paint.Join.ROUND
      this.color = color
      this.alpha = alpha
      strokeWidth = width
    }

  /**
   * The niche's arch at `size` pixels square: the inner line in the hairline
   * gold, the outline in gold, and each prayer's mark on a paper disc at its
   * place for the day. The lit prayer wears the ring; a passed mark dims.
   */
  fun arch(payload: Payload, day: Day?, entry: Entry?, palette: Palette, size: Int): Bitmap {
    val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)
    val box = payload.arch.viewBox
    // Both axes, and centred in what is left, as the iPhone does: a viewBox that stops being square must not stretch here.
    val scale = minOf(size / box[2], size / box[3])
    canvas.translate((size - box[2] * scale) / 2f, (size - box[3] * scale) / 2f)
    canvas.scale(scale, scale)
    canvas.translate(-box[0], -box[1])

    val arch = payload.arch
    canvas.drawPath(path(arch.inner), stroke(palette.goldSoft, arch.innerStroke))
    canvas.drawPath(path(arch.outer), stroke(palette.gold, arch.stroke))
    if (day == null || entry == null) return bitmap

    val disc = Paint(Paint.ANTI_ALIAS_FLAG).apply {
      style = Paint.Style.FILL
      color = palette.ground
    }
    for (id in PRAYERS) {
      val point = day.points[id] ?: continue
      canvas.drawCircle(point[0], point[1], arch.disc, disc)
      if (entry.lit == id) canvas.drawCircle(point[0], point[1], arch.ring, stroke(palette.gold, arch.ringStroke))
      val data = payload.marks[id]
      if (data.isNullOrEmpty()) continue
      val k = arch.markSize / 24f
      canvas.save()
      canvas.translate(point[0] - arch.markSize / 2, point[1] - arch.markSize / 2)
      canvas.scale(k, k)
      // Passed marks keep their gold and dim, as the times row dims a closed cell.
      // Divided by the scale above, which multiplies stroke width as well as geometry:
      // markStroke is a width in the arch's units, not in the mark's own 24 grid.
      canvas.drawPath(path(data), stroke(palette.gold, arch.markStroke / k, if (id in entry.passed) 140 else 255))
      canvas.restore()
    }
    return bitmap
  }

  /** One day mark at `size` pixels square, in the Glyph's stroke of 1.5 on the 24 grid. */
  fun mark(data: String?, color: Int, size: Int): Bitmap {
    val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
    if (data.isNullOrEmpty()) return bitmap
    val canvas = Canvas(bitmap)
    canvas.scale(size / 24f, size / 24f)
    canvas.drawPath(path(data), stroke(color, 1.5f))
    return bitmap
  }
}
