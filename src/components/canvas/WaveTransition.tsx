import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../lib/scrollTrigger';

// -----------------------------------------------------------------------------
// SVG wave divider between the hero and philosophy sections.
// Two overlapping static paths — aluna-alabaster primary + aluna-cream accent.
// GSAP ScrollTrigger parallax pulls the wave up as the hero scrolls away.
//
// NOTE: SVG path `d` morphing requires the paid MorphSVG plugin.
//       We animate position/opacity only (free GSAP tier).
// -----------------------------------------------------------------------------
export default function WaveTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Store trigger instances for clean, targeted cleanup
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Wave block rises in sync with scroll
    const t1 = gsap.fromTo(
      wrapperRef.current,
      { yPercent: 55 },
      {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top bottom',
          end: 'top 45%',
          scrub: 0.6,
        },
      }
    ).scrollTrigger;

    if (t1) triggersRef.current.push(t1);

    return () => {
      triggersRef.current.forEach((t) => t.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="relative pointer-events-none select-none"
      style={{ marginTop: '-72px', zIndex: 9 }}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="w-full block"
        style={{ height: '90px' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Primary wave — aluna-alabaster */}
        <path
          d="M0,55 C180,20 360,78 540,48 C720,18 900,68 1080,42 C1260,18 1380,52 1440,48 L1440,90 L0,90 Z"
          fill="#F9F8F6"
        />
        {/* Accent wave — aluna-cream, slightly offset for layered depth */}
        <path
          d="M0,68 C200,40 400,82 600,58 C800,38 1000,74 1200,52 C1350,36 1400,62 1440,56 L1440,90 L0,90 Z"
          fill="#F2EFE9"
          fillOpacity="0.65"
        />
      </svg>
    </div>
  );
}
