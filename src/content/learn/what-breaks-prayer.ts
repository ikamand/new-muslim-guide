import { note, ref } from '../model';
import { hadith, quran, scholarly } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * ⚠️ ONE FACTUAL CORRECTION LANDED HERE, and it was in the sentence this page
 * exists for. The `speaking` section said that speaking by mistake means "you
 * simply repeat the prayer". Sahih Muslim 537a says the opposite of that by
 * omission: the Prophet ﷺ taught Mu`awiya ibn al-Hakam the rule and did not
 * send him back to pray again, and that silence is the classical evidence that
 * speech out of ignorance or forgetfulness does not invalidate. The app was
 * citing the narration and then stating the reverse of what it establishes.
 *
 * ⚠️ THE LIST WAS ALSO WRONG-SHAPED. Four items, none cited where they were
 * listed, one of them ("turning away from the qibla") stated flatly when
 * Bukhari's own chapter heading on 403 is that someone who prays the wrong way
 * by mistake does not repeat. Laughing out loud — which is agreed to
 * invalidate, and which a beginner praying beside a friend will actually meet
 * — was missing entirely. The list is now five, each sourced, and each carries
 * the exception that makes it survivable.
 */
export const WHAT_BREAKS_PRAYER: Reference = {
  id: 'what-breaks-prayer',
  surface: 'learn',
  title: 'What breaks the prayer',
  subtitle: 'And what only feels like it does',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    tags: ['mistakes'],
    relatedContent: [ref('reference', 'lost-count'), ref('guide', 'wudu')],
  },
  quickFacts: [
    { label: 'Breaks it', value: 'Wudu · speaking · eating · laughing · turning away' },
    { label: 'Does not', value: 'Doubt · small movements · ordinary mistakes' },
  ],
  sections: [
    {
      id: 'breaks',
      heading: 'What actually breaks it?',
      body:
        'Losing your wudu. Speaking on purpose to someone. Eating or drinking. Laughing out loud. Turning your body right away from the qibla, or deciding to stop. If one of these happens, put it right and pray it again from the beginning. But read the rest of this page first, because almost every one of them has an exception, and most of what a beginner worries about is on the other list.',
      sources: [
        hadith('bukhari', '135', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 1',
        }),
        hadith('muslim', '537a', {
          book: 5,
          bookName: 'The Book of Mosques and Places of Prayer',
          inBookReference: 'Book 5, Hadith 39',
        }),
        quran(2, 144, { surahName: 'Al-Baqarah' }),
        scholarly({
          work: 'What Invalidates the Prayer?',
          author: 'Islam Question & Answer, fatwa 87749',
          url: 'https://islamqa.info/en/answers/87749/what-invalidates-the-prayer',
        }),
      ],
      notes: [
        note(
          'agreed',
          'Smiling is not laughing, and nobody has ever held that it breaks a prayer. What is meant is laughing aloud.',
          {
            sources: [
              scholarly({
                work: 'Smiling does not invalidate the prayer but boisterous laughing does',
                author: 'IslamWeb, fatwa 298021',
                url: 'https://www.islamweb.net/en/fatwa/298021/smiling-does-not-invalidate-the-prayer-but-boisterous-laughing-does',
              }),
              // For the second half of the explanation — that three schools
              // leave the wudu standing and one does not.
              scholarly({
                work: 'Encyclopedia of Fiqh, Nullifiers of Ablution',
                author: 'Dorar al-Saniyyah',
                url: 'https://dorar.net/en/feqhia/44',
              }),
            ],
            additionalExplanation:
              'Ibn al-Mundhir recorded the scholars as agreed that laughing aloud ends the prayer, and an-Nawawi and Ibn Qudamah both record that most of them held smiling does not. It is one of the few things on this page nobody argues about. One thing they do differ on is what else it costs you: the Maliki, Shafi`i and Hanbali schools hold that laughing aloud ends the prayer but leaves your wudu intact, so you stand up and pray again. The Hanafi school holds that it ends the wudu too, so someone following that school washes first. If you are not sure which applies to you, washing again costs a minute.',
          },
        ),
      ],
    },
    {
      id: 'speaking',
      heading: 'What if I speak without thinking?',
      // 1,431 characters. Full-bleed, that is a wall rather than an answer.
      promote: 'supporting',
      body:
        'A companion said "Allah have mercy on you" to a man who sneezed mid-prayer, not knowing he could not. Afterwards the Prophet ﷺ taught him, without scolding him and by his own account better than anyone had ever taught him anything, that this prayer is not the place for ordinary speech. He was not told to pray it again. Deliberate speech ends the prayer; speech before you knew the rule, or in a moment of forgetfulness, does not.',
      sources: [
        hadith('muslim', '537a', {
          book: 5,
          bookName: 'The Book of Mosques and Places of Prayer',
          inBookReference: 'Book 5, Hadith 39',
        }),
        hadith('bukhari', '1200', {
          book: 21,
          bookName: 'Actions while Praying',
          inBookReference: 'Book 21, Hadith 4',
        }),
      ],
      notes: [
        note(
          'agreed',
          'This was not always the rule. People used to speak to each other in prayer and were told to stop, which is why the narrations about it read the way they do.',
          {
            sources: [
              hadith('bukhari', '1200', {
                book: 21,
                bookName: 'Actions while Praying',
                inBookReference: 'Book 21, Hadith 4',
              }),
              hadith('muslim', '538a', {
                book: 5,
                bookName: 'The Book of Mosques and Places of Prayer',
                inBookReference: 'Book 5, Hadith 41',
              }),
            ],
            additionalExplanation:
              'Zayd ibn Arqam: "we used to speak while praying, and one of us would tell his companion what he needed, until the verse was revealed and we were ordered to be silent." Ibn Mas`ud used to greet the Prophet ﷺ mid-prayer and be answered, and returned from Abyssinia to find that he was not: "there is occupation enough in the prayer".',
          },
        ),
      ],
    },
    {
      id: 'qibla',
      heading: 'What if I am facing the wrong way?',
      body:
        'This one is narrower than it sounds. What ends the prayer is turning your whole body away from the qibla with no reason to. Getting the direction wrong, in a hotel room or on a plane or in a city you do not know, does not, as long as you worked it out as best you could. If you find out afterwards that you were off, the prayer stands.',
      sources: [
        quran(2, 144, { surahName: 'Al-Baqarah' }),
        hadith('bukhari', '403', {
          book: 8,
          bookName: 'Prayers (Salat)',
          inBookReference: 'Book 8, Hadith 55',
        }),
      ],
      notes: [
        note(
          'agreed',
          'A whole congregation once turned right around in the middle of Fajr, and their prayer counted.',
          {
            sources: [
              hadith('bukhari', '403', {
                book: 8,
                bookName: 'Prayers (Salat)',
                inBookReference: 'Book 8, Hadith 55',
              }),
            ],
            additionalExplanation:
              'The people of Quba were praying facing Jerusalem when someone arrived to say the direction had been changed to the Ka`bah that night, so they turned mid-prayer and carried on. Bukhari puts the narration under a chapter heading that includes those who held there is no need to repeat a prayer offered by mistake in the wrong direction.',
          },
        ),
      ],
    },
    {
      id: 'moving',
      heading: 'Can I move at all?',
      body:
        'Scratching, shifting your weight, stepping forward to close a gap, picking up a child: none of this ends the prayer. What is meant by movement breaking it is a lot of it, continuously, for no reason connected to praying. The Prophet ﷺ prayed while carrying his granddaughter, putting her down to prostrate and picking her back up.',
      sources: [
        hadith('bukhari', '516', {
          book: 8,
          bookName: 'Prayers (Salat)',
          inBookReference: 'Book 8, Hadith 163',
        }),
        scholarly({
          work: 'What Invalidates the Prayer?',
          author: 'Islam Question & Answer, fatwa 87749',
          url: 'https://islamqa.info/en/answers/87749/what-invalidates-the-prayer',
        }),
      ],
    },
    {
      id: 'doubt',
      heading: 'What if I think I broke wudu?',
      body:
        'Doubt does not. Someone asked the Prophet ﷺ about feeling as though they had passed wind mid-prayer, and he said not to leave the prayer unless they heard a sound or smelled something. Uncertainty is not enough. Carry on.',
      sources: [
        hadith('bukhari', '137', {
          book: 4,
          bookName: "Ablutions (Wudu')",
          inBookReference: 'Book 4, Hadith 3',
        }),
      ],
      notes: [
        note(
          'agreed',
          'This is the hadith to remember if you find yourself checking constantly. The rule is deliberately strict about certainty, because doubt would otherwise end every prayer.',
          {
            sources: [
              hadith('bukhari', '137', {
                book: 4,
                bookName: "Ablutions (Wudu')",
                inBookReference: 'Book 4, Hadith 3',
              }),
            ],
          },
        ),
      ],
    },
    {
      id: 'mistakes',
      heading: 'What about ordinary mistakes?',
      body:
        'Losing count, forgetting a sitting, adding a movement, saying something in the wrong place: none of these break the prayer. They are fixed with two extra prostrations at the end, which the app covers separately. A beginner will do all of these, and none of them is a disaster.',
      notes: [
        note(
          'practical',
          'The most common beginner mistake is starting the prayer over. Almost nothing requires that, and restarting turns a small slip into a long one.',
        ),
      ],
    },
  ],
};
