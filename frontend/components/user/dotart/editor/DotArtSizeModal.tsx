'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const canvasSizes = [16, 32, 48, 64];

interface DotArtSizeModalProps {
  isOpen: boolean;
  currentSize: number;
  onClose: () => void;
  onApply: (size: number) => void;
}

export function DotArtSizeModal({
  isOpen,
  currentSize,
  onClose,
  onApply,
}: DotArtSizeModalProps) {
  const [selectedSize, setSelectedSize] = useState(currentSize);

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
          <h3 className="mb-4 text-lg font-bold text-white">캔버스 크기 변경</h3>
          <p className="mb-4 text-sm text-[#a0a0b0]">
            크기를 변경하면 현재 작업이 초기화될 수 있습니다.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {canvasSizes.map((size) => (
              <Button
                key={size}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'rounded-lg border-2 px-2.5 py-2.5 text-xs font-semibold transition-colors',
                  selectedSize === size
                    ? 'border-[#9B5DE5] bg-[#9B5DE5] text-white'
                    : 'border-[#3d3d5c] bg-[#1a1a2e] text-white hover:border-[#9B5DE5]'
                )}
              >
                {size}x{size}
              </Button>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-[10px] border-2 border-[#3d3d5c] bg-transparent py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#9B5DE5]"
            >
              취소
            </Button>
            <Button
              onClick={() => {
                onApply(selectedSize);
                onClose();
              }}
              className="flex-1 rounded-[10px] bg-[#9B5DE5] py-2.5 text-sm font-semibold text-white"
            >
              적용
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DotArtSizeModal;
