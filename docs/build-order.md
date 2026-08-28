# The build order

**One plan for everything.** Fourteen phases in four stages, merging
`docs/learning-model.md` (the content research) and `docs/expansion-plan.md`
(the API evaluation), and closing the six execution gaps that neither carried.

Written 28 August 2026. Checked by `npm run plan:check`, which fails if a gap
named in either source document has no phase here, if a `file:line` these
documents cite has gone stale, if a quoted measurement no longer matches, or if
the table below disagrees with the body.

---

## The two findings that drive everything

- **The app is three hours long.** 123 minutes of journey across 36 lessons,
  186 minutes across every teaching page. A motivated reader finishes it in a
  weekend, and the app has no idea what to do with them on Monday.
- **Twenty onboarding answers produce three app states.** The personalisation
  engine is 236 lines that no screen calls.

**Nothing below is a rebuild.** Two screens change, one field is added, one
dead file is deleted, and new content lands beside the old.

**Untouched throughout**, and the reason the app is worth expanding at all:
`buildPrayer` and `PRAYER_SPECS`, offline prayer times and qibla, the Qur'an
tab and juz 30, Hisn al-Muslim's 132 occasions, `lib/adhkar-window.ts`, the
verification apparatus, and every word of the 69 existing teaching entries.

---

## What the three tiers are, and which phases build them

The research found the app is an excellent instructor, a partial companion, and
not an instrument at all. Those are **not difficulty bands** — a convert's
knowledge is jagged rather than layered, so nothing here gates content by tier
and nothing is hidden from anyone. They are three different jobs the app does,
and this table is what the fourteen phases add up to.

| The job | What it is | Built by |
|---|---|---|
| **Instructor** — weeks 0–8 | Tells you what to do next, in order. Already good; five pages missing. | Phase 9 |
| **Companion** — months 2–24 | Meets you at the moment life produces a question. Needs event-shaped content *and* something to surface it. | Phases 1, 4, 6, 8, 11 |
| **Instrument** — year 2+ | Depth and maintenance in what you already do, and a Today that stops instructing. | Phases 2, 4, 7, 13 |

The model is not invented here. It comes from what convert programmes and
research actually report — Yaqeen's survey of 618 converts arguing the shift
from conversion to post-conversion care, ISPU on converts feeling unrecognised
in Muslim spaces, *Being Muslim*'s chapter structure, and the SeekersGuidance
ladder, which is the level model this deliberately rejects. All cited in
`docs/learning-model.md`.

### ⚠️ The honest limit on "companion"

The research promised content that arrives *at the moment life produces the
question*. Most of it cannot, and the plan should not pretend otherwise.

- **What can trigger it.** The Hijri calendar, which is the only trigger the app
  has today (`use-today.ts` reads `seasonFor` and nothing else) — Ramadan, Dhul
  Hijjah, Muharram. Friday, weekly, for Jumuʿah. And a First becoming available,
  from Phase 6.
- **What could trigger it, and needs a decision.** The app already holds
  `coords` for prayer times and qibla, so it could notice you are a long way from
  home and offer the travelling page — which today is reachable only by browsing
  to it. That inference stays on the device and calls nothing, but it is the app
  noticing something about your life rather than your taps, and that is Iyad's
  call rather than mine. **It is deliberately in no phase until he makes it.**
- **What cannot, and must not be faked.** A death. A relapse. Being corrected at
  the mosque. A question from a partner. The app cannot know these, and the only
  routes to guessing are surveillance or noticing absence — one is ruled out by
  the offline promise and the other by `index.tsx:43`.
- **So for most of tier two, "companion" means a narrower thing:** the page
  exists, it is written for that moment rather than as a reference article, and
  Ask finds it in one search. That is a reference that is *ready*. It is less
  than the research's phrasing implies, and saying so here is cheaper than
  discovering it in Phase 11.

## What this plan is not about

**Audio, which is the actual release gate.** Twelve clips are wired to live
prayer steps with no file behind them, briefed in
`docs/audio-recording-brief.md`, and the binding constraint is a reciter rather
than a developer. Finishing Phase 13 does not mean the app can ship. This is
stated here because a plan this long, read end to end, would otherwise imply
the opposite.

**Anything that has been seen on a screen.** The research behind this was read
out of source, not observed — the preview browser was held by another session
throughout. Every phase that changes a screen therefore carries a hard stop.

---

## At a glance

| # | Phase | Ships | Eyes |
|---|---|---|---|
| **A** | **Foundations — nothing visible** | | |
| 0 | The import gate | build tool | — |
| 1 | Cadence: the field, the backfill, the check | OTA | — |
| 2 | The `collection` kind and the provider registry | OTA | — |
| **B** | **The pilot pair — stop and look** | | |
| 3 | The 99 names | OTA | **stop** |
| 4 | Today and Learn | OTA | **stop** |
| **C** | **What the app knows about you** | | |
| 5 | Observation | OTA | yes |
| 6 | The Firsts | OTA | yes |
| 7 | Onboarding: two facts, not two identities | OTA | yes |
| 8 | Ask that can answer | OTA | yes |
| **D** | **Content, paced** | | |
| 9 | The five tier-one gaps | OTA | review |
| 10 | Duʿas from the Qur'an | OTA | review |
| 11 | Jumuʿah, then the tier-two set | OTA | review |
| 12 | Zakat, with a dated nisab | OTA + script | review |
| 13 | The tier-three collections | OTA | review |

**No phase needs a native build.** Everything is `src/`, `assets/` and scripts,
so all of it rides `npm run update:preview`. No server, no migrations, no
account.

---

# Stage A — Foundations

*Nothing visible ships. Each phase here makes every later one cheaper, and none
of them can usefully be reordered.*

### Phase 0 — The import gate

*The one piece of infrastructure that makes every source safe to use. Build it
first and build nothing else until it works — it is the asset; the APIs are
interchangeable.*

- **`npm run verify:import`, a script that answers three questions.** Given
  Arabic text and a citation: does the citation resolve, **in which numbering**,
  and does the text at that reference actually match? Nothing reaches
  `src/content/` without passing.
