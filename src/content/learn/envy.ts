import { ref } from '../model';
import { hadith } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const ENVY: Reference = {
  id: 'envy',
  surface: 'learn',
  title: 'Wanting what someone else has',
  subtitle: 'Ḥasad, the one kind that is allowed, and what to do with the rest',
  meta: {
    category: 'character',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 3,
    relatedContent: [
      ref('reference', 'patience-and-gratitude'),
      ref('reference', 'arrogance'),
      ref('reference', 'manners'),
    ],
  },
  quickFacts: [
    { label: 'The word', value: 'Ḥasad — wanting someone to lose what they have' },
    { label: 'Allowed', value: 'Wanting the same good for yourself, without them losing it' },
    { label: 'The habit', value: 'Look at who has less, not only at who has more' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'Where does envy sit?',
      promote: 'hero',
      body:
        'In a list, and the company it keeps is the point. Beware of suspicion, he ﷺ said, for suspicion is the falsest of speech; do not spy, do not envy one another, do not turn away from one another, do not hate one another — be servants of Allah, brothers. Every item is a way one person’s inner life quietly wrecks a group, and envy is filed with them rather than treated as a private feeling.',
      sources: [
        hadith('bukhari', '6064', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 94',
        }),
      ],
    },
    {
      id: 'allowed',
      heading: 'Is wanting what someone has always wrong?',
      body:
        'No, and the distinction is exact. Do not wish to be like anyone, he ﷺ said, except in two cases: a man Allah gave wealth who spends it rightly, and a man Allah gave wisdom who acts by it and teaches it. Wanting the same good for yourself, with no wish that they lose theirs, is the permitted kind — Arabic calls it ghibṭah. Ḥasad proper is wanting the thing gone from them, and that is a complaint about who was given what, aimed past the person at the One who gave it.',
      sources: [
        hadith('bukhari', '73', {
          book: 3,
          bookName: 'Knowledge',
          inBookReference: 'Book 3, Hadith 15',
        }),
      ],
    },
    {
      id: 'cure',
      heading: 'What actually stops it?',
      body:
        'A change of direction, given as a practical instruction rather than an attitude: when one of you looks at somebody given more than him in wealth or in looks, let him look at someone who has less. Envy is largely a matter of where the eye rests by default. The instruction does not ask you to feel differently. It asks you to look somewhere else, and lets the feeling follow.',
      sources: [
        hadith('bukhari', '6490', {
          book: 81,
          bookName: 'To make the Heart Tender (Ar-Riqaq)',
          inBookReference: 'Book 81, Hadith 79',
        }),
      ],
    },
    {
      id: 'converts',
      heading: 'What does this look like for me now?',
      body:
        'The thing converts envy is not usually money. It is somebody reading Arabic without thinking about it, a family that eats together at iftar, twenty years of this already behind them, a name that fits. None of that is available to want — it is a childhood, and it is gone. What the permitted kind allows is the part that is still open: you can want the Arabic and go and get it, slowly, badly at first. The rest is worth grieving rather than resenting, and they are not the same thing.',
    },
  ],
};
