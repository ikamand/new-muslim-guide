/**
 * The gate every imported text passes before it may enter `src/content/`.
 *
 * Run: `npm run verify:import -- <candidates.json>`
 *      `npm run verify:import -- --self-test`
 *      `npm run verify:import -- --demo`
 *      add `--cross-check` to consult fitrahive on a numbering diagnosis
 *
 * ## The three questions
 *
 * Given Arabic text and a citation, this answers, in order:
 *
 *   1. Does the citation resolve at all?
 *   2. **In which numbering?**
 *   3. Is the text at that reference the text in front of us?
 *
 * Question two is the one nothing else in this repo asks, and it is the one
 * that has actually gone wrong. `content:verify` compares the app's Arabic
 * against its published source and `content:audit` asks whether a claim has a
 * citation; neither can tell a wrong text from a right text read under the
 * wrong numbering, and those are different diagnoses needing different fixes.
 *
 * ## Offline by default
 *
 * The hadith corpus is on disk (`npm run hadith:corpus`), so a hadith citation
 * is checked with the radio off. Only the Qur'an path and `--cross-check`
 * touch the network, and both degrade to an honest "not checked" rather than
 * failing the run.
 *
 * ## What this proves, and what it does not
 *
 * It proves a text is what the collection prints at the number cited. It does
 * NOT prove the narration is the right evidence for the ruling it will sit
 * under. That is substance, it stays with a qualified reviewer, and no script
 * will ever take it over.
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { EDITIONS } from './fetch-hadith-corpus.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ============================ the comparator ============================ */

/**
 * An Arabic text reduced to its consonantal skeleton.
 *
 * Character for character the normalisation `content-verify.mjs` documents at
 * length and `generate-evidence.mjs` reuses. It is copied rather than imported
 * because both of those are top-to-bottom scripts that do their work on import
 * — pulling either in here would run it. If a fifth caller appears, lift it
 * into a module; three is not yet a library.
 *
 * The ordering is load-bearing and is the part that has broken before:
 * the superscript alef (U+0670) is PROMOTED to a real alef before combining
 * marks are stripped, or Uthmani's `رَٰجِعُونَ` loses its long ā and reads
 * `رجعون` against an Imlaei `راجعون`. Alef wasla (U+0671) sits outside the
 * `ء-ي` range that the final rule keeps, so it too is promoted first or the
 * word simply loses its first letter.
 */
const skeleton = (text) =>
  String(text)
    .normalize('NFC')
    .replace(/ﷺ/g, 'صلى الله عليه وسلم')
    // Promote before stripping — the ordering is load-bearing.
    .replace(/ٰ/g, 'ا')
    .replace(/[ٱٲٳٵ]/g, 'ا')
    // Now the marks can go.
    .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
    .replace(/[آأإ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^ء-ي]/g, '');

/**
 * 60 skeleton characters is roughly ten words.
 *
 * Long enough that two texts sharing a run of it are the same narration, short
 * enough to survive one publisher printing the isnad where another prints only
 * the matn. The same constant, for the same reason, as `generate-evidence.mjs`.
 */
const SHARED_RUN = 60;

/**
 * Below this, a text is a term rather than a quotation.
 *
 * `الْحَمْدُ لِلَّهِ` is contained in a great many narrations and is evidence of
 * nothing. Reporting such a text as verified would bury the ones that really
 * are, so it is reported as unchecked instead — which is the honest answer and
 * the one this repo already gives in `content:verify`.
 */
const TOO_SHORT = 20;

/**
 * Whether `candidate` is the text `reference` prints.
 *
 * Two rules, because imports are two shapes. A narration arrives at full
 * length and matches on a shared run. A duʿa arrives as the words somebody
 * actually says, quoted out of a longer narration that surrounds it with an
 * isnad and a story — so it must be CONTAINED, which is strictly stronger than
 * a shared run, not a loosening of it.
 */
function textIsAt(candidate, reference) {
  const ours = skeleton(candidate);
  const theirs = skeleton(reference);
  if (ours.length < TOO_SHORT) return { verdict: 'too-short', ours, theirs };
  if (ours.length < SHARED_RUN) {
    return { verdict: theirs.includes(ours) ? 'match' : 'no', ours, theirs, how: 'contained' };
  }
  const [shorter, longer] = ours.length <= theirs.length ? [ours, theirs] : [theirs, ours];
  for (let at = 0; at + SHARED_RUN <= shorter.length; at += 10) {
    if (longer.includes(shorter.slice(at, at + SHARED_RUN))) {
      return { verdict: 'match', ours, theirs, how: 'shared run' };
    }
  }
  if (theirs.includes(ours)) return { verdict: 'match', ours, theirs, how: 'contained' };
  return { verdict: isComposite(ours, theirs) ? 'composite' : 'no', ours, theirs };
}

