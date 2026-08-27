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

const resolveText = (s) => {
  const k = key(s);
  return k ? (QURAN_TEXT[k] ?? HADITH_TEXT[k]) : undefined;
};
const resolves = (s) => Boolean(resolveText(s));

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
    /*
      A hero is an answer, not an excerpt. Past about 700 characters a
      hero stops being the page's centre of gravity and becomes a wall
      somebody scrolls past — which is what `what-breaks-prayer` did with a
      1,431-character narration until this check found it.
    */
    if (section.promote === 'hero') {
      const text = (section.sources ?? []).map(resolveText).find(Boolean);
      if (text && text.arabic.length > 700) {
        warnings.push(
          `${page.id}: hero on "${section.heading}" is ${text.arabic.length} characters. That is a wall, not an answer — demote it to supporting.`,
        );
      }
    }

    /* A label column is 96px wide. Anything past ~15 characters wraps to three lines. */
    if (!/\?$/.test(section.heading)) {
      warnings.push(`${page.id}: "${section.heading}" is a label, not the reader's question.`);
    }
  }

  /*
    A page states its evidence once.

    Ten citations were printed twice on one page the day the drawer was
    emptied: Al-Fatihah's own surah under two headings, Bukhari 3293 under both
    "What is istikhara?" and "What do I say?". Several sections legitimately
    cite the same verse, and a section cannot see what its siblings printed, so
    the screen claims each citation for the first section that asks for it.
    This check exists because that is invisible from any one section's code.
  */
  const claimed = new Map();
  for (const section of page.sections) {
    for (const source of section.sources ?? []) {
      if (!resolves(source)) continue;
      const id = JSON.stringify(source);
      if (claimed.has(id)) {
        warnings.push(
          `${page.id}: the same citation is cited under both "${claimed.get(id)}" and "${section.heading}". Only the first prints it.`,
        );
      } else {
        claimed.set(id, section.heading);
      }
    }
  }

  /*
    And a recitation must not also appear inside a narration printed on the
    same page. Bukhari 3293 IS the istikhara duʿa with its chain attached, so a
    page printing both said the same words twice, once as a thousand characters
    of narration and once as the thing to recite.
  */
  const strip = (t) => t.replace(/[\u064B-\u0652\u0670\u0640]/g, '').replace(/[\u0623\u0625\u0622]/g, '\u0627').replace(/[^\u0621-\u064A]/g, '');
  const printed = page.sections.flatMap((s) => (s.sources ?? []).map(resolveText).filter(Boolean));
  for (const section of page.sections) {
    if (!section.says) continue;
    const said = strip(section.says.arabic);
    if (said.length < 40) continue;
    for (const text of printed) {
      if (strip(text.arabic).includes(said)) {
        warnings.push(
          `${page.id}: "${section.heading}" prints a recitation that is also inside a narration on this page. The same words twice.`,
        );
        break;
      }
    }
  }

  if (!page.quickFacts) warnings.push(`${page.id}: no quickFacts.`);
  for (const fact of page.quickFacts ?? []) {
    if (fact.label.length > 15) {
      warnings.push(`${page.id}: fact label "${fact.label}" is ${fact.label.length} chars — the column is 96px and it will wrap to three lines.`);
    }
    if (fact.value.length > 62) {
      warnings.push(`${page.id}: fact value for "${fact.label}" is ${fact.value.length} chars — it will run to three lines.`);
    }
  }
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
