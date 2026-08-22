import { getAudio } from './audio';
import { creditLine, getAudioSource } from './audio-sources';
import { Recitations } from './recitations';
import type { Recitation } from './types';
import { surahForRecitation } from './quran/surahs';

/** One thing with a play button: a whole recitation, or one ayah of one. */
export type PracticeClip = {
  audioId: string;
  /** What the card renders. */
  display: Recitation;
  /**
   * Which piece of a split text this is, 1-based. Absent where the whole text
   * is one clip. A number rather than "Ayah 3" because the word is translated
   * and this file has no locale.
   */
  part?: number;
};

export type PracticeItem = {
  key: string;
  title: string;
  clips: PracticeClip[];
};

/**
 * Everything that can currently be practised, derived from what has audio.
 *
 * The practice screen names no recitation of its own. Dropping a file into
 * `assets/audio/` and uncommenting its line in `audio.ts` is the entire job of
 * adding one — it appears here, and on the screen, with no other change. A
 * recitation with no recording simply isn't listed, which is why the app can
 * ship with Al-Fatiha alone and grow without a release.
 */
export function getPracticeItems(): PracticeItem[] {
  const items: PracticeItem[] = [];

  // `Recitations` is declared with `satisfies`, which keeps each entry's literal
  // type — so the union from Object.entries has no shared `audioId`. The values
  // are all Recitations; saying so is what the cast is for.
  const entries = Object.entries(Recitations) as [string, Recitation][];

  for (const [key, recitation] of entries) {
    const clips: PracticeClip[] = [];

    if (recitation.verses) {
      // Index off the full list so labels stay true to the text even when only
      // some ayat have been recorded.
      recitation.verses.forEach((verse, index) => {
        if (getAudio(verse.audioId)) {
          clips.push({ audioId: verse.audioId, display: verse, part: index + 1 });
        }
      });
    } else if (recitation.audioId && getAudio(recitation.audioId)) {
      clips.push({ audioId: recitation.audioId, display: recitation });
    }

    if (clips.length > 0) {
      items.push({ key, title: recitation.title ?? key, clips });
    }
  }

  return items;
}

/**
 * The credits owed by a given set of items, one line per distinct source.
 *
 * Derived rather than written down, so removing the last clip from a source
 * also removes its credit, and adding one cannot forget it.
 */
export function getPracticeCredits(items: PracticeItem[]): string[] {
  const seen = new Set<string>();
  const lines: string[] = [];

  for (const item of items) {
    for (const clip of item.clips) {
      const source = getAudioSource(clip.audioId);
      if (!source) continue;
      const line = creditLine(source);
      if (!seen.has(line)) {
        seen.add(line);
        lines.push(line);
      }
    }
  }

  return lines;
}

/**
 * The practice key for a recitation, or undefined if it cannot be practised.
 *
 * Matched on the Arabic, which is the one field that is never translated,
 * never rewritten, and identical wherever the same text appears — see
 * `localiseRecitation`, which spreads it through untouched. Identity would be
 * wrong: a localised recitation is a new object, so a step's copy is never the
 * same reference as the one in `Recitations`.
 *
 * This exists so the practice screen can be reached from the words themselves.
 * It used to be reachable only from the Learn tab, from Today's footer row and
 * from a help topic — so someone learning Al-Fatiha stood on a mat, on the step
 * that recites it, three taps from the screen built to teach it.
 */
export function practiceKeyFor(recitation: Recitation): string | undefined {
  return getPracticeItems().find((item) => {
    const source = (Recitations as Record<string, Recitation>)[item.key];
    return source?.arabic === recitation.arabic;
  })?.key;
}

/** How many clips can be played right now — the count shown on the Learn card. */
export function getPracticeClipCount(): number {
  return getPracticeItems().reduce((total, item) => total + item.clips.length, 0);
}


/**
 * Whether the practice screen still has anything the Qur'an tab does not.
 *
 * ## Why this gate exists
 *
 * This screen is "practise the words of the prayer" — the takbir, the opening
 * duʿa, the tashahhud, the salawat. That is a real job and nothing else does
 * it. But twenty of its twenty-seven clips are uncommissioned, so the only
 * thing actually on it is Al-Fatiha, which now lives in the Qur'an tab as a
 * surah that plays gaplessly, plays any single ayah, covers a line to test
 * you, works offline and offers eight reciters.
 *
 * For Al-Fatiha the surah screen is a strict superset — there is not one thing
 * the practice screen does better. So promoting both from the Learn tab and
 * from Today puts a beginner in front of two doors to the same seven ayahs,
 * one of which is worse, and means the same person meets Al-Fatiha in two
 * different treatments depending on which they took. That is the harm; the
 * duplication on its own would be tolerable.
 *
 * So the entries hide themselves while that is true, and come back on their
 * own the day a clip lands that is not a surah. No list to maintain, and
 * nothing to remember.
 *
 * ⚠️ This is not a short hold. Those twenty clips need a reciter commissioned
 * — see `docs/audio-recording-brief.md` — so until that happens this is a
 * removal in everything but name, and `practice.tsx` is code nobody exercises.
 * That is the honest cost, and it is the right trade: a screen that reappears
 * when it has something to say beats a duplicate that is reachable two ways.
 */
export function hasPracticeBeyondSurahs(): boolean {
  return getPracticeItems().some((item) => surahForRecitation(item.key) === undefined);
}
