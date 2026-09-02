# The recite library

**Status:** Decided 30 August 2026 — Iyad: *"i want to keep improving on it
and maintain it for long term, and possibly use it on future apps… build it
separate from the app."* **A library with a programming API, not a server** —
the extraction happens AFTER the recite-with-me gate, and this document is
the sub-project's home in the meantime: the boundary, the path, the
maintenance ledger, and the takedown insurance (done 30 Aug).
**Parent plan:** `docs/recite-with-me.md`. Read that first; this document is
what happens to its machinery after it proves itself.

---

## The decision, and the fork it closed

Two meanings of "our own API" were on the table and one was rejected:

- **A server API — rejected.** Streaming recitation audio to an endpoint
  kills the three properties that make the feature worth having: it works
  offline (someone praying in a basement), the audio never leaves the device
  (the promise printed on the mic button, and the difference from Tarteel),
  and it costs nothing to run. `quote-dont-answer.md` Part 5 priced a server
  for mere text and called it the biggest cost in that plan; audio is worse.
- **A library — decided.** Its own repo, its own version, installed into
  this app and future apps as a dependency. `recite-align.ts` and
  `recite-session.ts` were built app-agnostic from day one for exactly this.

**Own the logic, rent the native plumbing.** The library will NOT fork
whisper.rn's native layer — iOS/Android build chains and whisper.cpp updates
are the part mybigday maintains well for free. What the library owns is
everything above the native contexts: the follower, the session, model
distribution, and — because both crashes so far lived there — potentially the
pure-TypeScript realtime layer (`RealtimeTranscriber`/`SliceManager`), which
MIT permits vendoring with its notice kept.

## The boundary

| The library owns | The app keeps |
|---|---|
| The follower (`recite-align`): acquire-anywhere, widen-on-stall, ال/و tolerance, dagger-alef and رحمان normalisation — every rule with its measured justification | The reviewed Arabic text it feeds in (content never moves into a library) |
| The session (`recite-session`): model download/verify/store, start/stop, slice accumulation, the cannot-write-audio guarantee | UI, theme, i18n, and the register rules that are product policy (no scores, stillness on loss) |
| Model distribution: one hosted URL, checksums, the conversion from Tarteel's own weights | Which texts get the feature, and where the mic lives |
| File-system access as an **injected dependency**, so non-Expo apps can use it | The Expo implementation of that interface |

## The path, in order

1. **Offer the SliceManager fix upstream** (`patches/whisper.rn+0.7.4.patch`)
   as a PR to mybigday/whisper.rn. ⚠️ Not yet done — a public PR goes out
   under Iyad's name, so it waits for his explicit go-ahead.
2. **Stabilise in-app.** Every phone test so far has changed the internals;
   iterating across two repos would halve the speed for nothing. The gate
   and the UX settle first.
3. **Extract.** New repo, move the two modules and their checks, publish,
   `npm install` it back. A mechanical afternoon once the surface stops
   moving. The `align-check` fixtures travel with the aligner.
4. ~~**Self-host the models**~~ **Done 31 Aug 2026** — the app downloads
   from `ikamand/recite-models`'s frozen release URLs. Converting fresh from
   the archived originals stays available (originals + converter are in the
   same repo) but is no longer owed to anyone: the hosted GGML is verified
   by checksum and by the Phase 0 baseline.

## In-house, decided 31 Aug 2026 — *"i want my inhouse stuff not others"*

Iyad's call, overriding the wait-for-the-gate sequencing above for
independence (the extraction into a published package still waits; what
moved up is *whose copies the app builds from*):

- **The code installs from this repo, not npm.** `package.json` points
  `whisper.rn` and the PCM module at `file:vendor/*.tgz`. npm's registry is
  no longer contacted for either; the crash patch applies on top exactly as
  before.
- **How an engine fix is made now, every time:** edit `node_modules/whisper.rn`
  (src AND both `lib/` builds — Metro uses src, but keep them honest), run
  `npx patch-package whisper.rn`, commit the regenerated patch here — **and**
  commit the source change to the `in-house/0.7.4` branch of
  `ikamand/whisper.rn-mirror`, which is the canonical in-house history of
  engine changes. The SliceManager fix is its first commit.
