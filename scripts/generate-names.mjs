/**
 * The names of Allah, as the Qur'an itself lists them.
 *
 * Run: `npm run collection:names` (needs a network connection)
 * Writes `src/content/collections/quranic-names.ts`.
 *
 * ## Why this is not the ninety-nine
 *
 * It was meant to be. `docs/build-order.md` Phase 3 named AlAdhan's
 * `asmaAlHusna` — 99 records, free, no key — and flagged one open question:
 * which enumeration. Calling the four sources answered it, and the answer
 * changed the feature.
 *
 * - The STATEMENT that Allah has ninety-nine names is in **Bukhari 2736**,
 *   **Bukhari 7392** and **Muslim 2677**. Authentic, and not in doubt.
 * - An enumerated LIST appears in only two places: **Tirmidhi 3507** and
 *   **Ibn Majah 3861** — and the two lists do not agree. Tirmidhi has
 *   al-Quddūs, al-Ghaffār, al-Qahhār and al-Fattāḥ where Ibn Majah does not;
 *   Ibn Majah has al-Qāhir, al-Qarīb, ar-Rabb and al-Mubīn where Tirmidhi does
 *   not.
 * - **Tirmidhi 3507 is graded Ḍaʿīf by all three graders** the corpus carries:
 *   Ahmad Muhammad Shakir, Al-Albani and Zubair Ali Zai.
 * - AlAdhan publishes the Tirmidhi list — 97 of its 99 names occur in
 *   Tirmidhi 3507 against 73 in Ibn Majah 3861.
 *
 * `CLAUDE.md` is settled on this: the app's evidence is authenticated hadith,
 * and a narration that cannot be placed as authentic is left out. So the app
 * does not print that enumeration, and the plan's fallback — print the names
 * without calling them canonical — was not enough either, because it still
 * ships the weak list with the label filed off. Iyad decided on 28 Aug 2026:
 * Qur'anic names only.
 *
 * ## Why one passage rather than a search of the whole Qur'an
 *
 * The obvious mechanical rule — take a candidate name and see whether it
 * occurs in the Qur'an — was tried and does not work. Matching AlAdhan's 99
 * against all 6,236 ayahs returns `al-Ḥaqq` 181 times, because الحق usually
 * means "the truth"; `al-Muʾmin` 120 times, by catching المؤمنون, "the
 * believers"; `al-Ḥayy` 101 times, by catching الحياة. Deciding which
 * occurrences NAME Allah rather than merely using the word is exegesis, and
 * that is substance rather than a rule a script can hold.
 *
 * So the collection is the passage where the Qur'an enumerates them itself —
 * **59:22–24**, which closes `لَهُ ٱلۡأَسۡمَآءُ ٱلۡحُسۡنَىٰ`, "to Him belong the
 * best names". Inside it there is nothing to decide: every name is explicitly
 * Allah's, in order, and Saheeh International footnotes each one separately,
 * which is what supplies an explanation nobody here had to write.
 *
 * ## Nothing below is written
 *
 * Every string comes over the wire from QuranEnc. The Arabic is the mushaf's,
 * the gloss is Saheeh International's rendering, and the explanation is their
 * own footnote — followed where it cross-references another verse. The one
 * editorial act is the ALIGNMENT of an Arabic name to its gloss, and it is
 * asserted rather than trusted: the script fails if a name is not present in
 * the verse it claims.
 *
 * ⚠️ No transliteration, on the same rule as `duas/hisn.ts` and `juz30.ts`:
 * writing one is the model producing Arabic-adjacent text. AlAdhan publishes
 * transliterations but in a scheme unlike the app's — "Ar Rahmaan" against the
 * app's "Ar-Raḥmān" — so importing them would put two schemes on one screen.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const get = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/names' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return (await response.json()).result;
};

const ayah = (s, a) => get(`https://quranenc.com/api/v1/translation/aya/english_saheeh/${s}/${a}`);

/**
 * The consonantal skeleton, and a map from each skeleton index back to the raw
 * string, so a name can be SLICED out of the verse instead of transcribed.
 *
 * The first draft typed each name into the table below and the assertion
 * refused all of them: the mushaf carries pause marks (`ۖ`, `ۚ`) and writes
 * the long ā of `ٱلرَّحۡمَٰنُ` as a combining mark, none of which survives being
 * retyped. Taking the substring from the verse removes transcription from the
 * loop entirely, which is the rule this whole repository runs on.
 */
const skeleton = (text) =>
  String(text)
    .normalize('NFC')
    .replace(/ٰ/g, 'ا')
    .replace(/[ٱٲٳٵ]/g, 'ا')
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[آأإ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^ء-ي]/g, '');

