'use client';

import { useState } from 'react';
import { Palette, Grid3X3, Music, PlayCircle, Play, Square } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Color palette data (90+ colors)
const colorDataList = [
  { id: 1, title: 'White', color: '#F8F8F8', pitch: 'C3' },
  { id: 2, title: 'Sand Yellow', color: '#D9D097', pitch: 'C#3' },
  { id: 3, title: 'Light Yellow', color: '#DFCD77', pitch: 'D3' },
  { id: 4, title: 'Yellow', color: '#DEBC1A', pitch: 'D#3' },
  { id: 5, title: 'Yellow Deep', color: '#E6A321', pitch: 'E3' },
  { id: 6, title: 'Orange', color: '#F15607', pitch: 'F#3' },
  { id: 7, title: 'Apricot', color: '#C6B299', pitch: 'G4' },
  { id: 8, title: 'Sand Storm', color: '#D0A159', pitch: 'A6' },
  { id: 9, title: 'Egg Yellow', color: '#D7911F', pitch: 'A#6' },
  { id: 10, title: 'Dark Orange', color: '#EB3300', pitch: 'G3' },
  { id: 11, title: 'Red', color: '#A10000', pitch: 'D#4' },
  { id: 12, title: 'Bordeaux', color: '#550002', pitch: 'D4' },
  { id: 13, title: 'Pale Peach', color: '#D2C8D8', pitch: 'A#4' },
  { id: 14, title: 'Medium Wood', color: '#D29C60', pitch: 'B6' },
  { id: 15, title: 'Grayish Brown', color: '#9D7B60', pitch: 'E4' },
  { id: 16, title: 'Raw Sienna', color: '#A56F41', pitch: 'G#3' },
  { id: 17, title: 'Brown Yellow', color: '#C05B31', pitch: 'A3' },
  { id: 18, title: 'Tomato Red', color: '#B64642', pitch: 'C6' },
  { id: 19, title: 'Light Peach', color: '#DFC1A7', pitch: 'F#4' },
  { id: 20, title: 'Caramel', color: '#C48856', pitch: 'D#6' },
  { id: 21, title: 'Caramel Rose', color: '#C67468', pitch: 'C#6' },
  { id: 22, title: 'Coffee', color: '#5C3A31', pitch: 'B3' },
  { id: 23, title: 'Brown Red', color: '#553331', pitch: 'C#4' },
  { id: 24, title: 'Dark Brown', color: '#382720', pitch: 'C4' },
  { id: 25, title: 'Beige', color: '#B8AA7B', pitch: 'G6' },
  { id: 26, title: 'Earthy Yellow', color: '#B69A68', pitch: 'G#6' },
  { id: 27, title: 'Light Grass Green', color: '#CDD37D', pitch: 'A8' },
  { id: 28, title: 'Fresh Green', color: '#6BC85D', pitch: 'G#8' },
  { id: 29, title: 'Light Green', color: '#2FA75F', pitch: 'G8' },
  { id: 30, title: 'Green', color: '#17834C', pitch: 'F#8' },
  { id: 31, title: 'Pale Green', color: '#BCD884', pitch: 'C7' },
  { id: 32, title: 'Apple Green', color: '#8BAB30', pitch: 'C#7' },
  { id: 33, title: 'Grass Green', color: '#829539', pitch: 'D7' },
  { id: 34, title: 'Sap Green', color: '#3C682B', pitch: 'E7' },
  { id: 35, title: 'Deep Olive Green', color: '#32442E', pitch: 'F7' },
  { id: 36, title: 'Army Green', color: '#262F2C', pitch: 'F#7' },
  { id: 37, title: 'Pink', color: '#D09CC3', pitch: 'A5' },
  { id: 38, title: 'Peach Red', color: '#CA7F96', pitch: 'G#5' },
  { id: 39, title: 'Dark Pink', color: '#D84CA3', pitch: 'C5' },
  { id: 40, title: 'Plum Red', color: '#D44B79', pitch: 'C#5' },
  { id: 41, title: 'Rose Red', color: '#AC2C5C', pitch: 'D5' },
  { id: 42, title: 'Bean Sand Red', color: '#583948', pitch: 'D#5' },
  { id: 43, title: 'Powder Purple', color: '#C4B4CF', pitch: 'B4' },
  { id: 44, title: 'Lavender', color: '#A97991', pitch: 'F#5' },
  { id: 45, title: 'Light Rose Red', color: '#B44B73', pitch: 'F5' },
  { id: 46, title: 'Magenta', color: '#A1316C', pitch: 'E5' },
  { id: 49, title: 'Lilac', color: '#AC8D9D', pitch: 'G5' },
  { id: 55, title: 'Mint Green', color: '#B4D8D4', pitch: 'C#8' },
  { id: 56, title: 'Aqua Blue', color: '#3CABC9', pitch: 'A#7' },
  { id: 57, title: 'Sea Blue', color: '#0598C1', pitch: 'A7' },
  { id: 59, title: 'Sky Blue', color: '#1285C9', pitch: 'F5' },
  { id: 60, title: 'Blue', color: '#154EB2', pitch: 'E5' },
  { id: 61, title: 'Emerald Green', color: '#86BCA4', pitch: 'D8' },
  { id: 62, title: 'Pea Green', color: '#609784', pitch: 'D#8' },
  { id: 63, title: 'Light Lake Blue', color: '#669DA4', pitch: 'C8' },
  { id: 64, title: 'Lake Blue', color: '#296E7E', pitch: 'E8' },
  { id: 65, title: 'Dark Blue', color: '#145F9E', pitch: 'G#7' },
  { id: 66, title: 'Marine Blue', color: '#1A3564', pitch: 'D#5' },
  { id: 67, title: 'Powder Blue', color: '#A1B6D1', pitch: 'A#4' },
  { id: 68, title: 'Dark Powder Blue', color: '#82A5CF', pitch: 'B4' },
  { id: 70, title: 'Dark Gray Blue', color: '#39505E', pitch: 'C#5' },
  { id: 73, title: 'Beige Gray', color: '#A4A690', pitch: 'F#6' },
  { id: 76, title: 'Gray Blue', color: '#668597', pitch: 'C5' },
  { id: 78, title: 'Gray White', color: '#CFCDC9', pitch: 'F6' },
  { id: 79, title: 'Rose White', color: '#E4D5D3', pitch: 'A4' },
  { id: 80, title: 'Shell Pink', color: '#F3CFB3', pitch: 'G#4' },
  { id: 81, title: 'Buff Titanium', color: '#ECC7CD', pitch: 'B5' },
  { id: 82, title: 'Portrait Pink', color: '#FABBCB', pitch: 'A#5' },
  { id: 83, title: 'Bisque', color: '#E8927C', pitch: 'D6' },
  { id: 84, title: 'Yellow Orange', color: '#ED8800', pitch: 'F3' },
  { id: 85, title: 'Compose Green', color: '#ADCABB', pitch: 'E6' },
  { id: 86, title: 'Olive Green', color: '#7C8034', pitch: 'D#7' },
  { id: 87, title: 'Medium Green', color: '#5C7F71', pitch: 'G7' },
  { id: 88, title: 'Turquoise Blue', color: '#00B2A9', pitch: 'F8' },
  { id: 89, title: 'Mono Warm', color: '#CDA077', pitch: 'F4' },
  { id: 90, title: 'Burnt Umber', color: '#89532F', pitch: 'A#3' },
  { id: 91, title: 'Compose Blue', color: '#71C5E8', pitch: 'B7' },
  { id: 92, title: 'Indigo', color: '#003B5C', pitch: 'D5' },
];

