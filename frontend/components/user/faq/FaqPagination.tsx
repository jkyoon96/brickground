'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface FaqPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function FaqPagination({
  currentPage,
  totalPages,
  onPageChange,
}: FaqPaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-6 flex items-center justify-center gap-2 md:mt-8">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-[#E2E8F0] bg-white text-[#1E293B] transition-colors hover:border-[#00CEC9] disabled:cursor-not-allowed disabled:opacity-50 md:h-10 md:w-10"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          onClick={() => onPageChange(page)}
          className={cn(
            'flex h-9 w-9 items-center justify-center rounded-[10px] border-2 text-sm font-semibold transition-colors md:h-10 md:w-10',
            currentPage === page
              ? 'border-[#00CEC9] bg-[#00CEC9] text-white'
              : 'border-[#E2E8F0] bg-white text-[#1E293B] hover:border-[#00CEC9]'
          )}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-[#E2E8F0] bg-white text-[#1E293B] transition-colors hover:border-[#00CEC9] disabled:cursor-not-allowed disabled:opacity-50 md:h-10 md:w-10"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default FaqPagination;
