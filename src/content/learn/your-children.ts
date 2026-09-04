import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Fourth page of the "What you owe" unit (4 Sep 2026).
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. Sahih Muslim is cited by the
 * standard numbering from each record's own `arabicnumber` (2318.01, 2629,
 * 1659.01), never by the corpus's sequential position.
 *
 * ## Why mercy is the hero and not the daughters narration
 *
 * Only because of length. Muslim 2629 runs past a thousand characters of
 * Arabic and would render as a wall at the top of the page rather than as an
 * answer, which `style:check` fails on. It keeps its own section directly
 * underneath, which is where a reader meets it anyway.
 *
 * ## Deliberate absences
 *
 * Naming, ʿaqiqah and inheritance are each a page of their own. The
 * narrations on teaching a child to pray are outside the two Sahihs and need
 * the reviewer's ruling on their grading before this app prints an age.
 */
export const YOUR_CHILDREN: Reference = {
  id: 'your-children',
  surface: 'learn',
  title: 'Your children',
  subtitle: 'Mercy first, then fairness',
  meta: {
    category: 'character',
    difficulty: 'deeper',
    estimatedMinutes: 4,
    beginnerPriority: 4,
    relatedContent: [ref('reference', 'your-partner'), ref('reference', 'your-mother')],
  },
  quickFacts: [
    { label: 'First thing', value: 'Mercy. Withholding it is what was rebuked', emphasis: true },
    { label: 'Daughters', value: 'Raising them well is a shield from the Fire' },
    { label: 'Between them', value: 'A gift to one and not the others was refused' },
  ],
  sections: [
    {
      id: 'mercy',
      heading: 'Where does it start?',
      promote: 'hero',
      body:
        'A man watched the Prophet ﷺ kiss his grandson and said that he had ten children and had never kissed one of them. He was not praised for it. He was told that whoever shows no mercy is shown none. Affection towards a child is not treated here as a soft extra on top of raising them. It is the thing being asked for, and its absence was worth correcting on the spot.',
      sources: [hadith('muslim', '2318a', { role: 'virtue' })],
    },
    {
      id: 'daughters',
      heading: 'What is owed to a daughter?',
      body:
        'A woman came to ʿAisha with two daughters, asking for anything. She was given a single date, and she split it between the two girls and ate none of it herself. When the Prophet ﷺ was told, he said that whoever is given the care of daughters and treats them well will have them as a protection from the Fire. The context matters. This was said in a place where a daughter was widely counted as a disappointment.',
      sources: [hadith('muslim', '2629', { role: 'virtue' })],
      notes: [
        note(
          'practical',
          'The Qur’an addresses the same attitude directly, and says that God gives daughters to whom He wills and sons to whom He wills, in that order.',
          { sources: [quran(42, 49, { surahName: 'Ash-Shura' })] },
        ),
      ],
    },
    {
      id: 'discipline',
      heading: 'What about discipline?',
      body:
        'Abu Masʿud was beating a boy who served him when he heard a voice behind him. It was the Prophet ﷺ, saying his name. He was told that God has more power over him than he has over the boy. The whip fell out of his hand. Nothing was said about whether the boy deserved it. What was put to him was the size of his own position, which had been the whole basis of the beating.',
      sources: [hadith('muslim', '1659a')],
    },
    {
      id: 'fairness',
      heading: 'Do they all get the same?',
      body:
        'An-Nuʿman’s father gave him a gift and went to have the Prophet ﷺ witness it. He was asked whether he had given every one of his sons the same, and said no. He was told to take it back, and that he would not be made a witness to injustice. A parent’s preference is not treated as a private matter between them and the favoured child. It is named as a wrong done to the others.',
      sources: [hadith('bukhari', '2587')],
    },
  ],
};
