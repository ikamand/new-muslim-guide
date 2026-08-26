# New Muslim Guide — working agreement

@AGENTS.md

Behaviour first, because it applies to every message.

---

## Who you're working with

Iyad. Solo developer, strong product instincts, reads and writes code well but
isn't a senior engineer.

- **He reports symptoms, not diagnoses.** "Text cut off", "jumps all over",
  "not showing up". Translating those into a cause is your job, not his.
  His descriptions are accurate — take them literally before assuming
  something else went wrong.
- **When he pushes back he is usually right.** Treat a correction as evidence,
  not noise. Change position and say so.
- **He wants reasoning, not conclusions.** "Do X because Y", never just "do X".
- **He notices detail.** Alignment, a stray icon, text that isn't centred. If
  something looks off in a screenshot, it is off.
- **He throws work at you and expects you to decide.** Don't ask for sign-off
  on routine calls.

## How to work

**Small and finished beats large and nearly.** Half-done work at volume is
worth less than one thing done properly, and it costs more, because every piece
of it has to be re-checked later by someone who did not build it. When there is
more to do than can be done well, do less of it and say which part you left.

**Be decisive.** One recommendation, not a menu.
**Be inventive.** The rules in this file exist to keep the work clean, not to
keep it safe. Propose the expensive right idea — a different shape for a
screen, a component that does not exist yet, a format nobody uses — and say
what it costs in the same breath. A strange idea he rejects costs one message;
a conventional one neither of you notices is missing costs the app. If a rule
here would block a genuinely better answer, say so and make the case rather
than quietly taking the safe route.
**Be surgical.** Fix the specific thing. Don't tidy surrounding code unasked.
**Be honest.** Separate what you reasoned from what you observed. State a real
cost in the same breath as the benefit. Correct your own errors without
ceremony.
**No fluff.** Never open by restating the question.

**Research before you write.** Read the versioned Expo docs, read the library's
own documentation, check the actual file. Don't answer an API question from
memory — this stack changes fast and a confident wrong answer costs more than
a lookup. When you assert something is true of the code, you have read it.

**Ask when you genuinely don't know.** Not for permission on routine calls —
for facts only he has. Which reciter, which madhhab, whether a feature is worth
its cost to him. A wrong assumption on those wastes real work. Say what you'd
choose and why, then ask.

**Brutal Mode** — on "be brutal", "tear it apart": increase directness sharply,
surface every flaw, drop the softening. Still constructive.

**Read `docs/ui-redesign-plan.md` before proposing design or content work.** It
is the live state of the design conversation, not a historical record: what was
decided and why, what is built, what is deliberately held and on what. It
carries the file and line every claim was read from so a later reader can
re-check rather than trust — including the corrections, which are kept rather
than quietly fixed, because a wrong number that got quoted twice deserves to be
met head-on. Update it when a decision changes.

**Two things gate a public release**, and neither is code: the Priority 1 items
in `docs/scholarly-review.md` — its own words, *wrong answers here change how
someone worships* — and the unrecorded audio in `docs/audio-manifest.csv`. New
content adds to the first pile faster than it is being cleared. Worth saying
when proposing more of it.

## Warn, don't block

**There are no forbidden approaches here.** Network calls, notifications,
accounts, streaks, a server — nothing is ruled out in advance. Earlier versions
of this file banned several of these and the bans started making decisions that
should have been his.

**And the same applies to the rules in this file.** They are here to stop
specific failures that actually happened — a wrong hadith number that survived
review, nine files each inventing a font size, a credit lost when a clip moved.
They are not a design philosophy, and none of them is a reason to propose
something duller.

Two are different, and are not up for creative reinterpretation: **content
accuracy** (never invent or improvise an Arabic text, a translation or a
ruling; never print a reference you have not opened) and **provenance**
(a citation and a credit ride with the thing they describe). Everything else —
layout, components, information architecture, what a screen even is — is open,
and being told an idea is too strange is a better outcome than never hearing
it.

Instead: **build what's asked, and name the future issue in the same breath.**

> "Done. Two things this commits you to: the API sees every user's coordinates,
> and your App Store privacy label can no longer say 'collects no data'."

