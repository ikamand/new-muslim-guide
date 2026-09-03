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

/* ─────────────────────────────────────────────────────────────
   Style sources — the tokens hold only if leaks FAIL.

   The palette lives in constants/theme.ts, the type scale in
   components/themed-text.tsx, spacing in the Spacing tokens. All three
   leaked anyway — eleven local font sizes, a hand-typed rgba, negative
   margins compensating container gaps — because nothing failed when they
   did. These rules are the teeth: change gold in one line, grow every
   input in one line, and know nothing anywhere is quietly opting out.
   An allowlisted file carries its reason here, on the record.
   ───────────────────────────────────────────────────────────── */

const STYLE_RULES = [
  {
    name: 'hardcoded colour',
    re: /#[0-9a-fA-F]{6}\b|rgba?\(/,
    allow: {
      'src/constants/theme.ts': 'the palette itself',
    },
    fix: 'take a theme token; add one to constants/theme.ts if none fits',
  },
  {
    name: 'local font size',
    re: /fontSize:|lineHeight:/,
    allow: {
      'src/components/themed-text.tsx': 'the scale itself',
      'src/app/_layout.tsx': 'native header chrome, platform-sized on purpose',
      'src/components/illustrations.tsx': 'labels fitted inside drawn arches',
    },
    fix: 'use a ThemedText rung (INPUT_TEXT for a TextInput); a missing size is a missing rung',
  },
  {
    name: 'negative margin',
    re: /margin[A-Za-z]*:\s*-/,
    allow: {
      'src/components/themed-text.tsx': 'ARABIC_NAME_TRIM — documented optical trim of the Amiri line box',
    },
    fix: 'a negative margin compensates a container gap — fix the join instead (see the spacing rule in docs/ui-redesign-plan.md)',
  },
  {
    name: 'raw pixel spacing',
    re: /(padding|margin)[A-Za-z]*:\s*[1-9]/,
    allow: {},
    fix: 'use a Spacing token',
  },
];

const walkSrc = (dir) =>
  readdirSync(join(root, dir), { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? walkSrc(`${dir}/${entry.name}`)
      : /\.(ts|tsx)$/.test(entry.name)
        ? [`${dir}/${entry.name}`]
        : [],
  );

const styleFiles = ['src/app', 'src/components', 'src/hooks', 'src/lib', 'src/constants'].flatMap(
  walkSrc,
);

for (const file of styleFiles) {
  const lines = readFileSync(join(root, file), 'utf8').split('\n');
  for (const rule of STYLE_RULES) {
    if (file in rule.allow) continue;
    lines.forEach((line, i) => {
      const lead = line.trimStart();
      if (lead.startsWith('*') || lead.startsWith('//') || lead.startsWith('/*')) return;
      if (rule.re.test(line)) {
        errors.push(`${file}:${i + 1} ${rule.name} — ${rule.fix}\n    ${lead.slice(0, 90)}`);
      }
    });
  }
}


/* ─────────────────────────────────────────────────────────────
   Prose — the register holds only if slips FAIL. docs/writing.md.

   Every rule here names a habit the 3 Sep sweep found repeated across
   forty pages: the em-dash hinge, asterisks printed on screen, a file
   path inside a source note, "This note used to say…" shown to a reader,
   the same prayer spelt three ways. Strings only — comments are free to
   say anything. Publishers' text (evidence.ts, hisn.ts, juz30.ts) is not
   scanned; it is not ours to edit.
   ───────────────────────────────────────────────────────────── */

const PROSE_FILES = [
  ...walkSrc('src/content/learn'),
  'src/content/references.ts',
  'src/content/wudu.ts',
  'src/content/ghusl.ts',
  'src/content/tayammum.ts',
  'src/content/shahada.ts',
  'src/content/prayers.ts',
  'src/content/pillars.ts',
  'src/content/iman.ts',
  'src/content/phrases.ts',
  'src/i18n/ui.ts',
];

const SPELLINGS = [
  ['Ḏuhr', 'Dhuhr'],
  ['ʿIshāʾ', 'ʿIsha'],
  ['ʿIshaʾ', 'ʿIsha'],
  ['Makkah', 'Mecca'],
  ['Al-Fātiḥah', 'Al-Fatihah'],
  ['khuṭbah', 'khutbah'],
  ['adhān', 'adhan'],
  ['janāzah', 'janazah'],
  ['takbīr', 'takbir'],
  ['iqāmah', 'iqamah'],
  ['Muḥarram', 'Muharram'],
  ['Shawwāl', 'Shawwal'],
  ['ʿĀshūrāʾ', 'ʿAshuraʾ'],
];

const PROSE_RULES = [
  { name: 'em-dash hinge', re: / — /, fix: 'write the sentence: a full stop, a colon or a comma' },
  { name: 'unpaired **', test: (s) => (s.match(/\*\*/g) ?? []).length % 2 === 1, fix: 'bold markers come in pairs' },
  { name: 'file path in reader text', re: /\.tsx?\b|CLAUDE\.md|`[\w./-]+`/, fix: 'name the page, not the file' },
  {
    name: 'revision history in reader text',
    re: /\b(This (note|lesson|section|app|guide|page) (used to|said)|The app used to|used to (say|give|weigh|set out|be filed))\b/,
    fix: 'the reader gets the current answer; git holds the story',
  },
  { name: 'reviewer language', re: /claiming no(thing about the ruling| textual authority)/, fix: 'say "not a ruling"' },
  {
    name: 'capitals for emphasis',
    re: /\b(?!USD|GBP|EUR|CAD|AUD|PKR|INR|MYR|ZAR|AED|CE|MB|CSV|UTC)[A-Z]{3,}\b/,
    fix: 'stress belongs in the shape of the sentence',
  },
  ...SPELLINGS.map(([variant, canon]) => ({
    name: `spelling "${variant}"`,
    re: new RegExp(variant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
    fix: `spell it "${canon}" in prose`,
    allow: { 'src/content/phrases.ts': 'the said/reply fields are transliterations' },
  })),
  {
    name: 'spelling "salām"',
    re: /\bsalām\b/,
    fix: 'spell it "salam" in prose',
    allow: { 'src/content/phrases.ts': 'the said/reply fields are transliterations' },
  },
];

const stripComments = (src) =>
  src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' ')).replace(/^\s*\/\/.*$/gm, '');

