import Foundation
import WidgetKit

/// The schedule as `src/lib/widget-schedule.ts` writes it, version 1 (docs/widgets.md).
///
/// Nothing here decides anything about prayer times. The words, the colours,
/// the marks and which prayer is lit all arrive decided, from the same code the
/// Today card uses, so a widget cannot disagree with it.
struct WidgetPayload: Decodable {
  let v: Int
  let staleAt: Double
  let strings: Strings
  let colors: Colors
  let marks: [String: String]
  let arch: Arch
  let days: [Day]
  let entries: [Entry]

  struct Strings: Decodable {
    let openApp: String
  }

  struct Colors: Decodable {
    let light: Palette
    let dark: Palette
  }

  struct Palette: Decodable {
    let ground: String
    let text: String
    let textSecondary: String
    let gold: String
    let goldSoft: String
    let selected: String
    let accent: String
  }

  struct Arch: Decodable {
    let viewBox: [Double]
    let outer: String
    let inner: String
    let stroke: Double
    let innerStroke: Double
    let disc: Double
    let ring: Double
    let ringStroke: Double
    let markSize: Double
    let markStroke: Double
  }

  struct Cell: Decodable {
    let id: String
    let name: String
    let time: String
  }

  struct Day: Decodable {
    /// Nothing here draws the date. Optional, because a field the producer could
    /// one day stop writing must not blank every widget on the phone.
    let date: String?
    let friday: Bool
    let cells: [Cell]
    let points: [String: [Double]]
  }

  struct Entry: Decodable {
    let at: Double
    let day: Int
    /// Nothing here draws the state either, and its absence must not fail the decode.
    let state: String?
    let prayer: String
    let lit: String?
    let caption: String
    let name: String
    let time: String
    let note: String?
    let passed: [String]
    let closed: [String]
    let link: String

    var date: Date { Date(timeIntervalSince1970: at / 1000) }
  }

  /// The entry in force at `date`: nil once the schedule has run out, so the widget asks for the app instead.
  func entry(at date: Date) -> Entry? {
    let ms = date.timeIntervalSince1970 * 1000
    guard ms < staleAt, let first = entries.first else { return nil }
    // A clock set back behind the first entry still draws the first rather than nothing.
    return entries.last(where: { $0.at <= ms }) ?? first
  }
}

let prayerIds = ["fajr", "dhuhr", "asr", "maghrib", "isha"]

/// Where the app leaves the schedule: `modules/prayer-widget/ios-storage.ios.ts` names the same group and key.
enum ScheduleStore {
  static let appGroup = "group.com.newmuslimguide.app"
  static let key = "schedule"

  static func load() -> WidgetPayload? {
    guard
      let text = UserDefaults(suiteName: appGroup)?.string(forKey: key),
      let data = text.data(using: .utf8),
      let payload = try? JSONDecoder().decode(WidgetPayload.self, from: data),
      payload.v == 1
    else { return nil }
    return payload
  }
}

/// What one moment draws, and nothing else.
///
/// The schedule is twelve days of times, and the timeline holds ninety-odd
/// moments of it at once, so an entry that carried the whole payload carried it
/// ninety times over against the memory a widget is given. It keeps the day it
/// draws and the words and paths it draws with.
struct PrayerEntry: TimelineEntry {
  let date: Date
  /// Nil when there is no schedule, or it has run out.
  let entry: WidgetPayload.Entry?
  let day: WidgetPayload.Day?
  /// Both schemes: the same entry is drawn again when the phone changes appearance.
  let colors: WidgetPayload.Colors?
  let marks: [String: String]
  let arch: WidgetPayload.Arch?
  let openApp: String?

  init(date: Date, payload: WidgetPayload?, entry: WidgetPayload.Entry?) {
    self.date = date
    self.entry = entry
    if let entry, let payload, payload.days.indices.contains(entry.day) {
      day = payload.days[entry.day]
    } else {
      day = nil
    }
    colors = payload?.colors
    marks = payload?.marks ?? [:]
    arch = payload?.arch
    openApp = payload?.strings.openApp
  }
}

/// How long a widget with nothing left to draw waits before asking again.
private let askAgain: TimeInterval = 3600

/// One timeline entry per change in the schedule, and one where it runs out.
///
/// The app reloads the widgets each time it hands them a new schedule, which is
/// every launch and every return to the foreground, so a placed widget is
/// rarely left to the policy. The one that is, is a widget placed before the app
/// has ever written a schedule: it has nothing to draw and, on a policy of
/// never, no way of ever asking for one.
struct PrayerTimeline: TimelineProvider {
  func placeholder(in context: Context) -> PrayerEntry {
    PrayerEntry(date: .now, payload: nil, entry: nil)
  }

  func getSnapshot(in context: Context, completion: @escaping (PrayerEntry) -> Void) {
    let payload = ScheduleStore.load()
    completion(PrayerEntry(date: .now, payload: payload, entry: payload?.entry(at: .now)))
  }

  func getTimeline(in context: Context, completion: @escaping (Timeline<PrayerEntry>) -> Void) {
    let now = Date()
    let retry = now.addingTimeInterval(askAgain)
    guard let payload = ScheduleStore.load() else {
      completion(Timeline(entries: [PrayerEntry(date: now, payload: nil, entry: nil)], policy: .after(retry)))
      return
    }
    var entries = [PrayerEntry(date: now, payload: payload, entry: payload.entry(at: now))]
    for item in payload.entries where item.date > now {
      entries.append(PrayerEntry(date: item.date, payload: payload, entry: item))
    }
    let stale = Date(timeIntervalSince1970: payload.staleAt / 1000)
    if stale > now {
      entries.append(PrayerEntry(date: stale, payload: payload, entry: nil))
    }
    // The last of these entries says to open the app, so ask again then, and an
    // hour out rather than at once for a schedule that has already run out.
    completion(Timeline(entries: entries, policy: .after(max(stale, retry))))
  }
}
