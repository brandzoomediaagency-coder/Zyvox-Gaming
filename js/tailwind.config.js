/* =============================================================================
 * tailwind.config.js — Shared Tailwind (Play CDN) configuration
 * -----------------------------------------------------------------------------
 * Loaded synchronously in <head> AFTER the Tailwind Play CDN script so the CDN
 * compiler picks up our custom design tokens before it scans the DOM.
 *
 * PRODUCTION NOTE: The Play CDN is great for prototyping but prints a console
 * warning and ships the full compiler to the client. For production, install
 * Tailwind via the CLI/PostCSS and reuse the `theme.extend` block below in your
 * real `tailwind.config.js`. See README.md → "Going to production".
 * ========================================================================== */
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Gaming dark surfaces
        ink: '#0f172a',        // Slate Gray — page background
        charcoal: '#1e293b',   // Deep Charcoal — cards / panels
        charcoal2: '#172033',  // slightly deeper panel variant
        steel: '#334155',      // borders / dividers
        // Amazon-inspired CTA palette
        amber: '#f08804',      // Amazon Amber — primary
        orange: '#ff9900',     // Amazon Orange — hover / highlight
        // Gaming neon accent (used sparingly for glow)
        neon: '#22d3ee',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,153,0,0.25), 0 8px 30px -8px rgba(255,153,0,0.45)',
        card: '0 10px 30px -12px rgba(0,0,0,0.7)',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
};
