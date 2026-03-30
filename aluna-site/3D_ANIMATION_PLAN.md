# 3D Animation Implementation Plan — Aluna Pilates Studio

## Stack

| Library | Role |
|---|---|
| `lenis` | Smooth scroll engine — replaces native CSS scroll-behavior |
| `gsap` + `ScrollTrigger` | Scroll-driven timelines (already installed) |
| `@react-three/fiber` | Three.js in React (R3F) |
| `@react-three/drei` | R3F helpers (PerformanceMonitor, useTexture, etc.) |
| `three` | WebGL renderer — R3F peer dep |

**Keep:** Framer Motion (component micro-interactions, modals, hovers)
**Keep:** GSAP existing usage in FloatingCTA
**Replace:** `window.scrollTo / scrollIntoView` → Lenis
**Replace:** CSS `scroll-behavior: smooth` → Lenis

---

## Layer Model

```
z-index: 0   ← Three.js Canvas (position: fixed, pointer-events: none, full viewport)
z-index: 1   ← Page HTML (scrolls normally via Lenis)
z-index: 50+ ← Navbar, FloatingCTA (existing, untouched)
```

---

## File Structure (new files)

```
aluna-site/src/
├── lib/
│   ├── lenis.ts              ← Lenis singleton + scrollTo helper
│   └── scrollTrigger.ts      ← GSAP ScrollTrigger registration
├── components/
│   └── canvas/
│       ├── GlobalCanvas.tsx      ← R3F Canvas overlay (fixed, pointer-events: none)
│       ├── HeroParticles.tsx     ← Gold particle field (hero section)
│       ├── PhilosophyTorus.tsx   ← Wireframe 3D ring (philosophy section)
│       └── WaveTransition.tsx    ← Warp shader between sections
└── shaders/
    ├── particles.vert.glsl
    ├── particles.frag.glsl
    └── wave.frag.glsl
```

---

## Lenis + GSAP Sync (critical pattern)

```ts
const lenis = new Lenis({ autoRaf: false })

lenis.on('scroll', ScrollTrigger.update)      // keep ScrollTrigger in sync

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)                      // GSAP sends seconds, Lenis needs ms
})

gsap.ticker.lagSmoothing(0)                   // must be 0 — prevents animation lag
```

---

## Effects by Section

### Phase 1 — Foundation ✅
- Install Lenis, wire GSAP ticker
- Replace `scrollToSection()` and `BackToTop` with Lenis
- Register GSAP ScrollTrigger globally

### Phase 2 — Hero Gold Particles
- `BufferGeometry` with custom `position`, `size`, `opacity` attributes
- `ShaderMaterial` (not PointsMaterial — need per-particle control)
- ~3,500 particles desktop / ~1,200 mobile
- Scroll position passed as GLSL uniform `uScrollProgress`
- Vertex shader: particles rise + scale down as scroll increases
- Fragment shader: `gl_PointCoord` soft circle mask with glow

```glsl
// Vertex shader excerpt
float drift = uScrollProgress * 2.0;
vec3 pos = position;
pos.y += drift * aSpeed;
gl_PointSize = aSize * (1.0 - uScrollProgress * 0.5);
```

### Phase 3 — Philosophy Torus Ring
- `TorusGeometry(1.4, 0.004, 16, 120)` wireframe
- `MeshBasicMaterial` in aluna-gold (#C9B68A), ~30% opacity
- GSAP ScrollTrigger `scrub: 1` drives `rotation.x` and `rotation.z`
- Fades in when philosophy section enters viewport

### Phase 3 — Wave Transition Shader
- Full-screen plane geometry
- Fragment shader using simplex noise displacement
- `uWaveProgress` uniform driven by ScrollTrigger scrub
- Opacity: 0 → 1 → 0 over scroll range crossing the hero→classes threshold

### Phase 4 — Polish & Mobile
- `PerformanceMonitor` from Drei (adaptive DPR)
- Mobile: reduce particles, disable torus + wave shader
- WebGL fallback: detect via `canvas.getContext('webgl2')`
- Dispose geometries/materials in R3F useEffect cleanup

---

## Performance Rules

| Rule | Detail |
|---|---|
| Particle animation | GPU only — no CPU attribute updates per frame |
| Scroll data to GPU | Via GLSL uniform, updated once per frame |
| Render loop | `frameloop="demand"` when no animation active |
| Mobile | Max 1,200 particles; disable wave shader |
| DPR | Adaptive via PerformanceMonitor |
| Cleanup | Dispose all Three.js resources on unmount |

---

## Coexistence with Existing Code

| Existing | Action |
|---|---|
| Framer Motion `whileInView` | Keep — component-level animations |
| Framer Motion hovers/modals | Keep — unrelated to scroll layer |
| GSAP in FloatingCTA | Keep — text split animation |
| `scrollToSection()` hook | Update internals to use `lenis.scrollTo()` |
| `BackToTop` component | Update to use `lenis.scrollTo(0)` |
| Navbar `window.scrollY` listener | Keep — Lenis fires native scroll events |
| `useActiveSection` IntersectionObserver | Keep — unaffected by Lenis |
| CSS `scroll-margin-top` | Remove — Lenis offset computed manually |

---

## Install Commands

```bash
# Phase 1
npm install lenis

# Phase 2-3
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
```
