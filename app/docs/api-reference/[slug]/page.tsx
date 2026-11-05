import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApiRefShell from "@/components/apiref/ApiRefShell";
import MethodBadge from "@/components/apiref/MethodBadge";
import EndpointConsole from "@/components/apiref/EndpointConsole";
import { baseUrl, getOperation, getOperations, type FieldDoc, type ParamDoc } from "@/lib/apiSpec";

export function generateStaticParams() {
  return getOperations().map((op) => ({ slug: op.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const op = getOperation(slug);
  if (!op) return {};
  return {
    title: `${op.summary} | CuspFlow API`,
    description:
      op.description ??
      `${op.method} ${op.path} in the CuspFlow REST API: parameters, scopes and example responses.`,
    alternates: { canonical: `https://cuspflow.co/docs/api-reference/${op.slug}` },
  };
}

function ParamTable({ title, rows }: { title: string; rows: ParamDoc[] }) {
  if (!rows.length) return null;
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[520px] text-left text-sm">
          <tbody className="divide-y divide-slate-100">
            {rows.map((p) => (
              <tr key={p.name} className="align-top">
                <td className="w-56 px-4 py-3">
                  <code className="font-mono text-sm font-medium text-slate-900">{p.name}</code>
                  <div className="mt-0.5 font-mono text-xs text-slate-400">{p.type}</div>
                  {p.required ? (
                    <div className="mt-0.5 text-xs font-medium text-rose-600">required</div>
                  ) : p.default !== undefined ? (
                    <div className="mt-0.5 text-xs text-slate-400">
                      defaults to <code className="font-mono">{p.default}</code>
                    </div>
                  ) : null}
                </td>
                <td className="px-4 py-3 leading-relaxed text-slate-600">
                  {p.description ?? <span className="text-slate-400">—</span>}
                  {p.enum?.length ? (
                    <div className="mt-1 font-mono text-xs text-slate-500">
                      {p.enum.join(" · ")}
                    </div>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function BodyTable({ rows }: { rows: FieldDoc[] }) {
  if (!rows.length) return null;
  const required = rows.filter((f) => f.required);
  return (
    <section className="mt-8">
      <h2 className="text-base font-semibold text-slate-900">Body</h2>
      <p className="mt-1 text-sm text-slate-500">
        {required.length
          ? `${required.length} required ${required.length === 1 ? "field" : "fields"}, ${rows.length - required.length} optional.`
          : `${rows.length} optional fields. Only the fields you send are changed.`}
      </p>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[520px] text-left text-sm">
          <tbody className="divide-y divide-slate-100">
            {rows.map((f) => (
              <tr key={f.name} className="align-top">
                <td className="w-56 px-4 py-3">
                  <code className="font-mono text-sm font-medium text-slate-900">{f.name}</code>
                  <div className="mt-0.5 font-mono text-xs text-slate-400">{f.type}</div>
                  {f.required ? (
                    <div className="mt-0.5 text-xs font-medium text-rose-600">required</div>
                  ) : null}
                </td>
                <td className="px-4 py-3 leading-relaxed text-slate-600">
                  {f.description ?? <span className="text-slate-400">—</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function EndpointPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const op = getOperation(slug);
  if (!op) notFound();

  const base = baseUrl();
  const success = op.responses.filter((r) => r.status.startsWith("2"));
  const errors = op.responses.filter((r) => !r.status.startsWith("2"));

  return (
    <ApiRefShell activeSlug={op.slug}>
      <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-10">
        <div className="min-w-0">
          <header>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {op.summary}
            </h1>
            {/* The base URL is 74 characters, so this wraps rather than scrolls:
                a path hidden behind a horizontal scrollbar is the one thing on
                the page a reader must be able to see at a glance. */}
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-slate-900 px-3 py-2.5">
              <MethodBadge method={op.method} className="mt-0.5" />
              <code className="min-w-0 break-all font-mono text-sm text-slate-100">
                <span className="text-slate-400">{base}</span>
                <span className="font-semibold">{op.path}</span>
              </code>
            </div>
            {op.scopes.length ? (
              <p className="mt-3 text-sm text-slate-600">
                Requires the{" "}
                {op.scopes.map((s, i) => (
                  <span key={s}>
                    {i > 0 ? " and " : ""}
                    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-slate-800">
                      {s}
                    </code>
                  </span>
                ))}{" "}
                scope. See{" "}
                <Link
                  href="/docs/developers/api-keys-and-scopes"
                  className="text-brand-600 hover:underline"
                >
                  keys and scopes
                </Link>
                .
              </p>
            ) : null}
            {op.description ? (
              <p className="mt-4 leading-relaxed text-slate-600">{op.description}</p>
            ) : null}
          </header>

          {/* Console sits here on narrow screens, where there is no right rail. */}
          <div className="mt-8 xl:hidden">
            <EndpointConsole op={op} base={base} />
          </div>

          <ParamTable title="Path parameters" rows={op.params.filter((p) => p.in === "path")} />
          <ParamTable title="Query parameters" rows={op.params.filter((p) => p.in === "query")} />
          <ParamTable title="Headers" rows={op.params.filter((p) => p.in === "header")} />
          <BodyTable rows={op.bodyFields} />

          <section className="mt-10">
            <h2 className="text-base font-semibold text-slate-900">Responses</h2>
            <div className="mt-3 space-y-4">
              {success.map((r) => (
                <div key={r.status} className="overflow-hidden rounded-xl border border-slate-200">
                  <div className="flex items-baseline gap-3 border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                    <span className="rounded bg-emerald-50 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      {r.status}
                    </span>
                    <span className="text-sm text-slate-600">{r.description}</span>
                  </div>
                  {r.example ? (
                    <pre className="overflow-x-auto bg-slate-900 p-4 text-xs leading-relaxed text-slate-100">
                      <code>{r.example}</code>
                    </pre>
                  ) : null}
                </div>
              ))}
            </div>

            {errors.length ? (
              <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[520px] text-left text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {errors.map((r) => (
                      <tr key={r.status} className="align-top">
                        <td className="w-20 px-4 py-3">
                          <code className="font-mono text-sm font-medium text-slate-900">
                            {r.status}
                          </code>
                        </td>
                        <td className="px-4 py-3 leading-relaxed text-slate-600">
                          {r.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
            <p className="mt-3 text-sm text-slate-500">
              Every error is{" "}
              <code className="font-mono text-xs">application/problem+json</code> and carries a{" "}
              <code className="font-mono text-xs">code</code> you can branch on. The full catalogue
              is in{" "}
              <Link href="/docs/developers/api-errors" className="text-brand-600 hover:underline">
                error codes
              </Link>
              .
            </p>
          </section>
        </div>

        <div className="hidden xl:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <EndpointConsole op={op} base={base} />
          </div>
        </div>
      </div>
    </ApiRefShell>
  );
}
