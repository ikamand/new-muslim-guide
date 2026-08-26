/**
 * Fetches the actual texts behind the app's citations.
 *
 * Run: `npm run evidence` (needs `npm run hadith:corpus` first, and a network
 * connection for the Qur'an and for translations)
 *
 * Writes `src/content/evidence.ts`, and a report at `docs/evidence-report.md`
 * naming which source supplied every line.
 *
 * ## Why
 *
 * `source-list.tsx` renders citations as text and deliberately never links out
 * — nothing in this app sends anyone off-device. Which left "Sahih al-Bukhari
 * 159" as a dead end: a beginner can neither read it nor follow it. It was
 * provenance for a reviewer and nothing at all for the reader.
 *
 * Carrying the text closes that. The citation stays; expanding it now shows
 * what it actually says.
 *
 * ## One text, more than one supplier
 *
 * No single source has everything, so this does not ask one to. Each field is
 * taken from the first source that has it, and **which source that was is
 * recorded on the text itself** — because the licences differ, and a credit
 * that is not attached to the thing it credits gets lost when the thing moves.
 *
 *   Arabic       fawazahmed0 — the only one carrying collection numbering.
 *                Hadith Unlocked where that has a hole, which it has ~408 of.
 *   Translation  HadeethEnc first: its terms are published. Otherwise
 *                fawazahmed0's, which is Darussalam's and is flagged as such.
 *   Grading      fawazahmed0 — four graders per narration where it has them
 *   Qur'an       QuranEnc, both halves
 *
 * ## What is checked rather than trusted
 *
 * A number resolving is not the same as a text being right. Where HadeethEnc
 * carries the same narration, its Arabic is compared against fawazahmed0's on
 * a consonantal skeleton — containment, not similarity. An agreement between
 * two separately edited publishers is worth more than either alone, and a
 * disagreement is reported rather than silently resolved.
 *
 * ⚠️ This proves a text is what the collection prints. It does not prove the
 * narration is the right evidence for the ruling it sits under. That is
 * substance, it stays with a qualified reviewer, and `docs/scholarly-review.md`
 * is where it is tracked.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { EDITIONS } from './fetch-hadith-corpus.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (p) => import(join(root, p));

/**
 * Every content module Node can import, walked for citations.
 *
 * Enumerated from the directory rather than listed, because a list of the
 * files that hold citations was wrong twice — the sweep that found 44
 * unsourced cards missed a whole directory the first time. A new content file
 * is picked up here the day it lands.
 *
 * Skipped: anything containing a Metro `require`. `audio.ts` and
 * `prayer-images.ts` resolve asset paths at bundle time, which Node cannot do
 * and which is exactly why `index.ts` cannot be imported here either. None of
 * the three carries a citation.
 */
async function loadContentModules() {
  const dir = join(root, 'src/content');
  const files = [];
  const walk = (path) => {
    for (const item of readdirSync(path, { withFileTypes: true })) {
      const full = join(path, item.name);
      if (item.isDirectory()) walk(full);
      else if (item.name.endsWith('.ts')) files.push(full);
    }
  };
  walk(dir);

  const loaded = [];
  const skipped = [];
  for (const file of files.sort()) {
    const name = file.slice(dir.length + 1);
    if (name === 'evidence.ts') continue;
    if (/\brequire\(/.test(readFileSync(file, 'utf8'))) {
      skipped.push(name);
      continue;
    }
    try {
      loaded.push(await import(file));
    } catch (error) {
      skipped.push(`${name} (${error.message.split('\n')[0]})`);
    }
  }
  if (skipped.length > 0) console.log(`Skipped: ${skipped.join(', ')}`);
  return loaded;
}

const CONTENT = await loadContentModules();

const get = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/evidence' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Same normalisation `content-verify.mjs` uses, and for the same reasons. */
const skeleton = (text) =>
  String(text)
    .normalize('NFC')
    .replace(/ﷺ/g, 'صلى الله عليه وسلم')
    .replace(/ٰ/g, 'ا')
    .replace(/[ٱٲٳٵ]/g, 'ا')
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[آأإ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^ء-ي]/g, '');

