import { getAudio } from './audio';
import { Recitations } from './recitations';
import type { Recitation } from './types';

/** One thing with a play button: a whole recitation, or one ayah of one. */
export type PracticeClip = {
  audioId: string;
  /** What the card renders. */
  display: Recitation;
  /** "Ayah 3", where a text is split. Absent where the whole text is one clip. */
  label?: string;
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
          clips.push({ audioId: verse.audioId, display: verse, label: `Ayah ${index + 1}` });
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

/** How many clips can be played right now — the count shown on the Learn card. */
export function getPracticeClipCount(): number {
  return getPracticeItems().reduce((total, item) => total + item.clips.length, 0);
}
