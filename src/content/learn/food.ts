import { note, ref } from '../model';
import { quran, scholarly } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * The prohibitions here are stated plainly because the Qur'an states them
 * plainly and no school disputes them. The genuine difference — commercially
 * slaughtered meat in a non-Muslim country — is held as a `differs` note with
 * both positions, because a convert meets it in their first week and will be
 * told opposite things by people who are each sincerely reporting what they
 * were taught.
 *
 * That note carries no `positions` rows on purpose. The four schools agree
 * both that the meat of the People of the Book is lawful and that strangling
 * or electrocution is not slaughter; what is disputed is whether a modern
 * slaughterhouse meets the second, which is contemporary application rather
 * than a split between schools. Rows would have had to invent an attribution
 * for a difference that has none.
 *
 * ⚠️ The two positions in that note are attributed to `contemporary
 * scholarship` and `a minority`, and those labels are the weakest thing in
 * this file. They were chosen to avoid naming a madhhab without a source,
 * which is the right instinct, but "a minority" is itself a claim about how
 * many scholars hold a view and nothing here establishes it. A reviewer should
 * either replace both labels with attributions that can be sourced, or say
 * plainly that contemporary scholars differ without counting them.
 */
export const FOOD: Reference = {
  id: 'food',
  surface: 'learn',
  title: 'Food and drink',
  subtitle: 'What changes at the supermarket, and what does not',
  meta: {
    category: 'daily-life',
    difficulty: 'foundational',
    estimatedMinutes: 5,
    beginnerPriority: 2,
    tags: ['etiquette', 'family'],
    relatedContent: [ref('reference', 'halal-and-haram'), ref('reference', 'family')],
  },
  /*
    Two rows, not four — and that is the point of piloting the format here.

    Food has no rakʿah count and no movements, so "How many" and "How" simply
    do not exist for it. Padding to four rows on every page would make the
    block structure for its own sake, which is the failure mode this whole
    phase is one bad decision away from.

    "Do I have to?" is answered "yes" here, and it is the first page where that
    row carries a yes. It has to read as an answer rather than a warning: the
    tone is settled fact, not a finger raised.
  */
  quickFacts: [
    {
      label: 'What changes',
      value: 'Pork, blood, alcohol, and meat that was not slaughtered',
    },
    { label: 'Do I have to?', value: 'Yes — this one is not optional', emphasis: true },
  ],
  sections: [
    {
      id: 'forbidden',
      heading: 'What is actually forbidden?',
      body: 'Four things, and the Qur’an names them outright.',
      /*
        This is the page's answer, so the verse breaks the margins rather than
        sitting in the drawer. Everything below unpacks what it just said —
        which is why the paragraph that used to paraphrase it is gone.
      */
      promote: 'hero',
      bullets: [
        '**Pork** — and anything from it: lard, gelatine, some animal fats.',
        '**Blood** — flowing or congealed, as an ingredient.',
        '**Meat not slaughtered** — an animal that died on its own, or was strangled or electrocuted.',
        '**Dedicated to other than God** — killed in another name.',
        '**Alcohol** — forbidden in its own verse, and it covers every intoxicant, not only drink.',
      ],
      sources: [
        quran(2, 173, { surahName: 'Al-Baqarah' }),
        quran(5, 3, { surahName: 'Al-Ma’idah' }),
        quran(5, 90, { surahName: 'Al-Ma’idah' }),
      ],
    },
    {
      id: 'reading-labels',
      heading: 'What changes at the supermarket?',
      body: 'Reading labels, for a few weeks. Then it is automatic.',
      bullets: [
        '**Watch for** gelatine, lard, some animal fats, and alcohol in sauces and extracts.',
        '**Never in question** — vegetables, grains, fish, dairy, eggs, fruit.',
      ],
    },
    {
      id: 'meat',
      heading: 'Is supermarket meat halal?',
      body:
        'People genuinely differ, and you will be told opposite things with equal confidence. The Qur’an permits the food of the People of the Book; what scholars disagree about is whether modern industrial slaughter still resembles what that verse describes. Certified halal meat satisfies every position, which is where most converts start.',
      sources: [quran(5, 5, { surahName: 'Al-Ma’idah' })],
      notes: [
        note(
          'differs',
          'Muslims in Western countries genuinely differ on supermarket meat, and you will be told opposite things with equal confidence.',
          {
            sources: [
              quran(5, 5, { surahName: 'Al-Ma’idah' }),
              scholarly({
                work: 'Rulings on eating meat of the People of the Book according to the madhhabs, fatwa 82899',
                author: 'IslamWeb',
                url: 'https://www.islamweb.net/en/fatwa/82899/rulings-on-eating-meat-of-people-of-the-book-according-madhabs',
              }),
              scholarly({
                work: 'Permissibility of eating meat slaughtered by Christians and Jews, fatwa 103',
                author: 'Islam Question & Answer',
                url: 'https://islamqa.info/en/answers/103',
              }),
            ],
            additionalExplanation:
              'The starting point is not in dispute. All four schools hold that meat slaughtered by Jews and Christians is lawful, and all four hold that an animal killed by strangling, electrocution or anything other than cutting the throat was not lawfully slaughtered at all. What people disagree about is whether a modern slaughterhouse still meets that second condition — stunning, mechanical blades and who is actually doing the slaughtering are all part of it. That makes it a question about how agreed rules apply today rather than a split between the schools, which is why this note names no school and counts nobody: some scholars hold the verse still covers ordinary supermarket meat, and others hold that industrial slaughter no longer resembles what it describes and restrict meat to what is certified. Buying certified halal meat satisfies every position, which is why most converts start there and settle the question later. Nobody is doing anything strange by taking the cautious route while they learn, and nobody is being lax by relying on the verse. The specifics are worth asking someone locally about rather than resolving from an article.',
          },
        ),
      ],
    },
    {
      id: 'family-table',
      heading: 'Eating with your family',
      body:
        'You do not have to stop eating with people who are not Muslim, and you do not have to make a scene. Eat what you can, quietly leave what you cannot, and answer questions if they come. Most families adjust faster when the change is undramatic.',
      notes: [
        note(
          'practical',
          'Utensils that touched pork, or a shared roasting tin, worry converts far more than they worry most scholars. Wash it and move on.',
        ),
      ],
    },
  ],
};
