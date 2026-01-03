'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  User,
  Calendar,
  Eye,
  Heart,
  Bookmark,
  Share2,
  GitBranch,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface CreationViewerHeaderProps {
  title: string;
  author: string;
  date: string;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  onLikeToggle: () => void;
  onBookmarkToggle: () => void;
  onShare: () => void;
  onRemix: () => void;
  onDownload: () => void;
  backUrl?: string;
}

export function CreationViewerHeader({
  title,
  author,
  date,
  views,
  isLiked,
  isBookmarked,
  onLikeToggle,
  onBookmarkToggle,
  onShare,
  onRemix,
  onDownload,
  backUrl = '/creation',
}: CreationViewerHeaderProps) {
  const formatViews = (count: number) => {
    return count.toLocaleString();
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3d3d5c] bg-[#252542] px-4 py-3 md:flex-nowrap md:gap-5 md:px-8 md:py-4">
      {/* Left Section */}
      <div className="flex min-w-full items-center gap-4 md:min-w-0 md:gap-5">
        <Link
          href={backUrl}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a2e] text-white transition-colors hover:bg-[#00CEC9] md:h-11 md:w-11"
        >
          <ArrowLeft className="h-5 w-5 md:h-[22px] md:w-[22px]" />
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#00CEC9] to-[#00D4FF] md:h-14 md:w-14">
            <Building2 className="h-6 w-6 text-white md:h-7 md:w-7" />
          </div>

          <div>
            <h1 className="text-base font-bold text-white md:text-xl">{title}</h1>
            <div className="mt-1 flex items-center gap-3 text-xs text-[#a0a0b0] md:gap-4 md:text-[13px]">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {author}
              </span>
              <span className="hidden items-center gap-1 sm:flex">
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {formatViews(views)} views
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex min-w-full items-center justify-end gap-2 md:min-w-0 md:gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onLikeToggle}
          className={cn(
            'h-9 w-9 rounded-full bg-[#1a1a2e] text-white hover:bg-[#00CEC9] md:h-11 md:w-11',
            isLiked && 'text-[#FF6B6B] hover:text-[#FF6B6B]'
          )}
        >
          <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onBookmarkToggle}
          className={cn(
            'h-9 w-9 rounded-full bg-[#1a1a2e] text-white hover:bg-[#00CEC9] md:h-11 md:w-11',
            isBookmarked && 'text-[#FFD93D] hover:text-[#FFD93D]'
          )}
        >
          <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onShare}
          className="h-9 w-9 rounded-full bg-[#1a1a2e] text-white hover:bg-[#00CEC9] md:h-11 md:w-11"
        >
          <Share2 className="h-5 w-5" />
        </Button>

        <Button
          variant="outline"
          onClick={onRemix}
          className="hidden rounded-3xl border-2 border-[#3d3d5c] bg-transparent px-4 py-2.5 text-sm font-semibold text-white hover:border-[#00CEC9] hover:text-[#00CEC9] hover:bg-transparent sm:flex md:px-6"
        >
          <GitBranch className="h-[18px] w-[18px]" />
          리믹스
        </Button>

        <Button
          variant="gradient"
          onClick={onDownload}
          className="rounded-3xl bg-gradient-to-r from-[#00CEC9] to-[#00D4FF] px-3 py-2 text-xs font-semibold md:px-6 md:py-3 md:text-sm"
        >
          <Download className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          다운로드
        </Button>
      </div>
    </div>
  );
}

export default CreationViewerHeader;
