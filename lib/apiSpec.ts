import fs from "node:fs";
import path from "node:path";

/**
 * API reference model, derived from the generated OpenAPI description.
 *
 * `public/api/openapi.json` is GENERATED in the dental-pms repo from the route
 * registry (`npm run build:openapi`) and copied here, so nothing in this file
 * may hand-maintain a second list of endpoints, params or scopes. If the
 * reference is missing an operation, the fix is upstream in the generator, not
 * a special case here.
 *
 * Server-only (uses `fs`): import from Server Components and the sitemap only,
 * never from a "use client" module. The client console receives a plain
 * serialisable `Operation` as a prop instead.
 */

const SPEC_PATH = path.join(process.cwd(), "public", "api", "openapi.json");

const HTTP_METHODS = ["get", "post", "patch", "delete", "put"] as const;
export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export interface ParamDoc {
  name: string;
  in: "path" | "query" | "header";
  required: boolean;
  description?: string;
  /** Rendered type, e.g. "integer", "string<uuid>", "boolean". */
  type: string;
  default?: string;
  enum?: string[];
}

export interface FieldDoc {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  readOnly?: boolean;
}

export interface ResponseDoc {
  status: string;
  description: string;
  /** Pretty-printed example body, when one can be synthesised. */
  example?: string;
}

export interface Operation {
  slug: string;
  method: HttpMethod;
  /** Path as written in the spec, e.g. "/v1/patients/{id}". */
  path: string;
  summary: string;
  description?: string;
  tag: string;
  scopes: string[];
  params: ParamDoc[];
  bodyFields: FieldDoc[];
  bodyRequired: boolean;
  responses: ResponseDoc[];
}

export interface OperationGroup {
  tag: string;
  title: string;
  operations: Operation[];
}

type Json = Record<string, unknown>;

interface Spec {
  info: { title: string; version: string; description?: string };
  servers?: { url: string; variables?: Record<string, { default: string }> }[];
  paths: Record<string, Record<string, Json>>;
  components?: { schemas?: Record<string, Json> };
}

let cache: Spec | null = null;
function spec(): Spec {
  if (!cache) cache = JSON.parse(fs.readFileSync(SPEC_PATH, "utf8")) as Spec;
  return cache;
}

/**
 * The concrete base URL. The spec keeps `projectRef` as a server variable so it
 * survives a move to a branded API domain, but a reference page and a
 * copy-pasteable curl command both need the resolved string.
 */
export function baseUrl(): string {
  const s = spec().servers?.[0];
  if (!s) return "";
  return Object.entries(s.variables ?? {}).reduce(
    (url, [k, v]) => url.replace(`{${k}}`, v.default),
    s.url,
  );
}

export function apiVersion(): string {
  return spec().info.version;
}

function deref(schema: Json | undefined): Json | undefined {
  if (!schema) return undefined;
  const ref = schema["$ref"];
  if (typeof ref === "string") {
    const name = ref.replace("#/components/schemas/", "");
    return spec().components?.schemas?.[name] as Json | undefined;
  }
  return schema;
}

/** A short human type label: "string<uuid>", "integer", "string[]". */
function typeLabel(schema: Json | undefined): string {
  if (!schema) return "string";
  const anyOf = schema["anyOf"] as Json[] | undefined;
  if (anyOf) {
    const named = anyOf
      .map((s) => typeLabel(s))
      .filter((t) => t !== "null");
    const label = Array.from(new Set(named)).join(" | ");
    return anyOf.some((s) => s["type"] === "null") ? `${label} | null` : label;
  }
  const t = schema["type"];
  if (Array.isArray(t)) return t.filter((x) => x !== "null").join(" | ") || "string";
  if (t === "array") return `${typeLabel(schema["items"] as Json)}[]`;
  const fmt = schema["format"];
  if (typeof t === "string" && typeof fmt === "string") return `${t}<${fmt}>`;
  return typeof t === "string" ? t : "object";
}

function enumOf(schema: Json | undefined): string[] | undefined {
  const e = schema?.["enum"];
  return Array.isArray(e) ? e.map(String) : undefined;
}

/**
 * A plausible value for a field, used for the request sample and the example
 * response. Deliberately synthetic: nothing here is read from a real clinic,
 * and the examples must never look like a real patient.
 */
function exampleFor(name: string, schema: Json | undefined): unknown {
  const s = schema ?? {};
  const e = enumOf(s);
  if (e?.length) return e[0];
  const t = typeLabel(s).split(" | ")[0];
  if (t.startsWith("string<uuid>")) return "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  if (t.startsWith("string<date-time>")) return "2026-11-05T09:30:00+03:00";
  if (t.startsWith("string<date>")) return "2026-11-05";
  if (t.startsWith("integer") || t.startsWith("number")) return 0;
  if (t.startsWith("boolean")) return false;
  if (t.endsWith("[]")) return [];
  if (t === "object") return {};
  const n = name.toLowerCase();
  if (n.includes("email")) return "name@example.com";
  if (n.includes("phone") || n.includes("whatsapp")) return "+256700000000";
  if (n === "first_name") return "Amina";
  if (n === "last_name") return "Okello";
  if (n.includes("name")) return "Example";
  if (n.includes("notes") || n.includes("description")) return "";
  return "string";
}