/** How much of a candidate must be accounted for before it reads as stitched. */
const COMPOSITE_CHUNK = 30;
const COMPOSITE_COVERAGE = 0.8;

/**
 * Whether a text is the reference's wording, stitched.
 *
 * The case that forced this, and it is the ordinary case rather than an edge
 * one: Muslim 2723 gives the evening duʿa in two runs with the narrator's own
 * aside between them — `قَالَ أُرَاهُ قَالَ فِيهِنَّ`, "I think he said in them".
 * A duʿa feed prints what a person actually says, so it closes that gap, and
 * the result is not a contiguous span of the narration it is quoting.
 *
 * Calling that a wrong text would be the very mistake this script is built to
 * prevent, one diagnosis standing in for another. It is a third answer: the
 * wording IS there, in this order, and a person has to decide whether the
 * stitching is sound. So it is named, and it still does not pass.
 *
 * Order is required, and it is what stops this becoming a bag of words —
 * without it, any text assembled from a collection's common phrases would
 * qualify.
 */
function isComposite(ours, theirs) {
  /*
    Stitching is a phenomenon of long texts, so a short one that is not
    contiguous is simply not there. Below a shared run there are not enough
    words for "the same wording, interrupted" to mean anything, and this is
    where a false positive would live — a handful of common formulas found
    scattered through a narration is not a quotation of it.
  */
  if (ours.length < SHARED_RUN) return false;
  let at = -1;
  let covered = 0;
  for (let start = 0; start < ours.length; start += COMPOSITE_CHUNK) {
    const chunk = ours.slice(start, start + COMPOSITE_CHUNK);
    if (chunk.length < COMPOSITE_CHUNK / 2) break;
    const found = theirs.indexOf(chunk, at + 1);
    if (found === -1) continue;
    at = found;
    covered += chunk.length;
  }
  return covered >= ours.length * COMPOSITE_COVERAGE;
}

/* ============================== the self-test ==============================
 *
 * Nothing below is reported until this passes.
 *
 * A verification run during the API evaluation was void because its character
 * class was `U+0610–U+064B`, which swallows the entire Arabic alphabet: every
 * skeleton came out empty, empty was found inside empty, and the run reported
 * a plausible number of matches. A comparator that silently compares nothing
 * is worse than no comparator, because its output looks like work.
 *
 * These assertions are on known input with known answers. They are not a
 * comparison of the corpus against itself, which would pass whatever the
 * comparator did.
 */

/* Copied from `.cache/hadith/ara-muslim.json`, for testing the test. Fixtures
   in `scripts/` are not app content and `npm run arabic` does not read them. */
const FIXTURES = {
  /* Bukhari 1, the matn only — printed and continuous numbering agree here. */
  bukhari1: 'إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى دُنْيَا يُصِيبُهَا',
  /* The duʿa after wudu. Muslim prints it at 234; it is continuous 553. */
  wuduDua: 'أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَنَّ مُحَمَّدًا عَبْدُ اللَّهِ وَرَسُولُهُ',
  /* Continuous 234 is a narration about rain. Nothing to do with wudu. */
  rain: 'أَصْبَحَ مِنَ النَّاسِ شَاكِرٌ وَمِنْهُمْ كَافِرٌ قَالُوا هَذِهِ رَحْمَةُ اللَّهِ',
  /*
    The evening duʿa as Muslim prints it in the SECOND chain under 2723 — this
    wording is in `2723.02` and not in `2723.01`. A resolver that takes a base
    number to mean its first variant refuses this at a number that is correct.
  */
  eveningVariant: 'رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ',
};

let ASSERTIONS = 0;