for (const file of PROSE_FILES) {
  const src = stripComments(readFileSync(join(root, file), 'utf8'));
  const literal = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
  for (const m of src.matchAll(literal)) {
    const text = m[1] ?? m[2] ?? m[3] ?? '';
    if (text.length < 20) continue;
    const line = src.slice(0, m.index).split('\n').length;
    for (const rule of PROSE_RULES) {
      if (rule.allow && file in rule.allow) continue;
      const hit = rule.test ? rule.test(text) : rule.re.test(text);
      if (hit) errors.push(`${file}:${line} ${rule.name} — ${rule.fix}\n    ${text.slice(0, 90)}`);
    }
  }
}

for (const page of pages) {
  if (!page?.id) continue;

  const heroes = page.sections.filter((s) => s.promote === 'hero');
  /*
    The two-inks law: red marks where Muslims genuinely differ, and it stays
    rare or it stops meaning anything. A page where more than one section
    carries a differs note probably has a content problem, not a colour one.
  */
  const redSections = page.sections.filter((s) =>
    [...(s.notes ?? []), ...(s.note ? [] : [])].some((n) => n && n.kind === 'differs'),
  );
  if (redSections.length > 1) {
    warnings.push(
      `${page.id}: ${redSections.length} sections carry differs notes — red must stay rare to keep meaning.`,
    );
  }
  if (heroes.length > 1) {
    warnings.push(`${page.id}: ${heroes.length} heroes. One per page — the treatment stops meaning anything otherwise.`);
  }

  for (const section of page.sections) {
    /*
      A hero that CITES something must have the text behind it, or the
      promotion renders as nothing. A hero with no sources at all is legal
      since the matn frame (2 Sep): the frame renders the body and the
      quickFacts, which is exactly what Maghrib's page does — no strongly
      authenticated virtue names Maghrib alone, and the rule is to leave
      out what cannot be placed, not to force a citation.
    */
    if (
      section.promote &&
      (section.sources ?? []).length > 0 &&
      !(section.sources ?? []).some(resolves)
    ) {
      errors.push(
        `${page.id} → "${section.heading}" promotes a citation with no text behind it. ` +
          `It renders as nothing — npm run evidence has not been run for it.`,
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
