/**
 * Asserts the crisis matcher against the phrase list's own examples.
 *
 * Run: `npm run crisis:check`
 *
 * The examples live in the header of `src/content/crisis.ts` as
 * `MATCH:` and `NO MATCH:` lines, beside the phrases they test, so the person
 * who edits the list edits its proof. A few shape checks ride along: a phrase
 * inside a longer word must not fire, punctuation after a phrase must not
 * stop it, and a curly apostrophe must read as a straight one.
 */
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { matchesCrisis } = await import(join(root, 'src/lib/crisis.ts'));

const source = readFileSync(join(root, 'src/content/crisis.ts'), 'utf8');
const examples = [...source.matchAll(/^\s*\*\s+(MATCH|NO MATCH):\s+(.+)$/gm)].map((m) => ({
  expected: m[1] === 'MATCH',
  text: m[2].trim(),
}));

let failed = 0;
const check = (ok, label) => {
  console.log(`  ${ok ? '✓' : '✗'} ${label}`);
  if (!ok) failed += 1;
};

check(examples.length >= 8, `${examples.length} examples read from the header`);
for (const { expected, text } of examples) {
  check(matchesCrisis(text) === expected, `${expected ? 'matches' : 'ignores'}: "${text}"`);
}

check(!matchesCrisis('my diet'), 'ignores "die" inside "diet"');
check(!matchesCrisis('suicidesquad is a film'), 'ignores a phrase glued inside a longer word');
check(matchesCrisis('i want to kill myself.'), 'punctuation after a phrase does not stop it');
check(matchesCrisis('I DON’T WANT TO LIVE'), 'capitals and a curly apostrophe still match');
check(matchesCrisis('  end   my\nlife  '), 'odd whitespace still matches');

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nThe crisis matcher agrees with its own examples.');
