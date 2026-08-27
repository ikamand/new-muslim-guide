# Quote, don't answer

**Status:** Agreed in principle 27 August 2026. **Nothing built. Deliberately
parked** — Iyad's words: *"I really think we should do it but not now."*
**Opened:** 27 August 2026, from a question about
[ai.salaam.world](https://ai.salaam.world/) and what it would take to train a
"Muslim AI model".

**The rule the whole design hangs on, in four words: the model may choose,
never compose.** It selects which already-reviewed passage answers the
question and writes one connecting sentence. Every religious sentence on
screen is a verbatim quotation from `src/content/`, carrying the citation it
already has. If nothing in the corpus answers, it says so and points at a
human.

The memorable version: **a librarian, not a mufti.** A librarian who has read
the shelf can hand you the right book in seconds and is doing their job
perfectly when they say "we don't have that, ask someone who knows."

Like `ui-redesign-plan.md`, every claim below carries the file, line or
endpoint it was read from, so a later reader can re-check rather than trust.
Numbers were measured on 27 August 2026 and are marked where they were.

---

## Why this document exists at all

The instinct that started it was "let's train a Muslim AI model." The research
below says that is the wrong lever, and says it with numbers rather than
caution. But the *want* underneath it is right and is worth keeping: someone
three weeks into Islam types a question in their own words at 1am, and the app
should answer it rather than hand them a list to hunt through.

The app is already most of the way there and does not know it. That is the
finding this plan is built on.

---

## The phases at a glance

| | Phase | State | Depends on | Ships via |
|---|---|---|---|---|
| **0** | [The offline alias layer](#phase-0--the-offline-alias-layer) | ⬜ Not started | nothing | OTA |
| **1** | [Grow `search:check` into a real eval](#phase-1--grow-searchcheck-into-a-real-eval) | ⬜ Not started | nothing | — (dev only) |
| **2** | [The selector — the model's first job](#phase-2--the-selector) | ⬜ Not started | 1 | needs a server |
| **3** | [The bridge sentence](#phase-3--the-bridge-sentence) | ⬜ Not started | 2 | server |
| **4** | [The refusal path](#phase-4--the-refusal-path) | ⬜ Not started | 2 | OTA + server |
| **5** | [The ask sheet rebuilt around an answer](#phase-5--the-ask-sheet-rebuilt) | ⬜ Not started | 2–4 | OTA |
| **6** | [The open-source eval](#phase-6--the-open-source-eval) | ⬜ Not started | 1 | separate repo |

**Phases 0 and 1 need no server, no API key, no network and no money, and both
are worth doing on their own merits even if the rest is never built.** That is
not a coincidence — it is how the plan was ordered. If this document is being
read a year later and the appetite has gone, do 0 and 1 anyway and throw the
rest away.

---

# Part 1 — What ai.salaam.world actually is

Checked 27 August 2026 by fetching the pages, not by reading their marketing.

## The stack

WordPress 7.1, Elementor theme `almanar`, behind Cloudflare. The chat is one
plugin: **AI Engine Pro** by Meow Apps (`wp-content/plugins/ai-engine-pro`),
which appears on `https://ai.salaam.world/brother-junaid/` but **not** on the
home page — that is how it was found.

## The configuration, verbatim from their HTML

The chatbot container on the Junaid page carries its own config in a
`data-params` attribute. The parts that matter:

```json
{ "mode": "assistant", "textInputMaxLength": 512, "aiName": "AI:",
  "startSentence": "Assalamu alaikum! My name is Junaid ... Note: For better
  results, please Clear the chat before asking a new question." }
```

and in `data-system`:

```json
{ "botId": "default", "stream": true,
  "pluginUrl": ".../plugins/ai-engine-pro", "restUrl": ".../wp-json" }
```

**`"mode": "assistant"` is the whole answer.** In AI Engine that means the
plugin is calling **OpenAI's Assistants API** against an assistant configured
in a dashboard — a system prompt, plus files uploaded into a vector store that
the API searches per question. Their own GDPR block, rendered before the first
message, says it out loud:

> "you agree to the recording and processing of your data by our website and
> the external services it might use (LLMs, vector databases, etc.)"

Their stated corpus — Qur'an, Sahih al-Bukhari, Sahih Muslim, Musnad Ahmad,
Tirmidhi — is a pile of files somebody uploaded. The five "AI assistants"
(Brother Junaid, Sister Khadijah, Sister Bilkees, Sister Zahra, Brother Musa)
are five system prompts. Built by Bizafy Limited, 2024. Funded by a Donorbox
button and AdSense (`ca-pub-6091186252659036` is in the page).

## What this means

**Nothing was trained.** No dataset, no fine-tune, no GPUs, no eval. It is a
paid WordPress plugin, an OpenAI key, some PDFs and a persona paragraph each.
A competent person builds it in a weekend.

Two tells worth remembering, because they are the failure modes we would
inherit by copying it:

- **"Please Clear the chat before asking a new question"** is a context-window
  workaround surfaced to the user as an instruction. The product is asking the
  reader to manage its memory.
- **A 512-character input cap** on a system whose whole promise is "ask me
  anything about Islam."

## The endpoint

`POST /wp-json/mwai-ui/v1/chats/submit` with `botId`, `contextId`, `messages`,
`newMessage`. Returns `401 rest_forbidden` without a nonce, so the bot's actual
answers were **not** observed — every claim above is from configuration and
markup. **Nothing in this document asserts how well it answers**, because that
was not measured. If someone wants that, drive it in a real browser.

---

# Part 2 — Why we are not training a model

## The scale of actually doing it

For context, the real Arabic/Islamic models:

- **Fanar** (QCRI, Qatar): Fanar Star is 7B parameters trained from scratch on
  ~1 trillion Arabic/English/code tokens; Fanar Prime is 9B continually
  pretrained on Gemma-2 9B over the same set.
- **ALLaM**: pretrained on 4T English tokens, then 1.2T mixed Arabic/English —
  5.2T total.
- **Jais**: 13B–70B open weights over 1.6T tokens.

That is a national-lab budget, a data team, and months. It is not a thing a
solo developer does, and nothing about it is a scale-down problem.

## The cheaper version doesn't buy what we want

Fine-tuning a small open model on Islamic text is affordable. It is also the
wrong tool, and this is the load-bearing sentence of the whole plan:

> **Fine-tuning teaches style, not facts.** A model fine-tuned on hadith
> invents hadith numbers *more fluently and in our house voice*. That is worse
> than the base model, because a fabrication in the app's own register survives
> review by looking right.

CLAUDE.md already records that exact failure happening here with human hands —
three hadith numbers typed from memory, all plausible, none verifiable. A
fine-tune is a machine for producing those at volume.

## And the empirical case is now closed

**IslamicMMLU** (arXiv 2603.23750v2, read 27 Aug 2026): 10,013 expert-verified
Modern Standard Arabic multiple-choice questions across Qur'an (2,013), Hadith
(4,000) and Fiqh (4,000), sourced from native Arabic texts, with the Fiqh track
extracted from al-Jaziri's encyclopedia and 213 stratified samples reviewed by
a domain expert (97.2% approved). 26 models evaluated.

Two findings decide this for us:

1. **"Arabic-specific models underperformed frontier models despite
   specialized training."** Gemini 3 Flash 93.8%, Gemini 3 Pro 92.3%, GPT-5
   89.9%. The purpose-built models lost. Domain training is not where the wins
   are.
2. **93.8% is on multiple choice** — where the right answer is printed on the
   page. That is still one in sixteen wrong, in the *easiest possible* format.
   Free-form generation of a ruling is very much harder than that.

The paper also measures implicit madhhab bias across the four Sunni schools,
which is worth knowing exists: a general model asked a fiqh question silently
picks a school. This app teaches one clear way on purpose (CLAUDE.md), so an
unconstrained model would quietly contradict the app's own choice. Another
reason the model must not compose.

**Conclusion: the thing that stops fabrication is not training. It is a closed
corpus, mandatory citation, and permission to say "I don't know."** All three
are architecture, not weights.

---

# Part 3 — The design

## What the app already has, measured

Run on 27 August 2026 against `main`:

- **643 things indexed** by `buildIndex` in [search.ts](../src/lib/search.ts) —
  303 steps, 132 Hisn duʿas, 130 sections, 30 references, 14 guides, 14
  phrases, 9 duʿas, 6 articles, 5 pillars. (The docstring at the top of that
  file says 78 catalogue entries + 286 steps + 101 sections; that predates the
  duʿa work and undercounts. The 643 is measured, the docstring is stale.)
- **`npm run search:check` passes 15/15 and 15/15** on its two sets.
- But measured directly: on the 14 curated questions with a named expected
  answer, **precision@1 is 12/14 while recall@5 is 14/14.**

That last line is the entire opportunity. **The right answer is nearly always
already in the top five and is sometimes not first.** `"i farted"` returns the
travelling section first, with the wudu step below it. The retrieval is good;
the *ranking and presentation* is what fails.

`scripts/search-check.mjs` says so itself, in a comment written before any of
this was discussed:

> "Precision, not coverage, is the next piece of work."

And [ask.tsx](../src/app/ask.tsx) already names the offline half of the fix in
its own docstring:

> "it closes with an alias layer: the phrasings a person actually uses,
> generated at build time, committed as data, matched offline."

**This plan is not a new direction. It is the two next steps the codebase had
already written down, plus a model doing only the part neither can do.**

## The architecture

```
  question typed in the ask sheet
            │
            ├─► [always, offline] buildIndex + search  ──► top 8 passages
            │                                                    │
            │                                    ┌───────────────┴─────────────┐
            │                                    │ no signal / no key / error  │
            │                                    ▼                             │
            │                            today's result list                   │
            │                            (never worse than now)                │
            │                                                                  │
            └─► [when online] POST {question, 8 passages} ──► selector ─────────┘
                                                                │
                             ┌──────────────────────────────────┤
                             ▼                                  ▼
                   picks 1–3 passage IDs               picks none
                   + writes ONE bridge sentence        │
                             │                         ▼
                             ▼                    the refusal card
                   the answer card: bridge,       "This app doesn't cover
                   then the passages VERBATIM     that yet" + how to ask
                   with their existing citations  a person
```

## The five rules the endpoint enforces in code

These are not prompt requests. They are validated server-side, and a response
failing any of them is discarded and the offline list is returned instead.

1. **The model returns IDs, not prose passages.** Its output schema is
   `{ picks: string[], bridge: string, confident: boolean }`. It cannot emit a
   religious sentence because there is no field for one.
2. **Every ID must be one of the 8 sent.** Anything else = discard. This is the
   single check that makes fabrication structurally impossible rather than
   discouraged.
3. **The bridge is one sentence, hard-capped, and contains no Arabic, no
   digits, and no citation-shaped text.** Reject on regex. A bridge saying
   "Bukhari 135 says…" is a fabrication risk even when the number is right,
   because the model did not read it.
4. **Passages render verbatim from `src/content/`**, looked up by ID on the
   device. The server never sends text back — only IDs and the bridge. A
   compromised or drifting endpoint therefore cannot change a single word of
   religious content.
5. **`confident: false` renders the refusal card**, not a hedged answer.

Rule 4 is the one to defend hardest if this ever gets rushed. It is what makes
the answer *reviewable*: every substantive sentence is one a reviewer already
cleared under `docs/scholarly-review.md`, sitting under the same citation it
has on its own page.

## Why a bridge sentence at all

Tempting to drop it and just render the passages. It earns its place because
the passages were written to sit under a heading on a page, and pulled out of
that context they can read as a non-sequitur. One sentence of "Here is what
breaks your wudu — this is from the wudu steps" is the difference between an
answer and a clipping. It is also the *only* generated text, it is short, and
it is checkable by eye.

## Why not a chatbot

A chatbot's contract is "I will answer anything." That is a promise this app
must not make, and once made it cannot be walked back per-question. There is
no follow-up turn, no conversation memory, no persona and no name. One
question, one answer, and the answer is made of things a scholar signed off.

Losing multi-turn is a real cost, honestly: "what about if I'm travelling?" as
a follow-up is a natural thing to type and will not work. Accepted, because
multi-turn is also how a model gets talked into composing.

---

# Part 4 — The phases in detail

## Phase 0 — The offline alias layer

**No model, no network, no server. Do this first regardless of everything
else.**

The gap `ask.tsx` names: the index matches the app's own vocabulary. "I farted"
lands only by luck; "nullifiers" is the word the content uses and nobody types.

- Generate, at build time, the phrasings a real person uses for each indexed
  thing. Commit as data under `src/content/` or `src/lib/`, matched offline.
- **Search keys are not religious content** — the docstring in `ask.tsx`
  already makes this call, and it is right. An alias needs a proofread, not a
  scholar. This is the one place a model may generate freely, because its
  output is never shown to anyone.
- Every alias goes into `scripts/search-check.mjs` as an expectation. If an
  alias is worth generating it is worth asserting.

**Done when:** precision@1 on the curated set is 14/14, and the
`MUST_RETURN_SOMETHING` list has expected answers rather than only
"returns something."

## Phase 1 — Grow `search:check` into a real eval

`scripts/search-check.mjs` is already the right shape — real questions, an
expected answer, exits non-zero. It has **15 expectations and 15
returns-something** entries. To be an eval it needs:

- **~150 questions, not 30.** Sourced from what converts actually ask, not from
  the app's table of contents. Iyad has the better instinct for these than any
  generated list.
- **Scored on four things, separately reported**, because they fail
  differently:
  1. *Found* — is the right passage in the top 8 (what the index must do).
  2. *Chosen* — is it ranked first (what the selector must do).
  3. *Cited* — does every rendered claim carry a citation that resolves.
  4. **Refused** — for questions the corpus genuinely does not answer, did it
     say so? **This is the score nobody else measures and it is the one that
     matters most.** A system that answers everything scores 0 here.
- **A held-out set of ~30 questions never looked at while tuning.** Otherwise
  the eval measures how well we tuned to the eval. The current 15 are already
  contaminated in exactly this way — they were written from failures — which
  is fine for a regression guard and useless as a measurement.
- One caution recorded from today: the harness matches a **key prefix**, which
  is deliberately loose and can pass on the wrong sibling. Loose is right for a
  regression guard; the eval needs exact IDs for the *Chosen* score.

**Done when:** `npm run ask:eval` prints four numbers and a held-out set, and
`npm run search:check` still exits non-zero on regressions.

## Phase 2 — The selector

The first phase needing a server, an API key, and money. See
[Part 5](#part-5--what-this-commits-us-to) before starting.

- Endpoint takes `{ question, passages: [{id, title, context, snippet}] }` and
  returns `{ picks, bridge, confident }`. Structured output, not free text.
- **Snippets only, never full passages, and never Arabic.** The model does not
  need the text to rank it, and not sending it removes a class of accident.
- Model choice is deliberately open — this is a ranking task and a small fast
  model is likely enough. Check current pricing before budgeting; do not
  believe any figure written in this document, because none is.
- Validate all five rules. Log nothing but aggregate counts.

**Done when:** *Chosen* beats the offline ranking on the held-out set by enough
to be worth a server. **If it does not, stop here and keep Phase 0.** That is a
real possible outcome and would be a good one.

## Phase 3 — The bridge sentence

Separate from Phase 2 so the selector can ship and be measured without any
generated text in the app at all. Regex-validated per rule 3. Every bridge on
the eval set gets read by a human once before this ships.

## Phase 4 — The refusal path

Design the refusal card properly rather than treating it as an error state. It
is a first-class answer and will be shown often.

- Says what the app does not cover, in plain words.
- Offers the nearest thing the app *does* have.
- **Points at a human.** Which human is an open question for Iyad — see
  [Part 7](#part-7--open-questions-only-iyad-can-answer).

A refusal that reads as a shrug is worse than a bad answer, because it confirms
the fear the reader already has: that there is nowhere to ask. Get the words
right.

## Phase 5 — The ask sheet rebuilt

Answer card first, sources under it, the result list below that as "other
things about this." Offline, or when the endpoint fails, it is today's sheet
exactly — the list is the floor, and the floor never gets worse.

The chip row on Today retires into this sheet as starter suggestions. `ask.tsx`
already says it should, and says why it hasn't: *"not while the sheet cannot
answer anything."* This is the day it can.

## Phase 6 — The open-source eval

**Not a model. Not a wrapper.** The world has plenty of both, and one more
"Islamic GPT" wrapper helps nobody.

The missing artifact is the **evaluation harness**: convert-level questions in
English, with a known-correct answer drawn from reviewed content, scored on
*cited*, *citation resolves*, and *refused when the corpus is silent*.
IslamicMMLU covers Arabic multiple-choice and even measures madhhab bias; it
does not cover free-form English answers to a beginner, and multiple choice
structurally cannot measure refusal.

What we already have that makes this cheap: four sources plumbed
(`hadith:corpus`, HadeethEnc, QuranEnc, IslamHouse), `npm run content:verify`,
`npm run evidence`, and the `search-check` shape. Publishing needs the harness
and the question set — **not our content**, which keeps the licence questions
in CLAUDE.md out of it entirely.

It also satisfies the strongest rule in CLAUDE.md — *prefer a check that fails
over a rule to remember* — for the whole field rather than just this app.

---

# Part 5 — What this commits us to

Named once, here, so it never has to be raised again. If it is read and still
wanted, it is decided; build it in full.

1. **Our first server.** "No server, no migrations" in CLAUDE.md stops being
   true. An API key cannot ship in the client. This is an ongoing thing to own,
   with uptime, a bill, and a deploy path that `npm run update:preview` does
   not cover. **This is the biggest single cost in the plan and it is not
   technical — it is that there is now something that can be down.**
2. **Every question leaves the device** — and the questions people bring to
   *this* app are exactly the ones they cannot ask a human. Someone not out to
   their family typing "how do I pray without my parents noticing" puts that
   in a provider's logs. Mitigation: no accounts, no retention, aggregate
   counts only, and say so in the sheet where they can see it before typing.
3. **It cannot work offline.** It sits on top of the offline answer and never
   replaces it. The worship path's dead-signal promise is untouched, and Phase
   0 must ship first so the offline floor rises before anything is built on it.
4. **App Store surface changes.** The privacy label can no longer say what it
   says today, and an AI answering religious questions invites age-rating and
   moderation questions the app does not currently have. Worth checking the
   current guidelines before Phase 2, not after.
5. **Unbounded cost** if it is free and public. Rate limit from day one, on the
   server, not in the client.
6. **A generated bridge is content that ships unreviewed** — the one thing
   CLAUDE.md says never happens. The extractive design is precisely what keeps
   this to a single non-religious sentence per answer. **If that rule ever
   erodes, this whole plan becomes the thing it was designed to avoid.**

---

# Part 6 — What this removes

Per CLAUDE.md: a change that only adds isn't finished being thought about.

- **The ten-result list, for questions the app covers well.** It moves below an
  answer and stops being the first thing a frightened person has to parse.
- **The chip row on Today** retires into the sheet.
- **Personas — deleted before they existed.** No Brother Junaid, no name, no
  avatar, no "I". A named character implies a person who knows things, which is
  the impression we least want, and Salaam World's own start sentence shows
  where it leads: the character apologises for the architecture.
- **Multi-turn chat**, which is never built rather than removed. Named here so
  a future reader knows it was considered and dropped, not forgotten.
- **The idea of training anything.** Dropped on evidence, not on caution.

---

# Part 7 — Open questions only Iyad can answer

Facts nobody else has. Worth answering before Phase 2, not during.

1. **Who is the human the refusal points at?** A named scholar, a local mosque
   finder, a form that reaches you, or "ask a knowledgeable Muslim you trust"?
   This is the single most important content decision in the plan and it is not
   a technical one. Everything else degrades gracefully; this one is either
   real help or a shrug.
2. **Does an answer get to be wrong in public?** With a corpus this small the
   honest failure rate is high. Is a 60%-answered / 40%-refused sheet a
   product you want to ship, or does it need to feel more complete first?
3. **Is a server acceptable at all**, given the app has never had one, and
   given point 2 in Part 5?
4. **Does the open-source eval go out under your name or the app's?** It will
   attract the "who are you to judge" reaction, which is worth deciding on
   before it is published rather than after.

---

# Part 8 — How to re-check every claim in here

Nothing above should be trusted because it is written down. Each of these
re-derives a claim in one command.

| Claim | How to re-check |
|---|---|
| Salaam World's stack and mode | `curl -sL https://ai.salaam.world/brother-junaid/ \| grep -o 'ai-engine-pro'` and search the HTML for `data-params` |
| 643 things indexed | `npm run search:check` — the last line prints it |
| precision@1 12/14, recall@5 14/14 | not automated yet; **this is Phase 1's job.** Measured 27 Aug 2026 with a throwaway script over the 14 curated expectations |
| The `ask.tsx` alias-layer plan | docstring at the top of [ask.tsx](../src/app/ask.tsx) |
| "Precision, not coverage, is the next piece of work" | comment above `MUST_RETURN_SOMETHING` in `scripts/search-check.mjs` |
| IslamicMMLU numbers | arXiv 2603.23750v2 |
| Fanar / ALLaM / Jais token counts | QCRI Fanar model card; the CACM Arabic LLM landscape survey |

**Known stale as of 27 Aug 2026:** the docstring at the top of
[search.ts](../src/lib/search.ts) says 78 + 286 + 101; the real count is 643.
Left uncorrected here rather than quietly fixed, because a wrong number that
got quoted deserves to be met head-on rather than edited out.

---

# Backlog — considered, not decided

- **Answering in French and Spanish.** The corpus is partly translated and
  `TranslationGap` already marks where. A selector over a partly-translated
  index would silently answer in English. Needs thought; not in scope.
- **Running the selector on-device.** Would remove the server, the privacy
  cost and the bill in one move, and is the version of this plan worth wanting.
  A ranking task over 8 short candidates is small enough that it may become
  plausible. Re-check when picking this up: what can run on a mid-range phone
  without a native module that an OTA cannot carry.
- **Answering from the 564 juz 30 ayahs and 116 evidence texts**, which
  `search.ts` deliberately leaves unindexed. Its reasoning stands: 564 ayahs
  matching "Lord" drown everything, and a raw narration handed to somebody
  three weeks in, stripped of the ruling it belongs under, is the worst version
  of this app. If they are ever indexed, they must be grouped first.
- **Logging unanswered questions** to find content gaps. Obviously useful,
  obviously the exact data point 2 of Part 5 says not to keep. If ever done:
  question text only, no device identifier, no session, opt-in, and said out
  loud on screen.
