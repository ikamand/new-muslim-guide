/**
 * The two things onboarding asks, as types.
 *
 * A module of its own, with no imports, because both the settings provider and
 * the recommendation tables need them — and the provider sits at the root of
 * the app. Taking these from `recommendations.ts` would pull the whole content
 * catalogue into the first frame to validate two strings.
 */

export const USER_STAGES = ['new-muslim', 'exploring', 'returning', 'helping'] as const;
export type UserStage = (typeof USER_STAGES)[number];

export const INITIAL_INTERESTS = [
  'prayer',
  'basics',
  'daily-life',
  'understanding',
  'unsure',
] as const;
export type InitialInterest = (typeof INITIAL_INTERESTS)[number];

export function isUserStage(value: unknown): value is UserStage {
  return typeof value === 'string' && (USER_STAGES as readonly string[]).includes(value);
}

export function isInitialInterest(value: unknown): value is InitialInterest {
  return typeof value === 'string' && (INITIAL_INTERESTS as readonly string[]).includes(value);
}
