"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { articleHref } from "@/lib/docs-routes";
import type { DocSearchItem } from "@/lib/docs";

/**
 * Client-side search over the docs index. Words are AND-matched (not a
 * single exact phrase) across title, description and body, ranked
 * title > description > body — same approach as the in-app Help panel's
 * Quick Guides search, so the two surfaces behave consistently.
 *
 * Lives at the top of the main content column (via DocsShell) rather than
 * the narrow left sidebar, so it reads as a real, prominent search field
 * instead of a cramped afterthought.
 */
export default function DocsSearch({
  items,
  className = "",
}: {
  items: DocSearchItem[];
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) return [];

    const scored = items
      .map((item) => {
        const title = item.title.toLowerCase();
        const description = item.description.toLowerCase();
        const body = item.body.toLowerCase();

        let score = 0;
        for (const word of words) {
          if (title.includes(word)) score += 3;
          else if (description.includes(word)) score += 2;
          else if (body.includes(word)) score += 1;
          else return null; // every word must match somewhere (AND)
        }
        return { item, score };
      })
      .filter((r): r is { item: DocSearchItem; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    return scored.map((r) => r.item);
  }, [items, query]);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Delay so a click on a result registers before the list unmounts.
            window.setTimeout(() => setOpen(false), 150);
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQuery("");
              setOpen(false);
            }
          }}
          placeholder="Search the help center…"
          aria-label="Search documentation"
          className="w-full rounded-2xl border-2 border-slate-200 bg-white pl-12 pr-11 py-3.5 text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-brand-500/15 focus:border-brand-400 transition-colors"
        />
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full mt-2 z-20 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
          {results.length === 0 ? (
            <p className="px-4 py-4 text-sm text-slate-500">
              No results for &ldquo;{query.trim()}&rdquo;.
            </p>
          ) : (
            <ul className="max-h-96 overflow-y-auto py-2">
              {results.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={articleHref(item)}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setQuery("");
                      setOpen(false);
                    }}
                    className="block px-4 py-2.5 hover:bg-slate-50"
                  >
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