function selfTest() {
  const failures = [];
  const check = (name, condition, detail = '') => {
    ASSERTIONS += 1;
    if (!condition) failures.push(`${name}${detail ? ` — ${detail}` : ''}`);
  };

  // 1. The swallowed-alphabet bug, which is what this whole section is for.
  //    A skeleton must keep the letters and drop only the marks — so it is
  //    counted against an INDEPENDENT count of the letters in the input, not
  //    against a number chosen to make the test pass. A character class that
  //    swallows the alphabet fails this by a mile rather than by a margin.
  for (const [name, text] of Object.entries(FIXTURES)) {
    const letters = [...text.normalize('NFC')].filter((c) => {
      const code = c.codePointAt(0);
      // Letters only: the two alef variants outside the main block, and
      // U+0621–U+064A, which stops before the first combining mark.
      return code === 0x0671 || code === 0x0670 || (code >= 0x0621 && code <= 0x064a);
    }).length;
    const bare = skeleton(text);
    check(`${name}: skeleton is not empty`, bare.length > 0, `got ${bare.length}`);
    check(`${name}: skeleton keeps its letters`, bare.length >= letters,
      `${bare.length} of ${letters} letters survived`);
  }

  // 2. The skeleton is letters and nothing else. This pins the range that is
  //    KEPT, where assertion 1 pins what is stripped — a class that let marks
  //    through would compare two texts on their vowelling, which is the whole
  //    thing this is built not to do. `ـ` is the tatweel, `٣` an Arabic-Indic
  //    digit, and `(75)` the sub-number a free-text citation carries in.
  const mixed = skeleton('الْحَمْدُ ـ ٣ (75) lillah ؐ');
  check('skeleton is letters only', /^[\u0621-\u064A]*$/.test(mixed),
    `got ${[...mixed].map((c) => c.codePointAt(0).toString(16)).join(' ')}`);
  check('skeleton drops everything else', mixed === 'الحمد', `got ${mixed}`);

  // 3. Alef wasla is outside `ء-ي` and must be promoted before the final
  //    strip, or every word beginning with one loses its first letter.
  check('alef wasla survives', skeleton('ٱلْحَمْدُ') === 'الحمد', `got ${skeleton('ٱلْحَمْدُ')}`);

  // 4. The superscript alef, promoted. Uthmani's long ā is a combining mark;
  //    strip it naively and `راجعون` becomes `رجعون`.
  check('superscript alef promoted', skeleton('رَٰجِعُونَ') === skeleton('رَاجِعُونَ'),
    `${skeleton('رَٰجِعُونَ')} vs ${skeleton('رَاجِعُونَ')}`);

  // 5. Hamza seats, alef maqsura and ta marbuta all fold together.
  check('hamza seats fold', skeleton('أحمد') === skeleton('احمد'));
  check('alef maqsura folds', skeleton('نَوَى') === skeleton('نوي'));
  check('ta marbuta folds', skeleton('رَحْمَةُ') === skeleton('رحمه'));

  // 6. A text matches itself, and does not match a different narration. If
  //    either of these is wrong the comparator is not comparing.
  check('matches itself', textIsAt(FIXTURES.rain, FIXTURES.rain).verdict === 'match');
  check('rejects a different narration',
    textIsAt(FIXTURES.wuduDua, FIXTURES.rain).verdict === 'no');

  // 7. Empty never matches. This is the shape of the bug above: an empty
  //    skeleton is contained in everything, so it must be refused outright.
  check('empty is refused', textIsAt('', FIXTURES.rain).verdict === 'too-short');
  check('a bare term is refused', textIsAt('الْحَمْدُ لِلَّهِ', FIXTURES.rain).verdict === 'too-short');

  // 8. A short duʿa quoted out of a long narration matches by containment.
  check('short text matches by containment',
    textIsAt(FIXTURES.wuduDua, `فلان وفلان ${FIXTURES.wuduDua} قال ذلك`).how === 'contained');

  // 9. The composite rule, which must find stitched wording and must NOT
  //     accept a text merely assembled from the same phrases. The negative is
  //     the load-bearing half: without the ordering requirement any text built
  //     from a collection's common formulas would read as a quotation.
  const long = FIXTURES.bukhari1;
  const half = Math.floor(long.length / 2);
  const stitched = `${long.slice(0, half)} قَالَ أُرَاهُ قَالَ فِيهِنَّ ${long.slice(half)}`;
  check('composite: stitched wording is found',
    textIsAt(long, stitched).verdict === 'composite',
    `got ${textIsAt(long, stitched).verdict}`);
  check('composite: contiguous wording is a match, not a composite',
    textIsAt(long, `فلان ${long} فلان`).verdict === 'match');
  check('composite: an unrelated narration is still no',
    textIsAt(long, FIXTURES.rain).verdict === 'no');
  check('composite: reversed order is not a composite',
    textIsAt(`${long.slice(half)} ${long.slice(0, half)}`, long).verdict === 'no',
    `got ${textIsAt(`${long.slice(half)} ${long.slice(0, half)}`, long).verdict}`);
  check('composite: a short text is never a composite',
    textIsAt(FIXTURES.wuduDua, `${FIXTURES.wuduDua.slice(0, 30)} فلان ${FIXTURES.wuduDua.slice(30)}`)
      .verdict === 'no');

  // 10. The free-text citation parser, which has been wrong twice and both
  //    times resolved to a real narration nobody had cited — the failure that
  //    looks like success. Every line here is verbatim from a live feed.
  const parses = (line) => JSON.stringify(parseCitation(line));
  const cases = [
    ['a colon form', 'HR. Bukhari: 6327', '{"collection":"bukhari","reference":"6327"}'],
    // The number after the name is Abu Dawud's; `2:26` belongs to an-Nasa'i.
    ['stops at the next collection',
      "Narrated by Abu Dawud (529), at-Tirmidhi (211), an-Nasa'i (2:26), Ibn Majah (722)",
      '{"collection":"abu-dawud","reference":"529"}'],
    // Muslim's within-chapter sub-number, carried through and never resolved.
    ['keeps a sub-number', 'HR. Muslim No. 2723 (75), Abu Dawud No. 5071',
      '{"collection":"muslim","reference":"2723","sub":"75"}'],
    ['a name with no number', 'HR. al-Bukhari', undefined],
    // Every figure in this line belongs to another work.
    ['refuses another work’s number',
      'HR. Abu Daud, As-Sunan Al-Kubra Lil Baihaqi, Vol. 4, p. 239, al-Hakim in Mustadrak No. 1484',
      undefined],
    ['reads the Indonesian spelling', 'HR. Abu Daud No. 5071',
      '{"collection":"abu-dawud","reference":"5071"}'],
  ];
  for (const [name, line, expected] of cases) {
    check(`citation parser: ${name}`, parses(line) === expected, `got ${parses(line)}`);
  }

  return failures;
}

