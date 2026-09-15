# Widgets

The prayer times on the home screen and the lock screen, on Android and iPhone.

Decided in conversation with Iyad on 15 Sep 2026 and published as the proposal
page "Prayer Times Widgets" (claude.ai/artifact/SJ278q4Zpp95pAdZkZ3sEt, three
versions that day). His instruction: "build all widgets and all things agreed
on", and, when the iPhone was held back because nothing here can compile it,
"no build the iphone widget too". This file is the record of what that means
and the contract both phones read. `docs/ui-redesign-plan.md` carries the dated
entries.

---

## What is built

Three widgets on each phone, and the lock screen, all drawn from one schedule.

**The niche** (small, square). The Awqat arch is the frame. The five prayers
sit on its outline as the app's own day marks on paper discs, at their true
places for the day, exactly as the Today card places them. The lit prayer
wears the ring; a prayer whose time has passed keeps its gold and dims (the
card sinks it to the hairline gold, which vanished at widget size, so this is
the one deliberate difference). No sun on the outline: a widget redraws at set
moments, and a sun parked at 11:20 all afternoon would be wrong. Inside the
niche, the card's words: "Now" or "Next", the prayer's name in Literata, and
the time in gold ("until 4:35 PM", or "1:05 PM" between windows).

**The row** (medium). One line above a gold rule: the caption, the name, the
time. Under it the card's times row: five cells, each with its day mark, name
and time; the lit cell on the selected ground; a cell whose window has closed
dimmed; on a Friday the dot on Dhuhr.

**The quiet one** (small, flat). The lit prayer's day mark and its time, and
nothing else: no prayer name, no app name, for somebody whose phone gets picked
up by family who have not been told. Choosing it is the setting.

**The lock screen, iPhone.** A line beside the date ("Dhuhr 1:05 PM", or
"Dhuhr until 4:35 PM"), and a rectangle under the clock (the caption, the name
and time, and what follows). iOS draws these in one tint, so weight carries
the lit time, not gold. On Android 16 and later the home-screen widgets can be
placed on the lock screen as they are; no separate widget.

**Names in the picker.** "Prayer times" (the niche), "Prayer times, the day"
(the row), "Prayer time, quiet" (the quiet one). Not "Awqat": a convert cannot
read it.

**Where a tap goes.** While a prayer's window is open and the reader is not yet
praying on their own, a tap opens that prayer's walkthrough
(`/guide/{prayer}`), the place Today's Pray button opens. Once
`usePrayerConfidence()` is `on-my-own`, when the button leaves Today, a tap
opens the day page (`/awqat-day`) instead. Between windows, always the day
page. When the schedule has run out, the app.

**No settings page.** Light and dark follow the phone; the place, the method
and a matched mosque follow the app; names or none is a choice of widget; the
size is the picker's.

**The door.** On the day page's shelf, beside the month and the reminders: "On
your home screen". It opens a sheet with the three widgets. On Android, "Add"
asks the phone to place it (`requestPinAppWidget`); where the launcher cannot,
and on iPhone, which gives apps no way to, the sheet shows the steps.

---

## Clock times, never a countdown

A widget does not run. On iPhone it is a timeline of dated snapshots; on Android
it redraws when told. "until 4:35 PM" stays true for the whole window and needs
a new snapshot only when the window changes. A day is about seven snapshots,
and twelve days, the horizon the reminders already use (`DAYS_AHEAD`), is under
a hundred.

---

## The schedule

`src/lib/widget-schedule.ts`, pure, from the card's own functions:
`computeDay`, `findCurrentPrayer`, `findNextPrayer`, `windowEnd`,
`preferredEnd`, through the same profile (`useAwqatProfile`). A widget that
disagrees with the card is the worst bug this feature could have, so the
schedule is not a second implementation of the rules: at every instant where
anything could change, it asks the card's functions what the card would show,
and writes that down.

