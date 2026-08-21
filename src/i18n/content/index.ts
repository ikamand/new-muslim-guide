import type { ContentDict, Locale } from '../locales';
import { ES } from './es';
import { FR } from './fr';

/** English is the content itself, so it needs no override table. */
export const CONTENT_DICTS: Record<Locale, ContentDict> = { en: {}, es: ES, fr: FR };
