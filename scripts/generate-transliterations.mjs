/**
 * Generates `src/content/quran/transliterations.ts` — per-word transliteration
 * for Al-Fatiha and all of juz 30, from the same Quran Foundation API the
 * ayah text itself comes from (`generate-juz30.mjs`).
 *
 * ## The decision this reverses, and who reversed it
 *
 * ui-redesign-plan §5.3 settled "no transliteration line under the ayah" for
 * juz 30 — a Latin line is something people read INSTEAD of the Arabic.
 * Iyad reversed it on 30 Aug 2026 for the recite feature: *"transliteration
 * should be more than alfatihah … we do need them because most new muslims
 * cant read arabic."* Someone reciting along with the follower needs a line
 * they can actually read, and per-word data means the highlight can light
 * the Latin word in step with the Arabic one — reading practice smuggled
 * into recitation, which is the tradition's own trick.
 *
 * ## Why per-word counts are asserted, not hoped
 *
 * The words come from the API's token stream (`char_type_name === 'word'`,
 * end-of-ayah markers dropped) and the app's Arabic is `text_imlaei` split on
 * spaces. Probed before writing: the two counts agree. Every ayah is checked
 * here anyway — a mismatch is recorded as a warning and that ayah ships with
 * NO per-word line rather than a line that would highlight the wrong word
 * under a reader's voice.
 *
 * Run: node scripts/generate-transliterations.mjs   (network)
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const FIRST = 78;
const LAST = 114;

const get = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  return response.json();
};

const surahNumbers = [1];
for (let n = FIRST; n <= LAST; n += 1) surahNumbers.push(n);

/** surah → ayah → words. Only ayahs whose count matches the app's split. */
const bySurah = {};
let ayahs = 0;
let mismatches = 0;

for (const n of surahNumbers) {
  const data = await get(
    `https://api.quran.com/api/v4/verses/by_chapter/${n}` +
      `?words=true&word_fields=text_imlaei&fields=text_imlaei&per_page=300`,
  );
  const surah = {};
  for (const verse of data.verses) {
    const words = verse.words
      .filter((word) => word.char_type_name === 'word')
      .map((word) => word.transliteration?.text ?? '');
    const arabicCount = verse.text_imlaei.trim().split(/\s+/).length;
    if (words.length !== arabicCount || words.some((word) => word.length === 0)) {
      mismatches += 1;
      console.warn(
        `  ⚠ ${n}:${verse.verse_number} — ${words.length} words vs ${arabicCount} Arabic; skipped`,
      );
      continue;
    }
    surah[verse.verse_number] = words;
    ayahs += 1;
  }
  bySurah[n] = surah;
  process.stdout.write(`  ${n} — ${Object.keys(surah).length} ayahs\n`);
}

const file = `/**
 * GENERATED — do not edit by hand. \`node scripts/generate-transliterations.mjs\`.
 *
 * Per-word transliteration for Al-Fatiha and juz 30, from
 * api.quran.com/api/v4 (Quran Foundation), in the app's own scheme — the
 * ḥ dot and the ū macron, per ui-redesign-plan §5.3's survey of the
 * alternatives. Word arrays align index-for-index with the space-split of
 * the ayah's \`arabic\` in \`juz30.ts\`/\`fatiha.ts\`; the generator drops any
 * ayah where they would not, so a reader is never shown a Latin word lit
 * under the wrong Arabic one.
 *
 * §5.3's no-transliteration rule was reversed by Iyad on 30 Aug 2026 for
 * the recite feature — the generator's header carries his words.
 */

export const WORD_TRANSLITERATIONS: Record<number, Record<number, readonly string[]>> =
${JSON.stringify(bySurah, null, 2)};
`;

writeFileSync(join(root, 'src/content/quran/transliterations.ts'), file);
console.log(`\nWrote src/content/quran/transliterations.ts — ${ayahs} ayahs, ${mismatches} skipped.`);
