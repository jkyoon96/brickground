'use client';

import {
  MousePointer,
  Move,
  RotateCcw,
  Maximize2,
  Undo2,
  Redo2,
  Copy,
  Trash2,
  EyeOff,
  Focus,
  Home,
  Image,
  Download,
  FileBox,
  Save,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type TransformMode = 'select' | 'translate' | 'rotate' | 'scale';

interface EditorToolbarProps {
  transformMode: TransformMode;
  onTransformModeChange: (mode: TransformMode) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onCopy?: () => void;
  onDelete?: () => void;
  onToggleVisibility?: () => void;
  onFocusSelected?: () => void;
  onResetCamera?: () => void;
  onExportPNG?: () => void;
  onExportGLTF?: () => void;
  onExportSTL?: () => void;
  onSave?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  hasSelection?: boolean;
}

export function EditorToolbar({
  transformMode,
  onTransformModeChange,
  onUndo,
  onRedo,
  onCopy,
  onDelete,
  onToggleVisibility,
  onFocusSelected,
  onResetCamera,
  onExportPNG,
  onExportGLTF,
  onExportSTL,
  onSave,
  canUndo = false,
  canRedo = false,
  hasSelection = false,
}: EditorToolbarProps) {
  const transformButtons = [
    { mode: 'select' as const, icon: MousePointer, label: '선택', shortcut: 'V' },
    { mode: 'translate' as const, icon: Move, label: '이동', shortcut: 'M' },
    { mode: 'rotate' as const, icon: RotateCcw, label: '회전', shortcut: 'R' },
    { mode: 'scale' as const, icon: Maximize2, label: '크기', shortcut: 'S' },
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-2">
      {/* Left Group */}
      <div className="flex flex-wrap items-center gap-1">
        {/* Transform Tools */}
        {transformButtons.map((btn) => {
          const Icon = btn.icon;
          return (
            <Button
              key={btn.mode}
              onClick={() => onTransformModeChange(btn.mode)}
              title={`${btn.label} (${btn.shortcut})`}
              variant="ghost"
              size="icon"
              className={cn(
                'h-9 w-9 rounded-lg',
                transformMode === btn.mode
                  ? 'bg-pixar-blue text-white hover:bg-pixar-blue/90'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <Icon className="h-5 w-5" />
            </Button>
          );
        })}

        <div className="mx-2 h-6 w-px bg-gray-200" />

        {/* Undo/Redo */}
        <Button
          onClick={onUndo}
          disabled={!canUndo}
          title="실행 취소 (Ctrl+Z)"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Undo2 className="h-5 w-5" />
        </Button>
        <Button
          onClick={onRedo}
          disabled={!canRedo}
          title="다시 실행 (Ctrl+Y)"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Redo2 className="h-5 w-5" />
        </Button>

        <div className="mx-2 h-6 w-px bg-gray-200" />

        {/* Edit Tools */}
        <Button
          onClick={onCopy}
          disabled={!hasSelection}
          title="복사 (Ctrl+C)"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Copy className="h-5 w-5" />
        </Button>
        <Button
          onClick={onDelete}
          disabled={!hasSelection}
          title="삭제 (Delete)"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
        <Button
          onClick={onToggleVisibility}
          disabled={!hasSelection}
          title="숨기기 (H)"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <EyeOff className="h-5 w-5" />
        </Button>

        <div className="mx-2 h-6 w-px bg-gray-200" />

        {/* View Tools */}
        <Button
          onClick={onFocusSelected}
          disabled={!hasSelection}
          title="선택으로 이동 (F)"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Focus className="h-5 w-5" />
        </Button>
        <Button
          onClick={onResetCamera}
          title="카메라 리셋"
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Home className="h-5 w-5" />
        </Button>
      </div>

      {/* Right Group */}
      <div className="flex items-center gap-1">
        {/* Export Buttons */}
        <Button
          onClick={onExportPNG}
          variant="ghost"
          size="sm"
          className="h-9 rounded-lg px-3 text-[13px] font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Image className="h-[18px] w-[18px]" />
          <span className="hidden md:inline">PNG</span>
        </Button>
        <Button
          onClick={onExportGLTF}
          variant="ghost"
          size="sm"
          className="h-9 rounded-lg px-3 text-[13px] font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <Download className="h-[18px] w-[18px]" />
          <span className="hidden md:inline">GLTF</span>
        </Button>
        <Button
          onClick={onExportSTL}
          variant="ghost"
          size="sm"
          className="h-9 rounded-lg px-3 text-[13px] font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <FileBox className="h-[18px] w-[18px]" />
          <span className="hidden md:inline">STL</span>
        </Button>

        <div className="mx-2 h-6 w-px bg-gray-200" />

        {/* Save Button */}
        <Button
          onClick={onSave}
          size="sm"
          className="h-9 rounded-lg px-3 text-[13px]"
        >
          <Save className="h-[18px] w-[18px]" />
          저장
        </Button>
      </div>
    </div>
  );
}
