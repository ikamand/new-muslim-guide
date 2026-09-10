/**
 * The duas the Qur'an puts in people's mouths.
 *
 * Run: `npm run collection:duas` (needs a network connection)
 * Writes `src/content/collections/quranic-duas.ts`.
 *
 * ## Why not the source the plan named
 *
 * `docs/build-order.md` Phase 10 says to take the 30 Qur'anic duas from "the
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
 * is called — "The dua of Yūnus" rather than a title invented for it.
 */
/*
  Revised 9 Sep 2026, Iyad's call: the collection follows quran.com/duas.

  Its 101 topical pages cite 139 passages, and the same verse sits on many of
  them (28:24 is on fifteen). What is copied is the STRUCTURE — the category
  names, their order, and which category lists a verse on the most pages —
  and every text still comes from QuranEnc, never from the site. Each passage
  is placed once, in the category quran.com files it under most often, ties
  going to the earlier category. Within a section the order is the mushaf's,
  so Al-Fatihah opens Essentials without anyone deciding that it should.

  Sixty-six of the 139 came in. What stayed out, and why:
  - Verses ABOUT a topic rather than words said to Allah: Āyat al-Kursī, the
    fasting rulings, Laylat al-Qadr, the day-and-night signs, the dhikr
    commands, the ruqyah verses, and the "Prophet X in the Quran" pages that
    carry a mention and no supplication (6:86, 38:48, 19:56–57, 21:85).
  - Words said to people, not to Allah: Yaʿqūb to his sons (12:18, 83, 86),
    Hūd's and Shuʿayb's speeches (11:56, 11:88), Sulaymān's thanks (27:15,
    27:40), the magicians' declaration (7:117–122), Yūsuf's vow (28:17).
  - Hopes rather than requests: 18:24, 28:22.
  - Overlaps, where the site lists a verse both alone and inside a range
    (21:83 and 21:83–84; 2:127–128 and 2:127–129; 2:156 and 2:155–156): the
    range on the most pages is kept.
  - The whole "Worship & Reflection" category, which held no supplication at
    all once the above was applied.
  Kept though quran.com lacks her: the mother of Maryam, 3:35, under Family.

  `a` may be a single ayah or a [from, to] range of consecutive ayahs — the
  dua of 3:191–194 is one supplication across four verses, and slicing it
  into four cards would ask a reader to say a quarter of it. Whole ayahs,
  joined in order, nothing sliced.
*/
const SECTIONS = [
  {
    title: 'Essentials',
    duas: [
      { id: 'fatihah', who: 'Every Muslim, in every prayer', s: 1, a: [1, 7], note: 'Guide us to the straight path' },
      { id: 'ibrahim-muslims', who: 'Ibrāhīm and Ismāʿīl', s: 2, a: [127, 128], note: 'Raising the House' },
      { id: 'believers-both', who: 'The believers', s: 2, a: 201, note: 'Good in both lives' },
      { id: 'adam', who: 'Ādam', s: 7, a: 23, note: 'After the mistake' },
      { id: 'child-parents', who: 'The believer', s: 17, a: 24, note: 'For parents' },
      { id: 'yunus', who: 'Yūnus', s: 21, a: 87, note: 'From inside the darkness' },
      { id: 'muhammad-mercy', who: 'The Prophet ﷺ', s: 23, a: 118, note: 'Forgive and have mercy' },
      { id: 'musa-need', who: 'Mūsā', s: 28, a: 24, note: 'In need of whatever good You send' },
      { id: 'ibrahim-child', who: 'Ibrāhīm', s: 37, a: 100, note: 'For a righteous child' },
    ],
  },
  {
    title: 'Prophetic Duas',
    duas: [
      { id: 'zakariyya-offspring', who: 'Zakariyyā', s: 3, a: 38, note: 'For a child' },
      { id: 'disciples', who: 'The disciples of ʿĪsā', s: 3, a: [52, 53], note: 'Register us among the witnesses' },
      { id: 'musa-part', who: 'Mūsā', s: 5, a: 25, note: 'Part us from the disobedient' },
      { id: 'isa-table', who: 'ʿĪsā', s: 5, a: 114, note: 'For a table from heaven' },
      { id: 'shuayb', who: 'Shuʿayb', s: 7, a: 89, note: 'Decide between us in truth' },
      { id: 'nuh-ark', who: 'Nūḥ', s: 11, a: 41, note: 'Boarding the ark' },
      { id: 'nuh-refuge', who: 'Nūḥ', s: 11, a: 47, note: 'Refuge from asking wrongly' },
      { id: 'muhammad-entry', who: 'The Prophet ﷺ', s: 17, a: 80, note: 'A true entry and a true exit' },
      { id: 'musa-harun', who: 'Mūsā', s: 20, a: [29, 32], note: 'For Hārūn' },
      { id: 'zakariyya-alone', who: 'Zakariyyā', s: 21, a: 89, note: 'Do not leave me alone' },
      { id: 'muhammad-judge', who: 'The Prophet ﷺ', s: 21, a: 112, note: 'Judge in truth' },
      { id: 'nuh-landing', who: 'Nūḥ', s: 23, a: [28, 29], note: 'A blessed landing' },
      { id: 'lut-family', who: 'Lūṭ', s: 26, a: 169, note: 'Save me and my family' },
      { id: 'nuh', who: 'Nūḥ', s: 71, a: 28, note: 'For his parents and the believers' },
    ],
  },
  {
    title: 'Family & Community',
    duas: [
      { id: 'believers-forgive', who: 'The believers', s: 3, a: 16, note: 'We have believed — forgive us' },
      { id: 'maryam-mother', who: 'The mother of Maryam', s: 3, a: 35, note: 'Dedicating her child' },
      { id: 'wept', who: 'Those who wept at the revelation', s: 5, a: [83, 84], note: 'We have believed' },
      { id: 'ibrahim-prayer', who: 'Ibrāhīm', s: 14, a: [40, 41], note: 'To be kept in prayer, and for his parents' },
      { id: 'zakariyya-bones', who: 'Zakariyyā', s: 19, a: [4, 5], note: 'My bones have weakened' },
      { id: 'servants', who: 'The servants of the Most Merciful', s: 25, a: 74, note: 'For family' },
      { id: 'throne-bearers', who: 'The angels who carry the Throne', s: 40, a: [7, 9], note: 'For the believers' },
      { id: 'at-forty', who: 'The servant at forty', s: 46, a: 15, note: 'Gratitude, parents, and children' },
      { id: 'later-believers', who: 'Those who came after', s: 59, a: 10, note: 'For those before us' },
      { id: 'believers-light', who: 'The believers on the Day', s: 66, a: 8, note: 'Perfect our light' },
    ],
  },
  {
    title: 'Forgiveness & Mercy',
    duas: [
      { id: 'musa-forgive', who: 'Mūsā', s: 7, a: 151, note: 'For himself and his brother' },
      { id: 'musa-earthquake', who: 'Mūsā', s: 7, a: [155, 156], note: 'After the earthquake' },
      { id: 'musa-wronged', who: 'Mūsā', s: 28, a: 16, note: 'I have wronged myself' },
      { id: 'ibrahim-company', who: 'Ibrāhīm and those with him', s: 60, a: [4, 5], note: 'Upon You we rely' },
    ],
  },
  {
    title: 'Guidance & Knowledge',
    duas: [
      { id: 'angels-knowledge', who: 'The angels', s: 2, a: 32, note: 'We know only what You taught us' },
      { id: 'believers-hearts', who: 'The believers', s: 3, a: [8, 9], note: 'Do not let our hearts deviate' },
      { id: 'cave', who: 'The young men of the cave', s: 18, a: 10, note: 'Taking shelter' },
      { id: 'musa-chest', who: 'Mūsā', s: 20, a: [25, 28], note: 'Before speaking to Pharaoh' },
      { id: 'muhammad-knowledge', who: 'The Prophet ﷺ', s: 20, a: 114, note: 'Increase me in knowledge' },
      { id: 'ibrahim-wisdom', who: 'Ibrāhīm', s: 26, a: [78, 85], note: 'Who created me and guides me' },
      { id: 'ibrahim-heart', who: 'Ibrāhīm', s: 26, a: [87, 89], note: 'A sound heart' },
      { id: 'sulayman-gratitude', who: 'Sulaymān', s: 27, a: 19, note: 'To be grateful' },
    ],
  },
  {
    title: 'Protection & Hardship',
    duas: [
      { id: 'patient-loss', who: 'The patient', s: 2, a: 156, note: 'When loss strikes' },
      { id: 'talut-company', who: 'Those who stood with Ṭālūt', s: 2, a: 250, note: 'Facing Jālūt' },
      { id: 'believers-burden', who: 'The believers', s: 2, a: 286, note: 'Do not burden us' },
      { id: 'magicians', who: 'The magicians who believed', s: 7, a: 126, note: 'Patience, and to die a Muslim' },
      { id: 'musa-people', who: 'The believers with Mūsā', s: 10, a: [85, 86], note: 'Under an oppressor' },
      { id: 'ayyub', who: 'Ayyūb', s: 21, a: 83, note: 'In illness' },
      { id: 'muhammad-wrongdoers', who: 'The Prophet ﷺ', s: 23, a: [93, 94], note: 'Not among the wrongdoers' },
      { id: 'muhammad-refuge', who: 'The Prophet ﷺ', s: 23, a: [97, 98], note: 'Refuge from the whispers' },
      { id: 'musa-save', who: 'Mūsā', s: 28, a: 21, note: 'Save me from the wrongdoers' },
      { id: 'lut-corrupters', who: 'Lūṭ', s: 29, a: 30, note: 'Against the corrupters' },
      { id: 'traveller', who: 'The traveller', s: 43, a: [13, 14], note: 'Setting out' },
      { id: 'nuh-overpowered', who: 'Nūḥ', s: 54, a: 10, note: 'Overpowered, so help' },
      { id: 'asiyah', who: 'The wife of Pharaoh', s: 66, a: 11, note: 'For a house in Paradise' },
      { id: 'falaq', who: 'Whoever seeks refuge', s: 113, a: [1, 5], note: 'Al-Falaq' },
      { id: 'nas', who: 'Whoever seeks refuge', s: 114, a: [1, 6], note: 'An-Nas' },
    ],
  },
  {
    title: 'Provision & Gratitude',
    duas: [
      { id: 'ibrahim-makkah', who: 'Ibrāhīm', s: 2, a: 126, note: 'For Mecca' },
      { id: 'muhammad-sovereignty', who: 'The Prophet ﷺ', s: 3, a: [26, 27], note: 'Owner of all sovereignty' },
      { id: 'ibrahim-house', who: 'Ibrāhīm', s: 14, a: [37, 38], note: 'For those he settled by the House' },
    ],
  },
  {
    title: 'Hereafter',
    duas: [
      { id: 'believers-reflect', who: 'Those who reflect', s: 3, a: [191, 194], note: 'Standing, sitting, and lying down' },
      { id: 'yusuf', who: 'Yūsuf', s: 12, a: 101, note: 'Let me die a Muslim' },
      { id: 'servants-hell', who: 'The servants of the Most Merciful', s: 25, a: [65, 66], note: 'Turn Hell away from us' },
    ],
  },
];
const DUAS = SECTIONS.flatMap((section) => section.duas.map((dua) => ({ ...dua, section: section.title })));

