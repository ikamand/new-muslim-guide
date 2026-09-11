/**
 * Downloads Talal Itani's ClearQuran translation — the "Allah" edition, one
 * file per verse — into `.cache/quran/itani-allah.json`.
 *
 * Run: `npm run quran:itani:corpus` (needs a network connection, once)
 *
 * ## Why this translation
 *
 * Iyad's decision, 11 Sep 2026: one English for the Qur'an tab and the Qur'an
 * duas, and this is the one. It replaced Saheeh International, which the surah
 * pages had carried since 22 Aug. The word-by-word gloss under an opened ayah
 * is NOT his — quran.com names no author for it and his site publishes nothing
 * at word level — so the sentence and the gloss still differ in wording ("the
 * Gracious" against "the Most Gracious"). He has seen that and accepted it.
 * Do not re-raise it.
 *
 * ## Two editions, and which this is
 *
 * ClearQuran publishes the same translation twice: edition (B) writes "God",
 * edition (A) writes "Allah". The app says Allah everywhere else, so it takes
 * (A). The readme inside the zip is kept beside the JSON verbatim, because it
 * is the publisher's own statement of what the file is and on what terms.
 *
 * ## What is checked
 *
 * - 6,236 numbered verse files, one per ayah. The 112 `-000` files are the
 *   basmala printed before a surah and are not ayahs, so they are skipped;
 *   Al-Fatihah's basmala IS its first ayah and arrives as `001-001`.
 * - Every surah's count is asserted against `.cache/quran/words/`, the Quran
 *   Foundation mirror, so a missing or duplicated file fails here and not on
 *   a screen.
 * - Every verse is compared against the jsDelivr mirror of edition (B)
 *   (`fawazahmed0/quran-api`, `eng-talalitani`) with the divine name
 *   normalised and punctuation dropped. Two copies of one text from two hosts
 *   agreeing is the cross-check the hadith corpus gets; one copy agreeing with
 *   itself proves nothing. The two copies are the same translation at two
 *   dates, so a few dozen wording differences are reported, not refused;
 *   more than that and nothing is written.
 *
 * ## Terms
 *
 * clearquran.com/download, read 11 Sep 2026: "These Quran files are free to
 * use, share, and distribute — including in commercial projects — with no
 * permission or authorization required", under CC BY-ND 4.0, credited as
 * "Translation by Talal Itani, ClearQuran.com". The readme inside the zip,
 * dated 2015, says Attribution-NonCommercial-NoDerivs. Either fits an app that
 * is free and never sold; both mean the text ships verbatim, which is how the
 * app quotes anyway. `providers.ts` carries this.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, '.cache/quran/itani-allah.json');
const readmeOut = join(root, '.cache/quran/itani-allah-readme.txt');
const mirror = join(homedir(), 'Documents/islamic-data/quran');
const words = join(root, '.cache/quran/words');

const ZIP =
  'https://www.clearquran.com/downloads/quran-in-english-clearquran-verse-by-verse-txt-edition-allah.zip';
const CHECK = 'https://cdn.jsdelivr.net/gh/fawazahmed0/quran-api@1/editions/eng-talalitani';

if (existsSync(out)) {
  console.log(`${out} exists — delete it to refresh.`);
  process.exit(0);
}
if (!existsSync(join(words, '114.json'))) {
  throw new Error('.cache/quran/words/ is missing — run `npm run quran:words:corpus` first');
}

const get = async (url) => {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/itani' } });
    if (response.ok) return response;
    lastError = new Error(`${response.status} ${url}`);
    await new Promise((r) => setTimeout(r, attempt * 3000));
  }
  throw lastError;
};

/* 1. The zip, unpacked into a temp dir with the system's unzip. */
const dir = mkdtempSync(join(tmpdir(), 'itani-'));
const zipPath = join(dir, 'allah.zip');
console.log(`Fetching ${ZIP}…`);
writeFileSync(zipPath, Buffer.from(await (await get(ZIP)).arrayBuffer()));
execFileSync('unzip', ['-o', '-q', zipPath, '-d', dir]);

