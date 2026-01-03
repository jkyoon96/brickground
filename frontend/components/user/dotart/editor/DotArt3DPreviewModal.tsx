'use client';

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { X, Home, Box, ArrowUp, RefreshCw } from 'lucide-react';
import * as THREE from 'three';
import { Button } from '@/components/ui/Button';

interface DotArt3DPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  pixels: string[][];
  canvasSize: number;
}

// 3D Voxel Scene
function VoxelScene({
  pixels,
  canvasSize,
  autoRotate,
}: {
  pixels: string[][];
  canvasSize: number;
  autoRotate: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  // Create voxels from pixels
  const voxels: { position: [number, number, number]; color: string }[] = [];
  const offset = canvasSize / 2;

  for (let y = 0; y < canvasSize; y++) {
    for (let x = 0; x < canvasSize; x++) {
      const color = pixels[y]?.[x];
      if (color) {
        voxels.push({
          position: [x - offset + 0.5, 0.5, y - offset + 0.5],
          color,
        });
      }
    }
  }

  return (
    <group ref={groupRef}>
      {/* Grid helper */}
      <gridHelper args={[canvasSize, canvasSize, '#444', '#333']} />

      {/* Voxels */}
      {voxels.map((voxel, index) => (
        <mesh key={index} position={voxel.position}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={voxel.color} />
        </mesh>
      ))}
    </group>
  );
}

// Camera controller component
function CameraController({
  target,
  cameraPosition,
}: {
  target: [number, number, number];
  cameraPosition: [number, number, number];
}) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.lookAt(...target);
  }, [camera, cameraPosition, target]);

  return null;
}

export function DotArt3DPreviewModal({
  isOpen,
  onClose,
  pixels,
  canvasSize,
}: DotArt3DPreviewModalProps) {
  const [autoRotate, setAutoRotate] = useState(false);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([
    canvasSize * 0.8,
    canvasSize * 0.8,
    canvasSize * 0.8,
  ]);

  const handleReset = () => {
    setCameraPosition([canvasSize * 0.8, canvasSize * 0.8, canvasSize * 0.8]);
  };

  const handleFront = () => {
    setCameraPosition([0, canvasSize * 0.3, canvasSize]);
  };

  const handleTop = () => {
    setCameraPosition([0, canvasSize * 1.5, 0.1]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="flex h-[80%] w-[90%] max-w-[1000px] flex-col overflow-hidden rounded-2xl bg-[#252542]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#3d3d5c] px-6 py-5">
            <h2 className="text-lg font-bold text-white">3D 미리보기</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#3d3d5c]"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* 3D Canvas */}
          <div className="relative flex-1">
            <Canvas>
              <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
              <CameraController target={[0, 0, 0]} cameraPosition={cameraPosition} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 10]} intensity={1} />
              <directionalLight position={[-10, 10, -10]} intensity={0.5} />
              <VoxelScene
                pixels={pixels}
                canvasSize={canvasSize}
                autoRotate={autoRotate}
              />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={canvasSize * 3}
              />
            </Canvas>

            {/* Controls */}
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2 rounded-3xl bg-[#252542] p-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleReset}
                title="시점 초기화"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
              >
                <Home className="h-[18px] w-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFront}
                title="정면"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
              >
                <Box className="h-[18px] w-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleTop}
                title="위"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
              >
                <ArrowUp className="h-[18px] w-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setAutoRotate(!autoRotate)}
                title="자동 회전"
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                  autoRotate
                    ? 'bg-[#9B5DE5] text-white'
                    : 'bg-[#1a1a2e] text-white hover:bg-[#9B5DE5]'
                }`}
              >
                <RefreshCw className="h-[18px] w-[18px]" />
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Need to add useState import
import { useState } from 'react';

export default DotArt3DPreviewModal;
