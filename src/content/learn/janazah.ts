import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 28 Aug 2026 — model-written English over checked citations.
 *
 * Half of Phase 11's pilot of two, and chosen with the other half to be as
 * unalike as the list allows: this is an event you are taken to with no idea
 * what to do, in a room full of people who all seem to know.
 *
 * ⚠️ It teaches the SHAPE and almost no rulings. Washing and shrouding the
 * body, who inherits what, what a non-Muslim family may do — every one of
 * those has conditions on it and belongs to somebody who knows the situation.
 * What a convert standing at the back of a janāzah needs is what is about to
 * happen and what to do with their hands, and that is what this is.
 */
export const JANAZAH: Reference = {
  id: 'janazah',
  surface: 'learn',
  title: 'When someone dies',
  subtitle: 'The funeral prayer, and what happens around it',
  meta: {
    category: 'community',
    difficulty: 'building',
    estimatedMinutes: 5,
    beginnerPriority: 4,
    tags: ['mosque', 'family'],
    relatedContent: [ref('phrase', 'inna-lillah'), ref('reference', 'mosque')],
  },
  quickFacts: [
    { label: 'The prayer', value: 'Standing throughout. No bowing, no prostration', emphasis: true },
    { label: 'How long', value: 'Two or three minutes' },
    { label: 'Who prays it', value: 'Anyone there. You do not have to have known them' },
  ],
  sections: [
    {
      id: 'first',
      heading: 'What do I say when I hear?',
      promote: 'hero',
      body:
        'The words people say on hearing that someone has died are from the Qur’an: **Innā li-llāhi wa innā ilayhi rājiʿūn** — to Allah we belong, and to Him we return. Say it quietly, to yourself. It is not a performance and nobody is waiting to hear it.\n\nYou say it for anyone. It is not reserved for Muslims, and it is not reserved for people you were close to.',
      sources: [quran(2, 156, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'shape',
      heading: 'What actually happens at a janāzah?',
      body:
        'Quickly, and with very little ceremony. The body is washed and wrapped, a short prayer is prayed over it — usually at a mosque, often straight after one of the daily prayers — and it is buried, normally within a day. There is no open casket, no music, and no long service.',
      bullets: [
        'A short prayer, standing, in rows behind an imam.',
        'The body is carried out and taken to the cemetery.',
        'It is buried. Many people come to the burial; not everyone does.',
      ],
      notes: [
        note(
          'practical',
          'It moves fast. If you hear in the morning, the burial may be that afternoon — that is normal and not a sign anybody is rushing.',
        ),
      ],
    },
    {
      id: 'prayer',
      heading: 'How do I pray the funeral prayer?',
      body:
        'You stand in a row and follow the imam, and you stay standing the whole way through — there is no bowing and no prostration in it, which surprises almost everybody the first time. He says **Allāhu akbar** four times, and between them there are quiet supplications. Then salām, and it is finished.\n\nIf you do not know the words, stand with them and say nothing. Following in silence is not a failure to participate.',
      notes: [
        note(
          'agreed',
          'Four takbīrs, standing, without rukūʿ or sujūd is agreed across the schools. What is said quietly between them is where they differ in detail.',
        ),
        note(
          'practical',
          'You do not need wudu to attend, but you do to pray it — the same as any prayer.',
        ),
      ],
    },
    {
      id: 'attend',
      heading: 'Should I go if I did not know them?',
      body:
        'Yes, and it is one of the few things in this religion that is straightforwardly encouraged for a stranger. The Prophet ﷺ described a reward for whoever attends until the prayer, and more for whoever stays until the burial. Turning up to a janāzah for somebody you never met is an ordinary thing to do.',
      sources: [hadith('bukhari', '1325')],
    },
    {
      id: 'condolence',
      heading: 'What do I say to the family?',
      body:
        'Very little, and that is correct. "May Allah have mercy on them" is enough, and so is nothing at all. Sit with people, make tea, take the children out. Grief in Islam is not silenced — crying is not a failing, and nobody has to pretend to be composed.\n\nWhat is avoided is the loud, staged kind of mourning, and any suggestion that the family should be over it.',
      notes: [
        note(
          'practical',
          'Do not tell somebody their loss was a test they passed, or that it was for the best. Neither is comfort, and both are said constantly.',
        ),
      ],
    },
    {
      id: 'non-muslim',
      heading: 'What if the person who died was not Muslim?',
      body:
        'Then this page is not the shape of it, and you are still allowed to grieve them, attend, and be with your family. What you may and may not take part in depends on what the funeral involves, and that is a question for somebody who knows both your family and the situation — not for an app.',
      sources: [
        general(
          'Deliberately unanswered. The rulings here turn on the specific rite and the specific relationship, and a general answer would be wrong for most readers of it.',
        ),
      ],
      notes: [
        note(
          'practical',
          'Ask someone before the day rather than on it. This is one of the questions imams are asked most and least surprised by.',
        ),
      ],
    },
  ],
};
