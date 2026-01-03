'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Box, Circle, Triangle, CircleDot, Square, Cylinder } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type TabType = 'shapes' | 'colors';

interface PrimitiveItem {
  id: string;
  name: string;
  icon: React.ElementType;
  color?: string;
}

interface EditorSidebarLeftProps {
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
  onPrimitiveAdd?: (primitiveId: string) => void;
}

const basicShapes: PrimitiveItem[] = [
  { id: 'box', name: '박스', icon: Box },
  { id: 'sphere', name: '구', icon: Circle },
  { id: 'cylinder', name: '원기둥', icon: Cylinder },
  { id: 'cone', name: '원뿔', icon: Triangle },
  { id: 'torus', name: '토러스', icon: CircleDot },
  { id: 'plane', name: '평면', icon: Square },
];

const brickParts: PrimitiveItem[] = [
  { id: 'brick1x1', name: '1x1 브릭', icon: Box, color: '#FF6B6B' },
  { id: 'brick2x1', name: '2x1 브릭', icon: Box, color: '#4ECDC4' },
  { id: 'brick2x2', name: '2x2 브릭', icon: Box, color: '#45B7D1' },
  { id: 'brick4x2', name: '4x2 브릭', icon: Box, color: '#96CEB4' },
];

const colorPalette = [
  '#FF0000', '#FF4500', '#FFA500', '#FFD700', '#FFFF00',
  '#9ACD32', '#32CD32', '#00FA9A', '#00CED1', '#1E90FF',
  '#0000FF', '#8A2BE2', '#9400D3', '#FF1493', '#FF69B4',
  '#FFFFFF', '#D3D3D3', '#A9A9A9', '#696969', '#000000',
  '#8B4513', '#A0522D', '#D2691E', '#F4A460', '#DEB887',
  '#FFE4C4', '#FFDAB9', '#EEE8AA', '#F0E68C', '#BDB76B',
];

export function EditorSidebarLeft({
  selectedColor = '#0066FF',
  onColorSelect,
  onPrimitiveAdd,
}: EditorSidebarLeftProps) {
  const [activeTab, setActiveTab] = useState<TabType>('shapes');

  return (
    <div className="flex h-full w-[280px] flex-col border-r border-gray-200 bg-white lg:w-60">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-200 p-4">
        <Link
          href="/brickarts"
          className="flex items-center gap-2 text-lg font-extrabold text-pixar-blue"
        >
          <Box className="h-6 w-6" />
          BrickArt Editor
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <Button
          onClick={() => setActiveTab('shapes')}
          variant="ghost"
          className={cn(
            'flex-1 rounded-none border-b-2 py-3 text-[13px] font-semibold',
            activeTab === 'shapes'
              ? 'border-pixar-blue text-pixar-blue'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          )}
        >
          프리미티브
        </Button>
        <Button
          onClick={() => setActiveTab('colors')}
          variant="ghost"
          className={cn(
            'flex-1 rounded-none border-b-2 py-3 text-[13px] font-semibold',
            activeTab === 'colors'
              ? 'border-pixar-blue text-pixar-blue'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          )}
        >
          색상
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'shapes' ? (
          <>
            {/* Basic Shapes */}
            <div className="mb-5">
              <div className="mb-2.5 text-xs font-bold uppercase text-gray-500">
                기본 도형
              </div>
              <div className="grid grid-cols-2 gap-2">
                {basicShapes.map((shape) => {
                  const Icon = shape.icon;
                  return (
                    <Button
                      key={shape.id}
                      onClick={() => onPrimitiveAdd?.(shape.id)}
                      variant="ghost"
                      className="flex h-auto flex-col items-center gap-2 rounded-lg border-2 border-transparent bg-gray-100 p-3 hover:-translate-y-0.5 hover:border-pixar-blue"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pixar-blue">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-900">
                        {shape.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Brick Parts */}
            <div>
              <div className="mb-2.5 text-xs font-bold uppercase text-gray-500">
                브릭 부품
              </div>
              <div className="grid grid-cols-2 gap-2">
                {brickParts.map((part) => {
                  const Icon = part.icon;
                  return (
                    <Button
                      key={part.id}
                      onClick={() => onPrimitiveAdd?.(part.id)}
                      variant="ghost"
                      className="flex h-auto flex-col items-center gap-2 rounded-lg border-2 border-transparent bg-gray-100 p-3 hover:-translate-y-0.5 hover:border-pixar-blue"
                    >
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: part.color }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-900">
                        {part.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          <div>
            <div className="mb-2.5 text-xs font-bold uppercase text-gray-500">
              색상 팔레트
            </div>
            <div className="grid grid-cols-10 gap-1 md:grid-cols-8">
              {colorPalette.map((color) => (
                <Button
                  key={color}
                  onClick={() => onColorSelect?.(color)}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'aspect-square h-auto w-auto min-w-0 rounded border-2 p-0 hover:scale-110 hover:z-10',
                    selectedColor === color
                      ? 'border-gray-900 shadow-[0_0_0_2px_white]'
                      : 'border-transparent'
                  )}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
