import { note, ref } from '../model';
import { general, hadith, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Second page of the "questions you'll be asked" unit (3 Sep 2026). Most
 * converts in the West were raised Christian, and this is the question their
 * parents ask first. The page names the two real differences, the sonship
 * and the cross, plainly and without argument, because the reader will be
 * saying this to someone they love.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International) and each narration in the hadith corpus (`.cache/hadith`)
 * by its own number, English and Arabic both. Nothing was cited from memory.
 *
 * ## Deliberate absences
 *
 * The return of Jesus (Bukhari 3448) is left out. It is not what a parent
 * asks, and its wording ("break the cross") is for the reviewer to place
 * before a convert reads it to a Christian mother. 61:6, in which Jesus
 * foretells a messenger named Ahmad, is left out because it turns an answer
 * into an argument, and this page is an answer.
 */
export const WHAT_ABOUT_JESUS: Reference = {
  id: 'what-about-jesus',
  surface: 'learn',
  title: 'What about Jesus?',
  subtitle: 'What Muslims believe about him, and what they don’t',
  meta: {
    category: 'belief',
    difficulty: 'building',
    estimatedMinutes: 4,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'who-is-muhammad'), ref('reference', 'isnt-islam-violent')],
  },
  quickFacts: [
    {
      label: 'To say out loud',
      value: 'Muslims love Jesus as a prophet of God, not as God',
      emphasis: true,
    },
    { label: 'His mother', value: 'Mary has a chapter of the Qur’an named after her' },
    { label: 'The cross', value: 'The Qur’an says he was not killed, but raised to God' },
  ],
  sections: [
    {
      id: 'believe',
      heading: 'Do Muslims believe in Jesus?',
      promote: 'hero',
      body:
        'Yes, and it is not optional. A Muslim believes in every prophet God sent, and the Qur’an says believers make no distinction between them. It calls Jesus the Messiah and a word from God, tells of his birth to Mary when no man had touched her, and gives her a chapter of her own. Muslims say "peace be upon him" after his name, as they do after the name of every prophet.',
      sources: [
        quran(3, 45, { surahName: 'Al-Imran' }),
        quran(3, 47, { surahName: 'Al-Imran' }),
        quran(2, 136, { surahName: 'Al-Baqarah' }),
      ],
    },
    {
      id: 'son',
      heading: 'So why not the Son of God?',
      body:
        'Because the centre of Islam is that God is one, with nothing beside Him and nothing born of Him. The Qur’an says the Messiah was a messenger, that messengers had passed before him, and that he and his mother both ate food, which is its plain way of saying they were human. It compares his creation without a father to Adam’s creation without either. And it tells the People of the Scripture directly not to say "three". This is the real difference between the two faiths, and it is better named than talked around.',
      sources: [
        quran(4, 171, { surahName: 'An-Nisa' }),
        quran(5, 75, { surahName: 'Al-Maidah' }),
        quran(3, 59, { surahName: 'Al-Imran' }),
      ],
      notes: [
        note(
          'practical',
          'If the person asking is Christian, this is the point they will feel. You are not required to argue it. "This is where we differ" is a complete answer.',
        ),
      ],
    },
    {
      id: 'cross',
      heading: 'What about the crucifixion?',
      body:
        'The Qur’an says he was not killed and not crucified, that it was made to appear so, and that God raised him to Himself. So Muslims do not believe he died for anyone’s sins. No soul carries another’s burden. Each person answers for their own deeds, and forgiveness comes from God directly, with nothing in between. If the next question is "then how are you saved?", the Prophet ﷺ answered it. Whoever testifies that there is no god but God, that Muhammad is His servant and messenger, and that Jesus is His servant and His word given to Mary, God will admit to Paradise, however few their good deeds.',
      sources: [
        quran(4, [157, 158], { surahName: 'An-Nisa' }),
        quran(6, 164, { surahName: 'Al-Anʿam' }),
        hadith('bukhari', '3435'),
      ],
    },
    {
      id: 'brothers',
      heading: 'How close are the two prophets?',
      body:
        'The Prophet ﷺ said he is the nearest of all people to Jesus, that no prophet came between them, and that the prophets are brothers from one father. Their mothers differ, and their religion is one. Muslims see Muhammad ﷺ as the last in the same line Jesus belonged to, not as his rival.',
      sources: [hadith('bukhari', '3442'), hadith('bukhari', '3443')],
    },
    {
      id: 'saying-it',
      heading: 'What do I actually say?',
      body:
        '"We believe in Jesus. We believe he was born of a virgin, and that he was the Messiah and a prophet of God. We don’t believe he was God or the Son of God, and that is the real difference between us." You can stop there. If it turns into a debate, the Qur’an gives you the line for that moment: for you is your religion, and for me is mine.',
      sources: [
        quran(109, 6, { surahName: 'Al-Kafirun' }),
        general(
          'Suggested wording, not a ruling. Each sentence of it rests on a verse or narration quoted above.',
        ),
      ],
    },
  ],
};
