'use client';

import { useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Grid, Center } from '@react-three/drei';
import {
  Box,
  Rotate3d,
  ArrowUp,
  Compass,
  Home,
  RefreshCw,
  Move,
  ZoomIn,
  ZoomOut,
  Scan,
  Camera,
  Maximize,
  Building2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type ViewPreset = 'perspective' | '3d' | 'top' | 'front' | 'home';
type ControlMode = 'rotate' | 'pan' | 'zoomIn' | 'zoomOut' | 'fit' | 'screenshot';

interface CreationViewer3DSceneProps {
  autoRotate?: boolean;
  onAutoRotateChange?: (enabled: boolean) => void;
  onScreenshot?: () => void;
}

function Scene({ autoRotate }: { autoRotate: boolean }) {
  return (
    <>
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} />

      {/* Grid */}
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

      {/* Placeholder Object */}
      <Center>
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#00CEC9" transparent opacity={0.3} />
        </mesh>
      </Center>

      {/* Controls */}
      <OrbitControls
        autoRotate={autoRotate}
        autoRotateSpeed={2}
        enablePan={true}
        enableZoom={true}
        minDistance={2}
        maxDistance={50}
      />
    </>
  );
}

export function CreationViewer3DScene({
  autoRotate: initialAutoRotate = true,
  onAutoRotateChange,
  onScreenshot,
}: CreationViewer3DSceneProps) {
  const [viewPreset, setViewPreset] = useState<ViewPreset>('perspective');
  const [controlMode, setControlMode] = useState<ControlMode>('rotate');
  const [autoRotate, setAutoRotate] = useState(initialAutoRotate);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const viewPresets = [
    { id: 'perspective' as const, icon: Box },
    { id: '3d' as const, icon: Rotate3d },
    { id: 'top' as const, icon: ArrowUp },
    { id: 'front' as const, icon: Compass },
    { id: 'home' as const, icon: Home },
  ];

  const controlButtons = [
    { id: 'rotate' as const, icon: Rotate3d },
    { id: 'pan' as const, icon: Move },
    { id: 'zoomIn' as const, icon: ZoomIn },
    { id: 'zoomOut' as const, icon: ZoomOut },
    { id: 'fit' as const, icon: Scan },
    { id: 'screenshot' as const, icon: Camera },
  ];

  const handleAutoRotateToggle = () => {
    const newValue = !autoRotate;
    setAutoRotate(newValue);
    onAutoRotateChange?.(newValue);
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

  const handleControlClick = (mode: ControlMode) => {
    if (mode === 'screenshot') {
      onScreenshot?.();
    } else {
      setControlMode(mode);
    }
  };

  const getCameraPosition = (): [number, number, number] => {
    switch (viewPreset) {
      case 'perspective':
        return [5, 5, 5];
      case '3d':
        return [8, 4, 8];
      case 'top':
        return [0, 10, 0.1];
      case 'front':
        return [0, 0, 10];
      case 'home':
        return [5, 5, 5];
      default:
        return [5, 5, 5];
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1"
      style={{
        background: 'radial-gradient(circle at center, #252542 0%, #1a1a2e 100%)',
      }}
    >
      {/* 3D Canvas */}
      <Canvas>
        <PerspectiveCamera makeDefault position={getCameraPosition()} fov={50} />
        <Suspense fallback={null}>
          <Scene autoRotate={autoRotate} />
        </Suspense>
      </Canvas>

      {/* Placeholder Overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#00CEC9] bg-[#00CEC9]/10 p-12">
          <Building2 className="h-24 w-24 text-[#00CEC9] opacity-50 md:h-[120px] md:w-[120px]" />
          <span className="mt-4 text-lg font-semibold text-[#a0a0b0] md:text-xl">
            3D 창작물 뷰어
          </span>
          <small className="mt-1 text-sm text-[#a0a0b0] opacity-70">
            마우스로 회전, 휠로 확대/축소
          </small>
        </div>
      </div>

      {/* View Presets - Left Side */}
      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-2 md:left-6">
        {viewPresets.map(({ id, icon: Icon }) => (
          <Button
            key={id}
            variant="ghost"
            size="icon"
            onClick={() => setViewPreset(id)}
            className={cn(
              'h-11 w-11 rounded-[10px] text-white md:h-[50px] md:w-[50px]',
              viewPreset === id ? 'bg-[#00CEC9] hover:bg-[#00b8b3]' : 'bg-[#252542] hover:bg-[#3d3d5c]'
            )}
          >
            <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" />
          </Button>
        ))}
      </div>

      {/* Auto Rotate Toggle - Top Left */}
      <div className="absolute left-4 top-4 flex items-center gap-2.5 rounded-3xl bg-[#252542] px-4 py-3 md:left-6 md:top-6">
        <RefreshCw className="h-[18px] w-[18px] text-[#00CEC9]" />
        <span className="text-[13px] font-semibold text-white">자동 회전</span>
        <label className="relative h-6 w-11 cursor-pointer">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={handleAutoRotateToggle}
            className="peer sr-only"
          />
          <span className="absolute inset-0 rounded-3xl bg-[#3d3d5c] transition-colors peer-checked:bg-[#00CEC9]" />
          <span className="absolute bottom-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform peer-checked:translate-x-5" />
        </label>
      </div>

      {/* Fullscreen Button - Top Right */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleFullscreen}
        className="absolute right-4 top-4 h-11 w-11 rounded-full bg-[#252542] text-white hover:bg-[#00CEC9] md:right-6 md:top-6 md:h-12 md:w-12"
      >
        <Maximize className="h-5 w-5 md:h-[22px] md:w-[22px]" />
      </Button>

      {/* View Controls - Bottom Center */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-[32px] bg-[#252542] p-2 shadow-[0_4px_20px_rgba(0,0,0,0.3)] md:bottom-8 md:gap-2 md:p-3">
        {controlButtons.map(({ id, icon: Icon }) => (
          <Button
            key={id}
            variant="ghost"
            size="icon"
            onClick={() => handleControlClick(id)}
            className={cn(
              'h-10 w-10 rounded-full text-white md:h-12 md:w-12',
              controlMode === id && id !== 'screenshot'
                ? 'bg-[#00CEC9] hover:bg-[#00b8b3]'
                : 'bg-[#1a1a2e] hover:bg-[#00CEC9]'
            )}
          >
            <Icon className="h-5 w-5 md:h-[22px] md:w-[22px]" />
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CreationViewer3DScene;