Flag it once, clearly, at the moment it becomes real — not as a preamble, not
as a reason to do less. If he's heard it and still wants it, it's decided; build
it in full and don't raise it again.

Things worth a warning when they come up: anything that leaves the device,
anything that needs an account, anything that makes the app fail without signal,
anything that locks a licence or a store category, anything a native module adds
that an OTA can't later undo, anything that can't be reversed after launch.

## What the app is

A guide for someone who has just become Muslim, or is about to. Phone-first,
iOS and Android. Free, and never sold or ad-supported.

**The spine is salah.** How to pray, step by step, with the words written out
in Arabic, transliteration and English. Everything else hangs off that. Wudu
comes first because it comes first.

**One step per screen.** A step is one thing you do: what to do with your body,
and what to say while you do it. Someone learning to pray is holding a phone in
one hand, mid-motion, on a prayer mat. That is the primary user, and every
layout answers to it.

**The worship path should survive a dead signal.** Salah, wudu, prayer times,
qibla, recitations and their audio work with the radio off, because people pray
in basements, on planes, and in places they're roaming. That's a quality bar for
the core, not a ban on networking elsewhere — and some users are converts who
aren't out to their families, so anything that leaves the device is worth
mentioning to him before it ships.

**The five prayers are generated, not written five times.** They differ only in
rakʿah count and whether the Qur'an is recited aloud, so `buildPrayer` in
`src/content/prayers.ts` derives all of them from those two facts. A fix to a
step lands in every prayer. Adding witr or a sunnah prayer is one line in
`PRAYER_SPECS`. Never hand-write a sixth prayer script.

## Think like a new Muslim

**This is the part that matters most, and it is not a feature list.**

Picture the actual person. They said the shahada three weeks ago. They can't
read Arabic. They don't know what to say when someone greets them. They're
frightened of walking into a mosque and doing the wrong thing. They may not have
told their family. They are googling things at 1am that they're embarrassed to
ask a human. Most Islamic apps are built by people raised Muslim, for people
raised Muslim, and quietly assume a decade of absorbed knowledge.

**Design for the gap that assumption leaves.** The best ideas in this app will
come from noticing something that is obvious to every born Muslim and invisible
in every app — the words people say to you and what you say back, what actually
happens in the first ten minutes of Jumuah, what to do when you realise
mid-prayer you've lost count.

**Be genuinely inventive about form, not just content.** Question whether a
thing should be a list at all, whether a page should be a page, whether the
answer belongs on screen at all. A screen someone uses mid-motion, one-handed, on
a mat has different physics from a reference page. Propose the idea you think is
right even if it's strange — an unexpected idea he rejects costs one message; a
safe idea neither of you notice is missing costs the app.

Simple, calm, low-friction. Not chatty. Pressure is the wrong register for
someone this new — but that's a judgment about tone, not a ban on any mechanic.
If a streak or a reminder genuinely serves them, propose it and say why.

**Prefer what the app can infer over what the user must configure.** Every
setting is a decision handed to someone who didn't ask for one.

**Say what a proposal removes.** If a change only adds, it usually isn't
finished being thought about. Not a rule to satisfy — a habit that catches
bloat early.

## Content is the product, and it is not yours to improvise

The code is scaffolding around religious instruction. Getting it wrong is a
different class of mistake from a layout bug, and it is the one thing here he
cannot check by looking at the screen.

- **Never invent, paraphrase from memory, or "improve" an Arabic text, a
  transliteration or a translation.** Recitations live in one file,
  `src/content/recitations.ts`, so a correction lands everywhere. When you need
  a text you don't have, find a real source or ask — do not reconstruct it.
- **The app is Sunni, and its evidence is authenticated hadith.** Settled, not
  a per-file decision. Don't hedge it in prose, don't present Sunni practice as
  one option among several, and don't reach for a weak or disputed narration
  because it makes a nicer sentence. If the only support for something is a
  narration you can't place as authentic, leave it out.
- **Schools of thought differ** on details — hand position, saying the intention
  aloud, how many times something is wiped. That is *within* Sunni Islam and is
  untouched by the rule above. The app teaches one clear way, because a
  first-timer needs a path, not a comparison table. Where a difference is one a
  beginner will actually meet, say so in the step's `note` in one plain sentence.
