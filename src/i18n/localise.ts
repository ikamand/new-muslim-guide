import type { Guide, Pillar, Recitation, Step } from '@/content';

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
  };
}
