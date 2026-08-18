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

export type Recitation = {
  arabic: string;
  transliteration: string;
  translation: string;
  /** "Three times", "In every rak'ah" — shown under the translation. */
  times?: string;
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
 * One of the five pillars — reference reading, not a thing you step through.
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
};
