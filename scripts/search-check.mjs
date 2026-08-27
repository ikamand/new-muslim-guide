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
  { query: 'i farted', wants: 'step:wudu:', because: 'the app writes "passing wind"; nobody types that' },
  { query: 'entering the home', wants: 'hisn:', because: 'the app writes "house"' },
  { query: 'how do i decide', wants: 'guide:istikhara', because: 'nobody knows the word istikhara yet' },
  { query: 'can i pray on my period', wants: 'reference:periods', because: 'the everyday word, not "menstruation"' },
  { query: 'do i need to shower after sex', wants: 'step:ghusl:', because: 'nobody types "ghusl" or "janabah"' },
  { query: 'dua before sleeping', wants: 'dua:sleep', because: 'the book says "supplication"' },
  { query: 'how do i become muslim', wants: 'guide:shahada', because: 'they do not know it is called the shahada' },
  { query: 'my mum is upset', wants: 'reference:family', because: 'one useful word among several useless ones' },
  { query: 'what is halal meat', wants: 'section:food:', because: 'a section, not a whole page' },
  { query: 'what breaks wudu', wants: '', because: 'a typed phrase, not a substring of anything' },
  { query: 'istikhara', wants: 'guide:istikhara', because: 'the obvious case must not regress' },
  { query: 'tayammum', wants: 'guide:tayammum', because: 'the obvious case must not regress' },
  { query: 'lost count', wants: '', because: 'phrased the way a person in the middle of it would' },
  { query: 'missed a prayer', wants: 'section:', because: 'the answer is a section, not a page' },
];

/**
 * Questions with no verified right answer yet, checked only for returning
 * SOMETHING. A blank screen reads as "Islam has no answer for this", which is
 * the worst thing this app can say to somebody three weeks in.
 *
 * Two of these are answered badly rather than well, and that is recorded here
 * rather than quietly passing: "how many times do i pray" lands on qiyam
 * al-layl, and "i missed fajr" lands on tahajjud. Both are the single-term
 * fallback doing its job and finding something loosely related. Precision, not
 * coverage, is the next piece of work.
 */
const MUST_RETURN_SOMETHING = [
  'what do i say when someone dies', 'i cant read arabic', 'do i have to wear hijab',
  'what do i say before eating', 'i missed fajr', 'can i pray sitting down',
  'how many times do i pray', 'i dont know what to say in prayer', 'washing before prayer',
  'i think i broke my prayer', 'what do i say when i sneeze', 'praying at work',
  'fasting rules', 'can i shorten prayer when driving', 'what is zakat',
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

let blank = 0;
for (const query of MUST_RETURN_SOMETHING) {
  if (search(index, query, 1).length === 0) {
    blank += 1;
    console.error(`  ✗ "${query}" — returned nothing at all`);
  }
}

console.log(
  `\n${index.length} things indexed. ` +
    `${EXPECTATIONS.length - failed}/${EXPECTATIONS.length} land on the right answer, ` +
    `${MUST_RETURN_SOMETHING.length - blank}/${MUST_RETURN_SOMETHING.length} return something.`,
);
failed += blank;

if (failed > 0) {
  console.error(
    `\n${failed} question(s) the app can answer and cannot be asked. Either the` +
      ' content moved, or the index needs to reach wherever it moved to.',
  );
  process.exit(1);
}
