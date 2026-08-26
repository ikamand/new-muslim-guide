/**
 * The things people will say to you, and what to say back.
 *
 * A convert spends months being addressed in words they cannot answer. Almost
 * nothing serves this, because it is too obvious to anyone raised Muslim — and
 * it is the most-used page in the app for someone in their first weeks.
 *
 * ⚠️ REVIEW REQUIRED — model-written and unchecked, and unlike `duas.ts` most
 * of the Arabic here was not taken from a collection. These are everyday
 * speech rather than transmitted text, so for most of them there is no hadith
 * to copy from; a native speaker should check the spelling and the replies.
 *
 * ⚠️ Two of them are not everyday speech and were sitting here unmarked. What
 * you say on hearing of a death is Qur'an 2:156 word for word, and returning
 * the salam is instructed in 4:86. Both now carry the reference. An audit of
 * what "cites nothing" is worth running against a file whose own comment says
 * nothing here can be cited — that comment was true of twelve of the fourteen.
 *
 * Written for the ear, not the page. Someone meets these as sounds in a
 * conversation, so the transliteration leads and the Arabic sits beside it —
 * the reverse of everywhere else in the app, where the Arabic is the thing
 * being said and the transliteration is the crutch.
 */
import type { ContentMeta } from './model';
import { quran } from './sources';

export type Phrase = {
  id: string;
  /** How it sounds — what someone actually hears. */
  said: string;
  arabic: string;
  meaning: string;
  /** The situation it turns up in. */
  when: string;
  /** What to say back, where there is a set answer. */
  reply?: string;
  meta?: ContentMeta;
};

export const PHRASES: Phrase[] = [
  {
    id: 'salam',
    said: 'As-salāmu ʿalaykum',
    arabic: 'السَّلَامُ عَلَيْكُمْ',
    meaning: 'Peace be upon you.',
    when: 'The greeting, arriving or passing. Said to you before almost anything else.',
    reply: 'Wa ʿalaykumu s-salām, and peace be upon you. Always answer it.',
    // "Always answer it" is the one instruction on this screen, and it is the
    // Qur'an's: return the greeting, or better it.
    meta: {
      category: 'community',
      difficulty: 'foundational',
      estimatedMinutes: 1,
      beginnerPriority: 1,
      tags: ['first-day', 'vocabulary', 'etiquette'],
      sources: [quran(4, 86, { surahName: 'An-Nisa' })],
    },
  },
  {
    id: 'jazak',
    said: 'Jazāka-llāhu khayran',
    arabic: 'جَزَاكَ اللَّهُ خَيْرًا',
    meaning: 'May Allah reward you with good.',
    when: 'Thank you. You will hear this far more often than the Arabic for “thanks”.',
    reply: 'Wa iyyāk, and you.',
  },
  {
    id: 'baraka',
    said: 'Bāraka-llāhu fīk',
    arabic: 'بَارَكَ اللَّهُ فِيكَ',
    meaning: 'May Allah bless you.',
    when: 'Thanks, praise, or simply warmth towards you.',
    reply: 'Wa fīka bāraka-llāh, and may He bless you.',
  },
  {
    id: 'alhamdulillah',
    said: 'Al-ḥamdu li-llāh',
    arabic: 'الْحَمْدُ لِلَّهِ',
    meaning: 'All praise is for Allah.',
    when: 'After good news, after eating, after sneezing, and as the normal answer to “how are you?”',
  },
  {
    id: 'inshaallah',
    said: 'In shāʾa-llāh',
    arabic: 'إِنْ شَاءَ اللَّهُ',
    meaning: 'If Allah wills.',
    when: 'Attached to anything about the future. Not a soft no, whatever you may have been told. It is an acknowledgement that the future is not ours to promise.',
  },
  {
    id: 'mashaallah',
    said: 'Mā shāʾa-llāh',
    arabic: 'مَا شَاءَ اللَّهُ',
    meaning: 'What Allah has willed.',
    when: 'Admiring something: a child, a new job, good news. Said so that admiration carries no envy with it.',
  },
  {
    id: 'subhanallah',
    said: 'Subḥāna-llāh',
    arabic: 'سُبْحَانَ اللَّهِ',
    meaning: 'Glory be to Allah.',
    when: 'Astonishment, at something beautiful or something terrible.',
  },
  {
    id: 'astaghfirullah',
    said: 'Astaghfiru-llāh',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    meaning: 'I seek Allah’s forgiveness.',
    when: 'Said after a slip, or on hearing something that should not have been said.',
  },
  {
    id: 'inna-lillah',
    said: 'Innā li-llāhi wa innā ilayhi rājiʿūn',
    arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
    meaning: 'To Allah we belong, and to Him we return.',
    when: 'On hearing that someone has died, or of a serious loss.',
    /**
     * Not a phrase people made up: it is the Qur'an quoting what the patient
     * say when disaster strikes, and the app's Arabic is that verse letter for
     * letter. Marked as such so a reader knows they are saying revelation.
     */
    meta: {
      category: 'quran',
      difficulty: 'foundational',
      estimatedMinutes: 1,
      beginnerPriority: 3,
      tags: ['vocabulary'],
      sources: [quran(2, 156, { surahName: 'Al-Baqarah' })],
    },
  },
  {
    id: 'sallallahu',
    said: 'Ṣalla-llāhu ʿalayhi wa sallam',
    arabic: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    meaning: 'May Allah’s prayers and peace be upon him.',
    when: 'Said after the Prophet’s name. Written as ﷺ, and that single character is this whole phrase.',
  },
  {
    id: 'radiyallahu',
    said: 'Raḍiya-llāhu ʿanhu',
    arabic: 'رَضِيَ اللَّهُ عَنْهُ',
    meaning: 'May Allah be pleased with him.',
    when: 'Said after the name of one of the Prophet’s companions. “ʿanhā” for a woman.',
  },
  {
    id: 'akhi',
    said: 'Akhī · Ukhtī',
    arabic: 'أَخِي · أُخْتِي',
    meaning: 'My brother · my sister.',
    when: 'How people will address you, including people who have just met you. It is ordinary, not familiar.',
  },
  {
    id: 'barakallahu-eid',
    said: 'ʿĪd Mubārak',
    arabic: 'عِيد مُبَارَك',
    meaning: 'A blessed Eid.',
    when: 'On either of the two Eids.',
    reply: 'Say it back.',
  },
  {
    id: 'taqabbal',
    said: 'Taqabbala-llāhu minnā wa minkum',
    arabic: 'تَقَبَّلَ اللَّهُ مِنَّا وَمِنْكُمْ',
    meaning: 'May Allah accept it from us and from you.',
    when: 'Around Eid and after Ramadan, about the worship of the month just gone.',
  },
];
