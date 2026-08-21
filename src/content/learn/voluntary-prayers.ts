import { note, ref } from '../model';
import { general, hadeethEnc, quran } from '../sources';
import type { Reference } from '../types';

/**
 * The prayers you choose, explained rather than only demonstrated.
 *
 * ⚠️ REVIEW REQUIRED — model-written English over citations that were each
 * fetched and read rather than recalled. What a reviewer owns here is not the
 * references but the framing: whether "you do not have to" is said in a way
 * that lands as freedom rather than as "so don't bother", and whether the
 * istikhara page's insistence that no dream is coming is the right correction
 * to make to someone who has just heard about it from a cousin.
 *
 * These three exist as guides too — `PRAYER_SPECS` generates them, because
 * they are the ordinary two-rakʿah prayer and the app already knows how to
 * build that. A guide shows the movements. These pages answer the question the
 * movements cannot: why you are standing there.
 */

/**
 * Tahajjud.
 *
 * The hardest thing to get right here is scale. Someone three weeks in reads
 * "the night prayer" and pictures hours; the actual entry point is two rakʿahs
 * before Fajr, once, when you happen to wake. Saying that plainly is the
 * difference between a practice they start and one they admire from a distance.
 */
export const TAHAJJUD: Reference = {
  id: 'tahajjud',
  surface: 'learn',
  title: 'Praying at night',
  subtitle: 'Tahajjud, and how small it is allowed to be',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 3,
    beginnerPriority: 3,
    relatedContent: [ref('guide', 'tahajjud'), ref('reference', 'dua-and-dhikr')],
  },
  sections: [
    {
      id: 'what',
      heading: 'What it is',
      body:
        'A prayer in the last part of the night, after you have slept and before Fajr. The Qur’an tells the Prophet ﷺ to keep part of the night for it as something additional, and that word matters: it is not owed. Nobody is behind for not praying it.',
      sources: [quran(17, 79, { surahName: 'Al-Isra' })],
    },
    {
      id: 'how-much',
      heading: 'Two rakʿahs is tahajjud',
      body:
        'There is no minimum to reach and no number to work up to. Two rakʿahs, on one night, is the thing itself. People who pray it for decades mostly pray a little, often — which is the pattern the Prophet ﷺ described as the deeds God loves most, the small ones kept up.',
      sources: [
        general(
          'That the deeds God loves most are the constant ones, however small, is a narration in Sahih al-Bukhari. It is cited here without its number because the number could not be verified, and this app does not print a reference it has not checked.',
        ),
      ],
      note: 'It is the same prayer you already know. Nothing about the movements or the words changes — only the time, and that you chose to be there.',
    },
    {
      id: 'sleep',
      heading: 'You have to sleep first',
      body:
        'Tahajjud is prayed after waking, which is what separates it from simply staying up late. If you have not slept, you are praying qiyam al-layl — also good, also voluntary, and not what this word means.',
      sources: [general('The distinction is in the word itself: tahajjud is from a root meaning to give up sleep, so there has to be sleep to give up.')],
    },
    {
      id: 'start',
      heading: 'If you want to try it',
      body:
        'Set an alarm twenty minutes before Fajr rather than for the middle of the night. You are already going to be awake for Fajr; this is standing up a little earlier. Starting there is why people keep it.',
      sources: [general('Practical advice, claiming nothing about the ruling.')],
    },
  ],
};

/**
 * Istikhara.
 *
 * The correction this page exists to make is the dream. Almost everyone who
 * hears about istikhara hears that a sign follows — a colour, a dream, a
 * feeling — and then either waits for one that does not come, or reads meaning
 * into whatever happens next. The prayer asks God to make the better path
 * easier and the worse one harder. That is the whole mechanism.
 */
