import { ref } from '../model';
import { hadith } from '../sources';
import type { Reference } from '../types';

/**
 * The five daily prayers, each with a page of its own — what it is, what it
 * is worth, and the door to praying it.
 *
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Iyad's brief (3 Sep 2026): the Every-prayer rows used to open the step
 * guides; a reference row should open a reference. These pages answer "why
 * this one matters", with the guide as the framed answer's own door — the
 * same shape the chosen prayers (witr, tahajjud) already have.
 *
 * ## How every narration here was sourced
 *
 * Each was located in the hadith corpus (`.cache/hadith`) by searching its
 * Arabic matn, and the display number was taken from the record itself —
 * including the Sahih Muslim numbering mapping this repo carries a scar
 * about: the corpus's sequential numbers resolve to the standard (Abdul
 * Baqi) numbers via the record's own `arabicnumber` field. Nothing below
 * was cited from memory. Abu Dawud 1269 is outside the two Sahihs and
 * carries its grading (sahih — Al-Albani; Zubair Ali Zai concurs in the
 * corpus record) printed, per the app's graded-sunan precedent.
 *
 * ## Two deliberate absences
 *
 * The famous "sit until sunrise for a Hajj and Umrah reward" virtue
 * (Tirmidhi) is NOT here: it is not in the two Sahihs and its grading
 * needs the reviewer's ruling before this app prints it. And Maghrib
 * carries no prayer-specific virtue at all, because no strongly
 * authenticated one was found — the rule is to leave out what cannot be
 * placed, not to stretch a weak narration over the gap.
 *
 * ## One correction the famous lists need
 *
 * "The two rakʿahs of Fajr are better than the world" (Muslim 725a) is
 * about the SUNNAH pair prayed before the farḍ, not the farḍ itself. It
 * gets its own section so the two are never conflated.
 */

export const FAJR_PAGE: Reference = {
  id: 'fajr',
  surface: 'pray',
  title: 'Fajr',
  subtitle: 'The dawn prayer, and what it is worth',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 2,
    relatedContent: [ref('guide', 'fajr'), ref('reference', 'missed')],
  },
  quickFacts: [
    { label: 'When', value: 'From first light until sunrise' },
    { label: 'How many', value: 'Two rakʿahs, recited aloud' },
    { label: 'How', value: 'Pray Fajr', href: '/guide/fajr' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is Fajr?',
      promote: 'hero',
      body:
        'Two rakʿahs between first light and sunrise — the shortest of the five, and the one the Prophet ﷺ spoke about the most.',
      sources: [hadith('muslim', '657a', { grading: 'sahih', role: 'virtue' })],
    },
    {
      id: 'worth',
      heading: 'Why is it worth getting up?',
      body: 'Because more was promised for this one than for any other.',
      bullets: [
        '**Paradise, promised plainly** — whoever prays the two cool prayers, Fajr and ʿAsr, enters the Garden.',
        '**The day under protection** — the one who prays it is in the covenant of Allah.',
        '**The hardest prayer for a hypocrite** — and if people knew what is in it, they would come even crawling.',
      ],
      sources: [
        hadith('bukhari', '574', { grading: 'sahih', role: 'virtue' }),
        hadith('bukhari', '657', { grading: 'sahih', role: 'virtue' }),
      ],
    },
    {
      id: 'sunnah-pair',
      heading: 'What are the two rakʿahs before it?',
      body:
        'A short voluntary prayer, prayed quietly before the fajr itself — the sunnah the Prophet ﷺ weighed against everything.',
      sources: [hadith('muslim', '725a', { grading: 'sahih', role: 'virtue' })],
      note:
        'This narration is about the sunnah pair, not the farḍ — two small extra rakʿahs, and they are the ones "better than this world and what it contains".',
    },
    {
      id: 'slept',
      heading: 'What if I sleep through it?',
      body:
        'Pray it when you wake. Sleeping through a prayer is not the sin the whisper at 9am says it is — the prayer is simply owed when the eyes open, and the page on missing a prayer walks through exactly what to do.',
    },
  ],
};

export const DHUHR_PAGE: Reference = {
  id: 'dhuhr',
  surface: 'pray',
  title: 'Dhuhr',
  subtitle: 'The midday prayer, in the middle of everything else',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 2,
    relatedContent: [ref('guide', 'dhuhr'), ref('reference', 'missed')],
  },
  quickFacts: [
    { label: 'When', value: 'From just past midday until ʿAsr' },
    { label: 'How many', value: 'Four rakʿahs, recited silently' },
    { label: 'How', value: 'Pray Dhuhr', href: '/guide/dhuhr' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is Dhuhr?',
      promote: 'hero',
      body:
        'Four rakʿahs once the sun has passed its height — the first prayer of the working day, prayed silently, and one of the five the Prophet ﷺ compared to a river at your door.',
      sources: [hadith('bukhari', '528', { grading: 'sahih', role: 'virtue' })],
    },
    {
      id: 'rounds',
      heading: 'What are the four before and after?',
      body:
        'Dhuhr carries the largest voluntary escort of the five: four rakʿahs before it and more after. Keeping them was tied to a promise no other rawatib carries in these words.',
      sources: [
        hadith('abu-dawud', '1269', { grading: 'sahih', gradedBy: 'Al-Albani', role: 'virtue' }),
      ],
    },
    {
      id: 'work',
      heading: 'What if I am at work?',
      body:
        'Dhuhr is four silent rakʿahs — a few minutes in any clean, quiet corner. If the window closes on you anyway, the page on missing a prayer walks through catching it up.',
    },
  ],
};

