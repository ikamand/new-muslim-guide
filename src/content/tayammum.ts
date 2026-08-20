import { note, ref } from './model';
import { hadith } from './sources';
import type { Guide } from './types';

/**
 * Purification without water.
 *
 * ⚠️ REVIEW REQUIRED — model-written and unchecked, and this file has the
 * app's clearest school-of-thought split in it.
 *
 * Taught here as face and hands to the wrists, which is what the hadith of
 * ʿAmmar ibn Yasir describes. Some schools teach wiping the arms to the elbows.
 * The step carries a note saying so, because a beginner watching someone else
 * do it differently will otherwise think one of them is wrong.
 *
 * The hard part of this subject is not the method — it is knowing you are
 * allowed to use it. People miss prayers they could have prayed.
 */
export const TAYAMMUM: Guide = {
  id: 'tayammum',
  title: 'Tayammum',
  subtitle: 'When you cannot use water',
  meta: {
    category: 'purification',
    difficulty: 'building',
    estimatedMinutes: 3,
    beginnerPriority: 3,
    tags: ['travel', 'health'],
    relatedContent: [ref('guide', 'wudu'), ref('guide', 'ghusl')],
  },
  steps: [
    {
      id: 'when',
      title: 'When you can use it',
      instruction:
        'Tayammum replaces wudu, and replaces ghusl, when there is no water you can reach, when using it would make you ill or make an illness worse, or when the only water available is needed for drinking.',
      note: 'It is not for when water is merely inconvenient. But it is genuinely allowed when it applies — people miss prayers they were permitted to pray.',
    },
    {
      id: 'intention',
      title: 'Intend',
      instruction:
        'Intend in your heart that you are purifying yourself for prayer, in place of using water.',
    },
    {
      id: 'strike',
      title: 'Touch the ground',
      instruction:
        'Place both palms flat on a clean natural surface — earth, sand, stone, or dust settled on something. Lift them and shake off any excess.',
      note: 'It does not have to be soil. A dusty windowsill or a stone wall will do.',
    },
    {
      id: 'face',
      title: 'Wipe your face',
      instruction: 'Wipe both palms once over your whole face.',
    },
    {
      id: 'hands',
      title: 'Wipe your hands',
      instruction:
        'Wipe the back of your right hand to the wrist with your left palm, then the back of your left hand with your right. You are finished and may pray.',
      // Classified rather than reworded: the sentence a reader sees is
      // unchanged, and the app now knows this is a genuine difference between
      // schools rather than a practical tip.
      notes: [
        note(
          'differs',
          'Some schools wipe the arms to the elbows instead of stopping at the wrists. Both are taught by scholars; you will see people do it either way.',
          {
            // The method this guide teaches — one stroke, the backs of the
            // hands, then the face — is the one `Ammar ibn Yasir describes.
            sources: [
              hadith('bukhari', '347', {
                book: 7,
                bookName: 'Rubbing hands and feet with dust (Tayammum)',
                inBookReference: 'Book 7, Hadith 8',
              }),
            ],
            additionalExplanation:
              'The wording of the narration is that the Prophet ﷺ struck the earth once, blew the dust off, wiped the back of each hand, and then his face. Schools that teach wiping to the elbows argue from other narrations and from the wudu verse. Nobody will think you have prayed invalidly either way.',
          },
        ),
      ],
    },
    {
      id: 'ends',
      title: 'When it ends',
      instruction:
        'Tayammum breaks for the same reasons wudu breaks, and it ends the moment water becomes available to you.',
    },
  ],
};
