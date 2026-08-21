/**
 * Generates the translation sheet — every translatable string, in every language.
 *
 * Run: `npm run i18n:manifest`   Check only: `npm run i18n:manifest -- --check`
 *
 * This is what a translator works from, so it is read out of `src/content/`
 * rather than kept by hand. Add a duʿa and its rows appear; change an English
 * sentence and its row shows the new wording with the old translations still
 * beside it, which is exactly when a translator needs to be told.
 *
 * It also reports keys present in a locale file that no longer exist in the
 * content — the drift that a stringly-keyed override table invites.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (p) => import(join(root, p));

const { Recitations } = await load('src/content/recitations.ts');
// Every guide, not a list repeated here — a new guide was silently missed
// from the sheet the first time one was added.
const { GUIDES } = await load('src/content/guides.ts');
const { PILLARS } = await load('src/content/pillars.ts');
const { IMAN_PILLARS } = await load('src/content/iman.ts');
const { REFERENCES } = await load('src/content/references.ts');
const { DUAS } = await load('src/content/duas.ts');
const { PHRASES } = await load('src/content/phrases.ts');
const { RECITERS } = await load('src/content/quran/recitation.ts');
const { CONTENT_DICTS } = await load('src/i18n/content/index.ts');
const { LOCALES, LOCALE_NAMES, SOURCE_LOCALE } = await load('src/i18n/locales.ts');

const targets = LOCALES.filter((l) => l !== SOURCE_LOCALE);

// Keyed by the English text, so a sentence the generated prayers repeat
// seventeen times is one row and gets one translation.
const byText = new Map();
const add = (context, english) => {
  if (!english || !english.trim()) return;
  const row = byText.get(english) ?? { english, contexts: new Set() };
  row.contexts.add(context);
  byText.set(english, row);
};

// Structured notes carry prose in `text`, and a `differs` note carries more of
// it in each position. A note's `kind` and a school's name are not translated:
// one is a classification, the other is "Hanafi" in every language.
const addNotes = (context, notes) => {
  for (const note of notes ?? []) {
    add(context, note.text);
    add(context, note.additionalExplanation);
    for (const position of note.positions ?? []) add(context, position.position);
  }
};

for (const guide of GUIDES) {
  add(`Guide: ${guide.title}`, guide.title);
  add(`Guide: ${guide.title}`, guide.subtitle);
  addNotes(`Guide: ${guide.title}`, guide.meta?.notes);
  for (const step of guide.steps) {
    const where = `${guide.title} — ${step.title}`;
    add(where, step.title);
    add(where, step.instruction);
    add(where, step.note);
    addNotes(where, step.notes);
  }
}

for (const [name, recitation] of Object.entries(Recitations)) {
  const where = `Recitation: ${recitation.title ?? name}`;
  if (recitation.verses) {
    recitation.verses.forEach((verse, index) => {
      add(`${where}, ayah ${index + 1}`, verse.translation);
    });
  } else {
    add(where, recitation.translation);
  }
  add(where, recitation.times);
}

for (const [label, list] of [['Five Pillars', PILLARS], ['Six Articles', IMAN_PILLARS]]) {
  for (const pillar of list) {
    const where = `${label} — ${pillar.title}`;
    for (const field of ['title', 'summary', 'detail', 'note']) {
      add(where, pillar[field]);
    }
    addNotes(where, pillar.meta?.notes);
  }
}

for (const phrase of PHRASES) {
  const where = `Phrase: ${phrase.said}`;
  add(where, phrase.meaning);
  add(where, phrase.when);
  add(where, phrase.reply);
  addNotes(where, phrase.meta?.notes);
}

// Only the blurb. A reciter's name is a person's name in every language, and
// the folder is a path on a server that translating would break.
for (const reciter of RECITERS) {
  add(`Reciter: ${reciter.name}`, reciter.blurb);
}

for (const dua of DUAS) {
  add(`Duʿa: ${dua.when}`, dua.when);
  add(`Duʿa: ${dua.when}`, dua.note);
  addNotes(`Duʿa: ${dua.when}`, dua.meta?.notes);
}

for (const reference of REFERENCES) {
  const where = `Reference: ${reference.title}`;
  add(where, reference.title);
  add(where, reference.subtitle);
  addNotes(where, reference.meta?.notes);
  for (const section of reference.sections) {
    const inner = `${reference.title} — ${section.heading}`;
    add(inner, section.heading);
    add(inner, section.body);
    add(inner, section.note);
    addNotes(inner, section.notes);
  }
}

const rows = [...byText.values()]
  .map((r) => ({ english: r.english, context: [...r.contexts].join('; ') }))
  .sort((a, b) => a.context.localeCompare(b.context));

// Keys a locale file still carries that the content no longer has.
const live = new Set(rows.map((r) => r.english));
const orphans = [];
for (const locale of targets) {
  for (const k of Object.keys(CONTENT_DICTS[locale])) {
    if (!live.has(k)) orphans.push(`${locale}: "${k.slice(0, 60)}…"`);
  }
}

const COLUMNS = [
  ['context', 'Where it appears'],
  ['english', 'English'],
  ...targets.map((l) => [l, LOCALE_NAMES[l]]),
];

const csvCell = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
const csv =
  [
    COLUMNS.map(([, h]) => h).join(','),
    ...rows.map((r) =>
      COLUMNS.map(([k]) =>
        csvCell(targets.includes(k) ? (CONTENT_DICTS[k][r.english] ?? '') : r[k]),
      ).join(','),
    ),
  ].join('\n') + '\n';

const done = Object.fromEntries(
  targets.map((l) => [l, rows.filter((r) => CONTENT_DICTS[l][r.english]).length]),
);
const summary = targets
  .map((l) => `${LOCALE_NAMES[l]} ${done[l]}/${rows.length}`)
  .join(', ');

const md = `# Translation manifest

**${rows.length} translatable strings.** ${summary}.

Generated by \`npm run i18n:manifest\` from \`src/content/\`. Do not edit by hand.
Give a translator \`docs/i18n-manifest.csv\` — one row per string, English
alongside whatever exists in their language. Their returned column becomes the
matching file in \`src/i18n/content/\`, keyed by the English text.

Rows are deduplicated by English text, so a sentence the five generated prayers
share is translated once and lands in all of them. The "where it appears"
column lists every place a string is used — worth reading where the same
English needs different wording in another language.

Anything untranslated falls back to English, so a partly finished language is
safe to ship.

| Language | Translated | Remaining |
|---|---|---|
${targets.map((l) => `| ${LOCALE_NAMES[l]} | ${done[l]} | ${rows.length - done[l]} |`).join('\n')}

⚠️ These are translations of Qur'an, of dhikr said in prayer, and of
instructions on how to worship. They need a qualified translator in each
language, not a machine and not a fluent friend.
`;

const csvPath = join(root, 'docs/i18n-manifest.csv');
const mdPath = join(root, 'docs/i18n-manifest.md');

if (process.argv.includes('--check')) {
  const stale = [
    [csvPath, csv],
    [mdPath, md],
  ].filter(([p, want]) => !existsSync(p) || readFileSync(p, 'utf8') !== want);
  if (stale.length) {
    console.error('Translation manifest is out of date. Run: npm run i18n:manifest');
    process.exit(1);
  }
  console.log(`Translation manifest up to date — ${rows.length} strings.`);
} else {
  writeFileSync(csvPath, csv);
  writeFileSync(mdPath, md);
  console.log(`Wrote ${rows.length} strings. ${summary}.`);
}

if (orphans.length) {
  console.error(`\n${orphans.length} translation(s) for keys that no longer exist:`);
  for (const o of orphans) console.error(`  ${o}`);
  process.exit(1);
}
