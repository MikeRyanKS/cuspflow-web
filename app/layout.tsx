import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CuspFlow — Dental Practice Management Software",
  description:
    "CuspFlow gives every dentist, nurse, and receptionist a real-time view of every patient — from check-in to payment. Built for modern dental clinics.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "CuspFlow — Dental Practice Management Software",
    description:
      "Real-time patient flow, treatment plans, billing, and lab cases — all in one place.",
    url: "https://cuspflow.co",
    siteName: "CuspFlow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CuspFlow — Dental Practice Management Software",
    description: "Real-time patient flow, treatment plans, billing, and lab cases — all in one place.",
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
