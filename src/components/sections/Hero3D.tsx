"use client";

import { Box, Edges, Float } from "@react-three/drei";
import * as THREE from "three";

// Colors corresponding to our CSS variables
const legoColors = [
  "#E3000B", // Red
  "#F6D100", // Yellow
  "#0085C7", // Blue
  "#00f3ff", // Neon blue hint
  "#ff00ea", // Neon pink hint
];

export function LegoBrick({
  position,
  color,
  rotation = [0, 0, 0],
  scale = 1,
  floatingRange = [-0.1, 0.1],
}: any) {
  return (
    <Float
      speed={1.5}
      rotationIntensity={2}
      floatIntensity={2}
      floatingRange={floatingRange as [number, number]}
    >
      <group position={position} rotation={rotation} scale={scale}>
        <Box args={[1, 0.6, 2]}>
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
          <Edges scale={1} threshold={15} color="#000" />
        </Box>

        {/* Studs */}
        {[
          [-0.25, 0.35, -0.75],
          [0.25, 0.35, -0.75],
          [-0.25, 0.35, -0.25],
          [0.25, 0.35, -0.25],
          [-0.25, 0.35, 0.25],
          [0.25, 0.35, 0.25],
          [-0.25, 0.35, 0.75],
          [0.25, 0.35, 0.75],
        ].map((pos, i) => (
          <mesh key={i} position={pos as any}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial
              color={color}
              roughness={0.2}
              metalness={0.1}
            />
            <Edges scale={1} threshold={15} color="#000" />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export function FloatingBricks() {
  const bricks = Array.from({ length: 120 }).map((_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 60,
      (Math.random() - 0.5) * 40,
      (Math.random() - 0.5) * 20 - 10,
    ],
    rotation: [
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI,
    ],
    color: legoColors[Math.floor(Math.random() * legoColors.length)],
    scale: 0.5 + Math.random() * 1.5,
    floatingRange: [-(Math.random() * 0.5), Math.random() * 0.5],
  }));

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ea" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#00f3ff" />

      {bricks.map((brick) => (
        <LegoBrick key={brick.id} {...brick} />
      ))}
    </>
  );
}
