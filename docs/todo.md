# To do, later

Things agreed and deliberately not done yet. One line of context each, with
the file that changes, so a later session can act without re-deriving it.
Remove an item when it is done; do not leave it ticked.

## Waiting on the recordings

- **Give the prayer-words cards their play buttons.** `src/content/audio.ts`
  lines 64–71 list the takbir, opening, taʿawwudh, rukuʿ and sujud tasbih,
  rising, between-prostrations, tashahhud, salawat and taslim as commented-out
  lines waiting for a file each. Until they are recorded, every card on
  `learn/what-to-say.ts` shows the words and no "Practise this" button. When
  the clips land: uncomment the lines, run `npm run audio:manifest`, and put
  the page's third quick fact back to saying the words have recordings (it
  points at Al-Fatihah's surah for now, because that is the one text with
  audio). Added 8 Sep 2026.

## Content gaps found while building

- **A Duha page.** The prayer-times day page now draws the pause after
  sunrise, and Duha begins exactly where it ends; the app has no page that
  says so. One short reference page beside Prayed by choice, citing what
  the corpus can place. Added 10 Sep 2026.

## Before another language returns

- **Translate bullets and quick facts.** `localiseReference` in
  `src/i18n/localise.ts` translates a section's heading, body and notes, and
  `scripts/i18n-manifest.mjs` collects the same, but neither touches
  `bullets` or `quickFacts`. Nobody sees it while English is the only
  language; the day French or Spanish comes back, every list on a reference
  page would stay English without `TranslationGap` saying so. Add both to
  the two files together. Added 13 Sep 2026.

## Sources to find

Kept as written in the review sitting of 13 Sep 2026 (Iyad: "these are all
true"). When an authenticated source is found and opened, cite it here.

- **Angels, staying where you prayed.** `learn/angels.ts` says "While you sit
  in the place you prayed, before you move, they ask forgiveness for you",
  citing Bukhari 445. The narration conditions it on staying at the place of
  prayer and not breaking wudu, and does not say "before you move". Added
  13 Sep 2026.
- **Angels, one recorder on each side.** `learn/angels.ts` cites 82:10–12
  for the recorders, which says noble keepers who record and know what you
  do. "Seated on the right and on the left" is 50:17, which is not cited.
  Added 13 Sep 2026.
- **Adam, the first prophet.** `learn/the-prophets.ts` says "Adam: the first
  man and the first prophet." Nothing cited on the page says he was a
  prophet. Added 13 Sep 2026.


## The adhan, before release

Built 14 Sep 2026; the plan entry is "The adhan" in `docs/ui-redesign-plan.md`.

- **Write down where the eight recordings came from.** The `adhan*` entries
  in `src/content/audio-sources.ts` have an empty `origin`, and
  `npm run adhan:check -- --release` fails until each has one. Kuwait and
  Umm al-Quwain name no muezzin; if the source does, add it. Added 14 Sep 2026.
- **Listen to Abdul Basit's opening again.**
  `assets/adhan/opening/adhan_abdulbasit_fajr_opening.m4a`. Iyad heard all
  eight on 14 Sep: seven right, this one cut about a second short, now moved
  from 14.0 s to 15.0 s. If it is still wrong, change `openingEnd` in
  `src/content/adhan-voices.ts`, then `npm run adhan:audio -- abdulbasit-fajr`.
  Added 14 Sep 2026.
- **Stop the brief loud blip when a volume button ends the adhan.** Iyad,
  15 Sep, on build `7fecde31`: a press stops it, but for a fraction of a
  second it plays noticeably louder first, with either button. The phone's
  volume log shows no press moving the level; it shows the app giving the
  media volume back (5 to 10) a tenth of a second after the player stops,
  while the Bluetooth buds are still playing the last of it. The same order
  is in `AdhanPreview`. Built the same day: the volume comes back a second
  later (`VolumeHold.restoreLater`, the entry "Any volume button stops the
  adhan" in `docs/ui-redesign-plan.md`). Try it on the next native build: a
  volume press on the buds and on the speaker, Stop, the preview's play
  button, and music paused by the adhan resuming at its own volume. Added
  15 Sep 2026.
- **On an iPhone, the adhan's opening through a Focus.** Turn on Sound during
  Focus on a prayer's quiet sheet and let the opening come through a Focus.
  Everything else in the 14 Sep tests passed on Android on 15 Sep; this needs
  an iOS build, which does not exist yet. Added 14 Sep 2026.
- **Play Console: the foreground-service declaration** for media playback,
  with a description and a video, before the Android release. Added
  14 Sep 2026.
- **Keep the iOS openings off Android.** The expo-notifications `sounds`
  option copies the eight CAF files into the Android build too, about 950 KB
  nothing plays. An iOS-only config plugin would avoid it; the documented
  option was used because the plugin's internals move between SDKs. Added
  14 Sep 2026.