- **The models download from `ikamand/recite-models`'s release assets** —
  done 31 Aug 2026, after Iyad renamed the repo and made it public. Both
  assets were fetched anonymously and hashed byte-for-byte against
  `SHA256SUMS` before `recite-session.ts` was repointed; the pinned sizes
  are unchanged, so phones that downloaded earlier keep their files.
- ⚠️ **The cost, said once:** `recite-models` and the vendored tarballs are
  now LOAD-BEARING, not insurance. Renaming or deleting that repo breaks new
  model downloads; deleting `vendor/` breaks `npm install`. The upstreams
  become the fallback instead of the source.

## Maintenance ledger

Every bug found and fixed in the engine path, so a future session inherits
the history rather than rediscovering it. Add to this list.

| Date | Bug | Fix | Upstream? |
|---|---|---|---|
| 29 Aug 2026 | Greedy lookahead-1 alignment cannot re-acquire after a stumble (6/29 on an ~85%-right transcript) | Window + resync + acquire-anywhere in `recite-align.ts`, pinned by `npm run align:check` | Ours — no upstream |
| 29 Aug 2026 | Whole-passage decoding suppresses genuine repetitions (the basmala and ayah 3 vanished from a 26 s decode) | Short VAD-cut slices; `promptPreviousSlices: false` | Usage, documented in recite-with-me.md |
| 30 Aug 2026 | `import 'whisper.rn'` fails at press-time: needs the `buffer` polyfill nothing declares | `buffer` installed; found by exporting the ANDROID bundle, which walks lazy split points the web export never sees | Worth an upstream docs note |
| 30 Aug 2026 | `SliceManager.addAudioData` recurses per slice boundary with no oversized-chunk guard — a stalled VAD queue's backlog overflows the call stack mid-recitation | `patches/whisper.rn+0.7.4.patch`: oversized chunks split, recursion capped at one level (src + both builds) | **PR pending Iyad's go-ahead** |
| 31 Aug 2026 | Terminal: whisper.rn's slice cleanup deletes a slice its own queue still points at ("Slice not found for index 0"), then no transcription ever fires again — caught in a Metro trace while five ayahs went unheard; a second bug in the same trace showed a slice's partial text resetting mid-stream | **The whole realtime layer replaced** with the in-house core in `recite-session.ts` (`8eb3612`): rolling 15 s window, one pass in flight, no slices, no VAD, no queues. Verified live: all seven ayahs tracked end-to-end at ~1.0–1.4 s per pass on Iyad's phone, garbled words held and forgiven | No — their layer is no longer used; the SliceManager patch stays only as history |

## How to work on this feature — the cookbook a session needs

Written 30 Aug 2026 so the live-debugging method survives the conversation
that invented it. This is how every bug in the ledger above was actually
caught.

**The live trace — the main instrument.** The dev build streams every
`__DEV__` log to whichever terminal runs Metro. So: ask Iyad to stop his own
`npm start` (Ctrl+C), run `npx expo start` YOURSELF as a background task, have
him reload the app (same wifi, port 8081 reconnects), and read the task's
output file. Each recognition pass logs `[follow] <ms> <window transcript>` —
pass latency and exactly what the model heard, which is how the terminal
slice bug was caught in the act and how the fake-sounds question was settled
(the model heard them honestly; the display was lying).

**The on-phone instrument:** `/recite-spike` (open
`newmuslimguide://recite-spike` in the phone browser — linked from nowhere).
Shows the raw transcript, model-load ms and per-pass ms on screen. The
product card never shows any of that; the spike exists so it never has to.

**The desktop repro:** `.cache/recite-spike/` on the iMac — whisper.cpp
built, the model, `align.mjs`, and `run.sh`: drop any voice memo in
`recordings/` and it transcribes + aligns offline. `npm run align:check`
pins the aligner against verbatim transcripts from real sessions; new
regressions become new fixtures there.

**Screen recordings:** Iyad drops them in `~/Documents`; extract frames with
the scratchpad Playwright (`channel: 'chrome'`, load the video via a
`file://` HTML page — a blank page cannot load file media — and remember
React Native Web scrolls an inner div, so `fullPage` screenshots see only
the viewport).

**The knobs, and where each rule lives:** window/tick in
`lib/recite-session.ts` (`WINDOW_SECONDS`, `TICK_MS` — pass time scales with
window length); walk paces and the display rules (high-water, heard-set,
verse anchor) in `hooks/use-recite-follow.ts`; matching tolerances in
`lib/recite-align.ts`. Every constant's comment says which phone test set it.

