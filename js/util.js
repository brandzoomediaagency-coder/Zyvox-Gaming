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
export function placeholderImage({ label = 'Gaming Gear', sub = '', hue = 28 }) {
  const c1 = `hsl(${hue} 90% 55%)`;
  const c2 = `hsl(${(hue + 30) % 360} 80% 45%)`;
  const safeLabel = escapeHtml(label).slice(0, 40);
  const safeSub = escapeHtml(sub).slice(0, 30);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800" role="img" aria-label="${safeLabel}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1e293b"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="60%">
      <stop offset="0" stop-color="${c1}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${c1}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="800" fill="url(#g)"/>
  <rect width="800" height="800" fill="url(#glow)"/>
  <g fill="none" stroke="${c2}" stroke-opacity="0.25" stroke-width="2">
    <circle cx="400" cy="360" r="210"/>
    <circle cx="400" cy="360" r="150"/>
  </g>
  <rect x="270" y="250" width="260" height="220" rx="28" fill="#0b1220" stroke="${c1}" stroke-width="3"/>
  <circle cx="400" cy="360" r="44" fill="${c1}"/>
  <text x="400" y="600" text-anchor="middle" font-family="Space Grotesk, Inter, sans-serif" font-size="46" font-weight="700" fill="#e2e8f0">${safeLabel}</text>
  <text x="400" y="650" text-anchor="middle" font-family="Inter, sans-serif" font-size="26" fill="${c1}">${safeSub}</text>
</svg>`.trim();
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/** Read ?key=value from the current URL. */
export function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}