const canvasSizes = [16, 32, 48, 64];

interface DotArtRightPanelProps {
  selectedColor: string;
  selectedColorId: number;
  canvasSize: number;
  musicMode: boolean;
  showColorIds: boolean;
  usedColorsCount: number;
  onColorSelect: (color: string, id: number) => void;
  onColorInputChange: (color: string) => void;
  onSizeSelect: (size: number) => void;
  onMusicModeToggle: (enabled: boolean) => void;
  onTracePlay: () => void;
  onTraceStop: () => void;
  isTracePlaying: boolean;
}

export function DotArtRightPanel({
  selectedColor,
  selectedColorId,
  canvasSize,
  musicMode,
  showColorIds,
  usedColorsCount,
  onColorSelect,
  onColorInputChange,
  onSizeSelect,
  onMusicModeToggle,
  onTracePlay,
  onTraceStop,
  isTracePlaying,
}: DotArtRightPanelProps) {
  const [colorInput, setColorInput] = useState(selectedColor);

  const handleColorInputChange = (value: string) => {
    setColorInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      onColorInputChange(value);
    }
  };

  return (
    <div className="flex w-80 flex-col overflow-y-auto border-l border-[#3d3d5c] bg-[#252542]">
      {/* Color Palette */}
      <div className="border-b border-[#3d3d5c] p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
          <Palette className="h-[18px] w-[18px] text-[#9B5DE5]" />
          컬러 팔레트
          <span className="text-xs font-normal text-[#a0a0b0]">
            ({usedColorsCount} colors used)
          </span>
        </h3>
        <div
          className={cn(
            'grid max-h-[200px] grid-cols-10 gap-1 overflow-y-auto p-1',
            showColorIds && 'show-ids'
          )}
        >
          {colorDataList.map((colorData) => (
            <Button
              key={colorData.id}
              variant="ghost"
              size="icon"
              onClick={() => onColorSelect(colorData.color, colorData.id)}
              title={colorData.title}
              className={cn(
                'relative aspect-square h-auto w-full cursor-pointer rounded p-0 transition-transform hover:z-10 hover:scale-[1.15]',
                selectedColor === colorData.color
                  ? 'border-2 border-white shadow-[0_0_0_2px_#9B5DE5]'
                  : 'border-2 border-transparent'
              )}
              style={{ backgroundColor: colorData.color }}
            >
              {showColorIds && (
                <span className="absolute bottom-0 right-0 rounded-sm bg-black/70 px-0.5 py-px text-[7px] text-white">
                  {colorData.id}
                </span>
              )}
            </Button>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <div
            className="h-12 w-12 rounded-[10px] border-[3px] border-white"
            style={{ backgroundColor: selectedColor }}
          />
          <input
            type="text"
            value={colorInput}
            onChange={(e) => handleColorInputChange(e.target.value)}
            className="flex-1 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] px-3 py-3 font-mono text-sm text-white outline-none focus:border-[#9B5DE5]"
          />
          <div className="min-w-[50px] rounded-[10px] bg-[#1a1a2e] px-3 py-3 text-center text-sm font-semibold text-white">
            #{selectedColorId}
          </div>
        </div>
      </div>

      {/* Canvas Size */}
      <div className="border-b border-[#3d3d5c] p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
          <Grid3X3 className="h-[18px] w-[18px] text-[#9B5DE5]" />
          캔버스 크기
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {canvasSizes.map((size) => (
            <Button
              key={size}
              variant="ghost"
              size="sm"
              onClick={() => onSizeSelect(size)}
              className={cn(
                'rounded-lg border-2 px-2.5 py-2.5 text-xs font-semibold transition-colors',
                canvasSize === size
                  ? 'border-[#9B5DE5] bg-[#9B5DE5] text-white'
                  : 'border-[#3d3d5c] bg-[#1a1a2e] text-white hover:border-[#9B5DE5]'
              )}
            >
              {size}x{size}
            </Button>
          ))}
        </div>
      </div>

      {/* Music Mode */}
      <div className="p-5">
        <div
          className={cn(
            'flex items-center justify-between rounded-[10px] p-4',
            musicMode
              ? 'bg-gradient-to-r from-[#9B5DE5]/40 to-[#F15BB5]/40'
              : 'bg-gradient-to-r from-[#9B5DE5]/20 to-[#F15BB5]/20'
          )}
        >
          <div className="flex items-center gap-2.5">
            <Music className="h-6 w-6 text-[#F15BB5]" />
            <div>
              <span className="block text-sm font-semibold text-white">음악 모드</span>
              <small className="text-[11px] text-[#a0a0b0]">
                그리면서 음악을 만들어보세요
              </small>
            </div>
          </div>
          <label className="relative h-6 w-11 cursor-pointer">
            <input
              type="checkbox"
              checked={musicMode}
              onChange={(e) => onMusicModeToggle(e.target.checked)}
              className="peer sr-only"
            />
            <span
              className={cn(
                'absolute inset-0 rounded-3xl transition-colors',
                musicMode ? 'bg-[#9B5DE5]' : 'bg-[#3d3d5c]'
              )}
            />
            <span
              className={cn(
                'absolute bottom-[3px] left-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform',
                musicMode && 'translate-x-5'
              )}
            />
          </label>
        </div>

        {/* Trace Mode */}
        <div className="mt-3 flex items-center justify-between rounded-[10px] bg-[#1a1a2e] p-4">
          <div className="flex items-center gap-2.5">
            <PlayCircle className="h-6 w-6 text-[#9B5DE5]" />
            <div>
              <span className="block text-sm font-semibold text-white">트레이스 재생</span>
              <small className="text-[11px] text-[#a0a0b0]">작업 과정 애니메이션</small>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onTracePlay}
              title="재생"
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                isTracePlaying ? 'bg-[#F15BB5] text-white' : 'bg-[#3d3d5c] text-white hover:bg-[#9B5DE5]'
              )}
            >
              <Play className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onTraceStop}
              title="정지"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3d3d5c] text-white transition-colors hover:bg-[#9B5DE5]"
            >
              <Square className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DotArtRightPanel;
