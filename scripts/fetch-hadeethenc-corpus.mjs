/**
 * Mirrors HadeethEnc — the 2,776 graded, vowelled hadith — into
 * `.cache/hadeethenc/`.
 *
 * Run: `npm run hadeethenc:corpus` (needs a network connection; ~15 minutes
 * first time, seconds after — the fetch is resume-safe and skips what it
 * already holds, so an interruption costs nothing).
 *
 * Same standing as the other two mirrors (`.cache/hadith/`, `.cache/quran/`):
 * fetched bytes from the publisher, never typed, gitignored, never read at
 * runtime. One `hadeeths/one` call returns BOTH the English fields and the
 * `_ar` originals, so the corpus needs one request per hadith, not one per
 * language.
 *
 * What is written:
 *   categories.json — the 452 categories, ids and titles
 *   hadeeths.json   — id → the full record: hadeeth, hadeeth_ar, grade,
 *                     grade_ar, attribution, explanation(s), hints,
 *                     words_meanings_ar, categories, translations
 *
 * ⚠️ HadeethEnc's terms: no modification, addition or deletion, and name the
 * publisher. A mirror for build-time tooling honours that (the bytes ship
 * verbatim where they ship at all). Serving this data onward through an API
 * of our own is a different act — re-read their terms before that project
 * starts.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, '.cache/hadeethenc');
mkdirSync(out, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const get = async (url) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'new-muslim-guide/hadeethenc-corpus' },
      });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(attempt * 2000);
    }
  }
  throw lastError;
};

/* ── 1. categories ── */
const categories = await get('https://hadeethenc.com/api/v1/categories/list/?language=en');
writeFileSync(join(out, 'categories.json'), JSON.stringify(categories));
console.log(`categories: ${categories.length}`);

/* ── 2. enumerate every hadith id, category by category ── */
const ids = new Set();
for (const category of categories) {
  const want = Number(category.hadeeths_count ?? 0);
  if (!want) continue;
  for (let page = 1; ; page += 1) {
    const list = await get(
      `https://hadeethenc.com/api/v1/hadeeths/list/?language=en&category_id=${category.id}&page=${page}&per_page=100`,
    );
    const rows = list?.data ?? [];
    for (const row of rows) ids.add(String(row.id));
    if (rows.length < 100) break;
    await sleep(80);
  }
}
console.log(`unique hadith ids: ${ids.size}`);

/* ── 3. the records, resume-safe ── */
const target = join(out, 'hadeeths.json');
const held = existsSync(target) ? JSON.parse(readFileSync(target, 'utf8')) : {};
let fetched = 0;
let sinceSave = 0;
for (const id of ids) {
  if (held[id]) continue;
  held[id] = await get(`https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=${id}`);
  fetched += 1;
  sinceSave += 1;
  if (sinceSave >= 50) {
    writeFileSync(target, JSON.stringify(held));
    sinceSave = 0;
    process.stdout.write(`\r  ${Object.keys(held).length}/${ids.size}`);
  }
  await sleep(120);
}
writeFileSync(target, JSON.stringify(held));
console.log(
  `\nWrote .cache/hadeethenc/hadeeths.json — ${Object.keys(held).length} records (${fetched} newly fetched).`,
);
