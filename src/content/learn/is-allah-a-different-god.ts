import { note, ref } from '../model';
import { general, quran } from '../sources';
import type { Reference } from '../types';

/**
 * ⚠️ REVIEW REQUIRED — model-written English, checked citations.
 *
 * Third page of the "questions you'll be asked" unit (7 Sep 2026; the first
 * two were the pilot of 3 Sep). The question under the question is "did you
 * leave our God?", and a parent asks it before any other. `who-is-allah`
 * already answers the word in one line for the reader; this page gives them
 * what to SAY to the person asking, and the verses it rests on.
 *
 * ## How every citation here was sourced
 *
 * Each verse was read in the Qur'an mirror (`.cache/quran`, Saheeh
 * International), English and Arabic both. No narration is cited: the
 * Qur'an answers this question in its own words, and adding a hadith would
 * have been decoration.
 *
 * ## Deliberate absences
 *
 * 2:62 and 5:69, on the reward of Jews and Christians who believed, are left
 * out: what they mean is a scholarly question, and a convert quoting them at
 * a table would be making a claim about the person opposite. 3:64 ("come to
 * a word that is equitable") is left out because it turns an answer into an
 * invitation, and this page is an answer.
 */
export const IS_ALLAH_A_DIFFERENT_GOD: Reference = {
  id: 'is-allah-a-different-god',
  surface: 'learn',
  title: 'Is Allah a different god?',
  subtitle: 'What to say when someone thinks you changed gods',
  meta: {
    category: 'belief',
    difficulty: 'building',
    estimatedMinutes: 3,
    beginnerPriority: 3,
    relatedContent: [ref('reference', 'who-is-allah'), ref('reference', 'what-about-jesus')],
  },
  quickFacts: [
    {
      label: 'To say out loud',
      value: 'Allah is Arabic for God, the one Abraham and Moses prayed to',
      emphasis: true,
    },
    { label: 'The word', value: 'Arabic-speaking Christians and Jews say Allah when they pray' },
    { label: 'The difference', value: 'Not who God is, but what is said about Him' },
  ],
  sections: [
    {
      id: 'same-god',
      heading: 'Did you change gods?',
      promote: 'hero',
      body:
        'No. The Qur’an gives Muslims the sentence for exactly this conversation. Speaking to Jews and Christians, it tells believers to say: we believe in what was revealed to us and in what was revealed to you, and our God and your God is one. Allah is the Arabic word for God, not the name of a different one. A Muslim believes in the God who spoke to Abraham, Moses and Jesus, and the Qur’an tells believers to say they believe in what was given to every one of the prophets and make no distinction between them.',
      sources: [
        quran(29, 46, { surahName: 'Al-Ankabut' }),
        quran(2, 136, { surahName: 'Al-Baqarah' }),
      ],
    },
    {
      id: 'what-differs',
      heading: 'Then what is different?',
      body:
        'What is said about Him. Islam holds that God is one, that nothing was born of Him and He was not born, and that nothing is like Him. Those are the four lines Muslims recite when asked to describe God, and they are the whole of the difference with a Christian who believes God has a son. So a Muslim will say "the same God" and mean it, and will not say "three" or "son", and both things are true at once. It is better to name that than to talk around it.',
      sources: [
        quran(112, [1, 4], { surahName: 'Al-Ikhlas' }),
        quran(2, 163, { surahName: 'Al-Baqarah' }),
      ],
      notes: [
        note(
          'practical',
          'If the person asking is Christian, "we pray to the same God, and we differ about Jesus" is a complete answer. The page on Jesus carries the rest, for when they ask.',
        ),
      ],
    },
    {
      id: 'the-word',
      heading: 'So why keep saying "Allah"?',
      body:
        'Because it is the word the Qur’an uses, and the word Muslims share in every language on earth. It has no plural and no feminine form, which suits a God the Qur’an says has nothing like Him. Saying "God" in English is not wrong, and many converts do both. What matters is Who is meant, and He is the same in either word.',
      sources: [
        quran(42, 11, { surahName: 'Ash-Shura' }),
        general(
          'That Arabic-speaking Christians and Jews use the word Allah is a fact of the Arabic language, not a religious claim: it is the word in their Bibles and their prayers.',
        ),
      ],
    },
    {
      id: 'every-prophet',
      heading: 'Did the same God send every prophet?',
      body:
        'Yes. The Qur’an says that no messenger was sent without being told that there is no god but Him. When Jacob was dying and asked his sons what they would worship after him, they answered: your God and the God of your fathers, Abraham, Ishmael and Isaac, one God. Muslims read that as their own line of descent, in faith if not in blood.',
      sources: [
        quran(21, 25, { surahName: 'Al-Anbiya' }),
        quran(2, 133, { surahName: 'Al-Baqarah' }),
      ],
    },
    {
      id: 'saying-it',
      heading: 'What do I actually say?',
      body:
        '"I haven’t changed gods. Allah is just the Arabic word for God, the same God Abraham and Moses prayed to. Where we differ is what we say about Him, not who He is." You can stop there. If it turns into a debate, the Qur’an gives you the line for the moment: Allah is our Lord and your Lord, for us our deeds and for you yours, there is no argument between us, and God will bring us together.',
      sources: [
        quran(42, 15, { surahName: 'Ash-Shura' }),
        general(
          'Suggested wording, not a ruling. Each sentence of it rests on a verse quoted above.',
        ),
      ],
    },
  ],
};
