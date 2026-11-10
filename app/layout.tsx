import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UtmForwarder from "@/components/UtmForwarder";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "CuspFlow: Dental Practice Management Software for Growing Clinics",
    template: "%s",
  },
  description:
    "CuspFlow is cloud dental practice management software: live waiting room, appointments, treatment plans, billing, lab cases, inventory and reporting in one system. Built for dental clinics in Asia, South America and Africa. Every feature on every plan, unlimited branches, 30-day free trial.",
  applicationName: "CuspFlow",
  keywords: [
    "dental practice management software",
    "dental clinic software",
    "dental software",
    "dental appointment scheduling",
    "dental billing software",
    "treatment planning software",
    "multi-branch dental practice",
    "cloud dental software",
    "dental clinic management system",
  ],
  authors: [{ name: "CuspFlow" }],
  alternates: { canonical: "https://cuspflow.co" },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "CuspFlow: Dental Practice Management Software for Growing Clinics",
    description:
      "Live waiting room, treatment plans, billing, lab cases and reporting in one system. Built for dental clinics in Asia, South America and Africa.",
    url: "https://cuspflow.co",
    siteName: "CuspFlow",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "CuspFlow dental practice management software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CuspFlow: Dental Practice Management Software",
    description:
      "Live waiting room, treatment plans, billing and reporting in one system, built for dental clinics in Asia, South America and Africa.",
    images: ["/og.png"],
  },
  metadataBase: new URL("https://cuspflow.co"),
  // Google Search Console ownership for the https://cuspflow.co/ property.
  // Verification is checked on an ongoing basis, not just once, so this tag has
  // to stay. Removing it un-verifies the property and we lose the search data.
  verification: {
    google: "tvzeWcLFQGjFOujcBXKtREfi4le5Bjwx_HsaosQX3E4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 font-sans">
        {children}
        <UtmForwarder />
      </body>
    </html>
  );
}
