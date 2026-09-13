import { note, ref } from '../model';
import { Recitations } from '../recitations';
import { general, hadeethEnc, hadith, quran, scholarly } from '../sources';
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
  /*
    Titled with the name since 12 Sep 2026, as the chooser rows and Today's
    card already were; the English gloss moved into the subtitle. A header is
    what you read after tapping, and "Praying at night" under a row that said
    "Tahajjud" read as a wrong turn (Iyad, on the phone). And this title
    against "Standing at night" were near-synonyms, hiding the one fact that
    separates the two prayers. Same on the other three below; witr was the
    model.
  */
  title: 'Tahajjud',
  subtitle: 'Praying at night, and how small it is allowed to be',
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
  title: 'Istikhara',
  subtitle: 'Asking God to choose, and what it does not do',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 3,
    beginnerPriority: 3,
    relatedContent: [ref('guide', 'istikhara'), ref('reference', 'dua-and-dhikr'), ref('reference', 'held-off-times')],
  },
  quickFacts: [
    { label: 'When', value: 'Any time you have a real decision to make' },
    { label: 'How many', value: 'Two rakʿahs, then the dua' },
    { label: 'A sign?', value: 'No. It does not promise a dream or a feeling', emphasis: true },
    { label: 'How', value: 'Pray two rakʿahs', href: '/guide/istikhara' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is istikhara?',
      /*
        No promotion here. "What do I say?" below already prints the dua
        through `says`, and Bukhari 3293 IS that dua with its chain attached —
        promoting it would put the same words on the page twice, once as a
        thousand characters of narration and once as the thing to recite.
      */
      body:
        'Two rakʿahs and a dua, prayed when you have a decision to make. Jabir reported that the Prophet ﷺ taught it for every matter the way he taught a surah of the Qur’an, which tells you how ordinary it was meant to be, and how often.',
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
        'This is the part people are told wrong. The dua asks God, if the thing is good for you, to bring it about and make it easy, and if it is bad for you, to turn it away and turn you away from it. It does not promise a sign, a dream or a feeling. You pray, and then you decide, and what follows is the answer.',
      sources: [
        general('The dua says what it asks for, and it does not ask for a sign. Waiting for one is an addition people make rather than something the prayer contains.'),
      ],
      note: 'You still have to think, ask people who know, and weigh it up. Istikhara goes alongside that, not instead of it.',
    },
    {
      id: 'when',
      heading: 'What can I ask about?',
      body:
        'Any time except the times when prayer is held off, and about anything you genuinely have a choice in: a job, a move, a marriage, something smaller. Not about whether to do something already settled as right or wrong; there is nothing to ask about there.',
      sources: [general('Ordinary explanation of scope, following from what the dua asks.')],
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
  title: 'The prayer of repentance',
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
 *
 * ⚠️ And the closing section, rewritten 13 Sep 2026. Today now offers witr
 * after ʿIshāʾ and this page after the middle of the night, in that order, on
 * Iyad's call (`lib/night.ts`). The old closing said to end whatever you pray
 * with witr, which read after a witr card is an instruction to pray it twice.
 * It now says not to, on Abu Dawud 1439. Whether "pray two at a time as usual"
 * is the right thing to tell someone who prayed witr early is the reviewer's.
 */
export const QIYAM_AL_LAYL: Reference = {
  id: 'qiyam-al-layl',
  surface: 'learn',
  title: 'Qiyam al-Layl',
  subtitle: 'Standing at night, and how it differs from tahajjud',
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
        'End the night with witr, a single rakʿah that makes the night’s total odd. If you already prayed witr after Isha, pray two at a time as usual and do not pray it again. A night has only one witr.',
      sources: [
        hadith('bukhari', '990', { grading: 'sahih', role: 'practice' }),
        hadith('abu-dawud', '1439', { grading: 'sahih', role: 'practice' }),
      ],
    },
  ],
};

/**
 * Witr.
 *
 * The one voluntary prayer whose shape a beginner gets wrong unaided: it is
 * odd, and it closes the night.
 *
 * ⚠️ REVIEW REQUIRED — model-written English over citations read from the
 * collections. Rewritten 13 Sep 2026 after the audit in
 * `docs/night-prayers-accuracy.md` (§2, §5, §6):
 *
 * - It taught one rakʿah as the path. It now teaches three, two then one, as
 *   the guide does. One with nothing before it is disliked by most scholars
 *   (IslamWeb 92752) and not valid for the Hanafis (SeekersGuidance), and it
 *   is not what a beginner sees beside them. Separating the two and the one is
 *   the majority position (IslamWeb 415267) and Ibn ʿUmar's practice
 *   (Bukhari 991).
 * - Its hero was Muslim 752, whose printed English says "at the end of the
 *   prayer" where the Arabic says "the end of the night". Bukhari 998 replaces
 *   it.
 * - "What if I sleep through it?" was answered with Bukhari 990, which says
 *   nothing about it. Abu Dawud 1431 answers it.
 * - Witr may come before qiyam or tahajjud, or after (Iyad, with IslamWeb
 *   2165): early for someone unsure of waking, at the end for someone who will
 *   wake (Muslim 755), and never twice (Abu Dawud 1439).
 *
 * What a reviewer owns: the Hanafi note, whether "dislike" is the right word
 * to put in front of a beginner, and how making up a missed witr is taught
 * (the page says only to pray it on waking).
 *
 * The qunut dua is still absent. It is in the dua book; a step for it needs a
 * transliteration from a source and a recording.
 */
