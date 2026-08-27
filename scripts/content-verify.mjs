/**
 * Checks the app's Arabic against the people who publish it.
 *
 * Run: `npm run content:verify`  (needs a network connection)
 *
 * `content:audit` asks whether a claim has a citation. This asks the harder
 * question: whether the Arabic beside that citation is the Arabic the source
 * actually prints. A citation can be perfectly formatted and sit above a text
 * with a wrong vowel mark, and nothing in the repo would notice — the app's own
 * history has one, a shadda that had drifted onto an alif.
 *
 * It never edits anything. Every Arabic string in this app is either a Qur'an
 * text, a narration, or the words of a duʿa, and a script that rewrites those
 * because a comparison came out unequal is a worse idea than the drift it is
 * fixing. It reports, and a person decides.
 *
 * ## Why this cannot be a build gate
 *
 * It needs the network. `tsc`, the audit and the export all run offline and
 * must keep doing so — the whole app is built on the premise that a dead signal
 * changes nothing. This is a thing you run deliberately, and in CI.
 *
 * ## Sources
 *
 * - QuranEnc (`quranenc.com/api/v1`) for every `quran` citation.
 * - HadeethEnc (`hadeethenc.com/api/v1`) for text search, which is keyed on
 *   Arabic phrases rather than on English, and so can find a narration from
 *   the words themselves.
 *
 * Neither needs a key. Both publish terms requiring attribution and forbidding
 * modification of their text, which is another reason this only ever reads.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (p) => import(join(root, p));

const { Recitations } = await load('src/content/recitations.ts');
const { PHRASES } = await load('src/content/phrases.ts');
const { GUIDES } = await load('src/content/guides.ts');

const out = [];
const say = (line = '') => {
  out.push(line);
  console.log(line);
};

/* ---------- normalising, which is the whole difficulty ---------- */

/**
 * An Arabic text reduced to its consonantal skeleton.
 *
 * Two orthographies are in play and they disagree in ways that look like
 * differences and are not. The app writes Imlaei — the simplified script
 * people learn to read. QuranEnc serves Uthmani, the mushaf script. The same
 * ayah differs in four systematic ways, none of which is a discrepancy:
 *
 * | | Imlaei | Uthmani |
 * |---|---|---|
 * | alif of prolongation | `ا` U+0627 | `ٰ` U+0670, a COMBINING mark |
 * | alif wasla | `ا` | `ٱ` U+0671 |
 * | sukun | `ْ` U+0652 | `ۡ` U+06E1 |
 * | hamza seats | `أ إ آ` | same, but placed differently |
 *
 * The first is the trap, and it caught the first draft of this script: strip
 * combining marks naively and Uthmani's `رَٰجِعُونَ` loses its long ā entirely,
 * becoming `رجعون` against the app's `راجعون`. So the superscript alef is
 * promoted to a real letter BEFORE anything is stripped.
 *
 * What is deliberately thrown away: every short vowel, every sukun and shadda,
 * hamza seating, and the difference between ta marbuta and ha. This compares
 * whether the same words are present in the same order — a dropped word, a
 * wrong ayah, a transposed phrase. It cannot catch a wrong vowel mark, and
 * claiming otherwise would be worse than not running.
 */
function skeleton(text) {
  return (
    text
      .normalize('NFC')
      // Promote before stripping — the ordering is load-bearing.
      .replace(/ٰ/g, 'ا')
      .replace(/[ٱٲٳٵ]/g, 'ا')
      // Now the marks can go.
      .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
      .replace(/[آأإ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[^ء-ي]/g, '')
  );
}

/* ---------- collecting what to check ---------- */

const texts = [];
const add = (where, file, arabic, sources) => {
  if (arabic?.trim()) texts.push({ where, file, arabic, sources: sources ?? [] });
};

for (const [key, r] of Object.entries(Recitations)) {
  const label = r.title ?? key;
  if (r.verses) {
    r.verses.forEach((v, i) => add(`${label} — ayah ${i + 1}`, 'recitations.ts', v.arabic, r.sources));
  } else {
    add(label, 'recitations.ts', r.arabic, r.sources);
  }
}
for (const p of PHRASES) add(`Phrase — ${p.said}`, 'phrases.ts', p.arabic, p.sources);
for (const g of GUIDES) {
  for (const s of g.steps) {
    if (s.says) add(`${g.title} — ${s.title}`, 'guides', s.says.arabic, s.says.sources);
  }
}

/* ---------- fetching ---------- */

const get = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/content-verify' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
};

const quranCache = new Map();
async function quranAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  if (!quranCache.has(key)) {
    const data = await get(`https://quranenc.com/api/v1/translation/aya/english_saheeh/${surah}/${ayah}`);
    quranCache.set(key, data.result?.arabic_text ?? '');
  }
  return quranCache.get(key);
}

