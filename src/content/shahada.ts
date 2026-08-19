import { Recitations } from './recitations';
import type { Guide } from './types';

/**
 * Becoming Muslim.
 *
 * A guide rather than a reference page because it is a thing you do, and the
 * most consequential thing anyone will do in this app. It is also the one
 * screen some people open before they are Muslim at all, so it explains before
 * it instructs — nobody should say these words without knowing what they mean.
 *
 * ⚠️ REVIEW REQUIRED — model-written and unchecked. The points needing a
 * qualified eye most: that witnesses are not a condition of validity, that a
 * full wash afterwards is recommended rather than required, and the wording
 * about what becoming Muslim erases.
 *
 * Deliberately short. Someone reading this is not looking for theology; they
 * are looking for what to do in the next ten minutes.
 */
export const SHAHADA_GUIDE: Guide = {
  id: 'shahada',
  title: 'Becoming Muslim',
  subtitle: 'What to say, and what it means',
  steps: [
    {
      id: 'understand',
      title: 'Know what you are saying',
      instruction:
        'Becoming Muslim is one sentence, said and meant. Before you say it, be clear on both halves: that worship belongs to Allah alone and nothing shares that with Him, and that Muhammad ﷺ was sent by Him to convey how.',
      note: 'It has to be meant. Saying the words to please someone else, or to marry, does not make a person Muslim.',
    },
    {
      id: 'say',
      title: 'Say it',
      instruction:
        'Say it aloud, in Arabic if you can manage it. If the Arabic is beyond you today, say it in your own language and meaning it — then learn the Arabic, because you will say it in every prayer for the rest of your life.',
      says: Recitations.shahada,
      note: 'No witnesses are needed for this to count, and no imam has to be present. Many people do say it in front of others, and a mosque can give you a certificate if you ever need to prove it — for a pilgrimage visa, or a Muslim marriage.',
    },
    {
      id: 'after',
      title: 'You are Muslim',
      instruction:
        'That is it. Nothing else is required of you in this moment, and nothing you did before it is held against you — becoming Muslim wipes what came before.',
      note: 'You do not need to change your name. You do not need to tell anyone today. Take a full wash when you can, which is recommended for someone who has just become Muslim, and then learn wudu and the prayer — in that order, without rushing.',
    },
  ],
};
