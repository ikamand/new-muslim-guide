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

/* The API's word count for an ayah, from the `.cache/quran/words/` mirror —
   the numbering CUT is written in. Needed only for cut ayahs. */
const wordChapters = new Map();
const apiWordCount = (s, n) => {
  if (!wordChapters.has(s)) {
    const file = join(root, `.cache/quran/words/${s}.json`);
    if (!existsSync(file)) throw new Error(`.cache/quran/words/${s}.json is missing — run \`npm run quran:words:corpus\``);
    wordChapters.set(s, new Map(JSON.parse(readFileSync(file, 'utf8')).map((v) => [v.verse_number, v.words.filter((w) => w.char_type_name === 'word').length])));
  }
  const count = wordChapters.get(s).get(n);
  if (!count) throw new Error(`${s}:${n} is not in the words cache`);
  return count;
};

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
 * Whose words, and what they ask.
 *
 * `who` is the attribution the Qur'an itself makes; `note` is a label for the
 * row, in the app's words. The site prints none — a verse, its translation
 * and its reference — and a row needs a name. Verses that are not
 * supplications are on the site's pages too (Āyat al-Kursī under ruqyah, the
 * story of Ṣāliḥ under his name) and are named for what they are.
 */
const WHO = {
  '1:1-7': ['Every Muslim, in every prayer', 'Guide us to the straight path'],
  '2:32': ['The angels', 'We know only what You taught us'],
  '2:102': ['On magic', 'It was not Sulaymān who disbelieved'],
  '2:126': ['Ibrāhīm', 'For Mecca'],
  '2:127-128': ['Ibrāhīm and Ismāʿīl', 'Raising the House'],
  '2:127-129': ['Ibrāhīm and Ismāʿīl', 'Raising the House, and for a messenger'],
  '2:155-156': ['The patient', 'Tested, and what they say'],
  '2:156': ['The patient', 'When loss strikes'],
  '2:201': ['The believers', 'Good in both lives'],
  '2:250': ['Those who stood with Ṭālūt', 'Facing Jālūt'],
  '2:255': ['Āyat al-Kursī', 'The verse of the Throne'],
  '2:285': ['The Messenger and the believers', 'We hear and we obey'],
  '2:285-286': ['The end of Al-Baqarah', 'Two verses said at night'],
  '2:286': ['The believers', 'Do not burden us'],
  '3:8-9': ['The believers', 'Do not let our hearts deviate'],
  '3:16': ['The believers', 'We have believed — forgive us'],
  '3:26-27': ['The Prophet ﷺ', 'Owner of all sovereignty'],
  '3:35': ['The mother of Maryam', 'Dedicating her child'],
  '3:38': ['Zakariyyā', 'For a child'],
  '3:52-53': ['The disciples of ʿĪsā', 'Register us among the witnesses'],
  '3:191-194': ['Those who reflect', 'Standing, sitting, and lying down'],
  '5:25': ['Mūsā', 'Part us from the disobedient'],
  '5:83-84': ['Those who wept at the revelation', 'We have believed'],
  '5:114': ['ʿĪsā', 'For a table from heaven'],
  '5:118': ['ʿĪsā', 'They are Your servants'],
  '6:79': ['Ibrāhīm', 'I have turned my face'],
  '6:86': ['Ismāʿīl, Al-Yasaʿ, Yūnus and Lūṭ', 'Preferred over the worlds'],
  '6:162': ['The Prophet ﷺ', 'My prayer and my life are for Allah'],
  '7:23': ['Ādam', 'After the mistake'],
  '7:43': ['The people of Paradise', 'Praise to Allah who guided us'],
  '7:89': ['Shuʿayb', 'Decide between us in truth'],
  '7:117-122': ['The magicians', 'They fell in prostration'],
  '7:126': ['The magicians who believed', 'Patience, and to die a Muslim'],
  '7:151': ['Mūsā', 'For himself and his brother'],
  '7:155-156': ['Mūsā', 'After the earthquake'],
  '10:57': ['The Qur’an', 'A healing for what is in the breasts'],
  '10:81-82': ['Mūsā', 'Allah will expose its worthlessness'],
  '10:85-86': ['The believers with Mūsā', 'Under an oppressor'],
  '11:41': ['Nūḥ', 'Boarding the ark'],
  '11:47': ['Nūḥ', 'Refuge from asking wrongly'],
  '11:52': ['Hūd', 'Ask forgiveness, and He sends rain'],
  '11:56': ['Hūd', 'I have relied upon Allah'],
  '11:61': ['Ṣāliḥ', 'Worship Allah and ask His forgiveness'],
  '11:71-73': ['The wife of Ibrāhīm', 'Good tidings of Isḥāq'],
  '11:88': ['Shuʿayb', 'I only intend reform'],
  '12:18': ['Yaʿqūb', 'Patience is most fitting'],
  '12:67': ['Yaʿqūb', 'Upon Him I have relied'],
  '12:83': ['Yaʿqūb', 'Perhaps Allah will bring them to me'],
  '12:86': ['Yaʿqūb', 'I complain only to Allah'],
  '12:101': ['Yūsuf', 'Let me die a Muslim'],
  '14:35-38': ['Ibrāhīm', 'For Mecca, and for those he settled by the House'],
  '14:37-38': ['Ibrāhīm', 'For those he settled by the House'],
  '14:40-41': ['Ibrāhīm', 'To be kept in prayer, and for his parents'],
  '17:24': ['The believer', 'For parents'],
  '17:80': ['The Prophet ﷺ', 'A true entry and a true exit'],
  '17:82': ['The Qur’an', 'A healing and a mercy'],
  '18:10': ['The young men of the cave', 'Taking shelter'],
  '18:24': ['The Prophet ﷺ', 'If Allah wills'],
  '19:4-5': ['Zakariyyā', 'My bones have weakened'],
  '19:7-15': ['Yaḥyā', 'His birth and his childhood'],
  '19:56-57': ['Idrīs', 'Raised to a high station'],
  '20:25-28': ['Mūsā', 'Before speaking to Pharaoh'],
  '20:29-32': ['Mūsā', 'For Hārūn'],
  '20:69': ['Mūsā', 'Throw what is in your right hand'],
  '20:114': ['The Prophet ﷺ', 'Increase me in knowledge'],
  '21:83': ['Ayyūb', 'In illness'],
  '21:83-84': ['Ayyūb', 'In illness, and the answer'],
  '21:85': ['Ismāʿīl, Idrīs and Dhul-Kifl', 'Of the patient'],
  '21:85-86': ['Ismāʿīl, Idrīs and Dhul-Kifl', 'Of the patient, admitted to mercy'],
  '21:87': ['Yūnus', 'From inside the darkness'],
  '21:89': ['Zakariyyā', 'Do not leave me alone'],
  '21:112': ['The Prophet ﷺ', 'Judge in truth'],
  '23:28-29': ['Nūḥ', 'A blessed landing'],
  '23:93-94': ['The Prophet ﷺ', 'Not among the wrongdoers'],
  '23:97-98': ['The Prophet ﷺ', 'Refuge from the whispers'],
  '23:118': ['The Prophet ﷺ', 'Forgive and have mercy'],
  '25:65-66': ['The servants of the Most Merciful', 'Turn Hell away from us'],
  '25:74': ['The servants of the Most Merciful', 'For family'],
  '26:78-85': ['Ibrāhīm', 'Who created me and guides me'],
  '26:80': ['Ibrāhīm', 'When I am ill, He cures me'],
  '26:87-89': ['Ibrāhīm', 'A sound heart'],
  '26:142-159': ['Ṣāliḥ', 'To Thamūd, and the she-camel'],
  '26:169': ['Lūṭ', 'Save me and my family'],
  '27:15': ['Dāwūd and Sulaymān', 'Praise to Allah who favoured us'],
  '27:19': ['Sulaymān', 'To be grateful'],
  '27:40': ['Sulaymān', 'This is from the favour of my Lord'],
  '28:16': ['Mūsā', 'I have wronged myself'],
  '28:17': ['Mūsā', 'Never an assistant to the criminals'],
  '28:21': ['Mūsā', 'Save me from the wrongdoers'],
  '28:22': ['Mūsā', 'Perhaps my Lord will guide me'],
  '28:24': ['Mūsā', 'In need of whatever good You send'],
  '29:30': ['Lūṭ', 'Against the corrupters'],
  '37:100': ['Ibrāhīm', 'For a righteous child'],
  '37:112-113': ['Isḥāq', 'Good tidings, and a blessing'],
  '37:123-132': ['Ilyās', 'To his people'],
  '38:41-44': ['Ayyūb', 'Satan has touched me with hardship'],
  '38:48': ['Ismāʿīl, Al-Yasaʿ and Dhul-Kifl', 'Among the outstanding'],
  '40:7-9': ['The angels who carry the Throne', 'For the believers'],
  '43:13-14': ['The traveller', 'Setting out'],
  '46:15': ['The servant at forty', 'Gratitude, parents, and children'],
  '54:10': ['Nūḥ', 'Overpowered, so help'],
  '59:10': ['Those who came after', 'For those before us'],
  '60:4-5': ['Ibrāhīm and those with him', 'Upon You we rely'],
  '65:3': ['Whoever relies on Allah', 'He is sufficient'],
  '66:8': ['The believers on the Day', 'Perfect our light'],
  '66:11': ['The wife of Pharaoh', 'For a house in Paradise'],
  '68:51-52': ['The Prophet ﷺ', 'Their eyes would almost make you slip'],
  '71:10-12': ['Nūḥ', 'Ask forgiveness, and He sends rain'],
  '71:28': ['Nūḥ', 'For his parents and the believers'],
  '112:1-4': ['Al-Ikhlas', 'Say: He is Allah, One'],
  '113:1-5': ['Whoever seeks refuge', 'Al-Falaq'],
  '114:1-6': ['Whoever seeks refuge', 'An-Nas'],
};

