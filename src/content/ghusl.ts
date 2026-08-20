import { Recitations } from './recitations';
import { note, ref } from './model';
import { hadith, quran } from './sources';
import type { Guide } from './types';

/**
 * The full wash.
 *
 * The most serious hole the app had: it taught wudu and never mentioned ghusl,
 * so someone could follow it exactly and still be praying without valid
 * purification, with nothing on screen telling them.
 *
 * ⚠️ PARTIAL REVIEW. The method below is no longer unsourced: the order it
 * teaches — hands, then the private parts, then a full wudu, then water worked
 * into the roots of the hair, then three handfuls over the head, then the rest
 * of the body — is `Aisha's description of the Prophet's ﷺ ghusl in Sahih
 * al-Bukhari 248, which the guide now cites. What still needs a qualified eye
 * is the English prose and the list of occasions in the first step.
 *
 * The method taught here is the complete sunnah one rather than the bare
 * minimum. Schools differ on what is strictly obligatory — the Hanafis count
 * rinsing the mouth and nose as required, others do not — and the sunnah
 * method satisfies every school, so a first-timer following it is safe
 * whichever they later learn from. That is a deliberate choice and worth a
 * reviewer's attention.
 *
 * Deliberately plain about what makes it necessary. This is a subject people
 * are too embarrassed to ask about, which is exactly why an app should say it.
 */
export const GHUSL: Guide = {
  id: 'ghusl',
  title: 'Ghusl',
  subtitle: 'The full wash, and when you need it',
  meta: {
    category: 'purification',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    relatedContent: [ref('guide', 'wudu'), ref('guide', 'tayammum')],
    // What makes it necessary, and where the method comes from.
    sources: [
      quran(5, 6, { surahName: "Al-Ma'idah" }),
      quran(2, 222, { surahName: 'Al-Baqarah' }),
      hadith('bukhari', '248', {
        book: 5,
        bookName: 'Bathing (Ghusl)',
        inBookReference: 'Book 5, Hadith 1',
      }),
    ],
  },
  steps: [
    {
      id: 'when',
      title: 'When you need it',
      instruction:
        'Ghusl is required after sex or any release of sexual fluid, and after a period or post-natal bleeding ends. Until you have done it, wudu is not enough and prayer is not valid.',
      note: 'It is also recommended — not required — before Friday prayer, before the two Eids, and for someone who has just become Muslim.',
      // The Qur'an for the two things that make it obligatory; the narrations
      // for the three occasions the note calls recommended. Ibn Majah 1315 is
      // graded weak and is cited for a recommended practice rather than a
      // ruling, which is what `role` records — see `EvidenceRole`.
      sources: [
        quran(5, 6, { surahName: "Al-Ma'idah" }),
        quran(2, 222, { surahName: 'Al-Baqarah' }),
        hadith('bukhari', '877', {
          book: 11,
          bookName: 'Friday Prayer',
          inBookReference: 'Book 11, Hadith 2',
        }),
        hadith('ibn-majah', '1315', {
          book: 5,
          bookName: 'Establishing the Prayer and the Sunnah Regarding Them',
          inBookReference: 'Book 5, Hadith 513',
          grading: 'daif',
          gradedBy: 'Darussalam',
          role: 'practice',
        }),
        hadith('abu-dawud', '355', {
          book: 1,
          bookName: 'Purification (Kitab Al-Taharah)',
          inBookReference: 'Book 1, Hadith 355',
          grading: 'sahih',
          gradedBy: 'Al-Albani',
          role: 'practice',
        }),
      ],
      notes: [
        note(
          'differs',
          'Whether the wash on becoming Muslim is required or strongly recommended is a point scholars differ on. Doing it settles the question either way, which is why this app simply says to do it.',
          {
            sources: [
              hadith('abu-dawud', '355', {
                book: 1,
                bookName: 'Purification (Kitab Al-Taharah)',
                inBookReference: 'Book 1, Hadith 355',
                grading: 'sahih',
                gradedBy: 'Al-Albani',
                role: 'practice',
              }),
            ],
            positions: [
              {
                school: 'Hanbali',
                position: 'Hold the full wash obligatory on entering Islam.',
              },
              {
                school: 'Shafi`i',
                position:
                  'Hold it recommended, unless something else — such as intimacy beforehand — had already made a ghusl due.',
              },
            ],
            additionalExplanation:
              'The narration is that Qays ibn `Asim came to the Prophet ﷺ intending to accept Islam and was told to wash. Scholars read that instruction differently: some as a command, some as guidance. Nobody holds that your Islam is incomplete without it, and nobody thinks less of you for doing it a week later than the day itself.',
          },
        ),
      ],
    },
    {
      id: 'intention',
      title: 'Intend',
      posture: 'washing',
      instruction:
        'Intend in your heart that you are washing to lift the state you are in, then say:',
      says: Recitations.bismillah,
    },
    {
      id: 'hands',
      title: 'Wash your hands',
      posture: 'washing',
      instruction: 'Wash both hands up to the wrists, three times.',
    },
    {
      id: 'private',
      title: 'Wash yourself',
      posture: 'washing',
      instruction:
        'Wash the private parts and anywhere else on the body carrying impurity, using your left hand. Then wash your hands again.',
    },
    {
      id: 'wudu',
      title: 'Perform wudu',
      posture: 'washing',
      instruction:
        'Do a complete wudu as you normally would, including rinsing your mouth and nose. You may leave washing your feet until the very end.',
    },
    {
      id: 'head',
      title: 'Pour over your head',
      posture: 'washing',
      instruction:
        'Pour water over your head three times, working it through your hair until the water reaches the roots and the scalp is wet everywhere.',
      note: 'Long hair does not need undoing for this, but the water has to reach the scalp underneath.',
      sources: [
        hadith('bukhari', '248', {
          book: 5,
          bookName: 'Bathing (Ghusl)',
          inBookReference: 'Book 5, Hadith 1',
        }),
      ],
    },
    {
      id: 'body',
      title: 'Wash the rest of you',
      posture: 'washing',
      instruction:
        'Pour water over the right side of your body, then the left, until every part of you has been reached — under the arms, behind the ears, between the toes. Nothing may be left dry.',
      note: 'Take off anything water cannot pass — a ring, a watch — or move it as you go.',
    },
    {
      id: 'feet',
      title: 'Wash your feet',
      posture: 'washing',
      instruction: 'If you left your feet until now, wash them, and you are finished.',
      note: 'This ghusl counts as your wudu too. You can pray without repeating it, as long as nothing breaks your wudu afterwards.',
    },
  ],
};
