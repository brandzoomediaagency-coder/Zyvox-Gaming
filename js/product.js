/* =============================================================================
 * product.js — Product Detail Page (PDP) controller
 * -----------------------------------------------------------------------------
 *   • Hydrates the semantic PDP skeleton from data.js for the active ?slug=.
 *   • Wires interactivity: image gallery thumbnail switching, tab toggles,
 *     and the FAQ accordion (all keyboard-accessible).
 *   • (Re)injects JSON-LD structured data (@graph: WebPage/ItemPage, Product,
 *     BreadcrumbList, FAQPage) for the active product.
 *
 * SEO note: product.html ships STATIC, crawlable content + JSON-LD for the
 * featured product as a no-JS fallback. In production, server-render this page
 * per ASIN. This client hydration keeps a single source of truth in data.js.
 * ========================================================================== */
import { CONFIG } from './config.js';
import { getProductBySlug, PRODUCTS, getProductImages, getDetailUrl, getPrimaryImageUrl } from './data.js';
import { renderProductCard } from './ui.js';
import { escapeHtml, formatCount, starsHtml, getQueryParam } from './util.js';

const FEATURED_SLUG = PRODUCTS[0]?.slug || ''; // default PDP = first catalog product

/* Map category → natural singular for human-readable, AEO-friendly headings. */
const CATEGORY_SINGULAR = {
  'Gaming Mice': 'gaming mouse',
  Keyboards: 'gaming keyboard',
  Headsets: 'gaming headset',
  Monitors: 'gaming monitor',
  Chairs: 'gaming chair',
  Controllers: 'controller',
  'Graphics Cards': 'gaming GPU',
  Storage: 'gaming SSD',
  Mousepads: 'gaming mousepad',
  Webcams: 'streaming webcam',
  Microphones: 'USB microphone',
  'Streaming Gear': 'streaming accessory',
};

/** Short product name without the trailing parenthetical spec blurb. */
function shortName(product) {
  return product.title.split('(')[0].trim();
}

/** Natural-language query phrase used as the review H2 (AEO/GEO tuning). */
function reviewQuestion(product) {
  const noun = CATEGORY_SINGULAR[product.category] || product.category.toLowerCase();
  return `Why is the ${shortName(product)} the best ${noun} in 2026?`;
}

/* ----- Hydration helpers -------------------------------------------------- */
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function buildBullets(product) {
  return product.bullets
    .map((b) => `<li class="flex gap-2"><span class="mt-1 text-orange" aria-hidden="true">▸</span><span>${escapeHtml(b)}</span></li>`)
    .join('');
}

/* Definition list = ideal for AI/answer-engine extraction (AEO/GEO). */
function buildSpecsDl(product) {
  return Object.entries(product.specs)
    .map(
      ([k, v]) => `
      <div class="flex items-start justify-between gap-4 border-b border-steel/30 py-3">
        <dt class="text-sm font-medium text-slate-400">${escapeHtml(k)}</dt>
        <dd class="text-right text-sm font-semibold text-slate-100">${escapeHtml(v)}</dd>
      </div>`
    )
    .join('');
}

function buildReview(product) {
  const r = product.review;
  const paras = r.paragraphs.map((p) => `<p class="leading-relaxed text-slate-300">${escapeHtml(p)}</p>`).join('');
  const pros = (r.pros || []).map((p) => `<li class="flex gap-2"><span class="text-green-400" aria-hidden="true">＋</span><span>${escapeHtml(p)}</span></li>`).join('');
  const cons = (r.cons || []).map((c) => `<li class="flex gap-2"><span class="text-rose-400" aria-hidden="true">－</span><span>${escapeHtml(c)}</span></li>`).join('');
  const prosCons = (pros || cons) ? `
    <div class="mt-6 grid gap-4 sm:grid-cols-2">
      <div class="rounded-xl border border-steel/40 bg-ink/40 p-4">
        <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-green-400">What we liked</h3>
        <ul class="space-y-1.5 text-sm text-slate-300">${pros}</ul>
      </div>
      <div class="rounded-xl border border-steel/40 bg-ink/40 p-4">
        <h3 class="mb-2 text-sm font-bold uppercase tracking-wide text-rose-400">Trade-offs</h3>
        <ul class="space-y-1.5 text-sm text-slate-300">${cons}</ul>
      </div>
    </div>` : '';
  return `
    <h2 class="font-display text-xl font-bold text-white sm:text-2xl">${escapeHtml(reviewQuestion(product))}</h2>
    <p class="mt-4 rounded-xl border border-orange/30 bg-orange/5 p-4 text-base font-medium leading-relaxed text-slate-100">
      ${escapeHtml(r.summary)}
    </p>
    <div class="mt-5 space-y-4">${paras}</div>${prosCons}`;
}