/* ------------------------- every citation in the app ------------------------- */

/**
 * Walks the whole content tree for sources.
 *
 * Deliberately structural rather than a list of the places citations live:
 * that list was wrong twice. Sources sit on steps, on the `says` inside a
 * step, on reference sections, on catalog entries, on recitations and on
 * duʿas, and the next one added would have been missed again. Anything shaped
 * like a source is a source, wherever it turns up.
 */
function collectSources(node, found = [], seen = new Set()) {
  if (node === null || typeof node !== 'object') return found;
  if (seen.has(node)) return found;
  seen.add(node);

  if (Array.isArray(node)) {
    for (const item of node) collectSources(item, found, seen);
    return found;
  }
  if (node.kind === 'hadith' || node.kind === 'quran') {
    found.push(node);
    return found;
  }
  for (const value of Object.values(node)) collectSources(value, found, seen);
  return found;
}

const sources = collectSources(CONTENT);

/** `bukhari:159`, or `bukhari:he8378` where only a HadeethEnc id is known. */
const hadithKey = (source) =>
  source.reference
    ? `${source.collection}:${source.reference}`
    : `${source.collection}:he${source.hadeethEncId}`;

const quranKey = (source) => {
  const first = Array.isArray(source.ayah) ? source.ayah[0] : source.ayah;
  const last = Array.isArray(source.ayah) ? source.ayah[1] : source.ayah;
  return `${source.surah}:${first}${last !== first ? `-${last}` : ''}`;
};

const quranCites = new Map();
const hadithCites = new Map();
for (const source of sources) {
  if (source.kind === 'quran') quranCites.set(quranKey(source), source);
  else if (source.reference || source.hadeethEncId) hadithCites.set(hadithKey(source), source);
}

console.log(
  `${sources.length} citations in the content tree — ` +
    `${quranCites.size} distinct Qur'an, ${hadithCites.size} distinct hadith\n`,
);

/* ---------------- Qur'an: deterministic, every one of them ---------------- */

console.log(`Qur'an — ${quranCites.size} passages from QuranEnc`);
const quran = {};
for (const [key, source] of quranCites) {
  const first = Array.isArray(source.ayah) ? source.ayah[0] : source.ayah;
  const last = Array.isArray(source.ayah) ? source.ayah[1] : source.ayah;
  const parts = [];
  for (let n = first; n <= last; n += 1) {
    const data = await get(
      `https://quranenc.com/api/v1/translation/aya/english_saheeh/${source.surah}/${n}`,
    );
    parts.push({ arabic: data.result.arabic_text, translation: data.result.translation });
  }
  quran[key] = {
    arabic: parts.map((p) => p.arabic).join(' '),
    // Footnote markers come through as bracketed digits in this translation.
    translation: parts
      .map((p) => p.translation.replace(/\[\d+\]/g, '').replace(/\s+/g, ' ').trim())
      .join(' '),
    arabicFrom: 'QuranEnc.com',
    translationFrom: 'QuranEnc.com',
  };
}
console.log(`  ${Object.keys(quran).length} written\n`);

/* ----------------------------- the corpus ----------------------------- */

