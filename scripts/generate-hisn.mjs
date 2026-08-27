/**
 * Hisn al-Muslim, fetched from IslamHouse and written as typed data.
 *
 * GENERATES `src/content/duas/hisn.ts`. Run with `npm run hisn`.
 *
 * ## Why a generator and not a hand-typed file
 *
 * 133 occasions and 245 supplications is not something to transcribe, and
 * CLAUDE.md is explicit that a file that size only exists legitimately if
 * every character came over the wire. The same rule that produced
 * `quran/juz30.ts` and `evidence.ts` produces this.
 *
 * ## The source's shape
 *
 * `cnt.islamhouse.com/api/v1/books/page-data/819` returns the book twelve
 * pages at a time as flat rows, each with:
 *
 *   type          'title' | 'paragraph' | 'footnote'
 *   original_text vowelled Arabic
 *   transes       { en: '…' }
 *   split_group   ties a paragraph to the footnote that cites it
 *   id            stable, and worth keeping: it is how a reviewer finds the
 *                 line again in the publisher's own text
 *
 * Titles are the occasions. Paragraphs under a title are its supplications.
 * Footnotes carry the citation as prose — "Narrated by Abu Dāwūd, 4/325, no.
 * 5095" — which is NOT parsed into a `HadithSource` here. Parsing a citation
 * out of free text is exactly the kind of confident guess this repo does not
 * make; the footnote is carried verbatim for a human to convert.
 *
 * ## What this deliberately does not do
 *
 * It does not merge with `src/content/duas.ts`. The nine the app already owns
 * carry checked citations and, in one case, bundled audio, and they are shown
 * on the day screen. This file is the BOOK, kept separate, so that a later
 * change can map one onto the other without a generated file overwriting
 * hand-checked work.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import {
  assertBracketContentsSurvive,
  bracketContents,
  assertOnlyMarkersRemoved,
  assertRepeatMatchesText,
  cleanArabic,
  cleanEnglish,
  cleanFootnote,
  countWordBrackets,
  repeatOf,
} from './hisn-clean.mjs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const BOOK = 819;
const API = 'https://cnt.islamhouse.com/api/v1/books/page-data';

async function page(n) {
  const res = await fetch(`${API}/${BOOK}?page_number=${n}&transes=en`);
  if (!res.ok) throw new Error(`page ${n}: HTTP ${res.status}`);
  return res.json();
}

const first = await page(1);
const total = first.meta.total_pages;
console.log(`Hisn al-Muslim — ${total} pages`);

const rows = [...first.data];
for (let n = 2; n <= total; n += 1) {
  const body = await page(n);
  rows.push(...body.data);
  process.stdout.write(`\r  fetched ${n}/${total}`);
}
process.stdout.write('\n');

const clean = (s) => (s ?? '').replace(/\s+/g, ' ').trim();

/*
  What the book's own punctuation proves, and what it does not.

  Hisn al-Muslim wraps quoted speech in ((…)) and Qur'an in ﴿…﴾. Those marks
  are mechanical and checkable, so they are what this records.

  They do NOT mark "this is a duʿa to say". 237 lines carry ((…)) and some of
  them are hadith matn about the VIRTUE of dhikr — "whoever sits in a gathering
  and does not remember Allah…" — which is a narration, not words to recite.
  Telling those apart is a judgement about religious content, and this script
  does not make it. `kind` says what the punctuation says; a reviewer says what
  the line is.
*/
function kindOf(arabic) {
  if (arabic.startsWith('((') || arabic.startsWith('«')) return 'quoted';
  if (arabic.startsWith('﴿')) return 'quran';
  return 'prose';
}

/*
  The book opens with its own title and a preface before the first occasion.
  Rows before the first h2 belong to neither, and are dropped rather than
  guessed at.
*/
const occasions = [];
const footnotes = new Map();
const skippedCounts = [];
let emphasis = [];
let wordBrackets = { before: 0, after: 0 };

/**
 * Clean one field and prove the cleaning removed only markers.
 *
 * `assertOnlyMarkersRemoved` is field-aware because a footnote keeps its
 * ((…)) — see `hisn-clean.mjs`. Assertion 2 rides along here: a bracket
 * holding words is supplication text, and the totals either side must match.
 */
function strip(raw, field, where) {
  const fn = field === 'arabic' ? cleanArabic : field === 'english' ? cleanEnglish : cleanFootnote;
  const out = fn(raw);
  assertOnlyMarkersRemoved(raw ?? '', out, `${where}.${field}`, field);
  assertBracketContentsSurvive(raw ?? '', out, `${where}.${field}`);
  wordBrackets.before += countWordBrackets(raw);
  wordBrackets.after += countWordBrackets(out);
  emphasis.push(...bracketContents(raw));
  return out;
}

