import { note, ref } from '../model';
import { general, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English.
 *
 * The research calls this "one of the most common convert situations that
 * exists", and the app did not acknowledge it. Arriving at Islam with a
 * girlfriend, a boyfriend, or a husband or wife who has not converted is the
 * ordinary case, not the edge one.
 *
 * ⚠️ **This page answers almost nothing, and that is the design.** Whether an
 * existing marriage continues, what happens if one spouse converts and the
 * other does not, and what any of it means for children are questions with
 * real conditions on them, real differences between the schools, and legal
 * consequences in some countries. A page cannot know which apply.
 *
 * What it does is the thing nothing else was doing: say that the situation is
 * normal, that it has an answer, that the answer is not automatically the
 * frightening one, and where to take it. Every convert-support source surveyed
 * reports people acting on internet advice here and doing irreversible damage.
 */
export const A_PARTNER_ALREADY: Reference = {
  id: 'a-partner-already',
  surface: 'learn',
  title: 'If you already have a partner',
  subtitle: 'What to do first when you did not arrive alone',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    tags: ['family'],
    relatedContent: [
      ref('reference', 'marriage-shape'),
      ref('reference', 'family'),
      ref('reference', 'life-before'),
    ],
  },
  quickFacts: [
    { label: 'First thing', value: 'Nothing irreversible', emphasis: true },
    { label: 'This is', value: 'Common. You are not an unusual case' },
  ],
  sections: [
    {
      id: 'dont-act',
      heading: 'What should I do first?',
      body:
        'Nothing irreversible, and not today. If you have taken one thing from this page, take that.\n\nPeople in exactly your position end marriages, leave homes and tell partners things they cannot take back, on the strength of a forum post or one confident acquaintance — and then find out the actual answer was different. There is no deadline on this. Pray tonight, and let this take the weeks it takes.',
      sources: [
        general(
          'Deliberately not a ruling. The rulings here turn on the specific relationship and sometimes on the law where you live, and a general answer would be wrong for most readers of it.',
        ),
      ],
    },
    {
      id: 'normal',
      heading: 'Is my situation unusual?',
      body:
        'No. Most people do not arrive at Islam alone — they arrive with a partner, or a marriage, or children, and often with none of it discussed yet. It is one of the most common convert situations there is, and any imam you speak to will have handled it many times before you.\n\nWhat is uncommon is having anybody explain that in advance, which is why this page exists.',
    },
    {
      id: 'married',
      heading: 'What happens to my marriage?',
      body:
        'It depends on who you both are, and the answer is genuinely not the same for everyone — which is precisely why this page will not give you one. What is worth knowing is that "you must divorce" is not the automatic answer people often assume, and that whoever tells you it is, without asking anything about your situation, is not the person to be advising you.\n\nTake it to somebody who will ask questions first: your local imam, or a scholar you can actually speak to.',
      notes: [
        note(
          'differs',
          'This is a genuine area of scholarly difference and of case-by-case ruling, not a settled single answer. Somebody who gives you one in a sentence has not understood the question.',
        ),
      ],
    },
    {
      id: 'not-married',
      heading: 'What if we are together but not married?',
      body:
        'Then the shape you are being pointed towards is marriage, and the honest thing is that it will be a conversation rather than an announcement. Some people marry. Some separate. Some spend a long time somewhere in between while a partner works out what they think.\n\nAll three happen, and none of them means you failed at becoming Muslim.',
    },
    {
      id: 'telling',
      heading: 'How do I tell them?',
      body:
        'Earlier than feels comfortable and more plainly than you want to. The thing that damages a relationship here is rarely the conversion; it is the six weeks of a partner sensing something has changed and not being told what.\n\nYou do not have to have all the answers before you talk to them. "This is real for me, I am still working out what it means, and I am not going anywhere" is a complete opening.',
      sources: [quran(29, 46, { surahName: 'Al-Ankabut' })],
      notes: [
        note(
          'practical',
          'A partner’s first reaction is often not their settled one. Give the conversation more than one attempt before concluding anything from it.',
        ),
      ],
    },
    {
      id: 'who-to-ask',
      heading: 'Who do I actually ask?',
      body:
        'A local imam, in person, with the specifics. Not a forum, not a group chat, and not the most confident person at the mosque — this is the kind of question where confidence and knowledge come apart, and where a wrong answer costs a marriage.\n\nIf approaching a mosque feels like too much, many have a person whose job is exactly this, and asking at the office rather than after prayer is entirely normal.',
    },
  ],
};
