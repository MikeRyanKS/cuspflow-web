"use client";

import { useEffect, useId, useMemo, useState } from "react";
import type { Operation, ParamDoc } from "@/lib/apiSpec";

/**
 * The Try It console.
 *
 * Posts to /api/try on this same origin, which is the Worker in worker/index.ts.
 * The API itself sends no CORS headers on purpose, so calling it straight from
 * here would die at the preflight; the Worker makes the call server-side. See
 * that file for what happens to the key.
 *
 * In this component the key lives in React state and in sessionStorage, never
 * localStorage, so closing the tab discards it. It is deliberately NOT
 * interpolated into the generated code samples: those reference an environment
 * variable instead, so the secret is never rendered into copyable page text,
 * and the sample teaches the better habit on the way past.
 */

const KEY_STORAGE = "cuspflow.tryit.key";
const CLINIC_STORAGE = "cuspflow.tryit.clinic";

type Lang = "shell" | "node" | "python";
const LANGS: { id: Lang; label: string }[] = [
  { id: "shell", label: "Shell" },
  { id: "node", label: "Node" },
  { id: "python", label: "Python" },
];

interface Whoami {
  clinic_id: string;
  key_name: string;
  role: string;
  scopes: string[];
  writable: boolean;
}

interface TryResult {
  status: number;
  statusText: string;
  durationMs: number;
  headers: Record<string, string>;
  body: unknown;
}

function session(key: string): string {
  try {
    return window.sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function setSession(key: string, value: string) {
  try {
    if (value) window.sessionStorage.setItem(key, value);
    else window.sessionStorage.removeItem(key);
  } catch {
    /* private mode, blocked storage: the console still works for this page view */
  }
}

/** A JSON skeleton of the required create/update fields, as a starting point. */
function bodyTemplate(op: Operation): string {
  const required = op.bodyFields.filter((f) => f.required);
  const fields = required.length ? required : op.bodyFields.slice(0, 3);
  if (!fields.length) return "{}";
  const obj: Record<string, unknown> = {};
  for (const f of fields) {
    const t = f.type.split(" | ")[0];
    obj[f.name] = t.startsWith("integer") || t.startsWith("number")
      ? 0
      : t.startsWith("boolean")
        ? false
        : t.endsWith("[]")
          ? []
          : "";
  }
  return JSON.stringify(obj, null, 2);
}

function buildPath(op: Operation, values: Record<string, string>): string {
  return op.path.replace(/\{(\w+)\}/g, (_m, name) => values[name] || `{${name}}`);
}

function buildQuery(op: Operation, values: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of op.params) {
    if (p.in !== "query") continue;
    const v = values[p.name];
    if (v) out[p.name] = v;
  }
  return out;
}

function buildHeaders(op: Operation, values: Record<string, string>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const p of op.params) {
    if (p.in !== "header") continue;
    const v = values[p.name];
    if (v) out[p.name] = v;
  }
  return out;
}

function sample(
  lang: Lang,
  op: Operation,
  base: string,
  values: Record<string, string>,
  bodyText: string,
): string {
  const path = buildPath(op, values);
  const query = buildQuery(op, values);
  const qs = new URLSearchParams(query).toString();
  const url = `${base}${path}${qs ? `?${qs}` : ""}`;
  const extra = buildHeaders(op, values);
  const hasBody = op.method !== "GET" && op.bodyFields.length > 0;

  if (lang === "shell") {
    const lines = [`curl --request ${op.method} \\`, `  --url '${url}' \\`];
    lines.push(`  --header 'Authorization: Bearer '"$CUSPFLOW_API_KEY" \\`);
    lines.push(`  --header 'Accept: application/json'${hasBody || Object.keys(extra).length ? " \\" : ""}`);
    Object.entries(extra).forEach(([k, v], i, arr) => {
      lines.push(`  --header '${k}: ${v}'${hasBody || i < arr.length - 1 ? " \\" : ""}`);
    });
    if (hasBody) {
      lines.push(`  --header 'Content-Type: application/json' \\`);
      lines.push(`  --data '${bodyText.replace(/\n\s*/g, " ")}'`);
    }
    return lines.join("\n");
  }

  if (lang === "node") {
    const headerLines = [
      `    Authorization: \`Bearer \${process.env.CUSPFLOW_API_KEY}\`,`,
      `    Accept: "application/json",`,
      ...(hasBody ? [`    "Content-Type": "application/json",`] : []),
      ...Object.entries(extra).map(([k, v]) => `    ${JSON.stringify(k)}: ${JSON.stringify(v)},`),
    ].join("\n");
    return [
      `const res = await fetch(`,
      `  ${JSON.stringify(url)},`,
      `  {`,
      `    method: ${JSON.stringify(op.method)},`,
      `    headers: {`,
      headerLines.replace(/^ {4}/gm, "      "),
      `    },`,
      ...(hasBody ? [`    body: JSON.stringify(${bodyText.replace(/\n/g, "\n    ")}),`] : []),
      `  },`,
      `);`,
      ``,
      `if (!res.ok) throw new Error(\`\${res.status} \${await res.text()}\`);`,
      `const { data } = await res.json();`,
    ].join("\n");
  }

  const pyHeaders = [
    `        "Authorization": f"Bearer {os.environ['CUSPFLOW_API_KEY']}",`,
    `        "Accept": "application/json",`,
    ...Object.entries(extra).map(([k, v]) => `        ${JSON.stringify(k)}: ${JSON.stringify(v)},`),
  ].join("\n");
  return [
    `import os, requests`,
    ``,
    `res = requests.${op.method.toLowerCase()}(`,
    `    ${JSON.stringify(url)},`,
    `    headers={`,
    pyHeaders,
    `    },`,
    ...(hasBody ? [`    json=${bodyText.replace(/\n/g, "\n    ")},`] : []),
    `)`,
    `res.raise_for_status()`,
    `data = res.json()["data"]`,
  ].join("\n");
}

