import { note, ref } from '../model';
import { general, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance. Creed: a qualified reader before release.
 *
 * The second lesson of "What you believe more deeply"
 * (`docs/curriculum-update-plan.md`). Scoped away from the two pages that
 * already describe two of the prophets: `who-is-muhammad.ts` and
 * `what-about-jesus.ts` are linked for those men and not repeated. This
 * page is the line itself: what a prophet is, that every people had one,
 * that they all taught one thing, and which names to know.
 *
 * Sources, each opened in the corpus: Qur'an 18:110 (only a man, to whom it
 * is revealed), 16:36 and 35:24 (a messenger to every nation; no nation
 * without a warner), 21:25 (every messenger told there is no god but Me),
 * 42:13 (the same religion enjoined on Nuh, Ibrahim, Musa and ʿIsa), 4:125
 * (Ibrahim taken as an intimate friend), 2:127 (Ibrahim raising the
 * foundations of the House), 33:40 (the seal of the prophets),
 * 2:285 (no distinction between any of His messengers).
 *
 * What is not here: the difference between a nabī and a rasūl, the
 * protection of prophets from sin, and the count of twenty-five names. The
 * first two are theology a beginner does not need; the third is commonly
 * stated and this page does not print a number it has not counted.
 */
export const THE_PROPHETS: Reference = {
  id: 'the-prophets',
  surface: 'learn',
  title: 'The prophets',
  subtitle: 'One message, many messengers, and the last of them',
  meta: {
    category: 'belief',
    difficulty: 'deeper',
    estimatedMinutes: 5,
    beginnerPriority: 4,
    relatedContent: [
      ref('article', 'messengers'),
      ref('reference', 'who-is-muhammad'),
      ref('reference', 'what-about-jesus'),
    ],
  },
  quickFacts: [
    { label: 'What', value: 'Men chosen to carry one message: worship Allah alone', emphasis: true },
    { label: 'How many', value: 'One to every people. The Qur’an names a few dozen' },
    { label: 'The last', value: 'Muhammad ﷺ. No prophet comes after him' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is a prophet?',
      promote: 'hero',
      body:
        'A man Allah chose to carry His message to people, and to show them how to live by it. Not a god, not part-god, not an angel in a body. The Qur’an has the Prophet ﷺ say it himself: I am only a man like you, to whom it has been revealed that your God is one God. What sets a prophet apart is what was given to him, not what he was made of.',
      sources: [quran(18, 110, { surahName: 'Al-Kahf' })],
    },
    {
      id: 'every-people',
      heading: 'Was there only one line of them?',
      body:
        'No. The Qur’an says a messenger was sent into every nation, and that no people passed without a warner among them. Most are not named, and you are not asked to know who went to whom. The point is the opposite of exclusivity: nobody, anywhere, was left without someone telling them what you now know.',
      sources: [
        quran(16, 36, { surahName: 'An-Nahl' }),
        quran(35, 24, { surahName: 'Fatir' }),
      ],
    },
    {
      id: 'one-message',
      heading: 'Did they teach different religions?',
      body:
        'One religion, in the words each people spoke. The Qur’an says that no messenger was sent before Muhammad ﷺ except that he was told: there is no god but Me, so worship Me. It names Nuh, Ibrahim, Musa and ʿIsa and says what was laid on them is what was laid on him: establish the religion, and do not be divided in it. The laws given to each differed in detail. The thing being taught did not.',
      sources: [
        quran(21, 25, { surahName: 'Al-Anbiya' }),
        quran(42, 13, { surahName: 'Ash-Shura' }),
      ],
    },
    {
      id: 'names',
      heading: 'Which names should I know?',
      body: 'The ones you will hear most, in the order they came.',
      bullets: [
        '**Adam**: the first man and the first prophet.',
        '**Nuh**: Noah, and the flood.',
        '**Ibrahim**: Abraham, whom the Qur’an says Allah took as an intimate friend. The Kaʿbah, the Hajj and the line of prophets after him all run back to him.',
        '**Musa**: Moses, given the Tawrat. Named in the Qur’an more than any other.',
        '**ʿIsa**: Jesus, the son of Maryam, given the Injil. What Muslims believe about him has a page of its own.',
        '**Muhammad ﷺ**: the last. The Qur’an calls him the seal of the prophets, and no prophet comes after him. He has a page of his own too.',
      ],
      sources: [
        quran(4, 125, { surahName: 'An-Nisa' }),
        // Ibrahim and Ismaʿil raising the foundations of the House: the
        // Kaʿbah claim in his bullet.
        quran(2, 127, { surahName: 'Al-Baqarah' }),
        quran(33, 40, { surahName: 'Al-Ahzab' }),
        general(
          'That Musa is the most-named prophet in the Qur’an is a count, not a ruling, and it is the standard one. The rest of the list is what each entry’s own verses say.',
        ),
      ],
      notes: [
        note(
          'practical',
          'Muslims say “peace be upon him” after a prophet’s name, ʿalayhi s-salam, and ﷺ after Muhammad’s. You will hear both constantly, and nobody minds if you forget.',
        ),
      ],
    },
    {
      id: 'all-or-none',
      heading: 'Can I believe in some and not others?',
      body:
        'No, and this is the part that surprises people who came from another faith. Believing in the prophets means all of them, as men Allah sent, without ranking one people’s prophet above another’s. The Qur’an puts the words in the believers’ mouths: we make no distinction between any of His messengers. You do not give up Musa or ʿIsa by becoming Muslim. You keep them, and you stop being asked to choose.',
      sources: [quran(2, 285, { surahName: 'Al-Baqarah' })],
    },
  ],
};
