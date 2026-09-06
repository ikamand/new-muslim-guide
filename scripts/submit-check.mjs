/**
 * Asserts the one outbound request behaves as the disclosure promises.
 *
 * Run: `npm run submit:check`
 *
 * No network. A fake fetch plays each outcome — a 204, a 429, a thrown
 * network error, a hang — and the checks are the sentences on the card:
 * `sent` only on 204, `failed` for everything else and never a throw, the
 * hang aborted inside the cap, and the body carrying exactly the three fields
 * the reader was told about.
 */
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { submitGap, SUBMISSIONS_URL } = await import(join(root, 'src/lib/submit-gap.ts'));

let failed = 0;
const check = (ok, label) => {
  console.log(`  ${ok ? '✓' : '✗'} ${label}`);
  if (!ok) failed += 1;
};

const body = { text: 'how do i pray without my parents noticing', locale: 'en', appVersion: '1.0.0' };

/* 204 → sent, and the request is what the disclosure says it is. */
{
  let seen;
  const fetch = async (url, init) => {
    seen = { url, init };
    return { status: 204 };
  };
  const result = await submitGap(body, { fetch });
  check(result === 'sent', '204 → sent');
  check(seen.url === SUBMISSIONS_URL && seen.init.method === 'POST', 'POST to the contract URL');
  const sent = JSON.parse(seen.init.body);
  check(
    JSON.stringify(Object.keys(sent).sort()) === JSON.stringify(['appVersion', 'locale', 'text']),
    'body carries exactly text, locale, appVersion',
  );
  check(sent.text === body.text, 'text is sent untouched');
}

/* Anything but 204 → failed. */
check((await submitGap(body, { fetch: async () => ({ status: 429 }) })) === 'failed', '429 → failed');
check((await submitGap(body, { fetch: async () => ({ status: 500 }) })) === 'failed', '500 → failed');

/* A thrown network error → failed, never a throw. */
{
  const fetch = async () => {
    throw new TypeError('Network request failed');
  };
  let threw = false;
  let result;
  try {
    result = await submitGap(body, { fetch });
  } catch {
    threw = true;
  }
  check(!threw && result === 'failed', 'network error → failed, not thrown');
}

/* A hang → aborted inside the cap → failed. */
{
  let aborted = false;
  const fetch = (_url, init) =>
    new Promise((_resolve, reject) => {
      init.signal.addEventListener('abort', () => {
        aborted = true;
        reject(new Error('aborted'));
      });
    });
  const started = Date.now();
  const result = await submitGap(body, { fetch, timeoutMs: 50 });
  const took = Date.now() - started;
  check(result === 'failed' && aborted, 'hang → aborted → failed');
  check(took < 500, `abort fired inside the cap (${took} ms)`);
}

if (failed > 0) {
  console.error(`\n${failed} check(s) failed.`);
  process.exit(1);
}
console.log('\nsubmitGap behaves as the disclosure promises.');
