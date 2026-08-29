import { ref } from '../model';
import { hadith } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const ANGER: Reference = {
  id: 'anger',
  surface: 'learn',
  title: 'When you are angry',
  subtitle: 'The one piece of advice he ﷺ gave three times over',
  meta: {
    category: 'character',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [
      ref('reference', 'patience-and-gratitude'),
      ref('reference', 'being-corrected'),
      ref('reference', 'manners'),
    ],
  },
  quickFacts: [
    { label: 'The word', value: 'Ghaḍab — anger' },
    { label: 'Not forbidden', value: 'Feeling it. What you do with it' },
    { label: 'When it rises', value: 'Say Aʿūdhu bi-llāhi mina-sh-shayṭāni-r-rajīm' },
  ],
  sections: [
    {
      id: 'advice',
      heading: 'Why is this the advice he kept repeating?',
      promote: 'hero',
      body:
        'A man came asking for advice and was told: do not become angry. He asked again, and got the same two words. Again, and again the same. It is the shortest instruction in the collections and it was given to somebody who wanted a whole programme — because anger is the point at which most people lose everything else they have learned.',
      sources: [
        hadith('bukhari', '6116', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 143',
        }),
      ],
    },
    {
      id: 'strength',
      heading: 'Is it weak to hold back?',
      body:
        'The opposite. The strong person, he ﷺ said, is not the one who wins a wrestling match; the strong one is the one who has hold of himself at the moment of anger. Nothing in this asks you to be timid or to let yourself be walked over. It relocates strength from the exchange to the self-control it took not to have it.',
      sources: [
        hadith('bukhari', '6114', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 141',
        }),
      ],
    },
    {
      id: 'say',
      heading: 'What do I actually do in the moment?',
      body:
        'Two men were arguing in front of the Prophet ﷺ until one of them was red in the face, and he said that he knew a sentence which, if the man said it, would take away what he was feeling: I seek refuge with Allah from the accursed Shayṭān. It is short enough to say through clenched teeth, which is the point — it is not a reflection to sit down with, it is something to reach for while it is happening.',
      sources: [
        hadith('bukhari', '6115', {
          book: 78,
          bookName: 'Good Manners and Form (Al-Adab)',
          inBookReference: 'Book 78, Hadith 142',
        }),
      ],
      note:
        'The narration ends with the man refusing to say it — "I am not mad." Anger argues that it is reasonable, and it is the one state in which advice feels like an insult. Knowing that in advance is most of the help.',
    },
    {
      id: 'feeling',
      heading: 'So am I sinning for feeling angry?',
      body:
        'No. Anger arrives; you do not choose it, and there is anger in the Prophet’s own life over things that deserved it. What is being asked for is the gap between feeling it and acting on it — leaving the room, saying nothing for a minute, saying the words above. The instruction is about the second half, not the first.',
      sources: [
        {
          kind: 'general',
          basis:
            'Ordinary explanation of the two narrations above, which address what a person does when anger comes rather than its arrival.',
        },
      ],
    },
    {
      id: 'converts',
      heading: 'What does this look like for me now?',
      body:
        'A relative will say something about your religion that is wrong and said to wound. It will happen when you are tired, in front of other people, and about the thing you care most about. How you answer that is the only thing about Islam most of them will ever read closely — which is unfair, and true. You are allowed to end a conversation. You are not required to win it.',
    },
  ],
};
