/**
 * Asserts that real questions still find their answers.
 *
 * Run: `npm run search:check`
 *
 * ## Why this exists
 *
 * Every one of these returned NOTHING at some point today, while the app held
 * the answer the whole time. "Passing wind" missed because the sentence lives
 * in a step's structured `notes` and only `note` was indexed. "What breaks
 * wudu" missed because the matcher wanted the whole phrase as one contiguous
 * string. "Istikhara" missed because the sheet searched ten help topics.
 *
 * None of those was findable by reading the code, and none would have been
 * caught by a typecheck. They were only visible by asking the question a
 * person would ask — so that is what this does, on every run.
 *
 * Renaming a section or moving a note is enough to break one of these. That is
 * the point: findability is a content invariant, and CLAUDE.md is explicit
 * that an invariant belongs in a script that exits non-zero rather than in a
 * sentence somebody has to remember.
 *
 * Expectations are deliberately loose — a key PREFIX, not a rank. Asserting
 * "this is result number one" would fail on every reword and teach everyone to
 * ignore it.
 */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { buildIndex, search } = await import(join(root, 'src/lib/search.ts'));

/* The sheet passes real UI strings; the labels only have to be non-empty. */
const LABELS = {
  guide: 'Guide',
  reference: 'Reference',
  pillar: 'Pillar',
  article: 'Article',
  dua: 'Duʿa',
  phrase: 'Phrase',
  step: 'Step in',
  section: 'In',
};

/**
 * What somebody types, and what has to come back in the top few.
 *
 * Written as questions a new Muslim actually asks, not as the app's own
 * vocabulary — the whole failure this guards against is the app being
 * searchable only in words it chose for itself.
 */
const EXPECTATIONS = [
  { query: 'passing wind', wants: 'step:wudu:', because: 'lives in a step note, not the instruction' },
  { query: 'what breaks wudu', wants: '', because: 'a typed phrase, not a substring of anything' },
  { query: 'istikhara', wants: 'guide:istikhara', because: 'a whole guide is named this' },
  { query: 'entering the house', wants: 'hisn:', because: 'the duʿa book was unsearchable entirely' },
  { query: 'missed a prayer', wants: 'section:', because: 'the answer is a section, not a page' },
  { query: 'tayammum', wants: 'guide:tayammum', because: 'the obvious case must not regress' },
  { query: 'lost count', wants: '', because: 'phrased the way a person in the middle of it would' },
];

const index = buildIndex('en', (kind) => LABELS[kind] ?? kind);
const TOP = 5;

let failed = 0;
for (const { query, wants, because } of EXPECTATIONS) {
  const results = search(index, query, TOP);
  const ok = results.length > 0 && (!wants || results.some((r) => r.key.startsWith(wants)));
  if (!ok) {
    failed += 1;
    console.error(`  ✗ "${query}" — ${because}`);
    console.error(
      results.length
        ? `      got: ${results.map((r) => r.key).join(', ')}`
        : '      got: nothing at all',
    );
  } else {
    console.log(`  ✓ "${query}" → ${results[0].context} / ${results[0].title}`);
  }
}

console.log(`\n${index.length} things indexed, ${EXPECTATIONS.length - failed}/${EXPECTATIONS.length} questions answered.`);

if (failed > 0) {
  console.error(
    `\n${failed} question(s) the app can answer and cannot be asked. Either the` +
      ' content moved, or the index needs to reach wherever it moved to.',
  );
  process.exit(1);
}