function buildFaq(product) {
  return product.faq
    .map(
      (item, i) => `
    <div class="faq-item border-b border-steel/30">
      <h3>
        <button type="button" class="faq-trigger flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded="false" aria-controls="faq-panel-${i}" id="faq-trigger-${i}">
          <span class="text-base font-semibold text-slate-100">${escapeHtml(item.q)}</span>
          <svg class="faq-chevron h-5 w-5 shrink-0 text-orange transition-transform duration-300" viewBox="0 0 20 20" aria-hidden="true">
            <path fill="currentColor" d="M5.5 7.5L10 12l4.5-4.5z"/>
          </svg>
        </button>
      </h3>
      <div id="faq-panel-${i}" role="region" aria-labelledby="faq-trigger-${i}" class="faq-panel hidden pb-4">
        <p class="leading-relaxed text-slate-300">${escapeHtml(item.a)}</p>
      </div>
    </div>`
    )
    .join('');
}

function buildThumbs(product) {
  const { thumbs } = getProductImages(product);
  return thumbs
    .map(
      (t, i) => `
    <button type="button" class="gallery-thumb overflow-hidden rounded-lg border-2 transition ${i === 0 ? 'border-orange' : 'border-steel/40 hover:border-slate-400'}"
            data-index="${i}" data-src="${t.src}" aria-label="${escapeHtml(t.label)}" aria-current="${i === 0 ? 'true' : 'false'}">
      <img src="${t.src}" alt="${escapeHtml(t.label)}" loading="lazy" decoding="async" class="aspect-square h-full w-full object-cover" />
    </button>`
    )
    .join('');
}

/* ----- Interactivity ------------------------------------------------------ */
function setupGallery() {
  const main = document.getElementById('gallery-main');
  const thumbs = Array.from(document.querySelectorAll('.gallery-thumb'));
  if (!main || thumbs.length === 0) return;

  const select = (btn) => {
    main.src = btn.dataset.src;
    main.classList.remove('opacity-0');
    thumbs.forEach((t) => {
      const active = t === btn;
      t.classList.toggle('border-orange', active);
      t.classList.toggle('border-steel/40', !active);
      t.setAttribute('aria-current', String(active));
    });
  };

  thumbs.forEach((btn) => {
    btn.addEventListener('click', () => {
      main.classList.add('opacity-0'); // brief fade for a polished swap
      setTimeout(() => select(btn), 90);
    });
  });
}

function setupTabs() {
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const panels = Array.from(document.querySelectorAll('[role="tabpanel"]'));
  if (tabs.length === 0) return;

  const activate = (tab) => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      t.classList.toggle('tab-active', selected);
    });
    panels.forEach((p) => p.classList.toggle('hidden', p.id !== tab.getAttribute('aria-controls')));
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab));
    // Arrow-key navigation between tabs (WAI-ARIA pattern).
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const dir = e.key === 'ArrowRight' ? 1 : -1;
      const next = tabs[(i + dir + tabs.length) % tabs.length];
      next.focus();
      activate(next);
    });
  });
}

function setupAccordion() {
  document.querySelectorAll('.faq-trigger').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', String(!expanded));
      if (panel) panel.classList.toggle('hidden', expanded);
      btn.querySelector('.faq-chevron')?.classList.toggle('rotate-180', !expanded);
    });
  });
}

/* ----- JSON-LD structured data (SEO / AEO / GEO) -------------------------- */
function buildJsonLd(product) {
  const pageUrl = `${CONFIG.SITE_URL}/product.html?slug=${product.slug}`;
  // Schema requires real, crawlable image URLs (not data URIs). Resolves to the
  // product's real `image` if set, else the conventional assets/<slug>.jpg path.
  const imageUrl = getPrimaryImageUrl(product);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['WebPage', 'ItemPage'],
        '@id': pageUrl,
        url: pageUrl,
        name: product.title,
        isPartOf: { '@type': 'WebSite', name: CONFIG.SITE_NAME, url: CONFIG.SITE_URL },
        primaryImageOfPage: imageUrl,
        mainEntity: { '@id': `${pageUrl}#product` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: CONFIG.SITE_URL },
          // Category landing pages don't exist yet → point at the homepage (a real,
          // crawlable URL) rather than a dead #fragment anchor. Swap for a real
          // category URL when you add category pages.
          { '@type': 'ListItem', position: 2, name: product.category, item: `${CONFIG.SITE_URL}/index.html` },
          { '@type': 'ListItem', position: 3, name: product.title, item: pageUrl },
        ],
      },
      {
        '@type': 'Product',
        '@id': `${pageUrl}#product`,
        name: product.title,
        brand: { '@type': 'Brand', name: product.brand },
        category: product.category,
        image: imageUrl,
        description: product.review.summary,
        ...(product.asin ? { sku: product.asin } : {}),
        // aggregateRating/review only when we have a real rating (never fabricate).
        // With live PA-API, populate these + an `offers` block server-side.
        ...(product.rating
          ? {
              aggregateRating: { '@type': 'AggregateRating', ratingValue: product.rating, reviewCount: product.reviewCount, bestRating: 5, worstRating: 1 },
              review: { '@type': 'Review', reviewRating: { '@type': 'Rating', ratingValue: product.rating, bestRating: 5 }, author: { '@type': 'Organization', name: CONFIG.SITE_NAME }, reviewBody: product.review.summary },
            }
          : {}),
      },
      {
        '@type': 'FAQPage',
        mainEntity: product.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };
}

