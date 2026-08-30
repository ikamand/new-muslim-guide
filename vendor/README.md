# Vendored dependencies — the recite engine's insurance

**Why this directory exists:** the "Recite with me" feature stands on two npm
packages and two model families published by people who owe us nothing. Iyad's
instruction, 30 Aug 2026: *"lets take all steps necessary now incase original
repo is taken down."* This directory is the in-repo half of that insurance —
small enough to commit, and enough to rebuild the app if npm or the upstream
repos vanish. The large model files live in the local archive at
`~/Documents/recite-archive/` (23 files, checksummed) until they move to
hosting the app controls — see `docs/recite-library.md` for the whole picture.

| File | What it is | Licence |
|---|---|---|
| `whisper.rn-0.7.4.tgz` | The exact npm tarball the app builds with. **Contains the complete whisper.cpp/ggml engine sources** (206 native files), so this one file preserves the entire buildable stack, not just the JS binding. | MIT |
| `fugood-react-native-audio-pcm-stream-1.1.4.tgz` | The mic PCM stream module the realtime pipeline needs. | MIT |
| `ggml-silero-v6.2.0.bin` | The Silero VAD model (885 KB) that cuts audio at silences. Small enough to live here; the app downloads its copy at runtime. | MIT (Silero VAD) |
| `SHA256SUMS` | Checksums for everything above. | — |

**To restore from here if npm is gone:** point `package.json` at the tarballs —
`"whisper.rn": "file:vendor/whisper.rn-0.7.4.tgz"` — and run `npm install`.
The `patches/whisper.rn+0.7.4.patch` still applies via postinstall.

**Do not update these silently.** A new upstream version gets a new tarball
beside a new patch file, deliberately, after the app has tested it — this
directory pins what is KNOWN to work, and its whole value is that it does not
drift.
