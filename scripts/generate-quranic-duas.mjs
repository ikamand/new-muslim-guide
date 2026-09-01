/**
 * The duʿas the Qur'an puts in people's mouths.
 *
 * Run: `npm run collection:duas` (needs a network connection)
 * Writes `src/content/collections/quranic-duas.ts`.
 *
 * ## Why not the source the plan named
 *
 * `docs/build-order.md` Phase 10 says to take the 30 Qur'anic duʿas from "the
 * Pray API", and `docs/expansion-plan.md` §1.2 describes testing it in detail —
 * 57 records, `formula` and `description` modelled separately, a Naqshbandi
 * record to exclude. **Neither document records the hostname**, and it could
 * not be found again. That is a gap in the plan rather than in the API, and it
 * is written down here so the next person does not spend the same half hour.
 *
 * It turned out not to matter, because the API was only ever the LIST. Every
 * word of the content was always going to come from QuranEnc — that is the
 * whole reason the plan calls this body "fully verifiable" — so what was
 * missing was a set of verse references, and those can be stated directly.
 *
 * ## Why the list is written out rather than found by a rule
 *
 * Tried first, and it fails the same way the 99 names did. Searching all 6,236
 * ayahs for the vocative `رَبَّنَا` or `رَبِّ` returns 215 verses, and the very
 * first is 1:2 — "Lord of the worlds", which is not an address to God but a
 * description of Him. Nor would a tighter rule help: some of the verses that
 * ARE addresses are the pleas of the damned (`رَبَّنَا أَخْرِجْنَا` — "Our Lord,
 * remove us"), which nobody is being taught to say. Which supplications to
 * teach is a judgement, not a filter.
 *
 * So the references below are stated, and every one is a supplication the
 * Qur'an explicitly attributes — to a prophet, to a named person, or to the
 * believers. Each is checkable in one click against its verse.
 *
 * ## What is checked
 *
 * Every entry is fetched from QuranEnc and the run fails if a reference does
 * not resolve. Arabic and English both come from the same publisher and the
 * same verse, so they cannot drift apart, and no text is sliced: the whole
 * ayah ships, framing and all. `content:verify` re-checks the Arabic against
 * QuranEnc on every run after this one.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/*
  The local corpus first — `.cache/quran/saheeh.json`, written by
  `npm run quran:corpus` — so a QuranEnc outage cannot stall a regeneration
  (2 Sep 2026: one did, mid-run, for exactly this script). The bytes are the
  same publisher's either way, and `content:verify` checks the OUTPUT against
  live QuranEnc regardless of which path served it, so a corrupt or stale
  cache cannot slip a wrong character through to a commit.
*/
const corpusPath = join(root, '.cache/quran/saheeh.json');
const corpus = existsSync(corpusPath)
  ? new Map(
      JSON.parse(readFileSync(corpusPath, 'utf8')).map((v) => [`${v.s}:${v.a}`, v]),
    )
  : null;
if (corpus) console.log(`Using local corpus (${corpus.size} ayahs); QuranEnc is the fallback.\n`);

/* Three tries with a pause — QuranEnc's edge throws the occasional 524, and
   one hiccup should not abort a 37-request run. */
const get = async (url) => {
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/duas' } });
      if (!response.ok) throw new Error(`${response.status} ${url}`);
      return (await response.json()).result;
    } catch (error) {
      lastError = error;
      if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 2000));
    }
  }
  throw lastError;
};

/**
 * Whose supplication, and where.
 *
 * `who` is the attribution the Qur'an itself makes, and it is what the entry
 * is called — "The duʿa of Yūnus" rather than a title invented for it. Ordered
 * roughly as the Qur'an tells them, prophets first and the believers' own
 * duʿas after, because that is the order somebody meets them in.
 */