/**
 * Where the site starts and stops inside an ayah.
 *
 * quran.com/duas does not print whole ayahs. 2:127 begins at "Our Lord,
 * accept from us"; the narration before it — "And when Abraham was raising
 * the foundations of the House" — is not on the page. Iyad saw the app print
 * the whole verse beside the site's cut and asked why, 10 Sep 2026.
 *
 * The app's rule was that deciding where a dua begins is an editorial act on
 * a Qur'an text. It still is — and here the site made it, and published it,
 * so copying the cut is copying a decision rather than making one. `CUT` is
 * read off the site's rendered pages: the first and last word each page
 * shows of a verse, in the API's word numbering. Nine verses are cut
 * differently on different pages (2:286 is whole on three pages and starts
 * at "Our Lord" on five); the narrowest cut is taken, because the narrower
 * one is the dua itself and the wider one is a page that wanted its framing.
 * 67 of 256 rendered ayahs are cut; the rest are whole.
 *
 * `EN` is the same cut in Saheeh International's words, by hand: the phrase
 * the sliced text starts at and, where the site stops early, the phrase it
 * ends at. Each is asserted to occur exactly once in the ayah's translation,
 * so a phrase that drifts fails the build rather than slicing the wrong
 * place. A cut translation opens or closes with an ellipsis, as the site's
 * does, so a reader knows the ayah goes on.
 *
 * The Arabic is sliced from QuranEnc's own text by word index, after the
 * mushaf's section marker (۞) is dropped from the split — it is not a word,
 * and the count of every cut ayah is asserted equal to the API's before any
 * slice is taken. The marker is dropped from every entry, cut or not: it
 * marks a hizb, which a dua card is not showing.
 */
