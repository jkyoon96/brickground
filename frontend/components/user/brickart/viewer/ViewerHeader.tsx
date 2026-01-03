'use client';

import Link from 'next/link';
import { ArrowLeft, Share2, Heart, Maximize2, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface ViewerHeaderProps {
  title: string;
  backHref: string;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  onShare?: () => void;
  onFullscreen?: () => void;
  onSaveImage?: () => void;
}

export function ViewerHeader({
  title,
  backHref,
  isLiked = false,
  onLikeToggle,
  onShare,
  onFullscreen,
  onSaveImage,
}: ViewerHeaderProps) {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent p-4 md:p-6">
      <Link
        href={backHref}
        className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="hidden sm:inline">목록으로</span>
      </Link>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-bold text-white md:text-lg lg:text-xl">
        {title}
      </h1>

      <div className="flex gap-2">
        <Button
          onClick={onShare}
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
          title="공유"
        >
          <Share2 className="h-5 w-5" />
        </Button>
        <Button
          onClick={onLikeToggle}
          variant="ghost"
          size="icon"
          className={cn(
            'h-10 w-10 backdrop-blur-md',
            isLiked ? 'bg-pixar-blue text-white hover:bg-pixar-blue/90' : 'bg-white/10 text-white hover:bg-white/20'
          )}
          title="좋아요"
        >
          <Heart className={cn('h-5 w-5', isLiked && 'fill-current')} />
        </Button>
        <Button
          onClick={onFullscreen}
          variant="ghost"
          size="icon"
          className="h-10 w-10 bg-white/10 text-white backdrop-blur-md hover:bg-white/20"
          title="전체화면"
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
        <Button
          onClick={onSaveImage}
          variant="ghost"
          size="icon"
          className="hidden h-10 w-10 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 sm:flex"
          title="이미지 저장"
        >
          <Download className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
