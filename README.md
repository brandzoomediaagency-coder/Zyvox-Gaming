# ZyvoxGaming — Premium Amazon Affiliate Storefront (Gaming Niche)

A fast, modular, SEO/AEO/GEO-optimized Amazon affiliate storefront built with
**HTML5 + Tailwind CSS + Vanilla JS (ES modules)**. Dark gaming theme, glassmorphic
UI, structured data, and a compliance-first link layer.

> **Associate Tracking ID:** `zyvoxgaming-21` — injected into every outbound Amazon
> link automatically by [`js/affiliate.js`](js/affiliate.js). Change it in one place:
> [`js/config.js`](js/config.js).

---

## 1. Quick start (must be served over HTTP)

This project uses **ES modules** (`<script type="module">`). Browsers block module
loading from the `file://` protocol (CORS), so you **must** serve it over HTTP:

```bash
# Option A — Node (no install)
npx serve .

# Option B — Python 3
python3 -m http.server 8080

# Option C — VS Code "Live Server" extension → Open with Live Server
```

Then open `http://localhost:8080/` (or the port your server prints).
Opening `index.html` directly by double-clicking will **not** work.

---

## 2. File structure

```
.
├── index.html            # Homepage: hero, Trending / Top Rated / Bestsellers grids
├── product.html          # Product Detail Page (gallery, tabs, FAQ, JSON-LD)
├── css/
│   └── custom.css        # Glassmorphism, focus rings, scrollbar, motion (Tailwind covers the rest)
└── js/
    ├── tailwind.config.js # Shared Tailwind (Play CDN) design tokens
    ├── config.js          # Tracking ID, Amazon hosts, disclosure text — ALL config
    ├── util.js            # escapeHtml, star rating, SVG placeholders (no deps)
    ├── data.js            # Product catalog (PA-API-shaped placeholders, NO prices)
    ├── api.js             # PA-API 5.0 integration scaffold (price hydration)
    ├── affiliate.js       # Outbound link sanitization + tag injection (compliance)
    ├── ui.js              # Header/nav/search + homepage card rendering
    ├── product.js         # PDP: gallery, tabs, accordion, JSON-LD injection
    ├── app-home.js        # Homepage entry point
    └── app-product.js     # PDP entry point
```

---

## 3. Amazon policy compliance (built in)

| Requirement | How it's handled |
|---|---|
| **Tracking ID on every link** | `affiliate.js` rewrites every Amazon URL's `tag` param to `zyvoxgaming-21`, replacing any foreign tag. |
| **`rel="sponsored nofollow"` + `target="_blank"`** | Applied automatically to every outbound Amazon anchor (`CONFIG.LINK_REL`, with `noopener noreferrer` added for security). |
| **No hardcoded prices** | No price is stored in `data.js`. The UI shows a neutral placeholder until a live PA-API price is fetched. |
| **Prominent disclosure** | Disclosure bar at the top of every page + full Associates declaration in the footer. |

Author links three equivalent ways — all get sanitized + tagged at runtime:

```html
<a data-amazon="B0EXMPL001">Buy</a>                          <!-- bare ASIN -->
<a data-amazon="https://www.amazon.com/dp/B0EXMPL001">Buy</a> <!-- full URL -->
<a href="https://amzn.to/xxxx">Buy</a>                       <!-- shortener -->
```

You can also build a tagged URL programmatically:

```js
import { buildAffiliateUrl } from './js/affiliate.js';
buildAffiliateUrl('B0EXMPL001'); // → https://www.amazon.com/dp/B0EXMPL001?tag=zyvoxgaming-21
```

---

## 4. Wiring up PA-API 5.0 (live prices)

**Never put your AWS Secret Key in the browser.** PA-API requests are SigV4-signed
server-side. The flow is:

```
[Browser] → fetch → [Your backend /api/paapi] → SigV4 GetItems → [Amazon PA-API]
```

1. Stand up a backend endpoint (Node/serverless) that holds your Access Key,
   Secret Key, and Partner Tag (`zyvoxgaming-21`) and calls PA-API `GetItems`.
2. Set `PAAPI_PROXY_ENDPOINT` in [`js/api.js`](js/api.js) to that endpoint
   (e.g. `/api/paapi/getItems`).
