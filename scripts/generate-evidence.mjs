/**
 * Fetches the actual texts behind the app's citations.
 *
 * Run: `npm run evidence` (needs a network connection)
 *
 * Writes `src/content/evidence.ts`, and a review sheet at
 * `docs/hadith-candidates.md` for the citations a machine must not decide.
 *
 * ## Why
 *
 * `source-list.tsx` renders citations as text and deliberately never links out
 * — nothing in this app sends anyone off-device. Which left "Sahih al-Bukhari
 * 6324" as a dead end: a beginner can neither read it nor follow it. It was
 * provenance for a reviewer and nothing at all for the reader.
 *
 * Carrying the text closes that. The citation stays; expanding it now shows
 * what it actually says.
 *
 * ## Sources, and only these
 *
 * QuranEnc and HadeethEnc. Not sunnah.com — that was settled earlier and this
 * script exists partly because the app should stop depending on it.
 *
 * ## The rule that keeps the hadith half honest
 *
 * HadeethEnc cannot be asked for "Bukhari 6324"; it has ids of its own, a
 * phrase search over Arabic, and a category tree. So a narration is not looked
 * up — it is SEARCHED FOR, and a search result is a guess.
 *
 * A guess is only accepted where it can be checked mechanically: the app's own
 * Arabic must appear, as a consonantal skeleton, INSIDE the narration
 * HadeethEnc returns. That is containment, not similarity — if the words the
 * app has you say are literally inside the hadith, that hadith contains them.
 * Anything short of that goes to the review sheet for a person to decide,
 * because choosing which authentic narration supports a claim is substance and
 * `sources.ts` draws that line explicitly.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (p) => import(join(root, p));

const { CATALOG } = await load('src/content/catalog.ts');
const { Recitations } = await load('src/content/recitations.ts');
const { DUAS } = await load('src/content/duas.ts');

const get = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/evidence' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
};

/** Same normalisation `content-verify.mjs` uses, and for the same reasons. */
const skeleton = (text) =>
  text
    .normalize('NFC')
    .replace(/ٰ/g, 'ا')
    .replace(/[ٱٲٳٵ]/g, 'ا')
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[آأإ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^ء-ي]/g, '');

/* ---------------- Qur'an: deterministic, every one of them ---------------- */

const verses = new Map();
for (const entry of CATALOG) {
  for (const source of entry.sources) {
    if (source.kind !== 'quran') continue;
    const first = Array.isArray(source.ayah) ? source.ayah[0] : source.ayah;
    const last = Array.isArray(source.ayah) ? source.ayah[1] : source.ayah;
    verses.set(`${source.surah}:${first}${last !== first ? `-${last}` : ''}`, {
      surah: source.surah,
      first,
      last,
    });
  }
}

console.log(`Qur'an — ${verses.size} distinct verses or ranges`);
const quran = {};
for (const [key, { surah, first, last }] of verses) {
  const parts = [];
  for (let n = first; n <= last; n += 1) {
    const data = await get(
      `https://quranenc.com/api/v1/translation/aya/english_saheeh/${surah}/${n}`,
    );
    parts.push({ arabic: data.result.arabic_text, translation: data.result.translation });
  }
  quran[key] = {
    arabic: parts.map((p) => p.arabic).join(' '),
    // Footnote markers come through as bracketed digits in this translation.
    translation: parts
      .map((p) => p.translation.replace(/\[\d+\]/g, '').replace(/\s+/g, ' ').trim())
      .join(' '),
  };
  process.stdout.write(`  ${key}\n`);
}

/* ------- Hadith: searched, and accepted only where it can be checked ------- */

/** Every Arabic text in the app that carries a hadith citation. */
const searchable = [];
for (const [key, r] of Object.entries(Recitations)) {
  const cited = (r.sources ?? []).some((s) => s.kind === 'hadith');
  if (cited && r.arabic) searchable.push({ label: r.title ?? key, arabic: r.arabic });
}
for (const dua of DUAS) {
  const cited = (dua.says?.sources ?? []).some((s) => s.kind === 'hadith');
  if (cited && dua.says?.arabic) searchable.push({ label: dua.when, arabic: dua.says.arabic });
}

console.log(`\nHadith — searching HadeethEnc for ${searchable.length} texts`);

const hadith = {};
const candidates = [];

