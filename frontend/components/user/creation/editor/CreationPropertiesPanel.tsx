'use client';

import { useState } from 'react';
import {
  Move3d,
  Palette,
  Layers,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Box,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface Transform {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

interface LayerItem {
  id: string;
  name: string;
  type: string;
  visible: boolean;
}

const colorPalette = [
  '#00CEC9',
  '#00D4FF',
  '#0066FF',
  '#9B5DE5',
  '#F15BB5',
  '#FF6B6B',
  '#FFD93D',
  '#6BCB77',
  '#FFFFFF',
  '#808080',
  '#333333',
  '#FF9F43',
];

interface CreationPropertiesPanelProps {
  selectedColor: string;
  transform: Transform;
  layers: LayerItem[];
  selectedLayerId: string | null;
  onColorChange: (color: string) => void;
  onTransformChange: (transform: Transform) => void;
  onLayerSelect: (id: string) => void;
  onLayerVisibilityToggle: (id: string) => void;
  onLayerDelete: (id: string) => void;
  onLayerRename: (id: string, name: string) => void;
  onAddLayer: () => void;
}

export function CreationPropertiesPanel({
  selectedColor,
  transform,
  layers,
  selectedLayerId,
  onColorChange,
  onTransformChange,
  onLayerSelect,
  onLayerVisibilityToggle,
  onLayerDelete,
  onLayerRename,
  onAddLayer,
}: CreationPropertiesPanelProps) {
  const handleTransformInputChange = (
    axis: 'position' | 'rotation' | 'scale',
    index: number,
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    const newTransform = { ...transform };
    newTransform[axis] = [...transform[axis]] as [number, number, number];
    newTransform[axis][index] = numValue;
    onTransformChange(newTransform);
  };

  const axisLabels = ['X', 'Y', 'Z'];
  const axisColors = ['#FF6B6B', '#6BCB77', '#4D96FF'];

  return (
    <div className="flex w-[320px] flex-col overflow-y-auto border-l border-[#3d3d5c] bg-[#252542]">
      {/* Transform Section */}
      <div className="border-b border-[#3d3d5c] p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
          <Move3d className="h-[18px] w-[18px] text-[#00CEC9]" />
          변환
        </h3>

        {/* Position */}
        <div className="mb-4">
          <span className="mb-2 block text-xs text-[#a0a0b0]">위치 (Position)</span>
          <div className="grid grid-cols-3 gap-2.5">
            {axisLabels.map((label, i) => (
              <div key={`pos-${label}`} className="text-center">
                <label className="mb-1 block text-[10px]" style={{ color: axisColors[i] }}>
                  {label}
                </label>
                <input
                  type="number"
                  value={transform.position[i]}
                  onChange={(e) => handleTransformInputChange('position', i, e.target.value)}
                  step="0.1"
                  className="w-full rounded-md border-2 border-[#3d3d5c] bg-[#1a1a2e] px-2 py-2 text-center text-[13px] text-white outline-none focus:border-[#00CEC9]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rotation */}
        <div className="mb-4">
          <span className="mb-2 block text-xs text-[#a0a0b0]">회전 (Rotation)</span>
          <div className="grid grid-cols-3 gap-2.5">
            {axisLabels.map((label, i) => (
              <div key={`rot-${label}`} className="text-center">
                <label className="mb-1 block text-[10px]" style={{ color: axisColors[i] }}>
                  {label}
                </label>
                <input
                  type="number"
                  value={transform.rotation[i]}
                  onChange={(e) => handleTransformInputChange('rotation', i, e.target.value)}
                  step="1"
                  className="w-full rounded-md border-2 border-[#3d3d5c] bg-[#1a1a2e] px-2 py-2 text-center text-[13px] text-white outline-none focus:border-[#00CEC9]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Scale */}
        <div>
          <span className="mb-2 block text-xs text-[#a0a0b0]">크기 (Scale)</span>
          <div className="grid grid-cols-3 gap-2.5">
            {axisLabels.map((label, i) => (
              <div key={`scale-${label}`} className="text-center">
                <label className="mb-1 block text-[10px]" style={{ color: axisColors[i] }}>
                  {label}
                </label>
                <input
                  type="number"
                  value={transform.scale[i]}
                  onChange={(e) => handleTransformInputChange('scale', i, e.target.value)}
                  step="0.1"
                  className="w-full rounded-md border-2 border-[#3d3d5c] bg-[#1a1a2e] px-2 py-2 text-center text-[13px] text-white outline-none focus:border-[#00CEC9]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Material Section */}
      <div className="border-b border-[#3d3d5c] p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
          <Palette className="h-[18px] w-[18px] text-[#00CEC9]" />
          재질
        </h3>
        <span className="mb-2 block text-xs text-[#a0a0b0]">색상</span>
        <div className="flex flex-wrap gap-2">
          {colorPalette.map((color) => (
            <Button
              key={color}
              variant="ghost"
              size="icon"
              onClick={() => onColorChange(color)}
              className={cn(
                'h-8 w-8 rounded-lg border-[3px] p-0 hover:scale-110 hover:bg-transparent',
                selectedColor === color
                  ? 'border-white shadow-[0_0_0_2px_#00CEC9]'
                  : 'border-transparent'
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Layers Section */}
      <div className="p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
          <Layers className="h-[18px] w-[18px] text-[#00CEC9]" />
          씬 구성 요소
        </h3>

        <div className="mb-3 flex max-h-[300px] flex-col gap-2 overflow-y-auto">
          {layers.map((layer) => (
            <div
              key={layer.id}
              onClick={() => onLayerSelect(layer.id)}
              className={cn(
                'group flex cursor-pointer items-center gap-2.5 rounded-[10px] px-3 py-2.5 transition-colors',
                selectedLayerId === layer.id
                  ? 'border border-[#00CEC9] bg-[#00CEC9]/20'
                  : 'bg-[#1a1a2e] hover:bg-[#00CEC9]/10'
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerVisibilityToggle(layer.id);
                }}
                className={cn(
                  'h-6 w-6 hover:bg-transparent',
                  layer.visible ? 'text-[#a0a0b0]' : 'text-[#3d3d5c]'
                )}
              >
                {layer.visible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </Button>
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#00CEC9] to-[#00D4FF]">
                <Box className="h-4 w-4 text-white" />
              </div>
              <input
                type="text"
                value={layer.name}
                onChange={(e) => onLayerRename(layer.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 border-none bg-transparent text-[13px] font-semibold text-white outline-none"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onLayerDelete(layer.id);
                }}
                className="h-6 w-6 text-[#a0a0b0] opacity-0 group-hover:opacity-100 hover:text-[#FF6B6B] hover:bg-transparent"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={onAddLayer}
          className="w-full rounded-[10px] border-2 border-dashed border-[#3d3d5c] py-3 text-[13px] text-[#a0a0b0] hover:border-[#00CEC9] hover:text-[#00CEC9] hover:bg-transparent"
        >
          <Plus className="h-4 w-4" />
          오브젝트 추가
        </Button>
      </div>
    </div>
  );
}

export default CreationPropertiesPanel;