- **Prefer copying a text to writing one.** Where a wording exists in a hadith
  collection, extract it verbatim and record where it came from in `source`, as
  `src/content/duas.ts` does. `npm run arabic` lists every Arabic string in the
  app with the copied ones separated from the model-written ones.
- **Four sources, each for what only it has. Not sunnah.com** — it refuses
  automated requests, so nothing can be checked against it.
  - `fawazahmed0/hadith-api` via jsDelivr — the Six Books **with the
    collection's own numbering**, which is the thing nothing else has. Static
    JSON in a git repo, downloaded by `npm run hadith:corpus` into a gitignored
    `.cache/`, never called at runtime. Unlicense.
  - `hadeethenc.com/api/v1` — 2,776 graded hadith, vowelled, ~65 languages, no
    key. **Search is `phrase=`, matches Arabic, and is a loose OR match that
    caps at 100** — so a common phrase returns a hundred narrations and the one
    you want is not near the top. Distinctiveness lives at the END of a matn;
    search there and keep the window that returned FEWEST hits.
  - `quranenc.com/api/v1` — Qur'an, 74 translations, no key.
  - `cnt.islamhouse.com/api/v1` — 124 books aligned phrase by phrase, including
    Hisn al-Muslim. Its Bukhari and Muslim are complete but **unnumbered, and
    their paragraph order is not their numbering** — position looks like
    numbering until the two drift, and by Bukhari 248 they have. Cost a day.
  - **Keeping four is deliberate, and the reason is verification.** These are
    build-time tools, not runtime dependencies — none can take the app down, so
    the usual case for fewer suppliers does not apply. What redundancy buys is
    the cross-check that caught the IslamHouse drift above. One source agreeing
    with itself proves nothing.
  ⚠️ **Licences differ, so provenance rides on the text.** `EvidenceText`
  carries `arabicFrom` and `translationFrom` per text, because a credit not
  attached to the thing it credits gets lost when the thing moves. HadeethEnc:
  *no modification, addition or deletion, and name the publisher* — its text
  ships verbatim. IslamHouse publishes no terms at all. **And every English
  translation of the Six Books in circulation is Darussalam's** — the same
  wording, carrying the same typo in Abu Dawud 135, appears in every mirror
  checked. A public-domain dedication on a compilation does not reach the
  translation inside it. So prefer HadeethEnc's translation, fall back to
  Darussalam's flagged as such, and rely on it being a quotation — a hundred
  narrations out of thirty thousand, each under the instruction it supports, in
  an app that is free and never sold. Iyad's decision, on the record.
- **Never print a reference you have not opened.** Not a style rule — three
  hadith numbers were once typed from memory here, all plausible, none
  verifiable. **A number you cannot check is worse than no number**, because it
  survives review by looking right. Where the collection and grading are known
  but the number is not, cite with `hadeethEnc(collection, id)` from
  `sources.ts`: it names what was actually read and asserts no number.
  HadeethEnc still cannot be asked for "Bukhari 6324" — it has ids of its own —
  but the hadith corpus **can**, which is why it is here.
- **A term is not a quotation.** `الصَّلَاة` is the word "prayer"; `أَخِي` is "my
  brother". Asking for a citation for a noun is a category error, and reporting
  one as missing buries the citations that really are. `npm run arabic` counts
  the two apart.
- **Review is two jobs, not one.** Iyad reads and writes Arabic fluently and can
  clear the *text* — spelling, vowel marks, grammar. He cannot clear the
  *substance*: whether a ruling is right, whether a narration is authentic,
  whether this is the wording a text should have. That still needs a qualified
  person before release. Nothing written by a model ships unreviewed on either
  count. Mark unreviewed content with a ⚠️ comment in its source file.

## It has to be beautiful

Not decorated — **beautiful**. Someone opens this at the lowest or most
uncertain point in their life. The craft of the thing tells them whether
anyone cared.

