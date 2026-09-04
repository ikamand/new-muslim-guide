import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Second page of the "What you owe" unit (4 Sep 2026), and the pilot's other
 * end: the party that cannot ask for anything. Written alongside the mother
 * page precisely because the two are as unlike as the unit gets. If one page
 * shape holds a duty owed to a person you love and a duty owed to a stray
 * cat, it holds the four lessons between them.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. Abu Dawud 4941 is outside the
 * two Sahihs and carries its grading printed, per the app's precedent for
 * the graded sunan. The corpus records four graders on it, three saying
 * sahih and one calling the chain hasan, so the page prints sahih with the
 * grader named rather than asserting a grading of its own.
 *
 * ## Two deliberate absences
 *
 * The narrations on slaughter being done well, and on not using a living
 * thing as a target, are both authentic and both left out: they belong with
 * the food page and with a page on hunting, not here. And no verse or
 * narration here is stretched into a modern environmental argument. What the
 * texts say is that mercy extends past people and that damage to crops and
 * livestock is named as corruption; the rest is somebody's inference and is
 * not put in the app's mouth.
 */
export const ANIMALS_AND_LAND: Reference = {
  id: 'animals-and-land',
  surface: 'learn',
  title: 'The animals and the land',
  subtitle: 'What is owed to things that cannot ask',
  meta: {
    category: 'character',
    difficulty: 'deeper',
    estimatedMinutes: 4,
    beginnerPriority: 4,
    relatedContent: [ref('reference', 'your-mother'), ref('reference', 'manners')],
  },
  quickFacts: [
    { label: 'The measure', value: 'Mercy to what cannot ask you for it', emphasis: true },
    { label: 'Any creature', value: 'There is a reward for serving it' },
    { label: 'A tree', value: 'Charity for whatever eats from it' },
  ],
  sections: [
    {
      id: 'why',
      heading: 'What is actually owed here?',
      promote: 'hero',
      body:
        'Mercy, and the texts treat it as a disposition rather than a list of rules. The merciful are shown mercy by the Most Merciful, and the instruction is to be merciful to those on the earth so that the One above the heavens will be merciful to you. The Qur’an gives the reason underneath it. There is no creature on the earth, and no bird that flies, but they are communities like you. They are not scenery, and they are going back to their Lord as you are.',
      sources: [
        hadith('abu-dawud', '4941', { grading: 'sahih', gradedBy: 'Al-Albani' }),
        quran(6, 38, { surahName: 'Al-Anʿam' }),
        general(
          'That the instruction describes a disposition rather than a list of rules is how the texts quoted here read together.',
        ),
      ],
    },
    {
      id: 'dog',
      heading: 'What did that look like?',
      body:
        'A man on a journey went down a well to drink, and came up to find a dog panting and eating the earth from thirst. He said that this animal was suffering what he had just suffered. He went back down, filled his shoe with water, carried it up in his teeth and gave the dog a drink. He was forgiven for it. The companions asked whether there was really a reward for them in animals, and the Prophet ﷺ said there is a reward for serving any living thing.',
      sources: [hadith('bukhari', '2363', { role: 'virtue' })],
    },
    {
      id: 'cat',
      heading: 'And if you do not?',
      body:
        'The same teaching has a second half, and it is not softened. A woman was punished over a cat she had shut in until it died. She neither fed it nor gave it water, and she did not let it go to feed itself. Nothing in the account says she was cruel beyond that. She simply kept an animal and did not attend to it, which is a thing anyone can do without noticing.',
      sources: [hadith('bukhari', '3482')],
    },
    {
      id: 'tree',
      heading: 'What about the land itself?',
      body:
        'Whoever plants a tree or sows a crop has given charity for every bird, person or animal that eats from it. The reward is not conditional on who eats or on it being meant for them. Against that, the Qur’an describes the man who moves through the land causing corruption and destroying crops and cattle, and says plainly that God does not love corruption.',
      sources: [
        hadith('bukhari', '2320', { role: 'virtue' }),
        quran(2, 205, { surahName: 'Al-Baqarah' }),
      ],
      notes: [
        note(
          'practical',
          'The narration counts what is taken without permission as charity too. A tree is not a transaction.',
        ),
      ],
    },
  ],
};
