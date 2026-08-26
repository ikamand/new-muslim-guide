/**
 * Ayah audio that saves itself the first time it plays.
 *
 * ## Why there is no download button
 *
 * A button beside repeat and next would ask somebody to predict whether they
 * will want surah 93 offline **later**, which is not knowable now — and it
 * would put an un-pressed icon on 37 rows, which reads as 37 chores rather
 * than a library. CLAUDE.md's rule applies exactly: prefer what the app can
 * infer over what the user must configure.
 *
 * So playing is the download. Tap play, it streams and writes to disk, and the
 * second listen is local. The surahs somebody actually uses are the ones that
 * end up on their phone, and no decision was handed to anyone.
 *
 * ## Why this is not the 76 MB bundle it replaced
 *
 * The plan was to ship all 564 ayahs of Juz 30 in one voice. That is An-Naba's
 * forty ayahs shipped to everybody who will never open it, paid for in
 * download size, mobile data and storage. Iyad killed it, and he was right.
 *
 * Al-Fatiha and the three quls stay bundled — under 2 MB, and they are what is
 * actually recited — so the worship path never touches the network. Everything
 * else is a learning surface, and a learning surface may stream once.
 *
 * ## Where the files go, and why not the cache
 *
 * `Paths.document`, not `Paths.cache`. The system deletes the cache when
 * storage runs low, and a surah that silently disappears the week before a
 * flight is worse than one that was never saved. Files this app saves are
 * deleted when somebody says so, from the storage screen in Settings, and not
 * before.
 */

import { Directory, File, Paths } from 'expo-file-system';

import { ayahAudioUrl, type Reciter } from './recitation';

const ROOT = 'quran-audio';

/** One directory per reciter, so deleting a voice is deleting a folder. */
function folderFor(reciter: Reciter): Directory {
  return new Directory(Paths.document, ROOT, reciter.folder);
}

function fileFor(reciter: Reciter, surah: number, ayah: number): File {
  const name = `${String(surah).padStart(3, '0')}${String(ayah).padStart(3, '0')}.mp3`;
  return new File(folderFor(reciter), name);
}

/** The local file for an ayah, if it has already been saved. */
export function savedAyah(reciter: Reciter, surah: number, ayah: number): string | undefined {
  try {
    const file = fileFor(reciter, surah, ayah);
    return file.exists ? file.uri : undefined;
  } catch {
    /*
      Storage can fail for reasons that are not this app's business — a
      restricted profile, a full disk, a platform that has no filesystem at all
      (web). Every one of them means the same thing here: play from the
      network. Saving is an optimisation and must never be able to stop
      playback.
    */
    return undefined;
  }
}

/**
 * Save an ayah for next time, quietly.
 *
 * Called after playback starts, never before it — the reader is already
 * hearing the ayah by the time this runs, so a slow or failed save costs them
 * nothing. Returns whether it landed, for the storage screen's benefit; every
 * caller is free to ignore it.
 */
export async function saveAyah(
  reciter: Reciter,
  surah: number,
  ayah: number,
): Promise<boolean> {
  try {
    const file = fileFor(reciter, surah, ayah);
    if (file.exists) return true;

    const folder = folderFor(reciter);
    if (!folder.exists) folder.create({ intermediates: true });

    await File.downloadFileAsync(ayahAudioUrl(reciter, surah, ayah), file);
    return file.exists;
  } catch {
    return false;
  }
}

export type SavedVoice = {
  folder: string;
  files: number;
  bytes: number;
};

/**
 * What is on the device, per voice.
 *
 * The storage screen is not optional, and this is why it can exist. Saving
 * automatically with no way to see or clear it fills somebody's phone
 * invisibly — which is a worse experience than the download button this
 * design refused.
 */
export function savedVoices(): SavedVoice[] {
  try {
    const root = new Directory(Paths.document, ROOT);
    if (!root.exists) return [];

    return root
      .list()
      .filter((entry): entry is Directory => entry instanceof Directory)
      .map((folder) => {
        const files = folder.list().filter((entry): entry is File => entry instanceof File);
        return {
          folder: folder.name,
          files: files.length,
          bytes: files.reduce((total, file) => total + (file.size ?? 0), 0),
        };
      })
      .filter((voice) => voice.files > 0);
  } catch {
    return [];
  }
}

/** Delete everything saved for one voice. Reversible by playing it again. */
export function deleteVoice(folder: string): void {
  try {
    const directory = new Directory(Paths.document, ROOT, folder);
    if (directory.exists) directory.delete();
  } catch {
    /* Nothing to report: the screen re-reads the list either way. */
  }
}
