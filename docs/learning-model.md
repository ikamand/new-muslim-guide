# Learning that lasts

**An audit of what the app teaches, why it runs out, and what should replace
the model it is running on.**

Written 27 August 2026. Research only — nothing in here is built, and nothing
in here is content. Where it names a lesson that should exist, that is a
commission, not a draft: every sentence of religious instruction it implies
still has to be written from a source and reviewed.

Method: every claim below was read out of the repository at the file and line
named, or measured by a script over `CATALOG`. Two claims I expected to make
turned out to be wrong when I opened the file, and both corrections are kept
in place rather than quietly dropped — see §3.2. The web preview was started
but the Playwright browser was held by another session, so **nothing here was
verified by looking at a screen.** Everything visual is inferred from source.

---

## 1. The measurement

The app is **three hours long.**

| | |
|---|---|
| Distinct lessons in the journey | **36** |
| Total estimated reading time of the journey | **123 minutes** |
| Every non-duʿa teaching entry in the catalogue | **69** |
| Their total estimated reading time | **186 minutes** |
| Entries the metadata rates as first-week or first-month (priority 1–2) | 26 |
| Entries rated "when the question arrives" or "background" (priority 4–5) | **2** |

Measured over `CATALOG` and `JOURNEY` with a script; the journey figure counts
distinct steps, since Al-Fatihah and Fajr each appear in two stages.

Three hours is not a criticism of the writing. The writing is the best thing in
the repository — `learn/work.ts:41` handles riba in four sentences without
frightening anybody, and `learn/family.ts:62` answers "do I have to tell them?"
with a note about safety that most published convert material never reaches.
Three hours is a statement about **shape**. A motivated person finishes the
entire teaching content of this app in a weekend, and the app has no idea what
to do with them on Monday.

The counterweight already exists and is large: 132 duʿa occasions, 4 adhkār
sittings, 38 surahs with audio and a cover-and-recite mode, five prayers, wudu,
prayer times, qibla. That content does not run out — you say the morning
adhkār for the rest of your life. **The durable half of the app is real. None
of it is in Today or Learn.**

That is the whole problem in one line. The two tabs that shape what the app
feels like are built entirely out of the part that finishes.

---

## 2. Four defects, each verified

### 2.1 The personalisation engine is wired to nothing

`src/content/recommendations.ts` is 236 lines mapping four user stages and five
interests onto ordered lists of content, with a resolution layer that silently
drops anything unwritten. Its own header explains the design:

> "That is the whole reason recommendations live here rather than as strings in
> a screen: the screen renders whatever resolves, and gets shorter or longer as
> content lands, with no code change."

**No screen renders it.** `recommendationsFor` and `recommendedRefs` are
exported from `src/content/index.ts:22-24` and called by nothing in `src/`.
Only `pendingRecommendations` has a caller, and it is
`scripts/content-audit.mjs:31`. The tables are dead.

### 2.2 The two onboarding answers change almost nothing — and one changes nothing at all

Traced through every consumer:

**`userStage`** — four answers — has exactly one live effect in the app. At
`src/app/(tabs)/learn.tsx:187` it decides whether the Shahada card says
"3 steps" or "Read it again."

Its other intended use, `ENTRY_BY_STAGE` in `content/journey.ts:171`, is
unreachable in practice. `entryStageIndex` prefers interest
(`journey.ts:182`), and onboarding cannot produce a state where stage is set
and interest is not: Continue is disabled until each question is answered
(`welcome.tsx:198`, `welcome.tsx:226`), and Skip nulls both
(`welcome.tsx:95-96`). It fires only for a stored state from an older install.

**`initialInterest`** — five answers — does two things. It picks the journey's
entry stage, where five answers collapse into **three** distinct outcomes
(`prayer` → first-days, `daily-life` → living, and the other three → start-here,
`journey.ts:163-167`). And it reorders the ten help chips at the bottom of
Today, never filtering them (`use-help.ts:111`).