**The instants.** For each of the next twelve days: local midnight (the row
shows the new day's times from then, as the card does), each prayer's start,
sunrise (Fajr's window closes), and the middle of the night (ʿIshāʾ's preferred
time ends). Consecutive entries that would draw the same are merged.

**One entry** is what every widget draws from that instant until the next:

```ts
type WidgetEntry = {
  at: number;                 // epoch ms
  day: number;                // index into days[]
  state: 'now' | 'next';
  prayer: PrayerId;           // the lit prayer: the open window, or the next start
  caption: string;            // "Now" / "Next" / "Next, tomorrow"
  name: string;               // "Dhuhr"
  time: string;               // "until 4:35 PM" / "1:05 PM"
  note?: string;              // "Its preferred time has passed"
  passed: PrayerId[];         // marks that dim on the arch
  closed: PrayerId[];         // cells that dim in the row
  link: string;               // newmuslimguide://guide/dhuhr or newmuslimguide://awqat-day
};
```

**The payload** handed to both phones, version 1:

```ts
type WidgetPayload = {
  v: 1;
  generatedAt: number;
  staleAt: number;            // after this the widgets say to open the app
  strings: { openApp: string; widgetNames: Record<'niche' | 'row' | 'quiet', string> };
  colors: { light: WidgetPalette; dark: WidgetPalette };   // from theme.ts
  marks: Record<PrayerId, string>;   // day-mark path data, 24 grid, absolute M L C Z only
  arch: { viewBox: [number, number, number, number]; outer: string; inner: string; stroke: number };
  days: {
    date: string;             // yyyy-mm-dd, local
    friday: boolean;
    cells: { id: PrayerId; name: string; time: string }[];
    points: Record<PrayerId, [number, number]>;   // mark centres on the arch, in its viewBox
  }[];
  entries: WidgetEntry[];
};
```

Why it carries paths, colours and words rather than leaving them to each
phone: every one of them already has one home in this repo (`theme.ts`, the day
marks in `illustrations.tsx`, `ui.ts`), and a native copy of any of them would
drift. The native sides only lay out and draw what they are given. The paths
are normalised to absolute moveto, lineto, cubic and close before they leave
JavaScript (arcs and circles converted to cubics), so neither Kotlin nor Swift
needs a full SVG parser.

**Formatting happens in JavaScript** with the card's `formatTime`, so a widget
prints exactly what the card prints. The cost: after the phone's 12/24-hour
setting or language changes, the widget keeps the old form until the app next
opens.

**When it runs out.** `staleAt` is the end of the last entry's day. After it,
both phones draw "Open the app to update prayer times" rather than old times.
After travelling, the widget shows the old place until the app is opened, as
the reminders do.

**Where it is written.** `src/hooks/use-widget-sync.ts`, mounted beside
`useReminderSync` and run on the same triggers: the place, the method, the
ʿAsr school, a matched mosque, the language, confidence, and every return to
the foreground. It writes through `modules/prayer-widget`:

- Android: the local module's `setSchedule(json)` stores it and redraws.
- iPhone: `ExtensionStorage` from `@bacons/apple-targets`, app group
  `group.com.newmuslimguide.app`, key `schedule`, then `reloadWidget()`.

---

## Android

`modules/prayer-widget`, a local Expo module in Kotlin, beside `adhan-alarm`.

- Three `AppWidgetProvider`s, one per widget, registered in the module's own
  manifest (merged into the app's, as `adhan-alarm`'s receivers are).
- `RemoteViews` with XML layouts; the arch and the marks drawn to bitmaps with
  `Canvas` from the payload's paths. Light and dark are both drawn and handed
  over together (`RemoteViews.setIcon` and `setColorInt` with a night value,
  Android 12 and later, read from the SDK 36 jar); below 12, the current mode.
- The prayer's name in Literata 600, bundled in the module's `res/font`.
- An exact alarm at the next entry's instant redraws every placed widget (the
  permission is already held for the adhan). Also redrawn on boot, a clock or
  timezone change, and the app being updated.
- `requestPin(kind)` and `pinSupported()` for the door.

## iPhone

`targets/widget`, SwiftUI, added to the Xcode project by `@bacons/apple-targets`
at prebuild.

- One `WidgetBundle`: the niche (`systemSmall`), the row (`systemMedium`), the
  quiet one (`systemSmall`), the lock screen (`accessoryInline`,
  `accessoryRectangular`).
- A `TimelineProvider` that turns the stored entries into timeline entries at
  their instants, with an entry at `staleAt` that says to open the app.