export const ISTIKHARA: Reference = {
  id: 'istikhara',
  surface: 'learn',
  title: 'Asking God to choose',
  subtitle: 'Istikhara, and what it does not do',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 3,
    beginnerPriority: 3,
    relatedContent: [ref('guide', 'istikhara'), ref('reference', 'dua-and-dhikr')],
  },
  sections: [
    {
      id: 'what',
      heading: 'What it is',
      body:
        'Two rakʿahs and a duʿa, prayed when you have a decision to make. Jabir reported that the Prophet ﷺ taught it for every matter the way he taught a surah of the Qur’an — which tells you how ordinary it was meant to be, and how often.',
      sources: [
        hadeethEnc('bukhari', '3293', { grading: 'sahih', role: 'practice' }),
      ],
    },
    {
      id: 'no-dream',
      heading: 'No dream is coming',
      body:
        'This is the part people are told wrong. The duʿa asks God, if the thing is good for you, to bring it about and make it easy, and if it is bad for you, to turn it away and turn you away from it. It does not promise a sign, a dream or a feeling. You pray, and then you decide, and what follows is the answer.',
      sources: [
        general('The duʿa says what it asks for, and it does not ask for a sign. Waiting for one is an addition people make rather than something the prayer contains.'),
      ],
      note: 'You still have to think, ask people who know, and weigh it up. Istikhara goes alongside that, not instead of it.',
    },
    {
      id: 'when',
      heading: 'When to pray it',
      body:
        'Any time except the times when prayer is held off, and about anything you genuinely have a choice in — a job, a move, a marriage, something smaller. Not about whether to do something already settled as right or wrong; there is nothing to ask about there.',
      sources: [general('Ordinary explanation of scope, following from what the duʿa asks.')],
    },
    {
      id: 'words',
      heading: 'The words',
      /*
        ⚠️ THE DUʿA TEXT IS NOT HERE YET, DELIBERATELY.

        It is long, and both places that print it — Sahih al-Bukhari via
        HadeethEnc 3293, and Hisn al-Muslim via cnt.islamhouse.com book 819
        page 5, phrase id 1269185 — carry the narrator's alternative inside
        the supplication: "…and the outcome of my affairs" OR "…my immediate
        and future affairs". Splicing the two produces a text nobody says, and
        choosing between them, along with where "and he names his need" sits,
        is an editorial decision this file will not make on its own.

        The provenance is recorded so whoever adds it does not have to find it
        again. HadeethEnc's English carries a transliteration in this app's own
        academic style, so all three lines can come from one source.
      */
      body:
        'The duʿa is a few lines long, and it is worth learning from someone who can hear you say it. It names what you are asking about, asks God to bring it about if it is good for you, and to take it away if it is not.',
      sources: [
        hadeethEnc('bukhari', '3293', { grading: 'sahih', role: 'practice' }),
      ],
      notes: [
        note(
          'practical',
          'The wording is not printed here yet. It is in Sahih al-Bukhari and in every duʿa collection, and it is being added with its full text rather than from memory.',
        ),
      ],
    },
  ],
};

/**
 * The prayer of repentance.
 *
 * Placed carefully: someone reaching for this has just done something they
 * feel bad about, and the last thing that helps is a page about conditions.
 * It leads with the narration because the narration is the reassurance.
 */
export const TAWBA_PRAYER: Reference = {
  id: 'tawba-prayer',
  surface: 'learn',
  title: 'The prayer after a sin',
  subtitle: 'Two rakʿahs, and what they are for',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 2,
    beginnerPriority: 3,
    relatedContent: [ref('guide', 'tawba'), ref('reference', 'repentance')],
  },
  sections: [
    {
      id: 'what',
      heading: 'What it is',
      body:
        'Abu Bakr reported that the Prophet ﷺ said no one does something wrong, then gets up and purifies himself, then prays, then asks God’s forgiveness, except that God forgives him. Wudu, two rakʿahs, and asking. That is the whole of it.',
      sources: [
        hadeethEnc('abu-dawud', '65063', { grading: 'sahih', role: 'practice' }),
      ],
    },
    {
      id: 'not-required',
      heading: 'Repentance does not need it',
      body:
        'You are forgiven by turning back to God and meaning it — there is no ceremony and nothing to perform. This prayer is something you may do, not a step you have missed. It exists because doing something with your body often helps when saying it in your head does not.',
      sources: [quran(39, 53, { surahName: 'Az-Zumar' })],
      note: 'There is no limit, and no shame in praying it often. Somebody who prays it twice in a week has not failed twice — they have turned back twice.',
    },
  ],
};
