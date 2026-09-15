import SwiftUI

/// A path from M, L, C and Z data, which is all `src/lib/svg-path.ts` sends.
/// Anything else ends the path where it is, rather than guessing.
func svgPath(_ data: String) -> Path {
  var path = Path()
  let tokens = data.split(separator: " ")
  var index = 0

  func number() -> CGFloat? {
    guard index < tokens.count, let value = Double(tokens[index]) else { return nil }
    index += 1
    return CGFloat(value)
  }

  while index < tokens.count {
    let command = tokens[index]
    index += 1
    switch command {
    case "M":
      guard let x = number(), let y = number() else { return path }
      path.move(to: CGPoint(x: x, y: y))
    case "L":
      guard let x = number(), let y = number() else { return path }
      path.addLine(to: CGPoint(x: x, y: y))
    case "C":
      guard let x1 = number(), let y1 = number(), let x2 = number(), let y2 = number(), let x = number(), let y = number()
      else { return path }
      path.addCurve(to: CGPoint(x: x, y: y), control1: CGPoint(x: x1, y: y1), control2: CGPoint(x: x2, y: y2))
    case "Z":
      path.closeSubpath()
    default:
      return path
    }
  }
  return path
}

extension Color {
  /// "#RRGGBB", as theme.ts writes every colour.
  init(hex: String) {
    let value = UInt64(hex.trimmingCharacters(in: CharacterSet(charactersIn: "#")), radix: 16) ?? 0
    self.init(
      .sRGB,
      red: Double((value >> 16) & 0xFF) / 255,
      green: Double((value >> 8) & 0xFF) / 255,
      blue: Double(value & 0xFF) / 255
    )
  }
}

/// The palette as Colors, for the phone's current scheme.
struct Tones {
  let ground: Color
  let text: Color
  let secondary: Color
  let gold: Color
  let goldSoft: Color
  let selected: Color
  let accent: Color

  init(_ palette: WidgetPayload.Palette) {
    ground = Color(hex: palette.ground)
    text = Color(hex: palette.text)
    secondary = Color(hex: palette.textSecondary)
    gold = Color(hex: palette.gold)
    goldSoft = Color(hex: palette.goldSoft)
    selected = Color(hex: palette.selected)
    accent = Color(hex: palette.accent)
  }
}

private func round(_ width: Double) -> StrokeStyle {
  StrokeStyle(lineWidth: width, lineCap: .round, lineJoin: .round)
}

/// The niche's arch: the inner line in the hairline gold, the outline in gold,
/// and each prayer's mark on a paper disc at its place for the day. The lit
/// prayer wears the ring; a passed mark keeps its gold and dims.
struct ArchView: View {
  let payload: WidgetPayload
  let day: WidgetPayload.Day?
  let entry: WidgetPayload.Entry?
  let palette: WidgetPayload.Palette

  var body: some View {
    Canvas { context, size in
      let arch = payload.arch
      guard arch.viewBox.count == 4 else { return }
      let box = arch.viewBox
      let scale = min(size.width / box[2], size.height / box[3])
      context.translateBy(x: (size.width - box[2] * scale) / 2, y: (size.height - box[3] * scale) / 2)
      context.scaleBy(x: scale, y: scale)
      context.translateBy(x: -box[0], y: -box[1])

      let gold = Color(hex: palette.gold)
      context.stroke(svgPath(arch.inner), with: .color(Color(hex: palette.goldSoft)), style: round(arch.innerStroke))
      context.stroke(svgPath(arch.outer), with: .color(gold), style: round(arch.stroke))
      guard let day, let entry else { return }

      for id in prayerIds {
        guard let point = day.points[id], point.count == 2 else { continue }
        let centre = CGPoint(x: point[0], y: point[1])
        let disc = arch.disc
        context.fill(
          Path(ellipseIn: CGRect(x: centre.x - disc, y: centre.y - disc, width: disc * 2, height: disc * 2)),
          with: .color(Color(hex: palette.ground))
        )
        if entry.lit == id {
          let ring = arch.ring
          context.stroke(
            Path(ellipseIn: CGRect(x: centre.x - ring, y: centre.y - ring, width: ring * 2, height: ring * 2)),
            with: .color(gold),
            style: round(arch.ringStroke)
          )
        }
        guard let data = payload.marks[id] else { continue }
        var mark = context
        mark.translateBy(x: centre.x - arch.markSize / 2, y: centre.y - arch.markSize / 2)
        mark.scaleBy(x: arch.markSize / 24, y: arch.markSize / 24)
        mark.opacity = entry.passed.contains(id) ? 0.55 : 1
        mark.stroke(svgPath(data), with: .color(gold), style: round(arch.markStroke))
      }
    }
  }
}

/// One day mark, in the Glyph's stroke of 1.5 on the 24 grid.
struct MarkView: View {
  let data: String?
  let color: Color

  var body: some View {
    Canvas { context, size in
      guard let data else { return }
      context.scaleBy(x: size.width / 24, y: size.height / 24)
      context.stroke(svgPath(data), with: .color(color), style: round(1.5))
    }
  }
}
