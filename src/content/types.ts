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