export const WITR: Reference = {
  id: 'witr',
  surface: 'learn',
  title: 'Witr',
  subtitle: 'The odd-numbered prayer that closes the night',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 3,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'tahajjud'), ref('reference', 'qiyam-al-layl')],
  },
  /*
    All four rows earn their place here, which is why witr is one of the two
    pages this format was piloted on. The other is `food.ts`, which gets two —
    if the block only looks right where every row happens to apply, it is
    structure for its own sake.

    "Do I have to?" answers in the words somebody has. It said only "No", two
    sections above a printed narration calling witr "a duty for every Muslim"
    and without a word about the school that holds it required. It now names
    both, in words a reader owns.
  */
  quickFacts: [
    { label: 'When', value: 'After Isha until Fajr' },
    { label: 'How many', value: 'Three: two rakʿahs, then one' },
    {
      label: 'Do I have to?',
      value: 'For most scholars no. The Hanafi school says yes',
      emphasis: true,
    },
    { label: 'How', value: 'Pray two, then one', href: '/guide/witr' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is witr?',
      body: 'Witr means odd. It is an odd number of rakʿahs prayed after Isha, and it is the last prayer of your night.',
      // The page's answer, printed rather than filed.
      promote: 'hero',
      sources: [hadith('bukhari', '998', { grading: 'sahih', role: 'practice' })],
    },
    {
      id: 'how-many',
      heading: 'How many rakʿahs?',
      body:
        'Three is what you will see most: two rakʿahs ending with the salam, then one more. The Prophet ﷺ named five, three and one, and left the choice to the person praying.',
      promote: 'quote',
      sources: [
        hadith('abu-dawud', '1422', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '991', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Praying the three-rakʿah witr prayer two rakʿahs and then one',
          author: 'IslamWeb, fatwa 415267',
          school: 'the majority',
          url: 'https://www.islamweb.net/en/fatwa/415267/',
        }),
        scholarly({
          work: 'Performing only one rakʿah in witr prayer',
          author: 'IslamWeb, fatwa 92752',
          school: 'the majority',
          url: 'https://islamweb.net/en/fatwa/92752/',
        }),
      ],
      note: 'If you have already prayed at night, one rakʿah on the end is your witr. One on its own, with nothing before it, still counts, but most scholars dislike it.',
      notes: [
        note(
          'differs',
          'At many mosques, especially Hanafi ones, witr is three rakʿahs together: a sitting after the second without the salam, then a third with the qunut before bowing. Pray it with them.',
          {
            sources: [
              scholarly({
                work: 'Details regarding witr, confirmed sunna, and non-confirmed sunna prayers',
                author: 'Faraz Rabbani, SeekersGuidance',
                school: 'Hanafi',
                url: 'https://seekersguidance.org/answers/hanafi-fiqh/details-regarding-witr-confirmed-sunna-and-non-confirmed-sunna-prayers/',
              }),
              scholarly({
                work: 'Should he pray behind those who pray witr with three rakʿahs and two tashahhuds?',
                author: 'Islam Question & Answer, fatwa 66613',
                url: 'https://islamqa.info/en/answers/66613',
              }),
            ],
            positions: [
              {
                school: 'Hanafi',
                position:
                  'Witr is required: three rakʿahs after Isha with one salam, sitting for the tashahhud after the second, and the qunut in the third before bowing.',
              },
            ],
          },
        ),
      ],
    },
    {
      id: 'when',
      heading: 'When do I pray it?',
      body:
        'Any time after Isha until Fajr, and it can come before your qiyam or tahajjud or after it. If you will wake to pray later in the night, leave it to the end, which is better. If you are not sure you will wake, pray it before you sleep.',
      promote: 'quote',
      sources: [
        hadith('muslim', '755', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '1178', { grading: 'sahih', role: 'practice' }),
      ],
    },
    {
      id: 'after',
      heading: 'What if I prayed it and then wake up?',
      body:
        'Pray as much as you like, two rakʿahs at a time, and do not pray witr again. A night has only one witr.',
      sources: [
        hadith('abu-dawud', '1439', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Witr may be prayed early in the night, and delaying it is better',
          author: 'IslamWeb, fatwa 2165',
          school: 'the majority',
          url: 'https://www.islamweb.net/ar/fatwa/2165/',
        }),
      ],
    },
    {
      id: 'missed',
      heading: 'What if I sleep through it?',
      body: 'Pray it when you wake up, or whenever you remember.',
      sources: [
        hadith('abu-dawud', '1431', { grading: 'sahih', role: 'practice' }),
        hadith('tirmidhi', '465', { grading: 'sahih', role: 'practice' }),
      ],
    },
  ],
};
