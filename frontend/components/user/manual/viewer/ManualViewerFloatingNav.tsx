'use client';

import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ManualViewerFloatingNavProps {
  currentPage: number;
  totalPages: number;
  onFirstPage?: () => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onLastPage?: () => void;
  onSliderChange?: (page: number) => void;
}

export function ManualViewerFloatingNav({
  currentPage,
  totalPages,
  onFirstPage,
  onPrevPage,
  onNextPage,
  onLastPage,
  onSliderChange,
}: ManualViewerFloatingNavProps) {
  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const page = Math.max(1, Math.min(totalPages, Math.round(percentage * totalPages)));
    onSliderChange?.(page);
  };

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-[28px] bg-white px-5 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.3)] md:bottom-10 md:gap-4 md:px-6">
      {/* First Page */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onFirstPage}
        disabled={currentPage <= 1}
        className="h-10 w-10 rounded-full bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white md:h-11 md:w-11"
      >
        <ChevronsLeft className="h-5 w-5 md:h-[22px] md:w-[22px]" />
      </Button>

      {/* Previous Page */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onPrevPage}
        disabled={currentPage <= 1}
        className="h-10 w-10 rounded-full bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white md:h-11 md:w-11"
      >
        <ChevronLeft className="h-5 w-5 md:h-[22px] md:w-[22px]" />
      </Button>

      {/* Page Display */}
      <span className="min-w-[70px] text-center text-sm font-semibold text-[#1E293B] md:min-w-[80px] md:text-[15px]">
        {currentPage} / {totalPages}
      </span>

      {/* Slider */}
      <div
        className="relative hidden h-1.5 w-[150px] cursor-pointer rounded-sm bg-[#E2E8F0] md:block md:w-[200px]"
        onClick={handleSliderClick}
      >
        {/* Fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-sm bg-[#9B59B6]"
          style={{ width: `${progress}%` }}
        />
        {/* Handle */}
        <div
          className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#9B59B6] shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
          style={{ left: `${progress}%` }}
        />
      </div>

      {/* Next Page */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onNextPage}
        disabled={currentPage >= totalPages}
        className="h-10 w-10 rounded-full bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white md:h-11 md:w-11"
      >
        <ChevronRight className="h-5 w-5 md:h-[22px] md:w-[22px]" />
      </Button>

      {/* Last Page */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onLastPage}
        disabled={currentPage >= totalPages}
        className="h-10 w-10 rounded-full bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white md:h-11 md:w-11"
      >
        <ChevronsRight className="h-5 w-5 md:h-[22px] md:w-[22px]" />
      </Button>
    </div>
  );
}

export default ManualViewerFloatingNav;
