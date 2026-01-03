'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BrickArtHeroSectionProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
}

export function BrickArtHeroSection({
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
}: BrickArtHeroSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit?.();
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#0066FF] to-[#0052CC] px-4 py-10 text-center text-white md:px-8 md:py-[60px]">
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-[100px] -top-[150px] h-[400px] w-[400px] rounded-full bg-[rgba(255,217,61,0.15)]" />
      <div className="pointer-events-none absolute -bottom-[100px] -left-[50px] h-[300px] w-[300px] rounded-full bg-[rgba(255,255,255,0.1)]" />

      {/* Title */}
      <h1 className="relative z-10 mb-3 text-2xl font-extrabold md:text-[42px]">BrickArt</h1>

      {/* Description */}
      <p className="relative z-10 mb-6 text-sm opacity-90 md:text-lg">
        나만의 3D 브릭 공간에서 창작물을 전시하고 공유하세요
      </p>

      {/* Search */}
      <div className="mx-auto flex max-w-[600px] flex-col gap-3 md:flex-row md:items-center">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-[28px] bg-white px-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)] md:px-6">
          <Search className="h-5 w-5 text-[#64748B]" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="BrickArt 검색..."
            className="flex-1 border-none bg-transparent text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8] md:text-base"
          />
        </div>
        <Button
          variant="toy"
          onClick={handleSubmit}
          className="flex h-12 items-center justify-center gap-2 rounded-[28px] px-6 text-sm font-bold md:px-8 md:text-base"
        >
          검색
        </Button>
      </div>
    </section>
  );
}

export default BrickArtHeroSection;
