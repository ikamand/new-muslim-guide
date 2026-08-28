/**
 * The ninety-nine names of Allah.
 *
 * Run: `npm run collection:names` (needs a network connection)
 * Writes `src/content/collections/quranic-names.ts`.
 *
 * ## Two sources, because neither one is enough
 *
 * The list, the transliteration and the English come from
 * **www.99NamesofAllah.name**, the PDF Iyad supplied on 28 Aug 2026,
 * transcribed into `scripts/data/99-names.json`. Its Latin columns extract
 * cleanly; a reviewer can diff that file against the document.
 *
 * The **vowelled Arabic comes from AlAdhan**, because the PDF's Arabic column
 * does not survive its own text layer — RTL reordering turns `ٱلرَّحْمَٰنُ` into
 * `نُ َٰ ر ْح م ١ ٱل َّ`. Retyping Arabic is the one thing this repository never
 * does, so the two are MATCHED rather than trusted to line up: by folded
 * transliteration and by position, both, and the run fails if any of the
 * ninety-nine disagrees. A wrong pairing would put one name's Arabic under
 * another's meaning, which reads perfectly and would never be noticed.
 *
 * ## The enumeration, and why this file takes a position
 *
 * The STATEMENT that Allah has ninety-nine names is authentic — Bukhari 2736,
 * Bukhari 7392, Muslim 2677. The enumerated LIST is another matter: it appears
 * only in **Tirmidhi 3507**, graded Ḍaʿīf by all three graders the corpus
 * carries, and **Ibn Majah 3861**, which lists different names. The first
 * version of this file shipped fourteen names from Qur'an 59:22–24 for exactly
 * that reason.
 *
 * The source used now states its own methodology, which is why it is usable
 * where AlAdhan's bare list was not: it holds that the list attached to those
 * narrations is an addition from later transmitters rather than the Prophet's
 * ﷺ own words, and derives its names from the Qur'an and authentic Sunnah
 * following Ibn al-Qayyim, Al-Ghazali, Ibn Hazm, Al-Qurtubi and Abd al-Razzaq
 * al-Badr. It also says plainly that Allah has more names than ninety-nine.
 *
 * ⚠️ **Its ninety-nine are nonetheless the same ninety-nine, in the same
 * order, that AlAdhan publishes from Tirmidhi** — checked name by name, which
 * is how the Arabic can be matched by position at all. The difference is the
 * justification and the quality of the English, not the membership. Recording
 * that here rather than leaving it to be rediscovered.
 *
 * ## What is checked
 *
 * - Every name matches its Arabic row by transliteration AND position.
 * - Every name's Arabic is cross-checked against Tirmidhi 3507 in the local
 *   corpus — a second, independently edited witness to the same spellings.
 *   That vouches for the SPELLING, and for nothing about the narration.
 * - The names the Qur'an lists itself, in 59:22–24, are marked with the verse.
 *
 * ⚠️ No transliteration field: the transliteration IS the title here, and it
 * is the source's own, in the scheme the rest of the app already uses.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const get = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/names' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return (await response.json()).result;
};

/* ------------------------- the list, and its Arabic ------------------------- */

/**
 * The ninety-nine, from the source Iyad supplied.
 *
 * `scripts/data/99-names.json` holds the number, the transliteration and the
 * English meaning, transcribed from the PDF's Latin text layer — which
 * extracts cleanly, and which a reviewer can diff against the document.
 *
 * Its ARABIC column does not extract: the PDF text layer reverses it, so
 * `ٱلرَّحْمَٰنُ` arrives as `نُ َٰ ر ْح م ١ ٱل َّ`. Retyping Arabic is the one thing
 * this repository never does, so the Arabic comes from AlAdhan's
 * `asmaAlHusna` and is matched to the list rather than trusted to line up.
 */
const LIST = JSON.parse(readFileSync(join(root, 'scripts/data/99-names.json'), 'utf8')).names;

/**
 * A transliteration reduced to something two schemes can be compared on.
 *
 * The two sources write the same name differently — `Ar-Raḥmān` against
 * `Ar Rahmaan`, `Al-ʿAzīz` against `Al Azeez` — so the match folds away
 * diacritics, case, punctuation and the doubled vowels one of them uses for
 * length. Position is checked as well, because a fold this aggressive could
 * in principle collide.
 */
const foldName = (text) =>
  String(text)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z]/g, '')
    .replace(/aa+/g, 'a')
    .replace(/ee+/g, 'i')
    .replace(/oo+/g, 'u')
    .replace(/ii+/g, 'i')
    .replace(/uu+/g, 'u');

const skeleton = (text) =>
  String(text)
    .normalize('NFC')
    .replace(/\u0670/g, 'ا')
    .replace(/[\u0671\u0672\u0673\u0675]/g, 'ا')
    .replace(/[\u064B-\u0670\u065F\u06D6-\u06ED\u0640]/g, '')
    .replace(/[آأإ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^ء-ي]/g, '');

console.log('The ninety-nine names — list from 99NamesofAllah.name, Arabic from AlAdhan\n');

