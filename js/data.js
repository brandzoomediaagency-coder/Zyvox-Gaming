/* =============================================================================
 * data.js — Product catalog
 * -----------------------------------------------------------------------------
 * HOW TO ADD YOUR AFFILIATE LINKS (the only thing you need to do per product):
 *   1. On amazon.in (logged into Associates), open the product.
 *   2. Use the SiteStripe bar → "Get Link" → "Text" → copy the full URL.
 *   3. Paste it into that product's `affiliateUrl` below.
 *
 * Until a product's `affiliateUrl` is filled, its Buy button falls back to your
 * store link (CONFIG.AMAZON_STORE_URL) — so every click still opens amazon.in
 * with your tag and earns on any purchase within Amazon's 24h window.
 *
 * COMPLIANCE: no prices are stored here (fetch live via PA-API — see js/api.js).
 * Set a real `asin` when you have PA-API access to enable live price + rating.
 * ========================================================================== */
import { CONFIG } from './config.js';
import { placeholderImage } from './util.js';

export const PRODUCTS = [
  {
    asin: '',                 // ← optional: real ASIN enables live price via PA-API
    affiliateUrl: 'https://amzn.to/4vfg2HX',
    slug: 'logitech-g502-hero',
    title: 'Logitech G502 HERO High-Performance Wired Gaming Mouse',
    brand: 'Logitech G',
    category: 'Gaming Mice',
    badges: ['Bestseller', 'Top Rated', 'Trending'],
    rating: 4.7,
    reviewCount: 45000,
    isPrime: true,
    hue: 28,
    bullets: [
      'HERO 25K optical sensor — up to 25,600 DPI with no acceleration or smoothing',
      '11 programmable buttons for macros, DPI shift and in-game commands',
      '5 removable 3.6g weights to tune balance from 116g to 134g',
      'LIGHTSYNC RGB with onboard memory for up to 5 saved profiles',
      'Mechanical button tensioning and durable braided cable',
    ],
    specs: {
      'Sensor': 'HERO 25K optical',
      'Max DPI': '25,600',
      'Programmable Buttons': '11',
      'Weight': '121 g (+ 5 × 3.6 g tunable)',
      'Connection': 'Wired USB',
      'Lighting': 'LIGHTSYNC RGB',
      'Onboard Memory': 'Up to 5 profiles',
      'Cable': '2.1 m braided',
      'Compatibility': 'Windows, macOS',
    },
    review: {
      summary:
        'The Logitech G502 HERO is the best all-round wired gaming mouse for most players in 2026 — the 25K HERO sensor, 11 buttons and tunable weights suit FPS, MOBA and MMO alike.',
      paragraphs: [
        'The G502 HERO earns its bestseller status by doing everything well. The HERO 25K sensor tracks flawlessly for competitive FPS, while the 11 programmable buttons make it a genuine workhorse for MOBAs and MMOs where extra binds matter.',
        'At 121g it is heavier than featherweight esports mice, but the five 3.6g weights let you dial the balance to taste. The signature scroll wheel — switchable between ratchet and free-spin — is still one of the best in the business for scrolling long documents or spec sheets.',
      ],
      pros: [
        'Flawless HERO 25K sensor at any DPI',
        '11 programmable buttons — great for MOBA/MMO',
        'Tunable weight system and excellent dual-mode scroll wheel',
      ],
      cons: [
        'Heavier than dedicated esports mice',
        'Wired only (see G502 X PLUS for wireless)',
      ],
    },
    faq: [
      {
        q: 'Is the Logitech G502 HERO good for FPS games in 2026?',
        a: 'Yes. The HERO 25K sensor is pixel-accurate with no acceleration or smoothing, so it handles fast flick shots in games like Valorant and CS2 well. Its weight suits players who prefer a planted, controlled feel over an ultralight mouse.',
      },
      {
        q: 'How many buttons does the G502 HERO have?',
        a: 'It has 11 programmable buttons, including a DPI-shift "sniper" button and a dual-mode scroll wheel, all customisable in Logitech G HUB with onboard memory for up to five profiles.',
      },
      {
        q: 'Is the G502 HERO wired or wireless?',
        a: 'The G502 HERO is wired via a braided USB cable. If you want the same shape wirelessly, look at the Logitech G502 X PLUS with LIGHTSPEED wireless.',
      },
      {
        q: 'Can I change the weight of the G502 HERO?',
        a: 'Yes. It ships with five removable 3.6g weights you can arrange inside the mouse to adjust both total weight and balance point.',
      },
    ],
  },
  {
    asin: '',
    affiliateUrl: 'https://amzn.to/3RhjzaG',
    slug: 'redragon-kumara-k552',
    title: 'Redragon Kumara K552 RGB Mechanical Gaming Keyboard (TKL)',
    brand: 'Redragon',
    category: 'Keyboards',
    badges: ['Top Rated', 'Trending'],
    rating: 4.4,
    reviewCount: 32000,
    isPrime: true,
    hue: 200,
    bullets: [
      'Tenkeyless 87-key layout saves desk space for low-sens aiming',
      'Tactile mechanical switches rated for 50 million keystrokes',
      'RGB backlighting with multiple presets and adjustable brightness',
      'Metal-and-ABS body with double-shot keycaps for durability',
      'Full anti-ghosting with conflict-free key rollover',
    ],
    specs: {
      'Layout': 'Tenkeyless (87 keys)',
      'Switches': 'Mechanical (tactile), 50M rated',
      'Backlight': 'RGB (preset effects)',
      'Keycaps': 'Double-shot ABS',
      'Body': 'Metal top plate + ABS',
      'Anti-Ghosting': 'Full N-key conflict-free',
      'Connection': 'Wired USB',
    },
    review: {
      summary:
        'The Redragon Kumara K552 is the best budget mechanical gaming keyboard in India — a compact, sturdy TKL board with real mechanical switches at an entry price.',
      paragraphs: [
        'For players stepping up from a membrane keyboard, the K552 is the obvious first mechanical. The tactile switches feel crisp, the metal plate keeps it planted, and the compact TKL layout frees up mouse room for low-sensitivity aiming.',
      ],
      pros: ['Genuine mechanical feel on a budget', 'Compact, sturdy metal build', 'Bright RGB presets'],
      cons: ['No dedicated software on the base model', 'ABS keycaps can shine over time'],
    },
    faq: [
      {
        q: 'Is the Redragon K552 good for gaming beginners?',
        a: 'Yes. It is one of the most popular budget mechanical keyboards in India, offering a durable metal build, tactile switches and full anti-ghosting — ideal for a first mechanical gaming keyboard.',
      },
      {
        q: 'Does the Redragon K552 have full RGB?',
        a: 'The RGB version offers multi-colour backlighting with several preset lighting effects and adjustable brightness, controlled directly from the keyboard.',
      },
    ],
  },
  {
    asin: '',
    affiliateUrl: 'https://amzn.to/4vGWNb7',
    slug: 'hyperx-cloud-ii',
    title: 'HyperX Cloud II Gaming Headset (Virtual 7.1 Surround)',
    brand: 'HyperX',
    category: 'Headsets',
    badges: ['Bestseller', 'Top Rated'],
    rating: 4.6,
    reviewCount: 60000,
    isPrime: true,
    hue: 280,
    bullets: [
      '53mm drivers tuned for clear footsteps and directional cues',
      'USB sound card adds virtual 7.1 surround and easy volume control',
      'Detachable noise-cancelling boom mic, TeamSpeak & Discord certified',
      'Memory-foam ear cushions and durable aluminium frame for long sessions',
      'Works on PC, PS5, Xbox, Switch and mobile via 3.5mm',
    ],
    specs: {
      'Drivers': '53 mm dynamic',
      'Surround': 'Virtual 7.1 (USB sound card)',
      'Microphone': 'Detachable noise-cancelling boom',
      'Frame': 'Aluminium',
      'Cushions': 'Memory foam (leatherette)',
      'Connectivity': '3.5 mm + USB',
      'Compatibility': 'PC, PS5, Xbox, Switch, mobile',
    },
    review: {
      summary:
        'The HyperX Cloud II remains the safest gaming-headset recommendation in 2026: comfortable, well-built, and with a mic that genuinely sounds good on voice chat.',
      paragraphs: [
        'Years after launch the Cloud II is still a default pick because it nails the essentials. The 53mm drivers deliver clear positional audio, the memory-foam cushions stay comfortable for marathon sessions, and the detachable mic is among the best in its class for clarity.',
      ],
      pros: ['Excellent comfort for long sessions', 'Class-leading detachable mic', 'Rugged aluminium build'],
      cons: ['Wired only', 'Leatherette pads run warm in summer'],
    },
    faq: [
      {
        q: 'Is the HyperX Cloud II good for competitive gaming?',
        a: 'Yes. Its 53mm drivers give clear directional audio for hearing footsteps and gunfire, and the virtual 7.1 surround (via the included USB sound card) helps with positional awareness in shooters.',
      },
      {
        q: 'Does the HyperX Cloud II work with PS5 and Xbox?',
        a: 'Yes. It connects via 3.5mm to PS5, Xbox and Switch controllers, and via USB on PC. The virtual 7.1 surround feature works over the USB connection on PC.',
      },
    ],
  },
  {
    asin: '',
    affiliateUrl: 'https://amzn.to/3TdlXji',
    slug: 'lg-ultragear-27gp850',
    title: 'LG UltraGear 27GP850 27" QHD Nano IPS 165Hz Gaming Monitor',
    brand: 'LG',
    category: 'Monitors',
    badges: ['Top Rated', 'Trending'],
    rating: 4.7,
    reviewCount: 6200,
    isPrime: false,
    hue: 150,
    bullets: [
      '27-inch Nano IPS, 2560×1440 QHD — the sweet spot for high-refresh gaming',
      '165Hz refresh (overclockable to 180Hz) with 1ms GtG response',
      'NVIDIA G-SYNC Compatible and AMD FreeSync Premium tear-free gaming',
      'VESA DisplayHDR 400 with vivid Nano IPS colour coverage',
      'Ergonomic stand with height, tilt and pivot adjustment',
    ],
    specs: {
      'Panel': 'Nano IPS',
      'Resolution': '2560 × 1440 (QHD)',
      'Refresh Rate': '165 Hz (OC 180 Hz)',
      'Response Time': '1 ms (GtG)',
      'Adaptive Sync': 'G-SYNC Compatible + FreeSync Premium',
      'HDR': 'VESA DisplayHDR 400',
      'Ports': 'DisplayPort 1.4, 2× HDMI 2.0',
    },
    review: {
      summary:
        'The LG UltraGear 27GP850 is the best 1440p gaming monitor for most builds in 2026 — 165Hz, fast Nano IPS colour, and G-SYNC + FreeSync in one panel.',
      paragraphs: [
        'This is the monitor most 1440p gamers should buy. The Nano IPS panel is fast enough for competitive play at 165Hz (180Hz overclocked) while retaining the colour and viewing angles that TN panels sacrifice, making it equally good for single-player spectacle.',
      ],
      pros: ['Fast Nano IPS with great colour', '165Hz (OC 180Hz) + 1ms', 'Dual adaptive sync support'],
      cons: ['HDR 400 is entry-level HDR', 'No USB-C'],
    },
    faq: [
      {
        q: 'Is 1440p 165Hz good for gaming in 2026?',
        a: 'Yes — 1440p at 165Hz is the mainstream sweet spot. It is sharper than 1080p, far easier to drive than 4K, and 165Hz delivers the smooth, responsive motion competitive players want.',
      },
      {
        q: 'Does the LG 27GP850 support G-SYNC?',
        a: 'Yes. It is certified NVIDIA G-SYNC Compatible and also supports AMD FreeSync Premium, so you get tear-free, low-stutter gaming on both NVIDIA and AMD graphics cards.',
      },
    ],
  },
  {
    asin: '',
    affiliateUrl: 'https://amzn.to/4eHmMcB',
    slug: 'green-soul-beast',
    title: 'Green Soul Beast Series Ergonomic Gaming Chair',
    brand: 'Green Soul',
    category: 'Chairs',
    badges: ['Bestseller'],
    rating: 4.3,
    reviewCount: 22000,
    isPrime: true,
    hue: 12,
    bullets: [
      'High-back ergonomic design with adjustable lumbar and neck pillows',
      'Recline up to 165° with a multi-tilt lock for gaming or resting',
      'Adjustable armrests and a smooth-glide caster base',
      'Breathable, easy-clean premium PU leather upholstery',
      'Class-3 gas lift with a sturdy metal frame',
    ],
    specs: {
      'Design': 'High-back ergonomic',
      'Recline': 'Up to 165°',
      'Armrests': 'Adjustable',
      'Pillows': 'Lumbar + neck (included)',
      'Upholstery': 'Premium PU leather',
      'Recommended Height': "5'6\" – 6'2\"",
      'Gas Lift': 'Class 3',
    },
    review: {
      summary:
        'The Green Soul Beast is the most popular value gaming chair in India — a comfortable, well-built ergonomic seat with the adjustability serious gamers want.',
      paragraphs: [
        'For long play or work-from-home sessions, the Beast series balances support and price better than most. The lumbar and neck pillows, deep recline and adjustable armrests cover the ergonomic basics, and the build quality is reassuringly solid for the money.',
      ],
      pros: ['Great value for the comfort', '165° recline + adjustable armrests', 'Sturdy, well-reviewed build'],
      cons: ['Assembly takes ~30 minutes', 'Best fit for average-to-tall users'],
    },
    faq: [
      {
        q: 'Is the Green Soul Beast chair good for long gaming sessions?',
        a: 'Yes. Its high-back ergonomic design, adjustable lumbar and neck pillows, and 165° recline are built to reduce back and neck fatigue over long gaming or work-from-home sessions.',
      },
    ],
  },
  {
    asin: '',
    affiliateUrl: 'https://amzn.to/447NepS',
    slug: 'xbox-wireless-controller',
    title: 'Xbox Wireless Controller (Bluetooth, PC & Mobile Compatible)',
    brand: 'Xbox',
    category: 'Controllers',
    badges: ['Top Rated', 'Trending'],
    rating: 4.7,
    reviewCount: 90000,
    isPrime: true,
    hue: 150,
    bullets: [
      'Connects via Bluetooth and Xbox Wireless to PC, mobile and Xbox',
      'Hybrid D-pad and textured triggers/bumpers for precise control',
      'Dedicated Share button to capture and post clips instantly',
      'USB-C for charging/wired play; up to ~40 hours on AA batteries',
      'The de-facto standard controller for PC gaming',
    ],
    specs: {
      'Connectivity': 'Bluetooth + Xbox Wireless + USB-C',
      'D-Pad': 'Hybrid',
      'Battery': '2 × AA (~40 h)',
      'Extras': 'Share button, textured grips',
      'Compatibility': 'Xbox Series X|S, Xbox One, PC, Android, iOS',
    },
    review: {
      summary:
        'The Xbox Wireless Controller is the best all-round controller for PC gaming in 2026 — near-universal compatibility, a great D-pad, and rock-solid Bluetooth.',
      paragraphs: [
        'If you game on PC, this is the controller to buy. Windows support is native and painless, Bluetooth pairing to phones is instant, and the ergonomics are the benchmark every other pad is measured against. The Share button makes clipping highlights effortless.',
      ],
      pros: ['Near-universal compatibility', 'Excellent ergonomics and D-pad', 'Reliable Bluetooth on PC/mobile'],
      cons: ['Uses AA batteries by default (rechargeable kit sold separately)', 'No back paddles'],
    },
    faq: [
      {
        q: 'Does the Xbox Wireless Controller work on PC?',
        a: 'Yes. It is the de-facto standard for PC gaming — it connects over Bluetooth or the Xbox Wireless Adapter and is natively supported by Windows and the vast majority of PC games.',
      },
      {
        q: 'Can I use the Xbox controller on my phone?',
        a: 'Yes. It pairs over Bluetooth with Android and iOS devices, making it ideal for cloud gaming and mobile game streaming.',
      },
    ],
  },
  {
    asin: '',
    affiliateUrl: 'https://amzn.to/4p85uZS',
    slug: 'gigabyte-rtx-4060-windforce',
    title: 'Gigabyte GeForce RTX 4060 WINDFORCE OC 8G Graphics Card',
    brand: 'Gigabyte',
    category: 'Graphics Cards',
    badges: ['Bestseller', 'Top Rated'],
    rating: 4.6,
    reviewCount: 4300,
    isPrime: false,
    hue: 95,
    bullets: [
      '8GB GDDR6 for smooth 1080p and entry 1440p high-refresh gaming',
      'NVIDIA DLSS 3 with Frame Generation for big FPS gains',
      '3rd-gen ray tracing cores for realistic lighting and reflections',
      'WINDFORCE cooling with alternate-spinning fans runs cool and quiet',
      'Compact PCIe 4.0 card — fits most mainstream builds',
    ],
    specs: {
      'Memory': '8 GB GDDR6',
      'Memory Bus': '128-bit',
      'Boost Clock': '~2475 MHz',
      'Interface': 'PCIe 4.0',
      'Features': 'DLSS 3 + Ray Tracing',
      'Power': '1 × 8-pin (450W PSU recommended)',
      'Outputs': '2× DP 1.4a, 2× HDMI 2.1',
    },
    review: {
      summary:
        'The Gigabyte RTX 4060 WINDFORCE OC is the best value 1080p gaming GPU in 2026, and DLSS 3 makes it punch above its weight at 1440p.',
      paragraphs: [
        'For high-refresh 1080p — where most players actually game — the RTX 4060 is the efficient, sensible choice. DLSS 3 Frame Generation lifts frame rates dramatically in supported titles, and the WINDFORCE cooler keeps it quiet without a bulky footprint.',
      ],
      pros: ['Great 1080p performance per watt', 'DLSS 3 Frame Generation', 'Cool, quiet, compact'],
      cons: ['8GB VRAM limits max-setting 1440p in some titles', '128-bit memory bus'],
    },
    faq: [
      {
        q: 'Is the RTX 4060 good for 1080p gaming in 2026?',
        a: 'Yes. The RTX 4060 is one of the best value cards for high-refresh 1080p gaming, and NVIDIA DLSS 3 with Frame Generation boosts frame rates significantly in supported games, extending it into 1440p.',
      },
      {
        q: 'What power supply does the RTX 4060 need?',
        a: 'A quality 450W power supply with a single 8-pin PCIe connector is recommended for the Gigabyte RTX 4060 WINDFORCE OC in a typical mainstream build.',
      },
    ],
  },
  {
    asin: '',
    affiliateUrl: 'https://amzn.to/44MTPGd',
    slug: 'samsung-980-pro-1tb',
    title: 'Samsung 980 PRO 1TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Samsung',
    category: 'Storage',
    badges: ['Trending'],
    rating: 4.8,
    reviewCount: 26000,
    isPrime: true,
    hue: 48,
    bullets: [
      'PCIe 4.0 NVMe — up to 7,000 MB/s sequential reads for fast load times',
      'Ideal boot/games drive with DirectStorage-ready speeds',
      'Samsung V-NAND and in-house controller for consistent performance',
      'Nickel-coated controller and heat-spreader label for thermal control',
      '1TB capacity with a 5-year limited warranty',
    ],
    specs: {
      'Interface': 'PCIe 4.0 x4 (NVMe)',
      'Sequential Read': 'Up to 7,000 MB/s',
      'Sequential Write': 'Up to 5,000 MB/s',
      'Capacity': '1 TB',
      'Form Factor': 'M.2 2280',
      'Endurance': '600 TBW',
      'Warranty': '5 years',
    },
    review: {
      summary:
        'The Samsung 980 PRO 1TB is a top-tier PCIe 4.0 SSD for gaming — blistering read speeds and Samsung reliability for fast loads and DirectStorage titles.',
      paragraphs: [
        'As a boot and games drive the 980 PRO is hard to beat. Its 7,000 MB/s reads slash level-load times, and Samsung’s controller and V-NAND deliver the consistency and endurance that budget Gen4 drives can struggle to match.',
      ],
      pros: ['Up to 7,000 MB/s reads', 'Proven Samsung reliability', '5-year warranty'],
      cons: ['Add the heatsink version for tight, hot builds', 'Gen4 premium over Gen3 drives'],
    },
    faq: [
      {
        q: 'Is the Samsung 980 PRO good for gaming?',
        a: 'Yes. Its PCIe 4.0 speeds of up to 7,000 MB/s dramatically cut game load times and make it an excellent, DirectStorage-ready boot and games drive.',
      },
    ],
  },

  /* ----- Batch 2: expanded catalog (add your affiliateUrl per product) ----- */
  {
    asin: '', affiliateUrl: 'https://amzn.to/4v7OkN4', slug: 'razer-deathadder-essential',
    title: 'Razer DeathAdder Essential Ergonomic Wired Gaming Mouse',
    brand: 'Razer', category: 'Gaming Mice', badges: ['Top Rated', 'Trending'],
    rating: 4.6, reviewCount: 38000, isPrime: true, hue: 130,
    bullets: [
      '6,400 DPI optical sensor tuned for accurate tracking',
      'Iconic right-handed ergonomic shape loved for comfort',
      '5 programmable buttons for binds and macros',
      'Mechanical switches rated for up to 10 million clicks',
    ],
    specs: { 'Sensor': 'Optical', 'Max DPI': '6,400', 'Buttons': '5 programmable', 'Switches': 'Mechanical (10M)', 'Connection': 'Wired USB', 'Weight': '96 g' },
    review: {
      summary: 'A comfortable, dependable budget gaming mouse built on Razer’s classic DeathAdder shape.',
      paragraphs: ['The DeathAdder shape is a proven classic, and the Essential brings it to a budget price with a reliable optical sensor that is more than accurate enough for most players.'],
      pros: ['Comfortable ergonomic shape', 'Reliable, accurate sensor'], cons: ['Wired only'],
    },
    faq: [{ q: 'Is the Razer DeathAdder Essential good for beginners?', a: 'Yes. Its comfortable ergonomic shape and accurate 6,400 DPI sensor make it one of the best value first gaming mice for new players.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/3TfoVnm', slug: 'logitech-g102',
    title: 'Logitech G102 LIGHTSYNC Wired Gaming Mouse',
    brand: 'Logitech G', category: 'Gaming Mice', badges: ['Bestseller', 'Trending'],
    rating: 4.5, reviewCount: 41000, isPrime: true, hue: 40,
    bullets: [
      'Up to 8,000 DPI sensor with on-the-fly adjustment',
      '6 programmable buttons via Logitech G HUB',
      'LIGHTSYNC RGB with ~16.8M colours',
      'Lightweight 85g classic ambidextrous shape',
    ],
    specs: { 'Sensor': 'Optical', 'Max DPI': '8,000', 'Buttons': '6 programmable', 'Lighting': 'LIGHTSYNC RGB', 'Weight': '85 g', 'Connection': 'Wired USB' },
    review: {
      summary: 'One of the best-selling budget gaming mice — light, accurate and endlessly customisable.',
      paragraphs: ['The G102 is a perennial value champion: a light 85g body, a capable 8,000 DPI sensor and full RGB, all backed by Logitech’s excellent G HUB software.'],
      pros: ['Lightweight and comfortable', 'Great value with full RGB'], cons: ['Simple, no-frills shape'],
    },
    faq: [{ q: 'Is the Logitech G102 good for FPS?', a: 'Yes. Its light 85g weight and accurate sensor make it a strong budget pick for fast-paced FPS games.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4gkIPHh', slug: 'hyperx-alloy-origins-core',
    title: 'HyperX Alloy Origins Core TKL Mechanical Gaming Keyboard',
    brand: 'HyperX', category: 'Keyboards', badges: ['Top Rated'],
    rating: 4.7, reviewCount: 12000, isPrime: true, hue: 210,
    bullets: [
      'HyperX mechanical switches with a fast, crisp actuation',
      'Compact tenkeyless layout frees up mouse space',
      'Aircraft-grade full aluminium body',
      'Per-key RGB with onboard memory for 3 profiles',
    ],
    specs: { 'Layout': 'Tenkeyless (87)', 'Switches': 'HyperX mechanical', 'Body': 'Full aluminium', 'Backlight': 'Per-key RGB', 'Connection': 'USB-C (detachable)' },
    review: {
      summary: 'A premium-feeling TKL with a rock-solid aluminium build and excellent HyperX switches.',
      paragraphs: ['The Alloy Origins Core nails the fundamentals: a rigid aluminium chassis, crisp HyperX switches and a compact TKL footprint that suits low-sensitivity players.'],
      pros: ['Excellent aluminium build', 'Compact, competitive TKL layout'], cons: ['No wrist rest included'],
    },
    faq: [{ q: 'Is a TKL keyboard better for gaming?', a: 'Tenkeyless boards remove the numpad to give more room for wide, low-sensitivity mouse movements, which many competitive players prefer.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4b3PWAm', slug: 'logitech-g213',
    title: 'Logitech G213 Prodigy RGB Gaming Keyboard',
    brand: 'Logitech G', category: 'Keyboards', badges: ['Bestseller'],
    rating: 4.5, reviewCount: 15000, isPrime: true, hue: 55,
    bullets: [
      'Mech-dome keys tuned for a responsive, tactile feel',
      '5-zone LIGHTSYNC RGB backlighting',
      'Spill-resistant design for peace of mind',
      'Dedicated media controls and integrated palm rest',
    ],
    specs: { 'Type': 'Membrane (Mech-Dome)', 'Backlight': '5-zone RGB', 'Spill-Resistant': 'Yes', 'Media Keys': 'Dedicated', 'Connection': 'Wired USB' },
    review: {
      summary: 'A durable, comfortable full-size RGB keyboard that’s a reliable budget all-rounder.',
      paragraphs: ['For players who want RGB and media keys without paying for mechanical switches, the G213 delivers a comfortable typing feel and Logitech reliability at a friendly price.'],
      pros: ['Comfortable mech-dome keys', 'Spill-resistant and durable'], cons: ['Not mechanical'],
    },
    faq: [{ q: 'Is the Logitech G213 mechanical?', a: 'No, it uses Mech-Dome (membrane) keys designed to feel more tactile and responsive than a standard membrane keyboard, at a lower price than mechanical.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4eFYuQi', slug: 'logitech-g435',
    title: 'Logitech G435 LIGHTSPEED Wireless Gaming Headset',
    brand: 'Logitech G', category: 'Headsets', badges: ['Trending'],
    rating: 4.4, reviewCount: 9000, isPrime: true, hue: 300,
    bullets: [
      'Ultra-light 165g frame for all-day comfort',
      'LIGHTSPEED 2.4GHz wireless plus Bluetooth',
      'Dual beamforming mics with no boom arm',
      'Up to 18 hours of battery per charge',
    ],
    specs: { 'Drivers': '40 mm', 'Connectivity': 'LIGHTSPEED + Bluetooth', 'Weight': '165 g', 'Battery': 'Up to 18 h', 'Microphone': 'Dual beamforming' },
    review: {
      summary: 'A featherweight dual-wireless headset that’s ideal for long, comfortable sessions.',
      paragraphs: ['The G435 is remarkably light and offers both LIGHTSPEED and Bluetooth, making it a flexible pick for PC, console and mobile without a bulky boom mic.'],
      pros: ['Very light and comfortable', 'Dual wireless (LIGHTSPEED + Bluetooth)'], cons: ['Beamforming mic is average'],
    },
    faq: [{ q: 'Does the Logitech G435 work on PS5 and mobile?', a: 'Yes. It uses LIGHTSPEED 2.4GHz wireless for PC/PS5 and Bluetooth for phones and other Bluetooth devices.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4eWYVEy', slug: 'corsair-hs55',
    title: 'Corsair HS55 Stereo Gaming Headset',
    brand: 'Corsair', category: 'Headsets', badges: ['Top Rated'],
    rating: 4.5, reviewCount: 7000, isPrime: true, hue: 260,
    bullets: [
      '50mm neodymium drivers for clear, detailed audio',
      'Plush memory-foam ear pads for comfort',
      'Flip-up mute microphone with clear voice pickup',
      'Multi-platform 3.5mm connection',
    ],
    specs: { 'Drivers': '50 mm', 'Microphone': 'Flip-to-mute', 'Connectivity': '3.5 mm', 'Weight': '258 g', 'Compatibility': 'PC, PS5, Switch, mobile' },
    review: {
      summary: 'A comfortable, great-value wired headset with a genuinely useful flip-to-mute mic.',
      paragraphs: ['The HS55 keeps things simple and does them well: comfy memory-foam pads, clean stereo sound and a convenient flip-to-mute mic across every platform with a 3.5mm jack.'],
      pros: ['Comfortable for long sessions', 'Handy flip-to-mute mic'], cons: ['Wired stereo only'],
    },
    faq: [{ q: 'Is the Corsair HS55 good value?', a: 'Yes. It offers comfortable memory-foam pads, clear 50mm drivers and a flip-to-mute mic at a budget-friendly price across PC and consoles.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4eGH6Lf', slug: 'acer-nitro-24',
    title: 'Acer Nitro 24" Full HD 165Hz IPS Gaming Monitor',
    brand: 'Acer', category: 'Monitors', badges: ['Bestseller', 'Trending'],
    rating: 4.6, reviewCount: 11000, isPrime: false, hue: 160,
    bullets: [
      '23.8-inch Full HD IPS panel with wide viewing angles',
      '165Hz refresh with 1ms VRB for fast motion',
      'AMD FreeSync Premium for tear-free gaming',
      'Slim-bezel design ideal for dual-monitor setups',
    ],
    specs: { 'Panel': 'IPS', 'Resolution': '1920 × 1080', 'Refresh Rate': '165 Hz', 'Response Time': '1 ms (VRB)', 'Adaptive Sync': 'FreeSync Premium' },
    review: {
      summary: 'The best value 1080p high-refresh gaming monitor for most new competitive setups.',
      paragraphs: ['A 24-inch 1080p 165Hz IPS panel hits the value sweet spot for esports: fast, sharp and easy to drive even on modest GPUs, with better colour than budget TN screens.'],
      pros: ['Fast 165Hz IPS at a low price', 'Easy to drive for high FPS'], cons: ['1080p only'],
    },
    faq: [{ q: 'Is a 24-inch 1080p 165Hz monitor good for competitive gaming?', a: 'Yes. It is the most popular competitive size and resolution — high refresh for smooth motion and light enough on the GPU to sustain high frame rates.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4woa20C', slug: 'samsung-odyssey-g5',
    title: 'Samsung Odyssey G5 27" QHD 165Hz Curved Gaming Monitor',
    brand: 'Samsung', category: 'Monitors', badges: ['Top Rated'],
    rating: 4.5, reviewCount: 8500, isPrime: false, hue: 140,
    bullets: [
      '27-inch QHD (1440p) VA panel with a 1000R curve',
      '165Hz refresh and 1ms response for smooth gameplay',
      'HDR10 support for richer contrast',
      'AMD FreeSync Premium for tear-free visuals',
    ],
    specs: { 'Panel': 'VA (1000R curved)', 'Resolution': '2560 × 1440', 'Refresh Rate': '165 Hz', 'Response Time': '1 ms', 'HDR': 'HDR10', 'Adaptive Sync': 'FreeSync Premium' },
    review: {
      summary: 'An immersive, great-value 1440p curved monitor for players who want more screen and contrast.',
      paragraphs: ['The Odyssey G5’s 1000R curve and deep VA contrast make 1440p gaming feel immersive, and 165Hz keeps motion smooth for both competitive and single-player titles.'],
      pros: ['Immersive 1000R curve', 'Great contrast at 1440p'], cons: ['VA response slower than IPS'],
    },
    faq: [{ q: 'Is a curved monitor better for gaming?', a: 'A curved monitor like the Odyssey G5 wraps the image slightly around your view, which many players find more immersive, especially at 27 inches and larger.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4b3QtSS', slug: 'sony-dualsense',
    title: 'Sony DualSense Wireless Controller (PS5)',
    brand: 'Sony', category: 'Controllers', badges: ['Bestseller', 'Top Rated'],
    rating: 4.7, reviewCount: 70000, isPrime: true, hue: 220,
    bullets: [
      'Haptic feedback delivers nuanced in-game sensations',
      'Adaptive triggers add real tension and resistance',
      'Built-in microphone and create button',
      'USB-C rechargeable; works on PS5 and PC',
    ],
    specs: { 'Connectivity': 'Bluetooth + USB-C', 'Feedback': 'Haptics + adaptive triggers', 'Microphone': 'Built-in', 'Battery': 'Rechargeable', 'Compatibility': 'PS5, PC' },
    review: {
      summary: 'The most innovative modern controller — haptics and adaptive triggers are genuinely next-gen.',
      paragraphs: ['Beyond PS5, the DualSense is a superb PC controller too. The haptics and adaptive triggers add immersion no other pad matches, and build quality is excellent.'],
      pros: ['Immersive haptics + adaptive triggers', 'Great build quality'], cons: ['Battery life is average'],
    },
    faq: [{ q: 'Does the PS5 DualSense work on PC?', a: 'Yes. It connects to PC via USB-C or Bluetooth and is widely supported, though advanced haptics and adaptive triggers work best over a wired connection in supported games.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4awxYq1', slug: 'logitech-f710',
    title: 'Logitech F710 Wireless Gamepad',
    brand: 'Logitech G', category: 'Controllers', badges: ['Trending'],
    rating: 4.3, reviewCount: 13000, isPrime: true, hue: 100,
    bullets: [
      '2.4GHz wireless with a plug-and-play nano receiver',
      'Dual vibration feedback motors',
      'Familiar console-style dual-analog layout',
      'XInput and DirectInput modes for broad PC support',
    ],
    specs: { 'Connectivity': '2.4 GHz wireless', 'Vibration': 'Dual-motor', 'Battery': '2 × AA', 'Modes': 'XInput / DirectInput', 'Compatibility': 'PC' },
    review: {
      summary: 'A dependable wireless PC gamepad with a familiar layout and easy plug-and-play setup.',
      paragraphs: ['The F710 is a long-standing favourite for PC couch gaming — reliable 2.4GHz wireless, dual vibration and both XInput and DirectInput for compatibility with older titles.'],
      pros: ['Reliable wireless', 'Broad PC game support'], cons: ['Uses AA batteries'],
    },
    faq: [{ q: 'Does the Logitech F710 work with all PC games?', a: 'It supports both XInput and DirectInput modes, so it works with modern games (XInput) and many older titles (DirectInput).' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4v6m25F', slug: 'zotac-rtx-4060-ti',
    title: 'ZOTAC GAMING GeForce RTX 4060 Ti 8GB Graphics Card',
    brand: 'ZOTAC', category: 'Graphics Cards', badges: ['Top Rated'],
    rating: 4.5, reviewCount: 3000, isPrime: false, hue: 90,
    bullets: [
      '8GB GDDR6 for strong 1080p and capable 1440p gaming',
      'NVIDIA DLSS 3 with Frame Generation',
      '3rd-gen ray tracing for realistic lighting',
      'Compact dual-fan cooling, PCIe 4.0',
    ],
    specs: { 'Memory': '8 GB GDDR6', 'Interface': 'PCIe 4.0', 'Features': 'DLSS 3 + Ray Tracing', 'Power': '1 × 8-pin', 'Outputs': 'DP 1.4a, HDMI 2.1' },
    review: {
      summary: 'A step up from the RTX 4060 for high-refresh 1080p and smoother 1440p with DLSS 3.',
      paragraphs: ['The 4060 Ti gives you extra headroom over the 4060 for 1440p, and DLSS 3 Frame Generation pushes frame rates higher in supported games while staying power-efficient.'],
      pros: ['Great high-refresh 1080p/1440p', 'Efficient with DLSS 3'], cons: ['8GB VRAM in demanding titles'],
    },
    faq: [{ q: 'Is the RTX 4060 Ti good for 1440p?', a: 'Yes. With DLSS 3 enabled it handles 1440p high-refresh gaming well in most titles, making it a solid step up from the RTX 4060.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4eHqBi3', slug: 'sapphire-rx-7600',
    title: 'SAPPHIRE PULSE AMD Radeon RX 7600 8GB Graphics Card',
    brand: 'Sapphire', category: 'Graphics Cards', badges: ['Trending'],
    rating: 4.5, reviewCount: 2500, isPrime: false, hue: 70,
    bullets: [
      '8GB GDDR6 tuned for excellent 1080p performance',
      'AMD FSR 3 upscaling and frame generation',
      'Ray tracing acceleration support',
      'Cool, quiet dual-fan PULSE cooler, PCIe 4.0',
    ],
    specs: { 'Memory': '8 GB GDDR6', 'Interface': 'PCIe 4.0', 'Features': 'FSR 3 + Ray Tracing', 'Power': '1 × 8-pin', 'Outputs': '3× DP, HDMI' },
    review: {
      summary: 'One of the best value 1080p graphics cards, with FSR 3 to stretch frame rates further.',
      paragraphs: ['The RX 7600 is a strong 1080p value pick from AMD, and FSR 3 with frame generation gives it useful extra performance in supported games.'],
      pros: ['Excellent 1080p value', 'FSR 3 frame generation'], cons: ['Best suited to 1080p'],
    },
    faq: [{ q: 'Is the Radeon RX 7600 good for 1080p gaming?', a: 'Yes. It is one of the best value cards for high-refresh 1080p gaming, and AMD FSR 3 can boost frame rates further in supported titles.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4gjN71A', slug: 'crucial-p3-plus',
    title: 'Crucial P3 Plus 1TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Crucial', category: 'Storage', badges: ['Bestseller'],
    rating: 4.7, reviewCount: 30000, isPrime: true, hue: 45,
    bullets: [
      'PCIe 4.0 speeds up to 5,000 MB/s reads',
      'Excellent price-per-GB for gaming storage',
      'Compact M.2 2280 form factor',
      'Backed by a 5-year limited warranty',
    ],
    specs: { 'Interface': 'PCIe 4.0 NVMe', 'Sequential Read': 'Up to 5,000 MB/s', 'Capacity': '1 TB', 'Form Factor': 'M.2 2280', 'Warranty': '5 years' },
    review: {
      summary: 'A superb value Gen4 SSD for adding fast game storage without breaking the budget.',
      paragraphs: ['The P3 Plus delivers most of the real-world benefit of Gen4 speeds at a very friendly price, making it an easy recommendation as a games or expansion drive.'],
      pros: ['Great value Gen4 speeds', '5-year warranty'], cons: ['Not the fastest Gen4 drive'],
    },
    faq: [{ q: 'Is the Crucial P3 Plus fast enough for gaming?', a: 'Yes. Its PCIe 4.0 read speeds of up to 5,000 MB/s cut game load times significantly and make it an excellent value games drive.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4wsrRM6', slug: 'wd-black-sn770',
    title: 'WD_BLACK SN770 1TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Western Digital', category: 'Storage', badges: ['Top Rated'],
    rating: 4.7, reviewCount: 22000, isPrime: true, hue: 30,
    bullets: [
      'PCIe 4.0 speeds up to 5,150 MB/s reads',
      'Power-efficient DRAM-less design that runs cool',
      'Game Mode 2.0 optimises load performance',
      'Compact M.2 2280, 5-year warranty',
    ],
    specs: { 'Interface': 'PCIe 4.0 NVMe', 'Sequential Read': 'Up to 5,150 MB/s', 'Capacity': '1 TB', 'Form Factor': 'M.2 2280', 'Warranty': '5 years' },
    review: {
      summary: 'A fast, efficient Gen4 gaming SSD from a trusted brand, ideal as a boot or games drive.',
      paragraphs: ['The SN770 punches above its price with quick Gen4 reads and low power draw, and Game Mode 2.0 helps keep load times snappy under gaming workloads.'],
      pros: ['Fast and power-efficient', 'Trusted WD_BLACK reliability'], cons: ['DRAM-less under very heavy writes'],
    },
    faq: [{ q: 'Is the WD_BLACK SN770 good for gaming?', a: 'Yes. Its Gen4 read speeds of up to 5,150 MB/s and Game Mode 2.0 make it a fast, reliable and efficient SSD for a gaming PC.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4wm4qnp', slug: 'steelseries-qck',
    title: 'SteelSeries QcK Gaming Mousepad (Medium)',
    brand: 'SteelSeries', category: 'Mousepads', badges: ['Bestseller', 'Trending'],
    rating: 4.8, reviewCount: 50000, isPrime: true, hue: 190,
    bullets: [
      'Micro-woven cloth surface for pixel-precise tracking',
      'Non-slip rubber base stays put in intense play',
      'Durable, pro-favourite build used by esports players',
      'Optimised for both low and high sensitivity',
    ],
    specs: { 'Surface': 'Micro-woven cloth', 'Base': 'Non-slip rubber', 'Size': 'Medium (320 × 270 mm)', 'Thickness': '2 mm', 'Compatibility': 'All mouse sensors' },
    review: {
      summary: 'The default esports mousepad — consistent glide, precise control and near-indestructible.',
      paragraphs: ['The QcK is a staple on pro desks for good reason: its micro-woven surface gives consistent, controllable glide and it simply lasts, all at a low price.'],
      pros: ['Consistent, precise tracking', 'Extremely durable and affordable'], cons: ['Basic look'],
    },
    faq: [{ q: 'Why is the SteelSeries QcK so popular with pro gamers?', a: 'Its micro-woven cloth surface offers consistent, controllable glide that suits precise aiming, and it is durable and affordable — which is why it is a staple on esports desks.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/3SWha5K', slug: 'logitech-c920',
    title: 'Logitech C920 HD Pro Webcam (1080p)',
    brand: 'Logitech', category: 'Webcams', badges: ['Top Rated', 'Trending'],
    rating: 4.6, reviewCount: 65000, isPrime: true, hue: 205,
    bullets: [
      'Full HD 1080p/30fps video for clean streams and calls',
      'Dual stereo mics capture natural, clear audio',
      'Automatic light correction and autofocus',
      'Premium glass lens; works with all major apps',
    ],
    specs: { 'Resolution': '1080p / 30 fps', 'Focus': 'Autofocus', 'Microphone': 'Dual stereo', 'Lens': 'Glass', 'Connection': 'USB-A' },
    review: {
      summary: 'The go-to 1080p webcam for streamers and creators — reliable image quality that just works.',
      paragraphs: ['Years on, the C920 remains the default streaming webcam. Its sharp 1080p image, dependable autofocus and decent mics make it a safe, plug-and-play choice for content creators.'],
      pros: ['Reliable 1080p image quality', 'Plug-and-play with every app'], cons: ['30fps cap at 1080p'],
    },
    faq: [{ q: 'Is the Logitech C920 good for streaming?', a: 'Yes. Its sharp 1080p/30fps video, autofocus and built-in stereo mics have made it one of the most popular webcams for streaming and video calls.' }],
  },

  /* ----- Batch 3: expanded catalog (add your affiliateUrl per product) ----- */
  {
    asin: '', affiliateUrl: 'https://amzn.to/4v6gSH3', slug: 'razer-basilisk-v3',
    title: 'Razer Basilisk V3 Ergonomic Wired Gaming Mouse',
    brand: 'Razer', category: 'Gaming Mice', badges: ['Top Rated', 'Trending'],
    rating: 4.7, reviewCount: 34000, isPrime: true, hue: 128,
    bullets: ['Focus+ 26K DPI optical sensor', '11 programmable buttons with a smart scroll wheel', 'HyperScroll tilt wheel for fast free-spin scrolling', 'Chroma RGB with 13 lighting zones'],
    specs: { 'Sensor': 'Focus+ 26K optical', 'Max DPI': '26,000', 'Buttons': '11 programmable', 'Scroll': 'HyperScroll tilt wheel', 'Connection': 'Wired USB', 'Weight': '101 g' },
    review: { summary: 'A feature-packed ergonomic mouse with a superb scroll wheel and a flagship sensor.', paragraphs: ['The Basilisk V3 pairs a top-tier 26K sensor with a genuinely useful HyperScroll wheel and loads of buttons, making it a versatile pick for FPS and everyday productivity.'], pros: ['Excellent sensor and scroll wheel', 'Lots of programmable buttons'], cons: ['A bit heavy for pure esports'] },
    faq: [{ q: 'Is the Razer Basilisk V3 good for FPS and MMO?', a: 'Yes. Its flagship 26K sensor suits FPS, while the 11 programmable buttons and tilt-scroll wheel make it great for MMO and productivity too.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/44dCbLJ', slug: 'glorious-model-o',
    title: 'Glorious Model O Ultralight Honeycomb Gaming Mouse',
    brand: 'Glorious', category: 'Gaming Mice', badges: ['Top Rated'],
    rating: 4.6, reviewCount: 18000, isPrime: true, hue: 20,
    bullets: ['Ultralight ~67g honeycomb shell', 'Pixart 3360 sensor up to 12,000 DPI', 'Flexible Ascended cord feels near-wireless', 'G-Skates and RGB for smooth glide and flair'],
    specs: { 'Sensor': 'Pixart 3360', 'Max DPI': '12,000', 'Weight': '~67 g', 'Cable': 'Ascended flexible cord', 'Connection': 'Wired USB', 'Buttons': '6' },
    review: { summary: 'A cult-favourite ultralight mouse that made honeycomb designs mainstream.', paragraphs: ['At around 67g the Model O flicks effortlessly, and the flexible cord and smooth feet make it feel almost wireless — a favourite of aim-focused FPS players.'], pros: ['Very light for fast aim', 'Excellent feet and cable'], cons: ['Honeycomb shell not for everyone'] },
    faq: [{ q: 'Is the Glorious Model O good for competitive FPS?', a: 'Yes. Its ~67g ultralight body and smooth glide make quick flick shots easy, which is why it is popular with competitive FPS players.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4vISXOR', slug: 'keychron-k2',
    title: 'Keychron K2 Wireless Mechanical Keyboard (75%)',
    brand: 'Keychron', category: 'Keyboards', badges: ['Bestseller', 'Trending'],
    rating: 4.6, reviewCount: 21000, isPrime: true, hue: 215,
    bullets: ['Compact 75% layout with function row and arrows', 'Bluetooth 5.1 (up to 3 devices) plus USB-C wired', 'Hot-swappable option and Mac/Windows keycaps', 'RGB/white backlight with a durable frame'],
    specs: { 'Layout': '75% (84 keys)', 'Switches': 'Gateron mechanical', 'Connectivity': 'Bluetooth 5.1 + USB-C', 'Compatibility': 'Mac + Windows', 'Backlight': 'RGB' },
    review: { summary: 'The go-to wireless mechanical for people who want one board for work and play.', paragraphs: ['The K2 nails the 75% wireless niche — compact, cross-platform, and comfortable to type on, with Bluetooth for tidy desks and USB-C when you want zero latency.'], pros: ['Great wireless + wired flexibility', 'Compact, cross-platform'], cons: ['Fairly tall without a wrist rest'] },
    faq: [{ q: 'Can the Keychron K2 switch between devices?', a: 'Yes. Over Bluetooth 5.1 it can pair with up to three devices and switch between them, and it also works wired over USB-C for the lowest latency.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4v7Vz7G', slug: 'razer-huntsman-mini',
    title: 'Razer Huntsman Mini 60% Optical Gaming Keyboard',
    brand: 'Razer', category: 'Keyboards', badges: ['Top Rated'],
    rating: 4.6, reviewCount: 16000, isPrime: true, hue: 132,
    bullets: ['Ultra-compact 60% layout for maximum desk space', 'Razer optical switches for fast, light actuation', 'Doubleshot PBT keycaps resist shine and wear', 'Per-key Chroma RGB, detachable USB-C'],
    specs: { 'Layout': '60%', 'Switches': 'Razer optical', 'Keycaps': 'Doubleshot PBT', 'Backlight': 'Per-key RGB', 'Connection': 'USB-C (detachable)' },
    review: { summary: 'A fast, compact 60% board that frees up huge amounts of mouse room.', paragraphs: ['The Huntsman Mini is a favourite for low-sensitivity players: its 60% footprint clears the desk, and the optical switches are fast and consistent.'], pros: ['Maximum mouse space', 'Fast optical switches, premium keycaps'], cons: ['60% layout has a learning curve'] },
    faq: [{ q: 'Is a 60% keyboard good for gaming?', a: 'Yes. A 60% board like the Huntsman Mini removes arrow keys and the numpad to free up desk space for wide, low-sensitivity mouse movements favoured in FPS games.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4wnAFCz', slug: 'steelseries-arctis-nova-7',
    title: 'SteelSeries Arctis Nova 7 Wireless Gaming Headset',
    brand: 'SteelSeries', category: 'Headsets', badges: ['Bestseller', 'Top Rated'],
    rating: 4.6, reviewCount: 14000, isPrime: true, hue: 285,
    bullets: ['Dual wireless: 2.4GHz + Bluetooth simultaneously', 'Award-winning retractable ClearCast mic', '360° Spatial Audio for precise positioning', 'Up to 38 hours battery, fast USB-C charging'],
    specs: { 'Drivers': '40 mm', 'Connectivity': '2.4 GHz + Bluetooth', 'Microphone': 'Retractable ClearCast', 'Battery': 'Up to 38 h', 'Compatibility': 'PC, PS5, Switch, mobile' },
    review: { summary: 'One of the best all-round wireless headsets — great mic, comfort and simultaneous dual wireless.', paragraphs: ['The Nova 7 lets you run 2.4GHz game audio and Bluetooth chat at once, and its comfort and mic quality are class-leading, making it a top mid-range wireless pick.'], pros: ['Simultaneous dual wireless', 'Excellent mic and comfort'], cons: ['Premium mid-range price'] },
    faq: [{ q: 'Can the Arctis Nova 7 use 2.4GHz and Bluetooth at once?', a: 'Yes. It can run lossless 2.4GHz game audio and Bluetooth at the same time, so you can hear your game and take a phone or Discord call simultaneously.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4wlTUwv', slug: 'razer-kraken-v3',
    title: 'Razer Kraken V3 Wired Gaming Headset (7.1 Surround)',
    brand: 'Razer', category: 'Headsets', badges: ['Trending'],
    rating: 4.5, reviewCount: 9500, isPrime: true, hue: 126,
    bullets: ['TriForce Titanium 50mm drivers for clear highs', 'THX Spatial Audio 7.1 surround for positioning', 'HyperClear cardioid mic for clear voice chat', 'Plush hybrid-fabric memory-foam cushions'],
    specs: { 'Drivers': 'TriForce Titanium 50 mm', 'Surround': 'THX Spatial 7.1', 'Microphone': 'HyperClear cardioid', 'Connection': 'USB', 'Compatibility': 'PC' },
    review: { summary: 'A comfortable wired headset with strong surround audio for competitive positioning.', paragraphs: ['The Kraken V3 brings Razer’s TriForce drivers and THX Spatial Audio together for accurate positional sound, wrapped in some of the comfiest cushions around.'], pros: ['Great surround positioning', 'Very comfortable cushions'], cons: ['USB/PC-focused'] },
    faq: [{ q: 'Does the Razer Kraken V3 have surround sound?', a: 'Yes. It supports THX Spatial Audio 7.1 surround on PC, which helps you pinpoint footsteps and gunfire directionally in competitive games.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/445nwCl', slug: 'benq-zowie-xl2411k',
    title: 'BenQ ZOWIE XL2411K 24" 144Hz Esports Gaming Monitor',
    brand: 'BenQ ZOWIE', category: 'Monitors', badges: ['Top Rated', 'Trending'],
    rating: 4.6, reviewCount: 7200, isPrime: false, hue: 158,
    bullets: ['24-inch 1080p TN panel built for esports', '144Hz refresh with fast 1ms response', 'DyAc technology sharpens fast on-screen motion', 'Adjustable stand with shield-friendly design'],
    specs: { 'Panel': 'TN', 'Resolution': '1920 × 1080', 'Refresh Rate': '144 Hz', 'Response Time': '1 ms', 'Feature': 'DyAc motion clarity' },
    review: { summary: 'A dedicated esports monitor tuned for the clearest possible fast motion.', paragraphs: ['ZOWIE monitors are a competitive staple, and the XL2411K’s DyAc tech makes tracking flick-heavy targets clearer than most panels at this refresh rate.'], pros: ['Excellent motion clarity (DyAc)', 'Esports-tuned stand and settings'], cons: ['TN colours weaker than IPS'] },
    faq: [{ q: 'Why do pro gamers use BenQ ZOWIE monitors?', a: 'ZOWIE monitors like the XL2411K use DyAc motion-clarity technology and esports-tuned settings that make fast targets easier to track, which is why they are common at tournaments.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4fcxMil', slug: 'asus-tuf-vg259qr',
    title: 'ASUS TUF Gaming VG259QR 24.5" 165Hz IPS Monitor',
    brand: 'ASUS', category: 'Monitors', badges: ['Bestseller'],
    rating: 4.6, reviewCount: 9800, isPrime: false, hue: 148,
    bullets: ['24.5-inch Full HD IPS with great viewing angles', '165Hz refresh and 1ms MPRT response', 'G-SYNC Compatible and FreeSync support', 'Ergonomic stand with tilt, swivel and height'],
    specs: { 'Panel': 'IPS', 'Resolution': '1920 × 1080', 'Refresh Rate': '165 Hz', 'Response Time': '1 ms (MPRT)', 'Adaptive Sync': 'G-SYNC Compatible + FreeSync' },
    review: { summary: 'A well-rounded 1080p 165Hz IPS monitor with a genuinely good ergonomic stand.', paragraphs: ['The VG259QR combines fast IPS motion with a fully adjustable stand and dual adaptive sync, making it a great, comfortable esports-ready display.'], pros: ['Fast IPS + full ergonomic stand', 'Dual adaptive sync'], cons: ['1080p only'] },
    faq: [{ q: 'Is the ASUS TUF VG259QR good for competitive gaming?', a: 'Yes. Its 165Hz IPS panel with 1ms MPRT and G-SYNC Compatibility delivers smooth, tear-free motion ideal for competitive 1080p gaming.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4y3zyJZ', slug: 'cellbell-c104',
    title: 'CELLBELL C104 Ergonomic Mid-Back Gaming/Office Chair',
    brand: 'CELLBELL', category: 'Chairs', badges: ['Bestseller'],
    rating: 4.2, reviewCount: 26000, isPrime: true, hue: 8,
    bullets: ['Comfortable mid-back ergonomic design', 'Breathable mesh back keeps you cool', 'Adjustable height with a smooth tilt mechanism', 'Sturdy nylon base with smooth-glide castors'],
    specs: { 'Design': 'Mid-back ergonomic', 'Back': 'Breathable mesh', 'Adjustment': 'Height + tilt', 'Base': 'Nylon with castors', 'Use': 'Gaming + office' },
    review: { summary: 'A hugely popular budget mesh chair for comfortable, breathable all-day sitting.', paragraphs: ['For work-from-home gamers on a budget, the C104’s breathable mesh back and simple adjustability make it one of India’s best-selling value chairs.'], pros: ['Breathable and affordable', 'Easy to assemble'], cons: ['Mid-back offers less neck support'] },
    faq: [{ q: 'Is a mesh chair good for long gaming sessions?', a: 'Yes. A breathable mesh chair like the CELLBELL C104 keeps you cooler over long sessions than PU leather, which can trap heat.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/3TfnIfP', slug: '8bitdo-ultimate',
    title: '8BitDo Ultimate Wireless Controller with Charging Dock',
    brand: '8BitDo', category: 'Controllers', badges: ['Top Rated', 'Trending'],
    rating: 4.7, reviewCount: 12000, isPrime: true, hue: 105,
    bullets: ['Hall-effect joysticks are drift-proof by design', '2.4GHz, Bluetooth and USB-C connectivity', 'Two rear buttons and deep software customisation', 'Included charging dock keeps it topped up'],
    specs: { 'Sticks': 'Hall-effect (anti-drift)', 'Connectivity': '2.4 GHz + Bluetooth + USB-C', 'Extras': '2 rear buttons, charging dock', 'Battery': 'Rechargeable', 'Compatibility': 'PC, Switch, Android' },
    review: { summary: 'A superb value pro-style controller with drift-proof Hall-effect sticks and a charging dock.', paragraphs: ['The 8BitDo Ultimate offers Hall-effect sticks, rear buttons and a charging dock at a price well below first-party pro pads, making it a favourite for PC and Switch.'], pros: ['Drift-proof Hall sticks + dock', 'Great value and customisation'], cons: ['No native Xbox support'] },
    faq: [{ q: 'Does the 8BitDo Ultimate have Hall-effect sticks?', a: 'Yes. It uses Hall-effect joysticks that resist the stick drift that eventually affects controllers with traditional potentiometer sticks.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4v7RWyI', slug: 'msi-rtx-4070-super',
    title: 'MSI GeForce RTX 4070 SUPER VENTUS 12GB Graphics Card',
    brand: 'MSI', category: 'Graphics Cards', badges: ['Top Rated', 'Trending'],
    rating: 4.7, reviewCount: 3400, isPrime: false, hue: 88,
    bullets: ['12GB GDDR6X for excellent 1440p and entry 4K', 'DLSS 3 Frame Generation for high frame rates', 'Strong ray tracing performance', 'Cool, quiet VENTUS triple-fan design'],
    specs: { 'Memory': '12 GB GDDR6X', 'Interface': 'PCIe 4.0', 'Features': 'DLSS 3 + Ray Tracing', 'Power': '1 × 16-pin (650W PSU)', 'Outputs': '3× DP 1.4a, HDMI 2.1' },
    review: { summary: 'The sweet-spot high-refresh 1440p card, with enough power for entry-level 4K.', paragraphs: ['The RTX 4070 SUPER is arguably the best value high-end 1440p GPU: 12GB VRAM, strong ray tracing and DLSS 3 make it a great match for high-refresh 1440p monitors.'], pros: ['Excellent 1440p + entry 4K', '12GB VRAM and DLSS 3'], cons: ['Needs a capable PSU'] },
    faq: [{ q: 'Is the RTX 4070 SUPER good for 1440p gaming?', a: 'Yes. With 12GB of VRAM, strong ray tracing and DLSS 3, it is one of the best cards for high-refresh 1440p gaming and can handle entry-level 4K.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4wnAR4L', slug: 'asrock-rx-7700-xt',
    title: 'ASRock AMD Radeon RX 7700 XT 12GB Graphics Card',
    brand: 'ASRock', category: 'Graphics Cards', badges: ['Trending'],
    rating: 4.5, reviewCount: 2100, isPrime: false, hue: 72,
    bullets: ['12GB GDDR6 for strong 1440p gaming', 'AMD FSR 3 upscaling and frame generation', 'Ray tracing acceleration support', 'Triple-fan cooler for quiet operation'],
    specs: { 'Memory': '12 GB GDDR6', 'Interface': 'PCIe 4.0', 'Features': 'FSR 3 + Ray Tracing', 'Power': '2 × 8-pin', 'Outputs': '3× DP, HDMI' },
    review: { summary: 'A powerful value 1440p card from AMD, with 12GB VRAM and FSR 3.', paragraphs: ['The RX 7700 XT is a strong 1440p performer with a generous 12GB of VRAM, and FSR 3 helps push frame rates higher in supported titles.'], pros: ['Great 1440p performance', '12GB VRAM'], cons: ['Ray tracing trails NVIDIA'] },
    faq: [{ q: 'Is the Radeon RX 7700 XT good for 1440p?', a: 'Yes. With 12GB of VRAM and FSR 3 frame generation, it is a strong value option for high-refresh 1440p gaming.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4eUeFIF', slug: 'samsung-990-pro-2tb',
    title: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD',
    brand: 'Samsung', category: 'Storage', badges: ['Bestseller', 'Top Rated'],
    rating: 4.8, reviewCount: 19000, isPrime: true, hue: 42,
    bullets: ['PCIe 4.0 speeds up to 7,450 MB/s reads', 'Top-tier performance for gaming and creation', 'Efficient controller with improved thermals', '2TB capacity with a 5-year warranty'],
    specs: { 'Interface': 'PCIe 4.0 x4 NVMe', 'Sequential Read': 'Up to 7,450 MB/s', 'Sequential Write': 'Up to 6,900 MB/s', 'Capacity': '2 TB', 'Form Factor': 'M.2 2280', 'Warranty': '5 years' },
    review: { summary: 'One of the fastest PCIe 4.0 SSDs — a premium 2TB drive for big game libraries.', paragraphs: ['The 990 PRO sits at the top of the Gen4 stack with blistering speeds and Samsung reliability, and 2TB gives serious room for a growing library of large games.'], pros: ['Class-leading Gen4 speeds', 'Roomy 2TB + 5-yr warranty'], cons: ['Premium price'] },
    faq: [{ q: 'Is the Samsung 990 PRO worth it for gaming?', a: 'Yes. It offers some of the fastest PCIe 4.0 speeds available (up to 7,450 MB/s) plus 2TB of space and Samsung reliability, ideal for large modern game libraries.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4gTy3rG', slug: 'elgato-stream-deck-mk2',
    title: 'Elgato Stream Deck MK.2 (15 Customisable LCD Keys)',
    brand: 'Elgato', category: 'Streaming Gear', badges: ['Top Rated', 'Trending'],
    rating: 4.8, reviewCount: 15000, isPrime: true, hue: 195,
    bullets: ['15 customisable LCD keys for one-tap control', 'Trigger scenes, clips, audio, apps and more', 'Deep integration with OBS, Twitch and YouTube', 'Interchangeable faceplate and adjustable stand'],
    specs: { 'Keys': '15 LCD (customisable)', 'Use': 'Streaming + productivity', 'Integrations': 'OBS, Twitch, YouTube, Discord', 'Connection': 'USB-C', 'Software': 'Stream Deck app' },
    review: { summary: 'The definitive control deck for streamers — one tap for scenes, clips and effects.', paragraphs: ['The Stream Deck MK.2 turns complex streaming actions into single key presses, and its ecosystem of plugins makes it just as useful for productivity as for going live.'], pros: ['Massively speeds up streaming', 'Huge plugin ecosystem'], cons: ['Premium price for casual streamers'] },
    faq: [{ q: 'What does an Elgato Stream Deck do?', a: 'It provides 15 customisable LCD keys that trigger actions with one tap — switching scenes, posting clips, muting audio, launching apps and more — integrating deeply with OBS, Twitch and YouTube.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4eUZIFY', slug: 'blue-yeti-usb-mic',
    title: 'Logitech for Creators Blue Yeti USB Microphone',
    brand: 'Blue', category: 'Microphones', badges: ['Bestseller'],
    rating: 4.7, reviewCount: 80000, isPrime: true, hue: 200,
    bullets: ['Broadcast-quality USB condenser mic', 'Four pickup patterns for any recording situation', 'Onboard gain, mute and headphone monitoring', 'Plug-and-play for streaming, podcasts and calls'],
    specs: { 'Type': 'USB condenser', 'Pickup Patterns': 'Cardioid, omni, bidirectional, stereo', 'Controls': 'Gain, mute, monitoring', 'Connection': 'USB', 'Compatibility': 'PC, Mac' },
    review: { summary: 'The most popular USB microphone for streamers and podcasters — versatile and easy.', paragraphs: ['The Blue Yeti remains the default USB mic recommendation thanks to its clear sound, four pickup patterns and true plug-and-play simplicity.'], pros: ['Great sound, four patterns', 'Truly plug-and-play'], cons: ['Sensitive to desk noise'] },
    faq: [{ q: 'Is the Blue Yeti good for streaming and podcasts?', a: 'Yes. Its clear USB condenser sound, four selectable pickup patterns and onboard controls make it one of the most popular mics for streaming, podcasting and voice calls.' }],
  },
  {
    asin: '', affiliateUrl: 'https://amzn.to/4eJWCWQ', slug: 'hyperx-quadcast-s',
    title: 'HyperX QuadCast S RGB USB Condenser Microphone',
    brand: 'HyperX', category: 'Microphones', badges: ['Top Rated', 'Trending'],
    rating: 4.7, reviewCount: 24000, isPrime: true, hue: 208,
    bullets: ['Dynamic RGB lighting with customisable effects', 'Tap-to-mute sensor with a status indicator', 'Four polar patterns and a built-in shock mount', 'Built-in pop filter for cleaner vocals'],
    specs: { 'Type': 'USB condenser', 'Pickup Patterns': 'Stereo, omni, cardioid, bidirectional', 'Lighting': 'RGB', 'Extras': 'Tap-to-mute, shock mount, pop filter', 'Connection': 'USB-C' },
    review: { summary: 'A stylish, feature-rich USB mic with RGB, tap-to-mute and great vocal clarity.', paragraphs: ['The QuadCast S combines eye-catching RGB with genuinely useful features — a built-in shock mount, pop filter and tap-to-mute — plus clear condenser audio for streaming.'], pros: ['Great features and looks', 'Clear vocals, easy mute'], cons: ['RGB adds to the price'] },
    faq: [{ q: 'Does the HyperX QuadCast S have a built-in pop filter?', a: 'Yes. It includes a built-in pop filter and internal shock mount, plus a tap-to-mute sensor and four selectable polar patterns.' }],
  },
];

/**
 * Canonical outbound URL for a product's Buy button.
 * Priority: your pasted affiliate link → explicit detailUrl → build from a real
 * ASIN → fall back to the store link (so the click still earns during the sale).
 * affiliate.js enforces the tag + rel/target at click time.
 */
export function getDetailUrl(product) {
  if (product.affiliateUrl) return product.affiliateUrl;
  if (product.detailUrl) return product.detailUrl;
  if (product.asin && !/^B0EXMPL/i.test(product.asin)) {
    return `https://${CONFIG.MARKETPLACE_HOST}/dp/${product.asin}`;
  }
  return CONFIG.AMAZON_STORE_URL; // no product link yet → store link (still tagged)
}

/** True once a product has its own affiliate link (vs. using the store fallback). */
export function hasOwnLink(product) {
  return Boolean(product.affiliateUrl || product.detailUrl || (product.asin && !/^B0EXMPL/i.test(product.asin)));
}

/** Find a product by its URL slug. */
export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

/** Products that carry a given badge ("Bestseller" | "Top Rated" | "Trending"). */
export function getProductsByBadge(badge) {
  return PRODUCTS.filter((p) => p.badges.includes(badge));
}

/**
 * Absolute URL of a product's primary image, for JSON-LD / Open Graph.
 * Uses the real `image` if set, else the conventional assets/<slug>.jpg path.
 */
export function getPrimaryImageUrl(product) {
  if (product.image && /^https?:\/\//.test(product.image)) return product.image;
  return `${CONFIG.SITE_URL}/assets/${product.slug}.jpg`;
}

/**
 * Build the image set for a product (main + thumbnails).
 *   • If `product.image` is set, use it (plus any `product.images[]`) as real photos.
 *   • Otherwise fall back to self-contained inline-SVG placeholders.
 * TO ADD REAL IMAGES: set `image: 'https://…'` (and optional `images: ['…','…']`)
 * on the product — from PA-API, a SiteStripe image link, or your own hosting.
 */
export function getProductImages(product) {
  if (product.image) {
    const srcs = [product.image, ...(Array.isArray(product.images) ? product.images : [])];
    const thumbs = srcs.map((src, i) => ({ src, label: `${product.title} — view ${i + 1}` }));
    return { main: product.image, thumbs };
  }
  const variants = ['Front View', 'Side Profile', 'In Setup', 'Detail / Ports'];
  const main = placeholderImage({ label: product.brand, sub: product.category, hue: product.hue });
  const thumbs = variants.map((v, i) => ({
    src: placeholderImage({ label: product.brand, sub: v, hue: (product.hue + i * 14) % 360 }),
    label: `${product.title} — ${v}`,
  }));
  thumbs[0].src = main; // keep the gallery's first thumb consistent with the main image
  return { main, thumbs };
}