So: **twenty answer combinations produce three distinguishable app states,**
differing in which lesson one card offers first and the order of a chip row.
Iyad's read — "the getting started feels like it makes no difference" — is not
an impression. It is arithmetic.

### 2.3 The app observes almost nothing, so it cannot tell who you are

The entire personalisation surface is three fields: `completedLessons`,
`userStage`, `initialInterest` (`hooks/use-settings.tsx:56-66`). There is no
install date, no counts, no recency, no history of anything.

And `completedLessons` is barely populated. **Only guides mark themselves
done** — `guide/[id].tsx:125`, on Finish. Five of the 36 journey lessons are
guides. The other 31 — every reference, pillar, article, phrase and duʿa — can
be marked done in exactly one place: a checkbox on `/journey/[stage]`
(`journey/[stage].tsx:61`).

The consequence: **reading a lesson from the Learn tab does not advance the
journey.** Someone can read "What is Islam?" three times from Learn and Today
will still be offering it to them as the next thing to start. The app's model
of the reader is not merely thin — it is not connected to the reading.

Meanwhile two rich fields sit unread by any screen. `beginnerPriority` (1–5)
and `difficulty` are set on 52 of 69 entries and **no component reads either**
(grep across `src/app` and `src/components` returns nothing outside
`src/content/`). The vocabulary for "this is a year-two question" already
exists in the data and has never been used.

### 2.4 Nothing in the app has a shape in time

This is the defect Iyad actually named, and the Shahada card is one instance of
it.

`learn.tsx:181` is the largest object in the Learn tab: a `featured` card with
a 76-pixel girih band, permanently in position two. Its comment argues, well,
that it must not disappear — "people come back to the shahada. To re-read the
words, to get the Arabic right, to show somebody." That is true. But "return to
this a few times in your life" and "second-biggest object on the learning tab
forever" are not the same claim, and the card treats them as if they were. Its
entire response to being finished is a label change.

The general disease: **the app has exactly two states for any piece of content
— a task, or a monument.** There is no vocabulary for "you needed this daily
for a month and now you don't", "this comes back every Ramadan", or "this is
invisible until somebody dies."

`journey.ts:38` gets closest — `Requirement` is `foundation | practice |
learning | seasonal`, which is nearly the right idea. Its own doc comment says
it "changes how the step is presented and how loudly progress is counted."
Presentation only. It decides nothing about placement or persistence.

### 2.5 (A consequence) Today's test for "deadline" is drawn too tight

`hooks/use-today.ts` is one of the best-reasoned files in the repo. It threw out
two of three home-screen rows on a single test — *does it have a deadline?* —
and concluded that most of the year Today should show nothing extra. That
reasoning is right and the screen is better for it.

But the test was applied only to lessons, and a whole class of recurring
deadlines was never considered:

- The **morning adhkār window closes at sunrise.** That is a deadline, five
  times more often than Ramadan is.
- **Friday** is a deadline, weekly, and `index.tsx:102` already computes the
  weekday and comments that "Friday is the one that matters."
- **Witr** closes at Fajr. A voluntary fast has a deadline. The last third of
  the night has a deadline.

The machinery to know all of this is built and excellent — `lib/adhkar-window.ts`
computes the current sitting from real prayer times rather than clock hours, and
`ADHKAR_SESSIONS` names four sittings. **It is rendered only on the Duʿa tab.**
Today does not mention adhkār, and never mentions the Qur'an at all.

So the home screen gives permanent position two to a lesson counter that
finishes in two hours, and gives no position to the seven minutes someone will
say every morning for the rest of their life.

---

## 3. What is missing, by tier

### 3.1 First: the tiers are real, but they are not levels

Every Islamic education product ships beginner/intermediate/advanced.
SeekersGuidance runs five steps from *farḍ ʿayn* through commentaries in the
original Arabic; Mishkah, Rahiq and My Deen all sell a "first year" then
"specialised courses in tafsir, hadith and advanced fiqh." That ladder is right
for a seminary and wrong here, for a specific reason:

