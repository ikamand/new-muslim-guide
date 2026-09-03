# Writing register

The rules `npm run style:check` enforces on every model-written English string
in `src/content/` and `src/i18n/ui.ts`. Hadith, Qur'an, Hisn al-Muslim and
their translations are publishers' text and are not touched by any of this.

Written 3 Sep 2026, after Iyad read the Friday page and asked where "No."
came from. The audit that followed found the prose accurate and warm, and
machine-sounding for a small set of habits repeated on every page. The habits
are listed here so the check can name them; the check exists because a
sentence in a document stops nothing.

## What a page sounds like

Plain, direct, one idea per sentence. A knowledgeable friend explaining
something at the kitchen table, not an essayist. Every fact and every
citation stays exactly where it was; only the English moves.

## The rules the check fails on

- **No em-dash as the hinge of a sentence.** ` — ` was doing the work of
  a full stop, a colon or a comma in 239 places. Write the sentence.
  (Collection titles like "Ādam — After the mistake" are a name and a
  gloss, not a sentence, and that file is not checked.)
- **Bold markers come in pairs.** `**term**` renders as bold anywhere in a
  body, bullet, aside or note since 3 Sep. An odd count prints an asterisk.
- **No file paths, no CLAUDE.md, no backticked identifiers** in a string a
  reader can see. A source note once said "`learn/why-people-differ.ts` is
  the page about those" inside the evidence sheet.
- **No revision history in reader text.** "This note used to say…" is a
  changelog entry. Eight of them sat inside "Learn more" on rulings pages.
  The git log holds that story; the reader gets the current answer.
- **No reviewer language in source notes.** "Claiming no textual authority"
  became "not a ruling". A note explains where a sentence comes from in
  words a beginner can read.
- **One spelling per name.** Running prose uses Dhuhr, ʿAsr, ʿIsha,
  Al-Fatihah, Mecca, salam, khutbah, adhan, janazah, takbir, iqamah,
  Muharram, Shawwal, ʿAshuraʾ. The check lists the variants it fails on.
  Transliterations of recited text (`said`, `transliteration`) keep their
  macrons because they are pronunciation guides; a taught term presented
  as vocabulary (Kibr, Riyāʾ, Walī) keeps its diacritics too.
- **No capitals for emphasis.** ONE, KIND, AFTER. Stress belongs in the
  sentence's shape.

## Habits the check cannot see

Handled by hand in the 3 Sep sweep, and worth watching for in anything new:

- **The epigram closer.** "That is the whole of it." "Which is exactly the
  point." A section ending on a one-line flourish reads as written for
  effect. End on the useful sentence.
- **The reversal.** "It is not X. It is Y." Fine once a page. Not once a
  paragraph.
- **The app talking about itself.** "This page exists because…", "which is
  why this page will not…". The app may say what it does and does not do
  ("This app does not give the date of Eid") because that is useful. It does
  not narrate its own editorial reasoning.
- **Reassurance by repetition.** "Nobody is watching / counting / grading /
  minds" appeared 26 times. Say it where it is true and needed, once.
- **Long sentences.** Past about 40 words a reader on a phone loses the
  subject. Split.
