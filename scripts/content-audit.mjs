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
const { CATALOG, danglingRefs, resolveRef } = await load('src/content/catalog.ts');
const { pendingRecommendations } = await load('src/content/recommendations.ts');
const { CADENCE } = await load('src/content/cadence.ts');
const { COLLECTIONS } = await load('src/content/collections/index.ts');
const { PROVIDERS } = await load('src/content/providers.ts');
const { ungrouped } = await load('src/content/learn/index.ts');
const { CURRICULUM, COMMISSIONED, SMALL_UNITS, uncurriculed } = await load(
  'src/content/curriculum.ts',
);
const { EN } = await load('src/i18n/ui.ts');
/*
  The NAMES, not the files. `prayer-images.ts` also holds a wall of `require()`
  that only Metro can resolve, and importing the module for its map crashed
  this whole script — see the note beside `DRAWN_POSTURES`.
*/
const { DRAWN_POSTURES } = await load('src/content/drawn-postures.ts');
const { helpRefs } = await load('src/content/help.ts');
const { SEASONS } = await load('src/content/seasons.ts');
const { formatSource, sourceUrl, assessEvidence } = await load('src/content/sources.ts');
const { GUIDES } = await load('src/content/guides.ts');
const { REFERENCES } = await load('src/content/references.ts');
const { PILLARS } = await load('src/content/pillars.ts');
const { IMAN_PILLARS } = await load('src/content/iman.ts');

const strict = process.argv.includes('--strict');
const label = (entry) => `${entry.kind}:${entry.id}`;
const pad = (text, width) => text.padEnd(width);

const out = [];
const say = (line = '') => out.push(line);

say(`Content audit — ${CATALOG.length} entries\n`);

/* ---------- coverage ---------- */

const withMeta = CATALOG.filter((entry) => entry.meta);
const withSources = CATALOG.filter((entry) => entry.sources.length > 0);

/*
  A Learn topic that no group claims does not appear on the Learn tab at all —
  the screen renders from TOPIC_GROUPS, not from LEARN_TOPICS. Silent, and
  invisible until somebody goes looking for a page they wrote.
*/
const orphanTopics = ungrouped(REFERENCES, GUIDES);
if (orphanTopics.length) {
  say(`${orphanTopics.length} item(s) in no group — these do not render on the Learn tab:`);
  for (const topic of orphanTopics) say(`  ${topic.kind}:${topic.id}  ${topic.title}`);
  say('  Add each to TOPIC_GROUPS in src/content/learn/index.ts.');
  say();
}

/* ---------- the curriculum ---------- */

/*
  The path went stale once already: 22 pages landed in phases 9–13 and no
  journey stage ever learned their names, so "Continue" could not reach them.
  These checks are that failure turned into an exit code, per the plan at
  docs/learn-redesign-plan.md §7.
*/
const lessonEntries = CURRICULUM.flatMap((tier) =>
  tier.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({ tier, unit, lesson, key: `${lesson.ref.kind}:${lesson.ref.id}` })),
  ),
);

// Exactly one unit per lesson. A page in two units would double-count
// progress and give "the lesson after this one" two answers.
const seenLesson = new Map();
const doubleClaimed = [];
for (const entry of lessonEntries) {
  const first = seenLesson.get(entry.key);
  if (first && first.unit !== entry.unit) doubleClaimed.push(entry);
  else seenLesson.set(entry.key, entry);
}

// An unresolved lesson is a commission if declared, a typo if not.
const unresolvedLessons = lessonEntries.filter(({ lesson }) => !resolveRef(lesson.ref));
const commissionedLessons = unresolvedLessons.filter(({ key }) => COMMISSIONED.includes(key));
const typoLessons = unresolvedLessons.filter(({ key }) => !COMMISSIONED.includes(key));
// A COMMISSIONED entry that now resolves is a stale commission — the page
// was written, so the declaration must come off for the list to stay honest.
const staleCommissions = COMMISSIONED.filter((key) => {
  const [kind, ...rest] = key.split(':');
  return resolveRef({ kind, id: rest.join(':') });
});

