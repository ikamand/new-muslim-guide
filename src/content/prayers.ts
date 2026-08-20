import { note, ref } from './model';
import type { ContentNote } from './model';
import { Recitations } from './recitations';
import { general, hadith, quran } from './sources';
import type { Source } from './sources';
import type { Guide, Step } from './types';

/**
 * The five daily prayers are the same prayer repeated a different number of
 * times, said aloud or silently. So the app builds them from those two facts
 * rather than storing five near-identical scripts — one correction to a step
 * fixes it in every prayer, and adding witr or a sunnah prayer later costs a
 * single line.
 *
 * ⚠️ THE PHYSICAL METHOD IS NOW SOURCED, AND ANCHORED TO ONE NARRATION.
 *
 * The words said in prayer were each cited in an earlier pass; the movements
 * were not, and the result was a composite — hands raised to the ears (the
 * Hanafi position), folded on the chest (a contemporary position no classical
 * school holds for men), and the final sitting taken the Hanafi way. Three
 * details from three different places, which is a prayer nobody prays.
 *
 * The method below is instead anchored to `Abu Humayd as-Sa`idi's description
 * of the Prophet's ﷺ prayer in Sahih al-Bukhari 828, which he gave in front of
 * a group of the companions and they agreed with. One narration covers the
 * height of the hands at the takbir, the bow, the straightening, the
 * prostration, and both sittings — so following it produces one coherent
 * prayer rather than an assembly of preferences. Where it is silent the app
 * uses the narration that speaks to that detail, cited on the step.
 *
 * WHAT CHANGED, and why each change was made:
 *   - hands raised to SHOULDER level at the takbir, not ear level. Bukhari 828
 *     and Bukhari 735 both say shoulders; Muslim 391b says ears. Both are
 *     authentic and the `differs` note carries the second.
 *   - the hands are folded in the step after the takbir rather than in it, so
 *     one screen holds one action, and the note about WHERE on the body they
 *     rest sits on that screen rather than competing with the takbir.
 *   - the FINAL sitting of a prayer that has two sittings is now tawarruk —
 *     left foot slid under to the right, sitting on the ground — which is what
 *     Bukhari 828 describes and what the app's own source said all along while
 *     the instruction said otherwise. Fajr, which has one sitting, is
 *     unchanged.
 *   - the index finger is raised as an instruction with Sahih Muslim 579a
 *     behind it, rather than "many people raise" it, which read as folklore
 *     and is a narrated sunnah.
 *   - the hands are raised again at the bow and on rising from it, which
 *     Bukhari 735 states plainly and the app had simply omitted. The Hanafi
 *     position is in the note.
 *
 * ⚠️ REVIEW REQUIRED — the hands on the chest. Sunan Abi Dawud 759 is graded
 * sahih by Al-Albani and says the chest, and it is what a great many people
 * are taught today, but it is a mursal report from Tawus and no classical
 * school places a man's hands there. See the `differs` note on the opening
 * step, and `docs/scholarly-review.md` §1.5.
 */
type PrayerSpec = {
  id: string;
  title: string;
  /** Roughly when it is prayed — shown under the title. */
  when: string;
  rakahs: number;
  /**
   * How many opening rakʿahs have the Qur'an recited aloud. Fajr: both.
   * Maghrib and Isha: the first two. Dhuhr and Asr: none, all silent.
   */
  aloudRakahs: number;
};

const ORDINALS = ['first', 'second', 'third', 'fourth'] as const;

const ADHAN_BOOK = { book: 10, bookName: 'Call to Prayers (Adhaan)' } as const;

/**
 * The description of the prayer that the companions endorsed.
 *
 * Abu Humayd as-Sa`idi described the Prophet's ﷺ prayer in front of a group of
 * them and they accepted it. It is the single most complete physical
 * description in the two Sahihs, which is why the whole method here hangs off
 * it rather than off one detail from each school.
 */
const ABU_HUMAYD = hadith('bukhari', '828', {
  ...ADHAN_BOOK,
  inBookReference: 'Book 10, Hadith 222',
});

