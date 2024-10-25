import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Node data with (X, Y, Z) coordinates
const nodeData = [
  { id: 1, x: -8.7036, y: 0, z: 49.0748 },
  { id: 2, x: -72.9996, y: 0, z: 49.0748 },
  { id: 3, x: -75, y: 0, z: 49.0748 },
  { id: 4, x: -75.9996, y: 0, z: 43.8788 },
  { id: 5, x: -78.9996, y: 0, z: 38.6828 },
  { id: 6, x: -44.8512, y: 0, z: -13.5364 },
  { id: 7, x: -46.8516, y: 0, z: -16.9996 },
  { id: 8, x: -10.704, y: 0, z: 45.6104 },
  { id: 9, x: -80.0004, y: 0, z: 40.4144 },
  { id: 10, x: -38.148, y: 0, z: -32.0752 },
  { id: 11, x: -34.1484, y: 0, z: -32.0752 },
  { id: 12, x: -6, y: 0, z: -87.7576 },
  { id: 13, x: -5.0004, y: 0, z: -89.4892 },
  { id: 14, x: 8.7036, y: 0, z: 49.0748 },
  { id: 15, x: 72.9996, y: 0, z: 49.0748 },
  { id: 16, x: 75, y: 0, z: 49.0748 },
  { id: 17, x: 75.9996, y: 0, z: 43.8788 },
  { id: 18, x: 78.9996, y: 0, z: 38.6828 },
  { id: 19, x: 44.8512, y: 0, z: -13.5364 },
  { id: 20, x: 46.8516, y: 0, z: -16.9996 },
  { id: 21, x: 10.704, y: 0, z: 45.6104 },
  { id: 22, x: 80.0004, y: 0, z: 40.4144 },
  { id: 23, x: 38.148, y: 0, z: -32.0752 },
  { id: 24, x: 34.1484, y: 0, z: -32.0752 },
  { id: 25, x: 6, y: 0, z: -87.7576 },
  { id: 26, x: 5.0004, y: 0, z: -89.4892 },
  { id: 27, x: 0, y: 0, z: -87.7576 },
  { id: 28, x: 11.3127, y: 0, z: 6.5311 },
  { id: 29, x: 0, y: 0, z: -13.0622 },
  { id: 30, x: -11.3127, y: 0, z: 6.5311 },
  { id: 31, x: -77.4996, y: 0, z: 41.2808 },
  { id: 32, x: -74.4996, y: 0, z: 46.4768 },
  { id: 33, x: -64.0097, y: 60, z: 18.6311 },
  { id: 34, x: -64.0097, y: -12, z: 18.6311 },
  { id: 35, x: 18.5003, y: 60, z: -66.1068 },
  { id: 36, x: 18.5003, y: -12, z: -66.1068 },
  { id: 37, x: 54.5003, y: 60, z: -3.753 },
  { id: 38, x: 54.5003, y: -12, z: -3.753 },
  { id: 39, x: 72.0203, y: 60, z: 26.5926 },
  { id: 40, x: 72.0203, y: -12, z: 26.5926 },
  { id: 41, x: -24.1573, y: 60, z: 45.7931 },
  { id: 42, x: -24.1573, y: -36, z: 45.7931 },
  { id: 43, x: -59.178, y: 60, z: 46.2687 },
  { id: 44, x: -59.178, y: -12, z: 46.2687 },
];

// Connections between nodes
const connections = [
  { start: 1, end: 4 },
  { start: 2, end: 8 },
  { start: 3, end: 6 },
  { start: 4, end: 1 },
  { start: 5, end: 28 },
  { start: 6, end: 21 },
  { start: 7, end: 19 },
  { start: 8, end: 14 },
  { start: 9, end: 16 },
  { start: 10, end: 13 },
  { start: 11, end: 22 },
  { start: 12, end: 27 },
  { start: 13, end: 23 },
  { start: 14, end: 27 },
  { start: 15, end: 27 },
  { start: 16, end: 2 },
  { start: 17, end: 18 },
  { start: 18, end: 12 },
  { start: 19, end: 34 },
  { start: 20, end: 36 },
  { start: 21, end: 38 },
  { start: 22, end: 40 },
  { start: 23, end: 42 },
  { start: 24, end: 44 },
];

// Find the position of a node by ID
const findNodeById = (id) => nodeData.find((node) => node.id === id);

function Node({ position }) {
  return (
    <mesh position={position} scale={[0.5, 0.5, 0.5]}> {/* Scale down by 50% */}
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="red" /> {/* Set node color to red */}
    </mesh>
  );
}

function Connection({ start, end }) {
  const startNode = findNodeById(start);
  const endNode = findNodeById(end);

  const points = [
    new THREE.Vector3(startNode.x, startNode.y, startNode.z),
    new THREE.Vector3(endNode.x, endNode.y, endNode.z),
  ];

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="white" linewidth={2} /> {/* Set pipe color to white */}
    </line>
  );
}

function Network() {
  return (
    <>
      {/* Render all nodes */}
      {nodeData.map((node) => (
        <Node key={node.id} position={[node.x * 0.5, node.y, node.z * 0.5]} /> {/* Center the nodes */}
      ))}

      {/* Render all connections */}
      {connections.map((conn, index) => (
        <Connection key={index} start={conn.start} end={conn.end} />
      ))}
    </>
  );
}

export default function App() {
  return (
    <Canvas
      camera={{ position: [0, 0, 150], fov: 50 }}
      style={{ background: 'black' }} // Set background color to black
    >
      <ambientLight intensity={0.5} />
      <Suspense fallback={null}>
        <Network />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
