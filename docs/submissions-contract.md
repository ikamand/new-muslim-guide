# Submissions API contract — v1

Frozen. `/v1` is never changed, only added beside: builds of the app exist
that can never be updated, and every one of them may call this. A change is
`/v2`, and `/v1` stays up while any build that calls it may be installed.

This file is byte-identical in both repositories:
`new-muslim-guide/docs/submissions-contract.md` and
`new-muslim-guide-submissions/CONTRACT.md`.

## Request

```
POST https://<worker-host>/v1/submissions
Content-Type: application/json

{ "text": string, "locale": string, "appVersion": string }
```

- `text`: 1 to 1000 characters after trimming.
- `locale`: 2 to 8 characters (`en`, `fr`, `es`, …).
- `appVersion`: 1 to 16 characters (`1.0.0`).

Nothing else is sent. No identifier, no token, no timestamp.

## Response

Every response has an **empty body**. The status is the whole answer.

| Status | Meaning |
|---|---|
| `204` | Accepted and stored. |
| `400` | Malformed JSON, a missing field, an empty `text`, or a wrong type. |
| `413` | `text` over 1000 characters. |
| `429` | Rate-limited: burst of 2 per 60 seconds per IP at the edge, or the global cap of 500 per UTC day. Only a body that passed validation counts toward the burst. |
| `404` | Any other path. |
| `405` | Any other method on this path. |

The client treats anything but `204` as "not sent", keeps the reader's
words on screen, and never retries on its own.

## Storage

Stored under key `sub/<YYYY-MM-DD>/<uuid>` with an expiry of 14 days
(`expirationTtl: 1209600`):

```
{ "text": string, "locale": string, "appVersion": string, "day": "YYYY-MM-DD" }
```

`day` is the UTC date. **Never stored:** the IP, any header, the time of
day, any identifier. The IP is read once, to key the burst limit whose
counters live in the edge's transient memory, and is not written anywhere
by this worker.

## Logs

Workers Logs is disabled (`observability.enabled = false`). The worker logs
nothing. Cloudflare's own edge request handling is outside this contract.

## Review

Weekly, a script pulls every stored submission into one text file, a
person decides each one, and a second script records the decisions in a
metadata-only ledger and deletes the batch. Raw text does not outlive the
14-day window. Nothing is ever sent back to a reader.
