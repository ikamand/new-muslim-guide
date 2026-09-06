# Question-gap report — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When the ask sheet's offline search finds nothing, let the reader
send us what they were looking for, anonymously, with nothing kept on the
phone — and turn the stream into pages, aliases and directory referrals
through the existing review pipeline.

**Architecture:** A five-state component inside the ask sheet's existing empty
card posts one JSON body to `POST /v1/submissions` on a Cloudflare Worker that
lives in its own private repository. The worker stores four fields in KV with a
14-day expiry and answers with a status code only. A deterministic, offline,
whole-word phrase list shows crisis resources above Send and never blocks it.
Weekly, a script pulls the batch, you read it, and the script deletes it.

**Tech Stack:** Expo SDK 57 / React Native (app, OTA). Cloudflare Workers +
KV + the rate-limit binding (server, separate repo `new-muslim-guide-submissions`,
private). Node's built-in test runner for the worker smoke test; the app's own
`scripts/*-check.mjs` pattern for client checks.

**Spec:** the decision record in `docs/ui-redesign-plan.md`, section
"5 Sep 2026 — Community Q&A: considered, not building". The product-level plan
and its "Final decisions / edge cases" were agreed in conversation on 5 Sep
2026 and are transcribed there.

## Global Constraints

- **Nothing user-typed is ever written to the phone.** No AsyncStorage, no
  file, no draft. The local miss log (`src/lib/observations.ts:107`) is removed
  in Phase 0 for the same reason.
- **The server never sends text back.** Every response is a status code with
  an empty body.
- **The API contract is `/v1/…` and is never changed, only added beside.**
  Orphaned builds exist that can never be updated.
- **No accounts, no install token, no device identifier, no fingerprinting,
  no cookie, no timestamp finer than the UTC day.**
- **Neither `package.json`, `app.json` nor `.gitignore` in this repo is
  touched by the server work.** All three are fingerprint inputs (memory:
  fingerprint orphans builds). The worker is a separate repo for exactly this
  reason. The endpoint URL is a constant in `src/`, so it rides an OTA.
- **Crisis matching is deterministic, offline safety logic — a human-read
  phrase list matched on whole words.** It is not a model and must never be
  described as one. It shows resources; it never blocks a send.
- **The disclosure wording is fixed** (Phase 3, Task 4) and changes only in the
  same commit as a change to the fields sent.
- **Content that ships unreviewed is marked ⚠️ in its source file.** The
  crisis resources and the directory are content, and gate the feature.
- **Ordering outside this plan:** the reciter is still the only release gate
  and nothing here moves it. Phase 0 here ships alone. Phases 0–1 of
  `docs/quote-dont-answer.md` (aliases, the eval) are recommended before
  Phase 3 here, because they reduce how many readers reach the empty card at
  all, but they are not a dependency.
- **Two numbers changed from the agreed product plan after reading the
  Cloudflare docs (5 Sep 2026):**
  1. *Rate limit.* The rate-limit binding's window "must be either 10 or 60"
     seconds, and its counters are per-location and eventually consistent. A
     per-IP daily limit would need an IP-derived key in KV. Decided: **no
     per-IP daily limit.** Burst limit of 2 per 60 seconds per IP through the
     binding (nothing stored by us), plus the global cap of 500 per UTC day.
     One abuser can burn the day's cap for everyone; accepted at this scale,
     and the batch's spam pass handles the junk.
  2. *Logs.* Workers Logs is enabled by default with a fixed retention (3 days
     free, 7 paid, not configurable). Decided: `observability.enabled = false`
     in the worker config, so our logs hold nothing. Cloudflare's own edge
     request handling is outside our control and is recorded as such in the
     disclosure's design, not promised away.

---

## Phase 0 — Remove the local missed-search log

Ships alone, first, by OTA. It is the on-device history of a reader's own
words that the design forbids, and it currently feeds nothing.

### Task 0.1: Delete the miss log

**Files:**
- Modify: `src/lib/observations.ts:62` (`MAX_MISSES`), `:95-107` (the
  `misses` field and its comment), `:157` (`misses: []` in `EMPTY`),
  `:271-281` (the parser branch), `:357-370` (`recordMiss`)
- Modify: `src/hooks/use-observations.tsx:42` (`searchMissed` in the type),
  `:123-126` (the callback), `:146-147` (the `api` object and its deps)
