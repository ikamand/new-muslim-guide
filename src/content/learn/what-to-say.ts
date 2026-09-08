import { note, ref } from '../model';
import { Recitations } from '../recitations';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English, unreviewed for substance.
 *
 * The lesson Iyad's curriculum update commissions for "How to pray": the
 * words of the prayer gathered in one place, each with what it means and
 * where it falls. Plan: `docs/curriculum-update-plan.md`.
 *
 * ## Not one Arabic character is written here
 *
 * Every text is `Recitations.*` from `recitations.ts`, rendered through the
 * same card the prayer steps use, so a correction there lands here and on
 * the mat at once. Al-Fatihah is pointed at rather than rendered: it has its
 * own page and its own screen, verse by verse with audio, and printing seven
 * verses a third time is how two versions of a Qur'anic text end up in one
 * app.
 *
 * ## The recordings are not here yet
 *
 * `audio.ts` has the surahs and none of the prayer's own words, so the
 * recitation cards on this page show no practice link until those clips are
 * recorded (the gate in `docs/audio-manifest.csv`). The third quick fact
 * used to claim every text had a recording; it was false, and now points at
 * Al-Fatihah, which does.
 *
 * ## What is new here, and what is not
 *
 * The texts are the app's, already cited on the guide step where each is
 * said. The only new claims are placement: which position, which rakʿah,
 * how many times. Each of those restates what `buildPrayer` in `prayers.ts`
 * already encodes, so the page can be checked against the guide it
 * describes. The takbir's section is the one that cites, because it makes
 * the one placement claim the guide states from a narration of its own.
 *
 * ## Why the sections are not cited one by one
 *
 * The narrations behind the tashahhud and the salawat contain the words
 * themselves. Printed under a card that also prints them, the page would say
 * the same words twice, which `style:check` warns about and the istikhara
 * page once did. So the words carry their citations on the guide steps, and
 * this page carries the one general note saying so. It
 * sits on the Al-Fatihah section rather than the hero: a hero that cites
 * must cite something with a text, and a general note has none.
 */
export const WHAT_TO_SAY: Reference = {
  id: 'what-to-say',
  surface: 'learn',
  title: 'What to say in prayer',
  subtitle: 'The words, what they mean, and where each one falls',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 6,
    beginnerPriority: 1,
    tags: ['first-day', 'arabic', 'audio'],
    relatedContent: [
      ref('reference', 'how-prayer-works'),
      ref('reference', 'al-fatihah'),
      ref('guide', 'fajr'),
    ],
  },
  quickFacts: [
    { label: 'How many', value: 'Ten short texts. Most are one line', emphasis: true },
    { label: 'In Arabic', value: 'Yes, all of it. Read from the screen until it sticks' },
    { label: 'To hear it', value: 'Al-Fatihah, verse by verse, with the reciter', href: '/surah/1' },
  ],
  sections: [
    {
      id: 'why',
      heading: 'Why is it all in Arabic?',
      promote: 'hero',
      body:
        'Because every Muslim, in every country, says the same words. That is why you can walk into any mosque on earth and pray behind whoever is leading. The words are fewer than they look: ten short texts, and most of them are a single line. Read them from the screen until they stick, and know what you are saying while you learn to say it.',
    },
    {
      id: 'takbir',
      heading: 'What opens the prayer?',
      body:
        'Two words, said with your hands raised to shoulder level. From that moment you are in prayer. You say the same two words at every change of position afterwards: going down to bow, going down to prostrate, sitting up, and standing for the next rakʿah. It is the text you will say most.',
      says: Recitations.takbir,
      sources: [
        hadith('bukhari', '795', {
          book: 10,
          bookName: 'Call to Prayers (Adhaan)',
          inBookReference: 'Book 10, Hadith 190',
        }),
      ],
    },
    {
      id: 'opening',
      heading: 'What do I say once I am standing?',
      body:
        'Quietly, with your right hand resting over your left forearm on your chest, in the first rakʿah only. It is praise, said before anything is asked for.',
      says: Recitations.opening,
    },
    {
      id: 'refuge',
      heading: 'What is the line before the Qur’an?',
      body:
        'Still quietly, once, before you recite. A single line asking Allah’s protection from Shayṭān.',
      says: Recitations.taawwudh,
    },
    {
      id: 'fatihah',
      heading: 'What do I recite?',
      body:
        'Al-Fatihah, in every rakʿah of every prayer. Aloud in some prayers and quietly in others; the guide tells you which. It is the one text the prayer cannot do without, and it has a page and a screen of its own, verse by verse, with the recording against each verse.\n\nIn the first two rakʿahs a short surah follows it. Al-Ikhlas is where most people start. It is not required, and a prayer of Al-Fatihah alone is complete.',
      sources: [
        general(
          'The words on this page are the ones the prayer guides give at each step, and each carries its own citation on the step where it is said. What this page adds is where each one falls, which follows the guides.',
        ),
      ],
      notes: [
        note(
          'practical',
          'Learn Al-Fatihah first and the rest of this page second. Until you know it, read it from the screen, and say what you know of it.',
        ),
      ],
    },
    {
      id: 'bow',
      heading: 'What do I say bowing?',
      body:
        'Bent from the waist with your back straight and your hands on your knees. Once you have settled there, three times.',
      says: Recitations.rukuTasbih,
    },
    {
      id: 'rise',
      heading: 'What do I say standing back up?',
      body:
        'As you rise from bowing, until you are standing upright and still. The first half says that Allah hears you; the second answers it with praise.',
      says: Recitations.rising,
    },
    {
      id: 'prostrate',
      heading: 'What do I say prostrating?',
      body:
        'With your forehead, nose, palms, knees and toes on the ground. Once settled, three times. You prostrate twice in every rakʿah, with a short sitting between.',
      says: Recitations.sujudTasbih,
    },
    {
      id: 'between',
      heading: 'What do I say sitting between them?',
      body: 'Sitting up between the two prostrations. Three words.',
      says: Recitations.betweenProstrations,
    },
    {
      id: 'tashahhud',
      heading: 'What do I say in the sitting?',
      body:
        'Sitting, with your right index finger raised. After the second rakʿah in any prayer longer than two, and again at the very end. It greets Allah, the Prophet ﷺ, and every righteous servant, and closes with the testimony of faith. It is the longest text here, and the one that most repays learning slowly.',
      says: Recitations.tashahhud,
    },
    {
      id: 'salawat',
      heading: 'What follows it at the end?',
      body:
        'In the final sitting only, straight after the tashahhud. Prayers on the Prophet ﷺ and his family, as they were sent on Ibrahim.',
      says: Recitations.salawat,
    },
    {
      id: 'salam',
      heading: 'What ends the prayer?',
      body:
        'Turn your head to the right and say it. Then to the left, and say it again. The prayer ends on the second one. You are greeting whoever is beside you, and the angels, so you turn even when you pray alone.',
      says: Recitations.taslim,
    },
  ],
};
