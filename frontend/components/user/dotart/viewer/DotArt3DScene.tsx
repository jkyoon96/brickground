'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import {
  Box,
  Rotate3D,
  ArrowUp,
  Compass,
  RefreshCw,
  Play,
  ZoomIn,
  ZoomOut,
  Scan,
  Maximize,
} from 'lucide-react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface DotArt3DSceneProps {
  pixels: string[][];
  canvasSize: number;
  autoRotate: boolean;
  showBaseplate: boolean;
  lightIntensity: number;
  dotModel: 'cylinder' | 'round';
  onAutoRotateChange: (enabled: boolean) => void;
}

// Voxel scene component
function VoxelScene({
  pixels,
  canvasSize,
  autoRotate,
  showBaseplate,
  lightIntensity,
  dotModel,
}: {
  pixels: string[][];
  canvasSize: number;
  autoRotate: boolean;
  showBaseplate: boolean;
  lightIntensity: number;
  dotModel: 'cylinder' | 'round';
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.003;
    }
  });

  // Create voxels from pixels
  const voxels: { position: [number, number, number]; color: string }[] = [];
  const offset = canvasSize / 2;
  const spacing = 0.8;

  for (let y = 0; y < canvasSize; y++) {
    for (let x = 0; x < canvasSize; x++) {
      const color = pixels[y]?.[x];
      if (color) {
        voxels.push({
          position: [(x - offset + 0.5) * spacing, 0.3, (y - offset + 0.5) * spacing],
          color,
        });
      }
    }
  }

  const baseSize = canvasSize * spacing + 2;

  return (
    <group ref={groupRef}>
      {/* Lights */}
      <ambientLight intensity={0.6 * (lightIntensity / 50)} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.5 * (lightIntensity / 50)}
      />
      <directionalLight
        position={[-10, 10, -10]}
        intensity={0.3 * (lightIntensity / 50)}
      />

      {/* Base Plate */}
      {showBaseplate && (
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[baseSize, 0.4, baseSize]} />
          <meshStandardMaterial color="#1B2A34" />
        </mesh>
      )}

      {/* Voxels */}
      {voxels.map((voxel, index) => (
        <mesh key={index} position={voxel.position}>
          {dotModel === 'cylinder' ? (
            <cylinderGeometry args={[0.35, 0.35, 0.6, 16]} />
          ) : (
            <sphereGeometry args={[0.35, 16, 16]} />
          )}
          <meshStandardMaterial color={voxel.color} />
        </mesh>
      ))}
    </group>
  );
}

// Camera controller
function CameraController({
  view,
  canvasSize,
}: {
  view: 'front' | 'angle' | 'top' | 'free';
  canvasSize: number;
}) {
  const { camera } = useThree();
  const maxSize = canvasSize * 0.8;

  useEffect(() => {
    switch (view) {
      case 'front':
        camera.position.set(0, maxSize * 0.4, maxSize * 1.5);
        break;
      case 'angle':
        camera.position.set(maxSize, maxSize * 0.8, maxSize);
        break;
      case 'top':
        camera.position.set(0, maxSize * 1.5, 0.1);
        break;
      case 'free':
        // Keep current position
        break;
    }
    camera.lookAt(0, 0, 0);
  }, [view, camera, maxSize]);

  return null;
}

export function DotArt3DScene({
  pixels,
  canvasSize,
  autoRotate,
  showBaseplate,
  lightIntensity,
  dotModel,
  onAutoRotateChange,
}: DotArt3DSceneProps) {
  const [view, setView] = useState<'front' | 'angle' | 'top' | 'free'>('front');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const viewPresets: { id: typeof view; icon: typeof Box; label: string }[] = [
    { id: 'front', icon: Box, label: '정면' },
    { id: 'angle', icon: Rotate3D, label: '45deg' },
    { id: 'top', icon: ArrowUp, label: '위' },
    { id: 'free', icon: Compass, label: '자유' },
  ];

  const handleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleZoomIn = () => {
    // Zoom in via orbit controls would be handled differently
  };

  const handleZoomOut = () => {
    // Zoom out via orbit controls would be handled differently
  };

  const handleReset = () => {
    setView('front');
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1"
      style={{
        background: 'radial-gradient(circle at center, #252542 0%, #1a1a2e 100%)',
      }}
    >
      {/* Three.js Canvas */}
      <Canvas>
        <PerspectiveCamera
          makeDefault
          position={[0, canvasSize * 0.4, canvasSize * 1.2]}
          fov={30}
        />
        <CameraController view={view} canvasSize={canvasSize} />
        <Suspense fallback={null}>
          <VoxelScene
            pixels={pixels}
            canvasSize={canvasSize}
            autoRotate={autoRotate}
            showBaseplate={showBaseplate}
            lightIntensity={lightIntensity}
            dotModel={dotModel}
          />
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={canvasSize * 3}
        />
      </Canvas>

      {/* View Presets */}
      <div className="absolute left-8 top-8 flex flex-col gap-2">
        {viewPresets.map((preset) => {
          const Icon = preset.icon;
          return (
            <Button
              key={preset.id}
              variant="ghost"
              size="sm"
              onClick={() => setView(preset.id)}
              className={cn(
                'flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-xs font-semibold transition-colors',
                view === preset.id
                  ? 'bg-[#9B5DE5] text-white'
                  : 'bg-[#252542] text-white hover:bg-[#9B5DE5]'
              )}
            >
              <Icon className="h-4 w-4" />
              {preset.label}
            </Button>
          );
        })}
      </div>

      {/* Auto Rotate Toggle */}
      <div className="absolute right-8 top-8 flex items-center gap-2.5 rounded-3xl bg-[#252542] px-4 py-2.5">
        <RefreshCw className="h-[18px] w-[18px] text-[#9B5DE5]" />
        <span className="text-[13px] text-white">자동 회전</span>
        <label className="relative h-6 w-11 cursor-pointer">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => onAutoRotateChange(e.target.checked)}
            className="peer sr-only"
          />
          <span
            className={cn(
              'absolute inset-0 rounded-3xl transition-colors',
              autoRotate ? 'bg-[#9B5DE5]' : 'bg-[#3d3d5c]'
            )}
          />
          <span
            className={cn(
              'absolute bottom-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform',
              autoRotate && 'translate-x-5'
            )}
          />
        </label>
      </div>

      {/* View Controls */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 rounded-[28px] bg-[#252542] p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setView('front')}
          title="회전"
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
            view !== 'free' ? 'bg-[#9B5DE5] text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#9B5DE5]'
          )}
        >
          <Rotate3D className="h-[22px] w-[22px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          title="트레이스 재생"
          className={cn(
            'flex h-12 w-12 items-center justify-center rounded-full transition-colors',
            isPlaying ? 'bg-[#9B5DE5] text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#9B5DE5]'
          )}
        >
          <Play className="h-[22px] w-[22px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomIn}
          title="확대"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <ZoomIn className="h-[22px] w-[22px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleZoomOut}
          title="축소"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <ZoomOut className="h-[22px] w-[22px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleReset}
          title="초기화"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <Scan className="h-[22px] w-[22px]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFullscreen}
          title="전체화면"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <Maximize className="h-[22px] w-[22px]" />
        </Button>
      </div>
    </div>
  );
}

export default DotArt3DScene;