- Modify: `src/app/ask.tsx:17-27` (`MISS_AFTER_MS`, `MIN_MISS_LENGTH`),
  `:154-170` (the comment and the `useEffect`), the `useObservations`
  import and destructure, and the docstring paragraphs that promise Phase 8
  seeding from misses (`:46-56`)
- Modify: `docs/build-order.md:582` — the bullet "Seed it from Phase 5's
  failed-search log" becomes "Seed it from the submission stream
  (`docs/superpowers/plans/2026-09-05-question-gap-report.md`); the local
  log was removed 5 Sep 2026 because a reader's own words must not persist
  on the phone."

**Interfaces:**
- Produces: `Observations` no longer has `misses`; `useObservations()` no
  longer returns `searchMissed`. Nothing else in `src/` reads either (checked
  5 Sep 2026: `grep -rn "misses\|searchMissed" src` hits only these three
  files).

- [ ] **Step 1: Remove the field, the constant, the recorder and the parser
  branch** from `observations.ts`. Stored `misses` from older installs are
  dropped on the next write because the parser no longer copies them; no
  migration code.
- [ ] **Step 2: Remove `searchMissed`** from the hook's type, callback, `api`
  object and dependency array.
- [ ] **Step 3: Remove the effect, both constants and the import** from
  `ask.tsx`, and rewrite the docstring: the corrected paragraph about "I
  farted" stays (it is about ranking), the sentences about the miss log and
  Phase 8 seeding go.
- [ ] **Step 4: Update `build-order.md:582`** as above.
- [ ] **Step 5: Verify.** `npx tsc --noEmit`; `npx expo export --platform
  web`; `npm run search:check`; `grep -rn "misses\|searchMissed\|recordMiss"
  src docs/build-order.md` returns nothing.
- [ ] **Step 6: Verify on the Android preview build.** Type a query that
  returns nothing, wait two seconds, background the app, then
  `adb shell run-as com.newmuslimguide.app cat databases/RKStorage` (or the
  AsyncStorage file the build uses) and confirm no `misses` key in the
  observations value. Screenshot the empty card.
- [ ] **Step 7: Fingerprint, commit, OTA.**
  `npx eas fingerprint:compare --build-id <id from eas build:list --platform android --limit 1 --json>`
  must report no difference. Commit `Remove the local missed-search log`,
  push, `npm run update:preview`.

---

## Phase 1 — Content that gates the feature (no code beyond data files)

### Task 1.1: Crisis resources and the phrase list

**Files:**
- Create: `src/content/crisis.ts`

**Interfaces:**
- Produces:
  ```ts
  /** ⚠️ Safety content. Every phrase and resource here is read by a person before it ships. */
  export const CRISIS_PHRASES: readonly string[];      // lowercase, English, whole phrases
  export type CrisisResource = { name: string; how: string; url?: string; phone?: string };
  export const CRISIS_RESOURCES: readonly CrisisResource[];
  ```

- [ ] **Step 1: Write the phrase list.** Short. False positives are cheap
  (they show a card the reader can ignore), so lean generous. Each phrase on
  its own line with no generated additions; a comment block at the top
  carries four positive and four negative example sentences the check script
  will assert (Task 3.2).
- [ ] **Step 2: Write the resources.** Named organisations for a person in
  danger or thinking of harming themselves, by region, each checked as real
  and current by opening its site on the day it is written. ⚠️ header until
  a person has read it. **Which organisations is Iyad's call** — it is the
  same open question as the refusal card's "which human", and this plan does
  not answer it.
- [ ] **Step 3: `npm run style:check`** — reader text obeys the register.
- [ ] **Step 4: Commit** `Add crisis resources and phrase list ⚠️ unreviewed`.

### Task 1.2: The human-support directory as a help topic

**Files:**
- Create: `src/content/learn/where-to-ask-a-person.ts` (or the reference
  shape the ten existing topics use — read `src/content/help.ts:73` and one
  entry it points at, then match it)
- Modify: `src/content/help.ts:73` — add the topic to `HELP_TOPICS`

- [ ] **Step 1: Write the page.** Convert-support organisations by country,
  how to find a mosque that welcomes new Muslims, and what to say when you
  walk in. Every organisation opened and checked on the day. ⚠️ header.
- [ ] **Step 2: Wire it** as a help topic; run `npm run nav:check`,
  `npm run style:check`, `npm run i18n:manifest`.
- [ ] **Step 3: Verify with eyes** on web at 390 wide, both themes, and
  commit `Add the human-support directory ⚠️ unreviewed`.

