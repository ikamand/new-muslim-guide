/**
 * Every annotation must point at a line the book still has.
 *
 * `annotations.ts` is keyed by IslamHouse's row ids and `hisn.ts` is
 * regenerated from IslamHouse on demand, so the two can drift: a re-fetch that
 * drops or renumbers a row leaves an annotation pointing at nothing. Silently,
 * because a missing key in a lookup is just `undefined`.
 *
 * That is exactly the failure `moments.ts` has always been exposed to and
 * never had a check for, so this covers both files.
 *
 * Run with `npm run hisn:check`. No network.
 */
import { HISN } from '../src/content/duas/hisn.ts';
import { HISN_ANNOTATIONS } from '../src/content/duas/annotations.ts';
import { OCCASIONS_BY_MOMENT } from '../src/content/duas/moments.ts';
import { ADHKAR_SESSIONS, arabicNameFor, sharedHeadingSplits } from '../src/content/duas/sessions.ts';
import { pickForNow, resolvePick } from '../src/content/duas/card.ts';

const lineIds = new Set(HISN.flatMap((occasion) => occasion.lines.map((line) => line.id)));
const occasionIds = new Set(HISN.map((occasion) => occasion.id));

const dangling = Object.keys(HISN_ANNOTATIONS)
  .map(Number)
  .filter((id) => !lineIds.has(id));

const annotated = Object.keys(HISN_ANNOTATIONS).length;
console.log(`${HISN.length} occasions, ${lineIds.size} lines`);
console.log(`${annotated} annotated${annotated === 0 ? ' — nothing has been reviewed yet' : ''}`);

let failed = false;

if (dangling.length > 0) {
  console.error(`\n✗ ${dangling.length} annotation(s) point at a line the book no longer has:`);
  dangling.forEach((id) => console.error(`    ${id}`));
  failed = true;
}

/*
  `moments.ts` maps day-moments onto occasion ids and carries the same drift.
  It is worse there, because `hisnAt` filters a missing id out silently — a
  placement can rot into nothing and the screen simply shows one fewer row.
  That is why `OCCASIONS_BY_MOMENT` is exported: so this can see it.
*/
const placements = Object.entries(OCCASIONS_BY_MOMENT).flatMap(([moment, ids]) =>
  ids.map((id) => [moment, id]),
);
const lost = placements.filter(([, id]) => !occasionIds.has(id));
console.log(`${placements.length} day-moment placements`);

if (lost.length > 0) {
  console.error(`\n✗ ${lost.length} placement(s) point at an occasion the book no longer has:`);
  lost.forEach(([moment, id]) => console.error(`    ${moment}: ${id}`));
  failed = true;
}

/*
  Morning and evening are named by SPLITTING the book's one shared heading —
  `أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ` — so a re-fetch that rewords it silently
  turns both sittings back into the same name. `arabicNameFor` falls back
  rather than guessing, which is right for a reader on a mat and useless as a
  way of finding out, so the finding out happens here.
*/
const names = ADHKAR_SESSIONS.map((session) => [session.id, arabicNameFor(session)]);
console.log(names.map(([id, name]) => `${id}: ${name ?? '—'}`).join('  ·  '));

if (!sharedHeadingSplits()) {
  console.error('\n✗ the shared morning/evening heading no longer has the shape the split assumes;');
  console.error('    both sittings are falling back to it unchanged. Re-read it and fix arabicNameFor.');
  failed = true;
}

const missing = names.filter(([, name]) => !name);
if (missing.length > 0) {
  console.error(`\n✗ ${missing.length} session(s) have no Arabic name — the occasion is gone:`);
  missing.forEach(([id]) => console.error(`    ${id}`));
  failed = true;
}

const distinct = new Set(names.map(([, name]) => name));
if (distinct.size !== names.length) {
  console.error('\n✗ two sittings share an Arabic name; the duʿa tab would show it twice.');
  failed = true;
}

/*
  The card's picks are hand-written occasion and line ids, the same class of
  hand-written reference as the annotations and the moment placements, and they
  rot the same way. Walked over a whole solar year and all twelve Islamic
  months rather than spot-checked, because the seasonal branches only fire for
  a few weeks and nobody will be looking on those days.
*/
let picks = 0;
const reasons = new Map();
const base = new Date('2026-01-01T00:00:00');
for (let day = 0; day < 366; day += 1) {
  for (let hour = 0; hour < 24; hour += 4) {
    for (let month = 1; month <= 12; month += 1) {
      const now = new Date(base.getTime() + day * 86_400_000 + hour * 3_600_000);
      /*
        Maghrib alternates between an hour away and six, so Ramadan exercises
        BOTH the iftar branch and the ordinary fasting one. Pinning it an hour
        out meant `fasting` never fired and the check reported a clean run
        over a branch it had not entered.
      */
      const maghrib = new Date(now.getTime() + (day % 2 ? 60 : 360) * 60_000);
      const pick = pickForNow({ now, hijri: { month, day: 15 }, maghrib });
      if (!pick) {
        console.error(`\n✗ no card pick for month ${month}, hour ${hour}, day ${day}`);
        failed = true;
        break;
      }
      const resolved = resolvePick(pick);
      if (!resolved || !resolved.line.arabic) {
        console.error(
          `\n✗ card pick ${pick.occasion}/${pick.line ?? '-'} (${pick.reason}) ` +
            'does not resolve to a line with Arabic',
        );
        failed = true;
        break;
      }
      picks += 1;
      reasons.set(pick.reason, (reasons.get(pick.reason) ?? 0) + 1);
    }
  }
}
console.log(
  `${picks} card picks resolved — ` +
    [...reasons.entries()].map(([r, n]) => `${r} ${n}`).join(', '),
);

if (failed) {
  console.error('\n  A re-fetch changed the book. Find where each line went before deleting.');
  process.exit(1);
}

console.log('✓ every annotation points at a line that exists');
