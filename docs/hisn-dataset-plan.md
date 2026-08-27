# Hisn al-Muslim as a public dataset — plan

A separate GitHub repo publishing the book as clean, structured, annotated
JSON over jsDelivr. No server. The app is its first consumer, not its owner.

**Status:** planned, nothing built. Phase 1 is in this repo and is the same
work the app needs anyway; the public repo is an extraction of it, not a
second project.

**Decided 27 Aug 2026.** Iyad asked whether to stand up an API and have the app
call it. No — the app makes **zero** network calls today (`grep -rn "fetch("
src/` returns nothing), so that would create the first one, for content used at
5am and at bedtime. The book already ships in the bundle at
`src/content/duas/hisn.ts`. What the question was really after — owning the
data, and making it useful to other people — is served by publishing a dataset,
not by the app phoning home.

---

## 1. What already exists

Checked directly on 27 Aug 2026 rather than assumed, because "nobody has done
this" is the kind of claim that is usually wrong.

| | [rn0x/hisn_almuslim_json](https://github.com/rn0x/hisn_almuslim_json) | [Seen-Arabic/Morning-And-Evening-Adhkar-DB](https://github.com/Seen-Arabic/Morning-And-Evening-Adhkar-DB) | IslamHouse (our source) | This dataset |
|---|---|---|---|---|
| Scope | whole book | morning + evening only, 34 entries | 132 occasions, 318 lines | whole book |
| Vowelled Arabic | ✗ plain text | ✓ | ✓ | ✓ |
| English | partial | ✓ `en.json` | ✓ publisher's own | ✓ |
| Citations | ✗ none | ✓ prose in `source` | ✓ verbatim footnotes | ✓ verbatim + parsed |
| Repeat counts | ✗ | ✓ integer `count` | prose only | ✓ integer + source phrase |
| Morning/evening split | ✗ | ✓ `type` 0/1/2 | ✗ prose only | ✓ |
| Typographic markers stripped | ✗ | ✗ | ✗ | **✓ — nobody does this** |
| Recited vs instruction vs narration | ✗ | ✗ | ✗ | **✓ — nobody does this** |
| Stable ids | ✗ keyed by Arabic title | array position | ✓ publisher row ids | ✓ |
| Day-moment placement | ✗ | ✗ | ✗ | ✓ |

Two findings worth keeping:

**Seen-Arabic solved the morning/evening problem already**, and their answer is
the one this repo independently arrived at: one combined list with a per-entry
tag — `type` 0 both, 1 morning only, 2 evening only (16/10/8, so 26 morning and
24 evening). Their `count` is already an integer with the values 1, 3, 4, 7, 10
and 100 — the same set parsed out of the IslamHouse prose. That is a real
cross-check on our reading, and it is worth citing them for it. Their scope is
34 entries; ours is the whole book.

**rn0x's dump is unvowelled**, which rules it out for this app's readers
entirely. A new Muslim who cannot read Arabic needs the ḥarakāt. IslamHouse's
text is fully vowelled, which is the main reason it is our source.

**So the gap is not "the book as JSON."** That exists several times over. The
gap is the book as *clean, classified, machine-usable* JSON: no `((…))`, no
`﴿…﴾`, no `[24]`, counts as integers, and — the part nothing has — a per-line
answer to *is this something to say, or is it an instruction, or is it a
narration about the virtue of saying it?*

---

## 2. The contribution, stated precisely

### 2.1 Marker-free text, with the meaning kept as data

The publisher's marks encode information, and deleting them naively loses it.
`scripts/generate-hisn.mjs:81` already derives `kind: 'quoted' | 'quran' |
'prose'` from exactly those characters — so the marks are redundant *once
`kind` exists*, and only then.

| Mark | Field | Action |
|---|---|---|
| `((…))`, `«…»` | Arabic | strip — `kind: 'quoted'` carries it |
| `﴿…﴾` | Arabic | strip — `kind: 'quran'` carries it |
| `{…}` | English | strip — the English rendering of `﴿…﴾` |
| wrapping `"…"` | English | strip — the English rendering of `((…))` |
| `[123]` | all | strip — 908 of them |
| `[بِسْمِ اللَّهِ]`, `[i.e., footstool]` | all | **keep** — 52 of them |
| `(ثلاث مرات)` / `(Three times)` | all | **keep** — content |

⚠️ **The 52 word-bearing brackets are the trap in this whole job.** A blanket
`\[[^\]]*\]` strip deletes supplication text. Counted on 27 Aug 2026: 908
bracket pairs contain only digits, 52 contain words — including
`[بِسْمِ اللَّهِ]` in "supplication for entering the bathroom", and whole
clauses elsewhere:

```
[اللَّهُمَّ اجْعَلْ لِي نُوراً فِي قَبْرِي... وَنُوراً فِي عِظَامِي]
[إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ]
[((وَزِدْنِي نُوراً، وَزِدْنِي نُوراً، وَزِدْنِي نُوراً))]
```

The rule is `\[\d+\]` and nothing looser. The brackets themselves are **kept**
around the word-bearing ones: they are the book's convention for "this addition
appears in another narration", and unbracketing them would silently promote an
addition into the main text of a duʿa.

**Nothing is lost by dropping the footnote numbers.** Of 313 in-text markers in
the Arabic, 288 point at a footnote already printed directly beneath the line —
the pointer is redundant. The other 25 point at footnotes the generator never
captured, so today the reader sees `[34]` with nothing to look up. Removing
them removes a dangling reference.

### 2.2 The classification nobody has

`kind` says what the *punctuation* is. It does not say what the *line* is, and
they come apart badly:

- After-prayer line 7 is, in full: `"After every prayer. [94]"` — an
  instruction, marked `prose`.
- Sleep line 0 is `"One should join his palms closely, blow breath in them, and
  recite in them:"` — an instruction.
- Sleep lines 4 and 8 are `prose` but are **continuations of the Qur'an above
  them**, split across rows by the publisher's pagination.
- The "Merit of Dhikr" occasion is 16 lines of narration about the reward for
  remembrance. Not one word of it is a thing to say.

So the dataset adds, per line: `recited` (is this words a person says),
`repeat` (integer), `repeatText` (the source phrase it was parsed from),
`time` (`morning` | `evening` | both), and `continues` (this row is the tail of
the previous one). **Every one of these is an editorial judgement, not a
transformation** — which is what §5 is about.

### 2.3 Stable ids

IslamHouse's own row ids, kept. A consumer who finds an error can report it
against `1268926/1268927` and it means something. Array position cannot survive
a re-fetch; an Arabic title as a key cannot survive a diacritic fix.

---

## 3. Schema

Two files, because they have different authors and different confidence.

**`book.json`** — the mirror. Verbatim IslamHouse minus the marker set in
§2.1, and nothing else. Regenerated, never hand-edited.

```jsonc
{
  "source": { "publisher": "IslamHouse", "book": 819,
              "url": "https://cnt.islamhouse.com/api/v1/books/page-data/819",
              "fetched": "2026-08-27" },
  "occasions": [
    { "id": 1269190, "ar": "أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ",
      "en": "Morning and evening Adhkār",
      "lines": [
        { "id": 1269196, "kind": "quoted",
          "ar": "…", "en": "…", "footnote": "…" }
      ] }
  ]
}
```

**`annotations.json`** — ours. Hand-written, keyed by line id, never
generated, so a re-fetch cannot clobber it. This is the file with a licence we
can actually grant, and the file a reviewer signs off.

```jsonc
{
  "1269196": { "recited": true, "time": "both", "reviewed": "2026-09-xx" },
  "1269205": { "recited": false, "reason": "instruction" }
}
```

**Correction, 27 Aug 2026 — `repeat` does not live here.** This section first
put the repeat count in the annotations file. That was wrong: the book states
the count in its own prose, `(ثلاثَ مرَّاتٍ)`, and reading it off the page is a
transformation like stripping a bracket, not a judgement. It is generated into
`book.json` with the phrase it came from beside it. The overlay holds only what
a human decides — `recited` and `time`. Kept rather than quietly edited,
because the distinction between the two files is the whole design and getting
it wrong once is worth showing.

Consumers who want one file get **`hisn.json`**, the two merged at build time.
`hisn.min.json` for the size-conscious. A `schema.json` so the shape is
checkable rather than described.

---

## 4. Delivery — a repo, not a server

Static JSON in git, served by jsDelivr, exactly as `fawazahmed0/hadith-api`
serves the Six Books.

```
https://cdn.jsdelivr.net/gh/<user>/hisn-dataset@v1/hisn.json
```

- **No server**, so no uptime obligation on a free project, and no request log
  that could record which device opened the morning adhkār at 6am.
- **Git tags are the versioning.** `@v1` pins; `@latest` follows. A consumer's
  app cannot break because we corrected a line.
- **GitHub Actions** runs the fetch, the strip, the assertions and the schema
  check on every push, and fails the build rather than publishing bad data.
- **Issues are the correction channel**, which is the whole point of stable ids.

---

## 5. The gate, and it is not code

⚠️ **Publishing our annotations is a different act from shipping them in one
app, and it is the one thing in this plan that can do real harm.**
`docs/scholarly-review.md` exists because wrong answers here change how someone
worships. If `annotations.json` says a line is recited seven times and it is
not, that error is now in every app that consumed the file, and it is
attributed to us. One wrong `repeat` propagates further than any bug this
project has shipped.

Concretely: **~59 line-level judgements** for the four adhkār sections alone
(29 morning/evening, 19 sleep, 11 after-prayer), and roughly 318 for the whole
book. Every one is a reviewer's call, not a script's.

So: **`book.json` can publish as soon as the strip is verified** — it is
IslamHouse's text with typography removed, and the assertions in §6 prove
exactly that. **`annotations.json` publishes only what a reviewer has cleared**,
line by line, with the `reviewed` date in the record. An empty annotations file
on day one is honest. A guessed one is not.

The dataset ships with `reviewed: false` lines simply absent, not defaulted.

---

## 6. Checks that fail

Per the standing rule — a check that exits non-zero beats a sentence in a
document, which is what this document is.

1. **Strip is lossless.** The cleaned string must equal the raw string with
   only the §2.1 marker set removed. Any other character difference fails the
   build. This is what makes stripping safe to do in the generator rather than
   at render time.
2. **No word-bearing bracket was touched.** Assert the count of non-numeric
   `[...]` is identical before and after — 52 today.
3. **`repeat` matches `repeatText`.** The integer must be derivable from the
   phrase beside it. Catches a hand-typed 7 next to `(ثلاث مرات)`.
4. **Every annotation points at a live line id.** Fails when a re-fetch drops
   or renumbers a row, which is the failure mode `moments.ts` is already
   exposed to.
5. **Schema validates**, on every push.
6. **Arabic is unchanged against the app.** `npm run arabic` already lists
   every Arabic string in the app; the dataset's text must match it.

---

## 7. Phases

**Phase 1 — BUILT, 27 Aug 2026.** `scripts/hisn-clean.mjs`, wired into
`scripts/generate-hisn.mjs`, with `src/content/duas/annotations.ts` and
`npm run hisn:check`. What the build actually found, none of it predicted here:

- **Footnotes keep their `((…))`.** In a footnote the marks separate quoted
  matn from the citation prose around it — `وزيادة: ((بسم الله)) في أوله` — and
  no `kind` field records that, so the rule "strip a mark only where something
  else carries what it meant" says they stay. Found by the assertion
  disagreeing with the strip, not by reading.
- **27 English lines had an orphaned opening quote.** The closing quote is not
  the last character: IslamHouse prints `"…messenger." (Four times)` and
  `"…Magnificent," three times.` A first rule that required the quote to end
  the string stripped one half of 27 pairs.
- **19 lines carry a repeat count; 4 were refused.** The refusals are correct —
  three are lines holding two dhikr at once (33/33/34 in the tasbih), one is a
  bare prose "Three times" instruction with no count of its own.
- **The assertion caught three of its own bugs before it caught any of the
  strip's**, which is the argument for writing it as a different algorithm
  rather than a second call to the same `replace()`.

**Phase 1 as originally written —** The strip in `scripts/generate-hisn.mjs`
(after `kindOf()` runs, so `kind` is derived from the marks before they go) plus
`src/content/duas/annotations.ts` as the hand-written overlay, following the
pattern `src/content/duas/moments.ts` already established. Checks 1–4. Then the
three render styles in `src/app/dua-book/[id].tsx:64`, which today renders
Qur'an, quoted speech and prose identically — meaning the marks are currently
the *only* thing distinguishing them, and stripping without restyling would
lose a real distinction.

This phase is worth doing on its own merits. It is what the adhkār sessions are
blocked on, and it is where the dataset's value is actually created.

**Phase 2 — extract.** New repo. The `.mjs` scripts are already standalone, so
this is a move plus a GitHub Action. Publish `book.json` with an empty
`annotations.json`.

**Phase 3 — the app becomes a consumer.** `npm run hisn` downloads a pinned
release into `.cache/` instead of hitting IslamHouse directly, and generates
`hisn.ts` from it. Still build-time; still zero runtime network. This is the
step that proves the dataset is usable by someone who is not us — which is the
only real test of a public dataset.

Phase 3 is the one to be honest about: it is not needed for the app to work,
and it exists to keep the app and the dataset from drifting apart. If phase 2
never happens, phase 1 has still paid for itself.

---

## 8. Open decisions

1. **The 52 word-bearing brackets — display with or without brackets?**
   Recommendation: **with**. They mark an addition found in another narration,
   and unbracketing asserts it is part of the main text. Iyad reads Arabic and
   this is his call, not a reviewer's.
2. **Licence on `annotations.json`.** The repo needs a `LICENSE` file to exist
   at all, and it covers our own editorial work — the classification, the
   counts, the placement. Recommendation: **CC0** for the annotations, with the
   upstream text carrying its `source` block exactly as it does now, the same
   provenance the app already records via `arabicFrom` / `translationFrom`. For
   reference, Seen-Arabic ships MIT.
3. **Repo name.** `hisn-dataset` is dull and searchable. `hisn-json` collides
   with three existing repos.
4. **English translations beyond IslamHouse's.** Their `transes=fr` and
   `transes=es` return the publisher's own French and Spanish. Fetching those
   is cheap and would make the dataset the only multilingual one. Not phase 1.