---

## Phase 2 — The worker, in its own repository

Repo: `new-muslim-guide-submissions`, private. Nothing in this repo changes.

### Task 2.1: The contract, written down in both repos

**Files:**
- Create (server repo): `CONTRACT.md`
- Create (this repo): `docs/submissions-contract.md` — byte-identical

- [ ] **Step 1: Write the contract:**
  ```
  POST https://<worker-host>/v1/submissions
  Content-Type: application/json
  Body: { "text": string (1..1000 chars after trim), "locale": string (2..8), "appVersion": string (1..16) }

  204  accepted. Empty body.
  400  malformed JSON, missing field, empty text, or wrong type. Empty body.
  413  text over 1000 characters. Empty body.
  429  rate-limited (burst 2/60s per IP, or the global 500/day cap). Empty body.
  Any other status: the client treats as "not sent".

  Stored: { text, locale, appVersion, day: "YYYY-MM-DD" (UTC) } under key sub/<day>/<uuid>, expirationTtl 1209600 (14 days).
  Never stored: IP, headers, time of day, any identifier.
  /v1 is frozen. A change is /v2 beside it; /v1 is never removed while any build that calls it may be installed.
  ```
- [ ] **Step 2: Commit in both repos.** This repo:
  `Record the submissions API contract`.

### Task 2.2: The worker

**Files (server repo):**
- Create: `wrangler.jsonc`, `src/worker.ts`, `package.json` (wrangler ≥ 4.36
  as devDependency, `"type": "module"`, scripts `dev`, `deploy`, `test`,
  `pull`, `purge`, `retention`)

**Interfaces:**
- Consumes: the contract above.
- Produces: the deployed URL, pasted into `src/lib/submit-gap.ts` (Task 3.1).

- [ ] **Step 1: Config.**
  ```jsonc
  {
    "name": "new-muslim-guide-submissions",
    "main": "src/worker.ts",
    "compatibility_date": "2026-09-01",
    "observability": { "enabled": false },
    "kv_namespaces": [{ "binding": "SUBMISSIONS", "id": "<namespace id>" }],
    "ratelimits": [{ "name": "BURST", "namespace_id": "1001", "simple": { "limit": 2, "period": 60 } }]
  }
  ```
  Verify the `ratelimits` key shape against
  https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
  on the day — the wrangler configuration page did not carry it when read
  (5 Sep 2026); the binding page did.
- [ ] **Step 2: The handler.** One route; everything else 404 with empty body.
  ```ts
  const LIMITS = { text: 1000, locale: 8, appVersion: 16, dailyCap: 500, ttl: 14 * 24 * 3600 };
  const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'content-type' };
  const reply = (status: number) => new Response(null, { status, headers: CORS });

  export default {
    async fetch(req: Request, env: Env): Promise<Response> {
      const url = new URL(req.url);
      if (url.pathname !== '/v1/submissions') return reply(404);
      if (req.method === 'OPTIONS') return reply(204);
      if (req.method !== 'POST') return reply(405);

      const ip = req.headers.get('cf-connecting-ip') ?? 'unknown';
      const { success } = await env.BURST.limit({ key: ip });
      if (!success) return reply(429);

      let body: unknown;
      try { body = await req.json(); } catch { return reply(400); }
      if (!isRecord(body)) return reply(400);
      const text = typeof body.text === 'string' ? body.text.trim() : '';
      const locale = typeof body.locale === 'string' ? body.locale.trim() : '';
      const appVersion = typeof body.appVersion === 'string' ? body.appVersion.trim() : '';
      if (!text || !locale || !appVersion) return reply(400);
      if (text.length > LIMITS.text) return reply(413);
      if (locale.length > LIMITS.locale || appVersion.length > LIMITS.appVersion) return reply(400);

      const day = new Date().toISOString().slice(0, 10);
      const countKey = `count/${day}`;
      const count = Number((await env.SUBMISSIONS.get(countKey)) ?? '0');
      if (count >= LIMITS.dailyCap) return reply(429);
      await env.SUBMISSIONS.put(countKey, String(count + 1), { expirationTtl: 2 * 24 * 3600 });

      await env.SUBMISSIONS.put(
        `sub/${day}/${crypto.randomUUID()}`,
        JSON.stringify({ text, locale, appVersion, day }),
        { expirationTtl: LIMITS.ttl },
      );
      return reply(204);
    },
  };
  ```
  The daily counter is a KV read-then-write and KV is eventually consistent,
  so the cap is approximate. It is a circuit breaker, not accounting.
  `cf-connecting-ip` is read for the binding's key and never stored.
