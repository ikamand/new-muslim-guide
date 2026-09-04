import { ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The origin story in one sitting (3 Sep 2026): Mecca, the cave, the
 * persecution, Medina, the return, and why the calendar starts where it
 * does. It sits beside "Who is Muhammad ﷺ?" in the first weeks. The long
 * sīrah, told in episodes, is a different thing and still lands in Going
 * deeper when it is written, as the curriculum notes.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. The ages and the year counts
 * are Bukhari 3902's, not a biography's. Nothing was cited from memory.
 *
 * ## Deliberate absences
 *
 * The night journey, the treaty with Medina's tribes, the battles by name,
 * the king of Abyssinia's shelter and the torture of Bilal are all told in
 * the sīrah works and not in a text this app can open by number. They are
 * left to the sīrah collection rather than printed on a biography's word.
 * 5:3 ("this day I have perfected your religion") was dropped because the
 * verse prints in full and opens with the food prohibitions.
 */
export const HOW_IT_BEGAN: Reference = {
  id: 'how-it-began',
  surface: 'learn',
  title: 'How it began',
  subtitle: 'Mecca to Medina, in a few minutes',
  meta: {
    category: 'belief',
    difficulty: 'foundational',
    estimatedMinutes: 5,
    beginnerPriority: 2,
    relatedContent: [
      ref('reference', 'who-is-muhammad'),
      ref('reference', 'islamic-calendar'),
      ref('reference', 'what-is-the-quran'),
    ],
  },
  quickFacts: [
    { label: 'Where', value: 'Mecca, then Medina. Both in Arabia' },
    { label: 'When', value: 'First verses 610 CE, at forty. Died 632, at sixty-three' },
    { label: 'The calendar', value: 'Muslim years count from the move to Medina, not from his birth' },
  ],
  sections: [
    {
      id: 'before',
      heading: 'Who was he before that night?',
      body:
        'Muhammad ﷺ was born in Mecca, a trading town in Arabia built around the Kaʿbah, the house Muslims believe Ibrahim, or Abraham, raised with his son Ismail for the worship of one God. By his time the town worshipped many. He lost both parents as a child, and the Qur’an speaks of it to him directly: did He not find you an orphan and give you refuge? He grew up, married Khadijah, and was forty the night the angel came.',
      sources: [
        quran(2, 127, { surahName: 'Al-Baqarah' }),
        quran(93, [6, 8], { surahName: 'Ad-Duha' }),
        hadith('bukhari', '3902'),
        general(
          'That Mecca was a trading town whose people worshipped idols is the background every biography gives. The narration on the conquest below counts the idols.',
        ),
      ],
    },
    {
      id: 'cave',
      heading: 'What happened in the cave?',
      promote: 'hero',
      body:
        'He had taken to going alone to a cave on a hill outside Mecca, for nights at a time. On one of those nights the angel Jibril, Gabriel, came to him and said "Read". He answered that he could not read. Three times the angel pressed him, and then the first words of the Qur’an were given to him. He went home shaking and asked Khadijah to cover him. She told him God would never disgrace him, because of how he treated people, and she believed him. The five verses printed here are those words.',
      sources: [quran(96, [1, 5], { surahName: 'Al-ʿAlaq' }), hadith('bukhari', '3')],
    },
    {
      id: 'mecca',
      heading: 'Why did they leave Mecca?',
      body:
        'For thirteen years he taught in Mecca, and the town’s leaders turned on the small group that followed him. Some crossed the sea to Abyssinia to be safe. Abu Bakr, his closest friend, set out to do the same, and was talked into returning by a chief who said a man who helped the poor and kept his family ties should not be driven out. In the end the leaders plotted to imprison or kill him, and in 622 he and Abu Bakr left for Medina. They hid in a cave on the way while men searched the hill above them. The Qur’an records what he said there: do not grieve, God is with us.',
      sources: [
        hadith('bukhari', '3905'),
        quran(8, 30, { surahName: 'Al-Anfal' }),
        quran(9, 40, { surahName: 'At-Tawbah' }),
        hadith('bukhari', '3653'),
      ],
    },
    {
      id: 'medina',
      heading: 'What changed in Medina?',
      body:
        'Medina had invited him, and there the persecuted group became a community. He asked the owners of a piece of land its price, they gave it, and a mosque went up on it with him carrying stones beside his companions. The call to prayer, the fast of Ramadan and most of what Muslims do every day took their settled form there. It is also where permission to fight came, in a verse that says why it was given: because they were wronged, and driven from their homes for saying "our Lord is God". Mecca sent armies against the new community more than once.',
      sources: [
        hadith('bukhari', '428'),
        quran(22, [39, 40], { surahName: 'Al-Hajj' }),
        general(
          'That the daily practices took their settled form in Medina, and that Mecca made war on it more than once, is the account every biography gives. The verse is the permission in its own words.',
        ),
      ],
    },
    {
      id: 'return',
      heading: 'How did it end?',
      body:
        'Eight years after being driven out he entered Mecca as its conqueror, and the city gave in. He went to the Kaʿbah, where three hundred and sixty idols stood, and struck them down one by one, saying: truth has come and falsehood has vanished. The tribes of Arabia then entered Islam in crowds, and a short chapter of the Qur’an describes it. He died in Medina ten years after arriving there, at sixty-three.',
      sources: [
        hadith('bukhari', '4287'),
        quran(110, [1, 2], { surahName: 'An-Nasr' }),
        general(
          'That Mecca surrendered rather than fought is the account every biography gives. The count of idols is from the narration quoted here, and the ages from the one under the first numbered heading.',
        ),
      ],
    },
    {
      id: 'calendar',
      heading: 'Why does the calendar start there?',
      body:
        'His companions did not count the years from his birth, or from the first revelation, or from his death. They counted from the day he arrived in Medina. So the year in an Islamic date is the number of years since a persecuted group found a place where it could pray. When the date on the calendar page looks strange, that is what it is counting.',
      sources: [hadith('bukhari', '3934')],
    },
  ],
};