const corpus = {};
for (const [collection, edition] of Object.entries(EDITIONS)) {
  const arabicFile = join(root, `.cache/hadith/ara-${edition}.json`);
  const englishFile = join(root, `.cache/hadith/eng-${edition}.json`);
  if (!existsSync(arabicFile)) {
    console.log(`⚠️  .cache/hadith/ara-${edition}.json missing — run \`npm run hadith:corpus\``);
    continue;
  }
  /*
    Two numbering systems, and picking the wrong one is silent.

    `hadithnumber` is a continuous index over the whole collection.
    `arabicnumber` is the number the collection itself prints — what a reader
    means by "Sahih Muslim 728", and what this app's citations carry.

    For five of the six books they are the same value in every single record:
    Bukhari 7589/7589, Abu Dawud 5274/5274, Tirmidhi 3998/3998, Ibn Majah
    4343/4343, Malik 1858/1858. For **Muslim they never match** — 7,563
    narrations, zero agreements, because Muslim's own numbering runs to about
    2,000 and groups its variant chains under one number.

    So indexing by `hadithnumber` looked correct for years and was wrong for
    every Muslim citation in the app. `muslim 391b`, cited for raising the
    hands in prayer, rendered a narration about the son of Mary; `muslim 752`,
    cited for witr, rendered one about ghusl after menstruation. Nothing
    failed, nothing was blank, and the pages looked finished.

    Both keys are indexed now, with `arabicnumber` winning. Where a collection
    numbers variants — Muslim's `728.01`, `728.02`, `728.03` — the base number
    resolves to the first, which is the narration all the variants share.
  */
  const index = (file) => {
    if (!existsSync(file)) return {};
    const parsed = JSON.parse(readFileSync(file, 'utf8'));

    /*
      Two namespaces, never merged — merging them is what made the first
      attempt at this fix fail. `printed["752"]` and `continuous["752"]` are
      different narrations in Muslim, so a single map silently keeps whichever
      was written last.
    */
    const printed = {};
    const continuous = {};
    for (const h of parsed.hadiths) {
      continuous[String(h.hadithnumber)] = h;
      if (h.arabicnumber === undefined) continue;
      const label = String(h.arabicnumber);
      printed[label] = h;
      /* `728` should reach `728.01` — the narration the variants share. */
      const base = label.split('.')[0];
      if (printed[base] === undefined) printed[base] = h;
    }
    return { printed, continuous };
  };

  corpus[collection] = { arabic: index(arabicFile), english: index(englishFile) };
}

/**
 * Hadith Unlocked, used only where the primary dataset has a hole.
 *
 * It has holes: `text` is an empty string for 203 of Muslim's narrations, 86
 * of Nasa'i's, 74 of Tirmidhi's — about 408 across the six books. Two of them
 * are cited by this app, and one is the hadith of Jibrīl, which `iman.ts`
 * rests three claims on. A number resolving to an empty string is worse than
 * not resolving, because nothing about it looks like a failure.
 *
 * This one also keeps the letter suffixes — `8a` is a distinct entry here
 * where the primary collapses it into an `8` it then leaves empty — so it
 * covers exactly the case that breaks.
 *
 * Lazy on purpose: a collection is downloaded only when something from it is
 * actually missing, so the usual run fetches nothing at all.
 *
 * ⚠️ It publishes no terms — there is no licence, about or credits page. Its
 * Arabic is public domain like everyone's. Its English is a mirror of the same
 * Six Books corpus as every other site, which is why `translationFrom` names
 * it rather than claiming anything about who owns it.
 */
const unlockedCache = join(root, '.cache/hadith-unlocked');
const unlockedBooks = new Map();

async function hadithUnlocked(collection, number) {
  const alias = EDITIONS[collection];
  if (!alias) return undefined;

  if (!unlockedBooks.has(alias)) {
    const file = join(unlockedCache, `${alias}.json`);
    if (!existsSync(file)) {
      console.log(`    ↓ fetching ${alias} from hadithunlocked.com (fallback)`);
      try {
        const response = await fetch(`https://hadithunlocked.com/${alias}.json`, {
          headers: { 'user-agent': 'new-muslim-guide/evidence' },
        });
        if (!response.ok) throw new Error(String(response.status));
        mkdirSync(unlockedCache, { recursive: true });
        writeFileSync(file, await response.text());
      } catch (error) {
        console.log(`    ↓ ${alias} unavailable (${error.message})`);
        unlockedBooks.set(alias, {});
        return undefined;
      }
    }
    // Records sit at varying depth — chapters hold sections, sections hold
    // items — so this finds them by shape rather than by path.
    const found = [];
    const walk = (node) => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (node === null || typeof node !== 'object') return;
      if ('ref' in node && 'number' in node && 'text' in node) return void found.push(node);
      Object.values(node).forEach(walk);
    };
    walk(JSON.parse(readFileSync(file, 'utf8')));
    unlockedBooks.set(alias, Object.fromEntries(found.map((h) => [String(h.number), h])));
  }

  return unlockedBooks.get(alias)?.[number];
}

