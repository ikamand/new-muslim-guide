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
  'tab.pray': 'Pray',
  'home.beforeYouPray': 'Before you pray',
  'home.fivePrayers': 'The five prayers',
  'tab.learn': 'Learn',
  'tab.settings': 'Settings',

  'learn.title': 'Learn',
  'learn.intro':
    'Start at the top if you are new. Everything below it is background for what you are already doing, and can wait for a quiet minute.',
  'learn.section.startHere': 'Start here',
  'learn.section.everyDay': 'Every day',
  'learn.section.understanding': 'Understanding',
  'learn.shahada.title': 'Becoming Muslim',
  'learn.shahada.subtitle': 'What to say, and what it means',
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
  'settings.intro': 'How the app reads, and how it behaves while you pray.',
  'settings.language': 'Language',
  'settings.display': 'Display',
  'settings.transliteration': 'Transliteration',
  'settings.translation': 'Translation',
  'settings.transliteration.help': 'The Arabic spelled out in English letters',
  'settings.translation.help': 'What the words mean in English',
  'settings.duringPrayer': 'During prayer',
  'settings.keepAwake': 'Keep the screen on',
  'settings.keepAwake.help':
    'Stops the screen going dark while you are part-way through a prayer',

  'welcome.title': 'Peace be upon you',
  'welcome.intro': 'Two quick questions, then the app gets out of your way.',
  'welcome.where': 'Where are you?',
  'welcome.becoming': 'I want to become Muslim',
  'welcome.becoming.help': 'Start with the shahada — what it means and how to say it',
  'welcome.already': 'I have become Muslim',
  'welcome.already.help': 'Start with wudu and the prayer',
  'welcome.audience': 'Which applies to you?',
  'welcome.audience.why':
    'A few things genuinely differ — what has to be covered in prayer, whether Friday prayer is obligatory, and what changes during a period. Nothing is stored anywhere but this phone.',
  'welcome.man': 'Man',
  'welcome.woman': 'Woman',
  'welcome.skip': 'Rather not say — show me everything',
  'settings.guidance': 'Prayer guidance for',
  'settings.audience.man': 'Men',
  'settings.audience.woman': 'Women',
  'settings.audience.both': 'Show everything',

  'common.back': 'Back',
  'common.times': 'times',
} as const;

export type UIKey = keyof typeof EN;

type Overrides = Partial<Record<UIKey, string>>;

const AR: Overrides = {
  'tab.pray': 'الصلاة',
  'tab.learn': 'تعلّم',
  'tab.settings': 'الإعدادات',
  'learn.title': 'تعلّم',
  'learn.section.startHere': 'ابدأ من هنا',
  'learn.section.everyDay': 'كل يوم',
  'learn.section.understanding': 'لفهم أعمق',
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
  'settings.intro': 'كيف يُقرأ التطبيق، وكيف يتصرّف أثناء الصلاة.',
  'settings.language': 'اللغة',
  'settings.display': 'العرض',
  'settings.transliteration': 'النقحرة',
  'settings.translation': 'الترجمة',
  'settings.duringPrayer': 'أثناء الصلاة',
  'settings.keepAwake': 'إبقاء الشاشة مضاءة',
  'welcome.title': 'السلام عليكم',
  'welcome.man': 'رجل',
  'welcome.woman': 'امرأة',
  'settings.guidance': 'إرشادات الصلاة لـ',
  'common.back': 'رجوع',
};

const FR: Overrides = {
  'tab.pray': 'Pray',
  'home.beforeYouPray': 'Before you pray',
  'home.fivePrayers': 'The five prayers',
  'tab.learn': 'Apprendre',
  'tab.settings': 'Réglages',
  'learn.title': 'Apprendre',
  'learn.section.startHere': 'Commencer ici',
  'learn.section.everyDay': 'Chaque jour',
  'learn.section.understanding': 'Comprendre',
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
  'settings.intro': 'Comment l’application se lit, et comment elle se comporte pendant la prière.',
  'settings.language': 'Langue',
  'settings.display': 'Affichage',
  'settings.transliteration': 'Translittération',
  'settings.translation': 'Traduction',
  'settings.duringPrayer': 'Pendant la prière',
  'settings.keepAwake': 'Garder l’écran allumé',
  'welcome.title': 'Que la paix soit sur vous',
  'welcome.man': 'Homme',
  'welcome.woman': 'Femme',
  'settings.guidance': 'Conseils de prière pour',
  'common.back': 'Retour',
};

const ES: Overrides = {
  'tab.pray': 'Rezar',
  'tab.learn': 'Aprender',
  'tab.settings': 'Ajustes',
  'learn.title': 'Aprender',
  'learn.section.startHere': 'Empieza aquí',
  'learn.section.everyDay': 'Cada día',
  'learn.section.understanding': 'Comprender',
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
  'settings.intro': 'Cómo se lee la aplicación y cómo se comporta mientras rezas.',
  'settings.language': 'Idioma',
  'settings.display': 'Visualización',
  'settings.transliteration': 'Transliteración',
  'settings.translation': 'Traducción',
  'settings.duringPrayer': 'Durante la oración',
  'settings.keepAwake': 'Mantener la pantalla encendida',
  'welcome.title': 'La paz sea contigo',
  'welcome.man': 'Hombre',
  'welcome.woman': 'Mujer',
  'settings.guidance': 'Guía de oración para',
  'common.back': 'Atrás',
};

export const UI: Record<Locale, Overrides> = { en: EN, ar: AR, fr: FR, es: ES };

/** The string for a key, falling back to English whenever a locale lacks it. */
export function ui(locale: Locale, key: UIKey): string {
  return UI[locale][key] ?? EN[key];
}