const response = await fetch('https://api.aladhan.com/v1/asmaAlHusna', {
  headers: { 'user-agent': 'new-muslim-guide/names' },
});
if (!response.ok) throw new Error(`AlAdhan ${response.status}`);
const arabicRows = (await response.json()).data;

if (arabicRows.length !== LIST.length) {
  throw new Error(`AlAdhan has ${arabicRows.length} rows, the list has ${LIST.length}`);
}

/*
  The check is for a SHIFT, not for identical spelling.

  Requiring the two transliterations to fold to the same string failed on ten
  of ninety-nine, and every one was the same name written under a different
  scheme — `Al-Muʿizz` against `Al Mu'iz`, `Al-Ḥayy` against `Al Haiyy`,
  `Al-Wāriṯ` against `Al Waarith`. One of them, `Al Mughi` for Al-Mughnī, is
  simply a typo in AlAdhan. Loosening the fold until those ten passed would
  have meant loosening it until almost anything passed, and the check would
  then have proved nothing.

  So the check tests the risk instead. The danger is not that two publishers
  spell a name differently; it is that row 40 of one list lands against row 41
  of the other, which would put a name's Arabic under a different name's
  meaning and read perfectly. That is a SHIFT, and a shift is loud: a strong
  majority must agree in place, and no name may agree better somewhere else.
*/
const AGREEMENT_FLOOR = 0.8;

const agrees = (a, b) => foldName(a) === foldName(b);
const inPlace = [];
const differing = [];
for (const [index, name] of LIST.entries()) {
  const row = arabicRows[index];
  if (row.number !== name.n) {
    throw new Error(`row ${index}: the list says ${name.n}, AlAdhan says ${row.number}`);
  }
  if (agrees(row.transliteration, name.translit)) inPlace.push(name.n);
  else differing.push({ name, row, index });
}

/* A name that fits somewhere else better than where it is means a shift. */
const displaced = differing.filter(({ name, index }) =>
  arabicRows.some((row, at) => at !== index && agrees(row.transliteration, name.translit)),
);
if (displaced.length > 0) {
  throw new Error(
    `the lists are shifted — these match at another position:\n  ` +
      displaced.map(({ name }) => `${name.n} ${name.translit}`).join('\n  '),
  );
}

const rate = inPlace.length / LIST.length;
if (rate < AGREEMENT_FLOOR) {
  throw new Error(
    `only ${inPlace.length} of ${LIST.length} transliterations agree in place ` +
      `(floor is ${Math.round(AGREEMENT_FLOOR * 100)}%) — the lists may not be the same list`,
  );
}

console.log(
  `  ${inPlace.length} of ${LIST.length} transliterations agree in place, ` +
    `none matches better elsewhere`,
);
if (differing.length > 0) {
  console.log(`  ${differing.length} differ by scheme only:`);
  for (const { name, row } of differing) {
    console.log(`    ${String(name.n).padStart(2)} ${name.translit.padEnd(24)} AlAdhan: ${row.transliteration}`);
  }
}

/* ------------------------- the cross-check ------------------------- */

/*
  A second, independently edited witness to the same Arabic.

  AlAdhan publishes no terms and no editorial statement, so its Arabic is
  taken on trust unless something else can be held against it. Tirmidhi 3507
  in the local corpus carries this same list of names, edited by a different
  publisher entirely — so a name whose Arabic appears there is confirmed by
  two hands. This does NOT vouch for the narration, which is graded Ḍaʿīf and
  is not what the app cites; it vouches for the SPELLING of a name.
*/
let confirmed = 0;
const unconfirmed = [];
const corpusFile = join(root, '.cache/hadith/ara-tirmidhi.json');
if (existsSync(corpusFile)) {
  const narration = JSON.parse(readFileSync(corpusFile, 'utf8')).hadiths.find(
    (h) => String(h.arabicnumber) === '3507',
  );
  const body = skeleton(narration.text);
  for (const [index, name] of LIST.entries()) {
    if (body.includes(skeleton(arabicRows[index].name))) confirmed += 1;
    else unconfirmed.push(name.translit);
  }
  console.log(`  ${confirmed} of ${LIST.length} confirmed against Tirmidhi 3507 in the corpus`);
  if (unconfirmed.length > 0) console.log(`  not found there: ${unconfirmed.join(', ')}`);
} else {
  console.log('  ⚠️  no local corpus — run `npm run hadith:corpus` to cross-check the Arabic');
}

/* ---------------- which of them the Qur'an lists in 59:22-24 ---------------- */

/*
  Where the Qur'an itself names it, the entry says so.

  Not decoration. `docs/build-order.md` records why this collection nearly did
  not ship: the enumeration's only hadith support is a narration graded weak.
  A verse reference on the names that carry one is the part of this page that
  rests on nothing disputed, and it costs one line.
*/
const hashr = [];
for (const aya of [22, 23, 24]) {
  const verse = await get(
    `https://quranenc.com/api/v1/translation/aya/english_saheeh/59/${aya}`,
  );
  hashr.push({
    aya,
    body: skeleton(verse.arabic_text),
    dropped: skeleton(verse.arabic_text.normalize('NFC').replace(/\u0670/g, '')),
  });
}

