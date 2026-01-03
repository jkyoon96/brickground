'use client';

import { useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ManualListHeroProps {
  onSearch?: (query: string) => void;
}

export function ManualListHero({ onSearch }: ManualListHeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch?.(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#9B59B6] to-[#5C6BC0] px-4 py-8 text-center text-white md:px-10 md:py-[60px]">
      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-3xl bg-white/20 px-4 py-2 text-xs font-semibold md:mb-5 md:px-5 md:py-2.5 md:text-sm">
        <BookOpen className="h-4 w-4 md:h-[18px] md:w-[18px]" />
        Product Manuals
      </div>

      {/* Title */}
      <h1 className="mb-3 text-[22px] font-extrabold md:mb-4 md:text-[42px]">
        제품 매뉴얼 라이브러리
      </h1>

      {/* Description */}
      <p className="mx-auto mb-6 max-w-[600px] text-[13px] opacity-90 md:mb-8 md:text-lg">
        브릭, 피규어, 보드게임 등 다양한 제품의 매뉴얼을 찾아보세요
      </p>

      {/* Search Box */}
      <div className="mx-auto flex max-w-[600px] flex-col gap-3 md:flex-row md:items-center">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-[28px] bg-white px-4 shadow-[0_4px_20px_rgba(0,0,0,0.1)] md:px-6">
          <Search className="h-5 w-5 text-[#64748B] md:h-[22px] md:w-[22px]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="제품명 또는 모델번호로 검색..."
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

export default ManualListHero;