- **Match on a consonantal skeleton with a shared run of ten words.** Not
  equality and not containment — publishers genuinely differ, one printing the
  isnad where another prints only the matn. This is the method
  `generate-evidence.mjs` already uses, reused rather than reinvented.
- **Self-test the comparator before reporting anything.** A verification run
  during the API evaluation was void because its character range was
  `U+0610–U+064B`, which swallows the entire Arabic alphabet — it compared empty
  strings and reported a plausible number. The gate asserts on known input
  before it will emit a result.
- **Normalise the orthography the app already knows about.** Alef wasla
  (`ٱ`, U+0671, outside the `ء-ي` range), superscript alef, hamza-alef versus
  madda alef, alef and ya and ta-marbuta variants, Uthmani versus Imlaei. Each
  of these silently broke a comparison during the evaluation.
- **Report a numbering mismatch as a numbering mismatch.** Muslim 234, cited for
  the duʿa after wudu, resolves in this repo's corpus to a narration about rain.
  "Wrong text" and "other numbering" are different diagnoses and the gate must
  say which.
- **Use fitrahive/dua-dhikr (MIT) as the cross-check for exactly that case.**
  Its citations carry Muslim's sub-numbering — `Muslim No. 2723 (75)` — which is
  what disambiguates it. A reference, never a content feed.
- **Exclude non-hadith authorities by rule, not by eye.** One duʿa in the Pray
  API is sourced to a Naqshbandi shaykh. A human filter will miss the second one.

**Done when** it exits zero on a citation known to resolve, non-zero on Muslim
234, its self-test passes, and it names those two failures by the right
diagnosis.
**Ships via** nothing — a build tool.

### Phase 1 — Cadence: the field, the backfill, the check

*Content currently has two possible states, a task or a monument. This gives it
a shape in time, which is what lets screens place content written after them.*

- **Add `Cadence`.** Six values: `once` (read it and it is yours),
  `until-fluent` (needed until it is not), `daily` (forever), `yearly`
  (returns with the calendar), `on-event` (invisible until it happens),
  `keepsake` (rarely, and never removed).
  ⚠️ **Built as a table, not a field on `ContentMeta`**, which is what this
  said until 28 Aug 2026. `meta` is present on 52 of the 201 catalogue
  entries: the other 149 are the 132 occasions of Hisn al-Muslim, which live
  in a generated file that says do not edit by hand, and 17 phrases and
  situational pages carrying no `meta` at all. A field there would have
  answered for a quarter of the catalogue and needed a second mechanism for
  the rest. The type is in `model.ts`; the values are in `src/content/cadence.ts`,
  which is the arrangement `duas/moments.ts` and `duas/annotations.ts` already
  use for editorial judgements about the same generated rows.
- **It decides placement, not presentation.** That is the whole difference from
  `Requirement` in `journey.ts:38`, whose own comment scopes it to how a step
  "is presented". All six rules, because the placement *is* the feature:
  - `once` — appears in Learn; leaves Today permanently once met.
  - `until-fluent` — drives Today's primary action while it is needed, then
    collapses to a link. This is what turns "Pray now Fajr · 23 steps" into
    something else for someone who has prayed a thousand Fajrs.
  - `daily` — permanent on Today, and **never counted as journey progress**;
    you do not finish the morning adhkār.
  - `yearly` — surfaced by `seasons.ts` and nowhere else.
  - `on-event` — off the shelf entirely, reachable from Ask and Help. This alone
    takes about six pages out of Learn without losing anything.
  - `keepsake` — one line, never a hero.
- **Backfill all 201 catalogue entries.** This is the bulk of the phase and it
  is an editorial decision per entry, not a mechanical migration — 69 teaching
  entries and 132 duʿa occasions. Budget for it; it is why this phase is not an
  afternoon.
- **Make `content:audit` exit non-zero on any entry with no cadence.** Per the
  strongest rule in `CLAUDE.md`: prefer a check that fails over a rule to
  remember.
- **Delete `recommendationsFor` and `recommendedRefs`.** 236 lines in
  `recommendations.ts`, exported at `src/content/index.ts:22-24`, called by no
  screen. Keep `pendingRecommendations`, which the audit script uses.
- **Delete `ENTRY_BY_STAGE` (`journey.ts:171`).** Unreachable: `entryStageIndex`
  prefers interest, and onboarding cannot produce interest-null with stage set.

**Done when** every catalogue entry declares a cadence, `content:audit` fails if
one does not, both dead exports are gone, and `tsc --noEmit` is clean.
**Ships via** OTA, with no visible change.

### Phase 2 — The `collection` kind and the provider registry

*The highest-leverage structural decision here. Five bodies of content this plan
adds are the same shape; making them one kind pays the cost once instead of five
times.*

- **Add one `ContentKind`: `collection`.** An ordered set of short entries, each
  with a title, optional Arabic and transliteration, a translation, and a
  source. The 99 names, the duʿas from the Qur'an, the sīrah episodes, the vices
  and virtues, and the small sunnahs are all instances of it.
- **Pay the `ContentKind` cost once.** Seven files would change for a seventh
  kind: `model.ts`, `catalog.ts`, `content-routes.ts`, `search.ts`, `index.ts`,
  `learn/index.ts` and `learn.tsx` — plus a new screen and the audit scripts
  that read the catalogue.
  ⚠️ **This said seventeen until 28 Aug 2026, and the correction is kept
  rather than swapped**, because the wrong number priced this phase. The check
  behind it matched any `kind === '` in the repo, and thirteen of its
  seventeen hits were unrelated fields — `Source.kind` in `source-list.tsx`
  and four scripts, `ContentNote.kind` in the reference screens,
  `fard`/`voluntary` in `prayers.ts`, `screen`/`content` in `use-help.ts`.
  None of them would move for a new ContentKind. **Phase 2 is roughly a third
  of the size the plan claimed**, which is worth knowing before it is
  scheduled. Found while adding Phase 0, whose own `Source.kind` branch tripped
  the check and exposed it; `plan-check.mjs` now counts ContentKind proper.
  **Built 28 Aug 2026, and the prediction is kept beside the outcome.** Seven
  was the count of files naming a kind value, and it was right: adding
  `collection` made it nine — `types.ts` for the shape, and the new screen. The
  whole job was **11 files, four of them new**: the type, the shape, the
  registry, the collections directory, the catalogue, the route, the search
  index, the screen, the UI labels, and two scripts. The grep only ever sees
  the files that name a kind, which is a good proxy and not the job.
