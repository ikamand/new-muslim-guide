/**
 * The adhkār sessions — sittings of dhikr the day is organised around.
 *
 * ## Hand-written, like `moments.ts`, and for the same reason
 *
 * Which of the book's 132 occasions is a *session* is an editorial judgement,
 * not something derivable from `hisn.ts`. A generator would overwrite it.
 *
 * ## Morning and evening are two sessions over ONE occasion
 *
 * Hisn al-Muslim prints a single occasion — `أَذْكَارُ الصَّبَاحِ وَالْمَسَاءِ`,
 * 29 lines — for both sittings. The app shows the same list twice, named for
 * the sitting you are in, which is what every reader expects and what the book
 * supports.
 *
 * Six lines behave. Four say which sitting they belong to in their own text —
 * `(مائةَ مرَّةٍ إذا أصبحَ)` — and are hidden from the other. Two open with a
 * word that changes, `أَصْبَحْتُ` to `أَمْسَيْتُ`, and carry the book's own
 * footnote as an evening note rather than being rewritten. All six are
 * transcribed in `annotations.ts`; none is a judgement, and the other 23 are
 * said at both because the book marks them for neither.
 */

import { annotationFor } from './annotations';
import { HISN, type HisnLine, type HisnOccasion } from './hisn';

/** When a session is the one to be doing, in terms of the prayer day. */
export type AdhkarWindow =
  /** Within a short grace period after any of the five. */
  | 'after-prayer'
  /** Fajr until sunrise. */
  | 'morning'
  /** ʿAsr until Maghrib. */
  | 'evening'
  /** After ʿIshāʾ. */
  | 'night';

export type AdhkarSession = {
  id: string;
  /** The occasion in `hisn.ts` this reads. */
  occasion: number;
  /**
   * Windows this session is the answer for.
   *
   * Two for the morning-and-evening list, because the book gives one list for
   * both sittings — see this file's header.
   */
  windows: readonly AdhkarWindow[];
  /**
   * Roughly how long it takes to read aloud, in minutes.
   *
   * Hand-set rather than computed from a character count: the repeated ones
   * dominate, and a hundred tasbīḥ is not a hundred lines of reading. Rounded
   * generously, because telling someone six minutes and taking ten is worse
   * than the reverse.
   */
  minutes: number;
  /**
   * Which sitting this session is, where two of them read one occasion.
   *
   * Absent for sessions whose occasion belongs to a single sitting anyway —
   * there is nothing to filter.
   */
  sitting?: 'morning' | 'evening';
};

export const ADHKAR_SESSIONS: readonly AdhkarSession[] = [
  { id: 'morning', occasion: 1269190, windows: ['morning'], sitting: 'morning', minutes: 7 },
  { id: 'evening', occasion: 1269190, windows: ['evening'], sitting: 'evening', minutes: 7 },
  { id: 'sleep', occasion: 1269267, windows: ['night'], minutes: 5 },
  { id: 'after-prayer', occasion: 1269149, windows: ['after-prayer'], minutes: 3 },
];

/**
 * One thing a reader is asked to do once.
 *
 * Not the same as a row of the book, and the three ways they differ are the
 * three things this file settles so no screen has to: a row can be dropped
 * (`omit`), folded into the row above (`continues`), or SPLIT because the book
 * put two dhikr in one row with the count printed between them.
 */
export type AdhkarStep = {
  /** Unique per step — a split row yields several from one line id. */
  key: string;
  /** The row it came from, for annotations, ids and bug reports. */
  line: HisnLine;
  arabic: string;
  english: string;
  emphasis?: readonly string[];
  repeat: number;
  /** Something to do rather than something to say. Never counted. */
  instruction: boolean;
  /** The book's evening substitutions, in an evening sitting only. */
  eveningForms: readonly string[];
};

/**
 * The steps a session reads, with the book's rows turned into things to do.
 *
 * Everything a screen needs to render a sitting, so the reader holds no
 * content rules of its own and `npm run narration:check` can see the same
 * steps a reader will.
 */
export function stepsFor(session: AdhkarSession): readonly AdhkarStep[] {
  const steps: AdhkarStep[] = [];

  for (const line of linesFor(session)) {
    const note = annotationFor(line.id);
    const eveningForms = session.sitting === 'evening' ? (line.eveningForms ?? []) : [];

    /*
      A row the publisher split across a page break joins the row above it.
      Shown separately, Sūrat an-Nās reads as a verse followed by a second
      quotation, and a reader is asked to say half a verse.
    */
    if (note?.continues && steps.length > 0) {
      const previous = steps[steps.length - 1];
      previous.arabic = `${previous.arabic} ${line.arabic}`.trim();
      previous.english = [previous.english, line.english].filter(Boolean).join(' ');
      previous.emphasis = [...(previous.emphasis ?? []), ...(line.emphasis ?? [])];
      continue;
    }

    /*
      ⚠️ The one place the book's own wording is altered — `الصُّبْحِ` to
      `الفَجْرِ`, on Iyad's instruction. Applied here rather than in `hisn.ts`
      so the generated file stays exactly what came over the wire and the
      change is visible in one hand-edited entry.
    */
    const rewritten = (note?.rewrite ?? []).reduce(
      (text, { from, to }) => text.replace(from, to),
      line.arabic,
    );
    const marked = [...(line.emphasis ?? []), ...(note?.emphasis ?? [])];

    const parts = note?.parts ?? [];
    if (parts.length === 0) {
      steps.push({
        key: String(line.id),
        line,
        arabic: rewritten,
        english: line.english,
        emphasis: marked.length > 0 ? marked : undefined,
        repeat: note?.repeat ?? line.repeat ?? 1,
        instruction: note?.recited === false,
        eveningForms,
      });
      continue;
    }

    /*
      A row holding several dhikr becomes one step each. The parts name their
      own text — see `parts` in `annotations.ts` — so nothing here has to guess
      where one ends, and the counts printed between them never reach a screen.
    */
    parts.forEach((part, position) => {
      steps.push({
        key: `${line.id}-${position}`,
        line,
        arabic: part.arabic,
        english: part.english,
        emphasis: line.emphasis?.filter(
          (span) => part.arabic.includes(span) || part.english.includes(span),
        ),
        repeat: part.repeat ?? 1,
        instruction: false,
        eveningForms: position === parts.length - 1 ? eveningForms : [],
      });
    });
  }

  return steps;
}

/**
 * The lines a session actually reads.
 *
 * A line the book marks for the other sitting is dropped; everything else is
 * kept, because the book marking neither means both.
 */
export function linesFor(session: AdhkarSession): readonly HisnLine[] {
  const occasion = occasionFor(session);
  if (!occasion) return [];
  if (!session.sitting) return occasion.lines.filter((line) => !annotationFor(line.id)?.omit);
  return occasion.lines.filter((line) => {
    const note = annotationFor(line.id);
    if (note?.omit) return false;
    return note?.time === undefined || note.time === session.sitting;
  });
}

/** The session to lead with in a given window, if any. */
export function sessionForWindow(window: AdhkarWindow | null): AdhkarSession | undefined {
  if (!window) return undefined;
  return ADHKAR_SESSIONS.find((session) => session.windows.includes(window));
}

export function sessionById(id: string): AdhkarSession | undefined {
  return ADHKAR_SESSIONS.find((session) => session.id === id);
}

/** The book's occasion a session reads, or undefined if the book has moved. */
export function occasionFor(session: AdhkarSession): HisnOccasion | undefined {
  return HISN.find((entry) => entry.id === session.occasion);
}