- `Path` built from the payload's M, L, C, Z data; Literata bundled in the
  target; `widgetURL` for the tap.
- Shared storage through the app group; bundle identifier
  `com.newmuslimguide.app.widget`.

---

## Checks

- `npm run widget:check` fails if, at sampled and edge instants across twelve
  days in several places (San Francisco, London across a clock change, Oslo in
  midsummer, Mecca), the entry in force disagrees with what the card's
  functions return at that instant; if entries are not strictly increasing;
  if a mark path holds anything but M, L, C and Z; if a string is empty.
- `npm run lock:check` fails if the lockfile cannot be installed by the npm
  that EAS Build runs, which is older than the one on this Mac and resolves
  peer dependencies differently. It replays that npm against the lockfile and
  writes nothing.
- `tsc`, `expo lint`, `style:check`, `i18n:manifest`, `expo export --platform
  web`.
- Android: `:prayer-widget:compileReleaseKotlin` in the prebuilt copy.
- iPhone: nothing here can compile Swift until Xcode 26.3 is installed on this
  Mac, and the app has never been built for iPhone. The first proof is the
  first iOS build.

---

## What it commits you to

- A native build on both phones, and another for any later change to how a
  widget is laid out. What a widget says rides the schedule and ships over the
  air.
- iPhone: an Apple Developer Program membership, the Team ID in `app.json`, an
  App Group, and a second bundle identifier whose credentials EAS must cover.
  `@bacons/apple-targets` is a community plugin (5.0.0), not part of Expo.
- Every commit that touches native code changes the fingerprint: publish no
  update over the air between such a commit and the build that carries it.
- Nothing leaves the device. No switch is needed, because a widget exists only
  when somebody places one.

## Where this stands, 15 Sep 2026

Built in one sitting, in this order: the schedule and its check, the bridge
from the app, the Android module, the iPhone target, the door.

**Checked here.** `tsc`, `expo lint`, `style:check`, `widget:check` (the five
places, the arcs, and every copy Android and iPhone keep of a word or a
colour), `:prayer-widget:compileReleaseKotlin` and `:app:processReleaseResources`
in the prebuilt copy, and a static web render.

**The first build failed before it compiled anything**, and not for anything in
this feature's code. EAS Build runs `npm ci --include=dev` on an image carrying
npm 10.9.8, and this Mac writes the lockfile with npm 11. The two resolve one
dependency differently. `@bacons/apple-targets` carries its own older copy of
`@expo/require-utils`, whose optional peer asks for TypeScript 5, and this app
has been on TypeScript 6 since the first commit. npm 11 leaves that alone. npm
10 wants a second TypeScript nested under it, does not find one in the
lockfile, and stops four seconds in. The fix is one `overrides` entry in
`package.json` pointing `@expo/require-utils` at the copy already hoisted to
the top of the tree, which accepts TypeScript 6, so the older copy is removed
rather than the conflict being worked around. `npm run lock:check` was shown to
fail on the lockfile as it stood and to pass once the copy was gone.

**Not checked here, and why.**

- **Every line of Swift.** This Mac has no Xcode, and the app has never been
  built for iPhone. The first iOS build is the first proof, and it needs an
  Apple Developer Program membership and the Team ID in app.json.
- **Android lint.** Both local runs died inside
  `:react-native-worklets:lintAnalyzeRelease` with lint's own crash ("this is
  a bug in lint or one of the libraries it depends on"), before reaching this
  module. EAS builds carrying that module have passed, so this reads as a
  local toolchain fault rather than something the cloud build will hit. Every
  call newer than the minimum Android is behind its own version check anyway,
  which is what that lint would be checking.
- **How any of it looks.** A widget can only be seen on a phone. Iyad runs the
  build; then the widgets are added by hand and looked at over adb.

**What to watch for first on the phone**: whether a widget says "Can't load
widget", which would mean a RemoteViews call the launcher refuses; the text
sizes at 411dp; and the tap opening the prayer's walkthrough while a window is
open, the day page otherwise.

## Held

- Live Activities and the Dynamic Island: the app starts those, so the plan
  wants them off by default. Not in this set.
- A live progress line across the window.
- The place's name on the row.
- Iftar in Ramadan, which belongs to Ramadan mode.
