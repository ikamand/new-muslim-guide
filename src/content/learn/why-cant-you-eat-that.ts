import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Sixth and last page of the "questions you'll be asked" unit (7 Sep 2026).
 * The question comes at the family table, over a plate, and the answer has
 * to be short enough to say before the food goes cold. `food` carries the
 * rulings for the reader's own kitchen; this page gives them what to say,
 * and the texts.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. Muslim 2003 is cited by the
 * number the collection prints, per the 26 Aug fix; the base number resolves
 * to the first of its variant chains.
 *
 * ## Deliberate absences
 *
 * 5:3 is left out: it carries the same four prohibitions as 2:173 and then
 * runs to the completion of the religion, and a convert reading it aloud at
 * a table would be reading past the question. Whether alcohol cooked into a
 * sauce is forbidden is not answered here — scholars differ, and it belongs
 * on the food page with its sources, not in a sentence said to a host.
 */
export const WHY_CANT_YOU_EAT_THAT: Reference = {
  id: 'why-cant-you-eat-that',
  surface: 'learn',
  title: 'Why can’t you eat that?',
  subtitle: 'Pork, alcohol, and the table you still share',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 3,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'food'), ref('reference', 'halal-and-haram')],
  },
  quickFacts: [
    {
      label: 'To say out loud',
      value: 'God set a few things aside, and I keep to that',
      emphasis: true,
    },
    { label: 'What', value: 'Pork, alcohol, blood, and meat not properly slaughtered' },
    { label: 'The table', value: 'Everything else is fine, and I still want to eat with you' },
  ],
  sections: [
    {
      id: 'the-list',
      heading: 'What is off the menu, and why?',
      promote: 'hero',
      body:
        'Four things, and the Qur’an names them: animals found dead, blood, the flesh of swine, and meat dedicated to anything other than God. Alcohol has its own verse, which calls intoxicants the work of Satan and says to avoid them. The reason the Qur’an gives is not health and not hygiene, though people will offer you both. It is that God has said so, and the verse begins with the word "only": the list is short, and everything else is lawful and good. The same verse adds that someone forced by hunger, not wanting it and not going past need, carries no sin.',
      sources: [
        quran(2, 173, { surahName: 'Al-Baqarah' }),
        quran(5, 90, { surahName: 'Al-Maidah' }),
        quran(2, 168, { surahName: 'Al-Baqarah' }),
      ],
    },
    {
      id: 'every-drop',
      heading: 'Is it just wine, or all of it?',
      body:
        'All of it. The Prophet ﷺ said that every intoxicant is khamr, the Qur’an’s word for wine, and every intoxicant is forbidden. Asked about the drinks brewed in Yemen from honey and from barley, he gave the same answer, so it is not about grapes. Beer, spirits and wine are one category, and the category is what is forbidden.',
      sources: [hadith('muslim', '2003'), hadith('bukhari', '5598')],
    },
    {
      id: 'not-many-rules',
      heading: 'Isn’t that a lot of rules about food?',
      body:
        'It is fewer than it looks. The Qur’an tells believers not to forbid the good things God has made lawful, and asks who has forbidden the good provision He produced for His servants. It also says plainly that the food of the People of the Scripture is lawful for Muslims, so a Muslim can eat at a Christian or Jewish table. The page on food carries the one live question about meat, which is not whether such meat is lawful in principle but how modern slaughter measures up.',
      sources: [
        quran(5, 87, { surahName: 'Al-Maidah' }),
        quran(7, 32, { surahName: 'Al-Aʿraf' }),
        quran(5, 5, { surahName: 'Al-Maidah' }),
      ],
    },
    {
      id: 'the-table',
      heading: 'What about my family’s table?',
      body:
        'Keep sitting at it. Eat what you can, leave what you cannot without a speech, and answer questions when they come. If you are the guest, a quiet word to the host beforehand is kinder than a plate pushed away. Most families adjust faster when the change is undramatic, and the meal itself is the answer to the question underneath: that you are still theirs.',
      sources: [
        general(
          'Practical advice, not a ruling. The food page carries the rulings on shared utensils and on meat, with their sources.',
        ),
      ],
      notes: [
        note(
          'practical',
          'You do not owe anyone the reason. "I don’t eat pork" is complete. The reason is for when they are curious, not for when they are testing.',
        ),
      ],
    },
    {
      id: 'saying-it',
      heading: 'What do I actually say?',
      body:
        '"God set a few things aside: pork, alcohol, a couple of others. Everything else on this table is fine, and I’m glad to be at it." Then eat. If they want the verses, they are above. If they want to argue about health, that is a conversation about health, and it is not why you stopped.',
      sources: [
        general(
          'Suggested wording, not a ruling. Each sentence of it rests on a verse or narration quoted above.',
        ),
      ],
    },
  ],
};
