import { CONFIDENCE_ORDER, type PrayerConfidence } from '@/lib/onboarding';
import type { Observations } from '@/lib/observations';

/**
 * What the app believes about somebody's praying, from what they said and what
 * it has seen.
 *
 * ## The observation wins, and only upward
 *
 * Onboarding seeds this and never settles it. Somebody who answered "teach me"
 * and has since finished a prayer guide thirty times over a month is not a
 * beginner, whatever they ticked in their first minute — and the app should
 * stop handing them a 23-step walkthrough without being asked.
 *
 * It only ever moves FORWARD. There is no path back down, and that is
 * deliberate: demoting somebody would mean the app deciding they have got
 * worse, which requires noticing an absence, which `index.tsx` promises it
 * never does. Somebody who stops praying for a month sees exactly what they
 * saw before.
 *
 * ## Why these two numbers
 *
 * Enough repetitions that it was not a curious afternoon, and enough elapsed
 * time that it was not one evening of tapping through everything. Both are
 * needed: `TIMES` alone would promote somebody who read Fajr twelve times in a
 * sitting, and `DAYS` alone would promote somebody who opened it twice a month
 * apart.
 *
 * ⚠️ Neither is a streak. `observations.ts` keeps a first, a last and a count,
 * and no record of WHICH days — so nothing here can tell whether the month was
 * unbroken, and nothing ever asks.
 */
const TIMES = 12;
const DAYS = 21;

const DAY_MS = 24 * 60 * 60 * 1000;

/** The prayer guides. Wudu is not one — making wudu is not praying. */
const PRAYER_KEYS = [
  'guide:fajr',
  'guide:dhuhr',
  'guide:asr',
  'guide:maghrib',
  'guide:isha',
];

/**
 * What the observations alone would say, or undefined if they say nothing.
 *
 * Summed across the five prayers rather than requiring one of them: somebody
 * who prays Fajr and Maghrib with the app and the rest from memory is not less
 * practised than somebody who opens Dhuhr twelve times.
 */
export function observedConfidence(value: Observations, now: number): PrayerConfidence | undefined {
  const entries = PRAYER_KEYS.map((key) => value.finished[key]).filter(
    (entry): entry is NonNullable<typeof entry> => entry !== undefined,
  );
  if (entries.length === 0) return undefined;

  const times = entries.reduce((sum, entry) => sum + entry.times, 0);
  const since = Math.min(...entries.map((entry) => entry.first));
  const days = (now - since) / DAY_MS;

  if (times >= TIMES && days >= DAYS) return 'on-my-own';
  /*
    Having finished a prayer at all is already more than "teach me" describes.
    A gentle first step, and the reason `need-words` exists as a middle rung.
  */
  if (times >= 1) return 'need-words';
  return undefined;
}

/** What they said, raised by what the app has seen. Never lowered. */
export function prayerConfidence(
  said: PrayerConfidence | null,
  value: Observations,
  now: number,
): PrayerConfidence {
  const seeded = said ?? 'teach-me';
  const seen = observedConfidence(value, now);
  if (!seen) return seeded;
  return CONFIDENCE_ORDER[seen] > CONFIDENCE_ORDER[seeded] ? seen : seeded;
}

