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

const whenSaid = new Map(DUAS.map((d) => [d.says, d.when]));

/**
 * The citation, as one cell. Was a free-text `source` string on the recitation;
 * structured as `sources` now, so it is formatted rather than read straight.
 * Verses inherit their parent's citation, as they did before.
 */
const cite = (r) => (r.sources ?? []).map(formatSource).join('; ');
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

const cell = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const cols = [
  ['where', 'Where it appears'],
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

const unsourced = rows.filter((r) => !r.source).length;
console.log(`Wrote ${rows.length} Arabic strings — ${unsourced} written from memory, ${rows.length - unsourced} copied from a collection.`);
writeFileSync(join(root, 'docs/arabic-proof.json'), JSON.stringify(rows, null, 1));
