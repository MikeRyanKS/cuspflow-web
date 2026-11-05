import type { Metadata } from "next";
import Link from "next/link";
import ApiRefShell from "@/components/apiref/ApiRefShell";
import MethodBadge from "@/components/apiref/MethodBadge";
import { apiVersion, baseUrl, getGroups, getOperations } from "@/lib/apiSpec";

export const metadata: Metadata = {
  title: "API Reference | CuspFlow",
  description:
    "Every endpoint in the CuspFlow REST API, with parameters, scopes, example responses and a console you can run requests from.",
  alternates: { canonical: "https://cuspflow.co/docs/api-reference" },
};

export default function ApiReferenceIndex() {
  const groups = getGroups();
  const total = getOperations().length;

  return (
    <ApiRefShell>
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          CuspFlow API v{apiVersion()}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">API Reference</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
          {total} endpoints across {groups.length} resources. Every page carries the parameters, the
          scope the call needs, an example response, and a console that runs the request against
          your own clinic with your own key.
        </p>
        <p className="mt-4 overflow-x-auto rounded-xl bg-slate-900 px-4 py-3 font-mono text-sm text-slate-100">
          {baseUrl()}
        </p>
        <p className="mt-3 text-sm text-slate-500">
          New here? Start with the{" "}
          <Link href="/docs/developers/api-overview" className="text-brand-600 hover:underline">
            developer guides
          </Link>{" "}
          for authentication, pagination and error handling, or download the{" "}
          <a href="/api/openapi.json" className="text-brand-600 hover:underline">
            OpenAPI 3.1 description
          </a>
          .
        </p>
      </header>

      <div className="space-y-10">
        {groups.map((g) => (
          <section key={g.tag}>
            <h2 className="text-lg font-semibold text-slate-900">{g.title}</h2>
            <ul className="mt-3 divide-y divide-slate-100 rounded-xl border border-slate-200">
              {g.operations.map((op) => (
                <li key={op.slug}>
                  <Link
                    href={`/docs/api-reference/${op.slug}`}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-3 hover:bg-slate-50"
                  >
                    <MethodBadge method={op.method} />
                    <span className="font-medium text-slate-900">{op.summary}</span>
                    <code className="font-mono text-xs text-slate-500">{op.path}</code>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ApiRefShell>
  );
}