/** The man who prayed badly — where stillness in each position comes from. */
const PRAYED_BADLY = hadith('bukhari', '793', {
  ...ADHAN_BOOK,
  inBookReference: 'Book 10, Hadith 188',
});

/** "I have been ordered to prostrate on seven bones." */
const SEVEN_BONES = hadith('bukhari', '812', {
  ...ADHAN_BOOK,
  inBookReference: 'Book 10, Hadith 207',
});

/** Ibn `Umar: hands to the shoulders at the takbir, at the bow, and on rising. */
const RAISING_HANDS = hadith('bukhari', '735', {
  ...ADHAN_BOOK,
  inBookReference: 'Book 10, Hadith 129',
});

/** Malik b. al-Huwayrith: raised until level with the ears. */
const RAISING_TO_EARS = hadith('muslim', '391b', {
  book: 4,
  bookName: 'The Book of Prayers',
  inBookReference: 'Book 4, Hadith 28',
});

/** Sahl b. Sa`d: the right hand on the left FOREARM. It names no place on the body. */
const RIGHT_OVER_LEFT = hadith('bukhari', '740', {
  ...ADHAN_BOOK,
  inBookReference: 'Book 10, Hadith 134',
});

/** Tawus: folded on the chest. Mursal, and graded sahih by Al-Albani. */
const HANDS_ON_CHEST = hadith('abu-dawud', '759', {
  book: 2,
  bookName: 'Prayer (Kitab Al-Salat)',
  inBookReference: 'Book 2, Hadith 369',
  grading: 'sahih',
  gradedBy: 'Al-Albani',
});

/** Ibn az-Zubayr: where each hand rests in the sitting, and the raised finger. */
const RAISED_FINGER = hadith('muslim', '579a', {
  book: 5,
  bookName: 'The Book of Mosques and Places of Prayer',
  inBookReference: 'Book 5, Hadith 145',
});

/**
 * How high the hands go, and whether they are raised more than once.
 *
 * Both heights are in the two Sahihs, so neither can be called the mistake.
 * Shown once, on the opening takbir of the first rakʿah, rather than on every
 * screen that says the word takbir.
 */
const raisingNote: ContentNote = note(
  'differs',
  'You will see hands raised to the shoulders and to the ears, and you will see people raise them only once. All of it is narrated, and none of it affects whether your prayer counts.',
  {
    sources: [RAISING_HANDS, RAISING_TO_EARS, ABU_HUMAYD],
    positions: [
      {
        school: 'Hanafi',
        position:
          'Raise the hands to the level of the ears for men, and to the shoulders for women, and only at the opening takbir.',
      },
      {
        school: 'the majority',
        position:
          'Raise them to the level of the shoulders, and raise them again when bowing and when rising from the bow.',
      },
    ],
    additionalExplanation:
      'Ibn `Umar and Abu Humayd both describe the hands going up to the shoulders; Malik ibn al-Huwayrith describes them going up level with the ears. Ibn `Umar adds that they are raised again at the bow and on rising from it, and not in prostration. This guide follows the shoulders because that is what Abu Humayd described in front of the companions who agreed with him.',
  },
);

/**
 * Where the folded hands rest. The app's single most contested instruction.
 *
 * Bukhari 740 establishes that the right hand goes over the left forearm and
 * says nothing about where on the body. Every position below is a reading of
 * other evidence, which is why the four schools split four ways.
 */
const handPlacementNote: ContentNote = note(
  'differs',
  'Where the folded hands rest is the one detail you will most obviously see Muslims doing differently. Every position below is taught by scholars, and the prayer is valid in any of them.',
  {
    sources: [RIGHT_OVER_LEFT, HANDS_ON_CHEST],
    positions: [
      { school: 'Hanafi', position: 'Below the navel for men, and on the chest for women.' },
      {
        school: 'Maliki',
        position:
          'The best-known position of the school is to let the arms hang at the sides in an obligatory prayer, rather than folding them.',
      },
      { school: 'Shafi`i', position: 'Below the chest and above the navel.' },
      { school: 'Hanbali', position: 'Below the navel.' },
      {
        school: 'contemporary scholarship',
        position:
          'On the chest, which is what this guide teaches, from the report of Tawus in Sunan Abi Dawud 759.',
      },
    ],
    additionalExplanation:
      'What Sahih al-Bukhari establishes is only that the right hand goes over the left forearm — the narration names no place on the body. The report naming the chest is graded sahih by Al-Albani but comes through Tawus, who did not meet the Prophet ﷺ, and no classical school places a man\'s hands there. Follow whichever you are taught locally; nobody holds that the prayer fails over it.',
  },
);