for (const row of rows) {
  if (row.type === 'footnote') {
    footnotes.set(row.split_group, strip(row.original_text, 'footnote', `footnote ${row.id}`));
  }
}

for (const row of rows) {
  if (row.type === 'title' && row.tag !== 'h1') {
    occasions.push({
      id: row.id,
      arabic: strip(row.original_text, 'arabic', `occasion ${row.id}`),
      english: strip(row.transes?.en, 'english', `occasion ${row.id}`),
      lines: [],
    });
  } else if (row.type === 'paragraph' && occasions.length > 0) {
    const note = footnotes.get(row.split_group);
    /*
      `kind` is read from the RAW text, before the marks that carry it are
      removed. That ordering is the whole reason the strip is safe: ((…)) and
      ﴿…﴾ are the only thing on the page telling a narration from a verse, and
      dropping them is only lossless once `kind` has recorded what they said.
    */
    const kind = kindOf(clean(row.original_text));
    emphasis = [];
    const arabic = strip(row.original_text, 'arabic', `line ${row.id}`);
    const english = strip(row.transes?.en, 'english', `line ${row.id}`);
    const marked = [...new Set(emphasis)];

    // Raw, because the counts live inside brackets the strip removes.
    const { repeat, repeatText, reason } = repeatOf(row.original_text, row.transes?.en);
    if (repeat) assertRepeatMatchesText(repeat, repeatText, `line ${row.id}`);
    if (reason) skippedCounts.push(`  line ${row.id}: ${reason}`);

    occasions[occasions.length - 1].lines.push({
      id: row.id,
      kind,
      arabic,
      english,
      ...(repeat ? { repeat, repeatText } : {}),
      ...(marked.length > 0 ? { emphasis: marked } : {}),
      ...(note ? { footnote: note } : {}),
    });
  }
}

const lines = occasions.reduce((n, o) => n + o.lines.length, 0);
const byKind = occasions
  .flatMap((o) => o.lines)
  .reduce((acc, l) => ({ ...acc, [l.kind]: (acc[l.kind] ?? 0) + 1 }), {});
console.log(`${occasions.length} occasions, ${lines} lines`);
console.log(
  `  ${byKind.quoted ?? 0} quoted, ${byKind.quran ?? 0} Qur'an, ${byKind.prose ?? 0} prose`,
);

const missingEn = occasions.filter((o) => !o.english).length;
if (missingEn) console.warn(`⚠️  ${missingEn} occasions have no English title`);

if (wordBrackets.after !== 0) {
  throw new Error(
    `Assertion 2 failed: ${wordBrackets.after} bracket(s) survived the strip. All of ` +
      'them are meant to go; the words they held are checked separately by ' +
      'assertBracketContentsSurvive, which runs on every field.',
  );
}

const withRepeat = occasions.flatMap((o) => o.lines).filter((l) => l.repeat).length;
console.log(
  `  ${wordBrackets.before} word-bearing brackets removed, their words kept and checked`,
);
console.log(`  ${withRepeat} lines carry a repeat count both languages agree on`);
if (skippedCounts.length > 0) {
  console.log(`⚠️  ${skippedCounts.length} lines mention a count that was NOT recorded:`);
  skippedCounts.forEach((line) => console.log(line));
  console.log('  Each needs a human — a line with two counts is usually two dhikr.');
}

