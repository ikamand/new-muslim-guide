/**
 * Downloads the hadith collections this app cites into `.cache/hadith/`.
 *
 * Run: `npm run hadith:corpus` (needs a network connection)
 *
 * Nothing in `src/` reads this cache. `npm run evidence` reads it to write
 * `src/content/evidence.ts`, and that generated file is what ships — so the
 * app keeps working whether or not any of this is reachable, and whether or
 * not the cache is even present. The cache is gitignored for the same reason
 * `node_modules` is: it is 115 MB of somebody else's published data that this
 * script can reproduce on demand.
 *
 * ## Where this comes from, and why this one
 *
 * `github.com/fawazahmed0/hadith-api`, served over jsDelivr. Static JSON in a
 * git repo rather than an API, which matters: an API can go down and take a
 * feature with it, a file that has already been downloaded cannot.
 *
 * Three things picked it over the alternatives, all checked rather than
 * assumed:
 *
 * 1. **It carries the collection's own numbering.** That is the whole problem.
 *    HadeethEnc has ids of its own; IslamHouse publishes Bukhari and Muslim in
 *    full with no numbering field at all. Every one of the app's 108 distinct
 *    numbered citations resolves here.
 * 2. **Its Arabic agrees with two unrelated sources.** Checked against Hadith
 *    Unlocked and against IslamHouse's full text of Bukhari. Where IslamHouse
 *    disagreed it was IslamHouse that was wrong — its paragraphs run in book
 *    order, which makes position look like numbering until the two drift
 *    apart, and by hadith 248 they have.
 * 3. **It states a licence.** The Unlicense — a public-domain dedication.
 *    Alone among the mirrors in stating anything at all.
 *
 * ⚠️ **The English is not the maintainer's to dedicate.** Every English text
 * in circulation for the Six Books traces to sunnah.com's licensed Darussalam
 * translations — the same wording appears in all three mirrors checked here,
 * carrying the same typo in Abu Dawud 135. A public-domain dedication on a
 * compilation does not reach the translation inside it. So `generate-evidence`
 * prefers HadeethEnc's own translation, whose terms are actually published,
 * and falls back to this one only where HadeethEnc does not carry the
 * narration — recording which, per text, in `evidence.ts`.
 *
 * The Arabic carries no such question. It is a 9th-century text.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cache = join(root, '.cache/hadith');

const BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions';

/**
 * The collections the app cites, under this dataset's names.
 *
 * Derived rather than listed. `sources.ts` already holds every collection the
 * app knows, and its `sunnahSlug` — `abu-dawud` → `abudawud` — happens to be
 * exactly the spelling this dataset uses, because both took it from the same
 * place. A second hand-written table would be a second thing to update when a
 * collection is added, and the kind that gets forgotten.
 */
const { HADITH_COLLECTIONS } = await import(
  join(dirname(fileURLToPath(import.meta.url)), '../src/content/sources.ts')
);

export const EDITIONS = Object.fromEntries(
  Object.entries(HADITH_COLLECTIONS).map(([key, { sunnahSlug }]) => [key, sunnahSlug ?? key]),
);

/**
 * One Arabic edition per collection, not the two the dataset offers.
 *
 * `ara-x1` looked like a second witness worth checking against and is not:
 * it is the same text with the diacritics stripped, same numbering, same
 * wording. Comparing a vowelled text against its own unvowelled copy proves
 * only that removing vowels removed vowels, and it costs 50 MB to prove.
 *
 * The real cross-check is HadeethEnc, which `generate-evidence` already
 * queries for translations: a supervised publisher, separately edited, whose
 * Arabic either contains this text or does not.
 */
const EDITION_KINDS = ['ara-', 'eng-'];

async function fetchEdition(name) {
  const target = join(cache, `${name}.json`);
  if (existsSync(target)) return { name, cached: true };

  const response = await fetch(`${BASE}/${name}.json`, {
    headers: { 'user-agent': 'new-muslim-guide/corpus' },
  });
  if (!response.ok) throw new Error(`${response.status} for ${name}`);
  const body = await response.text();
  // A CDN miss returns an HTML error page with a 200, which would otherwise
  // land in the cache as a file that parses as nothing.
  if (!body.trimStart().startsWith('{')) throw new Error(`not JSON for ${name}`);
  writeFileSync(target, body);
  return { name, cached: false, bytes: body.length };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(cache, { recursive: true });

  const wanted = [];
  for (const edition of Object.values(EDITIONS)) {
    for (const kind of EDITION_KINDS) wanted.push(`${kind}${edition}`);
  }

  let downloaded = 0;
  for (const name of wanted) {
    try {
      const result = await fetchEdition(name);
      if (result.cached) {
        console.log(`  ${name} — cached`);
      } else {
        downloaded += 1;
        console.log(`  ${name} — ${(result.bytes / 1e6).toFixed(1)} MB`);
      }
    } catch (error) {
      console.log(`  ${name} — FAILED (${error.message})`);
    }
  }

  console.log(
    `\n${wanted.length} editions in .cache/hadith/ (${downloaded} newly downloaded).`,
  );
  console.log('Run `npm run evidence` to write src/content/evidence.ts from them.');
}

export { EDITION_KINDS, cache };
