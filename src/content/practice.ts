import { getAudio } from './audio';
import { creditLine, getAudioSource } from './audio-sources';
import { Recitations } from './recitations';
import type { Recitation } from './types';

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

/** How many clips can be played right now — the count shown on the Learn card. */
export function getPracticeClipCount(): number {
  return getPracticeItems().reduce((total, item) => total + item.clips.length, 0);
}
