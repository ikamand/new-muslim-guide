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
 * What a convert standing at the back of a janazah needs is what is about to
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
        'The words people say when they hear that someone has died come from the Qur’an: **Innā li-llāhi wa innā ilayhi rājiʿūn**, to Allah we belong, and to Him we return. Say it quietly, to yourself. No one is waiting to hear it.\n\nYou say it for anyone. It is not only for Muslims, and it is not only for people you were close to.',
      sources: [quran(2, 156, { surahName: 'Al-Baqarah' })],
    },
    {
      id: 'shape',
      heading: 'What actually happens at a janazah?',
      body:
        'It happens quickly, and with very little ceremony. The body is washed and wrapped. A short prayer is prayed over it, usually at a mosque and often straight after one of the daily prayers. Then it is buried, normally within a day. There is no open casket, no music, and no long service.',
      bullets: [
        'A short prayer, standing, in rows behind an imam.',
        'The body is carried out and taken to the cemetery.',
        'It is buried. Many people come to the burial; not everyone does.',
      ],
      notes: [
        note(
          'practical',
          'It moves fast. If you hear in the morning, the burial may be that afternoon. That is normal, and not a sign that anybody is rushing.',
        ),
      ],
    },
    {
      id: 'prayer',
      heading: 'How do I pray the funeral prayer?',
      body:
        'You stand in a row and follow the imam, and you stay standing the whole way through. There is no bowing and no prostration, which surprises almost everyone the first time. The imam says **Allāhu akbar** four times, and between them there are quiet supplications. Then the salam, and it is finished.\n\nIf you do not know the words, stand with everyone and say nothing. Following in silence still counts as taking part.',
      notes: [
        note(
          'agreed',
          'Four takbirs, standing, with no bowing and no prostration: the schools agree on that. What is said quietly between the takbirs is where they differ in detail.',
        ),
        note(
          'practical',
          'You do not need wudu to attend, but you do need it to pray, the same as for any prayer.',
        ),
      ],
    },
    {
      id: 'attend',
      heading: 'Should I go if I did not know them?',
      body:
        'Yes. Attending a funeral is encouraged even for a stranger. The Prophet ﷺ described a reward for whoever attends until the prayer, and a greater one for whoever stays until the burial. Turning up to a janazah for somebody you never met is an ordinary thing to do.',
      sources: [hadith('bukhari', '1325')],
    },
    {
      id: 'condolence',
      heading: 'What do I say to the family?',
      body:
        'Very little, and that is right. "May Allah have mercy on them" is enough, and so is saying nothing at all. Sit with people, make tea, take the children out. Grief in Islam is not silenced. Crying is not a failing, and no one has to pretend to be composed.\n\nWhat is avoided is loud, staged mourning, and any suggestion that the family should be over it.',
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
        'Then the funeral will not look like this, and you are still allowed to grieve them, attend, and be with your family. What you may and may not take part in depends on what the funeral involves. That is a question for somebody who knows both your family and the situation, not for an app.',
      sources: [
        general(
          'Deliberately unanswered. The rulings here depend on the specific rite and the specific relationship, and a general answer would be wrong for most people reading it.',
        ),
      ],
      notes: [
        note(
          'practical',
          'Ask someone before the day rather than on it. Imams are asked this often, and it will not surprise them.',
        ),
      ],
    },
  ],
};
