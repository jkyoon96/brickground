'use client';

import { useState } from 'react';
import { GraduationCap, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ClassListHeroProps {
  onSearch?: (query: string) => void;
}

export function ClassListHero({ onSearch }: ClassListHeroProps) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch?.(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#10B981] to-[#059669] px-4 py-8 text-center text-white md:px-10 md:py-[60px]">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-3xl bg-white/20 px-4 py-2 text-xs font-semibold md:mb-5 md:px-5 md:py-2.5 md:text-sm">
        <GraduationCap className="h-4 w-4 md:h-[18px] md:w-[18px]" />
        BrickGround Class
      </div>

      {/* Title */}
      <h1 className="mb-3 text-2xl font-extrabold md:mb-4 md:text-[42px]">
        체험 & 방과후 수업
      </h1>

      {/* Description */}
      <p className="mx-auto mb-6 max-w-[600px] text-sm opacity-90 md:mb-8 md:text-lg">
        창의력과 집중력을 키우는 블록 교육 클래스에 참여하세요
      </p>

      {/* Search */}
      <div className="mx-auto flex max-w-[600px] flex-col gap-3 md:flex-row md:items-center">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-[28px] bg-white px-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)] md:px-6">
          <Search className="h-5 w-5 text-[#64748B] md:h-[22px] md:w-[22px]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="클래스명, 지역으로 검색..."
            className="flex-1 border-none bg-transparent text-sm text-[#1E293B] outline-none placeholder:text-[#94A3B8] md:text-base"
          />
        </div>
        <Button
          variant="toy"
          onClick={handleSearch}
          className="flex h-12 items-center justify-center gap-2 rounded-[28px] px-6 text-sm font-bold md:px-8 md:text-base"
        >
          <Search className="h-5 w-5" />
          검색
        </Button>
      </div>
    </section>
  );
}

export default ClassListHero;
