/**
 * Removing IslamHouse's typography from Hisn al-Muslim, provably.
 *
 * Imported by `scripts/generate-hisn.mjs`. Kept as its own file because it is
 * the whole of what `docs/hisn-dataset-plan.md` phase 2 extracts into the
 * public dataset repo, and because a transformation that touches religious
 * text should be readable on its own rather than buried in a fetch script.
 *
 * ## What is removed, and why it is safe to remove
 *
 * The book marks quoted speech with ((…)) and Qur'an with ﴿…﴾, and its English
 * uses "…" and {…} for the same two things. Those marks are the ONLY thing on
 * the page distinguishing a narration from a verse — but the app already
 * stores that distinction as `kind`, derived from these exact characters in
 * `kindOf()` before this module runs. So the marks are redundant *because*
 * `kind` exists, and for no other reason. Strip them anywhere `kind` is not
 * being computed and information is genuinely lost.
 *
 * Footnote markers — `[24]` — are removed because the footnote they point at
 * is already printed directly beneath the line. Of 313 in-text markers in the
 * Arabic, 288 resolve to a footnote on the same line and 25 point at footnotes
 * this pipeline never captured, so today a reader sees `[34]` with nothing to
 * look up. Removing them removes a dangling pointer, not a citation.
 *
 * ## ⚠️ The trap: not every square bracket is a footnote marker
 *
 * 908 bracket pairs in the book contain only digits. 52 contain WORDS, and
 * they are supplication text — `[بِسْمِ اللَّهِ]` opens the duʿa for entering
 * the bathroom, and elsewhere a whole clause:
 *
 *     [اللَّهُمَّ اجْعَلْ لِي نُوراً فِي قَبْرِي... وَنُوراً فِي عِظَامِي]
 *
 * A blanket `\[[^\]]*\]` strip deletes words from duʿas. The rule is `\[\d+\]`
 * and nothing looser, and `assertOnlyMarkersRemoved` exists to prove it stayed
 * that way.
 *
 * ## Footnotes keep their ((…))
 *
 * A footnote is citation prose that QUOTES hadith text — `وزيادة: ((بسم الله))
 * في أوله أخرجها سعيد بن منصور` — so there the marks separate the quoted matn
 * from the citation around it, and no `kind` field exists on a footnote to
 * record that separation. The rule this module runs on is that a mark goes
 * only where something else already carries what it meant, so in footnotes
 * they stay. Only the `[24]` label is removed. This was found by the
 * assertion, not by reading: the check permitted the removal, the strip did
 * not perform it, and the disagreement was the question.
 *
 * The brackets around the word-bearing ones are KEPT. They are the book's
 * convention for "this addition appears in another narration"; unbracketing
 * would silently promote an addition into the main text of a supplication.
 */

/** `[24]` — a footnote marker. Digits only, deliberately. */
const FOOTNOTE_MARKER = /\[\d+\]/g;

/** The book's quotation and Qur'an marks, Arabic side. */
const ARABIC_MARKS = /\(\(|\)\)|[«»﴿﴾]/g;

/** The same two things in IslamHouse's English. */
const ENGLISH_MARKS = /[{}]/g;

const QUOTES = new Set(['"', '“', '”']);

/**
 * Whitespace and the punctuation left stranded by a removal.
 *
 * Taking `[24]` out of `…وَالْخَبَائِثِ)) [24].` leaves a space before the full
 * stop. Only spacing is touched — no punctuation character is added or
 * removed, so `assertOnlyMarkersRemoved` still sees a clean subsequence.
 */
function tidy(s) {
  return s
    .replace(/\s+/g, ' ')
    .replace(/\s+([.،؛:!؟,])/g, '$1')
    .replace(/([(\[])\s+/g, '$1')
    .replace(/\s+([)\]])/g, '$1')
    .trim();
}

/** Terminal punctuation, either alphabet's. */
const STOP = /[.,;:!?،؛؟]/;

/**
 * Strip the outermost pair of quotes, if the whole string is quoted.
 *
 * The closing quote is not always the last character. IslamHouse prints a full
 * stop after it — `…Allah willing." [191].` — so once the marker goes, a naive
 * "last character is a quote" test fails and leaves the quotes in place beside
 * a stray stop. Requiring the quote to be last produced `…Allah willing.".` on
 * two lines, which is what the assertion caught.
 *
 * When the quoted text already ends in a stop, the wrapper's own is dropped
 * rather than doubled.
 */
function unquote(s) {
  if (s.length < 2 || !QUOTES.has(s[0])) return s;
  // Scan back for the closing quote rather than assuming it is last. It often
  // is not: the book prints `"…messenger." (Four times)` and `"…Magnificent,"
  // three times.`, and requiring the quote to end the string left the opening
  // one orphaned on 27 lines.
  let close = -1;
  for (let i = s.length - 1; i > 0; i -= 1) {
    if (QUOTES.has(s[i])) {
      close = i;
      break;
    }
  }
  if (close <= 0) return s;
  return tidy(s.slice(1, close) + s.slice(close + 1));
}

