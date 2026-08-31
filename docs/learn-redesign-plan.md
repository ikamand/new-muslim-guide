# Learn, re-threaded — tiers, units, one direction

**Status: PROPOSED, 30 Aug 2026. Nothing here is built.** This is the plan
Iyad commissioned after the Learn-tab audit of the same day; every decision in
it was made in that conversation and is recorded here for red-penning before
any code is written. When a decision here changes, change it here.

Method: every claim about current behaviour was read from the file and line
named. Nothing in this plan was verified on a screen.

---

## 1. The diagnosis, in one paragraph

The Learn tab runs two parallel orderings of the same content — the journey
(6 stages, its order, `src/content/journey.ts:79`) and the shelves (5 groups,
another order, `src/content/learn/index.ts:177`) — stacked on one screen, each
numbered as if it were the path. Meanwhile the curriculum went stale: 22 of
the ~45 teaching pages (jumuʿah, minimum-prayer, adhan, janazah, the vices…)
were written in phases 9–13 and never threaded into any stage, so the
"Continue" chain can never reach them. Two directions is no direction. The fix
is one sentence: **the path is the only path, the library is only a library.**

## 2. The model: tier → unit → lesson

Three **tiers**, named for a time of life, never a rank. Each tier holds
**units** — named clusters of 2–6 lessons, one week's worth. A **lesson** is
one existing page, one sitting (5–10 min). Units are lists of `ContentRef`s
over the same catalogue, exactly as `JOURNEY` is today — pages are never
merged, because completion, citations, translations, Ask deep-links and the
library all ride on page granularity.

Decisions made 30 Aug, Iyad's answers on the record:

- **Nothing is ever hidden or locked.** Later tiers render collapsed but
  fully alive — title, purpose line, count — and a tap opens everything,
  readable today. De-emphasise, never withhold. Grayed-out is the visual
  language of a lock; nothing is grayed.
- **One universal order** (creed-first, below). Confidence — the existing
  `teach-me / need-words / on-my-own` rungs of `lib/competence.ts` — no
  longer reorders anything; it decides which tier sits open and where
  "Continue" starts. `STAGE_ORDER` and `GROUP_ORDER` are deleted.
- **Tier names:** *Your first weeks* ("until you can pray on your own") ·
  *The life that follows* ("for the questions life brings") · *Going deeper*
  ("depth in what you already do").
- **The library moves to its own screen** behind one quiet row on Learn
  ("Browse by situation"). The five by-moment groups survive unchanged there;
  the Learn tab itself carries only the path and the reference shelf.
- The old counter-argument to creed-first — "someone who converted last night
  must pray tonight" — is served by Today's prayer card, which already opens
  the right prayer directly (`src/app/pray.tsx:26`). The curriculum can
  afford to be creed-first because the urgent path does not run through it.

## 3. The curriculum map

⚠️ Every unit assignment below is proposed, not decided. One page is NEW and
must be written from sources and reviewed before it ships — it is the only
new religious content this plan commissions.

### Tier 1 — Your first weeks (6 units, 27 lessons)

| # | Unit | Lessons, in order |
|---|---|---|
| 1 | **Becoming Muslim** | guide:shahada · what-is-islam · pillar:salah *(label: The Five Pillars)* · article:allah *(label: The Six Articles)* · your-name · life-before |
| 2 | **Who you follow** | who-is-allah · who-is-muhammad · what-is-the-quran · sunnah · rulings *(the five categories — placed here because it changes how every later "should" is read)* — door: collection:quranic-names |
| 3 | **How to pray** | guide:wudu · guide:ghusl *(label: The full wash)* · before-prayer · **how-prayer-works ⚠️ NEW** · minimum-prayer · al-fatihah |
| 4 | **When it goes wrong** | what-breaks-prayer · lost-count · missed |
| 5 | **Praying with others** | adhan · behind-an-imam · mosque · jumuah |
| 6 | **Everyday words** | phrase:salam *(label: Phrases)* · dua-and-dhikr · hisn:1268971 *(label: Everyday duʿas)* |

