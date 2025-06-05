'use client';

import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three'; // Changed to regular import to access THREE constants
import type { Mesh, Group, MeshStandardMaterial } from 'three'; // Still use type imports for types

// Update the Crystal component to accept a theme prop and adjust colors for dark theme

// Add the theme prop to the component definition
export default function Crystal({ theme = 'light' }) {
  const isDark = theme === 'dark';

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }} shadows>
      { /* Ambient light for base illumination */ }
      <ambientLight intensity={isDark ? 0.15 : 0.2} />

      { /* Main directional light */ }
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.5 : 0.7} />

      { /* Purple point lights for magical glow - enhanced for dark theme */ }
      <pointLight
        position={[0, 0, 0]}
        intensity={isDark ? 1.2 : 0.8}
        color={isDark ? '#b794f6' : '#9d4edd'}
        distance={5}
      />
      <pointLight
        position={[2, 0, 0]}
        intensity={isDark ? 0.7 : 0.4}
        color={isDark ? '#e9d8fd' : '#c77dff'}
        distance={3}
      />

      { /* Crystal and magical effects */ }
      <RuneCrystal isDark={isDark} />
      <OrbitingOrbs isDark={isDark} />

      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}

// Update the RuneCrystal function to accept isDark prop
function RuneCrystal({ isDark = false }) {
  const crystalRef = useRef<Group>(null);
  const glowRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);

  // Create rune positions on the crystal
  const runePositions = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      position: [(Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 0.6],
      scale: 0.1 + Math.random() * 0.1,
      rotation: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (crystalRef.current) {
      // Slightly faster rotation for dark theme
      crystalRef.current.rotation.y = clock.getElapsedTime() * (isDark ? 0.3 : 0.2);
    }

    if (materialRef.current) {
      // More pronounced pulsing glow effect for dark theme
      const pulse =
        Math.sin(clock.getElapsedTime() * (isDark ? 0.7 : 0.5)) * (isDark ? 0.5 : 0.4) + (isDark ? 1.0 : 0.8);
      materialRef.current.emissiveIntensity = pulse;
    }

    if (glowRef.current) {
      // More dramatic breathing glow effect for dark theme
      const glowPulse =
        Math.sin(clock.getElapsedTime() * (isDark ? 0.6 : 0.4)) * (isDark ? 0.15 : 0.1) + (isDark ? 1.1 : 0.9);
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }
  });

  // Define vertices for a slimmer crystal shape
  const vertices = [
    // Top point
    0, 2.0, 0,
    // Middle points (slimmer)
    0.6, 0, 0.6, 0.6, 0, -0.6, -0.6, 0, -0.6, -0.6, 0, 0.6,
    // Bottom point
    0, -2.0, 0,
  ];

  // Define faces using indices
  const indices = [
    // Top faces
    0, 1, 2, 0, 2, 3, 0, 3, 4, 0, 4, 1,
    // Bottom faces
    5, 2, 1, 5, 3, 2, 5, 4, 3, 5, 1, 4,
  ];

  // Adjust colors for dark theme
  const crystalColor = isDark ? '#b794f6' : '#9d4edd';
  const emissiveColor = isDark ? '#9061f9' : '#5a189a';
  const glowColor = isDark ? '#d6bcfa' : '#c77dff';
  const sparkleColor = isDark ? '#e9d8fd' : '#c77dff';

  return (
    <group ref={crystalRef}>
      { /* Main crystal */ }
      <mesh castShadow receiveShadow>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(vertices)}
            count={vertices.length / 3}
            itemSize={3}
          />
          <bufferAttribute attach="index" array={new Uint16Array(indices)} count={indices.length} itemSize={1} />
        </bufferGeometry>
        <meshStandardMaterial
          ref={materialRef}
          color={crystalColor}
          metalness={isDark ? 0.3 : 0.2}
          roughness={isDark ? 0.2 : 0.3}
          transparent={true}
          opacity={isDark ? 0.9 : 0.85}
          emissive={emissiveColor}
          emissiveIntensity={isDark ? 1.2 : 0.8}
          flatShading={true}
        />
      </mesh>

      { /* Inner glow */ }
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial color={glowColor} transparent opacity={isDark ? 0.8 : 0.6} />
      </mesh>

      { /* Magical sparkles inside and around the crystal - more for dark theme */ }
      <Sparkles
        count={isDark ? 40 : 30}
        scale={[1.2, 3, 1.2]}
        size={isDark ? 0.5 : 0.4}
        speed={isDark ? 0.4 : 0.3}
        color={sparkleColor}
      />

      { /* Rune markings on the crystal */ }
      { runePositions.map((rune, i) => (
        <RuneMark
          key={i}
          position={rune.position as [number, number, number]}
          scale={rune.scale}
          rotation={[0, rune.rotation, 0]}
          isDark={isDark}
        />
      )) }
    </group>
  );
}

