import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance.
 *
 * Commissioned by Iyad's curriculum update (`docs/curriculum-update-plan.md`)
 * as the page for the situation after `learn/family.ts` ends. That page
 * answers "do I have to tell them?" and "what if it is not safe to tell
 * them?". This one starts where they know, and did not take it well.
 *
 * ## The sources, each opened in the corpus before it was cited
 *
 * - Qur'an 31:15, already cited on the family page for the same point: do
 *   not obey them in leaving belief, and keep their company with kindness.
 * - Sahih al-Bukhari 2620: Asmāʾ bint Abī Bakr's mother came to her while
 *   still a pagan, wanting help, and the Prophet ﷺ told Asmāʾ to keep good
 *   relations with her. Cited without a book name, as `your-mother.ts` cites
 *   5971, because the corpus gives the number and the app's convention for
 *   Bukhari's book titles was not checked for book 51.
 * - Qur'an 60:8: kindness and justice towards those who did not fight you
 *   over religion. Cited for what it says, and the next verse, which draws
 *   the line at those who did, is deliberately not quoted here: a page for
 *   a convert whose parents are upset is not the place to teach it.
 * - Qur'an 28:56: you do not guide whom you love. Cited on its own. Bukhari
 *   1360, the Prophet ﷺ at Abu Talib's deathbed, was read and left out,
 *   because the narration ends with the verse forbidding prayer for the
 *   forgiveness of pagans, and a page printing it would raise a question it
 *   does not answer. The janazah page is where that belongs.
 *
 * ## What is not here
 *
 * No ruling on attending a religious festival with the family, exchanging
 * gifts at one, or eating at their table; the food page holds the last, and
 * the rest are questions for a person. Nothing about custody, inheritance
 * or a marriage in the family. Those are the questions the support section
 * hands to someone who can hear the whole situation.
 */
export const FAMILY_DOESNT_ACCEPT: Reference = {
  id: 'family-doesnt-accept',
  surface: 'learn',
  title: 'What if my family doesn’t accept my Islam?',
  subtitle: 'Keeping the relationship when they wish you had not',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 6,
    beginnerPriority: 2,
    tags: ['family'],
    relatedContent: [
      ref('reference', 'family'),
      ref('reference', 'your-mother'),
      ref('reference', 'who-can-i-talk-to'),
    ],
  },
  quickFacts: [
    { label: 'Their anger', value: 'Changes nothing about what you owe them', emphasis: true },
    { label: 'Your line', value: 'The thing asked of you, not the relationship' },
    { label: 'If unsafe', value: 'Leave first and explain later. People can help' },
  ],
  sections: [
    {
      id: 'owed',
      heading: 'Does their reaction change what I owe them?',
      promote: 'hero',
      body:
        'No. The verse that tells you not to obey parents who press you to give up belief in God alone tells you, in the same sentence, to keep their company in this world with kindness. Both halves are the instruction, and the second does not wait for them to come round.\n\nAsmāʾ, the daughter of Abū Bakr, was visited by her mother while her mother was still a pagan and wanted help from her. She asked the Prophet ﷺ whether she should keep good relations with her, and he told her yes. That is a parent who did not share her daughter’s religion, and the answer was to keep her close.',
      sources: [quran(31, 15, { surahName: 'Luqman' }), hadith('bukhari', '2620')],
    },
    {
      id: 'why',
      heading: 'Why are they reacting like this?',
      body:
        'Usually because they think they have lost you. A parent hears that you have changed religion and hears, underneath it, that you have rejected the home you were raised in, and that you will now be a stranger at their table. Some of it is fear of what they have seen on the news. Some of it is grief. Almost none of it is a considered view of Islam, which is why arguing the case rarely helps in the first months.\n\nWhat changes their mind, when it changes, is watching you. A son who calls more than he used to, a daughter who is calmer than she was. Time and conduct do what no conversation can.',
      sources: [
        general(
          'Orientation, not a ruling. Every convert-support source surveyed describes the same first reaction and the same slow thaw, and the advice here follows it.',
        ),
      ],
      notes: [
        note(
          'practical',
          'The questions they will actually ask, about violence, about Jesus, about why you cannot eat what they cook, each have a page of their own. Read those before the next visit, not during it.',
        ),
      ],
    },
    {
      id: 'line',
      heading: 'What do I refuse, and what do I not?',
      body:
        'The refusal is narrow. It covers the thing being asked of you, not the relationship. Being asked to skip a prayer so there is no scene is the thing to decline. Being asked to come to dinner is not. Being asked to drink to prove you are still one of them is the thing to decline. Being asked to help your father in the garden is not.\n\nThe Qur’an says God does not forbid you from being good and fair to people who have not fought you over your religion. A parent who is upset with you has not fought you. Be good to them, and hold the line where it actually is.',
      sources: [quran(60, 8, { surahName: 'Al-Mumtahanah' })],
      notes: [
        note(
          'practical',
          'Say the boundary once, kindly, in plain words: “I don’t drink now, but I would love to come.” Then stop explaining it. A boundary re-argued at every visit becomes the row you were trying to avoid.',
        ),
      ],
    },
    {
      id: 'time',
      heading: 'How long does this take?',
      body:
        'Longer than you would like, and it is not in your hands. The Qur’an tells the Prophet ﷺ himself that he does not guide whom he loves; Allah guides whom He wills. If he could not make the people he loved believe, you are not failing when you cannot either. Your job is to stay kind and stay in the room. Whether they ever come round is not your job, and it was never the condition for being good to them.\n\nFamilies that shouted in the first month are often at the table in the third year. Keep the door open and let the years do the work.',
      sources: [quran(28, 56, { surahName: 'Al-Qasas' })],
    },
    {
      id: 'safety',
      heading: 'What if it is not safe at home?',
      body:
        'Then leave, and sort out the explanations later. Nothing in your religion asks you to stay somewhere you are in danger, and praying where nobody can see you is not a lesser prayer. If you cannot leave yet, find one person outside the house who knows the whole situation: a friend, someone at a mosque, or one of the helplines on the page about who to talk to. They are used to this, and they will not need you to explain your religion first.',
      sources: [
        general(
          'Practical advice for a dangerous situation, not a ruling. Where staying or leaving raises a question of what is owed to a parent, that question goes to a person who can hear the whole of it.',
        ),
      ],
    },
    {
      id: 'support',
      heading: 'Who can I lean on while it is hard?',
      body:
        'One Muslim who knows your whole story, so that you are not carrying it alone. The imam at a nearby mosque, for the questions that depend on your particular family. And, for the nights when it is too much, a helpline. The page about who to talk to lists them. You do not have to be in crisis to call one.',
    },
  ],
};
