'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Music, Share2, Pencil, Palette } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DotArtViewerHeaderProps {
  title: string;
  author: string;
  canvasSize: number;
  isLiked: boolean;
  isMusicMode: boolean;
  onBack: () => void;
  onLikeToggle: () => void;
  onMusicToggle: () => void;
  onShare: () => void;
  onOpenEditor: () => void;
}

export function DotArtViewerHeader({
  title,
  author,
  canvasSize,
  isLiked,
  isMusicMode,
  onBack,
  onLikeToggle,
  onMusicToggle,
  onShare,
  onOpenEditor,
}: DotArtViewerHeaderProps) {
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

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#FF6B6B] to-[#FFD93D]">
            <Palette className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{title}</h2>
            <span className="text-[13px] text-[#a0a0b0]">
              {author} - {canvasSize}x{canvasSize}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onLikeToggle}
          title="좋아요"
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full transition-colors',
            isLiked ? 'bg-[#FF6B6B] text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#9B5DE5]'
          )}
        >
          <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onMusicToggle}
          title="뮤직 모드"
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full transition-colors',
            isMusicMode ? 'bg-[#9B5DE5] text-white' : 'bg-[#1a1a2e] text-white hover:bg-[#9B5DE5]'
          )}
        >
          <Music className="h-5 w-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShare}
          title="공유"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#9B5DE5]"
        >
          <Share2 className="h-5 w-5" />
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          onClick={onOpenEditor}
          className="flex items-center gap-2 rounded-[10px] bg-[#9B5DE5] px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          <Pencil className="h-[18px] w-[18px]" />
          에디터로 열기
        </motion.button>
      </div>
    </div>
  );
}

export default DotArtViewerHeader;
