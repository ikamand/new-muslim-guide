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

_(empty — next additions go here)_

---

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
