/**
 * Generates the audio manifest — the sheet of every clip the app expects.
 *
 * Run: `npm run audio:manifest`   Check only: `npm run audio:manifest -- --check`
 *
 * Read straight out of `src/content/`, never maintained by hand, because a
 * hand-kept spreadsheet and the code disagree within a week and the sheet is
 * what a reciter works from. `scripts/ts-resolve.mjs` loads the TypeScript, so
 * the recitations are the real objects rather than a regex's guess at them.
 *
 * It used to rely on Node's own type-stripping, which resolves no extensions —
 * so the first extensionless value import anywhere in the content graph broke
 * it. The loader the other content scripts already used does resolve them.
 *
 * `--check` exits non-zero if the committed manifest is out of date, so a new
 * duʿa cannot land without its rows.
 */
import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { Recitations } = await import(join(root, 'src/content/recitations.ts'));
const { getAudioSource } = await import(join(root, 'src/content/audio-sources.ts'));

/** Ids with a live (uncommented) require in the audio map. */
function wiredIds() {
  const src = readFileSync(join(root, 'src/content/audio.ts'), 'utf8');
  const ids = new Set();
  for (const line of src.split('\n')) {
    const m = line.match(/^\s*'?([a-z0-9-]+)'?\s*:\s*require\(/);
    if (m) ids.add(m[1]);
  }
  return ids;
}

/** Files actually sitting in assets/audio, whatever their extension. */
function filesOnDisk() {
  const dir = join(root, 'assets/audio');
  if (!existsSync(dir)) return new Map();
  return new Map(readdirSync(dir).filter((f) => !f.startsWith('.')).map((f) => [f.replace(/\.[^.]+$/, ''), f]));
}

/**
 * Which step says each recitation. Regex over the guides rather than importing
 * them — they import recitations without a file extension, which Node will not
 * resolve. The step's own `title` is the nearest one above the reference.
 */
function usageByKey() {
  const usage = {};
  for (const [file, guide] of [['prayers.ts', 'Prayer'], ['wudu.ts', 'Wudu']]) {
    const src = readFileSync(join(root, 'src/content', file), 'utf8');
    for (const m of src.matchAll(/Recitations\.([A-Za-z]+)/g)) {
      const before = src.slice(0, m.index);
      // Titles come single-quoted or as template literals; a rakʿah number
      // interpolated into one is noise in a sheet, so it collapses to an ellipsis.
      const title = [...before.matchAll(/title:\s*(?:'([^']+)'|`([^`]+)`)/g)].pop();
      const name = title ? (title[1] ?? title[2]).replace(/\$\{[^}]+\}/g, '…') : null;
      const where = name ? `${guide} — ${name}` : guide;
      (usage[m[1]] ??= new Set()).add(where);
    }
  }
  return usage;
}

const wired = wiredIds();
const onDisk = filesOnDisk();
const usage = usageByKey();

function statusFor(id) {
  const hasFile = onDisk.has(id);
  const isWired = wired.has(id);
  if (hasFile && isWired) return 'Ready';
  if (hasFile && !isWired) return 'File present, not wired';
  if (!hasFile && isWired) return 'BROKEN — wired with no file';
  return 'Not recorded';
}

const rows = [];
for (const [key, recitation] of Object.entries(Recitations)) {
  const where = usage[key] ? [...usage[key]].join('; ') : 'Not used in a guide';
  const parts = recitation.verses
    ? recitation.verses.map((v, i) => ({ id: v.audioId, label: `Ayah ${i + 1}`, text: v }))
    : recitation.audioId
      ? [{ id: recitation.audioId, label: '', text: recitation }]
      : [];

  for (const part of parts) {
    const source = getAudioSource(part.id);
    rows.push({
      file: onDisk.get(part.id) ?? `${part.id}.mp3`,
      id: part.id,
      recitation: recitation.title ?? key,
      part: part.label,
      usedIn: where,
      status: statusFor(part.id),
      source: source ? `${source.reciter}${source.detail ? ` — ${source.detail}` : ''}` : 'To be commissioned',
      licence: source?.licence ?? '—',
      arabic: part.text.arabic.replace(/\n/g, ' '),
      transliteration: part.text.transliteration.replace(/\n/g, ' '),
      translation: part.text.translation.replace(/\n/g, ' '),
    });
  }
}

const COLUMNS = [
  ['file', 'File'], ['id', 'Audio ID'], ['recitation', 'Recitation'], ['part', 'Part'],
  ['usedIn', 'Used in'], ['status', 'Status'], ['source', 'Source'], ['licence', 'Licence'],
  ['arabic', 'Arabic'], ['transliteration', 'Transliteration'], ['translation', 'Translation'],
];

const csvCell = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const csv = [
  COLUMNS.map(([, h]) => h).join(','),
  ...rows.map((r) => COLUMNS.map(([k]) => csvCell(r[k])).join(',')),
].join('\n') + '\n';

const counts = rows.reduce((acc, r) => ({ ...acc, [r.status]: (acc[r.status] ?? 0) + 1 }), {});
const summary = Object.entries(counts).map(([s, n]) => `${n} ${s.toLowerCase()}`).join(', ');

const md = `# Audio manifest

**${rows.length} clips — ${summary}.**

Generated by \`npm run audio:manifest\` from \`src/content/\`. Do not edit by hand;
regenerate it. Every new duʿa or recitation adds its rows automatically once it
has an \`audioId\`.

| File | Recitation | Part | Used in | Status | Source |
|---|---|---|---|---|---|
${rows.map((r) => `| \`${r.file}\` | ${r.recitation} | ${r.part || '—'} | ${r.usedIn} | ${r.status} | ${r.source} |`).join('\n')}

The full sheet, with the Arabic, transliteration and translation of every clip,
is \`docs/audio-manifest.csv\` — open that in Numbers, Excel or Sheets.
`;

const csvPath = join(root, 'docs/audio-manifest.csv');
const mdPath = join(root, 'docs/audio-manifest.md');

if (process.argv.includes('--check')) {
  const stale = [csvPath, mdPath].filter(
    (p) => !existsSync(p) || readFileSync(p, 'utf8') !== (p === csvPath ? csv : md),
  );
  if (stale.length) {
    console.error(`Audio manifest is out of date. Run: npm run audio:manifest`);
    process.exit(1);
  }
  console.log(`Audio manifest up to date — ${rows.length} clips.`);
} else {
  writeFileSync(csvPath, csv);
  writeFileSync(mdPath, md);
  console.log(`Wrote ${rows.length} clips — ${summary}.`);
}

const broken = rows.filter((r) => r.status.startsWith('BROKEN'));
if (broken.length) {
  console.error(`\n${broken.length} clip(s) wired with no file — the bundle will fail:`);
  for (const r of broken) console.error(`  ${r.id}`);
  process.exit(1);
}