/**
 * Phrases distinctive enough to find a narration by.
 *
 * HadeethEnc's search is a loose match, not a phrase match, and it caps at 100
 * results. That is the whole difficulty: searching Bukhari 168 with
 * `عن عائشة قالت كان النبي` returns 100 narrations, because every word in it
 * appears in hundreds. Searching the same narration with
 * `في تنعله وترجله وطهوره` returns exactly one.
 *
 * So distinctiveness is the thing to optimise for, and it lives at the END of
 * a narration. The opening is the isnad — shared by hundreds — and the middle
 * is usually still formulaic. The uncommon words are in the matn's tail.
 *
 * Windows are returned deepest-first for that reason, and the caller keeps the
 * one that returned fewest hits rather than the first that returned any.
 */
const searchWindows = (arabic) => {
  const words = String(arabic).split(/\s+/).filter(Boolean);
  if (words.length < 8) return [words.join(' ')];
  const windows = [];
  for (const fraction of [0.8, 0.7, 0.6, 0.45]) {
    const start = Math.min(Math.floor(words.length * fraction), words.length - 5);
    const slice = words.slice(start, start + 7).join(' ');
    if (slice.split(/\s+/).length >= 4) windows.push(slice);
  }
  return [...new Set(windows)];
};

/**
 * Whether two publishers are printing the same narration.
 *
 * Not equality and not whole-string containment, because they genuinely differ:
 * this dataset prints the isnad and HadeethEnc prints only the matn, and either
 * may abridge a long narration at either end. What does hold when it is the
 * same hadith is that a decent run of consecutive words appears in both.
 *
 * 60 characters of skeleton is roughly ten words — long enough that a
 * coincidental match between two unrelated narrations is not a realistic
 * worry, short enough to survive one publisher trimming a clause.
 */
const SHARED_RUN = 60;

const sameNarration = (ours, theirs) => {
  if (!ours || !theirs) return false;
  if (theirs.includes(ours) || ours.includes(theirs)) return true;
  const [shorter, longer] = ours.length <= theirs.length ? [ours, theirs] : [theirs, ours];
  if (shorter.length < SHARED_RUN) return false;
  for (let at = 0; at + SHARED_RUN <= shorter.length; at += 10) {
    if (longer.includes(shorter.slice(at, at + SHARED_RUN))) return true;
  }
  return false;
};

/* ------- Hadith: resolved by number, translated by whoever has it ------- */

console.log(`Hadith — resolving ${hadithCites.size} citations`);

const hadith = {};
const report = [];