const CUT = {
  '2:32': [2, 12],
  '2:126': [4, 18],
  '2:127': [8, 14],
  '2:155': [11, 12],
  '2:156': [6, 10],
  '2:201': [4, 14],
  '2:250': [6, 15],
  '2:285': [22, 27],
  '2:286': [13, 49],
  '3:16': [3, 11],
  '3:26': [2, 25],
  '3:38': [6, 15],
  '3:191': [13, 21],
  '5:25': [2, 13],
  '5:83': [17, 21],
  '6:162': [2, 9],
  '7:23': [2, 12],
  '7:43': [12, 23],
  '7:89': [34, 42],
  '7:126': [11, 16],
  '7:151': [2, 11],
  '7:155': [34, 41],
  '7:156': [1, 11],
  '10:85': [2, 10],
  '11:41': [4, 11],
  '11:47': [2, 19],
  '11:88': [28, 35],
  '12:18': [12, 18],
  '12:67': [19, 27],
  '12:83': [7, 18],
  '12:86': [2, 13],
  '12:101': [10, 21],
  '14:35': [4, 13],
  '17:24': [8, 12],
  '17:80': [2, 14],
  '18:10': [7, 16],
  '18:24': [10, 17],
  '19:4': [2, 14],
  '20:25': [2, 5],
  '20:114': [15, 17],
  '21:83': [5, 10],
  '21:87': [15, 23],
  '21:89': [5, 11],
  '21:112': [2, 10],
  '23:28': [9, 15],
  '23:93': [2, 6],
  '23:97': [2, 7],
  '23:118': [2, 7],
  '25:65': [3, 11],
  '25:74': [3, 13],
  '27:15': [7, 15],
  '27:19': [6, 24],
  '27:40': [20, 38],
  '28:16': [2, 7],
  '28:17': [2, 9],
  '28:21': [6, 10],
  '28:22': [6, 11],
  '28:24': [8, 15],
  '29:30': [2, 6],
  '40:7': [14, 27],
  '43:13': [12, 20],
  '46:15': [22, 45],
  '54:10': [3, 5],
  '59:10': [6, 23],
  '60:4': [46, 52],
  '65:3': [6, 21],
  '66:8': [35, 45],
  '66:11': [10, 24],
};
const EN = {
  '2:32': ["Exalted are You"],
  '2:126': ["My Lord, make this a secure city", "and the Last Day"],
  '2:127': ["Our Lord, accept"],
  '2:155': ["but give good tidings"],
  '2:156': ["Indeed we belong to All\u0101h"],
  '2:201': ["Our Lord, give us"],
  '2:250': ["Our Lord, pour upon us"],
  '2:285': ["We hear and we obey"],
  '2:286': ["Our Lord, do not impose blame"],
  '3:16': ["Our Lord, indeed we have believed"],
  '3:26': ["O All\u0101h, Owner of Sovereignty"],
  '3:38': ["My Lord, grant me from Yourself"],
  '3:191': ["Our Lord, You did not create this aimlessly"],
  '5:25': ["My Lord, indeed I do not possess"],
  '5:83': ["Our Lord, we have believed, so register"],
  '6:162': ["Indeed, my prayer"],
  '7:23': ["Our Lord, we have wronged ourselves"],
  '7:43': ["Praise to All\u0101h, who has guided us to this", "if All\u0101h had not guided us"],
  '7:89': ["Our Lord, decide between us"],
  '7:126': ["Our Lord, pour upon us patience"],
  '7:151': ["My Lord, forgive me and my brother"],
  '7:155': ["You are our Protector, so forgive us"],
  '7:156': [null, "we have turned back to You"],
  '10:85': ["Upon All\u0101h do we rely"],
  '11:41': ["in the name of All\u0101h"],
  '11:47': ["My Lord, I seek refuge in You from asking"],
  '11:88': ["And my success is not but through All\u0101h"],
  '12:18': ["so patience is most fitting"],
  '12:67': ["The decision is only for All\u0101h"],
  '12:83': ["so patience is most fitting"],
  '12:86': ["I only complain"],
  '12:101': ["Creator of the heavens and earth"],
  '14:35': ["My Lord, make this city"],
  '17:24': ["My Lord, have mercy upon them"],
  '17:80': ["My Lord, cause me to enter"],
  '18:10': ["Our Lord, grant us from Yourself mercy"],
  '18:24': ["Perhaps my Lord will guide me"],
  '19:4': ["My Lord, indeed my bones"],
  '20:25': ["My Lord, expand"],
  '20:114': ["My Lord, increase me in knowledge"],
  '21:83': ["Indeed, adversity has touched me"],
  '21:87': ["There is no deity except You"],
  '21:89': ["My Lord, do not leave me alone"],
  '21:112': ["My Lord, judge"],
  '23:28': ["Praise to All\u0101h who has saved us"],
  '23:93': ["My Lord, if You should show me"],
  '23:97': ["My Lord, I seek refuge in You from the incitements"],
  '23:118': ["My Lord, forgive and have mercy"],
  '25:65': ["Our Lord, avert from us"],
  '25:74': ["Our Lord, grant us from among our wives"],
  '27:15': ["Praise [is due] to All\u0101h, who has favored us"],
  '27:19': ["My Lord, enable me to be grateful"],
  '27:40': ["This is from the favor of my Lord"],
  '28:16': ["My Lord, indeed I have wronged myself", "so forgive me"],
  '28:17': ["My Lord, for the favor"],
  '28:21': ["My Lord, save me"],
  '28:22': ["Perhaps my Lord will guide me to the sound way"],
  '28:24': ["My Lord, indeed I am"],
  '29:30': ["My Lord, support me"],
  '40:7': ["Our Lord, You have encompassed"],
  '43:13': ["Exalted is He who has subjected"],
  '46:15': ["My Lord, enable me to be grateful"],
  '54:10': ["Indeed, I am overpowered"],
  '59:10': ["Our Lord, forgive us and our brothers"],
  '60:4': ["Our Lord, upon You we have relied"],
  '65:3': ["And whoever relies upon All\u0101h"],
  '66:8': ["Our Lord, perfect for us our light"],
  '66:11': ["My Lord, build for me"],
};