// Every tier and unit must have its name and purpose in ui.ts, and every
// lesson labelKey must exist — a missing key renders as its raw key string.
const missingKeys = [];
for (const tier of CURRICULUM) {
  for (const key of [`curriculum.tier.${tier.id}`, `curriculum.tier.${tier.id}.purpose`]) {
    if (!(key in EN)) missingKeys.push(key);
  }
  for (const unit of tier.units) {
    for (const key of [`curriculum.unit.${unit.id}`, `curriculum.unit.${unit.id}.purpose`]) {
      if (!(key in EN)) missingKeys.push(key);
    }
    for (const lesson of unit.lessons) {
      if (lesson.labelKey && !(lesson.labelKey in EN)) missingKeys.push(lesson.labelKey);
    }
  }
}

// Coverage: every surface:'learn' reference and every guide is a lesson, a
// door, or deliberately elsewhere. The journey's staleness, made impossible.
const uncurr = uncurriculed(REFERENCES, GUIDES);

say(
  `Curriculum — ${CURRICULUM.length} tiers, ` +
    `${CURRICULUM.reduce((n, tier) => n + tier.units.length, 0)} units, ` +
    `${seenLesson.size} lessons (${seenLesson.size - unresolvedLessons.length} written)`,
);
for (const tier of CURRICULUM) {
  for (const unit of tier.units) {
    const resolved = unit.lessons.filter((lesson) => resolveRef(lesson.ref)).length;
    const size =
      (resolved < 2 || resolved > 6) && !SMALL_UNITS.includes(unit.id)
        ? '  ⚠️ outside the 2–6 band'
        : '';
    say(`  ${pad(`${tier.id}/${unit.id}`, 38)} ${resolved}/${unit.lessons.length}${size}`);
  }
}
if (commissionedLessons.length) {
  say(`  commissioned, not yet written (${commissionedLessons.length}):`);
  for (const { key, unit } of commissionedLessons) say(`    ${key}  (holds its place in ${unit.id})`);
}
if (uncurr.length) {
  say(`  ${uncurr.length} page(s) in no unit — the path cannot reach these:`);
  for (const topic of uncurr) say(`    ${topic.kind}:${topic.id}  ${topic.title}`);
  say('  Add each to CURRICULUM in src/content/curriculum.ts, or to its elsewhere list with a reason.');
}
say();

/*
  The posture illustrations, so a half-finished set is visible rather than
  something you notice by opening every prayer step.
*/
const POSTURES = ['standing','takbir','bowing','rising','prostrating','sitting','tashahhud','taslim-right','taslim-left','washing'];
const drawn = POSTURES.filter((p) => DRAWN_POSTURES.includes(p));
say(`Posture illustrations — ${drawn.length}/${POSTURES.length} drawn`);
if (drawn.length < POSTURES.length) {
  say(`  still the built-in figures: ${POSTURES.filter((p) => !DRAWN_POSTURES.includes(p)).join(', ')}`);
  say('  Drop a PNG in assets/images/prayer/ and uncomment its line in');
  say('  src/content/prayer-images.ts. Nothing else is needed.');
}
say();

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

// Uses and distinct narrations are different numbers and a reviewer wants the
// second: the five generated prayers each carry the same method citations, so
// one narration checked once can account for a dozen uses.
const distinctNarrations = new Set(narrations.map(({ source }) => formatSource(source)));
say(`Narrations — ${distinctNarrations.size} distinct, ${narrations.length} uses`);

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

/* ---------- what the home screen offers ---------- */

/**
 * "I need help with…" and the seasonal windows both drop a pointer that
 * resolves to nothing, so a chip can never lead somewhere empty. That silence
 * is right on the screen and wrong here: an unresolved pointer means a topic
 * quietly got shorter, and this is where that should be visible.
 */
const homeRefs = [
  ...helpRefs().map((entry) => ({ from: 'help', ref: entry })),
  ...SEASONS.map((season) => ({ from: `season:${season.id}`, ref: season.ref })),
];
const homeMissing = homeRefs.filter(({ ref }) => !resolveRef(ref));

if (homeMissing.length) {
  say(`Home pointers resolving to nothing (${homeMissing.length})`);
  say('  Dropped silently on screen — a chip must never open an empty page.');
  for (const { from, ref } of homeMissing) say(`    ${pad(from, 20)} → ${ref.kind}:${ref.id}`);
  say();
}

/* ---------- pointers ---------- */

/* ---------- collections and their providers ---------- */

