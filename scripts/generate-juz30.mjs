/**
 * Generates `src/content/quran/juz30.ts` and `fatiha.ts` from the Quran
 * Foundation API.
 *
 * Run: `npm run quran:juz30`  (needs a network connection for the Arabic, and
 * `npm run quran:itani:corpus` once, for the English)
 *
 * ## Why Al-Fatiha comes out of the same script but not the same file
 *
 * It is surah 1 and juz 30 is surahs 78–114, so putting it in a file called
 * `juz30.ts` would make the file's name a lie. It is fetched here because the
 * rule that matters is not "one file per juz" — it is that no Arabic in this
 * app is typed by a person, and the way to keep that true is to give every
 * surah the same one path in.
 *
 * The content ships in the app, as everything in `src/content/` does — the
 * whole premise is that a dead signal changes nothing, so this runs when we
 * say so and writes a file, rather than the app fetching at runtime.
 *
 * ## Why generated rather than typed
 *
 * Five hundred and sixty-four ayahs is not something to transcribe. Every
 * character of Arabic in the output came over the wire from a published text
 * and none of it was written from memory, which is the only way this file
 * could exist at all given what CLAUDE.md says about Arabic.
 *
 * ## Which fields, and why these
 *
 * - `text_imlaei` — the simplified script, which is what the rest of the app
 *   already sets. The API also serves Uthmani; taking that would change the
 *   script style of the whole app through the back door.
 * - The English is Talal Itani's ClearQuran, Allah edition, read from
 *   `.cache/quran/itani-allah.json` — Iyad's choice, 11 Sep 2026, replacing
 *   Saheeh International (translation 20 of this API, carried since 22 Aug).
 *   He wanted the sentence under an ayah and the word gloss above it to read
 *   as one voice; they cannot quite, because the gloss has no named author
 *   and Itani publishes nothing at word level, and he has accepted the gap.
 *   `fetch-quran-itani.mjs` records the terms and the cross-check.
 * - No transliteration. Settled deliberately — a Latin line under the ayah is
 *   read *instead of* the Arabic, and people end up memorising English letters
 *   and still cannot open a mushaf. The audio does that job better.
 *
 * The translation ships under CC BY-ND 4.0 with the credit the generated
 * file prints. The Arabic's API publishes no terms, which Iyad has decided to
 * build on; that decision is on the record in `providers.ts`.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const FIRST = 78;
const LAST = 114;

/* The English, one record per ayah, from the publisher's own verse-by-verse
   file. Missing means the mirror was never fetched, not that the ayah has no
   translation, and the run stops rather than writing an empty string. */
const itaniPath = join(root, '.cache/quran/itani-allah.json');
if (!existsSync(itaniPath)) throw new Error('.cache/quran/itani-allah.json is missing — run `npm run quran:itani:corpus` first');
const itani = new Map(JSON.parse(readFileSync(itaniPath, 'utf8')).map((v) => [`${v.s}:${v.a}`, v.en]));
const english = (s, a) => {
  const text = itani.get(`${s}:${a}`);
  if (!text) throw new Error(`${s}:${a} has no English in the ClearQuran mirror`);
  return text;
};

const get = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/juz30' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
};

console.log(`Fetching surah 1 and surahs ${FIRST}–${LAST}…`);

const { chapters } = await get('https://api.quran.com/api/v4/chapters?language=en');
const meta = new Map(chapters.map((c) => [c.id, c]));

const fetchSurah = async (n) => {
  const info = meta.get(n);
  const data = await get(
    `https://api.quran.com/api/v4/verses/by_chapter/${n}` +
      '?fields=text_imlaei&per_page=300',
  );
  process.stdout.write(`  ${n} ${info.name_simple} — ${data.verses.length}\n`);
  return {
    number: n,
    name: info.name_simple,
    // The name as it is actually written. A convert meets these on a mosque
    // wall and in a mushaf's contents long before they can read a whole ayah,
    // and recognising the shape of "الإخلاص" is the first Arabic reading most
    // people do without noticing they are doing it.
    nameArabic: info.name_arabic,
    meaning: info.translated_name.name,
    place: info.revelation_place,
    ayahs: data.verses.map((verse) => ({
      number: verse.verse_number,
      arabic: verse.text_imlaei,
      translation: english(n, verse.verse_number),
    })),
  };
};

const fatiha = await fetchSurah(1);
// Seven, and the first is the basmala — which is what the bundled recitation
// in `audio.ts` records as `fatiha-1`. If a future text ever numbers the
// basmala out of the surah, the seven clips silently line up against the wrong
// ayahs, so this is checked rather than assumed.
if (fatiha.ayahs.length !== 7) throw new Error(`Expected 7 ayahs in Al-Fatiha, got ${fatiha.ayahs.length}`);