**A convert's knowledge is jagged, not layered.** Someone two years in may pray
five times a day flawlessly, have twelve surahs memorised, and have no idea
what to do when a colleague dies, or that Jumuʿah replaces Ḏuhr rather than
adding to it, or how to work out zakat — because none of it has come up yet.
Someone six weeks in who works near a mosque may know all three. A level model
files janāzah under "advanced" and hides it from the person whose friend died
on Tuesday.

So the three tiers below are **not difficulty bands.** They are three different
jobs the app is doing:

| | What the person needs | What the app should be |
|---|---|---|
| **Weeks 0–8** | To be told what to do next, in order | An **instructor** |
| **Months 2–24** | To be met at the moment life produces a question | A **companion** |
| **Year 2+** | Depth in what they already do, and maintenance | An **instrument** |

The app today is an excellent instructor, a partial companion, and not an
instrument at all.

---

### 3.2 Tier one — the first eight weeks

**This tier is close to done, and better than I expected.** Two claims I had
drafted were wrong and are corrected here rather than deleted:

- I was going to write that money is absent. It is not. `learn/work.ts:41`
  covers riba, names mortgages, savings and credit cards as the live cases, and
  carries a note that if you already have a mortgage "you have not ruined
  anything and you do not have to solve it this month."
- I was going to write that telling your family is unaddressed. It is
  addressed, at `learn/family.ts:62`, including the case where telling them is
  not safe.

What is genuinely missing at this tier is short, and one item on it may be the
most important gap in the whole app.

| Missing | Why it matters in week one |
|---|---|
| **The minimum valid prayer** | The app teaches the full prayer — Fajr is a 23-step guide. It never says "here is the least you can do today, and it counts." That sentence is the difference between a convert praying badly and not praying. Nothing else on this list is close in value. |
| **The five categories of ruling** | `learn/halal-and-haram.ts:38` does the hardest part — that things are permitted by default — but the app never names farḍ / mustaḥabb / mubāḥ / makrūh / ḥarām. Without them, a beginner reads every "should" in the app as a "must" and burns out in a month. It changes how every other lesson is read. |
| **The adhān** | Never explained anywhere. The string "Call to Prayers" appears only as a Bukhari book name in citations. A convert hears it on a phone or from a street and does not know it is a call rather than an alarm, or that there are words to say back. |
| **"Do I have to change my name?"** | One of the three questions converts ask most. Silent. |
| **What happens to the life before** | The shahada guide cites Muslim 121 — "Islam demolishes what was before it" — in a code comment. There is no lesson on guilt, on a previous marriage, on children, on a past that is not going anywhere. This is the 1am search the app was built for. |

Everything else at tier one exists: shahada, wudu, ghusl, tayammum, five
prayers, before-prayer, Al-Fatihah, what breaks prayer, lost count, missed,
seated, travelling, periods, first mosque visit, 14 phrases, halal and haram,
food, clothing, family, work, manners, duʿa and dhikr, repentance, patience and
gratitude, the calendar, Ramadan, five voluntary prayers, five pillars, six
articles.

---

### 3.3 Tier two — the long middle, months 2 to 24

**This is where the app is thinnest and where converts actually leave.** Every
item here is event-triggered: it is worthless until the week it is urgent, and
then it is the only thing that matters. That is exactly the content a shelf
organised by subject cannot deliver and a calendar-aware home screen can.

