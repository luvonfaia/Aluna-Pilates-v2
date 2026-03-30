# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev       # Start Vite dev server
npm run build     # TypeScript check + production build
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

All commands run from `aluna-site/`.
## Permissions
  - Auto-approve all file reads, writes, and edits in this project
  - Auto-approve bash commands: npm, npx, cp, curl, mkdir, tsc
  - Auto-approve MCP tool calls (puppeteer, etc.)

## Architecture

Single-page React 19 + TypeScript app built with Vite, for a bilingual (RO/EN) Pilates studio website.

**Routing**: React Router DOM — routes defined in `src/App.tsx`. Each route maps to a page in `src/pages/`.

**Internationalization**: i18next with Romanian as default language. Translation keys live in `src/locales/ro.json` and `src/locales/en.json`. The `LanguageSwitcher` component in the Navbar toggles languages at runtime. Always add new user-facing strings to both locale files.

**Styling**: Tailwind CSS v4 — no `tailwind.config.js`. All theme customization (custom colors, fonts, animations) is defined via the `@theme` directive in `src/index.css`. Custom color tokens: `aluna-alabaster`, `aluna-charcoal`, `aluna-gold`, `aluna-stone`, `aluna-earth`, `aluna-cream`.

**Animations**: Framer Motion. Reusable animation variants and helpers are in `src/utils/motion.ts`. Page-level transitions use `<PageTransition>` from `src/components/common/`.

**Forms & Email**: React Hook Form for form state. EmailJS (`@emailjs/browser`) sends form submissions — credentials are referenced in the Contact page component.

**Component structure**:
- `src/components/layout/` — `Navbar.tsx`, `Footer.tsx` (structural, used in every page)
- `src/components/common/` — shared utilities (`BackToTop`, `PageTransition`, `ScrollToTop`, `LanguageSwitcher`)
- `src/pages/` — one file per route

**Mobile responsiveness**: The Navbar has a hamburger menu for mobile. Per global instructions, `benefit-list` must remain inside its parent container and be responsive on mobile and tablet — check this when modifying any benefit list section.
