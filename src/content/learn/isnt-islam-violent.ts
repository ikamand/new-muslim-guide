import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * First page of the "questions you'll be asked" unit (3 Sep 2026). The
 * reader is a convert whose parent or colleague has just asked this across
 * a table. The page gives them one answer they can say aloud, then the texts
 * it rests on. It answers; it does not compare Islam with any other religion,
 * and it must stay that way. Both app stores refuse "inflammatory religious
 * commentary", and the person the convert reads this to is family.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and the narration in the hadith corpus (`.cache/hadith`) by
 * its own number, English and Arabic both. Nothing was cited from memory.
 *
 * ## Deliberate absences
 *
 * The word jihad is not explained here. "The mujahid is the one who strives
 * against himself" is Tirmidhi, outside the two Sahihs, and needs the
 * reviewer's ruling on its grading before the app prints it. Bukhari 10 ("a
 * Muslim is one from whose tongue and hand Muslims are safe") was left out
 * because its wording is about Muslims, and printing it under a question
 * about everyone would invite the objection it does not answer.
 */
export const ISNT_ISLAM_VIOLENT: Reference = {
  id: 'isnt-islam-violent',
  surface: 'learn',
  title: 'Isn’t Islam violent?',
  subtitle: 'What to say when the news is the question',
  meta: {
    category: 'community',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'teaching-someone'), ref('reference', 'what-about-jesus')],
  },
  quickFacts: [
    {
      label: 'To say out loud',
      value: 'Taking one life unjustly is counted as killing everyone',
      emphasis: true,
    },
    { label: 'Fighting', value: 'Allowed against those who fight you, and never past the limits' },
    { label: 'Civilians', value: 'The Prophet ﷺ forbade harming women and children' },
  ],
  sections: [
    {
      id: 'one-life',
      heading: 'What does the Qur’an say about killing?',
      promote: 'hero',
      body:
        'The verse to know says that whoever kills a person, other than for murder or for spreading corruption in the land, it is as if he had killed all of humanity. And whoever saves one life, it is as if he had saved all of humanity. Two more verses speak to Muslims directly. Do not kill any person, whom God has made sacred, except by right, meaning with lawful cause and never by private decision. And whoever kills a believer deliberately is promised Hell.',
      sources: [
        quran(5, 32, { surahName: 'Al-Maidah' }),
        quran(17, 33, { surahName: 'Al-Isra' }),
        quran(4, 93, { surahName: 'An-Nisa' }),
      ],
    },
    {
      id: 'fighting',
      heading: 'But the Qur’an does tell Muslims to fight?',
      body:
        'Yes, and it is worth knowing where those verses sit. For the years in Mecca the Muslims were persecuted and did not fight. Permission came after they had been driven from their homes, and the verse that gives it says why: because they were wronged. The limits are in the text itself. Fight those who fight you, and do not go beyond that. If the other side inclines to peace, incline to it. And people who are not fighting you and have not driven you out are to be treated with kindness and justice.',
      sources: [
        quran(22, 39, { surahName: 'Al-Hajj' }),
        quran(2, 190, { surahName: 'Al-Baqarah' }),
        quran(60, 8, { surahName: 'Al-Mumtahanah' }),
        general(
          'That the Meccan years passed without fighting is the account every biography of the Prophet ﷺ gives. The verses quoted carry the permission and its limits in their own words.',
        ),
      ],
      notes: [
        note(
          'practical',
          'A verse about fighting will usually be quoted at you without the lines around it. Ask which verse, and read it in its place.',
        ),
      ],
    },
    {
      id: 'civilians',
      heading: 'Who may never be harmed?',
      body:
        'During one of the Prophet’s ﷺ campaigns a woman was found killed, and he forbade the killing of women and children. That instruction is the basis of the rules of war in Islamic law. Fighting is between fighters, and the people not fighting are off limits. Someone who kills civilians in the name of Islam is breaking the instruction of the man he claims to follow.',
      sources: [
        hadith('bukhari', '3015'),
        general(
          'That the prohibition is the basis of the Islamic rules of war is ordinary explanation, not a ruling. The narration is what is quoted.',
        ),
      ],
    },
    {
      id: 'standard',
      heading: 'What is a Muslim held to?',
      body:
        'Justice, even towards people you have reason to hate. The Qur’an tells believers to stand firm as witnesses for justice, and not to let hatred of a people push them into being unjust. It tells them to answer a bad deed with a better one, so that an enemy becomes a close friend. Hold the news up against that. When someone acting in Islam’s name kills the innocent, the standard has been broken, not followed.',
      sources: [quran(5, 8, { surahName: 'Al-Maidah' }), quran(41, 34, { surahName: 'Fussilat' })],
    },
    {
      id: 'saying-it',
      heading: 'What do I actually say?',
      body:
        'You do not have to win the argument. Something like this is enough. "Islam counts one life as all of humanity, and the Prophet ﷺ forbade harming women and children. People who do that are breaking the religion, not following it." Then stop. If they want the verses, they are above. If they want to argue about the news, that is a conversation about the news, and you are allowed to say you are new and still learning.',
      sources: [
        general(
          'Suggested wording, not a ruling. Every sentence of it rests on the verses and the narration quoted above.',
        ),
      ],
      notes: [
        note(
          'practical',
          'Watch for the question that is really about you: "Are you going to become like that?" It wants reassurance, not a verse. Answer the worry.',
        ),
      ],
    },
  ],
};
