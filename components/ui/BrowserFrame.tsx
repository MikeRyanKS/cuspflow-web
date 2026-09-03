"use client";

import { useEffect, useState } from "react";
import { X, Expand } from "lucide-react";

/**
 * BrowserFrame — wraps a real app screenshot in a lightweight browser chrome so
 * marketing pages show the actual CuspFlow UI. Screenshots live in
 * /public/screenshots (WebP, ~1800px wide, captured from the running app).
 *
 * Clicking the screenshot opens a full-screen lightbox at full image quality.
 * Every screenshot on the site renders through this component, so the
 * click-to-expand behaviour is site-wide by construction.
 */
export default function BrowserFrame({
  src,
  alt,
  url = "app.cuspflow.co",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  url?: string;
  priority?: boolean;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  // Close on Escape, and lock body scroll while the lightbox is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      <div
        className={`group rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white ${className}`}
      >
        <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-3 border-b border-slate-200">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-400 font-mono truncate">
            {url}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`Expand screenshot: ${alt}`}
          className="relative block w-full cursor-zoom-in"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            width={1800}
            height={1125}
            loading={priority ? "eager" : "lazy"}
            className="block w-full h-auto"
          />
          <span className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-lg bg-slate-900/60 px-2 py-1 text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Expand size={13} /> Click to expand
          </span>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            onClick={(e) => e.stopPropagation()}
            className="max-w-full max-h-full w-auto h-auto rounded-lg shadow-2xl cursor-default"
          />
        </div>
      )}
    </>
  );
}