- [ ] **Step 3: Smoke test** (`test/smoke.test.mjs`, `node --test`, against
  `wrangler dev` on `http://127.0.0.1:8787`):
  - good body → 204 and empty body
  - `{}` → 400; `{ text: "" , ...}` → 400; not JSON → 400
  - 1,001-character text → 413
  - third send inside a minute → 429
  - `GET /v1/submissions` → 405; `POST /v1/other` → 404
  - after the good send, `wrangler kv key list --prefix sub/` shows one key
    and its value parses to exactly the keys `text, locale, appVersion, day`,
    with `day` matching `/^\d{4}-\d{2}-\d{2}$/`
- [ ] **Step 4: Deploy**, then run the same smoke test against the deployed
  URL. In the dashboard confirm the Worker shows observability disabled.
- [ ] **Step 5: Commit** (server repo) `Add the /v1/submissions worker`.

### Task 2.3: Pull, purge, retention check

**Files (server repo):** `scripts/pull.mjs`, `scripts/purge.mjs`,
`scripts/retention.mjs`, `scripts/kv.mjs` (shared: shells out to
`wrangler kv key list/get/delete --remote`, parses JSON)

- [ ] **Step 1: `pull`** lists every `sub/` key, fetches each value, writes
  `.cache/submissions-<today>.json` (an array; the server repo's
  `.gitignore` carries `.cache/` — that file is not a fingerprint input in
  the server repo, and the app repo's `.gitignore` is untouched). Prints the
  count, and prints crisis-matched items first. It takes `--phrases <path>`
  pointing at the app repo's `src/content/crisis.ts` so there is one list,
  never a copy in the server repo that can drift.
- [ ] **Step 2: `purge`** reads the last pulled file's keys and deletes
  exactly those, then deletes the local file. Run after the reading session,
  never before. Refuses to run if no pulled file exists.
- [ ] **Step 3: `retention`** lists `sub/` keys and fails (exit 1) if any
  key's `<day>` segment is older than 14 days. This proves the TTL holds
  rather than assuming it. Run weekly before `pull`.
- [ ] **Step 4: Test by hand:** send three, `pull` (three items, one
  crisis-matched first if a phrase was used), `purge`, `list` shows none,
  `retention` passes. Commit `Add pull, purge and retention scripts`.

---

## Phase 3 — The client

Every task: `npx tsc --noEmit`, `npx expo export --platform web`, the task's
check, commit. Ships together by OTA at the end of Phase 4.

### Task 3.1: `submitGap`

**Files:**
- Create: `src/lib/submit-gap.ts`
- Create: `scripts/submit-check.mjs`; add `"submit:check"` to `package.json`
  scripts (safe: `fingerprint.config.js` skips `PackageJsonScriptsAll`;
  still confirm with `fingerprint:compare` before the OTA)

**Interfaces:**
- Produces:
  ```ts
  export const SUBMISSIONS_URL = 'https://<worker-host>/v1/submissions';
  export type GapSubmission = { text: string; locale: string; appVersion: string };
  export type GapResult = 'sent' | 'failed';
  export async function submitGap(
    body: GapSubmission,
    deps: { fetch: typeof fetch; timeoutMs?: number } = { fetch: globalThis.fetch },
  ): Promise<GapResult>;
  ```

- [ ] **Step 1: Write the check first** (`scripts/submit-check.mjs`, same
  shape as `scripts/search-check.mjs`): a fake `fetch` that (a) resolves
  `{ status: 204 }` → expect `'sent'`; (b) resolves `{ status: 429 }` →
  `'failed'`; (c) rejects with `TypeError('Network request failed')` →
  `'failed'`, no throw; (d) never resolves, `timeoutMs: 50` → `'failed'`
  within 200 ms and the fake's `signal.aborted` is true; (e) asserts the
  request body sent in (a) parses to exactly `{ text, locale, appVersion }`
  and nothing else. Run it: fails because the module does not exist.
- [ ] **Step 2: Implement.** `AbortController`, `setTimeout(abort,
  timeoutMs ?? 8000)`, `method: 'POST'`, JSON body, `status === 204` →
  `'sent'`, everything else including thrown errors → `'failed'`. Clear the
  timer in `finally`. No storage, no logging.
- [ ] **Step 3: Run the check** — passes. Commit `Add submitGap`.

### Task 3.2: The crisis matcher

**Files:**
- Create: `src/lib/crisis.ts`
- Create: `scripts/crisis-check.mjs`; add `"crisis:check"` to scripts

**Interfaces:**
- Consumes: `CRISIS_PHRASES` from `src/content/crisis.ts` (Task 1.1)
- Produces: `export function matchesCrisis(text: string): boolean`

- [ ] **Step 1: Write the check first.** Reads the example sentences from
  the comment block at the top of `crisis.ts` (positives and negatives),
  asserts each; additionally asserts `matchesCrisis('my diet')` is false
  and that a phrase followed by punctuation matches. Run: fails.
- [ ] **Step 2: Implement.** Lowercase, collapse whitespace, then for each
  phrase test `new RegExp(`(^|\\W)${escape(phrase)}(\\W|$)`)`. No stemming,
  no fuzziness, no model. Docstring says in one sentence what it is and what
  it is not.
- [ ] **Step 3: Run the check** — passes. Commit `Add the crisis matcher`.

### Task 3.3: `GapReport`

**Files:**
- Create: `src/components/gap-report.tsx`

**Interfaces:**
- Consumes: `submitGap`, `matchesCrisis`, `CRISIS_RESOURCES`, `useLocale`
  (`locale`, `t`), `expo-constants` (`Constants.expoConfig?.version ??
  'unknown'` — `expoConfig` is nullable per the SDK 57 docs), theme tokens
  and `ThemedText` rungs only (no local `fontSize`).
- Produces: `export function GapReport({ query }: { query: string })`

State machine (`useState<'offer' | 'open' | 'sending' | 'sent' | 'failed'>`):

| State | Shows | Transitions |
|---|---|---|
| offer | one line, `ask.gap.offer`, pressable | tap → open |
| open | `TextInput` prefilled with `query` (limit 1000), disclosure `ask.gap.disclosure`, Send | Send → sending; `query` change → offer with new text |
| sending | field disabled, `ask.gap.sending` | result `sent` → sent; `failed` → failed |
| sent | `ask.gap.sent`, **or the crisis card again if the sent text matched** | `query` change → offer |
| failed | field kept and editable, `ask.gap.failed` in place, Send restored | Send → sending |

The crisis card renders **above the Send row whenever `matchesCrisis(text)`
is true** in `open`, `sending` and `failed`, and **instead of the thank-you
line** in `sent` when the sent text matched. It is not dismissible; editing
the text so it no longer matches is the only way it leaves. Send is never
disabled by it. Nothing in this component persists; unmount discards all.

- [ ] **Step 1: Strings** in `src/i18n/ui.ts` beside `ask.emptyBody`
  (`:78-80`):
  ```ts
  'ask.gap.offer': 'Tell us what you were looking for',
  'ask.gap.disclosure':
    'We don’t ask for your name or an account, and nothing you write here is kept on this phone. Please don’t include anything that could identify you. What you write is sent to us with your app language and version, is read by a person, and may be used to improve the app.',
  'ask.gap.send': 'Send',
  'ask.gap.sending': 'Sending…',
  'ask.gap.sent': 'Thank you. Someone will read this.',
  'ask.gap.failed': 'This wasn’t sent. Your words are still here — you can try again.',
  'ask.gap.crisisTitle': 'Nobody reads this quickly',
  'ask.gap.crisisBody': 'If you are in danger or thinking of harming yourself, these people can help now.',
  ```
  `ask.gap.disclosure` is the fixed wording from the agreed plan. If Task 3.1's
  body ever gains a field, this string changes in the same commit.
- [ ] **Step 2: Build the component** to the table above. Layout: flush
  joins, no negative margins (memory: spacing rule). The disclosure is
  `type="small"` `themeColor="textSecondary"`. The crisis card is a painted
  box in `theme.backgroundSelected` with the resources as rows: name, how,
  and a `Linking.openURL` on tap where a url or phone exists.
- [ ] **Step 3: Verify on web** at 390, both themes, every state, by
  driving it with the endpoint URL temporarily pointed at (a) the real
  worker, (b) `https://127.0.0.1:9` for the failure state. Screenshot each.
  Commit `Add the question-gap report component`.

### Task 3.4: Wire it into the empty card, and tell the truth in Settings

**Files:**
- Modify: `src/app/ask.tsx:218-236` — render `<GapReport query={trimmed} />`
  inside `styles.empty`, after the browse link
- Modify: `src/i18n/ui.ts:309` — `settings.footnote` currently ends
  "Everything on this device stays on this device." Change to: "Everything on
  this device stays on this device, except what you choose to send us from
  the ask sheet."
- Modify: `src/app/ask.tsx` docstring — one paragraph: the empty card now
  carries the report line, what it sends, and that nothing is kept locally

- [ ] **Step 1: Wire and reword.** `npm run i18n:manifest`;
  `npm run style:check`; `npm run search:check`.
- [ ] **Step 2: Verify the request body** by reading it in `wrangler dev`'s
  console (`console.log(JSON.stringify(body))` added locally and removed
  before commit): exactly three keys, and the disclosure's claims hold.
- [ ] **Step 3: Verify with eyes** on web: the empty card with the offer
  line; open; sent; failed; crisis. Commit `Ask sheet: report a question the
  app cannot answer`.

---

## Phase 4 — Verification and launch

### Task 4.1: The hand matrix on the Android preview build

Each row gets a screenshot in the commit message's PR-less log (paste
paths into the design plan entry).