- **One screen renders every collection.** A collection's identity is data; no
  component may switch on which collection it is, or the cost is being paid
  again in disguise.
- **Add `src/content/providers.ts`.** One row per body of content, declaring
  origin, fetch script, verification method, licence and required attribution.
  Today that knowledge is split across `sources.ts`, `text-sources.ts`,
  `audio-sources.ts` and four generators, and nothing states it in one place.
- **The provenance rule scales from texts to collections.** `EvidenceText`
  already carries `arabicFrom` and `translationFrom` per text, because a credit
  detached from what it credits gets lost when the thing moves. The registry is
  that same rule for a whole body of content.

**Done when** a second collection can be added with a data file and a registry
row and no code change — demonstrated by adding a throwaway one and deleting it.
**Ships via** OTA, with no visible change.

---

# Stage B — The pilot pair

*Two changes, deliberately as unalike as possible: one brand-new collection, one
change to the two most-used screens. Both stop for eyes. Nothing in Stage C
starts until both have been looked at, in both themes, at phone width.*

### Phase 3 — The 99 names

*The first collection, chosen because it is short, low-risk, and fills a
tier-three gap the research named. It exists to prove Phase 2 end to end.*

- ~~**Source: AlAdhan `asmaAlHusna`.**~~ **Not used. Built 28 Aug 2026 from
  QuranEnc instead, and the feature changed shape.** The enumeration question
  below was answered by calling the sources, and the answer was worse than the
  question assumed:
  - The **statement** that Allah has ninety-nine names is authentic — Bukhari
    2736, Bukhari 7392, Muslim 2677.
  - An enumerated **list** appears in only two places, **Tirmidhi 3507** and
    **Ibn Majah 3861**, and the two do not agree. Tirmidhi has al-Quddūs,
    al-Ghaffār, al-Qahhār and al-Fattāḥ where Ibn Majah does not; Ibn Majah has
    al-Qāhir, al-Qarīb, ar-Rabb and al-Mubīn where Tirmidhi does not.
  - **Tirmidhi 3507 is graded Ḍaʿīf by all three graders** the corpus carries.
  - **AlAdhan publishes the Tirmidhi list** — 97 of its 99 occur in Tirmidhi
    3507 against 73 in Ibn Majah 3861. So the fallback below still shipped the
    weak enumeration with the label filed off.
  - Separately, AlAdhan's English is not publishable here: inconsistent
    capitalisation, two renderings crammed into one field, a typo in #84
    ("Soverign"), and it contradicts the four names `learn/who-is-allah.ts`
    already gives in the app's own register.
  - A mechanical rule — include a name if it occurs in the Qur'an — was tried
    and fails: matching against all 6,236 ayahs returns al-Ḥaqq 181 times
    because الحق usually means "the truth", and al-Muʾmin 120 times by catching
    المؤمنون. Which occurrences NAME Allah is exegesis, not a rule a script can
    hold.
  **First decision: Qur'anic names only** — 14 entries from 59:22–24, the
  passage where the Qur'an enumerates them itself.
  **Superseded the same day.** Iyad supplied *Al-Asmāʾ al-Ḥusnā* from
  www.99NamesofAllah.name, which answers the objection rather than sidesteps
  it: the source **states its own methodology** on its own page — that the
  enumerated list in Tirmidhi and Ibn Majah is an addition from later
  transmitters rather than the Prophet's ﷺ words, and that its names are
  derived from the Qur'an and authentic Sunnah following Ibn al-Qayyim,
  Al-Ghazali, Ibn Hazm, Al-Qurtubi and Abd al-Razzaq al-Badr. It also states
  that Allah has more names than ninety-nine. That is the provenance AlAdhan's
  bare list did not have. Its transliteration is also in the app's own scheme.
  ⚠️ **Its ninety-nine are the same ninety-nine, in the same order, that
  AlAdhan publishes from Tirmidhi** — checked name by name. The difference is
  the justification and the English, not the membership; worth knowing rather
  than rediscovering.
  ⚠️ **Its Arabic column is not machine-readable** — the PDF text layer
  reverses it — so the vowelled Arabic comes from AlAdhan and is matched by
  transliteration AND position, with a shift check, because a wrong pairing
  would put one name's Arabic under another's meaning and read perfectly.
  97 of 99 spellings are confirmed against Tirmidhi 3507 in the local corpus,
  a second independently edited witness. 14 of the 99 carry a verse citation,
  because the Qur'an lists them itself in 59:22–24.
- **In Learn as well as on Today.** `docs/learning-model.md:268` files the
  names under **tier three — year two and after**, and argues the shape "suits
  a card on Today better than a page in Learn". Both, in the end: the card
  carries the daily practice, and a row in "What you believe" makes the page
  findable at all — without it the only routes in were that card and Ask.
  `beginnerPriority: 5`, `difficulty: 'deeper'`.
- **Cadence `daily`: one name on Today, one screen for the set.** Reading one a
  day is a three-month practice, which is the kind of long-tail content the app
  has none of.
- **It proves the collection kind, not the content pipeline.** If adding this
  requires touching a screen that should not know about it, Phase 2 is not done.
- **⚠️ Blocked on the reviewer: which enumeration.** The list of 99 is itself a
  scholarly matter — Tirmidhi's is one, and scholars differ on which names
  belong. Either the reviewer names the list, or the collection presents the
  names without claiming a canonical ninety-nine. **The fallback is the second
  option**, so this phase is never blocked indefinitely.

