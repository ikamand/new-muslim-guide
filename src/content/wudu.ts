import { Recitations } from './recitations';
import { ref } from './model';
import { quran } from './sources';
import type { Guide } from './types';

/**
 * Wudu comes before prayer, so it comes first in the app. Every step is
 * "wash this, this many times" — the only thing a first-timer really needs
 * is the order and where each washing starts and stops.
 */
export const WUDU: Guide = {
  id: 'wudu',
  title: 'Wudu',
  subtitle: 'Washing before prayer',
  meta: {
    category: 'purification',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 1,
    tags: ['first-day'],
    sources: [quran(5, 6, { surahName: "Al-Ma'idah" })],
    relatedContent: [
      ref('guide', 'ghusl'),
      ref('guide', 'tayammum'),
      ref('guide', 'fajr'),
    ],
  },
  steps: [
    {
      id: 'intention',
      title: 'Intend',
      posture: 'washing',
      instruction:
        'Intend in your heart that you are performing wudu to purify yourself for prayer, then say:',
      says: Recitations.bismillah,
      note: 'Wudu lasts until it is broken — by using the toilet, passing wind, or deep sleep. It does not need repeating for every prayer.',
    },
    {
      id: 'hands',
      title: 'Wash your hands',
      posture: 'washing',
      instruction: 'Wash both hands up to the wrists, three times, between the fingers.',
    },
    {
      id: 'mouth',
      title: 'Rinse your mouth',
      posture: 'washing',
      instruction:
        'Take water into your mouth with your right hand, swill it around and spit it out. Three times.',
    },
    {
      id: 'nose',
      title: 'Rinse your nose',
      posture: 'washing',
      instruction:
        'Sniff a little water into your nose with your right hand, then blow it out using your left. Three times.',
    },
    {
      id: 'face',
      title: 'Wash your face',
      posture: 'washing',
      instruction:
        'Wash your whole face three times — from your hairline to under your chin, and from ear to ear.',
    },
    {
      id: 'arms',
      title: 'Wash your arms',
      posture: 'washing',
      instruction:
        'Wash your right arm from the fingertips to just past the elbow, three times. Then the left, three times.',
      note: 'Right before left is the pattern for everything that comes in a pair.',
    },
    {
      id: 'head',
      title: 'Wipe your head',
      posture: 'washing',
      instruction:
        'With wet hands, wipe over your head from the front to the back and return to the front. Once.',
      note: 'Wiping, not washing — and once, not three times.',
    },
    {
      id: 'ears',
      title: 'Wipe your ears',
      posture: 'washing',
      instruction:
        'With the same wetness, put your index fingers inside your ears and your thumbs behind them, and wipe. Once.',
    },
    {
      id: 'feet',
      title: 'Wash your feet',
      posture: 'washing',
      instruction:
        'Wash your right foot to just past the ankle, between the toes, three times. Then the left, three times.',
    },
    {
      id: 'after',
      title: 'Finish',
      posture: 'washing',
      instruction: 'When you are done, say:',
      says: Recitations.shahadaAfterWudu,
      note: 'You are now ready to pray.',
    },
  ],
};
