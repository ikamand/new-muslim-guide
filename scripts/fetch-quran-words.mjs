/**
 * Downloads the whole Qur'an word by word — every word's Uthmani and Imlaei
 * text, English gloss, transliteration and per-word audio path — from the
 * Quran Foundation API into `.cache/quran/words/{chapter}.json`.
 *
 * Run: `npm run quran:words:corpus` (needs a network connection, once)
 *
 * ## Why the whole Qur'an, and why now
 *
 * The endpoint this reads, `api.quran.com/api/v4`, is the one the app has
 * always taken juz 30 and its transliterations from. Quran Foundation has
 * retired it in favour of a host that needs registered credentials, with no
 * shutdown date published. It still answers today. The Qur'an does not
 * change, so there is no reason to ever fetch this twice — but there is every
 * reason to fetch all of it once while nothing is asked for, rather than the
 * 700 ayahs the app shows this week and a key next year for the rest.
 *
 * So this is the mirror of the word-level source, exactly as
 * `.cache/quran/saheeh.json` mirrors QuranEnc and `.cache/hadith/` mirrors
 * the hadith corpus: fetched bytes, never typed, gitignored, read by the
 * generators so an outage — or a retirement — cannot stall a regeneration.
 * Iyad's question that settled it, 10 Sep 2026: *"if they take it down will
 * we also go down?"* No. The app never calls this at runtime, and once the
 * cache exists the generators never call it either.
 *
 * ## What is stored
 *
 * The API's own `verses` array for the chapter, raw, one file per chapter.
 * Nothing is reshaped on the way in, so a later generator can want a field
 * this one did not think of. About 50 MB for all 114; Al-Baqarah alone is
 * 2.3 MB. `per_page=300` returns even its 286 ayahs in one request, and the
 * `pagination` block is checked rather than assumed.
 *
 * A chapter whose file already exists is SKIPPED — delete the file to refresh
 * it. When `~/Documents/islamic-data/quran/words/` exists the file is copied
 * there too, which is the second copy that survives a wiped `.cache/`.
 *
 * ⚠️ Credit: the API names no author for its English word-by-word gloss —
 * `resources/word_by_word_translations` lists it as "Unknown". It matches
 * Shaikh and Khatri's *The Glorious Quran Word-for-Word* everywhere checked,
 * but quran.com itself prints no such credit, so the app can only say
 * "Quran.com, author unstated". `providers.ts` carries that.
 */
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, '.cache/quran/words');
const mirror = join(homedir(), 'Documents/islamic-data/quran/words');

const FIELDS =
  'words=true' +
  '&word_fields=text_uthmani,text_imlaei' +
  '&word_translation_language=en' +
  '&fields=text_uthmani,text_imlaei' +
  '&per_page=300';

const get = async (url) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/quran-words' } });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return response.json();
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 2000));
    }
  }
  throw lastError;
};

mkdirSync(out, { recursive: true });
const mirroring = existsSync(dirname(mirror));
if (mirroring) mkdirSync(mirror, { recursive: true });

let fetched = 0;
let skipped = 0;
let words = 0;
for (let chapter = 1; chapter <= 114; chapter += 1) {
  const file = `${chapter}.json`;
  const target = join(out, file);
  if (existsSync(target)) {
    skipped += 1;
    if (mirroring && !existsSync(join(mirror, file))) copyFileSync(target, join(mirror, file));
    continue;
  }
  const data = await get(`https://api.quran.com/api/v4/verses/by_chapter/${chapter}?${FIELDS}`);
  const { verses, pagination } = data;
  if (!Array.isArray(verses) || verses.length === 0) {
    throw new Error(`chapter ${chapter}: empty result`);
  }
  if (pagination?.next_page || pagination?.total_records !== verses.length) {
    throw new Error(
      `chapter ${chapter}: ${verses.length} of ${pagination?.total_records} ayahs in one page — refusing to write a partial chapter`,
    );
  }
  for (const verse of verses) {
    if (!verse.words?.length || !verse.text_imlaei || !verse.text_uthmani) {
      throw new Error(`chapter ${chapter}: ayah ${verse.verse_number} came back without words or text`);
    }
    words += verse.words.filter((w) => w.char_type_name === 'word').length;
  }
  writeFileSync(target, JSON.stringify(verses));
  if (mirroring) copyFileSync(target, join(mirror, file));
  fetched += 1;
  process.stdout.write(`\r  chapter ${chapter}/114 — ${verses.length} ayahs`);
}
console.log(
  `\n${fetched} chapters fetched, ${skipped} already present, ${words} words${
    mirroring ? `, mirrored to ${mirror}` : ' (no islamic-data folder to mirror to)'
  }.`,
);
