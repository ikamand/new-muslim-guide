/**
 * Where an audio id becomes an actual bundled file.
 *
 * Metro resolves `require` at build time, so the paths have to be written out
 * literally and cannot be built from a variable. That is the whole reason this
 * file exists: content stays as data with a string id, and every filesystem
 * path lives in exactly one place.
 *
 * PARTIALLY FILLED. Al-Fatiha is in; the twelve adhkar are not yet recorded
 * and stay commented out. `getAudio` returns undefined for those, and callers
 * must hide the control rather than show one that does nothing. Do not add a
 * `require` for a file that is not in the repo — a missing asset fails the
 * whole bundle, not just the screen.
 *
 * ## Where Al-Fatiha came from
 *
 * everyayah.com, recited by Mahmoud Khalil Al-Husary in his *muʿallim*
 * (teaching) recitation — recorded to be copied by learners, which is exactly
 * what this app needs. Licensed CC BY-NC: attribution is required and the app
 * may never be sold or carry advertising. That is a permanent constraint the
 * moment these files ship. The credit is rendered at the foot of the practice
 * screen — beside the audio rather than buried in Settings. Do not remove it
 * while these files are bundled.
 *
 * ⚠️ REVIEW REQUIRED — nobody qualified has yet listened to these seven files.
 * Three things need an ear, not a script: that `fatiha-3` really is the third
 * ayah and not the first repeated, that the recitation is complete rather than
 * clipped at either end, and that the tajwid is sound enough to copy, since
 * these are chosen for a learner to imitate. The content audit can confirm the
 * file exists and that its id is wired to the right verse record; it cannot
 * confirm what is on the recording, and no pass of it ever will.
 *
 * The recording brief in `docs/audio-recording-brief.md` covers the twelve
 * clips still to be recorded.
 */

/** A required asset is a module number in React Native, not a path. */
type AudioModule = number;

export const AUDIO: Partial<Record<string, AudioModule>> = {
  'fatiha-1': require('@/assets/audio/fatiha-1.mp3'),
  'fatiha-2': require('@/assets/audio/fatiha-2.mp3'),
  'fatiha-3': require('@/assets/audio/fatiha-3.mp3'),
  'fatiha-4': require('@/assets/audio/fatiha-4.mp3'),
  'fatiha-5': require('@/assets/audio/fatiha-5.mp3'),
  'fatiha-6': require('@/assets/audio/fatiha-6.mp3'),
  'fatiha-7': require('@/assets/audio/fatiha-7.mp3'),
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
