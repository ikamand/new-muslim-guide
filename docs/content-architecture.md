# Content architecture

How content is shaped, sourced, and translated. Read this before adding any.

The code is scaffolding around religious instruction. Everything here exists to
make one question answerable: **how do we know this is true, and who checked?**

---

## 1. Pick a shape

Four shapes already exist and they are not interchangeable. The distinction is
*when someone reaches for it*, not what it is about.

| Shape | Use it when | Lives in |
|---|---|---|
| `Guide` | Someone follows it holding a phone, mid-motion. A sequence of `Step`s. | `wudu.ts`, `prayers.ts`, `shahada.ts` |
| `Reference` | Someone arrives with a question and wants that question answered. Skimmable headings. | `references.ts` (mid-prayer lookups), `learn/` (beginner explanations) |
| `Pillar` | A named thing you read about once. Used for both the five pillars and the six articles. | `pillars.ts`, `iman.ts` |
| `Recitation` | Words that are said. Arabic, transliteration, translation, optionally split into verses. | `recitations.ts` |

Plus `Dua` (a recitation with an occasion) and `Phrase` (something said *to* you
and what you say back).

**Never hand-write a sixth prayer.** The five are generated from `PRAYER_SPECS`
in `prayers.ts` — they differ only in rakʿah count and whether the Qur'an is
recited aloud. Adding witr or a sunnah prayer is one line there.

---

## 2. Add the metadata block

Every shape takes an optional `meta`. It is optional so the layer can be adopted
one file at a time; it is not optional in spirit — new content should carry it.

```ts
meta: {
  category: 'purification',      // closed union — see model.ts
  difficulty: 'foundational',    // how much it assumes, not how hard the subject is
  estimatedMinutes: 4,           // honest, for one pass
  beginnerPriority: 1,           // 1 = first week … 5 = background reading
  tags: ['first-day'],
  relatedContent: [ref('guide', 'ghusl'), ref('guide', 'fajr')],
},
```

`relatedContent` uses `ref(kind, id)` rather than a bare string, because ids are
only unique **within** a kind — `shahada` is a guide *and* a pillar today. A
pointer that resolves to nothing is reported by `npm run content:audit`, not
thrown at a user mid-prayer.

`WUDU` in `wudu.ts` and `MOSQUE` in `references.ts` are the worked examples.

---

## 3. Say where it comes from

Provenance is data, in `sources.ts`. Four kinds, because there are four honest
answers to "how do you know":

```ts
quran(2, 255)
quran(1, [1, 7], { surahName: 'Al-Fatihah' })

hadith('bukhari', '6324', {          // Bukhari and Muslim need no grading
  book: 80,
  bookName: 'Invocations',
  inBookReference: 'Book 80, Hadith 21',
})

hadith('abu-dawud', '5095', {        // everywhere else does
  book: 43,
  bookName: 'General Behavior (Kitab Al-Adab)',
  inBookReference: 'Book 43, Hadith 323',
  grading: 'sahih',
  gradedBy: 'Al-Albani',             // a grading without a grader says nothing
})

scholarly({ work: 'Al-Mughni', author: 'Ibn Qudamah', volume: '1', page: '234', school: 'Hanbali' })
general('Ordinary description of what happens, claiming no textual authority.')
```