function injectJsonLd(product) {
  document.getElementById('ld-graph')?.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'ld-graph';
  script.textContent = JSON.stringify(buildJsonLd(product), null, 2);
  document.head.appendChild(script);
}

/* ----- Page metadata (title/description/canonical/OG) --------------------- */
function updateMeta(product) {
  const url = `${CONFIG.SITE_URL}/product.html?slug=${product.slug}`;
  const imageUrl = getPrimaryImageUrl(product);
  const ogTitle = `${shortName(product)} — Review, Price & Specs (India 2026)`;
  const set = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  document.title = `${product.title} — Review, Price & Specs in India (2026) | ${CONFIG.SITE_NAME}`;
  set('meta[name="description"]', 'content', product.review.summary);
  set('link[rel="canonical"]', 'href', url);

  // Keep Open Graph / Twitter in lockstep with canonical + JSON-LD so shares and
  // OG-driven crawlers advertise the ACTIVE product, not the static featured one.
  set('meta[property="og:title"]', 'content', ogTitle);
  set('meta[property="og:description"]', 'content', product.review.summary);
  set('meta[property="og:image"]', 'content', imageUrl);
  set('meta[property="og:url"]', 'content', url);
  set('meta[name="twitter:title"]', 'content', ogTitle);
  set('meta[name="twitter:description"]', 'content', product.review.summary);
}

/* ----- Bootstrap ---------------------------------------------------------- */
export function mountPDP() {
  const slug = getQueryParam('slug') || FEATURED_SLUG;
  const product = getProductBySlug(slug) || PRODUCTS[0];
  const { main } = getProductImages(product);

  // Eyebrow / breadcrumb / title / brand
  setText('pdp-category', product.category);
  setText('pdp-breadcrumb-category', product.category);
  setText('pdp-breadcrumb-title', product.title);
  setText('pdp-title', product.title); // clean, keyword-rich H1; the NL query phrase lives in the review H2
  setText('pdp-subtitle', product.review.summary);
  setText('pdp-brand', product.brand);

  // Rating block (only show stars when we have a real rating; never fabricate)
  const ratingEl = document.getElementById('pdp-rating');
  if (ratingEl) {
    ratingEl.innerHTML = product.rating
      ? `${starsHtml(product.rating, product.reviewCount)}
         <span class="font-bold text-slate-100">${product.rating.toFixed(1)}</span>
         ${product.reviewCount ? `<span class="text-slate-400">(${formatCount(product.reviewCount)} ratings)</span>` : ''}`
      : `<span class="text-slate-400">★ See ratings &amp; reviews on Amazon</span>`;
  }

  // Prime indicator
  const primeEl = document.getElementById('pdp-prime');
  if (primeEl) primeEl.classList.toggle('hidden', !product.isPrime);

  // Bullets / specs / review / faq
  const bulletsEl = document.getElementById('pdp-bullets');
  if (bulletsEl) bulletsEl.innerHTML = buildBullets(product);
  const specsEl = document.getElementById('tab-specs-dl');
  if (specsEl) specsEl.innerHTML = buildSpecsDl(product);
  const reviewEl = document.getElementById('tab-review');
  if (reviewEl) reviewEl.innerHTML = buildReview(product);
  // Write into the inner list so the panel's <h2> heading is preserved.
  const faqEl = document.getElementById('tab-faq-list');
  if (faqEl) faqEl.innerHTML = buildFaq(product);

  // Gallery
  const mainImg = document.getElementById('gallery-main');
  if (mainImg) {
    mainImg.src = main;
    mainImg.alt = product.title;
  }
  const thumbsEl = document.getElementById('gallery-thumbs');
  if (thumbsEl) thumbsEl.innerHTML = buildThumbs(product);

  // Price placeholder + CTA links (affiliate.js tags these via data-amazon)
  const priceEl = document.getElementById('pdp-price');
  if (priceEl) priceEl.dataset.priceAsin = product.asin;
  document.querySelectorAll('[data-pdp-cta]').forEach((a) => {
    a.dataset.amazon = getDetailUrl(product);
    a.dataset.trackAsin = product.asin;
    a.dataset.trackSlug = product.slug;
    a.dataset.trackTitle = product.title;
    a.dataset.trackCategory = product.category;
    a.dataset.trackList = 'PDP';
  });

  // Related products ("You might also like")
  const relatedEl = document.getElementById('grid-related');
  if (relatedEl) {
    const related = PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 4);
    relatedEl.innerHTML = related.map((p) => renderProductCard(p, 'Related')).join('');
  }

  // Wire interactivity + structured data
  setupGallery();
  setupTabs();
  setupAccordion();
  injectJsonLd(product);
  updateMeta(product);

  // Notify affiliate.js (tag links) + api.js (hydrate price)
  document.dispatchEvent(new CustomEvent('content:rendered', { detail: { root: document.getElementById('pdp') || document } }));
}
