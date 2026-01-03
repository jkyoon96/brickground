'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Grid, Center } from '@react-three/drei';
import * as THREE from 'three';
import {
  ViewerHeader,
  ViewerControls,
  AssemblyGuidePanel,
  ViewerSidebar,
} from '@/components/user';

// Mock data
const mockParts = [
  { id: 'platform', name: 'platform', displayName: 'Platform', color: '#8B4513', assemblyLevel: 1 },
  { id: 'house_body', name: 'house_body', displayName: 'House Body', color: '#E8D5B7', assemblyLevel: 2 },
  { id: 'roof', name: 'roof', displayName: 'Roof', color: '#B22222', assemblyLevel: 3 },
  { id: 'door', name: 'door', displayName: 'Door', color: '#654321', assemblyLevel: 4 },
  { id: 'window_left', name: 'window_left', displayName: 'Window Left', color: '#87CEEB', assemblyLevel: 5 },
  { id: 'window_right', name: 'window_right', displayName: 'Window Right', color: '#87CEEB', assemblyLevel: 6 },
  { id: 'chimney', name: 'chimney', displayName: 'Chimney', color: '#8B0000', assemblyLevel: 7 },
  { id: 'tree_1', name: 'tree_1', displayName: 'Tree 1', color: '#228B22', assemblyLevel: 9 },
  { id: 'tree_2', name: 'tree_2', displayName: 'Tree 2', color: '#32CD32', assemblyLevel: 10 },
];

const mockProducts = [
  { id: '1', name: '클래식 빅토리안 하우스', price: 45000, meta: 'DIY 키트 / 조립시간 3시간', icon: 'home' as const },
  { id: '2', name: '모던 미니멀 하우스', price: 38000, meta: 'DIY 키트 / 조립시간 2시간', icon: 'building' as const },
  { id: '3', name: '유럽풍 카페 세트', price: 52000, meta: 'DIY 키트 / 조립시간 4시간', icon: 'store' as const },
];

// 3D Scene Component
function Scene({
  currentStep,
  isHighlightEnabled,
  selectedPartId,
  onPartSelect,
  partsVisibility,
}: {
  currentStep: number;
  isHighlightEnabled: boolean;
  selectedPartId?: string;
  onPartSelect: (id: string) => void;
  partsVisibility: Record<string, boolean>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Auto-rotate if needed
  useFrame(() => {
    // Animation logic can be added here
  });

  const getMaterial = (partId: string, assemblyLevel: number, color: string) => {
    const isVisible = partsVisibility[partId] !== false;

    if (!isVisible) {
      return <meshStandardMaterial transparent opacity={0} />;
    }

    if (currentStep === 0) {
      return <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />;
    }

    if (assemblyLevel < currentStep) {
      return <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />;
    }

    if (assemblyLevel === currentStep) {
      return (
        <meshStandardMaterial
          color={isHighlightEnabled ? '#00ffff' : color}
          emissive={isHighlightEnabled ? '#004444' : '#000000'}
          roughness={0.6}
          metalness={0.1}
        />
      );
    }

    // Future steps - transparent
    return <meshPhysicalMaterial color="#88ccff" transparent opacity={0.3} roughness={0.1} />;
  };

  return (
    <group ref={groupRef}>
      {/* Platform */}
      <mesh
        position={[0, 0.15, 0]}
        castShadow
        receiveShadow
        onClick={() => onPartSelect('platform')}
      >
        <boxGeometry args={[8, 0.3, 8]} />
        {getMaterial('platform', 1, '#8B4513')}
      </mesh>

      {/* House Body */}
      <mesh
        position={[0, 1.65, 0]}
        castShadow
        receiveShadow
        onClick={() => onPartSelect('house_body')}
      >
        <boxGeometry args={[5, 3, 4]} />
        {getMaterial('house_body', 2, '#E8D5B7')}
      </mesh>

      {/* Roof */}
      <mesh
        position={[0, 4.15, 0]}
        rotation={[0, Math.PI / 4, 0]}
        castShadow
        receiveShadow
        onClick={() => onPartSelect('roof')}
      >
        <coneGeometry args={[4, 2, 4]} />
        {getMaterial('roof', 3, '#B22222')}
      </mesh>

      {/* Door */}
      <mesh
        position={[0, 0.9, 2.05]}
        castShadow
        onClick={() => onPartSelect('door')}
      >
        <boxGeometry args={[0.8, 1.5, 0.1]} />
        {getMaterial('door', 4, '#654321')}
      </mesh>

      {/* Windows */}
      <mesh
        position={[-1.2, 1.8, 2.05]}
        castShadow
        onClick={() => onPartSelect('window_left')}
      >
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        {getMaterial('window_left', 5, '#87CEEB')}
      </mesh>
      <mesh
        position={[1.2, 1.8, 2.05]}
        castShadow
        onClick={() => onPartSelect('window_right')}
      >
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        {getMaterial('window_right', 6, '#87CEEB')}
      </mesh>

      {/* Chimney */}
      <mesh
        position={[1.5, 4.5, -0.5]}
        castShadow
        onClick={() => onPartSelect('chimney')}
      >
        <boxGeometry args={[0.6, 1.5, 0.6]} />
        {getMaterial('chimney', 7, '#8B0000')}
      </mesh>

      {/* Trees */}
      <group onClick={() => onPartSelect('tree_1')}>
        <mesh position={[-5, 0.75, -3]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 1.5]} />
          {getMaterial('tree_1', 9, '#8B4513')}
        </mesh>
        <mesh position={[-5, 2, -3]} castShadow>
          <sphereGeometry args={[1, 8, 8]} />
          {getMaterial('tree_1', 9, '#228B22')}
        </mesh>
      </group>

      <group onClick={() => onPartSelect('tree_2')}>
        <mesh position={[5, 0.6, 2]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 1.2]} />
          {getMaterial('tree_2', 10, '#8B4513')}
        </mesh>
        <mesh position={[5, 1.6, 2]} castShadow>
          <sphereGeometry args={[0.8, 8, 8]} />
          {getMaterial('tree_2', 10, '#32CD32')}
        </mesh>
      </group>
    </group>
  );
}

