# The expansion plan

**Four APIs tested against the app's own verification, and the architecture
that has to exist before any of them lands.**

Written 28 August 2026. Companion to `docs/learning-model.md`, which is the
research this builds on.

---

## 0. This is not a rebuild

Worth saying first, because "rebuild" would licence throwing away the best work
in the repository.

The audit found one thing wrong: **the teaching model.** Learn and Today are
built entirely out of content that finishes, the personalisation engine is
wired to nothing, and no content declares its shape in time. That is two
screens, one dead file, and one missing field.

Everything else stays and is the reason the app is worth expanding at all:

| Kept, untouched | Why |
|---|---|
| `buildPrayer` and `PRAYER_SPECS` | Five prayers generated from two facts. Nothing here improves on it. |
| Offline prayer times, qibla | The dead-signal rule. Nothing below may weaken this. |
| The Qur'an tab, juz 30, offline audio | 38 surahs with a cover-and-recite mode already built. |
| Hisn al-Muslim — 132 occasions | Already a superset of every duʿa API tested below. |
| `lib/adhkar-window.ts` and the four sittings | The best piece of time-awareness in the app. It just needs surfacing on Today. |
| `sources.ts`, `evidence.ts`, `content:verify` | The verification apparatus. The plan below extends it rather than replacing it. |
| Every word of the 69 teaching entries | Reviewed, cited, and good. |

So: two screens change, one field is added, one dead file is deleted, and new
content lands beside the old. No rewrite.

---

## 1. The four APIs, tested rather than read

Every claim below came from hitting the endpoint, not from the documentation.
Three findings only appeared because of that.

**A correction to my own tooling, kept on the record.** My first verification
pass reported 15 of 24 duʿa citations resolving. That run used a skeleton
function whose first character range was `U+0610–U+064B`, which swallows the
entire Arabic alphabet — it was comparing empty strings. The number happened to
come out the same after the fix, which is luck, not vindication. Every figure
below comes from a comparator that self-tests before it reports, and that
self-test is the first thing the import gate in §3.1 inherits.

### 1.1 islamic.network — eight APIs, and they are not one thing

| API | Verdict |
|---|---|
| **AlAdhan `asmaAlHusna`** | **Take.** 99 names, vowelled Arabic + transliteration + English meaning, free, no key. Fills a gap the audit named. |
| **Pray `/duas`** | **Take part of it.** See §1.2. |
| **Quotes, Stories, People, Events** | **Reject.** See below. |
| AlQuran, Sermons | Not needed — the app has its Qur'an source, and a sermon is not a lesson about Jumuʿah. |

The four rejections are rejected on two independent grounds, either of which
is sufficient.

**Editorial frame.** These are Naqshbandi Sufi devotional collections, not
general Islamic reference. The Events API's first record is "Birth of Khas
Muhammad ash-Shirwani". A Stories record is captioned *"Elders of the
Naqshbandi Sufi Tariqa"* and summarised as *"A student who obeys his Shaykh
without any questions experiences blessings and miracles."* The People API
files records under `kind: family-of-the-prophet`, and the docs describe the
Quotes and Stories APIs as covering "saints". This app is Sunni and its
evidence is authenticated hadith — that is settled, not a per-file decision.

**Provenance.** The Quotes API states its own translation provenance in the
data:

```json
"translations": { "ar": { "provenance": "claude-retranslation-from-en" } }
```

The Arabic is a machine back-translation from English. That is exactly what
`CLAUDE.md` forbids, and the API is being honest about it — which is more than
most sources manage. Credit where due; still unusable.

### 1.2 The Pray API's duʿas — take the Qur'anic half, leave the rest

57 duʿas. Each carries vowelled Arabic (`formula`), transliteration, English,
and a `source` string. Structurally this is the best-modelled duʿa data of the
four: `formula` holds the words and `description` holds the narration frame,
which is the distinction `duas/card.ts` spends thirty lines warning about and
that IslamHouse's `kind: quoted` cannot express.

