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
    let date: String
    let friday: Bool
    let cells: [Cell]
    let points: [String: [Double]]
  }

  struct Entry: Decodable {
    let at: Double
    let day: Int
    let state: String
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

struct PrayerEntry: TimelineEntry {
  let date: Date
  let payload: WidgetPayload?
  /// Nil when there is no schedule, or it has run out.
  let entry: WidgetPayload.Entry?

  var day: WidgetPayload.Day? {
    guard let entry, let payload, payload.days.indices.contains(entry.day) else { return nil }
    return payload.days[entry.day]
  }

  var palette: WidgetPayload.Palette? { nil }
}

/// One timeline entry per change in the schedule, and one where it runs out.
///
/// The policy is never: the app reloads the widgets each time it hands them a
/// new schedule, which is every launch and every return to the foreground.
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
    guard let payload = ScheduleStore.load() else {
      completion(Timeline(entries: [PrayerEntry(date: now, payload: nil, entry: nil)], policy: .never))
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
    completion(Timeline(entries: entries, policy: .never))
  }
}