3. Return JSON shaped as:
   ```json
   { "items": { "B0EXMPL001": { "price": "$129.99", "available": true, "prime": true } } }
   ```
4. `hydratePrices()` replaces every `[data-price-asin]` element with the live price.
   Until configured, it keeps the compliant `"See latest price on Amazon"` placeholder.

A minimal backend request shape is documented at the bottom of `js/api.js`.
Use the official **paapi5-nodejs-sdk** to do the signing.

> Add live `offers` (price + availability + URL) to the JSON-LD **server-side** at
> render time. The static markup intentionally omits `price` so you never ship a
> stale/fake number (Amazon policy + Google rich-result guidelines).

---

## 5. Adding / editing products

Edit [`js/data.js`](js/data.js). Each product mirrors PA-API fields. Replace the
demo `B0EXMPL0xx` ASINs with real ones and host real images at
`assets/<slug>.jpg` (referenced by JSON-LD and OG tags).

---

## 6. SEO / AEO / GEO features

- Semantic HTML5 landmarks (`header`, `nav`, `main`, `article`, `section`, `footer`).
- JSON-LD `@graph`: `Organization`, `WebSite` (+SearchAction) on the homepage;
  `WebPage`/`ItemPage`, `BreadcrumbList`, `Product` (+`aggregateRating`/`review`),
  and `FAQPage` on the PDP.
- Natural-language query headings (e.g. *"Why is the … the best gaming mouse in 2026?"*)
  for answer engines (Perplexity, Gemini, ChatGPT, Claude).
- `<dl>/<dt>/<dd>` spec lists — clean, machine-extractable key/value data.
- Canonical URLs, Open Graph + Twitter cards, `robots`, `theme-color`, lazy images.

---

## 7. Click tracking & analytics ([js/tracking.js](js/tracking.js))

Every outbound Amazon click fires an `affiliate_click` event so you can see which
products drive clicks toward your qualifying-sales threshold. It sends to every
channel that's available:

| Channel | How to enable |
|---|---|
| **Google Analytics 4** | Set `GA4_MEASUREMENT_ID: 'G-XXXXXXXXXX'` in `js/config.js` — gtag.js auto-loads and logs an `affiliate_click` event. |
| **Google Tag Manager** | If a `dataLayer` exists, each click is pushed to it (build a GTM trigger on `event = affiliate_click`). |
| **Your own code** | Listen for the DOM event: `document.addEventListener('affiliate:click', e => console.log(e.detail))`. |
| **First-party collector** | Set `TRACKING_ENDPOINT` to a URL; clicks are POSTed via `navigator.sendBeacon`. |

Each event carries: `link_type` (product / store), `asin`, `product_title`,
`product_category`, `list_name` (Trending / Top Rated / Bestsellers / PDP /
Related / Store), `destination`, `affiliate_tag`, `page_path`, `ts`.

**See it working now:** on `localhost`, open DevTools → Console, click any
"View on Amazon" / "Buy Now" / "Shop on Amazon" button → a `[affiliate:click]`
log with the full payload appears. (Set `TRACKING_DEBUG: true` to log in prod too.)

In GA4, mark `affiliate_click` as a **Key event** to track it as a conversion
proxy while you work toward the sales requirement.

---

## 8. Going to production

- **Replace the Tailwind Play CDN** with a compiled build (Tailwind CLI / PostCSS)
  to drop the runtime compiler and console warning. Reuse the `theme.extend` block
  from `js/tailwind.config.js` in your real config, then `tailwindcss -o css/tw.css --minify`.
- **Server-render the PDP per ASIN** (and add live `offers`) so crawlers get full
  content + price without executing JS. The client hydration here keeps `data.js`
  as the single source of truth in the meantime.
- **Set your domain**: update `SITE_URL` in `js/config.js` (fixes canonical/OG/JSON-LD),
  then regenerate `sitemap.xml` + `robots.txt`:
  ```bash
  node scripts/generate-sitemap.mjs
  ```
  (`sitemap.xml` and `robots.txt` are committed and already list every product;
  re-run the script whenever you add products or change the domain.)
- Add real `assets/<slug>.jpg` imagery (referenced by JSON-LD/OG) and submit the
  sitemap in Google Search Console.

---

_Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates.
As an Amazon Associate I earn from qualifying purchases._