/** Stillness. The one thing a man was sent back three times to correct. */
const stillnessNote: ContentNote = note(
  'agreed',
  'Settle in each position before you move to the next. This is the thing the Prophet ﷺ sent a man back to repeat his prayer for, three times over.',
  {
    sources: [PRAYED_BADLY],
    additionalExplanation:
      'He told him: bow until you are at rest bowing, then rise until you are standing straight, then prostrate until you are at rest prostrating, then sit until you are at rest sitting — and do that through the whole prayer. Speed is the most common fault in a new Muslim\'s prayer and the easiest to fix.',
  },
);

/** The two sittings, and the schools that keep them the same. */
const finalSittingNote: ContentNote = note(
  'differs',
  'Sitting differently in the last sitting is what Abu Humayd described, and it is what the Shafi`i and Hanbali schools teach. Others sit the same way in both. You will see both in any mosque.',
  {
    sources: [ABU_HUMAYD],
    positions: [
      { school: 'Hanafi', position: 'Sit on the left foot in every sitting of the prayer.' },
      { school: 'Maliki', position: 'Sit on the ground with the left foot slid across in every sitting.' },
      {
        school: 'Shafi`i',
        position:
          'Sit on the left foot in a middle sitting, and on the ground with the left foot slid across in the final one.',
      },
      {
        school: 'Hanbali',
        position:
          'The same distinction as the Shafi`i school, in a prayer that has two sittings.',
      },
    ],
    additionalExplanation:
      'Abu Humayd\'s description contrasts the two: "on sitting in the second rakʿah he sat on his left foot and propped up the right one; and in the last rakʿah he pushed his left foot forward and kept the other foot propped up and sat over the buttocks." Because the contrast is between two sittings, this guide keeps Fajr — which has only one — on the left foot.',
  },
);

