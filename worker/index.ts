/**
 * cuspflow.co Worker: static assets, plus the one dynamic route the docs need.
 *
 * ## Why this exists
 *
 * The CuspFlow API sends NO CORS headers, on purpose: "an API key in
 * browser-reachable code is a leaked API key, so the external surface must not
 * look callable from a page" (ADR-088). That decision stands, and nothing here
 * asks it to change. A `fetch()` from the docs page straight to the API dies at
 * the preflight, which is exactly what that design intends.
 *
 * The Try It console instead posts to `/api/try` on cuspflow.co, which is the
 * SAME ORIGIN as the page, so no CORS header is involved anywhere. This Worker
 * then makes the upstream call server-side. That is the same shape ReadMe uses
 * for ClickUp's "Try It", with one difference that matters: the proxy is ours,
 * so the reader's key never passes through a third party.
 *
 * ## What is done with the key
 *
 * Forwarded upstream over TLS and then dropped. It is never stored, never put
 * in a KV or a cache, and never logged: the log line carries `key_prefix`,
 * which is already the non-secret lookup column in `api_keys`. The browser
 * holds it in sessionStorage only, so it dies with the tab.
 *
 * ## Limits, deliberately tighter than the API's own
 *
 * The key's real budget is 60/min. This path allows 10/min per IP, because a
 * documentation console has no business doing bulk work, and because the limit
 * here protects a reader from their own loop as much as it protects us. Writes
 * additionally require an explicit `confirmWrite`, since this talks to a real
 * clinic rather than a sandbox.
 */

interface RateLimiter {
  limit(opts: { key: string }): Promise<{ success: boolean }>;
}

export interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  /** Cloudflare rate-limiting binding. Optional: see `withinRateLimit`. */
  TRY_IT_LIMITER?: RateLimiter;
}

const UPSTREAM = "https://zwhwryofdsgmzgqbcghl.supabase.co/functions/v1/api";

/**
 * Extra origins beyond the Worker's own. The request's own origin is always
 * allowed, computed per request rather than listed, because a hardcoded port
 * list is wrong the moment the site is served on a different one: the first
 * local run of this console 403'd itself on `localhost:8788` for exactly that
 * reason. The rule that actually holds is "the page this Worker serves".
 */
const EXTRA_ALLOWED_ORIGINS = ["https://cuspflow.co", "https://www.cuspflow.co"];

function originAllowed(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // curl and other non-browser callers send none
  if (origin === new URL(request.url).origin) return true;
  return EXTRA_ALLOWED_ORIGINS.includes(origin);
}

const ALLOWED_METHODS = new Set(["GET", "POST", "PATCH", "DELETE"]);

/** Only the two headers the console offers. Anything else is dropped, not proxied. */
const ALLOWED_REQUEST_HEADERS = new Set(["if-match", "idempotency-key"]);

/**
 * Response headers handed back to the page. An allowlist rather than a
 * passthrough, so a future upstream `set-cookie` or auth echo cannot reach the
 * browser by accident.
 */
const EXPOSED_RESPONSE_HEADERS = [
  "content-type", "etag", "location", "allow", "retry-after", "x-request-id",
  "ratelimit-limit", "ratelimit-remaining", "ratelimit-reset", "ratelimit",
  "x-ratelimit-limit", "x-ratelimit-remaining", "x-ratelimit-reset",
];

const KEY_RE = /^cfk_(live|test)_[0-9a-z]{8}_[A-Za-z0-9_-]{43}$/;
/** `/v1/...` only. No scheme, no `..`, no `//`, nothing that could retarget the upstream. */
const PATH_RE = /^\/v1\/[A-Za-z0-9/_.-]*$/;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const MAX_BODY_BYTES = 64 * 1024; // the API allows 1 MiB; a console needs far less
const MAX_QUERY_PARAMS = 20;
const MAX_QUERY_VALUE = 500;

/**
 * In-isolate fallback counter. Edge isolates share no memory, so this leaks:
 * it is a backstop for a missing binding, not the limit itself. It fails
 * CLOSED per isolate rather than allowing unlimited traffic when the
 * rate-limiting binding is not configured.
 */
const hits = new Map<string, number[]>();

async function withinRateLimit(env: Env, ip: string): Promise<boolean> {
  if (env.TRY_IT_LIMITER) {
    const { success } = await env.TRY_IT_LIMITER.limit({ key: ip });
    return success;
  }
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= 10) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) hits.clear(); // bounded memory; coarse but this is a backstop
  return true;
}

