/**
 * The shape of every guide in the app.
 *
 * A guide is a sequence of steps. A step is one thing you do, held on screen
 * on its own: what to do with your body, and what to say while you do it.
 *
 * Each shape can carry a `meta` block — category, difficulty, how soon a
 * beginner needs it, what it relates to, where its claims come from. It is
 * optional on purpose: the metadata layer is adoptable one file at a time
 * rather than in a single migration that has to be right first go. See
 * `./model.ts`.
 */

import type { ContentMeta, ContentNote } from './model';
import type { Source } from './sources';

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
  /**
   * What to call this when it is listed on its own, away from the step that
   * uses it — "The tashahhud", "In rukuʿ". A step already has a title; a
   * recitation needs its own once it appears in a practice list.
   */
  title?: string;
  arabic: string;
  transliteration: string;
  translation: string;
  /** "Three times", "In every rak'ah" — shown under the translation. */
  times?: string;
  /** Key into the audio map in `src/content/audio.ts`. */
  audioId?: string;
  /**
   * Where the wording was taken from. Set on texts copied from a named
   * collection, so a reviewer can check the source rather than take the app's
   * word for it — and so `npm run content:audit` can report the ones that
   * carry nothing.
   *
   * Was a free-text string. Structured now because a string cannot be checked:
   * it could not tell a graded-weak narration from a sahih one, and it drifted
   * between "Bukhari" and "Sahih al-Bukhari" spellings.
   */
  sources?: readonly Source[];
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
  /**
   * Absent where a step is not a bodily position at all — saying the shahada
   * is something you do sitting anywhere, and labelling it would be inventing
   * a posture to fill a field.
   */
  posture?: Posture;
  /** What you physically do. Second person, plain language. */
  instruction: string;
  /** What you say, if anything. */
  says?: Recitation;
  /**
   * Anything a first-timer would otherwise get wrong.
   *
   * Untouched, and still the right field for most of what it holds. Where a
   * note is actually a school-of-thought difference or needs a citation, use
   * `notes` instead — a bare string cannot say which of the three it is.
   */
  note?: string;
  /** Notes that carry their standing: agreed, differs, or practical advice. */
  notes?: readonly ContentNote[];
  /** Where this step's instruction comes from, where it is more than method. */
  sources?: readonly Source[];
};

export type Guide = {
  id: string;
  title: string;
  /** One line under the title on the home screen. */
  subtitle: string;
  steps: Step[];
  meta?: ContentMeta;
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
  meta?: ContentMeta;
};

/**
 * A reference topic — headed answers, not a sequence you follow.
 *
 * Distinct from a `Guide` because nobody works through this holding a phone
 * mid-motion. Someone opens it with a question and wants the answer to that
 * question, so it is written as headings you can skim rather than steps you
 * advance through.
 */
export type ReferenceSection = {
  id: string;
  heading: string;
  body: string;
  /** Anything a first-timer would otherwise take the wrong way. */
  note?: string;
  /**
   * Notes that carry their standing. A reference is where the app most often
   * has to say "scholars differ here", and this is where that becomes data a
   * screen can choose how much of to show.
   */
  notes?: readonly ContentNote[];
  sources?: readonly Source[];
};

export type Reference = {
  id: string;
  title: string;
  /** One line under the title. */
  subtitle: string;
  /**
   * Which tab lists it. `pray` for something you look up in the middle of
   * praying or deciding whether to; `learn` for something you read once in a
   * quiet minute. The distinction is when you reach for it, not what it is
   * about.
   */
  surface: 'pray' | 'learn';
  /**
   * Who this applies to. Absent means everyone. Where it is set, the app hides
   * the topic from the other audience — a man has no reason to be shown what
   * changes during a period — and shows it to anyone who declined the question.
   */
  audience?: 'man' | 'woman';
  sections: ReferenceSection[];
  meta?: ContentMeta;
};
