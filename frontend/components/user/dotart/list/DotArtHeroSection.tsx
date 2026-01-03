'use client';

import Link from 'next/link';
import { Sparkles, Pencil, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DotArtHeroSectionProps {
  onTutorialClick?: () => void;
}

export function DotArtHeroSection({ onTutorialClick }: DotArtHeroSectionProps) {
  return (
    <section className="bg-gradient-to-r from-[#9B5DE5] to-[#F15BB5] px-10 py-[60px] text-center text-white">
      {/* Badge */}
      <div className="mb-5 inline-flex items-center gap-2 rounded-3xl bg-white/20 px-5 py-2.5 text-sm font-semibold">
        <Sparkles className="h-[18px] w-[18px]" />
        픽셀 아트 창작 플랫폼
      </div>

      {/* Title */}
      <h1 className="mb-4 text-[48px] font-extrabold">DotArt 갤러리</h1>

      {/* Description */}
      <p className="mx-auto mb-8 max-w-[600px] text-xl opacity-90">
        나만의 픽셀 아트를 만들고, 3D로 변환하고, 전 세계와 공유하세요!
      </p>

      {/* Actions */}
      <div className="flex flex-col justify-center gap-3 md:flex-row md:items-center md:gap-4">
        <Link
          href="/dotarts/new/editor"
          className="flex h-12 items-center justify-center gap-2.5 rounded-[28px] bg-white px-6 text-sm font-bold text-[#9B5DE5] shadow-[0_4px_15px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 md:px-8 md:text-base"
        >
          <Pencil className="h-5 w-5" />
          새 작품 만들기
        </Link>
        <Button
          variant="outline"
          onClick={onTutorialClick}
          className="h-12 rounded-[28px] border-2 border-white bg-transparent px-6 text-sm font-bold text-white hover:bg-white/10 hover:text-white md:px-8 md:text-base"
        >
          <PlayCircle className="h-5 w-5" />
          튜토리얼 보기
        </Button>
      </div>
    </section>
  );
}

export default DotArtHeroSection;