| Missing | Why |
|---|---|
| **Jumuʿah** | The largest single gap. Nothing in the app teaches it. `references.ts:522` mentions it once, in a note, to advise going on a *different* day — "Friday midday is the busiest hour of the week… for a first visit, go for a normal prayer." Correct advice; it leaves the actual event unwritten. That it replaces Ḏuhr rather than adding to it, that it is two rakʿah and not four, that the khuṭbah is listened to in silence, when to arrive, what happens if you arrive during it — none of it is anywhere. It is obligatory, weekly, and the single most intimidating room a convert walks into. |
| **Praying behind an imam** | `references.ts:565` tells a beginner arriving mid-prayer to "join the line where you are and follow along from wherever the imam has got to" — and stops. What happens after the imam's taslīm, when you have prayed fewer rakʿah than the prayer requires, is not stated. ⚠️ **Whether that omission is a defect is a question for the reviewer, not for me** — but it is precisely the class of thing `docs/scholarly-review.md` exists for, and I would put it at the top of the next pass. |
| **Death** | Nothing. Not the janāzah prayer, not what to say, not visiting a grave, and not the case that actually arrives first for a convert: a non-Muslim parent dying. This arrives with no warning and there is no page. |
| **Eid** | `learn/ramadan.ts:193` covers zakat al-fiṭr and mentions the morning prayer in one clause. The Eid prayer itself — the takbīrāt, that it is not like the five, where and when — is unwritten. And nobody anywhere writes the thing a convert most needs on that day, which is what to do with an Eid when you have no family to visit. |
| **Zakat, actually calculated** | `pillars.ts` deliberately names no threshold, and the reasoning is sound for a pillar page. But it is the app's only word on the subject, and a person in year two has to actually pay it. |
| **Voluntary fasting** | One paragraph inside `learn/islamic-calendar.ts:124`, covering ʿĀshūrāʾ, Shaʿbān, the six of Shawwāl and the first ten of Dhul-Ḥijjah. Well sourced, wrongly filed. It is a practice, not a calendar fact. |
| **Marriage, in shape** | `learn/family.ts:74` defers the rulings to someone local, which is right. But the *shape* — that there is a walī, a mahr, witnesses, no dating — is orientation rather than a ruling, and converts get this catastrophically wrong in the first two years. |
| **What changes with a partner you already have** | Arriving at Islam with a girlfriend or boyfriend is one of the most common convert situations that exists. The app does not acknowledge it. |
| **When you slip for a month** | `learn/repentance.ts:59` has "What if I do it again?", which is good and covers the theology. It does not cover the specific shape of a convert relapse: three weeks of missed Fajr, the shame, and whether coming back means starting over. |
| **Being corrected by other Muslims** | `learn/manners.ts` is about the reader's manners. Nothing is about other people's. Every convert-support source I read named this as a leading cause of people leaving — being publicly corrected in a mosque, told opposite things by two confident people, or handed a culture as though it were the religion. The app has the raw material to answer it: 47 `differs` notes already in the data. |

---

### 3.4 Tier three — year two and after

Nothing here exists today. This tier is what makes the app worth keeping
installed in 2029.

| Proposed | Why it belongs here specifically |
|---|---|
| **The meaning of what you already say** | Word by word: Al-Fātiḥah, the tashahhud, the tasbīḥāt, the opening duʿa. Not Arabic literacy — that is settled as out of scope, and rightly. This is *meaning*, for something the reader already says seventeen times a day. It is the single best year-two feature available to this app, because it deepens an existing act rather than adding a new one. |
| **Memorisation as a practice, not a screen** | The Qur'an tab has 38 surahs, offline audio and a cover-and-recite mode (`ui.ts:273`). What it has no concept of is *progression*: which ones you hold, which is next, and — the part that matters at year three — review of the ones you learned in year one and have started losing. Spaced review, no streak. |
| **The ninety-nine names** | Ideal long-tail content: one a day is a three-month practice, each is short, each is quotable, and the shape suits a card on Today better than a page in Learn. |
| **The sīrah in episodes** | One reference page today. In every convert programme surveyed, the story of the Prophet ﷺ in order is the most-requested "what next" after the basics. It is the natural first long-form series. |
| **The vices and the virtues** | Every classical manual has this chapter — *Being Muslim* calls it Spiritual Refinement: destructive vices, saving virtues, noble character. The app has two of roughly twelve: `repentance` and `patience-and-gratitude`. Riyāʾ, kibr, ḥasad, ghaḍab, and the corresponding virtues, are the year-two interior life and are absent. |
| **Why people differ** | A lesson on what a madhhab is, why four of them, and why this app teaches one way. The data model already holds 47 `differs` notes with attributed positions (`model.ts:125`) and surfaces them per claim. What is missing is the one page that makes the whole apparatus legible. Without it, a year-two convert meeting a contradiction concludes somebody is lying. |
| **The small sunnahs** | Right side first, siwāk, the duʿa on waking, on leaving the house, on eating. They exist, scattered across 132 occasions in Hisn al-Muslim. Nothing gathers them as a practice you take on. |
| **Teaching someone else** | Onboarding already offers "I'm helping someone learn" and does nothing with it. A convert at year three *is* that person — they are who the newer converts ask. The app's honest year-three role is to make them good at it. |