- [ ] Good send → thank-you line; worker `kv key list` shows one new key;
  value has four fields, `day` has no time.
- [ ] Airplane mode → "This wasn't sent" in place, text kept, Send back.
- [ ] Timeout → point `SUBMISSIONS_URL` at a blackhole in a local build;
  failed state within ~8 s.
- [ ] Third send in a minute → 429 → same failed state.
- [ ] A crisis phrase → card above Send; Send still works; sent state shows
  the resources, not the thank-you.
- [ ] Query changed after sent → back to the offer line.
- [ ] After the good send: `adb` pull of AsyncStorage → no submission text
  anywhere, no `misses` key.
- [ ] The offline search itself still returns results for the
  `search:check` set on device with the radio off.

### Task 4.2: Launch criteria (all must be true)

- [ ] Disclosure matches the request body — Task 3.4 Step 2.
- [ ] Endpoint accepts / refuses / deletes at 14 days — Task 2.2 Step 4 and
  Task 2.3 `retention` run against production after 15 days of a test key.
- [ ] Workers Logs shown disabled in the dashboard — Task 2.2 Step 4.
- [ ] Crisis resources and the directory read by a person; ⚠️ removed from
  both files in a commit that names who read them.
- [ ] Local miss log gone on device — Task 0.1 Step 6.
- [ ] Failure states verified — Task 4.1.
- [ ] Offline search and empty card correct — Task 4.1 last row.
- [ ] App Store and Play data declarations updated to "other user content,
  not linked to identity" — operational, before the store submission that
  carries this OTA's runtime.
