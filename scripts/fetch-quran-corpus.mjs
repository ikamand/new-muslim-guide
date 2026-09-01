/**
 * Downloads the full Qur'an — Uthmani Arabic + Saheeh International English —
 * from QuranEnc into `.cache/quran/saheeh.json`.
 *
 * Run: `npm run quran:corpus` (needs a network connection, once)
 *
 * The mirror of the app's Qur'an source, exactly as `.cache/hadith/` mirrors
 * the hadith corpus: fetched bytes, never typed, gitignored, read by the
 * generators so a QuranEnc outage cannot stall a regeneration. This script
 * exists because a `saheeh.json` was found in the cache with no surviving
 * writer — an orphan whose provenance had to be taken on faith plus a
 * verify run. Now the file is reproducible: delete it and run this.
 *
 * Shape: `saheeh.json` is an array of { s, a, ar, en } — matching the orphan
 * it replaced, so readers need no migration. The other editions are
 * { s, a, tr } — the Arabic lives once, in saheeh.json.
 *
 * Editions (an editorial choice, stated): Saheeh International (en),
 * french_montada (Noor International) and spanish_garcia (Isa García) — the
 * standard modern editions; QuranEnc also serves french_rashid and two other
 * Spanish Montada variants if the choice is ever revisited. An edition whose
 * file already exists is SKIPPED — delete the file to refresh it.
 *
 * ⚠️ Refresh deliberately, not automatically: if QuranEnc revises a
 * translation, `content:verify` (which checks LIVE QuranEnc) will show the
 * drift against a stale cache — that is the staleness alarm.
 */
import { existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, '.cache/quran');

const get = async (url) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/quran-corpus' } });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return (await response.json()).result;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 2000));
    }
  }
  throw lastError;
};

const EDITIONS = [
  { key: 'english_saheeh', file: 'saheeh.json', withArabic: true },
  { key: 'french_montada', file: 'french_montada.json', withArabic: false },
  { key: 'spanish_garcia', file: 'spanish_garcia.json', withArabic: false },
];

mkdirSync(out, { recursive: true });
for (const edition of EDITIONS) {
  const target = join(out, edition.file);
  if (existsSync(target)) {
    console.log(`${edition.file} already present — skipped (delete to refresh).`);
    continue;
  }
  const entries = [];
  for (let sura = 1; sura <= 114; sura += 1) {
    const verses = await get(
      `https://quranenc.com/api/v1/translation/sura/${edition.key}/${sura}`,
    );
    if (!Array.isArray(verses) || verses.length === 0) {
      throw new Error(`${edition.key} sura ${sura}: empty result`);
    }
    for (const verse of verses) {
      entries.push(
        edition.withArabic
          ? { s: Number(verse.sura), a: Number(verse.aya), ar: verse.arabic_text, en: verse.translation }
          : { s: Number(verse.sura), a: Number(verse.aya), tr: verse.translation },
      );
    }
    process.stdout.write(`\r  ${edition.key}: sura ${sura}/114 — ${entries.length} ayahs`);
  }
  console.log();
  if (entries.length !== 6236) {
    throw new Error(`${edition.key}: expected 6236 ayahs, got ${entries.length} — refusing to write a partial corpus`);
  }
  writeFileSync(target, JSON.stringify(entries));
  console.log(`Wrote .cache/quran/${edition.file} — ${entries.length} ayahs.`);
}
