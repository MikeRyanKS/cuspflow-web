import Link from "next/link";
import { getArticlesByCategory } from "@/lib/docs";
import { articleHref, categoryHref } from "@/lib/docs-routes";

/**
 * Persistent docs navigation, built from the same category/order data as the
 * index (getArticlesByCategory). Rendered on every docs page via the docs
 * layout. `activeSlug` highlights the current article.
 */
export default function DocsSidebar({
  activeSlug,
  activeTutorials,
}: {
  activeSlug?: string;
  activeTutorials?: boolean;
}) {
  const groups = getArticlesByCategory();

  return (
    <nav aria-label="Documentation" className="text-sm">
      <Link
        href="/docs"
        className="block px-3 py-2 font-semibold text-slate-900 hover:text-brand-600"
      >
        Documentation home
      </Link>
      <Link
        href="/docs/tutorials"
        aria-current={activeTutorials ? "page" : undefined}
        className={
          activeTutorials
            ? "flex items-center gap-2 rounded-lg px-3 py-1.5 font-medium bg-brand-50 text-brand-700"
            : "flex items-center gap-2 rounded-lg px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-600"
        }
      >
        <span aria-hidden="true">▶</span> Video Tutorials
      </Link>
      <ul className="mt-2 space-y-6">
        {groups.map(({ category, articles }) => (
          <li key={category.id}>
            <Link
              href={categoryHref(category.id)}
              className="block px-3 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-brand-600"
            >
              {category.title}
            </Link>
            <ul className="mt-2 space-y-0.5">
              {articles.map((a) => {
                const active = a.slug === activeSlug;
                return (
                  <li key={a.slug}>
                    <Link
                      href={articleHref(a)}
                      aria-current={active ? "page" : undefined}
                      className={
                        active
                          ? "block rounded-lg px-3 py-1.5 font-medium bg-brand-50 text-brand-700"
                          : "block rounded-lg px-3 py-1.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }
                    >
                      {a.title}
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
