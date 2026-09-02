import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "CuspFlow: Dental Practice Management Software",
    description:
      "Live waiting room, treatment plans, billing and reporting in one system, built for dental clinics in Asia, South America and Africa.",
  },
  metadataBase: new URL("https://cuspflow.co"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-slate-900 font-sans">{children}</body>
    </html>
  );
}