const readme = readFileSync(join(dir, '_readme.txt'), 'utf8');
if (!/Talal Itani/.test(readme) || !/'Allah'/.test(readme)) {
  throw new Error('The zip’s readme does not say what was expected — check what was downloaded');
}

/* 2. One record per ayah, in mushaf order. */
const verses = [];
for (const name of readdirSync(dir)) {
  const m = /^(\d{3})-(\d{3})\.txt$/.exec(name);
  if (!m) continue;
  const [s, a] = [Number(m[1]), Number(m[2])];
  if (a === 0) continue;
  const en = readFileSync(join(dir, name), 'utf8').replace(/\s+/g, ' ').trim();
  if (!en) throw new Error(`${name} is empty`);
  verses.push({ s, a, en });
}
verses.sort((x, y) => x.s - y.s || x.a - y.a);
if (verses.length !== 6236) throw new Error(`Expected 6236 ayahs, found ${verses.length}`);

/* 3. Every surah's count against the Quran Foundation mirror. */
for (let s = 1; s <= 114; s += 1) {
  const expected = JSON.parse(readFileSync(join(words, `${s}.json`), 'utf8')).length;
  const found = verses.filter((v) => v.s === s);
  if (found.length !== expected) throw new Error(`Surah ${s}: ${found.length} files, the mirror has ${expected} ayahs`);
  found.forEach((v, i) => {
    if (v.a !== i + 1) throw new Error(`Surah ${s}: ayah ${i + 1} is missing or out of order`);
  });
}

/* 4. Every verse against the other host's copy of the other edition. One
   request for the whole edition: jsDelivr answers a burst of per-chapter
   requests with 403s from the fifty-fourth on. */
const skeleton = (text) =>
  text
    .toLowerCase()
    .replace(/\ballah\b/g, 'god')
    .replace(/[^a-z]+/g, '');
const mismatches = [];
console.log('Cross-checking against jsDelivr…');
const { quran } = await (await get(`${CHECK}.json`)).json();
const theirs = new Map(quran.map((v) => [`${v.chapter}:${v.verse}`, v.text]));
if (theirs.size !== 6236) throw new Error(`jsDelivr copy has ${theirs.size} ayahs`);
for (const v of verses) {
  const other = theirs.get(`${v.s}:${v.a}`);
  if (other === undefined || skeleton(other) !== skeleton(v.en)) {
    mismatches.push({ ref: `${v.s}:${v.a}`, allah: v.en, god: other });
  }
}
console.log();
/* The two copies are the same translation at two dates: the jsDelivr file
   carries typos the publisher has since fixed ("palms-trees", "His righ"),
   and a handful of revised phrases. A dozen such is a publisher revising; a
   hundred would be the wrong text. The differences are written beside the
   JSON so the next reader can see them rather than trust this sentence. */
if (mismatches.length > 50) {
  for (const m of mismatches.slice(0, 20)) console.log(`\n${m.ref}\n  A: ${m.allah}\n  B: ${m.god}`);
  throw new Error(`${mismatches.length} ayahs differ between the two copies — that is not one translation. Nothing written`);
}
const diffOut = join(root, '.cache/quran/itani-allah-diff.txt');
const shipped = (ref) => { const s = Number(ref.split(':')[0]); return s === 1 || (s >= 78 && s <= 114); };
for (const m of mismatches) console.log(`  ${m.ref}${shipped(m.ref) ? '  ← on a surah page' : ''}`);
console.log(`${mismatches.length} ayahs differ from the jsDelivr copy beyond the divine name; written to ${diffOut}`);

/* 5. Write, and mirror. */
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(verses));
writeFileSync(readmeOut, readme);
writeFileSync(
  diffOut,
  mismatches.map((m) => `${m.ref}\n  ClearQuran (A): ${m.allah}\n  jsDelivr (B):   ${m.god}`).join('\n\n') + '\n',
);
if (existsSync(mirror)) {
  copyFileSync(out, join(mirror, 'itani-allah.json'));
  copyFileSync(readmeOut, join(mirror, 'itani-allah-readme.txt'));
}
console.log(`Wrote ${out} — ${verses.length} ayahs.${existsSync(mirror) ? ' Mirrored.' : ''}`);
