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

/* ------------------------------------------------------------------ *
 * The classroom variant — Phase 6 of docs/recite-with-me.md.
 *
 * Same instrument, opposite posture: the follow mode trails a reader and
 * forgives everything; the classroom leads one ayah at a time and is strict
 * about the reader while staying tolerant of the microphone. Every rule
 * below is scoped by the pairs spike of 2 Sep 2026:
 *
 * - **Endings are judged, letters are not.** The spike measured wrong short
 *   vowel endings surviving into the transcript 5/6 (اللَّهَ for اللَّهُ came
 *   back written as said), while imitated letter swaps (flat h, dropped
 *   ʿayn, س for ص) were silently corrected 0/3 — so an ending can concede a
 *   word and a letter never can, because the ear cannot testify to it.
 * - **A bare ending always passes.** The one vowel miss was the bare اللَّهْ
 *   restored to اللَّهُ — a dropped ending is invisible, and bare is also the
 *   legitimate waqf form. Only a *present, different* vowel concedes.
 * - **The stray-suffix artifact is noise, not an error.** The control take
 *   إِيَّاكَ نَعْبُدُ came back نَعْبُدُهُ — a lone short phrase can grow a trailing
 *   ه, so a token that is the expected word plus ه confirms (its ending is
 *   then unknowable and goes unjudged).
 * - **Lookahead is exactly one, and it concedes.** In follow mode a skipped
 *   word is passed over silently; here the reader moving on to the next
 *   word turns the held word `conceded` — red on the screen. Anything the
 *   selector cannot reach in one step is ignored noise and the selector
 *   waits, because Phase 0 measured splits/merges as the dominant noise on
 *   CORRECT recitation and a wider concession would convert microphone
 *   artifacts into accusations.
 * - **A wrong ending is instantly redeemable.** Readers re-say a slipped
 *   word without prompting; if the next token is the same word said right,
 *   the concession upgrades to confirmed.
 *
 * The vocabulary stays the module's: `pending`, `confirmed`, `conceded`.
 * "Wrong" still does not exist here — a conceded word is one the reader
 * moved past, and the score a consumer derives is confirmed ÷ total.
 * ------------------------------------------------------------------ */

export type ClassroomWordState = 'pending' | 'confirmed' | 'conceded';

export type ClassroomAlignment = {
  /** One state per reference word, in order. */
  states: readonly ClassroomWordState[];
  /** The selector: index of the word the reader should say next. */
  position: number;
  /** True once every word is confirmed or conceded. */
  complete: boolean;
};

const TANWEEN_TO_VOWEL: Record<string, string> = { 'ً': 'َ', 'ٌ': 'ُ', 'ٍ': 'ِ' };
/** Marks that ride along without being the ending: shadda, tatweel, dagger
    alef, Qur'anic annotation signs. */
const RIDE_ALONG = /[ّـٰٟۖ-ۭ]/;

/**
 * The final short vowel of a written word or a transcribed token — the one
 * signal the pairs spike proved the ear reports. Tanween folds to its plain
 * vowel; sukun and an unmarked final letter are both '' (bare).
 */
export function finalVowel(text: string): string {
  const t = text.normalize('NFC');
  for (let i = t.length - 1; i >= 0; i -= 1) {
    const ch = t[i];
    if (RIDE_ALONG.test(ch)) continue;
    if (ch in TANWEEN_TO_VOWEL) return TANWEEN_TO_VOWEL[ch];
    if ('َُِ'.includes(ch)) return ch;
    return ''; // sukun or a bare letter — no ending vowel to judge
  }
  return '';
}

type EndedToken = { key: string; ending: string };

function tokeniseWithEndings(transcript: string): EndedToken[] {
  return transcript
    .split(/\s+/)
    .map((raw) => ({ key: normalise(raw), ending: finalVowel(raw) }))
    .filter((token) => token.key.length > 0);
}

/** matches(), plus the measured stray trailing-ه artifact. */
function matchesLoose(token: string, ref: string): boolean {
  return matches(token, ref) || token === `${ref}ه`;
}

