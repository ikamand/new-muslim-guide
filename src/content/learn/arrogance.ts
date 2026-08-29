import { ref } from '../model';
import { hadith } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const ARROGANCE: Reference = {
  id: 'arrogance',
  surface: 'learn',
  title: 'Thinking you are better',
  subtitle: 'Kibr, and the two things it actually means',
  meta: {
    category: 'character',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 3,
    relatedContent: [
      ref('reference', 'showing-off'),
      ref('reference', 'being-corrected'),
      ref('reference', 'manners'),
    ],
  },
  quickFacts: [
    { label: 'The word', value: 'Kibr — arrogance' },
    { label: 'Defined as', value: 'Rejecting the truth, and looking down on people' },
    { label: 'Not arrogance', value: 'Liking good clothes. He ﷺ was asked exactly that' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What counts as arrogance?',
      promote: 'hero',
      body:
        'He ﷺ said that nobody with an atom’s weight of kibr in his heart enters Paradise. A man in the gathering heard that and asked the obvious question — a person likes his clothes to look good, and his shoes. He was told that Allah is beautiful and loves beauty, and then given the definition: kibr is rejecting the truth and looking down on people.',
      sources: [
        hadith('muslim', '91', {
          book: 1,
          bookName: 'The Book of Faith',
          inBookReference: 'Book 1, Hadith 171',
        }),
      ],
      note:
        'The answer is worth as much as the warning. Somebody heard a hard statement, applied it to himself in the wrong place, and was corrected on the spot. Arrogance is not self-respect, tidiness or confidence.',
    },
    {
      id: 'truth',
      heading: 'Rejecting the truth — what does that mean in practice?',
      body:
        'Knowing you are wrong and not saying so. It is the half of the definition people skip, because it does not feel like arrogance from the inside; it feels like holding your ground. But refusing a correction because of who gave it, or because taking it would be embarrassing, is the thing being named — and it is much more common than looking down on anybody.',
      sources: [
        {
          kind: 'general',
          basis:
            'Ordinary explanation of the first half of the definition given in the narration above — baṭar al-ḥaqq, rejecting the truth.',
        },
      ],
    },
    {
      id: 'cure',
      heading: 'What is the opposite?',
      body:
        'Not thinking badly of yourself. Humility here is a downward movement you make on purpose, and the promise attached to it runs the other way: charity does not decrease wealth, forgiving someone only increases a person’s honour, and no one humbles himself for Allah except that Allah raises him. All three are counter-intuitive on purpose — each names the thing you fear losing and says you will not lose it.',
      sources: [
        hadith('muslim', '2588', {
          book: 45,
          bookName: 'The Book of Virtue, Enjoining Good Manners, and Joining of the Ties of Kinship',
          inBookReference: 'Book 45, Hadith 90',
        }),
      ],
    },
    {
      id: 'converts',
      heading: 'What does this look like for me now?',
      body:
        'It arrives in two directions and the second one is the surprise. Someone will correct your prayer in a tone that has nothing to do with your prayer, and it will sting. But new certainty is its own risk: three months in, it is easy to look at the family you left, or at Muslims who seem casual about it, and quietly rank yourself. You have no idea what anybody else is carrying, and none of the people you are ranking know how long you will keep this up either.',
    },
  ],
};