function fail(status: number, code: string, message: string): Response {
  return new Response(JSON.stringify({ error: { code, message } }), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

interface TryRequest {
  method?: string;
  path?: string;
  query?: Record<string, string>;
  headers?: Record<string, string>;
  body?: unknown;
  apiKey?: string;
  clinicId?: string;
  confirmWrite?: boolean;
}

async function handleTry(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return fail(405, "method_not_allowed", "POST a request description to this endpoint.");
  }

  // No Access-Control-Allow-Origin is ever sent, so a cross-origin page cannot
  // read a reply. This check additionally stops one being made at all.
  if (!originAllowed(request)) {
    return fail(403, "origin_not_allowed", "This endpoint only serves the CuspFlow documentation.");
  }

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (!(await withinRateLimit(env, ip))) {
    return new Response(
      JSON.stringify({
        error: {
          code: "try_it_rate_limited",
          message:
            "The documentation console allows 10 requests a minute. Your API key's own limit is " +
            "60 a minute; call the API directly to use it.",
        },
      }),
      {
        status: 429,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "no-store",
          "retry-after": "60",
        },
      },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return fail(413, "body_too_large", `Keep the request under ${MAX_BODY_BYTES} bytes here.`);
  }

  let req: TryRequest;
  try {
    req = JSON.parse(raw) as TryRequest;
  } catch {
    return fail(400, "invalid_json", "The request description is not valid JSON.");
  }

  const method = String(req.method ?? "GET").toUpperCase();
  if (!ALLOWED_METHODS.has(method)) {
    return fail(400, "bad_method", `Method must be one of ${[...ALLOWED_METHODS].join(", ")}.`);
  }

  const apiKey = String(req.apiKey ?? "");
  if (!KEY_RE.test(apiKey)) {
    return fail(
      400,
      "bad_key_format",
      "That does not look like a CuspFlow API key. They read cfk_live_<8 chars>_<secret>.",
    );
  }

  const path = String(req.path ?? "");
  if (!PATH_RE.test(path) || path.includes("..") || path.includes("//") || path.length > 300) {
    return fail(400, "bad_path", "Path must be a /v1/... route on this API.");
  }

  // A write here hits a real clinic's real records, so it is never the default.
  if (method !== "GET" && req.confirmWrite !== true) {
    return fail(
      400,
      "write_not_confirmed",
      "Confirm the write first. This calls your live clinic, not a sandbox.",
    );
  }

  const url = new URL(UPSTREAM + path);
  const query = req.query ?? {};
  if (Object.keys(query).length > MAX_QUERY_PARAMS) {
    return fail(400, "too_many_params", `At most ${MAX_QUERY_PARAMS} query parameters.`);
  }
  for (const [k, v] of Object.entries(query)) {
    if (v === "" || v == null) continue;
    const value = String(v);
    if (value.length > MAX_QUERY_VALUE) {
      return fail(400, "param_too_long", `Query parameter "${k}" is too long.`);
    }
    url.searchParams.set(k, value);
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${apiKey}`,
    Accept: "application/json",
  };
  for (const [k, v] of Object.entries(req.headers ?? {})) {
    if (ALLOWED_REQUEST_HEADERS.has(k.toLowerCase()) && v) headers[k] = String(v).slice(0, 255);
  }

  let payload: string | undefined;
  if (method !== "GET" && req.body !== undefined && req.body !== null) {
    payload = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
    if (payload.length > MAX_BODY_BYTES) {
      return fail(413, "body_too_large", "Request body is too large for the console.");
    }
    headers["Content-Type"] = "application/json";
  }

  // The clinic-id confirmation. The key already carries its clinic in
  // app_metadata and RLS reads it from there, so this proves nothing to an
  // attacker, who could read it from whoami anyway. It guards the READER:
  // paste the wrong key and you get a refusal instead of a successful write to
  // the wrong clinic. Only costs an extra upstream call when actually used.
  if (req.clinicId) {
    if (!UUID_RE.test(req.clinicId)) {
      return fail(400, "bad_clinic_id", "Clinic id must be a UUID.");
    }
    const who = await fetch(`${UPSTREAM}/v1/meta/whoami`, {
      headers: { Authorization: `Bearer ${apiKey}`, Accept: "application/json" },
    });
    if (!who.ok) {
      return fail(401, "key_check_failed", "The key was refused when confirming its clinic.");
    }
    const info = (await who.json()) as { data?: { clinic_id?: string } };
    if (info?.data?.clinic_id?.toLowerCase() !== req.clinicId.toLowerCase()) {
      return fail(
        403,
        "clinic_mismatch",
        "This key belongs to a different clinic than the one you confirmed. Nothing was sent.",
      );
    }
  }

  const started = Date.now();
  let upstream: Response;
  try {
    upstream = await fetch(url.toString(), { method, headers, body: payload });
  } catch {
    return fail(502, "upstream_unreachable", "Could not reach the CuspFlow API.");
  }
  const durationMs = Date.now() - started;

  const text = await upstream.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    /* keep the raw text; a non-JSON reply is itself worth showing */
  }

  const exposed: Record<string, string> = {};
  for (const h of EXPOSED_RESPONSE_HEADERS) {
    const v = upstream.headers.get(h);
    if (v) exposed[h] = v;
  }

  // Prefix only. The secret half of the key is never written anywhere.
  console.log(
    `try_it ${method} ${path} -> ${upstream.status} ${durationMs}ms key=${apiKey.slice(0, 17)}`,
  );

  return new Response(
    JSON.stringify({
      status: upstream.status,
      statusText: upstream.statusText,
      durationMs,
      headers: exposed,
      body,
    }),
    { headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } },
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/try") return handleTry(request, env);
    // Everything else is the static site. Assets that exist are served by the
    // platform before this Worker runs; this covers the 404 path.
    return env.ASSETS.fetch(request);
  },
};