// Camera Controls
function CameraController({
  autoRotate,
  controlsRef,
}: {
  autoRotate: boolean;
  controlsRef: React.RefObject<any>;
}) {
  return (
    <OrbitControls
      ref={controlsRef}
      autoRotate={autoRotate}
      autoRotateSpeed={2}
      enableDamping
      dampingFactor={0.05}
      maxDistance={50}
      minDistance={3}
    />
  );
}

// Loading Component
function LoadingOverlay() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#1a1a2e]/90">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/10 border-t-pixar-blue" />
      <div className="mt-5 text-base font-semibold text-white">3D 모델 로딩 중...</div>
    </div>
  );
}

// Toast Component
function Toast({ message, isVisible }: { message: string; isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-black/80 px-6 py-3 text-sm font-semibold text-white">
      {message}
    </div>
  );
}

export default function BrickArtViewerPage({ params }: { params: { id: string } }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isHighlightEnabled, setIsHighlightEnabled] = useState(true);
  const [selectedPartId, setSelectedPartId] = useState<string>();
  const [partsVisibility, setPartsVisibility] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState({ message: '', isVisible: false });
  const controlsRef = useRef<any>(null);

  const totalSteps = 10;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: '', isVisible: false }), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '미니어처 하우스 컬렉션',
          text: 'BrickGround에서 3D로 감상하세요!',
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      showToast('링크가 복사되었습니다');
    }
  };

  const handleFullscreen = () => {
    const elem = document.querySelector('.viewer-main');
    if (elem) {
      if (!document.fullscreenElement) {
        elem.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    showToast('카메라 리셋');
  };

  const handleZoomIn = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.multiplyScalar(0.9);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      const camera = controlsRef.current.object;
      camera.position.multiplyScalar(1.1);
      controlsRef.current.update();
    }
  };

  const handleToggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
    showToast(autoRotate ? '자동 회전 OFF' : '자동 회전 ON');
  };

  const handlePartVisibilityToggle = (partId: string) => {
    setPartsVisibility((prev) => ({
      ...prev,
      [partId]: prev[partId] === false ? true : false,
    }));
  };

  const handleAddToCart = (productId?: string) => {
    showToast('장바구니에 추가되었습니다');
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    showToast(isLiked ? '찜 목록에서 제거됨' : '찜 목록에 추가됨');
  };

  const partsWithVisibility = mockParts.map((part) => ({
    ...part,
    isVisible: partsVisibility[part.id] !== false,
  }));

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* 3D Viewer */}
      <div className="viewer-main relative flex-1 bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
        {isLoading && <LoadingOverlay />}

        <ViewerHeader
          title="미니어처 하우스 컬렉션"
          backHref="/brickart"
          isLiked={isLiked}
          onLikeToggle={handleToggleLike}
          onShare={handleShare}
          onFullscreen={handleFullscreen}
          onSaveImage={() => showToast('이미지 저장은 준비 중입니다')}
        />

        <Canvas
          shadows
          camera={{ position: [15, 12, 15], fov: 45 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={0.6}
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <directionalLight position={[-10, 10, 10]} intensity={0.3} />
          <directionalLight position={[10, 10, -10]} intensity={0.3} />
          <directionalLight position={[-10, 10, -10]} intensity={0.3} />

          <Suspense fallback={null}>
            <Center>
              <Scene
                currentStep={currentStep}
                isHighlightEnabled={isHighlightEnabled}
                selectedPartId={selectedPartId}
                onPartSelect={setSelectedPartId}
                partsVisibility={partsVisibility}
              />
            </Center>
          </Suspense>

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

          <CameraController autoRotate={autoRotate} controlsRef={controlsRef} />
        </Canvas>

        <AssemblyGuidePanel
          currentStep={currentStep}
          totalSteps={totalSteps}
          isHighlightEnabled={isHighlightEnabled}
          onStepChange={setCurrentStep}
          onToggleHighlight={() => setIsHighlightEnabled(!isHighlightEnabled)}
        />

        <ViewerControls
          isAutoRotating={autoRotate}
          onToggleAutoRotate={handleToggleAutoRotate}
          onResetCamera={handleResetCamera}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onFocusSelected={() => showToast(selectedPartId ? '선택 객체로 이동' : '선택된 객체가 없습니다')}
          onClearSelection={() => setSelectedPartId(undefined)}
        />
      </div>

      {/* Sidebar */}
      <div className="h-[40vh] overflow-auto border-t border-gray-200 lg:h-full lg:border-t-0">
        <ViewerSidebar
          mallName="미니어처 하우스 컬렉션"
          sellerName="홍길동의 공방"
          stats={{ parts: 24, views: 12500, likes: 2300 }}
          parts={partsWithVisibility}
          products={mockProducts}
          selectedPartId={selectedPartId}
          onPartSelect={setSelectedPartId}
          onPartVisibilityToggle={handlePartVisibilityToggle}
          onProductFocus={() => handleResetCamera()}
          onAddToCart={handleAddToCart}
          onToggleLike={handleToggleLike}
          onShare={handleShare}
          isLiked={isLiked}
        />
      </div>

      <Toast message={toast.message} isVisible={toast.isVisible} />
    </div>
  );
}
