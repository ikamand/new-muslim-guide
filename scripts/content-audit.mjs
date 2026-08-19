/**
 * Reports what the app claims and what backs it up.
 *
 * Run: `npm run content:audit`   Fail on gaps: `npm run content:audit -- --strict`
 *
 * The one thing a reader cannot check by looking at the screen is whether the
 * content is true. This is the closest a script can get: it cannot tell you a
 * ruling is right, but it can tell you which claims cite nothing, which
 * narrations come from a collection that carries weak ones without saying how
 * this one is graded, and which pointers lead nowhere.
 *
 * Two exit behaviours, deliberately. By default it reports and exits 0, because
 * missing metadata is a gradual-adoption state rather than a fault. It exits
 * non-zero regardless for the two things that are faults: a narration graded
 * `daif`, which contradicts the app's stated evidence bar, and a
 * `relatedContent` pointer that resolves to nothing.
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (p) => import(join(root, p));

// Via catalog.ts rather than index.ts: index pulls in the audio map, whose
// `require` calls only Metro resolves.
const { CATALOG, danglingRefs } = await load('src/content/catalog.ts');
const { formatSource, isAuthenticated, HADITH_COLLECTIONS } = await load('src/content/sources.ts');
const { GUIDES } = await load('src/content/guides.ts');
const { REFERENCES } = await load('src/content/references.ts');
const { PILLARS } = await load('src/content/pillars.ts');
const { IMAN_PILLARS } = await load('src/content/iman.ts');
const { DUAS } = await load('src/content/duas.ts');

const strict = process.argv.includes('--strict');
const label = (entry) => `${entry.kind}:${entry.id}`;
const pad = (text, width) => text.padEnd(width);

const out = [];
const say = (line = '') => out.push(line);

say(`Content audit — ${CATALOG.length} entries\n`);

/* ---------- coverage ---------- */

const withMeta = CATALOG.filter((entry) => entry.meta);
const withSources = CATALOG.filter((entry) => entry.sources.length > 0);

say('Coverage');
say(`  metadata   ${withMeta.length}/${CATALOG.length}`);
say(`  sources    ${withSources.length}/${CATALOG.length}`);
say();

/* ---------- by kind ---------- */

const kinds = [...new Set(CATALOG.map((entry) => entry.kind))].sort();
say('By kind');
for (const kind of kinds) {
  const group = CATALOG.filter((entry) => entry.kind === kind);
  const meta = group.filter((entry) => entry.meta).length;
  const sourced = group.filter((entry) => entry.sources.length > 0).length;
  say(`  ${pad(kind, 10)} ${pad(String(group.length), 4)} meta ${pad(`${meta}`, 4)} sourced ${sourced}`);
}
say();

/* ---------- unsourced ---------- */

const unsourced = CATALOG.filter((entry) => entry.sources.length === 0);
if (unsourced.length) {
  say(`Citing nothing yet (${unsourced.length})`);
  say('  Not necessarily wrong — much of this is method or ordinary explanation,');
  say('  which needs a `general` source rather than a narration. It needs saying so.');
  for (const entry of unsourced) say(`    ${pad(label(entry), 26)} ${entry.title}`);
  say();
}

/* ---------- narrations ---------- */

const allSources = CATALOG.flatMap((entry) =>
  entry.sources.map((source) => ({ entry, source })),
);
const narrations = allSources.filter(({ source }) => source.kind === 'hadith');

const weak = narrations.filter(({ source }) => source.grading === 'daif');
const ungraded = narrations.filter(
  ({ source }) =>
    !HADITH_COLLECTIONS[source.collection].authenticThroughout && !source.grading,
);

say(`Narrations — ${narrations.length}`);
if (ungraded.length) {
  say(`  ${ungraded.length} from a collection that also carries weak narrations, with no grading:`);
  for (const { entry, source } of ungraded) {
    say(`    ${pad(formatSource(source), 26)} ${entry.title}`);
  }
  say('  A grading is a scholarly judgement. Leave these blank rather than guessing.');
}
if (weak.length) {
  say(`  ${weak.length} graded daif — the app argues from authenticated hadith:`);
  for (const { entry, source } of weak) {
    say(`    ${pad(formatSource(source), 26)} ${entry.title}`);
  }
}
if (!ungraded.length && !weak.length) say('  All graded or from Bukhari/Muslim.');
say();

/* ---------- notes by standing ---------- */

const plain = [
  ...GUIDES.flatMap((guide) => guide.steps.map((step) => step.note)),
  ...REFERENCES.flatMap((reference) => reference.sections.map((section) => section.note)),
  ...[...PILLARS, ...IMAN_PILLARS].map((pillar) => pillar.note),
  ...DUAS.map((dua) => dua.note),
].filter(Boolean);

const structured = CATALOG.flatMap((entry) => entry.notes);
const counts = { agreed: 0, differs: 0, practical: 0 };
for (const note of structured) counts[note.kind] += 1;

say('Notes by standing');
say(`  agreed     ${counts.agreed}`);
say(`  differs    ${counts.differs}`);
say(`  practical  ${counts.practical}`);
say(`  unclassified ${plain.length}  (plain \`note\` strings — read as practical advice)`);
say();

/* ---------- pointers ---------- */

const dangling = danglingRefs();
if (dangling.length) {
  say(`Broken relatedContent pointers (${dangling.length})`);
  for (const { from, to } of dangling) {
    say(`  ${pad(label(from), 26)} → ${to.kind}:${to.id}`);
  }
  say();
}

console.log(out.join('\n'));

const failures = [];
if (weak.length) failures.push(`${weak.length} narration(s) graded daif`);
if (dangling.length) failures.push(`${dangling.length} broken relatedContent pointer(s)`);
if (strict && unsourced.length) failures.push(`${unsourced.length} entries citing nothing`);

if (failures.length) {
  console.error(`\nFAILED: ${failures.join('; ')}`);
  process.exit(1);
}
