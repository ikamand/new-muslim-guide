// Launcher for the Expo web dev server.
//
// The preview harness starts child processes in a directory the sandbox will
// not let them read, so anything that calls getcwd() at startup — sh, npm,
// npx — dies before it runs. Node does not read cwd until something asks, so
// this file can chdir first and then spawn Expo with a valid one.
import { chdir } from 'node:process';
import { spawn } from 'node:child_process';

const ROOT = '/Users/iMac/Documents/new-muslim-guide';
chdir(ROOT);

const child = spawn(
  process.execPath,
  [`${ROOT}/node_modules/expo/bin/cli`, 'start', '--web', '--port', '8081'],
  { cwd: ROOT, stdio: 'inherit', env: { ...process.env, PWD: ROOT, BROWSER: 'none' } },
);

child.on('exit', (code) => process.exit(code ?? 0));
