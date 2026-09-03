import { ref } from '../model';
import { hadith } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const SHOWING_OFF: Reference = {
  id: 'showing-off',
  surface: 'learn',
  title: 'Doing it to be seen',
  subtitle: 'Riyāʾ, and the worry that visible worship is showing off',
  meta: {
    category: 'character',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 3,
    relatedContent: [
      ref('reference', 'repentance'),
      ref('reference', 'arrogance'),
      ref('reference', 'sunnah'),
    ],
  },
  quickFacts: [
    { label: 'The word', value: 'Riyāʾ, doing an act of worship to be seen doing it' },
    { label: 'It is about', value: 'The reason, not the visibility' },
    { label: 'Not riyāʾ', value: 'Being seen doing something you would have done anyway' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is riyāʾ?',
      body:
        'Doing an act of worship so that people see you doing it. The narration is blunt about what happens next: whoever makes his deed heard of, Allah will make him heard of, and whoever does it to be seen, Allah will show him up. You asked to be looked at, and you will be. That is the whole payment.',
      sources: [
        hadith('bukhari', '6499', {
          book: 81,
          bookName: 'To make the Heart Tender (Ar-Riqaq)',
          inBookReference: 'Book 81, Hadith 88',
        }),
      ],
    },
    {
      id: 'why',
      heading: 'Why is it treated so seriously?',
      /*
        The hero, rather than the definition above it. Bukhari 6499 reaches
        the app through Darussalam and its text opens with three lines of
        isnad — a chain of narrators is the wrong thing to break the margins
        for on a page written for somebody who cannot read Arabic. This one
        comes from HadeethEnc and begins at the words themselves.
      */
      promote: 'hero',
      body:
        'Because of what it does to the deed itself. In a hadith qudsi, Allah says that of all partners He is the one least in need of a partner: whoever does a deed and associates someone else with Him in it, He leaves him and the one he associated. The deed is not reduced. It is handed over to the person you did it for.',
      sources: [
        hadith('muslim', '2985', {
          book: 55,
          bookName: 'The Book of Zuhd and Softening of Hearts',
          inBookReference: 'Book 55, Hadith 58',
        }),
      ],
    },
    {
      id: 'visible',
      heading: 'Then is it wrong to pray where people can see me?',
      body:
        'No, and this is the question converts actually have, rather than the one this topic is usually written about. Praying at work, fasting in front of colleagues, saying you cannot drink: all of that is visible, and none of it is riyāʾ, because you would be doing it in an empty room too. Riyāʾ is not having an audience. It is the audience being the reason.',
      sources: [
        {
          kind: 'general',
          basis:
            'The distinction the two narrations above draw: both describe an act done in order to be seen, not an act that happens to be seen.',
        },
      ],
      note:
        'Much of the obligatory worship is public by design. The prayer is in congregation, zakat is collected, hajj is a crowd. A religion that treated being seen as the problem could not ask for any of it.',
    },
    {
      id: 'during',
      heading: 'What if the thought comes in the middle?',
      body:
        'It will. You are halfway through a prayer and notice that someone is watching, and that part of you is glad. Noticing the thought is not the same as acting on it. The thought arriving is what Shayṭān does, and being annoyed by it is a sign that the intention is alive, not gone. Carry on with the prayer. Do not abandon a good deed because the thought showed up in it. That hands the whole thing over for the price of a distraction.',
      sources: [
        {
          kind: 'general',
          basis:
            'Ordinary explanation. What a person does about an intrusive thought mid-deed is discussed at length by the scholars; nothing here asserts a ruling beyond the two narrations above.',
        },
      ],
    },
    {
      id: 'converts',
      heading: 'What does this look like for me now?',
      body:
        'The first year has an unusual amount of announcing in it: telling family, telling friends, being asked about it constantly. Saying what you now believe is not riyāʾ. It is answering a question. The place to watch is smaller and quieter: praying longer because somebody is in the room, or mentioning a fast that nobody asked about. Those are small enough that no one else would ever notice, and that is exactly why they are the ones to watch.',
    },
  ],
};