async function searchHadeeth(phrase) {
  const url = `https://hadeethenc.com/api/v1/hadeeths/search/?phrase=${encodeURIComponent(phrase)}&language=ar`;
  const data = await get(url);
  const rows = Array.isArray(data) ? data : (data.data ?? []);
  return rows.slice(0, 3);
}

/* ---------- checking ---------- */

const matched = [];
const drifted = [];
const unchecked = [];

say('Content verify — comparing the app’s Arabic against QuranEnc and HadeethEnc');
say();

for (const entry of texts) {
  const quran = entry.sources.find((s) => s.kind === 'quran');

  if (quran?.wordingElsewhere) {
    // The verse commands the act; the words come from somewhere else. Comparing
    // them would report a difference that is the point rather than a fault.
    unchecked.push({ ...entry, why: 'verse commands the act, wording cited elsewhere' });
    continue;
  }

  if (quran) {
    const first = Array.isArray(quran.ayah) ? quran.ayah[0] : quran.ayah;
    const last = Array.isArray(quran.ayah) ? quran.ayah[1] : quran.ayah;

    let upstream = '';
    for (let n = first; n <= last; n += 1) {
      try {
        upstream += ` ${await quranAyah(quran.surah, n)}`;
      } catch (error) {
        unchecked.push({ ...entry, why: `QuranEnc ${quran.surah}:${n} — ${error.message}` });
        upstream = '';
        break;
      }
    }
    if (!upstream) continue;

    const ours = skeleton(entry.arabic);
    const theirs = skeleton(upstream);
    // `includes` rather than equality: the app quotes part of an ayah in
    // several places — the istirjāʿ is the tail of 2:156, not the whole verse.
    if (theirs.includes(ours)) matched.push(entry);
    else drifted.push({ ...entry, upstream: upstream.trim(), ours, theirs });
    continue;
  }

  unchecked.push({ ...entry, why: entry.sources.length ? 'no Qur’an citation to check against' : 'no source recorded' });
}

/* ---------- reporting ---------- */

say(`Qur’an texts checked against QuranEnc — ${matched.length + drifted.length}`);
say(`  ${matched.length} match the published text, word for word.`);

if (drifted.length) {
  say(`  ${drifted.length} DO NOT MATCH. Each needs a person to look:`);
  for (const d of drifted) {
    say(`    ${d.where}  (${d.file})`);
    say(`      app:      ${d.arabic}`);
    say(`      QuranEnc: ${d.upstream}`);
  }
} else {
  say('  Nothing drifted.');
}
say();

/*
  The unsourced ones, searched by their own wording.

  This is the half that finds something rather than confirming it: HadeethEnc's
  search is keyed on Arabic phrases, so a text can be looked up by what it says
  instead of by a reference nobody recorded. A hit is a CANDIDATE and nothing
  more — the same words appear in narrations that are not the one being cited,
  and only a person can say which is meant.
*/
const searchable = unchecked.filter((entry) => entry.why === 'no source recorded' && entry.arabic.length > 12);

if (searchable.length) {
  say(`${searchable.length} texts carry no source. Searching HadeethEnc for candidates —`);
  say('these are suggestions to check, never citations to paste.');
  say();
  for (const entry of searchable) {
    say(`  ${entry.where}  (${entry.file})`);
    say(`    ${entry.arabic}`);
    try {
      const hits = await searchHadeeth(entry.arabic);
      if (!hits.length) say('      no candidate found');
      for (const hit of hits) {
        say(`      hadeethenc ${hit.id}  ${String(hit.title ?? '').slice(0, 70)}`);
      }
    } catch (error) {
      say(`      search failed — ${error.message}`);
    }
  }
  say();
}

const commanded = unchecked.filter((entry) => entry.why.startsWith('verse commands'));
if (commanded.length) {
  say(`${commanded.length} text(s) cite a verse that commands the act without wording it.`);
  say('Not compared, on purpose — and each still needs a citation for its wording:');
  for (const entry of commanded) say(`  ${entry.where}  (${entry.file})`);
  say();
}

const short = unchecked.filter((entry) => entry.why === 'no source recorded' && entry.arabic.length <= 12);
if (short.length) {
  say(`${short.length} texts are too short to search on — single words and set expressions`);
  say('like الْحَمْدُ لِلَّهِ or الصَّلَاة. These are terms, not quotations, and a citation');
  say('for them would be a category error rather than a missing reference.');
  say();
}

writeFileSync(join(root, 'docs/content-verify.txt'), `${out.join('\n')}\n`);
say('Wrote docs/content-verify.txt');

if (drifted.length) {
  console.error(`\n${drifted.length} text(s) do not match their published source.`);
  process.exitCode = 1;
}