/* ========================== resolving a citation ========================== */

/**
 * The collections a text may be cited to, as a rule rather than as a filter.
 *
 * This is an allowlist and that is the whole point. The evaluation found a duʿa
 * in one API sourced to a Naqshbandi shaykh, and the instinct is to write a
 * list of the chains and shaykhs to reject — which cannot work, because the
 * second one is by definition the one not on the list. So nothing passes
 * unless it resolves to the Qur'an or to a collection named here. A devotional
 * chain fails not because it was recognised but because it was never allowed.
 */
const COLLECTIONS = Object.keys(EDITIONS);

/**
 * Names that get a more useful message than "not an allowed collection".
 *
 * Purely cosmetic, and deliberately so: these do not decide anything. The
 * allowlist above has already refused the text by the time this is consulted;
 * this only says something more helpful than silence about why a human should
 * not go looking for a way round it.
 */
const DEVOTIONAL = /naqshband|chishti|qadiri|mevlevi|tariqa|tariqah|wird|awrad|hizb|dala.?il|khatm|shaykh|sheikh/i;

const corpus = new Map();

function collectionIndex(collection) {
  if (corpus.has(collection)) return corpus.get(collection);
  const edition = EDITIONS[collection];
  const file = edition && join(root, `.cache/hadith/ara-${edition}.json`);
  if (!file || !existsSync(file)) {
    corpus.set(collection, undefined);
    return undefined;
  }
  /*
    Two namespaces, never merged.

    `arabicnumber` is what the collection PRINTS — what a citation means.
    `hadithnumber` is a continuous index over the whole book. For five of the
    six they are identical in every record; for Muslim they never agree, so
    `printed["234"]` and `continuous["234"]` are different narrations and a
    single map would silently keep whichever was written last.
  */
  const parsed = JSON.parse(readFileSync(file, 'utf8'));
  const printed = new Map();
  const continuous = new Map();
  /*
    Every variant under a printed number, not just the first.

    Muslim groups the chains of one hadith as `2723.01`, `.02`, `.03`, and a
    citation of "Muslim 2723" means the hadith rather than the chain — the
    wording a duʿa book quotes is routinely in the second or third. Resolving
    the base to `.01` alone reports the other two as a wrong text at a right
    number, which is the same shape of silent error as reading the wrong
    numbering: a real narration, correctly cited, refused.
  */
  const variants = new Map();
  for (const h of parsed.hadiths) {
    continuous.set(String(h.hadithnumber), h);
    if (h.arabicnumber === undefined) continue;
    const label = String(h.arabicnumber);
    printed.set(label, h);
    const base = label.split('.')[0];
    if (!printed.has(base)) printed.set(base, h);
    if (!variants.has(base)) variants.set(base, []);
    variants.get(base).push(h);
  }
  const index = { printed, continuous, variants, all: parsed.hadiths, skeletons: undefined };
  corpus.set(collection, index);
  return index;
}

