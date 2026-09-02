/**
 * BrowserFrame — wraps a real app screenshot in a lightweight browser chrome so
 * marketing pages show the actual CuspFlow UI. Screenshots live in
 * /public/screenshots (WebP, ~1800px wide, captured from the running app).
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
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 bg-white ${className}`}
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={1800}
        height={1125}
        loading={priority ? "eager" : "lazy"}
        className="block w-full h-auto"
      />
    </div>
  );
}
