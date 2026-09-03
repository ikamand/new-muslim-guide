import { Recitations } from './recitations';
import { note, ref } from './model';
import { hadith, quran, scholarly } from './sources';
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
 * is the English prose.
 *
 * ⚠️ THE LIST OF OCCASIONS WAS TOO BROAD AND IS NOW CORRECTED. It used to say
 * ghusl is required after "any release of sexual fluid", which sweeps together
 * two things the books keep carefully apart: mani, which requires the full
 * wash, and madhi, the thin clear fluid of arousal, which requires only wudu
 * and washing the part — `Ali's question through al-Miqdad in Sahih al-Bukhari
 * 132. As written, the app would have sent people for a wash they did not owe.
 * The other direction was covered but unsourced: intercourse makes the wash
 * due whether or not anything is released, which is Bukhari 291 and Sahih
 * Muslim 348a — and Muslim files 348a under a chapter recording that the
 * earlier ruling, "water is from water", was abrogated.
 *
 * Post-natal bleeding is named now with Sunan Abi Dawud 311 behind it, where
 * Umm Salama reports that women refrained from prayer for forty days after
 * childbirth. That establishes nifas as a state that stops the prayer; that a
 * ghusl ends it is drawn by the books from its parallel with menstruation
 * rather than from a verse naming it, and that is worth a reviewer knowing.
 *
 * The method taught here is the complete sunnah one rather than the bare
 * minimum. Schools differ on what is strictly obligatory — the Hanafis count
 * rinsing the mouth and nose as required, others do not — and the sunnah
 * method satisfies every school, so a first-timer following it is safe
 * whichever they later learn from. That is a deliberate choice and worth a
 * reviewer's attention.
 *
 * THE THREE RECOMMENDED WASHES WERE RE-AUDITED AND TWO NOTES CHANGED SHAPE.
 *
 *   - Friday was filed as a `differs` note weighing "the majority" against
 *     "a minority". That was vaguer than the evidence needs: all four schools
 *     hold the Friday ghusl a sunnah, so it is now an `agreed` note that says
 *     so, and the obligatory reading is described as sitting outside them.
 *     Vague labels where a real attribution exists were the complaint at
 *     `docs/scholarly-review.md` §2.3, and this is one of them answered.
 *   - Becoming Muslim gains the Hanafi position, which the last pass had found
 *     and left out rather than assert. It also gains the more interesting
 *     half: the recommended view is not merely the non-Hanbali one — a group
 *     of Hanbalis report it from Ahmad, and al-Mardawi, whose job in that
 *     school was to say where it settles, chose it.
 *   - Eid is unchanged. It was resolved in the last pass and rests on Ibn
 *     `Umar's practice in the Muwatta, with the weak marfu` narration kept,
 *     labelled, and explicitly not what the recommendation stands on.
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
        'Ghusl is required after sex, whether or not anything was released, and after any release of semen, including in your sleep. It is required when a period ends, and when bleeding after childbirth ends. Until you have done it, wudu is not enough and prayer is not valid.',
      note: 'It is also recommended, though not required, before Friday prayer, before the two Eids, and for someone who has just become Muslim.',
      // The Qur'an for the two things it names; Bukhari 291 and Muslim 348a
      // for intercourse without emission, and Bukhari 282 for emission
      // without intercourse. Ibn Majah 1315 is graded weak and is cited for a
      // recommended practice rather than a ruling — see `EvidenceRole` — and
      // now sits beside Ibn `Umar's own practice in the Muwatta, which is the
      // stronger support for the Eid wash.
      sources: [
        quran(5, 6, { surahName: "Al-Ma'idah" }),
        quran(2, 222, { surahName: 'Al-Baqarah' }),
        hadith('bukhari', '291', {
          book: 5,
          bookName: 'Bathing (Ghusl)',
          inBookReference: 'Book 5, Hadith 43',
        }),
        hadith('muslim', '348a', {
          book: 3,
          bookName: 'The Book of Menstruation',
          inBookReference: 'Book 3, Hadith 105',
        }),
        hadith('bukhari', '282', {
          book: 5,
          bookName: 'Bathing (Ghusl)',
          inBookReference: 'Book 5, Hadith 34',
        }),
        hadith('abu-dawud', '311', {
          book: 1,
          bookName: 'Purification (Kitab Al-Taharah)',
          inBookReference: 'Book 1, Hadith 311',
          grading: 'hasan',
          gradedBy: 'Al-Albani',
        }),
        hadith('bukhari', '877', {
          book: 11,
          bookName: 'Friday Prayer',
          inBookReference: 'Book 11, Hadith 2',
        }),
        hadith('tirmidhi', '497', {
          book: 4,
          bookName: 'The Book on the Day of Friday',
          inBookReference: 'Book 4, Hadith 10',
          grading: 'hasan',
          gradedBy: 'Darussalam',
        }),
        hadith('malik', '432', {
          book: 10,
          bookName: "The Two 'Ids",
          inBookReference: 'Book 10, Hadith 2',
          role: 'practice',
        }),
        hadith('ibn-majah', '1315', {
          book: 5,
          bookName: 'Establishing the Prayer and the Sunnah Regarding Them',
          inBookReference: 'Book 5, Hadith 513',
          grading: 'daif',
          gradedBy: 'Darussalam',
          role: 'practice',
        }),
        hadith('bukhari', '462', {
          book: 8,
          bookName: 'Prayers (Salat)',
          inBookReference: 'Book 8, Hadith 110',
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
          'agreed',
          'The thinner, clear fluid that comes with arousal is not the same thing and does not need a ghusl. Wash the part and the clothing it touched, do wudu, and pray.',
          {
            sources: [
              hadith('bukhari', '132', {
                book: 3,
                bookName: 'Knowledge',
                inBookReference: 'Book 3, Hadith 74',
              }),
            ],
            additionalExplanation:
              '`Ali was too shy to ask and sent al-Miqdad to ask for him. The answer was that it requires wudu, not ghusl. The books keep the two fluids carefully apart, and so does this guide.',
          },
        ),
        note(
          'differs',
          'Whether the wash on becoming Muslim is required or strongly recommended is a point scholars differ on. Doing it settles the question either way, which is why this app simply says to do it.',
          {
            sources: [
              hadith('bukhari', '462', {
                book: 8,
                bookName: 'Prayers (Salat)',
                inBookReference: 'Book 8, Hadith 110',
              }),
              hadith('abu-dawud', '355', {
                book: 1,
                bookName: 'Purification (Kitab Al-Taharah)',
                inBookReference: 'Book 1, Hadith 355',
                grading: 'sahih',
                gradedBy: 'Al-Albani',
                role: 'practice',
              }),
              // Where the school attributions below were read. It also states
              // the thing this app most wants said on the subject: the wash is
              // not a condition of anyone's conversion being valid.
              scholarly({
                work: 'Ruling on Ghusl for those embracing Islam',
                author: 'IslamWeb, fatwa 11140',
                url: 'https://www.islamweb.net/en/fatwa/11140/ruling-on-ghusl-for-those-embracing-islam',
              }),
            ],
            positions: [
              {
                school: 'Hanbali',
                position: 'The well-known position of the school holds the full wash obligatory on entering Islam.',
              },
              {
                school: 'Shafi`i',
                position:
                  'Hold it recommended, unless something else, such as intimacy beforehand, had already made a ghusl due.',
              },
              {
                school: 'Hanafi',
                position: 'Hold it recommended rather than owed.',
              },
            ],
            additionalExplanation:
              'Two reports carry it. Thumamah ibn Uthal, released from the pillar of the mosque, went to a nearby grove, washed, came back and said the shahada. Bukhari files that under a chapter headed "taking a bath on embracing Islam". And Qays ibn `Asim came intending to accept Islam and was told to wash.\n\nScholars read the second report differently, some as a command and some as guidance. The reading that makes it recommended is the more common one, and it is held inside the Hanbali school as well: a group of Hanbalis report it from Ahmad himself, and al-Mardawi, whose role in that school was to say which position it settles on, chose it. No one holds that your Islam is incomplete without it, and no one thinks less of you for doing it a week later than the day itself.',
          },
        ),
        note(
          'agreed',
          'The Friday wash is strongly encouraged rather than owed, and all four schools treat it as a sunnah. The narration that settles it says a wudu on Friday is fine and good, and a ghusl is better.',
          {
            sources: [
              hadith('bukhari', '877', {
                book: 11,
                bookName: 'Friday Prayer',
                inBookReference: 'Book 11, Hadith 2',
              }),
              hadith('tirmidhi', '497', {
                book: 4,
                bookName: 'The Book on the Day of Friday',
                inBookReference: 'Book 4, Hadith 10',
                grading: 'hasan',
                gradedBy: 'Darussalam',
              }),
              scholarly({
                work: 'Encyclopedia of Fiqh, Proper Mannerisms on Friday',
                author: 'Dorar al-Saniyyah',
                url: 'https://dorar.net/en/feqhia/125',
              }),
            ],
            additionalExplanation:
              'All four schools hold the Friday ghusl to be a sunnah. The reading of Bukhari 877, "anyone of you attending the Friday prayer should take a bath", as an obligation is held outside them. Tirmidhi records ash-Shafi`i\'s own argument for the sunnah reading: `Umar was addressing the congregation when `Uthman arrived having only done wudu, and `Umar reproached him without sending him back to wash. Neither of them treated it as a condition, and both knew the instruction. One practical point the schools also agree on: it only counts as the Friday wash if it is done before the prayer.',
          },
        ),
        note(
          'practical',
          'The Eid wash is a companion\'s practice more than a narrated command. Ibn `Umar washed on the morning of Eid al-Fitr before setting out, and the practice has been kept ever since.',
          {
            sources: [
              hadith('malik', '432', {
                book: 10,
                bookName: "The Two 'Ids",
                inBookReference: 'Book 10, Hadith 2',
                      role: 'practice',
              }),
              hadith('ibn-majah', '1315', {
                book: 5,
                bookName: 'Establishing the Prayer and the Sunnah Regarding Them',
                inBookReference: 'Book 5, Hadith 513',
                grading: 'daif',
                gradedBy: 'Darussalam',
                role: 'practice',
              }),
            ],
            additionalExplanation:
              'The narration that says the Prophet ﷺ himself washed on both Eids is graded weak by Darussalam, so the recommendation does not rest on it, and it is labelled as weak here rather than quietly promoted. What the recommendation rests on is Malik\'s report of Ibn `Umar in the Muwatta.',
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
        'Pour water over the right side of your body, then the left, until every part of you has been reached: under the arms, behind the ears, between the toes. Nothing may be left dry.',
      note: 'Take off anything water cannot pass, such as a ring or a watch, or move it as you go.',
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
