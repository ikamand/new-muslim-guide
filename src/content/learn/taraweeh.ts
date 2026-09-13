import { note, ref } from '../model';
import { hadith, scholarly } from '../sources';
import type { Reference } from '../types';

/**
 * Taraweeh.
 *
 * ⚠️ NEW, 13 Sep 2026 — model-written English over opened sources. Written
 * from `docs/night-prayers-accuracy.md` §8, which found the app named taraweeh
 * twice and said nothing a newcomer needs on their first night: that it
 * follows Isha and its sunnah, how many rakʿahs, that witr closes it, what to
 * do on arriving late, and that staying to the end is what earns the reward.
 * Today's Ramadan card opens this page every night of the month.
 *
 * What a reviewer owns: "Both are sound" about eight and twenty, which is a
 * live argument in many communities; the witr choice for somebody who will
 * pray again later; and the late-arrival advice, where the schools part.
 */
export const TARAWEEH: Reference = {
  id: 'taraweeh',
  surface: 'learn',
  title: 'Taraweeh',
  subtitle: 'The night prayer of Ramadan, and what happens at the mosque',
  meta: {
    category: 'salah',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    tags: ['mosque'],
    relatedContent: [ref('reference', 'ramadan'), ref('reference', 'qiyam-al-layl'), ref('reference', 'witr')],
  },
  quickFacts: [
    { label: 'When', value: 'Every night of Ramadan, after Isha and its sunnah' },
    { label: 'How many', value: 'Eight or twenty, two at a time, then witr' },
    { label: 'Do I have to?', value: 'No. It is a confirmed sunnah', emphasis: true },
    { label: 'How', value: 'Pray two rakʿahs', href: '/guide/qiyam' },
  ],
  sections: [
    {
      id: 'what',
      heading: 'What is taraweeh?',
      promote: 'hero',
      body:
        'The night prayer of Ramadan. Mosques pray it together after Isha, two rakʿahs at a time, and close it with witr. The Prophet ﷺ said that whoever prays at night in Ramadan out of faith, hoping for its reward, has their past sins forgiven.',
      sources: [
        hadith('bukhari', '37', { grading: 'sahih', role: 'virtue' }),
        scholarly({
          work: 'Taraweeh is a confirmed sunnah',
          author: 'Islam Question & Answer, fatwa 38922',
          url: 'https://islamqa.info/en/answers/38922',
        }),
      ],
    },
    {
      id: 'when',
      heading: 'When does it start and end?',
      body:
        'It starts after Isha and the two sunnah rakʿahs that follow it, and its time lasts until just before Fajr. The first night is the evening before the first fast, and there is none on the night of Eid.',
      note: 'The month begins with the sighting of the moon, so follow your mosque’s announcement rather than a calendar.',
      sources: [
        scholarly({
          work: 'The time for taraweeh, quoting al-Mawsuʿah al-Fiqhiyyah 25/281',
          author: 'Islam Question & Answer, fatwa 162318',
          url: 'https://islamqa.info/en/answers/162318',
        }),
        scholarly({
          work: 'The first and last nights of taraweeh',
          author: 'Islam Question & Answer, fatwa 50547',
          url: 'https://islamqa.info/en/answers/50547',
        }),
      ],
    },
    {
      id: 'late',
      heading: 'What if I arrive after it has started?',
      body:
        'If you have not prayed Isha yet, you can join them with the intention of Isha, and when the imam gives the salam, stand up and finish the rakʿahs of Isha you still owe. Taraweeh prayed before Isha does not count.',
      sources: [
        scholarly({
          work: 'He prayed taraweeh before Isha',
          author: 'Ibn Baz, in Islam Question & Answer, fatwa 37829',
          url: 'https://islamqa.info/en/answers/37829',
        }),
      ],
      notes: [
        note(
          'differs',
          'In the Hanafi school an obligatory prayer behind an imam praying taraweeh does not count, so at a Hanafi mosque pray Isha separately first, then join them.',
          {
            sources: [
              scholarly({
                work: 'Am I allowed to pray the sunna or fard behind the tarawih prayer?',
                author: 'Yusuf Weltch, SeekersGuidance',
                school: 'Hanafi',
                url: 'https://seekersguidance.org/answers/hanafi-fiqh/am-i-allowed-to-pray-the-sunna-or-fard-behind-the-tarawih-prayer/',
              }),
            ],
            positions: [
              {
                school: 'Hanafi',
                position:
                  'An obligatory prayer is not valid behind an imam praying a sunna prayer such as taraweeh. The sunna of Isha may be prayed behind him.',
              },
            ],
          },
        ),
      ],
    },
    {
      id: 'how-many',
      heading: 'How many rakʿahs?',
      promote: 'quote',
      body:
        'Some mosques pray eight rakʿahs and some twenty, two at a time, and then witr. Both are sound, and neither side is doing it wrong. ʿAisha said the Prophet ﷺ never prayed more than eleven, in Ramadan or any other month. Three of the four schools hold twenty, and there is no fixed number.',
      sources: [
        hadith('bukhari', '1147', { grading: 'sahih', role: 'practice' }),
        scholarly({
          work: 'The number of rakʿahs of taraweeh',
          author: 'Islam Question & Answer, fatwa 9036',
          url: 'https://islamqa.info/en/answers/9036',
        }),
      ],
    },
    {
      id: 'stay',
      heading: 'Can I leave before the end?',
      promote: 'quote',
      body:
        'Yes, it is voluntary. But the Prophet ﷺ said that whoever prays with the imam until he finishes is recorded as having prayed the whole night, and leaving early gives that up. Staying through witr is worth it when you can.',
      sources: [
        hadith('abu-dawud', '1375', { grading: 'sahih', role: 'virtue' }),
        hadith('tirmidhi', '806', { grading: 'sahih', role: 'virtue' }),
        scholarly({
          work: 'Leaving taraweeh before the imam finishes',
          author: 'Islam Question & Answer, fatwa 153247',
          url: 'https://islamqa.info/en/answers/153247',
        }),
      ],
    },
    {
      id: 'witr',
      heading: 'What happens at witr?',
      body:
        'The imam closes taraweeh with witr, often with the qunut, a dua in its last rakʿah. Some mosques add the qunut only in the second half of the month. If you plan to pray again later that night, either pray witr with the imam and do not repeat it, or stand up after his salam and add one rakʿah, then pray witr at the end of your night.',
      sources: [
        scholarly({
          work: 'Witr with the imam when you will pray again later',
          author: 'Islam Question & Answer, fatwa 232790',
          url: 'https://islamqa.info/en/answers/232790',
        }),
        scholarly({
          work: 'Qunut in witr and in Fajr',
          author: 'Dar al-Iftaa al-Misriyyah, fatwa 15984',
          url: 'https://www.dar-alifta.org/ar/fatwa/details/15984',
        }),
        hadith('abu-dawud', '1439', { grading: 'sahih', role: 'practice' }),
      ],
    },
    {
      id: 'together',
      heading: 'Why is it prayed together?',
      promote: 'quote',
      body:
        'The Prophet ﷺ led it in the mosque for a few nights, then stopped coming out, because he feared it would be made obligatory. Later ʿUmar gathered everyone behind one imam. Praying it at the mosque is better, and praying it at home still counts.',
      sources: [
        hadith('bukhari', '2012', { grading: 'sahih', role: 'context' }),
        hadith('bukhari', '2010', { grading: 'sahih', role: 'context' }),
        scholarly({
          work: 'Taraweeh is a confirmed sunnah',
          author: 'Islam Question & Answer, fatwa 38922',
          url: 'https://islamqa.info/en/answers/38922',
        }),
      ],
    },
  ],
};
