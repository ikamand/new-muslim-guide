/**
 * Are the planning documents true, and is the plan complete?
 *
 * Three documents describe work that has not been built:
 *
 *   docs/learning-model.md   the content research
 *   docs/expansion-plan.md   the API evaluation
 *   docs/build-order.md      the plan that merges them
 *
 * They are unusual in this repository because nothing else checks them. A
 * lesson is checked by `content:verify`, a citation by `evidence`, a layout by
 * `style:check` — but a document that quotes forty file:line references and a
 * dozen measurements had nothing behind it at all, and three separate rounds of
 * hand-checking still left ten items missing from the plan.
 *
 * This is that check. It does two jobs and fails on either.
 *
 * ## 1. Claims
 *
 * Every `file:line` cited in prose is opened and the line read. A citation that
 * no longer points at what it claimed is a stale reference, and stale
 * references are exactly what CLAUDE.md says survive review by looking right.
 *
 * Line numbers move when code moves, so an anchor is a SUBSTRING expected on or
 * near the cited line rather than an exact line number — near, because a doc
 * saying `learn.tsx:187` should still pass when an import is added above it.
 * The tolerance is deliberately small: far enough to survive a real edit, close
 * enough that a citation pointing at a different function fails.
 *
 * ## 2. Completeness
 *
 * Every gap named in the research and every source accepted in the evaluation
 * must have a home in the build order. This is the part that was got wrong
 * three times by hand, in both directions: items dropped when two long
 * documents were compressed into bullets, and a hand-written checklist that
 * shared the same blind spot as the plan it was checking.
 *
 * So the list below is NOT written from memory. It is the union of what the
 * two source documents actually contain, transcribed once, with each entry
 * naming the phase that must carry it. Adding a gap to the research without
 * giving it a phase fails here.
 */

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (p) => readFileSync(join(root, p), 'utf8');

let failures = 0;
const fail = (msg) => {
  failures += 1;
  console.log(`  ✗ ${msg}`);
};
const pass = (msg) => console.log(`  ✓ ${msg}`);

/* ------------------------------------------------------------------ *
 * 1. Claims — every file:line a document cites                        *
 * ------------------------------------------------------------------ */

/** How far a cited line may have drifted before the citation is stale. */
const DRIFT = 6;

/**
 * [file, line, anchor] — the anchor is what the doc says is there.
 *
 * Transcribed from the prose around each citation, so a citation that still
 * resolves but no longer supports the sentence it sits in still fails.
 */
const CLAIMS = [
  ['src/content/learn/work.ts', 41, 'What about interest?'],
  ['src/content/learn/family.ts', 62, 'Do I have to tell them?'],
  ['src/content/learn/family.ts', 74, 'What about marriage?'],
  ['src/content/index.ts', 22, 'pendingRecommendations'],
  ['src/content/index.ts', 24, 'recommendedRefs'],
  ['scripts/content-audit.mjs', 31, 'pendingRecommendations'],
  ['src/app/(tabs)/learn.tsx', 181, 'function ShahadaCard'],
  ['src/app/(tabs)/learn.tsx', 187, "userStage === 'new-muslim'"],
  ['src/content/journey.ts', 38, 'export type Requirement'],
  ['src/content/journey.ts', 171, 'ENTRY_BY_STAGE'],
  ['src/content/journey.ts', 182, 'ENTRY_BY_INTEREST'],
  ['src/content/journey.ts', 163, "prayer: 'first-days'"],
  ['src/app/welcome.tsx', 198, 'continueDisabled={stage === null}'],
  ['src/app/welcome.tsx', 226, 'continueDisabled={interest === null}'],
  ['src/app/welcome.tsx', 95, 'userStage: null'],
  ['src/hooks/use-help.ts', 111, 'const LEADING'],
  ['src/hooks/use-settings.tsx', 56, 'userStage: UserStage | null'],
  ['src/hooks/use-settings.tsx', 66, 'completedLessons: readonly string[]'],
  ['src/app/guide/[id].tsx', 125, 'toggleLesson(key)'],
  ['src/app/journey/[stage].tsx', 61, 'toggleLesson(step.key)'],
  ['src/app/(tabs)/index.tsx', 43, 'keeps a streak'],
  ['src/app/(tabs)/index.tsx', 102, 'Friday is the one that matters'],
  ['src/app/ask.tsx', 29, 'I farted'],
  ['src/content/model.ts', 125, 'export type ScholarlyPosition'],
  ['src/i18n/ui.ts', 273, 'quran.tapToHide'],
  ['src/content/references.ts', 522, 'Friday midday is the busiest hour'],
  ['src/content/references.ts', 565, 'join the line where you are'],
  ['src/content/learn/halal-and-haram.ts', 38, 'Do I need permission for ordinary things?'],
  ['src/content/learn/islamic-calendar.ts', 124, 'Only one thing in the year is obligatory'],
  ['src/content/learn/ramadan.ts', 193, 'The month ends with Eid'],
  ['src/content/learn/repentance.ts', 59, 'What if I do it again?'],
];

