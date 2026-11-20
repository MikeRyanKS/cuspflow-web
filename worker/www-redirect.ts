/**
 * www.cuspflow.co: a Worker whose whole job is a 301 to the apex.
 *
 * ## Why this exists at all
 *
 * `www.cuspflow.co` had no DNS record of any kind, so it did not resolve. A
 * visitor who typed the www form, or followed a link or a business card that
 * carried it, got a DNS failure, which reads as "this company is gone" rather
 * than "wrong address". Binding this Worker to `www.cuspflow.co` as a custom
 * domain is what creates the proxied record and the certificate, so the
 * deployment is the fix; the four lines of logic are almost incidental.
 *
 * ## Why a redirect rather than serving the site on both hosts
 *
 * Every canonical tag, the sitemap, the OG urls and `robots.txt` name the
 * apex. Serving the same bytes on two hostnames is duplicate content and
 * splits whatever authority the domain has. 301 rather than 302 because the
 * www form is not coming back as a site of its own.
 *
 * ## Why a SEPARATE Worker, and not three lines in `worker/index.ts`
 *
 * That was the first attempt, and it does not work. Workers Assets serves any
 * request that matches a built file BEFORE the Worker runs, so a host check
 * inside the main Worker catches only the paths that miss: `www.cuspflow.co/`
 * and `/pricing` would have gone on serving the site, while `/typo` redirected.
 * Verified locally against `wrangler dev`, not reasoned about.
 *
 * The config-level fix for that is `run_worker_first = true` on the assets
 * binding, which routes EVERY request on the apex through the Worker as well,
 * including every `/_next/` chunk and image. That turns free static asset
 * requests into billed Worker invocations across the whole site, to fix a
 * hostname that should see almost no traffic. A second Worker on its own
 * custom domain is invoked only by the www traffic it exists to redirect, and
 * leaves the apex's asset serving exactly as it is.
 */
export default {
  fetch(request: Request): Response {
    const target = new URL(request.url);
    target.protocol = "https:";
    target.hostname = "cuspflow.co";
    target.port = "";
    // Path and query ride along, so a shared deep link keeps working: the
    // whole point is that the visitor lands where they meant to, not on a
    // homepage they then have to navigate from.
    return Response.redirect(target.toString(), 301);
  },
};