export const ASR_PAGE: Reference = {
  id: 'asr',
  surface: 'pray',
  title: 'ʿAsr',
  subtitle: 'The afternoon prayer, and the weight it carries',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 2,
    relatedContent: [ref('guide', 'asr'), ref('reference', 'missed')],
  },
  quickFacts: [
    { label: 'When', value: 'From mid-afternoon until sunset' },
    { label: 'How many', value: 'Four rakʿahs, recited silently' },
    { label: 'How', value: 'Pray ʿAsr', href: '/guide/asr' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is ʿAsr?',
      /* Citation-free frame, like Maghrib's — every strong ʿAsr narration
         keeps its full isnad in the corpus (their matns are too short for
         the cross-check's ten-word window to swap in HadeethEnc's matn-only
         text), and a 750-character hero is a wall, not an answer. The
         teaching-check caught exactly that; the four narrations live in
         the weight section below, where quote weight and the sheet fit. */
      promote: 'hero',
      body:
        'Four silent rakʿahs in the last stretch of the afternoon, prayed while the day is still busy — which is exactly why so much was said about it.',
    },
    {
      id: 'weight',
      heading: 'Why does it matter so much?',
      body: 'Four narrations give this one afternoon prayer unusual weight.',
      bullets: [
        '**Never the Fire** — whoever prays before the sun rises and before it sets, the Prophet ﷺ said, will not enter it.',
        '**The two cool prayers** — Fajr and ʿAsr together carry the plain promise of Paradise.',
        '**The changing of the guard** — the angels of night and day overlap at Fajr and ʿAsr, and it is your prayer they report.',
        '**And a warning kept in the same collection** — the Prophet ﷺ said that abandoning ʿAsr empties the day’s deeds. It is the one prayer he singled out that way.',
      ],
      sources: [
        hadith('muslim', '634a', { grading: 'sahih', role: 'virtue' }),
        hadith('bukhari', '574', { grading: 'sahih', role: 'virtue' }),
        hadith('bukhari', '555', { grading: 'sahih', role: 'virtue' }),
        hadith('bukhari', '553', { grading: 'sahih', role: 'virtue' }),
      ],
    },
  ],
};

export const MAGHRIB_PAGE: Reference = {
  id: 'maghrib',
  surface: 'pray',
  title: 'Maghrib',
  subtitle: 'The sunset prayer, and the day closed',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 2,
    beginnerPriority: 2,
    relatedContent: [ref('guide', 'maghrib'), ref('reference', 'missed')],
  },
  quickFacts: [
    { label: 'When', value: 'From just after sunset until ʿIsha' },
    { label: 'How many', value: 'Three rakʿahs — the first two aloud' },
    { label: 'How', value: 'Pray Maghrib', href: '/guide/maghrib' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is Maghrib?',
      /* A frame with no hero text, deliberately: no strongly authenticated
         virtue names Maghrib alone, and the rule is to leave out what
         cannot be placed rather than stretch a weak narration. */
      promote: 'hero',
      body:
        'Three rakʿahs as the light goes — the only odd count of the five, and the first prayer said aloud since dawn.',
    },
    {
      id: 'after',
      heading: 'What is prayed after it?',
      body:
        'Two quiet rakʿahs, part of the twelve daily voluntary rakʿahs the Prophet ﷺ tied to a house built in Paradise.',
      sources: [hadith('muslim', '728a', { grading: 'sahih', role: 'virtue' })],
    },
    {
      id: 'timing',
      heading: 'Does it have to be right at sunset?',
      body:
        'Its window runs until ʿIsha, but it is the shortest window of the five — which is why Maghrib is the prayer most often prayed the moment it arrives.',
    },
  ],
};

export const ISHA_PAGE: Reference = {
  id: 'isha',
  surface: 'pray',
  title: 'ʿIsha',
  subtitle: 'The night prayer, and the night banked',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 2,
    relatedContent: [ref('guide', 'isha'), ref('hisn', '1269267')],
  },
  quickFacts: [
    { label: 'When', value: 'From nightfall until the middle of the night' },
    { label: 'How many', value: 'Four rakʿahs — the first two aloud' },
    { label: 'How', value: 'Pray ʿIsha', href: '/guide/isha' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is ʿIsha?',
      promote: 'hero',
      body:
        'Four rakʿahs once night has settled — and prayed in congregation, it is counted like standing half the night in prayer.',
      sources: [hadith('muslim', '656a', { grading: 'sahih', role: 'virtue' })],
    },
    {
      id: 'heavy',
      heading: 'Is it hard to end the day with it?',
      body:
        'It is meant to be the easy one to skip — which is exactly what the Prophet ﷺ said about it: no prayer sits heavier on a hypocrite than ʿIsha and Fajr, and if people knew what was in them they would come crawling. Praying it is quietly deciding which kind of person the day ends as.',
      sources: [hadith('bukhari', '657', { grading: 'sahih', role: 'virtue' })],
    },
  ],
};
