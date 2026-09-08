import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Fourth page of the "questions you'll be asked" unit (7 Sep 2026). The
 * violence page answers the news; this one answers the history lesson, and
 * the accusation inside it: that a religion spread by conquest cannot be
 * true. The page separates two things the question runs together, the
 * spread of rule and the spread of belief, and lets the Qur'an speak to the
 * second in its own words.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. Muslim is cited by the number
 * the collection prints (19), not the corpus index, per the 26 Aug fix.
 *
 * ## What rests on history rather than on a text
 *
 * Two sentences: that Egypt and Syria stayed largely Christian for centuries
 * after Muslim rule began, and that Indonesia, the country with the most
 * Muslims, was reached by traders and not by an army. Both are `general`
 * sources and say so; the reviewer should confirm the wording is one a
 * historian would sign.
 *
 * ## Deliberate absences
 *
 * The jizya and the covenant with protected peoples (Bukhari 3162) are left
 * out. They answer a different and harder question, and the translation in
 * circulation glosses the covenant as "taxes", which invites the objection
 * this page is not built to carry. Bukhari 10 stays out for the reason the
 * violence page gives.
 */
export const WAS_IT_SPREAD_BY_THE_SWORD: Reference = {
  id: 'was-it-spread-by-the-sword',
  surface: 'learn',
  title: 'Was Islam spread by the sword?',
  subtitle: 'What the Qur’an says about forcing anyone to believe',
  meta: {
    category: 'community',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'isnt-islam-violent'), ref('reference', 'how-it-began')],
  },
  quickFacts: [
    {
      label: 'To say out loud',
      value: 'The Qur’an says there is no compulsion in religion',
      emphasis: true,
    },
    { label: 'Belief', value: 'The Qur’an asks the Prophet: would you compel people?' },
    { label: 'Their worship', value: 'Churches and synagogues are named as protected' },
  ],
  sections: [
    {
      id: 'no-compulsion',
      heading: 'Can anyone be forced to become Muslim?',
      promote: 'hero',
      body:
        'No, and the Qur’an says it in so many words: there is no compulsion in religion. It puts the same point to the Prophet ﷺ as a question. If God had willed, everyone on earth would have believed, so would you compel people to become believers? And it tells him what his job is and is not: you are only a reminder, you are not a controller over them. A belief held under threat is not the thing the Qur’an is asking for.',
      sources: [
        quran(2, 256, { surahName: 'Al-Baqarah' }),
        quran(10, 99, { surahName: 'Yunus' }),
        quran(88, [21, 22], { surahName: 'Al-Ghashiyah' }),
      ],
    },
    {
      id: 'rule-and-belief',
      heading: 'So what were the conquests?',
      body:
        'The spread of rule, which is not the spread of belief. Muslim states did expand by war, as every state of that age did, and the page on violence carries the limits the Qur’an set on fighting. What this question misses is that people under Muslim rule were not made Muslim. The verse that first permitted fighting says what it protects: monasteries, churches, synagogues and mosques, named together. Egypt and Syria stayed largely Christian for centuries after Muslim rule began. And the country with the most Muslims in the world today, Indonesia, was reached by traders, not by an army.',
      sources: [
        quran(22, [39, 40], { surahName: 'Al-Hajj' }),
        quran(60, 8, { surahName: 'Al-Mumtahanah' }),
        general(
          'That Egypt and Syria remained largely Christian for centuries after the conquests, and that Islam reached Indonesia through trade, rest on the histories rather than on any text the app can cite. The verses carry what the religion itself says about rule over people of other faiths.',
        ),
      ],
      notes: [
        note(
          'practical',
          'If the person asking has a particular war in mind, you are allowed not to know it. "Empires fought wars, and Muslim ones did too. The religion forbids forcing belief, and here is where it says so" is an honest answer from someone new.',
        ),
      ],
    },
    {
      id: 'how-invited',
      heading: 'How were people actually invited?',
      body:
        'By speaking. The Qur’an tells the Prophet ﷺ to invite with wisdom and good instruction, and to argue only in the best way. When he sent Muʿadh to Yemen, to a community of Jews and Christians, his instructions were to call them first to the testimony of faith, and only if they accepted it to teach them the prayer, and only then the zakat. To the two men he sent there together he said: make things easy for people, give them good news, and do not drive them away. That is the method the Prophet ﷺ taught, in his own words, to the people he put in charge.',
      sources: [
        quran(16, 125, { surahName: 'An-Nahl' }),
        hadith('muslim', '19'),
        hadith('bukhari', '6124'),
      ],
    },
    {
      id: 'their-choice',
      heading: 'And if someone still says no?',
      body:
        'Then it is their choice, and the Qur’an says so more than once. Whoever wills, let him believe, and whoever wills, let him disbelieve. People who do not fight Muslims and have not driven them out are to be treated with kindness and justice, and the verse adds that God loves those who act justly. A Muslim who forces religion on anyone has left the religion’s own instructions, not followed them.',
      sources: [quran(18, 29, { surahName: 'Al-Kahf' })],
    },
    {
      id: 'saying-it',
      heading: 'What do I actually say?',
      body:
        '"Nobody can be forced to believe. The Qur’an forbids it in so many words, and it names churches and synagogues as places to be protected. Empires spread by armies, and Muslim empires did too. The faith didn’t, and the biggest Muslim country in the world never saw one." Then stop. If they want the verses, they are above. If they want to argue about a century, that is a conversation about history, and you are allowed to say you are new and still learning.',
      sources: [
        general(
          'Suggested wording, not a ruling. Each sentence of it rests on a verse or narration quoted above, or on the history the second section names as history.',
        ),
      ],
    },
  ],
};
