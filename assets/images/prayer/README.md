# Prayer posture illustrations

Ten PNGs, one per posture. Drop a file here, then uncomment its line in
`src/content/prayer-images.ts` — nothing else is needed.

| File | The position |
|---|---|
| `standing.png` | Qiyam — standing, hands folded |
| `takbir.png` | Hands raised to the ears |
| `rising.png` | Iʿtidal — standing again, arms at the sides |
| `bowing.png` | Rukuʿ |
| `prostrating.png` | Sujud |
| `sitting.png` | The sitting between the prostrations |
| `tashahhud.png` | Sitting, index finger raised |
| `taslim-right.png` | Head turned to the right, giving the greeting |
| `taslim-left.png` | Head turned to the left, giving it again |
| `washing.png` | Wudu — a tap and water, not a body |

The names are the `Posture` values in `src/content/types.ts`. They have to match
exactly, and a wrong one fails the typecheck rather than showing nothing.

## What the files need to be

**Transparent background.** The app is dark-first — near-black `#0C110F` — and
also has a light theme at `#FBF9F4`. Anything drawn on white will read as a
white sticker stuck on a dark screen.

**Legible at 68px.** That is the tile they render into on a prayer step. Detail
finer than a few pixels disappears; the silhouette is what carries the meaning.

**Around 210×210, one file.** React Native picks up `@2x`/`@3x` variants if they
exist, but at this size a single 3× file is enough.

## Two pairs that have to be distinguishable

**`standing` and `rising`** are the same body in the same place. The only
difference is the hands — folded for qiyam, at the sides for iʿtidal — and it is
the thing beginners most often get wrong.

**`taslim-right` and `taslim-left`** are the same body again, and only the head
moves. These two are worth drawing from the front or three-quarter even though
the rest are in profile: a head turning is invisible on a figure already side-on,
because the whole difference hides behind the shoulder. The built-in fallback
gives up on showing it and draws an arrow instead, which is exactly the kind of
thing a real illustration should replace.

If either pair is hard to tell apart at a glance, they are not doing their job.

## Review

⚠️ A drawing teaches a ruling. Which arm, how far the hands go, where the gaze
falls — that is content and needs the same review as a sentence about how to
pray. Tracked in `docs/scholarly-review.md`.
