/* =============================================================================
 * app-home.js — Homepage entry point (ES module)
 * Importing affiliate.js runs its self-boot (link tagging + sanitization).
 * ========================================================================== */
import './affiliate.js';
import { mountChrome, mountHomepage } from './ui.js';
import { hydratePrices } from './api.js';
import { initTracking } from './tracking.js';

function start() {
  initTracking();          // affiliate-click analytics (delegated listener)
  mountChrome();
  mountHomepage();
  hydratePrices(document); // compliant: live PA-API price or neutral placeholder
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
