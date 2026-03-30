import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import './i18n';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './lib/scrollTrigger';
import { setLenis } from './lib/lenis';

// Initialize Lenis + GSAP ScrollTrigger once, before React mounts.
// Placing this here (not in a useEffect) guarantees getLenis() returns
// a valid instance when any child component's useEffect runs.
const lenis = new Lenis({ autoRaf: false });
setLenis(lenis);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time: number) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