/*
  Revised 10 Sep 2026, Iyad's call: the collection is quran.com/duas, pages
  and all.

  The first pass (9 Sep) copied the site's eight section names and placed
  each verse once under the section that listed it most. It felt nothing
  like the site, and Iyad said so: the site's unit is a PAGE with a purpose
  in its title — "Duas for New Muslims", "Duas for Fear", "Rabbana Duas" —
  and the same verse sits on several pages because three people arrive with
  three questions. Placing each verse once removed exactly that.

  So `SITE` below is the site's structure, verbatim: its sections in its
  order, their descriptions, their 96 pages with their titles, descriptions
  and verse lists in page order. What is copied is the STRUCTURE; every
  text still comes from QuranEnc. Two departures, both his:
  - "Worship & Reflection" is out — five pages of verses about Ramadan,
    Laylat al-Qadr, day and night and dhikr, none of them a supplication.
  - The mother of Maryam, 3:35, is in — on "Duas for Righteous Offspring and
    Pregnancy", the page her words belong to. The site lacks her.

  Each passage is one ENTRY, once, however many pages list it: search finds
  it once, the daily pick sees it once. A page is a list of entry ids.
  Twenty-nine of the pages hold one or two verses; they are as thin here as
  they are there. Overlapping ranges the site lists separately (21:83 and
  21:83–84) stay separate, because the pages that carry them differ.

  `a` may be a single ayah or a [from, to] range of consecutive ayahs. Whole
  ayahs, joined in order, nothing sliced — deciding where a dua starts is an
  editorial act on a Qur'an text, and the framing is what tells a reader
  whose words these are.
*/
const SITE = [
  {
    title: "Essentials",
    description: "Short, common, and easy-to-start duas from the Quran.",
    pages: [
      { id: "acceptance", title: "Duas for Acceptance of Good Deeds", description: "Duas from the Quran for the acceptance of good deeds, steadfast prayer, gratitude, and righteousness.", refs: [[2, 127, 128], [14, 40, 41], [27, 19], [46, 15]] },
      { id: "confidence", title: "Duas for Confidence", description: "Duas from the Quran for courage, clarity, safety, guidance, and help in times of need.", refs: [[20, 25, 28], [28, 21], [28, 22], [28, 24]] },
      { id: "daily-life", title: "Duas from the Quran for Daily Life", description: "A practical list of duas from the Quran for everyday needs, family, hardship, gratitude, and provision.", refs: [[2, 201], [17, 24], [20, 114], [23, 97, 98], [25, 74], [28, 24], [46, 15]] },
      { id: "everyday-duas", title: "Short Duas from the Quran for Daily Recitation and Memorization", description: "Short duas from the Quran for daily recitation, memorization, children, and everyday needs.", refs: [[1, 1, 7], [2, 201], [7, 23], [20, 114], [21, 87], [23, 118], [28, 24], [17, 24], [37, 100]] },
      { id: "arabic-english-transliteration", title: "Quran Duas in Arabic, English, and Transliteration", description: "A selection of short duas from the Quran presented with references for Arabic, translation, and transliteration.", refs: [[2, 201], [20, 114], [21, 87], [23, 118], [28, 24], [37, 100]] },
      { id: "new-muslims", title: "Duas for New Muslims", description: "Short duas from the Quran for new Muslims seeking guidance, forgiveness, knowledge, and steadfast faith.", refs: [[1, 1, 7], [3, 8, 9], [7, 23], [20, 114], [23, 118], [59, 10]] },
      { id: "powerful-duas", title: "Powerful Duas from the Quran", description: "A broad collection of concise and meaningful duas from the Quran by theme.", refs: [[2, 201], [7, 23], [21, 87], [25, 74]] },
      { id: "rabbana", title: "Rabbana Duas from the Quran", description: "A collection of duas beginning with Rabbana (Our Lord!) across the Quran.", refs: [[2, 127, 128], [2, 201], [2, 250], [2, 285], [2, 286], [3, 8, 9], [3, 16], [3, 191, 194], [5, 83, 84], [7, 23], [7, 89], [7, 126], [10, 85, 86], [14, 37, 38], [14, 40, 41], [18, 10], [25, 65, 66], [25, 74], [40, 7, 9], [59, 10], [60, 4, 5], [66, 8]] },
      { id: "topics", title: "Duas from the Quran by Topic", description: "A topic-based index of duas from the Quran for guidance, forgiveness, family, hardship, protection, and need.", refs: [[1, 1, 7], [2, 201], [7, 23], [21, 87], [25, 74], [28, 24], [59, 10]] },
    ],
  },
  {
    title: "Prophetic Duas",
    description: "Duas connected to Prophets and their moments in the Quran.",
    pages: [
      { id: "adam-hawwa", title: "Dua of Prophet Adam and Hawwa", description: "The dua from the Quran of Prophet Adam and Hawwa after their mistake, asking Allah for forgiveness and mercy.", refs: [[7, 23]] },
      { id: "prophet-al-yasa", title: "Prophet Al-Yasa in the Quran", description: "Quran references to Al-Yasa among the righteous.", refs: [[6, 86], [38, 48]] },
      { id: "prophet-ayyub-illness", title: "Prophet Ayyub's Illness and Dua in the Quran", description: "Quran passages recounting Ayyub's appeal during illness and Allah's merciful response.", refs: [[21, 83, 84], [38, 41, 44]] },
      { id: "prophet-dhul-kifl", title: "Prophet Dhul-Kifl in the Quran", description: "Quran references to Dhul-Kifl among the patient and righteous.", refs: [[21, 85, 86], [38, 48]] },
      { id: "prophet-idris", title: "Prophet Idris in the Quran", description: "Quran passages describing Idris as truthful, elevated, patient, and righteous.", refs: [[19, 56, 57], [21, 85]] },
      { id: "prophet-ilyas", title: "Prophet Ilyas in the Quran", description: "Quran passages recounting Ilyas's call to worship Allah alone and honoring him among the righteous.", refs: [[37, 123, 132]] },
      { id: "prophet-ishaq", title: "Prophet Ishaq in the Quran", description: "Quran passages announcing Ishaq as a gift from Allah and describing blessings upon his descendants.", refs: [[11, 71, 73], [37, 112, 113]] },
      { id: "prophet-salih", title: "Prophet Salih in the Quran", description: "Quran passages recounting Salih's call to repentance, his warning, and the response of his people.", refs: [[11, 61], [26, 142, 159]] },
      { id: "prophet-yahya", title: "Prophet Yahya in the Quran", description: "Quran passages connecting Zakariya's prayer for a child with the birth and qualities of Yahya.", refs: [[3, 38], [19, 7, 15]] },
      { id: "prophet-ayyub", title: "Dua of Prophet Ayyub", description: "The dua from the Quran of Ayyub during illness and hardship.", refs: [[21, 83]] },
      { id: "prophet-dawud", title: "Dawud and Sulayman's Gratitude in the Quran", description: "A Quran passage in which Dawud and Sulayman thank Allah for the knowledge and favor He granted them.", refs: [[27, 15]] },
      { id: "prophet-harun", title: "Musa's Dua for Harun", description: "Musa's dua from the Quran asking Allah to strengthen him through his brother Harun.", refs: [[20, 29, 32]] },
      { id: "prophet-hud", title: "Prophet Hud's Declaration of Trust in Allah", description: "Hud's declaration from the Quran of trust in Allah in the face of denial and hostility.", refs: [[11, 56]] },
      { id: "prophet-ibrahim", title: "Duas of Prophet Ibrahim", description: "A collection of Prophet Ibrahim's duas from the Quran for Makkah, offspring, prayer, acceptance, forgiveness, and the Hereafter.", refs: [[2, 126], [2, 127, 128], [14, 35, 38], [14, 40, 41], [26, 78, 85], [26, 87, 89], [37, 100], [60, 4, 5]] },
      { id: "prophet-isa", title: "Duas Connected to Prophet Isa", description: "Duas from the Quran connected to Prophet Isa, his disciples, and his community.", refs: [[3, 52, 53], [5, 114], [5, 118]] },
      { id: "prophet-ismail", title: "Dua of Ibrahim and Ismail at the Ka'bah", description: "The supplications of Ibrahim and Ismail while raising the foundations of the Ka'bah, asking for acceptance and guidance.", refs: [[2, 127, 129]] },
      { id: "prophet-lut", title: "Duas of Prophet Lut", description: "Lut's dua from the Quran asking Allah for help against a corrupt people.", refs: [[26, 169], [29, 30]] },
      { id: "prophet-muhammad", title: "Duas of Prophet Muhammad in the Quran", description: "Duas from the Quran taught to Prophet Muhammad for truth, knowledge, protection, judgment, and mercy.", refs: [[17, 80], [20, 114], [21, 112], [23, 97, 98], [23, 118]] },
      { id: "prophet-musa", title: "Duas of Prophet Musa", description: "A collection of Prophet Musa's duas from the Quran for forgiveness, clarity, safety, guidance, and need.", refs: [[5, 25], [7, 151], [7, 155, 156], [20, 25, 28], [28, 16], [28, 17], [28, 21], [28, 22], [28, 24]] },
      { id: "prophet-nuh", title: "Duas of Prophet Nuh", description: "Duas of Nuh from the Quran for safe passage, rescue, forgiveness, and mercy for believers.", refs: [[11, 41], [23, 28, 29], [54, 10], [11, 47], [71, 28]] },
      { id: "prophet-nuh-forgiveness", title: "Duas of Nuh for Forgiveness", description: "Nuh's duas from the Quran for forgiveness and mercy for himself, his family, and the believers.", refs: [[11, 47], [71, 28]] },
      { id: "prophets", title: "Duas of the Prophets in the Quran", description: "A collection of duas from the Quran associated with prophets, including Adam, Nuh, Ibrahim, Musa, Yunus, Zakariya, Ayyub, and Sulayman.", refs: [[7, 23], [11, 47], [71, 28], [2, 127, 128], [14, 40, 41], [20, 25, 28], [28, 24], [21, 87], [21, 89], [21, 83], [27, 19]] },
      { id: "prophet-shuayb", title: "Duas and Trust of Prophet Shuayb", description: "Shuayb's duas from the Quran and declarations of trust, asking Allah to judge with truth.", refs: [[7, 89], [11, 88]] },
      { id: "prophet-sulayman", title: "Duas and Gratitude of Prophet Sulayman", description: "Quran passages and supplications of Sulayman concerning knowledge, gratitude, and Allah's favor.", refs: [[27, 15], [27, 19], [27, 40]] },
      { id: "prophet-yaqub", title: "Prophet Yaqub's Patience and Duas", description: "Quran passages on Yaqub's patience, grief, hope, and reliance upon Allah.", refs: [[12, 18], [12, 67], [12, 83], [12, 86]] },
      { id: "prophet-yunus", title: "Dua of Prophet Yunus", description: "The dua from the Quran of Prophet Yunus in distress: La ilaha illa Anta subhanaka inni kuntu minaz-zalimin.", refs: [[21, 87]] },
      { id: "prophet-yusuf", title: "Dua of Prophet Yusuf", description: "Yusuf's dua from the Quran to die as a Muslim and be joined with the righteous.", refs: [[12, 101]] },
      { id: "prophet-zakariya", title: "Duas of Prophet Zakariya", description: "Zakariya's duas from the Quran for a righteous child despite his old age.", refs: [[3, 38], [19, 4, 5], [21, 89]] },
    ],
  },
  {
    title: "Family & Community",
    description: "Duas for parents, children, family, believers, and loved ones.",
    pages: [
      { id: "believers", title: "Duas for the Believers", description: "Duas from the Quran for fellow believers, asking for forgiveness, mercy, protection, and hearts free from resentment.", refs: [[3, 16], [5, 83, 84], [14, 40, 41], [40, 7, 9], [59, 10], [66, 8], [71, 28]] },
      { id: "children", title: "Duas for Children in the Quran", description: "A collection of duas from the Quran for children and descendants, including duas of Ibrahim, Zakariya, and the servants of Ar-Rahman.", refs: [[2, 127, 128], [3, 38], [14, 37, 38], [14, 40, 41], [19, 4, 5], [21, 89], [25, 74], [37, 100], [46, 15]] },
      { id: "family", title: "Duas for Family, Marriage, and Spouses", description: "Duas from the Quran for family, marriage, spouses, children, and peaceful homes rooted in righteousness.", refs: [[2, 127, 128], [14, 40, 41], [17, 24], [25, 74], [40, 7, 9], [46, 15], [2, 201]] },
      { id: "friends-loved-ones", title: "Duas for Friends and Loved Ones", description: "Duas from the Quran for the forgiveness, mercy, and wellbeing of friends, loved ones, and fellow believers.", refs: [[3, 16], [14, 40, 41], [40, 7, 9], [59, 10]] },
      { id: "parents", title: "Duas for Parents and Deceased Parents in the Quran", description: "A Quran-based guide to duas for parents and deceased parents, including mercy, forgiveness, gratitude, and righteousness.", refs: [[14, 40, 41], [17, 24], [27, 19], [46, 15], [71, 28]] },
      { id: "peace", title: "Duas for Peace", description: "Duas from the Quran for wellbeing in this life and the Hereafter, righteous family life, and hearts free from resentment.", refs: [[2, 201], [25, 74], [59, 10]] },
      { id: "pious-spouse", title: "Duas for a Pious Spouse", description: "Duas from the Quran for a righteous spouse, steadfast prayer, and a family rooted in piety.", refs: [[14, 40, 41], [25, 74]] },
      { id: "righteous-believers", title: "Duas of the Righteous Believers in the Quran", description: "A collection of duas made by righteous believers beyond the prophets.", refs: [[3, 8, 9], [3, 16], [3, 191, 194], [5, 83, 84], [18, 10], [25, 65, 66], [25, 74], [40, 7, 9], [59, 10], [66, 8]] },
      { id: "righteous-offspring", title: "Duas for Righteous Offspring and Pregnancy", description: "Duas from the Quran for righteous offspring, pregnancy, and future generations, without making medical claims.", refs: [[3, 38], [21, 89], [37, 100], [46, 15], [25, 74], [19, 4, 5]] },
      { id: "ummah", title: "Duas for the Ummah", description: "Duas from the Quran for the worldwide Muslim community, asking for forgiveness, mercy, protection, and unity among believers.", refs: [[3, 16], [5, 83, 84], [10, 85, 86], [40, 7, 9], [59, 10], [66, 8]] },
      { id: "unity", title: "Duas for Unity", description: "Duas from the Quran for mercy, brotherhood, and hearts free from resentment toward fellow believers.", refs: [[40, 7, 9], [59, 10]] },
    ],
  },
  {
    title: "Forgiveness & Mercy",
    description: "Duas for repentance, pardon, and Allah's mercy.",
    pages: [
      { id: "forgiveness", title: "Duas for Forgiveness", description: "A collection of duas from the Quran for seeking Allah's forgiveness, including duas from Adam, believers, and righteous servants.", refs: [[2, 285], [2, 286], [3, 16], [3, 191, 194], [7, 23], [7, 151], [7, 155, 156], [11, 47], [14, 40, 41], [23, 118], [28, 16], [40, 7, 9], [59, 10], [60, 4, 5], [71, 28]] },
      { id: "forgiveness-of-sins", title: "Duas for Forgiveness of Sins", description: "Duas from the Quran for repentance, forgiveness of sins, protection from punishment, and Allah's mercy.", refs: [[2, 286], [3, 16], [3, 191, 194], [7, 23], [23, 118], [59, 10], [66, 8]] },
      { id: "mercy", title: "Duas for Allah's Mercy", description: "A collection of duas from the Quran focused on asking Allah for mercy.", refs: [[7, 23], [7, 151], [7, 155, 156], [18, 10], [21, 83], [23, 118], [40, 7, 9]] },
      { id: "repentance", title: "Duas for Tawbah and Repentance", description: "Duas from the Quran and passages about returning to Allah after sin, seeking forgiveness, and remaining steadfast in repentance.", refs: [[7, 23], [7, 151], [7, 155, 156], [11, 47], [28, 16], [46, 15], [60, 4, 5]] },
    ],
  },
  {
    title: "Guidance & Knowledge",
    description: "Duas for guidance, wisdom, knowledge, and righteous character.",
    pages: [
      { id: "benefit-from-quran", title: "Duas for Learning, Memorizing, and Benefiting from the Quran", description: "Duas from the Quran for learning, memorizing, understanding, and benefiting from Allah's Book.", refs: [[1, 1, 7], [3, 8, 9], [18, 24], [20, 114], [2, 32]] },
      { id: "character", title: "Duas for Beautiful Character", description: "Duas from the Quran for gratitude, righteous deeds, family righteousness, repentance, forgiveness, and hearts free from resentment.", refs: [[25, 74], [27, 19], [46, 15], [59, 10]] },
      { id: "exam-success", title: "Duas for Exam Success", description: "Duas from the Quran for students seeking guidance, knowledge, clarity, and help in times of need.", refs: [[3, 8, 9], [20, 25, 28], [20, 114], [28, 24]] },
      { id: "guidance", title: "Duas for Guidance and the Straight Path", description: "A practical guide to duas from the Quran for guidance, the straight path, and steadfastness after receiving guidance.", refs: [[1, 1, 7], [3, 8, 9], [18, 10], [18, 24], [28, 22]] },
      { id: "heart", title: "Duas for the Heart and a Clean Heart", description: "Duas from the Quran for steadfast guidance, a sound and clean heart, forgiveness, and freedom from resentment.", refs: [[3, 8, 9], [26, 87, 89], [59, 10]] },
      { id: "humility", title: "Duas for Humility", description: "Duas from the Quran expressing repentance, need, and dependence upon Allah.", refs: [[7, 23], [18, 10], [23, 118], [28, 24]] },
      { id: "knowledge", title: "Duas for Knowledge", description: "Duas from the Quran for knowledge and clarity, including Rabbi zidni ilma.", refs: [[2, 32], [20, 25, 28], [20, 114]] },
      { id: "righteousness", title: "Duas for Righteousness and Good Deeds", description: "Duas from the Quran for gratitude, righteous deeds, a sound heart, righteous offspring, and companionship with the righteous.", refs: [[25, 74], [26, 78, 85], [26, 87, 89], [27, 19], [37, 100], [46, 15]] },
      { id: "sincerity", title: "Quran Verses and Duas for Sincerity", description: "Quran verses and supplications about sincere worship, accepted deeds, gratitude, and righteous action.", refs: [[2, 127, 128], [6, 79], [6, 162], [27, 19]] },
      { id: "studying", title: "Duas for Studying", description: "Duas from the Quran for students seeking knowledge, clear speech, remembrance, and reliance upon Allah.", refs: [[18, 24], [20, 25, 28], [20, 114]] },
      { id: "wisdom", title: "Duas for Wisdom", description: "Duas from the Quran and passages concerning knowledge, sound judgment, gratitude, and righteous action.", refs: [[2, 32], [20, 114], [26, 78, 85], [26, 87, 89], [27, 19]] },
    ],
  },
  {
    title: "Protection & Hardship",
    description: "Duas for protection, patience, relief, healing, and difficulty.",
    pages: [
      { id: "anxiety", title: "Duas and Quran Passages for Stress, Depression and Anxiety", description: "Duas from the Quran and passages for emotional hardship, patience, clarity, and seeking refuge from harmful whispers.", refs: [[2, 286], [12, 18], [12, 83], [12, 86], [20, 25, 28], [21, 87], [23, 97, 98]] },
      { id: "black-magic-protection", title: "Quran Verses and Duas for Ruqyah Protection", description: "Duas from the Quran for seeking Allah's protection from sorcery, harmful whispers, and every form of evil.", refs: [[1, 1, 7], [112, 1, 4], [113, 1, 5], [2, 102], [2, 255], [2, 285, 286], [7, 117, 122], [10, 81, 82], [20, 69], [17, 82], [10, 57], [68, 51, 52]] },
      { id: "enemies", title: "Duas Against Enemies and Harmful People", description: "Duas from the Quran for protection, justice, steadfastness, and rescue from harmful people.", refs: [[2, 250], [10, 85, 86], [28, 21], [29, 30]] },
      { id: "evil-eye", title: "Quran Verses for Protection from the Evil Eye", description: "Duas from the Quran for seeking refuge in Allah from envy, harmful forces, and evil, without presenting a separate evil-eye formula.", refs: [[113, 1, 5], [114, 1, 6]] },
      { id: "fear", title: "Duas for Fear", description: "Duas from the Quran and passages for fear, vulnerability, safety, and reliance upon Allah.", refs: [[23, 93, 94], [28, 21], [10, 85, 86], [28, 22]] },
      { id: "hardship", title: "Duas and Quran Passages for Hardship, Sadness, and Grief", description: "Duas and Quran passages for hardship, sadness, grief, patience, relief, and turning to Allah in difficulty.", refs: [[2, 250], [2, 286], [7, 126], [12, 18], [12, 83], [12, 86], [21, 83], [21, 87], [28, 24], [2, 156]] },
      { id: "health", title: "Quran Reflections on Healing and Health", description: "Reflections from the Quran on wellbeing, healing, forgiveness, and dependence upon Allah, without claiming specific cures.", refs: [[26, 78, 85]] },
      { id: "heart-healing", title: "Duas for Diseases of the Heart", description: "Duas from the Quran for steadfast hearts, mercy during illness, forgiveness, and spiritual healing, without medical claims.", refs: [[3, 8, 9], [21, 83], [26, 87, 89], [59, 10]] },
      { id: "oppression", title: "Duas Against Oppression", description: "Duas from the Quran for those facing oppression, asking Allah for rescue, justice, and support.", refs: [[10, 85, 86], [28, 21], [29, 30], [54, 10]] },
      { id: "pain-sickness", title: "Duas and Quran Passages for Pain and Sickness (Shifa)", description: "Duas from the Quran and passages concerning illness, hardship, mercy, and Allah's healing.", refs: [[21, 83], [26, 78, 85], [26, 80]] },
      { id: "palestine", title: "Duas for Palestine and the Oppressed", description: "Duas from the Quran for oppressed believers, asking Allah for steadfastness, rescue, forgiveness, mercy, and unity.", refs: [[2, 250], [10, 85, 86], [40, 7, 9], [59, 10]] },
      { id: "patience", title: "Duas and Quran Passages for Patience", description: "Duas from the Quran and passages on patience, steadfastness, trust in Allah, and dignified endurance during hardship.", refs: [[2, 250], [7, 126], [12, 18], [12, 83]] },
      { id: "protection", title: "Duas for Protection from Evil and Shaytan", description: "A collection of duas from the Quran for protection from evil, Shaytan, harm, danger, and spiritual whispers.", refs: [[10, 85, 86], [23, 93, 94], [23, 97, 98], [28, 21], [29, 30], [66, 11]] },
      { id: "relief", title: "Duas for Relief", description: "Duas from the Quran for ease, mercy, clarity, forgiveness, and help during difficulty.", refs: [[2, 286], [20, 25, 28], [21, 83], [21, 87], [28, 24]] },
      { id: "safety", title: "Duas for Safety", description: "Duas from the Quran for safety, rescue from harm, and reliance upon Allah during danger and uncertainty.", refs: [[2, 126], [10, 85, 86], [28, 21], [66, 11]] },
      { id: "steadfastness", title: "Duas for Steadfastness", description: "Duas from the Quran and passages on steadfast faith, patience, and trust in Allah after receiving guidance.", refs: [[3, 8, 9], [7, 126]] },
      { id: "strength", title: "Duas for Strength", description: "Duas from the Quran for courage, patience, steadfastness, ease, and clarity.", refs: [[2, 250], [7, 126], [20, 25, 28]] },
      { id: "travel", title: "Quran Verses and Duas for Travel and Journey Safety", description: "Quran verses and duas for travel and journey safety, including safe passage, gratitude, remembrance when boarding, and reliance upon Allah.", refs: [[11, 41], [43, 13, 14], [28, 21]] },
      { id: "victory", title: "Duas for Victory", description: "Duas from the Quran for steadfastness, justice, rescue, and Allah's help against wrongdoing.", refs: [[2, 250], [29, 30], [54, 10]] },
      { id: "waswas", title: "Duas for Waswas and Whispers", description: "Duas from the Quran for refuge from harmful whispers and for hearts that remain firm after guidance.", refs: [[3, 8, 9], [23, 97, 98]] },
    ],
  },
  {
    title: "Provision & Gratitude",
    description: "Duas for rizq, provision, gratitude, and Makkah.",
    pages: [
      { id: "gratitude", title: "Duas and Quran Passages for Gratitude", description: "A collection of duas and passages from the Quran for thanking Allah.", refs: [[7, 43], [27, 15], [27, 19], [27, 40], [46, 15]] },
      { id: "hajj-umrah", title: "Duas for Hajj & Umrah", description: "Duas from the Quran associated with Makkah and pilgrimage, asking for security, acceptance, family wellbeing, prayer, and goodness in the Hereafter.", refs: [[2, 126], [2, 127, 128], [2, 201], [14, 37, 38], [14, 40, 41]] },
      { id: "provision-wealth", title: "Quran Verses and Duas for Provision (Rizq) and Wealth", description: "Quran verses and supplications for provision, need, sovereignty, and reliance upon Allah.", refs: [[2, 201], [2, 126], [3, 26, 27], [14, 37, 38], [2, 286], [28, 24], [65, 3]] },
      { id: "rabbi-inni-lima-anzalta", title: "Dua of Musa for Rizq and Need", description: "Musa's dua from the Quran expressing need and complete dependence upon Allah's provision.", refs: [[28, 24]] },
      { id: "rain", title: "Quran Reflections on Rain and Blessings", description: "Quran verses connecting repentance and seeking forgiveness with rain, provision, and renewed strength.", refs: [[11, 52], [71, 10, 12]] },
      { id: "success-barakah", title: "Duas for Success and Barakah", description: "Duas from the Quran for success and barakah through acceptance, gratitude, righteous deeds, provision, and goodness in this life and the Hereafter.", refs: [[2, 127, 128], [2, 201], [27, 19], [28, 24], [46, 15], [3, 191, 194]] },
      { id: "work-career", title: "Duas for Work and Career", description: "Duas from the Quran relevant to work and livelihood, asking for clarity, provision, gratitude, and righteous action.", refs: [[20, 25, 28], [27, 19], [28, 24], [46, 15]] },
    ],
  },
  {
    title: "Hereafter",
    description: "Duas for Jannah, a good ending, and protection from Hellfire.",
    pages: [
      { id: "deceased", title: "Duas for the Dead", description: "Duas from the Quran for forgiveness and mercy that include parents, earlier believers, and the wider community of faith.", refs: [[14, 40, 41], [59, 10], [71, 28]] },
      { id: "good-ending", title: "Duas for a Good Ending", description: "A guide to duas from the Quran for asking Allah to end life upon Islam and join the righteous.", refs: [[3, 191, 194], [7, 126], [12, 101]] },
      { id: "hereafter", title: "Duas for the Hereafter", description: "A collection of duas from the Quran asking for success in the next life.", refs: [[2, 201], [3, 191, 194], [12, 101], [25, 65, 66], [26, 78, 85], [26, 87, 89], [40, 7, 9], [66, 8]] },
      { id: "jannah", title: "Duas for Jannah", description: "Duas from the Quran asking Allah for Paradise, protection from Hellfire, forgiveness, and companionship with the righteous.", refs: [[3, 191, 194], [26, 78, 85], [26, 87, 89], [40, 7, 9], [66, 11]] },
      { id: "protection-from-hellfire", title: "Duas for Protection from Hellfire", description: "Duas from the Quran seeking protection from punishment and Hellfire.", refs: [[2, 201], [3, 16], [3, 191, 194], [25, 65, 66], [40, 7, 9]] },
      { id: "when-someone-dies", title: "Quran Passages and Duas for When Someone Dies", description: "Quran passages and supplications for patience after loss, mercy for parents, and forgiveness for believers who came before us.", refs: [[2, 155, 156], [14, 40, 41], [59, 10]] },
    ],
  },
];