/**
 * Where a text actually lives, when it is not where the citation said.
 *
 * A mismatch with no lead is a report nobody can act on: "not here" leaves a
 * reviewer to search thirty thousand narrations by hand. Almost every mismatch
 * seen on a real feed has been a citation off by a few numbers, and naming the
 * number it is off BY is the difference between a finding and a chore.
 *
 * Built lazily and once per collection — skeletonising Bukhari is 7,563
 * strings, which is cheap once and wasteful per candidate.
 */
function whereIsIt(index, candidate) {
  const ours = skeleton(candidate);
  if (ours.length < TOO_SHORT) return [];
  if (!index.skeletons) {
    index.skeletons = index.all.map((h) => ({ h, s: skeleton(h.text) }));
  }
  return index.skeletons
    .filter(({ s }) => s.includes(ours) || isComposite(ours, s))
    .map(({ h }) => h.arabicnumber ?? h.hadithnumber)
    .slice(0, 6);
}

/**
 * A free-text citation, as an API hands one over, reduced to what can be
 * checked — and honest about the part that cannot.
 *
 * `HR. Muslim No. 2723 (75)` is the case the plan named. The base number is
 * checkable; the parenthesised one is Abd al-Baqi's within-chapter index and
 * is NOT the corpus's `.01`/`.02` variant suffix — printed 2723 has exactly
 * three variants, so mapping `(75)` onto `.75` would resolve to nothing while
 * looking like precision. It is carried through as a note and never resolved.
 */
const ALIASES = [
  [/bukhar|bukar/i, 'bukhari'],
  [/muslim/i, 'muslim'],
  [/abu\s*da(?:w|u)+d/i, 'abu-dawud'],
  [/tirmid[hz]i/i, 'tirmidhi'],
  [/nasa.?i/i, 'nasai'],
  [/ibn\s*ma[jd]ah/i, 'ibn-majah'],
  [/muwatta|malik/i, 'malik'],
  [/musnad\s*ahmad/i, 'ahmad'],
];