/*
  Revised 2 Sep 2026, Iyad's curation: the collection had drifted toward a
  story anthology — beautiful attributed pleas almost nobody recites — while
  missing half the lived canon. Seven anthology entries went (Lūṭ, Shuʿayb,
  Sulaymān 27:19, Mūsā 28:24, Yūsuf 12:101, Ibrāhīm 2:126–127) and the
  commonly-recited ones came in: 9:129, 17:80, 23:97–98, 3:16, 3:191–194,
  2:250, 10:85–86, 11:47. Kept against the same axe, deliberately: Āsiyah and
  the mother of Maryam (nearly the only women's voices here) and Ayyūb (said
  in illness). An external list was consulted only as a signal of what is
  actually said; every character still comes from QuranEnc.

  `a` may be a single ayah or a [from, to] range of consecutive ayahs — the
  duʿa of 3:191–194 is one supplication across four verses, and slicing it
  into four cards would ask a reader to say a quarter of it. Whole ayahs,
  joined in order, nothing sliced.
*/
const DUAS = [
  { id: 'adam', who: 'Ādam', s: 7, a: 23, note: 'After the mistake' },
  { id: 'nuh', who: 'Nūḥ', s: 71, a: 28, note: 'For his parents and the believers' },
  { id: 'nuh-refuge', who: 'Nūḥ', s: 11, a: 47, note: 'Refuge from asking wrongly' },
  { id: 'ibrahim-muslims', who: 'Ibrāhīm', s: 2, a: 128, note: 'For his descendants' },
  { id: 'ibrahim-prayer', who: 'Ibrāhīm', s: 14, a: 40, note: 'To be kept in prayer' },
  { id: 'ibrahim-forgive', who: 'Ibrāhīm', s: 14, a: 41, note: 'For his parents' },
  { id: 'ibrahim-wisdom', who: 'Ibrāhīm', s: 26, a: 83, note: 'For wisdom and good company' },
  { id: 'musa-chest', who: 'Mūsā', s: 20, a: 25, note: 'Before speaking to Pharaoh' },
  { id: 'musa-task', who: 'Mūsā', s: 20, a: 26, note: 'Make my task easy' },
  { id: 'musa-tongue', who: 'Mūsā', s: 20, a: 27, note: 'Untie the knot from my tongue' },
  { id: 'musa-forgive', who: 'Mūsā', s: 7, a: 151, note: 'For himself and his brother' },
  { id: 'musa-people', who: 'The believers with Mūsā', s: 10, a: [85, 86], note: 'Under an oppressor' },
  { id: 'zakariyya-offspring', who: 'Zakariyyā', s: 3, a: 38, note: 'For a child' },
  { id: 'zakariyya-alone', who: 'Zakariyyā', s: 21, a: 89, note: 'Do not leave me alone' },
  { id: 'ayyub', who: 'Ayyūb', s: 21, a: 83, note: 'In illness' },
  { id: 'yunus', who: 'Yūnus', s: 21, a: 87, note: 'From inside the darkness' },
  { id: 'talut-company', who: 'Those who stood with Ṭālūt', s: 2, a: 250, note: 'Facing Jālūt' },
  { id: 'maryam-mother', who: 'The mother of Maryam', s: 3, a: 35, note: 'Dedicating her child' },
  { id: 'asiyah', who: 'The wife of Pharaoh', s: 66, a: 11, note: 'For a house in Paradise' },
  { id: 'muhammad-knowledge', who: 'The Prophet ﷺ', s: 20, a: 114, note: 'Increase me in knowledge' },
  { id: 'muhammad-mercy', who: 'The Prophet ﷺ', s: 23, a: 118, note: 'Forgive and have mercy' },
  { id: 'muhammad-entry', who: 'The Prophet ﷺ', s: 17, a: 80, note: 'A true entry and a true exit' },
  { id: 'muhammad-enough', who: 'The Prophet ﷺ', s: 9, a: 129, note: 'Allah is enough for me' },
  { id: 'muhammad-refuge', who: 'The Prophet ﷺ', s: 23, a: [97, 98], note: 'Refuge from the whispers' },
  { id: 'believers-both', who: 'The believers', s: 2, a: 201, note: 'Good in both lives' },
  { id: 'believers-burden', who: 'The believers', s: 2, a: 286, note: 'Do not burden us' },
  { id: 'believers-hearts', who: 'The believers', s: 3, a: 8, note: 'Do not let our hearts deviate' },
  { id: 'believers-forgive', who: 'The believers', s: 3, a: 16, note: 'We have believed — forgive us' },
  { id: 'believers-patience', who: 'The believers', s: 3, a: 147, note: 'For steadfastness' },
  { id: 'believers-reflect', who: 'Those who reflect', s: 3, a: [191, 194], note: 'Standing, sitting, and lying down' },
  { id: 'cave', who: 'The young men of the cave', s: 18, a: 10, note: 'Taking shelter' },
  { id: 'servants', who: 'The servants of the Most Merciful', s: 25, a: 74, note: 'For family' },
  { id: 'later-believers', who: 'Those who came after', s: 59, a: 10, note: 'For those before us' },
];

