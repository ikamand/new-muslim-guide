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
    { label: 'The word', value: 'Ḥasad, wanting someone to lose what they have' },
    { label: 'Allowed', value: 'Wanting the same good for yourself, without them losing it' },
    { label: 'The habit', value: 'Look at who has less, not only at who has more' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'Where does envy sit?',
      promote: 'hero',
      body:
        'The Prophet ﷺ named it in a list, and the company it keeps tells you how it is seen. Beware of suspicion, he said, for suspicion is the falsest of speech. Do not spy on one another, do not envy one another, do not turn away from one another, do not hate one another. Be servants of Allah, brothers. Every item on that list is a way one person’s private feelings quietly damage a group. Envy is counted among them, not treated as a harmless private feeling.',
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
        'No, and the line between the two is clear. The Prophet ﷺ said not to wish to be like anyone except in two cases: a man Allah gave wealth, who spends it rightly, and a man Allah gave wisdom, who acts on it and teaches it. Wanting the same good for yourself, without wishing that they lose theirs, is allowed. Arabic has a separate word for it, ghibṭah. Ḥasad is wanting the thing taken away from them. Underneath, that is a complaint about who was given what, and it is aimed past the person at the One who gave it.',
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
        'A change of direction, given as a practical instruction rather than as an attitude to adopt. When one of you looks at somebody who has been given more than him in wealth or in looks, the Prophet ﷺ said, let him look at someone who has less. Much of envy comes down to where the eye rests by habit. The instruction does not ask you to feel differently. It asks you to look somewhere else, and lets the feeling follow.',
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
        'What converts envy is not usually money. It is someone reading Arabic without thinking about it, a family that eats together at iftar, twenty years of practice already behind them, a name that fits. Most of that cannot be wanted, because it is a childhood, and it has already happened. The permitted kind of wanting is for what is still open: you can want the Arabic and go and learn it, slowly, and badly at first. The rest is something to grieve rather than resent, and the two are not the same.',
    },
  ],
};