function parseCitation(text) {
  const found = ALIASES.find(([pattern]) => pattern.test(text));
  if (!found) return undefined;
  const collection = found[1];

  /*
    The number belonging to THIS collection, and no other.

    A free-text line routinely lists several — `Abu Dawud (529), at-Tirmidhi
    (211), an-Nasa'i (2:26), Ibn Majah (722)` — so the window has to close at
    the next collection's name. The first draft of this took the first number
    after the name it matched and read an-Nasa'i's `2:26` as Abu Dawud 26,
    which resolved to a real narration that was not the one cited. A parser
    that silently reads the wrong collection's number is the exact failure
    this whole script exists to catch, so it is worth the extra care here.
  */
  const start = text.search(found[0]);
  const after = text.slice(start + text.slice(start).match(found[0])[0].length);
  const nextName = ALIASES
    .map(([pattern]) => after.search(pattern))
    .filter((at) => at >= 0)
    .sort((a, b) => a - b)[0];
  const window = nextName === undefined ? after : after.slice(0, nextName);

  /*
    `No. 2723`, `: 6327`, `(529)` or a bare number — but it must be NEXT to the
    name, not merely after it.

    `Abu Daud, As-Sunan Al-Kubra Lil Baihaqi, Vol. 4, p. 239, al-Hakim in
    Mustadrak No. 1484` names no Abu Dawud number at all: every figure in it
    belongs to another work. Without a distance rule the `4` of `Vol. 4` reads
    as a citation and resolves to a real narration nobody cited. Twenty
    characters clears every genuine form seen — `: 6327` is two, `No. 2723` is
    five — and excludes a number that has another work's name in front of it.
  */
  const NEAR = 20;
  const near = window.slice(0, NEAR);
  const number = near.match(/(?:no\.?\s*|:\s*|\(\s*|\s)(\d+)(?!\s*[:/])/i)?.[1];
  const sub = window.match(/\b\d+\s*\((\d+)\)/)?.[1];
  return number ? { collection, reference: number, ...(sub ? { sub } : {}) } : undefined;
}

/**
 * The narration a citation points at, and which numbering got there.
 *
 * Printed is tried first because that is what a citation means. Continuous is
 * tried second, and only so that a text found there can be REPORTED as a
 * numbering error rather than as a wrong text — the two need different fixes
 * and look identical from the outside.
 */
function resolveHadith(collection, reference, candidate) {
  const index = collectionIndex(collection);
  if (!index) return { verdict: 'no-corpus' };

  const label = String(reference).trim();
  const inPrinted = index.printed.get(label);
  const inContinuous = index.continuous.get(label);

  if (inPrinted) {
    /* Every chain printed under this number, in order, best answer first. */
    const candidates = label.includes('.')
      ? [inPrinted]
      : (index.variants.get(label) ?? [inPrinted]);
    const tried = candidates.map((record) => ({ record, ...textIsAt(candidate, record.text) }));
    const best =
      tried.find((t) => t.verdict === 'match') ??
      tried.find((t) => t.verdict === 'composite') ??
      tried.find((t) => t.verdict === 'too-short') ??
      tried[0];

    if (best.verdict === 'match') {
      return { verdict: 'ok', numbering: 'printed', record: best.record, how: best.how };
    }
    if (best.verdict === 'too-short') {
      return { verdict: 'too-short', numbering: 'printed', record: best.record };
    }
    if (best.verdict === 'composite') {
      return { verdict: 'composite', numbering: 'printed', record: best.record };
    }
    /* Not at the printed number. If it is at the continuous one, the citation
       is right about the text and wrong about which numbering it is in. */
    if (inContinuous && textIsAt(candidate, inContinuous.text).verdict === 'match') {
      return { verdict: 'numbering', found: 'continuous', record: inContinuous, expected: inPrinted };
    }
    return {
      verdict: 'mismatch',
      numbering: 'printed',
      record: best.record,
      elsewhere: whereIsIt(index, candidate),
    };
  }

  if (inContinuous) {
    const compared = textIsAt(candidate, inContinuous.text);
    if (compared.verdict === 'match') {
      return { verdict: 'numbering', found: 'continuous', record: inContinuous, expected: undefined };
    }
    return {
      verdict: 'mismatch',
      numbering: 'continuous',
      record: inContinuous,
      elsewhere: whereIsIt(index, candidate),
    };
  }

  return { verdict: 'unresolved', elsewhere: whereIsIt(index, candidate) };
}

/* ------------------------------ the Qur'an ------------------------------ */

const quranCache = new Map();

async function quranAyah(surah, ayah) {
  const key = `${surah}:${ayah}`;
  if (!quranCache.has(key)) {
    const url = `https://quranenc.com/api/v1/translation/aya/english_saheeh/${surah}/${ayah}`;
    const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/verify-import' } });
    if (!response.ok) throw new Error(`${response.status} ${key}`);
    const data = await response.json();
    quranCache.set(key, data.result?.arabic_text ?? '');
  }
  return quranCache.get(key);
}

async function resolveQuran(source, candidate) {
  const [first, last] = Array.isArray(source.ayah) ? source.ayah : [source.ayah, source.ayah];
  let upstream = '';
  try {
    for (let n = first; n <= last; n += 1) upstream += ` ${await quranAyah(source.surah, n)}`;
  } catch (error) {
    return { verdict: 'not-checked', why: `QuranEnc unreachable — ${error.message}` };
  }
  const compared = textIsAt(candidate, upstream);
  if (compared.verdict === 'match') return { verdict: 'ok', numbering: 'quran', how: compared.how };
  if (compared.verdict === 'too-short') return { verdict: 'too-short', numbering: 'quran' };
  return { verdict: 'mismatch', numbering: 'quran', upstream: upstream.trim() };
}

/* --------------------------- the cross-check ---------------------------- */

/**
 * fitrahive/dua-dhikr (MIT), consulted only on a numbering diagnosis.
 *
 * A reference, never a content feed: nothing it returns is ever copied into
 * this app. It earns its place for one narrow reason — it is the only free
 * dataset checked that prints Muslim's within-chapter sub-numbering, as in
 * `HR. Muslim No. 2723 (75)`, which is what tells two readings of a number
 * apart.
 *
 * ⚠️ It is thin. 97 records across its five files, of which 71 carry a number
 * at all and exactly 5 carry a sub-number — two distinct citations, each
 * duplicated across files. It will usually have nothing to say, and saying so
 * here is cheaper than a later reader assuming it is a corpus.
 */
const FITRAHIVE = [
  'daily-dua', 'dhikr-after-salah', 'evening-dhikr', 'morning-dhikr', 'selected-dua',
];

let fitrahive;

async function crossCheck(candidate) {
  if (!fitrahive) {
    fitrahive = [];
    for (const file of FITRAHIVE) {
      const url = `https://raw.githubusercontent.com/fitrahive/dua-dhikr/main/data/dua-dhikr/${file}/en.json`;
      try {
        const response = await fetch(url, { headers: { 'user-agent': 'new-muslim-guide/verify-import' } });
        if (response.ok) fitrahive.push(...(await response.json()));
      } catch {
        /* Offline is not a failure here — this only ever adds a hint. */
      }
    }
  }
  const ours = skeleton(candidate);
  if (ours.length < TOO_SHORT) return undefined;
  return fitrahive.find((row) => {
    const theirs = skeleton(row.arabic ?? '');
    return theirs.includes(ours) || ours.includes(theirs);
  });
}

/* =============================== the run =============================== */

/**
 * One candidate: Arabic, and a citation in any of the three shapes an import
 * actually arrives in — a structured `Source`, a `collection`/`reference`
 * pair, or the free-text line an API prints.
 */
async function verify(record, options) {
  const arabic = record.arabic ?? record.text ?? '';
  const label = record.id ?? record.title ?? arabic.slice(0, 30);
  if (!arabic.trim()) return { label, verdict: 'excluded', why: 'no Arabic text' };

  let source = record.source;
  if (typeof source === 'string') {
    const parsed = parseCitation(source);
    if (!parsed) {
      const why = DEVOTIONAL.test(source)
        ? `not a Qur'an or hadith citation — reads as a devotional chain: "${source}"`
        : `no Qur'an or hadith citation could be read from "${source}"`;
      return { label, verdict: 'excluded', why };
    }
    source = { kind: 'hadith', ...parsed };
  }
  if (!source && record.collection && record.reference) {
    source = { kind: 'hadith', collection: record.collection, reference: record.reference };
  }
  if (!source) return { label, verdict: 'excluded', why: 'no citation' };

  if (source.kind === 'quran') {
    return { label, source, ...(await resolveQuran(source, arabic)) };
  }
  if (source.kind !== 'hadith') {
    return { label, verdict: 'excluded', why: `a ${source.kind} source is not a text this gate can check` };
  }
  if (!COLLECTIONS.includes(source.collection)) {
    return { label, verdict: 'excluded', why: `"${source.collection}" is not an allowed collection` };
  }
  if (!source.reference) {
    return { label, verdict: 'excluded', why: 'a hadith citation with no number cannot be resolved here' };
  }

  const result = { label, source, ...resolveHadith(source.collection, source.reference, arabic) };
  if (result.verdict === 'numbering' && options.crossCheck) {
    result.crossCheck = await crossCheck(arabic);
  }
  return result;
}

const PASSES = new Set(['ok']);

function report(results) {
  for (const r of results) {
    const cite = r.source?.collection
      ? `${r.source.collection} ${r.source.reference}`
      : r.source?.kind === 'quran'
        ? `Qur'an ${r.source.surah}:${Array.isArray(r.source.ayah) ? r.source.ayah.join('-') : r.source.ayah}`
        : '—';

    if (r.verdict === 'ok') {
      const where = r.record ? ` (printed ${r.record.arabicnumber}, continuous ${r.record.hadithnumber})` : '';
      console.log(`  ok          ${r.label}`);
      console.log(`              ${cite} — resolves in the ${r.numbering} numbering${where}, text matches by ${r.how}`);
      continue;
    }

    if (r.verdict === 'numbering') {
      console.log(`  NUMBERING   ${r.label}`);
      console.log(`              ${cite} was read as a continuous index, not the number the collection prints.`);
      console.log(`              This text is continuous ${r.record.hadithnumber}, which ${r.source.collection} prints as ${r.record.arabicnumber}.`);
      if (r.expected) {
        console.log(`              Printed ${r.expected.arabicnumber} is a different narration (continuous ${r.expected.hadithnumber}).`);
      }
      if (r.crossCheck) {
        console.log(`              fitrahive prints this as: ${r.crossCheck.source}`);
      }
      console.log(`              Fix the citation, not the text.`);
      continue;
    }

    const lines = {
      composite: `${cite} carries this wording, but not as one run — the collection breaks it with the narrator’s own words. Someone has to clear the stitching before this is a quotation.`,
      mismatch: `${cite} resolves, but the text there is not this text. Neither numbering matched.`,
      unresolved: `${cite} resolves to nothing, in either numbering.`,
      'no-corpus': `no local corpus for ${r.source?.collection} — run \`npm run hadith:corpus\`.`,
      'too-short': `too short to verify — ${TOO_SHORT} skeleton characters is the floor. A term is not a quotation.`,
      'not-checked': r.why,
      excluded: r.why,
    };
    console.log(`  ${r.verdict.toUpperCase().padEnd(11)} ${r.label}`);
    console.log(`              ${lines[r.verdict] ?? r.verdict}`);
    if (r.verdict === 'mismatch' && r.upstream) console.log(`              source prints: ${r.upstream}`);
    if (r.elsewhere?.length) {
      console.log(`              This text IS in ${r.source.collection}, printed at ${r.elsewhere.join(', ')}. The citation is wrong, not the text.`);
    } else if (r.elsewhere) {
      console.log(`              This text is nowhere in ${r.source.collection}. The collection may be wrong too.`);
    }
  }
}

/* ------------------------------- fixtures ------------------------------- */

/**
 * The two cases this gate exists to tell apart, run by `--demo`.
 *
 * Both are Muslim 234. One is the duʿa the collection prints at that number
 * and passes; the other is the narration sitting at continuous index 234 — a
 * hadith about rain — and fails as a numbering error rather than as a wrong
 * text. A gate that flagged both, or neither, would be no use.
 */
const DEMO = [
  { id: 'bukhari 1, its own matn', arabic: FIXTURES.bukhari1, source: { kind: 'hadith', collection: 'bukhari', reference: '1' } },
  { id: 'the duʿa after wudu, cited as Muslim prints it', arabic: FIXTURES.wuduDua, source: { kind: 'hadith', collection: 'muslim', reference: '234' } },
  { id: 'a narration read at continuous 234', arabic: FIXTURES.rain, source: { kind: 'hadith', collection: 'muslim', reference: '234' } },
  { id: 'a duʿa sourced to a shaykh', arabic: FIXTURES.wuduDua, source: 'From the awrad of a Naqshbandi shaykh' },
  { id: 'wording that is in the second chain under one number', arabic: FIXTURES.eveningVariant, source: { kind: 'hadith', collection: 'muslim', reference: '2723' } },
];

/* --------------------------------- main --------------------------------- */

const args = process.argv.slice(2);
const options = { crossCheck: args.includes('--cross-check') };
const file = args.find((a) => !a.startsWith('--'));

console.log('Import gate — does the citation resolve, in which numbering, and is this the text?\n');

const failures = selfTest();
if (failures.length) {
  console.error('The comparator failed its own self-test. Nothing has been checked.\n');
  for (const failure of failures) console.error(`  ✗ ${failure}`);
  console.error('\nA comparator that silently compares nothing reports plausible numbers.');
  process.exit(2);
}
console.log(`Self-test — the comparator agrees with known input on ${ASSERTIONS} assertions.\n`);

if (args.includes('--self-test')) process.exit(0);

const records = args.includes('--demo')
  ? DEMO
  : file
    ? (() => {
        const parsed = JSON.parse(readFileSync(file, 'utf8'));
        return Array.isArray(parsed) ? parsed : (parsed.records ?? []);
      })()
    : undefined;

if (!records) {
  console.error('Nothing to check. Pass a candidates file, or --demo, or --self-test.');
  process.exit(2);
}

const results = [];
for (const record of records) results.push(await verify(record, options));

report(results);

const passed = results.filter((r) => PASSES.has(r.verdict)).length;
console.log(`\n${passed} of ${results.length} may enter src/content/.`);

if (passed !== results.length) {
  console.error('\nNot every candidate passed. Nothing here reaches content until it does.');
  process.exitCode = 1;
}
