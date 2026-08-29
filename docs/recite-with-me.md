# Recite with me

**Status:** Agreed 29 August 2026. **Phase 0's pipeline is built and the
fluent baseline passed at 100% the same day — it now waits only on Iyad's
beginner recordings.** A living document — Iyad adds to it, phases complete in
order, and nothing past the Phase 1 gate is committed work until the gate says
go.
**Opened:** 29 August 2026, from "will it be possible to get this Tarteel in
the app? how?"

**The rule the whole design hangs on, in four words: it follows, never
grades.** The screen highlights the word it hears you on, the way a patient
teacher's finger moves along the line. It never scores, never counts mistakes,
never says "wrong". A false "wrong" delivered to a frightened convert is worse
than no feature, so the failure mode is silence: lose the thread, stop
highlighting, say nothing.

Like the other plan documents, claims carry the file, line or URL they were
read from, with the date, so a later reader can re-check rather than trust.

---

## Who it is for

Someone who says Al-Fātiḥah seventeen times a day, cannot read Arabic, and has
no human they are willing to be embarrassed in front of. The app has Husary's
voice to copy and a cover-and-recite mode to test recall — what it cannot do
is listen. This is the listening half.

## What was verified before this plan existed (29 Aug 2026)

- **Tarteel's product has no SDK or public API.** Their mistake detection is a
  closed cloud service (NVIDIA Riva/NeMo); the `tarteel-api` repo on GitHub is
  their 2018-era crowdsourcing backend, not the recognition engine. Embedding
  Tarteel is not an option.
- **Tarteel open-sourced the hard part anyway.** Whisper models fine-tuned on
  Qur'anic recitation, published by them on Hugging Face under **Apache-2.0**:
  `tarteel-ai/whisper-base-ar-quran` (5.75% WER) and
  `tarteel-ai/whisper-tiny-ar-quran` (~9% WER). Apache-2.0 permits commercial
  use with attribution — attribution-as-data, the `audio-sources.ts` pattern.
- **A maintained React Native runtime exists.** `whisper.rn` (mybigday), the
  binding of whisper.cpp — v0.5.x, documented Expo prebuild path, and a
  `RealtimeTranscriber` with voice-activity detection. Native module, so it
  ships in a **build**, never an OTA.
- ⚠️ **The WER was measured on fluent recitation.** A beginner's Fatiha —
  halting, anglicised, ten-second gaps — is out of distribution for these
  models. Whether they can track *our* user is the whole question, nobody can
  reason their way to the answer, and that is what Phase 0 measures.

## Why our version is much smaller than Tarteel

Tarteel answers "which of 6,236 ayahs is this, and is every word and vowel
right?" This answers "is the reader currently at word 12 of 29 of a text the
app chose?" The target is **known**, so the job is alignment against a fixed
sequence, not open recognition — transcription errors mostly wash out when the
only question asked of each token is "does it advance the pointer?" The
comparison runs on the consonantal skeleton the repo already uses
(`scripts/content-verify.mjs:78`), which deliberately cannot judge vowel
quality — and for this register that is a feature, not a limitation.

## The five rules

Enforced in code, not intention, when the screen is built (Phase 4):

1. **It follows, never grades.** No score, no count, no "wrong", no mistake
   log. (Tarteel keeps historical mistake logs; we deliberately do not.)
2. **The failure mode is silence.** Lost tracking stops the highlight and says
   nothing. The one thing the screen never expresses is disappointment.
3. **Audio never leaves the device and is never stored.** Inference is
   on-device; no recording is written anywhere, ever.
4. **Nothing about the attempt is observed.** No entry in `observations` for
   how often or how well someone practised with the mic. The existing
   `recordSurah` (play/recite events) is untouched and is the only signal
   review uses.
5. **The transcript is never shown.** Whisper's text output is an internal
   signal for the aligner. Printing it would put model-written Arabic on
   screen, which CLAUDE.md forbids — the only Arabic rendered is the app's own
   reviewed text.

---

## The phases at a glance

