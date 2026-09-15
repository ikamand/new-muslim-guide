import SwiftUI
import WidgetKit

/// The iPhone widgets (docs/widgets.md). The names and descriptions are the
/// English of keys in src/i18n/ui.ts; npm run widget:check fails if they drift.
@main
struct PrayerWidgets: WidgetBundle {
  var body: some Widget {
    NicheWidget()
    RowWidget()
    QuietWidget()
    LockWidget()
  }
}

struct NicheWidget: Widget {
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: "PrayerNiche", provider: PrayerTimeline()) { item in
      NicheView(item: item)
    }
    .configurationDisplayName("Prayer times")
    .description("The time now, in the arch")
    .supportedFamilies([.systemSmall])
    .contentMarginsDisabled()
  }
}

struct RowWidget: Widget {
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: "PrayerRow", provider: PrayerTimeline()) { item in
      RowView(item: item)
    }
    .configurationDisplayName("Prayer times, the day")
    .description("All five prayers of the day")
    .supportedFamilies([.systemMedium])
  }
}

struct QuietWidget: Widget {
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: "PrayerQuiet", provider: PrayerTimeline()) { item in
      QuietView(item: item)
    }
    .configurationDisplayName("Prayer time, quiet")
    .description("A mark and a time, no names")
    .supportedFamilies([.systemSmall])
  }
}

struct LockWidget: Widget {
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: "PrayerLock", provider: PrayerTimeline()) { item in
      LockView(item: item)
    }
    .configurationDisplayName("Prayer times")
    .description("The next prayer, on the lock screen")
    .supportedFamilies([.accessoryInline, .accessoryRectangular])
  }
}
