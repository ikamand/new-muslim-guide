import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over a checked citation.
 *
 * `learn/family.ts` defers the rulings to somebody local, which is right and
 * stays right. What the research found missing is the SHAPE — that there is a
 * walī, a mahr, witnesses, and no dating — which is orientation rather than a
 * ruling, and which converts get catastrophically wrong in the first two years
 * precisely because nobody described it.
 *
 * ⚠️ This page rules on nothing. Not who may marry whom, not what a valid
 * contract requires in a given country, not the position on a walī for a
 * convert with no Muslim family — that last one is a real and contested
 * question, and it is named as one rather than answered.
 */
export const MARRIAGE_SHAPE: Reference = {
  id: 'marriage-shape',
  surface: 'learn',
  title: 'Marriage, in shape',
  subtitle: 'What the pieces are, before you need any of them',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 4,
    tags: ['family'],
    relatedContent: [ref('reference', 'family'), ref('reference', 'manners')],
  },
  quickFacts: [
    { label: 'Not a sacrament', value: 'A contract, with witnesses', emphasis: true },
    { label: 'Not required', value: 'A mosque, a party, or a big cost' },
  ],
  sections: [
    {
      id: 'contract',
      heading: 'What is a Muslim marriage?',
      body:
        'A contract, agreed in front of witnesses. It is not a sacrament and not a religious mystery. It is an offer, an acceptance, a gift from the husband to the wife, and people present who heard it. It can happen in a living room in ten minutes.\n\nMost of what you will see at a wedding, the venue, the clothes, the several hundred guests, is culture on top of that. None of it is the marriage.',
      sources: [
        general(
          'The elements named here, offer and acceptance, witnesses, and the mahr, are the shape agreed across the Sunni schools. What each requires in detail, and what a given country also requires legally, is not decided here.',
        ),
      ],
    },
    {
      id: 'pieces',
      heading: 'What are the pieces called?',
      body: 'Four words that will come up constantly, and are never explained to a newcomer.',
      bullets: [
        '**Mahr**: a gift from the husband to the wife, and hers absolutely. It can be small. It is not a price, and it is not paid to her family.',
        '**Walī**: the bride’s guardian, usually her father, who acts for her in the contract.',
        '**Witnesses**: people present who can confirm that it happened.',
        '**Nikāḥ**: the contract itself, and the name for the occasion.',
      ],
      notes: [
        note(
          'differs',
          'What a walī is for, and what happens when a convert woman has no Muslim family, is a real question the schools answer differently. It is one to take to somebody local rather than settle from a page.',
        ),
      ],
    },
    {
      id: 'dating',
      heading: 'So how do people actually meet?',
      body:
        'Openly, and with somebody else around. There is no dating in the sense of a private relationship that may or may not turn into something. The assumption is that you are talking because you are considering marriage, and that you are not doing it alone.\n\nIn practice that means meeting through family, through a mosque, or through an app made for it, and then meeting in public or with somebody present. This is the part converts most often get wrong, usually by accident, and usually by carrying over what they already knew.',
    },
    {
      id: 'choosing',
      heading: 'What am I meant to be looking for?',
      promote: 'hero',
      body:
        'The Prophet ﷺ listed the four things people marry for, wealth, family standing, beauty and religion, and said to choose for religion. That is not a demand for austerity. It is a ranking, and religion is the only one of the four that survives everything else changing.',
      sources: [hadith('bukhari', '5090')],
    },
    {
      id: 'already',
      heading: 'What if I am already married?',
      body:
        'Then this page is not about your situation. Becoming Muslim while married is common, and it has its own answer, which depends on who your spouse is and what happens next. It has its own page, and this one would give you the wrong picture entirely.',
      notes: [
        note(
          'practical',
          'Do not act on anything about an existing marriage from general reading. It is the single most common place converts are given bad advice by well-meaning strangers.',
        ),
      ],
    },
  ],
};
