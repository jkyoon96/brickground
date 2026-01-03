'use client';

import Link from 'next/link';
import { Box, Plus, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface CreationHeroSectionProps {
  onTutorialClick?: () => void;
}

export function CreationHeroSection({ onTutorialClick }: CreationHeroSectionProps) {
  return (
    <section className="bg-gradient-to-r from-[#00CEC9] to-[#00D4FF] px-10 py-[60px] text-center text-white">
      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-3xl bg-white/20 px-5 py-2.5 text-sm font-semibold">
        <Box className="h-[18px] w-[18px]" />
        3D 창작 플랫폼
      </div>

      {/* Title */}
      <h1 className="mb-4 text-[42px] font-extrabold">Creation Gallery</h1>

      {/* Description */}
      <p className="mx-auto mb-8 max-w-[600px] text-lg opacity-90">
        나만의 3D 창작물을 만들고 공유하세요. 무한한 상상력을 현실로!
      </p>

      {/* Actions */}
      <div className="flex flex-col justify-center gap-3 md:flex-row md:items-center md:gap-4">
        <Link
          href="/creations/new/editor"
          className="flex h-12 items-center justify-center gap-2.5 rounded-[28px] bg-white px-6 text-sm font-bold text-[#00CEC9] shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 md:px-8 md:text-base"
        >
          <Plus className="h-5 w-5" />
          새 창작물 만들기
        </Link>
        <Button
          variant="outline"
          onClick={onTutorialClick}
          className="h-12 rounded-[28px] border-2 border-white bg-transparent px-6 text-sm font-bold text-white hover:bg-white/10 hover:text-white md:px-8 md:text-base"
        >
          <Play className="h-5 w-5" />
          튜토리얼 보기
        </Button>
      </div>
    </section>
  );
}

export default CreationHeroSection;