const surahs = [];
for (let n = FIRST; n <= LAST; n += 1) surahs.push(await fetchSurah(n));

const total = surahs.reduce((n, s) => n + s.ayahs.length, 0);
if (total !== 564) throw new Error(`Expected 564 ayahs across Juz 30, got ${total}`);

const render = (s) => `  {
    number: ${s.number},
    name: ${JSON.stringify(s.name)},
    nameArabic: ${JSON.stringify(s.nameArabic)},
    meaning: ${JSON.stringify(s.meaning)},
    place: ${JSON.stringify(s.place)},
    ayahs: [
${s.ayahs
  .map(
    (a) =>
      `      { number: ${a.number}, arabic: ${JSON.stringify(a.arabic)}, translation: ${JSON.stringify(a.translation)} },`,
  )
  .join('\n')}
    ],
  },`;

const body = surahs.map(render).join('\n');

const file = `/**
 * Juz 30 — surahs 78 to 114, the short ones at the end of the mushaf.
 *
 * GENERATED by \`node scripts/generate-juz30.mjs\`. Do not edit by hand: a
 * correction made here is lost the next time it runs, and a correction that
 * needs making belongs upstream, where the text is published.
 *
 * ${surahs.length} surahs, ${total} ayahs. Every character of Arabic came over the wire from
 * api.quran.com, and every word of English from ClearQuran's own verse-by-verse
 * file, rather than from memory — the only way a file this size could exist
 * under this project's rules about Arabic text.
 *
 * The Arabic is Imlaei — the simplified script the rest of the app already
 * sets. The API also serves Uthmani, and taking that would have changed the
 * script style of the whole app through the back door.
 *
 * There is no transliteration, deliberately. A Latin line under an ayah is
 * read *instead of* the Arabic, and someone who learns that way memorises
 * English letters and still cannot open a mushaf. Recitation does that job.
 *
 * The translation is Talal Itani's, the Allah edition of ClearQuran, under
 * CC BY-ND 4.0 with the credit below. Iyad's choice, 11 Sep 2026, replacing
 * Saheeh International. The Arabic's API publishes no terms; \`providers.ts\`
 * records the decision to build on it.
 *
 * ⚠️ REVIEW REQUIRED — the text is published and unedited, and nobody
 * qualified has yet read this file back against a mushaf.
 */

/** Where the text and the translation came from. A licence obligation. */
export const JUZ30_SOURCE = {
  arabic: 'Imlaei text from api.quran.com (Quran Foundation)',
  translation: 'Translation by Talal Itani, ClearQuran.com',
  fetched: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
} as const;

export type Ayah = {
  number: number;
  arabic: string;
  translation: string;
};

export type Surah = {
  number: number;
  /** Transliterated name, as it is normally referred to — "An-Nas". */
  name: string;
  /** The name in Arabic — "الناس". */
  nameArabic: string;
  /** What the name means in English — "Mankind". */
  meaning: string;
  place: string;
  ayahs: readonly Ayah[];
};

export const JUZ_30: readonly Surah[] = [
${body}
];
`;

/*
  Al-Fatiha, in its own file for the reason the header gives: it is surah 1,
  and a file called `juz30.ts` should not contain it.

  It imports its types from there rather than redeclaring them, so the two
  generated files cannot drift into two shapes of `Surah` — which would compile
  and then fail the first time a screen held one of each.
*/
const fatihaFile = `/**
 * Al-Fatiha — the surah recited in every rak'ah of every prayer.
 *
 * GENERATED by \`node scripts/generate-juz30.mjs\`. Do not edit by hand.
 *
 * Seven ayahs, and the first is the basmala. That numbering is what the seven
 * bundled clips in \`src/content/audio.ts\` are cut to, and the generator
 * asserts it rather than trusting it — a text that numbered the basmala out of
 * the surah would leave every clip playing against the wrong line, silently.
 *
 * Same source, same script and same translation as \`juz30.ts\`, so the two
 * read as one book rather than as two imports.
 *
 * ⚠️ REVIEW REQUIRED, and the translation's terms — both exactly as recorded
 * in the header of \`juz30.ts\`.
 */

import type { Surah } from './juz30';

export const AL_FATIHA: Surah = ${render(fatiha).trim().replace(/,$/, '')};
`;

mkdirSync(join(root, 'src/content/quran'), { recursive: true });
writeFileSync(join(root, 'src/content/quran/juz30.ts'), file);
writeFileSync(join(root, 'src/content/quran/fatiha.ts'), fatihaFile);
console.log(
  `\nWrote src/content/quran/juz30.ts — ${surahs.length} surahs, ${total} ayahs.` +
    `\nWrote src/content/quran/fatiha.ts — ${fatiha.ayahs.length} ayahs.`,
);
