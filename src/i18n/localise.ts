import type {
  CatalogEntry,
  ContentNote,
  Dua,
  Guide,
  LocalisedText,
  Phrase,
  Pillar,
  Recitation,
  Reference,
  Step,
} from '@/content';

import { CONTENT_DICTS } from './content';
import { SOURCE_LOCALE, type ContentDict, type Locale } from './locales';

/**
 * Rebuilds content in the reader's language.
 *
 * Content stays written in English in `src/content/`; a locale supplies
 * translations keyed by the English text. Anything a translator has not
 * delivered keeps its English wording, so the app degrades one string at a
 * time rather than all at once, and a half-finished language is shippable.
 *
 * Arabic is never touched. It is the thing being said, not a rendering of it,
 * and neither is the transliteration — a Latin-script aid is the same aid in
 * French as in English.
 */

function tr(dict: ContentDict, text: string): string;
function tr(dict: ContentDict, text: string | undefined): string | undefined;
function tr(dict: ContentDict, text: string | undefined): string | undefined {
  if (!text) return text;
  const translated = dict[text];
  return translated && translated.trim() ? translated : text;
}

/**
 * Structured notes, translated like any other prose.
 *
 * Only `text` moves. A note's `kind` is a classification rather than wording,
 * and its `positions` name schools of thought — "Hanafi" is "Hanafi" in every
 * language the app speaks.
 */
function localiseNotes(
  notes: readonly ContentNote[] | undefined,
  dict: ContentDict,
): readonly ContentNote[] | undefined {
  return notes?.map((note) => ({
    ...note,
    text: tr(dict, note.text),
    // Prose like any other. It was reaching translators through the manifest
    // and then rendering in English regardless, because this function did not
    // carry it across — caught by reading a Spanish page rather than the code.
    additionalExplanation: tr(dict, note.additionalExplanation),
    positions: note.positions?.map((position) => ({
      ...position,
      position: tr(dict, position.position),
    })),
  }));
}

/**
 * A `LocalisedText` in the reader's language.
 *
 * Prefers a translation written beside the term, falls back to the keyed table
 * in `src/i18n/content/`, and falls back again to English. That order matters:
 * inline wins because it was chosen for this specific term, which is the whole
 * reason `LocalisedText` exists rather than everything going through the table.
 */
export function localiseText(text: LocalisedText, locale: Locale): string {
  const inline = text[locale];
  if (inline && inline.trim()) return inline;
  if (locale === SOURCE_LOCALE) return text.en;
  return tr(CONTENT_DICTS[locale], text.en);
}

export function localiseRecitation(recitation: Recitation, locale: Locale): Recitation {
  if (locale === SOURCE_LOCALE) return recitation;
  const dict = CONTENT_DICTS[locale];

  const verses = recitation.verses?.map((verse) => ({
    ...verse,
    translation: tr(dict, verse.translation),
  }));

  return {
    ...recitation,
    // A split text's whole translation is its verses joined, exactly as the
    // source derives it — translating one has to translate both.
    translation: verses
      ? verses.map((verse) => verse.translation).join(' ')
      : tr(dict, recitation.translation),
    times: tr(dict, recitation.times),
    ...(verses ? { verses } : {}),
  };
}

function localiseStep(step: Step, locale: Locale, dict: ContentDict): Step {
  return {
    ...step,
    title: tr(dict, step.title),
    instruction: tr(dict, step.instruction),
    note: tr(dict, step.note),
    notes: localiseNotes(step.notes, dict),
    says: step.says ? localiseRecitation(step.says, locale) : undefined,
  };
}

export function localiseGuide(guide: Guide, locale: Locale): Guide {
  if (locale === SOURCE_LOCALE) return guide;
  const dict = CONTENT_DICTS[locale];

  return {
    ...guide,
    title: tr(dict, guide.title),
    subtitle: tr(dict, guide.subtitle),
    steps: guide.steps.map((step) => localiseStep(step, locale, dict)),
  };
}

export function localisePillar(pillar: Pillar, locale: Locale): Pillar {
  if (locale === SOURCE_LOCALE) return pillar;
  const dict = CONTENT_DICTS[locale];

  return {
    ...pillar,
    title: tr(dict, pillar.title),
    summary: tr(dict, pillar.summary),
    detail: tr(dict, pillar.detail),
    note: tr(dict, pillar.note),
    meta: pillar.meta && { ...pillar.meta, notes: localiseNotes(pillar.meta.notes, dict) },
  };
}

export function localiseReference(reference: Reference, locale: Locale): Reference {
  if (locale === SOURCE_LOCALE) return reference;
  const dict = CONTENT_DICTS[locale];

  return {
    ...reference,
    title: tr(dict, reference.title),
    subtitle: tr(dict, reference.subtitle),
    sections: reference.sections.map((section) => ({
      ...section,
      heading: tr(dict, section.heading),
      body: tr(dict, section.body),
      note: tr(dict, section.note),
      notes: localiseNotes(section.notes, dict),
    })),
  };
}

/**
 * A duʿa in the reader's language.
 *
 * ⚠️ This did not exist. `scripts/i18n-manifest.mjs` has always collected
 * `when` and `note` from every duʿa, so a translator would have delivered
 * them — and the screen rendered the English regardless, because nothing ever
 * looked them up. Invisible today only because every content locale is empty.
 * The Arabic is untouched, as everywhere.
 */
export function localiseDua(dua: Dua, locale: Locale): Dua {
  if (locale === SOURCE_LOCALE) return dua;
  const dict = CONTENT_DICTS[locale];

  return {
    ...dua,
    when: tr(dict, dua.when),
    note: tr(dict, dua.note),
    says: localiseRecitation(dua.says, locale),
    meta: dua.meta && { ...dua.meta, notes: localiseNotes(dua.meta.notes, dict) },
  };
}

/**
 * A phrase in the reader's language.
 *
 * Same gap as `localiseDua`. `said` is never translated — it is how the Arabic
 * sounds, which is the same sound whatever language you read the gloss in.
 */
export function localisePhrase(phrase: Phrase, locale: Locale): Phrase {
  if (locale === SOURCE_LOCALE) return phrase;
  const dict = CONTENT_DICTS[locale];

  return {
    ...phrase,
    meaning: tr(dict, phrase.meaning),
    when: tr(dict, phrase.when),
    reply: tr(dict, phrase.reply),
    meta: phrase.meta && { ...phrase.meta, notes: localiseNotes(phrase.meta.notes, dict) },
  };
}

/**
 * A catalogue entry in the reader's language.
 *
 * `CATALOG` is built once at module load, from the raw records, with no locale —
 * it has to be, because the node scripts read it too. So anything rendering an
 * entry has to localise it here, and the journey and the recommendations both
 * showed English lesson names inside an otherwise Spanish screen until they did.
 *
 * Only `title` and `shortDescription` are rendered from an entry. `sources` are
 * citations and are never translated; `notes` are localised by whichever screen
 * renders the real record.
 */
export function localiseCatalogEntry(entry: CatalogEntry, locale: Locale): CatalogEntry {
  if (locale === SOURCE_LOCALE) return entry;
  const dict = CONTENT_DICTS[locale];

  return {
    ...entry,
    title: tr(dict, entry.title),
    shortDescription: tr(dict, entry.shortDescription),
  };
}
