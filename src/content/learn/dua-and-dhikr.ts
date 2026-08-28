import { note, ref } from '../model';
import { hadith, quran } from '../sources';
import type { Reference } from '../types';

/** ⚠️ REVIEW REQUIRED — model-written English, checked citations. */
export const DUA_AND_DHIKR: Reference = {
  id: 'dua-and-dhikr',
  surface: 'learn',
  title: 'Duʿa and dhikr',
  subtitle: 'Talking to God outside the prayer',
  meta: {
    category: 'belief',
    difficulty: 'foundational',
    estimatedMinutes: 4,
    beginnerPriority: 2,
    tags: ['arabic', 'audio'],
    relatedContent: [ref('hisn', '1268971'), ref('reference', 'what-is-the-quran')],
  },
  quickFacts: [
    { label: 'Duʿa', value: 'Asking, in any language and in your own words' },
    { label: 'Dhikr', value: 'Remembering, in short phrases, repeated' },
    { label: 'Where to start', value: 'The duʿas of an ordinary day', href: '/duas' },
  ],
  sections: [
    {
      id: 'dua',
      heading: 'What is duʿa?',
      body:
        'Duʿa is simply asking God for something. It has no set form, no required language and no appointed time. The Qur’an says He is near and answers the one who calls. You can make duʿa in English, in your own words, in the car, and it is the same duʿa.',
      sources: [quran(2, 186, { surahName: 'Al-Baqarah' })],
      notes: [
        note(
          'agreed',
          'You do not need Arabic for this. The memorised duʿas are worth learning because they are the Prophet’s ﷺ wording, not because your own words would be rejected.',
        ),
      ],
    },
    {
      id: 'dhikr',
      heading: 'What is dhikr?',
      body:
        'Dhikr means remembrance: short phrases repeated through the day. Subḥāna-llāh (glory be to God), al-ḥamdu li-llāh (all praise is God’s), Allāhu akbar (God is greatest). The Qur’an says hearts settle by the remembrance of God, and that is closer to what it does than anything a description manages.',
      sources: [quran(13, 28, { surahName: 'Ar-Raʿd' })],
    },
    {
      id: 'why',
      heading: 'Why does it matter so much?',
      promote: 'hero',
      body:
        'The Prophet ﷺ compared the person who remembers their Lord to the living, and the one who does not to the dead. He also said that whoever says subḥāna-llāhi wa bi-ḥamdih a hundred times in a day has their sins forgiven though they were like the foam of the sea.',
      sources: [
        hadith('bukhari', '6407', {
          book: 80,
          bookName: 'Invocations',
          inBookReference: 'Book 80, Hadith 102',
        }),
        hadith('bukhari', '6405', {
          book: 80,
          bookName: 'Invocations',
          inBookReference: 'Book 80, Hadith 100',
        }),
      ],
    },
    {
      id: 'start',
      heading: 'Where do I start?',
      body:
        'Pick one phrase and one moment, such as waking or the walk to work. The Everyday duʿas screen has short ones with the Arabic, how it sounds and what it means. The shortest is a single word, which is a deliberate place to begin rather than a compromise.',
    },
  ],
};
