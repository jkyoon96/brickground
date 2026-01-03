'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  DotArtViewerHeader,
  DotArt3DScene,
  DotArtViewerPanel,
} from '@/components/user';

// Mock data - would come from API
const mockDotArtData = {
  id: '1',
  title: '귀여운 고양이',
  author: '픽셀마스터',
  canvasSize: 32,
  likes: 2847,
  isLiked: true,
  // Generate sample pixel data
  pixels: Array(32)
    .fill(null)
    .map((_, y) =>
      Array(32)
        .fill(null)
        .map((_, x) => {
          // Simple pattern for demo
          if (y >= 8 && y <= 24 && x >= 8 && x <= 24) {
            if (y >= 12 && y <= 20 && x >= 12 && x <= 20) {
              return '#FF6B6B';
            }
            return '#FFD93D';
          }
          if ((x + y) % 8 === 0) return '#9B5DE5';
          return '';
        })
    ),
};

interface UsedColor {
  id: number;
  color: string;
  count: number;
}

export default function DotArtViewerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // Use mock data
  const [data] = useState(mockDotArtData);

  // State
  const [isLiked, setIsLiked] = useState(data.isLiked);
  const [isMusicMode, setIsMusicMode] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showColorIds, setShowColorIds] = useState(false);
  const [dotModel, setDotModel] = useState<'cylinder' | 'round'>('cylinder');
  const [lightIntensity, setLightIntensity] = useState(50);
  const [showBaseplate, setShowBaseplate] = useState(true);

  // Calculate used colors
  const usedColors = useMemo((): UsedColor[] => {
    const colorCounts = new Map<string, number>();

    data.pixels.forEach((row) => {
      row.forEach((color) => {
        if (color) {
          colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
        }
      });
    });

    return Array.from(colorCounts.entries()).map(([color, count], index) => ({
      id: index + 1,
      color,
      count,
    }));
  }, [data.pixels]);

  // Handlers
  const handleBack = useCallback(() => {
    router.push('/dotart');
  }, [router]);

  const handleLikeToggle = useCallback(() => {
    setIsLiked((prev) => !prev);
  }, []);

  const handleMusicToggle = useCallback(() => {
    setIsMusicMode((prev) => !prev);
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: data.title,
        text: `${data.author}님의 도트아트 작품을 확인하세요!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 복사되었습니다.');
    }
  }, [data.title, data.author]);

  const handleOpenEditor = useCallback(() => {
    router.push(`/dotarts/new/editor?source=${id}`);
  }, [router, id]);

  const handleEdit = useCallback(() => {
    router.push(`/dotarts/new/editor?source=${id}`);
  }, [router, id]);

  const handleRemix = useCallback(() => {
    router.push(`/dotarts/new/editor?remix=${id}`);
  }, [router, id]);

  const handleTracePlay = useCallback(() => {
    console.log('Trace play started');
  }, []);

  const handleExportPNG = useCallback(() => {
    console.log('Export PNG');
  }, []);

  const handleExportZIP = useCallback(() => {
    console.log('Export ZIP');
  }, []);

  const handleDownloadGuide = useCallback(() => {
    console.log('Download guide');
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#1a1a2e]">
      {/* Header */}
      <DotArtViewerHeader
        title={data.title}
        author={data.author}
        canvasSize={data.canvasSize}
        isLiked={isLiked}
        isMusicMode={isMusicMode}
        onBack={handleBack}
        onLikeToggle={handleLikeToggle}
        onMusicToggle={handleMusicToggle}
        onShare={handleShare}
        onOpenEditor={handleOpenEditor}
      />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* 3D Scene */}
        <DotArt3DScene
          pixels={data.pixels}
          canvasSize={data.canvasSize}
          autoRotate={autoRotate}
          showBaseplate={showBaseplate}
          lightIntensity={lightIntensity}
          dotModel={dotModel}
          onAutoRotateChange={setAutoRotate}
        />

        {/* Right Panel */}
        <DotArtViewerPanel
          pixels={data.pixels}
          usedColors={usedColors}
          showColorIds={showColorIds}
          dotModel={dotModel}
          lightIntensity={lightIntensity}
          showBaseplate={showBaseplate}
          onEdit={handleEdit}
          onRemix={handleRemix}
          onTracePlay={handleTracePlay}
          onToggleColorIds={() => setShowColorIds(!showColorIds)}
          onDotModelChange={setDotModel}
          onLightIntensityChange={setLightIntensity}
          onBaseplateToggle={setShowBaseplate}
          onExportPNG={handleExportPNG}
          onExportZIP={handleExportZIP}
          onDownloadGuide={handleDownloadGuide}
        />
      </div>
    </div>
  );
}
