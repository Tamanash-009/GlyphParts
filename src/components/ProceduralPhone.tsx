import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Torus, Cylinder, Box } from '@react-three/drei';
import * as THREE from 'three';

interface ProceduralPhoneProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  glyphIntensity?: number;
}

export function ProceduralPhone({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, glyphIntensity = 0.15 }: ProceduralPhoneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialBody = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.2, metalness: 0.6 });
  const materialGlass = new THREE.MeshPhysicalMaterial({
    color: '#000000',
    metalness: 0.8,
    roughness: 0.1,
    envMapIntensity: 1.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    opacity: 0.9,
    transparent: true,
  });
  const materialFrame = new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.4, metalness: 0.8 });
  const materialEmissive = new THREE.MeshStandardMaterial({ 
    color: '#ffffff', 
    emissive: '#ffffff', 
    emissiveIntensity: glyphIntensity,
    toneMapped: false 
  });
  const materialAccent = new THREE.MeshStandardMaterial({ color: '#ff0000' });

  // Breathing animation for glyphs
  useFrame((state) => {
    if (groupRef.current) {
      // Very slow breathing pulse (never flash)
      const pulse = 0.15 + (Math.sin(state.clock.elapsedTime * 1.5) * 0.05);
      materialEmissive.emissiveIntensity = Math.max(0.05, pulse * glyphIntensity * 10);
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Main Body (Frame) */}
      <RoundedBox args={[3.2, 6.8, 0.4]} radius={0.3} smoothness={8} castShadow receiveShadow>
        <primitive object={materialFrame} attach="material" />
      </RoundedBox>

      {/* Back Glass */}
      <RoundedBox args={[3.1, 6.7, 0.42]} radius={0.28} smoothness={8} receiveShadow>
        <primitive object={materialGlass} attach="material" />
      </RoundedBox>

      {/* Inner Component Plate (Dark Grey) */}
      <RoundedBox args={[3.0, 6.6, 0.38]} radius={0.25} smoothness={4}>
        <primitive object={materialBody} attach="material" />
      </RoundedBox>

      {/* Camera Island */}
      <RoundedBox args={[0.9, 2.0, 0.1]} position={[-0.9, 2.1, 0.2]} radius={0.2} smoothness={4} castShadow>
        <primitive object={materialFrame} attach="material" />
      </RoundedBox>
      {/* Camera Lenses */}
      <Cylinder args={[0.25, 0.25, 0.15, 32]} position={[-0.9, 2.6, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#050505" />
      </Cylinder>
      <Cylinder args={[0.25, 0.25, 0.15, 32]} position={[-0.9, 1.9, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#050505" />
      </Cylinder>
      <Cylinder args={[0.15, 0.15, 0.15, 32]} position={[-0.9, 1.4, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#050505" />
      </Cylinder>

      {/* --- GLYPH INTERFACE --- */}

      {/* Center G-Ring */}
      <Torus args={[0.8, 0.06, 16, 64, Math.PI * 1.8]} position={[0, -0.2, 0.2]} rotation={[0, 0, -Math.PI / 2]}>
        <primitive object={materialEmissive} attach="material" />
      </Torus>

      {/* Camera C-Curve */}
      <Torus args={[0.6, 0.06, 16, 32, Math.PI]} position={[-0.9, 2.25, 0.2]} rotation={[0, 0, Math.PI / 2]}>
        <primitive object={materialEmissive} attach="material" />
      </Torus>

      {/* Diagonal Top Right Line */}
      <Box args={[0.08, 0.9, 0.05]} position={[0.8, 2.2, 0.2]} rotation={[0, 0, -Math.PI / 6]}>
        <primitive object={materialEmissive} attach="material" />
      </Box>

      {/* Bottom Line (Exclamation mark body) */}
      <Box args={[0.08, 0.8, 0.05]} position={[0, -1.8, 0.2]}>
        <primitive object={materialEmissive} attach="material" />
      </Box>

      {/* Bottom Dot (Exclamation mark dot) */}
      <Cylinder args={[0.06, 0.06, 0.05, 16]} position={[0, -2.4, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={materialEmissive} attach="material" />
      </Cylinder>

      {/* Red Accent Recording Dot */}
      <Cylinder args={[0.04, 0.04, 0.05, 16]} position={[1.1, 1.8, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={materialAccent} attach="material" />
      </Cylinder>

      {/* Some internal structural boxes to simulate complexity */}
      <Box args={[1.2, 1.2, 0.05]} position={[0, -0.2, 0.15]}>
        <meshStandardMaterial color="#222222" />
      </Box>
      <Box args={[2.5, 0.8, 0.05]} position={[0, 0.9, 0.15]}>
        <meshStandardMaterial color="#1f1f1f" />
      </Box>
      <Box args={[0.8, 1.2, 0.05]} position={[0.9, -1.5, 0.15]}>
        <meshStandardMaterial color="#181818" />
      </Box>
    </group>
  );
}
