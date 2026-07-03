#!/usr/bin/env node
/* =============================================================================
 * generate-sitemap.mjs — builds sitemap.xml + robots.txt from the catalog
 * -----------------------------------------------------------------------------
 * Reads js/data.js (PRODUCTS) and js/config.js (SITE_URL) so the output always
 * matches your live catalog and domain. Re-run after adding products or after
 * setting your real domain in CONFIG.SITE_URL:
 *
 *     node scripts/generate-sitemap.mjs
 * ========================================================================== */
import { writeFileSync } from 'node:fs';
import { PRODUCTS } from '../js/data.js';
import { CONFIG } from '../js/config.js';

const base = CONFIG.SITE_URL.replace(/\/+$/, '');
const today = new Date().toISOString().slice(0, 10);
const xmlEscape = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const urls = [
  { loc: `${base}/index.html`, priority: '1.0', changefreq: 'daily' },
  ...PRODUCTS.map((p) => ({
    loc: `${base}/product.html?slug=${encodeURIComponent(p.slug)}`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
];

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${xmlEscape(u.loc)}</loc>\n` +
        `    <lastmod>${today}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

const robots =
  `User-agent: *\n` +
  `Allow: /\n\n` +
  `# Block nothing sensitive on a public affiliate storefront.\n` +
  `Sitemap: ${base}/sitemap.xml\n`;

writeFileSync(new URL('../sitemap.xml', import.meta.url), sitemap);
writeFileSync(new URL('../robots.txt', import.meta.url), robots);

console.log(`✓ sitemap.xml written — ${urls.length} URLs`);
console.log(`✓ robots.txt written — Sitemap: ${base}/sitemap.xml`);
if (base.includes('.example')) {
  console.log('\n⚠  SITE_URL is still the placeholder. After you buy your domain,');
  console.log('   update CONFIG.SITE_URL in js/config.js and re-run this script.');
}
