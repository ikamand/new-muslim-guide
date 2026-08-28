# The build order

**One plan across `docs/learning-model.md` and `docs/expansion-plan.md`.**
Thirteen phases, four stages. Written 28 August 2026.

The two findings that drive everything:

- **The app is three hours long.** 123 minutes of journey, 186 minutes across
  every teaching page. A motivated reader finishes it in a weekend.
- **Twenty onboarding answers produce three app states.** The personalisation
  engine is 236 lines that no screen calls.

Nothing below is a rebuild. Two screens change, one field is added, one dead
file is deleted, and new content lands beside the old.

---

## At a glance

| # | Phase | Ships | Eyes |
|---|---|---|---|
| **A** | **Foundations — nothing visible** | | |
| 0 | The import gate | build tool | — |
| 1 | Cadence, and the deletions | OTA | — |
| 2 | The `collection` kind | OTA | — |
| **B** | **The pilot pair — stop and look** | | |
| 3 | The 99 names | OTA | **stop** |
| 4 | Today and Learn | OTA | **stop** |
| **C** | **What the app knows about you** | | |
| 5 | Observation | OTA | yes |
| 6 | The Firsts | OTA | yes |
| 7 | Onboarding: two facts | OTA | yes |
| **D** | **Content, paced** | | |
| 8 | The five tier-one gaps | OTA | review |
| 9 | Duʿas from the Qur'an | OTA | review |
| 10 | Jumuʿah, then the tier-two set | OTA | review |
| 11 | Zakat, with a dated nisab | OTA + script | review |
| 12 | The tier-three collections | OTA | review |

**No phase needs a native build.** Everything is `src/`, `assets/` and scripts.
No server, no migrations, no account.

---

## Stage A — Foundations

Nothing visible ships. Each one makes every later phase cheaper.

### Phase 0 — The import gate

- `npm run verify:import` — takes Arabic plus a citation, answers whether it
  resolves, **in which numbering**, and whether the text actually matches
- Matches on a consonantal skeleton with a shared run of ten words — the method
  `generate-evidence.mjs` already uses
- **Self-tests its comparator before reporting anything.** A verification run
  during the API evaluation was void because its character range swallowed the
  Arabic alphabet; this is that lesson, in code
- Normalises alef wasla, superscript alef, hamza-alef, Uthmani vs Imlaei
- Excludes non-hadith authorities by rule, not by eye
- Exits non-zero. Nothing reaches `src/content/` without passing it
- **Build this first and build nothing else until it works.** It is the asset;
  the APIs are interchangeable

### Phase 1 — Cadence, and the deletions

- Add `Cadence` to `ContentMeta`: `once` · `until-fluent` · `daily` · `yearly`
  · `on-event` · `keepsake`
- It decides **placement**, not presentation — that is the difference from
  `Requirement`, which only changes how a step looks
- `content:audit` exits non-zero if any catalogue entry declares no cadence
- Delete `recommendationsFor` and `recommendedRefs` — 236 lines called by no
  screen
- Delete `ENTRY_BY_STAGE` — unreachable, because interest always wins

### Phase 2 — The `collection` kind

- One new `ContentKind`: an ordered set of short entries, each with a title,
  optional Arabic and transliteration, a translation, and a source
- Pays the seventeen-file `ContentKind` cost **once**
- One screen renders every collection
- After this, a new collection is a data file plus a registry row — not a code
  change
- Add `src/content/providers.ts`: one row per body of content, declaring
  origin, fetch script, verification method, licence, attribution
- **The highest-leverage structural decision in the plan**

---

## Stage B — The pilot pair

Two changes, as unalike as possible. Both looked at before anything is
repeated.

### Phase 3 — The 99 names

- First collection. Source: AlAdhan `asmaAlHusna` — free, no key, vowelled
  Arabic + transliteration + English meaning
- Cadence `daily`: one name on Today, one screen for the set
- Proves the collection kind end to end, on content that is short and low-risk
- ⚠️ **Blocked on the reviewer:** which enumeration. Scholars differ on which
  names belong. Either the reviewer names the list, or the collection presents
  the names without claiming a canonical ninety-nine
- **Ships, then stop.**

### Phase 4 — Today and Learn

- **Today:** the adhkār sitting fills the words slot when the clock is in one,
  the duʿa card otherwise — one slot, not two cards
- **Today:** the primary prayer action changes shape with competence. Week one
  wants 23 steps; year three wants the time and the qibla
- **Learn:** the shahada drops from hero to one line in the header — cadence
  `keepsake`
- **Learn:** `on-event` pages leave the shelf for Ask, about six of them.
  Nobody browses to tayammum; they need it because there is no water
- **Learn:** a "Where you are" card replaces the journey card — not a fraction,
  but the chapter of life you are in and the two or three things left in it
- **Today:** one "worth today" slot, competed for by a single ranked function —
  a season, a First that just became available, the surah being learned, or a
  lesson. Never more than one. This retires the permanent journey card
- **Ships, then stop.** Both screens seen before Stage C begins

---

## Stage C — What the app knows about you

### Phase 5 — Observation

- Record what the app can already see and currently throws away: which guides
  were finished and when, which adhkār sittings completed, which surahs played
  and recited covered, days since install
- **Log every Ask search that returned nothing** — the highest-value untapped
  signal in the repository. Every failed search is a content gap with a name
- All on device. No network call, no account, no server
- ⚠️ "The app remembers what you did" is a different promise from "the app
  remembers what you chose". Worth deciding deliberately rather than by
  accident

