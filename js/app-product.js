/* =============================================================================
 * app-product.js — Product Detail Page entry point (ES module)
 * ========================================================================== */
import './affiliate.js';
import { mountChrome } from './ui.js';
import { mountPDP } from './product.js';
import { hydratePrices } from './api.js';
import { initTracking } from './tracking.js';

function start() {
  initTracking();          // affiliate-click analytics (delegated listener)
  mountChrome();
  mountPDP();
  hydratePrices(document);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
