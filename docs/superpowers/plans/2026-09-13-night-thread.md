# The Night Thread — Implementation Plan

> Executed inline on branch `night-thread`, one task at a time: build, run the checks, look at the screen at 360pt, commit, then a reviewer subagent per task and a final whole-branch review. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Today from ʿIsha to Fajr becomes one calm object: the night drawn as a line under the prayer card, witr's mark and an optional wake-up bell placed on it, and one card that follows the moon. The day's name moves into the header.

**Approved design:** "The Night Thread" artifact (https://claude.ai/code/artifact/c7fd3093-76d5-44cb-906c-d0c94be4f343), version 2, with the Arabic of the adhkār row removed. Iyad, 13 Sep 2026: "that looks gorgeous", "build it".

**Architecture:** Pure time geometry in `src/lib/night.ts` and a pure wake planner in `src/lib/reminders.ts`, both walked by `npm run night:check`. One new setting (`nightWakeUp`) scheduled by the existing `useReminderSync`. Two components (`night-thread.tsx`, `night-card.tsx`) rendered by Today in place of the sleep-adhkār card while the night is on. `useToday` loses its night block. The day's-name coda becomes `DayName` inside the header's ʿunwān.

**Tech stack:** Expo SDK 57, expo-router, react-native-svg, expo-notifications (already installed; no native change).

## Global constraints

- **Never type Arabic.** The header's name renders `entry.arabic` from the collection; no Arabic literal is added anywhere.
- **UI wording lives in `src/i18n/ui.ts`.** No sentence literals in `src/app` (`nav:check`). Components take their words from `t()`.
- **Theme tokens and the type scale only.** No hex in components, no local `fontSize`. SVG carries marks; every word is a `ThemedText` (font resolution inside `react-native-svg` is unreliable).
- **The spacing rule:** rules and pressable boxes touch; air lives inside painted boxes.
- **The app never asks what the reader prayed.** No notification text tells anyone to pray witr, because someone who prayed it before sleeping would be told to pray it twice. The only witr prompt after sleep is "Not prayed witr tonight?".
- **One wake-up per night.** In Ramadan, when the suhoor wake-up is on, the night wake-up is not scheduled.
- **Model-written wording** is listed on the review pile and marked ⚠️ in its source comment.
- **Branch `night-thread`.** Commit per task, specific files only, push the branch. Never merge to main and never run `npm run update:preview` without Iyad.
- **Look at it.** 360pt, dark first, forced through a Playwright context with the app's stored state (see memory note on forcing width).
- **Pre-existing, not this plan's:** `search:check` fails on "dua before sleeping" and "my mum is upset"; `nav:check` flags `choose-place.tsx` and `recite-spike.tsx`; `style:check` warns on `fasting-alone` and `ramadan`.

## Task 1: The day's name in the header

**Files:** modify `src/components/jadwal.tsx` (`Unwan` gains `footer`), create `src/components/day-name.tsx`, modify `src/app/(tabs)/index.tsx` (header passes it; body loses the coda), delete `src/components/daily-collection-card.tsx` (Today was its only user).

- [ ] `Unwan({ title, subtitle, headpiece, footer })`: `footer` renders after the body, before the closing double rule.
- [ ] `DayName`: `dailyEntry()`; null when none. A pressable to `/collection/[id]` with the collection title in its accessibility label. Centred: `entry.arabic` on the Arabic note rung in gold, then `entry.title · entry.translation` on `small`/`textSecondary`, at most two lines. Header comment carries the old card's reasoning and the move (Iyad, 13 Sep 2026: it split the two things done before bed).
- [ ] Today: `<Unwan … footer={<DayName />} />`; remove `<DailyCollectionCard />` and its import.
- [ ] Checks: `npx tsc --noEmit`, `npm run nav:check`. Screen: 360 dark, header shows the name between the rules; body goes from the words slot straight to the foot.
- [ ] Commit: "Today: the day's name moves into the header".

## Task 2: Where the moon is

**Files:** modify `src/lib/night.ts`, `scripts/night-check.mjs`.

- [ ] Add, pure:

```ts
export const NIGHT_WAKE_LEAD_MINUTES = 60;

export type NightThread = {
  isha: Date;
  fajr: Date;
  lastThirdAt: Date;
  /** The wake-up: an hour before Fajr, never before the last third begins. */
  wakeAt: Date;
  /** 0..1 along ʿIsha → Fajr. */
  now: number;
  lastThird: number;
  wake: number;
  part: 'before' | 'third';
};

export function nightThread(evening: DayTimes, morning: DayTimes, now: Date): NightThread | null
```

  Null before ʿIshāʾ and from Fajr. `part` is `'third'` from `evening.lastThirdOfNight`. Fractions are clamped to [0, 1]. Where ʿIshāʾ falls inside the last third (far north in summer), `lastThird` is 0.
- [ ] `night:check` block over real San Francisco nights (and one fabricated short night): null before ʿIshāʾ and at Fajr; `0 ≤ now ≤ 1`; `lastThird < 1`; `lastThird ≤ wake < 1`; `wakeAt ≥ lastThirdAt` and `wakeAt < fajr`; `part` flips exactly at `lastThirdOfNight`; `nightThread` is non-null exactly when `nightPrayerAt` is non-null after ʿIshāʾ.
- [ ] Commit: "Night: where the moon is, as a pure function".

## Task 3: The wake-up reminder

**Files:** modify `src/lib/reminders.ts`, `src/hooks/use-settings.tsx`, `src/hooks/use-reminders.ts`, `src/app/reminders.tsx`, `src/i18n/ui.ts`, `scripts/night-check.mjs`.

- [ ] `planNightWake(coords, profile, from, skip, daysAhead = DAYS_AHEAD)`: for each day, Fajr of that day; the last third that ends at it (`computeDay` of the previous day); fire at the later of `fajr − 60 min` and that last third; `skip(day)` returns nothing; only future moments. `anchor` is Fajr.
- [ ] Setting `nightWakeUp: boolean`, default false, read back like `suhoorWakeUp`, documented.
- [ ] `useReminderSync`: in `anythingOn`, the signature and the effect deps; items with `skip = (day) => suhoorWakeUp && isRamadan(day)`, title `nightWake.notification.title`, body `nightWake.notification.body` with Fajr's time.
- [ ] `ReminderFlag` gains `'nightWakeUp'`; `flags` and `toggleFlag` read from one map instead of a ternary chain.
- [ ] Reminders screen: a "Night prayer" section, first after Friday? No: after Prayer times, before Friday, because it is daily. Row label `reminders.nightWake`.
- [ ] Strings (⚠️ review pile): `reminders.night` "Night prayer"; `reminders.nightWake` "Wake me an hour before Fajr"; `nightWake.notification.title` "The last third of the night"; `nightWake.notification.body` "Fajr is at {time}. A good time to pray, two rakʿahs at a time."
- [ ] `night:check`: planned wake-ups sit in [last third, Fajr); `skip` removes exactly the skipped days; none in the past.
- [ ] Checks: tsc, night:check, nav:check. Commit: "Reminders: wake me an hour before Fajr for the night prayer".

## Task 4: The thread, the card, and Today at night

**Files:** modify `src/components/teaching/timeline.tsx` (export the mark as `TimelineGlyph`), create `src/components/night-thread.tsx` and `src/components/night-card.tsx`, modify `src/app/(tabs)/index.tsx`, `src/components/fast-line.tsx`, `src/hooks/use-today.ts`, `src/i18n/ui.ts`, `scripts/night-check.mjs` (comment only).

- [ ] `NightThread({ thread, witr: 'early' | 'next' | 'end', witrAhead, bell })`: a hairline from ʿIshāʾ to Fajr, travelled part in gold, the last third as a soft gold band, end ticks; witr's closing mark placed early (Ramadan), just after the moon (before the last third), or near the end (outlined when ahead); the bell above the line at `wake` when on and not yet rung; the moon on a ground disc at `now`. Words as `ThemedText`: "Last third" caption above the band, ʿIshāʾ's time left, the last third's time at the band, Fajr's time right. One accessibility label for the whole drawing.
- [ ] `NightCard` states, words from `ui.ts`:
  - **Before you sleep** (not Ramadan): Shafʿ and Witr row "If you might not wake before Fajr" (hidden while the wake-up is on); Adhkār of sleep row with its count, and a Start button; the wake-up switch "Wake me at {time}" / "For the night prayer, before Fajr"; when on, the line "Witr moves to the end of your night."
  - **A night in Ramadan** (the tarāwīḥ span): Taraweeh row "With the imam, and witr with him"; Adhkār of sleep with Start; the suhoor switch "Wake me for suhoor at {time}" / "Suhoor ends at Fajr, {time}".
  - **The last third of the night**: "The best part of the night to pray, two rakʿahs at a time."; a "Pray in twos" button to the night-prayer page; "Not prayed witr tonight? End with shafʿ and witr" to Shafʿ and Witr.
- [ ] Today: while `nightThread` is non-null and the after-prayer sitting is not open, render the thread and the card in the words slot's place; the Ramadan state comes from `arcForNight(hijriOfNight(maghrib), nightPrayerAt(...))`. `FastLine` renders nothing while the night card shows. `useToday` loses its night block, `NIGHT_PAGE`, `NIGHT_REASON` and their imports; the doc comment about witr points at the night card. Unused `today.afterIsha`, `today.pastMiddle`, `today.lastThird` keys are removed if nothing else reads them.
- [ ] Checks: tsc, night:check, nav:check, style:check, adhkar:check. Screens (controller): 9:30 pm off and on, 12:45 am, 4:45 am, Ramadan 9:30 pm, one light-theme shot.
- [ ] Commit: "Today at night: the thread and the card that follows the moon".

## Task 5: Records and verification

- [ ] Review pile: a "Today at night" subsection with every new line of wording and the notification text.
- [ ] `docs/ui-redesign-plan.md`: the decision record (day name in header; thread; card; wake-up; Ramadan merge; adhkār Arabic left off the row for narrow phones).
- [ ] Full: tsc, night:check, style:check, nav:check, content:audit, i18n:manifest, search:check, adhkar:check, `npx expo export --platform web` into the scratchpad.
- [ ] Commit and push the branch. Final whole-branch review. Then Iyad decides: OTA from the branch to try it, or merge.
