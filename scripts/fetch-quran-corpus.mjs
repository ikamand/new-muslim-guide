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
 * Shape: an array of { s, a, ar, en } — surah, ayah, Arabic, English —
 * matching the orphan it replaces, so readers need no migration.
 *
 * ⚠️ Refresh deliberately, not automatically: if QuranEnc revises a
 * translation, `content:verify` (which checks LIVE QuranEnc) will show the
 * drift against a stale cache — that is the staleness alarm.
 */
import { writeFileSync, mkdirSync } from 'node:fs';
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

const entries = [];
for (let sura = 1; sura <= 114; sura += 1) {
  const verses = await get(
    `https://quranenc.com/api/v1/translation/sura/english_saheeh/${sura}`,
  );
  if (!Array.isArray(verses) || verses.length === 0) {
    throw new Error(`sura ${sura}: empty result`);
  }
  for (const verse of verses) {
    entries.push({
      s: Number(verse.sura),
      a: Number(verse.aya),
      ar: verse.arabic_text,
      en: verse.translation,
    });
  }
  process.stdout.write(`\r  sura ${sura}/114 — ${entries.length} ayahs`);
}
console.log();

if (entries.length !== 6236) {
  throw new Error(`expected 6236 ayahs, got ${entries.length} — refusing to write a partial corpus`);
}

mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'saheeh.json'), JSON.stringify(entries));
console.log(`Wrote .cache/quran/saheeh.json — ${entries.length} ayahs.`);