**Done when** the set renders, one name appears on Today, and either the
reviewer has cleared the enumeration or the screen makes no canonical claim.
**Done 28 Aug 2026**, on the second limb: the screen claims only what the
Qur'an says, and both screens were looked at on a 393pt phone in both themes.
Still for the reviewer: whether presenting these fourteen, framed this way, is
right — and `docs/scholarly-review.md` is where that sits.
**Ships via** OTA. **Then stop.**

### Phase 4 — Today and Learn

*The two screens the research is actually about. Everything here rearranges
things the app already has; nothing new is written.*

- **Today: the adhkār sitting fills the words slot when the clock is in one, the
  duʿa card otherwise.** One slot, not two cards. `lib/adhkar-window.ts` already
  computes the current sitting from real prayer times and renders only on the
  Duʿa tab — the morning adhkār is seven minutes someone says every day of their
  life, and Today has never mentioned it.
- **Today: the primary prayer action changes shape with competence.** Week one
  wants a 23-step walkthrough; year three wants the time, the qibla, and the
  surah they are working on. Today gives both the same button.
- **Today: one "worth today" slot, competed for by a single ranked function.** A
  season, a First that just became available, the surah being learned, or a
  lesson — never more than one.
- **The ranked function considers every recurring deadline, not just the
  calendar.** `use-today.ts` threw out two of three home rows on one test —
  *does it have a deadline?* — and then applied it only to lessons. These all
  pass that test and none is surfaced today: the **morning adhkār window closes
  at sunrise**, 365 times a year rather than 30; **Friday** is weekly, and
  `index.tsx:102` already computes the weekday; **witr closes at Fajr**; **the
  last third of the night** opens and closes; **a voluntary fast** has a date.
  The app already holds the prayer times and the voluntary-prayer content for
  all of them. **This is what retires the permanent journey
  card**, which the research listed as a removal and the first draft of this
  plan quietly failed to remove.
- **Learn: the shahada drops from hero to one line in the header.** Cadence
  `keepsake`. It stays reachable forever — people return to re-read the words or
  to show somebody — but "return to this a few times in your life" and
  "second-largest object on the tab forever" are not the same claim.
- **Learn: a "Where you are" card replaces the journey card.** Not a fraction:
  the chapter of life you are in, and the two or three things left in it. "6 of
  36" is a report card handed to someone three weeks into a religion.
- ~~**Learn: `on-event` pages leave the shelf for Ask.**~~ **Already true, and
  was before this phase started.** `TOPIC_GROUPS` holds zero `on-event`
  entries; the six situational pages — losing count, missing a prayer,
  travelling, praying seated, periods, tayammum — are all in Help, moved there
  by an earlier change that `index.tsx`'s own header records. Phase 1's cadence
  backfill marks eleven entries `on-event`, not six; the extra five are
  istikhara and the prayer of repentance in both their guide and reference
  forms, plus the istirjāʿ phrase, and those are reachable from the prayer
  chooser rather than being emergencies. Nothing to do.
- **Help chips and the header stay as they are.** The chips retire into Ask when
  Ask can answer, which is Phase 8, not now.
- **⚠️ Not building: the travelling trigger.** The ranked slot above is where a
  location-based offer would go, and the app already has the coordinates. It is
  left out pending Iyad's decision — see "The honest limit on companion". If he
  says yes it is one more candidate in the same ranked function, not a new phase.

**Done when** both screens have been seen at phone width in both themes, the
adhkār sitting appears inside its window and the duʿa card outside it, and the
six situational pages are gone from the shelf but still reachable.
**Done 28 Aug 2026.** Today was tested at four clocks — after Maghrib in
London, Friday before Ḏuhr in Los Angeles, 3am in Singapore, and away from
home — and Learn in both shahada states, all at 393pt in both themes.

⚠️ **Not built: the competence-shaped prayer action.** There is no honest
signal for it yet. Only 5 of 36 lessons self-mark, so it would key off a
checkbox almost nobody ticks. Phase 5 records what the app observes and Phase 7
makes onboarding ask facts — and *"a simulated month of prayer completions
changes the primary action with no prompt"* is Phase 7's own done-when, not
this one's. Building it here means guessing at competence.

⚠️ **Departed from the plan on the shahada.** It says the hero drops to a
header line, full stop. It now drops to a line **once it is done**, and stays a
hero while it is not — `learn.tsx`'s own header records why the card exists at
all: someone who has not said the shahada was previously unable to tell it from
the six topics below it. Flattening both states would have fixed the wrong one.
Cadence `keepsake` is what it BECOMES.
**Ships via** OTA. **Then stop.**

---

# Stage C — What the app knows about you

*The app stores three fields and discards everything it observes. This stage
gives it something honest to personalise from, then uses it. Every phase here is
on-device: no network call, no account, no server.*

### Phase 5 — Observation

*Before the app can act on who someone is, it has to notice. It currently
watches a great deal and records almost none of it.*

- **Record what the app already sees and throws away.** Which guides were
  finished and when — only guides self-mark today, at `guide/[id].tsx:125`, and
  that is 5 of 36 journey lessons. Which adhkār sittings were completed. Which
  surahs were played and recited covered. Days since install.
- **Reading a lesson must advance the journey.** Today, 31 of 36 lessons can be
  marked done only by a checkbox at `journey/[stage].tsx:61`, so reading "What
  is Islam?" three times from Learn leaves the app certain you never started.
- **Log every Ask search that returned nothing.** The highest-value untapped
  signal in the repository. Every failed search is a content gap with a name on
  it, and Phase 8 consumes this log.
  ⚠️ **The two examples this plan names no longer miss.** Built 28 Aug 2026 and
  tested: "I farted" and "how do I decide" both return results now, and the
  results are wrong — "I farted" leads with a section of *Praying while
  travelling* when the answer is in `wudu.ts` under "nullifiers". A bad match
  is a worse failure than a blank and the miss log **cannot see it**, because a
  search only counts as missed when it returns nothing. Phase 8 will need a
  second signal — a result nobody taps is not the same as no result. Corrected
  in `ask.tsx`'s own header.
- **Decide the storage shape deliberately.** Settings live in one AsyncStorage
  key, `display-settings`, narrowed field by field on read. Behavioural history
  is a different kind of data — it grows, and it may want pruning. Decide
  whether it joins that key or takes its own, and write the reason down.