function fieldsOf(schema: Json | undefined): FieldDoc[] {
  const s = deref(schema);
  const props = s?.["properties"] as Record<string, Json> | undefined;
  if (!props) return [];
  const required = new Set((s?.["required"] as string[] | undefined) ?? []);
  return Object.entries(props).map(([name, p]) => ({
    name,
    type: typeLabel(p),
    required: required.has(name),
    description: typeof p["description"] === "string" ? p["description"] : undefined,
    readOnly: p["readOnly"] === true,
  }));
}

/** Build an example body from a response schema, following the `data` envelope. */
function exampleBody(schema: Json | undefined): string | undefined {
  const s = deref(schema);
  if (!s) return undefined;
  const props = s["properties"] as Record<string, Json> | undefined;
  if (!props) return undefined;

  const build = (sch: Json | undefined): unknown => {
    const d = deref(sch);
    if (!d) return null;
    if (d["type"] === "array") return [build(d["items"] as Json)];
    const p = d["properties"] as Record<string, Json> | undefined;
    if (!p) return exampleFor("", d);
    const out: Record<string, unknown> = {};
    // A whole row is long; the first handful of fields conveys the shape.
    for (const [k, v] of Object.entries(p).slice(0, 8)) out[k] = exampleFor(k, deref(v));
    if (Object.keys(p).length > 8) out["..."] = "…";
    return out;
  };

  const body: Record<string, unknown> = {};
  if (props["data"]) body["data"] = build(props["data"]);
  if (props["meta"]) body["meta"] = { next_cursor: "eyJrIjpbIjIwMjYtMTEtMDUiLCIzZmE4NWY2NCJdfQ" };
  if (!Object.keys(body).length) return undefined;
  return JSON.stringify(body, null, 2);
}

/** `problem+json` sample, so an error tab shows the real shape rather than prose. */
function problemExample(status: string, description: string): string {
  const code =
    status === "401" ? "unauthorized"
    : status === "403" ? "insufficient_scope"
    : status === "404" ? "not_found"
    : status === "409" ? "conflict"
    : status === "412" ? "precondition_failed"
    : status === "422" ? "validation_failed"
    : status === "429" ? "rate_limited"
    : "malformed_request";
  return JSON.stringify(
    {
      type: `https://cuspflow.co/docs/developers/api-errors#${code}`,
      title: description.replace(/\.$/, ""),
      status: Number(status),
      code,
      request_id: "01a1aa97-40c4-7f6f-81f6-8345a31d7111",
    },
    null,
    2,
  );
}

function slugify(operationId: string): string {
  return operationId.replace(/_/g, "-").toLowerCase();
}

