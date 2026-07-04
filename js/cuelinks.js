/* =============================================================================
 * cuelinks.js — CueLinks auto-affiliate loader
 * -----------------------------------------------------------------------------
 * Injects the CueLinks (cuelinksv2.js) script on every page when a channel ID
 * is configured. CueLinks scans outbound links and converts eligible merchant
 * links into tracked affiliate links.
 *
 * ⚠️ CueLinks will also rewrite your DIRECT Amazon links (amzn.to / amazon.in),
 * routing that commission through CueLinks instead of your own Associate tag.
 * If you want to keep direct Amazon earnings, add amazon.in and amzn.to to the
 * "Excluded Domains" list in your CueLinks dashboard.
 * ========================================================================== */
import { CONFIG } from './config.js';

export function mountCuelinks() {
  const id = CONFIG.CUELINKS_CHANNEL_ID;
  if (!id || window.__cuelinksLoaded) return;
  window.__cuelinksLoaded = true;

  // cuelinksv2.js reads the global `cId` for the channel.
  window.cId = id;

  const s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = (location.protocol === 'https:' ? 'https://cdn0.cuelinks.com/js/' : 'http://cdn0.cuelinks.com/js/') + 'cuelinksv2.js';
  document.body.appendChild(s);
}
