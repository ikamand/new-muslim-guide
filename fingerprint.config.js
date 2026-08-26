/**
 * What counts as a native change, and what does not.
 *
 * ## The bug this fixes
 *
 * `runtimeVersion` uses the `fingerprint` policy, so a build only accepts
 * updates whose fingerprint matches it. The fingerprint hashes the whole
 * `scripts` section of `package.json` — which means **adding a build-time
 * helper invalidates every phone already carrying the app**.
 *
 * That happened twice in two days here. `npm run hisn` on 25 Aug and
 * `npm run style:check` on 26 Aug each moved the fingerprint, and the second
 * one silently orphaned a preview build made four hours earlier: the update
 * published, the channel was wired correctly, and no device could take it. It
 * cost a rebuild and an evening.
 *
 * ## Why skipping it is right rather than convenient
 *
 * The fingerprint exists to stop a binary being handed JavaScript that calls a
 * native module it does not contain. Nothing in `scripts` runs on a phone.
 * `arabic`, `hisn`, `evidence`, `style:check` and the manifest generators are
 * all developer tools that touch the app's data at build time and are absent
 * from the bundle entirely.
 *
 * Native config still counts, and must: `app.json`, the plugin list,
 * `eas.json`, the icons, and every dependency's autolinking are all still
 * hashed. Adding `expo-file-system` still correctly requires a new build.
 */

/** @type {import('@expo/fingerprint').Config} */
module.exports = {
  sourceSkips: ['PackageJsonScriptsAll'],
};
