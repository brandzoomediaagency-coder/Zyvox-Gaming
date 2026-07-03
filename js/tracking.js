/* =============================================================================
 * tracking.js — Outbound affiliate-click tracking
 * -----------------------------------------------------------------------------
 * Fires an `affiliate_click` event whenever a visitor clicks an outbound Amazon
 * link (product CTA or "Shop on Amazon" store link). Sends to every channel
 * that's available, so you can see WHICH products drive clicks toward your
 * qualifying-sales threshold:
 *
 *   1. Google Analytics 4  (window.gtag)          — recommended
 *   2. Google Tag Manager  (window.dataLayer)     — if you use GTM
 *   3. A DOM CustomEvent   ('affiliate:click')    — hook your own logic
 *   4. A first-party URL    (navigator.sendBeacon) — optional, CONFIG.TRACKING_ENDPOINT
 *
 * Uses ONE delegated listener, so it covers dynamically-rendered cards, the PDP,
 * related products, and store buttons — including middle-click / open-in-new-tab.
 *
 * Detection: affiliate.js stamps sanitized Amazon anchors with data-affiliate="true";
 * we delegate off that, then read data-track-* attributes for rich metadata.
 * ========================================================================== */
import { CONFIG } from './config.js';

const LOCAL_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0', ''];
const DEBUG = CONFIG.TRACKING_DEBUG || LOCAL_HOSTS.includes(location.hostname);

/** Lazy-load GA4 (gtag.js) if a Measurement ID is configured. Safe to call once. */
export function initAnalytics() {
  const id = CONFIG.GA4_MEASUREMENT_ID;
  if (!id || window.gtag) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true });
}

/** Build the analytics payload from a clicked affiliate anchor. */
function buildPayload(a) {
  const isStore = a.hasAttribute('data-amazon-store');
  return {
    event: 'affiliate_click',
    link_type: isStore ? 'store' : 'product',
    asin: a.dataset.trackAsin || null,
    slug: a.dataset.trackSlug || null,
    product_title: a.dataset.trackTitle || null,
    product_category: a.dataset.trackCategory || null,
    list_name: a.dataset.trackList || (isStore ? 'Store' : null),
    destination: a.href,
    affiliate_tag: CONFIG.AFFILIATE_TAG,
    page_path: location.pathname + location.search,
    ts: Date.now(),
  };
}

/** Dispatch one click to every configured channel. */
function emit(payload) {
  // 1. GA4 — recorded as a custom `affiliate_click` event.
  if (typeof window.gtag === 'function') {
    window.gtag('event', payload.event, payload);
  }
  // 2. GTM — pushed onto the dataLayer for your tags/triggers.
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ ...payload });
  }
  // 3. Generic DOM event — attach your own listener:
  //    document.addEventListener('affiliate:click', (e) => { ... e.detail ... })
  document.dispatchEvent(new CustomEvent('affiliate:click', { detail: payload }));
  // 4. Optional first-party collector (non-blocking, survives the tab switch).
  if (CONFIG.TRACKING_ENDPOINT && navigator.sendBeacon) {
    try {
      navigator.sendBeacon(
        CONFIG.TRACKING_ENDPOINT,
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );
    } catch { /* never block navigation on a tracking failure */ }
  }
  if (DEBUG) console.debug('[affiliate:click]', payload);
}

function handle(e) {
  const a = e.target?.closest?.('a[data-affiliate="true"]');
  if (a) emit(buildPayload(a));
}

let bound = false;
/** Attach the single delegated click listener (idempotent). */
export function initClickTracking() {
  if (bound) return;
  bound = true;
  // capture phase so we still fire if something calls stopPropagation();
  // links open in a new tab (target=_blank) so the beacon/event has time to send.
  document.addEventListener('click', handle, true);
  document.addEventListener('auxclick', (e) => { if (e.button === 1) handle(e); }, true);
}

/** One-call bootstrap used by the page entry points. */
export function initTracking() {
  initAnalytics();
  initClickTracking();
}
