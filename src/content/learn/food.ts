import { note, ref } from '../model';
import { quran } from '../sources';
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
  sections: [
    {
      id: 'forbidden',
      heading: 'The short list',
      body:
        'The Qur’an names what is forbidden: pork, blood, animals that died without being slaughtered, and anything dedicated to something other than God. Alcohol and other intoxicants are forbidden separately. That is the core of it — everything else on the shelf is fine.',
      sources: [
        quran(2, 173, { surahName: 'Al-Baqarah' }),
        quran(5, 3, { surahName: 'Al-Ma’idah' }),
        quran(5, 90, { surahName: 'Al-Ma’idah' }),
      ],
    },
    {
      id: 'reading-labels',
      heading: 'What this looks like in practice',
      body:
        'Mostly it means reading ingredients for a few weeks until you know the usual suspects: gelatine, lard, some animal fats, alcohol in sauces and extracts. It gets automatic quickly. Vegetables, grains, fish, dairy, eggs and fruit were never in question.',
    },
    {
      id: 'meat',
      heading: 'Meat is the part people argue about',
      body:
        'The Qur’an explicitly permits the food of the People of the Book — Jews and Christians. What contemporary scholars disagree about is whether meat from modern industrial slaughterhouses in a non-Muslim country falls under that permission, given how the animals are killed and that God’s name is not pronounced over them.',
      sources: [quran(5, 5, { surahName: 'Al-Ma’idah' })],
      notes: [
        note(
          'differs',
          'Muslims in Western countries genuinely differ on supermarket meat, and you will be told opposite things with equal confidence.',
          {
            sources: [quran(5, 5, { surahName: 'Al-Ma’idah' })],
            additionalExplanation:
              'Buying certified halal meat satisfies every position, which is why most converts start there and settle the question later. Nobody is doing anything strange by taking the cautious route while they learn, and nobody is being lax by relying on the verse. Scholars have discussed this in considerable detail; the specifics of stunning, mechanical slaughter and pronouncing the name are worth asking someone locally about rather than resolving from an article.',
            positions: [
              {
                school: 'contemporary scholarship',
                position:
                  'Some hold that the verse permitting the food of the People of the Book still applies, so ordinary supermarket meat may be eaten.',
              },
              {
                school: 'a minority',
                position:
                  'Others hold that industrial slaughter no longer resembles what the verse describes, and restrict meat to what is certified.',
              },
            ],
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
