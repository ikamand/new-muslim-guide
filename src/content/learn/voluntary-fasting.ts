import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * The research called this "well sourced, wrongly filed": one paragraph inside
 * `learn/islamic-calendar.ts`, covering ʿĀshūrāʾ, Shaʿbān, the six of Shawwāl
 * and the first ten of Dhul-Ḥijjah. It is a PRACTICE, not a calendar fact, and
 * a person deciding whether to fast a Monday will never look for it under "The
 * Muslim year".
 *
 * ⚠️ It names weekdays and it names no DATES. `seasons.ts` settles why: the
 * app's Hijri date comes from Umm al-Qura, months begin by local sighting, and
 * telling somebody to fast ʿĀshūrāʾ on the wrong day is worse than not telling
 * them. Mondays and Thursdays are weekdays and carry no such problem.
 */
export const VOLUNTARY_FASTING: Reference = {
  id: 'voluntary-fasting',
  surface: 'learn',
  title: 'Fasting outside Ramadan',
  subtitle: 'The days people fast by choice, and how little is required',
  meta: {
    category: 'fasting',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 4,
    relatedContent: [ref('reference', 'ramadan'), ref('pillar', 'sawm')],
  },
  quickFacts: [
    { label: 'Required', value: 'None of it. Ramadan is the obligation', emphasis: true },
    { label: 'Easiest start', value: 'One Monday' },
  ],
  sections: [
    {
      id: 'optional',
      heading: 'Do I have to do any of this?',
      promote: 'hero',
      body:
        'No. Ramadan is the fast that is required; everything on this page is voluntary, and skipping all of it is not a shortcoming. The Prophet ﷺ fasted in a way ʿĀʾishah described as going through stretches where you would think he would never stop, and stretches where you would think he would never fast — which is worth holding on to if you have decided you are failing at something.',
      sources: [hadith('bukhari', '1969')],
    },
    {
      id: 'which',
      heading: 'Which days do people fast?',
      body:
        'A few, and they are ordinary rather than obscure. The easiest to start with are the weekly ones, because they need no calendar at all.',
      bullets: [
        '**Mondays and Thursdays** — the common weekly fast, and the simplest thing to try.',
        '**Three days a month** — usually the middle of the lunar month.',
        '**Six days in Shawwāl**, the month after Ramadan.',
        '**ʿĀshūrāʾ**, in Muḥarram, and **the Day of ʿArafah** for those not on Hajj.',
      ],
      notes: [
        note(
          'practical',
          'This app will not tell you the date of ʿĀshūrāʾ or ʿArafah. Those depend on the moon being sighted, and a calculated date is wrong often enough that it would be a bad thing to be confident about. Ask your mosque in the week beforehand.',
        ),
      ],
    },
    {
      id: 'how',
      heading: 'How is it different from Ramadan?',
      body:
        'It is not — the fast itself is the same, dawn to sunset, and it begins with the same intention. What differs is that you can stop. A voluntary fast can be broken partway through without owing anything, which is not true of Ramadan, and that alone makes it a reasonable thing to attempt on a working day.',
    },
    {
      id: 'start',
      heading: 'How should I start?',
      body:
        'One Monday. Not a schedule, not a commitment, not a fast you have announced. Do one, see what it is like on a normal day with a normal job, and decide afterwards.\n\nIf it goes badly, that is information rather than failure, and nothing about it is recorded anywhere.',
      sources: [
        general(
          'Practical advice about starting, claiming no textual authority. Which days are fasted is above and cited; how to begin is not a ruling.',
        ),
      ],
      notes: [
        note(
          'practical',
          'Do not start the week you also start praying five times. One new thing at a time is how either of them lasts.',
        ),
      ],
    },
  ],
};
