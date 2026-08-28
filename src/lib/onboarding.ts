/**
 * The two things onboarding asks, as types.
 *
 * A module of its own, with no imports, because both the settings provider and
 * the screens need them — and the provider sits at the root of the app.
 *
 * ## Facts, not identities
 *
 * These replaced two questions that asked who somebody WAS: "which describes
 * you" (new Muslim, exploring, returning, helping) and "what do you want help
 * with first". Both were unanswerable at the minute they were asked — the app
 * put them in front of somebody in their first thirty seconds — and neither
 * could ever be checked, so neither could ever be corrected.
 *
 * A fact can be checked against behaviour. "Can you pray on your own yet?" has
 * an answer the app will observe for itself within a month, and when the
 * observation disagrees with the answer, the observation wins. That is what
 * makes onboarding a SEED rather than a verdict, and it is `CLAUDE.md`'s own
 * rule — prefer what the app can infer over what the user must configure —
 * applied to the thing it was written for.
 *
 * ⚠️ Neither question is ever asked again, and neither is ever announced as
 * changed. Somebody who said "teach me" and has since prayed thirty times sees
 * a different Today, with no badge, no level-up and nothing congratulating
 * them on it.
 */

/**
 * Where somebody is with the shahada.
 *
 * Four answers rather than yes/no, because the two "yes"es want different
 * screens: somebody who said it last week is still learning the words, and
 * somebody who said it years ago is not.
 */
export const SHAHADA_STATES = ['not-yet', 'exploring', 'recently', 'a-while'] as const;
export type ShahadaState = (typeof SHAHADA_STATES)[number];

/**
 * Whether somebody can pray without being walked through it.
 *
 * The most valuable personalisation available in this app, and the one it did
 * not have: week one wants a 23-step walkthrough, year three wants the time,
 * the qibla and the surah they are working on, and Today gave both the same
 * button.
 */
export const PRAYER_CONFIDENCES = ['teach-me', 'need-words', 'on-my-own'] as const;
export type PrayerConfidence = (typeof PRAYER_CONFIDENCES)[number];

export function isShahadaState(value: unknown): value is ShahadaState {
  return typeof value === 'string' && (SHAHADA_STATES as readonly string[]).includes(value);
}

export function isPrayerConfidence(value: unknown): value is PrayerConfidence {
  return typeof value === 'string' && (PRAYER_CONFIDENCES as readonly string[]).includes(value);
}

/** Ordered, so an observation can only ever move somebody FORWARD. */
export const CONFIDENCE_ORDER: Record<PrayerConfidence, number> = {
  'teach-me': 0,
  'need-words': 1,
  'on-my-own': 2,
};
