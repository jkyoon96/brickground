'use client';

import { Box } from 'lucide-react';

interface EditorStatusBarProps {
  objectCount: number;
  selectedInfo?: string;
}

const shortcuts = [
  { key: 'M', label: '이동' },
  { key: 'R', label: '회전' },
  { key: 'H', label: '숨기기' },
  { key: 'Del', label: '삭제' },
  { key: 'Ctrl+Z', label: '실행취소' },
];

export function EditorStatusBar({ objectCount, selectedInfo }: EditorStatusBarProps) {
  return (
    <div className="flex items-center justify-between bg-[#252538] px-4 py-2 text-xs text-white/60">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Box className="h-3.5 w-3.5" />
          <span>객체: {objectCount}</span>
        </div>
        <span>{selectedInfo || '선택 없음'}</span>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.key} className="flex items-center gap-1">
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[11px]">
              {shortcut.key}
            </kbd>
            <span>{shortcut.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
