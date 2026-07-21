import type { TocEntry } from "@/lib/docs";

/**
 * In-page table of contents. Anchor ids match the rendered heading ids
 * (rehype-slug / github-slugger). Static links — no client JS needed.
 */
export default function TableOfContents({ toc }: { toc: TocEntry[] }) {
  if (toc.length < 2) return null;
  return (
    <nav aria-label="On this page" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        On this page
      </p>
      <ul className="space-y-1.5 border-l border-slate-200">
        {toc.map((h) => (
          <li key={h.id} className={h.depth === 3 ? "pl-6" : "pl-3"}>
            <a
              href={`#${h.id}`}
              className="block text-slate-500 hover:text-teal-600 leading-snug"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
