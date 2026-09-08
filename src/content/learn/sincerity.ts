import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 8 Sep 2026 — model-written English over checked citations,
 * unreviewed for substance.
 *
 * The positive counterpart to `showing-off.ts`, commissioned by Iyad's
 * curriculum update (`docs/curriculum-update-plan.md`) and placed first in
 * "The interior life", so the chapter opens with the thing to aim at before
 * the four things to avoid. It answers one question: who am I doing this
 * for?
 *
 * Sources, each read in the corpus: Qur'an 98:5, commanded only to worship
 * Allah, sincere to Him in religion; Bukhari 1, deeds are by intentions,
 * already cited by the shahada guide; Bukhari 56, rewarded for what you
 * spend seeking Allah's face, even the morsel in your wife's mouth. Muslim
 * 2985, the hadith qudsi on a deed shared with another, is the showing-off
 * page's hero and is linked rather than printed again.
 */
export const SINCERITY: Reference = {
  id: 'sincerity',
  surface: 'learn',
  title: 'Sincerity',
  subtitle: 'Ikhlāṣ, and who you are doing it for',
  meta: {
    category: 'character',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [
      ref('reference', 'showing-off'),
      ref('reference', 'repentance'),
      ref('reference', 'patience-and-gratitude'),
    ],
  },
  quickFacts: [
    { label: 'The word', value: 'Ikhlāṣ, doing a thing for Allah alone' },
    { label: 'The test', value: 'Would you still do it if nobody knew?', emphasis: true },
    { label: 'Not', value: 'A feeling to wait for. A direction to point in' },
  ],
  sections: [
    {
      id: 'who',
      heading: 'Who am I doing this for?',
      promote: 'hero',
      body:
        'That is the whole question, and Islam asks it before it asks anything else. The Qur’an says people were commanded only to worship Allah, sincere to Him in religion, and then to pray and to give. Sincerity comes first in the sentence, before the acts. A prayer, a fast, a kindness, and the same prayer, fast and kindness done so that someone notices, are two different deeds that look identical from outside.',
      sources: [quran(98, 5, { surahName: 'Al-Bayyinah' })],
    },
    {
      id: 'intention',
      heading: 'What makes a deed count?',
      body:
        'What it was for. The first narration in Sahih al-Bukhari, the one students of hadith learn before any other, says that deeds are by their intentions and that every person has what they intended. The example it gives is emigration: the same journey, made for Allah or made for a woman, is two different journeys. The act was identical. The intention was the deed.',
      sources: [
        hadith('bukhari', '1', {
          book: 1,
          bookName: 'Revelation',
          inBookReference: 'Book 1, Hadith 1',
        }),
      ],
    },
    {
      id: 'feeling',
      heading: 'Does it have to feel sincere?',
      body:
        'No. Sincerity is a direction, not a mood. You point a deed at Allah by deciding, before you start and again when you notice you have drifted, that it is for Him. Some days that decision comes with warmth and some days it is dry, and the dry day counts as much as the other. Waiting to feel sincere before you pray is a way of not praying.',
      sources: [
        general(
          'Ordinary explanation of what the narration above asks for. An intention is a decision, and the scholars who write on ikhlāṣ describe it as something renewed rather than something felt once.',
        ),
      ],
    },
    {
      id: 'test',
      heading: 'How would I know if I have it?',
      body:
        'Ask whether the deed changes when nobody can see it. Longer prayers in company and shorter ones alone, a fast mentioned before anyone asked: those are the signs that somebody else has become part of the reason. The opposite is not hiding your religion. Praying at work is visible and is not showing off, because you would do it in an empty room too. The page on doing it to be seen draws that line carefully, and this page is its other half: what to aim at rather than what to avoid.',
    },
    {
      id: 'daily',
      heading: 'What does it look like day to day?',
      body:
        'Bigger than worship. The Prophet ﷺ told Saʿd that he would be rewarded for whatever he spent for Allah’s sake, even the morsel he put in his wife’s mouth. Feeding your family, going to work, being patient with a parent: all of it can be done for Allah, and when it is, it is worship. Sincerity does not make your life more religious by adding acts to it. It turns the acts you already do towards Him.',
      sources: [
        hadith('bukhari', '56', {
          book: 2,
          bookName: 'Belief',
          inBookReference: 'Book 2, Hadith 49',
        }),
      ],
      notes: [
        note(
          'practical',
          'A habit worth having: before an ordinary task, one silent sentence saying who it is for. It takes a second, and it changes what the task is.',
        ),
      ],
    },
  ],
};