## Status — update this block when it changes

As of 2 Sep 2026:

- **New, 2 Sep:** the classroom mode (repeat after the reciter, selector
  leads, red on the passed-over word, ephemeral score) is agreed and
  specified as **Phase 6 of `docs/recite-with-me.md`** — read it there. Its
  gate is the pairs spike (`.cache/recite-spike/run-pairs.sh`, takes in
  `TAKES.md`), built and proven on synthetic audio the same day — and **run on
  Iyad's fifteen takes that afternoon: wrong vowel endings are heard 5/6
  (اللَّهُ/اللَّهَ included), imitated letter-quality errors 0/3, controls 5/6
  clean.** Red may claim words and endings; letter quality stays with the
  tap-a-word teacher. Measured detail in the phase's section. No app code
  for the mode exists yet; the build decision is Iyad's next call.
- **Still open from 30 Aug:** the in-card redesign (highlight inside ayah
  cards, pinned controls, surah-wide per-word transliteration) — built,
  **not yet seen on Iyad's phone**. His test and recording are the next
  input.
- **Open decisions, his:** tiny-vs-base model (the only lever left on the
  1–3 s follow lag; conversion tools and originals are archived and ready);
  the upstream PR for the SliceManager patch.
- **Known limits:** ~1.0–1.4 s per recognition pass with the base model on
  his phone; 23 of 571 ayahs have no per-word transliteration (generator
  refused misaligned splits — they render the plain line).

## Takedown insurance — done 30 Aug 2026

Everything the feature builds from now exists in copies we hold, checksummed.

**In this repo, `vendor/`** (see its README for restore instructions):
the exact `whisper.rn-0.7.4` npm tarball — which contains the complete
whisper.cpp/ggml engine sources, so the whole buildable stack survives in one
7 MB file — the PCM stream module's tarball, and the Silero VAD model.
`vendor/SHA256SUMS` covers them.

**In the local archive, `~/Documents/recite-models/`** (23 files,
`SHA256SUMS` at its root): the ORIGINAL Tarteel weights — the true source
that makes us independent of every third-party conversion:

| | |
|---|---|
| `tarteel-ai/whisper-base-ar-quran/` | full HF snapshot incl. `pytorch_model.bin` (290,458,721 bytes, sha `ec758949…`) |
| `tarteel-ai/whisper-tiny-ar-quran/` | full HF snapshot incl. `pytorch_model.bin` (151,098,921 bytes, sha `f26c9620…`) |
| `ggml/ggml-base-ar-quran-f16.bin` | the GGML the app currently downloads (147,951,465 bytes, sha `aaebca10…`), verified end-to-end by the Phase 0 baseline |
| `ggml/ggml-silero-v6.2.0.bin` | VAD, sha `2aa269b7…` |
| `tools/convert-h5-to-ggml.py` | whisper.cpp's converter — originals + this = we can mint GGML forever |

**Off-machine copies — done 30 Aug 2026**, after `gh` was installed and Iyad
logged in. Everything now lives under his own GitHub account:

| Where | What |
|---|---|
| `github.com/ikamand/recite-models` (public) | The archive's small files in git; the four model files as release **models-v1** assets — both original `pytorch_model.bin`s, the app's GGML f16, the VAD — byte sizes matching `SHA256SUMS` exactly |
| `github.com/ikamand/whisper.rn-mirror` (private) | Full source mirror, 144 refs — every branch and tag through v0.7.4 |
| `github.com/ikamand/react-native-audio-pcm-stream-mirror` (private) | Full source mirror of the mic module |

**Self-hosting DONE, 31 Aug 2026.** The repo was renamed `recite-models`
(while nothing pointed at it — the free moment), made public by Iyad, and
`recite-session.ts` now downloads both models from its `models-v1` release.
Verified before the repoint: both assets downloaded anonymously from the
release and hashed byte-for-byte to `SHA256SUMS`. **The freeze rule is in
that repo's README:** the tag and asset filenames are never renamed or
deleted — shipped apps hold the URLs forever; new models get new tags.

## Licences, so nobody re-derives them

whisper.rn MIT · whisper.cpp/ggml MIT · @fugood/react-native-audio-pcm-stream
MIT · Silero VAD MIT · Tarteel models **Apache-2.0** (stated on their model
cards — attribution required, commercial use permitted). All permit
everything the path above does; the notices ride with whatever is vendored.