**The NEW page, "How prayer works":** the one lesson that says what
`buildPrayer` already encodes (`src/content/prayers.ts`) — prayer is one
rakʿah learned once, three joints (opening, middle sitting, closing), and
every prayer is a count: 2 · 4 · 4 · 3 · 4, aloud or silent. It replaces the
per-prayer journey steps (`pray-fajr`, `pray-maghrib`). The five guides stay
untouched: they are the instrument followed on the mat, not lessons.

### Tier 2 — The life that follows (5 units, 21 lessons)

| # | Unit | Lessons, in order |
|---|---|---|
| 1 | **Eating, wearing, earning** | halal-and-haram · food · clothing · work |
| 2 | **People** | family · manners · marriage-shape · a-partner-already · teaching-someone · janazah |
| 3 | **Meeting other Muslims** | why-people-differ · being-corrected *(2 lessons — deliberately thin; this is the unit new material joins)* |
| 4 | **The year** | islamic-calendar · ramadan · fasting-alone · eid · voluntary-fasting · pillar:zakat *(label: Zakat — door: the /zakat calculator)* |
| 5 | **When it's hard** | repentance · if-you-stopped · patience-and-gratitude |

### Tier 3 — Going deeper (3 units, 10 lessons + doors)

| # | Unit | Lessons, in order |
|---|---|---|
| 1 | **Prayers you choose** | witr · tahajjud · qiyam-al-layl · istikhara · tawba-prayer |
| 2 | **The interior life** | anger · showing-off · arrogance · envy |
| 3 | **Practices to take on** | small-sunnahs — doors: the 99 names (collection:quranic-names, one-a-day) · Qurʾan memorisation (→ Qurʾan tab). Where meaning-of-what-you-say and the sīrah land when written. |

⚠️ Unit 1 partially reverses the 26 Aug decision that the voluntary prayers
live only in the `/pray` chooser (`src/content/learn/index.ts:337`). The
chooser remains the comparison; the unit is the path through them. Both jobs
are real and neither surface does the other's.

### Elsewhere, deliberately — the check's allowlist

tayammum, seated, travelling, periods (situational → help/Ask and the
library) · the five prayer guides and the voluntary guides (instruments,
reached from Today and the chooser) · collection:quranic-duas (library and
the Duʿa tab).

**Dropped as steps:** `pray-fajr`, `pray-maghrib` (replaced by
how-prayer-works) · `article:last-day` "hereafter" (opens the same /iman
screen the Six Articles step already opens — a duplicate).

## 4. The screens

### Learn tab (new anatomy, top to bottom)

1. ʿUnwān header — unchanged.
2. Shahada hero / keepsake line + Firsts row — unchanged.
3. **Where you are** — now names the current *unit*, arches are the units of
   the open tier, up to three remaining lessons listed. Same card, new spine.
4. Carry-on reading row — unchanged.
5. **Three tier sections.** The open tier expanded: one jadwal row per unit
   (rosette numeral, unit name, purpose, `n of m`, progress hairline). The
   other two collapsed but alive: name, purpose line, lesson count, chevron —
   never grayed. Confidence seeds which tier opens (teach-me / need-words →
   tier 1, on-my-own → tier 2); completion moves the star.
6. **"Browse by situation"** — one quiet row → the library screen.
7. Reference shelf — plus one new row: **Every prayer** → `/pray`, so the
   farḍ/sunnah table never sinks with a shelf again.

The tab drops from ~50 rows to roughly a dozen.

### Unit screen (new, replaces `/journey/[stage]`)

The unit's purpose line, then its lessons as rows — title, description, done
tick, the undo checkbox exactly as the stage screen has it
(`src/app/journey/[stage].tsx:59`). "Continue" logic unchanged in kind:
first unfinished lesson from the open tier onward.

### Library screen (new, `/library`)

The five by-moment groups exactly as the shelves render today — moved, not
redesigned. Fixed order (no confidence sort; a lookup surface has no "now").
Shelf counts fixed to count rendered rows, specials included.

### Every prayer — `/pray` widened (decided 30 Aug)

The chooser's job widens from choose-before-praying to **the map of every
prayer**, in four bands:

1. **The five** — name, when, rakʿahs, sunnah before/after, plus one new
   column `buildPrayer` already knows: **aloud or silent**.
