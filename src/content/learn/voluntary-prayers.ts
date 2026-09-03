import { ref } from '../model';
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
  quickFacts: [
    { label: 'When', value: 'The last part of the night, after you have slept' },
    { label: 'How many', value: 'Two rakʿahs. That is a whole tahajjud' },
    { label: 'Do I have to?', value: 'No. Nobody is behind for not praying it', emphasis: true },
    { label: 'How', value: 'Pray two rakʿahs', href: '/guide/tahajjud' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is tahajjud?',
      promote: 'hero',
      body:
        'A prayer in the last part of the night, after you have slept and before Fajr. The Qur’an tells the Prophet ﷺ to keep part of the night for it as something additional, and that word matters: it is not owed. Nobody is behind for not praying it.',
      sources: [quran(17, 79, { surahName: 'Al-Isra' })],
    },
    {
      id: 'how-much',
      heading: 'How little counts?',
      promote: 'quote',
      body:
        'There is no minimum to reach and no number to work up to. Two rakʿahs, on one night, is the thing itself. People who pray it for decades mostly pray a little, often, which is the pattern the Prophet ﷺ described as the deeds God loves most, the small ones kept up.',
      sources: [
        hadith('muslim', '783', { grading: 'sahih', role: 'virtue' }),
      ],
      note: 'It is the same prayer you already know. Nothing about the movements or the words changes. Only the time, and that you chose to be there.',
    },
    {
      id: 'sleep',
      heading: 'What if I have not slept?',
      body:
        'Tahajjud is prayed after waking, which is what separates it from simply staying up late. If you have not slept, you are praying qiyam al-layl, which is also good, also voluntary, and not what this word means.',
      sources: [general('The distinction is in the word itself: tahajjud is from a root meaning to give up sleep, so there has to be sleep to give up.')],
    },
    {
      id: 'start',
      heading: 'How do I actually start?',
      body:
        'Set an alarm twenty minutes before Fajr rather than for the middle of the night. You are already going to be awake for Fajr; this is standing up a little earlier. Starting there is why people keep it.',
      sources: [general('Practical advice, not a ruling.')],
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
  quickFacts: [
    { label: 'When', value: 'Any time you have a real decision to make' },
    { label: 'How many', value: 'Two rakʿahs, then the duʿa' },
    { label: 'A sign?', value: 'No. It does not promise a dream or a feeling', emphasis: true },
    { label: 'How', value: 'Pray two rakʿahs', href: '/guide/istikhara' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is istikhara?',
      /*
        No promotion here. "What do I say?" below already prints the duʿa
        through `says`, and Bukhari 3293 IS that duʿa with its chain attached —
        promoting it would put the same words on the page twice, once as a
        thousand characters of narration and once as the thing to recite.
      */
      body:
        'Two rakʿahs and a duʿa, prayed when you have a decision to make. Jabir reported that the Prophet ﷺ taught it for every matter the way he taught a surah of the Qur’an, which tells you how ordinary it was meant to be, and how often.',
      },
    {
      id: 'words',
      heading: 'What do I say?',
      body:
        'Said after the two rakʿahs. Where it says “this matter”, name the thing you are deciding.',
      says: Recitations.istikhara,
      sources: [hadeethEnc('bukhari', '3293', { grading: 'sahih', role: 'practice' })],
    },
    {
      id: 'no-dream',
      heading: 'What sign should I expect?',
      body:
        'This is the part people are told wrong. The duʿa asks God, if the thing is good for you, to bring it about and make it easy, and if it is bad for you, to turn it away and turn you away from it. It does not promise a sign, a dream or a feeling. You pray, and then you decide, and what follows is the answer.',
      sources: [
        general('The duʿa says what it asks for, and it does not ask for a sign. Waiting for one is an addition people make rather than something the prayer contains.'),
      ],
      note: 'You still have to think, ask people who know, and weigh it up. Istikhara goes alongside that, not instead of it.',
    },
    {
      id: 'when',
      heading: 'What can I ask about?',
      body:
        'Any time except the times when prayer is held off, and about anything you genuinely have a choice in: a job, a move, a marriage, something smaller. Not about whether to do something already settled as right or wrong; there is nothing to ask about there.',
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
  quickFacts: [
    { label: 'When', value: 'After a sin, whenever you want' },
    { label: 'How many', value: 'Two rakʿahs' },
    { label: 'Do I have to?', value: 'No, repentance does not need it', emphasis: true },
    { label: 'How', value: 'Pray two rakʿahs', href: '/guide/tawba' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is it for?',
      promote: 'hero',
      body:
        'Abu Bakr reported that the Prophet ﷺ said no one does something wrong, then gets up and purifies himself, then prays, then asks God’s forgiveness, except that God forgives him. Wudu, two rakʿahs, and asking. Nothing more is needed.',
      sources: [
        hadeethEnc('abu-dawud', '65063', { grading: 'sahih', role: 'practice' }),
      ],
    },
    {
      id: 'not-required',
      heading: 'Do I have to pray it to be forgiven?',
      body:
        'You are forgiven by turning back to God and meaning it. There is no ceremony and nothing to perform. This prayer is something you may do, not a step you have missed. It exists because doing something with your body often helps when saying it in your head does not.',
      sources: [quran(39, 53, { surahName: 'Az-Zumar' })],
      note: 'There is no limit, and no shame in praying it often. Somebody who prays it twice in a week has not failed twice. They have turned back twice.',
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
  quickFacts: [
    { label: 'When', value: 'Any part of the night, before you sleep' },
    { label: 'How many', value: 'Two at a time, as many as you want' },
    { label: 'Do I have to?', value: 'No, none of the night prayer is owed', emphasis: true },
    { label: 'How', value: 'Pray two rakʿahs', href: '/guide/qiyam' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is qiyam al-layl?',
      promote: 'hero',
      body:
        'Praying at night, before you have slept. Any amount, any part of the night after Isha. It is the same prayer you already know: two rakʿahs at a time, as many times as you want.',
      sources: [hadith('muslim', '749', { grading: 'sahih', role: 'practice' })],
    },
    {
      id: 'difference',
      heading: 'How is it different from tahajjud?',
      body:
        'Whether you slept. Pray at night before sleeping and it is qiyam al-layl; sleep first, wake, and pray, and that is tahajjud. Both are voluntary, both are the same movements, and nobody is doing the lesser one.',
      note: 'This is the whole difference. If you are unsure which you prayed, it does not affect whether it counted.',
    },
    {
      id: 'ramadan',
      heading: 'Where will I hear the word?',
      body:
        'In Ramadan, mosques announce “qiyam” for the long night prayers in the last ten nights. Taraweeh is the same family of prayer. You are welcome at it, you can leave when you need to, and nobody is counting your rakʿahs.',
      sources: [general('Ordinary description of what happens at a mosque in Ramadan, not a ruling.')],
    },
    {
      id: 'close',
      heading: 'How do I finish?',
      body:
        'Whatever you pray at night, end it with witr, a single rakʿah that makes the night’s total odd. It is what closes the night prayer.',
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
  /*
    All four rows earn their place here, which is why witr is one of the two
    pages this format was piloted on. The other is `food.ts`, which gets two —
    if the block only looks right where every row happens to apply, it is
    structure for its own sake.

    "Do I have to?" answers in the words somebody has. The ruling underneath it
    is that witr is a strongly emphasised sunnah, and wajib to the Hanafis, but
    a page that says that has answered a scholar's question rather than the
    reader's.
  */
  quickFacts: [
    { label: 'When', value: 'After Isha, any time until dawn' },
    { label: 'How many', value: 'One, three or five. Any odd number, and one is enough' },
    {
      label: 'Do I have to?',
      value: 'No, but it is how the night prayer is closed',
      emphasis: true,
    },
    { label: 'How', value: 'Pray one rakʿah', href: '/guide/witr' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'Why an odd number?',
      body: 'Because that is what the word means, and it is what you finish the night on.',
      // The page's answer, printed rather than filed.
      promote: 'hero',
      sources: [hadith('muslim', '752', { grading: 'sahih', role: 'practice' })],
    },
    {
      id: 'how-many',
      heading: 'Is one really enough?',
      body:
        'Yes. The Prophet ﷺ named five, three and one, and left the choice to the person praying, so one is a complete witr rather than a shortened version of something else. Most people pray three, and you will see that around you.',
      promote: 'quote',
      sources: [hadith('abu-dawud', '1422', { grading: 'sahih', role: 'practice' })],
      note: 'Start with one. It is the whole prayer, it takes a minute, and it is the version you are least likely to get wrong while you are learning.',
    },
    {
      id: 'when',
      heading: 'What if I sleep through it?',
      body:
        'Pray it before you go to bed. Leaving it to the end of the night is better, but only if you are actually going to be awake. It is meant to be the last thing you pray, not the thing you missed.',
      sources: [hadith('bukhari', '990', { grading: 'sahih', role: 'practice' })],
    },
  ],
};
