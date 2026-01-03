'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export function SearchPagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: SearchPaginationProps) {
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5 md:mt-12 md:gap-2">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-xl border-2 border-[#E2E8F0] bg-white text-[#1E293B] transition-colors hover:border-[#FF6B35] hover:bg-white md:h-11 md:w-11"
      >
        <ChevronLeft className="h-4 w-4 md:h-[18px] md:w-[18px]" />
      </Button>

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={page === currentPage ? 'default' : 'ghost'}
          size="icon"
          className={cn(
            'h-9 w-9 rounded-xl border-2 text-sm font-semibold transition-colors md:h-11 md:w-11 md:text-[15px]',
            page === currentPage
              ? 'border-[#FF6B35] bg-[#FF6B35] text-white hover:bg-[#FF6B35]'
              : 'border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#FF6B35] hover:bg-white'
          )}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-xl border-2 border-[#E2E8F0] bg-white text-[#1E293B] transition-colors hover:border-[#FF6B35] hover:bg-white md:h-11 md:w-11"
      >
        <ChevronRight className="h-4 w-4 md:h-[18px] md:w-[18px]" />
      </Button>
    </div>
  );
}

export default SearchPagination;