function rakahSteps(rakah: number, spec: PrayerSpec): Step[] {
  const ordinal = ORDINALS[rakah - 1] ?? `${rakah}th`;
  const isFirst = rakah === 1;
  const isFinal = rakah === spec.rakahs;
  /** A short surah is added in the first two rakʿahs only. */
  const addsSurah = rakah <= 2;
  const aloud = rakah <= spec.aloudRakahs;
  /** You sit for tashahhud after the second rakʿah, and after the last one. */
  const sitsForTashahhud = (rakah === 2 && spec.rakahs > 2) || isFinal;
  /**
   * The different final sitting applies where there IS a middle sitting to be
   * different from. Fajr has one sitting and keeps the ordinary one.
   */
  const sitsTawarruk = isFinal && spec.rakahs > 2;

  const steps: Step[] = [];
  const step = (s: Omit<Step, 'id'> & { key: string }) =>
    steps.push({ ...s, id: `r${rakah}-${s.key}` });

  if (isFirst) {
    step({
      key: 'intention',
      title: 'Face the qibla and intend',
      posture: 'standing',
      instruction:
        `Stand facing the qibla, feet roughly shoulder-width apart, and intend in your heart that you are praying ${spec.title}.`,
      note: 'The intention is a thought, not a sentence. You do not say it out loud.',
      sources: [quran(2, 144, { surahName: 'Al-Baqarah' })],
    });
    step({
      key: 'takbir',
      title: 'Opening takbir',
      posture: 'standing',
      instruction:
        'Raise both hands to about shoulder level, palms forward, and say the takbir.',
      says: Recitations.takbir,
      note: 'From this moment you are in prayer. Everything outside it waits.',
      notes: [raisingNote],
      sources: [RAISING_HANDS, ABU_HUMAYD],
    });
    step({
      key: 'opening',
      title: 'Fold your hands, and open',
      posture: 'standing',
      instruction:
        'Rest your right hand over your left forearm, on your chest. Then quietly, with your eyes toward the place of prostration, say:',
      says: Recitations.opening,
      notes: [handPlacementNote],
      sources: [RIGHT_OVER_LEFT, HANDS_ON_CHEST],
    });
    step({
      key: 'taawwudh',
      title: 'Seek refuge',
      posture: 'standing',
      instruction: 'Still quietly, before you recite the Qur’an, say:',
      says: Recitations.taawwudh,
    });
  } else {
    step({
      key: 'stand',
      title: `Stand for the ${ordinal} rakʿah`,
      posture: 'standing',
      instruction:
        'Rise to standing, saying the takbir as you rise, and rest your right hand over your left forearm again.',
      says: Recitations.takbir,
    });
  }

  step({
    key: 'fatiha',
    title: 'Recite Al-Fatiha',
    posture: 'standing',
    instruction: aloud
      ? 'Recite the opening chapter of the Qur’an aloud.'
      : 'Recite the opening chapter of the Qur’an quietly, so only you can hear it.',
    says: Recitations.fatiha,
    note: isFirst
      ? 'This is the one recitation the prayer cannot do without. Learn it first, a verse at a time.'
      : undefined,
    // The note states a condition of the prayer's validity, so it carries the
    // narration that states it — the same one `reference:al-fatihah` cites.
    sources: isFirst
      ? [
          hadith('bukhari', '756', {
            ...ADHAN_BOOK,
            inBookReference: 'Book 10, Hadith 150',
          }),
        ]
      : undefined,
  });

  if (addsSurah) {
    step({
      key: 'surah',
      title: 'Add a short surah',
      posture: 'standing',
      instruction: aloud
        ? 'Recite any other short passage of the Qur’an aloud.'
        : 'Recite any other short passage of the Qur’an quietly.',
      // Al-Ikhlas has four ayat, not three. The app said three here and
      // "Four lines that answer the question" in `learn/who-is-allah.ts`,
      // which cites Qur'an 112:1-4 — two screens, one surah, two numbers.
      note: 'Al-Ikhlas is four short verses and is where most people start. Until you know one, Al-Fatiha alone is enough.',
    });
  }

  step({
    key: 'ruku',
    title: 'Bow',
    posture: 'bowing',
    instruction:
      'Raise your hands again as you say the takbir, then bow with a straight back, hands gripping your knees, eyes down. Once settled, say:',
    says: Recitations.rukuTasbih,
    notes: isFirst ? [stillnessNote] : undefined,
    sources: isFirst ? [ABU_HUMAYD, RAISING_HANDS, PRAYED_BADLY] : undefined,
  });
  step({
    key: 'rising',
    title: 'Stand up straight',
    posture: 'rising',
    instruction:
      'Rise from bowing, raising your hands as you come up, until you are standing upright and still, saying:',
    says: Recitations.rising,
    note: isFirst
      ? 'Stand until your back has properly settled before you go down. Rushing this is the commonest fault in a new Muslim’s prayer.'
      : undefined,
    sources: isFirst ? [ABU_HUMAYD, RAISING_HANDS] : undefined,
  });
  step({
    key: 'sujud-1',
    title: 'Prostrate',
    posture: 'prostrating',
    instruction:
      'Say the takbir and go down into prostration — forehead, nose, both palms, both knees and the toes of both feet touching the ground. Once settled, say:',
    says: Recitations.sujudTasbih,
    note: isFirst
      ? 'Keep your elbows off the ground and away from your sides, and your toes turned toward the qibla. The hands are not raised for this one.'
      : undefined,
    sources: isFirst ? [SEVEN_BONES, ABU_HUMAYD] : undefined,
  });
  step({
    key: 'sit',
    title: 'Sit up',
    posture: 'sitting',
    instruction:
      'Say the takbir and sit up on your left foot with the right foot upright, hands on your thighs. Say:',
    says: Recitations.betweenProstrations,
    sources: isFirst ? [ABU_HUMAYD, PRAYED_BADLY] : undefined,
  });
  step({
    key: 'sujud-2',
    title: 'Prostrate again',
    posture: 'prostrating',
    instruction: 'Say the takbir and prostrate a second time, exactly as before. Say:',
    says: Recitations.sujudTasbih,
  });

  if (sitsForTashahhud) {
    const sittingSources: Source[] = [ABU_HUMAYD, RAISED_FINGER];
    step({
      key: 'tashahhud',
      title: isFinal ? 'Final sitting' : 'Sit for tashahhud',
      posture: 'sitting',
      instruction: sitsTawarruk
        ? 'Say the takbir and sit again — this time slide your left foot across under you to the right and sit on the ground, right foot still upright. Rest your left hand on your left knee and your right hand on your right thigh, raise your right index finger, and say:'
        : 'Say the takbir and sit as you did between the prostrations. Rest your left hand on your left knee and your right hand on your right thigh, raise your right index finger, and say:',
      says: Recitations.tashahhud,
      note: 'You will see the finger held still and you will see it moved. What the narration describes is the raising itself.',
      notes: [finalSittingNote],
      sources: sittingSources,
    });
    if (isFinal) {
      step({
        key: 'salawat',
        title: 'Send prayers on the Prophet',
        posture: 'sitting',
        instruction: 'Still sitting, continue with:',
        says: Recitations.salawat,
      });
      step({
        key: 'taslim',
        title: 'End the prayer',
        posture: 'sitting',
        instruction:
          'Turn your face to the right and give the greeting, then to the left and give it again.',
        says: Recitations.taslim,
        note: `That is ${spec.title} complete.`,
      });
    }
  } else if (!isFinal) {
    // Nothing to add: the next rakʿah opens by standing back up.
  }

  return steps;
}