/* 3:35 — see the header. Appended, so the site's own order is untouched. */
SITE.find((s) => s.title === 'Family & Community')
  .pages.find((p) => p.id === 'righteous-offspring')
  .refs.push([3, 35]);

const keyOf = ([s, a, b]) => (b && b !== a ? `${s}:${a}-${b}` : `${s}:${a}`);
const idOf = ([s, a, b]) => (b && b !== a ? `q${s}-${a}-${b}` : `q${s}-${a}`);

/* Every passage, once, in mushaf order. */
const passages = new Map();
for (const section of SITE) {
  for (const page of section.pages) {
    for (const r of page.refs) passages.set(keyOf(r), r);
  }
}
const refs = [...passages.values()].sort((x, y) => x[0] - y[0] || x[1] - y[1] || (x[2] ?? x[1]) - (y[2] ?? y[1]));
for (const r of refs) {
  if (!WHO[keyOf(r)]) throw new Error(`${keyOf(r)} has no attribution in WHO`);
}
for (const key of Object.keys(WHO)) {
  if (!passages.has(key)) throw new Error(`WHO names ${key}, which no page lists`);
}

const pageCount = SITE.reduce((n, s) => n + s.pages.length, 0);
console.log(`The duas of the Qur'an — ${refs.length} passages on ${pageCount} pages in ${SITE.length} sections, from QuranEnc\n`);

