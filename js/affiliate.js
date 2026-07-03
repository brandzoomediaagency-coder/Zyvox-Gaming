/* =============================================================================
 * affiliate.js — Outbound link sanitization + Associate tag injection
 * -----------------------------------------------------------------------------
 * Responsibilities (Amazon Operating Agreement & FTC compliance):
 *   1. Rewrite every Amazon URL so it carries OUR tracking tag (zyvoxgaming-21),
 *      replacing any pre-existing/foreign tag.
 *   2. Force rel="sponsored nofollow noopener noreferrer" + target="_blank".
 *   3. Never trust author-written hrefs — sanitize at runtime AND offer a pure
 *      helper (buildAffiliateUrl) for programmatic link creation.
 * ========================================================================== */
import { CONFIG } from './config.js';

/** True if a hostname belongs to a known Amazon storefront/shortener. */
function isAmazonHost(hostname) {
  const host = hostname.toLowerCase();
  return CONFIG.AMAZON_HOSTS.some(
    (allowed) => host === allowed || host.endsWith('.' + allowed)
  );
}

/** True if a hostname is an Amazon short-link host (amzn.to / a.co / amzn.eu). */
function isShortenerHost(hostname) {
  const host = hostname.toLowerCase();
  return CONFIG.SHORTENER_HOSTS.some(
    (allowed) => host === allowed || host.endsWith('.' + allowed)
  );
}

/**
 * Pure helper: given any Amazon URL (or ASIN), return a canonical, tagged URL.
 * - Replaces/sets the `tag` query param with CONFIG.AFFILIATE_TAG.
 * - Leaves non-Amazon URLs untouched (returns them as-is).
 * - Accepts a bare ASIN (e.g. "B0EXAMPLE1") and builds a dp/ URL for it.
 *
 * @param {string} input  Full URL or a 10-char ASIN.
 * @param {string} [marketplace=CONFIG.MARKETPLACE_HOST] Host used when building from ASIN.
 * @returns {string} A safe, tagged URL.
 */
export function buildAffiliateUrl(input, marketplace = CONFIG.MARKETPLACE_HOST) {
  if (!input) return '#';

  // Bare ASIN shortcut (10 alphanumeric chars, typically starts with B0).
  if (/^[A-Z0-9]{10}$/i.test(input.trim())) {
    const url = new URL(`https://${marketplace}/dp/${input.trim().toUpperCase()}`);
    url.searchParams.set('tag', CONFIG.AFFILIATE_TAG);
    return url.toString();
  }

  let url;
  try {
    url = new URL(input); // absolute URLs only; relative/garbage falls through untouched
  } catch {
    return input; // not an absolute URL (e.g. a relative path) — return verbatim, do not crash
  }

  if (!isAmazonHost(url.hostname)) return url.toString(); // foreign domain, untouched

  // Short links carry their tag in Amazon's short-link record; an appended
  // ?tag= is discarded on the redirect, so DON'T mutate it — return untouched.
  // sanitizeAnchor still enforces rel/target. Expand server-side to re-tag.
  if (isShortenerHost(url.hostname)) return url.toString();

  // Full storefront URL: force OUR tag, stripping any inherited associate tag.
  url.searchParams.set('tag', CONFIG.AFFILIATE_TAG);
  return url.toString();
}

/**
 * Apply compliance attributes + tag to a single anchor element.
 * Idempotent — safe to call repeatedly.
 * @param {HTMLAnchorElement} a
 */
export function sanitizeAnchor(a) {
  if (!(a instanceof HTMLAnchorElement)) return;
  const raw = a.getAttribute('href') || a.dataset.amazon || '';
  let href = raw;

  // data-amazon may hold a bare ASIN or full URL; it wins over a placeholder href.
  if (a.dataset.amazon) href = buildAffiliateUrl(a.dataset.amazon);
  else href = buildAffiliateUrl(raw);

  // Only enforce sponsored attributes on links that actually point at Amazon.
  let pointsToAmazon = false;
  try {
    pointsToAmazon = isAmazonHost(new URL(href, CONFIG.SITE_URL).hostname);
  } catch {
    pointsToAmazon = false;
  }

  if (pointsToAmazon) {
    a.setAttribute('href', href);
    a.setAttribute('rel', CONFIG.LINK_REL);
    a.setAttribute('target', CONFIG.LINK_TARGET);
    a.dataset.affiliate = 'true';
  }
}

/**
 * Scan a root node and sanitize every outbound Amazon anchor.
 * Targets: explicit [data-amazon] links, and any <a> whose href looks Amazon-y.
 * @param {ParentNode} [root=document]
 */
export function sanitizeAll(root = document) {
  const selector = 'a[data-amazon], a[href*="amazon."], a[href*="amzn."], a[href*="a.co/"]';
  root.querySelectorAll(selector).forEach(sanitizeAnchor);
}

/* Auto-run on load, then re-run whenever new product cards are injected.
 * ui.js / product.js dispatch a 'content:rendered' event after DOM updates. */
function boot() {
  sanitizeAll(document);
  document.addEventListener('content:rendered', (e) => {
    sanitizeAll(e.detail?.root || document);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
