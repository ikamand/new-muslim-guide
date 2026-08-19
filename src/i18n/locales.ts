/**
 * The languages the app speaks.
 *
 * English is the source of truth, not merely the default: every other locale is
 * a set of overrides on top of it, and anything a translator has not delivered
 * falls back to English rather than showing a key or a blank. That means a
 * half-translated language is usable rather than broken, which is the state
 * every language is in for a while.
 */
export const LOCALES = ['en', 'ar', 'fr', 'es'] as const;

export type Locale = (typeof LOCALES)[number];

export const SOURCE_LOCALE: Locale = 'en';

/** Named in its own language — nobody looks for "Arabic" in a list they can't read. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية',
  fr: 'Français',
  es: 'Español',
};

export const RTL_LOCALES: readonly Locale[] = ['ar'];

export function isRTL(locale: Locale): boolean {
  return RTL_LOCALES.includes(locale);
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/**
 * Best match for a device language tag — "fr-CA" and "fr" both give French.
 * Anything unrecognised gives English rather than an error.
 */
export function resolveLocale(tag: string | null | undefined): Locale {
  if (!tag) return SOURCE_LOCALE;
  const base = tag.toLowerCase().split(/[-_]/)[0];
  return isLocale(base) ? base : SOURCE_LOCALE;
}

/**
 * A language's translations, keyed by the English text itself.
 *
 * Keyed by source text rather than an invented id, for two reasons. The five
 * prayers are generated from one script, so "Bow" appears seventeen times with
 * seventeen different step ids — under id keys a translator would translate it
 * seventeen times and could word it seventeen ways, which is exactly what
 * generating the prayers exists to prevent. And when an English sentence is
 * edited its translation stops matching, so the string falls back to English
 * and reappears in the sheet as needing work, instead of silently keeping a
 * translation of wording that no longer exists.
 *
 * The cost: two identical English strings that need different wording in
 * another language cannot be told apart. The generated sheet lists every place
 * a string appears so a translator can raise it.
 */
export type ContentDict = Partial<Record<string, string>>;
