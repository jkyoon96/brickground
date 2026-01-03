'use client';

import { PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface ThumbnailPage {
  pageNumber: number;
}

interface ManualViewerSidebarProps {
  pages: ThumbnailPage[];
  currentPage: number;
  isOpen?: boolean;
  onPageSelect?: (page: number) => void;
  onClose?: () => void;
}

export function ManualViewerSidebar({
  pages,
  currentPage,
  isOpen = true,
  onPageSelect,
  onClose,
}: ManualViewerSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="flex w-[200px] flex-col gap-3 overflow-y-auto bg-[#2D2D3F] p-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-[13px] font-semibold text-white">페이지</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 rounded-md bg-white/10 hover:bg-white/20"
        >
          <PanelLeftClose className="h-3.5 w-3.5 text-white" />
        </Button>
      </div>

      {/* Thumbnail List */}
      <div className="flex flex-col gap-2">
        {pages.map((page) => (
          <Button
            key={page.pageNumber}
            variant="ghost"
            onClick={() => onPageSelect?.(page.pageNumber)}
            className={cn(
              'h-auto rounded-lg border-2 bg-white p-1 transition-all',
              currentPage === page.pageNumber
                ? 'border-[#9B59B6]'
                : 'border-transparent hover:border-[#9B59B6]'
            )}
          >
            <div className="flex flex-col">
              {/* Thumbnail Preview */}
              <div className="flex aspect-[3/4] w-full flex-col justify-center rounded bg-[#f5f5f5] p-2">
                <div className="mb-1 h-1 w-1/2 rounded bg-[#E2E8F0]" />
                <div className="mb-1 h-1 w-full rounded bg-[#E2E8F0]" />
                <div className="h-1 w-[70%] rounded bg-[#E2E8F0]" />
              </div>
              {/* Page Label */}
              <div className="mt-1.5 text-center text-[11px] text-white">
                {page.pageNumber}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ManualViewerSidebar;
