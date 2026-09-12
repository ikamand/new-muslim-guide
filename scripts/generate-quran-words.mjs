/**
 * Generates `src/content/quran/words.ts` — the word-by-word view of every
 * ayah the app opens one: Al-Fatihah, and each verse the Qur'an duas cite.
 *
 * Run: `npm run quran:words` (reads the cache only; run
 * `npm run quran:words:corpus` once first)
 *
 * ## Why only these ayahs
 *
 * The cache holds the whole Qur'an. The bundle should hold what a screen can
 * open: a word view is reached by tapping the Arabic on a dua card or on an
 * ayah of the surah screen, so the duas' verses are here and so is every
 * surah that screen lists — Al-Fatihah and juz 30. Since 10 Sep 2026, when
 * the surah screen's tap stopped covering an ayah and started opening it.
 *
 * ## What a word is
 *
 * The API's own token, with `char_type_name === 'word'` — the end-of-ayah
 * numeral is dropped. Each carries its Uthmani text, the English gloss and the
 * transliteration, all from the same token, so the three can never be shown
 * against the wrong word. The Arabic here is the API's Uthmani, not the
 * QuranEnc Uthmani the card above it prints; the two agree on every letter
 * and differ in a glyph or two of vowel placement, which is why the word view
 * renders its own words rather than splitting the card's string and hoping
 * the counts match.
 *
 * ⚠️ Nothing here is typed. Every character came from the cache, which came
 * from api.quran.com — see `fetch-quran-words.mjs` for the credit question.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { QURANIC_DUAS } from '../src/content/collections/quranic-duas.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cache = join(root, '.cache/quran/words');

/** Surahs shown whole, every ayah: Al-Fatihah and juz 30, the surah screen's list. */
const WHOLE_SURAHS = [1];
for (let n = 78; n <= 114; n += 1) WHOLE_SURAHS.push(n);

/* Every ayah wanted, as "s:a", in mushaf order. */
const wanted = new Set();
for (const entry of QURANIC_DUAS.entries) {
  for (const source of entry.sources ?? []) {
    if (source.kind !== 'quran') continue;
    const [from, to] = Array.isArray(source.ayah) ? source.ayah : [source.ayah, source.ayah];
    for (let n = from; n <= to; n += 1) wanted.add(`${source.surah}:${n}`);
  }
}

const chapters = new Map();
const chapter = (n) => {
  if (!chapters.has(n)) {
    const file = join(cache, `${n}.json`);
    if (!existsSync(file)) {
      throw new Error(`.cache/quran/words/${n}.json is missing — run \`npm run quran:words:corpus\` first`);
    }
    chapters.set(n, new Map(JSON.parse(readFileSync(file, 'utf8')).map((v) => [v.verse_number, v])));
  }
  return chapters.get(n);
};

for (const n of WHOLE_SURAHS) {
  for (const verse of chapter(n).keys()) wanted.add(`${n}:${verse}`);
}

const keys = [...wanted].sort((a, b) => {
  const [sa, va] = a.split(':').map(Number);
  const [sb, vb] = b.split(':').map(Number);
  return sa - sb || va - vb;
});

const words = {};
let count = 0;
for (const key of keys) {
  const [s, a] = key.split(':').map(Number);
  const verse = chapter(s).get(a);
  if (!verse) throw new Error(`${key} is not in the cache`);
  const row = verse.words
    .filter((w) => w.char_type_name === 'word')
    .map((w) => {
      const ar = w.text_uthmani?.trim();
      const im = w.text_imlaei?.trim();
      const en = w.translation?.text?.trim();
      const tr = w.transliteration?.text?.trim();
      if (!ar || !im || !en || !tr) throw new Error(`${key} word ${w.position}: missing text, gloss or transliteration`);
      return { ar, im, en, tr };
    });
  if (row.length === 0) throw new Error(`${key}: no words`);
  words[key] = row;
  count += row.length;
}

const file = `/**
 * GENERATED — do not edit by hand. \`npm run quran:words\`.
 *
 * Word by word: every ayah the app opens as a row of words — Al-Fatihah and
 * the verses the Qur'an duas cite. Each word carries its own Uthmani text,
 * English gloss and transliteration from one token of api.quran.com's word
 * stream, so the three cannot be shown against the wrong word. ${keys.length}
 * ayahs, ${count} words, read from the \`.cache/quran/words/\` mirror.
 *
 * The gloss and the transliteration are the Quranic Arabic Corpus's (Kais
 * Dukes, corpus.quran.com). The API lists no author for either, but both match
 * the corpus word for word on every ayah sampled across the mushaf on 11 Sep
 * 2026 — 70 ayahs for the gloss, 38 for the transliteration. \`providers.ts\`,
 * \`quranfoundation\`, records the sample.
 */

/** Where the words came from. A licence obligation. */
export const WORDS_SOURCE = {
  name: 'Quranic Arabic Corpus (Kais Dukes), served by Quran.com',
  where: 'corpus.quran.com, via api.quran.com',
  fetched: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
} as const;

export type AyahWord = {
  /** The word, Uthmani — the script the dua cards set. */
  ar: string;
  /** The same word, Imlaei — the script the surah screen sets. */
  im: string;
  /** Its English gloss. */
  en: string;
  /** Its transliteration. */
  tr: string;
};

/** Keyed "surah:ayah". Absent means the app has no word view for that ayah. */
export const AYAH_WORDS: Readonly<Record<string, readonly AyahWord[]>> =
${JSON.stringify(words, null, 2)};

/** The words of one ayah, or undefined where none were generated. */
export const ayahWords = (surah: number, ayah: number): readonly AyahWord[] | undefined =>
  AYAH_WORDS[\`\${surah}:\${ayah}\`];
`;

writeFileSync(join(root, 'src/content/quran/words.ts'), file);
console.log(`Wrote src/content/quran/words.ts — ${keys.length} ayahs, ${count} words.`);