2. **The week and the year** — Jumuʿah (2, replaces Dhuhr), Eid, janāzah.
   Counts and "when" extracted from their existing pages; no new writing.
3. **Prayers you choose** — the five rows, each opening its page. Special
   words (the istikhāra duʿa) stay on the prayer's own page — the map
   points, it never duplicates, because a duʿa printed twice is two places
   for a correction to miss.
4. **When it's different** — pointer rows into existing pages: praying
   seated, missed prayers, travelling.

NOT on the map, named rather than smuggled: duha (no page exists) and any
shortening-rules detail beyond what the travelling page already says —
either is commissioned content for the review pile if wanted.

Reached three ways: a row at the foot of the **Awqat screen** (one tap from
where a prayer-minded person already is, without touching the card), the
reference-shelf row on Learn, and the links the chooser already has.

### Awqat card (mockup first — the card's design is Iyad's)

Two candidate lines, drawn in ONE mockup pass, shipped only as approved on
sight:

- **Witr, after ʿIshaʾ — decided in principle, 30 Aug.** A line that exists
  only while the window is open: "Witr — before Fajr →". A window statement
  is a ruling: it is read from the witr page's own text and joins the
  review pile.
- **Rawatib counts on the current prayer** ("+2 before · 2 after") — still
  proposed, not decided.

The night slot for tahajjud/qiyām is **REJECTED** (Iyad, 30 Aug) — only
witr earned the card. Decided; not to be re-raised.

### Trigger-moment doors (decided 30 Aug)

Tawba and istikhāra are event-summoned, not clock-summoned. The repentance
and if-you-stopped pages each end with a door — "There is also a prayer for
this →" — to the tawba prayer; istikhāra is doored from the chooser and
Ask. This, plus tier 3's unit, is how the event-bound prayers stay part of
the process.

## 5. The audit findings this folds in

1. **Shahada seam** — one shared predicate: `guide:shahada` counts as done
   when `shahadaState` is `recently`/`a-while` OR the lesson is ticked. Used
   by both the ShahadaCard (`learn.tsx:167`) and the curriculum, so the two
   surfaces can never again disagree about the same fact.
2. **Shelf count lie** (`learn.tsx:550` — header says `group.topics.length`,
   rows are `[...specials, ...topics]`) — fixed in the library screen by
   counting what renders.
3. **Stale curriculum** — §3 is the fix; every teaching page is threaded or
   named in the allowlist.
4. **Four unmarkable steps** — `/iman`, `/phrases` and the everyday-duʿas
   screen get the `LessonScroll` treatment `/pillars` already has
   (`src/app/pillars.tsx:18`), with keys `article:allah`, `phrase:salam`,
   `hisn:1268971`. The hereafter step is dropped (duplicate, above).
5. **Done-marks** — lesson rows in unit view show done state (the stage
   screen already does); library rows stay unmarked — a library is not a
   report card.

## 6. Mechanics

- `src/content/curriculum.ts`: `Tier = { id, units }`,
  `Unit = { id, lessons: JourneyStep[], doors?: ContentRef[] }`. `JOURNEY`,
  `STAGE_ORDER`, `GROUP_ORDER` deleted; `stepKey` and `Requirement` survive.
- `useCurriculum` replaces `useJourney` — same resolution and dedup logic
  (`use-journey.ts:82`), shapes are tiers/units. Consumers: Today's carry-on
  (`use-today.ts:88`, reads only `next`), WhereYouAre, the tier/unit screens,
  `LessonEnd.after`.
- The done predicate lives beside the curriculum and takes
  (`completedLessons`, `shahadaState`).
- Confidence promotion logic untouched (`lib/competence.ts`) — it now maps to
  the open tier instead of a stage order.
- i18n: tier/unit title+purpose keys are new; stage keys retire. `npm run
  i18n:manifest` after; FR/ES fall to English with `TranslationGap` until
  translated.

## 7. Checks that fail

Extend `content:audit`:
- every teaching-surface entry is in exactly one unit OR the allowlist, with
  a reason string — a page missing from both fails the build;
