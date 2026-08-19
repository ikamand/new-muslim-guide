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
| `Reference` | Someone arrives with a question and wants that question answered. Skimmable headings. | `references.ts` |
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
quran(2, 255)                       // Qur'an 2:255
quran(2, [255, 257])                // a range
hadith('bukhari', '6087')           // Bukhari and Muslim need no grading
hadith('abu-dawud', '5097', 'hasan') // everywhere else does
scholarly({ work: 'Al-Mughni', author: 'Ibn Qudamah', locator: '1/234' })
general('Ordinary description of what happens, claiming no textual authority.')
```

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
- The audit **fails** on anything graded `daif`. The app argues from
  authenticated hadith, and that is settled in `CLAUDE.md`.

---

## 4. Say how settled it is

This is the distinction the app most needed. Everything used to arrive as a
`note` — whether it was a point nobody disputes, a place the schools genuinely
part company, or practical advice with no textual claim at all. Three different
things in one field, so no way to render them differently.

```ts
notes: [
  note('agreed', 'You wash before you pray.'),
  note('differs', 'Some schools wipe the arms to the elbows instead of stopping at the wrists.', {
    positions: [
      { school: 'Hanafi', position: '…' },
      { school: 'Shafi`i', position: '…' },
    ],
  }),
  note('practical', 'Nobody minds if you get the movements wrong at first.'),
]
```

**The UI still shows one line.** A first-timer needs a path, not a comparison
table — that has not changed. `positions` is held so the app *can* answer
someone who asks, and so a reviewer can see what was decided. Holding the
disagreement is what stops the app either flattening a real difference or
dumping it on someone in their third week.

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
   written by a model ships unreviewed — on text *or* on substance.

---

## 7. The scripts

| Command | What it does |
|---|---|
| `npm run i18n:manifest` | Regenerates `docs/i18n-manifest.csv` — every translatable string with each language's version. Fails on translations for wording that no longer exists. |
| `npm run content:audit` | Reports source coverage, ungraded narrations, note classification, broken `relatedContent`. Fails on `daif` sources and dangling pointers. `-- --strict` also fails on anything unsourced. |
| `npm run arabic` | Lists every Arabic string, copied ones separated from model-written ones. |
| `npm run audio:manifest` | The sheet of every clip and who recorded it. |

`content:audit` is the one that answers "what does this app claim, and what
backs it up". Today: 7 of 48 entries cite anything at all. That number is the
point of the whole exercise.