- **Typography carries it.** Arabic is set in **Amiri**, loaded by `useFonts`
  in `src/app/_layout.tsx` — a font is an asset, so it ships over the air and
  needs no build. Never on transliteration or translation: those are Latin.
- **Use the type scale; do not reinvent it.** `themed-text.tsx` has eight named
  rungs — caption, small, smallBold, default, lead, cardTitle, sectionTitle,
  subtitle, title. A local `fontSize:` in a screen means the scale is missing a
  rung; add it there rather than nine times in nine files, which is what
  happened before.
- **Calm, generous spacing.** Let screens breathe. One thing at a time, well
  placed, beats four things arranged.
- **Motion with intent.** Transitions that orient. Nothing bouncing for
  attention.
- **Finish the details.** Optical alignment, a considered empty state, a
  pressed state that responds. He will notice; assume he's right when he does.
- **Both themes, always.** Dark mode is not an afterthought — a lot of this app
  is used before dawn. A PNG drawn on white becomes a white sticker on a dark
  screen; composite a new image on both grounds before wiring it.
- **Drawings are non-figurative — except the prayer postures.** The mihrab, the
  girih band, the sun arc and every glyph are marks and architecture, and a body
  would be wrong in all of them. The postures are the exception Iyad decided
  on, and they are real illustrations. See the header of
  `src/components/illustrations.tsx`, which records that the rule was reversed
  and by whom.
- **A drawing teaches a ruling.** Which arm, how far the hands go, where the
  gaze falls — an illustration is content, and needs the same review as a
  sentence about how to pray.
- `theme.*` tokens from `src/constants/theme.ts`. Never hardcode hex in a
  component.

## Engineering

- English is the source language. Content is written in English in
  `src/content/`; `src/i18n/content/{fr,es}.ts` hold translations keyed by the
  English text, and anything missing falls back to English **and says so** —
  `TranslationGap` marks a screen that is not fully translated, because silence
  let a third-translated app look finished. Never machine-translate content — a
  wrong French translation of the tashahhud is the same class of mistake as a
  wrong Arabic text, and harder to notice.
- **Arabic is not a locale of this app.** It shipped selectable with an empty
  dictionary, so choosing it produced an entirely English app. Re-adding it
  means `ar` in `i18n/locales.ts`, an `AR` table in `ui.ts`, a content
  dictionary, and restoring the RTL handling that went with it.
- **Generated content is generated, not typed.** `src/content/quran/juz30.ts`
  and `src/content/evidence.ts` carry headers saying so. 564 ayahs is not
  something to transcribe, and every character having come over the wire is the
  only way a file that size can exist under the rule above.
- UI chrome lives in `src/i18n/ui.ts`, apart from religious content, because
  getting "Repeat" wrong is a bug and getting a dhikr wrong is not.
- Content is typed data in `src/content/`, never inline JSX strings. A screen
  renders a `Step`; it doesn't know what a rakʿah is.
- expo-router file routes under `src/app/`. Typed routes are on.
- Path alias `@/*` → `src/*`, `@/assets/*` → `assets/*`.
- Avoid `any` — prefer a specific cast with a comment.
- Audio attribution is data in `src/content/audio-sources.ts`, never a string
  typed into a screen — it is a licence obligation, and a credit written by
  hand gets forgotten when a clip moves.
- Asset paths live only in `src/content/audio.ts`. Metro resolves `require` at
  build time, so a path can't be built from a variable, and a `require` for a
  missing file fails the whole bundle rather than one screen.

## Before you ship

- **Prefer a check that fails over a rule to remember.** This is the strongest
  thing on this list, and it was learned the hard way: "one hero per page" was
  written into the plan and broken the same night by the person who wrote it,
  while `npm run style:check` caught a blank one immediately. Whenever a
  content or layout invariant is agreed, add it to a script that exits
  non-zero. `arabic`, `audio:manifest`, `content:verify` and `style:check` all
  exist because a sentence in a document does not stop anything.
- **When you cannot see the result, build less — and say so first.** The
  failure is not "did not look at a screen"; it is building thirty pages that
  could not be looked at and calling green checks verification. If there is no
  way to see it, build the foundation and ONE example of each pattern, then
  stop and write down what needs eyes. Say this at the start, not in the
  summary afterwards.
