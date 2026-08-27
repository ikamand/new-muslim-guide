/**
 * What to put in front of someone right now.
 *
 * One card, on Today and at the top of the Duʿa tab, answering "what should I
 * be saying?" from what the app already knows: the hour, the Islamic month,
 * the day of the week, and where the sun is.
 *
 * ## Placement is not a ruling
 *
 * Nothing here asserts that a duʿa is *required* at a time — only that it is
 * the one worth showing. That is the same line `seasons.ts` draws: "which
 * lesson is worth reading this month, with the claims left where they are,
 * under their own citations."
 *
 * ⚠️ REVIEW REQUIRED on the placements themselves, which are judgements even
 * though none is a ruling. Whether salawat belongs on Friday, and whether the
 * fasting duʿas should surface all through Ramadan or only near Maghrib, are
 * the kind of thing a reviewer should agree with rather than inherit from me.
 *
 * ## Months, never days — inherited from `seasons.ts`
 *
 * The Hijri date comes from the Umm al-Qura calculation, and months actually
 * begin by local moon sighting. The two differ by a day often enough that no
 * rule below may turn on a single date. Ramadan as a month is safe; "the
 * twenty-seventh night" is not, and is absent for that reason.
 *
 * ## Every pick is a line the reader can say
 *
 * ⚠️ The obvious source for "the most rewarding dhikr" is the book's own
 * merit-of-dhikr sections, and every line in them is a NARRATION rather than
 * words to recite — `مَنْ قَالَ: سُبْحَانَ اللَّهِ الْعَظِيمِ وَبِحَمْدِهِ غُرِسَتْ لَهُ
 * نَخْلَةٌ فِي الْجَنَّةِ`, "whoever says … a palm tree is planted for him".
 * Putting one on this card would tell someone to recite the report instead of
 * the dhikr. So the evergreen pool points at specific LINES elsewhere in the
 * book that are the words themselves, each with a repeat count the generator
 * read off the book's own prose and cross-checked against its English.
 */

import { HISN } from './hisn';
import { MOMENT_BY_HOUR } from '../duas';

/** Why a card is showing what it is showing. The card says so out loud. */
export type CardReason = 'iftar' | 'fasting' | 'friday' | 'hajj' | 'moment' | 'always';

export type CardPick = {
  occasion: number;
  /** The exact line. Never inferred — see the note above `ALWAYS`. */
  line: number;
  reason: CardReason;
};

/**
 * Words worth saying on any day of any year.
 *
 * Each is a standalone line — not a narration about one — and each carries a
 * count the book states in its own prose. Four is deliberate: enough that the
 * card is not the same every week, few enough that every entry can be checked
 * by a person in one sitting.
 */
/**
 * ⚠️ EVERY PICK IS AN EXPLICIT LINE, READ BEFORE IT WAS WRITTEN DOWN.
 *
 * The first version named an occasion and let the card take its first
 * `quoted` line. That put this on screen as the duʿa before eating:
 *
 *   إِذَا أَكَلَ أَحَدُكُمْ طَعَاماً فَلْيَقُلْ بِسْمِ اللَّهِ
 *   "When one of you eats food, let him say: In the name of Allah"
 *
 * which is the narration telling you to say it, not the words. `kind` cannot
 * tell them apart — both are `quoted`, because the book puts ((…)) round
 * both — and until `annotations.ts` is filled nothing in the data can. So
 * every entry below is a line someone opened and read.
 *
 * Two intended picks were dropped for having no usable line at all: the
 * before-eating occasion states its duʿa only inside `مَنْ أَطْعَمَهُ اللَّهُ
 * الطَّعَامَ فَلْيَقُلْ:`, and the fasting-with-food-present occasion is a
 * single narration. Extracting the words from inside a narration is a
 * judgement about religious text, so those fall through to the evergreen pool
 * rather than being guessed at.
 *
 * ⚠️ REVIEW REQUIRED — a reviewer should confirm each of these is the wording
 * its occasion is for, and that the placements are sensible.
 */
type Pick = { occasion: number; line: number };

/** Words worth saying on any day of any year, each with a count the book states. */
const ALWAYS: readonly Pick[] = [
  { occasion: 1269190, line: 21 }, // سبحان الله وبحمده — ×100
  { occasion: 1269190, line: 23 }, // لا إله إلا الله وحده لا شريك له — ×100
  { occasion: 1269190, line: 26 }, // أستغفر الله وأتوب إليه — ×100
  { occasion: 1269190, line: 28 }, // اللهم صل وسلم على نبينا محمد — ×10
];

/** The salawat, which is also what Friday leads with. */
const SALAWAT: Pick = { occasion: 1269190, line: 28 };

/** ذهب الظمأ وابتلت العروق — said as the fast is broken. */
const IFTAR: Pick = { occasion: 1269497, line: 0 };

/** لبيك اللهم لبيك — the talbiyah. */
const TALBIYAH: Pick = { occasion: 1269679, line: 0 };

/**
 * What the clock can honestly imply, and the line for it.
 *
 * Only three of the six day-moments are things an hour really tells you.
 * Nothing about three in the afternoon says anybody is travelling, and
 * showing the duʿa for setting off to someone at their desk is the card being
 * confidently wrong.
 */
const BY_MOMENT: Readonly<Record<string, Pick>> = {
  waking: { occasion: 1268971, line: 0 }, // الحمد لله الذي أحيانا بعد ما أماتنا
  eating: { occasion: 1269507, line: 0 }, // الحمد لله الذي أطعمني هذا ورزقنيه
  night: { occasion: 1269267, line: 12 }, // باسمك اللهم أموت وأحيا
};

/** Whole days since the epoch, so a pick holds for a calendar day. */
function dayNumber(now: Date): number {
  return Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86_400_000);
}

/** How close to sunset counts as "about to break the fast". */
const IFTAR_WINDOW_MS = 90 * 60 * 1000;

export function pickForNow({
  now,
  hijri,
  maghrib,
}: {
  now: Date;
  hijri: { month: number; day: number } | null;
  maghrib?: Date;
}): CardPick {
  const seed = dayNumber(now);

  /*
    The ninety minutes before sunset in Ramadan. Narrow on purpose: the duʿa
    for breaking the fast is worth having ready as the light goes and worth
    nothing at eleven in the morning. Outside that window Ramadan falls
    through — the occasion for sitting in front of food you are not eating is
    a single narration, with no wording to lift out of it.
  */
  if (hijri?.month === 9 && maghrib) {
    const until = maghrib.getTime() - now.getTime();
    if (until > 0 && until <= IFTAR_WINDOW_MS) return { ...IFTAR, reason: 'iftar' };
  }

  // Dhul Hijjah. Most people will hear the talbiyah long before they say it.
  if (hijri?.month === 12) return { ...TALBIYAH, reason: 'hajj' };

  if (now.getDay() === 5) return { ...SALAWAT, reason: 'friday' };

  const moment = BY_MOMENT[MOMENT_BY_HOUR[now.getHours()]];
  if (moment) return { ...moment, reason: 'moment' };

  return { ...ALWAYS[seed % ALWAYS.length], reason: 'always' };
}

/**
 * The occasion and line a pick names, or undefined if the book has moved.
 *
 * It does not fall back to another line. A pick that no longer resolves is a
 * pick nobody has read, and showing a neighbouring line instead is how the
 * narration got on screen in the first place.
 */
export function resolvePick(pick: CardPick) {
  const occasion = HISN.find((entry) => entry.id === pick.occasion);
  const line = occasion?.lines[pick.line];
  return occasion && line ? { occasion, line } : undefined;
}
