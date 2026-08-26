/**
 * Guards the teaching-page format against the ways it silently fails.
 *
 * `npm run style:check`. WARNS rather than blocks, deliberately: an
 * abstraction that cannot be broken gets worked around in uglier ways than the
 * thing it forbade. It exits non-zero only on the one failure that is
 * invisible to a reader AND to a typecheck — a promoted citation with no text
 * behind it, which renders as nothing at all.
 */

import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { LEARN_TOPICS } = await import(join(root, 'src/content/learn/index.ts'));
const refs = await import(join(root, 'src/content/references.ts'));
const { QURAN_TEXT, HADITH_TEXT } = await import(join(root, 'src/content/evidence.ts'));

const pages = [
  ...LEARN_TOPICS,
  ...Object.values(refs).filter((v) => v && typeof v === 'object' && 'sections' in v),
];

const key = (s) =>
  s.kind === 'quran'
    ? `${s.surah}:${
        Array.isArray(s.ayah) ? (s.ayah[0] === s.ayah[1] ? s.ayah[0] : s.ayah.join('-')) : s.ayah
      }`
    : s.kind === 'hadith'
      ? s.reference
        ? `${s.collection}:${s.reference}`
        : s.hadeethEncId
          ? `${s.collection}:he${s.hadeethEncId}`
          : null
      : null;

const resolves = (s) => {
  const k = key(s);
  return k ? Boolean(QURAN_TEXT[k] ?? HADITH_TEXT[k]) : false;
};

const errors = [];
const warnings = [];

for (const page of pages) {
  if (!page?.id) continue;

  const heroes = page.sections.filter((s) => s.promote === 'hero');
  if (heroes.length > 1) {
    warnings.push(`${page.id}: ${heroes.length} heroes. One per page — the treatment stops meaning anything otherwise.`);
  }

  for (const section of page.sections) {
    if (section.promote && !(section.sources ?? []).some(resolves)) {
      errors.push(
        `${page.id} → "${section.heading}" promotes a citation with no text behind it. ` +
          `It renders as nothing. Either the section's sources are empty (a citation inside a ` +
          `note does not count) or npm run evidence has not been run for it.`,
      );
    }
    if (!/\?$/.test(section.heading)) {
      warnings.push(`${page.id}: "${section.heading}" is a label, not the reader's question.`);
    }
  }

  if (!page.quickFacts) warnings.push(`${page.id}: no quickFacts.`);
}

/* Raw numbers in a teaching screen mean the token file is being bypassed. */
const screens = ['src/app/reference/[id].tsx'];
for (const rel of screens) {
  const src = readFileSync(join(root, rel), 'utf8');
  for (const m of src.matchAll(/\b(fontSize|lineHeight):\s*\d+/g)) {
    warnings.push(`${rel}: raw ${m[1]} — type belongs in themed-text.tsx, layout in constants/teaching.ts.`);
  }
}

for (const w of warnings) console.warn(`⚠️  ${w}`);
for (const e of errors) console.error(`✖  ${e}`);
console.log(
  `\n${pages.length} teaching pages — ${errors.length} silent failure(s), ${warnings.length} warning(s).`,
);
if (errors.length) process.exit(1);
