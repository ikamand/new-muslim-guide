/**
 * Where an audio id becomes an actual bundled file.
 *
 * Metro resolves `require` at build time, so the paths have to be written out
 * literally and cannot be built from a variable. That is the whole reason this
 * file exists: content stays as data with a string id, and every filesystem
 * path lives in exactly one place.
 *
 * ⚠️ EMPTY ON PURPOSE. No recitation has been recorded yet. Entries are
 * uncommented as clips arrive, so the app ships with audio for some texts and
 * not others without anything breaking — `getAudio` returns undefined and the
 * caller hides the control. Do not add a `require` for a file that is not in
 * the repo; a missing asset fails the bundle, not just the screen.
 *
 * The recording brief in `docs/audio-recording-brief.md` lists every id below
 * and the exact text each one has to contain.
 */

/** A required asset is a module number in React Native, not a path. */
type AudioModule = number;

export const AUDIO: Partial<Record<string, AudioModule>> = {
  // 'fatiha-1': require('@/assets/audio/fatiha-1.m4a'),
  // 'fatiha-2': require('@/assets/audio/fatiha-2.m4a'),
  // 'fatiha-3': require('@/assets/audio/fatiha-3.m4a'),
  // 'fatiha-4': require('@/assets/audio/fatiha-4.m4a'),
  // 'fatiha-5': require('@/assets/audio/fatiha-5.m4a'),
  // 'fatiha-6': require('@/assets/audio/fatiha-6.m4a'),
  // 'fatiha-7': require('@/assets/audio/fatiha-7.m4a'),
  // takbir: require('@/assets/audio/takbir.m4a'),
  // opening: require('@/assets/audio/opening.m4a'),
  // taawwudh: require('@/assets/audio/taawwudh.m4a'),
  // 'ruku-tasbih': require('@/assets/audio/ruku-tasbih.m4a'),
  // rising: require('@/assets/audio/rising.m4a'),
  // 'sujud-tasbih': require('@/assets/audio/sujud-tasbih.m4a'),
  // 'between-prostrations': require('@/assets/audio/between-prostrations.m4a'),
  // tashahhud: require('@/assets/audio/tashahhud.m4a'),
  // salawat: require('@/assets/audio/salawat.m4a'),
  // taslim: require('@/assets/audio/taslim.m4a'),
  // 'shahada-after-wudu': require('@/assets/audio/shahada-after-wudu.m4a'),
  // bismillah: require('@/assets/audio/bismillah.m4a'),
};

/**
 * The clip for an id, or undefined if it has not been recorded.
 *
 * Callers must treat undefined as "no audio yet" and hide the control rather
 * than showing one that does nothing. Until a reciter has been commissioned
 * this returns undefined for everything.
 */
export function getAudio(audioId: string | undefined): AudioModule | undefined {
  return audioId ? AUDIO[audioId] : undefined;
}

/** True while nothing has been recorded — lets a screen skip its audio UI entirely. */
export function hasAnyAudio(): boolean {
  return Object.keys(AUDIO).length > 0;
}
