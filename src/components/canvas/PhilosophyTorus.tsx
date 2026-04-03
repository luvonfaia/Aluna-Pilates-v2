import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { ScrollTrigger } from '../../lib/scrollTrigger';

// -----------------------------------------------------------------------------
// Two nested torus rings — outer rotates forward, inner rotates backward.
// Opacity fades in/out at the section edges so the rings feel anchored to
// the philosophy section rather than floating across the whole page.
//
// Material refs are used directly instead of casting mesh.material, which is
// a safer pattern in R3F (avoids THREE.Material | THREE.Material[] cast).
// -----------------------------------------------------------------------------
function TorusScene() {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const outerMatRef  = useRef<THREE.MeshBasicMaterial>(null);
  const innerMatRef  = useRef<THREE.MeshBasicMaterial>(null);
  const progressRef  = useRef(0);

  useEffect(() => {
    // Refresh after fonts/images settle so ScrollTrigger measures correct positions
    ScrollTrigger.refresh();

    const trigger = ScrollTrigger.create({
      trigger: '#philosophy',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 2,
      onUpdate: (self) => {
        progressRef.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  useFrame(() => {
    const p = progressRef.current;

    // Fade at section edges: 0→0.15 fade in, 0.85→1 fade out
    const fade =
      p < 0.15 ? p / 0.15 :
      p > 0.85 ? 1 - (p - 0.85) / 0.15 :
      1;

    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.x = 0.25 + p * Math.PI * 0.75;
      outerMeshRef.current.rotation.z = 0.08 + p * Math.PI * 0.28;
    }
    if (outerMatRef.current) {
      outerMatRef.current.opacity = 0.26 * fade;
    }

    if (innerMeshRef.current) {
      // Counter-rotate for visual contrast
      innerMeshRef.current.rotation.x = -0.15 - p * Math.PI * 0.55;
      innerMeshRef.current.rotation.z =  0.12 + p * Math.PI * 0.18;
    }
    if (innerMatRef.current) {
      innerMatRef.current.opacity = 0.16 * fade;
    }
  });

  return (
    <>
      {/* Outer ring */}
      <mesh ref={outerMeshRef} rotation={[0.25, 0, 0.08]}>
        <torusGeometry args={[1.52, 0.018, 16, 128]} />
        <meshBasicMaterial ref={outerMatRef} color="#C9B68A" transparent opacity={0} />
      </mesh>

      {/* Inner ring */}
      <mesh ref={innerMeshRef} rotation={[-0.15, 0, 0.12]}>
        <torusGeometry args={[0.88, 0.012, 16, 100]} />
        <meshBasicMaterial ref={innerMatRef} color="#C9B68A" transparent opacity={0} />
      </mesh>
    </>
  );
}

// -----------------------------------------------------------------------------
// Exported component — place inside the philosophy section
// (needs overflow-hidden on the parent to clip the canvas correctly)
// -----------------------------------------------------------------------------
export default function PhilosophyTorus() {
  // Skip on mobile — saves a WebGL context and CPU/GPU budget
  // Use matchMedia so it evaluates correctly at runtime after lazy-load
  const isMobile = typeof window !== 'undefined' && !window.matchMedia('(min-width: 768px)').matches;
  if (isMobile) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        background: 'transparent',
      }}
    >
      {/* Automatically reduces pixel-ratio when frame rate drops */}
      <AdaptiveDpr pixelated />
      <TorusScene />
    </Canvas>
  );
}
