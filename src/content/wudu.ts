import { Recitations } from './recitations';
import { note, ref } from './model';
import { hadith, quran } from './sources';
import type { Guide } from './types';

/**
 * Wudu comes before prayer, so it comes first in the app. Every step is
 * "wash this, this many times" — the only thing a first-timer really needs
 * is the order and where each washing starts and stops.
 *
 * ⚠️ THE METHOD IS NOW SOURCED STEP BY STEP. `Uthman's demonstration in Sahih
 * al-Bukhari 159 carries the order and the three washings; `Abdullah ibn
 * Zayd's in Bukhari 185 carries wiping the head forward and back; `Abdullah
 * ibn `Amr's in Sunan Abi Dawud 135 carries the ears, index fingers inside and
 * thumbs behind, which is exactly what this guide says; and Jami` at-Tirmidhi
 * 788 carries going between the fingers. What is left model-written is the
 * English prose, not the method.
 *
 * ⚠️ THE NULLIFIERS WERE WRONG-SHAPED AND ARE NOW REBUILT. The step used to
 * say wudu breaks "by using the toilet, passing wind, or deep sleep" — a flat
 * three-item list resting on Bukhari 135, which covers the first two and does
 * not mention sleep at all. Sleep now carries Sunan Abi Dawud 203, and the two
 * genuinely contested nullifiers a beginner will actually meet — touching your
 * own private parts, and skin contact with the opposite sex — are held in a
 * `differs` note with all four schools named, rather than silently omitted.
 */
