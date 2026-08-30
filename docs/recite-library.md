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
4. **Self-host the models** (already an obligation in `providers.ts`):
   convert from the archived original weights with the archived converter,
   host at a URL the library controls, repoint `recite-session`.

## Maintenance ledger

Every bug found and fixed in the engine path, so a future session inherits
the history rather than rediscovering it. Add to this list.

| Date | Bug | Fix | Upstream? |
|---|---|---|---|
| 29 Aug 2026 | Greedy lookahead-1 alignment cannot re-acquire after a stumble (6/29 on an ~85%-right transcript) | Window + resync + acquire-anywhere in `recite-align.ts`, pinned by `npm run align:check` | Ours — no upstream |
| 29 Aug 2026 | Whole-passage decoding suppresses genuine repetitions (the basmala and ayah 3 vanished from a 26 s decode) | Short VAD-cut slices; `promptPreviousSlices: false` | Usage, documented in recite-with-me.md |
| 30 Aug 2026 | `import 'whisper.rn'` fails at press-time: needs the `buffer` polyfill nothing declares | `buffer` installed; found by exporting the ANDROID bundle, which walks lazy split points the web export never sees | Worth an upstream docs note |
| 30 Aug 2026 | `SliceManager.addAudioData` recurses per slice boundary with no oversized-chunk guard — a stalled VAD queue's backlog overflows the call stack mid-recitation | `patches/whisper.rn+0.7.4.patch`: oversized chunks split, recursion capped at one level (src + both builds) | **PR pending Iyad's go-ahead** |

## Takedown insurance — done 30 Aug 2026

Everything the feature builds from now exists in copies we hold, checksummed.

**In this repo, `vendor/`** (see its README for restore instructions):
the exact `whisper.rn-0.7.4` npm tarball — which contains the complete
whisper.cpp/ggml engine sources, so the whole buildable stack survives in one
7 MB file — the PCM stream module's tarball, and the Silero VAD model.
`vendor/SHA256SUMS` covers them.

**In the local archive, `~/Documents/recite-archive/`** (23 files,
`SHA256SUMS` at its root): the ORIGINAL Tarteel weights — the true source
that makes us independent of every third-party conversion:

| | |
|---|---|
| `tarteel-ai/whisper-base-ar-quran/` | full HF snapshot incl. `pytorch_model.bin` (290,458,721 bytes, sha `ec758949…`) |
| `tarteel-ai/whisper-tiny-ar-quran/` | full HF snapshot incl. `pytorch_model.bin` (151,098,921 bytes, sha `f26c9620…`) |
| `ggml/ggml-base-ar-quran-f16.bin` | the GGML the app currently downloads (147,951,465 bytes, sha `aaebca10…`), verified end-to-end by the Phase 0 baseline |
| `ggml/ggml-silero-v6.2.0.bin` | VAD, sha `2aa269b7…` |
| `tools/convert-h5-to-ggml.py` | whisper.cpp's converter — originals + this = we can mint GGML forever |

⚠️ **The one outstanding step, and it needs Iyad:** the local archive lives on
one machine. Move the model files to storage he controls — a private GitHub
repo's release assets is the natural fit (2 GB/file limit, free, and its
download URLs later double as the app's self-hosted model source). There is
no `gh` CLI on this machine and the GitHub connector was down when this was
written; either install `gh` and say the word, or create the release in the
browser and drag the five files in. Until then the insurance is: repo-vendored
build stack + one local copy of the weights + three independent upstream
sources still live.

## Licences, so nobody re-derives them

whisper.rn MIT · whisper.cpp/ggml MIT · @fugood/react-native-audio-pcm-stream
MIT · Silero VAD MIT · Tarteel models **Apache-2.0** (stated on their model
cards — attribution required, commercial use permitted). All permit
everything the path above does; the notices ride with whatever is vendored.
