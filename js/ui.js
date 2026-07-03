/* =============================================================================
 * ui.js — Shared chrome (header/nav/search) + homepage product grids
 * -----------------------------------------------------------------------------
 * Renders cards from data.js, fires a 'content:rendered' event so affiliate.js
 * tags new links and api.js hydrates prices. No prices are ever hardcoded.
 * ========================================================================== */
import { CONFIG } from './config.js';
import { PRODUCTS, getProductsByBadge, getProductImages, getDetailUrl } from './data.js';
import { escapeHtml, formatCount, starsHtml } from './util.js';
import { mountSearch } from './search.js';

/* ----- Shared header / nav / search behavior ----------------------------- */
export function mountChrome() {
  // Glassmorphic header gains a stronger background once the page scrolls.
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile nav toggle with aria-expanded sync.
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('hidden') === false;
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  // Real-time client-side product search on every header search box.
  mountSearch();

  // Wire every "Shop on Amazon" button to the store link from config, then let
  // affiliate.js tag + secure it (short links keep their baked-in tag; only
  // rel/target are enforced).
  const storeLinks = document.querySelectorAll('[data-amazon-store]');
  if (storeLinks.length) {
    storeLinks.forEach((a) => { a.dataset.amazon = CONFIG.AMAZON_STORE_URL; });
    document.dispatchEvent(new CustomEvent('content:rendered', { detail: { root: document } }));
  }

  // Stamp the current year into any [data-year] node.
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Pre-create the (empty) toast live region NOW so screen readers register it
  // before its first content change — otherwise the first announcement is dropped.
  ensureToastRegion();
}

/* ----- Toast (used by the mocked search) --------------------------------- */
let toastTimer;
function ensureToastRegion() {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.className =
      'fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl border border-steel/60 ' +
      'bg-charcoal/95 px-5 py-3 text-sm text-slate-100 shadow-card backdrop-blur transition ' +
      'duration-300 opacity-0 translate-y-2';
    document.body.appendChild(el);
  }
  return el;
}

export function toast(message) {
  const el = ensureToastRegion();
  el.textContent = message;
  requestAnimationFrame(() => el.classList.remove('opacity-0', 'translate-y-2'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('opacity-0', 'translate-y-2'), 2600);
}

/* ----- Product card ------------------------------------------------------- */
function badgePill(badge) {
  const map = {
    Bestseller: 'bg-orange/15 text-orange ring-orange/30',
    'Top Rated': 'bg-neon/15 text-neon ring-neon/30',
    Trending: 'bg-amber/15 text-amber ring-amber/30',
  };
  const cls = map[badge] || 'bg-steel/30 text-slate-200 ring-steel/40';
  return `<span class="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 ${cls}">${escapeHtml(badge)}</span>`;
}

export function renderProductCard(product, listName = '') {
  const { main } = getProductImages(product);
  const pdpHref = `product.html?slug=${encodeURIComponent(product.slug)}`;
  const primaryBadge = product.badges[0];
  const track =
    `data-track-asin="${escapeHtml(product.asin)}" ` +
    `data-track-slug="${escapeHtml(product.slug)}" ` +
    `data-track-title="${escapeHtml(product.title)}" ` +
    `data-track-category="${escapeHtml(product.category)}" ` +
    `data-track-list="${escapeHtml(listName)}"`;

  return `
  <article class="product-card group relative flex flex-col overflow-hidden rounded-2xl border border-steel/40 bg-charcoal/70 shadow-card transition duration-300 hover:-translate-y-1 hover:border-orange/50 hover:shadow-glow">
    <a href="${pdpHref}" class="relative block overflow-hidden" aria-label="View details for ${escapeHtml(product.title)}">
      <div class="aspect-square overflow-hidden bg-ink">
        <img src="${main}" alt="${escapeHtml(product.title)}" loading="lazy" decoding="async"
             class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
      </div>
      ${primaryBadge ? `<div class="absolute left-3 top-3">${badgePill(primaryBadge)}</div>` : ''}
      ${product.isPrime ? `<div class="absolute right-3 top-3 rounded-md bg-[#00a8e1] px-2 py-1 text-[10px] font-bold text-ink shadow">✓ prime</div>` : ''}
    </a>

    <div class="flex flex-1 flex-col gap-3 p-4">
      <p class="text-xs font-medium uppercase tracking-wider text-slate-400">${escapeHtml(product.category)}</p>
      <h3 class="line-clamp-2 text-sm font-semibold leading-snug text-slate-100">
        <a href="${pdpHref}" class="transition hover:text-orange">${escapeHtml(product.title)}</a>
      </h3>

      <div class="flex items-center gap-2 text-xs text-slate-300">
        ${product.rating
          ? `${starsHtml(product.rating, product.reviewCount)}<span class="font-semibold text-slate-200">${product.rating.toFixed(1)}</span>${product.reviewCount ? `<span class="text-slate-400">(${formatCount(product.reviewCount)})</span>` : ''}`
          : `<span class="text-slate-400">★ Ratings &amp; reviews on Amazon</span>`}
      </div>

      <div class="mt-auto flex flex-col gap-2 pt-1">
        <p class="text-xs text-slate-400">
          <span data-price-asin="${escapeHtml(product.asin)}" class="font-semibold text-orange">${escapeHtml(CONFIG.PRICE_PLACEHOLDER)}</span>
        </p>
        <div class="flex items-center gap-2">
          <a href="${pdpHref}"
             class="flex-1 rounded-lg border border-steel/60 px-3 py-2 text-center text-xs font-semibold text-slate-200 transition hover:border-slate-400 hover:text-white">
            Details
          </a>
          <a data-amazon="${escapeHtml(getDetailUrl(product))}" href="#" ${track}
             class="flex-1 rounded-lg bg-gradient-to-r from-amber to-orange px-3 py-2 text-center text-xs font-bold text-ink transition hover:brightness-110">
            View on Amazon
          </a>
        </div>
      </div>
    </div>
  </article>`;
}

/* ----- Grid rendering ----------------------------------------------------- */
export function renderGrid(containerId, products, listName = '') {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = products.map((p) => renderProductCard(p, listName)).join('');
  // Tell affiliate.js + api.js that new content exists.
  document.dispatchEvent(new CustomEvent('content:rendered', { detail: { root: container } }));
}

/* ----- Homepage bootstrap ------------------------------------------------- */
export function mountHomepage() {
  renderGrid('grid-trending', getProductsByBadge('Trending'), 'Trending');
  renderGrid('grid-toprated', getProductsByBadge('Top Rated'), 'Top Rated');
  renderGrid('grid-bestsellers', getProductsByBadge('Bestseller'), 'Bestsellers');

  // "Browse all" / category counts (purely cosmetic helpers).
  const total = document.querySelector('[data-product-count]');
  if (total) total.textContent = String(PRODUCTS.length);
}