- **⚠️ This is a new promise.** "The app remembers what you did" is not the same
  promise as "the app remembers what you chose." Nothing leaves the device and
  nothing should ever start to, but the distinction is worth making on purpose
  rather than by accident.

**Done when** the record survives an app restart, a network log shows nothing
leaving the device, and the failed-search log holds real entries.
**Done 28 Aug 2026**, all three checked by driving the app: an observation
written in one page was read by a second, a route interceptor recorded every
request the app made and none went anywhere but this machine, and a search that
truly returns nothing was logged.

**Storage:** its own AsyncStorage key, `observations`, not `display-settings`.
The reason is written at the top of `src/lib/observations.ts` — settings
serialise the whole object on every write, so joining them would rewrite
somebody's reminders and reciter every time they finish reading a page.
**Ships via** OTA.

### Phase 6 — The Firsts

*Replaces the lesson counter with something true of a life rather than of a
syllabus. This is what gives the app a spine reaching years instead of weeks.*

- **A ledger of firsts, not a count of lessons.** First prayer alone, first full
  day of five, first time at a mosque, first Jumuʿah, first fast, first Ramadan,
  first Eid, first time praying somewhere public, first time explaining Islam to
  someone who asked, first surah from memory, first janāzah, first zakat.
- **It never shows what is left, never dates them, and never notices absence.**
  There is no way to lose a first. This keeps intact the promise at
  `index.tsx:43` that nothing here "counts days, keeps a streak, or notices an
  absence."
- **Two mark themselves; the rest are offered.** First prayer finished and first
  surah recited covered come from Phase 5's observations. The others are offered
  honestly and at the right moment: "It's Friday tomorrow. Is this your first?"
- **Define the data model.** A first is an id plus a timestamp — or an id alone,
  if a date would invite comparison. Decide what happens on reinstall: a lost
  ledger is a real loss and there is no account to restore it from, so the honest
  answer may be that it is gone and the app says nothing about it.
- **It reaches years, not weeks.** Most people's first janāzah is a long way
  off, which is exactly why the app is still there when it arrives.
- **It is the honest tier signal.** First Jumuʿah done, first Ramadan done,
  prays without the guide — the app now knows who it is talking to from things
  that actually happened, without asking one extra question.

**Done when** a first can be marked and survives a restart, no screen anywhere
displays a remaining count, and the calendar-triggered offer fires on a Thursday.
**Done 28 Aug 2026**, all three driven rather than reasoned: a first was marked
and read back by a second page after a restart, the offer was seen firing with
the browser clock moved to a Thursday evening, and the last remaining counts —
three uses of `JourneyProgress` on `/journey` and `/journey/[stage]` — were
removed, taking the component with them. The stage cards already show a tick
when a stage is complete, so the bar was saying a second time what the list
said better.

**Data model:** id plus a timestamp, stored with the other observations rather
than in a key of its own — a first IS an observation, and two of them mark
themselves from the records already there. **The timestamp orders the ledger
and is never shown**, because a visible date invites both the comparison and
the "two years since" that `index.tsx` promises the app does not do.
**On reinstall it is gone and the app says nothing** — no restore prompt, no
apology, no "we noticed you lost your progress".

⚠️ **Ramadan and Eid are `quiet`, not `offered`**, however tempting the prompt.
`seasons.ts` settles it: months begin by local moon sighting and the Umm
al-Qura calculation differs often enough that asking "was that your first Eid?"
on the wrong day is worse than not asking. Only a WEEKDAY is safe to trigger
on, which is why Jumuʿah is the one first the app offers.
**Ships via** OTA.

### Phase 7 — Onboarding: two facts, not two identities

*Both current questions ask who someone is. Neither is checkable, both are asked
at the minute they know least, and neither is ever revisited.*

- **"Have you said the shahada?"** — not yet · exploring · yes, recently · yes,
  a while ago. Decides whether the shahada guide is the first thing on the
  screen, a lesson, or a keepsake.
- **"Can you pray on your own yet?"** — no, teach me · I need the words in
  front of me · yes. Decides the shape of Today's primary action, which is the
  most valuable personalisation available in this app and does not exist today.
- **Both are facts, and both can be re-asked.** A fact can be checked against
  behaviour; a self-description cannot. That is what makes the next item
  possible.
- **Onboarding becomes a seed, not a verdict.** After a month of finished prayer
  guides, Phase 5's observations quietly move someone from "learning" to
  "praying" and the app changes what it offers. No badge, no level-up, no
  announcement. This is `CLAUDE.md`'s own rule — prefer what the app can infer
  over what the user must configure — applied to the thing it was written for.
- ⚠️ **Not built: Learn reading `beginnerPriority`.** It is set on 53 entries
  and still read by no screen. Everything else in this phase turns on ONE
  signal — can this person pray — and re-ordering the Learn shelf needs a
  second one: how far into the religion they are. Phase 6's firsts are the
  honest source for that (first Jumuʿah, first Ramadan), and none of them can
  be marked until somebody has used the app for a season. Ordering a shelf by a
  signal that is empty for every current reader would be sorting by nothing.
  Better once the ledger has entries in it.

**Done when** answering the two questions differently produces visibly different
Today screens, and a simulated month of prayer completions changes the primary
action with no prompt.
**Done 28 Aug 2026**, both driven: "teach me" gets *Pray Fajr · 23 steps* and
the wudu line, "yes" gets *Pray Fajr* alone — and a profile that ANSWERED
"teach me" but carries 17 prayer finishes spanning 30 days gets the second one,
with nothing announcing the change.

**What the two answers replaced.** `userStage` and `initialInterest` are gone
from settings, from `journey.ts`, from `use-help.ts` and from
`recommendations.ts`, whose three tables collapsed to one ordered list — they
were keyed on questions that no longer exist, and nothing had ranked from them
since Phase 1. Seven `plan:check` citations were repointed at the successors.

⚠️ **The inference only ever raises somebody.** There is no path back down:
demoting would mean the app deciding they had got worse, which needs noticing
an absence. `competence.ts` counts finishes and elapsed time — never which
days — so nothing in it can express a gap or be drawn as a streak.
**Ships via** OTA.

