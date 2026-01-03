'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Search,
  PanelLeft,
  Minus,
  Plus,
  Maximize,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ManualViewerTopBarProps {
  title: string;
  productLink?: string;
  currentPage: number;
  totalPages: number;
  zoom: number;
  isSidebarOpen?: boolean;
  isBookmarked?: boolean;
  onBack?: () => void;
  onPageChange?: (page: number) => void;
  onPrevPage?: () => void;
  onNextPage?: () => void;
  onBookmark?: () => void;
  onSearch?: () => void;
  onToggleSidebar?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onFullscreen?: () => void;
  onDownload?: () => void;
}

export function ManualViewerTopBar({
  title,
  productLink,
  currentPage,
  totalPages,
  zoom,
  isSidebarOpen = true,
  isBookmarked = false,
  onBack,
  onPageChange,
  onPrevPage,
  onNextPage,
  onBookmark,
  onSearch,
  onToggleSidebar,
  onZoomIn,
  onZoomOut,
  onFullscreen,
  onDownload,
}: ManualViewerTopBarProps) {
  const handlePageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= totalPages) {
      onPageChange?.(value);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 shadow-[0_4px_20px_rgba(155,89,182,0.15)] md:px-6">
      {/* Left Section */}
      <div className="flex items-center gap-4 md:gap-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="h-9 w-9 rounded-full bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white md:h-10 md:w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#9B59B6] to-[#5C6BC0] md:h-12 md:w-12">
            <BookOpen className="h-5 w-5 text-white md:h-6 md:w-6" />
          </div>
          <div>
            <h1 className="line-clamp-1 text-sm font-bold text-[#1E293B] md:text-base">
              {title}
            </h1>
            {productLink && (
              <Link
                href={productLink}
                className="flex items-center gap-1 text-xs text-[#9B59B6] hover:underline"
              >
                <ExternalLink className="h-3 w-3" />
                상품 페이지 보기
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Center Section - Page Navigation */}
      <div className="hidden items-center gap-3 md:flex">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevPage}
          disabled={currentPage <= 1}
          className="h-9 w-9 rounded-full bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white"
        >
          <ChevronLeft className="h-[18px] w-[18px]" />
        </Button>

        <div className="flex items-center gap-2 rounded-[20px] bg-[#F8FAFC] px-4 py-2">
          <input
            type="text"
            value={currentPage}
            onChange={handlePageInput}
            className="w-[50px] rounded-lg bg-white px-2 py-1.5 text-center text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#9B59B6]"
          />
          <span className="text-sm text-[#64748B]">/ {totalPages}</span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          className="h-9 w-9 rounded-full bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white"
        >
          <ChevronRight className="h-[18px] w-[18px]" />
        </Button>
      </div>

      {/* Right Section - Tools */}
      <div className="flex items-center gap-2 md:gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBookmark}
          className={cn(
            'h-9 w-9 rounded-[10px] md:h-10 md:w-10',
            isBookmarked
              ? 'bg-[#9B59B6] text-white'
              : 'bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white'
          )}
        >
          <Bookmark className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onSearch}
          className="h-9 w-9 rounded-[10px] bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white md:h-10 md:w-10"
        >
          <Search className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className={cn(
            'hidden h-10 w-10 rounded-[10px] md:flex',
            isSidebarOpen
              ? 'bg-[#9B59B6] text-white'
              : 'bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white'
          )}
        >
          <PanelLeft className="h-5 w-5" />
        </Button>

        <div className="hidden h-6 w-px bg-[#E2E8F0] md:block" />

        {/* Zoom Control */}
        <div className="hidden items-center gap-2 rounded-[10px] bg-[#F8FAFC] px-3 py-1.5 md:flex">
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomOut}
            className="h-7 w-7 rounded-md bg-white hover:bg-[#9B59B6] hover:text-white"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="min-w-[50px] text-center text-[13px] font-semibold">
            {zoom}%
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={onZoomIn}
            className="h-7 w-7 rounded-md bg-white hover:bg-[#9B59B6] hover:text-white"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={onFullscreen}
          className="hidden h-10 w-10 rounded-[10px] bg-[#F8FAFC] hover:bg-[#9B59B6] hover:text-white md:flex"
        >
          <Maximize className="h-5 w-5" />
        </Button>

        <div className="hidden h-6 w-px bg-[#E2E8F0] md:block" />

        <Button
          onClick={onDownload}
          className="rounded-[10px] bg-[#9B59B6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#8E44AD] md:px-5"
        >
          <Download className="h-[18px] w-[18px]" />
          <span className="hidden md:inline">다운로드</span>
        </Button>
      </div>
    </div>
  );
}

export default ManualViewerTopBar;