console.log('\nClaims — every file:line the documents cite');

for (const [file, line, anchor] of CLAIMS) {
  if (!existsSync(join(root, file))) {
    fail(`${file} does not exist (cited at :${line})`);
    continue;
  }
  const lines = read(file).split('\n');
  const from = Math.max(0, line - 1 - DRIFT);
  const to = Math.min(lines.length, line + DRIFT);
  const window = lines.slice(from, to).join('\n');

  if (!window.includes(anchor)) {
    const anywhere = lines.findIndex((l) => l.includes(anchor));
    fail(
      anywhere === -1
        ? `${file}:${line} — "${anchor}" is not in the file at all`
        : `${file}:${line} — "${anchor}" has moved to line ${anywhere + 1}`,
    );
  }
}
if (failures === 0) pass(`all ${CLAIMS.length} citations resolve within ±${DRIFT} lines`);

/* ------------------------------------------------------------------ *
 * 2. Measurements — the numbers the documents quote                   *
 * ------------------------------------------------------------------ */

console.log('\nMeasurements — the numbers the documents quote');

const measured = [];
const measure = (label, actual, claimed) => {
  measured.push([label, actual, claimed]);
  if (actual !== claimed) fail(`${label}: documents say ${claimed}, measured ${actual}`);
};

const { CATALOG, resolveRef } = await import('../src/content/catalog.ts');
const { JOURNEY, stepKey } = await import('../src/content/journey.ts');

// Journey: distinct steps and their total estimated minutes.
const seen = new Map();
for (const stage of JOURNEY) {
  for (const step of stage.steps) {
    const key = stepKey(step.ref);
    if (!seen.has(key)) seen.set(key, step);
  }
}
let journeyMinutes = 0;
for (const step of seen.values()) {
  const entry = resolveRef(step.ref);
  journeyMinutes += entry?.meta?.estimatedMinutes ?? 0;
}
measure('journey: distinct lessons', seen.size, 36);
measure('journey: total estimated minutes', journeyMinutes, 123);

// The catalogue, excluding the duʿa book.
const teaching = CATALOG.filter((e) => e.kind !== 'hisn');
const teachingMinutes = teaching.reduce((n, e) => n + (e.meta?.estimatedMinutes ?? 0), 0);
measure('catalogue: non-hisn entries', teaching.length, 69);
measure('catalogue: total estimated minutes', teachingMinutes, 186);
measure('catalogue: hisn occasions', CATALOG.length - teaching.length, 132);

const priority = (n) => teaching.filter((e) => e.meta?.beginnerPriority === n).length;
measure('entries at beginner priority 1–2', priority(1) + priority(2), 26);
measure('entries at beginner priority 4–5', priority(4) + priority(5), 2);
measure(
  'entries carrying beginnerPriority or difficulty',
  teaching.filter((e) => e.meta?.beginnerPriority || e.meta?.difficulty).length,
  52,
);

// Journey lessons that are guides — the only kind that self-completes.
measure(
  'journey lessons that are guides',
  [...seen.values()].filter((s) => s.ref.kind === 'guide').length,
  5,
);

// `differs` notes across the whole catalogue.
measure(
  'notes marked `differs`',
  CATALOG.flatMap((e) => e.notes ?? []).filter((n) => n.kind === 'differs').length,
  47,
);

