# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (run from project root: C:/Users/sistem/Desktop/Magda-Pilates Website/)
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

All commands run from the **project root** (where `package.json` lives). There is no `aluna-site/` subdirectory — the source is at `src/` directly under the root.

## Permissions
- Auto-approve all file reads, writes, and edits in this project
- Auto-approve bash commands: npm, npx, cp, curl, mkdir, tsc
- Auto-approve MCP tool calls (puppeteer, etc.)

## Project Overview

**Aluna Reformer Studio** — bilingual (RO/EN) Pilates studio website for a studio in București, România.
- **Live domain**: alunareformerstudio.ro
- **Deployed to**: Vercel (SPA rewrites configured in `vercel.json`)
- **Stack**: React 19 + TypeScript, Vite, Tailwind CSS v4, Framer Motion, GSAP + ScrollTrigger, Three.js / React Three Fiber, i18next, React Router DOM v7, EmailJS, react-helmet-async, Lenis smooth scroll

## Architecture

Single-page app — all main content lives under `/` (Home). Other routes are secondary pages.

### Routes (`src/App.tsx`)
| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Home` | All main sections (hero, philosophy, about, schedule, pricing, reviews, location) |
| `/classes` | `Classes` | Class types + pricing packages |
| `/gallery` | `Gallery` | Masonry image grid with lightbox |
| `/contact` | `Contact` | Standalone contact page |
| `/cookie-policy` | `CookiePolicy` | Cookie policy (RO/EN) |
| `/privacy` | `PrivacyPolicy` | Privacy policy |
| `/about` | redirect → `/` | About is now an in-page section on Home |
| `*` | `NotFound` | 404 page |

### Home page sections (in order)
1. **Hero** — full-screen video background (`/intro.mp4`), animated headline/subtitle, two CTA buttons (Schedule / Pricing), animated 10% opening offer badge with gold shimmer
2. **WaveTransition** — WebGL canvas wave that rises between hero and philosophy on scroll
3. **Philosophy** — centered quote section with lazy-loaded 3D torus rings (Three.js/R3F, scroll-scrubbed opacity/rotation)
4. **About** — two-column text section with closing pull-quote (`id="about"`)
5. **ScheduleSection** — opening hours + "Why Aluna?" benefits list, GSAP scroll-scrub animations (`id="schedule"`)
6. **PricingSection** — Individual + Semi-Private pricing cards with scroll-scrub sweep animations (desktop: left/right; mobile: vertical), 10% opening offer block (`id="pricing"`)
7. **ReviewsSection** — auto-advancing carousel of 13 Google reviews, dot indicators, prev/next controls (`id="reviews"`)
8. **LocationSection** — Google Maps embed, info card (desktop: overlay on map; mobile: below map)

### Component structure
```
src/
├── App.tsx                        # Router + AppLayout (global providers)
├── main.tsx                       # Entry point
├── index.css                      # Tailwind @theme tokens, global utilities, keyframes
├── i18n.ts                        # i18next setup (RO default, EN)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx             # Two-strip navbar (top info + main), scroll-aware, burger menu
│   │   └── Footer.tsx             # Three-column footer (logo, nav, Instagram + copyright)
│   ├── canvas/
│   │   ├── PhilosophyTorus.tsx    # Three.js/R3F nested torus rings, scroll-scrubbed
│   │   ├── WaveTransition.tsx     # WebGL canvas wave divider
│   │   └── HeroParticles.tsx      # (unused/reserved) particle effect
│   ├── sections/
│   │   ├── ScheduleSection.tsx    # GSAP scroll-scrub, opening hours + benefits
│   │   ├── PricingSection.tsx     # GSAP scroll-scrub, desktop sweep / mobile vertical
│   │   ├── ReviewsSection.tsx     # Auto-carousel, 13 reviews, snap scroll
│   │   └── LocationSection.tsx    # Google Maps embed + address card
│   ├── modals/
│   │   ├── ContactModal.tsx       # Bottom-anchored slide-up panel via ModalPortal
│   │   ├── ContactModalForm.tsx   # React Hook Form + EmailJS submission
│   │   ├── ClassSelectionDropdown.tsx
│   │   ├── PrivacyCheckbox.tsx
│   │   └── FormStates/
│   │       ├── FormLoadingState.tsx
│   │       ├── FormSuccessState.tsx
│   │       └── FormErrorState.tsx
│   └── common/
│       ├── FloatingCTA.tsx        # Fixed 3-pill bar (Phone, Email, WhatsApp), GSAP char-split hover
│       ├── CookieBanner.tsx       # Cookie consent banner (persisted to localStorage)
│       ├── ImageLightbox.tsx      # Full-screen image lightbox with prev/next
│       ├── LanguageSwitcher.tsx   # RO/EN toggle, adapts color for dark/light bg
│       ├── BackToTop.tsx          # Scroll-to-top button
│       ├── ModalPortal.tsx        # ReactDOM.createPortal wrapper
│       ├── PageTransition.tsx     # Framer Motion page wrapper
│       └── ScrollToTop.tsx        # Route-change scroll reset
├── context/
│   ├── ContactModalContext.tsx    # isOpen, openModal, closeModal, submissionState
│   └── ThemeContext.tsx
├── hooks/
│   └── useActiveSection.ts       # IntersectionObserver-based active section + scrollToSection()
├── lib/
│   ├── lenis.ts                   # Lenis smooth scroll singleton
│   └── scrollTrigger.ts           # GSAP ScrollTrigger re-export / setup
├── utils/
│   ├── motion.ts                  # Reusable Framer Motion variants
│   └── analytics.ts               # Analytics helpers (trackModalOpen/Close, etc.)
├── config/
│   └── formConfig.ts              # EmailJS config, form field definitions
├── pages/
│   ├── Home.tsx
│   ├── Classes.tsx
│   ├── Gallery.tsx
│   ├── Contact.tsx
│   ├── NotFound.tsx
│   ├── CookiePolicy.tsx
│   └── PrivacyPolicy.tsx
└── locales/
    ├── ro.json                    # Romanian (default language)
    └── en.json                    # English
