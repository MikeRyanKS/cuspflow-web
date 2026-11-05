import Link from "next/link";
import { getGroups } from "@/lib/apiSpec";
import MethodBadge from "./MethodBadge";

/**
 * Endpoint navigation, one row per operation with its verb, grouped by
 * resource. Built entirely from the generated spec via getGroups(), so a new
 * endpoint appears here the moment the spec is regenerated and copied in.
 */
export default function ApiRefSidebar({ activeSlug }: { activeSlug?: string }) {
  const groups = getGroups();

  return (
    <nav aria-label="API reference" className="text-sm">
      <Link
        href="/docs/api-reference"
        aria-current={activeSlug ? undefined : "page"}
        className={
          activeSlug
            ? "block px-3 py-2 font-semibold text-slate-900 hover:text-brand-600"
            : "block px-3 py-2 font-semibold text-brand-700"
        }
      >
        API Reference
      </Link>
      <Link
        href="/docs/developers/api-overview"
        className="block px-3 py-1.5 text-slate-500 hover:text-brand-600"
      >
        ← Developer guides
      </Link>

      <ul className="mt-4 space-y-5">
        {groups.map((g) => (
          <li key={g.tag}>
            <p className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              {g.title}
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {g.operations.map((op) => {
                const active = op.slug === activeSlug;
                return (
                  <li key={op.slug}>
                    <Link
                      href={`/docs/api-reference/${op.slug}`}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between gap-2 rounded-lg px-3 py-1.5 ${
                        active
                          ? "bg-brand-50 font-medium text-brand-700"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <span className="min-w-0 truncate">{op.summary}</span>
                      <MethodBadge method={op.method} short />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}