`sourceUrl(source)` resolves a page a reviewer can open — `quran.com/5/6`,
`sunnah.com/bukhari:6324`. Both patterns were confirmed against the live sites,
and every sunnah.com collection slug was verified by requesting it. Muwatta
Malik has none: it is not addressable as `malik:<n>`, and a link that 404s is
worse than no link. Set `url` explicitly to override — the worked example is
Ibn `Umar's Eid ghusl in `ghusl.ts`, which carries
`url: 'https://sunnah.com/malik/10'`, the book page that does resolve and does
contain it. It has no grading either, because sunnah.com prints none on the
Muwatta, and the audit reports it as ungraded rather than the file inventing
one.

### Verify before you cite — this is not optional

The first pass at this file cited **Sahih al-Bukhari 6087** for the duʿa before
sleeping. Bukhari 6087 is about smiling, and the expiation for breaking a fast
in Ramadan. Five of the seven citations originally in the app were wrong in the
same way — plausible numbers, real collections, wrong hadith.

A citation written from memory looks exactly like one that was checked. Open the
page, match the Arabic, copy the book and in-book reference from what you see.

**`general` is a real answer, not a cop-out.** "The mosque will be busier on
Friday" needs no isnad. Most of what this app says about walking into a building
or feeling nervous is ordinary explanation, and marking it as such is more
honest than leaving it blank.

### The rules

- **Never invent a citation.** An unsourced claim is honest. A fabricated one is
  worse than nothing, because it survives review by looking right. If the
  wording came from somewhere you cannot name, leave `sources` off — the audit
  will list it.
- **Never guess a grading.** A grading is a scholarly judgement. Bukhari and
  Muslim are authentic throughout, which the collection record encodes; the
  Sunan collections are not, and their entries need a real grading or none.
- **There is no "Bukhari or nothing" rule.** Abu Dawud, Tirmidhi, Ibn Majah,
  an-Nasa'i and Musnad Ahmad are recognised collections. A narration is not
  weak because of where it appears, and not sound because of it either.

### What a grading decides, and what it does not

A grading says how strong a narration is. It does not on its own say whether the
narration may be cited — that depends on what it is being cited **for**, which is
what `role` records:

| `role` | Used for | Weak narration? |
|---|---|---|
| `ruling` *(default)* | an obligation, a prohibition, a point of creed | **blocked** |
| `practice` | the wording of a duʿa, a dhikr, a phrase | reported with its grading |
| `virtue` | the reward of an act established elsewhere | reported with its grading |
| `context` | history or background, claiming nothing | reported with its grading |

`role` defaults to `ruling`, so forgetting to set it makes the audit stricter,
never laxer. **`mawdu` (fabricated) is blocked everywhere, for every role.**

Nothing here upgrades a grading. A weak narration stays weak in the data and in
anything shown to a reader; `role` only decides what the audit blocks.

The worked example is the after-meal duʿa. `al-ḥamdu li-llāhi-lladhī aṭʿamanā wa
saqānā wa jaʿalanā muslimīn` is carried by Abu Dawud 3850, Tirmidhi 3457 and Ibn
Majah 3283 — three books, two chains, graded weak in all three. It is kept,
labelled, and cited as `practice`. `duaAfterEatingProvision` sits beside it with
the hasan-graded wording from Tirmidhi 3458 and Ibn Majah 3285. Neither is
presented as the other, and neither was deleted.

---

## 4. Say how settled it is

This is the distinction the app most needed. Everything used to arrive as a
`note` — whether it was a point nobody disputes, a place the schools genuinely
part company, or practical advice with no textual claim at all. Three different
things in one field, so no way to render them differently.

```ts
notes: [
  note('agreed', 'You wash before you pray.'),
  note('differs', 'Some schools wipe the arms to the elbows rather than stopping at the wrists.', {
    sources: [hadith('bukhari', '347', { book: 7, inBookReference: 'Book 7, Hadith 8' })],
    additionalExplanation: 'The wording of the narration is that the Prophet ﷺ struck the earth once…',
    positions: [{ school: 'Hanafi', position: '…' }],
  }),
  note('practical', 'Nobody minds if you get the movements wrong at first.'),
]
```

One record holds all four things a beginner-facing app has to carry at once:

| Field | Who it is for |
|---|---|
| `text` | the straightforward beginner answer — **always shown** |
| `positions` | the scholarly difference, with typed attribution |
| `sources` | where any of it comes from |
| `additionalExplanation` | the depth, for whoever asks |

**Only `text` renders by default.** Everything else sits behind "Learn more" in
`ContentNoteCard`. Someone three weeks into Islam who is told four schools
disagree about wiping their arms has not been informed, they have been stalled —
but flattening the difference is its own kind of lie, and they will meet someone
who does it the other way.

`school` is typed (`Attribution`) rather than free text, so "Hanafi", "hanafi"
and "the Hanafis" cannot all appear. Never state a position as its holders would
not state it.

The plain `note?: string` field still works and still renders. It is read as
`practical`, which is what nearly all 74 existing ones are. Migrate one when you
have a reason to, not as a chore.

---

## 5. Language

Two different things get called "Arabic". Keep them apart.

**Arabic as a reading locale.** Someone reads the whole app in Arabic.
`locale === 'ar'`, served by `src/i18n/content/ar.ts`, RTL layout. This is
ordinary UI translation.

**Arabic as practice.** The words themselves — Qur'an, dhikr, the shahada, duʿa,
the phrases people greet you with. A reader of *any* language has to learn
these, because the Arabic is the thing being said rather than a rendering of it.

Script and transliteration are **never translated**. A Latin-script crutch is
the same crutch in French as in English. `localise.ts` enforces this.

### Which translation mechanism

**Default: the keyed table.** Write English in `src/content/`; translations live
in `src/i18n/content/{es,fr,ar}.ts` keyed by the English text. The five generated
prayers repeat "Bow" seventeen times and a keyed table translates it once. The
reasoning is in `src/i18n/locales.ts` and has not changed.

**Exception: `LocalisedText`.** Inline `{ en, es?, fr?, ar? }`, for short Arabic
glosses where the right word depends on the term rather than the English.
"Fear" and "awe" are both `taqwa`; a table keyed on a word as generic as
"mindfulness" cannot tell a translator which is meant. `ArabicTerm` uses this.

An absent `es` or `fr` is not a placeholder — it falls back to English, which is
the documented behaviour for all 321 strings. A placeholder would be `es: 'TODO'`,
and there are none.

### The beginner guides

`src/content/learn/` holds the twelve beginner explanations — what Islam is, who
the Prophet ﷺ was, what changes at the supermarket. Same `Reference` shape as
`references.ts`, different moment: those are looked up mid-prayer, these are read
in a quiet minute. Both join `REFERENCES`.

Every Qur'an and hadith citation in them was verified by opening the page and
matching the text. Their prose **is** translated into Spanish and French, because
it is original writing for this app. The Qur'an, dhikr and prayer instructions in
`recitations.ts` and the guides are **not**, and must not be — see below.

### `ArabicTerm` has no registry, deliberately

It is the declared shape for a glossary of the words a beginner hears — iqamah,
niyyah, sunnah. Inventing fourteen of them so the type does not look lonely
would be exactly the placeholder content this app must not carry, so
`ContentKind` has no `'term'` member and nothing can point at a record that does
not exist.

The app's Arabic learning content **today** is `Phrase` and `Recitation`. Both
already carry script, transliteration and an English meaning, with Spanish and
French arriving through `src/i18n/content/`. Adding a glossary is a content task
with a reviewer attached.

Either way: **never machine-translate content.** A wrong French tashahhud is the
same class of mistake as a wrong Arabic one and harder to notice. All three
content locales are currently empty on purpose.

---

## 6. Adding a piece of content — checklist

1. Pick the shape. Write it in English in `src/content/`.
2. Add `meta` with category, difficulty, minutes, `beginnerPriority`.
3. Add `sources` — or deliberately none, if you cannot name one.
4. Classify anything contested with `note('differs', …)`.
5. Register it in its list (`GUIDES`, `REFERENCES`, `PILLARS`, …). `GUIDES` in
   particular: a guide listed anywhere else is missed by the translation sheet,
   which has happened before.
6. Run the checks:

```bash
npx tsc --noEmit && npm run lint && npm run i18n:manifest && npm run content:audit
```

7. Mark anything model-written with a ⚠️ comment in its source file. Nothing
   written by a model ships unreviewed — on text *or* on substance. The comment
   has to say **what** needs review, not that something does: "model-written
   English, checked citations" is useful, "needs scholar review" is not.
8. Add the claim to `docs/scholarly-review.md` under the priority it earns —
   Priority 1 is anything where a wrong answer changes how someone worships.
   A ⚠️ in a file tells whoever opens that file; the review document is what a
   scholar reads end to end, and only one of those two is a queue.

---

## 7. The scripts

| Command | What it does |
|---|---|
| `npm run i18n:manifest` | Regenerates `docs/i18n-manifest.csv` — every translatable string with each language's version. Fails on translations for wording that no longer exists. |
| `npm run content:audit` | Reports source coverage, ungraded narrations, note classification, broken `relatedContent`. Fails on `daif` sources and dangling pointers. `-- --strict` also fails on anything unsourced. |
| `npm run arabic` | Lists every Arabic string, copied ones separated from model-written ones. |
| `npm run audio:manifest` | The sheet of every clip and who recorded it. |

`docs/scholarly-review.md` is the other half of `content:audit` and the half a
script cannot write. The audit answers "what does this app claim and what backs
it up"; the review document answers "and which of those claims is still one
person's judgement". It is ordered by consequence rather than by file, because
a reviewer's time is the scarce thing.

`content:audit` is the one that answers "what does this app claim, and what
backs it up". It prints every citation with a link, and **fails** on a narration
graded `daif` or a broken pointer.

It blocks a fabricated narration anywhere, and a weak one carrying a ruling. It
reports — with the grading shown every time — weak narrations used for a duʿa
wording, a virtue or context, and narrations from a mixed collection that carry
no grading at all.
