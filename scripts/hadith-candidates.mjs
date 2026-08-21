/**
 * Proposes HadeethEnc narrations for the citations that have no text yet.
 *
 * Run: `npm run hadith:candidates` (needs a network connection)
 *
 * Writes `docs/hadith-candidates.md`. **Changes nothing in the app.**
 *
 * ## The problem this exists for
 *
 * `npm run evidence` can only resolve a citation attached to Arabic the app
 * already holds — it searches HadeethEnc by phrase and accepts a hit only when
 * the app's words are literally inside the narration. That covers the duʿas
 * and the recitations.
 *
 * It cannot touch the larger half: citations on INSTRUCTIONS. "Wash both hands
 * up to the wrists, three times" cites Sahih al-Bukhari 159, and there is no
 * Arabic on that step to search with. Nor can the number be looked up —
 * HadeethEnc has ids of its own, and no site in this family maps a collection
 * number to a text.
 *
 * ## What it does instead
 *
 * HadeethEnc's category tree maps closely onto what this app teaches —
 * Ablution, Method of Prayer, Dhikr during Prayer, Ritual Bath, Dry Ablution.
 * So it pulls those categories in full and, for each unresolved citation,
 * ranks the narrations whose English overlaps the claim the app is making.
 *
 * A ranked list is a suggestion. **It decides nothing**, and it must not: which
 * authentic narration supports a given instruction is substance, and
 * `src/content/sources.ts` draws that line. The output is a sheet for a person
 * to work through, which is why it lands in `docs/` and not in `src/`.
 */
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = (p) => import(join(root, p));

const { GUIDES } = await load('src/content/guides.ts');
const { REFERENCES } = await load('src/content/references.ts');
const { HADITH_TEXT } = await load('src/content/evidence.ts');
const { formatSource } = await load('src/content/sources.ts');

const get = async (url) => {
  const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/candidates' } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  return response.json();
};

/**
 * The HadeethEnc categories this app actually teaches from.
 *
 * Listed rather than crawled: the tree has 452 categories and most of them —
 * inheritance shares, prescribed punishments, the rulings of truce — are
 * nowhere near anything a new Muslim's first month needs. Pulling those would
 * add noise to every ranking.
 */
const CATEGORIES = [
  { id: 437, name: 'Ablution' },
  { id: 438, name: 'Ritual bath' },
  { id: 439, name: 'Dry ablution' },
  { id: 435, name: 'Toilet manners' },
  { id: 436, name: 'Natural cleanliness' },
  { id: 460, name: 'Conditions of prayer' },
  { id: 461, name: 'Pillars of prayer' },
  { id: 462, name: 'Obligatory acts of prayer' },
  { id: 463, name: 'Recommended acts of prayer' },
  { id: 464, name: 'Method of prayer' },
  { id: 465, name: 'Dhikr during prayer' },
  { id: 466, name: 'Nullifiers of prayer' },
  { id: 467, name: 'Mistakes during prayer' },
  { id: 468, name: 'Prostration of forgetfulness' },
  { id: 471, name: 'Prayer of people with excuses' },
  { id: 440, name: 'Menses and postpartum bleeding' },
  { id: 725, name: 'Rulings of mosques' },
  { id: 457, name: 'Virtue of prayer' },
];

console.log(`Pulling ${CATEGORIES.length} HadeethEnc categories…`);

const pool = [];
for (const category of CATEGORIES) {
  let list = [];
  try {
    const data = await get(
      `https://hadeethenc.com/api/v1/hadeeths/list/?language=en&category_id=${category.id}&page=1&per_page=100`,
    );
    list = data.data ?? [];
  } catch (error) {
    console.log(`  ${category.name} — failed (${error.message})`);
    continue;
  }
  for (const row of list) pool.push({ ...row, category: category.name });
  console.log(`  ${category.name} — ${list.length}`);
}

// Deduplicated: a narration can sit in more than one category.
const byId = new Map(pool.map((h) => [String(h.id), h]));
console.log(`\n${byId.size} distinct narrations in the pool`);

/* ------------------------- what still needs one ------------------------- */

const STOP = new Set(
  `the a an and or of to in on for with your you it is are was were be been that this then them they
   his her its as at by from into once not no do does did so if when what which who whom
   said say says prophet allah god muslim muslims one two three peace upon him blessings`.split(/\s+/),
);

