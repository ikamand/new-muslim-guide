import { note, ref } from '../model';
import { hadith, scholarly } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ NEW, 10 Sep 2026 — model-written English over checked citations.
 *
 * The times of day when extra prayer is held off. Every born Muslim absorbs
 * this and no app tells a convert; the app itself already leaned on it — the
 * Istikhara page said "any time except the times when prayer is held off"
 * and nowhere said what those were. This page is that sentence kept.
 *
 * ## What it teaches, and what it does not
 *
 * The three sun-bound times from ʿUqbah ibn ʿĀmir's narration (Sahih Muslim
 * 831), the two spans tied to one's own Fajr and ʿAsr from Abu Saʿīd's (Sahih
 * al-Bukhari 586), the reason from Ibn ʿUmar's (Sahih al-Bukhari 3273), and
 * the one thing that matters most to somebody with prayers to make up: the
 * five, and a missed one, are never held off. That last point is the
 * position of the Shafiʿi, Hanbali and Maliki schools and of Ibn Bāz and Ibn
 * ʿUthaymīn, and it is the one the Missing a prayer page already follows;
 * the Hanafi position is printed in the differs note. Every citation was
 * opened in the corpus by the collection's own number before it was typed.
 *
 * ## Two deliberate absences
 *
 * The Friday exception at the sun's height rests on Abu Dawud 1083, which
 * Abu Dawud himself calls mursal and al-Albani grades weak, so it is not
 * here. The Makkah exception (Tirmidhi 868, sahih) is true and is not a
 * beginner's concern; it belongs on the Hajj page if anywhere.
 *
 * ## Words
 *
 * "Forbidden", not "held off": Iyad's call, 11 Sep 2026, reversing the
 * first draft's softer word. The texts forbid, and a religion is not
 * sugar-coated. "Voluntary" stays in every sentence, because the five
 * prayers and a missed one are never forbidden in the position the app
 * teaches, and a convert who has overslept must not read "praying is
 * forbidden" and not pray. The day page draws the three sun-bound times
 * as bands and links here. The id keeps its first name.
 */
export const HELD_OFF_TIMES: Reference = {
  id: 'held-off-times',
  surface: 'pray',
  title: 'When voluntary prayer is forbidden',
  subtitle: 'Three times of day, and what they never affect',
  meta: {
    category: 'salah',
    difficulty: 'foundational',
    estimatedMinutes: 2,
    beginnerPriority: 3,
    relatedContent: [
      ref('reference', 'missed'),
      ref('reference', 'istikhara'),
      ref('reference', 'fajr'),
      ref('reference', 'asr'),
    ],
  },
  quickFacts: [
    { label: 'Which prayers', value: 'Voluntary ones only', emphasis: true },
    { label: 'The five', value: 'Never forbidden' },
    { label: 'A missed prayer', value: 'Pray it when you remember' },
  ],
  sections: [
    {
      id: 'three',
      heading: 'When is voluntary prayer forbidden?',
      promote: 'hero',
      body:
        'Three times a day, all tied to the sun. The Prophet ﷺ named them together, and the prayer-times page in this app marks them on the day.',
      bullets: [
        '**As the sun rises**, from the moment it appears until it is fully up. About a quarter of an hour.',
        '**When the sun is at its height**, the few minutes before Dhuhr enters.',
        '**As the sun goes down**, from when it draws near to setting until it has set.',
      ],
      sources: [hadith('muslim', '831')],
      notes: [
        note(
          'practical',
          'These are about voluntary prayers, the ones you choose to add. Nothing here stops you praying one of the five.',
        ),
      ],
    },
    {
      id: 'five',
      heading: 'Does this ever affect the five prayers?',
      body:
        'No. A prayer that is due is prayed in its window, and a prayer you slept through or forgot is prayed as soon as you remember it, whatever the sun is doing. The Prophet ﷺ said there is no making up for a forgotten prayer except to pray it when you remember.',
      sources: [hadith('bukhari', '597')],
      notes: [
        note(
          'differs',
          'Schools differ on whether a missed prayer may be made up at the three sun-bound times themselves, and on which voluntary prayers with a reason may go ahead.',
          {
            sources: [
              scholarly({
                work: 'Naafil prayers that it is permissible to do at times when prayer is otherwise forbidden, fatwa 112114',
                author: 'Islam Question & Answer',
                url: 'https://islamqa.com/en/answers/112114',
              }),
              scholarly({
                work: 'Prohibited times for prayers and make-up prayers',
                author: 'SeekersGuidance, Hanafi fiqh',
                url: 'https://seekersguidance.org/answers/hanafi-fiqh/prohibited-times-for-prayers-and-makeup-prayers%E2%80%8F/',
              }),
              scholarly({
                work: 'Times when prayer is forbidden',
                author: 'IslamOnline, Fiqh',
                url: 'https://fiqh.islamonline.net/en/times-when-prayer-is-forbidden/',
              }),
            ],
            additionalExplanation:
              'This app teaches the wider view, because it is the one the Missing a prayer page already follows: pray a missed prayer when you remember it. If your mosque follows the Hanafi school, it will hold the three sun-bound moments back even for a missed prayer, and following your mosque is right.',
            positions: [
              {
                school: 'Hanafi',
                position:
                  'At the three sun-bound times no prayer is offered, not even a missed one; the day’s own ʿAsr is the exception as the sun sets. After Fajr and after ʿAsr, voluntary prayer is forbidden but a missed prayer may be made up.',
              },
              {
                school: 'Shafi`i',
                position:
                  'Any prayer with a reason goes ahead at all of these times: a missed prayer, the funeral prayer, the two rakʿahs after tawaf, greeting the mosque. Only voluntary prayer with no particular reason is forbidden. Hanbali scholars hold the same in one of two views, and it is the view of Ibn Taymiyyah, Ibn Bāz and Ibn ʿUthaymīn.',
              },
            ],
          },
        ),
      ],
    },
    {
      id: 'after',
      heading: 'Why is there no sunnah after Fajr and ʿAsr?',
      body:
        'Because of two more spans, tied to your own prayer rather than to the sun. Once you have prayed Fajr, voluntary prayer is forbidden until the sun is up; once you have prayed ʿAsr, until it has set. That is why the Every prayer page shows no sunnah after those two, and why the early morning and the late afternoon are the quiet stretches of the day.',
      sources: [hadith('bukhari', '586')],
    },
    {
      id: 'why',
      heading: 'Why these times?',
      body:
        'The Prophet ﷺ told his companions not to time their prayer to the sun’s rising or setting, but to wait until it was fully up or fully gone, because the sun rises and sets between the two horns of a devil: the moments when those who worship the sun bow to it. A Muslim’s prayer must not look like theirs, even by accident of the clock.',
      sources: [hadith('bukhari', '3273')],
    },
  ],
};
