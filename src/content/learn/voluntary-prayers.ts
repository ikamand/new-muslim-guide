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
 * The Hanafi way of witr, said the same way wherever the app teaches two
 * rakʿahs then one. docs/night-prayers-accuracy.md Part 2: that form "needs
 * the Hanafi sentence beside it". Shared so the two pages cannot drift apart.
 */
const HANAFI_WITR_NOTE = note(
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
);

/**
 * Qiyam prayer / Tahajjud.
 *
 * One page since 13 Sep 2026, where there were two, "Tahajjud" and "Qiyam
 * al-Layl", split on a difference the sources do not support. The old pages
 * said qiyam al-layl was prayer BEFORE sleeping and tahajjud prayer after.
 * Qiyam al-layl is the umbrella term for any voluntary prayer at night after
 * Isha, before sleep or after it (IslamWeb 138716, IslamQA 305489), and
 * tahajjud is that prayer after sleep in the word's strict sense, while many
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
 * lead, given that many jurists use the two words for the same thing.
 *
 * 13 Sep 2026: "Where does witr go?" became "What comes first?", the order of
 * the night in four lines (docs/night-prayers-accuracy.md Part 2). Iyad's
 * understanding was shafʿ and witr first, then qiyam, then tahajjud. The
 * sources put shafʿ and witr LAST, as the end of the one night prayer, with
 * early witr for someone who might not wake.
 *
 * 13 Sep 2026, final review: "What comes first?" carries the Hanafi note it
 * shares with Shafʿ and Witr, because the section teaches and draws two
 * rakʿahs then one.
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
    relatedContent: [ref('guide', 'qiyam'), ref('reference', 'witr'), ref('reference', 'taraweeh')],
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
          'To start, set an alarm twenty minutes or more before Fajr. You are already waking for Fajr; this is standing up a little earlier.',
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
      id: 'order',
      heading: 'What comes first?',
      body: 'One night prayer, with a fixed ending.',
      bullets: [
        '**After Isha**, its two sunnah rakʿahs.',
        '**Then your night prayer**, two rakʿahs at a time, as much as you like. After sleeping it is tahajjud, and in Ramadan it is taraweeh.',
        '**Last, shafʿ and witr**: two rakʿahs, then one, before Fajr.',
        '**Not sure you will wake?** Pray shafʿ and witr before you sleep. If you then wake, pray in twos and do not pray witr again.',
      ],
      timeline: ['start', 'pairs', 'closing', 'earlier'],
      notes: [HANAFI_WITR_NOTE],
      sources: [
        hadith('bukhari', '1180', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '990', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '998', { grading: 'sahih', role: 'practice' }),
        hadith('muslim', '755', { grading: 'sahih', role: 'practice' }),
        hadith('abu-dawud', '1439', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Shafʿ and witr are part of qiyam al-layl',
          author: 'IslamWeb, fatwa 416554',
          url: 'https://www.islamweb.net/ar/fatwa/416554/',
        }),
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
 * Shafʿ and Witr.
 *
 * ⚠️ REVIEW REQUIRED — model-written English over opened sources.
 *
 * Named "Witr" until 13 Sep 2026. Iyad renamed it after the second research
 * pass (docs/night-prayers-accuracy.md Part 2). Shafʿ is the even rakʿahs
 * prayed straight before witr (IslamWeb 18778), the two together close the
 * night prayer (IslamWeb 416554), and the app had called all three "witr"
 * without once saying the word shafʿ.
 *
 * What the page teaches, in order: what they are; that shafʿ is not the
 * sunnah of Isha; when (best last if you will wake, before sleep if you might
 * not, and with the imam in Ramadan); how (two, salam, one), with the Hanafi
 * way as the page's one red note; what to recite; the qunut, as something a
 * beginner does not need yet; praying witr and then waking; sleeping through
 * it.
 *
 * What a reviewer owns: the Hanafi sentence; "most scholars dislike" one
 * rakʿah on its own; and whether the qunut section says enough about the
 * schools without naming them.
 *
 * The qunut is not a step in the guide. Its dua is in the dua book (Hisn
 * al-Muslim, occasion 1269331); a step needs a transliteration from a source
 * and a recording.
 */
