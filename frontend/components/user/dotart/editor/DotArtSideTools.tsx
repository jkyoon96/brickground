'use client';

import { Pencil, Eraser, PaintBucket, Pipette, Hash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type Tool = 'pen' | 'eraser' | 'fill' | 'pick';

interface DotArtSideToolsProps {
  selectedTool: Tool;
  showColorIds: boolean;
  onToolSelect: (tool: Tool) => void;
  onToggleColorIds: () => void;
}

export function DotArtSideTools({
  selectedTool,
  showColorIds,
  onToolSelect,
  onToggleColorIds,
}: DotArtSideToolsProps) {
  const tools: { id: Tool; icon: typeof Pencil; label: string }[] = [
    { id: 'pen', icon: Pencil, label: '펜' },
    { id: 'eraser', icon: Eraser, label: '지우개' },
    { id: 'fill', icon: PaintBucket, label: '채우기' },
    { id: 'pick', icon: Pipette, label: '스포이드' },
  ];

  return (
    <div className="flex w-20 flex-col items-center gap-2 border-r border-[#3d3d5c] bg-[#252542] py-4">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <Button
            key={tool.id}
            variant="ghost"
            onClick={() => onToolSelect(tool.id)}
            className={cn(
              'flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-[10px] transition-colors',
              selectedTool === tool.id
                ? 'bg-[#9B5DE5] text-white'
                : 'text-[#a0a0b0] hover:bg-[#1a1a2e] hover:text-white'
            )}
          >
            <Icon className="h-6 w-6" />
            <span className="text-[10px] font-semibold">{tool.label}</span>
          </Button>
        );
      })}

      <div className="mx-4 my-2 h-px w-12 bg-[#3d3d5c]" />

      <Button
        variant="ghost"
        onClick={onToggleColorIds}
        className={cn(
          'flex h-14 w-14 flex-col items-center justify-center gap-1 rounded-[10px] transition-colors',
          showColorIds
            ? 'bg-[#9B5DE5] text-white'
            : 'text-[#a0a0b0] hover:bg-[#1a1a2e] hover:text-white'
        )}
      >
        <Hash className="h-6 w-6" />
        <span className="text-[10px] font-semibold">색상ID</span>
      </Button>
    </div>
  );
}

export default DotArtSideTools;
