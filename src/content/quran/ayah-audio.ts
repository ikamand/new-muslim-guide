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
 * ## Why these four, and not the rest
 *
 * Because they are not really a learning surface. Every other surah on this
 * tab is something a reader is choosing to memorise; these four are recited.
 * Al-Fatiha is in every rak'ah and somebody who cannot get through it cannot
 * pray at all; Al-Ikhlas is what the prayer's "add a short surah" step now
 * teaches; the three quls are the morning and evening adhkar and are said
 * after every prayer. That puts all four on the worship path, and the worship
 * path survives a dead signal — so their clips ship in the binary and there is
 * no reason for this tab to go to the network for the same audio.
 *
 * It only holds for the teaching recitation, because that is the only one
 * bundled. Choosing another voice moves Al-Fatiha onto the network like
 * everything else — a real consequence of the picker, and the honest place to
 * spend it: the default works offline, and a reader who has gone looking for a
 * different reciter has already told you they have a connection.
 */
export type AyahSource = number | { uri: string };

/**
 * The surahs that ship in the binary, and the clip-name prefix for each.
 *
 * Four, and not chosen by length: these are what somebody actually recites.
 * Al-Fatiha is in every rakʿah, Al-Ikhlas is the prayer's "add a short surah"
 * step, and the three quls are the morning and evening adhkar and are said
 * after every prayer. Together they are the worship path, and the worship path
 * works with the radio off.
 *
 * A table rather than a chain of `if`s, because the moment a fifth surah is
 * bundled it should be one line here.
 */
const BUNDLED: Readonly<Record<number, string>> = {
  1: 'fatiha',
  112: 'ikhlas',
  113: 'falaq',
  114: 'nas',
};

export function ayahSource(reciter: Reciter, surah: number, ayah: number): AyahSource {
  const prefix = BUNDLED[surah];
  if (prefix !== undefined && reciter.id === 'husary-muallim') {
    // Al-Fatiha's ayah 1 is the basmala, which is how its clips are cut. The
    // generator asserts that numbering rather than trusting it — see
    // `fatiha.ts`. The quls carry no basmala, so their ayah numbers are the
    // mushaf's.
    const bundled = getAudio(`${prefix}-${ayah}`);
    if (bundled !== undefined) return bundled;
  }
  return { uri: ayahAudioUrl(reciter, surah, ayah) };
}
