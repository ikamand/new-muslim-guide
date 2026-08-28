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

- **Add `Cadence` to `ContentMeta`.** Six values: `once` (read it and it is
  yours), `until-fluent` (needed until it is not), `daily` (forever), `yearly`
  (returns with the calendar), `on-event` (invisible until it happens),
  `keepsake` (rarely, and never removed).
- **It decides placement, not presentation.** That is the whole difference from
  `Requirement` in `journey.ts:38`, whose own comment scopes it to how a step
  "is presented". A `daily` never leaves Today and is never counted as journey
  progress; an `on-event` is not on the shelf at all.
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
- **Pay the `ContentKind` cost once.** Seventeen files name `ContentKind` or
  branch on a kind value. For a seventh kind, `model.ts`, `catalog.ts`,
  `content-routes.ts` and `search.ts` must change at minimum, plus a new screen
  and the five audit scripts.
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

- **Source: AlAdhan `asmaAlHusna`.** Free, no key, vowelled Arabic plus
  transliteration plus English meaning; 99 records confirmed by calling it.
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
  lesson — never more than one. **This is what retires the permanent journey
  card**, which the research listed as a removal and the first draft of this
  plan quietly failed to remove.
- **Learn: the shahada drops from hero to one line in the header.** Cadence
  `keepsake`. It stays reachable forever — people return to re-read the words or
  to show somebody — but "return to this a few times in your life" and
  "second-largest object on the tab forever" are not the same claim.
- **Learn: a "Where you are" card replaces the journey card.** Not a fraction:
  the chapter of life you are in, and the two or three things left in it. "6 of
  36" is a report card handed to someone three weeks into a religion.
- **Learn: `on-event` pages leave the shelf for Ask.** About six of them. Nobody
  browses to tayammum; they need it because there is no water.
- **Help chips and the header stay as they are.** The chips retire into Ask when
  Ask can answer, which is Phase 8, not now.

**Done when** both screens have been seen at phone width in both themes, the
adhkār sitting appears inside its window and the duʿa card outside it, and the
six situational pages are gone from the shelf but still reachable.
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
  signal in the repository. `ask.tsx:29` already records that "I farted" finds
  nothing while `wudu.ts` answers it outright. Every failed search is a content
  gap with a name on it, and Phase 8 consumes this log.
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
- **Learn finally reads `beginnerPriority`.** Set on 52 entries and read by no
  screen today. De-emphasised in week one, surfaced in year two, keyed off the
  tier signal from Phases 5 and 6.

**Done when** answering the two questions differently produces visibly different
Today screens, and a simulated month of prayer completions changes the primary
action with no prompt.
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
- **⚠️ Separately, for the reviewer:** `references.ts:565` tells someone arriving
  mid-prayer to "join the line where you are and follow along from wherever the
  imam has got to" — and stops, before the part that decides whether their prayer
  is complete. Whether that is a defect is a question of substance, and it
  belongs at the top of the next review pass.

**Done when** Jumuʿah has shipped and been read on its own, the pilot of two has
been looked at, and every page passes the standing checklist.
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

## Not doing, and why

*Written down so none of it is re-litigated.*

| Rejected | Reason |
|---|---|
| ummahapi.com | Cites volume-and-page, not hadith numbers. Nothing can check it |
| islamic.network Quotes / Stories / People / Events | Naqshbandi devotional frame; Arabic marked `claude-retranslation-from-en` in the data |
| islamicapi `prayer-time`, `fasting` | Would replace an offline calculation with a network call |
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
