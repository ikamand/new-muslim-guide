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
/*
  ⚠️ Seven of these were repointed on 28 Aug 2026, not because the documents
  were wrong but because Phase 7 retired what they cited. `userStage` and
  `initialInterest` asked which of four kinds of person somebody was and what
  they wanted help with; both are gone, replaced by "have you said the
  shahada" and "can you pray on your own yet". Each citation now points at the
  successor rather than being deleted, so the sentence in the plan still has
  something to check itself against.
*/
const CLAIMS = [
  ['src/content/learn/work.ts', 41, 'What about interest?'],
  ['src/content/learn/family.ts', 62, 'Do I have to tell them?'],
  ['src/content/learn/family.ts', 74, 'What about marriage?'],
  ['src/content/index.ts', 22, 'pendingRecommendations'],
  /*
    `index.ts:24 recommendedRefs` and `journey.ts:171 ENTRY_BY_STAGE` were
    cited by both source documents as dead code, and Phase 1 deleted them on
    28 Aug 2026. The citations are dropped rather than repointed: they
    described something that is gone, which is the phase working, and leaving
    them would make a completed deletion look like a stale reference forever.
    `docs/build-order.md` "What this removes" is the record that they existed.
  */
  ['scripts/content-audit.mjs', 32, 'pendingRecommendations'],
  ['src/app/(tabs)/learn.tsx', 203, 'function ShahadaCard'],
  ['src/app/(tabs)/learn.tsx', 204, "shahadaState === 'recently'"],
  ['src/content/journey.ts', 38, 'export type Requirement'],
  ['src/content/journey.ts', 170, 'ENTRY_BY_CONFIDENCE'],
  ['src/content/journey.ts', 172, "'teach-me': 'first-days'"],
  ['src/app/welcome.tsx', 199, 'continueDisabled={said === null}'],
  ['src/app/welcome.tsx', 227, 'continueDisabled={prays === null}'],
  ['src/app/welcome.tsx', 95, 'shahadaState: null'],
  ['src/hooks/use-help.ts', 120, 'const LEADING'],
  ['src/hooks/use-settings.tsx', 63, 'shahadaState: ShahadaState | null'],
  ['src/hooks/use-settings.tsx', 78, 'completedLessons: readonly string[]'],
  ['src/app/guide/[id].tsx', 125, 'toggleLesson(key)'],
  ['src/app/journey/[stage].tsx', 61, 'toggleLesson(step.key)'],
  ['src/app/(tabs)/index.tsx', 64, 'keeps a streak'],
  /*
    Moved into `prayer-times-card.tsx` in spirit: Phase 4 found that the card
    already says "It is Friday" through `JumuahNote`, so `use-today.ts` does
    NOT carry a Friday candidate. The line still exists here and is still what
    the documents cite.
  */
  ['src/app/(tabs)/index.tsx', 151, 'Friday is the one that matters'],
  /*
    Still cited, and the citation now points at the CORRECTION rather than the
    claim. Phase 5 found that "I farted" no longer returns nothing — it returns
    the wrong thing, which the miss log cannot see. The documents' sentence
    about it is wrong and the file says so at this line.
  */
  ['src/app/ask.tsx', 44, 'I farted'],
  ['src/content/model.ts', 182, 'export type ScholarlyPosition'],
  ['src/i18n/ui.ts', 372, 'quran.tapToHide'],
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
/*
  69 became 70 on 28 Aug 2026 when Phase 3 added the `quranic-names`
  collection. The plan's "untouched throughout: every word of the 69 existing
  teaching entries" is still true — none was edited or removed, one was added
  beside them.
*/
/* 70 → 75: Phase 9's five tier-one pages. */
/* 75 → 76: Phase 10's Qur'anic duʿas are a catalogue entry of their own. */
/* 76 → 77: Phase 11's Jumuʿah page. */
/* 77 → 79: Phase 11's pilot of two. */
/* 79 → 85: Phase 11's remaining six. */
/* 85 → 88: Phase 13's three tier-three pages. */
measure('catalogue: non-hisn entries', teaching.length, 88);
/*
  186 became 206 on 28 Aug 2026: the ninety-nine names declare 20 minutes.
  The 69 pages the plan measured are unchanged; a 70th was added beside them.
*/
measure('catalogue: total estimated minutes', teachingMinutes, 291);
measure('catalogue: hisn occasions', CATALOG.length - teaching.length, 132);

const priority = (n) => teaching.filter((e) => e.meta?.beginnerPriority === n).length;
/* All five of Phase 9's pages are tier one, so all five land here. */
measure('entries at beginner priority 1–2', priority(1) + priority(2), 32);
/* Tier three is where 4–5 lives, so all three land here. */
measure('entries at beginner priority 4–5', priority(4) + priority(5), 9);
measure(
  'entries carrying beginnerPriority or difficulty',
  teaching.filter((e) => e.meta?.beginnerPriority || e.meta?.difficulty).length,
  /* 52 → 53: the names collection carries meta. */
  71,
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
  /*
    47 → 50. Phase 11 added three: reading Al-Fātiḥah behind an imam in an
    aloud prayer, what a walī is for when a convert has no Muslim family, and
    whether an existing marriage continues. All three are places the app now
    NAMES a difference rather than picking a side, which is what this
    measurement was counting in the first place.
  */
  50,
);

/*
  Files that switch on ContentKind — the cost of adding a seventh.

  ⚠️ Corrected 28 Aug 2026, and the wrong number is left named here rather
  than quietly swapped, because it was quoted in a plan and priced a phase.

  This counted 17 by matching any `kind === '` at all. Thirteen of those were
  other `kind` fields entirely: `Source.kind` in `source-list.tsx` and four
  scripts, `ContentNote.kind` in the reference screens, `fard`/`voluntary` in
  `prayers.ts`, `screen`/`content` in `use-help.ts`. None of them would change
  if a seventh ContentKind were added, which is the only question the number
  was ever asked to answer.

  The real figure was 7 before the seventh kind was added, and adding it made
  it 9 — `types.ts` for the `Collection` shape and the new screen. Phase 2
  measured the whole job at 11 files, four of them new; the grep only ever sees
  the ones that name a kind value. Both numbers are in
  `docs/build-order.md` Phase 2, because a prediction is worth keeping beside
  what it predicted.
*/
const { execSync } = await import('node:child_process');
const kindFiles = execSync(
  // This script is excluded: it names ContentKind only to count the files
  // that name ContentKind, and counting itself would be a lie that grows.
  `grep -rlE "ContentKind|(kind|case) ?(===|:)? ?'(guide|reference|pillar|article|hisn|phrase|collection)'" ` +
    `src scripts --include="*.ts" --include="*.tsx" --include="*.mjs" ` +
    `| grep -v plan-check.mjs | sort | wc -l`,
  { cwd: root, encoding: 'utf8' },
).trim();
/* 9 → 11: `learn/index.ts` and the names collection both name `collection`. */
/* 11 → 12: `use-today.ts` now resolves refs by kind for its candidates. */
/* 12 → 14: the duʿa collection, and the Duʿa tab now reads COLLECTIONS. */
measure('files naming a ContentKind value', Number(kindFiles), 14);

/*
  No component may branch on WHICH collection it is rendering.

  This is the whole claim Phase 2 makes, and it is the one that decays
  silently: the fifth collection needing "just one special case" in the screen
  is how a kind that cost seven files to add stops paying for itself. The
  screen renders by which fields an entry HAS, never by which set it is.

  Matched in `src/app` and `src/components` only — `content/` legitimately
  names collection ids, because that is where a collection is declared.
*/
const branching = execSync(
  `grep -rnE "collection(\\.id)? === '|case '[a-z0-9-]+': *// *collection" ` +
    `src/app src/components || true`,
  { cwd: root, encoding: 'utf8' },
).trim();
if (branching) fail(`a component is branching on which collection it renders:\n    ${branching}`);

/*
  The two dead exports stay dead.

  Phase 1 deleted them, so this no longer guards "uncalled by a screen" — it
  guards that nobody reintroduces them. Anything named `recommendationsFor` or
  `recommendedRefs` anywhere in `src/` is either the deletion being undone or a
  new function wearing a retired name, and both deserve a look.
*/
const revived = execSync(
  // A definition or a call, never the bare name — `recommendations.ts` carries
  // a comment explaining the deletion, and a guard that fires on its own
  // record of what it guards is a guard nobody keeps.
  `grep -rlE "(export (function|const) )?(recommendationsFor|recommendedRefs) ?[(=]" src || true`,
  { cwd: root, encoding: 'utf8' },
).trim();
if (revived) fail(`a deleted recommendation export is back: ${revived}`);

if (measured.every(([, a, c]) => a === c)) {
  pass(`all ${measured.length} measurements match the documents`);
}

/* ------------------------------------------------------------------ *
 * 3. Completeness — derived from the documents, not from a list       *
 * ------------------------------------------------------------------ */

/**
 * This used to be a hand-written array of things the plan must mention, and it
 * failed four times in a row for one reason: it was written from memory, so it
 * shared the exact blind spot of the plan it was checking. Anything forgotten
 * twice was invisible to both.
 *
 * It now EXTRACTS every atomic item from the two source documents — every table
 * row's first cell, every bolded bullet lead-in, every sub-heading — and scores
 * each one's distinctive words against the build order. Nothing is transcribed,
 * so nothing can be left out by forgetting it.
 *
 * Scoring rather than substring matching, because the plan legitimately rewords
 * things. An item whose distinctive words are mostly absent from the plan is
 * either missing or renamed beyond recognition; both deserve a human look.
 *
 * ## What it does not check
 *
 * That an item is in the RIGHT phase. It asks only whether the plan names the
 * thing somewhere — which is the correct scope, since a collection named in
 * Phase 2 and detailed in Phase 13 legitimately has two homes. A negative test
 * that renamed one of those two mentions passed, correctly, and only failed
 * once both were gone.
 */

const order = read('docs/build-order.md');
const research = read('docs/learning-model.md');
const evaluation = read('docs/expansion-plan.md');

console.log('\nCompleteness — every item in the two source documents');

const STOP = new Set(
  ('the a an and or of to in for is are was were it its this that with on at by as be been from ' +
   'not no you your they their what which when where how why do does did can could should would ' +
   'will has have had one two more most than then so but if all any each every some such into out ' +
   'up down over under about after before there here just only also because while own way thing').split(' '),
);

const keywords = (t) =>
  (t.toLowerCase().match(/[a-zÀ-ɏʿʾḀ-ỿ'’-]{4,}/g) ?? [])
    .filter((w) => !STOP.has(w.replace(/['’-]/g, '')))
    .slice(0, 12);

/** Items that are not plan items, each with the reason it is exempt. */
const NOT_A_PLAN_ITEM = [
  [/yaqeen|ispu|seekersguidance|mishkah|rahiq|my deen|being muslim|beyond the shahada|virtualmosque|convert build their knowledge/i,
   'an external research citation, not work to do'],
  [/entries the metadata rates|entries rated|total estimated|distinct lessons|non-duʿa teaching|hisn occasions|catalogue/i,
   'a measurement, checked in section 2 instead'],
  [/^(bukhari|abu dawud|tirmidhi|muslim|collection|api|verdict|reason|rejected|kept, untouched|the job|what|when|removed|by)$/i,
   'a table header or a bare collection name'],
  [/alef wasla|ءامنا|uthmani.*imlaei|consonantal skeleton|excluded authority/i,
   'implementation detail inside Phase 0, covered by the phase itself'],
  [/i was going to write|correction to my own tooling|arithmetic, not impression|counterweight already exists/i,
   'a note about how the research was done, not a plan item'],
  [/ground one|ground two|the 30 qur|actual prize|one endpoint worth having|take the qur/i,
   'an evaluation heading whose conclusion is carried by a phase'],
];

const source = (doc, label) => {
  const out = [];
  for (const m of doc.matchAll(/^\|\s*\*{0,2}([^|*]{4,60})\*{0,2}\s*\|/gm)) out.push([label, m[1].trim()]);
  for (const m of doc.matchAll(/^- \*\*(.{4,90}?)\*\*/gm)) out.push([label, m[1].trim()]);
  for (const m of doc.matchAll(/^#{3,4} (.{4,90})$/gm)) out.push([label, m[1].trim()]);
  return out;
};

const flatOrder = order.replace(/\s+/g, ' ').toLowerCase();
const extracted = [...source(research, 'research'), ...source(evaluation, 'evaluation')];
const weak = [];

for (const [label, item] of extracted) {
  const exempt = NOT_A_PLAN_ITEM.find(([re]) => re.test(item));
  if (exempt) continue;
  const k = keywords(item);
  if (k.length < 2) continue;
  const score = k.filter((w) => flatOrder.includes(w)).length / k.length;
  if (score < 0.5) weak.push([score, label, item]);
}

weak.sort((a, b) => a[0] - b[0]);
for (const [score, label, item] of weak)
  fail(`${label}: "${item}" is not in the build order (${Math.round(score * 100)}% of its words appear)`);

if (weak.length === 0)
  pass(`all ${extracted.length} items extracted from the two source documents have a home`);

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
