/**
 * Which file a given ayah actually plays from.
 *
 * ## Why this is its own module
 *
 * It has to import `../audio`, and `../audio` is a wall of `require('…mp3')`.
 * Metro is fine with that; node is not, and `scripts/i18n-manifest.mjs` loads
 * `recitation.ts` to collect the reciter blurbs. Putting this function beside
 * them took the whole manifest down with a `require is not defined in ES module
 * scope`. So the reciter list stays script-readable and the asset lookup lives
 * here, where only the app reaches it.
 */

import { getAudio } from '../audio';

import { ayahAudioUrl, type Reciter } from './recitation';

/**
 * What to actually play: the bundled file where there is one, the stream
 * otherwise.
 *
 * A required asset is a module number in React Native; a stream is a `uri`.
 * The player takes either, so this is the one place that has to know which.
 *
 * ## Why Al-Fatiha alone gets this
 *
 * Because Al-Fatiha alone is not really a learning surface. Every other surah
 * on this tab is something a reader is choosing to memorise; Al-Fatiha is
 * recited in every rak'ah of every prayer, and somebody who cannot get through
 * it cannot pray at all. That puts it on the worship path, and the worship path
 * survives a dead signal — so its seven clips already ship in the binary for
 * the prayer screen and there is no reason for this tab to go to the network
 * for the same audio.
 *
 * It only holds for the teaching recitation, because that is the only one
 * bundled. Choosing another voice moves Al-Fatiha onto the network like
 * everything else — a real consequence of the picker, and the honest place to
 * spend it: the default works offline, and a reader who has gone looking for a
 * different reciter has already told you they have a connection.
 */
export type AyahSource = number | { uri: string };

export function ayahSource(reciter: Reciter, surah: number, ayah: number): AyahSource {
  if (surah === 1 && reciter.id === 'husary-muallim') {
    // Ayah 1 is the basmala, which is how the clips are cut. The generator
    // asserts that numbering rather than trusting it — see `fatiha.ts`.
    const bundled = getAudio(`fatiha-${ayah}`);
    if (bundled !== undefined) return bundled;
  }
  return { uri: ayahAudioUrl(reciter, surah, ayah) };
}