const entries = [];
for (const r of refs) {
  const [s, from, to = from] = r;
  const [who, note] = WHO[keyOf(r)];
  const arabicParts = [];
  const englishParts = [];
  let words;
  for (let n = from; n <= to; n += 1) {
    const cached = corpus?.get(`${s}:${n}`);
    const verse = cached
      ? { arabic_text: cached.ar, translation: cached.en }
      : await get(`https://quranenc.com/api/v1/translation/aya/english_saheeh/${s}/${n}`);
    if (!verse?.arabic_text || !verse?.translation) {
      throw new Error(`${keyOf(r)}: ${s}:${n} did not resolve`);
    }
    /* The section marker is a mushaf's furniture, not a word — see CUT. */
    const arabicWords = verse.arabic_text.trim().split(/\s+/).filter((w) => w !== '۞');
    let english = verse.translation.replace(/\[\d+\]/g, '').replace(/\s+/g, ' ').trim();
    const cut = CUT[`${s}:${n}`];
    /* Only the ends of the run can be cut: the first ayah's start, the last ayah's end. */
    const cutStart = cut && n === from ? cut[0] : 1;
    const cutEnd = cut && n === to ? cut[1] : arabicWords.length;
    if (cut) {
      const apiCount = apiWordCount(s, n);
      if (arabicWords.length !== apiCount) {
        throw new Error(`${s}:${n}: QuranEnc splits into ${arabicWords.length} words, the API into ${apiCount} — refusing to slice`);
      }
      const [startPhrase, endPhrase] = EN[`${s}:${n}`];
      if (n === from && startPhrase) {
        const at = english.indexOf(startPhrase);
        if (at < 0 || english.indexOf(startPhrase, at + 1) >= 0) {
          throw new Error(`${s}:${n}: "${startPhrase}" is not found exactly once in the translation`);
        }
        english = `… ${english.slice(at)}`;
      }
      if (n === to && endPhrase) {
        const at = english.indexOf(endPhrase);
        if (at < 0 || english.indexOf(endPhrase, at + 1) >= 0) {
          throw new Error(`${s}:${n}: "${endPhrase}" is not found exactly once in the translation`);
        }
        english = `${english.slice(0, at + endPhrase.length)} …`;
      }
    }
    arabicParts.push(arabicWords.slice(cutStart - 1, cutEnd).join(' '));
    englishParts.push(english);
    if (n === from && cutStart !== 1) words = [cutStart, 0];
    if (n === to && (cutEnd !== arabicWords.length || words)) {
      /* `to` is in the API's numbering, which the word view slices by, so the
         last ayah's count is asserted against it even when it is not cut. */
      if (arabicWords.length !== apiWordCount(s, n)) {
        throw new Error(`${s}:${n}: QuranEnc splits into ${arabicWords.length} words, the API into ${apiWordCount(s, n)} — refusing to span`);
      }
      words = [words?.[0] ?? 1, cutEnd];
    }
  }
  const ref = from === to ? `${s}:${from}` : `${s}:${from}–${to}`;
  entries.push({
    id: idOf(r),
    title: `${who} — ${note}`,
    arabic: arabicParts.join(' '),
    translation: englishParts.join(' '),
    s,
    from,
    to,
    ref,
    words,
  });
  console.log(`  ${ref.padStart(10)}  ${who}`);
}

