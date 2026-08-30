# Ramadan mode

**Status:** Agreed 29 August 2026 — Iyad: *"i like the whole ramadan mode
idea, bake it in the plan."* **All four pieces built 30 Aug** on his "build
everything" instruction — commit `de5986c`. **Seen on a screen the same
day:** all seven windows driven in the web preview with a mocked clock and
London coordinates at 393pt — the Shaʿban offer, pre-dawn suhoor, daytime
iftar, the tarāwīḥ evening, mid-month zakat, the last ten nights, Eid-close —
in light, and repeated in dark. Screenshots and the driving script are in
`.cache/ramadan-shots/`. Two things the browser cannot verify and the phone
still must: **a wake-up actually firing** (web has no scheduler by design,
`notifications.ts:27`) and the switch's permission prompt. R4 remains on the
scholarly-review pile.
**Opened:** 29 August 2026, from the first-Ramadan-companion conversation.

**The finding the design rests on:** the content already exists —
`learn/ramadan.ts` covers the fast, the day, exemptions, Laylat al-Qadr and
zakat al-fitr; `learn/eid.ts:68` already carries the Eid-alone section;
tarāwīḥ is in `ramadan.ts` and `voluntary-prayers.ts`. What is wrong is the
*shape*: `seasons.ts:55` pins the same 244-line page to Today for thirty days,
while Ramadan is the most day-shaped, deadline-shaped month in the religion.
**This is a placement project, not a content project** — one new page, not
thirty.

**Ramadan is a mode of Today, not a screen.** Invisible eleven months a year,
which is what cadence `yearly` was built to mean.

---

## The two constraints that shape everything

- **Phases, never day numbers.** `seasons.ts`'s header is settled: the
  calculation misses the sighted month by a day often enough that "Day 7 of
  Ramadan" would sometimes be a lie. Every window spans days; nothing on
  screen counts them.
- **No fast tracking, ever.** "You've fasted 12 days" is a streak wearing a
  hijri calendar, and one missed fast turns it into an accusation. Nothing
  records whether anyone fasted; nothing notices absence
  (`index.tsx`'s standing promise).

## The pieces

| # | Piece | State | Ships via |
|---|---|---|---|
| **R1** | The fast line: suhoor and iftar from prayer times | ✅ Built 30 Aug (`fast-line.tsx`, own line — the default held) | OTA |
| **R2** | `RAMADAN_ARC`: the season becomes phases | ✅ Built 30 Aug (`ramadan-arc.ts`; the standing zakat candidate moved into it) | OTA |
| **R3** | The suhoor wake-up: a setting, offered once | ✅ Built 30 Aug, plus the two window notes from build-order | OTA |
| **R4** | One new page: fasting where nobody else is | ✅ Written 30 Aug (`learn/fasting-alone.ts`, Bukhari 1894 opened first) — ⚠️ unreviewed | OTA + review |

**What R3 forced, and the app gained:** the notification schedule now has one
owner, `useReminderSync` in the root layout. It lived on the Settings screen,
so the twelve-day rolling window only topped up in sessions where Settings
was opened — a pre-existing flaw the fast line's toggle would have widened.
All four notification kinds flow through one plan, sorted by fire time and
capped at 60 under the iOS pending limit of 64.

### R1 — The fast line

Suhoor ends at Fajr and iftar is at Maghrib — prayer times the app already
holds offline, wearing fasting vocabulary. Before dawn: "Suhoor ends at Fajr —
5:31". Through the day: "Iftar at Maghrib — 6:12". At Maghrib the words-slot
takes over with the iftar duʿa, which the moment machinery in `duas/card.ts`
already knows. Zero new calculation, zero religious claims, works in a
basement.

**Open — Iyad's call, not yet made:** a row on the prayer-times card, or its
own slim line beneath it. The card is untouched by standing instruction
(ui-redesign-plan Phase 2), so **the default is its own line beneath**;
folding it into the card is the better-looking answer if he unmakes that
instruction. The recommendation on record is on-card, because it is literally
prayer-times information.

### R2 — The arc

`RAMADAN_ARC`, a table in `src/content/` shaped like `SEASONS` but finer
inside month 8–10: each row a phase window, an optional moment of day, a ref
into **existing reviewed content**, one line of framing. Fed to the ranked
worth-today slot as one more candidate source — not a new surface.

| Window | Offer |
|---|---|
| Shaʿban 15+ (exists) | "Your first Ramadan is coming" + the wake-up offer (R3) |
| Early Ramadan | The fasting sections; evenings, "tonight the mosques pray tarāwīḥ — here's what you'll see" |
| Mid-month | Zakat al-fitr ahead; the calculator the app already promotes in Ramadan |
| Last ten nights (exists) | The Laylat al-Qadr section |
| Final days | Zakat al-fitr is due *before the Eid prayer*; then the Eid page, alone-section and all |

### R3 — The suhoor wake-up

**Amended 29 Aug on Iyad's pushback, and he was right: the offer is
transient; the switch is permanent.** The first draft said "offered once,
never mentioned again for a year", which conflates *the app asks once* (right
register) with *the door closes* (a trap for the misclick and the changed
mind).

- The wake-up is a real setting, `suhoorWakeUp`. The Shaʿban offer card is
  nothing but a shortcut that sets it; answering either way only flips the
  toggle and dismisses the card.
- **Two standing doors, both findable at the moment of need:** a row in
  Settings under the existing reminders, year-round, dormant outside the
  month ("During Ramadan: wake me before Fajr for suhoor") — always in the
  same place, never appearing and disappearing; and the suhoor line on Today
  during the month, which opens the same toggle — the person who slept
  through suhoor is looking at that line tomorrow, and the fix is one tap
  deep, exactly where their regret is.
- Works in reverse for the opt-in who wants out. The offer's confirmation
  copy names where the switch lives.
- What survives: the app *volunteers* the question once per year, in Shaʿban.
  Nothing re-prompts, nothing notices a no.
- Scheduled from the same prayer times (`expo-notifications` is already in
  the binary — checked 29 Aug, so this is OTA); a fixed sensible lead
  (~45 minutes, stated plainly), no configurator until someone asks for one;
  all pending notifications cancelled when the month ends.

### R4 — The one new page: fasting where nobody else is

The convert-shaped situation `ramadan.ts` does not cover: the workplace lunch
invitation, "not even water?", whether to tell colleagues, eating alone at
Maghrib in a house having dinner at seven — one paragraph of dignity about an
iftar for one, and the plain fact that Ramadan is the easiest month of the
year to walk into a mosque, because there is a free meal every night and
nobody asks a stranger why they came. **This page is the entire review-pile
cost of the design.** Standing checklist from `build-order.md` Stage D
applies, reviewer included.

## What this removes

The same-card-for-thirty-days season behaviour; the ordinary worth-today
candidates during month 9 (the arc outranks them); all of it after Eid.

## Order, verification, timing

- **Pilot first, per the standing rule:** R1's line plus ONE arc card, looked
  at in both themes at phone width — driven with a mocked date, the way
  Phase 4 tested Friday-in-Los-Angeles — then the rest of the table.
- **Timing is the argument for not letting this sit:** Ramadan 1448 lands
  around early-to-mid February 2027; the Shaʿban window fires ~three weeks
  before. Machinery needs eyes by mid-January; R4 needs to clear review
  before that.