export const WITR: Reference = {
  id: 'witr',
  surface: 'learn',
  title: 'Shafʿ and Witr',
  subtitle: 'The even and the odd that close your night prayer',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('guide', 'witr'), ref('reference', 'qiyam-al-layl'), ref('hisn', '1269331')],
  },
  quickFacts: [
    { label: 'When', value: 'After Isha and its sunnah, until Fajr' },
    { label: 'How many', value: 'Two rakʿahs of shafʿ, then one of witr' },
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
      heading: 'What are shafʿ and witr?',
      promote: 'hero',
      body:
        'Shafʿ means even and witr means odd. Together they close your night prayer: two rakʿahs with a salam, then one rakʿah on its own. All three together are also called witr, which is how you will hear it at the mosque. The Prophet ﷺ said to make witr the last prayer of your night.',
      sources: [
        hadith('bukhari', '998', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Shafʿ and witr are part of qiyam al-layl',
          author: 'IslamWeb, fatwa 416554',
          url: 'https://www.islamweb.net/ar/fatwa/416554/',
        }),
      ],
    },
    {
      id: 'not-isha-sunnah',
      heading: 'Is shafʿ the sunnah after Isha?',
      body:
        'No. Isha has two sunnah rakʿahs of its own, prayed straight after it. Shafʿ is separate: the even rakʿahs you pray just before witr.',
      sources: [
        hadith('bukhari', '1180', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'The sunnah of Isha is not the two rakʿahs of shafʿ',
          author: 'IslamWeb, fatwa 18778',
          url: 'https://www.islamweb.net/ar/fatwa/18778/',
        }),
      ],
    },
    {
      id: 'when',
      heading: 'When do I pray them?',
      promote: 'quote',
      body:
        'Any time after Isha until Fajr, and best as the last prayer of your night. If you will pray qiyam or tahajjud, pray shafʿ and witr after it. If you are not sure you will wake, pray them before you sleep. Both ways are sound. In Ramadan, pray witr with the imam at taraweeh, and if you pray again later that night, do not repeat it.',
      sources: [
        hadith('muslim', '755', { grading: 'sahih', role: 'practice' }),
        hadith('abu-dawud', '1434', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Witr may be prayed early in the night, and delaying it is better',
          author: 'IslamWeb, fatwa 2165',
          url: 'https://www.islamweb.net/ar/fatwa/2165/',
        }),
        scholarly({
          work: 'Witr with the imam when you will pray again later',
          author: 'Islam Question & Answer, fatwa 232790',
          url: 'https://islamqa.info/en/answers/232790',
        }),
      ],
    },
    {
      id: 'how',
      heading: 'How do I pray them?',
      body:
        'Pray two rakʿahs and end with the salam. That is shafʿ. Then stand and pray one rakʿah and end with the salam. That is witr. The Prophet ﷺ also allowed witr of five, three or one rakʿahs.',
      sources: [
        hadith('abu-dawud', '1422', { grading: 'sahih', role: 'practice' }),
        hadith('bukhari', '991', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Separating witr from shafʿ with a salam',
          author: 'IslamWeb, fatwa 58212',
          school: 'the majority',
          url: 'https://www.islamweb.net/ar/fatwa/58212/',
        }),
        scholarly({
          work: 'Performing only one rakʿah in witr prayer',
          author: 'IslamWeb, fatwa 92752',
          school: 'the majority',
          url: 'https://islamweb.net/en/fatwa/92752/',
        }),
      ],
      note: 'One rakʿah of witr on its own, with nothing before it, still counts, but most scholars dislike it.',
      notes: [HANAFI_WITR_NOTE],
    },
    {
      id: 'recite',
      heading: 'What do I recite?',
      body:
        'Al-Fatihah in every rakʿah, then a short surah. The Prophet ﷺ recited Al-Aʿla in the first rakʿah, Al-Kafirun in the second and Al-Ikhlas in the last. They are recommended, not required, so recite what you know.',
      note: 'Some also add Al-Falaq and An-Nas after Al-Ikhlas in the last rakʿah.',
      sources: [
        hadith('nasai', '1699', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'What is the best way to pray witr?',
          author: 'Irshaad Sedick, SeekersGuidance',
          school: 'Shafi`i',
          url: 'https://seekersguidance.org/answers/prayer-shafii-fiqh/what-is-the-best-way-to-pray-witr/',
        }),
      ],
    },
    {
      id: 'qunut',
      heading: 'What is the qunut?',
      body:
        'A dua some people make in the last rakʿah of witr. You do not need to learn it to pray witr. Mosques differ on when they say it, some every night and some only in the second half of Ramadan, and on whether it comes before or after bowing.',
      sources: [
        hadith('abu-dawud', '1425', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'Qunut in witr and in Fajr',
          author: 'Dar al-Iftaa al-Misriyyah, fatwa 15984',
          url: 'https://www.dar-alifta.org/ar/fatwa/details/15984',
        }),
      ],
    },
    {
      id: 'after',
      heading: 'What if I prayed witr and then wake up?',
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
