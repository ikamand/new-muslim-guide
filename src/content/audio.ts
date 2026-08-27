/**
 * Where an audio id becomes an actual bundled file.
 *
 * Metro resolves `require` at build time, so the paths have to be written out
 * literally and cannot be built from a variable. That is the whole reason this
 * file exists: content stays as data with a string id, and every filesystem
 * path lives in exactly one place.
 *
 * PARTIALLY FILLED. Al-Fatiha and the three quls are in — 22 clips. Twenty
 * are not yet recorded and stay commented out: the twelve said in prayer and
 * wudu, which have steps waiting for them and are briefed in
 * `docs/audio-recording-brief.md`, and eight everyday adhkar that no screen
 * plays yet. `getAudio` returns undefined for those, and callers
 * must hide the control rather than show one that does nothing. Do not add a
 * `require` for a file that is not in the repo — a missing asset fails the
 * whole bundle, not just the screen.
 *
 * ## Where Al-Fatiha came from
 *
 * everyayah.com, recited by Mahmoud Khalil Al-Husary in his *muʿallim*
 * (teaching) recitation — recorded to be copied by learners, which is exactly
 * what this app needs.
 *
 * ⚠️ Believed CC BY-NC, but everyayah.com publishes no terms of use anywhere —
 * checked its front page and its recitations index. Treat the constraint as
 * real anyway: credit the reciter, never sell the app, never carry
 * advertising. The credit is rendered at the foot of every screen these play
 * on. Do not remove it while these files are bundled. `audio-sources.ts`
 * carries the full note.
 *
 * These same seven clips are what makes Al-Fatiha play with the radio off in
 * the Qur'an tab — see `ayahSource` in `content/quran/ayah-audio.ts`. Nothing
 * is stored twice.
 *
 * ## And the three quls, added 25 Aug 2026
 *
 * Al-Ikhlas, Al-Falaq and An-Nas — 15 clips, 1.8 MB, the same Husary Muallim
 * recording from the same host.
 *
 * Not a starter set chosen by length. These four surahs are what somebody
 * actually recites: Al-Fatiha in every rakʿah, Al-Ikhlas at the prayer's
 * "add a short surah" step, and the three quls in the morning and evening
 * adhkar and after every prayer. Bundling them is what makes the WORSHIP PATH
 * work with the radio off, which is the promise that matters. Every other
 * surah in the tab is a learning surface, and a learning surface may stream.
 *
 * This is deliberately not "bundle Juz 30". That was the plan until 25 Aug and
 * it was wrong: 76 MB shipped to everybody so that a few people could hear
 * An-Naba. The rest saves itself on first play — see Phase 8 in
 * `docs/ui-redesign-plan.md`.
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

  'ikhlas-1': require('@/assets/audio/ikhlas-1.mp3'),
  'ikhlas-2': require('@/assets/audio/ikhlas-2.mp3'),
  'ikhlas-3': require('@/assets/audio/ikhlas-3.mp3'),
  'ikhlas-4': require('@/assets/audio/ikhlas-4.mp3'),

  'falaq-1': require('@/assets/audio/falaq-1.mp3'),
  'falaq-2': require('@/assets/audio/falaq-2.mp3'),
  'falaq-3': require('@/assets/audio/falaq-3.mp3'),
  'falaq-4': require('@/assets/audio/falaq-4.mp3'),
  'falaq-5': require('@/assets/audio/falaq-5.mp3'),

  'nas-1': require('@/assets/audio/nas-1.mp3'),
  'nas-2': require('@/assets/audio/nas-2.mp3'),
  'nas-3': require('@/assets/audio/nas-3.mp3'),
  'nas-4': require('@/assets/audio/nas-4.mp3'),
  'nas-5': require('@/assets/audio/nas-5.mp3'),
  'nas-6': require('@/assets/audio/nas-6.mp3'),
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
