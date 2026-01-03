'use client';

import { Heart, Bookmark, Share2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface BrickArtDetailActionsProps {
  isLiked: boolean;
  isBookmarked: boolean;
  isOwner?: boolean;
  onLikeToggle: () => void;
  onBookmarkToggle: () => void;
  onShare: () => void;
  onEdit?: () => void;
}

export function BrickArtDetailActions({
  isLiked,
  isBookmarked,
  isOwner = false,
  onLikeToggle,
  onBookmarkToggle,
  onShare,
  onEdit,
}: BrickArtDetailActionsProps) {
  return (
    <div className="space-y-4">
      {/* Main Actions */}
      <div className="flex gap-3">
        <Button
          onClick={onLikeToggle}
          variant="outline"
          className={cn(
            'flex-1 rounded-xl border-2 py-3',
            isLiked
              ? 'border-[#FF6B9D] bg-[#FF6B9D]/10 text-[#FF6B9D] hover:bg-[#FF6B9D]/20 hover:text-[#FF6B9D]'
              : 'border-[#E2E8F0] text-[#64748B] hover:border-[#FF6B9D] hover:bg-transparent hover:text-[#FF6B9D]'
          )}
        >
          <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
          좋아요
        </Button>
        <Button
          onClick={onBookmarkToggle}
          variant="outline"
          className={cn(
            'flex-1 rounded-xl border-2 py-3',
            isBookmarked
              ? 'border-[#FFD93D] bg-[#FFD93D]/10 text-[#FF9F43] hover:bg-[#FFD93D]/20 hover:text-[#FF9F43]'
              : 'border-[#E2E8F0] text-[#64748B] hover:border-[#FFD93D] hover:bg-transparent hover:text-[#FF9F43]'
          )}
        >
          <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
          저장
        </Button>
        <Button
          onClick={onShare}
          variant="outline"
          className="flex-1 rounded-xl border-2 border-[#E2E8F0] py-3 text-[#64748B] hover:border-[#0066FF] hover:bg-transparent hover:text-[#0066FF]"
        >
          <Share2 className="h-5 w-5" />
          공유
        </Button>
      </div>

      {/* Edit Button (for owner) */}
      {isOwner && onEdit && (
        <Button
          onClick={onEdit}
          variant="outline"
          className="w-full rounded-xl border-2 border-[#E2E8F0] py-3 text-[#64748B] hover:border-[#0066FF] hover:bg-[#0066FF] hover:text-white"
        >
          <Edit className="h-5 w-5" />
          BrickArt 편집하기
        </Button>
      )}
    </div>
  );
}

export default BrickArtDetailActions;
