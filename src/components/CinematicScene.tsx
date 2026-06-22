import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ProceduralPhone } from './ProceduralPhone';

function SceneContent() {
  const phone1Ref = useRef<THREE.Group>(null);
  const phone2Ref = useRef<THREE.Group>(null);
  const phone3Ref = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const [isIdle, setIsIdle] = useState(false);

  // Initial Positions (above screen)
  const initialPos1 = { x: 0, y: 15, z: -2, rx: Math.PI / 4, ry: Math.PI / 4, rz: Math.PI / 8 };
  const targetPos1 = { x: 0, y: 4, z: -2, rx: -0.2, ry: 0.1, rz: -0.5 }; // Top center, tilted back, rotated clockwise

  const initialPos2 = { x: -4, y: 15, z: 2, rx: -Math.PI / 8, ry: -Math.PI / 6, rz: -Math.PI / 12 };
  const targetPos2 = { x: -3.5, y: -1.5, z: 2, rx: -0.1, ry: 0.3, rz: 0.1 }; // Bottom left, standing up

  const initialPos3 = { x: 5, y: 15, z: 0, rx: Math.PI / 2, ry: -Math.PI / 4, rz: Math.PI / 6 };
  const targetPos3 = { x: 4, y: -3, z: 0, rx: -1.3, ry: 0, rz: 0.4 }; // Bottom right, lying down

  useEffect(() => {
    // Reset positions
    if (phone1Ref.current) {
      phone1Ref.current.position.set(initialPos1.x, initialPos1.y, initialPos1.z);
      phone1Ref.current.rotation.set(initialPos1.rx, initialPos1.ry, initialPos1.rz);
    }
    if (phone2Ref.current) {
      phone2Ref.current.position.set(initialPos2.x, initialPos2.y, initialPos2.z);
      phone2Ref.current.rotation.set(initialPos2.rx, initialPos2.ry, initialPos2.rz);
    }
    if (phone3Ref.current) {
      phone3Ref.current.position.set(initialPos3.x, initialPos3.y, initialPos3.z);
      phone3Ref.current.rotation.set(initialPos3.rx, initialPos3.ry, initialPos3.rz);
    }
    if (lightRef.current) {
      lightRef.current.intensity = 0;
    }

    const tl = gsap.timeline({
      onComplete: () => setIsIdle(true)
    });

    // 0-0.5s: Fade in light
    tl.to(lightRef.current, { intensity: 150, duration: 1.5, ease: "power2.inOut" }, 0);

    // 0.5-1.5s: Top center phone falls
    if (phone1Ref.current) {
      tl.to(phone1Ref.current.position, { y: targetPos1.y, duration: 2.0, ease: "power3.out" }, 0.2);
      tl.to(phone1Ref.current.rotation, { x: targetPos1.rx, y: targetPos1.ry, z: targetPos1.rz, duration: 2.0, ease: "power3.out" }, 0.2);
    }

    // 1.5-2.5s: Left phone falls
    if (phone2Ref.current) {
      tl.to(phone2Ref.current.position, { y: targetPos2.y, duration: 2.0, ease: "power3.out" }, 0.8);
      tl.to(phone2Ref.current.rotation, { x: targetPos2.rx, y: targetPos2.ry, z: targetPos2.rz, duration: 2.0, ease: "power3.out" }, 0.8);
    }

    // 2.5-3.5s: Right phone falls
    if (phone3Ref.current) {
      tl.to(phone3Ref.current.position, { y: targetPos3.y, duration: 2.0, ease: "power3.out" }, 1.4);
      tl.to(phone3Ref.current.rotation, { x: targetPos3.rx, y: targetPos3.ry, z: targetPos3.rz, duration: 2.0, ease: "power3.out" }, 1.4);
    }

    return () => {
      tl.kill();
    };
  }, []);

  // Mouse Parallax and Continuous Rotation for Idle state
  useFrame((state, delta) => {
    if (isIdle) {
      const mouseX = (state.mouse.x * Math.PI) / 100;
      const mouseY = (state.mouse.y * Math.PI) / 100;

      // Subtle camera pan based on mouse
      state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, mouseX * 2, 0.05);
      state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, mouseY * 2 + 2, 0.05);
      state.camera.lookAt(0, 0, 0);

      // Continuous slow anticlockwise rotation for airborne phones
      if (phone1Ref.current) {
        phone1Ref.current.rotation.y += delta * 0.15; // Top center phone
      }
      if (phone2Ref.current) {
        phone2Ref.current.rotation.y += delta * 0.1; // Left standing phone
      }
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 18]} fov={35} />
      <color attach="background" args={['#000000']} />
      
      {/* Lights */}
      <ambientLight intensity={0.1} />
      <spotLight 
        ref={lightRef}
        position={[0, 15, 10]} 
        angle={0.4} 
        penumbra={1} 
        intensity={0} 
        castShadow 
        color="#ffffff" 
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.2} color="#ffffff" />
      <directionalLight position={[5, 5, 5]} intensity={0.2} color="#ffffff" />

      {/* Floating Phones (Idle handled by Float, Entry handled by GSAP) */}
      <group ref={phone1Ref}>
        <Float speed={isIdle ? 1.0 : 0} rotationIntensity={isIdle ? 0.1 : 0} floatIntensity={isIdle ? 0.3 : 0}>
          <ProceduralPhone />
        </Float>
      </group>

      <group ref={phone2Ref}>
        <Float speed={isIdle ? 0.8 : 0} rotationIntensity={isIdle ? 0.15 : 0} floatIntensity={isIdle ? 0.2 : 0}>
          <ProceduralPhone />
        </Float>
      </group>

      <group ref={phone3Ref}>
        <Float speed={isIdle ? 1.2 : 0} rotationIntensity={isIdle ? 0.1 : 0} floatIntensity={isIdle ? 0.4 : 0}>
          <ProceduralPhone />
        </Float>
      </group>

      {/* Floor with Soft Reflections */}
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={40}
          roughness={0.8}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
          mirror={0.5}
        />
      </mesh>
    </>
  );
}

export function CinematicScene() {
  return (
    <div className="w-full h-full absolute inset-0 bg-black">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }}>
        <SceneContent />
        <Environment preset="city" environmentIntensity={0.2} />
      </Canvas>
    </div>
  );
}
