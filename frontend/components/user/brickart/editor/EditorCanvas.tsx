'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, TransformControls, Grid, Center } from '@react-three/drei';
import * as THREE from 'three';

type TransformMode = 'select' | 'translate' | 'rotate' | 'scale';

interface EditorObject {
  id: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
  visible: boolean;
  assemblyLevel: number;
}

interface EditorCanvasProps {
  objects: EditorObject[];
  selectedObjectId?: string;
  transformMode: TransformMode;
  assemblyLevelFilter: number;
  onObjectSelect?: (id: string | undefined) => void;
  onObjectTransform?: (id: string, transform: {
    position?: [number, number, number];
    rotation?: [number, number, number];
    scale?: [number, number, number];
  }) => void;
}

// Individual Object Component
function EditorObject3D({
  object,
  isSelected,
  onClick,
}: {
  object: EditorObject;
  isSelected: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  const getGeometry = () => {
    switch (object.type) {
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      case 'cone':
        return <coneGeometry args={[0.5, 1, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.4, 0.2, 16, 32]} />;
      case 'plane':
        return <planeGeometry args={[1, 1]} />;
      case 'brick1x1':
        return <boxGeometry args={[0.8, 0.4, 0.8]} />;
      case 'brick2x1':
        return <boxGeometry args={[1.6, 0.4, 0.8]} />;
      case 'brick2x2':
        return <boxGeometry args={[1.6, 0.4, 1.6]} />;
      case 'brick4x2':
        return <boxGeometry args={[3.2, 0.4, 1.6]} />;
      case 'box':
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  if (!object.visible) return null;

  return (
    <mesh
      ref={meshRef}
      position={object.position}
      rotation={object.rotation.map((r) => (r * Math.PI) / 180) as [number, number, number]}
      scale={object.scale}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      castShadow
      receiveShadow
    >
      {getGeometry()}
      <meshStandardMaterial
        color={object.color}
        roughness={0.6}
        metalness={0.1}
        emissive={isSelected ? '#004444' : '#000000'}
        emissiveIntensity={isSelected ? 0.3 : 0}
      />
    </mesh>
  );
}

// Scene Component
function Scene({
  objects,
  selectedObjectId,
  transformMode,
  assemblyLevelFilter,
  onObjectSelect,
  onObjectTransform,
}: EditorCanvasProps) {
  const controlsRef = useRef<any>(null);
  const transformRef = useRef<any>(null);
  const selectedMeshRef = useRef<THREE.Mesh>(null);

  const filteredObjects = objects.filter(
    (obj) => obj.assemblyLevel <= assemblyLevelFilter
  );

  const selectedObject = objects.find((obj) => obj.id === selectedObjectId);

  // Handle transform changes
  useEffect(() => {
    if (transformRef.current && selectedMeshRef.current) {
      const handleChange = () => {
        if (!selectedObjectId || !selectedMeshRef.current) return;

        const mesh = selectedMeshRef.current;
        onObjectTransform?.(selectedObjectId, {
          position: mesh.position.toArray() as [number, number, number],
          rotation: mesh.rotation.toArray().slice(0, 3).map((r) => (r * 180) / Math.PI) as [number, number, number],
          scale: mesh.scale.toArray() as [number, number, number],
        });
      };

      transformRef.current.addEventListener('objectChange', handleChange);
      return () => {
        transformRef.current?.removeEventListener('objectChange', handleChange);
      };
    }
  }, [selectedObjectId, onObjectTransform]);

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 10]}
        intensity={0.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-10, 10, 10]} intensity={0.3} />
      <directionalLight position={[10, 10, -10]} intensity={0.3} />

      {/* Grid */}
      <Grid
        args={[30, 30]}
        cellSize={1}
        cellThickness={0.5}
        cellColor="#333355"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#444466"
        fadeDistance={50}
        fadeStrength={1}
        followCamera={false}
        position={[0, 0, 0]}
      />

      {/* Objects */}
      <Center>
        {filteredObjects.map((obj) => (
          <EditorObject3D
            key={obj.id}
            object={obj}
            isSelected={obj.id === selectedObjectId}
            onClick={() => onObjectSelect?.(obj.id)}
          />
        ))}
      </Center>

      {/* Transform Controls for selected object */}
      {selectedObject && transformMode !== 'select' && (
        <TransformControls
          ref={transformRef}
          mode={transformMode}
          position={selectedObject.position}
          rotation={selectedObject.rotation.map((r) => (r * Math.PI) / 180) as [number, number, number]}
          scale={selectedObject.scale}
        />
      )}

      {/* Orbit Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        maxDistance={50}
        minDistance={3}
      />
    </>
  );
}

// Loading Component
function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1a2e]/90">
      <div className="h-[50px] w-[50px] animate-spin rounded-full border-4 border-white/10 border-t-pixar-blue" />
      <div className="mt-4 text-sm font-semibold text-white">에디터 로딩 중...</div>
    </div>
  );
}

export function EditorCanvas({
  objects,
  selectedObjectId,
  transformMode,
  assemblyLevelFilter,
  onObjectSelect,
  onObjectTransform,
}: EditorCanvasProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex-1 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      <LoadingOverlay isLoading={isLoading} />

      <Canvas
        shadows
        camera={{ position: [10, 8, 10], fov: 45 }}
        onPointerMissed={() => onObjectSelect?.(undefined)}
      >
        <Suspense fallback={null}>
          <Scene
            objects={objects}
            selectedObjectId={selectedObjectId}
            transformMode={transformMode}
            assemblyLevelFilter={assemblyLevelFilter}
            onObjectSelect={onObjectSelect}
            onObjectTransform={onObjectTransform}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
