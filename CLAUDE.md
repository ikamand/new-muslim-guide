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
  on routine calls. Ask only when different readings mean materially different
  work.

## How to work

**Be decisive.** One recommendation, not a menu.
**Be surgical.** Fix the specific thing. Don't tidy surrounding code unasked.
**Be honest.** Separate what you reasoned from what you observed. State a real
cost in the same breath as the benefit. Correct your own errors without
ceremony.
**No fluff.** Never open by restating the question.

**Brutal Mode** — on "be brutal", "tear it apart": increase directness sharply,
surface every flaw, drop the softening. Still constructive.

## What the app is

A guide for someone who has just become Muslim, or is about to. Phone-first,
iOS and Android, **entirely on-device** — no accounts, no server, no network.

**The spine is salah.** How to pray, step by step, with the words written out
in Arabic, transliteration and English. Everything else in the app hangs off
that. Wudu comes first because it comes first.

**One step per screen.** A step is one thing you do: what to do with your
body, and what to say while you do it. Someone learning to pray is holding a
phone in one hand, mid-motion, on a prayer mat. That is the primary user, and
every layout answers to it.

**The five prayers are generated, not written five times.** They differ only
in rakʿah count and whether the Qur'an is recited aloud, so `buildPrayer` in
`src/content/prayers.ts` derives all of them from those two facts. A fix to a
step lands in every prayer. Adding witr or a sunnah prayer is one line in
`PRAYER_SPECS`. **Never hand-write a sixth prayer script.**

## Content is the product, and it is not yours to improvise

The code is scaffolding around religious instruction. Getting it wrong is a
different class of mistake from a layout bug.

- **Never invent, paraphrase from memory, or "improve" an Arabic text, a
  transliteration or a translation.** Recitations live in one file,
  `src/content/recitations.ts`, so a correction lands everywhere.
- **The app is Sunni, and its evidence is authenticated hadith.** This is
  settled, not a per-file decision. Don't hedge it in prose, don't present
  Sunni practice as one option among several, and don't reach for a weak or
  disputed narration because it makes a nicer sentence. If the only support
  for something is a narration you can't place as authentic, leave it out.
- **Schools of thought differ** on details — hand position, saying the
  intention aloud, the number of times something is wiped. That is *within*
  Sunni Islam and is untouched by the rule above. The app teaches **one clear
  way**, because a first-timer needs a path, not a comparison table. Where a
  difference is one a beginner will actually encounter, say so in the step's
  `note` in a single plain sentence.
- **All content needs review by a qualified person before release.** Nothing
  written by a model ships unreviewed. Say this out loud rather than assuming
  it is understood.

## Product judgment

Simple, calm, low-friction. Not gamified, not chatty, no streaks or badges —
this is not a habit app and pressure is the wrong register for it.

**Prefer what the app can infer over what the user must configure.** Every
setting is a decision handed to someone who didn't ask for one.

**Every proposal names what it removes.** If nothing goes, it isn't finished.

## Engineering rules

- `theme.*` tokens from `src/constants/theme.ts`. **Never hardcode hex** in a
  component.
- Content is typed data in `src/content/`, never inline JSX strings. A screen
  renders a `Step`; it doesn't know what a rakʿah is.
- expo-router file routes under `src/app/`. Typed routes are on.
- Path alias `@/*` → `src/*`, `@/assets/*` → `assets/*`.
- Avoid `any` — prefer a specific cast with a comment.
- No data fetching. If something ever needs the network, that is a design
  decision to raise, not a detail to slip in.

## Before you ship

- **`tsc --noEmit` passing is not evidence the change works.** It's evidence
  nothing is syntactically broken.
- Prove a render actually happens: `npx expo export --platform web` bundles
  *and* statically renders every route, which catches runtime errors a
  typecheck can't.
- Reproduce before fixing, and re-check after.
- Never leave the tree with a failing typecheck.

## Shipping

| Changed | Reaches the device via |
|---|---|
| `src/`, `assets/` | `npx expo start` in dev; an EAS build or OTA once a channel exists |
| `app.json` plugins, native config, new native dependency | full `eas build` — an OTA will not carry it |

No server, no migrations, nothing to deploy. **End every change by naming
which of these it needs.**

## Commits

```
Short summary, imperative mood (< 72 chars)

- Feature: what was added and why
- Fix: what was broken and how it's fixed
- Polish: what changed and the intent

Co-Authored-By: Claude <noreply@anthropic.com>   ← name the model actually running
```

Before committing: `tsc --noEmit` clean, stage specific files, never
`git add -A` blindly. Solo dev — work on `main`.
