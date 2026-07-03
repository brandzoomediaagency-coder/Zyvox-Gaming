/* =============================================================================
 * api.js — Amazon Product Advertising API (PA-API 5.0) integration scaffold
 * -----------------------------------------------------------------------------
 * WHY THIS IS A PLACEHOLDER (read before wiring up live data):
 *
 *   PA-API 5.0 requests are SigV4-signed with your AWS Secret Key. That secret
 *   MUST NEVER ship to the browser. Therefore the correct architecture is:
 *
 *       [Browser]  --fetch-->  [Your backend /api/paapi]  --SigV4-->  [PA-API]
 *
 *   This module talks ONLY to YOUR backend endpoint. The backend holds the
 *   Access Key / Secret Key / Partner Tag and performs the signed GetItems call.
 *   See README.md → "Wiring up PA-API 5.0" for a Node.js endpoint example.
 *
 * Compliance: prices are fetched live and never persisted/cached client-side
 * beyond the current page session. Always display the Amazon price as-returned.
 * ========================================================================== */
import { CONFIG } from './config.js';

/* Point this at your own signed backend. When unset/unreachable, the UI keeps
 * showing CONFIG.PRICE_PLACEHOLDER — a fully compliant fallback. */
const PAAPI_PROXY_ENDPOINT = ''; // e.g. '/api/paapi/getItems'

/**
 * Fetch live item data (price, availability, prime, live rating) for ASINs.
 * Returns a map keyed by ASIN, or an empty object if no proxy is configured.
 *
 * @param {string[]} asins
 * @returns {Promise<Record<string, {price?:string, available?:boolean, prime?:boolean}>>}
 */
export async function fetchLiveItems(asins = []) {
  if (!PAAPI_PROXY_ENDPOINT || asins.length === 0) return {};
  try {
    const res = await fetch(PAAPI_PROXY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ asins, partnerTag: CONFIG.AFFILIATE_TAG }),
    });
    if (!res.ok) throw new Error(`PA-API proxy responded ${res.status}`);
    const json = await res.json();
    // Expected backend shape: { items: { [asin]: { price, available, prime } } }
    return json.items || {};
  } catch (err) {
    console.warn('[api] Live PA-API fetch failed; using compliant placeholder.', err);
    return {};
  }
}

/**
 * Hydrate every element that declares data-price-asin with its live price.
 * Falls back to CONFIG.PRICE_PLACEHOLDER when no live data is available.
 *
 * Markup contract:  <span data-price-asin="B0EXMPL001">See latest price on Amazon</span>
 *
 * @param {ParentNode} [root=document]
 */
export async function hydratePrices(root = document) {
  const nodes = Array.from(root.querySelectorAll('[data-price-asin]'));
  if (nodes.length === 0) return;

  const asins = [...new Set(nodes.map((n) => n.dataset.priceAsin).filter(Boolean))];
  const live = await fetchLiveItems(asins);

  nodes.forEach((node) => {
    const data = live[node.dataset.priceAsin];
    if (data?.price) {
      node.textContent = data.price;
      node.dataset.live = 'true';
    } else {
      node.textContent = CONFIG.PRICE_PLACEHOLDER;
      node.dataset.live = 'false';
    }
  });
}

/* ---------------------------------------------------------------------------
 * REFERENCE: shape of a PA-API 5.0 GetItems request your backend should send.
 * (Documented here so front-end and back-end stay in sync. Not executed.)
 *
 *   POST https://webservices.amazon.<tld>/paapi5/getitems
 *   Service:   ProductAdvertisingAPI
 *   Operation: GetItems
 *   Payload:   {
 *     "PartnerTag":  "zyvoxgaming-21",
 *     "PartnerType": "Associates",
 *     "Marketplace": "www.amazon.com",
 *     "ItemIds":     ["B0EXMPL001", ...],
 *     "Resources": [
 *       "ItemInfo.Title",
 *       "Images.Primary.Large",
 *       "Offers.Listings.Price",
 *       "Offers.Listings.Availability.Message",
 *       "Offers.Listings.DeliveryInfo.IsPrimeEligible",
 *       "CustomerReviews.StarRating",
 *       "CustomerReviews.Count"
 *     ]
 *   }
 * ------------------------------------------------------------------------- */