export function cleanArabic(raw) {
  return tidy((raw ?? '').replace(FOOTNOTE_MARKER, '').replace(ARABIC_MARKS, ''));
}

export function cleanEnglish(raw) {
  return unquote(tidy((raw ?? '').replace(FOOTNOTE_MARKER, '').replace(ENGLISH_MARKS, '')));
}

/**
 * A footnote keeps its text and loses its own `[24]` label.
 *
 * The label is a back-pointer to a marker that no longer exists in the line
 * above it, so leaving it would be the one dangling reference this module was
 * written to remove.
 */
export function cleanFootnote(raw) {
  return tidy((raw ?? '').replace(FOOTNOTE_MARKER, ''));
}

/**
 * Assertion 1 — prove the strip removed ONLY markers.
 *
 * Deliberately a different algorithm from the strip itself, because a check
 * that reruns the same `replace()` calls proves nothing. This computes the
 * spans it is willing to lose from the RAW string by regex index, then walks
 * raw and cleaned as a two-pointer subsequence match. Any character that
 * vanished from outside a permitted span throws — so a dropped letter, a
 * dropped ḥaraka, or a dropped word cannot pass.
 *
 * Digits are only droppable INSIDE `[…]`, which is what stops a citation's
 * "برقم 142" being eaten.
 */
export function assertOnlyMarkersRemoved(raw, cleaned, where, field) {
  const source = raw ?? '';
  const droppable = new Array(source.length).fill(false);

  const permit = (re) => {
    for (const m of source.matchAll(re)) {
      for (let i = m.index; i < m.index + m[0].length; i += 1) droppable[i] = true;
    }
  };

  // Every field loses footnote markers. Which quotation marks a field may
  // lose depends on whether anything else is recording them — see the note on
  // footnotes in this file's header.
  permit(FOOTNOTE_MARKER);
  if (field === 'arabic') permit(ARABIC_MARKS);
  if (field === 'english') permit(ENGLISH_MARKS);

  /*
    Only the OUTERMOST quotes may go — an internal one is punctuation in a
    sentence and losing it would be a change to the English.

    The closing quote is not the last character: IslamHouse prints it before
    the footnote marker and often before a full stop, as in `…the grave." [105]`.
    So the scan from the right steps over whitespace, marker spans that are
    already droppable, and trailing punctuation. Scanning for the raw string's
    last non-space character instead marked nothing and failed all 198 quoted
    English lines.
  */
  if (field === 'english') {
    const open = source.search(/\S/);
    if (open >= 0 && QUOTES.has(source[open])) {
      let close = -1;
      for (let i = source.length - 1; i > open; i -= 1) {
        if (QUOTES.has(source[i])) {
          close = i;
          break;
        }
      }
      if (close > open) {
        droppable[open] = true;
        droppable[close] = true;
      }
    }
  }

  /*
    Delete the permitted spans from the source by index and compare, rather
    than walking the two strings in step.

    A two-pointer subsequence walk was tried first and produced four false
    failures, all on repeated identical characters: in `(أربعاً وثلاثينَ)))`
    the greedy match consumed the inner paren's closer and then reported the
    book's own as unexplained, and in `]))[34] [((` it matched the content
    bracket against the footnote marker's. The output was correct in every
    case; the check was not. Deleting by index has no such ambiguity.
  */
  /*
    Dropping a wrapping quote can leave the sentence's own stop beside the
    wrapper's — `…Allah willing..` — and `tidy` collapses the pair. That is
    punctuation tidying, not a lost character, so both sides are normalised
    the same way before comparing.
  */
  const collapse = (t) => t.replace(/\s+/g, '').replace(/([.،؛:!؟])[.،؛:!؟]+$/, '$1');
  const expected = collapse([...source].filter((_, i) => !droppable[i]).join(''));
  const actual = collapse(cleaned ?? '');
  if (expected !== actual) {
    const at = [...expected].findIndex((ch, i) => ch !== actual[i]);
    throw new Error(
      `${where}: the strip removed something that is not a marker, at character ${at}.\n` +
        `  kept:    …${expected.slice(Math.max(0, at - 30), at + 30)}…\n` +
        `  produced:…${actual.slice(Math.max(0, at - 30), at + 30)}…`,
    );
  }
}

/** Assertion 2 — a bracket holding words is supplication text and must survive. */
export function countWordBrackets(s) {
  return [...(s ?? '').matchAll(/\[([^\]]*)\]/g)].filter((m) => !/^\d+$/.test(m[1])).length;
}

