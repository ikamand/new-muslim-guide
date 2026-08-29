/**
 * Guards the two navigation invariants that fail silently on a device.
 *
 * `npm run nav:check`. Exits non-zero, because neither failure is visible to a
 * typecheck, to `expo export`, or to anybody looking at a screenshot — the
 * screen renders perfectly and a button does nothing when pressed.
 *
 * ## 1. `router.back()` must be guarded
 *
 * It does nothing at all when there is no history to pop, which is the normal
 * case for any screen reached from a notification, a deep link, or as the first
 * screen of a session. `guide/[id].tsx` hit this and wrote the fix — Finish
 * left somebody stranded on the last step of the prayer — and three other
 * screens kept the unguarded call for months afterwards, including the Done at
 * the end of the morning adhkār.
 *
 * The fix is always the same shape:
 *
 *     if (router.canGoBack()) router.back();
 *     else router.replace('<somewhere honest>');
 *
 * ## 2. No hardcoded sentences in a screen
 *
 * A screen that writes its own English cannot be translated, and — worse — it
 * cannot be COUNTED as untranslated, so `TranslationGap` never fires and a
 * French reader gets an English page that claims to be finished. The qibla
 * screen was entirely literals; every sentence on it was invisible to the i18n
 * manifest.
 *
 * Heuristic, and deliberately loose: a JSX text node of three or more words
 * with a lowercase run. It will not catch everything, and it is not meant to —
 * it is meant to stop the next screenful.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const appDir = join(root, 'src/app');

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith('.tsx')) out.push(full);
  }
  return out;
}

const files = walk(appDir);
const problems = [];

/**
 * Comments out, line numbering kept.
 *
 * Every comment in this repo explains the failure it prevents, so the comment
 * above a guarded `router.back()` quotes the very call it is fixing — and the
 * first version of this check flagged its own explanation. Blanking comments
 * to spaces rather than deleting them keeps the reported line numbers true.
 */
function stripComments(src) {
  let out = '';
  let mode = 'code';
  for (let i = 0; i < src.length; i++) {
    const two = src.slice(i, i + 2);
    if (mode === 'code' && two === '/*') { mode = 'block'; out += '  '; i++; continue; }
    if (mode === 'code' && two === '//') { mode = 'line'; out += '  '; i++; continue; }
    if (mode === 'block' && two === '*/') { mode = 'code'; out += '  '; i++; continue; }
    if (mode === 'line' && src[i] === '\n') { mode = 'code'; out += '\n'; continue; }
    out += mode === 'code' ? src[i] : src[i] === '\n' ? '\n' : ' ';
  }
  return out;
}

for (const file of files) {
  const code = stripComments(readFileSync(file, 'utf8'));
  const where = relative(root, file);
  const lines = code.split('\n');

  lines.forEach((line, i) => {
    if (!line.includes('router.back()')) return;

    // Guarded on this line, or on one of the three above it.
    const window = lines.slice(Math.max(0, i - 3), i + 1).join(' ');
    if (window.includes('canGoBack')) return;

    problems.push({
      where,
      line: i + 1,
      what: 'unguarded router.back()',
      fix: 'if (router.canGoBack()) router.back(); else router.replace(…)',
    });
  });
}

/*
 * A JSX text node, not an attribute and not a template expression: text sitting
 * between > and < with no braces in it.
 *
 * ⚠️ `>` and `<` are also comparison and arrow operators, so plain TypeScript
 * matches this shape — `(a, b) => Number(b.key === focus) - Number(...)` looked
 * like a sentence to the first version. Prose is required to LOOK like prose:
 * four words, no operators or identifier punctuation, and a real ending.
 */
const SENTENCE = />(\s*[A-Z][^<>{}]{18,})</g;
const CODEY = /[=;()[\]|&_$]|\.\w|=>|\w\.\w/;

for (const file of files) {
  const code = stripComments(readFileSync(file, 'utf8'));
  const where = relative(root, file);

  for (const match of code.matchAll(SENTENCE)) {
    const text = match[1].trim().replace(/\s+/g, ' ');
    if (text.split(' ').length < 4) continue;
    if (CODEY.test(text)) continue;
    // Arabic and transliteration are content, not chrome, and are not translated.
    if (/[؀-ۿ]/.test(text)) continue;
    const line = code.slice(0, match.index).split('\n').length;
    problems.push({
      where,
      line,
      what: 'hardcoded sentence in a screen',
      fix: `move to src/i18n/ui.ts — "${text.slice(0, 48)}${text.length > 48 ? '…' : ''}"`,
    });
  }
}

if (problems.length === 0) {
  console.log(`Navigation and screen copy — ${files.length} screens, nothing unguarded, no loose sentences.`);
  process.exit(0);
}

console.log(`${problems.length} problem(s):\n`);
for (const p of problems) {
  console.log(`  ${p.where}:${p.line}`);
  console.log(`    ${p.what}`);
  console.log(`    → ${p.fix}\n`);
}
process.exit(1);