function buildPrayer(spec: PrayerSpec): Guide {
  const steps: Step[] = [];
  for (let rakah = 1; rakah <= spec.rakahs; rakah += 1) {
    steps.push(...rakahSteps(rakah, spec));
  }
  return {
    id: spec.id,
    title: spec.title,
    subtitle: `${spec.rakahs} rakʿah · ${spec.when}`,
    // Derived like everything else here, so a sixth prayer added to
    // PRAYER_SPECS is classified without anyone remembering to.
    meta: {
      category: 'salah',
      difficulty: 'foundational',
      // Doing time, not reading time: roughly a minute a rakʿah once the words
      // are known, plus settling and the closing. Not a target.
      estimatedMinutes: spec.rakahs + 2,
      beginnerPriority: 1,
      tags: ['first-day', 'arabic'],
      relatedContent: [ref('guide', 'wudu'), ref('reference', 'al-fatihah')],
      // The whole method, and where the rakʿah count comes from.
      sources: [
        ABU_HUMAYD,
        PRAYED_BADLY,
        hadith('bukhari', '350', {
          book: 8,
          bookName: 'Prayers (Salat)',
          inBookReference: 'Book 8, Hadith 2',
          role: 'context',
        }),
        general(
          'How many rakʿahs each prayer has is known from the unbroken practice of the Muslim community rather than from any single narration. `A\'isha records in Sahih al-Bukhari 350 that the prayer was first prescribed as two rakʿahs and was later increased for the resident.',
        ),
      ],
    },
    steps,
  };
}

export const PRAYER_SPECS: PrayerSpec[] = [
  { id: 'fajr', title: 'Fajr', when: 'Dawn, before sunrise', rakahs: 2, aloudRakahs: 2 },
  { id: 'dhuhr', title: 'Dhuhr', when: 'After midday', rakahs: 4, aloudRakahs: 0 },
  { id: 'asr', title: 'Asr', when: 'Late afternoon', rakahs: 4, aloudRakahs: 0 },
  { id: 'maghrib', title: 'Maghrib', when: 'Just after sunset', rakahs: 3, aloudRakahs: 2 },
  { id: 'isha', title: 'Isha', when: 'Night', rakahs: 4, aloudRakahs: 2 },
];

export const PRAYERS: Guide[] = PRAYER_SPECS.map(buildPrayer);