### Phase 8 — Ask that can answer

*The research called Ask the app's long-term primary interface and found it
matches only the app's own vocabulary. Phase 5 logs what people ask; this phase
answers it.*

- **A build-time alias layer.** The phrasings people actually use, generated at
  build time, committed as data, matched offline. `ask.tsx:29` already diagnoses
  this: "Istikhara" lands because a guide is called that, "how do I decide" does
  not, and "I farted" does not — though `wudu.ts` answers it outright, filed
  under "nullifiers", which nobody types.
- **Seed it from Phase 5's failed-search log.** Real misses beat imagined ones.
  That dependency is why this phase sits after Observation rather than beside it.
- **Search keys are not religious content.** They need a proofread, not a
  scholar. That distinction is what makes this phase cheap relative to Stage D.
- **Then the help chips retire into the sheet.** Both already read from
  `useHelpTopics`, so there is one source and not two. The chip row comes out the
  day the sheet can answer — not before, which would trade a row that works for
  one that does not.

**Done when** the specific misses named in `ask.tsx` resolve, and the chip row is
removed from Today in the same change that makes the sheet answer them.
**Done 28 Aug 2026.** Both, and the diagnosis changed on the way.

⚠️ **The alias layer already existed.** `search-words.ts` had 33 synonym
groups, and `farted` already expanded to "passing wind". The failure was not
recall — it was two precision bugs and a ranking one:

- **`transliterationKey('fart')` is `'far'`.** The Arabic spelling bridge
  (`salaah`/`salaat` → `sala`) truncates ordinary English words into DIFFERENT
  English words, so "i farted" matched the heading *How far counts as
  travelling?*. The bridge now applies only to the word the reader typed, never
  to the app's own synonyms — those are already spelled the app's way.
- **The duʿa book was swamping the questions.** 132 occasions titled
  "Supplication for …" are nothing but keywords: "what do I say back" returned
  *Takbīr at the Black Stone*, "how do I make duʿa" returned *Dhikr after
  rainfall*. A kind weight of 0.75 fixes it without hiding anything — measured,
  not chosen: 0.6 broke "duʿa before sleeping", and 0.7–0.85 all pass.
- **Phrase aliases were one-directional.** A group member of two words could
  only match the app's text, never a typed query, because the query was split
  on whitespace first. `collapsePhrases` runs before tokenising.

⚠️ **"Seed it from the failed-search log" cannot work as written**, and this is
worth knowing before Phase 8 is called finished. Phase 5's log never leaves the
device — that is its whole promise — so no developer can ever read a real
reader's misses. The gap list here was found instead by asking the app the 27
questions its own Help chips say people ask and reading what came back, which
found five wrong answers the miss log could not have seen anyway, because every
one of them returned something.
**Ships via** OTA.

---

# Stage D — Content, paced

*Roughly twenty pages of new religious instruction — more than has ever been
written here in one go. All of it written by hand from sources; none generated.*

**The standing checklist. Every phase in this stage runs all of it:**

- **`npm run verify:import`** — Phase 0's gate, on anything imported.
- **`npm run content:verify`** — compares every Arabic text against QuranEnc and
  searches HadeethEnc for the uncited. Needs network.
- **`npm run arabic`** — lists every Arabic string in the app, with the copied
  ones separated from the model-written ones.
- **`npm run i18n:manifest`** — regenerates the sheet and fails if a locale still
  translates wording that no longer exists. **Editing an English sentence
  correctly drops its translations back to English**, which is silent otherwise.
- **`npm run style:check`** — the layout invariants.
- **A qualified reviewer.** The Priority 1 pile is cleared, not abolished.
  Nothing written by a model ships unreviewed, on text or on substance.

### Phase 9 — The five tier-one gaps

*The first eight weeks are in better shape than expected — money and telling
your family are both covered already, and well. Five things are missing, and one
may be the most valuable page the app could add.*

- **The minimum valid prayer.** The app teaches Fajr as 23 steps and never says
  "here is the least you can do today, and it counts." That sentence is the
  difference between a convert praying badly and not praying at all. Nothing else
  on this list is close in value.
- **The five categories of ruling.** Farḍ, mustaḥabb, mubāḥ, makrūh, ḥarām.
  `halal-and-haram.ts:38` already does the hardest part — that things are
  permitted by default — but without the categories a beginner reads every
  "should" in the app as a "must" and burns out inside a month. It changes how
  every other lesson is read.
- **The adhān.** Never explained anywhere; the string appears only as a Bukhari
  book name in citations. Someone hears it from a phone or a street and does not
  know it is a call rather than an alarm, or that there are words to say back.
- **"Do I have to change my name?"** One of the three questions converts ask
  most. The app is silent.
- **What happens to the life before.** Muslim 121 — "Islam demolishes what was
  before it" — currently exists only in a code comment in `shahada.ts`. Nothing
  addresses guilt, a previous marriage, children, or a past that is not going
  anywhere. This is the 1am search the app was built for.

**Done when** all five pass the standing checklist and the reviewer has cleared
them.
**Done 28 Aug 2026.** All five written, wired into Learn, given cadences and
glyphs, and `style:check` reports **0 failures and 0 warnings across all 35
teaching pages** — which it did not at first: the five arrived with label
headings instead of questions, fact labels too long for a 96px column, and
heroes promoting citations with no text behind them.

**The citations, each opened before it was printed:**

| Page | Evidence |
|---|---|
| The least you can do | **Bukhari 757**, the man who prayed badly — the Prophet ﷺ is asked to teach the prayer and lists exactly the six elements this page names. Qur'an 4:103 for the fixed times. |
| Must, should, may | Qur'an 2:29 for the default. The five categories carry a `general` basis, because they are a classification rather than a text. |
| The call to prayer | **Bukhari 611** — say what the muezzin says. |
| Do I have to change my name? | **Bukhari 6193**, Ḥazn and Sahl — and it is used because of how it ENDS: the man declined and kept his name. Qur'an 33:5 for the family name. |
| What happens to the life before | **Muslim 121**, "Islam demolishes what came before it", which was sitting in a CODE COMMENT in `shahada.ts` and on no screen. Qur'an 25:70 and 39:53. |