| | Phase | State | Ships via |
|---|---|---|---|
| **0** | [The desktop spike](#phase-0--the-desktop-spike) | ⏳ Baseline ✅ 100% · waiting on recordings | nothing — throwaway |
| **1** | [The gate](#phase-1--the-gate) | ⬜ Waiting on Phase 0 + recordings | — a decision |
| **2** | [The phone spike](#phase-2--the-phone-spike) | ⬜ | dev build (throwaway) |
| **3** | [The aligner, for real](#phase-3--the-aligner-for-real) | ⬜ | OTA |
| **4** | [The screen](#phase-4--the-screen) | ⬜ | OTA |
| **5** | [The model as a download](#phase-5--the-model-as-a-download) | ⬜ | **eas build** |

Phases 3–5 are sketches until Phase 1 says go — sized for planning, not
committed. If the gate says no, everything above it is deleted and this
document records why.

---

## Phase 0 — The desktop spike

**Throwaway, in `.cache/recite-spike/` (gitignored), on this iMac.** Its
output is a number, not code. Environment facts, checked 29 Aug: Intel x86_64,
macOS 12.7.6, Python 3.9.6, `make` but no `cmake` (installed via
`pip install --user cmake`), no ffmpeg (macOS's built-in `afconvert` decodes
mp3/m4a to 16 kHz WAV instead).

**The pipeline:** whisper.cpp (CPU build) + `ggml-model.bin` (148 MB f16) from
`B1uqa/whisper-base-ar-quran-ggml` — a third-party conversion of Tarteel's
weights, acceptable for a throwaway because the fluent baseline below verifies
it end to end. The shipping model (Phase 5) is converted from Tarteel's own
weights regardless.

**Two test sets:**

1. **The fluent baseline — the app's own bundled Husary clips**
   (`assets/audio/fatiha-1..7.mp3`). If the pipeline cannot track the most
   correct Fatiha ever recorded, the model, the conversion or the aligner is
   broken, and nothing about beginners has been learned yet. This must be
   near-perfect before the second set means anything.
2. **The beginner set — recordings Iyad supplies.** See below.

**The aligner:** a throwaway node script. Reference text copied verbatim from
`FATIHA_VERSES` in `src/content/recitations.ts` (copied, not retyped);
normalisation copied from `skeleton()` in `scripts/content-verify.mjs:78`.
Greedy pointer over the 29 words: a transcribed token advances the pointer on
a skeleton match against the current or next expected word; anything else is
ignored. Reported per recording: **words advanced / total**, where the pointer
stalled, and the raw transcript beside the expectation.

### What Iyad supplies — the beginner recordings

Phone voice memos are fine (`.m4a`; `afconvert` reads them). Ordinary room,
phone at arm's length — the real conditions. Drop the files in
`.cache/recite-spike/recordings/`. Three registers, one or two takes each:

1. **Fluent** — your own natural recitation, as a second baseline.
2. **Beginner** — deliberately slow, halting, anglicised: flatten the ḥ to h,
   the ʿayn to a vowel, break words in the middle, the way a three-week-old
   convert actually sounds.
3. **Struggling** — long pauses mid-ayah, a false start, a self-correction,
   one skipped word.

**Done when:** the fluent baseline tracks ≥ 95% with zero stalls, and every
beginner recording has a measured rate and a stall map.

### Measured 29 Aug — the baseline half is done

- **Husary baseline: 29/29 words, 100%, zero stalls, full surah tracked.**
  All seven bundled clips transcribed and aligned; the model returned exactly
  29 words for the 29-word surah, fully vowelled.
- **One real finding for Phase 3's aligner:** the first run scored 27/29, and
  both misses were الرَّحْمَٰنِ. `skeleton()` promotes the superscript alef to a
  real alef — right when comparing two written texts, wrong against ASR
  output, which spells dagger-alef words the plain dictation way (الرحمن).
  The spike aligner drops U+0670 instead of promoting it, with the reasoning
  recorded in `align.mjs`. The shipping aligner must do the same.
- **Speed on this machine:** ~6 s for the longest ayah on a 2012-class Intel
  CPU with no GPU path. Not a phone number in either direction — Phase 2
  exists to measure that on hardware.
- **To run the beginner set:** drop voice memos in
  `.cache/recite-spike/recordings/` and run `sh .cache/recite-spike/run.sh` —
  it converts, transcribes and aligns every file and prints the transcript,
  the advanced count and the stall map per recording.

## Phase 1 — The gate

A decision, made by Iyad looking at Phase 0's traces. The suggested bar:
beginner-register recordings track well enough that the highlight would have
*followed* rather than stalled — as a starting point, ≥ 80% advanced with
stalls only where the recording genuinely broke down. Below that, the honest
outcome is **stop, keep nothing, record the numbers here** — the same exit
`quote-dont-answer.md` gives its selector. Tiny-vs-base is also decided here,
by data: if `tiny` tracks beginners nearly as well as `base`, its 40 MB
quantised size wins.

## Phase 2 — The phone spike

Still throwaway. A dev-client build (`eas build --profile development`) with
`whisper.rn`, measuring on hardware what the desktop cannot: `RealtimeTranscriber`
latency word-to-highlight, battery and heat over a seven-ayah session, and
performance on **the oldest Android that matters** — an open question below.
Done when those three numbers exist for the model the gate chose.

## Phase 3 — The aligner, for real

The spike aligner rewritten as a tested TypeScript module, `src/lib/`, pure
logic with no audio dependency (feed it token streams in tests — including a
mid-ayah restart, a skipped word, and garbage — and assert pointer behaviour,
with silence-on-loss as an asserted state, not a hope). OTA; useful even
before the native pieces ship, because it is testable without them.

## Phase 4 — The screen

Follow-along highlighting where Al-Fātiḥah already lives, `/surah/1` — the
screen the prayer's recite step already opens. A mic affordance, the existing
ayah text, the highlight walking word by word. The five rules land here as
code and as assertions where a check can hold them. States: no model
downloaded (the affordance explains, once), no mic permission, tracking,
silence-on-loss. Copy for the mic prompt says on screen what rule 3 promises:
nothing is recorded, nothing leaves the phone.

## Phase 5 — The model as a download

The 40–150 MB model is Phase-8 audio's shape exactly: fetched once, kept in
`Paths.document`, a row on the storage screen that can delete it, never
bundled. Converted from `tarteel-ai/whisper-*-ar-quran` directly (not the
third-party file), checksummed. Attribution: a row in
`src/content/providers.ts` naming Tarteel, the model, and Apache-2.0 — a
licence obligation held as data.

⚠️ **This phase is the native commitment**: `whisper.rn` + mic permission
(`NSMicrophoneUsageDescription` / `RECORD_AUDIO`) enter the binary, so it is
an `eas build`, and the fingerprint policy will correctly stop older builds
receiving OTAs that assume it. The App Store privacy label survives — audio is
processed on device, stored nowhere, sent nowhere — but the mic permission
itself is a new question the store listing answers.

---

## Costs, plainly

- **A native build**, the app's first new native module since
  `expo-file-system`. Everything before Phase 5 is throwaway or OTA.
- **A 40–150 MB download** the storage screen must own.
- **Battery and heat** during live inference on old phones — measured in
  Phase 2, not assumed.
- **The register risk is the real one.** Every rule in "The five rules" exists
  because the cheapest failure of this feature is emotional, not technical.

## Open questions — Iyad

1. **The oldest Android this must work on.** Phase 2 needs a physical target;
   "works on a recent iPhone" proves nothing about the phones converts own.
2. **Where the mic lives.** On `/surah/1` beside the existing controls is the
   default; if it should also reach the prayer's recite step directly, say so
   before Phase 4 is drawn.
3. **Whatever you want to add.** This document is meant to grow — new phases
   go under the table with their reasoning, the way the other plan docs do it.

## Backlog — raised, not decided

- **Rehearsal mode** (the guided walk-through of a whole prayer, phone off the
  mat) shares Phase 5's TTS-adjacent native ground; if both happen, one build.
- **The other recitations** — tashahhud, the tasbīḥāt — the day they have
  recorded audio; the aligner is text-agnostic by construction.
- **Hidden-words mode** — cover the text, recite, the highlight confirms from
  hearing alone. The natural second act of the same machinery; register needs
  care, because confirmation is one step from grading.
