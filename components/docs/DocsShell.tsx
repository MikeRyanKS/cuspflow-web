import type { ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import DocsSidebar from "@/components/docs/DocsSidebar";

/**
 * Shared three-column shell for every docs page: sticky left nav (built from
 * the docs loader), the article/content column, and an optional right rail
 * (table of contents). Sidebar collapses on small screens.
 */
export default function DocsShell({
  activeSlug,
  activeTutorials,
  aside,
  children,
}: {
  activeSlug?: string;
  activeTutorials?: boolean;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="pt-16 sm:pt-20 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] xl:grid-cols-[15rem_minmax(0,1fr)_14rem] lg:gap-8 xl:gap-10">
            {/* Left: persistent nav */}
            <aside className="hidden lg:block py-10">
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10">
                <DocsSidebar activeSlug={activeSlug} activeTutorials={activeTutorials} />
              </div>
            </aside>

            {/* Center: content */}
            <div className="py-10 min-w-0">{children}</div>

            {/* Right: table of contents (article pages only) */}
            {aside ? (
              <aside className="hidden xl:block py-10">
                <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10">
                  {aside}
                </div>
              </aside>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