Two problems, both found by testing.

**The 24 hadith-cited duʿas, checked against the app's own corpus:**

| Collection | Verified |
|---|---|
| Bukhari | 8 / 10 |
| Abu Dawud | 4 / 5 |
| Tirmidhi | 2 / 2 |
| **Muslim** | **0 / 7** |

Every Muslim number *exists* in the corpus and points at unrelated text —
Muslim 234 is cited for the duʿa after wudu and resolves to a narration about
rain. That is the two-numberings problem already recorded in this project, and
it is the reason §3.1 exists. It is not a reason to reject the source; **every**
source has this, and a gate that catches it is worth more than a source that
never trips it.

One duʿa is sourced to *"Mawlāna Shaykh Nāzim / Tarīqat al-Naqshbaniyya
Āliya"*. It must be excluded by rule, not by eye.

**The 30 Qur'anic duʿas are the actual prize.** They verify against QuranEnc,
which `content:verify` already uses — 7 of 10 sampled on the first clean pass,
and the three failures are my test's fault, not the data's: `14:40-41` is a
two-ayah span and I fetched one ayah. Getting there took two orthographic
fixes, both of which the app's own documentation predicts:

- `ٱ` (alef wasla, U+0671) sits outside the `ء-ي` letter range, so a naive
  filter deletes it from the Uthmani side only.
- `ءَامَنَّا` (Uthmani) and `آمَنَّا` (Imlaei) are the same word written two ways.

**And a duʿas-from-the-Qur'an collection is something the app does not have.**
Hisn al-Muslim is hadith-centred. Thirty supplications the Qur'an itself puts
in the mouths of the prophets is a distinct, coherent, fully verifiable body of
content — and it is the single cheapest real addition available.

⚠️ The `months` and `days` fields promise calendar binding. **None of the
twenty records I sampled had either populated.** Do not build a feature on
them.

### 1.3 ummahapi.com — reject

126 duʿas, 27 categories, free, no key, 100 req/min, clean record shape. It
fails on one thing and it is the thing that matters here:

```
"source": "Abu Dawud 4:317"
"source": "Sahih Al-Bukhari 7:150"
"source": "At-Tirmidhi, Al-Hakim"
```

**Volume-and-page, not hadith numbers.** Nothing can resolve those against a
corpus, which means nothing can check them. `CLAUDE.md`: *a number you cannot
check is worse than no number, because it survives review by looking right.*
The content is also a subset of Hisn al-Muslim, which the app already has in
full. No value.

### 1.4 fitrahive/dua-dhikr — marginal, and worth keeping a link to

**MIT licensed** — the cleanest licence of anything this app touches, cleaner
than IslamHouse (no terms at all) and HadeethEnc (no modification, name the
publisher). ~90 records across five categories, with genuinely detailed
multi-collection citations that include Muslim's sub-numbering:

```
"source": "HR. Muslim No. 2723 (75), Abu Dawud No. 5071, and at-Tirmidzi 3390"
```

That sub-numbering is exactly what disambiguates the Muslim problem in §1.2,
which makes this repo useful as a **cross-check** even though its content is
redundant.

Against it: the English is translated from Indonesian (`id.json` sits beside
`en.json`, and citations read "HR." for *Hadits Riwayat*), so the English is two
hops from the Arabic. It also ships a `fawaid` field — statements of reward for
saying a dhikr — which is the narration-versus-words trap `duas/card.ts`
documents. Neither is disqualifying; both mean it is a reference, not a feed.

### 1.5 islamicapi.com — one endpoint worth having

Seven datasets: `prayer-time`, `fasting`, `dua`, `ruqyah`, `asma-ul-husna`,
`ramadan`, `zakat-nisab`.

