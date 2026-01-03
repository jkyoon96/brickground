'use client';

import { Heart, MessageCircle, Copy, Bookmark, Share2, Flag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface DotArtDetailActionsProps {
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
  onLikeToggle: () => void;
  onCommentClick: () => void;
  onRemix: () => void;
  onBookmarkToggle: () => void;
  onShare: () => void;
  onReport: () => void;
}

export function DotArtDetailActions({
  likeCount,
  commentCount,
  isLiked,
  isBookmarked,
  onLikeToggle,
  onCommentClick,
  onRemix,
  onBookmarkToggle,
  onShare,
  onReport,
}: DotArtDetailActionsProps) {
  const formatCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1).replace(/\.0$/, '')}K`;
    }
    return count.toLocaleString();
  };

  return (
    <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-4">
      {/* Left Actions */}
      <div className="flex gap-4">
        <Button
          variant="ghost"
          onClick={onLikeToggle}
          className={cn(
            'flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors',
            isLiked
              ? 'bg-[#FF6B6B]/10 text-[#FF6B6B]'
              : 'bg-[#F8FAFC] text-[#1E293B] hover:bg-[#9B5DE5]/10 hover:text-[#9B5DE5]'
          )}
        >
          <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
          <span>{formatCount(likeCount)}</span>
        </Button>

        <Button
          variant="ghost"
          onClick={onCommentClick}
          className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#1E293B] transition-colors hover:bg-[#9B5DE5]/10 hover:text-[#9B5DE5]"
        >
          <MessageCircle className="h-5 w-5" />
          <span>{formatCount(commentCount)}</span>
        </Button>

        <Button
          variant="ghost"
          onClick={onRemix}
          className="flex items-center gap-2 rounded-xl bg-[#F8FAFC] px-4 py-2.5 text-sm font-semibold text-[#1E293B] transition-colors hover:bg-[#9B5DE5]/10 hover:text-[#9B5DE5]"
        >
          <Copy className="h-5 w-5" />
          <span>리믹스</span>
        </Button>
      </div>

      {/* Right Actions */}
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBookmarkToggle}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full transition-colors',
            isBookmarked
              ? 'bg-[#9B5DE5]/10 text-[#9B5DE5]'
              : 'bg-[#F8FAFC] text-[#1E293B] hover:bg-[#9B5DE5]/10 hover:text-[#9B5DE5]'
          )}
        >
          <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onShare}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8FAFC] text-[#1E293B] transition-colors hover:bg-[#9B5DE5]/10 hover:text-[#9B5DE5]"
        >
          <Share2 className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onReport}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F8FAFC] text-[#1E293B] transition-colors hover:bg-[#9B5DE5]/10 hover:text-[#9B5DE5]"
        >
          <Flag className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default DotArtDetailActions;
