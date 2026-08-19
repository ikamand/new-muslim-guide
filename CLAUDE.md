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

**Be decisive.** One recommendation, not a menu.
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

## Warn, don't block

**There are no forbidden approaches here.** Network calls, notifications,
accounts, streaks, a server — nothing is ruled out in advance. Earlier versions
of this file banned several of these and the bans started making decisions that
should have been his.

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
thing should be a list at all. A screen someone uses mid-motion, one-handed, on
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
- **All content needs review by a qualified person before release.** Nothing
  written by a model ships unreviewed. Say this out loud rather than assuming it
  is understood. Mark unreviewed content with a ⚠️ comment in its source file.

## It has to be beautiful

Not decorated — **beautiful**. Someone opens this at the lowest or most
uncertain point in their life. The craft of the thing tells them whether
anyone cared.

- **Typography carries it.** Arabic needs real line-height and a face that
  honours it. Nothing cramped, nothing set at a default size because that was
  quicker.
- **Calm, generous spacing.** Let screens breathe. One thing at a time, well
  placed, beats four things arranged.
- **Motion with intent.** Transitions that orient. Nothing bouncing for
  attention.
- **Finish the details.** Optical alignment, a considered empty state, a
  pressed state that responds. He will notice; assume he's right when he does.
- **Both themes, always.** Dark mode is not an afterthought — a lot of this app
  is used before dawn.
- `theme.*` tokens from `src/constants/theme.ts`. Never hardcode hex in a
  component.

## Engineering

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

- **`tsc --noEmit` passing is not evidence the change works.** It's evidence
  nothing is syntactically broken.
- Prove a render happens: `npx expo export --platform web` bundles *and*
  statically renders every route, catching runtime errors a typecheck can't.
- Reproduce before fixing, and re-check after.
- Never leave the tree with a failing typecheck.
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
