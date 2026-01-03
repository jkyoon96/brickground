'use client';

import { useState } from 'react';
import {
  Image as ImageIcon,
  Pencil,
  Copy,
  Palette,
  Play,
  Hash,
  Settings2,
  Layers,
  Sun,
  Grid3X3,
  Download,
  Archive,
  Puzzle,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Color palette data (sample)
const colorDataList = [
  { id: 1, title: 'White', color: '#F8F8F8' },
  { id: 4, title: 'Yellow', color: '#DEBC1A' },
  { id: 6, title: 'Orange', color: '#F15607' },
  { id: 11, title: 'Red', color: '#A10000' },
  { id: 30, title: 'Green', color: '#17834C' },
  { id: 60, title: 'Blue', color: '#154EB2' },
  { id: 47, title: 'Medium Violet', color: '#87318E' },
  { id: 72, title: 'Black', color: '#181C1F' },
];

interface UsedColor {
  id: number;
  color: string;
  count: number;
}

interface DotArtViewerPanelProps {
  pixels: string[][];
  usedColors: UsedColor[];
  showColorIds: boolean;
  dotModel: 'cylinder' | 'round';
  lightIntensity: number;
  showBaseplate: boolean;
  onEdit: () => void;
  onRemix: () => void;
  onTracePlay: () => void;
  onToggleColorIds: () => void;
  onDotModelChange: (model: 'cylinder' | 'round') => void;
  onLightIntensityChange: (intensity: number) => void;
  onBaseplateToggle: (show: boolean) => void;
  onExportPNG: () => void;
  onExportZIP: () => void;
  onDownloadGuide: () => void;
}

export function DotArtViewerPanel({
  pixels,
  usedColors,
  showColorIds,
  dotModel,
  lightIntensity,
  showBaseplate,
  onEdit,
  onRemix,
  onTracePlay,
  onToggleColorIds,
  onDotModelChange,
  onLightIntensityChange,
  onBaseplateToggle,
  onExportPNG,
  onExportZIP,
  onDownloadGuide,
}: DotArtViewerPanelProps) {
  const [selectedColor, setSelectedColor] = useState<number | null>(null);

  return (
    <div className="flex w-[380px] flex-col overflow-y-auto border-l border-[#3d3d5c] bg-[#252542]">
      {/* 2D Preview */}
      <div className="border-b border-[#3d3d5c] p-6">
        <h3 className="mb-4 flex items-center gap-2.5 text-base font-bold text-white">
          <ImageIcon className="h-5 w-5 text-[#9B5DE5]" />
          원본 작품
        </h3>
        <div className="mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded-[10px] bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D]">
          <Palette className="h-16 w-16 text-white/60" />
        </div>
        <div className="flex gap-2.5">
          <Button
            variant="ghost"
            onClick={onEdit}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-[10px] bg-[#1a1a2e] py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#9B5DE5]"
          >
            <Pencil className="h-4 w-4" />
            편집
          </Button>
          <Button
            variant="ghost"
            onClick={onRemix}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-[10px] bg-[#1a1a2e] py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[#9B5DE5]"
          >
            <Copy className="h-4 w-4" />
            리믹스
          </Button>
        </div>
      </div>

      {/* Color Palette */}
      <div className="border-b border-[#3d3d5c] p-6">
        <h3 className="mb-4 flex items-center gap-2.5 text-base font-bold text-white">
          <Palette className="h-5 w-5 text-[#9B5DE5]" />
          색상 팔레트
          <span className="text-xs font-normal text-[#a0a0b0]">
            ({usedColors.length} colors)
          </span>
        </h3>
        <div className="grid max-h-[200px] grid-cols-10 gap-1 overflow-y-auto p-1">
          {usedColors.map((colorData) => (
            <Button
              key={colorData.id}
              variant="ghost"
              size="icon"
              onClick={() => setSelectedColor(colorData.id)}
              className={cn(
                'relative aspect-square h-auto w-full cursor-pointer rounded p-0 transition-transform hover:z-10 hover:scale-110',
                selectedColor === colorData.id
                  ? 'border-2 border-white shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                  : 'border-2 border-transparent'
              )}
              style={{ backgroundColor: colorData.color }}
            >
              {colorData.count > 0 && (
                <span className="absolute -bottom-0.5 -right-0.5 rounded bg-[#1a1a2e] px-1 py-px text-[8px] text-white">
                  {colorData.count}
                </span>
              )}
            </Button>
          ))}
        </div>
        <div className="mt-3 flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onTracePlay}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#1a1a2e] py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#9B5DE5]"
          >
            <Play className="h-4 w-4" />
            트레이스 재생
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleColorIds}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-xs font-semibold transition-colors',
              showColorIds
                ? 'bg-[#9B5DE5] text-white'
                : 'bg-[#1a1a2e] text-white hover:bg-[#9B5DE5]'
            )}
          >
            <Hash className="h-4 w-4" />
            색상 ID 표시
          </Button>
        </div>
      </div>

      {/* Voxel Settings */}
      <div className="border-b border-[#3d3d5c] p-6">
        <h3 className="mb-4 flex items-center gap-2.5 text-base font-bold text-white">
          <Settings2 className="h-5 w-5 text-[#9B5DE5]" />
          복셀 설정
        </h3>

        {/* Dot Model */}
        <div className="flex items-center justify-between border-b border-[#3d3d5c] py-3">
          <div className="flex items-center gap-2 text-sm text-white">
            <Layers className="h-[18px] w-[18px] text-[#a0a0b0]" />
            도트 모델
          </div>
          <select
            value={dotModel}
            onChange={(e) => onDotModelChange(e.target.value as 'cylinder' | 'round')}
            className="w-[100px] rounded-lg border-2 border-[#3d3d5c] bg-[#1a1a2e] px-3 py-2 text-center text-[13px] text-white outline-none focus:border-[#9B5DE5]"
          >
            <option value="cylinder">실린더</option>
            <option value="round">라운드</option>
          </select>
        </div>

        {/* Light Intensity */}
        <div className="flex items-center justify-between border-b border-[#3d3d5c] py-3">
          <div className="flex items-center gap-2 text-sm text-white">
            <Sun className="h-[18px] w-[18px] text-[#a0a0b0]" />
            조명 강도
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={lightIntensity}
            onChange={(e) => onLightIntensityChange(Number(e.target.value))}
            className="w-[120px] accent-[#9B5DE5]"
          />
        </div>

        {/* Base Plate */}
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-sm text-white">
            <Grid3X3 className="h-[18px] w-[18px] text-[#a0a0b0]" />
            베이스 플레이트
          </div>
          <label className="relative h-6 w-11 cursor-pointer">
            <input
              type="checkbox"
              checked={showBaseplate}
              onChange={(e) => onBaseplateToggle(e.target.checked)}
              className="peer sr-only"
            />
            <span
              className={cn(
                'absolute inset-0 rounded-3xl transition-colors',
                showBaseplate ? 'bg-[#9B5DE5]' : 'bg-[#3d3d5c]'
              )}
            />
            <span
              className={cn(
                'absolute bottom-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform',
                showBaseplate && 'translate-x-5'
              )}
            />
          </label>
        </div>
      </div>

      {/* Export Options */}
      <div className="border-b border-[#3d3d5c] p-6">
        <h3 className="mb-4 flex items-center gap-2.5 text-base font-bold text-white">
          <Download className="h-5 w-5 text-[#9B5DE5]" />
          내보내기
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            onClick={onExportPNG}
            className="flex h-auto flex-col items-center gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] p-4 transition-colors hover:border-[#9B5DE5] hover:bg-[#9B5DE5]/10"
          >
            <ImageIcon className="h-7 w-7 text-[#9B5DE5]" />
            <span className="text-[13px] font-semibold text-white">PNG</span>
            <small className="text-[11px] text-[#a0a0b0]">스크린샷</small>
          </Button>
          <Button
            variant="ghost"
            onClick={onExportZIP}
            className="flex h-auto flex-col items-center gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] p-4 transition-colors hover:border-[#9B5DE5] hover:bg-[#9B5DE5]/10"
          >
            <Archive className="h-7 w-7 text-[#9B5DE5]" />
            <span className="text-[13px] font-semibold text-white">ZIP</span>
            <small className="text-[11px] text-[#a0a0b0]">블럭 이미지</small>
          </Button>
        </div>
      </div>

      {/* Block Guide */}
      <div className="p-6">
        <h3 className="mb-4 flex items-center gap-2.5 text-base font-bold text-white">
          <Puzzle className="h-5 w-5 text-[#9B5DE5]" />
          조립 가이드
        </h3>
        <div className="rounded-[10px] bg-gradient-to-br from-[#9B5DE5]/20 to-[#F15BB5]/20 p-5 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#9B5DE5]">
            <BookOpen className="h-8 w-8 text-white" />
          </div>
          <h4 className="mb-2 text-base font-bold text-white">블록 조립 설명서</h4>
          <p className="mb-4 text-[13px] text-[#a0a0b0]">
            이 작품을 실제 블록으로 조립하는 방법을 확인하세요
          </p>
          <Button
            onClick={onDownloadGuide}
            className="inline-flex items-center gap-2 rounded-[10px] bg-[#9B5DE5] px-6 py-3 text-sm font-semibold text-white"
          >
            <Download className="h-[18px] w-[18px]" />
            설명서 다운로드
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DotArtViewerPanel;
