const TONES: Record<string, string> = {
  GET: "bg-sky-50 text-sky-700 ring-sky-600/20",
  POST: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  PATCH: "bg-amber-50 text-amber-800 ring-amber-600/20",
  PUT: "bg-amber-50 text-amber-800 ring-amber-600/20",
  DELETE: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

/** DELETE is abbreviated in narrow nav rows, the way every API reference does it. */
const SHORT: Record<string, string> = { DELETE: "DEL", PATCH: "PATCH" };

export default function MethodBadge({
  method,
  short = false,
  className = "",
}: {
  method: string;
  short?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded px-1.5 py-0.5 font-mono text-[10px] font-bold uppercase leading-4 tracking-wide ring-1 ring-inset ${
        TONES[method] ?? "bg-slate-100 text-slate-600 ring-slate-500/20"
      } ${className}`}
    >
      {short ? (SHORT[method] ?? method) : method}
    </span>
  );
}
