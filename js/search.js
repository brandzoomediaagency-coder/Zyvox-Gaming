/* =============================================================================
 * search.js — Real-time client-side product search
 * -----------------------------------------------------------------------------
 * Wires every header search box (desktop + mobile) to live-filter the catalog
 * as you type, showing a results dropdown. Fully client-side (no backend);
 * clicking a result opens that product's page. Keyboard: ↑/↓ move, Enter opens,
 * Esc closes.
 * ========================================================================== */
import { PRODUCTS, getProductImages } from './data.js';
import { escapeHtml } from './util.js';

const MAX_RESULTS = 8;

/** Rank products against a query; returns the best matches. */
function query(q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const out = [];
  for (const p of PRODUCTS) {
    const title = p.title.toLowerCase();
    const hay = `${title} ${p.brand} ${p.category}`.toLowerCase();
    if (!terms.every((t) => hay.includes(t))) continue;
    let score = 0;
    if (title.startsWith(terms[0])) score += 100;
    if (terms.every((t) => title.includes(t))) score += 50;
    if (p.brand.toLowerCase().startsWith(terms[0])) score += 20;
    score -= title.length * 0.05; // prefer shorter/closer titles
    out.push({ p, score });
  }
  return out.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS).map((s) => s.p);
}

function resultHtml(p) {
  const img = getProductImages(p).main;
  const href = `product.html?slug=${encodeURIComponent(p.slug)}`;
  return `<a role="option" href="${href}" class="search-item flex items-center gap-3 px-3 py-2.5 transition hover:bg-charcoal focus:bg-charcoal focus:outline-none">
      <img src="${img}" alt="" aria-hidden="true" class="h-10 w-10 shrink-0 rounded-md object-cover" />
      <span class="min-w-0 flex-1">
        <span class="block truncate text-sm font-medium text-slate-100">${escapeHtml(p.title)}</span>
        <span class="block text-xs text-slate-400">${escapeHtml(p.brand)} · ${escapeHtml(p.category)}</span>
      </span>
      <span class="shrink-0 text-xs font-semibold text-orange">View →</span>
    </a>`;
}

/** Wire a single search form (input + generated dropdown). */
function wireForm(form, idx) {
  const input = form.querySelector('input[type="search"], input');
  if (!input) return;

  const panelId = `search-results-${idx}`;
  const panel = document.createElement('div');
  panel.id = panelId;
  panel.setAttribute('role', 'listbox');
  panel.className =
    'search-panel absolute left-0 right-0 top-full z-[60] mt-2 hidden max-h-[70vh] overflow-y-auto ' +
    'rounded-xl border border-steel/60 bg-charcoal2/95 shadow-card backdrop-blur';
  form.appendChild(panel);

  input.setAttribute('role', 'combobox');
  input.setAttribute('aria-autocomplete', 'list');
  input.setAttribute('aria-expanded', 'false');
  input.setAttribute('aria-controls', panelId);
  input.setAttribute('autocomplete', 'off');

  let results = [];
  let active = -1;
  let timer;

  const close = () => {
    panel.classList.add('hidden');
    input.setAttribute('aria-expanded', 'false');
    active = -1;
  };
  const highlight = (i) => {
    const items = panel.querySelectorAll('.search-item');
    items.forEach((el, n) => el.classList.toggle('bg-charcoal', n === i));
    if (items[i]) items[i].scrollIntoView({ block: 'nearest' });
    active = i;
  };

  const render = (q) => {
    results = query(q);
    if (!q.trim()) return close();
    if (!results.length) {
      panel.innerHTML = `<p class="px-4 py-4 text-sm text-slate-400">No products found for “${escapeHtml(q)}”. Try a brand or category.</p>`;
    } else {
      panel.innerHTML =
        `<p class="border-b border-steel/40 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">${results.length} result${results.length > 1 ? 's' : ''}</p>` +
        results.map(resultHtml).join('');
    }
    panel.classList.remove('hidden');
    input.setAttribute('aria-expanded', 'true');
    active = -1;
  };

  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => render(input.value), 90);
  });
  input.addEventListener('focus', () => { if (input.value.trim()) render(input.value); });

  input.addEventListener('keydown', (e) => {
    const items = panel.querySelectorAll('.search-item');
    if (e.key === 'ArrowDown') { e.preventDefault(); if (items.length) highlight((active + 1) % items.length); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); if (items.length) highlight((active - 1 + items.length) % items.length); }
    else if (e.key === 'Enter') {
      const target = items[active] || items[0];
      if (target) { e.preventDefault(); window.location.href = target.getAttribute('href'); }
    } else if (e.key === 'Escape') { close(); input.blur(); }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const first = panel.querySelector('.search-item');
    if (first) window.location.href = first.getAttribute('href');
  });

  // close when clicking outside this form
  document.addEventListener('click', (e) => { if (!form.contains(e.target)) close(); });
}

/** Attach live search to every header search form on the page. */
export function mountSearch() {
  document.querySelectorAll('form[data-mock-search]').forEach(wireForm);
}