⚠️ **What the last page deliberately does not do.** It rules on nothing — not a
previous marriage, not children, not money earned before. Those have conditions
on them. It answers only the question underneath them, which is whether the
past disqualifies you.

⚠️ **A `general` basis cannot carry a hero.** A promoted section prints its
citation's text, and a basis statement has none — so `rulings` renders its hero
on the Qur'an citation instead. Long narrations cannot either: promoting Muslim
121 made an 1,822-character wall.
**Ships via** OTA.

### Phase 10 — Duʿas from the Qur'an

*The second collection, and the cheapest real content addition available,
because it is the only body of text in this plan that verifies automatically.*

- **The 30 Qur'anic duʿas from the Pray API.** Supplications the Qur'an itself
  puts in the mouths of the prophets.
- **They verify against QuranEnc, which `content:verify` already uses.** Seven of
  ten sampled passed on the first clean run; the three failures were the test's
  fault rather than the data's — `14:40-41` is a two-ayah span and one ayah was
  fetched. Multi-ayah spans are the only extra handling needed.
- **This is something Hisn al-Muslim does not have.** The book is
  hadith-centred, so its 132 occasions leave this gap open.
- **Skip the hadith-cited half.** It duplicates Hisn, and every Sahih Muslim
  citation failed against the corpus — 0 of 7, the two-numberings problem.
- **Exclude the Naqshbandi-sourced record by rule.** Phase 0's exclusion list,
  not a human reading 57 records.
- **⚠️ Do not build the seasonal slot on the API's `months` and `days` fields.**
  They promise calendar binding and were empty in all twenty records sampled.

**Done when** all 30 pass `verify:import` and `content:verify`, and the
collection needed no code change beyond a data file and a registry row.
**Done 28 Aug 2026 — 32 duʿas**, and two things went differently.

⚠️ **The Pray API could not be found.** This phase and `docs/expansion-plan.md`
§1.2 both describe testing it in detail — 57 records, `formula` and
`description` modelled separately, a Naqshbandi record to exclude — and
**neither document records the hostname**. It could not be found again. That is
a gap in the plan rather than in the API, and it is written into the
generator's header so nobody repeats the search.

It did not matter, because the API was only ever the LIST. Every word was
always going to come from QuranEnc — that is why this body is "fully
verifiable" — so what was missing was a set of verse references, and those are
now stated directly.

⚠️ **A mechanical rule does not work here either**, the same way it did not for
the 99 names. Searching all 6,236 ayahs for the vocative `رَبَّنَا` or `رَبِّ`
returns **215 verses**, the first of which is 1:2 — "Lord of the worlds", a
description of God rather than an address to Him. Tightening it does not help:
some of the true addresses are the pleas of the damned, which nobody is being
taught to say. So the references are written out, and every one is a
supplication the Qur'an explicitly attributes.

**No text is sliced.** The whole ayah ships, framing and all — deciding where a
supplication begins would be an editorial act on a Qur'an text, and "And
[mention] when Abraham said…" is what tells a reader whose words these are.

**Placement**, Iyad's decision: its own screen, Ask, a row in Learn, and a row
on the **Duʿa tab** beside Hisn al-Muslim — where somebody actually goes
looking for a duʿa. The tab reads `COLLECTIONS` filtered by CATEGORY, not by
id, so a future collection lands there and the branch `types.ts` forbids is
never written. **Not** in the daily coda: `dailyEntry` alternates between
`daily` collections, so a second one would mean a name one day and a duʿa the
next, and the 99 names would take 198 days to come round instead of 99.
**Ships via** OTA.

### Phase 11 — Jumuʿah, then the tier-two set

*The long middle — months two to twenty-four — is where the app is thinnest and
where converts actually leave. Everything here is event-triggered: worthless
until the week it is urgent, and then the only thing that matters.*

- **Jumuʿah first, and alone.** The largest single gap. The app mentions it once,
  at `references.ts:522`, in a note advising a first visit on a different day.
  That it replaces Ḏuhr rather than adding to it, that it is two rakʿah and not
  four, that the khuṭbah is listened to in silence, when to arrive, what to do if
  you arrive during it — none of it exists. It is obligatory, weekly, and the
  most intimidating room a convert walks into.
- **Then eight more, as a pilot of two before the rest.** Praying behind an imam
  · death and janāzah · Eid · voluntary fasting · marriage in shape · a partner
  you already have · when you slip for a month · being corrected by other
  Muslims.
- **A new Learn group, "Things that come up."** Most of these are cadence
  `on-event`, so they are reachable from Ask and surfaced by the calendar rather
  than sitting on the shelf.
- **⚠️ Ten pages is a batch, not a phase.** Two first, as unalike as possible,
  looked at, then the rest. This is the rule that thirty unlooked-at pages once
  broke.
- ~~**⚠️ Separately, for the reviewer:** `references.ts:565`~~ **Fixed 28 Aug
  2026. It was a defect.** The note told somebody arriving mid-prayer to join
  the line and follow along, and stopped — leaving them to walk out with an
  incomplete prayer. It now says to stand back up after the imam's salām and
  pray the rakʿahs they missed, on **Bukhari 636**: *"pray whatever you are
  able to pray and complete whatever you have missed."* The Jumuʿah page says
  the same thing in its own words, because that is where somebody arriving late
  to a full room will actually be looking.

**Done when** Jumuʿah has shipped and been read on its own, the pilot of two has
been looked at, and every page passes the standing checklist.
**Jumuʿah done 28 Aug 2026, and shipped alone**, as this phase requires. 36
teaching pages, 0 failures, 0 warnings. Citations: Qur'an 62:9 for the
obligation, **Bukhari 930** (the man told to stand and pray two rakʿah during
the khuṭbah), **Bukhari 934** (even telling your neighbour to be quiet is idle
talk), **Bukhari 881** and **929** (washing, and coming early), **Bukhari 636**
(completing what was missed).

