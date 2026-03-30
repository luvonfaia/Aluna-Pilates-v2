import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getLenis } from '../../lib/lenis';

// -----------------------------------------------------------------------------
// Particle counts — mobile gets fewer to stay within frame budget
// -----------------------------------------------------------------------------
const COUNT_DESKTOP = 3500;
const COUNT_MOBILE = 1200;

// -----------------------------------------------------------------------------
// GLSL — vertex shader
// Each particle loops upward continuously. On scroll the drift accelerates
// and the size shrinks so particles look like they're flying away.
// -----------------------------------------------------------------------------
const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aSpeed;
  attribute float aOffset;

  uniform float uTime;
  uniform float uScrollProgress;
  uniform float uPixelRatio;

  void main() {
    vec3 pos = position;

    // Loop y from bottom to top, wrapping via fract()
    float yLoop = fract(aOffset + uTime * aSpeed * 0.07);
    pos.y = mix(-1.4, 1.6, yLoop);

    // Gentle horizontal sway
    pos.x += sin(uTime * aSpeed * 0.38 + aOffset * 6.2831) * 0.11;

    // On scroll: push particles upward faster
    pos.y += uScrollProgress * 1.4;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

    // Size — attenuate with depth, shrink on scroll
    float size = aSize * uPixelRatio * (260.0 / -mvPos.z);
    size *= (1.0 - uScrollProgress * 0.6);
    gl_PointSize = max(size, 0.5);

    gl_Position = projectionMatrix * mvPos;
  }
`;

// -----------------------------------------------------------------------------
// GLSL — fragment shader
// Soft glowing circle. Fades completely as hero scrolls out of view.
// -----------------------------------------------------------------------------
const FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uScrollProgress;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;

    // Glow: bright centre, transparent edge
    float alpha = smoothstep(0.5, 0.0, d) * 0.65;

    // Fade out as hero scrolls away
    alpha *= 1.0 - clamp(uScrollProgress * 1.6, 0.0, 1.0);

    gl_FragColor = vec4(uColor, alpha);
  }
`;

// -----------------------------------------------------------------------------
// Inner scene — must live inside <Canvas>
// -----------------------------------------------------------------------------
function ParticleField() {
  const scrollRef = useRef(0);
  const count = typeof window !== 'undefined' && window.innerWidth < 768
    ? COUNT_MOBILE
    : COUNT_DESKTOP;

  // Subscribe to Lenis scroll — getLenis() is always valid here because
  // Lenis is initialized in main.tsx before React renders.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    const onScroll = ({ scroll }: { scroll: number }) => {
      scrollRef.current = Math.min(scroll / window.innerHeight, 1);
    };

    lenis.on('scroll', onScroll);
    return () => lenis.off('scroll', onScroll);
  }, []);

  // Build buffer attributes once
  const { positions, sizes, speeds, offsets } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes     = new Float32Array(count);
    const speeds    = new Float32Array(count);
    const offsets   = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 3.2;   // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2.8;   // y (initial)
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8;   // z
      sizes[i]   = Math.random() * 2.2 + 0.8;                // 0.8–3.0
      speeds[i]  = Math.random() * 0.7 + 0.4;                // 0.4–1.1
      offsets[i] = Math.random();                             // phase 0–1
    }

    return { positions, sizes, speeds, offsets };
  }, [count]);

  // Uniforms — created once, mutated each frame
  const uniforms = useMemo(() => ({
    uTime:           { value: 0 },
    uScrollProgress: { value: 0 },
    uColor:          { value: new THREE.Color('#C9B68A') },   // aluna-gold
    uPixelRatio:     { value: Math.min(
      typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2
    )},
  }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value           = clock.getElapsedTime();
    uniforms.uScrollProgress.value = scrollRef.current;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize"    args={[sizes,     1]} />
        <bufferAttribute attach="attributes-aSpeed"   args={[speeds,    1]} />
        <bufferAttribute attach="attributes-aOffset"  args={[offsets,   1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// -----------------------------------------------------------------------------
// Exported component — drop inside any `relative overflow-hidden` section
// -----------------------------------------------------------------------------
export default function HeroParticles() {
  // Bail out on browsers without WebGL
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    if (!canvas.getContext('webgl2') && !canvas.getContext('webgl')) {
      return null;
    }
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 2.2], fov: 60 }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 2]}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <ParticleField />
    </Canvas>
  );
}
