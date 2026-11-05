import type { ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import ApiRefSidebar from "./ApiRefSidebar";

/**
 * Two-column shell for the API reference: the endpoint list on the left, the
 * endpoint itself on the right. Separate from DocsShell because the reference
 * navigates by endpoint rather than by article, and because the endpoint page
 * puts its own console in the content column rather than a table of contents.
 */
export default function ApiRefShell({
  activeSlug,
  children,
}: {
  activeSlug?: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="pt-16 sm:pt-20 bg-white min-h-screen">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-8">
            <aside className="hidden lg:block py-10">
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 pr-2">
                <ApiRefSidebar activeSlug={activeSlug} />
              </div>
            </aside>
            <div className="py-10 min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
