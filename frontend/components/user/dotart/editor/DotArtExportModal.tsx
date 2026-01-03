'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Image, Grid3X3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DotArtExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExportPNG: () => void;
  onExportBlockGuide: () => void;
}

export function DotArtExportModal({
  isOpen,
  onClose,
  onExportPNG,
  onExportBlockGuide,
}: DotArtExportModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="w-[90%] max-w-[400px] rounded-2xl bg-[#252542] p-6"
        >
          <h3 className="mb-4 text-lg font-bold text-white">내보내기</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button
              variant="ghost"
              onClick={() => {
                onExportPNG();
                onClose();
              }}
              className="h-auto rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] p-5 text-center transition-colors hover:border-[#9B5DE5]"
            >
              <Image className="mx-auto mb-2 h-8 w-8 text-[#9B5DE5]" />
              <span className="block text-sm font-semibold text-white">PNG 이미지</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onExportBlockGuide();
                onClose();
              }}
              className="h-auto rounded-[10px] border-2 border-[#3d3d5c] bg-[#1a1a2e] p-5 text-center transition-colors hover:border-[#9B5DE5]"
            >
              <Grid3X3 className="mx-auto mb-2 h-8 w-8 text-[#9B5DE5]" />
              <span className="block text-sm font-semibold text-white">블록 가이드</span>
            </Button>
          </div>
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full rounded-[10px] border-2 border-[#3d3d5c] bg-transparent py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#9B5DE5]"
            >
              닫기
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DotArtExportModal;
