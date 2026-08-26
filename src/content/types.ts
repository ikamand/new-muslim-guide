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
  | 'takbir'
  | 'bowing'
  | 'rising'
  | 'prostrating'
  | 'sitting'
  | 'tashahhud'
  /**
   * The two turns that end the prayer, apart.
   *
   * They were one step reading "turn your face to the right and give the
   * greeting, then to the left and give it again" — which is two things a
   * person does, on a screen this app says should hold one. They are also the
   * last two, so somebody who runs them together ends the prayer wrong and
   * has nothing to check against.
   */
  | 'taslim-right'
  | 'taslim-left'
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
  /**
   * Which rakʿah this step belongs to, 1-based.
   *
   * Set only by `buildPrayer` — wudu, ghusl and the shahada have no rakʿahs and
   * leave it off. It exists so the guide screen can show someone where they are
   * *in the prayer* rather than how far they have scrolled, which is the thing
   * a beginner actually loses track of. The step ids already encoded it as an
   * `r2-` prefix; reading a number out of a string is not data.
   */
  rakah?: number;
  /** What you physically do. Second person, plain language. */
  instruction: string;
  /** What you say, if anything. */
  says?: Recitation;
  /**
   * A surah the step has you recite, by number, printed from `juz30.ts`.
   *
   * Separate from `says` because a surah is not stored twice. Al-Ikhlas
   * already exists as surah 112 in the Qur'an tab's data; a `Recitation`
   * copy of it would be the same text in two files, drifting.
   *
   * It also cannot be a `Recitation` honestly: juz30 carries no
   * transliteration, deliberately (see the header of `juz30.ts`), and
   * inventing one to fill the field would be exactly the improvisation
   * CLAUDE.md forbids. So the step prints Arabic and English, as the surah
   * screen does, and links through to it.
   */
  saysSurah?: number;
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
  /**
   * Genuine list items, where the content is a list.
   *
   * The four forbidden foods were one 44-word paragraph. As four items with a
   * bolded lead each, they are scannable — which is what GOV.UK's own research
   * measures: bullets, bolded keywords and short sections are read faster with
   * fewer errors.
   *
   * ⚠️ Per section, never per page. A page bulleted because bullets look tidy
   * is the fact-sheet failure this format exists to avoid — "no dream is
   * coming" needs a paragraph, because undoing a belief takes an argument.
   *
   * A leading `**bold**` marks the lead-in.
   */
  bullets?: readonly string[];
  /**
   * Print this section's first citation on the page rather than only in the
   * drawer beneath it.
   *
   * The app carried 164 narrations and verses and showed them only inside a
   * collapsed "Where this comes from" — so the best-sourced writing in the app
   * was the part nobody opened, under prose a model wrote paraphrasing it.
   *
   * `hero` breaks the page's margins and is the page's answer. `supporting`
   * gets a rule and an indent. **One hero per page**: the treatment stops
   * meaning anything the moment a page has three, which is what the first page
   * citing three verses proved.
   *
   * A promoted citation is removed from the drawer below, so nothing is said
   * twice.
   */
  promote?: 'hero' | 'supporting';
  /**
   * A text the section is actually about, printed rather than described.
   *
   * The istikhara page is why this exists. Its "The words" section described
   * the duʿa in prose and left the words themselves in the citation drawer
   * underneath — so the most important thing on the page was the part nobody
   * opened. A section whose subject IS a form of words should print it.
   *
   * Rendered by the same `RecitationCard` the prayer steps use, so a duʿa
   * looks the same wherever it is met.
   */
  says?: Recitation;
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

/**
 * One row of the block at the top of a teaching page.
 *
 * ## Why a page needs this above its prose
 *
 * The reference pages are `body` strings averaging 47 words, and somebody
 * awake at three in the morning asking *when can I pray this* should not read
 * a paragraph to find out. Prose is the right shape for an argument and the
 * wrong shape for a fact, and the app was using it for both.
 *
 * ## Written as the reader's question, not the tradition's vocabulary
 *
 * The label is the question somebody actually has — "Do I have to?" — and the
 * value answers it in words they already own. A row reading "Status: Sunnah
 * Mu'akkadah, and Wajib to the Hanafis" is four unknown words and no answer;
 * "No — but it is how the night prayer is closed" is the same ruling with no
 * vocabulary tax. A fact sheet in the tradition's shorthand is an index for
 * somebody who already knows the words, which is not who this app is for.
 *
 * ## Rows are optional and pages differ
 *
 * Food has no "how many" and no "how". A block that pads itself to four rows
 * on every page would be structure for its own sake.
 */
export type QuickFact = {
  /** The reader's question, short enough to sit in one column. */
  label: string;
  value: string;
  /**
   * Where this row goes, for the one row that is a door rather than a fact.
   *
   * "How" is a route to the guide, not a sentence — writing a how-to in one
   * line would be a lie about how simple the movements are. A page with
   * movements gets the door; a page without one does not have the row.
   */
  href?: string;
  /**
   * Drawn in the accent colour.
   *
   * For "Do I have to?", which is the only row carrying a stance rather than a
   * fact. One coloured answer per page; more and none of them read as the
   * important one.
   */
  emphasis?: boolean;
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
  /** Answers before argument. Three or four rows at most; often fewer. */
  quickFacts?: readonly QuickFact[];
  sections: ReferenceSection[];
  meta?: ContentMeta;
};