/** True when both sides carry an ending vowel and they disagree. A bare side
    never concedes — dropped endings are invisible to the ear, and bare is
    the legitimate stopping form. */
function endingDisagrees(token: EndedToken, ref: ReferenceWord): boolean {
  const refEnd = finalVowel(ref.word);
  return refEnd !== '' && token.ending !== '' && token.ending !== refEnd;
}

/** The shapes one token takes when it spans two reference words: plain
    concatenation, and the second word's article eliding to ل or nothing —
    ربالعالمين is never what liaison produces; ربلعالمين is. */
function mergedForms(a: string, b: string): string[] {
  const bare = b.startsWith('ال') && b.length > 3 ? b.slice(2) : b;
  return [...new Set([a + b, `${a}ل${bare}`, a + bare])];
}

/**
 * One strict pass over one ayah. Pure; re-run per recogniser event, like
 * `align`. `skipped` carries words the reader passed manually — the escape
 * hatch — which the pass treats as conceded the moment the selector reaches
 * them.
 */
export function alignClassroom(
  reference: readonly ReferenceWord[],
  transcript: string,
  skipped: ReadonlySet<number> = new Set(),
): ClassroomAlignment {
  const tokens = tokeniseWithEndings(transcript);
  const states: ClassroomWordState[] = reference.map(() => 'pending');
  let position = 0;
  /** A word conceded for its ending alone, still open to instant redemption. */
  let redeemable = -1;
  /** The first half of a word the recogniser split in two. */
  let carry: string | null = null;

  const settle = () => {
    while (position < reference.length && skipped.has(position)) {
      states[position] = 'conceded';
      position += 1;
    }
  };
  settle();

  for (const token of tokens) {
    if (position >= reference.length) break;

    if (redeemable >= 0) {
      const prev = reference[redeemable];
      if (matches(token.key, prev.key) && !endingDisagrees(token, prev)) {
        states[redeemable] = 'confirmed';
        redeemable = -1;
        continue;
      }
    }

    const target = reference[position];

    if (carry !== null) {
      const whole = carry + token.key;
      carry = null;
      if (matches(whole, target.key)) {
        const wrongEnd = endingDisagrees(token, target);
        states[position] = wrongEnd ? 'conceded' : 'confirmed';
        redeemable = wrongEnd ? position : -1;
        position += 1;
        settle();
        continue;
      }
      // The carry led nowhere; judge this token on its own below.
    }

    if (matchesLoose(token.key, target.key)) {
      // Suffix-matched tokens carry the artifact's vowel, not the word's —
      // their ending goes unjudged.
      const wrongEnd = matches(token.key, target.key) && endingDisagrees(token, target);
      states[position] = wrongEnd ? 'conceded' : 'confirmed';
      redeemable = wrongEnd ? position : -1;
      position += 1;
      settle();
      continue;
    }

    const next = position + 1 < reference.length ? reference[position + 1] : undefined;

    if (next && mergedForms(target.key, next.key).some((form) => token.key === form)) {
      states[position] = 'confirmed';
      const wrongEnd = endingDisagrees(token, next);
      states[position + 1] = wrongEnd ? 'conceded' : 'confirmed';
      redeemable = wrongEnd ? position + 1 : -1;
      position += 2;
      settle();
      continue;
    }

    if (next && matchesLoose(token.key, next.key)) {
      states[position] = 'conceded';
      const wrongEnd = matches(token.key, next.key) && endingDisagrees(token, next);
      states[position + 1] = wrongEnd ? 'conceded' : 'confirmed';
      redeemable = wrongEnd ? position + 1 : -1;
      position += 2;
      settle();
      continue;
    }

    if (token.key.length >= 2 && target.key.startsWith(token.key)) {
      carry = token.key;
      continue;
    }

    // Noise. Judged never; the selector waits for the reader.
  }

  return { states, position, complete: position >= reference.length };
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