---

## 4. The model

Four changes. The first is small and does most of the work.

### 4.1 Cadence — one field, on every piece of content

Add to `ContentMeta` (extending, not replacing, `Requirement`):

```ts
type Cadence =
  | 'once'          // read it and it is yours — what-is-islam
  | 'until-fluent'  // needed until it is not — the prayer guides, Al-Fatihah
  | 'daily'         // forever — adhkar, the prayer itself
  | 'yearly'        // returns with the calendar — Ramadan, Hajj
  | 'on-event'      // invisible until it happens — janazah, travelling, lost count
  | 'keepsake';     // rarely, and never removed — the shahada
```

And then **let it decide placement, not just presentation** — which is the one
thing `Requirement` deliberately does not do:

- `once` — appears in Learn; leaves Today permanently once met.
- `until-fluent` — drives Today's primary action while it is needed, then
  collapses to a link. This is what turns "Pray now Fajr · 23 steps" into
  something else for a person who has prayed a thousand Fajrs.
- `daily` — permanent on Today, and **never counted as journey progress**,
  because you do not finish the morning adhkār.
- `yearly` — surfaced by `seasons.ts` and nowhere else.
- `on-event` — **off the shelf entirely.** Reachable from Ask and from Help,
  which is where people actually look for it. This alone would take six pages
  out of Learn without losing anything, because nobody browses to tayammum.
- `keepsake` — one line, never a hero. **The Shahada card becomes a line in the
  Learn header**, which answers Iyad's opening complaint from a principle rather
  than a patch.

Then make it a check that fails, per the strongest rule in `CLAUDE.md`: every
catalogue entry must declare a cadence, and `content:audit` exits non-zero if
one does not.

### 4.2 The Firsts — a spine that lasts years instead of weeks

Replace "6 of 36 lessons" with something that is true of a life rather than of
a syllabus.

**The Firsts** are moments that are real in a convert's life, each with content
behind it:

> your first prayer alone · your first full day of five · your first time at a
> mosque · your first Jumuʿah · your first fast · your first Ramadan · your
> first Eid · your first time praying somewhere public · your first time
> explaining Islam to someone who asked · your first surah from memory · your
> first janāzah · your first zakat

Why this is better than a lesson count, precisely:

1. **A count says you are behind. A first says something happened.** "6 of 36"
   is a report card handed to somebody three weeks into a religion. A first
   that has not happened yet is not a failure — it has not happened yet.
2. **It is not a streak and it does not notice absence,** which keeps the line
   in `index.tsx:43` intact. There is no way to lose a first.
3. **It reaches years, not weeks.** Most people's first janāzah is a long way
   off. The app has a reason to still be there.
4. **It is the honest signal for what tier someone is in.** First Jumuʿah done,
   first Ramadan done, prays without the guide — the app now knows, from things
   that actually happened, without asking a single extra question.
5. **It puts content at the moment of need.** "It is Friday tomorrow. Is this
   your first?" is a real offer. "You might like this lesson" never was.

Rules that keep it out of the pressure register: never show how many are left;
never date them; mark two automatically (first prayer finished, first surah
recited covered) and leave the rest to the person or to an honest calendar
offer.

### 4.3 Onboarding — ask two facts, not two identities

Both current questions ask who you are. Neither is checkable, both are asked at
the minute the person knows least, and neither is ever revisited.

Replace with two questions that are **facts, actionable, and re-askable**:

1. **"Have you said the shahada?"** — *not yet · exploring · yes, recently ·
   yes, a while ago.*
   Decides whether the shahada guide is the first thing on the screen, a
   lesson, or a keepsake. Answers the card question directly.
