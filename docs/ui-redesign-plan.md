# The plan

**Status:** Phases 0–5 built and pushed, with two pieces held back on a licence
question. **One phase left: 6 (French and Spanish).**
Last updated 21 August 2026.
**Canvas:** https://claude.ai/code/artifact/81fa355d-157f-495c-9096-bc68ae181422
**Opened:** 20 August 2026, from a walkthrough of the Today and Learn tabs.

A living document. Phases 0–6 are the work; the reference sections behind them
hold the findings each phase rests on. Every claim carries the file, line or
endpoint it was read from, so a later reader can re-check rather than trust.

New ideas go in [the backlog](#backlog); anything decided moves up into a phase
with its reasoning attached.

---

## The phases at a glance

| | Phase | State | Ships via |
|---|---|---|---|
| **0** | [Fix what's wrong now](#phase-0--fix-what-is-wrong-now) | ✅ **Done** — `8772e71` | OTA |
| **1** | [The design system](#phase-1--the-design-system) | ✅ **Done** — `76f635e`, `21b66e3`, `41295cc` | OTA |
| **2** | [The information architecture](#phase-2--the-information-architecture) | ✅ **Done** — `2a60188`, `f79f60f`, `e88f82d`, `014e430`, `aeccf7f`, `663aaef` | OTA |
| **3** | [Provenance](#phase-3--provenance) | ✅ **Done** — `5f2570a`, `e614780` | OTA |
| **4** | [Duʿas, and the first network call](#phase-4--duas-and-the-apps-first-network-call) | 🟡 **Day built** — `d9bd351`. Fetch-and-cache held: no licensed content to fetch yet | OTA |
| **5** | [The Qur'an tab](#phase-5--the-quran-tab--juz-30) | 🟡 **Text and drill built** — `eed5214`. Audio held: see below | OTA |
| **6** | [French and Spanish](#phase-6--french-and-spanish) | ⬜ Last, on purpose | OTA |
| — | [The prayers](#the-prayer-work) | ✅ **Done** — `a004af9` | OTA |

### What shipped in 0–3

- **Bugs**: Today's "Prayer" row no longer opens the pillars list; Al-Fatiha
  practice is reachable from inside the prayer; Learn no longer lists two
  topics twice.
- **Languages**: Arabic removed (645 strings, none translated); the language is
  asked at first launch; `TranslationGap` says on screen where a page is not
  fully translated instead of letting English pass as finished.
- **Type**: eight named rungs replacing five, with nine ad-hoc `fontSize: 17`
  overrides deleted. Card titles are 20 against body copy's 16.
- **Arabic**: Amiri Regular, 438 KB, loaded with `useFonts`. Every Arabic string
  previously rendered in whatever the platform fell back to — SF Arabic on iOS,
  Noto Naskh on Android.
- **Drawings**: 19 topic glyphs, a prayer mark, six posture diagrams, the rakʿah
  arches, the six-arch stage path, and a progress ring.
- **Structure**: Today is the prayer card, one carry-on line and the questions.
  Learn is five groups of two-column tiles plus a reference strip.
- **Provenance**: `npm run content:verify` compares every Arabic text against
  QuranEnc and searches HadeethEnc for the uncited. 24 of 24 comparable Qur'an
  texts match word for word.

### The prayer work

Agreed in conversation on 21 August and built the same night (`a004af9`),
outside the numbered phases because it came out of looking at the app rather
than out of the original audit.

- **A chooser at `/pray`** showing all five daily prayers with their rakʿah
  counts *and* the sunnah rawatib either side. Seeing them together is the
  point: five separate cards could never say "Asr has none", because you would
  have to open five pages and hold them in your head. Every born Muslim absorbs
  both facts without being taught and almost no convert is told either.
- **The branch happens once, at the door.** The rejected alternative was
  branching mid-prayer — "stop here if you are praying Maghrib" — which arrives
  when somebody is on a mat, one-handed, four minutes into concentrating. They
  already know which prayer they are praying; they knew before they stood up.
- **Tahajjud, istikhara and the prayer of repentance**, one line each in
  `PRAYER_SPECS`, which is what that table was built for. Each has a reference
  page as well, because a guide shows the movements and cannot say why you are
  standing there.
- **A Friday mark on Dhuhr**, stating the condition rather than relabelling it.
  Jumuah replaces Dhuhr only for somebody who prays it in congregation; a man
  who cannot reach a mosque prays Dhuhr, and so does a woman who does not
  attend. Swapping the label would tell both of them they are praying something
  they are not.

**Still open here:** the istikhara duʿa text. Both places that print it carry
the narrator's alternative inside the supplication, and splicing the variants
produces a text nobody says. The provenance is recorded in
`src/content/learn/voluntary-prayers.ts` so whoever adds it does not have to
find it again.

### Two corrections the work produced

1. **Phase 1 did not need a native build.** `expo-font` has been a dependency
   since the first commit, so the native module is in every binary; `useFonts`
   loads at runtime and ships over the air. The config plugin is what would
   have needed a rebuild. The table above is corrected.
2. **"26 of 53 Arabic strings are unsourced" was wrong**, and it drove part of
   this plan. Most of those 26 are not quotations — `الصَّلَاة` is the word
   "prayer", `أَخِي` is "my brother". The real figure is **2 uncited quotations
   of 28**: the shahada, and the taʿawwudh wording. See
   [Phase 3](#phase-3--provenance).
3. **Three hadith numbers were written from memory** while adding the voluntary
   prayers, and none could be verified — sunnah.com refuses automated requests.
   All three were removed. `sources.ts` now carries a `hadeethEnc()` citation
   form for exactly this case: it names the collection and the grading and
   links a page, and asserts no number. A number you cannot check is worse than
   no number.

### What is held, and on what

- **Phase 4's fetch-and-cache.** Built nothing, deliberately: there is no
  licensed content to fetch until the IslamHouse email is answered, and
  infrastructure with nothing to carry is speculation. The day screen works on
  the nine duʿas the app already owns.
- **Phase 5's audio.** All of Juz 30 is ~76 MB, too much to bundle, and the
  cache it would need is the item above. The ten shortest surahs are ~6.2 MB
  and could ship bundled now — that is the next move once the licence position
  is known, since `Husary_Muallim_128kbps` is already cleared in
  `audio-sources.ts`.
- **Word-synced highlighting.** Depends on the audio. The API supplies the
  millisecond segments per word, so the data is there when the files are.

**The order is not arbitrary.** Phase 1 unblocks every visual change after it.
Phase 4 builds the caching that Phase 5 needs. Phase 6 is last because
translations are keyed by the English text: edit an English sentence and its
translation drops back to English (`src/i18n/locales.ts`). Phases 2, 4 and 5 all
rewrite English copy, so translating before them means paying for the same
strings twice.

---

## Phase 0 — Fix what is wrong now

Small, independent, and wrong today. Nothing else depends on them, so they can
ship the moment they are done.

### 0.1 "Prayer" on Today opens the five pillars list

Reported as "in the today section when i click on prayer it takes me to the 5
pillars page not prayer". Exactly right, and not a routing typo.

`useToday` fills its prayer slot with the first unfinished journey step whose
`meta.category` is `salah` or `purification`
([`src/hooks/use-today.ts:88-107`](../src/hooks/use-today.ts#L88-L107)). The
first such step is `ref('pillar', 'salah')`
([`src/content/journey.ts:88`](../src/content/journey.ts#L88)) — the five-pillars
lesson, titled "Prayer", summarised "Five prayers a day, at set times, facing
the Kaʿbah in Mecca". `routeFor` sends every `pillar` to `/pillars`
([`src/lib/content-routes.ts:26`](../src/lib/content-routes.ts#L26)). That is the
card on the screenshot, verbatim.

The file already defines the guard that prevents this — `OWN_PAGE =
['guide', 'reference']`, with a comment explaining that a pillar "opens the list
it lives in, so a row promising 'Prayer' would land the reader on five cards" —
and applies it only to the *suggestion* block further down.

**Fix:** apply `OWN_PAGE` to the prayer-step lookup too. Two lines.

### 0.2 Al-Fatihah practice is unreachable from the prayer

[`src/app/practice.tsx`](../src/app/practice.tsx) is linked from Learn, from
Today's footer row, and from a help topic — never from inside a prayer guide.
Someone learning Al-Fatihah is on a mat, on the step that recites it, three taps
from the screen built to teach it.

**Fix:** an entry point on the recitation itself, so it appears wherever that
recitation renders rather than only on the Fatiha step.

### 0.3 Learn shows two topics twice

`RecommendedSection` and the `startHere` list below it both resolve from the
recommendation tables and do not dedupe against each other, so **"Becoming
Muslim" and "What is Islam?" each appear twice on one screen**, identical titles
and subtitles. Visible in the first screenshot.

**Fix:** moot once [Phase 2](#phase-2--the-information-architecture) removes the
recommended section. Recorded so nobody mistakes it for a design choice.

### 0.4 Language honesty

Built and pushed in `8772e71`:

- **Arabic removed** from `LOCALES`, the `AR` tables in `ui.ts`, and
  `content/index.ts`; `content/ar.ts` deleted. It shipped selectable with an
  empty dictionary — 645 strings, none translated — so choosing it produced an
  entirely English app. The RTL plumbing went with it (`isRTL`, `RTL_LOCALES`,
  `rtl` on the locale context), with comments in both files saying what to
  restore if a right-to-left language arrives.
- **`measure()`** in [`src/i18n/localise.ts`](../src/i18n/localise.ts) counts
  fallbacks at the one choke point every string already passes through, so there
  is no second walk to keep in step.
- **`TranslationGap`** renders one quiet line where a screen is not fully
  translated. English still shows — someone halfway through wudu needs the
  instruction more than they need to know it is untranslated, and a French
  reader who loses the text loses the ability to pray. What was wrong was doing
  it in silence: a 36%-translated app looked finished.
- Wired into the guide, reference, duʿa and phrase screens.
- **Onboarding asks the language first**, because every screen after it is
  written in the answer. The device's guess is preselected, so it is one tap for
  most people, and the partly-translated languages say so before the choice —
  read from the dictionary rather than a hardcoded list that would become a lie.

---

## Phase 1 — The design system

Nothing visual improves until this lands, which is why it is first after the
bugs. See [why the app feels flat](#reference-why-the-app-feels-flat).

- **Add 20/24/28 to the type scale** with proper line-heights. The scale runs
  14/14/16/32/48 today, so a card title (17, via a local override) cannot
  outrank body copy (16). This is the cheapest change in the whole plan and the
  one that does the most.
- **Load fonts.** Amiri for Arabic, a display serif for English headings.
- **Finish the glyph set** — one mark per Learn topic, in the existing stroke
  style. Nineteen to draw.
- **Draw the five postures** — qiyam, rukuʿ, sujud, julus, at the tap. Needed by
  Phase 2's prayer step.
- Replace `linkPrimary`'s hardcoded `#3c87f7` with a theme token. It is iOS blue
  in a green app, and CLAUDE.md forbids hex in components.

✅ **This did NOT need a build, and the warning above was wrong.** `expo-font`
has been a dependency since the first commit, so the native module is already
in every binary — `useFonts` loads at runtime and ships over the air. Only the
*config plugin* would have needed a rebuild, and it is not used.

**What shipped:** Amiri Regular, 438 KB, OFL beside it in `assets/fonts/`.
Regular only, because nothing in the app sets Arabic bold and the second weight
would have been 300 KB of nothing. Sizes went up with the face rather than
despite it — the recitation card is 30/58 where it was 26/48, since Amiri sets
smaller at the same point size and stacks marks above the line.

---

## Phase 2 — The information architecture

**Today and Learn are the same list, sorted differently.** Both render a journey
card; both call `useRecommendations()`. Today's "Suggested" row and Learn's
"Where to start" resolve from the same tables.

The fix is not to dedupe. It is to make them answer different questions:

| Tab | Question | Test for what belongs |
|---|---|---|
| **Today** | What do I do in the next ten minutes? | Does it have a deadline? |
| **Learn** | What don't I understand yet? | Would it still make sense next week? |

A prayer time has a deadline. A lesson about Ramadan in Shaʿban does not.

### 2.1 Today

**The prayer times card is not touched.** Explicit instruction, and it is the
best thing on the screen.

- Remove the `TODAY` section entirely — seasonal row, prayer row and suggested
  row all come from tables Learn already surfaces.
- One "carry on" line in their place, showing stage position with a progress
  ring rather than a bare count.
- Rename the help chips to how the question actually arrives: **"I lost count"**,
  not "When something goes wrong". A beginner searches with the sentence in
  their head, not a category name.

**Consequence, and the point of the phase:** Today gets shorter. Prayer card,
one line, question chips. Nothing else.

### 2.2 The prayer step

- **Draw the posture; stop naming it in a pill.** `POSTURE_LABEL` at
  [`src/app/guide/[id].tsx:17`](<../src/app/guide/[id].tsx#L17>) renders
  "Standing", "Bowing", "Prostrating" as text. Someone mid-motion needs to see
  the position.
- **Replace the 1px progress bar with rakʿah position** — four arches, filled as
  you go. The app has a whole reference page about losing count; the progress
  indicator should help with that rather than measure scroll.
- **Al-Fatihah practice inline** ([0.2](#02-al-fatihah-practice-is-unreachable-from-the-prayer)),
  with a seven-bar strip showing which ayahs are known.
- Footer buttons at a one-handed reach: 52px, full width.

### 2.3 Learn

31 near-identical rows become **five groups, named by when the question
arrives**:

| Group | Topics |
|---|---|
| Praying | wudu, before-prayer, al-fatihah, what-breaks-prayer, dua-and-dhikr |
| What you believe | what-is-islam, who-is-allah, who-is-muhammad, what-is-the-quran, sunnah |
| Out in the world | food, clothing, halal-and-haram, family, work, manners |
| When it's hard | repentance, patience-and-gratitude |
| The year | ramadan, islamic-calendar |

Plus a "keep coming back to" strip — phrases, duʿas, the mosque — for the things
that are reference rather than reading.

- The beginner path becomes **six arches**, reusing the mihrab the prayer card
  already draws, so "stage 2 of 6" is a picture rather than "0 of 36".
- "Where to start" is deleted ([0.3](#03-learn-shows-two-topics-twice)).
- Every card carries a glyph.

**Cost, plainly:** someone who already knows what they want now scans a heading
first. Worse for them, much better for the person who does not know — who is who
this app is for.

---

## Phase 3 — Provenance

The largest single risk in the app, and the one Iyad cannot check by looking at
the screen.

`docs/arabic-proof.csv`, 53 Arabic strings:

```
26  model-written, no source recorded   ← half
11  Sahih (Bukhari/Muslim)
 8  Qur'an
 7  Sunan
 1  Jami`
```

Against CLAUDE.md's hardest rule — never invent or paraphrase an Arabic text —
**26 unsourced strings is the problem worth fixing before any new content is
added.**

**The decision, and the reasoning behind it, because the reasoning matters
more:** the content is theirs, the delivery is ours. Adopting IslamHouse and
HadeethEnc text is a clear improvement — theirs is reviewed by named people paid
to get it right. What does *not* follow is calling an API when a reader taps
something. Trust and runtime are separate: text copied at build time is exactly
as correct as text fetched at 9pm on a Tuesday, and a runtime fetch costs
someone standing outside a mosque with no signal the duʿa for entering it.

- **Attach an upstream id** to each text — `hadeethEncId` on `HadithSource`, a
  phrase id for `cnt.islamhouse.com` rows.
- **`npm run content:verify`** fetches upstream and diffs on a consonantal
  skeleton, so the app's Imlaei does not false-positive against Uthmani. Dev
  machine and CI only — a check needing the network can never be a build gate
  here.
- **Replace the 26 unsourced strings** with sourced equivalents where one exists.

Two things this does not buy, both worth saying out loud:

1. **Review does not go away.** The API guarantees the *text*, not that *this
   text belongs on this step*. HadeethEnc holds 2,776 hadith and choosing the
   wrong authentic one is still wrong. The existing split holds: Iyad clears the
   text, a qualified person clears the substance.
2. **HadeethEnc forbids modification.** Adopt their translation and it ships
   verbatim — scholarly register and all. Keeping the app's own beginner English
   separate from their text is what allows both.

---

## Phase 4 — Duʿas, and the app's first network call

Nine duʿas today. Hisn al-Muslim has 133 occasions and 245 texts.

### 4.1 The form: a day, not a list

**Not a Learn topic**, and not a list — and not because a list is long. A new
Muslim **does not know a duʿa for putting on clothes exists**, so they will
never scroll to it. An index only serves someone who already knows what they are
looking for, which is a born Muslim's tool. What a convert has instead is a
*moment*: at the door, about to eat, awake at 2am.

**So the duʿa screen is a day.** `DayArc` in
[`src/components/illustrations.tsx`](../src/components/illustrations.tsx) already
draws the sun's path with the five prayers on it, and Hisn al-Muslim maps onto
that shape — waking, dressing, leaving home, the mosque, the prayer, eating,
coming home, sleeping. Scrolling dawn to night puts each duʿa where it happens,
which answers "when would I ever say this". No index answers that.

**And it is smaller than 133.** The book has duʿas for rain stopping, for
sighting the crescent, for a debtor. Someone three weeks in needs about twenty.
The day carries what a convert meets; the rest sits behind a search.

**What this removes:** the flat list of nine duʿas, and any 134-row Learn card.

**The one genuinely lesson-shaped piece** is the morning and evening adhkar —
a practice with a beginning and an end, absorbed by every born Muslim and told
to no convert. That earns a Learn card. The other 130 do not.

### 4.2 Fetch once, cache permanently

- **First launch pulls the library**; after that it lives on the device. A
  scheduled refresh means new content still arrives without shipping a build.
- **The worship path ships bundled** — salah, wudu, the prayer duʿas — so it
  works before the first fetch and after a cache clear.

⚠️ **This is the app's first network request, ever.** It reveals a user's IP to
a third party and changes the App Store privacy answers. For a convert who has
not told their family, "this app never talks to anything" is a real feature
being traded for a real gain. Flagged once here; decided.

---

## Phase 5 — The Qur'an tab — Juz 30

**Why a fourth tab.** Phase 2 split Today (has a deadline) from Learn (has
none). Memorising is neither — it is a practice built over months. Filing it
under Learn would make it look like reading, which is the one thing it is not.

**The scope, counted rather than remembered:**

| | |
|---|---|
| Juz 30 | surahs 78 (An-Naba) – 114 (An-Nas) |
| Surahs | **37** |
| Ayahs | **564** |
| Shortest | 110, 108, 103 — 3 ayahs each |

Confirmed twice, independently: QuranEnc per-surah counts, and the Quran
Foundation API reporting `total_records: 564` for `by_juz/30`.

**Order: backwards through the mushaf**, 114 → 113 → 112 → …, which is how it is
taught. Not strictly shortest-first — the data says 110 and 103 are shorter than
114 — but contiguous, so there is never a question about what comes next, and it
front-loads the three *quls*: said in prayer, after prayer, and for ruqyah.

### 5.1 The source: `api.quran.com/api/v4`

Open, no auth. One request returns everything this tab needs:

```
GET /verses/by_chapter/112?audio=12&words=true&fields=text_imlaei

112:1  قُلْ هُوَ اللَّهُ أَحَدٌ
  audio: mirrors.quranicaudio.com/everyayah/Husary_Muallim_128kbps/112001.mp3
  segments: 4
  words: qul | huwa | l-lahu | aḥadun
```

Four things there, each of which matters:

1. **Reciter 12 is Mahmoud Khalil Al-Husary, Muallim** — literally the files the
   app already ships for Al-Fatihah, from the source already recorded in
   [`src/content/audio-sources.ts`](../src/content/audio-sources.ts) under
   CC BY-NC. The attribution obligation and the never-sell-it constraint carry
   over unchanged.
2. **`text_imlaei`** — the app's own script. No Uthmani conversion, no mismatch.
3. **`segments`** — millisecond timings **per word**.
4. **`aḥadun`, `yūlad`** — proper academic transliteration, with the ḥ dot and
   the ū macron. The app's own scheme, at word level.

### 5.2 The interaction: highlight the word as it is recited

Not a player. `src/app/practice.tsx` already does per-ayah loop and slow
playback, and that machinery scales. What memorisation needs on top is two
things:

- **Word-synced highlighting.** `segments` lets the app light up قُلْ exactly as
  Husary says *qul*. That is the mechanism that teaches which shape makes which
  sound — do it across forty surahs and someone is reading, not decoding. It is
  "learn to read the Qur'an by memorising it" as a feature rather than a hope.
- **Hide the text.** Show the Arabic, tap to conceal, recite from memory, tap to
  check. The drill that actually builds hifz; no amount of reading replaces it.

### 5.2b Built 21 Aug: the surah plays as one playlist, and you pick the voice

**"Play the surah" had never once produced sound.** The button set state and
nothing acted on it — the only `play()` in the file was inside a row's own press
handler, and a row receiving the flag knew only how to *pause*. It changed its
icon to "Stop", highlighted ayah 1, and played silence. The ayah-chaining logic
underneath it was dead code, because nothing ever started and so nothing ever
finished. Reported as "the audio does not play", which was exactly right.

Two things were wrong underneath, and the second is why this was rewritten
rather than patched:

- **One native player per ayah.** Opening Al-Mursalat built fifty of them, each
  with `downloadFirst: true`, before a single tap.
- **A chain cannot be gapless.** Each link had to load after the one before it
  ended, so a surah played through would have broken between every ayah even
  once the flag bug was fixed. That is the real content of "it should play the
  whole surah at once, not one by one".

**`useAudioPlaylist` (expo-audio 57) replaces both.** Documented as gapless,
one native object for the surah, and `currentIndex` says which ayah is sounding
— so 5.2's follow-along survives, which a single per-surah MP3 could not have
given. `loop` is set as a property, never passed as an option: the hook rebuilds
the playlist when the option changes, so toggling repeat mid-surah would have
killed the audio.

Added with it: the page **scrolls to keep the sounding ayah in view**. Without
it the highlight is honest and useless — An-Naba is forty ayahs and by the third
the lit line is below the fold. What it removes is browsing while listening;
scroll away and the next track pulls you back. Right trade for a screen whose
job is following along.

**A "no signal" message that watches the clock, not the play flag.** A
playlist's status carries no `error` field. The first attempt checked
`status.playing` and never fired once — with the host unreachable the status
still reported `playing: true`, because the flag means a play was *requested*.
`currentTime` cannot lie that way. Caught by cutting the network in a browser
and watching the message fail to appear, not by reading the code.

#### Eight reciters, and what that costs

Iyad's call, 21 Aug, over a recommended four. `RECITERS` in
`src/content/quran/recitation.ts`: Al-Husary teaching (default) and murattal,
Abdul Basit, Alafasy, Al-Minshawi, As-Sudais, Ash-Shatri, Al-Ghamdi. Every one
of **4,512 files — 8 reciters × 564 ayahs — was requested before the list
shipped**; zero missing. A 404 mid-surah is a silent gap nobody would report.

Each carries a sentence saying what the recording is *for*, not who it is by. A
list of eight Arabic names is not a choice for someone three weeks into Islam,
and every app that offers reciters offers them as a directory because every app
that offers reciters was built for someone who already has a favourite.

⚠️ **The licence question got eight times bigger, and it was already wrong.**
everyayah.com publishes no terms of use anywhere — checked its front page and
its recitations index. The `CC BY-NC` that `audio-sources.ts` carried against
Al-Husary was **this repo's assertion, not the host's statement**, and it was
being printed on screen as "used under CC BY-NC". `licence` is now optional and
absent for everything sourced there, including the bundled Al-Fatiha clips;
`creditLine` drops the clause rather than print a claim nobody made. The belief
survives in `obligation`, which is read by us and shown to nobody.

Abdul Basit and Alafasy are commercially published recordings and are the two
most likely to draw an objection. **This has to be settled before a public
release.** Dropping a voice is one line in `RECITERS` and no user data moves
with it.

### 5.2c Built 21 Aug: Al-Fatiha is in the tab, and it works offline

**The tab shipped without the one surah you cannot pray without.** It was juz 30
only — 78–114 — so Al-Fatiha, recited in every rak'ah of every prayer, was
absent from a memorisation screen. Iyad caught it.

Fixed by giving Al-Fatiha the same one path in as everything else: fetched by
`scripts/generate-juz30.mjs`, written to `src/content/quran/fatiha.ts`. Not
typed by hand, like the other 564 ayahs. A new hand-written
`src/content/quran/surahs.ts` composes `[AL_FATIHA, ...JUZ_30 reversed]` — the
teaching order is an editorial decision and does not belong in a file a script
overwrites. Count goes 37 → 38.

**Pinned first, not folded in by number**, which would put it *last*, behind
thirty-seven surahs. It is not part of juz 30; that is a fact about the mushaf,
not about what a beginner needs first.

**It plays with the radio off.** The seven Husary clips are already bundled for
the prayer screen, so `ayahSource` returns the bundled module for surah 1 on the
default reciter and a stream for everything else. Verified by blocking
`mirrors.quranicaudio.com` in a browser: zero requests, audio still played.
Choosing another voice moves Al-Fatiha onto the network — the honest place to
spend that, since a reader who went looking for a different reciter has already
told you they have a connection.

**`/practice` deliberately did not move.** The proposal was to relocate it to the
Qur'an tab. It is not an Al-Fatiha screen — `getPracticeItems` renders every
recitation with a *recorded* clip, and Al-Fatiha is simply the only one recorded
so far. The other twenty are uncommissioned. Move it and the day those land, the
tashahhud is filed under "memorise a surah". Adding Al-Fatiha to the Qur'an tab
is what stops `/practice` reading as a duplicate.

⚠️ `ayahSource` lives in its own module, `quran/ayah-audio.ts`, not beside the
reciter list. It imports `content/audio.ts`, which is a wall of
`require('…mp3')` — fine for Metro, fatal for node, and `i18n-manifest.mjs`
loads `recitation.ts` for the reciter blurbs. Putting the two together took the
whole manifest down. Content files that build scripts read cannot touch assets.

### 5.3 Transliteration: no line under the ayah

**Settled.** A Latin line is something people read *instead of* the Arabic —
they memorise English letters and still cannot open a mushaf. The tradition
teaches by ear, and the app has Husary's teaching recitation for all 564 ayahs.

Transliteration survives only in the form that is a lookup rather than a crutch:
**tap a single word when stuck.** The API supplies it per word, in the app's own
scheme, so this costs nothing extra.

Two rejected sources, recorded so nobody re-treads it: `alquran.cloud` writes
`Qul huwal laahu ahad` and quran.com's translation resource 57 writes `Qul huwa
Allahu ahad` — both lose the ḥ/h distinction, so a beginner says the wrong
letter in the surah they will recite most. The alsunna.org Juz Amma page uses a
homebrew scheme (`^` for ʿayn) and carries **no licence or permission to reuse**
at all.

### 5.4 Audio size decides what ships bundled

Sampled across ten ayahs at ~138 KB each:

- **All of Juz 30: ~76 MB.** Far too much to bundle.
- **The ten shortest surahs (~46 ayahs): ~6.2 MB.** Bundleable.

So: **the ten ship in the binary, the rest fetch once and cache** — Phase 4's
model unchanged. Someone in a basement can still practise what they are working
on.

### 5.5 Progress without pressure

A memorisation tab needs a notion of "known", which the Al-Fatihah practice
screen has no concept of. It must not become a streak: someone three weeks into
Islam does not need an app that is disappointed in them. **Progress goes up,
never down, and never asks.** The 37 surahs as a girih band — one eight-point
khatim per surah, filled as it sticks — makes it a picture rather than a
percentage, reusing geometry `illustrations.tsx` already draws.

---

## Phase 6 — French and Spanish

**Deliberately last.** Translations are keyed by the English text
(`src/i18n/locales.ts`): edit an English sentence and its translation drops back
to English and returns to the manifest as work to redo. Phases 2, 4 and 5 all
rewrite English copy, so translating before them means paying twice.

Coverage today, from `docs/i18n-manifest.csv` — 645 translatable strings:

| Locale | Translated | Missing | Coverage |
|---|---|---|---|
| Français | 231 | 414 | 36% |
| Español | 231 | 414 | 36% |

The gaps concentrate in the worship path — Fajr 59, Wudu 35, Ghusl 28, Periods
23, Tayammum 15 — which is exactly why English is kept as the fallback and
`TranslationGap` marks it instead ([0.4](#04-language-honesty--partly-built-already)).

**What waits here:**

- Complete fr/es for the settled English.
- **The French Hisn al-Muslim audio**, item 169380 — 20 chapters, 6-second
  clips for a simple duʿa, plus a per-chapter PDF carrying Arabic, French and
  phonetic transliteration. It is a finished asset that exists in **no other
  language**, and it sits unused until this phase. Chapters 16–22 alone cover
  six of the app's unrecorded prayer clips.
- **The French convert-guide series** — 11 parts, 209 files, covering this app's
  whole curriculum. Somebody built it for converts in French and nobody built it
  in English, which is either a warning about the market or the reason this app
  should exist.

---

## Reference: why the app feels flat

Three gaps, each verified in the source. They are what Phase 1 fixes.

### There is no type size between 16 and 32

[`themed-text.tsx`](../src/components/themed-text.tsx) defines five sizes:
14, 14, 16, 32, 48. Card titles are 17 via a local override; body copy is 16.
**Nothing in a list can outrank anything else**, because the scale has no rung
to promote it to. That is why 31 cards read as a wall.

### The app loads no fonts at all

No `assets/fonts` directory, no `expo-font` dependency, no `useFonts` call
anywhere in `src`. `Fonts` in
[`theme.ts`](../src/constants/theme.ts) maps to `system-ui` / `serif` / `mono`,
and only `mono` is used, for code.

So **every Arabic string renders in the platform default** — 26px/48
line-height, right-aligned
([`recitation-card.tsx`](../src/components/recitation-card.tsx)). On Android that
is Roboto, which has no proper naskh and sets vowel marks badly. For an app
whose brief opens with "Arabic needs real line-height and a face that honours
it", this is the widest gap between the stated bar and what ships.

### The illustrations exist and are barely used

[`illustrations.tsx`](../src/components/illustrations.tsx) is 369 lines of good
geometric work: a mihrab arch, a tessellating girih band, a sun arc placing each
prayer at its true position in the day, nine glyphs.

`TOPIC_GLYPH` at [`learn.tsx:36`](<../src/app/(tabs)/learn.tsx#L36>) maps **one**
topic to a glyph. The other 19 get nothing.

So the answer to "no images or illustrations" is **not** stock photography of
people praying — it is finishing the set already there. A geometric vocabulary
is also the right register: figurative photography of worship would be both
off-brand and a sensitivity this app need not take on.

---

## Reference: the APIs

Four, all free, three needing no key. Every endpoint below was called and its
response read.

| | Base URL | Auth | What it is |
|---|---|---|---|
| HadeethEnc | `hadeethenc.com/api/v1` | none | 2,776 graded hadith, vowelled Arabic, ~65 languages |
| QuranEnc | `quranenc.com/api/v1` | none | 74 Qur'an translations by named translators |
| IslamHouse | `api3.islamhouse.com/v3` | public key `paV29H2gm56kvLPy` | The library: books, audio, video, 133 languages |
| enc.islamhouse | `cnt.islamhouse.com/api/v1` | none | 124 books aligned **phrase by phrase** across languages |
| Quran Foundation | `api.quran.com/api/v4` | none | Verses by juz/chapter, word audio, word timings |

**HadeethEnc search exists** — the parameter is `phrase`, not `text`, and it
matches Arabic:
`/hadeeths/search/?phrase=سبحانك اللهم وبحمدك&language=ar` returns five hits. An
earlier note in this project said no search existed and that matching the app's
citations would need a crawl. It does not.

**`cnt.islamhouse.com` is the find.** `books/page-data/819?page_number=1&transes=en`
returns Hisn al-Muslim as phrases with stable ids, vowelled Arabic, and each
translation alongside. All twelve pages:

```
768 rows — every one with an English translation
133 headings   ← the occasions
245 duʿa lines ← the words, vowelled
306 footnotes  ← the citations, with collection, volume, page and number
```

Those footnotes arrive as text — *"Narrated by Abu Dāwūd, 4/325, no. 5095, and
At-Tirmidhi, 5/490, no. 3426"* — which is the shape of `HadithSource` in
[`sources.ts`](../src/content/sources.ts). Hisn al-Muslim's own book translations
cover `en` and `ar` among the app's locales, **not fr or es**; that limit is
about the book text only, and the audio catalogue is a separate holding that
does have French.

**A HadeethEnc MCP server** is live at `https://hadeethenc.com/mcp/` — handshake
confirmed, tools `search_hadeeths` / `get_hadeeth_by_id` /
`get_hadeeths_by_ids`. Wiring it into this repo would mean content work searches
real hadith rather than reconstructing from memory, which is the failure mode
`sources.ts` opens by warning about.

### Correction, 21 Aug: numbering, and where it really lives

Two claims above are wrong and are left standing rather than quietly fixed.

**"No site in this family maps a collection number to a text."** True of the
family, and I over-concluded from it. `cnt.islamhouse.com` serves Bukhari as
177 pages / 7,070 paragraphs **in book order**, so position stands in for
numbering — row 159 *is* Bukhari 159, verified against the app's own citation
at 1, 135, 159, 164, 168 and 185. But it **drifts**: 7,070 rows against 7,563
standard numbers, and row 248 is the Barāʾ narration that is standard 247.
Exact in the low hundreds, unreliable deep in. A day was spent before that was
measured rather than assumed.

**The real answer is a fourth source.** `github.com/fawazahmed0/hadith-api`,
static JSON over jsDelivr, carries the Six Books **with the collection's own
numbering** — the thing nothing else here has. All 109 of the app's numbered
citations resolve against it. Its Arabic agrees with Hadith Unlocked on 10 of
11 spot checks and with IslamHouse wherever IslamHouse has not yet drifted,
which is what makes the drift above measurable at all.

| | |
|---|---|
| Licence | Unlicense — a public-domain dedication |
| Delivery | Static files, downloaded to a gitignored `.cache/`, never called at runtime |
| Extras | `arabicnumber` beside `hadithnumber`; up to four graders per narration |
| Holes | ~408 narrations have an **empty** `text` — 203 in Muslim alone |

`hadithunlocked.com` covers the holes, lazily, and keeps Muslim's letter
suffixes (`8a`) where this one collapses them into an entry it leaves empty.

**HadeethEnc's search is a loose OR match capped at 100 results**, which the
note above missed by testing only short duʿas. A common phrase returns a
hundred narrations with the right one nowhere near the top. Distinctiveness
lives at the END of a matn — search there and keep the window returning FEWEST
hits. That correction alone took cross-checks from 1-in-12 to 44-in-107.

### Licensing — and the one that applies to every mirror

**Every English translation of the Six Books in circulation is the same
licensed corpus** — Darussalam and Aḥmad Ḥasan, via sunnah.com. Proved rather
than assumed: Abu Dawud 135 reads *"how is the ablution (to performed)?"* — the
same typo — in fawazahmed0, in hadithunlocked.com and on prophetmuhammad.com.
A public-domain dedication on a compilation does not reach the translation
inside it.

So: prefer HadeethEnc's own translation, which has published terms; fall back
to Darussalam's **flagged on the text itself** via `translationFrom`; and rely
on it being a quotation — around a hundred narrations out of thirty thousand,
each under the instruction it supports, in an app that is free and never sold.
Iyad's decision, taken with the risk stated.

### Licensing — one clean, one not

- **HadeethEnc publishes terms**, in its API documentation: *"No modification,
  addition, or deletion of the content. Clearly referring to the publisher and
  the source (HadeethEnc.com)."* Satisfiable with attribution held as data, the
  way `audio-sources.ts` already does. The first clause bites: trimming a clip
  or shortening a translation breaks it.
- **IslamHouse publishes none.** `/terms/` and `/about/` both 404; only a
  privacy policy exists. Their GitHub says content stays "subject to
  platform-specific terms" — terms not written down anywhere findable. ⚠️
  **Before shipping their audio or book text at scale, email
  admin@islamhouse.com.** A licence question, not a technical one.

---

## Open questions

Things a wrong assumption would waste real work on.

1. **The Arabic face.** Amiri is the recommendation — open naskh, built for
   Qurʾanic setting, ~400KB. If there is a face already in mind, it should be
   that one.
2. **Posture drawings.** Schematic line figures are proposed. Every printed
   prayer book uses them, so there is precedent — but it is a judgement about
   register.
3. **The IslamHouse licence email.** Needs sending before Phase 4 ships their
   content at scale.

---

## Backlog

Ideas raised but not worked through. Nothing here is committed.

_(empty — next additions go here)_

---

## Shipping

| Changed | Reaches the device via |
|---|---|
| Every phase, 0 through 6 | `npm run update:preview` (OTA) |

**No phase in this plan needs a native build.** Phase 1 was written expecting
one and did not need it: `expo-font` was already a dependency, so `useFonts`
and the font files both ride an OTA. Nothing since has touched `app.json`
plugins or a native module.

No server, no migrations.