Six are redundant or disqualifying. `prayer-time` and `fasting` would replace
an offline calculation with a network call, which breaks the dead-signal rule
outright. `asma-ul-husna` in 76 languages duplicates AlAdhan's, free and
without a key, and 76 languages of anything is machine translation. `dua`
duplicates Hisn.

**`zakat-nisab` is the exception, and it is genuinely good.** Live gold and
silver nisab, in 100+ currencies, in grams or ounces, offering both the
classical standard (87.48g gold / 612.36g silver) and the common one (85g /
595g).

This solves a problem `pillars.ts` names and then declines to solve:

> "naming no figure is the right answer for an app, because the threshold
> differs by the kind of wealth and the modern equivalent of a silver or gold
> measure moves with the market."

Right for a pillar page. Wrong as the app's only word on zakat to somebody in
year two who has to actually pay it.

### 1.6 The API key — yes, get one, and it never ships

The islamicapi docs say: *"never expose it in client-side code. Always use it
from your backend server."* There is no backend server and there should not be
one. A key in a React Native bundle is a key anybody can extract.

**So the key lives in your environment and is used by a build script**, exactly
like `npm run hadith:corpus` and `npm run evidence`. `npm run zakat:nisab`
writes a dated snapshot into `src/content/`, the app renders "about £X as of 28
August 2026", and the figure refreshes whenever an OTA ships. Offline, no key
in the app, no server, and honest about its own age.

That is the only key worth getting. Everything else above is free and
unauthenticated.

⚠️ **The number is data; the ruling is not.** Whether someone owes zakat is a
question with conditions and exemptions on it. The screen states a threshold
with its date and standard and stops — it does not output a verdict. That line
belongs to the reviewer.

---

## 2. The expandability problem, measured

Iyad's actual brief. Here is why the app resists new content today.

`ContentKind` is a closed union of six: `guide | reference | pillar | article |
hisn | phrase`. Closed is right — an open string gets 'salah', 'prayer' and
'Prayer' in one codebase. But **17 files switch on it**:

```
src/content/model.ts        src/lib/content-routes.ts    scripts/content-audit.mjs
src/content/catalog.ts      src/lib/search.ts            scripts/content-verify.mjs
src/content/index.ts        src/hooks/use-help.ts        scripts/arabic-proof.mjs
src/content/help.ts         src/components/source-list.tsx  scripts/generate-evidence.mjs
src/content/prayers.ts      src/app/reference/[id].tsx   scripts/teaching-check.mjs
                            src/app/dua-book/[id].tsx
                            src/app/adhkar/[id].tsx
```

**Adding a seventh kind is a seventeen-file change.** That is the whole reason
the app has not grown past its first shape, and it is why "the 99 names", "the
sīrah in episodes" and "the vices and the virtues" all feel like large projects
when each is a list of short entries with a source.

---

## 3. The architecture — four pieces, in order

### 3.1 The import gate — `npm run verify:import`

**Build this first and build nothing else until it works.** It is the asset;
the APIs are interchangeable.

One script that takes a candidate record — Arabic text plus a citation — and
answers three questions:

1. Does the citation resolve, and **in which numbering**?
2. Does the text at that reference actually match, on a consonantal skeleton
   with a shared run of ten consecutive words — the method `generate-evidence.mjs`
   already uses?
3. Does the record come from an excluded authority?

It exits non-zero, prints a report, and **self-tests its own comparator before
reporting anything.** That last part is not defensive programming; it is the
lesson from §1's correction. The orthographic normalisation it needs is already
mapped: alef wasla, superscript alef, hamza-alef, alef/ya/ta-marbuta variants,
and Uthmani-versus-Imlaei.

Nothing reaches `src/content/` without passing it.

### 3.2 `Cadence` — the field from the research

From `docs/learning-model.md` §4.1, unchanged. Six values — `once`,
`until-fluent`, `daily`, `yearly`, `on-event`, `keepsake` — that decide
**placement**, not presentation. It is what lets a new body of content arrive
and be placed correctly by screens that were written before it existed.