const entryLines = entries.map((entry) => `  {
    id: ${JSON.stringify(entry.id)},
    title: ${JSON.stringify(entry.title)},
    arabic: ${JSON.stringify(entry.arabic)},
    translation: ${JSON.stringify(entry.translation)},
    note: ${JSON.stringify(`Qur’an ${entry.ref}`)},
    sources: [quran(${entry.s}, ${entry.from === entry.to ? entry.from : `[${entry.from}, ${entry.to}]`}${entry.words ? `, { words: [${entry.words[0]}, ${entry.words[1]}] }` : ''})],
  },`);

const pageLines = SITE.flatMap((section) =>
  section.pages.map((page) => `  {
    id: ${JSON.stringify(page.id)},
    section: ${JSON.stringify(section.title)},
    title: ${JSON.stringify(page.title)},
    description: ${JSON.stringify(page.description)},
    entries: [${page.refs.map((r) => JSON.stringify(idOf(r))).join(', ')}],
  },`),
);

const file = `/**
 * The duas the Qur'an puts in people's mouths, as quran.com/duas arranges them.
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
 * The pages, their sections, titles, descriptions and order are quran.com's.
 * Each passage is one entry, once; a page lists entry ids. The generator's
 * header records the two departures from the site and why.
 *
 * ⚠️ Hisn al-Muslim, already in this app, is hadith-centred. This is the body
 * of supplication it does not carry.
 */
import { quran } from '../sources';
import type { Collection } from '../types';

export const QURANIC_DUAS: Collection = {
  id: 'quranic-duas',
  title: 'Duas from the Qur’an',
  subtitle: 'The words the Qur’an gives to the prophets, and to everyone after them, by need.',
  provider: 'quranenc',
  meta: {
    category: 'quran',
    difficulty: 'building',
    estimatedMinutes: 25,
    beginnerPriority: 3,
    tags: ['arabic'],
    relatedContent: [{ kind: 'reference', id: 'dua-and-dhikr' }],
  },
  entries: [
${entryLines.join('\n')}
  ],
  pages: [
${pageLines.join('\n')}
  ],
};
`;

writeFileSync(join(root, 'src/content/collections/quranic-duas.ts'), file);
console.log(`\nWrote ${entries.length} passages and ${pageCount} pages to src/content/collections/quranic-duas.ts`);
