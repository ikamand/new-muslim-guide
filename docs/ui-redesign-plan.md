# UI redesign — the plan

**Status:** agreed, not started. Nothing in here has been built.
**Canvas:** https://claude.ai/code/artifact/81fa355d-157f-495c-9096-bc68ae181422
**Opened:** 20 August 2026, from a walkthrough of the Today and Learn tabs.

This is a living plan. It is written to be added to — new ideas go in
[§7](#7-the-backlog), and anything that gets decided moves up into the numbered
sections with its reasoning attached. The canvas above holds four artboards:
Today, a prayer step, Learn, and a diagnosis sheet. Every claim below was read
out of the source, not inferred from the screenshots; file and line references
are given so a future reader can re-check rather than trust.

---

## 1. What triggered this

The app had grown into a scrolling list of near-identical cards. The Learn tab
alone renders **31 cards in one scroll** — 20 learn topics, plus shahada, plus 5
recommendations, plus 5 more in two tail sections — of which **6 carry a glyph**
and 25 are bare text rows. The screenshot of it is 8097px tall at 1080 wide:
about seven and a half phone screens.

Two things follow from that, and they are different problems:

- **A structural one.** Today and Learn were answering the same question from
  the same tables, so the app said everything twice.
- **A craft one.** There is no typographic or visual system capable of ranking
  31 items, so they all arrive at once with equal weight.

Both are addressed below. The craft one is cheaper than it looks.

---

## 2. Three bugs, found while auditing

Independent of any redesign. Small, and worth doing first because they are
wrong *now*.

### 2.1 "Prayer" on Today opens the five pillars list

Reported as "in the today section when i click on prayer it takes me to the 5
pillars page not prayer". Exactly right, and it is not a routing typo.

`useToday` fills its prayer slot with the first unfinished journey step whose
`meta.category` is `salah` or `purification`
([`src/hooks/use-today.ts:88-107`](../src/hooks/use-today.ts#L88-L107)). The
first such step is `ref('pillar', 'salah')`
([`src/content/journey.ts:88`](../src/content/journey.ts#L88)) — the five-pillars
lesson. Its title is "Prayer", its summary is "Five prayers a day, at set times,
facing the Kaʿbah in Mecca", and `routeFor` sends every `pillar` to `/pillars`
([`src/lib/content-routes.ts:26`](../src/lib/content-routes.ts#L26)). That is
the card on the screenshot, verbatim.

The same file already defines the guard that would prevent this —
`OWN_PAGE = ['guide', 'reference']`, with a comment explaining that a pillar
"opens the list it lives in, so a row promising 'Prayer' would land the reader
on five cards" — but applies it only to the *suggestion* block further down.

**Fix:** apply `OWN_PAGE` to the prayer-step lookup as well. Two lines.

### 2.2 Al-Fatihah practice is not reachable from the prayer

Reported as "Practice reciting alfatiha should be in the praying".

[`src/app/practice.tsx`](../src/app/practice.tsx) is linked from the Learn tab,
from Today's footer row, and from a help topic — never from inside a prayer
guide. Someone learning Al-Fatihah is standing on a mat, on the step that
recites it, three taps away from the screen built to teach it.

**Fix:** an entry point on the recitation itself, so it appears wherever that
recitation is rendered rather than only on the Fatiha step. See
[§5.2](#52-prayer-step).

### 2.3 Learn shows two topics twice

Not reported — found while reading the screenshot. `RecommendedSection` and the
`startHere` list below it both resolve from the recommendation tables and do not
dedupe against each other, so **"Becoming Muslim" and "What is Islam?" each
appear twice on one screen**, with identical titles and subtitles.

**Fix:** moot if [§4](#4-the-information-architecture-decision) lands, since the
recommended section is removed. Worth knowing it is a real duplication and not a
design choice.

---

## 3. Three systemic gaps

These are why it "feels" flat. Each was verified in the source.

### 3.1 There is no type size between 16 and 32

[`src/components/themed-text.tsx`](../src/components/themed-text.tsx) defines
five sizes: 14, 14, 16, 32, 48. Card titles are set to 17 with a local override;
body copy is 16. **Nothing in a list is able to outrank anything else**, because
the scale has no rung to promote it to.

This is the cheapest fix with the largest effect. Adding 20/24/28 with proper
line-heights gives every list a head and a tail.

Also here: `linkPrimary` hardcodes `#3c87f7`, an iOS blue that clashes with the
green accent and is not a theme token.

### 3.2 The app loads no fonts at all

There is no `assets/fonts` directory, no `expo-font` dependency, and no
`useFonts` call anywhere in `src`. `Fonts` in
[`src/constants/theme.ts`](../src/constants/theme.ts) maps to `system-ui` /
`serif` / `mono`, and the only one used is `mono`, for code.

So **every Arabic string in the app renders in the platform default** — at
26px/48 line-height, right-aligned
([`src/components/recitation-card.tsx`](../src/components/recitation-card.tsx)).
On Android that is Roboto, which has no proper naskh and sets vowel marks badly.
For an app whose brief opens with "Arabic needs real line-height and a face that
honours it", this is the widest gap between the stated bar and what ships.

**Proposed:** Amiri for Arabic (open naskh, designed for Qurʾanic setting) and a
display serif for English headings. Fonts are assets, so this ships over the air
— no rebuild. Cost is roughly 400KB in the bundle.

⚠️ Not yet decided — see [§6](#6-open-questions).

### 3.3 The illustrations already exist and are barely used

[`src/components/illustrations.tsx`](../src/components/illustrations.tsx) is 369
lines of good geometric work: a mihrab arch, a tessellating girih band, a sun
arc that puts each prayer at its true position in the day, and nine glyphs.

`TOPIC_GLYPH` in [`src/app/(tabs)/learn.tsx:36`](<../src/app/(tabs)/learn.tsx#L36>)
maps **one** topic — `mosque` — to a glyph. The other 19 learn topics get
nothing.

The answer to "no images or illustrations" is therefore **not** stock
photography of people praying. It is finishing the set that is already there:
one mark per topic, in the existing stroke style. A geometric vocabulary is also
the right register for this app — figurative photography of worship would be
both off-brand and a sensitivity we do not need to take on.

---

## 4. The information architecture decision

**Today and Learn were the same list, sorted differently.** Both render a
journey card. Both call `useRecommendations()`. Today's "Suggested" row and
Learn's "Where to start" section resolve from the same tables.

The fix is not to dedupe. It is to make them answer different questions:

| Tab | Question it answers | Test for whether something belongs |
|---|---|---|
| **Today** | What do I do in the next ten minutes? | Does it have a deadline? |
| **Learn** | What don't I understand yet? | Would it still make sense next week? |

A prayer time has a deadline. A lesson about Ramadan in Shaʿban does not.

**Consequence:** Today gets shorter. It becomes the prayer card, one "carry on"
line, and the question chips — nothing else. That is the removal this plan
makes, and it is the point of it.

---

## 5. Screen by screen

### 5.1 Today

**The prayer times card is not touched.** Explicit instruction, and it is the
best thing on the screen.

- Remove the `TODAY` section entirely — the seasonal row, the prayer row and the
  suggested row all come from tables Learn already surfaces.
- One "carry on" line in their place, showing stage position rather than a bare
  count, with a small ring for progress.
- Rename the help chips to how the question actually arrives: **"I lost count"**,
  not "When something goes wrong". A beginner searches with the sentence in
  their head, not with a category name.
- Header gets a display face and a real size; the Hijri date keeps its place.

### 5.2 Prayer step

The spine of the app, and where the most is gained.

- **Draw the posture; stop naming it in a pill.** `POSTURE_LABEL` in
  [`src/app/guide/[id].tsx:17`](<../src/app/guide/[id].tsx#L17>) renders
  "Standing", "Bowing", "Prostrating" as text. Someone holding a phone mid-motion
  needs to see the position. Five line drawings — qiyam, rukuʿ, sujud, julus, at
  the tap — cover the entire prayer and every wudu step.
- **Replace the 1px progress bar with rakʿah position** — four arches, filled as
  you go. The app has a whole reference page about losing count; the progress
  indicator should help with that instead of measuring scroll.
- **Al-Fatihah practice inline** ([§2.2](#22-al-fatihah-practice-is-not-reachable-from-the-prayer)),
  plus a seven-bar strip showing which ayahs are known.
- Arabic at a real size in a real face, once [§3.2](#32-the-app-loads-no-fonts-at-all) lands.
- Footer buttons to a one-handed reach: 52px, full width, thumb-sized.

### 5.3 Learn

31 flat rows become **five groups, named by when the question arrives**:

| Group | Topics |
|---|---|
| Praying | wudu, before-prayer, al-fatihah, what-breaks-prayer, dua-and-dhikr |
| What you believe | what-is-islam, who-is-allah, who-is-muhammad, what-is-the-quran, sunnah |
| Out in the world | food, clothing, halal-and-haram, family, work, manners |
| When it's hard | repentance, patience-and-gratitude |
| The year | ramadan, islamic-calendar |

Plus a "keep coming back to" strip for phrases, duʿas and the mosque — the
things that are reference, not reading.

- The beginner path becomes **six arches**, reusing the mihrab the prayer card
  already draws, so "stage 2 of 6" is a picture rather than "0 of 36".
- "Where to start" is deleted ([§2.3](#23-learn-shows-two-topics-twice)).
- Every card carries a glyph ([§3.3](#33-the-illustrations-already-exist-and-are-barely-used)).

**Cost, stated plainly:** someone who already knows what they want now scans a
heading before finding it. That is worse for them and much better for the person
who does not know what they want — which is who this app is for.

---

## 6. Open questions

Things a wrong assumption would waste real work on.

1. **The font.** Amiri is the recommendation. It commits ~400KB and a look. If
   there is a face you already have in mind for the Arabic, it should be that
   one instead.
2. **Posture drawings.** Schematic line figures are proposed. Every printed
   prayer book uses them, so there is precedent — but it is a judgement about
   register, and it is yours.
3. **Static mockups or a clickable prototype.** The canvas is static. If the
   grouped Learn tab is worth feeling rather than looking at, that is a
   different build.

---

## 7. The backlog

Ideas raised but not yet worked through. Add here freely; nothing in this
section is committed.

### 7.1 The IslamHouse family of APIs — 20 August 2026

Four APIs, all free, three needing no key at all. Every endpoint below was
called and its response read.

| | Base URL | Auth | What it is |
|---|---|---|---|
| HadeethEnc | `hadeethenc.com/api/v1` | none | 2,776 graded hadith, vowelled Arabic, ~65 languages |
| QuranEnc | `quranenc.com/api/v1` | none | 74 Qur'an translations by named translators |
| IslamHouse | `api3.islamhouse.com/v3` | public key `paV29H2gm56kvLPy` | The library: books, audio, video, 133 languages |
| **enc.islamhouse** | `cnt.islamhouse.com/api/v1` | none | 124 books aligned **phrase by phrase** across languages |

**Correction to an earlier finding.** HadeethEnc *does* have search — the
parameter is `phrase`, not `text`, and it matches on Arabic:
`/hadeeths/search/?phrase=سبحانك اللهم وبحمدك&language=ar` returns five hits.
An earlier note in this project said no search existed and that matching the
app's citations would need a crawl. It does not. Every one of the app's 152
hadith citations can be matched mechanically by its Arabic wording.

**The find is `cnt.islamhouse.com`.** `books/page-data/819?page_number=1&transes=en,fr,es`
returns Hisn al-Muslim as a list of phrases, each with a stable id, the
vowelled Arabic, and every requested translation alongside it. Twelve pages
covers the book. That is the exact shape `src/content/duas.ts` wants.
Hisn al-Muslim's own translation set is `en` and `ar` among our locales —
**not fr or es** — so it does not solve every language at once. That limit is
about the *book* translations on `cnt.islamhouse.com` only; the audio
catalogue is a separate holding and does have French, below.

**The audio — two sets, shaped very differently.** Both were downloaded and
their bitrate and duration read from the frame headers rather than guessed.

| | Arabic — item 2799103 | French — item 169380 |
|---|---|---|
| Reciter | Sulayman al-Shuwayhi | Yaaqub Leneen |
| Chapters | 134 (whole book) | 20 (chapters 1–22 only) |
| Bitrate | 128 kbps | 64 kbps |
| A simple duʿa | — | **6 s** (ch. 5, undressing, 45 KB) |
| A prayer duʿa | 254 s (opening supplication) | 68 s (rukuʿ) |
| Also carries | — | a **PDF per chapter: Arabic, French, and phonetic transliteration** |

The Arabic set is a **listening library**: a four-minute chapter reading with
its narrations, not a clip, and it does not close `audio-manifest.csv`.

The French set is **not** — its short chapters are already clip-length, and
chapters 16–22 cover the opening supplication, rukuʿ, rising, sujud, between
prostrations, sujud al-tilawa and the tashahhud: six of the twenty unrecorded
clips, in one series.

Three limits on the French set, before anything is planned around it:

1. Each file is **Arabic then French in one MP3**. That fits the `fr` locale
   exactly and does not fit `en` at all — and splitting one is precisely what
   the no-modification term forbids.
2. **There is no English or Spanish equivalent.** The full catalogue was
   scanned — 200 English audio items, 195 Spanish — and neither has a Hisn
   al-Muslim recording. French is the only translated one IslamHouse holds.
3. It stops at chapter 22 of roughly 132.

**A complete French convert-guide audio series also exists** — 11 parts, 209
files, covering this app's whole curriculum: `414957` essentials, `414965`
faith, `415732` purification, `416009` prayer, `397504` fasting, `402117` hajj,
`459992` zakat, `460156` food and drink, `460158` clothing, `460140`
transactions. French only, again. Somebody built this for converts in French
and nobody built it in English, which is either a warning about the market or
the reason this app should exist.

**Where the app stands against it:** 9 duʿas against Hisn al-Muslim's 134
occasions; 27 audio clips of which 20 are unrecorded, all of them prayer
phrases.

Ideas worth working through, roughly in order of value to a beginner:

1. **"There's a duʿa for this."** The gap is not that converts cannot find
   duʿas — it is that nobody tells them one exists for putting on clothes or
   leaving the house. 134 occasions, already written and translated. Surface
   them at the moment, not in a list.
2. **Morning and evening adhkar** (books 784, 12290 — 56 languages). A daily
   practice every born Muslim absorbs and no convert is told about.
3. **Two books written for exactly this reader**: `778 — يومي الأول في الإسلام`
   ("My First Day in Islam", 20 languages) and `775 — أنا مسلم` ("I am a
   Muslim", **77 languages**), both phrase-aligned.
4. **Quoted text in fr/es.** Machine translation is banned here and rightly.
   For text the app *quotes*, the enc API is a human, supervised source aligned
   to the same Arabic.
5. **The HadeethEnc MCP server** at `https://hadeethenc.com/mcp/` — live,
   handshake confirmed, tools `search_hadeeths` / `get_hadeeth_by_id` /
   `get_hadeeths_by_ids`. Wiring it into this repo means content work searches
   real hadith instead of reconstructing from memory, which is the failure mode
   `src/content/sources.ts` opens by warning about.

⚠️ **Licensing is not settled, and differs by site.**

- **HadeethEnc publishes terms**, in its API documentation: *"No modification,
  addition, or deletion of the content. Clearly referring to the publisher and
  the source (HadeethEnc.com)."* Satisfiable with attribution held as data, the
  way `src/content/audio-sources.ts` already does it. The first clause bites:
  trimming a clip or shortening a translation breaks it.
- **IslamHouse publishes none.** `/terms/` and `/about/` both 404; only a
  privacy policy exists. Their GitHub says content stays "subject to
  platform-specific terms" — terms not written down anywhere findable. **Before
  shipping their audio or book text at scale, email admin@islamhouse.com.**
  This cannot be resolved by reading, and it is a licence question rather than
  a technical one.

---

### 7.2 How the API content actually reaches the app — decided 20 August 2026

Settled, after a real disagreement worth recording because the reasoning
matters more than the conclusion.

**The content is theirs; the delivery is ours.** Adopting IslamHouse and
HadeethEnc text is a clear improvement and not a marginal one — 26 of the app's
53 Arabic strings are model-written with no source recorded
(`docs/arabic-proof.csv`), and theirs are reviewed by named people who were paid
to get them right. That risk is the largest single one in the app and this
removes it.

What does **not** follow is that the app should call an API when a reader taps
something. Trust and runtime are separate decisions: text copied at build time
is exactly as correct as text fetched at 9pm on a Tuesday. Against that, a
runtime fetch costs the thing the app is for — someone standing outside a
mosque with no signal, unable to read the duʿa for entering it.

**The shape:**

- **Fetch once, cache permanently.** First launch pulls the library; after that
  it lives on the device. A scheduled refresh means new content still arrives
  without anyone shipping a build.
- **The worship path ships bundled.** Salah, wudu, and the prayer duʿas are in
  the binary, so they work before the first fetch and after a cache clear.
  `src/content/` stays the source of truth for what the app *says*.
- **Verification, not generation.** Each text carries an upstream id, and a
  script diffs ours against theirs on a consonantal skeleton — so the app's
  Imlaei script does not false-positive against QuranEnc's Uthmani. Dev machine
  and CI only; a check that needs the network can never be a build gate here.

Two things this does not buy, and both should be said out loud:

1. **Review does not go away.** The API guarantees the *text*. It does not
   guarantee *this text belongs on this step* — HadeethEnc has 2,776 hadith and
   choosing the wrong authentic one is still wrong. The existing split holds:
   Iyad clears the text, a qualified person clears the substance.
2. **The first fetch is the app's first network call ever.** It reveals a user's
   IP to a third party, and it changes the App Store privacy answers. For a
   convert who has not told their family, "this app never talks to anything" is
   a real feature being traded away for a real gain.

### 7.3 Hisn al-Muslim, as a day rather than a list

**Not a Learn topic.** It is not a lesson, and 133 occasions as a card would
rebuild the exact wall [§1](#1-what-triggered-this) is about. The Learn tab
already has the right door: the "keep coming back to" strip's Duʿas entry,
currently showing 9.

**A list is the wrong shape, and not because it is long.** A new Muslim does not
know a duʿa for putting on clothes exists, so they will never scroll to it. An
index only serves someone who already knows what they are looking for — which is
a born Muslim's tool. What a convert has instead is a *moment*: at the door,
about to eat, awake at 2am.

**So the duʿa screen is a day.** `DayArc` in `src/components/illustrations.tsx`
already draws the sun's path with the five prayers on it, and Hisn al-Muslim
maps onto that shape exactly — waking, dressing, leaving home, the mosque, the
prayer, eating, coming home, sleeping. Scrolling from dawn to night puts each
duʿa where it happens, which answers "when would I ever say this". No index
answers that.

**And it is smaller than 133.** The book has duʿas for rain stopping, for
sighting the crescent, for a debtor. Someone three weeks in needs about twenty.
The day carries what a convert actually meets; the rest sits behind a search.

**What this removes:** the flat list of nine duʿas, and any 134-row Learn card.

**The one part that is genuinely lesson-shaped** is the morning and evening
adhkar — a practice with a beginning and an end, absorbed by every born Muslim
and told to no convert. That earns a Learn card. The other 130 do not.

### 7.4 A Qur'an tab — learning Juz 30

**Why a fourth tab.** [§4](#4-the-information-architecture-decision) split Today
(has a deadline) from Learn (has none). Memorising is neither: it is a practice
someone builds over months. Filing it under Learn would make it look like
reading, which is the one thing it is not.

**The scope, counted rather than remembered** — every figure below was read from
QuranEnc and everyayah.com, not recalled:

| | |
|---|---|
| Juz 30 | surahs 78 (An-Naba) – 114 (An-Nas) |
| Surahs | **37** |
| Ayahs | **564** |
| Shortest | 110, 108 and 103 — 3 ayahs each |

**Order: backwards through the mushaf**, 114 → 113 → 112 → …, which is how it is
actually taught. Not strictly shortest-first — the data says 110 and 103 are
shorter than 114 — but contiguous, so there is never a question about what comes
next, and it front-loads the three *quls*, which are the highest-utility surahs
in the book: said in prayer, after prayer, and for ruqyah.

**Audio already has a source, and it is one the app has cleared.**
`Husary_Muallim_128kbps` on everyayah.com covers Juz 30 — confirmed by
requesting 114:1 — and is the same reciter, the same set and the same CC BY-NC
licence already recorded in `src/content/audio-sources.ts` for Al-Fatihah. The
attribution obligation and the never-sell-it constraint carry over unchanged.

Sizes, sampled across ten ayahs at ~138 KB each:

- **All of Juz 30: ~76 MB.** Far too much to bundle.
- **The ten shortest surahs (~46 ayahs): ~6.2 MB.** Bundleable.

Which is exactly [§7.2](#72-how-the-api-content-actually-reaches-the-app--decided-20-august-2026)'s
model: **the first ten ship in the binary, the rest fetch once and cache.**
Someone in a basement can still practise the ones they are working on.

**The interaction that matters is not a player.** `src/app/practice.tsx` already
does per-ayah loop and slow playback, and that machinery scales. What
memorisation needs on top is one thing: **hide the text.** Show the Arabic, tap
to conceal it, recite from memory, tap to check. That is the drill that actually
builds hifz, and no amount of reading replaces it.

**Progress without pressure.** A memorisation tab needs a notion of "known",
which the Al-Fatihah practice screen has no concept of. It must not become a
streak: someone three weeks into Islam does not need an app that is disappointed
in them. Progress goes up, never down, and never asks. The 37 surahs as a girih
band — one eight-point khatim per surah, filled as it sticks — makes it a
picture rather than a percentage, and reuses geometry `illustrations.tsx`
already draws.

⚠️ **Open, and a real blocker: transliteration.** QuranEnc supplies Arabic and
translation. It does not supply transliteration, and CLAUDE.md forbids writing
one — the ban covers "an Arabic text, a transliteration or a translation"
equally. 564 transliterations need a source, or a decision to go without.

Going without is defensible pedagogy rather than a shortcut: for memorisation a
Latin-script crutch slows people down, and the tradition teaches by ear. Audio
plus Arabic is how it is done. But that is a decision, not a default.

## 8. Shipping

Everything in [§2](#2-three-bugs-found-while-auditing),
[§4](#4-the-information-architecture-decision) and [§5](#5-screen-by-screen)
touches `src/` only: **`npm run update:preview`**, OTA.

[§3.2](#32-the-app-loads-no-fonts-at-all) adds `expo-font` and font files under
`assets/`. Font files are assets and ride an OTA, but adding the `expo-font`
plugin to `app.json` is a native config change and needs a **full `eas build`**
first. Do that one before, or alongside, the next build rather than in the
middle of a UI pass.

No server, no migrations.
