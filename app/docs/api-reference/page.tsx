import type { Metadata } from "next";
import Link from "next/link";
import ApiRefShell from "@/components/apiref/ApiRefShell";
import MethodBadge from "@/components/apiref/MethodBadge";
import Breadcrumbs from "@/components/docs/Breadcrumbs";
import { apiVersion, baseUrl, getGroups, getOperations, specModified } from "@/lib/apiSpec";
import { SITE_URL } from "@/lib/docs-routes";

const DESCRIPTION =
  "Every endpoint in the CuspFlow REST API for dental practice management: patients, " +
  "appointments, treatment plans, billing, inventory and bulk import. Parameters, scopes, " +
  "example responses and a console you can run requests from.";

export const metadata: Metadata = {
  title: "API Reference | CuspFlow",
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/docs/api-reference` },
  openGraph: {
    title: "CuspFlow REST API Reference",
    description: DESCRIPTION,
    url: `${SITE_URL}/docs/api-reference`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuspFlow REST API Reference",
    description: DESCRIPTION,
  },
};

export default function ApiReferenceIndex() {
  const groups = getGroups();
  const total = getOperations().length;

  // One ItemList naming all 79 endpoints, so a crawler that reads only this
  // page still comes away with the whole surface and a URL for each.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebAPI",
        name: `CuspFlow REST API v${apiVersion()}`,
        description: DESCRIPTION,
        documentation: `${SITE_URL}/docs/api-reference`,
        termsOfService: `${SITE_URL}/terms`,
        provider: { "@type": "Organization", name: "CuspFlow" },
      },
      {
        "@type": "ItemList",
        name: "CuspFlow REST API endpoints",
        numberOfItems: total,
        itemListElement: getOperations().map((op, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${op.method} ${op.path}`,
          url: `${SITE_URL}/docs/api-reference/${op.slug}`,
        })),
      },
    ],
  };

  return (
    <ApiRefShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: "Documentation", href: "/docs" },
          { label: "API Reference" },
        ]}
      />
      <header className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
          CuspFlow API v{apiVersion()}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">API Reference</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
          {total} endpoints in {groups.length} sections. Every page carries the parameters, the
          scope the call needs, an example response, and a console that runs the request against
          your own clinic with your own key.
        </p>
        <p className="mt-4 overflow-x-auto rounded-xl bg-slate-900 px-4 py-3 font-mono text-sm text-slate-100">
          {baseUrl()}
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Contract last changed{" "}
          <time dateTime={specModified().toISOString()}>
            {specModified().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
          . New here? Start with the{" "}
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
