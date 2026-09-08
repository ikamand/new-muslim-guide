import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance.
 *
 * Commissioned by Iyad's curriculum update (`docs/curriculum-update-plan.md`)
 * to answer one question at a beginner's level: how does a Muslim know what
 * Islam says about something? Qur'an, then Sunnah, then the scholars who
 * read both, and fiqh as the result. It is not a page on usūl al-fiqh, and
 * it names no method beyond "read the texts and reason from them".
 *
 * Sits immediately before `rulings.ts`, which gives the five kinds a ruling
 * comes in, and points forward to `why-people-differ.ts`, which explains why
 * the same route produces two answers. This page explains the route and
 * stops.
 *
 * Sources, each opened in the corpus: Qur'an 4:59 (obey Allah and the
 * Messenger; refer disputes to them), Qur'an 59:7 (take what the Messenger
 * gives you, already cited on the Sunnah page), and Bukhari 7352 (the judge
 * who strives is rewarded even when wrong, already cited on why-people-
 * differ). Qur'an 16:43, "ask the people of the message", was considered
 * and left out: Saheeh International reads it as the people of the earlier
 * scriptures, and using it for "ask a scholar" is a wider reading than a
 * beginner's page should print without saying so.
 */
export const WHERE_RULINGS_COME_FROM: Reference = {
  id: 'where-rulings-come-from',
  surface: 'learn',
  title: 'Where do Islamic rulings come from?',
  subtitle: 'How a Muslim knows what Islam says about something',
  meta: {
    category: 'belief',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    relatedContent: [
      ref('reference', 'sunnah'),
      ref('reference', 'rulings'),
      ref('reference', 'why-people-differ'),
    ],
  },
  quickFacts: [
    { label: 'The route', value: 'Qur’an, then the Sunnah, then the scholars who read both', emphasis: true },
    { label: 'The result', value: 'Fiqh: the rulings, sorted into five kinds' },
    { label: 'For you', value: 'Ask a person, and ask where the answer came from' },
  ],
  sections: [
    {
      id: 'route',
      heading: 'How does a Muslim know what Islam says?',
      promote: 'hero',
      body:
        'By asking, in order, what the Qur’an says, what the Prophet ﷺ said and did, and what the scholars who spent their lives on both concluded from them. That order is not a custom. The Qur’an tells believers to obey Allah and obey the Messenger, and to take any dispute back to those two. Everything a Muslim calls a ruling has travelled that route, and knowing the route means you can ask where an answer came from instead of taking it on trust.',
      sources: [quran(4, 59, { surahName: 'An-Nisa' })],
    },
    {
      id: 'quran',
      heading: 'What does the Qur’an settle?',
      body:
        'The commands and the limits. Pray, fast, give, be good to your parents, do not drink, do not take interest. It is short on method: it says to establish the prayer far more often than it says how, and it names what is forbidden in a few lines rather than a code. That is by design. The Qur’an gives the shape, and the next source fills it in.',
    },
    {
      id: 'sunnah',
      heading: 'What does the Sunnah add?',
      body:
        'The method, and the detail. How many rakʿahs, what to say in them, what breaks a fast. The Prophet ﷺ lived the Qur’an in front of people who remembered and wrote down what he said and did, and those reports are the Sunnah. The Qur’an itself tells Muslims to take what the Messenger gives them. The page on the Sunnah explains how a report is graded and why not every one is reliable; here the point is only where it sits, second, and inseparable from the first.',
      sources: [quran(59, 7, { surahName: 'Al-Hashr' })],
    },
    {
      id: 'scholars',
      heading: 'Where do scholars come in?',
      body:
        'Most questions are not answered word for word in either source. Is a mortgage interest? Does a nicotine patch break a fast? What does a convert do about a wedding with no Muslim guardian? Somebody has to read the texts, weigh them, and reason from what they say to the case in front of them. That work is called ijtihād, and the people qualified to do it are scholars.\n\nThe Prophet ﷺ said that a judge who strives for the right answer is rewarded even when he gets it wrong, and twice when he gets it right. Reasoning carefully from the sources is not a departure from them. It is what the sources expect.',
      sources: [hadith('bukhari', '7352')],
      notes: [
        note(
          'practical',
          'This is also why two scholars can give two answers to the same question. That has a page of its own, further along the path.',
        ),
      ],
    },
    {
      id: 'fiqh',
      heading: 'So what is fiqh?',
      body:
        'The result. Fiqh is the body of rulings that reading produced: what is required, what is recommended, what is simply allowed, what is disliked, what is forbidden. Those five kinds are the next lesson, and they are the vocabulary every ruling is stated in. The four schools you will hear named are four traditions of doing this work, and all four are Sunni.',
    },
    {
      id: 'ask',
      heading: 'Who do I actually ask?',
      body:
        'A person, for anything about your own life, because a page cannot hear the part that changes the answer. An imam at a mosque near you is the usual first person. When you get an answer, it is fair to ask where it comes from: a verse, a narration, a school’s position. A good answer can say. And an answer that arrived by this route is worth more than a confident one that did not.',
      sources: [
        general(
          'Orientation, not a ruling. The route itself is the standard account in every introduction to Islamic law; which questions need a person, and how to weigh an answer, is practical advice.',
        ),
      ],
    },
  ],
};
