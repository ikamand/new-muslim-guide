import SwiftUI
import WidgetKit

/// The words to open the app, when there is no schedule or it has run out.
/// The fallback is for the moment before the app has ever run; npm run
/// widget:check fails if it drifts from ui.ts.
struct OpenAppText: View {
  let item: PrayerEntry
  var tone: Color = .secondary

  var body: some View {
    Text(item.payload?.strings.openApp ?? "Open the app to update prayer times")
      .font(.system(size: 12))
      .multilineTextAlignment(.center)
      .foregroundStyle(tone)
      .padding(12)
  }
}

private func link(_ item: PrayerEntry) -> URL? {
  URL(string: item.entry?.link ?? "newmuslimguide://")
}

/// The niche: the arch as the frame, the card's words inside it.
struct NicheView: View {
  let item: PrayerEntry
  @Environment(\.colorScheme) private var scheme

  var body: some View {
    let palette = item.payload.map { scheme == .dark ? $0.colors.dark : $0.colors.light }
    let tones = palette.map(Tones.init)
    ZStack {
      if let payload = item.payload, let palette {
        ArchView(payload: payload, day: item.day, entry: item.entry, palette: palette)
      }
      if let entry = item.entry, let tones {
        GeometryReader { geometry in
          VStack(spacing: 1) {
            Text(entry.caption.uppercased())
              .font(.system(size: 9))
              .tracking(1.1)
              .foregroundStyle(tones.secondary)
            Text(entry.name)
              .font(.custom("Literata-SemiBold", size: 20))
              .foregroundStyle(tones.text)
              .lineLimit(1)
              .minimumScaleFactor(0.7)
            Text(entry.time)
              .font(.system(size: 12, weight: .semibold))
              .monospacedDigit()
              .foregroundStyle(tones.gold)
              .lineLimit(1)
              .minimumScaleFactor(0.7)
          }
          .frame(maxWidth: .infinity)
          .padding(.top, geometry.size.height * 0.40)
          .padding(.horizontal, 18)
        }
        .accessibilityElement(children: .combine)
      } else {
        OpenAppText(item: item, tone: tones?.secondary ?? .secondary)
      }
    }
    .widgetURL(link(item))
    .containerBackground(for: .widget) { tones?.ground ?? Color(.systemBackground) }
  }
}

/// The row: one line above a gold rule, and the Today card's five cells.
struct RowView: View {
  let item: PrayerEntry
  @Environment(\.colorScheme) private var scheme

  var body: some View {
    let palette = item.payload.map { scheme == .dark ? $0.colors.dark : $0.colors.light }
    let tones = palette.map(Tones.init)
    VStack(spacing: 0) {
      if let entry = item.entry, let day = item.day, let payload = item.payload, let tones {
        HStack(alignment: .firstTextBaseline, spacing: 8) {
          Text(entry.caption.uppercased())
            .font(.system(size: 9))
            .tracking(1.1)
            .foregroundStyle(tones.secondary)
          Text(entry.name)
            .font(.custom("Literata-SemiBold", size: 17))
            .foregroundStyle(tones.text)
            .lineLimit(1)
          Text(entry.time)
            .font(.system(size: 12, weight: .semibold))
            .monospacedDigit()
            .foregroundStyle(tones.gold)
            .lineLimit(1)
          Spacer(minLength: 0)
        }
        .padding(.horizontal, 6)
        .padding(.bottom, 8)

        Rectangle().fill(tones.goldSoft).frame(height: 1)

        HStack(spacing: 4) {
          ForEach(day.cells, id: \.id) { cell in
            let lit = entry.lit == cell.id
            VStack(spacing: 3) {
              MarkView(data: payload.marks[cell.id], color: lit ? tones.gold : tones.secondary)
                .frame(width: 16, height: 16)
              HStack(spacing: 3) {
                // Friday: the card's dot on Dhuhr, a condition stated rather than a relabelling.
                if day.friday && cell.id == "dhuhr" {
                  Circle().fill(tones.accent).frame(width: 5, height: 5)
                }
                Text(cell.name)
                  .font(.system(size: 11))
                  .foregroundStyle(lit ? tones.gold : tones.secondary)
                  .lineLimit(1)
                  .minimumScaleFactor(0.8)
              }
              Text(cell.time)
                .font(.system(size: 11))
                .monospacedDigit()
                .foregroundStyle(lit ? tones.gold : tones.text)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
            }
            .frame(maxWidth: .infinity)
            .padding(.vertical, 6)
            .background(RoundedRectangle(cornerRadius: 10).fill(lit ? tones.selected : Color.clear))
            // A closed window steps back, never ticked: a tick would claim it was prayed.
            .opacity(entry.closed.contains(cell.id) && !lit ? 0.55 : 1)
          }
        }
        .padding(.top, 6)
      } else {
        OpenAppText(item: item, tone: tones?.secondary ?? .secondary)
      }
    }
    .widgetURL(link(item))
    .containerBackground(for: .widget) { tones?.ground ?? Color(.systemBackground) }
  }
}

/// The quiet one: a day mark and a time, no prayer name and no app name.
struct QuietView: View {
  let item: PrayerEntry
  @Environment(\.colorScheme) private var scheme

  var body: some View {
    let palette = item.payload.map { scheme == .dark ? $0.colors.dark : $0.colors.light }
    let tones = palette.map(Tones.init)
    Group {
      if let entry = item.entry, let payload = item.payload, let tones {
        HStack(spacing: 10) {
          MarkView(data: payload.marks[entry.prayer], color: tones.gold)
            .frame(width: 22, height: 22)
          Text(entry.time)
            .font(.system(size: 15))
            .monospacedDigit()
            .foregroundStyle(tones.text)
            .lineLimit(1)
            .minimumScaleFactor(0.7)
        }
        // The time alone, even to VoiceOver: this widget names nothing.
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(entry.time)
      } else {
        OpenAppText(item: item, tone: tones?.secondary ?? .secondary)
      }
    }
    .widgetURL(link(item))
    .containerBackground(for: .widget) { tones?.ground ?? Color(.systemBackground) }
  }
}

/// The lock screen: a line beside the date, or a rectangle under the clock.
/// iOS draws these in one tint, so weight carries the lit time rather than gold.
struct LockView: View {
  let item: PrayerEntry
  @Environment(\.widgetFamily) private var family

  var body: some View {
    Group {
      if let entry = item.entry {
        if family == .accessoryInline {
          Text("\(entry.name) \(entry.time)")
        } else {
          VStack(alignment: .leading, spacing: 0) {
            Text(entry.caption.uppercased())
              .font(.system(size: 11))
              .opacity(0.75)
            Text("\(entry.name) \(entry.time)")
              .font(.system(size: 16, weight: .bold))
              .monospacedDigit()
              .lineLimit(1)
              .minimumScaleFactor(0.7)
            if let note = entry.note {
              Text(note)
                .font(.system(size: 13))
                .opacity(0.72)
                .lineLimit(1)
                .minimumScaleFactor(0.8)
            }
          }
          .frame(maxWidth: .infinity, alignment: .leading)
        }
      } else {
        Text(item.payload?.strings.openApp ?? "Open the app to update prayer times")
          .font(.system(size: 13))
          .lineLimit(2)
      }
    }
    .widgetURL(link(item))
    .containerBackground(for: .widget) { Color.clear }
  }
}
