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
 * non-zero for the things that are faults: a fabricated narration, a weak one
 * carrying a ruling, and a `relatedContent` pointer that resolves to nothing.
 *
 * A weak narration cited for a duʿa wording, a virtue or historical context is
 * reported with its grading rather than blocked. Grading it and using it are
 * two different questions, and conflating them made this script fail on a duʿa
 * that three of the six books carry.
 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (p) => import(join(root, p));

// Via catalog.ts rather than index.ts: index pulls in the audio map, whose
// `require` calls only Metro resolves.
const { CATALOG, danglingRefs } = await load('src/content/catalog.ts');
const { pendingRecommendations } = await load('src/content/recommendations.ts');
const { formatSource, sourceUrl, assessEvidence } = await load('src/content/sources.ts');
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

/**
 * Graded by what the citation is doing, not by grading alone.
 *
 * The previous version failed the build on any narration graded weak, wherever
 * it appeared. That is not how Sunni hadith scholarship works and it was making
 * the app fail on a duʿa wording carried by three of the six books, while
 * saying nothing about the unsourced claims sitting next to it.
 *
 * What still fails: a fabricated narration anywhere, and a weak one carrying a
 * ruling. What is reported instead: weak narrations used for a duʿa wording, a
 * virtue or historical context — with the grading shown every time, never
 * quietly upgraded — and narrations from a mixed collection with no grading
 * recorded at all.
 */
const byVerdict = { sufficient: [], 'needs-grading': [], 'below-bar': [], unusable: [] };
for (const entry of narrations) byVerdict[assessEvidence(entry.source)].push(entry);

const weakButLabelled = byVerdict.sufficient.filter(({ source }) => source.grading === 'daif');

const line = ({ entry, source }) => {
  say(`    ${pad(formatSource(source), 40)} ${entry.title}`);
  const url = sourceUrl(source);
  if (url) say(`      ${url}`);
};

say(`Narrations — ${narrations.length}`);

if (byVerdict.unusable.length) {
  say(`  ${byVerdict.unusable.length} FABRICATED. Never usable, for anything:`);
  byVerdict.unusable.forEach(line);
}

if (byVerdict['below-bar'].length) {
  say(`  ${byVerdict['below-bar'].length} weak, and carrying a ruling:`);
  byVerdict['below-bar'].forEach(line);
  say('  A weak narration cannot establish an obligation, a prohibition or a');
  say('  point of creed. Either find a stronger one, or if it is really being');
  say('  cited for a duʿa wording or a virtue, say so with `role`.');
}

if (byVerdict['needs-grading'].length) {
  say(`  ${byVerdict['needs-grading'].length} from a collection that also carries weak narrations, ungraded:`);
  byVerdict['needs-grading'].forEach(line);
  say('  A grading is a scholarly judgement. Take it from the page or leave it off.');
}

if (weakButLabelled.length) {
  say(`  ${weakButLabelled.length} weak, and used where that is acceptable — shown with the grading:`);
  weakButLabelled.forEach(line);
}

if (!narrations.some((entry) => assessEvidence(entry.source) !== 'sufficient') && !weakButLabelled.length) {
  say('  All graded, or from Bukhari and Muslim.');
}
say();

/* ---------- every citation, for a reviewer to check ---------- */

// Deduplicated: the five generated prayers each recite Al-Fatiha once per
// rakʿah, so one citation would otherwise print seventeen times.
const distinct = new Map();
for (const { entry, source } of allSources) {
  const line = `${label(entry)}\u0000${formatSource(source)}`;
  if (!distinct.has(line)) distinct.set(line, { entry, source });
}

if (distinct.size) {
  say(`Citations (${distinct.size} distinct, ${allSources.length} uses)`);
  for (const { entry, source } of distinct.values()) {
    const url = sourceUrl(source);
    say(`  ${pad(label(entry), 24)} ${formatSource(source)}`);
    if (url) say(`  ${' '.repeat(24)} ${url}`);
  }
  say();
}

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

/* ---------- what onboarding promises and the app cannot yet answer ---------- */

const pending = pendingRecommendations();
if (pending.length) {
  say(`Recommendations awaiting content (${pending.length})`);
  say('  Onboarding points at these; nothing resolves, so nothing is shown. Not a');
  say('  failure — naming what should exist is how the gap stays countable, and is');
  say('  the alternative to inventing a record so a list looks full.');
  for (const entry of pending) say(`    ${entry.kind}:${entry.id}`);
  say();
}

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
if (byVerdict.unusable.length) {
  failures.push(`${byVerdict.unusable.length} fabricated narration(s) — never usable`);
}
if (byVerdict['below-bar'].length) {
  failures.push(
    `${byVerdict['below-bar'].length} weak narration(s) carrying a ruling — find a ` +
      'stronger source, or set `role` if it is really a duʿa wording or a virtue',
  );
}
if (dangling.length) failures.push(`${dangling.length} broken relatedContent pointer(s)`);
if (strict && unsourced.length) failures.push(`${unsourced.length} entries citing nothing`);

if (failures.length) {
  console.error(`\nFAILED: ${failures.join('; ')}`);
  process.exit(1);
}
