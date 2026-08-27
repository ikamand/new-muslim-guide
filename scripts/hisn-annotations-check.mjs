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

if (failed) {
  console.error('\n  A re-fetch changed the book. Find where each line went before deleting.');
  process.exit(1);
}

console.log('✓ every annotation points at a line that exists');
