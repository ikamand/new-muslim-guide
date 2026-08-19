/**
 * The shape of every guide in the app.
 *
 * A guide is a sequence of steps. A step is one thing you do, held on screen
 * on its own: what to do with your body, and what to say while you do it.
 */

/** Drives the posture illustration and the "you are here" cue. */
export type Posture =
  | 'standing'
  | 'bowing'
  | 'rising'
  | 'prostrating'
  | 'sitting'
  | 'washing';

/**
 * One piece of a recitation that can be memorised on its own.
 *
 * Only texts long enough to learn a piece at a time carry these. The unit is
 * whatever someone would loop twenty times in a row — for Al-Fatiha that is
 * the ayah.
 */
export type RecitationVerse = {
  arabic: string;
  transliteration: string;
  translation: string;
  /** Key into the audio map in `src/content/audio.ts`. */
  audioId: string;
};

export type Recitation = {
  arabic: string;
  transliteration: string;
  translation: string;
  /** "Three times", "In every rak'ah" — shown under the translation. */
  times?: string;
  /** Key into the audio map in `src/content/audio.ts`. */
  audioId?: string;
  /**
   * Set where the text is long enough to memorise in pieces. The whole-text
   * fields above are derived from these, so a correction to a verse lands in
   * both the practice screen and the step player.
   */
  verses?: RecitationVerse[];
};

export type Step = {
  id: string;
  /** Short name for the step: "Takbir", "Wash your face". */
  title: string;
  posture: Posture;
  /** What you physically do. Second person, plain language. */
  instruction: string;
  /** What you say, if anything. */
  says?: Recitation;
  /** Anything a first-timer would otherwise get wrong. */
  note?: string;
};

export type Guide = {
  id: string;
  title: string;
  /** One line under the title on the home screen. */
  subtitle: string;
  steps: Step[];
};

/**
 * One of the pillars — reference reading, not a thing you step through.
 *
 * Shared by the five pillars of Islam and the six articles of faith. They are
 * the same shape: a named thing you read about once, not a sequence you follow
 * mid-motion.
 *
 * Deliberately not a `Guide`: a pillar is something you learn about, a guide
 * is something you follow while holding the phone. Different shape, different
 * screen.
 */
export type Pillar = {
  id: string;
  /** English name: "Prayer". */
  title: string;
  arabic: string;
  transliteration: string;
  /** One line under the title — what it is, in the fewest words. */
  summary: string;
  /** Two or three plain sentences. No jargon a first-timer wouldn't know. */
  detail: string;
  /** Where the app already teaches this, if it does. */
  guideId?: string;
  /** Anything a first-timer would otherwise take the wrong way. */
  note?: string;
};