/**
 * The raw span of `verse` whose skeleton is `key`, or undefined.
 *
 * The index arithmetic is the fiddly part and the first version got it wrong
 * in both directions: it opened the span on a mark belonging to the PREVIOUS
 * word — `َۖ عَٰلِمُ` — and closed it before the final vowel, so `ٱلرَّحِيمُ`
 * came out as `ُ ٱلرَّحِيم`. Marks contribute nothing to a skeleton, so several
 * raw positions share one skeleton index and a naive search lands on the
 * earliest of them.
 *
 * So a boundary is only accepted on a character that actually CONTRIBUTES,
 * and the closing edge then sweeps up the vowels hanging off the last letter —
 * but not the pause marks (`ۖ`, `ۚ`), which belong to the recitation rather
 * than to the word.
 */
function sliceBySkeleton(verse, key) {
  const chars = [...verse];
  const contributes = chars.map((c) => skeleton(c).length > 0);
  const before = [0];
  for (const c of chars) before.push(before[before.length - 1] + skeleton(c).length);

  const at = skeleton(verse).indexOf(key);
  if (at === -1) return undefined;

  const from = chars.findIndex((_, i) => contributes[i] && before[i] === at);
  const lastLetter = chars.findIndex(
    (_, i) => contributes[i] && before[i + 1] === at + key.length,
  );
  if (from === -1 || lastLetter === -1) return undefined;

  /* Vowels belong to the letter; pause marks (U+06D6–U+06ED) do not. */
  let end = lastLetter + 1;
  while (end < chars.length && !contributes[end] && !/[\u06D6-\u06ED\s]/.test(chars[end])) {
    end += 1;
  }
  const span = chars.slice(from, end).join('');
  return skeleton(span) === key ? span : undefined;
}

/** A footnote body, by its bracketed number, from a verse that carries it. */
function footnote(verse, number) {
  const all = String(verse.footnotes ?? '');
  const start = all.indexOf(`[${number}]`);
  if (start === -1) throw new Error(`footnote [${number}] not in ${verse.sura}:${verse.aya}`);
  const rest = all.slice(start + `[${number}]`.length);
  const next = rest.search(/\n?\[\d+\]/);
  return tidy((next === -1 ? rest : rest.slice(0, next)).trim());
}

/**
 * The publisher's spacing, not the publisher's words.
 *
 * QuranEnc's footnotes carry a space before some closing punctuation —
 * `(mercy) .` and `(i.e., extremely merciful) .` — which is an artefact of
 * their pipeline rather than an editorial choice, and it reads as a typo on a
 * phone. Only whitespace moves, and the assertion below proves it: strip every
 * space from both strings and they must be identical. That is the same way
 * `hisn-clean.mjs` proves its own strip, and it is the only reason touching a
 * publisher's text is defensible at all.
 */
function tidy(text) {
  const out = text.replace(/\s+([.,;:!?])/g, '$1').replace(/\s{2,}/g, ' ');
  const bare = (x) => x.replace(/\s/g, '');
  if (bare(out) !== bare(text)) throw new Error('tidy() changed more than whitespace');
  return out;
}

/*
  The alignment, and the only editorial act in this file.

  `arabic` is the name as the mushaf writes it, `gloss` is Saheeh
  International's rendering of it in that verse, and `note` says where their
  explanation of it comes from — their own footnote on the name, or, where
  the footnote refers the reader elsewhere, the note at that reference.

  Order is the order of the passage. The assertion below refuses to write the
  file if an `arabic` string is not actually in the verse it claims.
*/
const NAMES = [
  { id: 'alim-al-ghayb', sura: 59, aya: 22, key: 'عَٰلِمُ ٱلۡغَيۡبِ وَٱلشَّهَٰدَةِ',
    gloss: 'Knower of the unseen and the witnessed', from: [6, 73], fn: 320 },
  /*
    One entry, not two.

    The verse says them as a pair — `هُوَ ٱلرَّحۡمَٰنُ ٱلرَّحِيمُ` — and Saheeh
    International footnotes them as a pair, in a single note that spends most
    of its length on the difference between the two. Splitting them put the
    same 1,100-character paragraph on two adjacent cards, which is how it
    looked the first time this was rendered, and it misrepresented a note that
    was written about both.
  */
  { id: 'ar-rahman-ar-rahim', sura: 59, aya: 22, key: 'ٱلرَّحۡمَٰنُ ٱلرَّحِيمُ',
    gloss: 'the Entirely Merciful, the Especially Merciful', from: [1, 1], fn: 3 },
  { id: 'al-malik', sura: 59, aya: 23, key: 'ٱلۡمَلِكُ', gloss: 'the Sovereign', fn: 1658 },
  { id: 'al-quddus', sura: 59, aya: 23, key: 'ٱلۡقُدُّوسُ', gloss: 'the Pure', fn: 1659 },
  { id: 'as-salam', sura: 59, aya: 23, key: 'ٱلسَّلَٰمُ', gloss: 'the Perfection', fn: 1660 },
  { id: 'al-mumin', sura: 59, aya: 23, key: 'ٱلۡمُؤۡمِنُ', gloss: 'the Grantor of Security', fn: 1661 },
  { id: 'al-muhaymin', sura: 59, aya: 23, key: 'ٱلۡمُهَيۡمِنُ', gloss: 'the Overseer', fn: 1662 },
  { id: 'al-aziz', sura: 59, aya: 23, key: 'ٱلۡعَزِيزُ',
    gloss: 'the Exalted in Might', from: [2, 129], fn: 44 },
  { id: 'al-jabbar', sura: 59, aya: 23, key: 'ٱلۡجَبَّارُ', gloss: 'the Compeller', fn: 1664 },
  { id: 'al-mutakabbir', sura: 59, aya: 23, key: 'ٱلۡمُتَكَبِّرُ', gloss: 'the Superior', fn: 1665 },
  { id: 'al-khaliq', sura: 59, aya: 24, key: 'ٱلۡخَٰلِقُ', gloss: 'the Creator', fn: 1666 },
  { id: 'al-bari', sura: 59, aya: 24, key: 'ٱلۡبَارِئُ', gloss: 'the Producer', fn: 1667 },
  { id: 'al-musawwir', sura: 59, aya: 24, key: 'ٱلۡمُصَوِّرُ', gloss: 'the Fashioner', fn: 1668 },
  { id: 'al-hakim', sura: 59, aya: 24, key: 'ٱلۡحَكِيمُ',
    gloss: 'the Wise', from: [6, 18], fn: 296 },
];