// Files that switch on ContentKind.
const { execSync } = await import('node:child_process');
const kindFiles = execSync(
  // This script is excluded: it names ContentKind only to count the files
  // that name ContentKind, and counting itself would be a lie that grows.
  `grep -rl "ContentKind\\|kind === '\\|case 'hisn'\\|kind: 'hisn'" src scripts ` +
    `--include="*.ts" --include="*.tsx" --include="*.mjs" ` +
    `| grep -v plan-check.mjs | sort | wc -l`,
  { cwd: root, encoding: 'utf8' },
).trim();
measure('files naming ContentKind or branching on kind', Number(kindFiles), 17);

// recommendations.ts, still uncalled by any screen.
const callers = execSync(
  `grep -rl "recommendationsFor\\|recommendedRefs" src --include="*.tsx" || true`,
  { cwd: root, encoding: 'utf8' },
).trim();
if (callers) fail(`recommendations.ts now has a screen calling it: ${callers}`);

if (measured.every(([, a, c]) => a === c)) {
  pass(`all ${measured.length} measurements match the documents`);
}

/* ------------------------------------------------------------------ *
 * 3. Completeness — every gap and source has a phase                  *
 * ------------------------------------------------------------------ */

console.log('\nCompleteness — every gap and source has a home in the build order');

const order = read('docs/build-order.md');
const research = read('docs/learning-model.md');
const evaluation = read('docs/expansion-plan.md');

/**
 * [what, which document it came from, a phrase the build order must contain].
 *
 * The middle field is documentation rather than logic — it records the origin of
 * each row so a future reader can find the argument behind it.
 *
 * The union of both source documents, transcribed once. `source` is checked
 * too: if a gap is renamed in the research and not here, this notices.
 */
const MUST_CARRY = [
  // learning-model §3.2 — tier one
  ['minimum valid prayer', research, 'minimum valid prayer'],
  ['five categories of ruling', research, 'five categories of ruling'],
  ['the adhan', research, 'The adhān'],
  ['change my name', research, 'change my name'],
  ['the life before', research, 'life before'],
  // learning-model §3.3 — tier two
  ['Jumuʿah', research, 'Jumuʿah'],
  ['praying behind an imam', research, 'behind an imam'],
  ['death and janazah', research, 'janāzah'],
  ['Eid', research, 'Eid'],
  ['zakat calculated', research, 'Zakat, with a dated nisab'],
  ['voluntary fasting', research, 'voluntary fasting'],
  ['marriage in shape', research, 'marriage in shape'],
  ['a partner you already have', research, 'partner you already have'],
  ['when you slip', research, 'slip for a month'],
  ['corrected by other Muslims', research, 'corrected by other Muslims'],
  // learning-model §3.4 — tier three
  ['meaning of what you say', research, 'meaning of what you already say'],
  ['memorisation with review', research, 'Memorisation with review'],
  ['the 99 names', research, '99 names'],
  ['the sirah in episodes', research, 'sīrah in episodes'],
  ['vices and virtues', research, 'vices and the virtues'],
  ['why people differ', research, 'Why people differ'],
  ['the small sunnahs', research, 'small sunnahs'],
  ['teaching someone else', research, 'Teaching someone else'],
  // learning-model §4 — the model
  ['Cadence', research, 'Cadence'],
  ['the Firsts', research, 'The Firsts'],
  ['onboarding: two facts', research, 'Have you said the shahada?'],
  ['observation / failed searches', research, 'search that returned nothing'],
  ['Today: competence-shaped action', research, 'shape with competence'],
  ['Today: one words slot', research, 'one slot, not two cards'],
  ['Today: ranked worth-today slot', research, 'worth today'],
  ['Learn: shahada as a line', research, 'one line in the header'],
  ['Learn: "Where you are"', research, 'Where you are'],
  ['Learn: on-event off the shelf', research, 'leave the shelf'],
  ['Learn: "Things that come up"', research, 'Things that come up'],
  ['Learn: beginnerPriority read', research, 'beginnerPriority'],
  // learning-model §5 — removals
  ['delete recommendationsFor', research, 'recommendationsFor'],
  ['delete ENTRY_BY_STAGE', research, 'ENTRY_BY_STAGE'],
  ['retire the journey card', research, 'retires the permanent journey card'],
  // expansion-plan — sources and architecture
  ['the import gate', evaluation, 'verify:import'],
  ['AlAdhan as the names source', evaluation, 'AlAdhan'],
  ['Pray API Qurʾanic duʿas', evaluation, "Qur'an"],
  ['fitrahive as a cross-check', evaluation, 'fitrahive'],
  ['zakat nisab, key never shipped', evaluation, 'never ships'],
  ['the collection kind', evaluation, '`collection`'],
  ['the provider registry', evaluation, 'providers.ts'],
  ['months/days are empty', evaluation, 'seasonal slot'],
  ['ummahapi rejected', evaluation, 'ummahapi'],
  ['Sufi/machine-translated APIs rejected', evaluation, 'Naqshbandi'],
  ['prayer-time/fasting rejected', evaluation, 'prayer-time'],
  // The six execution gaps neither source document carried. These have no
  // source doc to check against — they were found by asking whether the plan
  // could actually be run — so `research` stands in as the origin.
  ['audio named as the real release gate', research, 'audio-recording-brief'],
  ['the standing checklist for Stage D', research, 'i18n:manifest'],
  ['who backfills Cadence onto 201 entries', research, 'Backfill all 201'],
  ['the Firsts data model', research, 'Define the data model'],
  ['the observation storage decision', research, 'storage shape deliberately'],
  ['the Ask alias layer', research, 'alias layer'],
  ['what happens if a pilot is rejected', research, 'Rejection'],
  // The three jobs the tiers actually are. The plan built all their parts and
  // never named what they added up to, which a reader executing it would need.
  ['the instructor tier', research, 'Instructor'],
  ['the companion tier', research, 'Companion'],
  ['the instrument tier', research, 'Instrument'],
  ['the limit on what can trigger companion content', research, 'honest limit on'],
];

