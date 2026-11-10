"use client";

import { useEffect } from "react";

// Carries campaign attribution from the marketing site onto the app's signup
// page. Cold-email links land on cuspflow.co with utm_* params, but the signup
// CTAs point at app.cuspflow.co/signup, a different host, so without this the
// campaign is lost at the exact step we want to measure. The app stores what
// arrives on clinics.signup_attribution (dental-pms, provision_new_clinic).
// Ported from splitre-web's component of the same name.
//
// The params are remembered for the browser session, so a visitor who lands
// on the calculator, then browses to pricing, still carries them to signup.
// Rewriting happens at click time via one delegated listener, which covers
// every signup link on the site (Nav, CTAs, pricing cards, MDX content)
// without touching each one.

const KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ref"];
const STORAGE_KEY = "cuspflow_attribution";
const SIGNUP_HOST = "app.cuspflow.co";

function readFromUrl(): Record<string, string> {
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of KEYS) {
    const value = params.get(key);
    if (value) found[key] = value;
  }
  return found;
}

/** First-touch params for this browser session, for forms that post elsewhere (the demo form). */
export function currentAttribution(): Record<string, string> {
  return { ...readStored(), ...readFromUrl() };
}

function readStored(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function signupUrl(anchor: HTMLAnchorElement): URL | null {
  try {
    const url = new URL(anchor.href);
    return url.hostname === SIGNUP_HOST && url.pathname.startsWith("/signup") ? url : null;
  } catch {
    return null;
  }
}

// No-op until GA4 is added to this site. The app (app.cuspflow.co) will never
// run a GA tag, so once GA is here this is the last funnel step it sees; trial
// and paid attribution live in the app's own DB (clinics.signup_attribution).
function trackSignupClick(anchor: HTMLAnchorElement) {
  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  const plan = signupUrl(anchor)?.searchParams.get("plan");
  gtag("event", "sign_up_click", {
    cta_page: window.location.pathname,
    link_text: anchor.textContent?.trim().slice(0, 100),
    ...(plan ? { plan } : {}),
  });
}

function decorate(anchor: HTMLAnchorElement) {
  const url = signupUrl(anchor);
  if (!url) return;

  const attribution = { ...readStored(), ...readFromUrl() };
  let changed = false;
  for (const [key, value] of Object.entries(attribution)) {
    // Never overwrite params already on the link (e.g. ?plan=, or GA's _gl linker).
    if (!url.searchParams.has(key)) {
      url.searchParams.set(key, value);
      changed = true;
    }
  }
  if (changed) anchor.href = url.toString();
}

export default function UtmForwarder() {
  useEffect(() => {
    const fromUrl = readFromUrl();
    if (Object.keys(fromUrl).length > 0) {
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      } catch {
        // Storage blocked: the current page's own query string still works below.
      }
    }

    const onInteract = (event: Event) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || !signupUrl(anchor)) return;
      decorate(anchor);
      // Count actual activations only (left/keyboard click, middle click),
      // not the pointerdown/contextmenu passes that just decorate the href.
      const isMiddleClick = event.type === "auxclick" && (event as MouseEvent).button === 1;
      if (event.type === "click" || isMiddleClick) trackSignupClick(anchor);
    };

    // pointerdown/contextmenu cover open-in-new-tab and middle click;
    // click covers keyboard activation.
    const events = ["pointerdown", "click", "auxclick", "contextmenu"];
    for (const name of events) document.addEventListener(name, onInteract, true);
    return () => {
      for (const name of events) document.removeEventListener(name, onInteract, true);
    };
  }, []);

  return null;
}