- [ ] `npx eas fingerprint:compare` against the installed build reports no
  difference; then `npm run update:preview`.

### Task 4.3: Operations, written down once

- [ ] Weekly: `npm run retention && npm run pull -- --phrases ../new-muslim-guide/src/content/crisis.ts`;
  read in one sitting; sort into page / alias / directory; `npm run purge`.
- [ ] Every page that comes out of the stream goes through
  `content:verify`, `evidence` where cited, `style:check`, `i18n:manifest`,
  and the reviewer, like any other page.
- [ ] Nothing is promised to anyone. No reply, no notification, no page.

---

## Self-review (5 Sep 2026)

- **Spec coverage:** placement (3.4), disclosure (3.3 Step 1), collected /
  not collected (2.1, 2.2), flow into review (2.3, 4.3), AI only in the
  batch and not at launch (4.3 — none used), crisis deterministic and
  non-blocking (3.2, 3.3), retention 14 days + check (2.2, 2.3), failure
  state with no retry (3.1, 3.3), rate limit without identity (2.2, with
  the change recorded in Global Constraints), no local history (0.1),
  separate repo + `/v1` contract in both repos (2.1), launch criteria (4.2).
- **Placeholders:** the worker host and KV namespace id are filled in at
  Task 2.2 deploy time and are the only blanks. The crisis organisations are
  deliberately Iyad's decision (Task 1.1).
- **Types:** `GapSubmission`, `GapResult`, `submitGap`, `matchesCrisis`,
  `CRISIS_PHRASES`, `CRISIS_RESOURCES`, `GapReport({ query })` are used with
  the same names throughout.
