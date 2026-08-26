/**
 * Collects every Arabic string in the app for proofreading.
 *
 * Run: `npm run arabic`
 *
 * Writes `docs/arabic-proof.csv` and a readable HTML page. The point is the
 * split it makes: texts copied verbatim out of a hadith collection carry a
 * reference and are unlikely to be mistyped, while texts written from a
 * model's memory could carry a wrong vowel mark that looks entirely normal.
 * Those are the ones worth a fluent reader's attention, and they are listed
 * first for that reason.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (p) => import(join(root, p));

const { Recitations } = await load('src/content/recitations.ts');
const { formatSource } = await load('src/content/sources.ts');
const { PHRASES } = await load('src/content/phrases.ts');
const { PILLARS } = await load('src/content/pillars.ts');
const { IMAN_PILLARS } = await load('src/content/iman.ts');
const { DUAS } = await load('src/content/duas.ts');
const { HISN, HISN_SOURCE } = await load('src/content/duas/hisn.ts');

const whenSaid = new Map(DUAS.map((d) => [d.says, d.when]));

/**
 * The citation, as one cell. Was a free-text `source` string on the recitation;
 * structured as `sources` now, so it is formatted rather than read straight.
 * Verses inherit their parent's citation, as they did before.
 */
/*
  The citation, as one cell — but only from sources the TEXT came from.

  A `quran` source marked `wordingElsewhere` is the verse that commands an act
  without supplying its words, so printing it here would say the Arabic was
  copied from a verse it is not in. That is the exact error `content:verify`
  caught in the taʿawwudh, and repeating it in the proof sheet would move the
  problem rather than fix it.
*/
const cite = (r) =>
  (r.sources ?? [])
    .filter((source) => !(source.kind === 'quran' && source.wordingElsewhere))
    .map(formatSource)
    .join('; ');
const rows = [];

for (const [key, r] of Object.entries(Recitations)) {
  const where = whenSaid.get(r) ?? r.title ?? key;
  if (r.verses) {
    r.verses.forEach((v, i) =>
      rows.push({
        where: `${r.title ?? key} — ayah ${i + 1}`,
        arabic: v.arabic,
        translit: v.transliteration,
        english: v.translation,
        source: cite(r),
        file: 'recitations.ts',
      }),
    );
  } else {
    rows.push({
      where,
      arabic: r.arabic,
      translit: r.transliteration,
      english: r.translation,
      source: cite(r),
      file: 'recitations.ts',
    });
  }
}

/**
 * Phrases and the pillar names below are hardcoded as uncopied, and stay that
 * way now that both carry `meta.sources`. The column asks "was this Arabic
 * copied verbatim from here", and a `meta` source answers a different question
 * — where the *claim* comes from. Qur'an 4:86 is why you must return the salam;
 * it is not the text of `As-salāmu ʿalaykum`. Bukhari 8 is why prayer is a
 * pillar; it is not where `الصَّلَاة` was spelled.
 *
 * One row is therefore stricter than it needs to be: `Innā li-llāhi wa innā
 * ilayhi rājiʿūn` is Qur'an 2:156 word for word and is listed here as written
 * from memory. A proofing sheet that asks for one unnecessary check is the
 * right way round; the failure that matters is the one it lets through.
 */
for (const p of PHRASES) {
  rows.push({
    where: `Phrase — ${p.said}`,
    arabic: p.arabic,
    translit: p.said,
    english: p.meaning,
    source: '',
    file: 'phrases.ts',
  });
}

for (const [label, list] of [['Pillar', PILLARS], ['Article of faith', IMAN_PILLARS]]) {
  for (const p of list) {
    rows.push({
      where: `${label} — ${p.title}`,
      arabic: p.arabic,
      translit: p.transliteration,
      english: p.summary,
      source: '',
      file: label === 'Pillar' ? 'pillars.ts' : 'iman.ts',
    });
  }
}

// Unsourced first: those are the ones a fluent reader needs to look at hardest.
rows.sort((a, b) => (a.source ? 1 : 0) - (b.source ? 1 : 0));

/**
 * Whether a string is a quotation or a term.
 *
 * The summary line used to say "N written from memory" for everything without
 * a citation, which read as N unsourced quotations and was quoted back as
 * exactly that. Most of them are not quotations at all: `الصَّلَاة` is the word
 * "prayer", `الْإِيمَانُ بِالْقَدَر` is the name of an article of faith, and
 * `أَخِي` is "my brother". Asking for a hadith reference for a noun is a
 * category error, not a missing citation, and a sheet that reports it as one
 * makes the real gaps harder to see.
 *
 * So the split is structural: what a guide has you SAY is a quotation and owes
 * a source; what the app NAMES is a term and does not.
 *
 * The one row this is stricter than it needs to be on stays stricter, for the
 * reason the note above gives: `Innā li-llāhi wa innā ilayhi rājiʿūn` is
 * Qur'an 2:156 word for word and is filed as a phrase. `npm run
 * content:verify` is where that gets resolved — it searches the published
 * texts for anything carrying no citation.
 */
/*
  Hisn al-Muslim, which nearly slipped past this sheet entirely.

  `dua-book/` renders 318 lines of Arabic straight from `duas/hisn.ts`, and
  this script collects from a hand-written list of content files — so the day
  the book shipped, the sheet still said 54 Arabic strings while the app
  displayed 372. CLAUDE.md says this lists EVERY Arabic string in the app, and
  for one commit it did not.

  Every line is `copied`: both the Arabic and the English are IslamHouse's
  published book, carried verbatim by a generator. That is the whole point of
  the column — these owe no model-written flag, and a reviewer reading this
  sheet should see them counted rather than absent.
*/
for (const occasion of HISN) {
  for (const line of occasion.lines) {
    rows.push({
      where: `Hisn al-Muslim — ${occasion.english || occasion.arabic}`,
      arabic: line.arabic,
      translit: '',
      english: line.english,
      source: `${HISN_SOURCE.publisher}, book ${HISN_SOURCE.book}${line.footnote ? ` — ${line.footnote}` : ''}`,
      file: 'duas/hisn.ts',
    });
  }
}

const TERM_FILES = new Set(['phrases.ts', 'pillars.ts', 'iman.ts']);
for (const row of rows) row.kind = TERM_FILES.has(row.file) ? 'term' : 'quotation';

const cell = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const cols = [
  ['where', 'Where it appears'],
  ['kind', 'Kind'],
  ['arabic', 'Arabic'],
  ['translit', 'Transliteration'],
  ['english', 'English'],
  ['source', 'Copied from'],
  ['file', 'File'],
];
writeFileSync(
  join(root, 'docs/arabic-proof.csv'),
  [cols.map(([, h]) => h).join(','), ...rows.map((r) => cols.map(([k]) => cell(r[k])).join(','))].join('\n') + '\n',
);

const quotations = rows.filter((r) => r.kind === 'quotation');
const uncited = quotations.filter((r) => !r.source);
const terms = rows.filter((r) => r.kind === 'term');
console.log(
  `Wrote ${rows.length} Arabic strings.\n` +
    `  ${quotations.length} quotations — ${quotations.length - uncited.length} copied from a named source, ` +
    `${uncited.length} without one.\n` +
    `  ${terms.length} terms and set expressions — names and everyday words, which owe no citation.`,
);
writeFileSync(join(root, 'docs/arabic-proof.json'), JSON.stringify(rows, null, 1));