```

### Internationalization
- i18next, Romanian default. **Always add new strings to both `ro.json` and `en.json`.**
- `LanguageSwitcher` in Navbar top strip; adapts color for dark (hero) vs light (scrolled) backgrounds.

### Styling — Tailwind CSS v4
No `tailwind.config.js`. All customization via `@theme` in `src/index.css`.

**Color tokens:**
| Token | Value | Usage |
|-------|-------|-------|
| `aluna-alabaster` | `#F9F8F6` | Primary background |
| `aluna-cream` | `#F2EFE9` | Secondary background, cards |
| `aluna-gold` | `#C9B68A` | Accent, highlights, CTA hover |
| `aluna-gold-light` | `#E0D3B4` | Lighter gold variant |
| `aluna-charcoal` | `#1E1E1E` | Primary text, dark backgrounds |
| `aluna-stone` | `#6B665E` | Secondary text, muted |
| `aluna-earth` | `#8C7E6A` | Tertiary accent |

**Fonts:** Playfair Display (`font-serif`), Inter (`font-sans`), Montserrat (`font-accent`)

**Utility classes defined in `index.css`:**
- `.btn-primary` — dark on light backgrounds
- `.btn-primary-light` — white on dark/video backgrounds
- `.btn-ghost` — transparent + white border for dark backgrounds
- `.btn-secondary` — outlined dark button
- `.label-eyebrow` — small uppercase gold tracking text

**Custom keyframes:** `goldShimmer`, `badgeFloat`, `badgeBreathe`, `fadeInUp`

### Animations
- **Framer Motion**: page transitions, hero entrance, `whileInView` reveals, modal slide-up/out
- **GSAP + ScrollTrigger**: scroll-scrub for Schedule cards, Pricing cards (desktop: x-sweep, mobile: y-rise), Philosophy torus opacity
- **GSAP character-split**: FloatingCTA pill labels animate char-by-char on hover (yPercent stagger)

### Navigation
Navbar has two strips:
1. **Top info strip** — Instagram link + LanguageSwitcher; transitions from translucent to `aluna-alabaster` on scroll
2. **Main nav bar** — logo + desktop nav links; transparent → solid on scroll; collapses to hamburger on mobile

**Burger menu** (mobile): jeskojets-style full-screen overlay, right-aligned pill nav links with gold arrow icons, contact info pills (email, phone, WhatsApp) pinned to bottom. Backdrop dims the page. Logo hides while open.

**Active section tracking**: `useActiveSection` hook uses IntersectionObserver; `scrollToSection(id)` is the shared scroll helper used by Navbar, Footer, and hero buttons.

### Contact Modal
Global modal managed by `ContactModalContext`. Triggered by `openModal()` from any component.
- Bottom-anchored panel that slides up (`y: 110% → 0%`)
- Quick-contact buttons: Phone (`tel:`) + WhatsApp (`wa.me/`)
- Form with React Hook Form + EmailJS, 4 states: `idle` → `loading` → `success` / `error`
- Escape key + scroll lock when open
- Hidden (opacity 0, pointer-events none) when burger menu is open

### FloatingCTA
Fixed 3-pill bar centered at bottom. Pills: Phone, Email/Contact, WhatsApp.
- **Adaptive color**: detects luminance of background under the bar via `elementsFromPoint`, switches between dark-glass and light-glass themes
- **GSAP hover**: character-split text (yPercent stagger), icon bounce on phone/WhatsApp pills
- **Visibility**: hidden (animated out) when ContactModal or burger menu is open; rises above CookieBanner when visible
- Mobile: icon-only pills; sm+: icon + text label

### SEO & Deployment
- `react-helmet-async` for per-page `<link rel="canonical">` tags
- `public/sitemap.xml` and `public/robots.txt`
- `vercel.json`: SPA rewrite (`/(.*) → /index.html`), `cleanUrls: true`, security headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)

### Studio info (hardcoded in components)
- **Phone**: +40 786 704 688
- **Email**: hello@alunareformerstudio.ro
- **WhatsApp**: wa.me/40786704688
- **Address**: Șos. Colentina nr. 16, bl. B3, parter ap. 07, București
- **Instagram**: @alunareformerstudio
- **Hours**: Mon–Fri 08:00–21:00 / Sat 09:00–18:00 / Sun closed

## Mobile responsiveness
The Navbar has a hamburger menu for mobile. Per global instructions, `benefit-list` must remain inside its parent container and be responsive on mobile and tablet — check this whenever modifying any benefit list section (especially the "Why Aluna?" card in `ScheduleSection`).
