'use client';

import { useState } from 'react';
import { Sliders, Layers, Eye, EyeOff, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface Transform {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  scale: { x: number; y: number; z: number };
}

interface SceneObject {
  id: string;
  name: string;
  color: string;
  visible: boolean;
  assemblyLevel: number;
}

interface EditorSidebarRightProps {
  selectedObject?: {
    id: string;
    name: string;
    transform: Transform;
    assemblyLevel: number;
  };
  sceneObjects: SceneObject[];
  onTransformChange?: (transform: Transform) => void;
  onAssemblyLevelChange?: (level: number) => void;
  onObjectSelect?: (id: string) => void;
  onObjectVisibilityToggle?: (id: string) => void;
  onObjectDelete?: (id: string) => void;
  assemblyLevelFilter?: number;
  onAssemblyLevelFilterChange?: (level: number) => void;
  maxAssemblyLevel?: number;
}

export function EditorSidebarRight({
  selectedObject,
  sceneObjects,
  onTransformChange,
  onAssemblyLevelChange,
  onObjectSelect,
  onObjectVisibilityToggle,
  onObjectDelete,
  assemblyLevelFilter = 20,
  onAssemblyLevelFilterChange,
  maxAssemblyLevel = 20,
}: EditorSidebarRightProps) {
  const [transform, setTransform] = useState<Transform>(
    selectedObject?.transform || {
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1, z: 1 },
    }
  );

  const handleTransformChange = (
    type: 'position' | 'rotation' | 'scale',
    axis: 'x' | 'y' | 'z',
    value: number
  ) => {
    const newTransform = {
      ...transform,
      [type]: {
        ...transform[type],
        [axis]: value,
      },
    };
    setTransform(newTransform);
    onTransformChange?.(newTransform);
  };

  const renderPropertyInput = (
    label: string,
    type: 'position' | 'rotation' | 'scale',
    step: number = 0.1
  ) => (
    <div className="mb-5">
      <div className="mb-2 text-[11px] font-bold uppercase text-gray-500">
        {label}
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        {(['x', 'y', 'z'] as const).map((axis) => (
          <div key={axis} className="flex flex-1 items-center gap-1">
            <label className="w-4 text-[11px] font-semibold uppercase text-gray-500">
              {axis}
            </label>
            <input
              type="number"
              step={step}
              value={transform[type][axis]}
              onChange={(e) =>
                handleTransformChange(type, axis, parseFloat(e.target.value) || 0)
              }
              disabled={!selectedObject}
              className="w-full rounded-md border border-gray-200 px-2 py-2 text-center text-xs focus:border-pixar-blue focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-[300px] flex-col border-l border-gray-200 bg-white lg:w-[260px]">
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
          <Sliders className="h-[18px] w-[18px] text-pixar-blue" />
          속성
        </div>
        <div className="mt-1 text-xs text-gray-500">
          {selectedObject ? selectedObject.name : '선택된 객체 없음'}
        </div>
      </div>

      {/* Properties Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {renderPropertyInput('위치 (Position)', 'position')}
        {renderPropertyInput('회전 (Rotation)', 'rotation', 1)}
        {renderPropertyInput('크기 (Scale)', 'scale')}

        {/* Scene Hierarchy */}
        <div className="mb-5">
          <div className="mb-2 text-[11px] font-bold uppercase text-gray-500">
            씬 계층 구조
          </div>
          <div className="max-h-[200px] overflow-y-auto rounded-lg border border-gray-200 md:max-h-[150px]">
            {sceneObjects.length === 0 ? (
              <div className="py-6 text-center text-xs text-gray-400">
                객체가 없습니다
              </div>
            ) : (
              sceneObjects.map((obj) => (
                <div
                  key={obj.id}
                  onClick={() => onObjectSelect?.(obj.id)}
                  className={cn(
                    'flex cursor-pointer items-center gap-2 border-b border-gray-100 px-3 py-2.5 transition-colors last:border-0',
                    selectedObject?.id === obj.id
                      ? 'bg-pixar-blue/10'
                      : 'hover:bg-gray-50'
                  )}
                >
                  <div
                    className="h-4 w-4 flex-shrink-0 rounded"
                    style={{ backgroundColor: obj.color }}
                  />
                  <span className="flex-1 truncate text-xs font-semibold">
                    {obj.name}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onObjectVisibilityToggle?.(obj.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                    >
                      {obj.visible ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5" />
                      )}
                    </Button>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        onObjectDelete?.(obj.id);
                      }}
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Assembly Section */}
      <div className="border-t border-gray-200 p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[13px] font-bold">
            <Layers className="h-4 w-4 text-toy-yellow" />
            조립 레벨
          </div>
          <input
            type="number"
            min={0}
            max={99}
            value={selectedObject?.assemblyLevel ?? 0}
            onChange={(e) => onAssemblyLevelChange?.(parseInt(e.target.value) || 0)}
            disabled={!selectedObject}
            className="w-[60px] rounded-md border border-gray-200 px-2 py-1.5 text-center text-xs focus:border-pixar-blue focus:outline-none disabled:bg-gray-50"
          />
        </div>
        <input
          type="range"
          min={0}
          max={maxAssemblyLevel}
          value={assemblyLevelFilter}
          onChange={(e) => onAssemblyLevelFilterChange?.(parseInt(e.target.value))}
          className="w-full accent-pixar-blue"
        />
        <div className="mt-1.5 text-[11px] text-gray-500">
          표시 단계: 0 ~ {assemblyLevelFilter}
        </div>
      </div>
    </div>
  );
}
