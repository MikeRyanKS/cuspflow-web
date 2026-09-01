/**
 * Responsive YouTube embed for docs articles. Accepts a full YouTube URL
 * (watch / youtu.be / embed / shorts) or a bare 11-char video id, and renders a
 * privacy-friendly, lazy-loaded 16:9 iframe. Renders nothing if the id can't be
 * parsed, so a malformed frontmatter value fails safe instead of breaking layout.
 */

/** Extract an 11-char YouTube video id from a URL or bare id, else null. */
export function youtubeId(input: string): string | null {
  const s = input.trim();
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/, // watch?v=ID
    /youtu\.be\/([A-Za-z0-9_-]{11})/, // youtu.be/ID
    /\/embed\/([A-Za-z0-9_-]{11})/, // /embed/ID
    /\/shorts\/([A-Za-z0-9_-]{11})/, // /shorts/ID
  ];
  for (const re of patterns) {
    const m = s.match(re);
    if (m) return m[1];
  }
  return null;
}

export default function VideoEmbed({ url, title }: { url: string; title?: string }) {
  const id = youtubeId(url);
  if (!id) return null;
  return (
    <div className="my-6 aspect-video w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
        title={title ?? "Tutorial video"}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
