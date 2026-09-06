import { CRISIS_PHRASES } from '@/content/crisis';

/**
 * Does this text sound like someone in danger?
 *
 * A list and a regular expression. Not a model, and never described as one:
 * a list can be read, and a phrase it does not hold leaves the reader exactly
 * where they were. Whole words, so "die" never fires inside "diet"; case
 * folded; whitespace collapsed; curly apostrophes straightened, because iOS
 * types "don’t" and the list is written "don't".
 *
 * A match shows the crisis resources above Send. It never blocks the send.
 * Checked by `npm run crisis:check` against the examples in `content/crisis.ts`.
 */

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const PATTERNS = CRISIS_PHRASES.map((phrase) => new RegExp(`(^|\\W)${escape(phrase)}(\\W|$)`));

export function matchesCrisis(text: string): boolean {
  const folded = text
    .toLowerCase()
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ');
  return PATTERNS.some((pattern) => pattern.test(folded));
}