2. **"Can you pray on your own yet?"** — *no, teach me · I need the words in
   front of me · yes.*
   Decides the **shape of Today's primary action**, which is the most valuable
   personalisation available in this app and currently does not exist. Week
   one wants a 23-step walkthrough. Year three wants the time, the qibla, and
   the surah they are working on. Today gives both the same button.

And then the part that matters more than the questions: **stop treating
onboarding as the verdict.** It is a seed. After a month of finished prayer
guides the app should quietly move someone from "learning" to "praying" and
change what it offers — no badge, no level-up, no announcement. That is
`CLAUDE.md`'s own rule ("prefer what the app can infer over what the user must
configure") applied to the thing it was written for.

What the app could observe without asking and without leaving the device:
which prayers were finished and when; whether prayer times are opened daily;
which adhkār sittings get completed; which surahs are played and recited
covered; days since install; **and every search that returned nothing.** That
last is the highest-value untapped signal in the repository — `ask.tsx:29`
already documents that "I farted" finds nothing while `wudu.ts` answers it
outright. Every failed search is a content gap with a name on it.

### 4.4 Today

In order:

1. Header — greeting, Hijri date, Ask bar. Unchanged.
2. **Prayer times, with a primary action whose shape depends on competence.**
3. **The words for right now** — one slot, filled by the adhkār sitting if the
   clock is in one, otherwise by the duʿa card. Both are "what should I be
   saying"; they are one slot, not two cards.
4. **One "worth today" slot**, competed for by a single ranked function: a
   season, a First that just became available, the surah being learned, or a
   lesson — and never more than one.
5. Help chips, until Ask can answer.

### 4.5 Learn

- **Header**: title, and the shahada as one quiet line.
- **"Where you are"** replaces the journey card — not a fraction, but the
  chapter of life you are in and the two or three things left in it. When the
  shelf is finished it says so honestly and points at the things that do not
  finish.
- **The shelf**, complete and never gated — with `on-event` content removed
  from it, because it belongs in Ask.
- **A new group, "Things that come up"** — where every tier-two page in §3.3
  lands.
- `beginnerPriority` finally read by a screen: de-emphasised in week one,
  surfaced in year two.

---

## 5. What this removes

- The dead recommendation tables (236 lines), or their wiring — one or the
  other, not both.
- `ENTRY_BY_STAGE`, which is unreachable.
- The "0 of 36" framing and the lesson counter as the app's idea of progress.
- The permanent Shahada hero.
- The permanent journey card on Today.
- One of the two words-cards on Today.
- Roughly six situational pages from the Learn shelf, into Ask.
- The premise that Learn is where progress is made.

---

## 6. What to build first

Per the pilot rule, and because none of this has been seen on a screen:

1. **Cadence as a field, plus the check.** No UI. It makes every later change
   cheap and it is provably correct or not.
2. **Two screens, as unalike as possible, to be looked at:** Today with the
   adhkār sitting in the words-slot, and Learn with the shahada demoted to a
   line. Both are visible in ten seconds and both are reversible.
3. **Then stop and get eyes on it.**

Only after that: the Firsts, the onboarding rewrite, and the tier-two content.

## 7. Cost, plainly

Three costs, said once.

**Content.** Everything in §3.3 and §3.4 is new religious instruction. It has
to be written from sources, cited by number from a page actually opened, and
reviewed — the Priority 1 pile is cleared, not abolished. Roughly twenty new
pages is the size of it, which is more than has ever been written here in one
go and should be paced accordingly.

**Observation.** Anything the app infers is stored, and storage of behaviour is
a category the app has not entered. It stays on the device — none of this needs
a network call, an account, or a server, and it should never acquire one. But
it is worth Iyad deciding deliberately rather than by accident, because "the
app remembers what you did" is a different promise from "the app remembers what
you chose."

**Shipping.** All of it is `src/` and `assets/`, so all of it rides
`npm run update:preview`. No native change, no build, no migrations.
