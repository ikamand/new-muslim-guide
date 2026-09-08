import { note, ref } from '../model';
import { general, hadith } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance. RULINGS, and the page the review pile ranks
 * first: every branch below is one, and the correct answer depends on what
 * happened, which is exactly why this page does not give one answer.
 *
 * Commissioned by Iyad's curriculum update (`docs/curriculum-update-plan.md`)
 * for "When it goes wrong", last. `what-breaks-prayer.ts` and
 * `references.ts` (lost-count) cover a mistake noticed DURING the prayer.
 * Nothing covered noticing afterwards, and a beginner does that often.
 *
 * Surface `pray`, like lost-count and missed: it is a situation reached
 * from the help sheet's "mistakes" list as well as a lesson in the chapter.
 *
 * ## Sources, each opened in the corpus, all already in the app
 *
 * Muslim 571a (build on what you are sure of), Bukhari 1224 (Ibn Buhaina:
 * the sitting forgotten, two prostrations before the salam), Bukhari 1229
 * (Dhul-Yadain: the prayer ended early, completed, then two prostrations
 * after), Bukhari 757 (the man told to go back and pray, because the
 * essentials were missing), Bukhari 135 (no prayer without wudu after
 * hadath).
 *
 * ## ⚠️ The differs note
 *
 * Whether a prayer that needed the two prostrations and did not get them
 * must be repeated is a genuine difference, and the two positions printed
 * are the Hanafi and the Shafiʿi as this file's author understands them.
 * They were NOT checked against a fiqh text and a reviewer must. The rule
 * for what "soon after" means is likewise left to a person.
 */
export const REALISED_AFTER: Reference = {
  id: 'realised-after',
  surface: 'pray',
  title: 'I made a mistake and finished praying',
  subtitle: 'What to do when you only notice afterwards',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    relatedContent: [
      ref('reference', 'lost-count'),
      ref('reference', 'what-breaks-prayer'),
      ref('guide', 'wudu'),
    ],
  },
  quickFacts: [
    { label: 'Most cases', value: 'Nothing. The prayer stands', emphasis: true },
    { label: 'Only a doubt', value: 'Ignore it. A doubt after finishing does not count' },
    { label: 'A pillar gone', value: 'Complete it if you are still there, or pray again' },
  ],
  sections: [
    {
      id: 'gone',
      heading: 'I think I got something wrong. Is the prayer gone?',
      promote: 'hero',
      body:
        'Almost certainly not. What you do depends on what it was, and there are only three kinds of thing it could have been: a doubt with nothing behind it, a small part left out, or one of the few things the prayer cannot do without. Most of what beginners notice afterwards is the first kind, and the answer to the first kind is to do nothing at all.',
    },
    {
      id: 'doubt',
      heading: 'What if I only doubt it?',
      body:
        'Then let it go. If you finished the prayer and only afterwards began to wonder whether you bowed in the third rakʿah, and you have no actual memory of missing it, the prayer stands. The scholars’ rule is that certainty is not undone by doubt: you were certain you prayed, and a doubt that arrived later does not outweigh that. The Prophet ﷺ taught the same thing for doubt during the prayer, to set aside the doubt and build on what you are sure of. Afterwards, what you are sure of is that you prayed.',
      sources: [
        hadith('muslim', '571a', {
          book: 5,
          bookName: 'The Book of Mosques and Places of Prayer',
          inBookReference: 'Book 5, Hadith 110',
        }),
        general(
          'That a doubt arising after the prayer is disregarded is a rule the scholars state, drawn from the narration above and from the principle that certainty is not removed by doubt. It is stated here as the standard position, not argued.',
        ),
      ],
    },
    {
      id: 'small',
      heading: 'What if I actually left out a small thing?',
      body:
        'The first sitting, a takbir, an extra movement, a word in the wrong place: these are fixed by the two prostrations of forgetfulness, and the page on losing count describes them. If you remember while you are still sitting after the salam, make the two prostrations then; the Prophet ﷺ did exactly that when he ended a prayer early, completed it, and prostrated twice afterwards. If you have already got up and walked away, the answer depends on how long it has been, and on the school you follow.',
      sources: [
        hadith('bukhari', '1224', {
          book: 22,
          bookName: 'Forgetfulness in Prayer',
          inBookReference: 'Book 22, Hadith 1',
        }),
        hadith('bukhari', '1229', {
          book: 22,
          bookName: 'Forgetfulness in Prayer',
          inBookReference: 'Book 22, Hadith 7',
        }),
      ],
      notes: [
        note(
          'differs',
          'Whether a prayer that needed the two prostrations and did not get them has to be repeated is a real difference between the schools.',
          {
            additionalExplanation:
              'Both positions are argued from the same narrations. As a beginner, follow whoever taught you, and do not repeat prayers on your own initiative because a stranger said you should.',
            positions: [
              {
                school: 'Hanafi',
                position: 'The two prostrations are required. A prayer that needed them and did not get them is repeated.',
              },
              {
                school: 'Shafi`i',
                position: 'The two prostrations are recommended. A prayer without them stands.',
              },
            ],
          },
        ),
      ],
    },
    {
      id: 'pillar',
      heading: 'What if I missed something the prayer cannot do without?',
      body:
        'A bowing, a prostration, Al-Fatihah, a whole rakʿah. These are the things the Prophet ﷺ listed when he taught the man who had prayed badly, and he sent that man back to pray because they were missing. If you realise while you are still in your place and only a moment has passed, stand and complete what was missed, then make the two prostrations. If it has been a while, pray it again. That is rare, and it is not a disaster: the second prayer is the prayer.',
      sources: [hadith('bukhari', '757')],
      notes: [
        note(
          'practical',
          'How long is “a while” is a question for a person, not a page. If it happens to you, ask once, and then you will know for good.',
        ),
      ],
    },
    {
      id: 'wudu',
      heading: 'What if I prayed without wudu?',
      body:
        'Then pray it again, whenever you realise. The Prophet ﷺ said the prayer of someone who has broken wudu is not accepted until they make wudu, and that is true whether you knew at the time or worked it out afterwards. Nobody is blamed for the mistake. The prayer is simply owed.\n\nIf what you found afterwards was something on your clothes rather than a broken wudu, the answer is less simple and depends on what it was and whether you could have known. Ask, and do not assume the worst.',
      sources: [
        hadith('bukhari', '135', {
          book: 4,
          bookName: 'Ablutions (Wudu’)',
          inBookReference: 'Book 4, Hadith 1',
        }),
        general(
          'Impurity discovered on the clothes after the prayer is a question the scholars answer with distinctions this page does not draw. It is named so the reader knows it has an answer, and sent to a person.',
        ),
      ],
    },
    {
      id: 'keeps-happening',
      heading: 'It keeps happening. What then?',
      body:
        'Then it is the first kind, the doubt with nothing behind it, and the instruction is the same one the page on losing count gives: ignore it and go on. A doubt that returns after every prayer is not information about your prayers. It is a habit of the mind, and it is answered by not feeding it. Pray, finish, and do not audit.',
    },
  ],
};