- a unit outside 2–6 lessons warns (tier 3's practices unit is allowlisted);
- every tier/unit i18n key exists in `ui.ts`.

## 8. What this removes

- The six-stage journey and both order tables (`STAGE_ORDER`, `GROUP_ORDER`).
- The five by-moment shelves from the Learn tab (moved to `/library`).
- `pray-fajr` / `pray-maghrib` as lessons; the hereafter duplicate step.
- The ~50-row Learn wall, and with it the shelf-count bug's habitat.
- The premise that confidence reorders content.

Named sunk cost: the shelf grammar on Learn (rosette-numbered topic rows,
built 30 Aug) is partly retired weeks after landing. The components survive —
units use the same `JadwalRow`/`Rosette`/`Shelf` anatomy — but the layout
they were tuned for goes.

## 9. Build order — the pilot rule

1. ✅ Built 30 Aug. **Data + checks, no UI.** `curriculum.ts`, the done
   predicate, the audit extension. `tsc` and `content:audit` green — 58
   lessons, 57 resolving, coverage complete on the first run.
2. ✅ Built 30 Aug, **awaiting Iyad's eyes.** The Learn tab with tiers and
   the library screen, screenshotted in both themes from the static export
   (headless Chrome over CDP; the Playwright browser was held by another
   session). Also built here because rows must lead somewhere: a minimal
   `/unit/[id]` adapted from the stage screen, and Today's `next` switched
   to the curriculum so the two surfaces cannot disagree. Seen on screen:
   the shahada answer now advances the path (finding 1), and the library
   counts match their rosettes (finding 2). Open question for Iyad: with
   the shahada unsaid, "Becoming Muslim" is the hero, the unit title AND
   the first left-in-chapter line — the unit and its first lesson share a
   name, and one of them may deserve a different one.

   **31 Aug, after Iyad's device pass:** the in-place accordion is gone —
   expanding a tier collapsed the one above and the page shifted under the
   reader's finger. Collapsed tiers are now doors to `/tier/[id]` (a screen
   cannot jump). One spine: the where-you-are card and its tier's unit rows
   are one section, always the tier the reader is in — the card for one
   tier above a different tier's rows was two spines with equal claim and
   most of what "blended". Rosettes now mark the path alone (the reference
   shelf is unnumbered, Browse-by-situation folded into it), and the tier
   shelf dropped its count, which was wrapping the label on his screen.
3. ✅ Built 31 Aug. `LessonEnd` walks the curriculum (its "next" and the
   tab's can no longer disagree); `/iman`, `/phrases` and the duʿa-book
   occasions mark themselves by scroll; the journey is GONE — screens,
   tables, hook, `STAGE_ORDER` and `GROUP_ORDER` — with `stepKey` and the
   step types now living in `curriculum.ts`. The doors went further than
   planned: `relatedContent` had been data no screen read, so reference
   pages now render it as quiet rows before the next-lesson button —
   repentance and if-you-stopped door to the tawba prayer through their own
   metadata. The "Becoming Muslim" collision is resolved: the unit is
   **"Where you begin"** (Iyad, 31 Aug); ids unchanged.
4. ✅ Built 31 Aug, half of it. `/pray` is the **Every prayer** map: the
   five carry an aloud/silent phrase from `aloudRakahs`, and two new bands —
   the week and the year (Jumuʿah, Eid, janāzah) and when it's different
   (seated, missed, travelling) — extraction only, each row the page's own
   reviewed words. The Awqat card mockup (witr line + rawatib line) is
   drawn and delivered; **no card code ships until Iyad rules on it.**
5. ✅ Written 31 Aug — `learn/how-prayer-works.ts`, ⚠️ flagged, substance
   unreviewed. Structural claims restate what the app already ships; its
   one citation is Bukhari 757 REUSED from minimum-prayer where it was
   verified. `COMMISSIONED` is empty; the audit's stale-commission check
   forced the declaration off the day the page landed. Still owed: the
   qualified-reader pass before public release, like every learn/ page.

## 10. Cost, plainly

One new religious-content page to write and review. A batch of new UI strings
that drop FR/ES to English until retranslated. A deliberate partial reversal
of the chooser-only decision for voluntary prayers. All of it is `src/` —
ships OTA via `npm run update:preview`, no native change, no migrations.
