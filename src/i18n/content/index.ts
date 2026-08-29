import type { ContentDict, Locale } from '../locales';

/**
 * Translations of the content, keyed by the English text.
 *
 * Empty, and English needs no table of its own — the content IS English. When
 * a language comes back this is where its dictionary is registered; the
 * removal and how to recover the old ones are recorded in `../locales.ts`.
 */
export const CONTENT_DICTS: Record<Locale, ContentDict> = { en: {} };