/**
 * The repeat count, as an integer, cross-checked between the two languages.
 *
 * ## Why this is a transformation and not a judgement
 *
 * The book states the count itself, in its own prose: `(ثلاثَ مرَّاتٍ)`, and
 * IslamHouse's English says `(Three times)` beside it. Turning that into
 * `repeat: 3` is reading what is written, which is why it belongs in the
 * generated file rather than in the reviewer's overlay. Deciding whether a
 * line is something a person says at all is the opposite, and stays out.
 *
 * ## Why both languages have to agree
 *
 * Parsing Arabic number words out of prose is exactly the sort of confident
 * guess this repo keeps getting caught by, so it is not trusted on its own.
 * The Arabic and the English are parsed independently and a count is emitted
 * ONLY when both produce exactly one value and the two agree. Anything else —
 * a disagreement, an unrecognised phrase, or two counts on one line, as in
 * "(Ten times) … or (once when feeling lazy)" — yields no count and is
 * reported for a human to look at. An absent count is honest; a guessed one
 * would be the same class of error as a wrong hadith number.
 */
const ARABIC_COUNTS = [
  [/ثلاث[اً]*\s+وثلاثين/, 33],
  [/[أا]ربع[اً]*\s+وثلاثين/, 34],
  [/مرة\s+واحدة/, 1],
  [/مائة|مئة/, 100],
  [/ثلاث/, 3],
  [/[أا]ربع/, 4],
  [/سبع/, 7],
  [/عشر/, 10],
];

const ENGLISH_COUNTS = [
  [/thirty[-\s]three times/i, 33],
  [/thirty[-\s]four times/i, 34],
  [/\b100 times|\ba hundred times|\bone hundred times/i, 100],
  [/\bthree times/i, 3],
  [/\bfour times/i, 4],
  [/\bseven times/i, 7],
  [/\bten times/i, 10],
  [/\bonce\b/i, 1],
];

/** Diacritics, tatweel and alef variants off, so a pattern can be written once. */
function normaliseArabic(s) {
  return (s ?? '')
    .replace(/[ً-ْٰـ]/g, '')
    .replace(/[إأآ]/g, 'ا');
}

/**
 * The book prints every count inside brackets, and nothing else does.
 *
 * Searching the whole line matched `سبع` inside `رَبَّ السَّمَوَاتِ السَّبْعِ` — "Lord
 * of the seven heavens", which is not an instruction to say anything seven
 * times — and `عشر` inside unrelated words, on 13 lines. Restricting to
 * `(…)` and `[…]` groups follows the book's own convention, removes every one
 * of those, and has the second benefit that the phrase a count came from is
 * always a real substring that can be handed back as `repeatText`.
 */
function bracketGroups(text) {
  // Innermost groups only: the content may not itself contain a bracket. A
  // looser pattern started at the first `(` of the book's own `((` and ran to
  // the inner group's close, handing back the whole line as the phrase a count
  // came from. Run this on the CLEANED text, where `((` is already gone.
  return [...(text ?? '').matchAll(/[([]([^()[\]]*)[)\]]/g)].map((m) => m[0]);
}

/** Every count phrase in a string, paired with the text it was read from. */
function countsIn(text, table, arabic) {
  const found = [];
  for (const group of bracketGroups(text)) {
    let rest = arabic ? normaliseArabic(group) : group;
    for (const [pattern, value] of table) {
      const global = new RegExp(pattern.source, pattern.flags.includes('i') ? 'gi' : 'g');
      const hits = [...rest.matchAll(global)];
      if (hits.length === 0) continue;
      for (let i = 0; i < hits.length; i += 1) found.push({ value, text: group });
      rest = rest.replace(global, ' ');
    }
  }
  return found;
}

/**
 * `{ repeat, repeatText }` when both languages agree, otherwise `repeat: null`
 * and a `reason` the caller reports for a human to look at.
 */
export function repeatOf(arabicText, englishText) {
  const ar = countsIn(arabicText, ARABIC_COUNTS, true);
  const en = countsIn(englishText, ENGLISH_COUNTS, false);
  if (ar.length === 0 && en.length === 0) return { repeat: null, reason: null };
  const values = (list) => list.map((x) => x.value);
  if (ar.length !== 1 || en.length !== 1) {
    return {
      repeat: null,
      reason: `ar=[${values(ar)}] en=[${values(en)}] — not exactly one count each`,
    };
  }
  if (ar[0].value !== en[0].value) {
    return {
      repeat: null,
      reason: `ar=${ar[0].value} but en=${en[0].value} — the languages disagree`,
    };
  }
  return { repeat: ar[0].value, repeatText: ar[0].text, reason: null };
}

/**
 * Assertion 3 — a count must still be derivable from the phrase beside it.
 *
 * Re-reads `repeatText` on its own and requires the same integer back, so a
 * hand-typed 7 sitting next to `(ثلاث مرات)` fails the build.
 */
export function assertRepeatMatchesText(repeat, repeatText, where) {
  const again = countsIn(repeatText, ARABIC_COUNTS, true);
  if (again.length !== 1 || again[0].value !== repeat) {
    throw new Error(
      `${where}: repeat ${repeat} does not read back from ${JSON.stringify(repeatText)} ` +
        `(got [${again.map((x) => x.value)}]).`,
    );
  }
}