### Phase 6 — The Firsts

- Replace "6 of 36 lessons" with a ledger of firsts: first prayer alone, first
  Jumuʿah, first fast, first Ramadan, first Eid, first janāzah, first zakat
- **Never shows what is left, never dates them, never notices absence.** There
  is no way to lose a first
- Two mark themselves — first prayer finished, first surah recited covered.
  The rest are offered honestly: "It's Friday tomorrow. Is this your first?"
- Reaches years rather than weeks. Most people's first janāzah is a long way off
- Becomes the honest signal for which tier someone is in, without one extra
  question

### Phase 7 — Onboarding: two facts, not two identities

- **"Have you said the shahada?"** — not yet · exploring · yes, recently · yes,
  a while ago. Decides whether the shahada is the first thing, a lesson, or a
  keepsake
- **"Can you pray on your own yet?"** — no, teach me · I need the words in
  front of me · yes. Decides the shape of Today's primary action
- Both are checkable facts, not self-descriptions, and both can be re-asked
- Onboarding becomes a **seed, not a verdict**: Phase 5's observations quietly
  update it. No badge, no level-up, no announcement
- Learn finally reads `beginnerPriority` — set on 52 entries and read by no
  screen today. De-emphasised in week one, surfaced in year two, keyed off the
  tier signal from Phases 5 and 6

---

## Stage D — Content, paced

Every page here is new religious instruction: written from sources, through the
Phase 0 gate, and reviewed. Roughly twenty pages in total — more than has ever
been written here in one go.

### Phase 8 — The five tier-one gaps

- **The minimum valid prayer.** The app teaches Fajr as 23 steps and never says
  "here is the least you can do today, and it counts." That sentence is the
  difference between praying badly and not praying. **The highest-value missing
  page in the app**
- **The five categories of ruling.** Without farḍ / mustaḥabb / mubāḥ / makrūh
  / ḥarām, a beginner reads every "should" as a "must" and burns out in a month
- **The adhān.** Never explained anywhere — it appears only as a Bukhari book
  name in citations
- **"Do I have to change my name?"** One of the three questions converts ask
  most, and the app is silent on it
- **What happens to the life before.** Muslim 121 — "Islam demolishes what was
  before it" — currently exists only in a code comment. Nothing addresses guilt,
  a previous marriage, children, or a past that is not going anywhere. This is
  the 1am search the app was built for
- ⚠️ All five need review before shipping

### Phase 9 — Duʿas from the Qur'an

- Second collection: the 30 Qur'anic duʿas from the Pray API
- Fully verifiable against QuranEnc, which `content:verify` already uses
- Something Hisn al-Muslim does not have — it is hadith-centred
- Skip the hadith-cited half: it duplicates Hisn, and every Sahih Muslim
  citation failed against the corpus (0/7, the two-numberings problem)
- Exclude the Naqshbandi-sourced record by rule, not by eye

### Phase 10 — Jumuʿah, then the tier-two set

- **Jumuʿah first.** The largest single gap. The app mentions it once, in a
  note, to advise going on a different day. That it replaces Ḏuhr, that it is
  two rakʿah, the khuṭbah, when to arrive — none of it exists
- Then: praying behind an imam · death and janāzah · Eid · voluntary fasting ·
  marriage in shape · a partner you already have · when you slip for a month ·
  being corrected by other Muslims
- New Learn group, "Things that come up". Most are cadence `on-event`
- ⚠️ Ten pages is a batch. **Two first, looked at, then the rest**
- ⚠️ Separately for the reviewer: `references.ts:565` tells someone arriving
  mid-prayer to join the line and stops before what decides whether their
  prayer is complete

### Phase 11 — Zakat, with a dated nisab

- `npm run zakat:nisab` writes a dated snapshot from islamicapi
- **The key lives in your environment and never ships** — no key in the bundle,
  no server, like `hadith:corpus` already works
- The screen states the threshold with its date and its standard, and stops
- ⚠️ It states a number. It does not output a verdict on whether you owe —
  that has conditions and exemptions, and belongs to the reviewer
- The first time the app prints a number that moves. Refreshes on any OTA

### Phase 12 — The tier-three collections

- **The meaning of what you already say** — word by word: Al-Fātiḥah, the
  tashahhud, the tasbīḥāt. Not Arabic literacy, which is settled as out of
  scope. Meaning, for something said seventeen times a day
- **Memorisation with review** — the Qur'an tab has 38 surahs and a cover mode;
  what it lacks is progression and review of what year one is losing
- **The sīrah in episodes** — the most-requested "what next" in every convert
  programme surveyed
- **The vices and the virtues** — the app has two of roughly twelve
- **Why people differ** — one page making the 47 `differs` notes legible
- **The small sunnahs** — right side first, siwāk, waking, leaving the house,
  eating. They exist scattered across 132 Hisn occasions; nothing gathers them
  as a practice you take on
- **Teaching someone else** — the "helping" onboarding answer that currently
  does nothing. At year three, the convert *is* the person others ask
- All are `collection` instances: data files, not code

---

## Not doing, and why

Written down so none of it is re-litigated.

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

## The two gates

**Eyes.** Phases 3 and 4 stop. Phase 10 is a pilot of two before the rest.
A repeated change across more than about three files is a pilot, not a batch.

**Review.** Every page in Stage D, plus the 99-name enumeration in Phase 3 and
the zakat threshold in Phase 11. The Priority 1 pile is cleared, not abolished.