console.log(`The duas of the Qur'an — ${DUAS.length} references in ${SECTIONS.length} sections, from QuranEnc\n`);

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
    mean deciding where a dua starts, which is an editorial act on a Qur'an
    text — and the framing ("And [mention] when Abraham said…") is exactly
    what tells a reader whose words these are.
  */
  const ref = from === to ? `${dua.s}:${from}` : `${dua.s}:${from}–${to}`;
  entries.push({
    id: dua.id,
    section: dua.section,
    title: `${dua.who} — ${dua.note}`,
    arabic: arabicParts.join(' '),
    translation: englishParts.join(' '),
    s: dua.s,
    from,
    to,
    ref,
  });
  console.log(`  ${ref.padStart(9)}  ${dua.section.padEnd(22)} ${dua.who}`);
}

const lines = entries.map((entry) => `  {
    id: ${JSON.stringify(entry.id)},
    section: ${JSON.stringify(entry.section)},
    title: ${JSON.stringify(entry.title)},
    arabic: ${JSON.stringify(entry.arabic)},
    translation: ${JSON.stringify(entry.translation)},
    note: ${JSON.stringify(`Qur’an ${entry.ref}`)},
    sources: [quran(${entry.s}, ${entry.from === entry.to ? entry.from : `[${entry.from}, ${entry.to}]`})],
  },`);

const file = `/**
 * The duas the Qur'an puts in people's mouths.
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
 * The sections and their order follow quran.com/duas, and each passage sits
 * in the section that site files it under most often. The structure is
 * copied; the text is not — see the generator's header for what was left
 * out and why.
 *
 * ⚠️ Hisn al-Muslim, already in this app, is hadith-centred. This is the body
 * of supplication it does not carry.
 */
import { quran } from '../sources';
import type { Collection } from '../types';

export const QURANIC_DUAS: Collection = {
  id: 'quranic-duas',
  title: 'Duas from the Qur’an',
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
console.log(`\nWrote ${entries.length} duas to src/content/collections/quranic-duas.ts`);
