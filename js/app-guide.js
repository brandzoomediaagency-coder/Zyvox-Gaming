/* =============================================================================
 * app-guide.js — Entry point for roundup / buying-guide pages (ES module)
 * Shared header + affiliate link tagging + click tracking. No product hydration
 * needed: guide content is static (best for SEO/AEO), buy links use data-amazon.
 * ========================================================================== */
import './affiliate.js';
import { mountChrome } from './ui.js';
import { initTracking } from './tracking.js';

function start() {
  initTracking();
  mountChrome();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