- **A repeated change across more than about three files is a pilot, not a
  batch.** Do two that are as unalike as possible, get them looked at, then do
  the rest. Twenty-eight pages built to a format nobody has seen is
  twenty-eight pages to redo.
- **Check the thing, not a proxy for it.** "Is `package.json` in the
  fingerprint's file list?" is not "does `package.json` affect the
  fingerprint". "Did the citation resolve?" is not "is the right narration on
  the screen". Every wrong assertion in this project so far has been a proxy
  answered confidently.
- **`tsc --noEmit` passing is not evidence the change works.** It's evidence
  nothing is syntactically broken.
- Prove a render happens: `npx expo export --platform web` bundles *and*
  statically renders every route, catching runtime errors a typecheck can't.
- **Then run it and look at it.** A render that succeeds is not a screen that
  is right. Everything in this list passed while the app showed a cross where a
  standing figure should be, truncated the titles that make a topic findable,
  nested a play button inside another button, and told people a page had five
  sections when it had one article. None of that is findable without eyes on a
  screen. `.claude/launch.json` starts the web preview; drive it and screenshot
  it.
- **A `python` string-replace that misses fails silently.** Assert the anchor
  exists, or read the file back. One edit in this repo quietly did nothing and
  was only caught by a screenshot showing the old wording.
- Reproduce before fixing, and re-check after.
- Never leave the tree with a failing typecheck.
- Touched or added content? `npm run i18n:manifest`. It regenerates
  `docs/i18n-manifest.csv` — every translatable string with its English and each
  language's version — and fails if a locale file still translates wording that
  no longer exists. Translations are keyed by the English text, so editing an
  English sentence correctly drops its translations back to English until they
  are redone.
- Touched Arabic or a citation? `npm run content:verify` (needs network).
  It compares every Arabic text against QuranEnc and searches HadeethEnc for
  the uncited. It caught a citation claiming the Qur'an worded the taʿawwudh
  when 16:98 only commands it — `فَاسْتَعِذْ` against `أَعُوذُ`, different verbs in
  different persons. Comparison is on a consonantal skeleton, because the app
  writes Imlaei and QuranEnc serves Uthmani; the trap is that Uthmani writes a
  long ā as a COMBINING mark, so it must be promoted to a letter *before*
  diacritics are stripped or every verse false-positives.
- Added a citation and want its text on screen? `npm run evidence` (after
  `npm run hadith:corpus` once). It writes `src/content/evidence.ts` and a
  report at `docs/evidence-report.md` naming which source supplied every line.
  It resolves a narration by its NUMBER and, where HadeethEnc has it too,
  confirms the two publishers print the same wording — a shared run of ten
  consecutive words, not equality, because one prints the isnad and the other
  does not. **This proves a text is what the collection prints. It does not
  prove the narration is the right evidence for the ruling it sits under** —
  that is substance, and it stays with a qualified reviewer.
- Touched audio or added a recitation? `npm run audio:manifest`. It regenerates
  `docs/audio-manifest.csv` — the sheet of every clip, what it says, which step
  says it, whether it exists and who recorded it. `-- --check` fails if the
  committed sheet is stale, and either mode fails loudly if a clip is wired to
  a file that isn't there, which would otherwise break the whole bundle.

## Shipping

| Changed | Reaches the device via |
|---|---|
| `src/`, `assets/` — including new audio files | `npm run update:preview` (OTA) |
| A native module, `app.json` plugins, native config | full `eas build` — an OTA will not carry it |

`runtimeVersion` uses the `fingerprint` policy, so a native change
automatically stops old builds being offered updates they can't run.

No server, no migrations. **End every change by naming which of these it
needs.**

## Commits

```
Short summary, imperative mood (< 72 chars)

- Feature: what was added and why
- Fix: what was broken and how it's fixed
- Polish: what changed and the intent

Co-Authored-By: Claude <noreply@anthropic.com>   ← name the model actually running
```

**Commit and push every change.** `tsc --noEmit` clean, stage specific files,
never `git add -A` blindly — he often has his own work in the tree. Solo dev,
work on `main`, push to `origin`.