function statusTone(status: number): string {
  if (status >= 200 && status < 300) return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
  if (status >= 400 && status < 500) return "bg-amber-50 text-amber-800 ring-amber-600/20";
  return "bg-rose-50 text-rose-700 ring-rose-600/20";
}

function Field({
  param,
  value,
  onChange,
  idPrefix,
}: {
  param: ParamDoc;
  value: string;
  onChange: (v: string) => void;
  /**
   * Both consoles are rendered at once (the right rail above xl, inline below
   * it) and CSS hides one, so ids derived from the parameter name alone would
   * be duplicated in the document and every `label for=` would bind to
   * whichever came first. React's useId gives each instance its own namespace.
   */
  idPrefix: string;
}) {
  const id = `${idPrefix}-${param.in}-${param.name}`;
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline gap-2 text-xs">
        <span className="font-mono font-medium text-slate-800">{param.name}</span>
        <span className="text-slate-400">{param.type}</span>
        {param.required ? <span className="text-rose-600">required</span> : null}
      </label>
      {param.enum?.length ? (
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        >
          <option value="">{param.default ?? "—"}</option>
          {param.enum.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          placeholder={param.default ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-2.5 py-1.5 font-mono text-sm text-slate-900 placeholder:text-slate-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        />
      )}
    </div>
  );
}

export default function EndpointConsole({ op, base }: { op: Operation; base: string }) {
  const uid = useId();
  const keyId = `${uid}-key`;
  const bodyId = `${uid}-body`;
  const [apiKey, setApiKey] = useState("");
  const [clinicId, setClinicId] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [values, setValues] = useState<Record<string, string>>({});
  const [bodyText, setBodyText] = useState(() => bodyTemplate(op));
  const [lang, setLang] = useState<Lang>("shell");
  const [copied, setCopied] = useState(false);
  const [confirmWrite, setConfirmWrite] = useState(false);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<TryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [whoami, setWhoami] = useState<Whoami | null>(null);
  const [whoamiError, setWhoamiError] = useState<string | null>(null);

  const isWrite = op.method !== "GET";

  useEffect(() => {
    setApiKey(session(KEY_STORAGE));
    setClinicId(session(CLINIC_STORAGE));
  }, []);

  // Identify the key as soon as there is a complete-looking one, so the banner
  // naming the clinic is up BEFORE any request can be fired, not after.
  useEffect(() => {
    if (!/^cfk_(live|test)_[0-9a-z]{8}_[A-Za-z0-9_-]{43}$/.test(apiKey)) {
      setWhoami(null);
      setWhoamiError(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/try", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ method: "GET", path: "/v1/meta/whoami", apiKey }),
        });
        const payload = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setWhoami(null);
          setWhoamiError(payload?.error?.message ?? "Could not identify this key.");
          return;
        }
        if (payload.status !== 200) {
          setWhoami(null);
          setWhoamiError(
            payload.body?.detail ?? payload.body?.title ?? `The key was refused (${payload.status}).`,
          );
          return;
        }
        setWhoami(payload.body.data as Whoami);
        setWhoamiError(null);
      } catch {
        if (!cancelled) setWhoamiError("Could not reach the documentation proxy.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  const pathParams = op.params.filter((p) => p.in === "path");
  const queryParams = op.params.filter((p) => p.in === "query");
  const headerParams = op.params.filter((p) => p.in === "header");
  const missingPath = pathParams.filter((p) => !values[p.name]);

  const code = useMemo(
    () => sample(lang, op, base, values, bodyText),
    [lang, op, base, values, bodyText],
  );

  const scopeHeld = !whoami || whoami.scopes.includes("*") || op.scopes.every((s) => whoami.scopes.includes(s));

  async function run() {
    setRunning(true);
    setError(null);
    setResult(null);
    try {
      let parsedBody: unknown;
      if (isWrite && op.bodyFields.length) {
        try {
          parsedBody = JSON.parse(bodyText);
        } catch {
          setError("The request body is not valid JSON.");
          return;
        }
      }
      const res = await fetch("/api/try", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          method: op.method,
          path: buildPath(op, values),
          query: buildQuery(op, values),
          headers: buildHeaders(op, values),
          body: parsedBody,
          apiKey,
          clinicId: clinicId || undefined,
          confirmWrite: isWrite ? confirmWrite : undefined,
        }),
      });
      const payload = await res.json();
      if (!res.ok) {
        setError(payload?.error?.message ?? `The proxy returned ${res.status}.`);
        return;
      }
      setResult(payload as TryResult);
    } catch {
      setError("Could not reach the documentation proxy. Check your connection and try again.");
    } finally {
      setRunning(false);
    }
  }

  const blocked =
    !apiKey || missingPath.length > 0 || (isWrite && !confirmWrite) || running;

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/60">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">Try it</p>
        <p className="text-xs text-slate-500">10 requests a minute</p>
      </div>

      <div className="space-y-5 p-4">
        {/* Key */}
        <div>
          <label htmlFor={keyId} className="block text-xs font-medium text-slate-700">
            Your API key
          </label>
          <div className="mt-1 flex gap-2">
            <input
              id={keyId}
              type={showKey ? "text" : "password"}
              autoComplete="off"
              spellCheck={false}
              value={apiKey}
              placeholder="cfk_live_…"
              onChange={(e) => {
                setApiKey(e.target.value.trim());
                setSession(KEY_STORAGE, e.target.value.trim());
              }}
              className="min-w-0 flex-1 rounded-lg border border-slate-300 px-2.5 py-1.5 font-mono text-sm text-slate-900 placeholder:text-slate-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
            <button
              type="button"
              onClick={() => setShowKey((v) => !v)}
              className="shrink-0 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs text-slate-600 hover:bg-white"
            >
              {showKey ? "Hide" : "Show"}
            </button>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            Kept in this tab only (<code className="font-mono">sessionStorage</code>), never saved to
            disk and never put in the code sample. It is sent to CuspFlow&apos;s own proxy on this
            domain, not to a third party.
          </p>
        </div>

        {/* Who the key is */}
        {whoami ? (
          <div className="rounded-xl border border-brand-200 bg-brand-50/70 px-3 py-2.5 text-xs">
            <p className="font-semibold text-brand-900">
              Calling as {whoami.key_name} · {whoami.role}
            </p>
            <p className="mt-0.5 font-mono text-[11px] text-brand-800/80">
              clinic {whoami.clinic_id}
            </p>
            <p className="mt-1 text-brand-800/80">
              {whoami.writable ? "Writes allowed" : "Read-only clinic"} · scopes:{" "}
              {whoami.scopes.join(", ")}
            </p>
            {!scopeHeld ? (
              <p className="mt-1.5 font-medium text-amber-800">
                This key does not hold {op.scopes.join(", ")}, so this call will return 403.
              </p>
            ) : null}
          </div>
        ) : whoamiError ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
            {whoamiError}
          </p>
        ) : null}

        {/* Optional clinic confirmation */}
        <details className="group">
          <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-700">
            Confirm the clinic id (optional)
          </summary>
          <input
            type="text"
            value={clinicId}
            spellCheck={false}
            placeholder="3fa85f64-5717-4562-b3fc-2c963f66afa6"
            onChange={(e) => {
              setClinicId(e.target.value.trim());
              setSession(CLINIC_STORAGE, e.target.value.trim());
            }}
            className="mt-2 w-full rounded-lg border border-slate-300 px-2.5 py-1.5 font-mono text-xs text-slate-900 placeholder:text-slate-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          />
          <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
            Fill this in and the request is refused unless the key really belongs to that clinic.
            It guards against pasting the wrong key, not against an attacker: the clinic is already
            in the key and anyone holding it can read it from{" "}
            <code className="font-mono">whoami</code>.
          </p>
        </details>

        {/* Parameters */}
        {pathParams.length ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Path parameters
            </p>
            {pathParams.map((p) => (
              <Field
                key={p.name}
                param={p}
                value={values[p.name] ?? ""}
                onChange={(v) => setValues((s) => ({ ...s, [p.name]: v }))}
                idPrefix={uid}
              />
            ))}
          </div>
        ) : null}

        {queryParams.length ? (
          <details open={op.method === "GET"}>
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-600">
              Query parameters ({queryParams.length})
            </summary>
            <div className="mt-3 space-y-3">
              {queryParams.map((p) => (
                <Field
                  key={p.name}
                  param={p}
                  value={values[p.name] ?? ""}
                  onChange={(v) => setValues((s) => ({ ...s, [p.name]: v }))}
                  idPrefix={uid}
                />
              ))}
            </div>
          </details>
        ) : null}

        {headerParams.length ? (
          <details>
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-slate-600">
              Headers ({headerParams.length})
            </summary>
            <div className="mt-3 space-y-3">
              {headerParams.map((p) => (
                <Field
                  key={p.name}
                  param={p}
                  value={values[p.name] ?? ""}
                  onChange={(v) => setValues((s) => ({ ...s, [p.name]: v }))}
                  idPrefix={uid}
                />
              ))}
            </div>
          </details>
        ) : null}

        {isWrite && op.bodyFields.length ? (
          <div>
            <label htmlFor={bodyId} className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Body
            </label>
            <textarea
              id={bodyId}
              rows={Math.min(14, bodyText.split("\n").length + 1)}
              spellCheck={false}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-300 px-2.5 py-2 font-mono text-xs leading-relaxed text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>
        ) : null}

        {/* Code sample */}
        <div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex gap-1">
              {LANGS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLang(l.id)}
                  className={`rounded-md px-2 py-1 text-xs font-medium ${
                    lang === l.id
                      ? "bg-slate-900 text-white"
                      : "text-slate-500 hover:bg-slate-200/70 hover:text-slate-700"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(code);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1500);
              }}
              className="rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-slate-200/70 hover:text-slate-700"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
            <code>{code}</code>
          </pre>
        </div>

        {/* Write confirmation */}
        {isWrite ? (
          <label className="flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-xs text-amber-900">
            <input
              type="checkbox"
              checked={confirmWrite}
              onChange={(e) => setConfirmWrite(e.target.checked)}
              className="mt-0.5 shrink-0"
            />
            <span>
              This writes to your live clinic. There is no sandbox: a record created here is a real
              record, and a soft-deleted one has to be restored from Trash in the app.
            </span>
          </label>
        ) : null}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={run}
            disabled={blocked}
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {running ? "Running…" : "Try it!"}
          </button>
          {!apiKey ? (
            <span className="text-xs text-slate-500">Paste a key to run this.</span>
          ) : missingPath.length ? (
            <span className="text-xs text-slate-500">
              Needs {missingPath.map((p) => p.name).join(", ")}.
            </span>
          ) : isWrite && !confirmWrite ? (
            <span className="text-xs text-slate-500">Confirm the write first.</span>
          ) : null}
        </div>

        {/* Response */}
        {error ? (
          <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
            {error}
          </p>
        ) : null}

        {result ? (
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-bold ring-1 ring-inset ${statusTone(
                  result.status,
                )}`}
              >
                {result.status} {result.statusText}
              </span>
              <span className="text-xs text-slate-500">{result.durationMs} ms</span>
              {result.headers["ratelimit-remaining"] ? (
                <span className="text-xs text-slate-500">
                  {result.headers["ratelimit-remaining"]} of {result.headers["ratelimit-limit"]} left
                  this minute
                </span>
              ) : null}
            </div>
            <pre className="mt-2 max-h-96 overflow-auto rounded-xl bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
              <code>{JSON.stringify(result.body, null, 2)}</code>
            </pre>
            {Object.keys(result.headers).length ? (
              <details className="mt-2">
                <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-700">
                  Response headers
                </summary>
                <dl className="mt-2 space-y-1 font-mono text-[11px]">
                  {Object.entries(result.headers).map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="shrink-0 text-slate-500">{k}:</dt>
                      <dd className="min-w-0 break-all text-slate-800">{v}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
