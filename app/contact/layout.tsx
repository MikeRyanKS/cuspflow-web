import type { Metadata } from "next";

// The contact page itself is a client component (it has an interactive form),
// so its metadata lives here in a route-segment layout.
export const metadata: Metadata = {
  title: "Contact & Demo | CuspFlow Dental Practice Management",
  description:
    "Book a live demo of CuspFlow or ask us anything. See the dental practice management platform running with your clinic's real workflow. No slides, no sales pressure.",
  alternates: { canonical: "https://cuspflow.co/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
