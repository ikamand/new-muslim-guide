# Design mockups

Working files for design canvases published as Artifacts. Not shipped, not
bundled, not imported by anything in `src/`.

Each directory has a `build.mjs` that generates its artboards from the app's
REAL tokens and content — `src/constants/theme.ts` for colour and spacing,
`src/components/themed-text.tsx` for the type rungs, `src/content/` for every
Arabic string — rather than from values typed into a design file. It throws
rather than defaults when a token goes missing: a mockup quietly drawn in the
wrong green is worse than one that fails to build.

Run one with:

    node --import ./scripts/ts-resolve.mjs .design/<name>/build.mjs

The seeded canvas — the ~2.5 MB single file that is actually published — is
**built outside the repo and not committed**. It carries a whole editor, and
excluding it would mean a `.gitignore` line, which is a fingerprint source
(`bareGitIgnore`): adding one moves `runtimeVersion` and orphans every
installed build from OTA updates. Measured, not assumed. So it is regenerated
on demand instead, by running `build.mjs` above and then the `design` skill's
`seed-canvas.mjs` over the artboards it writes.
