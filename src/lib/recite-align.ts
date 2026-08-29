/**
 * Follows a recitation through a known text. The listening half of
 * "Recite with me" — see docs/recite-with-me.md.
 *
 * Given the words of a text the app already owns and a stream of tokens from
 * on-device speech recognition, this answers one question: which word is the
 * reader on? It is a follower, never a judge: there is no score, no error, no
 * notion of "wrong" anywhere in this module's vocabulary, because the screen
 * built on it is forbidden all three. When the tokens stop matching, the
 * alignment goes `held` — the consumer shows stillness and says nothing.
 *
 * ## How to drive it
 *
 * `align` is one-shot and pure: hand it the reference and the FULL transcript
 * accumulated so far, every time the recogniser emits anything. Streaming
 * recognisers revise their partial output, so incremental feeding would have
 * to model revision; re-running from the top makes revision free, and over a
 * few dozen words it costs nothing.
 *
 * ## Where the rules come from
 *
 * Every rule here was forced by a measured failure in the Phase 0 spike
 * (29 Aug 2026, `docs/recite-with-me.md`):
 *
 * - **Normalisation diverges from `scripts/content-verify.mjs`'s skeleton in
 *   two ways, deliberately.** The dagger alef (U+0670) is dropped, not
 *   promoted — ASR writes الرحمن, the app writes الرحمٰن, and promotion
 *   manufactured a mismatch on exactly those words (Husary baseline fell to
 *   27/29). And رحمان folds to رحمن, because the model also produces the
 *   full-alef spelling. content-verify compares two WRITTEN texts and its
 *   choices are right for that job; this compares writing against speech.
 * - **A token may match a few words ahead** (`LOOKAHEAD`), with the words
 *   between passed over, never judged — liaison and boundary errors swallow
 *   words (rabi-l-ʿālamīn arrived as one token and froze a lookahead-1
 *   pointer at 6/29 on a transcript that was ~85% right).
 * - **Matching tolerates ال and و moving across a token boundary** — the
 *   article and the conjunction genuinely attach in connected speech
 *   (وَالصِّرَاطَ for الصِّرَاطَ).
 * - **Until the first word locks, the whole text is open.** A reader may
 *   begin at any word — the first real recording started at الحمد and scored
 *   0/29 against a narrow window anchored on بسم, and practice loops a
 *   single ayah, which begins nowhere near word one. After lock, the window
 *   narrows to `LOOKAHEAD`, and widens to `ACQUIRE` after a run of misses so
 *   a garbled patch cannot freeze the pointer two words from a recoverable
 *   continuation.
 *
 * The transcript fed in here is model output. It is never religious content
 * and is never rendered — the only Arabic a reader sees is the app's own
 * reviewed text, which is also where `buildReference`'s words come from.
 */

export type ReferenceWord = {
  /** The word exactly as the app's reviewed text writes it. */
  word: string;
  /** Its normalised matching key. */
  key: string;
  /** 1-based verse number within the recitation. */
  verse: number;
  /** 1-based word position within that verse. */
  index: number;
};

export type Alignment = {
  /**
   * Index into the reference of the next expected word. Everything before it
   * has been heard or passed over; the consumer highlights up to here.
   */
  position: number;
  /** How many transcript tokens landed on a reference word. */
  advanced: number;
  /** Reference indices passed over by a lookahead match — never judged. */
  passedOver: readonly number[];
  /**
   * True while the tokens have stopped matching. The consumer's whole
   * contract: show stillness. No message, no colour, no count.
   */
  held: boolean;
  /** True once the final word is behind the pointer. */
  complete: boolean;
};

/** Words a token may match ahead of the pointer once tracking is locked. */
const LOOKAHEAD = 4;
/** The wider window used after a run of misses. Before the first lock there
    is no window at all — the whole text is open to acquisition. */
const ACQUIRE = 8;
/** Consecutive unmatched tokens before the alignment reports `held`. */
const HELD_AFTER = 2;
/** Consecutive unmatched tokens before the window widens to re-acquire. */
const WIDEN_AFTER = 3;

/**
 * A text reduced to what speech can be expected to reproduce. See the header
 * for the two deliberate divergences from content-verify's skeleton.
 */
export function normalise(text: string): string {
  return (
    text
      .normalize('NFC')
      .replace(/[ٱٲٳٵ]/g, 'ا')
      // The mark strip swallows the dagger alef (U+0670) — dropped, not
      // promoted, which is divergence one.
      .replace(/[ً-ٰٟۖ-ۭـ]/g, '')
      .replace(/[آأإ]/g, 'ا')
      .replace(/ى/g, 'ي')
      .replace(/ة/g, 'ه')
      .replace(/[^ء-ي]/g, '')
      // Divergence two: the model writes رحمان where the app writes الرحمٰن.
      .replace(/رحمان/g, 'رحمن')
  );
}

/** Split a transcript into matching keys, dropping anything with no letters. */
export function tokenise(transcript: string): string[] {
  return transcript
    .split(/\s+/)
    .map(normalise)
    .filter((key) => key.length > 0);
}

/** The reference word list for a recitation held as verses. */
export function buildReference(verses: readonly { arabic: string }[]): ReferenceWord[] {
  return verses.flatMap((verseText, v) =>
    verseText.arabic
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word, w) => ({ word, key: normalise(word), verse: v + 1, index: w + 1 })),
  );
}

/** ال may sit on either side of a boundary error; و genuinely attaches. */
function matches(token: string, ref: string): boolean {
  if (token === ref || `ال${token}` === ref || token === `ال${ref}`) return true;
  if (token.startsWith('و') && token.length > 2) {
    const rest = token.slice(1);
    return rest === ref || `ال${rest}` === ref || rest === `ال${ref}`;
  }
  return false;
}

/** One pass of the follower over a full transcript. Pure; re-run per event. */
export function align(reference: readonly ReferenceWord[], transcript: string): Alignment {
  const tokens = tokenise(transcript);
  const passedOver: number[] = [];
  let position = 0;
  let advanced = 0;
  let missesHere = 0;

  for (const token of tokens) {
    if (position >= reference.length) break;
    const window =
      advanced === 0
        ? reference.length
        : missesHere >= WIDEN_AFTER
          ? ACQUIRE
          : LOOKAHEAD;
    const limit = Math.min(window, reference.length - position);
    let hit = -1;
    for (let k = 0; k < limit; k += 1) {
      if (matches(token, reference[position + k].key)) {
        hit = k;
        break;
      }
    }
    if (hit >= 0) {
      for (let k = 0; k < hit; k += 1) passedOver.push(position + k);
      position += hit + 1;
      advanced += 1;
      missesHere = 0;
    } else {
      missesHere += 1;
    }
  }

  return {
    position,
    advanced,
    passedOver,
    held: missesHere >= HELD_AFTER,
    complete: position >= reference.length,
  };
}