/** "treatment_plans" -> "Treatment Plans". */
function titleize(tag: string): string {
  return tag
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

let opsCache: Operation[] | null = null;

export function getOperations(): Operation[] {
  if (opsCache) return opsCache;
  const s = spec();
  const out: Operation[] = [];

  for (const [p, item] of Object.entries(s.paths)) {
    for (const m of HTTP_METHODS) {
      const op = item[m];
      if (!op) continue;
      const operationId = String(op["operationId"] ?? `${m}${p}`);
      const security = (op["security"] as Record<string, string[]>[] | undefined) ?? [];
      const scopes = security.flatMap((entry) => Object.values(entry).flat());

      const params: ParamDoc[] = ((op["parameters"] as Json[] | undefined) ?? []).map((raw) => {
        const schema = raw["schema"] as Json | undefined;
        const def = schema?.["default"];
        return {
          name: String(raw["name"]),
          in: raw["in"] as ParamDoc["in"],
          required: raw["required"] === true,
          description: typeof raw["description"] === "string" ? raw["description"] : undefined,
          type: typeLabel(schema),
          default: def === undefined ? undefined : String(def),
          enum: enumOf(schema),
        };
      });

      const rb = op["requestBody"] as Json | undefined;
      const rbSchema = (rb?.["content"] as Json | undefined)?.["application/json"] as Json | undefined;

      const responses: ResponseDoc[] = Object.entries(
        (op["responses"] as Record<string, Json> | undefined) ?? {},
      ).map(([status, r]) => {
        const description = String(r["description"] ?? "");
        const content = (r["content"] as Json | undefined)?.["application/json"] as Json | undefined;
        const ok = status.startsWith("2");
        return {
          status,
          description,
          example: ok ? exampleBody(content?.["schema"] as Json) : problemExample(status, description),
        };
      });

      out.push({
        slug: slugify(operationId),
        method: m.toUpperCase() as HttpMethod,
        path: p,
        summary: String(op["summary"] ?? operationId),
        description: typeof op["description"] === "string" ? op["description"] : undefined,
        tag: ((op["tags"] as string[] | undefined) ?? ["other"])[0],
        scopes,
        params,
        bodyFields: fieldsOf(rbSchema?.["schema"] as Json),
        bodyRequired: rb?.["required"] === true,
        responses,
      });
    }
  }
  opsCache = out;
  return out;
}

/**
 * When the API contract last changed, used as the sitemap `lastmod` for all 80
 * reference URLs and as `dateModified` in their structured data.
 *
 * Hand-maintained, which is unusual in this file, and the alternatives are
 * both worse. The spec file's mtime looks right and is not: git does not store
 * mtimes, so `actions/checkout` stamps every file with the checkout time and
 * this would quietly collapse back to "build time" in CI while reading
 * correctly on a laptop. Stamping a generated date into the spec upstream
 * would break the api-contract job there, which regenerates and diffs.
 *
 * So: bump this line whenever a regenerated openapi.json is copied in. A
 * lastmod that moves when nothing changed is a signal crawlers learn to
 * discount, which is the whole reason for not just using `new Date()`.
 */
export const CONTRACT_UPDATED = "2026-11-05";

export function specModified(): Date {
  return new Date(`${CONTRACT_UPDATED}T00:00:00Z`);
}

/** Strip the Markdown a spec description may carry; this goes in a meta tag. */
function plain(text: string): string {
  return text.replace(/`/g, "").replace(/\s+/g, " ").trim();
}

function clip(text: string, max = 158): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/**
 * The subject noun, read back out of the summary rather than from a second
 * map. The generator upstream already produced "List patients" and "Create a
 * patient", so duplicating a singular/plural table here would be a second
 * source of truth that silently drifts.
 */
function subject(op: Operation): string | undefined {
  const m = /^(?:List|Create|Get|Update|Soft-delete) (?:an? )?(.+)$/.exec(op.summary);
  return m?.[1];
}

/**
 * A distinct meta description per operation.
 *
 * The first cut of this page used the spec's own `description`, which is
 * written for the body copy and is identical across resources: "Only the
 * fields you send are changed." was the meta description of all ten PATCH
 * pages, and the `deleted_at` sentence of all ten DELETE pages. Everything
 * else fell back to a template differing only in method and path. Both are
 * duplicate-content signals and neither tells a reader anything.
 */
export function describeOperation(op: Operation): string {
  const noun = subject(op);
  const scope = op.scopes.length
    ? ` Requires the ${op.scopes.join(" and ")} scope.`
    : "";
  const filters = op.params.filter((p) => p.in === "query").length;
  const required = op.bodyFields.filter((f) => f.required).length;
  const optional = op.bodyFields.length - required;

  if (noun) {
    if (op.method === "GET" && !op.path.includes("{id}")) {
      return clip(
        `List ${noun} from a CuspFlow clinic over the REST API: keyset pagination, ` +
          `${filters} filters and sparse fieldsets.${scope}`,
      );
    }
    if (op.method === "GET") {
      return clip(
        `Fetch one ${noun} by id from a CuspFlow clinic over the REST API. Returns an ` +
          `ETag for a later conditional write.${scope}`,
      );
    }
    if (op.method === "POST") {
      return clip(
        `Create ${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun} in a CuspFlow clinic over ` +
          `the REST API: ${required} required ${required === 1 ? "field" : "fields"}, ` +
          `${optional} optional, with idempotent replay.${scope}`,
      );
    }
    if (op.method === "PATCH") {
      return clip(
        `Update ${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun} in a CuspFlow clinic over ` +
          `the REST API. Partial update, with If-Match for optimistic concurrency.${scope}`,
      );
    }
    if (op.method === "DELETE") {
      return clip(
        `Soft-delete ${/^[aeiou]/i.test(noun) ? "an" : "a"} ${noun} in a CuspFlow clinic ` +
          `over the REST API. The row stays restorable from Trash.${scope}`,
      );
    }
  }
  // The handful of operations that are not CRUD (whoami, the import flow) have
  // a hand-written description in the spec that is already specific.
  return clip(
    op.description
      ? `${plain(op.description)}${scope}`
      : `${op.method} ${op.path} in the CuspFlow REST API.${scope}`,
  );
}

export function getOperation(slug: string): Operation | undefined {
  return getOperations().find((o) => o.slug === slug);
}

/**
 * Groups in sidebar order. `meta` is hoisted because `whoami` is the first call
 * anyone makes, and `imports` sinks to the bottom because a migration is a
 * one-off, not day-to-day traffic. Everything else keeps spec order, which is
 * registry order.
 */
export function getGroups(): OperationGroup[] {
  const byTag = new Map<string, Operation[]>();
  for (const op of getOperations()) {
    const list = byTag.get(op.tag) ?? [];
    list.push(op);
    byTag.set(op.tag, list);
  }
  const tags = [...byTag.keys()];
  const rank = (t: string) => (t === "meta" ? 0 : t === "imports" ? 2 : 1);
  tags.sort((a, b) => rank(a) - rank(b));

  return tags.map((tag) => ({
    tag,
    title: tag === "meta" ? "Getting Started" : titleize(tag),
    operations: byTag.get(tag)!,
  }));
}
