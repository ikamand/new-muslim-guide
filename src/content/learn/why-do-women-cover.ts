import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations. This page
 * touches a ruling, so it needs the reviewer's eye on substance, not only on
 * sourcing: what is said about what is covered, and about taking it up in
 * steps, is the kind of sentence that changes how someone practises.
 *
 * Fifth page of the "questions you'll be asked" unit (7 Sep 2026). The
 * reader may be a woman who has just started covering and is being asked
 * "did they make you?", or a man being asked on her behalf. `clothing`
 * carries the ruling for the reader's own dress, including the difference
 * over the face; this page gives them what to say, and the verses.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both.
 *
 * ## Deliberate absences
 *
 * The narration of Asma's thin garment (Abu Dawud 4104) is left out: its
 * grading is disputed and the app does not print a narration it cannot place
 * as authentic. The face-covering difference is not restated here; it lives
 * on `clothing` with its schools named, and a page answering a parent is not
 * where a convert should meet a four-way scholarly split.
 */
export const WHY_DO_WOMEN_COVER: Reference = {
  id: 'why-do-women-cover',
  surface: 'learn',
  title: 'Why do women cover?',
  subtitle: 'The reason the verses give, and where it starts',
  meta: {
    category: 'daily-life',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'clothing'), ref('reference', 'teaching-someone')],
  },
  quickFacts: [
    {
      label: 'To say out loud',
      value: 'It is between her and God, and the men’s verse comes first',
      emphasis: true,
    },
    { label: 'Men first', value: 'The Qur’an addresses men’s eyes before women’s dress' },
    { label: 'The reason', value: 'So that she is known for what she is, and not troubled' },
  ],
  sections: [
    {
      id: 'the-verses',
      heading: 'What does the Qur’an actually say?',
      promote: 'hero',
      body:
        'It speaks to men first. Believing men are told to lower their gaze and guard their modesty, and only then are believing women told the same, with one thing added: to draw their head-coverings over their chests and not display their beauty except to the family the verse lists. A second verse tells the Prophet’s ﷺ wives, daughters and the believing women to draw their outer garments about themselves, and gives the reason in its own words: so that they will be known, and not harassed. That is the whole basis, and it is short.',
      sources: [
        quran(24, 30, { surahName: 'An-Nur' }),
        quran(24, 31, { surahName: 'An-Nur' }),
        quran(33, 59, { surahName: 'Al-Ahzab' }),
      ],
    },
    {
      id: 'not-hiding',
      heading: 'Is it about hiding women away?',
      body:
        'The verse says the opposite: that a woman be recognised, and left alone. The Qur’an calls clothing itself a gift from God, given to cover and to adorn, and then says the clothing of righteousness is better still. Covering is one form of the modesty asked of everyone, in look and in manner before it is ever in cloth. The first Muslim women went out, prayed in the mosque, traded and taught, covered.',
      sources: [quran(7, 26, { surahName: 'Al-Aʿraf' })],
      notes: [
        note(
          'practical',
          'The question is often really "were you made to?" Answer that one. "No. I chose this, and I would tell you if I hadn’t" does more than any verse.',
        ),
      ],
    },
    {
      id: 'first-women',
      heading: 'Did the first Muslim women do this?',
      body:
        'Yes, and at once. ʿAʾishah, the Prophet’s ﷺ wife, said of the women who had emigrated to Medina that when the verse about the head-covering came down they cut their waist-cloths at the edge and covered themselves with the pieces. It was the women’s own response to a verse, done the day they heard it. Nobody in the story is made to do anything.',
      sources: [hadith('bukhari', '4758'), hadith('bukhari', '4759')],
    },
    {
      id: 'what-and-when',
      heading: 'What is covered, and does everyone agree?',
      body:
        'The commonly taught form is loose clothing that covers the body and the hair, in front of men outside the immediate family, with the face and hands showing. Whether the face is included is a long-standing difference between scholars, and the page on clothing sets out who says what. A convert usually comes to covering in steps, and that is ordinary, not a failing. No one is entitled to shame a woman for where she is on that road, and the verses above are addressed to her, not to the people watching her.',
      sources: [
        general(
          'That the commonly taught form leaves the face and hands showing, and that the face is a point of scholarly difference, are the positions the clothing page documents with its sources. That converts commonly take covering up in steps is pastoral observation, not a ruling.',
        ),
      ],
    },
    {
      id: 'saying-it',
      heading: 'What do I actually say?',
      body:
        '"The Qur’an tells men to lower their eyes before it says anything about women’s clothes. Then it asks women to dress modestly, and it gives the reason: so they’re known for who they are and left alone. It’s an act of worship, it’s between her and God, and it was her choice." You can stop there. If the person is worried for you, or for her, answer the worry, not the argument.',
      sources: [
        general(
          'Suggested wording, not a ruling. Each sentence of it rests on a verse or narration quoted above.',
        ),
      ],
    },
  ],
};
