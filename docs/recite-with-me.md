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

**Scope, amended 2 Sep 2026:** these five bind the follow mode unchanged. The
classroom mode (Phase 6) is a separate, opt-in room and amends rule 1 inside
itself only — see that phase for exactly what changed, what did not, and the
argument that changed it.

---

## The phases at a glance

| | Phase | State | Ships via |
|---|---|---|---|
| **0** | [The desktop spike](#phase-0--the-desktop-spike) | ✅ Done 29 Aug — baseline 100%, real take tracked | nothing — throwaway |
| **1** | [The gate](#phase-1--the-gate) | ⏳ The dev build is now its instrument | — a decision |
| **2** | [The phone spike](#phase-2--the-phone-spike) | ⏳ Built 29 Aug · EAS build `48254b4c` queued | dev build |
| **3** | [The aligner, for real](#phase-3--the-aligner-for-real) | ✅ Built 29 Aug | OTA |
| **4** | [The screen](#phase-4--the-screen) | ✅ Built 30 Aug — needs eyes on the dev build | OTA |
| **5** | [The model as a download](#phase-5--the-model-as-a-download) | ✅ Built 30 Aug — convert-and-self-host still owed pre-ship | **eas build** |
| **6** | [The classroom](#phase-6--the-classroom-repeat-after-the-reciter) | ✅ Built and **seen working on Iyad's phone the same evening** (preview OTA) | OTA |

**The sequencing changed 29 Aug, on instruction.** The original rule — nothing
past the gate is committed work — was Iyad's to unmake and he unmade it:
*"lets build the whole plan."* Phases 2 and 3 are built ahead of the gate;
what survives of the rule is that Phases 4 and 5 still wait, because a mic
feature cannot be looked at except on a phone, and the pilot discipline
(build, then eyes, then the rest) binds harder than the gate ever did. The
dev build also upgrades the gate itself: a live voice through a real phone
mic beats acted desktop recordings as evidence.

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

### Seen 31 Aug — the first on-device session, on tape

Iyad screen-recorded a live attempt (31 s, frames pulled and read on the
iMac). What it proves: models loaded in ~4 s on his phone, and **the
word-by-word following worked live** — بِسْمِ lit at ~7 s, three words by
~8 s, Ayah 2 reached by ~10 s. What it also captures: the session then froze
at Ayah 2 for the remaining twenty seconds — the SliceManager stack overflow
killing the pipeline silently, matching his crash screenshot. The recording
predates the fixes (the listening hint line is absent), so the freeze and
the back-and-forth he reported are both already patched; a fresh take on the
new bundle is the next piece of evidence.

### Measured 29 Aug, evening — the first real recording, two requirements out of it

Iyad's own recitation, 26 s, recorded in the macOS Voice Memos app on this
machine's mic — the first human audio through the pipeline.

- **The model heard him nearly perfectly.** The transcript is ayahs 2–7,
  clean but for word-boundary artifacts (مَا لِكِ split; نَسْتَعِينَاهُ اهْدِنَ
  merged by liaison).
- **The first aligner scored it 0/29.** The recording begins at الحمد — no
  audible basmala, a legitimate way to begin — and word five sits exactly one
  past a 4-word window anchored on بسم. A near-perfect transcript, zero
  tracking, forever. **Requirement: cold-start acquisition** — until the
  first word locks, the window is wide (8 here); after it, narrow. With that
  one change: **18/29 (62%), tracked to the final word, recovering at every
  stumble** — and silence, English and the Husary baseline all unchanged.
- **What the 18/29 honestly means.** Four of the eleven misses are the
  unrecited basmala and two are ayah 3, absent from the transcript (skipped
  or dropped — only the reciter knows). The rest are **boundary
  splits/merges**, the dominant loss mode in both human takes so far: the
  highlight *skips past* those words and re-locks; it never freezes.
  **Requirement for Phase 3: the matcher must tolerate token↔word boundary
  mismatch in both directions** — one token spanning two reference words
  (liaison) and one word arriving as two tokens.
- Still open: the deliberately-beginner and struggling takes, which are the
  registers the gate actually decides on.

**Corrected the same evening — Iyad recited the whole Fatiha, and the section
above is wrong twice.** He confirmed it: the basmala and ayah 3 were both
recited. The energy trace shows speech from 0.5 s, and both appear the moment
the audio is decoded in ~6 s slices instead of one 26 s pass. The whole-file
decode was **suppressing genuine repetitions** — a known Whisper decoder
behaviour, and the Fatiha repeats itself (the basmala's phrases return as
ayah 3). Three consequences, each now a requirement:

1. **Decode in short slices, never whole passages.** This is what
   `whisper.rn`'s `RealtimeTranscriber` does anyway (VAD-cut slices), so the
   phone design was already right and the desktop test mode was the
   misleading configuration. Phase 2 must confirm repetitions survive its
   slicing on real hardware.
2. **Widen on any stall, not only at cold start** — my fixed-time slice cuts
   garbled words mid-syllable and froze the narrow window two words deep;
   VAD slicing will garble less, but the aligner should not depend on that.
   With widening: sliced decode of Iyad's take tracks **21/29 (72%), start
   to end**, bismillah locking immediately — remaining losses are slice-edge
   artifacts plus one orthographic variant (the model writes رحمان where the
   app writes الرحمٰن; Phase 3's normaliser should treat them as one word).
   Guards unchanged throughout: silence 0, English 0, Husary 29/29.
3. **The score is not the experience.** 21/29 with recovery everywhere means
   a highlight that follows a complete, correct recitation while skipping a
   few words at seams — visible as a jump, never as a freeze or a "wrong".

### Measured 29 Aug, later — three adversarial probes, and a design lesson

Probes the machine could make without a human: ten seconds of silence, an
English sentence ("okay let me try this again…", macOS `say`), and Al-Fātiḥah
read as **plain spoken Arabic with no tajwīd** by the Maged ar_SA voice — a
synthetic point between Husary and a beginner.

- **Silence:** the model hallucinated one word (a known Whisper behaviour);
  the aligner ignored it and the pointer never moved. On the phone,
  `whisper.rn`'s VAD gates silence before it reaches the model at all.
- **English:** transcribed as Arabic-shaped gibberish; every token ignored,
  nothing advanced. The silence-on-loss rule survives someone talking to
  themselves near the mic.
- **Plain-spoken Arabic: the model heard ~85% of it correctly — and the first
  aligner scored 6/29.** One liaison merge (*rabi-l-ʿālamīn* arriving as one
  token) froze a greedy lookahead-1 pointer for the rest of the surah. **A
  follow-along that cannot re-acquire after one stumble highlights nothing
  forever.** The aligner now matches within a 4-word window (words passed
  over are "skipped", never "wrong"), tolerates a leading ال moving across a
  token boundary, and treats the window as its resync. Same audio: **23/29
  (79%), tracked to the final ayah, recovering from both stumbles** — while
  silence and English still advance zero, which is the guard that matters.
  Phase 3's real aligner inherits this shape as a requirement, not a
  suggestion.

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

### Built 29 Aug — machinery in, build queued

`src/app/recite-spike.tsx`, an instrument linked from nowhere: fetches the
Tarteel model (148 MB) and Silero VAD (1 MB) once into `Paths.document`, runs
the live mic through `RealtimeTranscriber` (15 s slice cap, VAD cutting at
silences, `promptPreviousSlices: false` — each per Phase 0's repetition
finding), re-runs the pure follower on every slice event, and highlights the
Fatiha word by word with model-load and slice timings on screen. Mic
permission strings landed in `app.json`, worded as the promise they are.
Android development build: `48254b4c` on EAS.

**To run it, Iyad:** install the APK from the EAS build page, run `npm start`
on the iMac with the phone on the same wifi, open the project in the dev
client, then open `newmuslimguide://recite-spike` from the phone's browser —
the screen is deliberately linked from nowhere. Tap *Get the models* on wifi
once, then *Start*, and recite. The three numbers to read off the screen:
model load ms, last-slice ms, and how the highlight follows your real voice.

⚠️ **Two API facts learned against the published types, for whoever touches
this next:** whisper.rn 0.7.4's exports map has no bare entry — import
`whisper.rn/index` and sibling paths — and `RealtimeTranscriber` takes the
`RingBufferVad` wrapper, not the raw VAD context; the README's shorthand
elides both, and `autoSliceOnSpeechEnd` does not exist in 0.7.4's options.

## Phase 3 — The aligner, for real

The spike aligner rewritten as a tested TypeScript module, `src/lib/`, pure
logic with no audio dependency (feed it token streams in tests — including a
mid-ayah restart, a skipped word, and garbage — and assert pointer behaviour,
with silence-on-loss as an asserted state, not a hope). OTA; useful even
before the native pieces ship, because it is testable without them.

### Built 29 Aug — `src/lib/recite-align.ts` + `npm run align:check`

One-shot and pure: hand it the reference and the full transcript on every
recogniser event; re-running from the top makes streaming revision free. The
API has no vocabulary for wrong — `position`, `passedOver`, `held`,
`complete` — so the screen cannot express what the module cannot say. Ten
check cases whose fixtures are the spike's verbatim transcripts; the check
was flipped once to prove it fails.

**One contract grew past the spike:** before the first word locks, the whole
text is open to acquisition, not an eight-word window — practice loops a
single ayah, which begins nowhere near word one. And one expectation was
corrected honestly: the plain-spoken take ends `held` two words short
(`complete: false`), because its final garbled token matches nothing — the
follower finished still, judging nothing, which is the designed behaviour.

## Phase 4 — The screen

Follow-along highlighting where Al-Fātiḥah already lives, `/surah/1` — the
screen the prayer's recite step already opens. A mic affordance, the existing
ayah text, the highlight walking word by word. The five rules land here as
code and as assertions where a check can hold them. States: no model
downloaded (the affordance explains, once), no mic permission, tracking,
silence-on-loss. Copy for the mic prompt says on screen what rule 3 promises:
nothing is recorded, nothing leaves the phone.

### Built 30 Aug — and wider than planned, on Iyad's "build everything"

`src/components/recite-follow.tsx`, a card under the reciter row on **every
surah screen, not only /surah/1** — the generated Qur'an text is the
reference, so all 38 surahs follow for free, and the prayer's recite step
reaches it because that step already opens the surah screen (the open
question about a second entry point dissolved). One ayah at a time, because
the reciter holds the surah in memory, not their eyes. The five rules are the
component's shape: nothing it can render expresses a score, a count or a
wrong; `held` dims the words and says nothing; the machinery
(`lib/recite-session.ts`, shared with /recite-spike so the instrument
measures the real pipeline) is given no filesystem and no output path, so it
cannot write audio even by accident. **Not seen on a phone yet** — the dev
build is where this gets eyes, and the pilot rule holds until then.

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

### Built 30 Aug — download, verify, delete, credit

`lib/recite-session.ts` owns both files: downloaded once into
`Paths.document/recite-models/` (the Phase 8 pattern), verified against
pinned byte sizes — which also catches an HTML error page saved as a model,
the failure the redirect test produced — and deletable from the storage
screen in Settings. The Tarteel row in `content/providers.ts` records the
Apache-2.0 licence and is honest about being the file's ONE runtime-fetched
entry. **Still owed before any public release, recorded in that row:**
convert from `tarteel-ai/whisper-base-ar-quran` directly and host the file
somewhere the app controls, rather than depending on a stranger's mirror
staying alive.

## Phase 6 — The classroom (repeat after the reciter)

**Opened and agreed 2 Sep 2026**, from Iyad's idea: hear an ayah in the
chosen reciter's voice, repeat it, and be corrected — *"we are not trying to
be judgemental, we are working towards correctness… correcting someone when
they pronounce a word incorrectly in class is not judging them it's
correcting them."* The register argument was made and accepted: correction a
learner walked in asking for is not judgment, and talaqqī — the tradition's
own method — has the teacher correct. **Nothing in this phase ships before
its gate (the pairs spike below) is read.**

### What the amendment changes, and what it does not

The follow mode keeps all five rules untouched. The classroom is opt-in by
entering it, and inside it:

- **Rule 1 is amended:** a word the reader passed over or substituted turns
  red, and an ayah ends with a score. Red is `passedOver` made visible
  instead of silent — the same fact the aligner always computed.
- **Rule 4 stands in its strongest form: the score evaporates.** Shown at
  the ayah's end, reset when the next try starts. No history, no chart, no
  entry anywhere — a per-attempt log would be the app's first record of how
  well someone worships. Iyad, 2 Sep: *"no persistance needed just view and
  reset when next try is started."*
- **Rules 3 and 5 stand:** audio never leaves the device or touches disk,
  and the transcript is never rendered.

### The loop

1. The reciter reads the ayah — mic closed, his words lighting as he says
   them. Turn-taking is also the echo-cancellation: the mic never hears the
   reciter, so the follower cannot track Husary instead of the reader.
2. Mic opens and the selector **leads**: it sits on the word to say *before*
   it is said. Follow mode trails the reader; the classroom answers "what do
   I read now?" — the thing Iyad noticed the current screen never tells him.
3. A match confirms the word and the selector advances.
4. A non-match holds one beat: if the next utterance matches the held word,
   it confirms — self-correction, costing nothing. If it matches the
   *following* word, the held word turns red and the selector concedes and
   moves on. No retry setting; the beat rule covers both of Iyad's cases.
5. Ayah complete → score = confirmed ÷ total, shown, gone. Below the bar the
   reciter reads the ayah again; at the bar, the next ayah.

**Strict about the reader, not the microphone.** The strict matcher keeps
the noise tolerances (ال/و attachment, split/merge repair) and drops only
the content forgiveness. Phase 0 measured boundary splits and merges as the
dominant recognition noise on *correct* recitation — without this
distinction, every artifact becomes a false accusation and the mode teaches
people to close it. And never trapped: re-saying is the normal fix, and a
tap always moves past a word the app will not yield on.

### The three rungs of "correct"

Raw waveform comparison was considered and rejected: two waveforms of the
same correct sound are numerically alien (pitch, timbre, pace), so
wave-against-wave measures whose voice it is, not whether it is right.

1. **Words** — skipped and substituted words. Certain, today, from the
   existing aligner run strict.
2. **Vowelled, ear-vs-ear.** Phase 0 recorded that the model returns *fully
   vowelled* transcripts — اللَّهُ and اللَّهَ leave the model as different
   strings, and it is our own `normalise()` that erases the difference.
   Rung 2 compares the model's transcript of the reader against the model's
   transcript **of the reciter's own clip** (obtained in the same build-time
   pass as the word timings below) — the same instrument on both sides, so
   its quirks partially cancel, and the target is what the reciter actually
   said, which handles waqf naturally: Husary rightly drops the final vowel
   at a stop, where the abstract text would mislead.
3. **True acoustic scoring** — phoneme-level, per-sound. A different model
   class and a new native runtime (whisper.cpp cannot run those); weeks of
   work; ownable in-repo only if Apache/MIT weights worth archiving exist.
   Priced and parked unless rung 2's ear proves too forgiving.

### The gate — the pairs spike (built 2 Sep, waits on recordings)

The one question the whole phase hangs on: when a word is deliberately
mispronounced, does the transcript reflect **the mouth** or silently restore
**the text**? Per error class, the MOUTH fraction decides what red may claim
and what the score means — and the meaning already agreed is *"confirmed by
the ear, as good as the ear is"* (Iyad, 2 Sep). The rig:
`.cache/recite-spike/run-pairs.sh`, takes listed in
`.cache/recite-spike/TAKES.md` — fifteen short voice memos: final-vowel
minimal pairs (نَعْبُدُ/نَعْبُدَ/نَعْبُدِ, اللَّهُ/اللَّهَ/اللَّهْ, الْحَمْدُ/ِ/َ), consonant swaps
(flat h for ح, dropped ʿayn, س for ص with plain t for ط), each beside a
correct control.

A synthetic preview (Maged TTS through the real pipeline — plumbing proof,
not evidence) suggests the pattern to expect: the consonant swaps surfaced
(الرَّهِيمِ written as heard; the ʿayn's absence written; a hybrid السراط keeping
the mouth's س while restoring the text's ط), while the vowel-ending fatha
was silently corrected back to نَعْبُدُ and a mispronounced اللَّهَ was rewritten
as لَهَا. If the human takes repeat that, rung 2 hears consonants far better
than endings, and the red mark's claims get scoped accordingly. The human
recordings decide.

### Measured 2 Sep 2026 — Iyad's fifteen takes, and the preview inverted

Recorded on his phone, ordinary room, run the same afternoon. Raw
transcripts kept in `.cache/recite-spike/out/pairs-*.txt`.

- **Vowel endings: 5 of 6 heard as said.** نَعْبُدَ, نَعْبُدِ, اللَّهَ, الْحَمْدِ and
  الْحَمْدَ all came back with the deliberate wrong ending written — including
  اللَّهُ/اللَّهَ, the exact pair the phase opened with. The one miss: the bare
  اللَّهْ was restored to اللَّهُ, so a *dropped* ending is invisible where a
  *wrong* one is not (and bare is also the legitimate waqf form, which
  ear-vs-ear against the reciter's rendition absorbs).
- **Consonant swaps: 0 of 3.** The flat h, the dropped ʿayn and the س-for-ص
  were all silently corrected to the proper letters — the model saw through
  the imitation. The exact opposite of the TTS preview, and the honest
  caveat cuts both ways: a native speaker *imitating* a convert's error may
  keep enough of the real phoneme's cues that the model rescues it, while
  the TTS run shows a truly flat ه does surface. What a genuine convert's
  mouth produces sits between those two datapoints and is not measurable
  from this room. Treat letter-quality as UNDETECTABLE until a real
  learner's recording says otherwise.
- **Controls: 5 of 6 clean.** The odd one out is a boundary artifact worth
  remembering when the strict matcher is built: an isolated إِيَّاكَ نَعْبُدُ
  gained a trailing ه (نَعْبُدُهُ) — a short lone phrase can grow a stray
  suffix, so the strict matcher's noise tolerance must not read one as a
  wrong ending.

**What the gate therefore allows red to claim:** skipped and substituted
words (certain), and wrong short-vowel endings (measured, 5/6). What it may
NOT claim: letter quality — ح against ه, the ʿayn, the emphatics stay with
the tap-a-word teacher and the reader's own ear, unmarked. The score's
honest sentence is "words and endings, confirmed by the ear."

### Companion piece — tap a word to hear it alone

The classroom's answer to "how do I fix the word it marked": tap it and the
reciter says *that word*, as often as wanted. Word timings come from running
our own model over the reciter's ayah clips with `tokenTimestamps` —
verified present in the vendored whisper.rn 0.7.4 types
(`NativeRNWhisper.d.ts:16`, 2 Sep 2026) — **at build time on the iMac**,
shipped as a small data table like the transliterations. Phones compute
nothing; nothing new leaves our repos. ⚠️ A mis-cut slice that clips the ḥ
off حمد is a *content* error, not a bug — a word-slice teaches pronunciation
the way a drawing teaches a ruling — so the pilot is one surah, checked by
ear, before any batch.

### Costs, this phase

No new native ground: same model, same mic pipeline, so the mode itself is
an OTA once its gate passes. The build-time timing pass is iMac work, per
reciter. The real cost is the same one as ever, sharpened: a red mark this
mode shows wrongly is worse than the silence the follow mode would have
kept — which is why the spike gates it.

### Built 2 Sep 2026, evening — and seen working on the phone within the hour

Iyad ran it on the preview build (OTA published by him, fingerprint
`57541e46…` matching his 30 Aug build exactly): *"this works so much better
than i expected for a first time build."* That one session is also the
proof of the one piece no desktop check could reach — the Android mic
reopening after the reciter's turn, through the re-init workaround below.
A traced dev-build session remains the tool for any tuning. What was built:

- **`alignClassroom` in `lib/recite-align.ts`** — the strict pass: selector
  leads, lookahead exactly one and it concedes, endings judged (bare always
  passes), letters never judged, the stray-ه artifact confirms unjudged, an
  ending slip re-said right is redeemed, liaison merges with the article
  elided confirm both words. Ten new `align:check` cases pin it — six of
  them verbatim from the pairs takes — and the check was flipped once to
  prove it fails. Follow-mode cases untouched.
- **`pause()`/`resume()` on the follow session** — the mic closes for the
  reciter's turn and reopens on an empty window; the model loads once.
  ⚠️ The vendored Android module's stop() releases its recorder and its
  start() then silently no-ops, so every reopen re-runs init() — read in
  the native source, recorded in a comment there, **and untestable off a
  phone: the first live run is what proves resume works.**
- **`hooks/use-recite-classroom.ts`** — the loop: reciter turn (his clip
  through its own player, mounted only for his turn, with a 12 s watchdog
  so a dead stream cannot wedge the loop) → your turn (selector on a lapis
  wash, malachite confirms, vermilion concedes, skip in the bar) → the
  evaporating score (confirmed ÷ total; ≥ 80 % advances after a beat,
  below it the reciter repeats; Once more / Next ayah override).
- **The bar** offers both modes when models are ready: *Repeat after the
  reciter* (primary) and the follow mode's *Start listening*.
- Checks: tsc clean, 20/20 align cases, i18n manifest regenerated clean,
  `expo export --platform web` renders every route, style:check clean.
- **Not built, deliberately:** per-word lighting under the reciter's voice
  and tap-a-word-to-hear — both wait on the word-timing pilot; the reciter's
  turn glows the ayah card only.

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

## After the gate — the library

**Decided 30 Aug 2026, and it has its own document: `docs/recite-library.md`.**
The follower and the session extract into Iyad's own long-term package — a
library with a programming API, never a server — once the gate passes and the
surface stops moving. That document also carries the maintenance ledger
(every engine bug and fix so far) and the takedown insurance: the exact build
tarballs are vendored in `vendor/`, and the original Tarteel weights are
archived locally with checksums. Sessions touching the recite machinery
should read it first.

## Backlog — raised, not decided

- **Rehearsal mode** (the guided walk-through of a whole prayer, phone off the
  mat) shares Phase 5's TTS-adjacent native ground; if both happen, one build.
- **The other recitations** — tashahhud, the tasbīḥāt — the day they have
  recorded audio; the aligner is text-agnostic by construction.
- **Hidden-words mode** — cover the text, recite, the highlight confirms from
  hearing alone. The natural second act of the same machinery; register needs
  care, because confirmation is one step from grading.
