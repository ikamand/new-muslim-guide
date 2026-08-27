/**
 * Nothing the app tells someone to SAY may be a narration about saying it.
 *
 * `npm run narration:check`. No network.
 *
 * ## The failure this exists for
 *
 * The Duʿa card shipped showing, as the duʿa before eating:
 *
 *   إِذَا أَكَلَ أَحَدُكُمْ طَعَاماً فَلْيَقُلْ بِسْمِ اللَّهِ
 *   "When one of you eats food, let him say: In the name of Allah"
 *
 * which is the hadith instructing you to say it, not the words. It was found
 * by looking at a screen, and a comment warning about it had been sitting in
 * the source for a week. A sentence in a file does not stop anything.
 *
 * ## Why `kind` cannot do this job
 *
 * Hisn al-Muslim wraps quoted speech in ((…)), and it uses the same marks for
 * a duʿa and for a narration quoting one. Both come out `quoted`. The
 * distinction is in the GRAMMAR — an isnad opener, a conditional frame, a
 * third-person `فَلْيَقُلْ`, a reward clause — so that is what this reads.
 *
 * ## What it does and does not claim
 *
 * A hit is not proof a line is a narration; it is proof a human has not said
 * otherwise. Any line the app puts under a counter or on the card must either
 * carry no narration marker, or carry an entry in `annotations.ts` saying what
 * it is. The check is deliberately noisy in that direction: a false positive
 * costs one annotation, a false negative puts a hadith in someone's mouth.
 */
import { HISN } from '../src/content/duas/hisn.ts';
import { HISN_ANNOTATIONS } from '../src/content/duas/annotations.ts';
import { ADHKAR_SESSIONS } from '../src/content/duas/sessions.ts';
import { pickForNow, resolvePick } from '../src/content/duas/card.ts';

/**
 * Grammar that frames words rather than being them.
 *
 * `قَالَ رَسُولُ اللَّهِ` — an isnad opener.
 * `مَنْ قَالَ` / `فَلْيَقُلْ` — third person: whoever says, let him say.
 * `إِذَا أَكَلَ` / `إِذَا دُعِيَ` — a conditional frame around an instruction.
 * `يَقْرَأُ` / `يَجْمَعُ` / `يَمْسَحُ` — describing an act, not performing one.
 */
const NARRATION = [
  /قَالَ\s+رَسُولُ\s+اللَّهِ/,
  /قَالَ\s+النَّبِيّ/,
  /أَنَّ\s+رَسُولَ\s+اللَّهِ/,
  /كَانَ\s+رَسُولُ\s+اللَّهِ/,
  /عَنْ\s+أَبِي/,
  /مَنْ\s+قَالَ/,
  /فَلْيَقُلْ/,
  /فَلْيَدْعُ/,
  /أَلاَ\s+أَدُلُّ/,
  /^إِذَا\s+\S+\s+أَحَدُكُمْ/,
  /^إِذَا\s+دُعِيَ/,
  /^(?:يَقْرَأُ|يَجْمَعُ|يَمْسَحُ|ثُمَّ\s+يَمْسَحُ|يَنْفُثُ)/,
];

const byId = new Map();
for (const occasion of HISN) {
  for (const line of occasion.lines) byId.set(line.id, { occasion, line });
}

const markersIn = (text) => NARRATION.filter((pattern) => pattern.test(text ?? ''));

let failures = 0;
const report = (where, entry, hits) => {
  failures += 1;
  console.error(`\n✗ ${where}`);
  console.error(`    ${entry.line.arabic.slice(0, 90)}`);
  console.error(`    reads as a narration: ${hits.map((h) => h.source).join('  ')}`);
  console.error(`    Either it is not words to say — annotate line ${entry.line.id} in`);
  console.error('    annotations.ts with recited:false — or the pattern is wrong.');
};

/*
  1. Every line the session reader will put a COUNTER on. The counter is the
     assertion: showing a line in the book is the book being a book, telling
     someone to say it three times is the app speaking.
*/
let counted = 0;
for (const session of ADHKAR_SESSIONS) {
  const occasion = HISN.find((entry) => entry.id === session.occasion);
  if (!occasion) continue;
  for (const line of occasion.lines) {
    if (!line.repeat) continue;
    if (HISN_ANNOTATIONS[line.id]?.recited === false) continue;
    counted += 1;
    const hits = markersIn(line.arabic);
    if (hits.length > 0) report(`${session.id}, counted line ${line.id}`, { line }, hits);
  }
}

/*
  2. Every line the card can reach, across a solar year and twelve Islamic
     months — the seasonal branches only fire for a few weeks each.
*/
let cardLines = 0;
const seen = new Set();
const base = new Date('2026-01-01T00:00:00');
for (let day = 0; day < 366; day += 1) {
  for (let hour = 0; hour < 24; hour += 3) {
    for (let month = 1; month <= 12; month += 1) {
      const now = new Date(base.getTime() + day * 86_400_000 + hour * 3_600_000);
      const pick = pickForNow({
        now,
        hijri: { month, day: 15 },
        maghrib: new Date(now.getTime() + (day % 2 ? 60 : 360) * 60_000),
      });
      const key = `${pick.occasion}/${pick.line}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const resolved = resolvePick(pick);
      if (!resolved) continue;
      cardLines += 1;
      if (HISN_ANNOTATIONS[resolved.line.id]?.recited === false) {
        failures += 1;
        console.error(`\n✗ the card can show line ${resolved.line.id}, which is ` +
          `annotated recited:false — ${HISN_ANNOTATIONS[resolved.line.id].reason}`);
        continue;
      }
      const hits = markersIn(resolved.line.arabic);
      if (hits.length > 0) report(`card pick ${key} (${pick.reason})`, resolved, hits);
    }
  }
}

console.log(`${counted} counted lines and ${cardLines} distinct card lines checked.`);
if (failures > 0) {
  console.error(`\n${failures} line(s) the app asks someone to say read as narrations.`);
  process.exit(1);
}
console.log('✓ nothing the app tells you to say is a report about saying it.');
