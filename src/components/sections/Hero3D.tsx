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

const BRICKS = Array.from({ length: 60 }).map((_, i) => {
  const posRange = (i * 17) % 60 - 30;
  const posRange2 = (i * 23) % 40 - 20;
  const posRange3 = (i * 31) % 20 - 10;
  
  const rot1 = ((i * 37) % 100) / 100 * Math.PI;
  const rot2 = ((i * 41) % 100) / 100 * Math.PI;
  const rot3 = ((i * 43) % 100) / 100 * Math.PI;

  return {
    id: i,
    position: [posRange, posRange2, posRange3],
    rotation: [rot1, rot2, rot3],
    color: legoColors[i % legoColors.length],
    scale: 0.5 + (((i * 47) % 100) / 100) * 1.5,
    floatingRange: [-((i * 53) % 50) / 100, ((i * 59) % 50) / 100],
  };
});

export function FloatingBricks() {

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ea" />
      <pointLight position={[10, -10, 5]} intensity={0.5} color="#00f3ff" />

      {BRICKS.map((brick) => (
        <LegoBrick key={brick.id} {...brick} />
      ))}
    </>
  );
}