for (const item of searchable) {
  let hits = [];
  try {
    const url = `https://hadeethenc.com/api/v1/hadeeths/search/?phrase=${encodeURIComponent(item.arabic)}&language=ar`;
    const data = await get(url);
    hits = (Array.isArray(data) ? data : (data.data ?? [])).slice(0, 4);
  } catch {
    // A search that fails is a candidate with no suggestions, not a crash.
  }

  const ours = skeleton(item.arabic);
  let accepted;
  const looked = [];

  for (const hit of hits) {
    let full;
    try {
      full = await get(`https://hadeethenc.com/api/v1/hadeeths/one/?language=ar&id=${hit.id}`);
    } catch {
      continue;
    }
    if (typeof full !== 'object' || !full?.hadeeth) continue;

    const contains = skeleton(full.hadeeth).includes(ours);
    looked.push({ id: hit.id, title: String(hit.title ?? '').slice(0, 90), contains });

    if (contains && !accepted) {
      // English is fetched only for one that passed — most of these have it,
      // and the ones that do not fall back to Arabic alone rather than to a
      // translation written here.
      let english;
      try {
        const en = await get(`https://hadeethenc.com/api/v1/hadeeths/one/?language=en&id=${hit.id}`);
        if (typeof en === 'object' && en?.hadeeth) english = en;
      } catch {
        /* Arabic only. */
      }
      accepted = {
        id: String(hit.id),
        arabic: full.hadeeth,
        translation: english?.hadeeth,
        attribution: english?.attribution ?? full.attribution,
        grade: english?.grade ?? full.grade,
      };
    }
  }

  if (accepted) {
    /*
      Keyed by the app's own Arabic, not by the citation it sits under.

      Keying by a HadeethEnc id would mean writing that id onto a citation —
      asserting "this narration is the one this claim rests on", which is the
      judgement this script is built not to make. Keyed by the words, the
      claim is only ever the one containment actually proved: *these words
      appear in this narration*. That is checkable, and it is all that is
      being said.
    */
    hadith[item.arabic] = accepted;
    console.log(`  ✓ ${item.label} — hadeethenc ${accepted.id}`);
  } else {
    candidates.push({ ...item, looked });
    console.log(`  ? ${item.label} — ${looked.length} candidate(s), none containing`);
  }
}

/* ---------------------------- writing it out ---------------------------- */

const file = `/**
 * The texts behind the app's citations.
 *
 * GENERATED by \`npm run evidence\`. Do not edit by hand — a correction made
 * here is lost the next time it runs, and one that needs making belongs
 * upstream, where the text is published.
 *
 * ${Object.keys(quran).length} Qur'an passages from QuranEnc; ${Object.keys(hadith).length} narrations from HadeethEnc.
 * Every character came over the wire from a published text rather than from
 * memory, which is the only way a file like this could exist under this
 * project's rules about Arabic.
 *
 * A narration is here only where the app's own Arabic appears, as a
 * consonantal skeleton, INSIDE the narration HadeethEnc returned — containment
 * rather than similarity, so no judgement was made by a script. The ones that
 * did not pass are in \`docs/hadith-candidates.md\` for a person to decide.
 *
 * ⚠️ HadeethEnc's terms: no modification, addition or deletion of the content,
 * and the publisher named wherever it appears. These strings are verbatim and
 * must stay that way.
 */

export type EvidenceText = {
  arabic: string;
  /** Absent where HadeethEnc publishes no English for that narration. */
  translation?: string;
  /** "Narrated by Al-Bukhāri" — HadeethEnc's own wording. */
  attribution?: string;
  grade?: string;
};

/** Keyed "2:255" or "1:1-7", matching how a \`QuranSource\` addresses a verse. */
export const QURAN_TEXT: Record<string, EvidenceText> = ${JSON.stringify(quran, null, 2)};

/**
 * Keyed by the app's own Arabic — the exact string a recitation or duʿa holds.
 *
 * Not by HadeethEnc id, and not by the citation. The only thing containment
 * proved is that these words appear in this narration, so that is the only
 * thing this map claims. Which narration a given ruling rests on is a
 * judgement, and it stays with a person.
 */
export const HADITH_TEXT: Record<string, EvidenceText & { id: string }> = ${JSON.stringify(hadith, null, 2)};

/** Where these came from. A licence obligation, not a nicety. */
export const EVIDENCE_SOURCES = {
  quran: 'QuranEnc.com',
  hadith: 'HadeethEnc.com',
} as const;
`;

writeFileSync(join(root, 'src/content/evidence.ts'), file);

const sheet = `# Hadith candidates for review

Generated by \`npm run evidence\`. **Not a change to the app** — a list of
decisions a script must not make.

Each entry below is a text the app has somebody say, carrying a hadith
citation, where a HadeethEnc search did not return a narration that literally
contains it. Containment is the only automatic test used, on purpose: choosing
which authentic narration supports a claim is substance, and
\`src/content/sources.ts\` draws that line.

To resolve one: open the candidates, decide which narration is meant, and add
its id to the citation with \`hadeethEnc(collection, id)\`. If none is right,
say so here and leave the citation as it stands.

${
  candidates.length === 0
    ? 'Nothing outstanding.'
    : candidates
        .map(
          (c) => `## ${c.label}

\`\`\`
${c.arabic}
\`\`\`

${
  c.looked.length === 0
    ? '_No candidates returned._'
    : c.looked
        .map((l) => `- hadeethenc **${l.id}** — ${l.title}\n  https://hadeethenc.com/ar/browse/hadith/${l.id}`)
        .join('\n')
}`,
        )
        .join('\n\n')
}
`;

writeFileSync(join(root, 'docs/hadith-candidates.md'), sheet);

console.log(
  `\nWrote src/content/evidence.ts — ${Object.keys(quran).length} Qur'an, ${Object.keys(hadith).length} hadith.`,
);
console.log(`Wrote docs/hadith-candidates.md — ${candidates.length} for review.`);
