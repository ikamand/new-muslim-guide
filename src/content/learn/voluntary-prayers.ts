import { note, ref } from '../model';
import { Recitations } from '../recitations';
import { general, hadeethEnc, hadith, quran } from '../sources';
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
        hadith('muslim', '783', { grading: 'sahih', role: 'virtue' }),
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
      id: 'words',
      heading: 'The words',
      body:
        'Said after the two rakʿahs. Where it says “this matter”, name the thing you are deciding.',
      says: Recitations.istikhara,
      sources: [hadeethEnc('bukhari', '3293', { grading: 'sahih', role: 'practice' })],
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

/**
 * Qiyam al-Layl.
 *
 * The app already defined this word — at the foot of the tahajjud page, to say
 * what tahajjud is NOT — and then offered nowhere to go. Somebody meets
 * "qiyam" announced at a mosque in their first Ramadan and cannot look it up.
 *
 * ⚠️ REVIEW REQUIRED — model-written English over citations read from the
 * collections. The framing a reviewer owns: whether separating this from
 * tahajjud helps a beginner or just gives them a second thing to be unsure
 * about. The difference is one fact, and both pages have to carry it plainly.
 */
export const QIYAM_AL_LAYL: Reference = {
  id: 'qiyam-al-layl',
  surface: 'learn',
  title: 'Standing at night',
  subtitle: 'Qiyam al-Layl, and how it differs from tahajjud',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 2,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'tahajjud'), ref('reference', 'witr')],
  },
  sections: [
    {
      id: 'what',
      heading: 'What it is',
      body:
        'Praying at night, before you have slept. Any amount, any part of the night after Isha. It is the same prayer you already know — two rakʿahs at a time, as many times as you want.',
      sources: [hadith('muslim', '749', { grading: 'sahih', role: 'practice' })],
    },
    {
      id: 'difference',
      heading: 'The one thing that separates it from tahajjud',
      body:
        'Whether you slept. Pray at night before sleeping and it is qiyam al-layl; sleep first, wake, and pray, and that is tahajjud. Both are voluntary, both are the same movements, and nobody is doing the lesser one.',
      note: 'This is the whole difference. If you are unsure which you prayed, it does not affect whether it counted.',
    },
    {
      id: 'ramadan',
      heading: 'Where you will hear the word',
      body:
        'In Ramadan, mosques announce “qiyam” for the long night prayers in the last ten nights. Taraweeh is the same family of prayer. You are welcome at it, you can leave when you need to, and nobody is counting your rakʿahs.',
      sources: [general('Ordinary description of what happens at a mosque in Ramadan, claiming nothing about the ruling.')],
    },
    {
      id: 'close',
      heading: 'Finish with witr',
      body:
        'Whatever you pray at night, end it with witr — a single rakʿah that makes the night’s total odd. It is what closes the night prayer.',
      sources: [hadith('bukhari', '990', { grading: 'sahih', role: 'practice' })],
    },
  ],
};

/**
 * Witr.
 *
 * The one voluntary prayer whose shape a beginner gets wrong unaided. The
 * others are all the two-rakʿah prayer they already pray five times a day;
 * this one is odd, and it comes last.
 *
 * ⚠️ REVIEW REQUIRED — model-written English over citations read from the
 * collections on 22 Aug 2026. What a reviewer owns: whether teaching the
 * one-rakʿah form as the app's single path is right for a beginner when most
 * people around them will pray three.
 *
 * The number is not invented. Abu Dawud 1422 has the Prophet ﷺ naming five,
 * three and one as the reader's choice, and Muslim 752 states one at the end
 * of the night. The generated guide teaches one because one is complete on its
 * own and is the least that can go wrong; the page states the range.
 *
 * The qunut duʿa is deliberately absent. It is real, it is another Arabic text
 * needing a verified source, and a witr without it is valid.
 */
export const WITR: Reference = {
  id: 'witr',
  surface: 'learn',
  title: 'Witr',
  subtitle: 'The odd rakʿah that closes the night',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 2,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'tahajjud'), ref('reference', 'qiyam-al-layl')],
  },
  sections: [
    {
      id: 'what',
      heading: 'What it is',
      body:
        'The last prayer of your night, and an odd number of rakʿahs — which is what the word means. After Isha, any time until dawn. If you are going to pray at night, this is what you finish on.',
      sources: [hadith('muslim', '752', { grading: 'sahih', role: 'practice' })],
    },
    {
      id: 'how-many',
      heading: 'One, three or five — your choice',
      body:
        'The Prophet ﷺ named all three and left it to the person praying. One rakʿah is a complete witr; it is not a shortened version of something else. Most people pray three, and you will see that around you.',
      sources: [hadith('abu-dawud', '1422', { grading: 'sahih', role: 'practice' })],
      note: 'Start with one. It is the whole prayer, it takes a minute, and it is the version you are least likely to get wrong while you are learning.',
    },
    {
      id: 'when',
      heading: 'When to pray it',
      body:
        'Any time between Isha and dawn. If you know you will not wake up later, pray it before you go to sleep. If you do pray at night, leave it until the end — it is meant to be the last thing.',
      sources: [hadith('bukhari', '990', { grading: 'sahih', role: 'practice' })],
    },
  ],
};