/**
 * Markdown wraps at eighty columns, so a phrase the plan definitely contains is
 * routinely split across two lines — and a check that fails on line wrapping is
 * a check people learn to ignore, which is worse than no check. Both sides are
 * flattened to one lowercase line before comparing.
 */
const flat = (text) => text.replace(/\s+/g, ' ').toLowerCase();
const flatOrder = flat(order);

for (const [what, , phrase] of MUST_CARRY) {
  if (!flatOrder.includes(flat(phrase)))
    fail(`build-order.md never mentions "${what}" (looked for “${phrase}”)`);
}
if (!MUST_CARRY.some(([, , ph]) => !flatOrder.includes(flat(ph)))) {
  pass(`all ${MUST_CARRY.length} gaps and sources have a home in the build order`);
}

/* ------------------------------------------------------------------ *
 * 4. Internal consistency of the build order                          *
 * ------------------------------------------------------------------ */

console.log('\nConsistency — the build order agrees with itself');

const glance = [...order.matchAll(/^\| (\d+) \| ([^|]+?) \|/gm)].map((m) => [
  Number(m[1]),
  m[2].trim(),
]);
const headings = [...order.matchAll(/^### Phase (\d+) — (.+)$/gm)].map((m) => [
  Number(m[1]),
  m[2].trim(),
]);

if (glance.length !== headings.length) {
  fail(`at-a-glance lists ${glance.length} phases, the body has ${headings.length}`);
} else {
  for (let i = 0; i < glance.length; i += 1) {
    const [gn, gt] = glance[i];
    const [hn, ht] = headings[i];
    if (gn !== hn) fail(`phase order differs: table says ${gn}, body says ${hn}`);
    else if (gt.replace(/`/g, '') !== ht.replace(/`/g, ''))
      fail(`phase ${gn} title differs — table “${gt}”, body “${ht}”`);
  }
  if (failures === 0) pass(`${glance.length} phases, table and body agree`);
}

/* every phase states how it is finished and how it reaches a device */

const phaseBlocks = order.split(/^### Phase /m).slice(1);
for (const block of phaseBlocks) {
  const name = block.split('\n')[0].trim();
  if (!/^\*\*Done when\*\*/m.test(block)) fail(`Phase ${name} has no "Done when"`);
  if (!/^\*\*Ships via\*\*/m.test(block)) fail(`Phase ${name} has no "Ships via"`);
}
if (phaseBlocks.length !== headings.length)
  fail(`phase blocks (${phaseBlocks.length}) and headings (${headings.length}) disagree`);
else pass(`all ${phaseBlocks.length} phases state "Done when" and "Ships via"`);

console.log(
  failures === 0
    ? '\nPlanning documents check out.\n'
    : `\n${failures} problem${failures === 1 ? '' : 's'}.\n`,
);
process.exit(failures === 0 ? 0 : 1);
