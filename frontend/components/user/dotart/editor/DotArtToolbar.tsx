'use client';

import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Pencil,
  Eraser,
  PaintBucket,
  Pipette,
  Trash2,
  Image,
  Download,
  Box,
  Save,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type Tool = 'pen' | 'eraser' | 'fill' | 'pick';

interface DotArtToolbarProps {
  projectName: string;
  canvasSize: number;
  selectedTool: Tool;
  canUndo: boolean;
  canRedo: boolean;
  onProjectNameChange: (name: string) => void;
  onSizeClick: () => void;
  onToolSelect: (tool: Tool) => void;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
  onImport: () => void;
  onExport: () => void;
  on3DView: () => void;
  onSave: () => void;
  onBack: () => void;
}

export function DotArtToolbar({
  projectName,
  canvasSize,
  selectedTool,
  canUndo,
  canRedo,
  onProjectNameChange,
  onSizeClick,
  onToolSelect,
  onUndo,
  onRedo,
  onClear,
  onImport,
  onExport,
  on3DView,
  onSave,
  onBack,
}: DotArtToolbarProps) {
  const tools: { id: Tool; icon: typeof Pencil; label: string; shortcut: string }[] = [
    { id: 'pen', icon: Pencil, label: '펜', shortcut: 'P' },
    { id: 'eraser', icon: Eraser, label: '지우개', shortcut: 'E' },
    { id: 'fill', icon: PaintBucket, label: '채우기', shortcut: 'G' },
    { id: 'pick', icon: Pipette, label: '스포이드', shortcut: 'I' },
  ];

  return (
    <div className="flex items-center justify-between border-b border-[#3d3d5c] bg-[#252542] px-6 py-3">
      {/* Left Section */}
      <div className="flex items-center gap-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#3d3d5c]"
        >
          <ArrowLeft className="h-5 w-5" />
        </motion.button>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={projectName}
            onChange={(e) => onProjectNameChange(e.target.value)}
            placeholder="작품명 입력"
            className="w-[200px] border-none bg-transparent text-lg font-bold text-white outline-none focus:border-b-2 focus:border-[#9B5DE5]"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onSizeClick}
            className="rounded-xl bg-[#1a1a2e] px-3 py-1 text-[13px] text-[#a0a0b0] transition-colors hover:bg-[#3d3d5c]"
          >
            {canvasSize} x {canvasSize}
          </Button>
        </div>
      </div>

      {/* Center Section - Tools */}
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex gap-1 rounded-[10px] bg-[#1a1a2e] p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onUndo}
            disabled={!canUndo}
            title="실행취소 (Ctrl+Z)"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
              canUndo
                ? 'text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white'
                : 'cursor-not-allowed text-[#a0a0b0] opacity-30'
            )}
          >
            <Undo2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onRedo}
            disabled={!canRedo}
            title="다시실행 (Ctrl+Y)"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
              canRedo
                ? 'text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white'
                : 'cursor-not-allowed text-[#a0a0b0] opacity-30'
            )}
          >
            <Redo2 className="h-5 w-5" />
          </Button>
        </div>

        <div className="mx-2 h-8 w-px bg-[#3d3d5c]" />

        {/* Drawing Tools */}
        <div className="flex gap-1 rounded-[10px] bg-[#1a1a2e] p-1">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Button
                key={tool.id}
                variant="ghost"
                size="icon"
                onClick={() => onToolSelect(tool.id)}
                title={`${tool.label} (${tool.shortcut})`}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                  selectedTool === tool.id
                    ? 'bg-[#9B5DE5] text-white'
                    : 'text-[#a0a0b0] hover:bg-[#3d3d5c] hover:text-white'
                )}
              >
                <Icon className="h-5 w-5" />
              </Button>
            );
          })}
        </div>

        <div className="mx-2 h-8 w-px bg-[#3d3d5c]" />

        {/* Clear */}
        <div className="flex gap-1 rounded-[10px] bg-[#1a1a2e] p-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            title="전체 지우기"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-[#a0a0b0] transition-colors hover:bg-[#3d3d5c] hover:text-white"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          onClick={onImport}
          className="flex items-center gap-1.5 rounded-[10px] border-2 border-[#3d3d5c] bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#9B5DE5] hover:text-[#9B5DE5]"
        >
          <Image className="h-[18px] w-[18px]" />
          가져오기
        </Button>
        <Button
          variant="outline"
          onClick={onExport}
          className="flex items-center gap-1.5 rounded-[10px] border-2 border-[#3d3d5c] bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#9B5DE5] hover:text-[#9B5DE5]"
        >
          <Download className="h-[18px] w-[18px]" />
          내보내기
        </Button>
        <motion.div whileHover={{ y: -1 }}>
          <Button
            onClick={on3DView}
            className="flex items-center gap-1.5 rounded-[10px] bg-[#9B5DE5] px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            <Box className="h-[18px] w-[18px]" />
            3D 보기
          </Button>
        </motion.div>
        <motion.div whileHover={{ y: -1 }}>
          <Button
            onClick={onSave}
            className="flex items-center gap-1.5 rounded-[10px] bg-[#9B5DE5] px-5 py-2.5 text-sm font-semibold text-white transition-colors"
          >
            <Save className="h-[18px] w-[18px]" />
            저장
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default DotArtToolbar;
