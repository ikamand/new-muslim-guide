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
| **4** | [Duʿas, and the first network call](#phase-4--duas-and-the-apps-first-network-call) | ✅ **Done** — `d9bd351`, and its held half is now Phase 7 | OTA |
| **5** | [The Qur'an tab](#phase-5--the-quran-tab--juz-30) | ✅ **Done** — `eed5214`, and its held audio is now Phase 8 | OTA |
| **7** | [The Duʿa tab](#phase-7--the-dua-tab) | ✅ **Done** — 27 Aug. Tab, book, Today's card, 37 occasions placed in the day, and the tab redrawn to carry Arabic | OTA |
| **8** | [Audio that saves itself](#phase-8--audio-that-saves-itself) | ✅ **Done** — 26 Aug. Save-on-play and the storage screen. **Needs `eas build`** | ⚠️ **Build** |
| **9** | [~~Bet 4: the Arabic letters~~](#phase-9--dropped-25-aug) | ❌ **Dropped 25 Aug** — it is an Arabic curriculum, not a feature | — |
| **10** | Downloading a voice, a juz at a time | ↩︎ **Merged into 8** on 25 Aug — same store, same build |
| **11** | [Four questions, on every teaching page](#phase-11--four-questions-on-every-teaching-page) | ✅ **Done** — 26 Aug. All 30 pages, plus `npm run style:check` | OTA |
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

> **Both holds below were released on 21 Aug**, when Iyad confirmed IslamHouse
> permits non-commercial redistribution and that the app will never be sold or
> carry advertising. Kept rather than deleted, because the reasoning is why the
> phases were ordered the way they were. See
> [Tuesday 25 Aug](#tuesday-25-aug--three-workstreams).

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

> **Amended 21 Aug — one exception, Al-Fatiha.** The rule below still holds for
> all 564 ayahs of juz 30 and the reasoning under it is unchanged. What it did
> not consider is that Al-Fatiha is not optional: it is recited in every rak'ah
> of every prayer, and somebody three weeks into Islam has to say it *tonight*,
> five times, before they can read a word of Arabic. Withholding the line there
> does not protect their reading — it stops them praying. So `ayahTransliteration`
> in `content/quran/surahs.ts` returns a line for surah 1 and nothing for
> anything else, and the text is the one already in `recitations.ts`, copied
> rather than written again.
>
> It resolves structurally, not by a flag: the generated ayahs have no
> transliteration to return because it was never fetched. The rule for juz 30
> cannot be broken by forgetting.

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

### 5.2d Built 21 Aug: the prayer's recite step opens the surah

The four "Recite Al-Fatiha" steps — 5, 13, 22 and 29 across the prayers — sent
people to `/practice`. That was right when the practice screen was the best
Al-Fatiha screen the app had. It isn't any more: the surah plays straight
through gaplessly, plays any single ayah, covers a line to test it, offers eight
reciters and remembers when you know it.

So `RecitationCard` routes through `surahForRecitation` — a map, not a check for
the string `'fatiha'`, because the moment a second surah is recorded for the
prayer it should be one line and not an `if` inside a component. Everything with
no surah still goes to `/practice`.

Two things had to land first or the reroute would have been a **downgrade** for
exactly the person it is for — someone on a mat, mid-step, who cannot read
Arabic:

- **Transliteration**, per 5.3's amendment above.
- **Slower**, at 0.75×, the same rate `practice.tsx` uses so one surah does not
  sound like two apps. Set as `playlist.playbackRate`, never as an option — the
  hook rebuilds the playlist when an option changes and the audio would stop
  dead mid-ayah.

Three controls wrapped badly on a 390px phone, stranding "Slower" alone on the
second row. "Play the surah" now takes a full row of its own with repeat and
slower paired beneath it, which says the right thing about which is primary.

#### `/practice` hides itself, and comes back on its own

**Decided 21 Aug.** Not redundant by design — it renders every recitation with a
*recorded* clip, and it is the only home the takbir, tashahhud and salawat will
have. Redundant **today**, because Al-Fatiha is the only thing recorded.

What settled it: with transliteration and slower added above, the surah screen
is a **strict superset** for those seven ayahs. There is not one thing
`/practice` does better. Keeping both promoted means the same person meets
Al-Fatiha in two different treatments depending on which door they took — and
one door is worse. That inconsistency is the harm; duplication alone would have
been tolerable.

So all three entry points hide themselves while `hasPracticeBeyondSurahs()` is
false — the Learn card, Today's finished-journey row, and the "Qur'an" help
topic, which was the leak that would have made hiding the other two pointless.
The route stays alive and still renders if reached directly. No list to
maintain: the condition is derived from which clips are in the bundle, so the
screen returns by itself the day a clip lands that is not a surah.

⚠️ **This is not a short hold.** Those twenty clips need a reciter commissioned
— `docs/audio-recording-brief.md` — so until that happens this is a removal in
everything but name, and `practice.tsx` is code nobody exercises. That is the
honest cost, and it is the right trade: a screen that reappears when it has
something to say beats a duplicate reachable three ways.

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

## Future work — not in this plan

### French and Spanish (was Phase 6)

**Taken out of the active plan 25 Aug.** Iyad: *"leave phase 6 out of this plan
but keep it for future work — I want to focus on English for now."*

235 of 695 strings are translated into each. `TranslationGap` already marks a
screen that is not fully translated, so a partly-translated app tells the truth
about itself rather than looking finished.

**This makes Phase 11 cheaper, and that is not a coincidence.** Phase 11
rewrites ~5,700 words of English and would have dropped every touched line's
French and Spanish back to English. With translation deferred, that cost is
zero — the work that was going to be paid for twice is now paid for once, in
the right order. Deferring translation is the correct move *because* of Phase
11, not despite it.

The original phase reasoning is kept below, because the ordering argument is
what makes it safe to defer.

#### The original Phase 6 reasoning

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

### 27 Aug — the app runs out after three hours

Iyad: the Shahada card says "Read" and then "Read it again" and then nothing,
while holding the second-largest slot in Learn forever; and the two onboarding
questions make no visible difference to what the app shows.

Both are true and both were measured. **`docs/learning-model.md`** is the
audit: the journey is 123 minutes over 36 lessons, the whole non-duʿa
catalogue is 186 minutes, and the twenty possible onboarding answers produce
three distinguishable app states. `recommendations.ts` — 236 lines of
stage × interest tables — is called by no screen. It also carries what a
brand-new, a second-year and a fifth-year Muslim each need, and what the app
has of it.

Published: https://claude.ai/code/artifact/271ee7bf-6397-4db1-a99f-c602f303d782

### 28 Aug — four candidate APIs, tested

Iyad supplied four. **`docs/expansion-plan.md`** is the evaluation and the
build plan that follows from it. Two are worth taking: AlAdhan's 99 names
(free, no key) and the Pray API's 30 Qur'anic duʿas, which verify against
QuranEnc. Two are rejected — ummahapi cites volume-and-page rather than
hadith numbers, and islamic.network's Quotes/Stories/People/Events are
Naqshbandi devotional content whose Arabic is marked
`claude-retranslation-from-en` in the data.

islamicapi's `zakat-nisab` is the one endpoint needing a key. **Get the key,
never ship it** — it belongs in a build script beside `hadith:corpus`.

The plan's centrepiece is not a source but a gate: `npm run verify:import`,
which self-tests its comparator before it reports. Every Sahih Muslim
citation in the Pray API failed against the corpus (0/7) — the known
two-numberings problem — and that is the argument for the gate rather than
against the source.

Published: https://claude.ai/code/artifact/589e9bcb-cbf5-4241-af03-d0de2f73345e

### 28 Aug — the build order

**`docs/build-order.md`** merges the two above into one sequence: thirteen
phases in four stages. Foundations first and invisible (the import gate,
`Cadence`, the `collection` kind); then a deliberate pilot pair that stops for
eyes (the 99 names, and Today/Learn); then what the app knows about you; then
content, paced, with Jumuʿah leading.

**Start at Phase 0 and build nothing else until it passes.** It carries a
"not doing" table so the four rejected sources, runtime API calls, Arabic
literacy and streaks are not re-litigated.

Published: https://claude.ai/code/artifact/ca1842f9-7b6e-4fc3-b782-b563191663c1

Nothing there is decided. The one thing in it flagged for the scholarly
reviewer rather than for design is `references.ts:565`, which tells someone
arriving mid-prayer to join the line and stops.

### 29 Aug — a persona pass, and five decisions out of it

A "think as a new Muslim" review plus research on making the app smart. The
finding that framed it: the content shelf is nearly complete for the first two
years — the gaps are modality (voice, ambient surfaces, time-shape), not
pages. Decided by Iyad the same day, all queued behind recite-with-me:

- **Recite with me** — the mic follows your Fatiha; **`docs/recite-with-me.md`**
  is the plan and its Phase 0 spike already passed the fluent baseline at
  100%. The active work.
- **Ramadan mode** — Ramadan as a mode of Today, not a screen;
  **`docs/ramadan-mode.md`**. A placement project, not a content project: one
  new page (fasting where nobody else is), everything else is existing
  reviewed content given a time-shape. Deadline logic: machinery needs eyes by
  mid-January 2027.
- **A private line on each First** — one optional sentence, written by the
  reader, stored with the observations, shown nowhere else. The ledger
  becomes theirs; the app becomes a witness. Small, OTA.
- **A lock-screen widget / Live Activity** — the prayer countdown where eyes
  already are; the iftar countdown during Ramadan. ⚠️ Native work and a
  build, and the first feature that puts "Maghrib 8:14pm" where a family
  member might see it — a toggle, off by default, for exactly the users
  CLAUDE.md names.
- **The smart direction endorsed** — `quote-dont-answer.md`'s Phases 0–1
  (aliases, the real eval) when picked up, with the selector now targeted
  **on-device** (Apple Foundation Models / Gemini Nano reachable from RN as
  of 2026) instead of on a server — no server, no bill, and the 1am question
  never leaves the phone; the travelling trigger (build-order Phase 4's held
  item); and the two window notifications (adhkār opening, Thursday night).
  Direction, not a work order — nothing scheduled yet.

Also recorded in `build-order.md` Phase 13 the same day: the word-by-word
gloss is only half blocked — `api.quran.com/api/v4` serves per-word English
(`word_translation_language=en`, verified by calling it), so the Qur'anic
texts can gloss today; the tashahhud and tasbīḥāt still need a publisher.

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

---

# Built today — Tuesday 25 Aug — and what is left

**Built overnight on 26 Aug — phases 7, 8 and 11 are all closed.**

- **11.** One file owns the look (`constants/teaching.ts`), a component set is
  the only thing allowed to read it, the cards are gone (294px → 350px text
  column), and all 30 teaching pages carry answers-first blocks, question
  headings and 29 promoted narrations — one hero each. `npm run style:check`
  guards it and caught a blank hero on `what-is-islam` before it shipped.
- **7.** 37 of the book's 132 occasions placed in the day, hand-written because
  placement is a judgement. The day still teaches only the nine checked duʿas;
  the book is a door beside them, not content.
- **8.** Audio saves itself on first play, to `Paths.document` so the system
  cannot delete it, with a storage screen that can. ⚠️ **This one needs
  `eas build --profile preview --platform android`** — `expo-file-system` is
  native, so no existing build will be offered it.

⚠️ **Nobody has seen any of it on a phone.** Typecheck, export, lint, the style
guard and the manifests all pass; that is not the same as eyes on a screen, and
this document has said so all day.

**Built on 25 Aug, in order:** the rawatib citations · Dhuhr's 2 + 2 · the
"Prayed by choice" inversion · the istikhara duʿa out of the drawer · qiyam
al-layl and witr · Al-Ikhlas at the recite step · the three quls bundled · the
Duʿa tab · Hisn al-Muslim fetched and browsable · Today's duʿa card.

**Left:** Phase 7's mapping of 132 occasions onto six moments (editorial, needs
Iyad) · Phase 8's save-on-play and storage screen (needs a native build) ·
Phase 11 (28 pages, its own day). **Phase 9 is dropped.**

⚠️ **Three checking tools were found broken or blind by this day's work**, all
recorded in their own commits: `content:audit` does not run at all
(`require()` in `prayer-images.ts`); `audio:manifest` was blind to 15 bundled
clips; `arabic` reported 54 Arabic strings while the app displayed 372. Two are
fixed. `content:audit` is not.

⚠️ **The commit messages from this day say "22 Aug" and are wrong.** A
mid-session clock told the model the date had rolled back three days and it
stamped everything with it. The dates in this document are corrected; the
commits are not, because rewriting pushed history to fix a date stamp costs
more than it is worth. If a commit from this range cites 22 Aug, read 25 Aug.


**Everything outside the numbering is done.** Commits `875eb1d`..`main` on
25 Aug: the rawatib citations, Dhuhr's 2 + 2, the "Prayed by choice"
inversion, the istikhara duʿa, qiyam al-layl and witr. Each section below that
is marked ✅ shipped that day.

⚠️ **Verified by export and by reading the rendered HTML, not by looking at a
screen.** There is no browser automation on this machine. Routes, row labels
and the generated step lists were all checked; nobody has seen it running.

⚠️ **`npm run content:audit` does not run.** It dies on the `require()` calls
in `prayer-images.ts` — Metro resolves those at build time and plain node
cannot. Pre-existing, from `7cb06ed`, not caused by this work. One of the
tools CLAUDE.md relies on is unavailable until it is fixed.

**Still to build: phases 7, 8, 9, 10 and 11.** None started.

---

# The Tuesday workstreams (this is that Tuesday)

Planned 21 Aug, on a session with no build budget. Two things changed the board
since the phases above were written, and both came from Iyad rather than from
the code:

1. **The licence question is closed.** Iyad's instruction, 21 Aug: treat the
   sources as open and build. IslamHouse permits non-commercial redistribution,
   the app is free and never advertises, and the everyayah position is not
   something to keep re-raising. Phase 4's held content and Phase 5's held
   audio are both released. **Decided — do not reopen it in a later session.**
2. **The duʿa book gets its own tab.** Iyad's call, and it is better than
   putting 245 texts on the day screen: a tab is how this app already treats a
   pillar of content, and it keeps Today obeying Phase 2's rule that Today
   holds only what has a deadline.

---

## Phase 7 — The Duʿa tab

**The problem the current screen has.** `src/app/duas.tsx` renders six moments
of a day over ten duʿas. That is the right *form* — a convert does not know a
duʿa for putting on clothes exists, so an index cannot help them — but ten texts
is a demo of the idea, not the thing itself. Hisn al-Muslim has **133 occasions
and 245 texts**.

### ✅ Built 25 Aug — 7.1 a day on top, the book underneath

Two surfaces, not one, because they answer different questions:

| Surface | Question | Content |
|---|---|---|
| **The day** (tab root) | What do I say right now? | The curated set — one or two per moment, the ones a beginner actually meets |
| **The book** (pushed from the day) | Is there a duʿa for _____? | All 133 occasions, in the book's own order |

`DayArc` in [`src/components/illustrations.tsx`](../src/components/illustrations.tsx)
already draws the sun's path and stays as the tab root. `DAY_MOMENTS` in
[`src/content/duas.ts`](../src/content/duas.ts) has six entries — waking,
washing, leaving, eating, travel, night — and mapping 133 occasions onto six
moments is the content work of this phase, not a mechanical import.

**What this removes:** `src/app/duas.tsx` stops being a standalone route and
becomes `src/app/(tabs)/duas.tsx`. Any link to `/duas` from Learn or Today
becomes a tab jump, not a push.

### ✅ Built 25 Aug — 7.2 Today's duʿa card

A card on Today showing one duʿa, tapping through to it in the tab.

**Not random.** Pure random shows a sleeping duʿa at nine in the morning, which
teaches the opposite of the thing the day screen exists to teach. Two rules:

- **Pick from the moment the current time falls in.** The app already knows
  the prayer times; the moment is derivable from them, and CLAUDE.md prefers
  what the app can infer over what the user must configure.
- **Stable for the calendar day.** Seed the choice on the date so it does not
  reshuffle on every render or every app open. "Today's duʿa" that changes
  when you come back to the tab is not today's anything.

### ✅ Built 25 Aug — 7.3 the content, generated

245 texts is not something to transcribe, and CLAUDE.md is explicit that a file
that size only exists legitimately if every character came over the wire.

- A script under `scripts/` fetching `cnt.islamhouse.com/api/v1`, writing
  `src/content/duas/hisn.ts` with a generated-file header, in the pattern of
  `src/content/quran/juz30.ts` and `src/content/evidence.ts`.
- **Deduplicate against the ten already there.** The app's own duʿas carry
  citations in `sources` and, in one case, bundled audio. Those win; the book
  supplies what the app does not already have.
- **Provenance rides on the text.** `arabicFrom` / `translationFrom` per text —
  not as a licence hedge but because a credit detached from what it credits gets
  lost when the text moves, and because a reviewer needs to know which publisher
  printed which wording.

⚠️ **Say the cost plainly: this is the single largest addition to the unreviewed
pile the app has ever made.** `docs/scholarly-review.md` opens by saying wrong
answers here change how someone worships. 245 texts, their translations and the
occasion each is attached to all need a qualified reviewer, and the pile is
already the thing gating a public release. Worth shipping the *machinery* on
Tuesday and gating the content behind review, rather than putting 245 unreviewed
texts in front of users.

### ✅ Built 27 Aug — 7.4 the tab stopped being an index of itself

Iyad, on a screenshot: *"this page should look a lot better and follow how the
general style and design."* He was right, and the diagnosis is worth keeping
because it is a class of failure rather than a layout bug.

**Every other tab puts content on the screen; this one put a table of
contents.** Qur'an shows `الفاتحة` beside the name. Today shows the times and
the mihrab. Learn shows a glyph per topic. The duʿa tab showed five words and
five numerals — and 7.1 above argues, in its own words, that *an index cannot
help them*. It had become the thing it was built to replace. Most concretely:
**the tab about words to say carried no Arabic at all** while a sitting was
open, in an app whose best asset is Amiri.

What changed, all of it inside components that already existed:

| | Before | After |
|---|---|---|
| Row | `Morning adhkār` · `26` | + `أَذْكَارُ الصَّبَاحِ`, and `26 to say · 7 min` |
| Hero | `ASR WAS 4:52 PM` | `ends at Isha, 9:02 PM` |
| Header | a bare word | the `paddingTop` + intro block Learn and Qur'an share |
| `paddingBottom` | `Spacing.six` (64) | `BottomTabInset + Spacing.four` |

**The numeral column mixed units.** Sessions passed `stepsFor().length` and the
book row passed `HISN.length`, so `26` meant lines and `132` meant occasions in
one column. Both now say what they count.

**`windowAt` knew both ends of every span and returned only the one already
behind the reader.** It now carries `until` as the day's own `PrayerTime`,
which is what killed the screen's private `sinceLabel` table of
window→`'Fajr'`/`'Asr'`/`'Isha'`. That table would have gone on saying ʿAsr the
day the evening boundary moved to Maghrib — a change the file's own header
flags as open. `until` is absent for exactly two windows and both are honest:
after a prayer the boundary is a grace period, and after ʿIshāʾ it is
*tomorrow's* Fajr, which `today` does not hold. `npm run adhkar:check` asserts
that presence-or-absence over 7,200 minutes and was proved to fail when `until`
is removed.

**Two things the mockup got wrong and the running screen corrected**, kept here
rather than quietly fixed:

- It said the evening sitting *ends at Maghrib*. It ends at **ʿIshāʾ** —
  `windowAt` deliberately takes the union of the mainstream positions, so
  ʿIshāʾ is the honest end of what the tab offers.
- It set the hero's Arabic beside the title, the way the Qur'an tab sets a
  surah. `الأَذْكَارُ بَعْدَ السَّلاَمِ مِنَ الصَّلاَةِ` is seven words and
  collided with it — and that hero is on screen for twenty minutes after each
  of the five prayers, so it is not an edge case. Arabic now takes its own
  line in the hero and in every row, one shape that fits the longest name.

**What was proposed and dropped:** a `DayArc` at the head of the tab, to fill
the empty third of the screen. Once the rows carried Arabic the screen ended
four pixels short of the fold on a 390×844 phone with nothing to fill, and an
arc on top of that would have been decoration standing in for content. The
Amiri is the ornament, and it means something.

⚠️ **Morning and evening are named by SPLITTING the book's one shared
heading** — `أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ`. Mechanically, not rewritten:
morning is its first two words verbatim, evening is the same first word plus
the third with its leading `وَ` dropped. Nothing is composed, but **the
vowelling is unreviewed**. `arabicNameFor` falls back to the heading unchanged
if the book moves under it, and `npm run hisn:check` fails loudly when that
happens — proved by rewording the heading and watching it exit non-zero.
`HISN_ARABIC_TITLE` (`حِصْنُ الْمُسْلِمِ`) is the one Arabic string on the tab
not copied out of `src/content`: the generated `hisn.ts` carries no title for
the book its occasions came from.

**Not translated.** The five new keys join `adhkar.*`, of which FR and ES
already translate zero — so this adds to an existing gap rather than opening
one.

### ✅ Built 28 Aug — 7.5 the book screen reads the annotations too

Iyad, on a screenshot of `/dua-book/1269190`: *"this also should be fixed and
counts should be applied."* He was looking at a card whose entire contents were
the sentence **"Three times."**

**The data was already right; one screen was not asking.** Hisn prints the three
Quls and then a bare row reading `(ثلاثَ مرَّاتٍ)`. `annotations.ts` has carried
that count onto the three above it — `1269196/1269200/1269205: repeat 3`,
`1269211: omit` — since the file was written. `/adhkar/[id]` read it through
`stepsFor` and showed `×3`; `/dua-book/[id]` rendered `occasion.lines` raw and
showed the orphan. So the two screens rendering the same occasion disagreed,
and the book was the wrong one: a count attached to nothing, and no count where
the count belonged.

`stepsForOccasion(occasion, sitting?)` now holds the derivation and
`stepsFor(session)` is a wrapper over it. The rules were never session-specific
— only the sitting filter is. **There is no version of this where two screens
each keep their own copy of "what the book's rows mean" and stay in agreement.**

What actually moved, measured across all 132 occasions — **129 are byte
identical**:

| Occasion | Rows → cards | Counts shown |
|---|---|---|
| Morning and evening | 29 → 28 | 11 → 14 |
| After the prayer | 11 → 14 | 2 → 6 |
| Adhkār of sleep | 19 → 17 | 1 → 1 |

The three Quls gain `×3`; the tasbīḥ, taḥmīd and takbīr become three cards at
`×33` each instead of one row with the counts buried in its prose; the two
page-break continuations — the tail of Sūrat an-Nās, and al-Baqarah 286 under
285 — fold back into the verse they belong to.

**A rule copied without checking it, caught by the numbers.** The first version
suppressed the badge on instructions, mirroring the reader. Sleep's count went
1 → 0 and that was wrong: `/adhkar/[id]` forces an instruction's target to 1 so
nobody taps three times to get past "join the palms and blow into them" — a
statement about the counter mechanic, not about whether the count exists. Line
1269284 says to wipe over the body **three times**, and the book prints it. The
book screen shows the count on instructions; the reader still does not count
them.

`npm run hisn:check` now walks every occasion the book screen can open and
fails if any step's whole text is a parenthetical — the shape of an orphaned
count. Exactly one row in 318 trips it raw; zero survive annotation. Proved by
deleting the `omit` and watching it exit non-zero.

⚠️ **This shows no less of the book.** Every row is still on screen; what moved
were counts and labels that were never text to recite, each a named entry in
`annotations.ts` with its reason beside it.

---

## Phase 8 — Audio that saves itself

**Rewritten 25 Aug**, on Iyad's question: *"why download surah 78, 79, 80 if
it's never used or has not been needed yet?"*

**He is right, and the earlier plan here was wrong.** It said bundle all 564
ayat of Juz 30 — ~76 MB — in Husary Muallim. That ships An-Naba's 40 ayahs to
somebody who will never open it, and every user pays for it in download size,
mobile data and storage.

### 8.1 The rule: save on first play, with no button

**Tap play → it streams AND writes to disk. Second time it is local.**

Iyad asked whether a download button should sit beside repeat and next. **No**,
and the reason is the one CLAUDE.md already states: *prefer what the app can
infer over what the user must configure.*

- A download button asks somebody to predict whether they will want surah 93
  offline **later**, which they cannot know now.
- It puts an un-pressed icon on 37 rows, which reads as 37 chores rather than a
  library.
- Save-on-play gets the same result with no decision: the surahs a person
  actually uses are exactly the ones that end up on their phone.

The behaviour is invisible and cannot be wrong.

### ✅ Built 25 Aug — 8.2 the bundled set

**Al-Fatiha (already in, 7 clips) plus the three quls — Al-Ikhlas, Al-Falaq,
An-Nas.** Well under 1 MB against 76.

Not an arbitrary starter set: those four are what a beginner actually recites —
Al-Fatiha in every rakʿah, Al-Ikhlas at the recite step (see 8.5), and the
three quls in the morning and evening adhkar and after every prayer. **It means
the worship path never touches the network**, which is the promise that
matters. Everything else is a learning surface, and a learning surface may
stream once.

### 8.3 Two places an explicit control does earn its place

- **A storage screen in Settings** — what is saved, how much space, delete.
  **Not optional.** Saving automatically with no way to see or clear it fills
  somebody's phone invisibly, which is worse than the download button this
  phase just refused.
- **One "download this juz" action**, for the deliberate case: somebody about
  to board a flight. At the juz level, not per surah, and not in the player.

### 8.4 This merges Phase 8 and Phase 10

Both need `expo-file-system`, both need a native build, and the difference
between "save this surah" and "save this reciter's juz" is **a key in the same
store**. Building them apart would pay the build cost twice and write the
storage screen twice.

⚠️ **So Phase 8 now needs a full `eas build`**, where the bundle-everything
version did not. That is the price of not shipping 76 MB to everybody, and it
is worth it. `runtimeVersion` is on the fingerprint policy, so existing preview
builds will stop being offered the update rather than break on it.

### 8.5 What this removed from the plan

- The 76 MB bundle, and the "one voice complete" framing with it.
- The claim that Phase 8 rides an OTA. It does not any more.
- Phase 10 as a separate phase.

---

### ✅ Built 25 Aug — Al-Ikhlas at the recite step

Iyad's proposal, 25 Aug. **Small change, and it fixes something that is broken
rather than adding something that is missing.**

**What the step says today.** [`prayers.ts:449`](../src/content/prayers.ts#L449)
renders *"Recite any other short passage of the Qur'an."* Every other step in
the prayer gives you the words. This one gives you homework — and it is the
born-Muslim assumption in its purest form, because **a convert of three weeks
knows no other passage**. The existing note, *"Until you know one, Al-Fatiha
alone is enough"*, is a permission slip rather than a path.

**Al-Ikhlas, on evidence rather than taste.** Four ayat. Already in the app
twice — [`juz30.ts`](../src/content/quran/juz30.ts) as surah 112 and
[`learn/who-is-allah.ts`](../src/content/learn/who-is-allah.ts) citing
`quran(112, [1, 4])`. And it is the surah the Prophet ﷺ said equals a third of
the Qur'an, so it is the canonical first one rather than merely a short one.

**Why it belongs in Phase 8 and not before it.** Al-Fatiha has seven bundled
clips; Al-Ikhlas streams. Teaching Al-Ikhlas at the recite step today would put
a network request in the middle of the worship path — the one thing that must
survive a dead signal. Once 8.1 brings all 564 ayat in-house, Al-Ikhlas is
offline-safe for nothing.

**The plumbing was left open for this.**
[`surahs.ts`](../src/content/quran/surahs.ts) already holds
`SURAH_FOR_RECITATION = { fatiha: 1 }` under a comment saying the second surah
is one line there rather than an `if` in a component. Take it at its word.

**Two calls worth making now:**

- **Do not copy the text into `recitations.ts`.** Al-Ikhlas exists in
  `juz30.ts`; storing it twice is what this codebase avoids everywhere else.
  The step wants a `saysSurah: 112` that renders from surah data — because
  somebody standing on a mat needs the words **on the step**, not behind a tap.
  The tap-through to the surah screen stays as well, as Al-Fatiha's does.
- **Keep the ruling honest.** The short surah is sunnah; Al-Fatiha alone is a
  valid prayer. The current note says so and must survive the rewrite. Teaching
  a default must never read as stating a requirement.

**What it removes:** the "any other short passage" instruction, and the only
step in the prayer that does not tell you what to say.

### 8.4 Word-synced highlighting

`api.quran.com/api/v4` supplies per-word millisecond segments. Bundle the
segment JSON alongside the audio — it is small, and a highlight that depends on
a request while audio plays from disk is a bug waiting for a tunnel.

---

## Phase 9 — DROPPED, 25 Aug

**Iyad killed it, and he was right.** Kept here rather than deleted, because the
reasoning is worth not repeating.

### What was proposed

Teaching letter recognition from the texts a convert already recites — the
observation being that Al-Fatiha alone carries 21 of the 28 letters and
Al-Fatiha plus the three quls carries 26. The transliteration line would come
off word by word as recognition was demonstrated, until the page someone opens
five times a day had turned into Arabic.

### Why it does not survive contact

- **The letters are about a fifth of reading, and the proposal treated the rest
  as free.** It claimed harakat "come free because the mushaf is fully
  vowelled". That is wrong. A mark being printed is not the same as knowing
  what it does: sukun, three cases of tanwin, shadda and madd all have to be
  taught, and past those sit the tajwid rules that decide whether a recitation
  is correct at all. `بْ بٍ بً بّ` is not a detail on top of ب.
- **Once the vowels cannot be hand-waved, this is an Arabic literacy
  curriculum**, not a feature. It would become the largest thing in the app.
- **And it changes who the app is for.** The promise is how to pray, three
  weeks after the shahada. Somebody who intends to pray in English and
  transliteration for the rest of their life is not a failed user of this app —
  they are the primary one. Making literacy the route to full use quietly
  reclassifies them.

### What the Arabic in the app is actually for

Iyad's answer, and it stands: authenticity, beauty, and the readers who already
have Arabic. One thing to add — it is also the **referent**. Somebody reciting
from transliteration is still looking at the real words of what they are
saying, not a substitute for them. That is worth carrying even for a reader who
will never decode it.

### The slot this leaves empty, and why it is not empty

Phase 9 was the roadmap's "identity bet" — the thing making this app different
rather than a good version of a familiar category. Dropping it appears to leave
that unfilled.

**It is already filled, distributed rather than concentrated.** The identity is
the convert-first framing everywhere: that the rawatib are taught *because
every born Muslim absorbs them and almost no convert is ever told*; that the
help chip says "I lost count" and not "When something goes wrong"; that a page
exists to say no dream is coming after istikhara; that the recite step prints
Al-Ikhlas instead of asking for "any other short passage". Fifty apps have
prayer times. None of them do that.

It is not a feature that can be pointed at in a store listing, which is
probably why the slot kept reading as empty.

---

## Phase 10 — Downloading a voice, a juz at a time

Iyad's proposal, 21 Aug, and it is the right architecture: **the teaching voice
is in-house; every other voice is downloaded on demand, per juz.** Nothing is
stored that nobody listens to.

**Not on Tuesday.** It needs `expo-file-system`, which is a native module,
which needs a full `eas build` — and Tuesday's three phases are all OTA. It is
also larger than it looks, for reasons below.

### 10.1 The rule that does not bend

**The learning path never waits for a download.** Husary Muallim is bundled and
stays bundled, because someone learning to recite must not meet a progress bar
between them and Al-Fatiha. Everything in this phase applies to the other seven
voices, which are for *listening*, not for learning.

### 10.2 It is a storage feature, not a download button

At ~76 MB a voice, a reader who collects three is holding ~300 MB. A download
affordance without a matching delete affordance is a way to fill someone's
phone with no way to empty it.

So the phase is really three surfaces:

| Surface | What it does |
|---|---|
| **Download** | On the reciter picker — size shown *before* the tap, never after |
| **Manage** | What is on the device, per voice per juz, with its real size |
| **Delete** | Per juz and per voice, reversible by downloading again |

Size must be stated before the tap. "Alafasy — 76 MB" is a decision someone can
make; a download that starts and then reports its size is not.

### 10.3 The states `ayahSource` grows

It has two cases today — bundled, streamed. This makes four, and the two new
ones are where the bugs live:

- **bundled** — Husary Muallim, always available.
- **downloaded** — on disk, plays like bundled.
- **streamed** — not downloaded, has signal, plays as today.
- **unavailable** — not downloaded, no signal. **This state must be designed,
  not defaulted.** The honest answer is to offer the teaching voice, which is
  always there, rather than fail: "Alafasy isn't downloaded and you're offline
  — play Al-Husary instead?"

Plus the partial cases: an interrupted download, a full disk, a juz that is
half on the device. A half-downloaded juz must read as *not downloaded*, never
as a surah that stops in the middle.

### 10.4 Build it for thirty juz, not for one

Juz 30 is 1 of 30. If the Qur'an ever grows past it, this is the machinery that
carries it — so **nothing in this phase hardcodes juz 30**. The unit is
`(reciter, juz)`, the manifest is a table, and adding juz 29 is data.

That is the real argument for building it at all. As a feature it is a comfort
for someone who already knows which reciter they like — which is not a
three-week-old convert. As infrastructure it is how the app stops being a
juz-30 app.

### 10.5 Ships via

⚠️ **Full `eas build`.** `expo-file-system` is a native module, `runtimeVersion`
is on the `fingerprint` policy, and existing preview builds will correctly stop
being offered this update rather than crash on it. Plan the build in, and do
the OTA phases while it runs.

---

## ✅ Built 25 Aug — the rawatib citation has numbers

Iyad spotted it 25 Aug: [`prayers.ts:102`](../src/content/prayers.ts#L102) says
*"The twelve come from Umm Habiba's narration in Sahih Muslim"* **and gives no
number**, and it attributes the breakdown across the five prayers to
HadeethEnc's own *explanation* (65715) rather than to a narration. Exactly the
failure CLAUDE.md names: a reference nobody can open.

All three below were **read from `.cache/hadith`** (fawazahmed0, which carries
each collection's own numbering) on 25 Aug — not remembered.

### The twelve — Sahih Muslim 728

Umm Habibah. `arabicnumber` **728.03**, continuous no. 1696, book 6 hadith 126.

> مَا مِنْ عَبْدٍ مُسْلِمٍ يُصَلِّي لِلَّهِ كُلَّ يَوْمٍ ثِنْتَىْ عَشْرَةَ رَكْعَةً تَطَوُّعًا غَيْرَ فَرِيضَةٍ إِلاَّ بَنَى اللَّهُ لَهُ بَيْتًا فِي الْجَنَّةِ

Four narrations sit under 728. `.02` has the *twelve sajdahs* wording and `.01`
/ `.04` are variant chains, so **cite 728 and let the sub-number be 728.03** —
the app's `hadith()` helper already takes a suffixed id, as `muslim 391b` in
this same file does.

### The breakdown — Jamiʿ at-Tirmidhi 414

ʿAisha, book 2 hadith 267. Four before Dhuhr, two after, two after Maghrib, two
after Isha, two before Fajr — the itemisation the app currently takes from an
explanation. Graded **Sahih by al-Albani and by Ahmad Shakir**; Zubair Ali Zai:
*Isnaad Hasan*.

⚠️ **This one needs the reviewer, and the reason is in the collection itself.**
Tirmidhi's own closing words on it:

> حَدِيثُ عَائِشَةَ حَدِيثٌ غَرِيبٌ مِنْ هَذَا الْوَجْهِ. وَمُغِيرَةُ بْنُ زِيَادٍ قَدْ تَكَلَّمَ فِيهِ بَعْضُ أَهْلِ الْعِلْمِ مِنْ قِبَلِ حِفْظِهِ

Gharib by this route, and Mughirah b. Ziyad was criticised for his memory. The
parallels — **Ibn Majah 1140** and **Nasa'i 1794 / 1795**, both Albani-Sahih —
carry the same matn **through the same Mughirah → ʿAtaʾ → ʿAisha chain**, so
they corroborate the wording and not the chain. Do not present them as
independent corroboration. Whether the breakdown is taught as established is a
substance call and belongs in `docs/scholarly-review.md`.

### Do not quietly mix in — Sunan Abi Dawud 1269

Umm Habibah, book 5 hadith 20, Albani Sahih:
*من حافظ على أربع ركعات قبل الظهر وأربع بعدها حرم على النار*.

**It says four after Dhuhr, where the twelve say two.** It is a virtue of one
part, not a restatement of the total. If it ever appears near the rawatib
counts it needs a sentence saying so, or it reads as the app contradicting
itself.

### ✅ Built — the four before Dhuhr are 2 + 2

Iyad, 25 Aug, listing the rawatib: *"duhr has 4 — (2+2) before, and after 2."*
**The counts in [`prayers.ts:31-38`](../src/content/prayers.ts#L31-L38) are
already exactly right** — Fajr 2 before, Dhuhr 4 before and 2 after, Asr none,
Maghrib 2 after, Isha 2 after. Twelve. Nothing to correct.

**What is missing is the structure.** `sunnahBefore: 4` renders as `4`, and a
beginner reads that as one continuous four-rakʿah prayer with a single taslim.
That is not what most people pray, and it is the born-Muslim assumption again:
everyone raised Muslim knows the four are two prayers of two, and nothing in
the app says it.

**The type has to carry units, not just a total.** `sunnahBefore: 4` wants to
become something that can express `4, as 2 + 2` — and the same change would let
Maghrib and Isha stay `2` without pretending to a structure they do not have.

⚠️ **The evidence is genuinely contested, and the plan records it rather than
picking the tidy version.** Read from the corpus 25 Aug:

- **Abu Dawud 1295** and **Nasa'i 1666** — Ibn Umar: `صَلاَةُ اللَّيْلِ وَالنَّهَارِ
  مَثْنَى مَثْنَى`. Both **Albani: Sahih**.
- **But Nasa'i appends to his own narration:** `هَذَا الْحَدِيثُ عِنْدِي خَطَأٌ وَاللَّهُ
  تَعَالَى أَعْلَمُ` — he considers it an error, i.e. he rejects the `وَالنَّهَارِ`
  addition that is the whole basis for applying it to daytime sunnah.
- **Bukhari 990 / Muslim 749** carry the same hadith as `صَلاَةُ اللَّيْلِ مَثْنَى
  مَثْنَى` — night prayer only, no "and the day".
- **Bukhari 1182** — ʿAisha: `كَانَ لاَ يَدَعُ أَرْبَعًا قَبْلَ الظُّهْرِ وَرَكْعَتَيْنِ قَبْلَ
  الْغَدَاةِ`. Four before Dhuhr, stated as a unit, silent on taslim.

**So this is a schools-differ case, not a right-and-wrong one.** The majority —
Shafiʿi and Hanbali — pray the four as 2 + 2. The Hanafis pray them as one
block with one taslim, which is the same school difference `prayers.ts` already
flags in its ⚠️ note.

**Decision: teach 2 + 2**, because it is the majority practice and because two
short prayers are less to hold than one long one for somebody new. Note the
Hanafi difference in one plain sentence in the step's `note`, as CLAUDE.md
requires for a difference a beginner will actually meet — and they will meet
this one, standing next to somebody in a mosque.

### The work

- Replace the bare "in Sahih Muslim" with `hadith('muslim', '728.03', …)`.
- Cite the breakdown to Tirmidhi 414 rather than to HadeethEnc's explanation.
- Keep the existing ⚠️ REVIEW REQUIRED note — the Hanafi difference it already
  records is untouched by any of this — and add the gharib point to it.
- Widen `sunnahBefore` / `sunnahAfter` so a count can carry its units, and
  render "4 (2 + 2)" rather than "4".
- `npm run evidence` afterwards, so the narrations render under the citation
  the way every other one in the app does.

---

## ✅ Built 25 Aug — "Prayed by choice" is inverted

Iyad, 25 Aug: *"the whole section is messy."* It is, and the code says so
itself. [`pray.tsx:119`](../src/app/pray.tsx#L119) routes every voluntary row
to `/guide/[id]`, and the comment **six lines below it** reads:

> *The how and the why are different pages on purpose. A guide walks the
> movements, which for all three are the movements they already know — what a
> reader actually needs is what the prayer is FOR.*

The comment is right and the `href` above it does the opposite. Tapping
"Tahajjud" lands you in a twenty-three step walkthrough of a two-rakʿah prayer
you already know how to pray, and "Asking God to choose" — the page that exists
to correct the thing everybody gets told wrong about istikhara — is reachable
only through a link at the bottom of the section.

### The inversion

| | Today | After |
|---|---|---|
| **Tap a voluntary prayer** | 23-step generated guide | The reference page: what it is, and what it is for |
| **The movements** | The default, unavoidable | One tap deeper, behind **"Pray two rakʿahs"** |
| **"Asking God to choose"** | Reachable only via a footer link | It *is* the istikhara destination |

**Why this is right and not merely tidier.** For the five fard prayers the
guide *is* the content — nobody wonders what Dhuhr is for, they wonder what to
do with their hands. For a voluntary prayer it reverses: the movements are the
ones they already pray five times a day, and the open question is *why am I
standing here, and when*. The three reference pages already answer that and are
already written.

**Keep the guide, one tap down.** A convert of three weeks may genuinely not
know the two-rakʿah script yet, and `buildPrayer` generates it for free. It
stops being the wall you hit first.

### The wiring

- One `href` in `pray.tsx`, plus an id map: the specs use `tahajjud`,
  `istikhara`, `tawba`; the references use `tahajjud`, `istikhara`,
  **`tawba-prayer`**. Align the ids or map them — do not let it silently 404.
- The footer link to "what these prayers are for" is then pointing at the place
  the rows already go. **Delete it.**

### ✅ Built — the istikhara duʿa is on the page

Iyad's point, and the sharpest one of the day: *"istikhara has the istikhara
duʿa at the end of it — that should be the main thing after making the 2
rakʿahs, not inserted in the where it comes from."*

**Correction to what this document said earlier.** It claimed the duʿa was not
in the app. **It is.** [`evidence.ts`](../src/content/evidence.ts) holds it as
`bukhari:he3293` — full Arabic, transliteration and English, verbatim from
HadeethEnc — and it renders inside the "where it comes from" disclosure. That
is exactly what Iyad is looking at, and he confirms the text is right.

So this is **not a content problem, it is a placement problem.** The most
important words on the page are sitting in the citation footer, underneath the
section that describes them without printing them. Nothing needs fetching, no
source needs choosing, and **it no longer depends on Phase 7** — the istikhara
work stands alone.

**The wording: `وَعَاقِبَةِ أَمْرِي`.** Iyad's call, 25 Aug — both alternatives mean
the same thing, so pick one. This one because the narration gives it first,
with `أَوْ قَالَ` marking the second as the narrator's own uncertainty; because it
is shorter, which matters to somebody memorising; and because it is what the
printed duʿa collections carry as their main text.

**Keep the two jobs apart.** The evidence footer keeps the narration **verbatim,
both alternatives intact** — it is a quotation, and a quotation is not edited.
The instruction prints the single chosen wording, because there the app is
teaching rather than quoting. Same text, two purposes, one place each.

**The work:** move the text from the citation into
`voluntary-prayers.ts`'s "The words" section as an actual `Recitation`, and
delete the ⚠️ comment saying it is not printed yet along with the note
apologising for its absence.

### ✅ Built — Qiyam al-Layl added

Iyad, 25 Aug. **Qiyam al-layl is already defined in the app and not offered.**
`voluntary-prayers.ts` closes the tahajjud page with *"If you have not slept,
you are praying qiyam al-layl — also good, also voluntary, and not what this
word means"* — a definition of a thing with nowhere to go.

**Findability is the case for it**, the same one that renamed the rows above:
*qiyam* is announced at mosques through Ramadan, so it is a word a convert
meets in their first Ramadan and cannot look up here.

**One line in `PRAYER_SPECS`**, as CLAUDE.md intends:

```
{ id: 'qiyam', title: 'Qiyam al-Layl', when: 'Any part of the night, before you sleep',
  rakahs: 2, aloudRakahs: 0, kind: 'voluntary' }
```

⚠️ **The risk, named once.** Tahajjud and qiyam al-layl differ by exactly one
fact — whether you slept first — and two adjacent rows invite "which do I
pick?" from the person least able to answer. Mitigation is in the `when` line,
which should state the distinguishing fact rather than describe the mood:
*"before you sleep"* against tahajjud's *"after you have slept"*. If those two
lines do not make the difference obvious at a glance, the second row is costing
more than it earns.

## Phase 11 — Four questions, on every teaching page

Iyad, 25 Aug: *"the when, how many, do I have to, how — should be across all
learning and teaching content. Simplify for the reader and make it pleasant to
read and learn."*

**This is the largest thing in this document and the most likely to be worth
it.** It is not a witr change or a voluntary-prayers change. It is a change to
the `Reference` type and to every teaching page in the app.

### The problem it fixes

`voluntary-prayers.ts` is `body` strings of 40–60 words each, and it is typical
of the app. Somebody awake at 3am asking *when can I pray this* should not read
a paragraph to find out. Prose is the right shape for an argument and the wrong
shape for a fact, and the app currently uses it for both.

### The four rows

| Row | Answers | Example — witr |
|---|---|---|
| **When** | Is it now? | After Isha, any time until dawn |
| **How many** | What am I committing to? | One, three, five — any odd number. One is enough |
| **Do I have to?** | The only ruling question a beginner has | No — but it is how the night prayer is closed |
| **How** | ↳ opens the guide | *Pray one rakʿah* |

**"How" is a route, not a sentence.** It is the button already designed for the
voluntary prayers, promoted into the block. That is what keeps the four rows
honest: three facts and a door, rather than four facts of which one is a lie
about how simple the movements are.

**Rows are optional.** Food, clothing and family have no "how many". A block
that pads itself to four rows on every page is the data-slop version of this
idea.

### Take the form, drop the register

The sheet Iyad showed carried *"Status: Sunnah Mu'akkadah, while the Hanafi
school considers it Wajib."* To a convert of three weeks that is four unknown
words and no answer to the only question being asked. The app's version is
**"No, you don't have to. Most people who pray at night do it anyway."** Same
ruling, no vocabulary tax.

A fact sheet written in the tradition's own shorthand is an index for somebody
who already knows the words — the reader this app is explicitly not for. The
form is right; the vocabulary is what makes most Islamic apps unusable to the
person this one is for.

### What stays prose

**"No dream is coming" cannot be a bullet.** That section exists to undo
something the reader was told wrongly by a cousin, and undoing a belief needs
an argument. Same for "you have to sleep first", and for anything answering
*why*. The block handles *what*; the prose keeps *why*, and gets shorter
because it is no longer also carrying *what*.

### Pleasant to read

Iyad's word, and it is a typography job rather than a content one: the block
wants its own visual treatment — label and value on one row, label in `caption`
at `textSecondary`, value in `default`, hairline between rows — and it must not
look like a table. Tables read as reference; this should read as answers.

### Bring the evidence up out of the drawer

Iyad, 25 Aug: *"a lot of 'where it came from' sources have hadiths and great
information — should we add that stuff in the main learning sections?"*

**Yes, selectively — and this is the second time the same bug has been found.**
The istikhara duʿa was buried in the citation footer too. There is a pattern
here worth naming: **the app hides its best-sourced material in a drawer under
prose a model wrote.**

Measured 25 Aug: **`evidence.ts` holds 164 entries averaging 79 words** — 55
Qur'an ayahs and 109 hadith, roughly **13,000 words of authenticated text**.
The pages above them are model-written and awaiting review. The strongest
writing in the app is the part nobody opens.

#### The rule for promoting one

Not all 164. A citation drawer is doing real work when it proves a ruling the
prose already states plainly — that is provenance, and it belongs where it is.

**Promote a narration when it says something the prose cannot:**

- **A form of words** — a duʿa, a phrase to say. The istikhara duʿa is the
  clearest case: the thing you came for.
- **A number or a specific** the prose is only paraphrasing.
- **A reassurance whose force comes from whose words they are.** "The deeds God
  loves most are the constant ones, however small" lands differently as the
  Prophet's ﷺ sentence than as the app's. The tahajjud page currently
  paraphrases it in prose and puts the narration underneath — backwards.

**The test:** *would the reader be worse off if they never opened the drawer?*
If yes, it is content. If no, it is provenance and stays.

#### What it must not become

⚠️ **This fights Phase 11's own goal if done carelessly.** Phase 11 exists to
make pages shorter, and 79-word narrations are not short. A page that gains
three hadith and loses nothing has been made worse in the name of being made
better. **A promoted narration replaces the paragraph that was paraphrasing
it** — it does not sit next to it.

And nothing gets promoted as decoration. A hadith quoted because it is
beautiful, under a ruling it does not establish, is the failure mode that
`docs/scholarly-review.md` exists to catch.

### How the information should be displayed — the principles

Iyad asked for this researched rather than assumed. These are the ones that
apply to a reader three weeks into Islam, holding a phone, looking for one
thing:

1. **Headings are the questions, not the topics.** A convert searches with the
   sentence in their head, not a category name. The app already proved this on
   itself — Phase 2 renamed the help chips from "When something goes wrong" to
   **"I lost count"**, and it is the single most-quoted improvement in this
   document. Section headings should take the same treatment: "What it is"
   becomes "What am I actually doing?"; "How much" becomes "How little counts?"
   Roughly a third of the app's headings are already question-shaped; the rest
   are labels.
2. **Answer in the first sentence, qualify in the second.** Many bodies build
   toward the answer. Someone scanning reads sentence one and leaves. Put the
   answer where the eye lands, then the exception.
3. **One idea per block.** At 47 words the average body usually carries two or
   three. Split them; the block count going up while the word count goes down
   is the shape of success here.
4. **Progressive disclosure, deliberately.** Four rows answer the fast
   questions, prose answers *why*, the drawer proves it. Three depths, and a
   reader should be able to stop after any one of them and not be misled.
5. **Concrete beats complete.** "Set an alarm twenty minutes before Fajr"
   teaches more than an accurate paragraph about the night's thirds. The
   tahajjud page already does this well and is the model to copy.
6. **Never make the reader learn a word to get an answer.** If a sentence needs
   *mustahabb* or *wajib* explained before it can be understood, it is
   answering a scholar's question rather than the reader's.

**And the honest limit on all of it:** these are principles, not a validated
design. Which is exactly why the phase builds two unalike pages first and looks
at them before committing to twenty-six more.

### How it is built — one file owns the look

Iyad, 26 Aug: *"make sure style is very flexible and easily changeable, so if we
need to change something we go to one file and everything is themed."*

**The problem this solves, precisely.** The look of a teaching page currently
lives in three places: `reference/[id].tsx`'s `StyleSheet`, inline props inside
its JSX, and the type scale. The full-bleed source block is the clearest case —
it works because `margin: -20` cancels the page's `padding: 20`. **Two numbers,
two files, nothing enforcing that they agree.** Change the page padding and the
source silently stops reaching the edge.

#### `src/constants/teaching.ts`

Owns the semantic roles of a teaching page. Layout and colour roles only:

```
page.paddingH          the page's own margins
factRow.labelWidth
source.paddingH        shared by both weights — one block shape
source.hero            the page's answer — larger Arabic
source.quote           everything else
bullet.barWidth
```

> **Superseded, 26 Aug — the hero no longer breaks the margins.** This section
> was written with `page.paddingH` described as *"the ONE number the bleed is
> derived from"*, and `source.hero` as *"breaks the margins"*. Both are now
> wrong, and the entry above is the corrected one.
>
> Two reasons, in order of weight. **It did not read as a hierarchy.** Shown
> three built pages and asked what the design was doing, Iyad read it as
> *"some verses are full width and some are in bento boxes, is that by design
> and intentional?"* — an inconsistency, not emphasis. A treatment whose
> meaning does not reach the person who commissioned it is decorative, and the
> right response was to remove a mechanism rather than add a rule keeping it
> alive. **And the coupling was the exact thing this section exists to
> complain about**: `marginHorizontal: -20` in a component cancelling
> `paddingHorizontal: 20` on a page, two numbers in two files with nothing
> enforcing agreement.
>
> Both weights are now the same inset block. Prominence is carried by SIZE
> alone — `arabicLead` against `arabicQuote` — which is the one dimension
> `TeachingSource` always claimed to be varying and, until now, was not.
> `npm run style:check` still enforces one hero per page.

**Named for the role, never the look** — `source.hero`, not `bigGreenBlock`. A
later redesign then changes appearance without renaming anything, which is the
difference between a token file that survives and one that gets bypassed.

#### `src/components/teaching/`

`<Heading>`, `<Body>`, `<Bullet>`, `<SourceBlock variant>`, `<QuickFacts>` —
**the only files permitted to read those constants.** Screens compose
components; content stays pure data. Changing the whole look is then one file,
which is the thing being asked for.

#### The type scale is NOT extended

The mockups invented body at 17/28 and headings at 21/28. Neither exists —
and neither is needed. `themed-text.tsx` already has `lead` at 18/28 and
`cardTitle` at 20/26, within a point of both.

CLAUDE.md's rule is that a local `fontSize:` means the scale is missing a rung.
**Here the right move is the opposite of adding one: snap the design to the
rungs that exist.** A second scale living in a second file would be worse than
the local overrides the rule was written to prevent. Type stays in
`themed-text.tsx`; `teaching.ts` never mentions a font size.

#### `npm run style:check`

Fails — loudly, but as a warning — if a teaching screen carries a raw
`fontSize:` or `padding:`. The repo already guards its other invariants this way
(`arabic`, `audio:manifest`, `content:audit`), and without a guard the
abstraction leaks back within a month.

#### The honest cost

An abstraction too rigid becomes something pages fight. **This already
happened once in the mockups**: the hero-versus-supporting source rule did not
exist until the third page was drawn, and a stricter component set would have
made that page harder rather than better.

So components take an optional style override for genuine one-offs, and the
guard warns rather than blocks. A rule that cannot be broken gets worked around
in uglier ways than the thing it forbade.

### The size of it, measured

Counted 25 Aug rather than estimated:

| | |
|---|---|
| `Reference` pages | **28** — 20 in `learn/`, 6 in `references.ts`, 3 in `voluntary-prayers.ts` |
| `body` strings across them | **122**, averaging **47 words** |
| Prose in scope | **~5,700 words** |
| Translatable strings in the app | 695, of which **235** are done in each of French and Spanish (34%) |

**The translation cost is now zero.** Reference bodies are the largest single
category in `docs/i18n-manifest.csv`, and rewriting them would have dropped
every touched line's French and Spanish back to English. Translation was taken
out of the plan on 25 Aug — see
[Future work](#future-work--not-in-this-plan) — so this phase now pays for
those words once instead of twice. It is the right order, arrived at from the
other direction.

### Do two pages first, then the other twenty-six

**The failure mode here is deciding the format in the abstract and then
applying it twenty-eight times.** Four rows and a prose trim sound obvious on
paper; whether they are right is only visible on a screen.

So: **pick two pages that are as unalike as possible** — one procedural, one
not. `voluntary-prayers.ts`'s witr page (when / how many / do I have to / how,
all four rows earn their place) and `food.ts` or `family.ts` (probably no "how
many", possibly no "how" at all). Build those two, run them, **look at them**,
and only then commit to the other twenty-six. If the block looks like padding
on the second page, the design is wrong and two pages is a cheap way to find
out.

### Making it pleasant, specifically

"Pleasant" is a typography job, and the app already has the tokens for it:

- **Label in `caption` at `textSecondary`; value in `default` at `text`.** The
  question is scaffolding, the answer is the content.
- **Hairline between rows, no outer border, no fill.** It must not read as a
  table — tables read as reference material, and this should read as somebody
  answering you.
- **The block sits above the first section, under the subtitle**, with
  `Spacing.four` beneath it, so the page opens on answers and then continues
  into prose.
- **"Do I have to?" is the only row with a stance**, so it can carry `accent`
  on its value where the others do not. One coloured word per page.

### What gets shorter

Every `body` that currently opens by establishing *what* the thing is can drop
that sentence, because the block above now says it. The prose keeps *why*, and
gets better for carrying only that. **If this phase does not reduce the word
count, it has been done wrong** — it will have added a block and kept the
paragraph that the block replaces.

### Cost, plainly

- **28 pages, ~5,700 words, and a `Reference` type change.** Its own phase and
  its own day; not Tuesday.
- **Every rewritten body is new model-written content** on pages that include
  the salah path, so it lands in `docs/scholarly-review.md` — the pile that
  gates release. Rewriting for clarity is still rewriting.
- **`npm run i18n:manifest` after** — it fails if a locale file still
  translates wording that no longer exists, which is exactly what rewriting
  5,700 words will cause. Run it, do not skip it because translation is
  deferred.

⚠️ **The sheet Iyad showed is not usable as content.** Its citations are Reddit
and a charity's blog. Its facts happen to be broadly right and its numbers for
witr are verified above from the six books — but nothing goes in from it.

---

### ✅ Built — Witr, generated as one rakʿah

**Approved by Iyad.** Teaching someone to pray at night without telling them to
close it with witr leaves the instruction mid-sentence. Witr is also the one
voluntary prayer with a shape a beginner gets wrong unaided: tahajjud,
istikhara and qiyam are all the two-rakʿah prayer they already know, and witr
is not.

**Say it is an odd number — one, three, five — and generate the one.** Iyad's
call, 25 Aug, and the narrations state it outright rather than leaving it to be
inferred:

- **Sunan Abi Dawud 1422** — Abu Ayyub al-Ansari, **Albani: Sahih**:
  `الْوِتْرُ حَقٌّ عَلَى كُلِّ مُسْلِمٍ، فَمَنْ أَحَبَّ أَنْ يُوتِرَ بِخَمْسٍ فَلْيَفْعَلْ، وَمَنْ أَحَبَّ أَنْ
  يُوتِرَ بِثَلَاثٍ فَلْيَفْعَلْ، وَمَنْ أَحَبَّ أَنْ يُوتِرَ بِوَاحِدَةٍ فَلْيَفْعَلْ`
- Corroborated on separate chains: **Nasa'i 1710** (which adds seven) and
  **Ibn Majah 1190**, both Albani-Sahih.
- And the structure is stated too — **Nasa'i 1717** and **Abu Dawud 1359**: he
  prayed five `لَا يَجْلِسُ إِلَّا فِي آخِرِهِنَّ`, not sitting except at the last.

**So the page says the range and the guide teaches the floor.**
`{ id: 'witr', title: 'Witr', when: 'To close the night, after any night
prayer', rakahs: 1, aloudRakahs: 0, kind: 'voluntary' }` — one rakʿah is a
complete, valid witr, it is the least a beginner can get wrong, and the
quick-facts row carries the rest: **"One, three, five — any odd number. One is
enough."**

That split is the CLAUDE.md rule working as intended: the guide teaches one
clear path, the page states the difference a reader will actually meet.

Three reasons, in order of weight:

1. **It is what the text says.** Sahih Muslim **752** — Ibn Umar: `الْوِتْرُ رَكْعَةٌ
   مِنْ آخِرِ اللَّيْلِ`, *"Witr is one rakʿah at the end of the night."* Read from
   the corpus 25 Aug.
2. **It is the simplest instruction that is complete.** "After you finish
   praying at night, pray one more." Nothing to count, nothing to structure.
3. **It avoids a shape `buildPrayer` would get wrong.** `rakahs: 3` or `5`
   would generate a Maghrib-shaped prayer, sitting after every second rakʿah —
   and Nasa'i 1717 has him **not** sitting except at the last. `buildPrayer`
   cannot express that today, which is a second reason the generated guide is
   the one-rakʿah version until it can.

⚠️ **A correction, kept rather than quietly dropped.** This section originally
reached for a narration — "do not pray witr as three, resembling Maghrib" — to
justify point 3. **It could not be found in the six books in that wording** when
searched on 25 Aug, so it is not cited. What was found instead is better and is
above: Nasa'i 1717 states the structure positively, by describing what he did
rather than what he forbade.

**The school difference, in one sentence in the step's `note`:** most people
pray three, and the Hanafi school prays those three as one unit. The app
generates one because it is complete on its own and the least a beginner can
get wrong — not because three is worse.

**Held deliberately: the qunut duʿa.** It is a real part of witr for many, it is
another Arabic text needing a verified source, and it is not needed to pray a
valid witr. Add it when there is a text and a reviewer, not with the row.

⚠️ **Check `buildPrayer` actually generates a one-rakʿah prayer sensibly** —
every existing spec is 2, 3 or 4, so `rakahs: 1` is an untested path. Run it and
look at the screen before believing it.

**Cost, plainly:** witr and qiyam are two new reference pages of model-written
content on the salah path, which is the heaviest part of
`docs/scholarly-review.md` and the pile that gates release.

### The rows are named for the prayer, not for the page

Iyad, 25 Aug, on the mockup. The rows had inherited the reference pages' titles
— "Praying at night", "Asking God to choose", "The prayer after a sin". Those
are good *page* titles and bad *row* labels, and the difference matters:

| Row label | Under it |
|---|---|
| **Praying Tahajjud** | The last third of the night |
| **Praying Istikhara** | Ask Allah to choose when you have a decision to make |
| **The prayer of repentance** | Ask Allah for forgiveness |

**Why the row and the page want different names.** A row is scanned by someone
who heard a word and is trying to find it. *Tahajjud* and *istikhara* are words
a convert will hear said to them — in a mosque, by a friend, in a group chat —
and cannot look up in this app if the app has renamed them to something more
evocative. The page, already open, can afford the better title.

**The asymmetry in the third row is deliberate, not an oversight.** Iyad kept
"The prayer of repentance" in English where the other two carry their Arabic
names, and the reason holds: *tahajjud* and *istikhara* are heard as Arabic
words, *salat al-tawba* is mostly not. Name the row with whatever a beginner
will actually be searching for.

**Where the text comes from.** `PRAYER_SPECS` already carries `title` and
`when` for all three — `'Tahajjud'` / `'The last part of the night'`,
`'Istikhara'` / `'When you have a decision to make'`. The rows should render
from the spec rather than from the reference page, so the two stop having to
agree by hand.

⚠️ **One substance point on "the last third of the night."** The reference page
currently says "the last part of the night", and the page's whole argument is
*how small this is allowed to be*. The last third is the better time, not the
only valid one — someone who reads "the last third" as a requirement, decides
they cannot manage it, and drops the prayer has been taught the opposite of
what the page says. Iyad's wording stands; the note belongs on the reviewer's
list, and the page body should keep saying that any time after sleeping counts.

### Drawn, 25 Aug — three decisions the mockup made

Mockup: <https://claude.ai/code/artifact/caa49c0f-78e9-40c8-be21-91908ff138bb>
— three artboards at the app's real tokens, light theme. Approved by Iyad on
sight. What it settled that the prose above had left open:

- **The duʿa sits BEFORE "No dream is coming", not after.** Somebody who opened
  this page came for the words. Putting the correction second means it lands as
  *"here is what you say — and notice it never asks for a sign"* rather than as
  a warning standing in front of the thing they came for.
- **The duʿa card is the only element on the page with the accent border and
  tint** (`accent` / `accentMuted`). Every other section is
  `backgroundElement` + `border`. One card styled differently is what makes it
  read as the point of the screen rather than the third section down — and it
  is the whole reason the page stops looking like a list of paragraphs.
- **The "Prayed by choice" rows lose their rakʿah count and gain a chevron.**
  A count promises a prayer script; a chevron promises a page. The row should
  stop advertising the thing it no longer opens. The count moves into the
  section's help line — *"None of these is owed. Each is two rakʿahs."* — where
  it is said once rather than three times.

**Not drawn yet:** dark mode, and the guide's closing duʿa step.

### The guide should end with the duʿa

`buildPrayer` derives every prayer from two facts — rakʿah count and whether
the Qur'an is recited aloud. Istikhara has a third: **it ends with a
supplication that is the entire point of praying it.**

Add a `closingDua` to the spec rather than hand-writing an istikhara script.
One optional field, one extra generated step after the taslim, and the rule in
CLAUDE.md — *never hand-write a sixth prayer* — stays intact. Tahajjud and
tawba leave it undefined and are unchanged.

### What this removes

The 23-step wall in front of three prayers that did not need one, and the
footer link that was the only route to the page people most need.

---

## Tuesday's order, and why

1. **Phase 7** first. Highest content value, and the tab structure is decided
   rather than open.
2. **Phase 8** second. The download of 564 files is slow but unattended — start
   the script early and write Phase 7 while it runs. **8.5 lands the same day**:
   it is a few lines, and it is the payoff for bringing the audio in-house.
3. **Phase 9** is a conversation, not a commit. If Tuesday has room, spend it
   arguing about 9.2 rather than building.
4. **The rawatib citation** is a twenty-minute job with the numbers already
   found. Do it while something downloads.
5. **"Prayed by choice"** is small and self-contained — a good first thing
   while the audio downloads.
6. **Phase 10** is not Tuesday. It needs a build, and it is infrastructure for
   a Qur'an the app does not have yet — worth doing, worth doing after the
   letters.

## Shipping — all of it rides an OTA

**Phases 7, 8 and 9 ship over the air.** No native module, no `app.json`
change, no server. Bundled mp3s and bundled JSON are assets, and assets ride an
update — including the ~76 MB of Juz 30.

Going in-house on the audio is what makes this true: the cache was the only
part of the plan that needed `expo-file-system`, and `expo-file-system` is not
in `package.json`. Dropping the cache drops the build.

**Phase 10 brings it back, deliberately.** Downloading a voice needs a
filesystem, so that phase needs a native build — which is the main reason it
sits after the three above rather than inside them.

---

# Built 29 Aug — the design audit's six items

A full audit of the app's design ran on the web preview, screen by screen in
both themes, and rated it 7.5/10: a strong system worn unevenly. Iyad agreed
all six findings and ordered them built. Recorded here as each lands.

## 1 · The cartoon postures are gone — and drawn postures replaced them ✅

**Iyad's decision, in his words: the replacement must be "large and effective,
clear to see every step accurately — otherwise it shouldn't be there at all
until we figure something out."**

The nine flat-shaded cartoon PNGs contradicted the style decision recorded in
`illustrations.tsx` (line art in the app's own stroke, no imported cartoon) —
and one contradicted its own caption: the bowing figure's hands hung loose
beside "hands gripping your knees". Deleted from `assets/images/prayer/`
(recoverable in git history), the `require`s emptied out of
`content/prayer-images.ts`, the pipeline kept for a commissioned set.

**`PostureDiagram` in `illustrations.tsx` is the replacement**: nine large
line drawings on one stage — faint mihrab arch, ground line, 2.2-unit stroke,
body shapes filled with the card colour so nearer limbs occlude farther ones.
Front view where the hands are the information (qiyam, takbir, taslim),
profile where the silhouette is the ruling (rukūʿ, sujūd, the sitting).
Iterated against screenshots in both themes before porting. ⚠️ Unreviewed —
`docs/scholarly-review.md` §1.11 carries exactly what each drawing asserts.

## 2 · The diagram appears only when the body moves ✅

Four standing steps in a row repeated the same picture, and on "Seek refuge"
the words were below the fold. Now the guide shows the diagram on the step
where the posture *changes*; on a held posture the kicker names it and the
recitation leads. One asymmetry, deliberate: `sitting` straight after
`tashahhud` draws nothing (a finger lowers, the body stays), while entering
`tashahhud` is precisely when the finger diagram earns its place. `washing`
never draws — the tap glyph repeated on every wudu step taught nothing, and
wudu illustration is its own future piece of work.

## 5 · Two bugs — both verified on screen ✅

- The guide footer's Back button was styled `flex: 0`, whose implicit
  `flexBasis: 0` collapsed it to its padding and let the label spill past the
  corners — on every platform, not just web.
- `lib/notifications.ts` now answers honestly on web (no scheduler exists
  there), so Settings no longer crashes the web preview — which is the
  surface every check-by-looking pass in this repo runs on.

## 3 · Learn's card grammar ✅

Seventeen new glyphs in the set's grid and stroke, so every card carries a
mark — the interlocked rings for marriage, the minbar for Jumuʿah, the grave
marker, the khatim for Eid, the empty bowl for voluntary fasting, heat rising
for anger, and the rest. And `pairTiles()`: tiles are 48% with `flexGrow: 1`,
so a tile with no partner in its wrap row grew to full width with a tile's
vertical anatomy — glyph at the top, title at the bottom, dead air between.
Each run of consecutive tiles is measured and a leftover odd one is promoted
to a wide row. The prayer chooser and zakat cards join the same layout pass.
The doubled arrow on "Your firsts" was the string carrying "→" beside the
row's arrow icon.

## 4 · Welcome and Qibla ✅

The welcome step carries the mihrab arch with its star at opacity 0.4 — the
one screen every person sees had none of the app's identity. "Welcome to
Islam." under a title already saying Welcome became "Assalamu alaikum — peace
be upon you": the greeting is taught by being said. The qibla screen asks for
location itself instead of pointing at another tab, behind a kaaba glyph (the
cube, the kiswah band, the raised door) — and the same glyph rides the
compass arrow's tip, counter-rotated so the house stays upright while the
arrow swings. Verified against a granted fix: 58° from New York.

## 6 · Literata on the heading rungs ✅

`sectionTitle`, `subtitle` and `title` carry Literata SemiBold, loaded beside
Amiri and riding an OTA the same way. `caption` through `cardTitle` stay in
the system face on purpose — card titles double as button labels, and chrome
should not be literary. The subpath require bundles the one 250KB weight.
Looked at on Today, Learn, Qur'an and a guide step in both themes. **This is
a taste call and reverting it is two lines** — if it reads wrong on a real
phone, say so and it goes.

## What this batch needs to ship

OTA (`npm run update:preview`). The one dependency added,
`@expo-google-fonts/literata`, carries no native code — no podspec, no
gradle, no expo-module config — so the fingerprint is untouched and existing
builds accept the update.

---

# Built 29 Aug, second batch — priorities, not skips

Iyad, on seeing the arch strip star its second stage while the first sat
untouched: answers should define PRIORITIES, not skip stages — everything
still gets completed, but the order is the reader's; and the app should
remember what somebody was in the middle of. Agreed and built the same day.

## The stages sort instead of pointing ✅

`STAGE_ORDER` in `content/journey.ts` replaces the entry pointer: each
onboarding answer maps to a full ordering of the six stages, `orderedStages`
serves it, and `use-journey` lost its special case — "next" is simply the
first unfinished stage in YOUR order, and the star is always on the first
unfinished arch. One source of truth: the arch strip, the journey screen and
Today's carry-on all read the same ordered stages. "Start here" became **"The
basics"** (short label "Basics"), because a stage called Start can now sit
third. ("Foundations" was the first pick and does not fit under a 30px arch.)

## Learn's shelves sort by the same signal ✅

`GROUP_ORDER` beside `TOPIC_GROUPS`: teach-me and need-words lead with
Praying; on-my-own leads with Out in the world and the prayer reference moves
to the end. Re-sorts only when confidence moves — an answered question, or
`lib/competence.ts` watching them pray — never on a tap. A page that
reshuffles under a reader's hand is not smart, it is unfindable; the one
surface allowed to change daily is the carry-on slot, below.

## The app remembers what you were reading ✅

`observations.reading` (`lib/observations.ts`): when a lesson page unmounts
unfinished past 5% scroll, `LessonScroll` records how far the screen got —
once, on the way out, never per scroll event; a finish deletes the entry.
`useReadingInProgress` narrows the log to the one entry worth offering back
(most recent, unfinished, resolvable, within 14 days) and three surfaces
read it:

- **Today**: "You were reading" takes the carry-on slot ahead of the
  journey's next lesson — a book you are midway through beats one you have
  not opened.
- **Learn**: one quiet row under the Where-you-are card. The lesson's card
  does NOT move off its shelf — the row points, the shelf stays findable.
- **The card itself**: a thin line along its foot showing how far you got.
  A bookmark, not a score.

Verified end to end in the browser: answered onboarding as "prays on my
own" → Living leads the arches and Out in the world leads the shelves; left
"Who is Allah?" at 40% → the row, the Today slot and the bookmark all
appeared, and the store showed `furthest: 0.4`. Ships OTA; no native change.

---

## 30 Aug 2026 — the jadwal grammar ships, every screen

Decided with Iyad after he called the app's look machine-made and asked for
something Islamic and beautiful. Three artifacts led here: "Lapis and Gold"
(the three directions), "The Three Tabs" (the mockups he approved with
"build it"), and this build. The visual language is the Islamic manuscript
page — the analysis and the pigment palette live in the artifacts; the code
is the record of what shipped.

**The palette** (`src/constants/theme.ts`): colours named for pigments, one
job each. Lapis = structure and the ONLY pressable colour. Gold =
illumination, never a control. Vermilion = rubric (why a card chose
something; cautions). Malachite = correct/heard/done — green appears only
when something is right. `accent` survives as an alias for lapis. Light is
the canonical theme; dark (lapis night) derives from it.

**The grammar** (`src/components/jadwal.tsx`): Unwan, DoubleRule, Shelf,
Rosette, JadwalRow, QuietRow, Rubric, Action, Rule. The page is the
container — screens separate parts with rules and space, not boxes. This
replaced the `backgroundElement`+`border` pair that was inlined in 33 files.

**Fills that deliberately survive** — a fill means "this is a thing, not a
container": form inputs (zakat, firsts note, ask), the qibla dial (an
instrument face), the posture illustration ground in guide/[id], the
recite-follow listening bar (floats over content), and the lit ayah on
surah/[number] (`backgroundSelected` = the reading pool; the live ayah is
the lit one, replacing the accent-border highlight of commit 23dcea3 —
same meaning, different vehicle).

**State moved off borders**: Qur'an tab "known" and journey "stage done"
were accent borders around cards; they are now malachite marks / the count
itself. `TOPIC_GLYPH` (47 hand-assigned tiles) and `pairTiles` are deleted —
shelf rules and marginal numerals do that job with information.

**Held for eyes on a device** (commits `5be03ad`…): Learn without its glyph
tiles — if ruled rows rebuild the wall the tiles were added to break, the
tile is one revert away; and gold-on-parchment contrast at small sizes
(`#8E6A21` is pre-darkened; measure before lightening).

Everything ships OTA. Verified by screenshot in both themes: Today, Learn,
Duʿa, Qur'an, surah/1, settings, reference/what-is-islam.

---

## 30 Aug 2026 — Awqat: the card rebuilt, the day on the arch

The prayer-times feature is named **Awqat** (Iyad's choice, from the case
study at claude.ai/code/artifact/23c462e9-2222-480a-a705-24cad059f4b6, which
also holds the mosque-matching, monthly-jadwal and settings design still to
build). What shipped today, all OTA:

- **`awqat-arch.tsx`** — the mihrab whose outline is the sun's path. Spring
  line = horizon, crown = noon, legs = the dark; each prayer marked at its
  true moment (filled/ringed/hollow), the sun a travelling gold dot. The old
  DayArc is deleted from `illustrations.tsx` — merged, not removed: it
  duplicated the times row as a free-standing drawing and is now the arch.
- **The card** (`prayer-times-card.tsx`): next prayer inside the niche, time
  in gold; times row is the arch's baseline; the method prose moved to a
  "Prayer times" group on Settings (`PrayerTimesGroup`); Qibla stays as the
  quiet line. The month link joins it when the monthly jadwal exists —
  no dead taps.
- **The windows sheet**: tapping the niche (one target, not five dots) opens
  the five *spans* — each prayer's window with its end. ʿIshāʾ ends at the
  middle of the night in the fiqh sense (`SunnahTimes`, now on `DayTimes` as
  `middleOfNight`). ⚠️ The window-end wordings in `ui.ts` are rulings and
  sit in the scholarly-review pile; they follow the `times.endsAtSunrise`
  precedent for rulings that must live beside their times.
- **Motion**: the live mark breathes (~5s), the next prayer's ring blooms
  once when its time arrives. Both respect reduce-motion. Nothing bounces.
- **At `on-my-own` the Pray button and wudu line both go** — a reversal of
  the earlier "button stays" decision, on Iyad's call: it routes to the
  teaching walkthrough, which a fluent person never opens. The walkthrough
  stays one tap away on Learn.

Verified by screenshot: learner card (light), fluent card (dark, via seeded
`prayerConfidence`), and the windows sheet (synthetic tap). The headless
rig's clock disagrees with its faked coordinates, so the absolute times in
those screenshots are scrambled and the timezone caution fires — that is the
rig, and it is also proof the caution works.

### Same day, later — the rest of Awqat ships

- **Method + ʿAsr settings** (`80ca1c3`): `METHODS` catalogue, and
  `resolveProfile` as the single decision point. The reminder signature
  includes the choice so a method change reschedules notifications.
- **Match my mosque** (this commit): `lib/mosque-fit.ts` searches every
  method × school for the combination reproducing five board times; residues
  become `params.adjustments`. `npm run awqat:fit` is the check that fails —
  it generates a board from a known configuration and asserts recovery, and
  rejects an iqamah column (+25 across the board). Precedence lives in ONE
  hook, `use-awqat-profile.ts`: mosque > chosen method > inferred. Manual
  picks clear the match rather than silently stacking. The card carries a
  malachite-dotted "Matched to your mosque" caption.
- **The monthly jadwal** (`b3dd14c`): /awqat, bare clock times, Fridays
  gold, today lit, white days rubric; moon-boundary events held because
  `learn/voluntary-fasting.ts` promises the app will not date them.

Verified end to end in the browser: typed a board with Dhuhr +1 into
/mosque-match and it announced "Matched · Muslim World League · Dhuhr +1
min". Still to eyes: the whole flow on a device, and the ⚠️ review-flagged
wordings (windows sheet, ʿAsr help, mosque copy).

### 31 Aug 2026 — Awqat settings get a room of their own, and the save bug

Iyad's three catches, all landed: (1) the Prayer times group moved off the
Settings tab — the method list had made it the longest screen in the app —
onto `/awqat-settings`, reached by one row; (2) the method picker is a
disclosure, collapsed to the current choice; (3) the mosque-match save bug.
That bug had two stacked causes: `parseBoardTime` rejected any input with
AM/PM (so the save button never rendered — it only existed once a fit did),
and on a phone a successful match rendered below the open keyboard. Fixed:
meridiem input parses and is AUTHORITATIVE (a wrong PM is a non-match, not a
guess — pinned in `npm run awqat:fit`), the save button is permanent with a
caption saying why it is disabled, return walks the five fields and closes
the keyboard, and saving with no back stack lands on /awqat-settings.

### 31 Aug, later — Settings leaves the tab bar; the colophon

Iyad's call: the settings tab was the one tab that was neither worship nor
content. The bar is four now — Today, Learn, Qur'an, Duʿa — and Settings is
the **colophon**: the last quiet row at the end of Learn, beside "Your
firsts" (a keepsake register at the back of the book), because the colophon
is where a manuscript talks about itself. Bottom-of-Today was considered and
rejected by Today's own deadline test — the same test that killed the
permanent journey card.

Two of his other catches in the same pass: "You were reading" on Learn was
a grey line people missed — promoted to the same kicker row Today gives the
same content, bookmark included; and pressed-state highlights sat off-centre
because `keepsake` and the collection coda had top-only padding — the
highlight paints the padded box, so asymmetric padding is invisible until
the press. Both symmetric now, footprints unchanged via cancelling margins.

### 31 Aug, evening — the colophon reverses; Settings lands on Today

The colophon lasted one look: Iyad called it too buried, and reaffirmed his
original placement — so it is decided and built. Settings is the last quiet
ruled line at the foot of Today, the one deliberate exception to that
screen's deadline test, recorded as such in the code. "Your firsts" moved up
to sit directly under the shahada row. The promoted "You were reading" row
was floating between sections with the 32px screen gap on both sides; it now
lives inside the chapter section with a chevron, matching every other row.

---

## 30 Aug 2026 — Learn re-thread PROPOSED, not built

The Learn-tab audit found the tab running two orderings at once (journey
stages and by-moment shelves) with 22 pages unreachable by "Continue", and
grew into a full restructure: **tier → unit → lesson**, one universal
creed-first order, library on its own screen. The plan is
`docs/learn-redesign-plan.md` — status PROPOSED, awaiting Iyad's red pen on
the curriculum map. Three decisions already made by him in that session:
nothing hidden or locked, one universal order (confidence picks the open
tier), tier names *Your first weeks / The life that follows / Going deeper*.
Nothing in it is built; the five audit findings it folds in are listed
there. Until it is decided, the current Learn tab stands.


---

## 31 Aug 2026 — Progress: one ledger, permanent bookmarks, the room ✅

Decided with Iyad and built the same day, after the Awqat window fix (the
Pray button and wudu line now appear only while a prayer's window is open —
`findCurrentPrayer` in `src/lib/prayer-times.ts`, sharing `windowEnd` with
the windows sheet so the two cannot drift).

**The brief was his: "the best cleanest way to track progress manually and
automatically, so nobody wonders where their reads went."** The audit of the
existing machinery found two live bugs and two holes; the build fixed all
four and added the screen he asked for.

- **Answers seed the ledger, never shadow it.** `isLessonDone`
  (`src/content/curriculum.ts`) is a plain `completedLessons` lookup now; a
  yes to the shahada question WRITES `guide:shahada` into the ledger at the
  moment it is given (onboarding, the progress screen, and a one-time
  `progressSeeded` backfill in `use-settings.tsx` for older installs). This
  killed the broken circle: un-marking the shahada lesson used to silently
  add a key and could never succeed, because done-ness had a second source.
- **Bookmarks are permanent where the lesson lives.** The unit screen's
  lesson rows draw the reading bookmark from `observations.reading` with no
  horizon; the carry-on slot keeps its 14 days. A half-read page can no
  longer vanish everywhere at once. And `recordReading` now guards on the
  ledger, not on `finished` history, so a lesson un-marked for a redo
  bookmarks again.
- **Seed vs declaration.** `prayerConfidenceAt` (null = onboarding seed):
  observation still silently promotes a seed, but an answer given on the
  progress screen is a declaration and wins outright, both directions — the
  ratchet stops the APP demoting people, not the person correcting the app.
  Cost on the record in `src/lib/competence.ts`: after a declaration, silent
  promotion is off for that person until they declare again.
- **The room: `/progress`**, a quiet row at the foot of Learn's spine
  ("What you already know"). The two onboarding questions re-asked live
  (same strings), and every unit as a row with a whole-unit mark — six taps
  instead of forty for somebody arriving with real prior knowledge. The
  effective (promoted) confidence is what shows selected, because the screen
  reports what the app acts on.
- **Renames can no longer orphan progress silently.**
  `src/content/progress-keys.ts` maps old keys to new in both parsers, and
  `content:audit` keeps `docs/progress-keys.txt` (every key progress can
  attach to — 226 at time of writing) and exits non-zero when a key
  disappears without a migration entry. Verified by forcing all three
  failure paths.

Verified in the running app: seed backfill from a legacy store shape,
un-mark surviving reload, whole-unit mark/unmark, bookmark rendering,
declaration beating an injected promotion-worthy observation history.

Also: the previous section appeared twice verbatim at the end of this file —
an accidental paste, not a kept correction — and the duplicate was removed.

---

## 31 Aug 2026 — Awqat card: the quiet line becomes spandrel marks ✅

Iyad's idea, built the same day: the "August › / Qibla ›" text row at the
card's foot is gone, replaced by two drawn marks in the arch's empty top
corners — a jadwal mark (left, → `/awqat`) and a compass rose (right,
→ `/qibla`), `JadwalMark` and `CompassRose` in
`src/components/illustrations.tsx`. Spandrels are where an illuminated page
puts small ornaments, so the links now sit in space the arch was already
leaving empty and the card is one row shorter. Drawn as siblings above the
niche pressable, never inside it; 44pt targets; month name kept in the
calendar mark's accessibility label. One trap found on web: the SVG
`rotation` prop is not translated by react-native-svg-web, so the compass
needle's lean is baked into its path coordinates.

---

## 31 Aug 2026 — The spacing rule: a rule and the next box touch ✅

Iyad, with held-press screenshots: dead bands between rules and pressed
highlights, "spreading everywhere", spot-fixed repeatedly and never cured.
Measured root cause: vertical air between ruled/pressable rows was owned by
container `gap`s (8/16/32 depending on screen) and negative-margin
compensations — which paint nothing — instead of by the rows' own padded
boxes, which do. The firsts→where-you-are join measured 32px of unpainted
air between the rule and the panel.

**The rule, now the invariant: at any join involving a rule or a pressable,
the rule and the next box TOUCH; air lives inside painted boxes as padding,
never in container gaps or negative margins.** Applied: Learn's content and
section gaps went to zero (blocks own their air; the header's rule-to-rule
join takes paddingBottom), the keepsake's negative margins died as the
fossil compensation they were, Today's one-thing row and Settings share a
zero-gap foot, the tier screen's unit rows moved into one flush group, and
the unit screen's doors joined the lessons group. Verified by measurement
(dead air 32→0) and held-press screenshots at every named join. Card-to-card
joins (Today's cards) keep Spacing.two.

---

## 31 Aug 2026 — Style sources get teeth ✅

Iyad: "style consistency is everything — change one number and the dense
feeling is gone; change one string and the whole app updates." The
architecture already existed (theme tokens, the type scale, Spacing); what
was missing was enforcement, and the audit proved it: one hand-typed rgba,
eleven local font sizes across ten files, three negative-margin fossils,
five raw pixel paddings — every one a place a global change would not reach.

All fixed: inputs share `INPUT_TEXT` from the scale, the overrides that
restated or approximated rungs became the rungs (the niche's prayer name is
now the `subtitle` rung — Literata, as headings have been since 29 Aug; the
phrases head and source labels took `cardTitle`/`caption`), the modal
backdrop became a `scrim` token, the times row joined its divider in a
flush group instead of a negative margin, and the last raw pixels became
Spacing tokens.

And enforced: `npm run style:check` now FAILS on a hardcoded colour outside
theme.ts, a fontSize/lineHeight outside themed-text.tsx, any negative
margin, or a raw pixel padding/margin — allowlists carry their reasons in
the script (native header chrome, arch-fitted labels, ARABIC_NAME_TRIM).
All four rules were forced to fire and verified exit-1 before landing.
Still open, its own session: the `Column` layout component so flush joins
are composed, not remembered.

**Addendum, same day:** the rule reached the last two tabs, on Iyad's eye.
The Qur'an tab had 8px of unpainted air under all 38 surah rules and 24px
container gaps between header, progress panel, review row and list; the
Duʿa tab split its ruled rows across gapped groups, stacking a 24px gap
onto the Shelf's own 24px padding. Both now run their ruled content as one
zero-gap group — measured 0px and held-press verified.

---

## 1 Sep 2026 — Every prayer: obligatory first, and "owed" retired ✅

Iyad's brief, designed in two artifacts (his tiled reference, the flat
counter-proposal) and built as the merged cut he approved: the obligatory
count is the one big thing — the subtitle rung, Literata, lapis, five
numerals in a straight column (2 · 4 · 4 · 3 · 4) — and the sunnah is a
sentence in the row: "2 before", "2 + 2 before, 2 after" (from
sunnahBeforeUnits, so nobody prays four in one go), and on Asr the word
"none" instead of two dashes. Kept from the tiled mock, translated into the
house stroke: a gold time-of-day glyph per row (fajr/dhuhr/asr/maghrib/isha
joined GlyphName) and a legend whose dots key the colours — Obligatory =
required in lapis, Sunnah = recommended in gold. Left out, with reasons on
the artifact: pastel tiles, speaker icons, "None listed".

"Owed" is gone from the app's mouth: pray.fard is "obligatory" and the two
helper sentences moved with it. The intro simplified; the four-sentence
footnote shrank to the twelve-a-day line. The screen's four bands joined the
flush-join rule while it was open. The three pointer bands are otherwise
untouched.

---

## 1 Sep 2026 — Awqat card: signs on the line, and the row keyed ✅

From the two Today concepts Iyad brought, via the "Three Small Steals"
artifact: the arch's marks are now the day-glyphs at their true moments —
"on the line", his pick over the lamps — each on a paper disc so the outline
passes beneath the sign; passed prayers sink to the hairline gold (muted,
never ticked: a checkmark would claim they were prayed); the next prayer's
disc wears the breathing/blooming ring; the sun keeps its dot, gains a soft
halo, and now slips BEHIND the discs. The double arch is untouched — Iyad
kept it by name. `DayMarkAt` in illustrations.tsx embeds the same drawings
`Glyph` uses, one source, transform-scaled into the arch's viewBox (which
gained 6 units of crown headroom so the ring is never clipped).

The times row took the three steals: the day-glyph above each label, the
`backgroundSelected` tint behind the next cell (replacing gold-text-only),
and passed cells at 0.55 opacity. The tint promoted the old
Dhuhr-time-wraps nit into an eyesore, so times moved from smallBold to the
`small` rung on one line — the tint now carries the emphasis the bold did.
Rejected from the concepts, reasons on the artifact: cards/shadows, the
mosque photo, bell + hamburger, the progress ring, per-prayer checkmarks,
and "Ask anything about Islam".

---

## 2 Sep 2026 — The counting card: the sitting screen rebuilt ✅

Designed across five rounds of the "Counting Card" artifact with Iyad and
built as his final cut. What shipped, and the reasoning each piece carries:

- **The bookmark rule** replaced the tick strip — a hairline filling gold
  with "3 of 26" at its end, the reading rows' own idiom. Iyad's verdict on
  the strip stands in the code comment: it looked like information and told
  nobody anything.
- **The instrument circle** replaced the floating count pill: the count and
  a gold ring that fills live in a lapis circle at the thumb's rest, press
  to count, long-press to reset, never scrolling away the way the pill did
  on a ×100. The card still counts on tap — nothing taken from anyone. The
  pill's collision with the Arabic first line (held-press class of bug) is
  structurally dead.
- **Kind medallions** crown each card: the khatim for a Qur'an verse on the
  tinted card (tint stays Qur'an-only, Iyad's observation), the fortress
  for a Hisn al-Muslim line — the crown and the colour tell the same truth
  twice. Pinned outside the scroll, so long texts slide beneath.
- **The illuminated rosette** divides Arabic from meaning; short texts
  centre in the full-height card, long ones scroll as before.
- **The virtue slot** exists in the data (HisnAnnotation.virtue → AdhkarStep)
  and renders only when filled — each entry must come through the sourcing
  pipeline with its citation opened, then review. Iyad's concept mock
  misattributing Bukhari 5017 is the recorded cautionary tale.
- Rejected from the concept mocks, reasons on the artifact: stats bar and
  percent ring, 1-2-3 stepper, Listen (no recorded clips — the audio gate),
  the medal progress row, cross-sitting prev/next, bookmark icon.
- Named as the real gap beyond ornament: the sitting lines carry no
  transliteration (deliberate — IslamHouse publishes none, the app refuses
  to invent). Transliterating the ~30 session lines the way the salah
  recitations were done is the highest-value companion content task.

---

## 2 Sep 2026 — Duʿas from the Qur'an, recurated ✅

Iyad brought a blog list of the duʿas people actually say and the diagnosis
that the collection had drifted into a story anthology. The blog served as a
curation signal ONLY — every character still comes from QuranEnc. Out (7):
Lūṭ, Shuʿayb, Sulaymān 27:19, Mūsā 28:24, Yūsuf 12:101, Ibrāhīm 2:126–127.
In (8): ḥasbiyallāh 9:129, refuge-from-whispers 23:97–98, 17:80, the
reflectors' 3:191–194, Ṭālūt's company 2:250, 3:16, Mūsā's people 10:85–86,
Nūḥ 11:47. Kept against the axe, deliberately: Āsiyah, the mother of Maryam
(nearly the only women's voices), Ayyūb (said in illness). 33 entries; the
generator now takes [from, to] ayah ranges so 3:191–194 ships as ONE duʿa of
four whole consecutive ayahs.

Mid-run, QuranEnc went down (Cloudflare 524s) — and a full corpus was found
already in `.cache/quran/saheeh.json`, an orphan with no surviving writer.
Two fixes made it a system: `npm run quran:corpus` now fetches the whole
corpus reproducibly (114 sura requests, refuses partial writes), and the
generator reads the cache first with the network as fallback — the
`.cache/hadith/` pattern applied to source #3, so no QuranEnc outage can
stall a regeneration again. The orphan's bytes were then validated the only
honest way: `content:verify` against LIVE QuranEnc once it recovered — all
33 texts match word for word, nothing drifted.

---

## 2 Sep 2026 — Learn becomes the page being written ✅

Iyad brought two AI card mocks; the answer to the card skin was no, but the
exploration escalated — three in-grammar cuts (artifact "Learn, Rethreaded"),
then his push "you can do much better" produced the reimagining he approved:
**the manuscript metaphor made literal** (artifact "The Page Being Written").
Built in `learn.tsx` (rewritten), `jadwal.tsx` (`Frame` — the ruled frame the
component set is NAMED for, drawn at last), `illustrations.tsx` (`QalamMark`,
`BookArch`).

The grammar: a finished lesson is an inked line closed with an end-mark; an
unread one is a blank ragged rule — paper waiting, not homework owed; the
next lesson is half-written with the qalam resting where the ink stops, and
its ink GROWS with `recordReading`'s furthest (verified end-to-end on web:
read half of Halal and haram, return, pen mid-line). The tiers are an arcade
whose arches fill with ink to their fraction (`BookArch` clip), so
out-of-order reading — janāzah on Tuesday — shows at book scale. Inside the
frame: opening line (shahada, once said; the hero card still carries it
before), firsts, chapter, book map, ledger door. Outside: the reference
shelf, as marginalia.

Removed, deliberately: the where-you-are card, carry-on button, you-were-
reading row (Today still offers off-path reads), left-in-this-chapter list,
the chip strip, the tier doors, spine counts. Sides trimmed to Spacing.three
for the frame (the Awqat argument). Screens checked: 390/320, light/dark,
fresh + progressed states. Known knock-ons: tier names wrap to two lines at
320 beside six arches (acceptable); blank lines hide unwritten titles by
design — the unit screen lists them one tap in. Fallback recorded: if the
blanks confuse on device, ghost titles go ON the rules and everything else
survives. Draft chrome copy ("The opening line", "Being written now", "The
whole book", "Correct what the book assumes.") is Iyad's to reword.

---

## 2 Sep 2026 — The illuminated fihrist and the illuminated page ✅

Both built from the artifact pair ("The Fihrist Showdown", "The Illuminated
Page"), after the showdown against the ChatGPT card mocks. One idea drawn
twice: **learning the book is illuminating it.**

**Qur'an tab** (`quran.tsx` rewritten): the progress panel's girih band
became the count — 38 `GirihStar`s, one per surah in learning order, each
filled when ITS surah is marked known (per-surah truth, not a contiguous
fill; verified: marking An-Nas gilds star 2, not star 1). The list moved
inside `Frame flush` as a fihrist: `MushafRosette` numbers, known rows take
the selected-ground wash + filled rosette, the "known" word retired to the
a11y label. One vermilion `Rubric` — "then juz 30, backwards" — between
rows 1 and 114. Review row untouched.

**Surah screen** (`surah/[number].tsx`): header became a cartouche (name ·
meaning · Makkan/Medinan — `place` shown for the first time; new
`quran.place.*` keys). Ayah markers moved INSIDE the text as inline
`MushafRosette`s (View-in-Text; ⚠️ web-verified, device look pending — the
seat is `inlineRosette`'s translateY). Covered ayahs are blank ruled paper
with a filled rosette (the Learn page's language, reversed). The ayah head
row died: play moved beside the Latin lines, still a sibling of the cover
target, still present while covered so checking-by-ear works. The frame
earns ornament from state that already existed: corners (`GirihStar`) when
`hidden.length > 0` or known, midpoint stars + cartouche wash when the
reader marks it known. `listTop` now measured on the frame wrapper.

**Corrected en route:** the artifact claimed covering all ayahs records the
surah as known — wrong; it records a recitation (`surahDone`, review
bookkeeping). "Known" is only the reader's own mark (`toggle`), per that
button's own comment, and the build follows the code. **Not built,
deliberately:** the basmala line (content addition, review-gated) — the
artifact says so too. Whole chain verified on web: cover ×6 → corners →
mark known → completed frame → tab shows gilded row + star 2 + review slot.
Dark = lamplight, checked. Not yet seen on a real device.

---

## 2 Sep 2026 — The misbaha and the fortress; the first headpiece ✅

The Duʿa tab rebuilt from the "Misbaha and the Fortress" artifact, approved
same day ("beautiful, simple and elegant"). Two natures, two objects: the
four sittings are BEADS ON ONE STRAND (`Strand` in duas.tsx — thread and
tassel drawn as one bézier, bead positions computed on the same curve so
nothing can sit off the thread; the Awqat lesson, kept), the open sitting's
bead gold with a bloom ring, its card beneath (unchanged anatomy). The
library is the fortress: Hisn + Qur'an-duʿas rows wearing `HisnMark` and
`KhatimMark` under a "For everything else" shelf. Removed: the three
closed-session rows and their metas. Dead zone: no gold bead, the strand
sits quiet, `DuaCard` as before.

**The headpiece decision.** Iyad liked the warmth of the AI header images;
the recorded answer is the manuscript's own: `HeadpieceMark`
(illustrations.tsx) — a medallion with tendrils, tokens only, correct in
both themes — mounted via `Unwan`'s new `headpiece` slot. Duʿa is the pilot
tab; if it earns its place on device, Today/Learn/Qurʾan can take their own
medallions (sun, qalam, star). Never a raster: baked light is wrong in dark
mode and the app is used before dawn.

New strings: `adhkar.bead.*` (short captions under 30px beads — mandatory,
never mystery meat), `duas.group.else`. "After prayer" holds a strand
position it doesn't truly have (recurs ×5/day) — on record, Iyad may move
it to the tassel. Verified on web: live-morning light, dead-zone dark.

---

## 2 Sep 2026 — The fihrist's head: description, not command ✅

Two rounds on the artifact "The Fihrist's Head", both Iyad's calls. First
the structure: the head had become five strips of preamble; now it matches
Duʿa's pattern — rule, medallion (`HeadpieceMark`, same drawing; per-tab
variants still open), title, one line, rule, then the star band with its
count directly under the closing rules (Iyad moved it there from my
headpiece-slot proposal, for cross-tab consistency with the strand). The
reassurance sentence moved from preamble to the frame's foot — the Awqat
colophon position.

Second, the register — Iyad's catch, now a system rule: **Learn instructs;
the other tabs describe.** "Learn by heart" was a command in a title slot,
so `quran.title` is now the tab's own name ("Qur'an"), `quran.intro`
describes — "Al-Fatihah and Juz ʿAmma — the short surahs most often recited
in prayer" — teaching the name Juz ʿAmma by exposure, and `quran.progress`
says "known by heart" (a state, the surah screen's own words) instead of
"learned" (a task). All copy remains Iyad's to reword.

Standing check from his device screenshot: with only Al-Fatihah marked, the
band's FIRST star should be gold; his screenshot appeared to show the
second. Likely image scaling — but if the second star is truly gold on
device, that is an off-by-one to hunt.

---

## 2 Sep 2026 — The wound strand ✅

Iyad asked for bigger band beads over three rows "to match the feeling of
the duʿa masbahah"; the artifact ("The Wound Strand") showed grid vs strand
and he chose the strand. Built as `WoundStrand` in quran.tsx: all 38 beads
on ONE thread wound in three coils — the learning order runs ALONG the
thread (row two right-to-left, because the strand turned), gold travels
down it as surahs are marked known, and the tassel follows the last bead
(An-Naba, the juz's namesake — the strand ends because the juz does).
Beads stay eight-point stars (this tab's mark); the thread carries the
misbaha feeling. Row counts DERIVED from LEARNING_ORDER.length; bead size
scales from the measured width (12–20px) so narrow screens can't overflow;
positions and path share one set of constants (the Awqat rule). Display
only — the fihrist is the navigation. Verified 390 + 320; Duʿa tab also
checked at 320 (bead labels clear, no collisions).

---

## 2 Sep 2026 — ⚠️ RELEASE GATE: Android multi-window desync, undecided

Samsung pop-up/split-screen resize leaves the RN surface desynced: text
hard-clips mid-glyph with stale measurements and the touch map goes stale,
so tabs stop responding until the window is dragged back to fullscreen
(which heals it completely — Iyad's device, 2 Sep). The OTA-able nudge
(width-keyed remount in `_layout.tsx`, a20b1f8) did NOT fix it on device —
the desynced surface never delivers the resize event to JS, so no OTA-level
fix can. The nudge stays (harmless; helps devices that do emit, e.g. DeX).

**Iyad's instruction: decide and fix BEFORE app-store release.** The two
options, both needing a full `eas build` (fingerprint change — old builds
orphaned until updated):

1. **Recommended — restart the activity on resize:** remove `screenSize` /
   `smallestScreenSize` / `screenLayout` from `android:configChanges` via a
   small config plugin, so Android itself recreates the activity on a
   multi-window resize. Split-screen stays usable; a resize costs a brief
   reload. The OS doing forcefully what the nudge tried politely.
2. **Opt out of multi-window:** `resizeableActivity: false`. No pop-up or
   split-screen at all; Play large-screen guidance frowns on it.

Batch the chosen fix into the NEXT native build — do not ship to stores
with this undecided. Fullscreen use is unaffected either way.

---

## 2 Sep 2026 — The reading pages: matn wa-sharḥ under the two-inks law ✅

Built from the "Three Readings" artifact (three designs → combined pick →
stress-tested on Tahajjud and What-breaks-prayer, all approved). One
renderer changed — `reference/[id].tsx` — so all 53 teaching pages moved
together; the four archetype pages were verified with eyes on web (food:
hero+differs; who-is-allah: hero, no red; tahajjud: hero+facts+door;
what-breaks-prayer: no hero).

**The matn:** the section the file marks `promote: 'hero'` renders FIRST
inside the drawn Frame under "The answer" — even when the file places it
midway. This is the SECOND attempt at making the hero legible as the
answer (the first broke margins and Iyad read it as inconsistency —
constants/teaching.ts holds that story); this time the treatment carries
its own label. The quickFacts render inside the frame (TeachingFacts grew
a style override), the href fact staying the door it already was. Learned
from real content: only the hero text PRINTS inside the frame — food's
answer cites three verses and printing all three made a wall wearing a
frame; the rest fold, named.

**The gloss:** every other section on a thread with a numbered Rosette,
file order kept. Costs ~38px of the column the teaching design once fought
for (350 → ~312); approved by eyes, watch on device.

**The two inks:** a `differs` section announces "Where people differ" in
vermilion above its heading; ContentNoteCard rails differs notes red
APP-WIDE (guides included, deliberately); the legend line renders only on
pages that have red. `promote: 'quote'` turned out to govern evidence
weight, not body voice — the artifact's "raised voice" rule was a misread
of the data and was dropped. No hero → no frame, facts open bare.

**The tooth:** teaching-check warns past one differs-section per page —
and immediately caught `ramadan` carrying two, now on the content-review
pile. New chrome strings: teach.answer / teach.differs / teach.legend.*
(draft, Iyad's to reword).

**Corrected 3 Sep — the label is gone.** "The answer" replaced the hero's
heading, and the heading was the question the body answers. Iyad opened
the Friday page and read "THE ANSWER … No." with nothing to say no to
(`learn/jumuah.ts:41` asks "Is this an extra prayer?"). Seventeen of the
forty-two heroes read that way — bodies opening Yes, No, Because, or a
fragment. The frame now prints the section's own heading like every other
section; the frame alone marks which section is the answer. One line in
`reference/[id].tsx`; `teach.answer` removed from ui.ts. The paragraph
above is kept as written because it was quoted to Iyad as approved.

---

## 3 Sep 2026 — One evidence grammar: the name-line and the sheet ✅

Iyad's design, from the "Evidence Sheet" artifact, applied to ALL learning
content as the standing rule: **the matn prints its hero text; every other
citation is a name on the page — one quiet accent line per section — and
the sheet behind it holds the texts.** Built as `EvidenceLine` in
source-list.tsx (line + RN Modal sheet; the sheet's body IS `SourceLines`,
so evidence renders exactly as note cards always have — grading included,
publishers on Settings → Sources per Iyad's call, credit still riding in
the data on every text).

**Enforced by absence:** `SourceDisclosure` and `TeachingFoldedSource` are
DELETED, not deprecated — future code cannot regress to the two-fold
confusion because the components no longer exist. Swapped at every call
site: reference sections (all 53 pages), guide steps, pray's rawatib. The
reference page's second printed quote died with them (the sneeze narration
now lives in section 2's sheet); the claimed-set page-level dedup went too,
since only the matn prints. Line short-names: hadith without its grading
parenthetical, scholarly by author, `general` unnamed (label falls back to
"Where this comes from" — tahajjud shows it).

Verified with eyes: food (matn line QUR'AN 5:3 · 5:90 → sheet with full
verses), what-breaks (multi-source line wraps to two lines), tahajjud
(fallback label), pray renders. The sheet is a modal — the page never
moves under a finger. Held, review-gated: the collection-literacy lines
("ṣaḥīḥ means the chain is authenticated") — designed, not shipped.

---

## 3 Sep 2026 — The Underdrawing: sketched titles on the blank lines ✅

Iyad's device review named the written page's recorded risk — "a bit hard
to know what's going on at first sight" — and chose the recorded retreat
from the three artifact ideas ("The Legible Chapter"): `BlankLine` became
`SketchedLine`, the lesson's title in faint ink (opacity 0.55) on its
ragged rule — a scribe's underdrawing. Three states now read at a glance:
inked, at the pen, sketched. The surface preview returned (janāzah visible
again), and sketched lines are PRESSABLE — a named line will be tapped,
and nothing is locked. The whole-book arcade untouched, per Iyad.
Considered and held: the Numbered Chapter (safest, drains the poetry) and
the Pen Alone (the future simplification, in the drawer); the one-time
self-writing ink animation noted as an optional spice, not built.
Verified light + dark at 390.

---

## 3 Sep 2026 — The five prayers get their pages ✅ ⚠️ review-gated

From the "Fajr Page" artifact, extended to all five at Iyad's go. New
`daily-prayers.ts`: five Reference pages (ids fajr/dhuhr/asr/maghrib/isha,
the first `surface: 'pray'` content — excluded from unclaimed checks by
design). Every-prayer rows retarget from the guides to these pages; each
page's matn holds the facts and "Pray X ›" as its door, so the guide is
one tap in. Eleven narrations sourced by Arabic-matn search of the corpus,
numbers from the records' own `arabicnumber` (Muslim 657a/725a/634a/656a/
728a, Bukhari 528/553/555/574/657, Abu Dawud 1269 sahih–Al-Albani).
Deliberate absences on the record: Tirmidhi's Hajj-reward virtue (grading
needs the reviewer) and any Maghrib-specific virtue (none strongly
authenticated found — its frame is citation-free, now legal in
teaching-check for exactly this case). ʿAsr's hero was demoted to a
citation-free frame after the check caught a 750-char wall (short matns
never cross-check to HadeethEnc's matn-only text — the ten-word window
outmeasures a four-word matn; known limitation, on the record).

**Pipeline hardening en route:** generate-evidence.mjs is now mirror-first
for BOTH suppliers — the Qur'an cache (the du'as generator's cure applied)
and the HadeethEnc cache (all three call paths: by-id, matn search, EN
pull) — after a 15-minute stall against the same Cloudflare weather.
content:verify against live remains the arbiter. ⚠️ All app-voice prose on
the five pages awaits scholarly review.