console.log(`The duʿas of the Qur'an — ${DUAS.length} references, from QuranEnc\n`);

const entries = [];
for (const dua of DUAS) {
  const [from, to] = Array.isArray(dua.a) ? dua.a : [dua.a, dua.a];
  const arabicParts = [];
  const englishParts = [];
  for (let n = from; n <= to; n += 1) {
    const cached = corpus?.get(`${dua.s}:${n}`);
    const verse = cached
      ? { arabic_text: cached.ar, translation: cached.en }
      : await get(
          `https://quranenc.com/api/v1/translation/aya/english_saheeh/${dua.s}/${n}`,
        );
    if (!verse?.arabic_text || !verse?.translation) {
      throw new Error(`${dua.id}: ${dua.s}:${n} did not resolve`);
    }
    arabicParts.push(verse.arabic_text.trim());
    englishParts.push(verse.translation.replace(/\[\d+\]/g, '').replace(/\s+/g, ' ').trim());
  }
  /*
    The whole ayah, framing and all — and for a range, whole consecutive
    ayahs joined in order. Slicing the supplication out of its verse would
    mean deciding where a duʿa starts, which is an editorial act on a Qur'an
    text — and the framing ("And [mention] when Abraham said…") is exactly
    what tells a reader whose words these are.
  */
  const ref = from === to ? `${dua.s}:${from}` : `${dua.s}:${from}–${to}`;
  entries.push({
    id: dua.id,
    title: `${dua.who} — ${dua.note}`,
    arabic: arabicParts.join(' '),
    translation: englishParts.join(' '),
    s: dua.s,
    from,
    to,
    ref,
  });
  console.log(`  ${ref.padStart(9)}  ${dua.who}`);
}

const lines = entries.map((entry) => `  {
    id: ${JSON.stringify(entry.id)},
    title: ${JSON.stringify(entry.title)},
    arabic: ${JSON.stringify(entry.arabic)},
    translation: ${JSON.stringify(entry.translation)},
    note: ${JSON.stringify(`Qur’an ${entry.ref}`)},
    sources: [quran(${entry.s}, ${entry.from === entry.to ? entry.from : `[${entry.from}, ${entry.to}]`})],
  },`);

const file = `/**
 * The duʿas the Qur'an puts in people's mouths.
 *
 * GENERATED by \`npm run collection:duas\`. Do not edit by hand.
 *
 * Every character — Arabic and English — came over the wire from QuranEnc's
 * Saheeh International edition, and both come from the SAME verse, so they
 * cannot drift apart. No text is sliced: the whole ayah ships, framing and
 * all, because deciding where a supplication begins would be an editorial act
 * on a Qur'an text, and the framing is what tells a reader whose words these
 * are.
 *
 * ⚠️ The references are stated rather than found by a rule. Searching all
 * 6,236 ayahs for the vocative returns 215 verses, the first of which is 1:2 —
 * "Lord of the worlds", a description rather than an address. See the
 * generator's header.
 *
 * ⚠️ Hisn al-Muslim, already in this app, is hadith-centred. This is the body
 * of supplication it does not carry.
 */
import { quran } from '../sources';
import type { Collection } from '../types';

export const QURANIC_DUAS: Collection = {
  id: 'quranic-duas',
  title: 'Duʿas from the Qur’an',
  subtitle: 'The words the Qur’an gives to the prophets, and to everyone after them.',
  provider: 'quranenc',
  meta: {
    category: 'quran',
    difficulty: 'building',
    estimatedMinutes: 15,
    beginnerPriority: 3,
    tags: ['arabic'],
    relatedContent: [{ kind: 'reference', id: 'dua-and-dhikr' }],
  },
  entries: [
${lines.join('\n')}
  ],
};
`;

writeFileSync(join(root, 'src/content/collections/quranic-duas.ts'), file);
console.log(`\nWrote ${entries.length} duʿas to src/content/collections/quranic-duas.ts`);