const words = (text) =>
  new Set(
    text
      .toLowerCase()
      .replace(/[^a-z\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 3 && !STOP.has(w)),
  );

/**
 * Which categories a claim should be ranked against first.
 *
 * Without this, "Wash your hands. Wash both hands up to the wrists" ranked
 * three ritual-bath narrations top, because ghusl involves washing hands too
 * and the word carries no information on its own. A wudu step should be
 * compared against ablution before anything else.
 */
const AFFINITY = [
  { match: /^Wudu/, prefer: ['Ablution', 'Natural cleanliness', 'Toilet manners'] },
  { match: /^Ghusl/, prefer: ['Ritual bath'] },
  { match: /^Tayammum/, prefer: ['Dry ablution'] },
  { match: /^(Fajr|Dhuhr|Asr|Maghrib|Isha|Tahajjud|Istikhara)/, prefer: ['Method of prayer', 'Dhikr during prayer', 'Pillars of prayer', 'Recommended acts of prayer'] },
  { match: /Losing count/, prefer: ['Mistakes during prayer', 'Prostration of forgetfulness'] },
  { match: /Periods/, prefer: ['Menses and postpartum bleeding'] },
  { match: /mosque/i, prefer: ['Rulings of mosques'] },
  { match: /cannot stand/, prefer: ['Prayer of people with excuses'] },
  { match: /breaks the prayer/, prefer: ['Nullifiers of prayer'] },
  { match: /before you pray/, prefer: ['Conditions of prayer'] },
];

const preferredFor = (label) => AFFINITY.find((a) => a.match.test(label))?.prefer ?? [];

const unresolved = [];
const add = (label, claim, sources, arabic) => {
  const hadith = (sources ?? []).filter((s) => s.kind === 'hadith');
  if (hadith.length === 0) return;
  // Already carrying its text — nothing to propose.
  if (arabic && HADITH_TEXT[arabic]) return;
  unresolved.push({ label, claim, cites: hadith.map(formatSource) });
};

for (const guide of GUIDES) {
  for (const step of guide.steps) {
    add(
      `${guide.title} — ${step.title}`,
      `${step.title}. ${step.instruction}`,
      [...(step.sources ?? []), ...(step.says?.sources ?? [])],
      step.says?.arabic,
    );
  }
}
for (const reference of REFERENCES) {
  for (const section of reference.sections) {
    add(`${reference.title} — ${section.heading}`, `${section.heading}. ${section.body}`, section.sources);
  }
}

// One entry per distinct claim: the five prayers repeat every step, and a
// reviewer should not be asked the same question five times.
const distinct = [...new Map(unresolved.map((u) => [u.claim, u])).values()];
console.log(`${distinct.length} distinct claims still without their text\n`);

/* ---------------------------- ranking ---------------------------- */

/**
 * How much a word is worth.
 *
 * Plain overlap counted "wash" and "ears" the same, and "wash" appears in a
 * third of the pool while "ears" appears twice — so the common word drowned
 * the rare one that actually identified the narration. Rarity is the signal.
 */
const docFrequency = new Map();
for (const h of byId.values()) {
  for (const w of words(String(h.title ?? ''))) {
    docFrequency.set(w, (docFrequency.get(w) ?? 0) + 1);
  }
}
const weight = (w) => Math.log(byId.size / (1 + (docFrequency.get(w) ?? 0)));

const scored = distinct.map((entry) => {
  const claim = words(entry.claim);
  const prefer = preferredFor(entry.label);

  const ranked = [...byId.values()]
    .map((h) => {
      const title = words(String(h.title ?? ''));
      let score = 0;
      for (const w of claim) if (title.has(w)) score += weight(w);
      // A narration from the right part of the tree starts ahead. Not a
      // filter — a narration from elsewhere can still win on the words.
      if (prefer.includes(h.category)) score *= 2.5;
      return { h, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return { ...entry, ranked };
});

const withAny = scored.filter((s) => s.ranked.length > 0);

const sheet = `# Hadith candidates for review

Generated by \`npm run hadith:candidates\`. **This changes nothing in the app.**

Every entry is a claim the app makes, carrying a hadith citation, whose text is
not yet on screen. \`npm run evidence\` can only resolve a citation attached to
Arabic the app already holds — it searches HadeethEnc by phrase and accepts a
hit only where the app's words are literally inside the narration. These are
the others: citations on instructions, where there is no Arabic to search with
and the collection number cannot be looked up, because HadeethEnc has ids of
its own and no site in this family maps a number to a text.

So the narrations below are **suggested**, by weighing the words a claim and
HadeethEnc's own summary of a narration share — rare words counting for more
than common ones, and narrations from the matching part of the tree starting
ahead. Both of those are corrections to a first version that ranked three
ritual-bath narrations top for "wash your hands", because ghusl involves
washing hands and the word carries no information by itself.

It is still a starting point and nothing more. Which authentic
narration supports a given instruction is substance, and \`src/content/sources.ts\`
draws that line — a script must not cross it.

**To resolve one:** open the candidates, decide which narration is meant, and
add \`hadeethEnc('<collection>', '<id>')\` to that claim's \`sources\`. Its text
then appears under "Where this comes from" on the next \`npm run evidence\`. If
none of them is right, note that here and leave the citation as it stands — an
honest reference with no text beats a wrong text.

**Pool:** ${byId.size} narrations. **Claims:** ${distinct.length}, of which ${withAny.length} have at least one candidate.

---

${scored
  .map(
    (entry) => `## ${entry.label}

**Cites:** ${entry.cites.join(' · ')}

> ${entry.claim.replace(/\s+/g, ' ').slice(0, 300)}

${
  entry.ranked.length === 0
    ? '_No candidate in the pool._'
    : entry.ranked
        .map(
          (r) =>
            `- **${r.h.id}** _(${r.h.category})_ — ${String(r.h.title ?? '').slice(0, 120)}\n  https://hadeethenc.com/en/browse/hadith/${r.h.id}`,
        )
        .join('\n')
}`,
  )
  .join('\n\n')}
`;

writeFileSync(join(root, 'docs/hadith-candidates.md'), sheet);
console.log(`Wrote docs/hadith-candidates.md — ${distinct.length} claims, ${withAny.length} with candidates.`);