### 3.3 A `collection` kind — one kind instead of five

The 99 names, the sīrah in episodes, the vices and the virtues, the duʿas from
the Qur'an, the small sunnahs. Five bodies of content the audit asked for. All
five are the same shape:

> an ordered set of short entries, each with a title, optional Arabic,
> optional transliteration, a translation, and a source

So they are **one** new `ContentKind`, added once, at a seventeen-file cost paid
once — with a `collection` id distinguishing them and one screen rendering all
of them. Every subsequent collection is then a data file and a row in a
registry, not a code change.

This is the single highest-leverage structural decision in the plan.

### 3.4 A provider registry — `src/content/providers.ts`

Today, knowledge about where content came from is spread across `sources.ts`
(citations), `text-sources.ts`, `audio-sources.ts` (licence obligations) and
four generator scripts (fetch logic). Nothing states, in one place, *this body
of content came from here, is fetched by this, is verified by that, and carries
this licence.*

One record per body of content, declaring origin, fetch script, verification
method, licence, and required attribution — so that the provenance rule the app
already follows for individual texts (`arabicFrom`, `translationFrom`) also
holds for whole collections. A new source becomes a row.

---

## 4. Phases

Ordered so each unblocks the next, and so the first thing anyone looks at is
small.

| # | What | Ships via | Needs eyes? |
|---|---|---|---|
| **0** | The import gate, self-testing (§3.1) | nothing | no |
| **1** | `Cadence` + its audit check | OTA, invisible | no |
| **2** | The `collection` kind, paid once (§3.3) | OTA, invisible | no |
| **3** | **Pilot: the 99 names** from AlAdhan — one collection, one screen, one name a day on Today | OTA | **yes — stop here** |
| **4** | **Today and Learn**: adhkār sitting in the words slot; shahada demoted to a line | OTA | **yes — stop here** |
| **5** | Duʿas from the Qur'an — the 30, verified against QuranEnc | OTA | yes |
| **6** | The Firsts (`learning-model.md` §4.2) | OTA | yes |
| **7** | Onboarding: two facts, not two identities | OTA | yes |
| **8** | Zakat nisab snapshot — `npm run zakat:nisab`, dated | OTA | yes |
| **9** | Tier-two content, **Jumuʿah first** | OTA | per page |

**No phase needs a native build.** Everything is `src/`, `assets/` and scripts,
so all of it rides `npm run update:preview`. No server, no migrations.

Phases 3 and 4 are the pilot pair, chosen to be as unalike as possible: one is
a brand-new collection, the other is a change to the two most-used screens. Two
screens, looked at, before anything is repeated.

---

## 5. What this commits you to

Three things, said once.

**A dated number on screen.** The zakat snapshot means the app prints a figure
that was true on a date and is drifting from that moment. Shown with its date
and its standard, that is honest. It is still the first time the app has told
anybody a number that moves.

**One API key, in your environment.** Not in the bundle, not in git, not
reaching any user's device. If it leaks, the cost is a regenerated key and a
stale nisab file — no user is affected, because no user's device ever calls it.

**Roughly twenty new pages of religious instruction** across phases 5–9, each
needing sources and review. The Priority 1 pile is cleared, not abolished.

And what it does *not* commit you to, deliberately: no runtime network
dependency, no account, no server, no change to the offline guarantee. Every
API above is a build-time tool. If all four vanished tomorrow the app would not
notice.

---

## 6. The open question

**Which 99 names.** The enumeration is itself a scholarly matter — the list in
Tirmidhi is one, and scholars differ on which names belong. AlAdhan serves *a*
list of 99. Before Phase 3 ships, that list needs a qualified reader saying it
is the one to print, or the collection needs to present the names without
claiming to be a canonical ninety-nine.

This is a substance question, and it is the kind the app has learned not to
answer by itself.
