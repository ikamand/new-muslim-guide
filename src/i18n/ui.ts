import type { Locale } from './locales';

/**
 * Text belonging to the app rather than to the religion — labels, headings,
 * controls.
 *
 * Kept apart from `src/content/` on purpose. This is ordinary interface
 * translation: getting "Repeat" wrong is a bug, where getting a translation of
 * the tashahhud wrong is a different class of mistake entirely. Only the
 * strings under `src/i18n/content/` carry that weight.
 *
 * ⚠️ REVIEW REQUIRED — the Arabic, French and Spanish below are model-written
 * and need a native speaker's eye. They are not religious text, so this is
 * proofreading rather than scholarly review.
 *
 * The English record defines the keys; every other locale is a Partial of it,
 * so a missing string is a fallback and a misspelled key is a type error.
 */
export const EN = {
  'tab.guide': 'Guide',
  'home.beforeYouPray': 'Before you pray',
  'home.fivePrayers': 'The five prayers',
  'tab.learn': 'Learn',
  'tab.settings': 'Settings',

  'learn.title': 'Learn',
  'learn.intro':
    'Background for what you are already doing. Read it when you have a quiet minute — none of it is needed before you pray.',
  'learn.practice.title': 'Practice the recitations',
  'learn.practice.subtitle': 'Hear them line by line, and repeat until they hold',
  'learn.iman.title': 'The Six Articles of Faith',
  'learn.iman.subtitle': 'What you believe, now that you have said the shahada',
  'learn.pillars.title': 'The Five Pillars of Islam',
  'learn.pillars.subtitle': 'What Islam asks of you, and in what order it arrives',

  'practice.title': 'Practice',
  'practice.intro':
    'Play a line, turn on repeat, and say it with the reciter until it holds. This is for learning beforehand — in prayer you recite yourself, not from a recording.',
  'practice.repeat': 'Repeat',
  'practice.slower': 'Slower',
  'practice.ayah': 'Ayah',
  'practice.play': 'Play',
  'practice.pause': 'Pause',

  'pillars.title': 'The Five Pillars',
  'pillars.intro':
    'The five things Islam is built on. Only the first two ask anything of you today — the rest arrive in their own time, and two of them may never apply to you at all.',
  'iman.intro':
    'The five pillars are what you do. These six are what you believe while doing it. You already accepted them when you said the shahada — this page is only putting names to them, and nothing here is something you need to memorise.',
  'pillars.testimony': 'The testimony',
  'pillars.taughtHere': 'The app teaches this →',
  'iman.title': 'The Six Articles of Faith',

  'qibla.title': 'Qibla',
  'settings.title': 'Settings',
  'settings.language': 'Language',
  'settings.display': 'Display',
  'settings.transliteration': 'Transliteration',
  'settings.translation': 'Translation',

  'common.back': 'Back',
  'common.times': 'times',
} as const;

export type UIKey = keyof typeof EN;

type Overrides = Partial<Record<UIKey, string>>;

const AR: Overrides = {
  'tab.guide': 'الدليل',
  'tab.learn': 'تعلّم',
  'tab.settings': 'الإعدادات',
  'learn.title': 'تعلّم',
  'practice.title': 'تدرّب',
  'practice.repeat': 'تكرار',
  'practice.slower': 'أبطأ',
  'practice.ayah': 'آية',
  'practice.play': 'تشغيل',
  'practice.pause': 'إيقاف',
  'pillars.title': 'أركان الإسلام',
  'pillars.testimony': 'الشهادة',
  'iman.title': 'أركان الإيمان',
  'qibla.title': 'القبلة',
  'settings.title': 'الإعدادات',
  'settings.language': 'اللغة',
  'settings.display': 'العرض',
  'settings.transliteration': 'النقحرة',
  'settings.translation': 'الترجمة',
  'common.back': 'رجوع',
};

const FR: Overrides = {
  'tab.guide': 'Guide',
  'home.beforeYouPray': 'Before you pray',
  'home.fivePrayers': 'The five prayers',
  'tab.learn': 'Apprendre',
  'tab.settings': 'Réglages',
  'learn.title': 'Apprendre',
  'practice.title': 'Pratiquer',
  'practice.repeat': 'Répéter',
  'practice.slower': 'Plus lent',
  'practice.ayah': 'Verset',
  'practice.play': 'Lire',
  'practice.pause': 'Pause',
  'pillars.title': 'Les cinq piliers',
  'pillars.testimony': 'L’attestation de foi',
  'iman.title': 'Les six piliers de la foi',
  'qibla.title': 'Qibla',
  'settings.title': 'Réglages',
  'settings.language': 'Langue',
  'settings.display': 'Affichage',
  'settings.transliteration': 'Translittération',
  'settings.translation': 'Traduction',
  'common.back': 'Retour',
};

const ES: Overrides = {
  'tab.guide': 'Guía',
  'tab.learn': 'Aprender',
  'tab.settings': 'Ajustes',
  'learn.title': 'Aprender',
  'practice.title': 'Practicar',
  'practice.repeat': 'Repetir',
  'practice.slower': 'Más lento',
  'practice.ayah': 'Aleya',
  'practice.play': 'Reproducir',
  'practice.pause': 'Pausa',
  'pillars.title': 'Los cinco pilares',
  'pillars.testimony': 'El testimonio de fe',
  'iman.title': 'Los seis pilares de la fe',
  'qibla.title': 'Alquibla',
  'settings.title': 'Ajustes',
  'settings.language': 'Idioma',
  'settings.display': 'Visualización',
  'settings.transliteration': 'Transliteración',
  'settings.translation': 'Traducción',
  'common.back': 'Atrás',
};

export const UI: Record<Locale, Overrides> = { en: EN, ar: AR, fr: FR, es: ES };

/** The string for a key, falling back to English whenever a locale lacks it. */
export function ui(locale: Locale, key: UIKey): string {
  return UI[locale][key] ?? EN[key];
}
