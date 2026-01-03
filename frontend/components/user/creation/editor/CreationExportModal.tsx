'use client';

import { Image as ImageIcon, Box, Printer, FileText, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type ExportFormat = 'png' | 'gltf' | 'stl' | 'obj';

interface ExportOption {
  format: ExportFormat;
  icon: LucideIcon;
  label: string;
}

const exportOptions: ExportOption[] = [
  { format: 'png', icon: ImageIcon, label: 'PNG 이미지' },
  { format: 'gltf', icon: Box, label: 'GLTF 3D' },
  { format: 'stl', icon: Printer, label: 'STL (3D 프린트)' },
  { format: 'obj', icon: FileText, label: 'OBJ' },
];

interface CreationExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat) => void;
}

export function CreationExportModal({
  isOpen,
  onClose,
  onExport,
}: CreationExportModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80">
      <div className="w-[90%] max-w-[400px] rounded-2xl bg-[#252542] p-6">
        <h3 className="mb-5 text-lg font-bold text-white">내보내기</h3>

        <div className="grid grid-cols-2 gap-3">
          {exportOptions.map(({ format, icon: Icon, label }) => (
            <Button
              key={format}
              variant="ghost"
              onClick={() => onExport(format)}
              className="flex h-auto flex-col items-center gap-2 rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] p-5 text-center hover:border-[#00CEC9] hover:bg-[#1a1a2e]"
            >
              <Icon className="h-8 w-8 text-[#00CEC9]" />
              <span className="text-sm font-semibold text-white">{label}</span>
            </Button>
          ))}
        </div>

        <Button
          variant="ghost"
          onClick={onClose}
          className="mt-5 w-full rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] py-3 text-sm font-semibold text-white hover:border-[#00CEC9] hover:bg-[#1a1a2e]"
        >
          닫기
        </Button>
      </div>
    </div>
  );
}

export default CreationExportModal;
