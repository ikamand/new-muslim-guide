import Foundation
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

/// Round cap and join, as every stroke the app draws has.
private func strokeStyle(_ width: Double) -> StrokeStyle {
  StrokeStyle(lineWidth: width, lineCap: .round, lineJoin: .round)
}

/// The paper disc under a mark, and the ring around the lit one.
private func circle(at centre: CGPoint, radius: Double) -> Path {
  let r = CGFloat(radius)
  return Path(ellipseIn: CGRect(x: centre.x - r, y: centre.y - r, width: r * 2, height: r * 2))
}

/// A day mark at its place on the arch: the 24 grid scaled to the mark's box,
/// and stroked after that scaling rather than before it, so the line is the 2.4
/// viewBox units the schedule asks for and not 2.4 times 26/24.
private func markPath(_ data: String, at centre: CGPoint, size: Double, stroke: Double) -> Path {
  let scale = CGFloat(size) / 24
  let place = CGAffineTransform(translationX: centre.x - CGFloat(size) / 2, y: centre.y - CGFloat(size) / 2)
    .scaledBy(x: scale, y: scale)
  return svgPath(data).applying(place).strokedPath(strokeStyle(stroke))
}

/// Anything drawn in the arch's viewBox, fitted to the view: scaled by the
/// smaller axis and centred in what is left, so a viewBox that stops being
/// square does not stretch.
///
/// A widget's view tree is archived and replayed out of process, where an
/// immediate-mode drawing closure may never be asked to run, so this is a Shape
/// and not a Canvas. What it is handed is already stroked, which is what keeps
/// a width in the viewBox units widget-geometry.ts writes it in whatever size
/// the widget is drawn at.
struct ArchShape: Shape {
  let box: [Double]
  let drawing: Path

  func path(in rect: CGRect) -> Path {
    guard box.count == 4, box[2] > 0, box[3] > 0 else { return Path() }
    let scale = min(rect.width / CGFloat(box[2]), rect.height / CGFloat(box[3]))
    let fit = CGAffineTransform(
      translationX: rect.minX + (rect.width - CGFloat(box[2]) * scale) / 2,
      y: rect.minY + (rect.height - CGFloat(box[3]) * scale) / 2
    )
    .scaledBy(x: scale, y: scale)
    .translatedBy(x: CGFloat(-box[0]), y: CGFloat(-box[1]))
    return drawing.applying(fit)
  }
}

/// The niche's arch: the inner line in the hairline gold, the outline in gold,
/// and each prayer's mark on a paper disc at its place for the day. The lit
/// prayer wears the ring; a passed mark keeps its gold and dims.
struct ArchView: View {
  let arch: WidgetPayload.Arch
  let marks: [String: String]
  let day: WidgetPayload.Day?
  let entry: WidgetPayload.Entry?
  let palette: WidgetPayload.Palette

  var body: some View {
    let gold = Color(hex: palette.gold)
    ZStack {
      ArchShape(box: arch.viewBox, drawing: svgPath(arch.inner).strokedPath(strokeStyle(arch.innerStroke)))
        .fill(Color(hex: palette.goldSoft))
      ArchShape(box: arch.viewBox, drawing: svgPath(arch.outer).strokedPath(strokeStyle(arch.stroke)))
        .fill(gold)
      if let day, let entry {
        // In this order, prayer by prayer, so a disc never lands on the mark before it.
        ForEach(prayerIds, id: \.self) { id in
          if let point = day.points[id], point.count == 2 {
            let centre = CGPoint(x: point[0], y: point[1])
            ArchShape(box: arch.viewBox, drawing: circle(at: centre, radius: arch.disc))
              .fill(Color(hex: palette.ground))
            if entry.lit == id {
              ArchShape(
                box: arch.viewBox,
                drawing: circle(at: centre, radius: arch.ring).strokedPath(strokeStyle(arch.ringStroke))
              )
              .fill(gold)
            }
            if let data = marks[id] {
              ArchShape(box: arch.viewBox, drawing: markPath(data, at: centre, size: arch.markSize, stroke: arch.markStroke))
                .fill(gold)
                .opacity(entry.passed.contains(id) ? 0.55 : 1)
            }
          }
        }
      }
    }
  }
}

/// The mark's 24 grid mapped onto the box it is given, stroked on that grid so
/// the 1.5 below stays 1.5 of the 24 at any size.
struct MarkShape: Shape {
  let data: String

  func path(in rect: CGRect) -> Path {
    let place = CGAffineTransform(translationX: rect.minX, y: rect.minY)
      .scaledBy(x: rect.width / 24, y: rect.height / 24)
    return svgPath(data).strokedPath(strokeStyle(1.5)).applying(place)
  }
}

/// One day mark, in the Glyph's stroke of 1.5 on the 24 grid.
struct MarkView: View {
  let data: String?
  let color: Color

  var body: some View {
    if let data {
      MarkShape(data: data).fill(color)
    }
  }
}
