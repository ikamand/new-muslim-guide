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
 * Qiyam prayer / Tahajjud.
 *
 * One page since 13 Sep 2026, where there were two, "Tahajjud" and "Qiyam
 * al-Layl", split on a difference the sources do not support. The old pages
 * said qiyam al-layl was prayer BEFORE sleeping and tahajjud prayer after.
 * Qiyam al-layl is the umbrella term for any voluntary prayer at night after
 * Isha, before sleep or after it (IslamWeb 138716, IslamQA 305489), and
 * tahajjud is that prayer after sleep in the word's strict sense, while most
 * jurists use it for night prayer at any time (IslamQA 143240, citing
 * al-Mawsuʿah al-Fiqhiyyah). Iyad named the page, and put the fact that
 * matters into one sentence: qiyam becomes tahajjud if you sleep first.
 *
 * Also corrected in the merge (docs/night-prayers-accuracy.md):
 * - the tahajjud page argued from Qur'an 17:79's "additional" that the prayer
 *   "is not owed"; the tafsir reads the word as about the Prophet ﷺ himself
 *   (Ibn Kathir), so the page no longer argues from it (§5d);
 * - "the deeds God loves most, the small ones kept up" cited Muslim 783,
 *   which rendered ʿAlqama's question to ʿAisha; Bukhari 6465 says it (§5b);
 * - "nobody is doing the lesser one" is gone: late in the night, and after
 *   sleep, is better (Muslim 755, IslamQA 305489) (§3).
 *
 * `reference:tahajjud` and `guide:tahajjud` migrate here in
 * `progress-keys.ts`, so nobody's ticks are lost.
 *
 * ⚠️ REVIEW REQUIRED — model-written English over opened sources. What a
 * reviewer owns: whether "qiyam becomes tahajjud if you sleep first" should
 * lead, given that most jurists use the two words for the same thing.
 */
export const QIYAM_AL_LAYL: Reference = {
  id: 'qiyam-al-layl',
  surface: 'learn',
  title: 'Qiyam prayer / Tahajjud',
  subtitle: 'Praying at night, and how small it is allowed to be',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 3,
    beginnerPriority: 3,
    relatedContent: [ref('guide', 'qiyam'), ref('reference', 'witr'), ref('reference', 'dua-and-dhikr')],
  },
  quickFacts: [
    { label: 'When', value: 'After Isha until Fajr. Best in the last third of the night' },
    { label: 'How many', value: 'Two at a time. Two rakʿahs is already a night prayer' },
    { label: 'Do I have to?', value: 'No. Nobody is behind for not praying it', emphasis: true },
    { label: 'How', value: 'Pray two rakʿahs', href: '/guide/qiyam' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is it?',
      promote: 'hero',
      body:
        'Qiyam al-layl means standing at night: any voluntary prayer after Isha and before Fajr, two rakʿahs at a time, as many as you like. It is the same prayer you already know.',
      sources: [
        hadith('muslim', '749', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Every prayer at night is qiyam al-layl; tahajjud is prayer after sleep',
          author: 'IslamWeb, fatwa 138716',
          url: 'https://www.islamweb.net/ar/fatwa/138716/',
        }),
        scholarly({
          work: 'Qiyam al-layl is after Isha, whether or not sleep came first',
          author: 'Islam Question & Answer, fatwa 305489',
          url: 'https://islamqa.info/ar/answers/305489',
        }),
      ],
    },
    {
      id: 'tahajjud',
      heading: 'When is it called tahajjud?',
      body:
        'When you sleep first. Qiyam al-layl prayed after waking from sleep is tahajjud. Many scholars use the word for any prayer at night, so you will hear both names for the same prayer.',
      note: 'If you are unsure which you prayed, it does not affect whether it counted.',
      sources: [
        scholarly({
          work: 'The difference between tahajjud and qiyam al-layl',
          author: 'Islam Question & Answer, fatwa 143240',
          school: 'the majority',
          url: 'https://islamqa.info/en/answers/143240',
        }),
      ],
    },
    {
      id: 'why',
      heading: 'Why pray it?',
      body:
        'The Prophet ﷺ called prayer at night the best prayer after the obligatory ones, and the Qur’an tells him to keep part of the night for it as something extra. It is a confirmed sunnah, not an obligation, and nobody is behind for not praying it.',
      sources: [
        hadith('muslim', '1163', { grading: 'sahih', role: 'virtue' }),
        quran(17, 79, { surahName: 'Al-Isra' }),
        scholarly({
          work: 'Qiyam al-layl is a confirmed sunnah',
          author: 'Islam Question & Answer, fatwa 50070',
          url: 'https://islamqa.info/en/answers/50070',
        }),
      ],
    },
    {
      id: 'best',
      heading: 'When is the best time?',
      promote: 'quote',
      body:
        'The last third of the night, and after sleeping. The Prophet ﷺ said that when the last third of the night remains, our Lord asks who is calling on Him, that He may answer, and who is asking forgiveness, that He may forgive. Any time after Isha still counts.',
      sources: [
        hadith('bukhari', '1145', { grading: 'sahih', role: 'virtue' }),
        scholarly({
          work: 'Qiyam al-layl is after Isha, whether or not sleep came first',
          author: 'Islam Question & Answer, fatwa 305489',
          url: 'https://islamqa.info/ar/answers/305489',
        }),
      ],
      notes: [
        note(
          'practical',
          'To start, set an alarm twenty minutes before Fajr. You are already waking for Fajr; this is standing up a little earlier.',
          { sources: [general('Practical advice, not a ruling.')] },
        ),
      ],
    },
    {
      id: 'how-little',
      heading: 'How little counts?',
      promote: 'quote',
      body:
        'There is no minimum to reach and no number to work up to. Two rakʿahs, on one night, is the thing itself. The Prophet ﷺ said the deeds God loves most are the ones kept up, even if they are few.',
      sources: [hadith('bukhari', '6465', { grading: 'sahih', role: 'virtue' })],
    },
    {
      id: 'witr',
      heading: 'Where does witr go?',
      body:
        'At the end, to close your night prayer. If you are not sure you will wake, pray witr before you sleep, and if you then wake, pray two at a time without praying witr again. A night has only one witr.',
      sources: [
        hadith('muslim', '755', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '990', { grading: 'sahih', role: 'practice' }),
        hadith('abu-dawud', '1439', { grading: 'sahih', role: 'practice' }),
      ],
    },
    {
      id: 'ramadan',
      heading: 'Where will I hear these words?',
      body:
        'In Ramadan, the night prayer at the mosque after Isha is called taraweeh. In the last ten nights many mosques hold a second prayer late in the night and call it qiyam. It is all night prayer, and you are welcome at it.',
      sources: [
        hadith('bukhari', '2009', { grading: 'sahih', role: 'virtue' }),
        scholarly({
          work: 'Praying taraweeh after Isha and qiyam late in the last ten nights',
          author: 'Islam Question & Answer, fatwa 109768',
          url: 'https://islamqa.info/en/answers/109768',
        }),
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
    relatedContent: [ref('reference', 'qiyam-al-layl'), ref('guide', 'witr')],
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
