'use client';

import Link from 'next/link';
import { FileText, Download, Eye, Flame, Sparkles, Book } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type BadgeType = 'popular' | 'new' | 'programbook' | null;

interface ManualListCardProps {
  id: string;
  title: string;
  productName: string;
  productThumbGradient?: string;
  pageCount: number;
  downloadCount: string;
  format?: string;
  badge?: BadgeType;
  onView?: (id: string) => void;
  onDownload?: (id: string) => void;
}

const badgeConfig: Record<
  NonNullable<BadgeType>,
  { label: string; icon: React.ReactNode; className: string }
> = {
  popular: {
    label: '인기',
    icon: <Flame className="h-3 w-3" />,
    className: 'bg-[#FFD93D] text-[#1E293B]',
  },
  new: {
    label: 'NEW',
    icon: <Sparkles className="h-3 w-3" />,
    className: 'bg-[#6BCB77] text-white',
  },
  programbook: {
    label: '프로그램북',
    icon: <Book className="h-3 w-3" />,
    className: 'bg-[#9B59B6] text-white',
  },
};

export function ManualListCard({
  id,
  title,
  productName,
  productThumbGradient = 'linear-gradient(135deg, #9B59B6, #5C6BC0)',
  pageCount,
  downloadCount,
  format = 'PDF',
  badge,
  onView,
  onDownload,
}: ManualListCardProps) {
  const badgeInfo = badge ? badgeConfig[badge] : null;

  return (
    <div className="group overflow-hidden rounded-[20px] bg-white shadow-[0_4px_20px_rgba(155,89,182,0.15)] transition-transform hover:-translate-y-1.5">
      {/* Thumbnail */}
      <Link href={`/manual/${id}`}>
        <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-[#f5f5f5] to-[#e0e0e0] p-5">
          {/* Page Preview */}
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex h-[60%] w-[80%] flex-col rounded-lg bg-white p-3 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              <div className="mb-2 h-2 w-[60%] rounded bg-[#E2E8F0]" />
              <div className="mb-2 h-2 w-full rounded bg-[#E2E8F0]" />
              <div className="mb-2 h-2 w-[80%] rounded bg-[#E2E8F0]" />
              <div className="mb-2 h-2 w-full rounded bg-[#E2E8F0]" />
              <div className="h-2 w-[60%] rounded bg-[#E2E8F0]" />
            </div>
          </div>

          {/* Badge */}
          {badgeInfo && (
            <span
              className={cn(
                'absolute left-3 top-3 flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] font-bold',
                badgeInfo.className
              )}
            >
              {badgeInfo.icon}
              {badgeInfo.label}
            </span>
          )}

          {/* Format Badge */}
          <span className="absolute right-3 top-3 rounded-lg bg-black/70 px-2.5 py-1.5 text-[11px] font-bold text-white">
            {format}
          </span>
        </div>
      </Link>

      {/* Body */}
      <div className="p-3.5 md:p-5">
        {/* Product Info */}
        <div className="mb-2 flex items-center gap-2 md:mb-2.5">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg md:h-8 md:w-8"
            style={{ background: productThumbGradient }}
          >
            <FileText className="h-4 w-4 text-white/70" />
          </div>
          <span className="text-[11px] text-[#64748B] md:text-xs">{productName}</span>
        </div>

        {/* Title */}
        <Link href={`/manual/${id}`}>
          <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-[1.4] text-[#1E293B] transition-colors group-hover:text-[#9B59B6] md:mb-2.5 md:text-base">
            {title}
          </h3>
        </Link>

        {/* Meta */}
        <div className="mb-3 flex items-center gap-3 md:mb-4">
          <span className="flex items-center gap-1 text-[11px] text-[#64748B] md:text-xs">
            <FileText className="h-3.5 w-3.5" />
            {pageCount} 페이지
          </span>
          <span className="flex items-center gap-1 text-[11px] text-[#64748B] md:text-xs">
            <Download className="h-3.5 w-3.5" />
            {downloadCount}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/manual/${id}`}
            onClick={() => onView?.(id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-[10px] bg-[#9B59B6] py-2 text-[11px] font-semibold text-white transition-colors hover:bg-[#8E44AD] md:py-2.5 md:text-xs"
          >
            <Eye className="h-3.5 w-3.5" />
            보기
          </Link>
          <Button
            variant="outline"
            onClick={() => onDownload?.(id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-[10px] border-2 border-[#E2E8F0] bg-white py-2 text-[11px] font-semibold text-[#1E293B] hover:border-[#9B59B6] md:py-2.5 md:text-xs"
          >
            <Download className="h-3.5 w-3.5" />
            다운로드
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ManualListCard;
