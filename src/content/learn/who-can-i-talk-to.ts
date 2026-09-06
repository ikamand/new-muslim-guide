import { CRISIS_RESOURCES } from '../crisis';
import { ref } from '../model';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English. No citations: nothing on this
 * page is a ruling. Not yet read by Iyad.
 *
 * The human-support directory the "Tell us what you were looking for" plan
 * requires (docs/superpowers/plans/2026-09-05-tell-us-what-you-were-looking-for.md,
 * Task 1.2). It is the "needs a person" answer for questions the app cannot
 * take, and the page the ask sheet's crisis card belongs to.
 *
 * ## One list, not two
 *
 * The helplines are read from `crisis.ts`, the same data the ask sheet
 * matches against, so a number is changed once. Nothing in this file names a
 * phone number of its own.
 *
 * ## Named absence
 *
 * Convert-support organisations by country are not listed yet. Each one has
 * to be opened and checked on the day it is typed, and which ones to name is
 * Iyad's call. Until then the page sends people to the nearest mosque and
 * to the helplines, which are both real.
 */
export const WHO_CAN_I_TALK_TO: Reference = {
  id: 'who-can-i-talk-to',
  surface: 'learn',
  title: 'Who can I talk to?',
  subtitle: 'A person for a question, and a person for a hard night',
  meta: {
    category: 'community',
    difficulty: 'foundational',
    estimatedMinutes: 3,
    beginnerPriority: 4,
    tags: ['health', 'mosque'],
    relatedContent: [
      ref('reference', 'mosque'),
      ref('reference', 'if-you-stopped'),
      ref('reference', 'repentance'),
    ],
  },
  quickFacts: [
    { label: 'A question', value: 'The imam at a nearby mosque, after any prayer' },
    { label: 'A hard night', value: 'A helpline. They are used to this', emphasis: true },
    { label: 'This app', value: 'Cannot reply. Nobody reads it live' },
  ],
  sections: [
    {
      id: 'a-question',
      heading: 'Who answers a question this app does not?',
      body:
        'A person who knows you, or can hear the whole of your situation. For most people that is the imam at a mosque near them. Go for any prayer that is not Friday midday, wait until it ends, and say that you are new and have a question. That sentence is enough; it is one they hear often and are glad to.\n\nQuestions about your own life, a marriage, money, a job, a family that does not know yet, need a person for exactly this reason. A page cannot hear the part that changes the answer, which is why some pages in this app end with "ask someone qualified" rather than pretending to.',
    },
    {
      id: 'a-hard-night',
      heading: 'What if tonight is the hard part?',
      body:
        'New Muslims often carry the worst nights alone, because the people who would normally notice are the people they have not told. If you are frightened for yourself, or you do not want to be here any more, that is what these lines are for. There is nothing un-Islamic about calling one. The people on the other end will not judge you and will not need you to explain your religion.',
      bullets: CRISIS_RESOURCES.map(
        (resource) => `**${resource.name}** (${resource.region}). ${resource.how}`,
      ),
    },
    {
      id: 'this-app',
      heading: 'What can this app do, and what can it not?',
      /* The sentence about "Tell us what you were looking for" arrived in the
         same commit as the line itself (5 Sep 2026), not before: a page must
         not describe a line the reader cannot see. */
      body:
        'It can teach you what it already holds, with the radio off. It cannot answer back. When the search finds nothing, you can tell us what you were looking for, and a person reads those later to decide what to write next. Nobody reads them as they arrive and nobody replies, so it is not a way to reach anyone. For that, the people above are real.',
    },
  ],
};