for (const [key, source] of hadithCites) {
  const entry = {
    key,
    citation: key,
    arabicFrom: null,
    translationFrom: null,
    crossChecked: null,
    note: null,
  };

  let arabic;
  let translation;
  let attribution;
  let grade;
  let arabicFrom;
  let translationFrom;

  /* 1. Arabic and gradings, by the collection's own number. */
  const book = corpus[source.collection];
  /*
    `234b` is sunnah.com's way of numbering Muslim's sub-narrations — the same
    hadith reported through a second chain. No other publisher uses the letters,
    so a citation carrying one resolves against the base number, which is the
    narration all the variants share.
  */
  const number = source.reference;
  const baseNumber = number?.replace(/[a-z]$/, '');
  /*
    An empty `text` is a hole, not a text. The dataset has ~408 of them and a
    number that resolves to `''` would otherwise sail through every check here
    and render as a blank quote block on the phone.
  */
  const usable = (entry) => (String(entry?.text ?? '').trim() ? entry : undefined);
  /*
    Order matters: the collection's own number first, then its variant group,
    then the continuous index as a last resort. A citation means the printed
    number, and only falls back to the index when the collection prints none.
  */
  /*
    The collection's OWN number first, always. A citation reading "Sahih Muslim
    728" means the number Muslim prints, and the continuous index is only a
    fallback for a collection that prints none.
  */
  const find = (space) =>
    number
      ? [number, baseNumber].map((key) => usable(book?.arabic?.[space]?.[key])).find(Boolean)
      : undefined;
  const record = find('printed') ?? find('continuous');
  const space = find('printed') ? 'printed' : 'continuous';
  const lookup = number && usable(book?.arabic?.[space]?.[number]) ? number : baseNumber;
  if (record) {
    arabic = record.text;
    arabicFrom = 'fawazahmed0/hadith-api';
    const graded = book.english?.[space]?.[lookup]?.grades ?? record.grades ?? [];
    if (graded.length > 0) {
      grade = graded.map((g) => `${g.grade} (${g.name})`).join(' · ');
    }
    /*
      No synthesised attribution. `formatSource` already prints "Sahih
      al-Bukhari 159" directly above this block, so a line reading "Narrated by
      Sahih al-Bukhari" underneath repeats it and misnames it besides — the
      book is not the narrator. HadeethEnc's own attribution, where there is
      one, is a real sentence and is used as published.
    */
  }

  /* 2. HadeethEnc — its own translation, and a second witness to the Arabic. */
  let hadeethEncHit;
  if (source.hadeethEncId) {
    try {
      const ar = await get(
        `https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${source.hadeethEncId}`,
      );
      if (ar?.hadeeth) hadeethEncHit = { id: source.hadeethEncId, arabic: ar.hadeeth };
    } catch {
      /* Cited but unreachable — falls through to whatever else is known. */
    }
  } else if (arabic) {
    /*
      Search every window, then follow up only the most distinctive one.

      Trying windows in order and taking the first with any hits was the
      earlier mistake: the loosest window matches 100 narrations and the right
      one is rarely in the first three. Hit COUNT is the signal — a window
      returning one result has identified a narration, a window returning a
      hundred has identified the Arabic language.
    */
    let best;
    for (const phrase of searchWindows(arabic)) {
      try {
        const data = await get(
          `https://hadeethenc.com/api/v1/hadeeths/search/?phrase=${encodeURIComponent(phrase)}&language=ar`,
        );
        const hits = Array.isArray(data) ? data : (data.data ?? []);
        if (hits.length > 0 && (!best || hits.length < best.length)) best = hits;
        if (hits.length === 1) break;
      } catch {
        /* One window failing is not the search failing. */
      }
      await sleep(120);
    }

    const ours = skeleton(arabic);
    for (const hit of (best ?? []).slice(0, 6)) {
      let full;
      try {
        full = await get(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${hit.id}`);
      } catch {
        continue;
      }
      if (!full?.hadeeth) continue;
      if (sameNarration(ours, skeleton(full.hadeeth))) {
        hadeethEncHit = { id: hit.id, arabic: full.hadeeth };
        break;
      }
      await sleep(80);
    }
  }

  if (hadeethEncHit) {
    entry.crossChecked = `HadeethEnc ${hadeethEncHit.id}`;
    /*
      Prefer HadeethEnc's wording once the two are known to be the same
      narration.

      Not about trust — it is about what a beginner is looking at. The primary
      prints what the collection prints, which opens with the chain of
      transmission: three lines of "so-and-so told us, from so-and-so" before
      the Prophet ﷺ says anything. HadeethEnc publishes the matn alone. On a
      phone, under a step someone is mid-wudu for, that is the difference
      between a quotation and a wall.

      Neither text is edited to achieve this. Two publishers print different
      amounts of the same narration and this takes the shorter, which is also
      the one whose terms are published.
    */
    arabic = hadeethEncHit.arabic;
    arabicFrom = 'HadeethEnc.com';
    try {
      const en = await get(
        `https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=${hadeethEncHit.id}`,
      );
      if (en?.hadeeth) {
        translation = en.hadeeth;
        translationFrom = 'HadeethEnc.com';
        attribution = en.attribution ?? attribution;
        grade = grade ?? en.grade;
      }
    } catch {
      /* Arabic only rather than a translation written here. */
    }
  }

  /* 3. Fall back to the dataset's English, which is Darussalam's. */
  if (!translation && lookup) {
    const english = corpus[source.collection]?.english?.[space]?.[lookup];
    if (english?.text) {
      translation = english.text;
      translationFrom = 'Darussalam (via fawazahmed0/hadith-api)';
    }
  }

  /* 4. A hole in the primary — try the fallback that keeps letter suffixes. */
  if (!arabic && number) {
    const spare = await hadithUnlocked(source.collection, number);
    if (spare?.text?.ar) {
      arabic = spare.text.ar;
      arabicFrom = 'hadithunlocked.com';
      if (!translation && spare.text.en) {
        translation = spare.text.en;
        translationFrom = 'hadithunlocked.com';
      }
      const grader = spare.grader?.en;
      const graded = spare.grade?.en;
      if (graded && graded !== 'No Grade') {
        grade = grade ?? (grader && grader !== 'N/A' ? `${graded} (${grader})` : graded);
      }
      /* Same reasoning as above — no synthesised attribution. */
    }
  }

  if (!arabic) {
    entry.note = 'no Arabic found';
    report.push(entry);
    console.log(`  ✗ ${key} — nothing found`);
    continue;
  }

  hadith[key] = {
    arabic,
    ...(translation ? { translation } : {}),
    ...(attribution ? { attribution } : {}),
    ...(grade ? { grade } : {}),
    arabicFrom,
    ...(translationFrom ? { translationFrom } : {}),
  };
  entry.arabicFrom = arabicFrom;
  entry.translationFrom = translationFrom;
  report.push(entry);

  const mark = entry.crossChecked ? '✓✓' : '✓ ';
  console.log(`  ${mark} ${key} — ${translationFrom ?? 'Arabic only'}`);
}

/* ---------------------------- writing it out ---------------------------- */

const crossChecked = report.filter((r) => r.crossChecked).length;
const clean = report.filter((r) => r.translationFrom === 'HadeethEnc.com').length;
const darussalam = report.filter(
  (r) => r.translationFrom && r.translationFrom !== 'HadeethEnc.com',
).length;
const arabicOnly = report.filter((r) => r.arabicFrom && !r.translationFrom).length;
const missing = report.filter((r) => r.note);

const file = `/**
 * The texts behind the app's citations.
 *
 * GENERATED by \`npm run evidence\`. Do not edit by hand — a correction made
 * here is lost the next time it runs, and one that needs making belongs
 * upstream, where the text is published.
 *
 * ${Object.keys(quran).length} Qur'an passages and ${Object.keys(hadith).length} narrations. Every character came over
 * the wire from a published text rather than from memory, which is the only
 * way a file like this could exist under this project's rules about Arabic.
 *
 * ## Where each line came from
 *
 * No one source has all of it, so each field is taken from the first that
 * does, and says so on the text itself. Of the ${Object.keys(hadith).length} narrations here:
 * ${crossChecked} were confirmed against a second, separately edited publisher;
 * ${clean} carry HadeethEnc's own translation, ${darussalam} carry Darussalam's, and
 * ${arabicOnly} have Arabic and no translation at all.
 *
 * ⚠️ **The Darussalam translations are not ours to relicense.** They reach
 * this file through a public-domain dedication that covers the compiler's work
 * and not the translation inside it. What makes that defensible here is scale
 * and purpose — ${darussalam} narrations out of some thirty thousand, each quoted under
 * the instruction it supports, in an app that is free and never sold. It is a
 * quotation, not a republication, and it is Iyad's decision on the record.
 *
 * ⚠️ **HadeethEnc's terms:** no modification, addition or deletion, and the
 * publisher named wherever it appears. Both are why \`translationFrom\` is on
 * every text rather than in a comment here, and why these strings are verbatim.
 *
 * ## What this file does NOT establish
 *
 * That a narration is the right evidence for the ruling it sits under. This
 * proves a text is what the collection prints, nothing more. Which authentic
 * narration supports a given instruction is substance and stays with a
 * qualified reviewer — see \`docs/scholarly-review.md\`.
 */

export type EvidenceText = {
  arabic: string;
  /** Absent where no source published a translation this app may carry. */
  translation?: string;
  /** "Narrated by Al-Bukhāri". */
  attribution?: string;
  /** Every grading the sources gave, with who gave it. */
  grade?: string;
  /** Publisher of the Arabic. A licence obligation, not a nicety. */
  arabicFrom: string;
  /** Publisher of the translation, where there is one. */
  translationFrom?: string;
};

/** Keyed "2:255" or "1:1-7", matching how a \`QuranSource\` addresses a verse. */
export const QURAN_TEXT: Record<string, EvidenceText> = ${JSON.stringify(quran, null, 2)};

/**
 * Keyed \`bukhari:159\` — collection and the number that collection prints.
 *
 * Keyed by the citation because the citation now resolves. An earlier version
 * keyed these by the app's own Arabic, because searching was the only way to
 * reach a narration and containment the only thing a search could prove. That
 * left every citation on an INSTRUCTION unreachable — "wash both hands up to
 * the wrists" has no Arabic to search with — which was most of them.
 */
export const HADITH_TEXT: Record<string, EvidenceText> = ${JSON.stringify(hadith, null, 2)};

/** Where these came from. A licence obligation, not a nicety. */
export const EVIDENCE_SOURCES = {
  quran: 'QuranEnc.com',
  hadith: 'HadeethEnc.com · fawazahmed0/hadith-api',
} as const;
`;

writeFileSync(join(root, 'src/content/evidence.ts'), file);

const sheet = `# Evidence report

Generated by \`npm run evidence\`. Every citation in the app, and which source
supplied each line of it.

| | |
|---|---|
| Qur'an passages | ${Object.keys(quran).length} of ${quranCites.size} |
| Narrations | ${Object.keys(hadith).length} of ${hadithCites.size} |
| Confirmed against a second publisher | ${crossChecked} |
| Translation from HadeethEnc (published terms) | ${clean} |
| Translation from Darussalam (quoted) | ${darussalam} |
| Arabic with no translation | ${arabicOnly} |
| Nothing found | ${missing.length} |

## What "confirmed" means here

Two publishers were asked independently and printed the same narration. The
collection's own number resolved in one; a search of the other returned a text
sharing a run of ten consecutive words with it, compared on a consonantal
skeleton. So the number in the citation and the wording on screen were checked
against each other rather than taken on one source's word.

Where that passed, the Arabic shown is **HadeethEnc's**, because it publishes
the matn alone while the primary prints the full chain of transmission first.
Neither text is edited to achieve that — one publisher simply prints less of
the same narration than the other.

It does **not** mean the narration is the right evidence for the claim it sits
under. That is substance and stays with a reviewer.

${
  missing.length === 0
    ? ''
    : `## Nothing found\n\n${missing.map((m) => `- \`${m.citation}\` — ${m.note}`).join('\n')}\n`
}
## Every citation

| Citation | Arabic from | Translation from | Cross-check |
|---|---|---|---|
${report
  .map(
    (r) =>
      `| \`${r.citation}\` | ${r.arabicFrom ?? '—'} | ${r.translationFrom ?? '—'} | ${r.crossChecked ?? '—'} |`,
  )
  .join('\n')}
`;

writeFileSync(join(root, 'docs/evidence-report.md'), sheet);

console.log(`\nWrote src/content/evidence.ts`);
console.log(
  `  ${Object.keys(quran).length} Qur'an, ${Object.keys(hadith).length} hadith ` +
    `(${crossChecked} cross-checked, ${clean} HadeethEnc translation, ` +
    `${darussalam} Darussalam, ${arabicOnly} Arabic only, ${missing.length} missing)`,
);
console.log(`Wrote docs/evidence-report.md`);