⚠️ **The one exemption it states** is that Jumuʿah is not required of women,
which is agreed. It does not enumerate travel or illness — those have
conditions on them and the app has no page for them yet.

**Still to do: the pilot of two, then the remaining six.** Praying behind an
imam · death and janāzah · Eid · voluntary fasting · marriage in shape · a
partner you already have · when you slip for a month · being corrected by other
Muslims.
**Ships via** OTA.

### Phase 12 — Zakat, with a dated nisab

*The one place an API earns a key, and the first time the app prints a number
that moves.*

- **`npm run zakat:nisab` writes a dated snapshot.** Live gold and silver nisab
  from islamicapi, in 100+ currencies, offering both the classical standard
  (87.48g gold / 612.36g silver) and the common one (85g / 595g).
- **The key lives in your environment and never ships.** Their docs say never
  expose it client-side and always call from a backend server. There is no
  backend and there should not be one; a key in a React Native bundle is a key
  anyone can extract. A build script satisfies both, exactly as `hadith:corpus`
  already does.
- **It solves a problem `pillars.ts` names and declines to solve.** Naming no
  figure is right for a pillar page, because the threshold moves with the market.
  It is wrong as the app's only word on zakat to someone in year two who has to
  actually pay it.
- **The screen states a threshold with its date and standard, and stops.**
  ⚠️ It does not output a verdict on whether you owe. That has conditions and
  exemptions on it and belongs to the reviewer.
- **The figure refreshes whenever an OTA ships**, and is honest about its own age
  in between.

**Done when** the snapshot regenerates from a clean checkout with the key in the
environment, no key appears anywhere in `src/` or in git, and the reviewer has
cleared the threshold wording.
**Ships via** OTA plus one new build script.

### Phase 13 — The tier-three collections

*What makes the app worth keeping installed in 2029. None of this exists today,
and all of it is `collection` instances — data files, not code.*

- **The meaning of what you already say.** Word by word: Al-Fātiḥah, the
  tashahhud, the tasbīḥāt, the opening duʿa. **Not Arabic literacy**, which is
  settled as out of scope — transliteration stays permanently. This is meaning,
  for something the reader already says seventeen times a day, which is why it is
  the best year-two feature available to this app.
- **Memorisation with review.** The Qur'an tab has 38 surahs, offline audio and a
  cover-and-recite mode (`ui.ts:273`). What it has no concept of is progression:
  which ones you hold, which is next, and — the part that matters at year three —
  review of what year one is quietly losing. Spaced review, no streak.
- **The sīrah in episodes.** One reference page today. In every convert programme
  surveyed, the story of the Prophet ﷺ in order is the most-requested "what next"
  after the basics.
- **The vices and the virtues.** Every classical manual has this chapter. The app
  has two of roughly twelve — `repentance` and `patience-and-gratitude`. Riyāʾ,
  kibr, ḥasad, ghaḍab and their opposites are the year-two interior life.
- **Why people differ.** One page on what a madhhab is, why four, and why this
  app teaches one way. The data already holds 47 `differs` notes with attributed
  positions (`model.ts:125`) and surfaces them per claim; what is missing is the
  page that makes the apparatus legible. Without it, a year-two convert meeting a
  contradiction concludes somebody is lying.
- **The small sunnahs.** Right side first, siwāk, waking, leaving the house,
  eating. They exist scattered across 132 Hisn occasions; nothing gathers them as
  a practice you take on.
- **Teaching someone else.** Onboarding already offers "I'm helping someone
  learn" and does nothing with it. At year three the convert *is* the person
  newer converts ask, and the app's honest role is to make them good at it.

**Done when** each collection passes the standing checklist and was added without
a code change.
**Ships via** OTA.

---

## What this removes

*A change that only adds usually is not finished being thought about. Named here
because the removals are spread across phases and easy to skip.*

| Removed | By |
|---|---|
| `recommendationsFor` and `recommendedRefs` — 236 lines no screen calls | Phase 1 |
| `ENTRY_BY_STAGE`, unreachable | Phase 1 |
| The "0 of 36" framing, and the lesson counter as the app's idea of progress | Phase 6 |
| The permanent Shahada hero in Learn | Phase 4 |
| The permanent journey card on Today | Phase 4 |
| One of the two words-cards on Today | Phase 4 |
| About six situational pages, off the Learn shelf and into Ask | Phase 4 |
| The help chip row on Today, once Ask can answer | Phase 8 |
| **The premise that Learn is where progress is made** | Phases 4 and 6 |

---

## Not doing, and why

*Written down so none of it is re-litigated.*

| Rejected | Reason |
|---|---|
| ummahapi.com | Cites volume-and-page, not hadith numbers. Nothing can check it |
| islamic.network Quotes / Stories / People / Events | Naqshbandi devotional frame; Arabic marked `claude-retranslation-from-en` in the data |
| islamicapi `prayer-time`, `fasting` | Would replace an offline calculation with a network call |
| islamic.network AlQuran | The app has its own Qur'an source, verified against QuranEnc |
| islamic.network Sermons | Friday sermons. A sermon is not a lesson about Jumuʿah — that is Phase 11 |
| Any runtime API call | Every source is a build-time tool. If all four vanished, the app would not notice |
| Arabic literacy | Settled. Transliteration stays, permanently |
| Machine-translated content | Same class of mistake as a wrong Arabic text |
| French and Spanish | Out of the active plan |
| Streaks, counters, noticing absence | Wrong register for someone three weeks in |
| A server, an account | Never needed by anything above |

---

## The three gates

**Eyes.** Phases 3 and 4 stop. Phase 11 is a pilot of two before the rest. A
repeated change across more than about three files is a pilot, not a batch.

**Review.** Every page in Stage D, plus the 99-name enumeration in Phase 3 and
the zakat threshold in Phase 12.

**Rejection.** If a pilot is looked at and the answer is no, the phase is
reverted and its stage does not proceed — a pilot that ships anyway is not a
pilot. Phases 3 and 4 are each one OTA and each independently revertible, which
is why they were chosen as the pair.
