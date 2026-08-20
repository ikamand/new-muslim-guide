import { ref } from './model';
import { Recitations } from './recitations';
import { hadith } from './sources';
import type { Guide, Step } from './types';

/**
 * The five daily prayers are the same prayer repeated a different number of
 * times, said aloud or silently. So the app builds them from those two facts
 * rather than storing five near-identical scripts — one correction to a step
 * fixes it in every prayer, and adding witr or a sunnah prayer later costs a
 * single line.
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

function rakahSteps(rakah: number, spec: PrayerSpec): Step[] {
  const ordinal = ORDINALS[rakah - 1] ?? `${rakah}th`;
  const isFirst = rakah === 1;
  const isFinal = rakah === spec.rakahs;
  /** A short surah is added in the first two rakʿahs only. */
  const addsSurah = rakah <= 2;
  const aloud = rakah <= spec.aloudRakahs;
  /** You sit for tashahhud after the second rakʿah, and after the last one. */
  const sitsForTashahhud = (rakah === 2 && spec.rakahs > 2) || isFinal;

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
    });
    step({
      key: 'takbir',
      title: 'Opening takbir',
      posture: 'standing',
      instruction:
        'Raise both hands to about ear level, palms forward, and say the takbir. Then place your right hand over your left on your chest.',
      says: Recitations.takbir,
      note: 'From this moment you are in prayer. Everything outside it waits.',
    });
    step({
      key: 'opening',
      title: 'Opening supplication',
      posture: 'standing',
      instruction: 'Quietly, with your eyes toward the place of prostration, say:',
      says: Recitations.opening,
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
        'Rise to standing, saying the takbir as you rise, and place your right hand over your left again.',
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
            book: 10,
            bookName: 'Call to Prayers (Adhaan)',
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
      'Say the takbir, then bow with a straight back, hands on your knees, eyes down. Once settled, say:',
    says: Recitations.rukuTasbih,
  });
  step({
    key: 'rising',
    title: 'Stand up straight',
    posture: 'rising',
    instruction: 'Rise from bowing until you are standing upright and still, saying:',
    says: Recitations.rising,
  });
  step({
    key: 'sujud-1',
    title: 'Prostrate',
    posture: 'prostrating',
    instruction:
      'Say the takbir and go down into prostration — forehead, nose, both palms, both knees and the toes of both feet touching the ground. Once settled, say:',
    says: Recitations.sujudTasbih,
    note: isFirst ? 'Keep your elbows off the ground and away from your sides.' : undefined,
  });
  step({
    key: 'sit',
    title: 'Sit up',
    posture: 'sitting',
    instruction:
      'Say the takbir and sit up on your left foot with the right foot upright, hands on your thighs. Say:',
    says: Recitations.betweenProstrations,
  });
  step({
    key: 'sujud-2',
    title: 'Prostrate again',
    posture: 'prostrating',
    instruction: 'Say the takbir and prostrate a second time, exactly as before. Say:',
    says: Recitations.sujudTasbih,
  });

  if (sitsForTashahhud) {
    step({
      key: 'tashahhud',
      title: isFinal ? 'Final sitting' : 'Sit for tashahhud',
      posture: 'sitting',
      instruction: 'Say the takbir, sit as you did between the prostrations, and say:',
      says: Recitations.tashahhud,
      note: 'Many people raise the right index finger while saying the testimony of faith.',
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
