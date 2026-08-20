import { Recitations } from './recitations';
import { ref } from './model';
import type { Guide } from './types';

/**
 * The full wash.
 *
 * The most serious hole the app had: it taught wudu and never mentioned ghusl,
 * so someone could follow it exactly and still be praying without valid
 * purification, with nothing on screen telling them.
 *
 * ⚠️ REVIEW REQUIRED — model-written and unchecked.
 *
 * The method taught here is the complete sunnah one rather than the bare
 * minimum. Schools differ on what is strictly obligatory — the Hanafis count
 * rinsing the mouth and nose as required, others do not — and the sunnah
 * method satisfies every school, so a first-timer following it is safe
 * whichever they later learn from. That is a deliberate choice and worth a
 * reviewer's attention.
 *
 * Deliberately plain about what makes it necessary. This is a subject people
 * are too embarrassed to ask about, which is exactly why an app should say it.
 */
export const GHUSL: Guide = {
  id: 'ghusl',
  title: 'Ghusl',
  subtitle: 'The full wash, and when you need it',
  meta: {
    category: 'purification',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    relatedContent: [ref('guide', 'wudu'), ref('guide', 'tayammum')],
  },
  steps: [
    {
      id: 'when',
      title: 'When you need it',
      instruction:
        'Ghusl is required after sex or any release of sexual fluid, and after a period or post-natal bleeding ends. Until you have done it, wudu is not enough and prayer is not valid.',
      note: 'It is also recommended — not required — before Friday prayer, before the two Eids, and for someone who has just become Muslim.',
    },
    {
      id: 'intention',
      title: 'Intend',
      posture: 'washing',
      instruction:
        'Intend in your heart that you are washing to lift the state you are in, then say:',
      says: Recitations.bismillah,
    },
    {
      id: 'hands',
      title: 'Wash your hands',
      posture: 'washing',
      instruction: 'Wash both hands up to the wrists, three times.',
    },
    {
      id: 'private',
      title: 'Wash yourself',
      posture: 'washing',
      instruction:
        'Wash the private parts and anywhere else on the body carrying impurity, using your left hand. Then wash your hands again.',
    },
    {
      id: 'wudu',
      title: 'Perform wudu',
      posture: 'washing',
      instruction:
        'Do a complete wudu as you normally would, including rinsing your mouth and nose. You may leave washing your feet until the very end.',
    },
    {
      id: 'head',
      title: 'Pour over your head',
      posture: 'washing',
      instruction:
        'Pour water over your head three times, working it through your hair until the water reaches the roots and the scalp is wet everywhere.',
      note: 'Long hair does not need undoing for this, but the water has to reach the scalp underneath.',
    },
    {
      id: 'body',
      title: 'Wash the rest of you',
      posture: 'washing',
      instruction:
        'Pour water over the right side of your body, then the left, until every part of you has been reached — under the arms, behind the ears, between the toes. Nothing may be left dry.',
      note: 'Take off anything water cannot pass — a ring, a watch — or move it as you go.',
    },
    {
      id: 'feet',
      title: 'Wash your feet',
      posture: 'washing',
      instruction: 'If you left your feet until now, wash them, and you are finished.',
      note: 'This ghusl counts as your wudu too. You can pray without repeating it, as long as nothing breaks your wudu afterwards.',
    },
  ],
};
