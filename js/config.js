/* =============================================================================
 * config.js — Single source of truth for site-wide configuration
 * -----------------------------------------------------------------------------
 * Keep ALL tunable values here so the rest of the codebase stays declarative.
 * No prices live in client-side code (Amazon Operating Agreement compliance).
 * ========================================================================== */
export const CONFIG = Object.freeze({
  /* ----- Amazon Associates ----- */
  // Your Associate Tracking ID. Every outbound Amazon URL is rewritten to carry
  // this tag by js/affiliate.js. Change in ONE place only.
  AFFILIATE_TAG: 'zyvoxgaming-21',

  // Full storefront hosts we rewrite + tag via the `tag` query param.
  AMAZON_HOSTS: [
    'amazon.com', 'www.amazon.com',
    'amazon.co.uk', 'amazon.de', 'amazon.ca', 'amazon.in',
    'amazon.com.au', 'amazon.co.jp', 'amazon.fr', 'amazon.it', 'amazon.es',
    'amzn.to', 'amzn.eu', 'a.co',
  ],

  // Amazon short-link hosts. Their associate tag is baked into the short-link
  // record at creation time and an appended ?tag= is DROPPED on the 301 redirect,
  // so we must NOT query-tag these — we only enforce rel/target and leave the URL
  // intact. Generate short links under your own account, or expand them
  // server-side before tagging. (Subset of AMAZON_HOSTS.)
  SHORTENER_HOSTS: ['amzn.to', 'amzn.eu', 'a.co'],

  // rel + target applied to every outbound affiliate link (FTC + Amazon policy).
  LINK_REL: 'sponsored nofollow noopener noreferrer',
  LINK_TARGET: '_blank',

  // The Amazon marketplace your product links point to. Your tag `zyvoxgaming-21`
  // and dashboard show India, so this defaults to www.amazon.in. A tag only earns
  // on ITS marketplace — change this to match your account (www.amazon.com = US
  // "-20" tags, www.amazon.co.uk = UK, etc.).
  MARKETPLACE_HOST: 'www.amazon.in',

  // Your Amazon storefront / homepage affiliate link (SiteStripe "Get Link").
  // Powers every "Shop on Amazon" button AND is the fallback for any product
  // that doesn't have its own affiliate link yet — so every click still opens
  // amazon.in with your tag and earns on any purchase within the 24h window.
  AMAZON_STORE_URL: 'https://www.amazon.in?&linkCode=ll2&tag=zyvoxgaming-21&linkId=7524d1c616a40c939688d8287877cad5&ref_=as_li_ss_tl',

  /* ----- Analytics / click tracking (js/tracking.js) ----- */
  // Paste your GA4 Measurement ID (e.g. 'G-XXXXXXXXXX') to auto-load gtag.js and
  // record an `affiliate_click` event on every outbound Amazon click. Leave ''
  // to skip GA4 — clicks still fire a DOM event + (on localhost) a console log.
  GA4_MEASUREMENT_ID: 'G-HCHEPW7H8Z',
  // Optional first-party collector URL. Clicks are POSTed via navigator.sendBeacon.
  TRACKING_ENDPOINT: '',
  // Log every click to the console. Auto-enabled on localhost regardless.
  TRACKING_DEBUG: false,

  // CueLinks auto-affiliate channel ID (js/cuelinks.js). '' to disable.
  // NOTE: CueLinks rewrites outbound links — exclude amazon.in / amzn.to in your
  // CueLinks dashboard if you want to keep DIRECT Amazon commission on your tag.
  CUELINKS_CHANNEL_ID: '236924',

  /* ----- Brand ----- */
  SITE_NAME: 'ZyvoxGaming',
  SITE_TAGLINE: 'Pro-Tested Gaming Gear, Curated For 2026',
  SITE_URL: 'https://zyvoxgamer.shop', // replace with your live domain

  /* ----- Pricing policy -----
   * Prices are NEVER hardcoded. They must be pulled live from the Amazon
   * Product Advertising API (PA-API 5.0) at render time, server-side.
   * Until that is wired up, the UI shows this neutral, compliant label. */
  PRICE_PLACEHOLDER: 'See latest price on Amazon',

  /* Mandatory Amazon Associates disclosure text (do not alter the core phrase). */
  ASSOCIATES_DISCLOSURE:
    'As an Amazon Associate I earn from qualifying purchases.',
});
