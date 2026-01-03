'use client';

import { useState } from 'react';
import {
  Shapes,
  Box,
  Circle,
  Cylinder,
  Triangle,
  Octagon,
  Square,
  Pentagon,
  Hexagon,
  Lightbulb,
  Sun,
  Lamp,
  Grid3X3,
  Axis3D,
  Ruler,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type TabType = 'basic' | 'lights' | 'helpers';

interface ShapeItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

const basicShapes: ShapeItem[] = [
  { id: 'box', name: '큐브', icon: Box },
  { id: 'sphere', name: '구', icon: Circle },
  { id: 'cylinder', name: '원기둥', icon: Cylinder },
  { id: 'cone', name: '콘', icon: Triangle },
  { id: 'torus', name: '토러스', icon: Octagon },
  { id: 'plane', name: '평면', icon: Square },
  { id: 'dodecahedron', name: '12면체', icon: Pentagon },
  { id: 'icosahedron', name: '20면체', icon: Hexagon },
];

const lightShapes: ShapeItem[] = [
  { id: 'pointLight', name: '점 조명', icon: Lightbulb },
  { id: 'directionalLight', name: '방향 조명', icon: Sun },
  { id: 'spotLight', name: '스팟 조명', icon: Lamp },
];

const helperShapes: ShapeItem[] = [
  { id: 'grid', name: '그리드', icon: Grid3X3 },
  { id: 'axes', name: '축', icon: Axis3D },
  { id: 'ruler', name: '자', icon: Ruler },
];

interface CreationElementPanelProps {
  onAddElement: (shapeId: string) => void;
}

export function CreationElementPanel({ onAddElement }: CreationElementPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  const tabs = [
    { id: 'basic' as const, label: '기본' },
    { id: 'lights' as const, label: '조명' },
    { id: 'helpers' as const, label: '도우미' },
  ];

  const getShapesByTab = (): ShapeItem[] => {
    switch (activeTab) {
      case 'basic':
        return basicShapes;
      case 'lights':
        return lightShapes;
      case 'helpers':
        return helperShapes;
      default:
        return basicShapes;
    }
  };

  return (
    <div className="flex w-[280px] flex-col border-r border-[#3d3d5c] bg-[#252542]">
      {/* Header */}
      <div className="border-b border-[#3d3d5c] p-4">
        <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-white">
          <Shapes className="h-[18px] w-[18px] text-[#00CEC9]" />
          요소 추가
        </h3>
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 rounded-lg py-2 text-xs font-semibold',
                activeTab === tab.id
                  ? 'bg-[#00CEC9] text-white hover:bg-[#00b8b3]'
                  : 'bg-[#1a1a2e] text-[#a0a0b0] hover:text-white hover:bg-[#1a1a2e]'
              )}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-2.5">
          {getShapesByTab().map((shape) => {
            const Icon = shape.icon;
            return (
              <Button
                key={shape.id}
                variant="ghost"
                onClick={() => onAddElement(shape.id)}
                className="flex aspect-square h-auto flex-col items-center justify-center gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] hover:border-[#00CEC9] hover:bg-[#00CEC9]/10"
              >
                <Icon className="h-7 w-7 text-[#a0a0b0]" />
                <span className="text-[11px] text-[#a0a0b0]">{shape.name}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CreationElementPanel;