// Update RuneMark to accept isDark prop
function RuneMark({
  position,
  scale,
  rotation,
  isDark = false,
}: {
  position: [number, number, number];
  scale: number;
  rotation: [number, number, number];
  isDark?: boolean;
}) {
  const runeRef = useRef<Mesh>(null);
  const runeColor = isDark ? '#d6bcfa' : '#c77dff';

  useFrame(({ clock }) => {
    if (runeRef.current && runeRef.current.material && 'emissiveIntensity' in runeRef.current.material) {
      // More pronounced pulsing glow effect for runes in dark theme
      const pulse =
        Math.sin(clock.getElapsedTime() * (isDark ? 1.0 : 0.8) + position[1]) * (isDark ? 0.7 : 0.5) +
        (isDark ? 1.3 : 1.0);
      runeRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <mesh ref={runeRef} position={position} rotation={rotation} scale={[scale, scale, scale]}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={runeColor}
        emissive={runeColor}
        emissiveIntensity={isDark ? 1.3 : 1}
        transparent
        opacity={isDark ? 1.0 : 0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Update OrbitingOrbs to accept isDark prop
function OrbitingOrbs({ isDark = false }) {
  return (
    <>
      <OrbitingOrb
        radius={1.2}
        speed={isDark ? 0.6 : 0.5}
        color={isDark ? '#d6bcfa' : '#c77dff'}
        size={0.12}
        isDark={isDark}
      />
      <OrbitingOrb
        radius={1.6}
        speed={isDark ? 0.4 : 0.3}
        color={isDark ? '#b794f6' : '#9d4edd'}
        size={0.15}
        isDark={isDark}
      />
      <OrbitingOrb
        radius={1.4}
        speed={isDark ? 0.25 : 0.15}
        color={isDark ? '#9061f9' : '#7b2cbf'}
        size={0.18}
        isDark={isDark}
      />
    </>
  );
}

// Update OrbitingOrb interface and function to accept isDark prop
interface OrbitingOrbProps {
  radius: number;
  speed: number;
  color: string;
  size: number;
  isDark?: boolean;
}

function OrbitingOrb({ radius, speed, color, size, isDark = false }: OrbitingOrbProps) {
  const orbRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);
  const [offset] = useState(Math.random() * Math.PI * 2);
  const [pulseSpeed] = useState(() => 0.5 + Math.random() * 0.5);

  useFrame(({ clock }) => {
    if (orbRef.current && materialRef.current) {
      const t = clock.getElapsedTime() * speed + offset;

      // Calculate position on circular orbit
      orbRef.current.position.x = Math.sin(t) * radius;
      orbRef.current.position.z = Math.cos(t) * radius;

      // Add some vertical movement - more dramatic for dark theme
      orbRef.current.position.y = Math.sin(t * (isDark ? 0.7 : 0.5)) * (radius * (isDark ? 0.3 : 0.2));

      // More intense pulsing effect for dark theme
      const pulseValue = Math.sin(clock.getElapsedTime() * pulseSpeed) * (isDark ? 0.8 : 0.6) + (isDark ? 1.6 : 1.4);
      materialRef.current.emissiveIntensity = pulseValue;

      // More pronounced size pulsing for dark theme
      if (orbRef.current.scale) {
        const scalePulse =
          (isDark ? 0.8 : 0.85) +
          Math.sin(clock.getElapsedTime() * pulseSpeed * (isDark ? 1.4 : 1.2)) * (isDark ? 0.2 : 0.15);
        orbRef.current.scale.set(scalePulse, scalePulse, scalePulse);
      }
    }
  });

  return (
    <mesh ref={orbRef} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={color}
        emissiveIntensity={isDark ? 1.5 : 1.2}
        toneMapped={false}
      />
    </mesh>
  );
}