const header = `/**
 * Hisn al-Muslim — the book, as IslamHouse publishes it.
 *
 * GENERATED by \`npm run hisn\`. Do not edit by hand.
 *
 * ${occasions.length} occasions, ${lines} lines, fetched from
 * cnt.islamhouse.com book ${BOOK} with its English translation alongside. Every
 * character came over the wire; nothing here was typed or remembered.
 *
 * ## The publisher's typography is removed, and the removal is proved
 *
 * IslamHouse marks quoted speech ((…)), Qur'an ﴿…﴾ — "…" and {…} in its
 * English — and points at footnotes with [24]. Those are gone here. Nothing
 * they meant is lost: \`kind\` is read from those exact characters BEFORE they
 * are removed, and the footnote a [24] pointed at is printed directly beneath
 * the line already.
 *
 * ⚠️ Square brackets are gone too, on Iyad's instruction of 27 Aug 2026, and
 * this is the one removal that changes what the book is SAYING rather than how
 * it looks. ${wordBrackets.before} of them held words, not a footnote number,
 * and the book uses them for a wording some narrations of a hadith carry and
 * the base one does not — \`[بِسْمِ اللَّهِ]\` opens the bathroom duʿa that way.
 * Without them the app presents an optional addition as part of the duʿa. He
 * was told and decided; it is recorded here because a reader of this file
 * cannot otherwise tell that anything was ever marked.
 *
 * Only the two characters go. \`assertBracketContentsSurvive\` looks for every
 * bracket's contents in the output on every run, and
 * \`assertOnlyMarkersRemoved\` proves the strip removed markers and only
 * markers by deleting the permitted spans from the source itself and
 * comparing. A dropped letter or ḥaraka fails the build.
 *
 * \`id\` is the publisher's own row id, kept so a reviewer can find the line
 * again in their text rather than take this file's word for it.
 *
 * \`footnote\` is the book's own footnote VERBATIM — usually a citation, as in
 * "البخاري ... برقم 6314، ومسلم ... برقم 2711", but sometimes explanation
 * instead. It is deliberately not parsed into a \`HadithSource\`: turning prose
 * into a structured citation is a guess, and a wrong hadith number that looks
 * right is worse than no number at all.
 *
 * ⚠️ NOTHING HERE IS SHOWN TO A USER YET, and that is deliberate. These ${lines}
 * lines and their translations are the largest single addition to
 * \`docs/scholarly-review.md\` the app has ever had, and that pile is what gates
 * a public release. The machinery lands first; a reviewer decides what ships.
 *
 * ⚠️ The nine duʿas the app already shows live in \`src/content/duas.ts\` with
 * checked citations and, in one case, bundled audio. They are NOT merged here.
 *
 * ⚠️ \`npm run arabic\` reads this file directly — it has to, because the sheet
 * collects from a hand-written list of content files and the book shipped
 * without being on it. For one commit the sheet said 54 Arabic strings while
 * the app displayed 372.
 *
 * ⚠️ The English here is IslamHouse's, not the app's, so it is NOT in
 * \`docs/i18n-manifest.csv\` and must never be machine-translated. When French
 * and Spanish come back, fetch them the same way this English was fetched:
 * \`transes=fr\` on the same endpoint returns the publisher's own translation.
 * A model translating a duʿa is the same class of error as a model writing
 * one.
 */
`;

const body = `export type HisnLine = {
  /** IslamHouse's own row id, so a line can be found again in their text. */
  id: number;
  /**
   * What the book's punctuation says this line is — NOT what it means.
   *
   * \`quoted\` is ((…)), which the book uses for quoted speech. That covers
   * supplications AND narrations about the virtue of dhikr, which are not
   * words to recite. \`quran\` is ﴿…﴾. Everything else is \`prose\`.
   *
   * Deciding which \`quoted\` lines are duʿas a reader should say is a
   * judgement about religious content, and it belongs to a reviewer.
   */
  kind: 'quoted' | 'quran' | 'prose';
  arabic: string;
  english: string;
  /**
   * How many times the book says to say it.
   *
   * Read from the book's own prose — \`(ثلاثَ مرَّاتٍ)\` — and emitted ONLY when
   * the Arabic and IslamHouse's English are parsed independently and produce
   * the same single number. A line with two counts in it, like "(Ten times) …
   * or (once when feeling lazy)", yields nothing and is reported by the
   * generator instead, because it is usually two dhikr sharing a row.
   *
   * This is reading what is written, which is why it is generated. Whether a
   * line is something a person says AT ALL is the opposite kind of question
   * and is not answered here — see \`annotations.ts\`.
   */
  repeat?: number;
  /** The phrase \`repeat\` was read from, kept so the number can be checked. */
  repeatText?: string;
  /**
   * Words the book had in square brackets, which the strip removed.
   *
   * The brackets marked a wording some narrations of a hadith carry and the
   * base one does not — \`[بِسْمِ اللَّهِ]\`, \`[ثلاثاً]\`, \`[i.e., footstool]\`.
   * Removing them was Iyad's call; carrying the strings here is what lets a
   * screen still show that those words were marked, instead of silently
   * folding an optional addition into the duʿa.
   *
   * Cleaned exactly as the line is, so each is a substring of \`arabic\` or
   * \`english\` and a renderer can split on it.
   */
  emphasis?: readonly string[];
  /**
   * The book's footnote for this line, verbatim and unparsed.
   *
   * Usually a citation — "البخاري ... برقم 6314، ومسلم ... برقم 2711" — but
   * NOT always: some footnotes are explanation rather than reference. Called
   * \`footnote\` and not \`citation\` for exactly that reason. Turning either
   * kind into a structured \`HadithSource\` is a guess this script does not
   * make.
   */
  footnote?: string;
};

export type HisnOccasion = {
  id: number;
  arabic: string;
  english: string;
  lines: readonly HisnLine[];
};

export const HISN: readonly HisnOccasion[] = ${JSON.stringify(occasions, null, 2)};

export const HISN_SOURCE = {
  book: ${BOOK},
  publisher: 'IslamHouse',
  url: 'https://cnt.islamhouse.com/api/v1/books/page-data/${BOOK}',
} as const;
`;

const out = join(root, 'src/content/duas/hisn.ts');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, header + '\n' + body, 'utf8');
console.log(`Wrote ${out}`);
