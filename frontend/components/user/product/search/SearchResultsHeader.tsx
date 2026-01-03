'use client';

import { Sliders, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type SortOption = 'popular' | 'newest' | 'priceAsc' | 'priceDesc' | 'rating';

interface SearchResultsHeaderProps {
  query: string;
  totalCount: number;
  sortOption?: SortOption;
  onFilterClick?: () => void;
  onSortClick?: () => void;
  sortLabel?: string;
}

export function SearchResultsHeader({
  query,
  totalCount,
  onFilterClick,
  onSortClick,
  sortLabel = '인기순',
}: SearchResultsHeaderProps) {
  return (
    <div className="mb-4 flex flex-col gap-4 md:mb-6 md:flex-row md:items-center md:justify-between">
      {/* Results Info */}
      <div>
        <h2 className="mb-1 text-lg font-extrabold text-[#1E293B] md:text-2xl">
          "<span className="text-[#FF6B35]">{query}</span>" 검색 결과
        </h2>
        <p className="text-xs text-[#64748B] md:text-sm">
          총 {totalCount.toLocaleString()}개의 상품을 찾았습니다
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 md:gap-3">
        <Button
          onClick={onFilterClick}
          variant="ghost"
          className="h-auto rounded-3xl border-2 border-[#E2E8F0] bg-white px-4 py-2.5 text-xs font-semibold text-[#1E293B] transition-colors hover:border-[#FF6B35] hover:bg-white md:px-5 md:py-3 md:text-sm"
        >
          <Sliders className="h-4 w-4" />
          필터
        </Button>
        <Button
          onClick={onSortClick}
          variant="ghost"
          className="h-auto rounded-3xl border-2 border-[#E2E8F0] bg-white px-4 py-2.5 text-xs font-semibold text-[#1E293B] transition-colors hover:border-[#FF6B35] hover:bg-white md:px-5 md:py-3 md:text-sm"
        >
          <ArrowUpDown className="h-4 w-4" />
          {sortLabel}
        </Button>
      </div>
    </div>
  );
}

export default SearchResultsHeader;
