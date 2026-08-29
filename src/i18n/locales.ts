/**
 * The languages the app speaks.
 *
 * English is the source of truth, not merely the default: every other locale is
 * a set of overrides on top of it, and anything a translator has not delivered
 * falls back to English rather than showing a key or a blank. That means a
 * half-translated language is usable rather than broken, which is the state
 * every language is in for a while — and `TranslationGap` says so on the screen
 * rather than letting English pass as a finished translation.
 *
 * The machinery below all still works with one locale in the list. It is a
 * lookup that currently has one answer, not a feature that was ripped out.
 *
 * ## English only, for now — 29 Aug 2026
 *
 * French and Spanish were removed, Iyad's decision, to focus on getting the
 * English right first. They were **99 of 1003 content strings** each — about a
 * tenth — while the UI chrome was near-complete, which is the worst possible
 * split: the app looked translated at the edges and was English everywhere the
 * actual religious instruction lived. `docs/i18n-manifest.csv` recorded the
 * ratio the whole time and nobody was reading it.
 *
 * Three things made this a cost rather than a nice-to-have. Every English
 * content edit silently dropped its translations back to English, because they
 * are keyed by the source text — so ordinary writing quietly widened the gap.
 * `TranslationGap` was wired on four screens out of thirteen that needed it, so
 * nine screens showed English under a French title and said nothing. And no
 * native speaker had ever read either table: both were model-written, carrying
 * the ⚠️ in `ui.ts` that said so.
 *
 * ## Getting them back
 *
 * Nothing is lost. Both tables are whole in git, at the commit BEFORE this
 * change:
 *
 *     git show f16b752:src/i18n/content/fr.ts > src/i18n/content/fr.ts
 *     git show f16b752:src/i18n/content/es.ts > src/i18n/content/es.ts
 *     git show f16b752:src/i18n/ui.ts          # the FR and ES tables
 *
 * Then: the code back in `LOCALES` and `LOCALE_NAMES` here, the table in `UI`
 * in `ui.ts`, the dictionary in `CONTENT_DICTS` in `content/index.ts`, and
 * `npm run i18n:manifest` to see what the English has moved on to since.
 *
 * ⚠️ **Restoring the files is the easy half.** They are ~10% of the content and
 * were never reviewed by a speaker. The reason to bring a language back is a
 * person who will finish it and read it, not the files — and until then English
 * only is the honest state. A wrong French translation of the tashahhud is the
 * same class of mistake as a wrong Arabic text, and harder to notice.
 *
 * ## Arabic was here and is deliberately gone
 *
 * It shipped as a selectable language with an empty dictionary: 645 strings,
 * none translated, so choosing it produced an entirely English app. That is a
 * worse first impression than not offering it, and Arabic speakers are the one
 * audience this app is not needed by — the support, the teachers and the books
 * are already around them. Re-adding it means `ar` here, an `AR` table in
 * `ui.ts`, a content dictionary, and restoring the RTL handling this file used
 * to carry.
 */
export const LOCALES = ['en'] as const;

export type Locale = (typeof LOCALES)[number];

export const SOURCE_LOCALE: Locale = 'en';

/** Named in its own language — nobody looks for "Spanish" in a list they read as "Español". */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
};

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