const cache = new Map();
const load = async (s, a) => {
  const key = `${s}:${a}`;
  if (!cache.has(key)) cache.set(key, await ayah(s, a));
  return cache.get(key);
};

console.log('The names of Allah in Qur’an 59:22–24, from QuranEnc (Saheeh International)\n');

const entries = [];
for (const name of NAMES) {
  const host = await load(name.sura, name.aya);

  /*
    The assertion that makes the alignment checkable rather than asserted.
    A gloss attached to the wrong name would read perfectly and be wrong, and
    nothing else in the pipeline could see it.
  */
  const arabic = sliceBySkeleton(host.arabic_text, skeleton(name.key));
  if (!arabic) {
    throw new Error(`${name.id}: "${name.key}" is not in ${name.sura}:${name.aya}`);
  }
  if (!host.translation.includes(name.gloss)) {
    throw new Error(`${name.id}: "${name.gloss}" is not in the translation of ${name.sura}:${name.aya}`);
  }

  const source = name.from ? await load(name.from[0], name.from[1]) : host;
  entries.push({
    id: name.id,
    title: name.gloss,
    arabic,
    translation: footnote(source, name.fn),
    note: `Qur’an ${name.sura}:${name.aya}`,
    sura: name.sura,
    aya: name.aya,
  });
  console.log(`  ${name.id.padEnd(16)} ${name.gloss}`);
}

const lines = entries.map((e) => `  {
    id: ${JSON.stringify(e.id)},
    title: ${JSON.stringify(e.title)},
    arabic: ${JSON.stringify(e.arabic)},
    translation: ${JSON.stringify(e.translation)},
    note: ${JSON.stringify(e.note)},
    sources: [quran(${e.sura}, ${e.aya}, { surahName: 'Al-Hashr' })],
  },`);

const file = `/**
 * The names of Allah as the Qur'an lists them, in 59:22–24.
 *
 * GENERATED by \`npm run collection:names\`. Do not edit by hand.
 *
 * Every character came over the wire from QuranEnc's Saheeh International
 * edition: the Arabic is the mushaf's, each title is their rendering of that
 * name in that verse, and each explanation is their own footnote on it.
 * Nothing here was written or remembered.
 *
 * ⚠️ This is deliberately NOT "the ninety-nine names". The statement that
 * Allah has ninety-nine is authentic — Bukhari 2736, Bukhari 7392, Muslim
 * 2677 — but the only enumerated lists are Tirmidhi 3507, graded Ḍaʿīf by all
 * three graders in the corpus, and Ibn Majah 3861, which lists different
 * names. The script's header carries the full working.
 *
 * ⚠️ No transliteration, on the same rule as \`duas/hisn.ts\` and \`juz30.ts\`.
 *
 * ⚠️ UNREVIEWED. The texts are the publisher's, but which names to present and
 * how to frame them is substance, and \`docs/scholarly-review.md\` is where that
 * is cleared.
 */
import { quran } from '../sources';
import type { Collection } from '../types';

export const QURANIC_NAMES: Collection = {
  id: 'quranic-names',
  title: 'The names of Allah',
  subtitle: 'As the Qur’an itself lists them, in Surat al-Hashr.',
  provider: 'quranenc',
  entries: [
${lines.join('\n')}
  ],
};
`;

writeFileSync(join(root, 'src/content/collections/quranic-names.ts'), file);
console.log(`\nWrote ${entries.length} names to src/content/collections/quranic-names.ts`);
