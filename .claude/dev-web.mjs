// Launcher for the Expo web dev server.
//
// The preview harness starts child processes in a directory the sandbox will
// not let them read, so anything that calls getcwd() at startup — sh, npm,
// npx — dies before it runs. Node does not read cwd until something asks, so
// this file can chdir first and then spawn Expo with a valid one.
//
// launch.json reaches this file with `node -e` and the home folder rather
// than a path. A relative path makes node read cwd before this file runs, and
// a full path names one Mac's user. `-e` survives an unreadable cwd; the
// project has to live at ~/Documents/new-muslim-guide on every Mac.
import { chdir } from 'node:process';
import { spawn } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// The project root is the folder above this file's, so the launcher works on
// any Mac and under any user name. Neither call reads cwd.
const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
chdir(ROOT);

const child = spawn(
  process.execPath,
  [`${ROOT}/node_modules/expo/bin/cli`, 'start', '--web', '--port', '8081'],
  { cwd: ROOT, stdio: 'inherit', env: { ...process.env, PWD: ROOT, BROWSER: 'none' } },
);

child.on('exit', (code) => process.exit(code ?? 0));
