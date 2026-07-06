/* =============================================================================
 * util.js — Dependency-free helpers shared across modules
 * ========================================================================== */

/** Escape user/content strings before injecting into innerHTML (XSS-safe). */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** "1240" -> "1,240". Locale-friendly thousands separators. */
export function formatCount(n) {
  return Number(n || 0).toLocaleString('en-US');
}

/**
 * Build accessible star-rating markup from a 0–5 float.
 * Returns a string of SVG stars + an sr-only label.
 */
export function starsHtml(rating, reviewCount) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const star = (fill) => `
    <svg viewBox="0 0 20 20" class="h-4 w-4 ${fill}" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.9l-5.2 2.73.99-5.78-4.21-4.1 5.82-.85z"/>
    </svg>`;
  let out = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) out += star('text-orange');
    else if (i === full && half) out += star('text-orange opacity-70');
    else out += star('text-steel');
  }
  const label = `Rated ${rating} out of 5${reviewCount ? ` from ${formatCount(reviewCount)} reviews` : ''}`;
  return `<span class="inline-flex items-center gap-0.5" role="img" aria-label="${label}">${out}</span>`;
}

/**
 * Self-contained inline-SVG placeholder image (data URI).
 * Used so the storefront renders fully offline. In production, swap these for
 * the `LargeImage`/`MediumImage` URLs returned by Amazon PA-API 5.0.
 *
 * @param {{label:string, sub?:string, hue?:number}} opts
 * @returns {string} data:image/svg+xml URI
 */
/* Simple recognizable line-icons per category, drawn in a 100×100 box and
 * scaled into the placeholder. Keeps 126 tiles visually distinct until real
 * product photos (SiteStripe / PA-API) are dropped into `product.image`. */
const CATEGORY_ICONS = {
  'Gaming Mice': '<path d="M50 10C32 10 25 27 25 46v26c0 14 14 22 25 22s25-8 25-22V46C75 27 68 10 50 10Z"/><path d="M50 16v26"/><path d="M25 47h50"/>',
  'Keyboards': '<rect x="8" y="32" width="84" height="40" rx="7"/><path d="M19 44h5M31 44h5M43 44h5M55 44h5M67 44h5M79 44h2M19 56h5M31 56h5M67 56h5M79 56h2"/><rect x="40" y="52.5" width="20" height="7" rx="2"/>',
  'Headsets': '<path d="M20 62V48a30 30 0 0 1 60 0v14"/><rect x="12" y="58" width="16" height="27" rx="6"/><rect x="72" y="58" width="16" height="27" rx="6"/>',
  'Monitors': '<rect x="12" y="16" width="76" height="50" rx="6"/><path d="M42 66l-3 16M58 66l3 16"/><path d="M32 84h36"/>',
  'Controllers': '<path d="M33 42h34a24 24 0 0 1 22 32l-5 12a11 11 0 0 1-18 2l-6-11H40l-6 11a11 11 0 0 1-18-2l-5-12a24 24 0 0 1 22-32Z"/><path d="M26 58h14M33 51v14"/><circle cx="64" cy="53" r="3.5"/><circle cx="74" cy="61" r="3.5"/>',
  'Chairs': '<path d="M30 14h40a9 9 0 0 1 9 9v33H21V23a9 9 0 0 1 9-9Z"/><path d="M22 56h56v9a9 9 0 0 1-9 9H31a9 9 0 0 1-9-9Z"/><path d="M50 74v14M34 90h32"/>',
  'Graphics Cards': '<rect x="10" y="30" width="80" height="40" rx="5"/><circle cx="35" cy="50" r="11"/><circle cx="63" cy="50" r="11"/><path d="M10 70v12M24 70v8"/>',
  'Storage': '<rect x="12" y="40" width="76" height="20" rx="5"/><circle cx="24" cy="50" r="3.5"/><path d="M40 50h30M84 44v12"/>',
  'Webcams': '<circle cx="50" cy="44" r="26"/><circle cx="50" cy="44" r="10"/><path d="M30 72h40v9H30z"/>',
  'Microphones': '<rect x="38" y="12" width="24" height="46" rx="12"/><path d="M28 46a22 22 0 0 0 44 0"/><path d="M50 68v16M36 84h28"/>',
  'Mousepads': '<rect x="12" y="34" width="76" height="40" rx="9"/><circle cx="62" cy="54" r="8"/>',
  'Games': '<circle cx="50" cy="46" r="30"/><circle cx="50" cy="46" r="8"/><path d="M50 20a26 26 0 0 1 22 14"/>',
  _default: '<path fill="COLOR" stroke="none" d="M42 12H66L54 40H68L36 86L46 50H30Z"/>',
};

/**
 * Self-contained inline-SVG placeholder image (data URI) with a category icon.
 * Renders fully offline. In production, set `product.image` to a real photo
 * (SiteStripe "Get Link → Image" or PA-API LargeImage) and this is bypassed.
 *
 * @param {{label:string, sub?:string, hue?:number, category?:string}} opts
 * @returns {string} data:image/svg+xml URI
 */
export function placeholderImage({ label = 'Gaming Gear', sub = '', hue = 28, category = '' }) {
  const c1 = `hsl(${hue} 90% 55%)`;
  const c2 = `hsl(${(hue + 30) % 360} 80% 45%)`;
  const safeLabel = escapeHtml(label).slice(0, 40);
  const safeSub = escapeHtml(sub).slice(0, 30);
  const icon = (CATEGORY_ICONS[category] || CATEGORY_ICONS._default).replace('COLOR', c1);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="${safeLabel}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1e293b"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="38%" r="60%">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#g)"/>
  <rect width="800" height="800" fill="url(#glow)"/>
  <g fill="none" stroke="${c2}" stroke-opacity="0.18" stroke-width="2">
    <circle cx="400" cy="330" r="210"/>
    <circle cx="400" cy="330" r="168"/>
  </g>
  <circle cx="400" cy="330" r="150" fill="#0b1220" stroke="${c1}" stroke-opacity="0.35" stroke-width="3"/>
  <g transform="translate(250 180) scale(3)" fill="none" stroke="${c1}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">${icon}</g>
  <text x="400" y="600" text-anchor="middle" font-family="Space Grotesk, Inter, sans-serif" font-size="46" font-weight="700" fill="#e2e8f0">${safeLabel}</text>
  <text x="400" y="650" text-anchor="middle" font-family="Inter, sans-serif" font-size="26" fill="${c1}">${safeSub}</text>
</svg>`.trim();
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/** Read ?key=value from the current URL. */
export function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}
