'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Undo2,
  Redo2,
  MousePointer2,
  Move,
  Rotate3d,
  Scaling,
  Copy,
  Trash2,
  Download,
  Save,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type EditMode = 'select' | 'translate' | 'rotate' | 'scale';

interface CreationEditorToolbarProps {
  projectName: string;
  objectCount: number;
  canUndo: boolean;
  canRedo: boolean;
  currentMode: EditMode;
  onBack: () => void;
  onProjectNameChange: (name: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onModeChange: (mode: EditMode) => void;
  onCopy: () => void;
  onDelete: () => void;
  onExport: () => void;
  onSave: () => void;
}

export function CreationEditorToolbar({
  projectName,
  objectCount,
  canUndo,
  canRedo,
  currentMode,
  onBack,
  onProjectNameChange,
  onUndo,
  onRedo,
  onModeChange,
  onCopy,
  onDelete,
  onExport,
  onSave,
}: CreationEditorToolbarProps) {
  const [localName, setLocalName] = useState(projectName);

  const modeButtons = [
    { mode: 'select' as const, icon: MousePointer2, title: '선택 (V)' },
    { mode: 'translate' as const, icon: Move, title: '이동 (G)' },
    { mode: 'rotate' as const, icon: Rotate3d, title: '회전 (R)' },
    { mode: 'scale' as const, icon: Scaling, title: '크기 (S)' },
  ];

  const handleNameBlur = () => {
    if (localName !== projectName) {
      onProjectNameChange(localName);
    }
  };

  return (
    <div className="flex items-center justify-between border-b border-[#3d3d5c] bg-[#252542] px-6 py-3">
      {/* Left */}
      <div className="flex items-center gap-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-10 w-10 rounded-full bg-[#1a1a2e] text-white hover:bg-[#3d3d5c]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            onBlur={handleNameBlur}
            placeholder="창작물 이름"
            className="w-[200px] border-none bg-transparent text-lg font-bold text-white outline-none focus:border-b-2 focus:border-[#00CEC9]"
          />
          <span className="rounded-xl bg-[#1a1a2e] px-3 py-1 text-[13px] text-[#a0a0b0]">
            {objectCount}개 오브젝트
          </span>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex gap-1 rounded-[10px] bg-[#1a1a2e] p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndo}
            disabled={!canUndo}
            title="실행취소 (Ctrl+Z)"
            className="h-10 w-10 rounded-lg text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Undo2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRedo}
            disabled={!canRedo}
            title="다시실행 (Ctrl+Y)"
            className="h-10 w-10 rounded-lg text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Redo2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="mx-2 h-8 w-px bg-[#3d3d5c]" />

        {/* Mode buttons */}
        <div className="flex gap-1 rounded-[10px] bg-[#1a1a2e] p-1">
          {modeButtons.map(({ mode, icon: Icon, title }) => (
            <Button
              key={mode}
              variant="ghost"
              size="icon"
              onClick={() => onModeChange(mode)}
              title={title}
              className={cn(
                'h-10 w-10 rounded-lg',
                currentMode === mode
                  ? 'bg-[#00CEC9] text-white hover:bg-[#00b8b3]'
                  : 'text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white'
              )}
            >
              <Icon className="h-5 w-5" />
            </Button>
          ))}
        </div>

        <div className="mx-2 h-8 w-px bg-[#3d3d5c]" />

        {/* Copy/Delete */}
        <div className="flex gap-1 rounded-[10px] bg-[#1a1a2e] p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCopy}
            title="복사 (Ctrl+C)"
            className="h-10 w-10 rounded-lg text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white"
          >
            <Copy className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDelete}
            title="삭제 (Delete)"
            className="h-10 w-10 rounded-lg text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onExport}
          className="rounded-[10px] border-2 border-[#3d3d5c] bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:border-[#00CEC9] hover:text-[#00CEC9] hover:bg-transparent"
        >
          <Download className="h-[18px] w-[18px]" />
          내보내기
        </Button>
        <Button
          variant="gradient"
          onClick={onSave}
          className="rounded-[10px] bg-gradient-to-r from-[#00CEC9] to-[#00D4FF] px-5 py-2.5 text-sm font-semibold hover:-translate-y-0.5"
        >
          <Save className="h-[18px] w-[18px]" />
          저장
        </Button>
      </div>
    </div>
  );
}

export default CreationEditorToolbar;