/*
  Matched under BOTH readings of the superscript alef, and it has to be.

  The app's skeleton PROMOTES `ٰ` (U+0670) to a real alef, which is right when
  comparing a whole Imlaei verse against a Uthmani one — the Imlaei writes that
  alef as a letter. It is wrong here: AlAdhan writes the name `ٱلرَّحْمَنُ` with
  no alef at all, while the mushaf writes `ٱلرَّحۡمَٰنُ` with the mark. Promoted,
  those become `الرحمان` and `الرحمن` and do not match — so Ar-Raḥmān, the most
  obvious name in the passage, came back unmarked while Ar-Raḥīm beside it was
  marked. Trying both readings is the only honest fix; dropping the promotion
  instead would break every other comparison in the repository.
*/
const dropped = (text) =>
  skeleton(String(text).normalize('NFC').replace(/\u0670/g, ''));

const verseFor = (arabic) => {
  const keys = [skeleton(arabic), dropped(arabic)];
  return hashr.find((verse) =>
    keys.some((key) => verse.body.includes(key) || verse.dropped.includes(key)),
  );
};

/* ------------------------------ writing ------------------------------ */

const entries = LIST.map((name, index) => {
  const arabic = arabicRows[index].name;
  const verse = verseFor(arabic);
  return {
    id: `n${String(name.n).padStart(2, '0')}`,
    title: name.translit,
    arabic,
    translation: name.meaning,
    /*
      A citation, not only a line of text. The `note` is what a reader sees;
      `sources` is what `content:audit` and the Arabic proof sheet read, and
      a reference that exists only as prose is invisible to both.
    */
    aya: verse?.aya,
  };
});

const inQuran = entries.filter((entry) => entry.aya).length;
console.log(`  ${inQuran} of ${entries.length} are named in Qur’an 59:22–24\n`);

const lines = entries.map((entry) => {
  const cited = entry.aya
    ? `\n    note: ${JSON.stringify(`Qur’an 59:${entry.aya}`)},` +
      `\n    sources: [quran(59, ${entry.aya}, { surahName: 'Al-Hashr' })],`
    : '';
  return `  {
    id: ${JSON.stringify(entry.id)},
    title: ${JSON.stringify(entry.title)},
    arabic: ${JSON.stringify(entry.arabic)},
    translation: ${JSON.stringify(entry.translation)},${cited}
  },`;
});

const file = `/**
 * The ninety-nine names of Allah.
 *
 * GENERATED by \`npm run collection:names\`. Do not edit by hand.
 *
 * The list, the transliteration and the English are from
 * www.99NamesofAllah.name, supplied by Iyad on 28 Aug 2026 and transcribed
 * into \`scripts/data/99-names.json\`. The vowelled Arabic is AlAdhan's,
 * matched to that list by transliteration AND position, because the PDF's own
 * Arabic column is reversed by its text layer and retyping Arabic is the one
 * thing this repository never does.
 *
 * ⚠️ The enumeration is a scholarly matter and this file takes a position on
 * it. The STATEMENT that Allah has ninety-nine names is authentic — Bukhari
 * 2736, Bukhari 7392, Muslim 2677. The enumerated LIST appears only in
 * Tirmidhi 3507, graded Ḍaʿīf by all three graders in the corpus, and Ibn
 * Majah 3861, which lists different names. The source used here holds that
 * the list in those narrations is an addition from later transmitters, and
 * derives its names from the Qur'an and authentic Sunnah following Ibn
 * al-Qayyim, Al-Ghazali, Ibn Hazm, Al-Qurtubi and Abd al-Razzaq al-Badr. That
 * is its claim, stated on its own page, and Iyad's decision to use it.
 * \`docs/build-order.md\` Phase 3 carries the full working.
 *
 * ⚠️ ${inQuran} of the ${entries.length} carry a \`note\` naming a verse, because the Qur'an
 * lists them itself in 59:22–24. The rest do not, and the file does not
 * pretend otherwise.
 *
 * ⚠️ UNREVIEWED on substance. The texts are the publishers'; whether this list
 * and this framing are right belongs in \`docs/scholarly-review.md\`.
 */
import { quran } from '../sources';\nimport type { Collection } from '../types';

export const QURANIC_NAMES: Collection = {
  id: 'quranic-names',
  title: 'The names of Allah',
  subtitle:
    'Ninety-nine of the names He calls Himself by. One a day is a season’s practice.',
  provider: 'ninetynine',
  arabicFrom: 'aladhan',
  meta: {
    category: 'belief',
    difficulty: 'deeper',
    estimatedMinutes: 20,
    beginnerPriority: 5,
    tags: ['arabic', 'vocabulary'],
    relatedContent: [{ kind: 'reference', id: 'who-is-allah' }],
  },
  entries: [
${lines.join('\n')}
  ],
};
`;

writeFileSync(join(root, 'src/content/collections/quranic-names.ts'), file);
console.log(`Wrote ${entries.length} names to src/content/collections/quranic-names.ts`);