export const WUDU: Guide = {
  id: 'wudu',
  title: 'Wudu',
  subtitle: 'Washing before prayer',
  meta: {
    category: 'purification',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 1,
    tags: ['first-day'],
    // The verse commands it and names four parts; `Uthman's demonstration is
    // the method the guide actually teaches.
    sources: [
      quran(5, 6, { surahName: "Al-Ma'idah" }),
      hadith('bukhari', '159', {
        book: 4,
        bookName: "Ablutions (Wudu')",
        inBookReference: 'Book 4, Hadith 25',
      }),
    ],
    relatedContent: [
      ref('guide', 'ghusl'),
      ref('guide', 'tayammum'),
      ref('guide', 'fajr'),
    ],
  },
  steps: [
    {
      id: 'intention',
      title: 'Intend',
      posture: 'washing',
      instruction:
        'Intend in your heart that you are performing wudu to purify yourself for prayer, then say:',
      says: Recitations.bismillah,
      note: 'One wudu covers as many prayers as you like. It lasts until something breaks it, and only then do you wash again.',
      // Two claims, two sources: that wudu is what the prayer needs, and that
      // it opens with the name of Allah. Both from the same narration. Anas's
      // report in Bukhari 214 is what says one wudu carries over.
      sources: [
        hadith('abu-dawud', '101', {
          book: 1,
          bookName: 'Purification (Kitab Al-Taharah)',
          inBookReference: 'Book 1, Hadith 101',
          grading: 'sahih',
          gradedBy: 'Al-Albani',
        }),
        hadith('bukhari', '214', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 80',
        }),
      ],
      notes: [
        note(
          'agreed',
          'What certainly breaks it: anything that leaves you from the front or the back — using the toilet, passing wind — and sleep deep enough that you would not have noticed if it had.',
          {
            sources: [
              quran(5, 6, { surahName: "Al-Ma'idah" }),
              hadith('bukhari', '135', {
                book: 4,
                bookName: "Ablutions (Wudu')",
                inBookReference: 'Book 4, Hadith 1',
              }),
              hadith('abu-dawud', '203', {
                book: 1,
                bookName: 'Purification (Kitab Al-Taharah)',
                inBookReference: 'Book 1, Hadith 203',
                grading: 'hasan',
                gradedBy: 'Al-Albani',
              }),
            ],
            additionalExplanation:
              'Bukhari 135 is the Prophet\'s ﷺ words that the prayer of someone who breaks their wudu is not accepted until they wash again — and Abu Huraira, asked what breaking it meant, answered: passing wind. On sleep the wording is "the eyes are the drawstring of the backside, so whoever sleeps should perform wudu". Schools qualify that by how deeply and in what position, but nobody disagrees that sleep you were not aware of ends it.',
          },
        ),
        note(
          'differs',
          'Two more are handled differently by the schools: touching your own private parts, and skin contact with the opposite sex. If one of those happens and you are unsure, washing again takes a minute and settles it.',
          {
            sources: [
              quran(5, 6, { surahName: "Al-Ma'idah" }),
              hadith('tirmidhi', '82', {
                book: 1,
                bookName: 'The Book on Purification',
                inBookReference: 'Book 1, Hadith 82',
                grading: 'sahih',
                gradedBy: 'Darussalam',
              }),
              hadith('tirmidhi', '85', {
                book: 1,
                bookName: 'The Book on Purification',
                inBookReference: 'Book 1, Hadith 85',
                grading: 'sahih',
                gradedBy: 'Darussalam',
              }),
              hadith('abu-dawud', '178', {
                book: 1,
                bookName: 'Purification (Kitab Al-Taharah)',
                inBookReference: 'Book 1, Hadith 178',
                grading: 'sahih',
                gradedBy: 'Al-Albani',
              }),
            ],
            positions: [
              {
                school: 'Hanafi',
                position: 'Neither of the two breaks wudu on its own.',
              },
              {
                school: 'Maliki',
                position:
                  'Both break it where there is desire — the private parts touched deliberately with the palm, and contact with the opposite sex accompanied by desire.',
              },
              {
                school: 'Shafi`i',
                position:
                  'Both break it regardless of intention — the private parts touched with the palm and no barrier, and skin contact with an adult of the opposite sex who is not a close relative.',
              },
              {
                school: 'Hanbali',
                position:
                  'Touching the private parts breaks it; contact with the opposite sex breaks it where there is desire.',
              },
            ],
            additionalExplanation:
              'The split is not carelessness — it is two authentic narrations pointing different ways. Busrah bint Safwan reports "whoever touches his penis should not pray until he performs wudu"; Talq ibn `Ali reports the Prophet ﷺ answering "is it anything other than a piece of him?" Tirmidhi grades both sound and records that the second is the position of the scholars of Kufa. On the opposite sex, the verse says "or you have touched women", and the argument is over whether that word means intercourse or ordinary contact; `A\'isha reports that the Prophet ﷺ kissed her and prayed without washing again.',
          },
        ),
      ],
    },
    {
      id: 'hands',
      title: 'Wash your hands',
      posture: 'washing',
      instruction: 'Wash both hands up to the wrists, three times, between the fingers.',
      sources: [
        hadith('bukhari', '159', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 25',
        }),
        hadith('tirmidhi', '788', {
          book: 8,
          bookName: 'The Book on Fasting',
          inBookReference: 'Book 8, Hadith 107',
          grading: 'sahih',
          gradedBy: 'Darussalam',
        }),
      ],
    },
    {
      id: 'mouth',
      title: 'Rinse your mouth',
      posture: 'washing',
      instruction:
        'Take water into your mouth with your right hand, swill it around and spit it out. Three times.',
      sources: [
        hadith('bukhari', '164', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 30',
        }),
      ],
    },
    {
      id: 'nose',
      title: 'Rinse your nose',
      posture: 'washing',
      instruction:
        'Sniff a little water into your nose with your right hand, then blow it out using your left. Three times.',
      note: 'Draw it up properly — unless you are fasting, in which case go gently.',
      sources: [
        hadith('tirmidhi', '788', {
          book: 8,
          bookName: 'The Book on Fasting',
          inBookReference: 'Book 8, Hadith 107',
          grading: 'sahih',
          gradedBy: 'Darussalam',
        }),
      ],
    },
    {
      id: 'face',
      title: 'Wash your face',
      posture: 'washing',
      instruction:
        'Wash your whole face three times — from your hairline to under your chin, and from ear to ear.',
      // The first of the four parts the verse itself names.
      sources: [quran(5, 6, { surahName: "Al-Ma'idah" })],
    },
    {
      id: 'arms',
      title: 'Wash your arms',
      posture: 'washing',
      instruction:
        'Wash your right arm from the fingertips to just past the elbow, three times. Then the left, three times.',
      note: 'Right before left is the pattern for everything that comes in a pair.',
      sources: [
        quran(5, 6, { surahName: "Al-Ma'idah" }),
        hadith('bukhari', '168', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 34',
        }),
      ],
    },
    {
      id: 'head',
      title: 'Wipe your head',
      posture: 'washing',
      instruction:
        'With wet hands, wipe over your head from the front to the back and return to the front. Once.',
      note: 'Wiping, not washing — and once, not three times.',
      // The verse says wipe rather than wash; Bukhari 185 is the front-to-back
      // -and-back-again motion the instruction describes.
      sources: [
        quran(5, 6, { surahName: "Al-Ma'idah" }),
        hadith('bukhari', '185', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 51',
        }),
      ],
    },
    {
      id: 'ears',
      title: 'Wipe your ears',
      posture: 'washing',
      instruction:
        'With the same wetness, put your index fingers inside your ears and your thumbs behind them, and wipe. Once.',
      sources: [
        hadith('abu-dawud', '135', {
          book: 1,
          bookName: 'Purification (Kitab Al-Taharah)',
          inBookReference: 'Book 1, Hadith 135',
          // Al-Albani grades it hasan sahih, discounting one clause about
          // doing "less" than this. Recorded at the lower of the two.
          grading: 'hasan',
          gradedBy: 'Al-Albani',
        }),
      ],
    },
    {
      id: 'feet',
      title: 'Wash your feet',
      posture: 'washing',
      instruction:
        'Wash your right foot to just past the ankle, between the toes, three times. Then the left, three times.',
      sources: [
        quran(5, 6, { surahName: "Al-Ma'idah" }),
        hadith('bukhari', '159', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 25',
        }),
      ],
    },
    {
      id: 'after',
      title: 'Finish',
      posture: 'washing',
      instruction: 'When you are done, say:',
      says: Recitations.shahadaAfterWudu,
      note: 'You are now ready to pray.',
      notes: [
        note(
          'practical',
          'If you are ever rushed or short of water, the four parts the Qur’an itself names are the face, the arms to the elbows, wiping the head, and the feet to the ankles — once each is enough. Everything else here is the fuller way the Prophet ﷺ did it.',
          {
            sources: [quran(5, 6, { surahName: "Al-Ma'idah" })],
            additionalExplanation:
              'Schools differ over what else is strictly required beyond those four — the intention, keeping to the order, and washing without long pauses in between are each treated as a requirement in some schools and as a recommendation in others. Teaching the full method sidesteps the question entirely, which is why this guide does. Knowing the shorter version matters on the day you have half a bottle of water and a prayer to catch.',
          },
        ),
      ],
    },
  ],
};