/*
  A collection must name a provider that exists.

  This is the provenance rule at the size of a dataset, and it is the one thing
  about a collection that cannot be checked by looking at the screen: a set of
  99 entries renders identically whether or not anybody recorded where it came
  from or what its licence obliges. So it fails here instead.
*/
const badProvider = COLLECTIONS.filter((entry) => !PROVIDERS[entry.provider]);

say(`Collections — ${COLLECTIONS.length}`);
for (const collection of COLLECTIONS) {
  const provider = PROVIDERS[collection.provider];
  say(
    `  ${pad(collection.id, 22)} ${String(collection.entries.length).padStart(3)} entries` +
      `  ${provider ? provider.name : `⚠️ unknown provider "${collection.provider}"`}`,
  );
}
if (!COLLECTIONS.length) {
  say('  none yet — the kind shipped empty on purpose; the 99 names are Phase 3.');
}
say();

/* ---------- cadence ---------- */

/*
  Every entry must say where it belongs in someone's life.

  A failing check rather than a line in a document, per the strongest rule in
  CLAUDE.md, and it is the whole reason cadence is worth having: Phase 4 places
  content by it, so an entry with no cadence is an entry no screen can put
  anywhere. Adding a content file without a `cadence.ts` row fails here rather
  than silently producing a page nothing surfaces.
*/
const CADENCES = ['once', 'until-fluent', 'daily', 'yearly', 'on-event', 'keepsake'];
const noCadence = CATALOG.filter((entry) => !entry.cadence);
const badCadence = CATALOG.filter((entry) => entry.cadence && !CADENCES.includes(entry.cadence));
const staleCadence = Object.keys(CADENCE).filter((key) => {
  const [kind, ...rest] = key.split(':');
  return !resolveRef({ kind, id: rest.join(':') });
});

say('Cadence');
for (const value of CADENCES) {
  const count = CATALOG.filter((entry) => entry.cadence === value).length;
  say(`  ${pad(value, 13)} ${String(count).padStart(3)}`);
}
say(`  ${pad('undeclared', 13)} ${String(noCadence.length).padStart(3)}`);
if (noCadence.length) {
  for (const entry of noCadence.slice(0, 20)) say(`    ${label(entry)}`);
}
if (staleCadence.length) {
  say(`  cadence.ts points at ${staleCadence.length} entr(ies) the catalogue does not have:`);
  for (const key of staleCadence.slice(0, 20)) say(`    ${key}`);
}
say();

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
if (uncurr.length) {
  failures.push(`${uncurr.length} page(s) in no curriculum unit — add to CURRICULUM or its elsewhere list`);
}
if (typoLessons.length) {
  failures.push(
    `${typoLessons.length} curriculum lesson(s) resolving to nothing and not declared in COMMISSIONED: ` +
      typoLessons.map(({ key }) => key).join(', '),
  );
}
if (doubleClaimed.length) {
  failures.push(
    `${doubleClaimed.length} lesson(s) claimed by two units: ` +
      doubleClaimed.map(({ key }) => key).join(', '),
  );
}
if (staleCommissions.length) {
  failures.push(
    `${staleCommissions.length} COMMISSIONED entr(ies) that now resolve — the page exists, remove the declaration: ` +
      staleCommissions.join(', '),
  );
}
if (missingKeys.length) {
  failures.push(`${missingKeys.length} curriculum i18n key(s) missing from ui.ts: ${missingKeys.join(', ')}`);
}
if (noCadence.length) {
  failures.push(`${noCadence.length} entr(ies) with no cadence — add a row to src/content/cadence.ts`);
}
if (badCadence.length) failures.push(`${badCadence.length} entr(ies) with an unknown cadence`);
if (badProvider.length) {
  failures.push(
    `${badProvider.length} collection(s) naming a provider with no row in src/content/providers.ts`,
  );
}
if (staleCadence.length) {
  failures.push(`${staleCadence.length} cadence row(s) pointing at content that does not exist`);
}
if (homeMissing.length) failures.push(`${homeMissing.length} home pointer(s) resolving to nothing`);
if (strict && unsourced.length) failures.push(`${unsourced.length} entries citing nothing`);

if (failures.length) {
  console.error(`\nFAILED: ${failures.join('; ')}`);
  process.exit(1);
}
