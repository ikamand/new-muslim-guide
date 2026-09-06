/**
 * The one request this app makes: "Tell us what you were looking for".
 *
 * Contract: `docs/submissions-contract.md`, frozen at `/v1`. Three fields go,
 * a status code comes back, nothing else. Every outcome but a 204 is `failed`,
 * and `failed` is a value, never a throw, because the card it lands on has one
 * sentence for every kind of failure: "This wasn't sent." One attempt, an
 * eight-second cap, no queue, no retry, and nothing written to storage.
 *
 * The URL is a constant here rather than in `app.json` because `app.json` is
 * a fingerprint input and this rides an OTA. Verified by `npm run submit:check`.
 */

export const SUBMISSIONS_URL =
  'https://new-muslim-guide-submissions.ikamand.workers.dev/v1/submissions';

export const SUBMIT_TIMEOUT_MS = 8000;

export type GapSubmission = { text: string; locale: string; appVersion: string };
export type GapResult = 'sent' | 'failed';

type Deps = { fetch?: typeof fetch; timeoutMs?: number };

export async function submitGap(body: GapSubmission, deps: Deps = {}): Promise<GapResult> {
  const doFetch = deps.fetch ?? globalThis.fetch;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), deps.timeoutMs ?? SUBMIT_TIMEOUT_MS);
  try {
    const response = await doFetch(SUBMISSIONS_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      // Exactly the three fields the disclosure names, and nothing else.
      body: JSON.stringify({ text: body.text, locale: body.locale, appVersion: body.appVersion }),
      signal: controller.signal,
    });
    return response.status === 204 ? 'sent' : 'failed';
  } catch {
    return 'failed';
  } finally {
    clearTimeout(timer);
  }
}
