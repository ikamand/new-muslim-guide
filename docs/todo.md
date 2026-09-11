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

