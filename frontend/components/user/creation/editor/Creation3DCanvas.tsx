'use client';

import { useRef, useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, TransformControls } from '@react-three/drei';
import {
  Box,
  Square,
  LayoutGrid,
  Sidebar,
  Home,
  ZoomIn,
  ZoomOut,
  Scan,
  Grid3X3,
  Maximize,
} from 'lucide-react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type ViewMode = 'perspective' | 'front' | 'top' | 'side';

interface SceneObject {
  id: string;
  type: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
  color: string;
}

interface Creation3DCanvasProps {
  objects: SceneObject[];
  selectedObjectId: string | null;
  showGrid: boolean;
  onSelectObject: (id: string | null) => void;
  onShowGridChange: (show: boolean) => void;
}

// Scene component
function Scene({
  objects,
  selectedObjectId,
  showGrid,
  onSelectObject,
}: {
  objects: SceneObject[];
  selectedObjectId: string | null;
  showGrid: boolean;
  onSelectObject: (id: string | null) => void;
}) {
  const getGeometry = (type: string) => {
    switch (type) {
      case 'box':
        return <boxGeometry args={[1, 1, 1]} />;
      case 'sphere':
        return <sphereGeometry args={[0.5, 32, 32]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.5, 0.5, 1, 32]} />;
      case 'cone':
        return <coneGeometry args={[0.5, 1, 32]} />;
      case 'torus':
        return <torusGeometry args={[0.5, 0.2, 16, 32]} />;
      case 'plane':
        return <planeGeometry args={[1, 1]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[0.5]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[0.5]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  };

  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />

      {/* Grid */}
      {showGrid && (
        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#3d3d5c"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#00CEC9"
          fadeDistance={30}
          position={[0, -0.01, 0]}
        />
      )}

      {/* Objects */}
      {objects.map((obj) => (
        <mesh
          key={obj.id}
          position={obj.position}
          rotation={obj.rotation.map((r) => (r * Math.PI) / 180) as [number, number, number]}
          scale={obj.scale}
          onClick={(e) => {
            e.stopPropagation();
            onSelectObject(obj.id);
          }}
        >
          {getGeometry(obj.type)}
          <meshStandardMaterial
            color={obj.color}
            emissive={selectedObjectId === obj.id ? '#00CEC9' : '#000000'}
            emissiveIntensity={selectedObjectId === obj.id ? 0.2 : 0}
          />
        </mesh>
      ))}
    </>
  );
}

export function Creation3DCanvas({
  objects,
  selectedObjectId,
  showGrid,
  onSelectObject,
  onShowGridChange,
}: Creation3DCanvasProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('perspective');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const viewButtons = [
    { id: 'perspective' as const, icon: Box, label: '3D' },
    { id: 'front' as const, icon: Square, label: '정면' },
    { id: 'top' as const, icon: LayoutGrid, label: '상단' },
    { id: 'side' as const, icon: Sidebar, label: '측면' },
  ];

  const getCameraPosition = (): [number, number, number] => {
    switch (viewMode) {
      case 'perspective':
        return [5, 5, 5];
      case 'front':
        return [0, 0, 10];
      case 'top':
        return [0, 10, 0.1];
      case 'side':
        return [10, 0, 0];
      default:
        return [5, 5, 5];
    }
  };

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

  return (
    <div
      ref={containerRef}
      className="relative flex-1"
      style={{
        background: 'radial-gradient(circle at center, #252542 0%, #1a1a2e 100%)',
      }}
      onClick={() => onSelectObject(null)}
    >
      {/* Canvas */}
      <Canvas>
        <PerspectiveCamera makeDefault position={getCameraPosition()} fov={50} />
        <Suspense fallback={null}>
          <Scene
            objects={objects}
            selectedObjectId={selectedObjectId}
            showGrid={showGrid}
            onSelectObject={onSelectObject}
          />
        </Suspense>
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={viewMode === 'perspective'}
          minDistance={2}
          maxDistance={50}
        />
      </Canvas>

      {/* View Mode Toggle */}
      <div className="absolute left-6 top-6 flex gap-1 rounded-[10px] bg-[#252542] p-1">
        {viewButtons.map(({ id, icon: Icon, label }) => (
          <Button
            key={id}
            variant={viewMode === id ? 'default' : 'ghost'}
            onClick={() => setViewMode(id)}
            className={cn(
              'rounded-lg px-4 py-2.5 text-[13px] font-semibold',
              viewMode === id
                ? 'bg-[#00CEC9] text-white hover:bg-[#00b8b3]'
                : 'text-[#a0a0b0] hover:text-white hover:bg-transparent'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Object Info */}
      {selectedObjectId && (
        <div className="absolute right-6 top-6 rounded-[10px] bg-[#252542] px-4 py-3 text-[13px]">
          <span className="text-[#a0a0b0]">선택: </span>
          <span className="text-white">
            {objects.find((o) => o.id === selectedObjectId)?.type || '-'}
          </span>
        </div>
      )}

      {/* Canvas Controls */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2 rounded-[28px] bg-[#252542] p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setViewMode('perspective')}
          title="시점 초기화"
          className="h-11 w-11 rounded-full bg-[#1a1a2e] text-white hover:bg-[#00CEC9]"
        >
          <Home className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title="확대"
          className="h-11 w-11 rounded-full bg-[#1a1a2e] text-white hover:bg-[#00CEC9]"
        >
          <ZoomIn className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title="축소"
          className="h-11 w-11 rounded-full bg-[#1a1a2e] text-white hover:bg-[#00CEC9]"
        >
          <ZoomOut className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          title="선택 오브젝트에 맞추기"
          className="h-11 w-11 rounded-full bg-[#1a1a2e] text-white hover:bg-[#00CEC9]"
        >
          <Scan className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onShowGridChange(!showGrid)}
          title="그리드 토글"
          className={cn(
            'h-11 w-11 rounded-full',
            showGrid ? 'bg-[#00CEC9] text-white hover:bg-[#00b8b3]' : 'bg-[#1a1a2e] text-white hover:bg-[#00CEC9]'
          )}
        >
          <Grid3X3 className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleFullscreen}
          title="전체화면"
          className="h-11 w-11 rounded-full bg-[#1a1a2e] text-white hover:bg-[#00CEC9]"
        >
          <Maximize className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default Creation3DCanvas;
